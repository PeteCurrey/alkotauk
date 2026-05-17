import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  console.log('--- STARTING REMOTE AX4/XD4 MACHINE SEEDING ---');

  const machines = [
    {
      name: 'Alkota 311AX4',
      model_code: '311AX4',
      slug: 'alkota-311ax4',
      tagline: 'High pressure compact belt drive.',
      category: 'hot-water',
      series: 'AX4 Series',
      gpm: 3.0,
      psi: 1100,
      drive: 'belt',
      voltage: '230V',
      price: 3950.00,
      active: true,
      sort_order: 7,
      image_url: '/assets/products/216ax4.png' // Fallback to compatible AX4 product image
    },
    {
      name: 'Alkota 3305XD4',
      model_code: '3305XD4',
      slug: 'alkota-3305xd4',
      tagline: 'Premium direct drive gas power.',
      category: 'hot-water',
      series: 'XD4 Series',
      gpm: 3.0,
      psi: 3000,
      drive: 'direct',
      voltage: 'Gas Engine',
      price: 4850.00,
      active: true,
      sort_order: 26,
      image_url: '/assets/products/3305xd4.png' // Fallback to compatible XD4 product image
    },
    {
      name: 'Alkota 3405XD4',
      model_code: '3405XD4',
      slug: 'alkota-3405xd4',
      tagline: 'Extreme pressure direct drive.',
      category: 'hot-water',
      series: 'XD4 Series',
      gpm: 3.5,
      psi: 4000,
      drive: 'direct',
      voltage: 'Gas Engine',
      price: 5250.00,
      active: true,
      sort_order: 27,
      image_url: '/assets/products/3405xd4.png' // Fallback to compatible XD4 product image
    }
  ];

  const results = [];
  for (const machine of machines) {
    const { data, error } = await supabaseAdmin
      .from('machines')
      .upsert(machine, { onConflict: 'slug' })
      .select();

    if (error) {
      console.error(`Failed to upsert ${machine.name}:`, error.message);
      results.push({ name: machine.name, status: 'failed', error: error.message });
    } else {
      console.log(`Successfully upserted ${machine.name}`);
      results.push({ name: machine.name, status: 'success' });
    }
  }

  return NextResponse.json({ success: true, results });
}
