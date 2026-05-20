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

    // 3. Products
    const productsToInsert = MACHINES.map(m => {
      let cat = m.type as string;
      if (cat === 'parts-washers') cat = 'parts-washer';
      if (cat === 'wash-plants') cat = 'wash-plant';

      const gpm = parseFloat(m.specs.flowLPM) / 3.785;
      const psi = parseInt(m.specs.pressureBar) * 14.5;

      return {
        slug: m.slug.split('/').pop() || m.id,
        name: m.name,
        series: m.series,
        category: cat,
        tagline: m.description.split('.')[0] || m.name,
        description: m.description,
        featured: false,
        active: true,

        // Specifications
        flow_rate_gpm: Math.round(gpm * 10) / 10 || null,
        flow_rate_lpm: parseFloat(m.specs.flowLPM) || null,
        pressure_psi: Math.round(psi) || null,
        pressure_bar: parseInt(m.specs.pressureBar) || null,
        power_source: m.specs.driveType || null,
        heating_fuel: m.specs.fuelType || null,
        voltage: m.specs.voltageOptions || null,
        portable: !m.name.toLowerCase().includes('stationary') && !m.name.toLowerCase().includes('cabinet'),
        weight_kg: parseFloat(m.specs.weightKG) || null,
        certifications: ['CE', 'UKCA'],
        industries: ['agriculture', 'fleet-transport', 'construction', 'manufacturing'],
        
        // Media
        primary_image_url: `/assets/products/${m.id}.png`,
        sort_order: 0
      };
    });

    const { error: productsError } = await supabaseAdmin.from('products').upsert(productsToInsert, { onConflict: 'slug' });
    if (productsError) throw productsError;

    return NextResponse.json({ success: true, message: 'Migration and Product Sync completed successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
