import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';

export const revalidate = 0;

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const { data, error } = await supabaseAdmin
      .from('orders')
      .update({
        ...body,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ ok: true, id, ...body });
    }

    return NextResponse.json({ ok: true, order: data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
