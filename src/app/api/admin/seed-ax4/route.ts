import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  console.log('--- STARTING REMOTE AX4/XD4 MACHINE SEEDING ---');

  const machines = [
    {
      name: 'Alkota 311AX4',
      slug: 'alkota-311ax4',
      tagline: 'High pressure compact belt drive.',
      category: 'hot-water',
      series: 'AX4 Series',
      flow_rate_gpm: 3.0,
      flow_rate_lpm: 11.4,
      pressure_psi: 1100,
      pressure_bar: 76,
      power_source: 'belt',
      voltage: '230V',
      active: true,
      sort_order: 7,
      primary_image_url: '/assets/products/216ax4.png'
    },
    {
      name: 'Alkota 3305XD4',
      slug: 'alkota-3305xd4',
      tagline: 'Premium direct drive gas power.',
      category: 'hot-water',
      series: 'XD4 Series',
      flow_rate_gpm: 3.0,
      flow_rate_lpm: 11.4,
      pressure_psi: 3000,
      pressure_bar: 207,
      power_source: 'direct',
      voltage: 'Gas Engine',
      active: true,
      sort_order: 26,
      primary_image_url: '/assets/products/3305xd4.png'
    },
    {
      name: 'Alkota 3405XD4',
      slug: 'alkota-3405xd4',
      tagline: 'Extreme pressure direct drive.',
      category: 'hot-water',
      series: 'XD4 Series',
      flow_rate_gpm: 3.5,
      flow_rate_lpm: 13.2,
      pressure_psi: 4000,
      pressure_bar: 276,
      power_source: 'direct',
      voltage: 'Gas Engine',
      active: true,
      sort_order: 27,
      primary_image_url: '/assets/products/3405xd4.png'
    }
  ];

  const results: any[] = [];
  for (const machine of machines) {
    const { data, error } = await supabaseAdmin
      .from('products')
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
