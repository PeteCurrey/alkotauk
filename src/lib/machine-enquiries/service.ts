import { Product } from '@/lib/products';
import { selectMachines } from '@/lib/machine-selection/engine';
import { SelectionRequirements, MatchStatus } from '@/lib/machine-selection/types';
import {
  MachineEnquirySource,
  EnquiryMachineItem,
  EvaluatedMachineResult,
  ServerRevalidationResult,
} from './types';

/**
 * Normalise a model code or slug for resilient matching.
 */
export function normaliseIdentifier(id: string): string {
  return id
    .toLowerCase()
    .trim()
    .replace(/^alkota-/, '')
    .replace(/[^a-z0-9]/g, '');
}

/**
 * Resolve an array of machine identifiers (slugs, model codes) against the canonical catalogue.
 */
export function resolveMachines(identifiers: string[], allMachines: Product[]): Product[] {
  const resolved: Product[] = [];
  const seenSlugs = new Set<string>();

  for (const rawId of identifiers) {
    if (!rawId || typeof rawId !== 'string') continue;
    const clean = rawId.trim();
    if (!clean) continue;

    const norm = normaliseIdentifier(clean);

    const match = allMachines.find(m => {
      if (m.slug === clean || m.slug.toLowerCase() === clean.toLowerCase()) return true;
      if (m.model_code === clean || m.model_code?.toLowerCase() === clean.toLowerCase()) return true;
      if (normaliseIdentifier(m.slug) === norm) return true;
      if (m.model_code && normaliseIdentifier(m.model_code) === norm) return true;
      return false;
    });

    if (match && !seenSlugs.has(match.slug)) {
      seenSlugs.add(match.slug);
      resolved.push(match);
    }
  }

  return resolved;
}

/**
 * Parse and normalise partial or raw requirements into a valid SelectionRequirements object.
 */
export function normaliseRequirements(raw: any): SelectionRequirements | null {
  if (!raw || typeof raw !== 'object') return null;

  const app = raw.application || raw.app || 'FLEET_VEHICLE_CLEANING';
  const water = raw.waterType || raw.water || 'not_sure';
  const power = raw.powerSource || raw.power || 'any';
  const mobility = raw.mobility || raw.mob || 'any';

  return {
    application: app,
    waterType: water,
    minPressureBar: raw.minPressureBar != null ? Number(raw.minPressureBar) : (raw.press != null ? Number(raw.press) : null),
    minFlowLpm: raw.minFlowLpm != null ? Number(raw.minFlowLpm) : (raw.flow != null ? Number(raw.flow) : null),
    powerSource: power,
    voltage: raw.voltage || raw.volt || 'any',
    phase: raw.phase != null ? (raw.phase === 1 || raw.phase === 3 ? raw.phase : 'any') : 'any',
    mobility: mobility,
    tankRequired: Boolean(raw.tankRequired),
    minTankCapacityL: raw.minTankCapacityL ? Number(raw.minTankCapacityL) : null,
    preferences: Array.isArray(raw.preferences) ? raw.preferences : (raw.prefs ? String(raw.prefs).split(',') : []),
    unitSystem: raw.unitSystem === 'imperial' ? 'imperial' : 'metric',
  };
}

/**
 * Generate site confirmation checklist items based on machine engineering specifications.
 */
export function generateConfirmationChecklist(
  machines: Product[],
  unknowns: string[]
): string[] {
  const items: string[] = [];

  for (const m of machines) {
    // 3-Phase power verification
    if (m.phase === 3 || (m.voltage && m.voltage.includes('400'))) {
      const item = `Verify 400V 3-phase industrial power supply and commando socket availability for ${m.model_code}`;
      if (!items.includes(item)) items.push(item);
    }

    // 110V site supply verification
    if (m.voltage && (m.voltage.includes('110') || m.voltage.includes('115'))) {
      const item = `Verify 110V site transformer continuous rating (minimum 32A/5kVA) for ${m.model_code}`;
      if (!items.includes(item)) items.push(item);
    }

    // Diesel / Kerosene burner ventilation
    if (m.heating_fuel && /diesel|oil|kerosene/i.test(m.heating_fuel)) {
      const item = `Confirm indoor vs outdoor installation: ${m.model_code} burner requires adequate ventilation or flue extraction if indoors`;
      if (!items.includes(item)) items.push(item);
    }

    // High water flow rate inlet verification
    if (m.flow_rate_lpm && m.flow_rate_lpm >= 15) {
      const item = `Verify site water mains inlet flow delivers minimum ${m.flow_rate_lpm} L/min (or buffer tank capacity)`;
      if (!items.includes(item)) items.push(item);
    }
  }

  // Include any specific unknowns from the engine evaluation
  for (const u of unknowns) {
    const item = `Confirm specification with customer: ${u}`;
    if (!items.includes(item)) items.push(item);
  }

  return items;
}

