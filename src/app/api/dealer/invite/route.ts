import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { supabaseAdmin } from '@/lib/supabase/server';
import { logDealerAudit } from '@/lib/dealer-portal';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json({ error: 'Invitation token is required' }, { status: 400 });
    }

    const { data: user, error } = await supabaseAdmin
      .from('dealer_users')
      .select('*, dealer:dealers(*)')
      .eq('invitation_token', token)
      .eq('active', true)
      .single();

    if (error || !user) {
      return NextResponse.json({ error: 'Invalid or expired invitation link.' }, { status: 404 });
    }

    const dealer = user.dealer;
    if (!dealer || !dealer.portal_active || dealer.suspended_at) {
      return NextResponse.json(
        { error: 'This dealer organisation is not currently active. Please contact Alkota UK.' },
        { status: 403 }
      );
    }

    return NextResponse.json({
      ok: true,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      phone: user.phone,
      jobTitle: user.job_title,
      role: user.role,
      companyName: dealer.name,
      tier: dealer.portal_tier || 'standard',
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { token, password, first_name, last_name, phone } = body;

    if (!token) {
      return NextResponse.json({ error: 'Invitation token is required' }, { status: 400 });
    }

    if (!password || password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters long.' }, { status: 400 });
    }

    // Verify token
    const { data: user, error: userErr } = await supabaseAdmin
      .from('dealer_users')
      .select('*, dealer:dealers(*)')
      .eq('invitation_token', token)
      .eq('active', true)
      .single();

    if (userErr || !user) {
      return NextResponse.json({ error: 'Invalid or expired invitation token.' }, { status: 404 });
    }

    const dealer = user.dealer;
    if (!dealer || !dealer.portal_active || dealer.suspended_at) {
      return NextResponse.json({ error: 'Dealer organisation is not currently active.' }, { status: 403 });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Update user record
    const { error: updateErr } = await supabaseAdmin
      .from('dealer_users')
      .update({
        password_hash: passwordHash,
        first_name: first_name?.trim() || user.first_name,
        last_name: last_name?.trim() || user.last_name,
        phone: phone?.trim() || user.phone,
        invitation_token: null, // Invalidate token upon successful activation
        invitation_accepted_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id);

    if (updateErr) {
      return NextResponse.json({ error: 'Failed to complete account activation.' }, { status: 500 });
    }

    // Log activation in audit trail
    await logDealerAudit({
      action: 'user_activated',
      actorId: user.id,
      actorType: 'dealer_user',
      entityType: 'dealer_user',
      entityId: user.id,
      dealerId: dealer.id,
      metadata: { email: user.email },
    });

    return NextResponse.json({
      ok: true,
      message: 'Account successfully activated. You may now log in to the Dealer Portal.',
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
