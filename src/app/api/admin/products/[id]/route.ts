import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data, error } = await supabaseAdmin.from('products').select('*').eq('id', id).single();
  if (error) return NextResponse.json({ error: error.message }, { status: 404 });
  return NextResponse.json(data);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { updated_at: _, created_at: __, id: _id, ...update } = body;

    // Clean empty numeric fields
    const numericFields = ['flow_rate_gpm', 'flow_rate_lpm', 'pressure_psi', 'pressure_bar', 'weight_kg', 'max_temp_c', 'warranty_years', 'price', 'sort_order'];
    numericFields.forEach(f => {
      if (update[f] === '' || update[f] === undefined) update[f] = null;
      else if (typeof update[f] === 'string' && !isNaN(Number(update[f]))) update[f] = Number(update[f]);
    });

    const { data, error } = await supabaseAdmin
      .from('products')
      .update(update)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.warn('Direct product update failed, retrying with core columns:', error.message);
      const coreUpdate = { ...update };
      delete coreUpdate.pricing_type;
      delete coreUpdate.availability;
      delete coreUpdate.stock_status;
      delete coreUpdate.cutout_image_url;
      delete coreUpdate.no_index;
      delete coreUpdate.canonical_url;

      const { data: retryData, error: retryError } = await supabaseAdmin
        .from('products')
        .update(coreUpdate)
        .eq('id', id)
        .select()
        .single();

      if (retryError) return NextResponse.json({ error: retryError.message }, { status: 500 });
      return NextResponse.json(retryData);
    }

    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { error } = await supabaseAdmin.from('products').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

