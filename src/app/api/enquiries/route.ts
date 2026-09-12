/**
 * Alkota UK — Canonical Enquiry Submission API
 * Phase 7.1 — Hardened Server-Authoritative Boundary
 *
 * This endpoint is the canonical inbound channel for structured commercial
 * machine enquiries. It enforces a strict server-authoritative contract:
 *
 *   - The client identifies machines; the SERVER resolves and validates them.
 *   - The client claims match status; the SERVER re-runs selectMachines().
 *   - The client supplies customer data; the SERVER sanitises and allowlists.
 *   - All audit fields (revalidated_at, selector_version, etc.) are
 *     SERVER-GENERATED and never accepted from the request body.
 *
 * Security controls:
 *   - Payload size guard (32 KB max) before body parsing
 *   - Per-IP in-memory rate limiting (10 req/min)
 *   - Explicit field allowlist — no mass assignment from request body
 *   - Published + active machine eligibility gate
 *   - Structured error contract (typed codes, no raw DB errors exposed)
 *   - Transactional integrity: compensating delete if machine records fail
 */

import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { getProducts } from '@/lib/products';
import { generateReference } from '@/lib/auth';
import { SubmitEnquiryPayload } from '@/lib/enquiries/schema';
import {
  revalidateMachineEnquiry,
  buildCanonicalEnquiryData,
  resolveMachines,
} from '@/lib/machine-enquiries/service';
import {
  EnquiryError,
  buildErrorResponse,
  validateEnquiryPayload,
  sanitiseSubject,
  sanitiseMessage,
  sanitiseName,
  isEligibleMachine,
  checkRateLimit,
  getClientKey,
  MAX_PAYLOAD_BYTES,
} from '@/lib/enquiries/validation';

// ---------------------------------------------------------------------------
// POST /api/enquiries
// ---------------------------------------------------------------------------

