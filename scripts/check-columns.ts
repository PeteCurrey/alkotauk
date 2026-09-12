import { supabaseAdmin } from '../src/lib/supabase/server';

async function checkCols() {
  const { data: bData, error: bErr } = await supabaseAdmin.from('import_batches').select('*').limit(1);
  console.log('import_batches cols:', bData ? Object.keys(bData[0] || {}) : bErr?.message);

  const { data: sData, error: sErr } = await supabaseAdmin.from('staged_supplier_products').select('*').limit(1);
  console.log('staged_supplier_products cols:', sData ? Object.keys(sData[0] || {}) : sErr?.message);
}

checkCols();
