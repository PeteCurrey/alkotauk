import { supabaseAdmin } from '@/lib/supabase/server';
import { MACHINES } from '@/lib/machines';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    console.log('--- STARTING MIGRATION VIA API ---');
    
    // 1. Industries
    const industries = [
      { name: 'Agriculture', slug: 'agriculture', icon: 'Leaf', description: 'Specialised cleaning for tractors, combines, and livestock housing.' },
      { name: 'Transport & Fleet', slug: 'transport-fleet', icon: 'Truck', description: 'Rapid turnaround for HGV fleets, distribution centres, and logistics hubs.' },
      { name: 'Food & Beverage', slug: 'food-beverage', icon: 'Utensils', description: 'Food-safe cleaning solutions for production lines and kitchens.' },
      { name: 'Industrial & Manufacturing', slug: 'industrial', icon: 'Factory', description: 'Heavy-duty equipment cleaning for factories and floor bays.' },
      { name: 'Maritime & Offshore', slug: 'maritime', icon: 'Anchor', description: 'Salt-resistant machinery for docks and shipyards.' }
    ];

    await supabaseAdmin.from('industries').upsert(industries, { onConflict: 'slug' });

    // 2. Applications
    const applications = [
      { name: 'Heavy Equipment', slug: 'heavy-equipment', icon: 'HardHat', description: 'Powerful degreasing for earthmovers and mining machinery.' },
      { name: 'Fleet Washing', slug: 'fleet-washing', icon: 'Truck', description: 'High-volume soap and rinse cycles for rapid maintenance.' },
      { name: 'Food Hygiene', slug: 'food-hygiene', icon: 'Droplets', description: 'High-temperature sanitization for food processing.' },
      { name: 'Institutional', slug: 'institutional', icon: 'Home', description: 'Quiet, low-emission cleaning for schools and hospitals.' },
      { name: 'Facility Maintenance', slug: 'facility-maintenance', icon: 'Settings', description: 'Restoring industrial floors and workshop bays.' },
      { name: 'Bespoke Systems', slug: 'bespoke-systems', icon: 'GitMerge', description: 'Custom-engineered wash plants and stationary systems.' }
    ];

    await supabaseAdmin.from('applications').upsert(applications, { onConflict: 'slug' });

    // 3. Machines
    const machinesToInsert = MACHINES.map(m => ({
      name: m.name,
      model_code: m.id,
      slug: m.slug.split('/').pop(),
      tagline: m.description.split('.')[0],
      description: m.description,
      category: m.type,
      series: m.series,
      psi: parseInt(m.specs.pressureBar) * 14.5 || 2000,
      gpm: parseFloat(m.specs.flowLPM) / 3.785 || 3.0,
      drive: m.specs.driveType,
      voltage: m.specs.voltageOptions,
      engine: m.specs.engine,
      burner_fuel: m.specs.fuelType,
      weight: m.specs.weightKG,
      features: m.highlights,
      image_url: `/assets/products/${m.id}.png`,
      active: true
    }));

    await supabaseAdmin.from('machines').upsert(machinesToInsert, { onConflict: 'slug' });

    return NextResponse.json({ success: true, message: 'Migration completed successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
