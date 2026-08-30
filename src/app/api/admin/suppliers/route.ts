import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { verifyToken, COOKIE_NAME } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const { data: suppliers, error } = await supabaseAdmin
      .from('suppliers')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('name', { ascending: true });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ suppliers: suppliers || [] });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const slug = (body.slug || body.name).toLowerCase().replace(/[^a-z0-9-]/g, '-');

    const { data, error } = await supabaseAdmin
      .from('suppliers')
      .insert({
        slug,
        name: body.name,
        code: body.code || null,
        supplier_type: body.supplier_type || 'wholesaler',
        account_number: body.account_number || null,
        contact_name: body.contact_name || null,
        email: body.email || null,
        phone: body.phone || null,
        website_url: body.website_url || null,
        portal_url: body.portal_url || null,
        default_margin_pct: parseFloat(body.default_margin_pct) || 35.0,
        feed_type: body.feed_type || 'manual',
        feed_url: body.feed_url || null,
        integration_method: body.integration_method || 'manual',
        api_endpoint: body.api_endpoint || null,
        auth_method: body.auth_method || 'none',
        credential_ref: body.credential_ref || null,
        sync_frequency_hours: parseInt(body.sync_frequency_hours, 10) || 24,
        notes: body.notes || null,
        active: body.active ?? true,
      })
      .select('*')
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ supplier: data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
