import { supabaseAdmin } from '../src/lib/supabase/server';

async function checkNewTables() {
  const { data: audit, error: aErr } = await supabaseAdmin.from('part_audit_log').select('id').limit(1);
  console.log('part_audit_log:', { exists: !aErr, error: aErr?.message });

  const { data: scm, error: sErr } = await supabaseAdmin.from('supplier_category_mappings').select('id').limit(1);
  console.log('supplier_category_mappings:', { exists: !sErr, error: sErr?.message });
}

checkNewTables();
