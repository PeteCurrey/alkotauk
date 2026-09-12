import { supabaseAdmin } from '../src/lib/supabase/server';

async function checkMachinesTable() {
  const { data: machines, count, error } = await supabaseAdmin.from('machines').select('*', { count: 'exact' }).limit(5);
  console.log('machines table count:', count, 'error:', error?.message);
  if (machines && machines.length > 0) {
    console.log('Sample machine:', JSON.stringify(machines[0]));
    console.log('Machine model_codes/slugs:', machines.map(m => ({ id: m.id, name: m.name, model_code: m.model_code, slug: m.slug, series: m.series })));
  }
}

checkMachinesTable();
