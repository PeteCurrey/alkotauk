import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { supabaseAdmin } from '@/lib/supabase/server';
import { logDealerAudit } from '@/lib/dealer-portal';

export const revalidate = 0;

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { data: application, error } = await supabaseAdmin
      .from('dealer_applications')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !application) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    // Fetch related audit logs
    const { data: auditLogs } = await supabaseAdmin
      .from('dealer_audit_log')
      .select('*')
      .eq('entity_type', 'dealer_application')
      .eq('entity_id', id)
      .order('created_at', { ascending: false });

    return NextResponse.json({
      application,
      auditLogs: auditLogs || [],
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { action, reviewer = 'Alkota Administrator' } = body;

    // Fetch the current application
    const { data: application, error: appErr } = await supabaseAdmin
      .from('dealer_applications')
      .select('*')
      .eq('id', id)
      .single();

    if (appErr || !application) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    // ─── ACTION: APPROVE DEALER ────────────────────────────────
    if (action === 'approve') {
      const portalTier = body.tier || 'standard';
      const accountManager = body.account_manager || null;
      const creditTerms = body.credit_terms || 'proforma';
      const creditLimit = body.credit_limit ? parseFloat(body.credit_limit) : null;
      const adminNotes = body.admin_notes || null;

      // 1. Generate slug for the dealer organisation
      const baseSlug = (application.trading_name || application.company_name)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      const uniqueSuffix = crypto.randomBytes(3).toString('hex');
      const slug = `${baseSlug}-${uniqueSuffix}`;

      // 2. Create the dealer organisation in `dealers`
      const { data: newDealer, error: dealerErr } = await supabaseAdmin
        .from('dealers')
        .insert({
          name: application.company_name,
          slug,
          status: 'active',
          tier: 'regional_partner',
          portal_active: true,
          portal_tier: portalTier,
          account_manager: accountManager,
          credit_terms: creditTerms,
          credit_limit: creditLimit,
          phone: application.phone,
          email: application.email,
          website: application.website,
          address_line1: application.address_line1,
          address_line2: application.address_line2,
          town: application.town,
          county: application.county || '',
          postcode: application.postcode,
          country: application.country || 'United Kingdom',
          company_reg: application.company_reg,
          vat_number: application.vat_number,
          approved_at: new Date().toISOString(),
          approved_by: reviewer,
          internal_notes: adminNotes,
          mobile_service_vans: application.service_van_count || 1,
        })
        .select()
        .single();

      if (dealerErr || !newDealer) {
        console.error('Failed to create dealer organisation:', dealerErr);
        return NextResponse.json(
          { error: `Failed to create dealer record: ${dealerErr?.message || 'Database error'}` },
          { status: 500 }
        );
      }

      // 3. Create primary dealer address
      await supabaseAdmin.from('dealer_addresses').insert({
        dealer_id: newDealer.id,
        address_type: 'registered',
        address_name: 'Main Registered Office',
        company_name: application.company_name,
        address_line1: application.address_line1,
        address_line2: application.address_line2,
        town: application.town,
        county: application.county,
        postcode: application.postcode,
        country: application.country || 'United Kingdom',
        is_default: true,
      });

      // 4. Generate invitation token and create primary user
      const invitationToken = crypto.randomBytes(32).toString('hex');
      const nameParts = (application.contact_name || '').trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      const { data: newUser, error: userErr } = await supabaseAdmin
        .from('dealer_users')
        .insert({
          dealer_id: newDealer.id,
          email: application.email.toLowerCase(),
          first_name: firstName,
          last_name: lastName,
          job_title: application.job_title || 'Owner / Principal',
          phone: application.phone || application.mobile,
          role: 'owner',
          active: true,
          invitation_token: invitationToken,
          invited_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (userErr || !newUser) {
        console.error('Failed to create primary dealer user:', userErr);
        // Rollback dealer insertion
        await supabaseAdmin.from('dealers').delete().eq('id', newDealer.id);
        return NextResponse.json(
          { error: `Failed to create dealer user: ${userErr?.message || 'Database error'}` },
          { status: 500 }
        );
      }

      // 5. Update application status
      await supabaseAdmin
        .from('dealer_applications')
        .update({
          status: 'approved',
          reviewed_by: reviewer,
          reviewed_at: new Date().toISOString(),
          converted_dealer_id: newDealer.id,
          admin_notes: adminNotes,
        })
        .eq('id', id);

      // 6. Log to immutable audit trail
      await logDealerAudit({
        action: 'application_approved',
        actorId: reviewer,
        actorType: 'admin',
        entityType: 'dealer_application',
        entityId: id,
        dealerId: newDealer.id,
        metadata: {
          dealer_name: newDealer.name,
          dealer_id: newDealer.id,
          tier: portalTier,
          user_id: newUser.id,
          user_email: newUser.email,
        },
      });

      await logDealerAudit({
        action: 'dealer_created',
        actorId: reviewer,
        actorType: 'admin',
        entityType: 'dealer',
        entityId: newDealer.id,
        dealerId: newDealer.id,
        metadata: {
          application_id: id,
          initial_tier: portalTier,
        },
      });

      await logDealerAudit({
        action: 'user_invited',
        actorId: reviewer,
        actorType: 'admin',
        entityType: 'dealer_user',
        entityId: newUser.id,
        dealerId: newDealer.id,
        metadata: {
          email: newUser.email,
          role: 'owner',
          invitation_token: invitationToken,
        },
      });

      return NextResponse.json({
        ok: true,
        message: 'Dealer successfully approved and organisation provisioned.',
        dealer: newDealer,
        user: newUser,
        invitationToken,
        invitationUrl: `/dealer/invite/${invitationToken}`,
      });
    }

    // ─── ACTION: REQUEST MORE INFORMATION ──────────────────────
    if (action === 'request_info') {
      const message = body.message?.trim();
      if (!message) {
        return NextResponse.json({ error: 'A specific explanation message is required.' }, { status: 400 });
      }

      await supabaseAdmin
        .from('dealer_applications')
        .update({
          status: 'more_info_required',
          more_info_message: message,
          more_info_requested_at: new Date().toISOString(),
          reviewed_by: reviewer,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);

      await logDealerAudit({
        action: 'application_more_info_requested',
        actorId: reviewer,
        actorType: 'admin',
        entityType: 'dealer_application',
        entityId: id,
        metadata: { message },
      });

      return NextResponse.json({
        ok: true,
        message: 'Application marked as requiring more information.',
      });
    }

    // ─── ACTION: REJECT APPLICATION ───────────────────────────
    if (action === 'reject') {
      const reason = body.reason?.trim();
      if (!reason) {
        return NextResponse.json({ error: 'A rejection reason is required.' }, { status: 400 });
      }

      await supabaseAdmin
        .from('dealer_applications')
        .update({
          status: 'rejected',
          decision_reason: reason,
          reviewed_by: reviewer,
          reviewed_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);

      await logDealerAudit({
        action: 'application_rejected',
        actorId: reviewer,
        actorType: 'admin',
        entityType: 'dealer_application',
        entityId: id,
        metadata: { reason },
      });

      return NextResponse.json({
        ok: true,
        message: 'Application marked as rejected.',
      });
    }

    // ─── ACTION: MARK UNDER REVIEW ────────────────────────────
    if (action === 'mark_under_review') {
      await supabaseAdmin
        .from('dealer_applications')
        .update({
          status: 'under_review',
          reviewed_by: reviewer,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);

      await logDealerAudit({
        action: 'application_reviewed',
        actorId: reviewer,
        actorType: 'admin',
        entityType: 'dealer_application',
        entityId: id,
        metadata: { status: 'under_review' },
      });

      return NextResponse.json({ ok: true, message: 'Application set to under review.' });
    }

    return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 });
  } catch (err: any) {
    console.error('Error handling dealer application action:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
