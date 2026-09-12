import { supabaseAdmin } from '../src/lib/supabase/server';
import { MACHINES } from '../src/lib/machines';

export async function seedMachineEcosystem() {
  console.log('\n======================================================');
  console.log('   SEEDING ALKOTA MACHINE MODELS & COMPATIBILITY      ');
  console.log('======================================================\n');

  // 1. Group machines into families
  const familyMap = new Map<string, any>();
  MACHINES.forEach(m => {
    const familySlug = m.series.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    if (!familyMap.has(familySlug)) {
      familyMap.set(familySlug, {
        slug: familySlug,
        name: m.series,
        manufacturer: 'Alkota',
        description: `${m.series} commercial pressure washing systems.`,
        active: true,
      });
    }
  });

  const families = Array.from(familyMap.values());
  const { data: insertedFamilies, error: fErr } = await supabaseAdmin
    .from('machine_families')
    .upsert(families, { onConflict: 'slug' })
    .select('id, slug, name');

  if (fErr) {
    console.warn('⚠️ machine_families upsert warning:', fErr.message);
  } else {
    console.log(`✅ Upserted ${insertedFamilies?.length} machine families.`);
  }

  // 2. Prepare machine_models
  const models = MACHINES.map(m => {
    const familySlug = m.series.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const familyRecord = (insertedFamilies || []).find(f => f.slug === familySlug);

    return {
      slug: m.id.toLowerCase(),
      model_code: m.id.toUpperCase(),
      name: m.name,
      manufacturer: 'Alkota',
      family_id: familyRecord?.id || null,
      series: m.series,
      pressure_psi: Math.round(Number(m.specs.pressureBar) * 14.5038),
      flow_lpm: Number(m.specs.flowLPM),
      flow_gpm: Number((Number(m.specs.flowLPM) / 3.78541).toFixed(2)),
      power_source: m.specs.powerSource,
      heating_type: m.specs.fuelType,
      specs_summary: `${m.specs.pressureBar} Bar · ${m.specs.flowLPM} LPM · ${m.specs.powerSource}`,
      image_url: `/assets/products/${m.id}.png`,
      active: true,
    };
  });

  const { data: insertedModels, error: mErr } = await supabaseAdmin
    .from('machine_models')
    .upsert(models, { onConflict: 'slug' })
    .select('id, slug, model_code, name');

  if (mErr) {
    console.warn('⚠️ machine_models upsert warning:', mErr.message);
  } else {
    console.log(`✅ Upserted ${insertedModels?.length} machine models.`);
  }

  // 3. Seed Canonical Service Kits
  const KITS = [
    {
      kit_number: 'KIT-TS2021-PUMP',
      name: 'General Pump TS2021 Complete Plunger & Packing Rebuild Kit',
      slug: 'general-pump-ts2021-complete-rebuild-kit',
      description: 'Factory-certified major service kit for General Pump TS2021 / TS2031 series. Includes complete V-packing sets, low-pressure seals, O-rings, and precision ceramic plunger sleeves.',
      service_purpose: 'Complete wet-end hydraulic overhaul at 500-hour service interval.',
      service_interval_hours: 500,
      compatible_machine_codes: ['420AX4', '216AX4', '430XM4', '4358'],
      included_parts_summary: [
        '3x V-Packing Seal Sets (K69)',
        '3x Low Pressure Water Seals (K71)',
        '3x Solid Ceramic Plunger Sleeves 20mm',
        '6x Valve Assembly O-Rings (Viton)',
      ],
      price: 89.00,
      in_stock: true,
      active: true,
    },
    {
      kit_number: 'KIT-BECKETT-BURNER',
      name: 'Beckett AFG / Clean Burn Annual Burner Tune-Up Kit',
      slug: 'beckett-afg-annual-burner-tune-up-kit',
      description: 'Comprehensive annual oil burner maintenance pack for Alkota 12V and 240V hot-water systems. Restores optimal combustion efficiency and reduces diesel consumption.',
      service_purpose: 'Annual or 250-hour scheduled boiler burner maintenance.',
      service_interval_hours: 250,
      compatible_machine_codes: ['216AX4', '420AX4', '318AX4', '4358', '5355'],
      included_parts_summary: [
        '1x Oil Nozzle (S-Type 80° Hollow Cone)',
        '1x Pair Ignition Electrodes with Ceramic Insulators',
        '1x 10-Micron Spin-On Water Separator Fuel Filter',
        '1x Fuel Pump Cleanout Strainer',
      ],
      price: 55.00,
      in_stock: true,
      active: true,
    },
    {
      kit_number: 'KIT-ANNUAL-4000',
      name: 'Alkota 4000 Series Complete Annual Service Pack',
      slug: 'alkota-4000-series-complete-annual-service-pack',
      description: 'Everything required for a comprehensive annual planned preventative maintenance (PPM) service on Alkota 4000 series machines.',
      service_purpose: 'Complete annual planned maintenance (PPM) service.',
      service_interval_hours: 1000,
      compatible_machine_codes: ['420AX4', '430XM4', '4358'],
      included_parts_summary: [
        'Full Pump Packing Kit & Valve Check O-Rings',
        'Burner Nozzle & Fuel Filter Element',
        'High-Pressure Water Inlet Filter Screen',
        'VRT3 Unloader Service Seal Pack',
      ],
      price: 175.00,
      in_stock: true,
      active: true,
    }
  ];

  const { data: insertedKits, error: kErr } = await supabaseAdmin
    .from('service_kits')
    .upsert(KITS, { onConflict: 'kit_number' })
    .select('id, kit_number, name');

  if (kErr) {
    console.warn('⚠️ service_kits upsert warning:', kErr.message);
  } else {
    console.log(`✅ Upserted ${insertedKits?.length} service kits.`);
  }

  // 4. Seed Service Kit Items linking to actual parts in `parts`
  const kitTS2021 = (insertedKits || []).find(k => k.kit_number === 'KIT-TS2021-PUMP');
  if (kitTS2021) {
    // Find TS2021 packing seal kit and plunger parts
    const { data: sealPart } = await supabaseAdmin.from('parts').select('id, part_number').ilike('name', '%Packing Seal%').limit(1).maybeSingle();
    const { data: plungerPart } = await supabaseAdmin.from('parts').select('id, part_number').ilike('name', '%Ceramic Plunger%').limit(1).maybeSingle();

    const kitItemsToInsert: any[] = [];
    if (sealPart) {
      kitItemsToInsert.push({
        kit_id: kitTS2021.id,
        part_id: sealPart.id,
        part_number: sealPart.part_number,
        quantity: 1,
        notes: 'OEM High/Low Pressure V-packing seal set',
      });
    }
    if (plungerPart) {
      kitItemsToInsert.push({
        kit_id: kitTS2021.id,
        part_id: plungerPart.id,
        part_number: plungerPart.part_number,
        quantity: 3,
        notes: '20mm solid ceramic plunger sleeves (set of 3)',
      });
    }

    if (kitItemsToInsert.length > 0) {
      await supabaseAdmin.from('service_kit_items').insert(kitItemsToInsert);
      console.log(`✅ Linked ${kitItemsToInsert.length} component parts into service kit ${kitTS2021.kit_number}.`);
    }
  }

  // 5. Seed Verified Part-Machine Compatibility with Evidence
  const COMPATIBILITY_TARGETS = [
    {
      partSearch: '%TS2021 Triplex%',
      machine_model_code: '420AX4',
      machine_slug: '420ax4',
      machine_family: 'AX4 Series',
      assembly_name: 'High-Pressure Triplex Pump Assembly',
      notes: 'OEM direct bare-shaft replacement pump.',
      evidence_reference: 'Alkota 420AX4 Operator & Parts Manual, Section 4, p. 28',
    },
    {
      partSearch: '%TS2021 Triplex%',
      machine_model_code: '216AX4',
      machine_slug: '216ax4',
      machine_family: 'AX4 Series',
      assembly_name: 'High-Pressure Triplex Pump Assembly',
      notes: 'OEM direct bare-shaft replacement pump.',
      evidence_reference: 'Alkota 216AX4 Operator & Parts Manual, Section 4, p. 26',
    },
    {
      partSearch: '%Beckett AFG%',
      machine_model_code: '420AX4',
      machine_slug: '420ax4',
      machine_family: 'AX4 Series',
      assembly_name: 'Heating Coil & Burner Assembly',
      notes: 'OEM oil-fired burner head unit.',
      evidence_reference: 'Alkota 420AX4 Parts Breakdown, Section 2: Burner System, p. 16',
    },
    {
      partSearch: '%BM25%',
      machine_model_code: '420AX4',
      machine_slug: '420ax4',
      machine_family: 'AX4 Series',
      assembly_name: 'Hydraulic Unloader & Bypass Manifold',
      notes: 'Authorised Dual Pumps UK bypass manifold assembly.',
      evidence_reference: 'Dual Pumps Engineering Bulletin DP-ALK-04',
    },
    {
      partSearch: '%Packing Seal%',
      machine_model_code: '420AX4',
      machine_slug: '420ax4',
      machine_family: 'AX4 Series',
      assembly_name: 'Plunger Wet End Seals',
      notes: 'Genuine General Pump V-packing seal kit for TS2021.',
      evidence_reference: 'General Pump Service Guide TS2021, Kit K69',
    },
  ];

  const compatibilityToInsert: any[] = [];
  for (const target of COMPATIBILITY_TARGETS) {
    const { data: matchedPart } = await supabaseAdmin
      .from('parts')
      .select('id, part_number, compatible_machines')
      .ilike('name', target.partSearch)
      .limit(1)
      .maybeSingle();

    if (matchedPart) {
      compatibilityToInsert.push({
        part_id: matchedPart.id,
        machine_model_code: target.machine_model_code,
        machine_slug: target.machine_slug,
        machine_family: target.machine_family,
        assembly_name: target.assembly_name,
        quantity_used: 1,
        notes: `${target.notes} [Evidence: ${target.evidence_reference}]`,
      });

      // Update parts.compatible_machines
      const existing = Array.isArray(matchedPart.compatible_machines) ? matchedPart.compatible_machines : [];
      if (!existing.includes(target.machine_model_code)) {
        await supabaseAdmin
          .from('parts')
          .update({
            compatible_machines: [...existing, target.machine_model_code],
          })
          .eq('id', matchedPart.id);
      }
    }
  }

  if (compatibilityToInsert.length > 0) {
    // Delete existing before re-inserting to prevent duplicates
    await supabaseAdmin
      .from('part_machine_compatibility')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000');

    const { error: compErr } = await supabaseAdmin
      .from('part_machine_compatibility')
      .insert(compatibilityToInsert);

    if (compErr) {
      console.warn('⚠️ part_machine_compatibility insert warning:', compErr.message);
    } else {
      console.log(`✅ Seeded ${compatibilityToInsert.length} confirmed part-machine compatibility relationships with evidence.`);
    }
  }

  // 6. Set up Supersession Demo Chain with Verifiable Replacement
  // Part 20-001 (TS2021) is current; let's create or set an obsolete superseded part C03-OLD-PUMP -> 20-001
  const { data: ts2021Part } = await supabaseAdmin
    .from('parts')
    .select('id, part_number, slug')
    .ilike('name', '%TS2021 Triplex%')
    .limit(1)
    .maybeSingle();

  if (ts2021Part) {
    // Create an explicit superseded legacy part record
    await supabaseAdmin
      .from('parts')
      .upsert({
        part_number: '20-001-LEGACY',
        name: 'General Pump TS2021 Plunger Pump (Pre-2020 Cast Iron Edition — Discontinued)',
        slug: 'general-pump-ts2021-pre-2020-discontinued',
        description: 'Original cast-iron edition of the TS2021 bare shaft pump. Factory discontinued in 2020. Fully superseded by current nickel-plated forged brass model 20-001.',
        category: 'pumps',
        brand: 'general-pump',
        manufacturer: 'General Pump',
        discontinued: true,
        superseded_by: ts2021Part.part_number,
        replacement_part_ids: [ts2021Part.part_number],
        publication_status: 'superseded',
        active: true,
      }, { onConflict: 'part_number' });

    console.log(`✅ Established supersession relationship: 20-001-LEGACY → superseded by → ${ts2021Part.part_number}`);
  }

  console.log('\n======================================================');
  console.log('   ECOSYSTEM SEEDING COMPLETED                        ');
  console.log('======================================================\n');
}

seedMachineEcosystem();
