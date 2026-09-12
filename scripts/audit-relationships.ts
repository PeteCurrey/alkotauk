import { supabaseAdmin } from '../src/lib/supabase/server';

async function auditRelationships() {
  console.log('=== AUDITING RELATIONSHIP & COMPATIBILITY ARCHITECTURE ===');
  
  const tables = [
    'part_machine_compatibility',
    'machine_models',
    'machine_families',
    'service_kits',
    'service_kit_items',
    'product_relationships',
    'part_relationships'
  ];

  for (const table of tables) {
    try {
      const { data, count, error } = await supabaseAdmin
        .from(table)
        .select('*', { count: 'exact' })
        .limit(2);

      if (error) {
        console.log(`❌ ${table}: ${error.message}`);
      } else {
        console.log(`✅ ${table}: ${count} rows. Sample keys:`, data && data[0] ? Object.keys(data[0]).join(', ') : 'empty table');
        if (data && data.length > 0) {
          console.log(`   Sample row:`, JSON.stringify(data[0]));
        }
      }
    } catch (e: any) {
      console.log(`💥 ${table}: ${e.message}`);
    }
  }

  // Also check parts table columns related to compatibility/relationships
  const { data: partSample } = await supabaseAdmin.from('parts').select('id, part_number, compatible_machines, replacement_part_ids, accessory_part_ids, related_part_ids, superseded_by').not('compatible_machines', 'is', null).limit(3);
  console.log('Sample parts with compatible_machines:', partSample);
}

auditRelationships();
