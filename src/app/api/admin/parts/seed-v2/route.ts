import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { verifyToken, COOKIE_NAME } from '@/lib/auth';
import { PARTS_CATALOGUE_V2 } from '@/lib/parts/catalogue-seed-v2';

export async function POST(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('parts')
      .upsert(PARTS_CATALOGUE_V2, { onConflict: 'slug', ignoreDuplicates: false })
      .select('id, part_number, name, brand, category');

    if (error) {
      console.error('Supabase seeding error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ 
      ok: true, 
      seeded: data?.length ?? 0, 
      parts: data 
    });
  } catch (err: any) {
    console.error('Unexpected seeding error:', err);
    return NextResponse.json({ error: err.message || 'Seeding failed' }, { status: 500 });
  }
}