export interface RevalidationOptions {
  source?: MachineEnquirySource;
  machineIdentifiers: string[];
  rawRequirements?: any;
  claimedMatchStatus?: Record<string, MatchStatus>;
}

export interface RevalidationExecutionResult {
  revalidationResult: ServerRevalidationResult;
  enquiryMachines: EnquiryMachineItem[];
}

/**
 * Authoritative Server-Side Machine Enquiry Revalidation Service.
 * Re-runs selectMachines to prevent client spoofing and identify site factors needing confirmation.
 */
export function revalidateMachineEnquiry(
  options: RevalidationOptions,
  allMachines: Product[]
): RevalidationExecutionResult {
  const source: MachineEnquirySource = options.source || 'general';
  const resolvedMachines = resolveMachines(options.machineIdentifiers, allMachines);
  const parsedRequirements = normaliseRequirements(options.rawRequirements);

  const evaluatedMachines: EvaluatedMachineResult[] = [];
  const enquiryMachines: EnquiryMachineItem[] = [];
  const allUnknowns: string[] = [];
  const discrepancies: string[] = [];

  let isConflicted = false;

  if (parsedRequirements && (source === 'machine_selector' || options.rawRequirements)) {
    // Run deterministic selection engine over ONLY the resolved machines.
    // This is more accurate than querying the full catalogue's truncated top-3 shortlist,
    // because selectMachines caps the shortlist at 3 and misses machines ranked 4th+.
    const perMachineResult = selectMachines(resolvedMachines, parsedRequirements);
    isConflicted = Boolean(perMachineResult.isConflicted);

    for (const m of resolvedMachines) {
      const strongMatch = perMachineResult.shortlist.find(s => s.machine.slug === m.slug);
      const possibleMatch = perMachineResult.possibleMatches.find(p => p.machine.slug === m.slug);
      const unmet = perMachineResult.unmetMachines.find(u => u.machine.slug === m.slug);

      let serverStatus: MatchStatus;
      let reasons: string[] = [];
      let unknowns: string[] = [];
      let failureReasons: string[] = [];

      if (strongMatch) {
        serverStatus = 'STRONG_MATCH';
        reasons = strongMatch.explanation.reasons;
        unknowns = strongMatch.explanation.unknowns;
      } else if (possibleMatch) {
        serverStatus = 'POSSIBLE_MATCH';
        reasons = possibleMatch.explanation.reasons;
        unknowns = possibleMatch.explanation.unknowns;
      } else if (unmet) {
        serverStatus = 'DOES_NOT_MEET';
        reasons = unmet.explanation.reasons;
        unknowns = unmet.explanation.unknowns;
        failureReasons = unmet.explanation.failureReasons;
      } else if (!m.active || m.status !== 'published') {
        serverStatus = 'DOES_NOT_MEET';
        failureReasons = ['Machine is not an active, published production model'];
      } else {
        // Machine is active/published but didn't appear in any result — treat as POSSIBLE_MATCH
        // (can happen if the engine filtered for non-applicable categories)
        serverStatus = 'POSSIBLE_MATCH';
        unknowns = ['Specification could not be fully verified against stated requirements'];
      }

      allUnknowns.push(...unknowns);

      // Check client claimed status vs server
      const claimed = options.claimedMatchStatus?.[m.slug] || options.claimedMatchStatus?.[m.model_code];
      if (claimed && claimed !== serverStatus) {
        discrepancies.push(
          `Client claimed '${claimed}' for ${m.model_code}, but server revalidation determined '${serverStatus}'.`
        );
      }

      const evalResult: EvaluatedMachineResult = {
        slug: m.slug,
        model_code: m.model_code,
        name: m.name,
        category: m.category,
        server_match_status: serverStatus,
        specs_verified: !!(m.pressure_bar && m.flow_rate_lpm),
        reasons,
        unknowns,
        failure_reasons: failureReasons,
      };
      evaluatedMachines.push(evalResult);

      enquiryMachines.push({
        id: m.id,
        slug: m.slug,
        model_code: m.model_code,
        name: m.name,
        category: m.category,
        series: m.series,
        pressure_bar: m.pressure_bar,
        flow_rate_lpm: m.flow_rate_lpm,
        power_source: m.power_source,
        heating_fuel: m.heating_fuel,
        voltage: m.voltage,
        phase: m.phase,
        primary_image_url: m.primary_image_url,
        server_match_status: serverStatus,
        reasons,
        unknowns,
        failure_reasons: failureReasons,
      });
    }
  } else {
    // Direct machine or comparison enquiry without a questionnaire run
    for (const m of resolvedMachines) {
      const verifiedReasons: string[] = [];
      if (m.pressure_bar) verifiedReasons.push(`${m.pressure_bar} BAR working pressure`);
      if (m.flow_rate_lpm) verifiedReasons.push(`${m.flow_rate_lpm} L/min flow rate`);
      if (m.power_source) verifiedReasons.push(`Power: ${m.power_source}`);
      if (m.heating_fuel) verifiedReasons.push(`Heating: ${m.heating_fuel}`);
      if (m.voltage) verifiedReasons.push(`Electrical: ${m.voltage}${m.phase ? ` (${m.phase}-Phase)` : ''}`);

      const evalResult: EvaluatedMachineResult = {
        slug: m.slug,
        model_code: m.model_code,
        name: m.name,
        category: m.category,
        server_match_status: 'STRONG_MATCH',
        specs_verified: !!(m.pressure_bar && m.flow_rate_lpm),
        reasons: verifiedReasons,
        unknowns: [],
        failure_reasons: [],
      };
      evaluatedMachines.push(evalResult);

      enquiryMachines.push({
        id: m.id,
        slug: m.slug,
        model_code: m.model_code,
        name: m.name,
        category: m.category,
        series: m.series,
        pressure_bar: m.pressure_bar,
        flow_rate_lpm: m.flow_rate_lpm,
        power_source: m.power_source,
        heating_fuel: m.heating_fuel,
        voltage: m.voltage,
        phase: m.phase,
        primary_image_url: m.primary_image_url,
        server_match_status: 'STRONG_MATCH',
        reasons: verifiedReasons,
        unknowns: [],
        failure_reasons: [],
      });
    }
  }

  const confirmationItems = generateConfirmationChecklist(resolvedMachines, allUnknowns);

  const revalidationResult: ServerRevalidationResult = {
    timestamp: new Date().toISOString(),
    source,
    is_valid: resolvedMachines.length > 0,
    has_requirements: !!parsedRequirements,
    evaluated_machines: evaluatedMachines,
    requires_human_confirmation: confirmationItems.length > 0 || evaluatedMachines.some(e => e.server_match_status === 'POSSIBLE_MATCH'),
    confirmation_items: confirmationItems,
    discrepancy_detected: discrepancies.length > 0,
    discrepancy_details: discrepancies.length > 0 ? discrepancies : undefined,
    audit_note: resolvedMachines.length > 0
      ? `Revalidated ${resolvedMachines.length} machine(s) against ${parsedRequirements ? 'structured requirements' : 'canonical specifications'}.`
      : 'No valid machines resolved from inbound identifiers.',
  };

  return {
    revalidationResult,
    enquiryMachines,
  };
}

