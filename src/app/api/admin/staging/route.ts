import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { verifyToken, COOKIE_NAME } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status');
  const supplierId = searchParams.get('supplier_id');
  const query = searchParams.get('q');

  try {
    let q = supabaseAdmin
      .from('staged_supplier_products')
      .select('*, supplier:suppliers(name, slug)')
      .order('created_at', { ascending: false })
      .limit(100);

    if (status && status !== 'all') {
      q = q.eq('import_status', status);
    }
    if (supplierId && supplierId !== 'all') {
      q = q.eq('supplier_id', supplierId);
    }
    if (query) {
      q = q.or(`raw_title.ilike.%${query}%,supplier_sku.ilike.%${query}%,raw_brand.ilike.%${query}%`);
    }

    const { data: staged, error } = await q;

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ staged: staged || [] });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
