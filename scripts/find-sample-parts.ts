import { supabaseAdmin } from '../src/lib/supabase/server';

async function findSampleParts() {
  const { data } = await supabaseAdmin
    .from('parts')
    .select('id, part_number, name')
    .or('name.ilike.%TS2021%,name.ilike.%pump%,name.ilike.%unloader%,name.ilike.%burner%,part_number.ilike.%TS2021%,part_number.ilike.%SE-%')
    .limit(10);
  console.log('Sample parts found:', data);
}

findSampleParts();