import {
  EnquirySource,
  EnquiryContext,
  SelectionOutcome,
  CanonicalEnquiryRecord,
  CanonicalEnquiryMachineRecord,
  MachineRole
} from '@/lib/enquiries/schema';

/**
 * Map raw or legacy source string to controlled EnquirySource
 */
export function mapToCanonicalSource(raw?: string): EnquirySource {
  if (!raw) return 'GENERAL';
  const s = raw.toUpperCase().trim();
  if (s.includes('SELECTOR') || s === 'HELP_ME_CHOOSE') return 'MACHINE_SELECTOR';
  if (s.includes('COMPARE') || s.includes('COMPARISON')) return 'MACHINE_COMPARISON';
  if (s.includes('PRICING') || s.includes('DETAIL') || s === 'DIRECT_MACHINE') return 'MACHINE_DETAIL';
  if (s.includes('CATALOGUE') || s.includes('FLEET')) return 'MACHINE_CATALOGUE';
  if (s.includes('PART')) return 'PARTS';
  if (s.includes('ATTACH')) return 'ATTACHMENTS';
  if (s.includes('CHEM')) return 'CHEMICALS';
  if (s.includes('DEALER')) return 'DEALER';
  return 'GENERAL';
}

/**
 * Map source and context to controlled EnquiryContext
 */
