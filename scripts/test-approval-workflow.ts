import { supabaseAdmin } from '../src/lib/supabase/server';
import { detectDuplicate } from '../src/lib/parts/duplicate-detector';

async function testApproval() {
  console.log('--- TESTING APPROVAL & PROMOTION WORKFLOW ---');

  // 1. Fetch one staged item from Dual Pumps
  const { data: stagedItems } = await supabaseAdmin
    .from('staged_supplier_products')
    .select('*, supplier:suppliers(id, slug, name, code, default_margin_pct)')
    .eq('supplier_sku', 'DP-BM25-01')
    .limit(1);

  if (!stagedItems || stagedItems.length === 0) {
    console.error('No staged item found for DP-BM25-01');
    process.exit(1);
  }

  const staged = stagedItems[0];
  console.log('Staged item found:', staged.supplier_sku, staged.raw_title);

  // 2. Promote to canonical parts
  const internalPartNumber = `DP-${staged.mpn}`;
  const costPrice = staged.cost_price;
  const sellingPrice = Number((costPrice / (1 - 0.35)).toFixed(2));

  const { data: part, error: pErr } = await supabaseAdmin
    .from('parts')
    .upsert({
      part_number: internalPartNumber,
      sku: staged.supplier_sku,
      mpn: staged.mpn,
      name: staged.raw_title,
      slug: `dual-pumps-${staged.mpn}`.toLowerCase(),
      description: staged.raw_description,
      category: staged.suggested_category || 'valves-unloaders',
      brand: 'dual-pumps',
      manufacturer: 'Dual Pumps Ltd',
      cost_price: costPrice,
      price: sellingPrice,
      in_stock: staged.in_stock,
      stock_quantity: staged.stock_quantity,
      stock_type: 'supplier_stock',
      supplier_stock_qty: staged.stock_quantity,
      preferred_supplier_id: staged.supplier_id,
      availability_status: 'in_stock',
      catalogue_source: 'supplier_import',
      active: true,
    }, { onConflict: 'part_number' })
    .select('id, part_number, price')
    .single();

  if (pErr || !part) {
    console.error('Failed to promote part:', pErr?.message);
    process.exit(1);
  }
  console.log('✅ Part promoted to canonical catalogue:', part.part_number, 'Price: £' + part.price);

  // 3. Link in supplier_products
  const { error: spErr } = await supabaseAdmin
    .from('supplier_products')
    .upsert({
      part_id: part.id,
      supplier_id: staged.supplier_id,
      supplier_sku: staged.supplier_sku,
      supplier_title: staged.raw_title,
      cost_price: costPrice,
      stock_quantity: staged.stock_quantity,
      in_stock: staged.in_stock,
      is_preferred: true,
      last_synced_at: new Date().toISOString(),
    }, { onConflict: 'supplier_id,supplier_sku' });

  if (spErr) {
    console.error('Failed to link supplier_product:', spErr.message);
  } else {
    console.log('✅ Supplier product relationship linked in supplier_products table');
  }

  // 4. Now test duplicate detection against this new canonical part!
  const { data: allParts } = await supabaseAdmin.from('parts').select('id, part_number, sku, mpn, name, brand, manufacturer');
  const dupCheck = detectDuplicate(
    {
      supplierSku: 'DP-BM25-01',
      rawTitle: 'Dual Pumps Bypass Manifold',
      rawMpn: 'BM25-STD',
      rawBrand: 'dual-pumps',
    },
    (allParts || []) as any[]
  );

  console.log('Duplicate check on re-ingested item:', dupCheck);
  if (dupCheck.isDuplicate && dupCheck.matchedPartId === part.id) {
    console.log('✅ PASSED: Re-ingested item is detected as duplicate of canonical part:', part.part_number);
  } else {
    console.error('❌ FAILED duplicate check');
    process.exit(1);
  }
}

testApproval();
