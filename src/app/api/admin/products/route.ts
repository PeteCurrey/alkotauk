import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const category = searchParams.get('category');
  const q = searchParams.get('q');
  const status = searchParams.get('status');

  let query = supabaseAdmin
    .from('products')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (category && category !== 'all') {
    query = query.eq('category', category);
  }
  if (status === 'active') {
    query = query.eq('active', true);
  } else if (status === 'draft') {
    query = query.eq('active', false);
  }
  if (q) {
    query = query.ilike('name', `%${q}%`);
  }

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data || []);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id: _, created_at: __, updated_at: ___, ...payload } = body;

    // Clean empty numeric fields
    const numericFields = ['flow_rate_gpm', 'flow_rate_lpm', 'pressure_psi', 'pressure_bar', 'weight_kg', 'max_temp_c', 'warranty_years', 'price', 'sort_order'];
    numericFields.forEach(f => {
      if (payload[f] === '' || payload[f] === undefined) payload[f] = null;
      else if (typeof payload[f] === 'string' && !isNaN(Number(payload[f]))) payload[f] = Number(payload[f]);
    });

    const { data, error } = await supabaseAdmin
      .from('products')
      .insert(payload)
      .select()
      .single();

    if (error) {
      console.warn('Direct product insert failed, retrying with core columns:', error.message);
      // Fallback: strip optional extended columns if schema cache hasn't synced
      const corePayload = { ...payload };
      delete corePayload.pricing_type;
      delete corePayload.availability;
      delete corePayload.stock_status;
      delete corePayload.cutout_image_url;
      delete corePayload.no_index;
      delete corePayload.canonical_url;

      const { data: retryData, error: retryError } = await supabaseAdmin
        .from('products')
        .insert(corePayload)
        .select()
        .single();

      if (retryError) return NextResponse.json({ error: retryError.message }, { status: 500 });
      return NextResponse.json(retryData, { status: 201 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