export function mapToCanonicalContext(source: EnquirySource, rawContext?: string): EnquiryContext {
  if (rawContext) {
    const c = rawContext.toUpperCase().trim();
    if (c === 'DIRECT_MACHINE' || c === 'MACHINE_SELECTION' || c === 'MACHINE_COMPARISON' || c === 'GENERAL_PRODUCT' || c === 'GENERAL_ENQUIRY') {
      return c as EnquiryContext;
    }
  }
  if (source === 'MACHINE_SELECTOR') return 'MACHINE_SELECTION';
  if (source === 'MACHINE_COMPARISON') return 'MACHINE_COMPARISON';
  if (source === 'MACHINE_DETAIL') return 'DIRECT_MACHINE';
  if (source === 'PARTS' || source === 'ATTACHMENTS' || source === 'CHEMICALS') return 'GENERAL_PRODUCT';
  return 'GENERAL_ENQUIRY';
}

/**
 * Determine overall selection outcome across evaluated machines
 */
export function computeSelectionOutcome(
  hasRequirements: boolean,
  machines: EnquiryMachineItem[]
): SelectionOutcome {
  if (!hasRequirements || machines.length === 0) return 'NOT_APPLICABLE';
  if (machines.some(m => m.server_match_status === 'STRONG_MATCH')) return 'STRONG_MATCH';
  if (machines.some(m => m.server_match_status === 'POSSIBLE_MATCH')) return 'POSSIBLE_MATCH';
  return 'NO_VERIFIED_MATCH';
}

/**
 * Build normalised canonical data structures ready for DB insertion into
 * enquiries and enquiry_machines tables.
 */
