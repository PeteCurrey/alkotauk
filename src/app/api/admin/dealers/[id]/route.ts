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

    const { data: dealer, error } = await supabaseAdmin
      .from('dealers')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !dealer) {
      return NextResponse.json({ error: 'Dealer not found' }, { status: 404 });
    }

    const [usersRes, ordersRes, auditRes] = await Promise.all([
      supabaseAdmin.from('dealer_users').select('*').eq('dealer_id', id).order('created_at'),
      supabaseAdmin.from('orders').select('*').eq('dealer_id', id).order('created_at', { ascending: false }).limit(20),
      supabaseAdmin.from('dealer_audit_log').select('*').eq('dealer_id', id).order('created_at', { ascending: false }).limit(50),
    ]);

    return NextResponse.json({
      dealer,
      users: usersRes.data || [],
      orders: ordersRes.data || [],
      auditLog: auditRes.data || [],
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { action, actor = 'Alkota Admin' } = body;

    const { data: currentDealer, error: fetchErr } = await supabaseAdmin
      .from('dealers')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchErr || !currentDealer) {
      return NextResponse.json({ error: 'Dealer not found' }, { status: 404 });
    }

    // ─── ACTION: SUSPEND DEALER ─────────────────────────────────
    if (action === 'suspend') {
      const reason = body.reason?.trim() || 'Suspended by administrator';

      await supabaseAdmin
        .from('dealers')
        .update({
          portal_active: false,
          suspended_at: new Date().toISOString(),
          suspension_reason: reason,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);

      await logDealerAudit({
        action: 'dealer_suspended',
        actorId: actor,
        actorType: 'admin',
        entityType: 'dealer',
        entityId: id,
        dealerId: id,
        metadata: { reason },
      });

      return NextResponse.json({ ok: true, message: 'Dealer successfully suspended.' });
    }

    // ─── ACTION: REACTIVATE DEALER ──────────────────────────────
    if (action === 'reactivate') {
      await supabaseAdmin
        .from('dealers')
        .update({
          portal_active: true,
          suspended_at: null,
          suspension_reason: null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);

      await logDealerAudit({
        action: 'dealer_reactivated',
        actorId: actor,
        actorType: 'admin',
        entityType: 'dealer',
        entityId: id,
        dealerId: id,
      });

      return NextResponse.json({ ok: true, message: 'Dealer successfully reactivated.' });
    }

    // ─── ACTION: UPDATE TIER & COMMERCIAL TERMS ─────────────────
    if (action === 'update_terms') {
      const updates: any = {
        updated_at: new Date().toISOString(),
      };

      if (body.portal_tier) updates.portal_tier = body.portal_tier;
      if (body.credit_terms) updates.credit_terms = body.credit_terms;
      if (body.credit_limit !== undefined) updates.credit_limit = body.credit_limit ? parseFloat(body.credit_limit) : null;
      if (body.account_manager !== undefined) updates.account_manager = body.account_manager;
      if (body.internal_notes !== undefined) updates.internal_notes = body.internal_notes;

      await supabaseAdmin
        .from('dealers')
        .update(updates)
        .eq('id', id);

      await logDealerAudit({
        action: 'dealer_terms_updated',
        actorId: actor,
        actorType: 'admin',
        entityType: 'dealer',
        entityId: id,
        dealerId: id,
        metadata: updates,
      });

      return NextResponse.json({ ok: true, message: 'Dealer terms updated.' });
    }

    // ─── ACTION: INVITE ADDITIONAL USER ─────────────────────────
    if (action === 'invite_user') {
      const email = body.email?.trim().toLowerCase();
      const role = body.role || 'sales';
      const firstName = body.first_name?.trim() || '';
      const lastName = body.last_name?.trim() || '';
      const jobTitle = body.job_title?.trim() || '';

      if (!email) {
        return NextResponse.json({ error: 'User email is required' }, { status: 400 });
      }

      // Check if user already exists in this dealer
      const { data: existingUser } = await supabaseAdmin
        .from('dealer_users')
        .select('id')
        .eq('dealer_id', id)
        .eq('email', email)
        .maybeSingle();

      if (existingUser) {
        return NextResponse.json({ error: 'A user with this email already belongs to this dealer.' }, { status: 400 });
      }

      const invitationToken = crypto.randomBytes(32).toString('hex');

      const { data: newUser, error: insertErr } = await supabaseAdmin
        .from('dealer_users')
        .insert({
          dealer_id: id,
          email,
          first_name: firstName,
          last_name: lastName,
          job_title: jobTitle,
          role,
          active: true,
          invitation_token: invitationToken,
          invited_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (insertErr || !newUser) {
        return NextResponse.json({ error: insertErr?.message || 'Failed to create user' }, { status: 500 });
      }

      await logDealerAudit({
        action: 'user_invited',
        actorId: actor,
        actorType: 'admin',
        entityType: 'dealer_user',
        entityId: newUser.id,
        dealerId: id,
        metadata: { email, role, invitation_token: invitationToken },
      });

      return NextResponse.json({
        ok: true,
        message: `User ${email} invited.`,
        user: newUser,
        invitationUrl: `/dealer/invite/${invitationToken}`,
      });
    }

    return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