export async function POST(req: NextRequest): Promise<NextResponse> {
  // ── 0. Rate limiting ──────────────────────────────────────────────────────
  const clientKey = getClientKey(req.headers);
  if (!checkRateLimit(clientKey)) {
    const err = new EnquiryError(
      'RATE_LIMITED',
      'Too many enquiry submissions. Please wait a moment before trying again.'
    );
    return NextResponse.json(buildErrorResponse(err), { status: 429 });
  }

  // ── 1. Payload size guard ─────────────────────────────────────────────────
  const contentLength = req.headers.get('content-length');
  if (contentLength && parseInt(contentLength, 10) > MAX_PAYLOAD_BYTES) {
    const err = new EnquiryError('VALIDATION_ERROR', 'Request payload is too large.');
    return NextResponse.json(buildErrorResponse(err), { status: 400 });
  }

  // ── 2. Parse body ─────────────────────────────────────────────────────────
  let body: SubmitEnquiryPayload;
  try {
    const raw = await req.text();
    if (raw.length > MAX_PAYLOAD_BYTES) {
      const err = new EnquiryError('VALIDATION_ERROR', 'Request payload is too large.');
      return NextResponse.json(buildErrorResponse(err), { status: 400 });
    }
    body = JSON.parse(raw);
  } catch {
    const err = new EnquiryError('VALIDATION_ERROR', 'Request body must be valid JSON.');
    return NextResponse.json(buildErrorResponse(err), { status: 400 });
  }

  // ── 3. Structural validation ──────────────────────────────────────────────
  const validation = validateEnquiryPayload(body);
  if (!validation.valid) {
    const err = new EnquiryError('VALIDATION_ERROR', 'Submission contains invalid fields.', validation.errors);
    return NextResponse.json(buildErrorResponse(err), { status: 400 });
  }

  try {
    // ── 4. Load authoritative catalogue ────────────────────────────────────
    let allProducts: ReturnType<typeof getProducts> extends Promise<infer T> ? T : never;
    try {
      allProducts = await getProducts();
    } catch (catalogueErr) {
      console.error('[API/Enquiries] Failed to load product catalogue:', catalogueErr);
      const err = new EnquiryError('SERVER_ERROR', 'Unable to retrieve machine catalogue. Please try again.');
      return NextResponse.json(buildErrorResponse(err), { status: 500 });
    }

    // ── 5. Extract machine identifiers from the allowlisted machines array ─
    // The server only reads `identifier` from each machine object.
    // Role and displayOrder from the client are advisory hints only — the
    // server will derive authoritative role from context.
    const rawIdentifiers: string[] = (body.machines ?? [])
      .map(m => (typeof m.identifier === 'string' ? m.identifier.trim() : ''))
      .filter(Boolean);

    // ── 6. Server-side machine resolution ───────────────────────────────────
    // Resolve identifiers against the authoritative catalogue.
    const resolvedMachines = resolveMachines(rawIdentifiers, allProducts);

    // Detect identifiers that couldn't be resolved
    if (rawIdentifiers.length > 0 && resolvedMachines.length === 0) {
      const err = new EnquiryError(
        'MACHINE_NOT_FOUND',
        'None of the submitted machine identifiers could be resolved in the Alkota catalogue.',
        rawIdentifiers.map(id => `Unresolved identifier: "${id}"`)
      );
      return NextResponse.json(buildErrorResponse(err), { status: 400 });
    }

    // ── 7. Published + active eligibility gate ──────────────────────────────
    // The server enforces this — draft, archived, or inactive machines are
    // not eligible for commercial enquiries, regardless of client claims.
    const ineligibleMachines = resolvedMachines.filter(m => !isEligibleMachine(m));
    if (ineligibleMachines.length > 0) {
      const err = new EnquiryError(
        'MACHINE_UNAVAILABLE',
        'One or more submitted machines are not currently available for commercial enquiry.',
        ineligibleMachines.map(m => `"${m.model_code}" (${m.slug}) is not published or active.`)
      );
      return NextResponse.json(buildErrorResponse(err), { status: 400 });
    }

    const eligibleMachines = resolvedMachines; // all passed gate

    // ── 8. Server-side revalidation ─────────────────────────────────────────
    // The server independently re-runs selectMachines() against stated
    // requirements. Client-claimed match statuses (claimedMatchStatus) are
    // used only for discrepancy detection — never to determine the stored outcome.
    let revalidation: ReturnType<typeof revalidateMachineEnquiry>;
    try {
      revalidation = revalidateMachineEnquiry(
        {
          source:
            body.source === 'MACHINE_SELECTOR'
              ? 'machine_selector'
              : body.source === 'MACHINE_COMPARISON'
              ? 'machine_comparison'
              : body.source === 'MACHINE_DETAIL'
              ? 'direct_machine'
              : 'general',
          machineIdentifiers: eligibleMachines.map(m => m.slug),
          rawRequirements: body.requirements,
        },
        eligibleMachines // only pass eligible machines, not full catalogue
      );
    } catch (revalErr) {
      console.error('[API/Enquiries] Server revalidation error:', revalErr);
      const err = new EnquiryError(
        'SELECTOR_ERROR',
        'Machine revalidation could not be completed. Please try again.'
      );
      return NextResponse.json(buildErrorResponse(err), { status: 500 });
    }

    // ── 9. Generate server-authoritative reference ──────────────────────────
    const reference = generateReference(body.source === 'MACHINE_SELECTOR' ? 'quote' : 'contact');

    // ── 10. Build canonical data ────────────────────────────────────────────
    // Sanitise all customer-supplied fields before they are handed to the
    // canonical builder. No raw body values reach the DB insert.
    const customerName = sanitiseName(body.customer.name)!; // validated above
    const customerEmail = body.customer.email.trim().toLowerCase();
    const customerPhone =
      typeof body.customer.phone === 'string' ? body.customer.phone.trim() || null : null;
    const customerCompany =
      typeof body.customer.company === 'string' ? body.customer.company.trim() || null : null;
    const customerPostcode =
      typeof body.customer.postcode === 'string' ? body.customer.postcode.trim() || null : null;
    const customerContactMethod = ['email', 'phone', 'either'].includes(
      body.customer.preferredContactMethod ?? ''
    )
      ? (body.customer.preferredContactMethod as 'email' | 'phone' | 'either')
      : 'either';

    const sanitisedSubject = sanitiseSubject(body.subject);
    const sanitisedMessage = sanitiseMessage(body.message);

    // Attribution — only allowlisted fields, stripped of any IDs the client
    // may have injected. dealer_id must be a UUID; validate format.
    const dealerIdRaw = body.attribution?.dealerId;
    const dealerId =
      dealerIdRaw &&
      typeof dealerIdRaw === 'string' &&
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(dealerIdRaw)
        ? dealerIdRaw
        : null;

    const attribution = {
      source_page:
        typeof body.attribution?.sourcePage === 'string'
          ? body.attribution.sourcePage.slice(0, 500)
          : null,
      utm_source:
        typeof body.attribution?.utmSource === 'string'
          ? body.attribution.utmSource.slice(0, 100)
          : null,
      utm_medium:
        typeof body.attribution?.utmMedium === 'string'
          ? body.attribution.utmMedium.slice(0, 100)
          : null,
      utm_campaign:
        typeof body.attribution?.utmCampaign === 'string'
          ? body.attribution.utmCampaign.slice(0, 100)
          : null,
      dealer_id: dealerId,
    };

    const siteReadiness = {
      site_power:
        typeof body.siteReadiness?.sitePower === 'string'
          ? body.siteReadiness.sitePower.slice(0, 100)
          : null,
      site_water:
        typeof body.siteReadiness?.siteWater === 'string'
          ? body.siteReadiness.siteWater.slice(0, 100)
          : null,
      timeline:
        typeof body.siteReadiness?.timeline === 'string'
          ? body.siteReadiness.timeline.slice(0, 100)
          : null,
      budget_range:
        typeof body.siteReadiness?.budgetRange === 'string'
          ? body.siteReadiness.budgetRange.slice(0, 100)
          : null,
    };

    const { enquiryRecord, machineRecords } = buildCanonicalEnquiryData({
      reference,
      source: body.source,
      context: body.context,
      customer: {
        name: customerName,
        email: customerEmail,
        phone: customerPhone,
        company: customerCompany,
        postcode: customerPostcode,
        preferredContactMethod: customerContactMethod,
      },
      subject: sanitisedSubject,
      message: sanitisedMessage,
      siteReadiness,
      rawRequirements: body.requirements,
      revalidation,
      attribution,
    });

    // ── 11. Build explicit DB insert payload ────────────────────────────────
    // MASS ASSIGNMENT PROTECTION: Every column is enumerated explicitly.
    // No object spread from request-origin data.
    // Audit fields (revalidated_at, selector_version, etc.) come exclusively
    // from server execution — they are never read from `body`.
    const dbPayload = {
      // Identity
      reference: enquiryRecord.reference,

      // Source & Context (controlled enums from server mapping)
      source: enquiryRecord.source,
      enquiry_context: enquiryRecord.enquiry_context,
      type: body.source === 'MACHINE_SELECTOR' ? 'quote' : 'contact',

      // Status — server-assigned, never client-supplied
      status: 'new' as const,

      // Customer (sanitised above)
      name: enquiryRecord.name,
      email: enquiryRecord.email,
      phone: enquiryRecord.phone ?? null,
      company: enquiryRecord.company ?? null,
      postcode: enquiryRecord.postcode ?? null,
      preferred_contact_method: enquiryRecord.preferred_contact_method ?? 'either',

      // Message
      subject: enquiryRecord.subject ?? null,
      message: enquiryRecord.message ?? null,

      // Site readiness
      site_power: enquiryRecord.site_power ?? null,
      site_water: enquiryRecord.site_water ?? null,
      timeline: enquiryRecord.timeline ?? null,
      budget_range: enquiryRecord.budget_range ?? null,

      // Structured Requirements (Option C: Minimal Hybrid)
      req_application: enquiryRecord.req_application ?? null,
      req_water_type: enquiryRecord.req_water_type ?? null,
      req_min_pressure_bar: enquiryRecord.req_min_pressure_bar ?? null,
      req_min_flow_lpm: enquiryRecord.req_min_flow_lpm ?? null,
      req_power_source: enquiryRecord.req_power_source ?? null,
      req_voltage: enquiryRecord.req_voltage ?? null,
      req_phase: enquiryRecord.req_phase ?? null,
      req_mobility: enquiryRecord.req_mobility ?? null,
      requirements: enquiryRecord.requirements ?? {},

      // Selection & Revalidation (SERVER-GENERATED — not from request body)
      selector_version: enquiryRecord.selector_version ?? null,
      selection_outcome: enquiryRecord.selection_outcome ?? null,
      revalidation_status: enquiryRecord.revalidation_status ?? 'VALID',
      discrepancy_detected: enquiryRecord.discrepancy_detected ?? false,
      discrepancy_details: enquiryRecord.discrepancy_details ?? [],
      requires_human_confirmation: enquiryRecord.requires_human_confirmation ?? false,
      unknown_criteria: enquiryRecord.unknown_criteria ?? [],
      confirmation_items: enquiryRecord.confirmation_items ?? [],
      revalidated_at: enquiryRecord.revalidated_at ?? null,

      // Attribution
      dealer_id: enquiryRecord.dealer_id ?? null,
      source_page: enquiryRecord.source_page ?? null,
      utm_source: enquiryRecord.utm_source ?? null,
      utm_medium: enquiryRecord.utm_medium ?? null,
      utm_campaign: enquiryRecord.utm_campaign ?? null,

      // Metadata (legacy compatibility for admin filters)
      metadata: {
        canonical_source: body.source,
        enquiry_context: enquiryRecord.enquiry_context,
        machines: revalidation.enquiryMachines,
        revalidation_result: revalidation.revalidationResult,
        site_readiness: siteReadiness,
        api_version: '7.1',
      },
    };

    // ── 12. Insert parent enquiry record ─────────────────────────────────────
    const { data: savedEnquiry, error: dbError } = await supabaseAdmin
      .from('enquiries')
      .insert(dbPayload)
      .select('id, reference, created_at')
      .single();

    if (dbError || !savedEnquiry) {
      // Do not expose raw DB error to client
      console.error('[API/Enquiries] Failed to insert enquiry record:', dbError);
      const err = new EnquiryError(
        'SERVER_ERROR',
        'Enquiry could not be saved. Please try again or contact us directly at sales@alkota.co.uk.'
      );
      return NextResponse.json(buildErrorResponse(err), { status: 500 });
    }

    const enquiryId = savedEnquiry.id;

    // ── 13. Insert enquiry_machines child records (transactional) ────────────
    // Explicit column mapping — no object spread from machineRecords directly.
    // If machine records fail to insert, compensating delete removes the orphan
    // parent enquiry and the request is returned as SERVER_ERROR.
    if (machineRecords.length > 0) {
      const machineRows = machineRecords.map((m, idx) => ({
        enquiry_id: enquiryId,
        machine_id: m.machine_id,
        product_id: m.product_id ?? null,
        model_code_snapshot: m.model_code_snapshot,
        machine_name_snapshot: m.machine_name_snapshot,
        slug_snapshot: m.slug_snapshot,
        category_snapshot: m.category_snapshot,
        role: m.role,
        display_order: idx,
        selection_status: m.selection_status ?? null,
        match_reasons: m.match_reasons ?? [],
        unknown_criteria: m.unknown_criteria ?? [],
        failure_reasons: m.failure_reasons ?? [],
        specs_snapshot: m.specs_snapshot ?? null,
      }));

      const { error: machinesError } = await supabaseAdmin
        .from('enquiry_machines')
        .insert(machineRows);

      if (machinesError) {
        // Child insert failed — perform compensating delete to prevent orphan parent
        console.error(
          '[API/Enquiries] enquiry_machines insert failed for enquiry %s — performing compensating delete. Error: %s',
          enquiryId,
          machinesError.message
        );

        const { error: deleteError } = await supabaseAdmin
          .from('enquiries')
          .delete()
          .eq('id', enquiryId);

        if (deleteError) {
          // Compensating delete also failed — log with full detail for ops triage
          console.error(
            '[API/Enquiries] CRITICAL: Compensating delete failed for enquiry %s. Orphan record exists. Delete error: %s',
            enquiryId,
            deleteError.message
          );
        }

        const err = new EnquiryError(
          'SERVER_ERROR',
          'Enquiry could not be saved with machine details. Please try again or contact us directly.'
        );
        return NextResponse.json(buildErrorResponse(err), { status: 500 });
      }
    }

    // ── 14. Success ──────────────────────────────────────────────────────────
    return NextResponse.json(
      {
        success: true,
        reference,
        enquiry_id: enquiryId,
        machine_count: machineRecords.length,
        requires_confirmation: revalidation.revalidationResult.requires_human_confirmation,
        message: 'Enquiry received and verified by Alkota UK engineering.',
      },
      { status: 200 }
    );
  } catch (unexpectedErr) {
    // Catch-all for genuinely unexpected errors.
    // Log full detail internally; never surface to client.
    console.error('[API/Enquiries] Unexpected server error:', unexpectedErr);
    const err = new EnquiryError(
      'SERVER_ERROR',
      'An unexpected error occurred. Please try again or contact us directly at sales@alkota.co.uk.'
    );
    return NextResponse.json(buildErrorResponse(err), { status: 500 });
  }
}