export function buildCanonicalEnquiryData(params: {
  reference: string;
  source?: string;
  context?: string;
  customer: {
    name: string;
    email: string;
    phone?: string | null;
    company?: string | null;
    postcode?: string | null;
    preferredContactMethod?: 'email' | 'phone' | 'either';
  };
  subject?: string | null;
  message?: string | null;
  siteReadiness?: {
    site_power?: string | null;
    site_water?: string | null;
    timeline?: string | null;
    budget_range?: string | null;
  };
  rawRequirements?: any;
  revalidation: RevalidationExecutionResult;
  attribution?: {
    source_page?: string | null;
    utm_source?: string | null;
    utm_medium?: string | null;
    utm_campaign?: string | null;
    dealer_id?: string | null;
  };
  selectorVersion?: string;
}): {
  enquiryRecord: Partial<CanonicalEnquiryRecord>;
  machineRecords: Array<Omit<CanonicalEnquiryMachineRecord, 'id' | 'enquiry_id'>>;
} {
  const canonicalSource = mapToCanonicalSource(params.source);
  const canonicalContext = mapToCanonicalContext(canonicalSource, params.context);
  const reqs = normaliseRequirements(params.rawRequirements);
  const hasReqs = Boolean(reqs && (canonicalSource === 'MACHINE_SELECTOR' || params.rawRequirements));
  const selectionOutcome = computeSelectionOutcome(hasReqs, params.revalidation.enquiryMachines);

  // Determine machine role
  const defaultRole: MachineRole = 
    canonicalContext === 'MACHINE_COMPARISON' ? 'COMPARISON' :
    canonicalContext === 'MACHINE_SELECTION' ? 'SHORTLIST' : 'PRIMARY';

  // Extract all unique unknown criteria keys
  const unknownSet = new Set<string>();
  for (const m of params.revalidation.enquiryMachines) {
    if (m.unknowns) {
      for (const u of m.unknowns) {
        if (/voltage|phase|electrical/i.test(u)) unknownSet.add('electrical');
        else if (/pressure/i.test(u)) unknownSet.add('pressure');
        else if (/flow/i.test(u)) unknownSet.add('flow');
        else unknownSet.add(u.toLowerCase().replace(/[^a-z0-9_]/g, '_'));
      }
    }
  }

  const enquiryRecord: Partial<CanonicalEnquiryRecord> = {
    reference: params.reference,
    source: canonicalSource,
    enquiry_context: canonicalContext,
    status: 'new',
    name: params.customer.name.trim(),
    email: params.customer.email.trim().toLowerCase(),
    phone: params.customer.phone?.trim() || null,
    company: params.customer.company?.trim() || null,
    postcode: params.customer.postcode?.trim() || null,
    preferred_contact_method: params.customer.preferredContactMethod || 'either',
    subject: params.subject?.trim() || null,
    message: params.message?.trim() || null,

    // Site readiness
    site_power: params.siteReadiness?.site_power || null,
    site_water: params.siteReadiness?.site_water || null,
    timeline: params.siteReadiness?.timeline || null,
    budget_range: params.siteReadiness?.budget_range || null,

    // Structured Requirements (Option C: Minimal Hybrid)
    req_application: reqs?.application || null,
    req_water_type: reqs?.waterType || null,
    req_min_pressure_bar: reqs?.minPressureBar != null ? Number(reqs.minPressureBar) : null,
    req_min_flow_lpm: reqs?.minFlowLpm != null ? Number(reqs.minFlowLpm) : null,
    req_power_source: reqs?.powerSource || null,
    req_voltage: reqs?.voltage || null,
    req_phase: reqs?.phase != null ? String(reqs.phase) : null,
    req_mobility: reqs?.mobility || null,
    requirements: reqs ? {
      application: reqs.application,
      waterType: reqs.waterType,
      minPressureBar: reqs.minPressureBar,
      minFlowLpm: reqs.minFlowLpm,
      powerSource: reqs.powerSource,
      voltage: reqs.voltage,
      phase: reqs.phase,
      mobility: reqs.mobility,
      tankRequired: reqs.tankRequired,
      minTankCapacityL: reqs.minTankCapacityL,
      preferences: reqs.preferences,
      unitSystem: reqs.unitSystem,
    } : {},

    // Selection & Revalidation
    selector_version: params.selectorVersion || (hasReqs ? 'v6.3' : null),
    selection_outcome: selectionOutcome,
    revalidation_status: params.revalidation.revalidationResult.discrepancy_detected
      ? 'DISCREPANCY_DETECTED'
      : (params.revalidation.revalidationResult.is_valid ? 'VALID' : 'SKIPPED'),
    discrepancy_detected: params.revalidation.revalidationResult.discrepancy_detected,
    discrepancy_details: params.revalidation.revalidationResult.discrepancy_details || [],
    requires_human_confirmation: params.revalidation.revalidationResult.requires_human_confirmation,
    unknown_criteria: Array.from(unknownSet),
    confirmation_items: params.revalidation.revalidationResult.confirmation_items,
    revalidated_at: params.revalidation.revalidationResult.timestamp,

    // Attribution
    dealer_id: params.attribution?.dealer_id || null,
    source_page: params.attribution?.source_page || null,
    utm_source: params.attribution?.utm_source || null,
    utm_medium: params.attribution?.utm_medium || null,
    utm_campaign: params.attribution?.utm_campaign || null,
  };

  const machineRecords: Array<Omit<CanonicalEnquiryMachineRecord, 'id' | 'enquiry_id'>> = 
    params.revalidation.enquiryMachines.map((m, index) => {
      const isUuid = m.id && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(m.id);
      return {
        machine_id: m.slug,
        product_id: isUuid ? m.id : null,
        model_code_snapshot: m.model_code,
        machine_name_snapshot: m.name,
        slug_snapshot: m.slug,
        category_snapshot: m.category,
        role: defaultRole,
        display_order: index,
        selection_status: m.server_match_status || null,
        match_reasons: m.reasons || [],
        unknown_criteria: m.unknowns || [],
        failure_reasons: m.failure_reasons || [],
        specs_snapshot: {
          pressure_bar: m.pressure_bar,
          flow_rate_lpm: m.flow_rate_lpm,
          power_source: m.power_source,
          heating_fuel: m.heating_fuel,
          voltage: m.voltage,
          phase: m.phase,
        },
      };
    });

  return {
    enquiryRecord,
    machineRecords,
  };
}
