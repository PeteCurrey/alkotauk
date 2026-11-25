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
  const source = searchParams.get('source');
  const search = searchParams.get('search');

  const countOnly = searchParams.get('countOnly') === 'true';

  const buildQuery = (selectExpr: string) => {
    let q = supabaseAdmin
      .from('enquiries')
      .select(selectExpr, { count: countOnly ? 'exact' : undefined, head: countOnly })
      .order('created_at', { ascending: false });

    if (status && status !== 'all') q = q.eq('status', status);
    if (type && type !== 'all') q = q.eq('type', type);
    if (source && source !== 'all') q = q.eq('source', source);
    if (search) q = q.or(`name.ilike.%${search}%,email.ilike.%${search}%,company.ilike.%${search}%,reference.ilike.%${search}%`);
    return q;
  };

  let { data, count, error } = await buildQuery('*, enquiry_machines(*)');
  if (error) {
    // Fallback if enquiry_machines relation or source column is not yet migrated
    let fallbackQ = supabaseAdmin
      .from('enquiries')
      .select('*', { count: countOnly ? 'exact' : undefined, head: countOnly })
      .order('created_at', { ascending: false });
    if (status && status !== 'all') fallbackQ = fallbackQ.eq('status', status);
    if (type && type !== 'all') fallbackQ = fallbackQ.eq('type', type);
    if (search) fallbackQ = fallbackQ.or(`name.ilike.%${search}%,email.ilike.%${search}%,company.ilike.%${search}%,reference.ilike.%${search}%`);
    const fallbackRes = await fallbackQ;
    data = fallbackRes.data;
    count = fallbackRes.count;
    error = fallbackRes.error;
  }

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (countOnly) return NextResponse.json({ count: count ?? 0 });
  return NextResponse.json(data || []);
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
