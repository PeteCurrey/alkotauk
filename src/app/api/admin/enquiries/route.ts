import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { verifyToken, COOKIE_NAME, generateReference } from '@/lib/auth';

async function requireAdmin(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return !!(await verifyToken(token));
}

export async function GET(req: NextRequest) {
  if (!(await requireAdmin(req))) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status');
  const type = searchParams.get('type');
  const search = searchParams.get('search');

  let query = supabaseAdmin.from('enquiries').select('*').order('created_at', { ascending: false });

  if (status && status !== 'all') query = query.eq('status', status);
  if (type && type !== 'all') query = query.eq('type', type);
  if (search) query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,company.ilike.%${search}%,reference.ilike.%${search}%`);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  // Public — no auth required (form submissions from the site)
  try {
    const body = await req.json();
    const reference = generateReference(body.type || 'contact');

    const { data, error } = await supabaseAdmin.from('enquiries').insert({
      type: body.type || 'contact',
      name: body.name,
      email: body.email,
      company: body.company,
      phone: body.phone,
      subject: body.subject,
      message: body.message,
      metadata: body.metadata ?? {},
      reference,
    }).select().single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true, reference, id: data.id });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
