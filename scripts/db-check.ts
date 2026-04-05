import { supabaseAdmin } from '../src/lib/supabase/server';

async function check() {
  const { data: machines } = await supabaseAdmin.from('machines').select('count');
  const { data: industries } = await supabaseAdmin.from('industries').select('count');
  const { data: applications } = await supabaseAdmin.from('applications').select('count');
  
  console.log('--- DATABASE STATUS ---');
  console.log('Machines count:', machines?.[0]?.count || 0);
  console.log('Industries count:', industries?.[0]?.count || 0);
  console.log('Applications count:', applications?.[0]?.count || 0);
}

check();
