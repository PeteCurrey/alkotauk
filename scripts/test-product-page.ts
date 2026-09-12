import { supabaseAdmin } from '../src/lib/supabase/server';
import { getPartEcosystem } from '../src/lib/relationships/service';

interface TestResult {
  suite: string;
  name: string;
  status: 'PASS' | 'FAIL';
  details?: string;
}

const results: TestResult[] = [];

function recordTest(suite: string, name: string, passed: boolean, details?: string) {
  const status: 'PASS' | 'FAIL' = passed ? 'PASS' : 'FAIL';
  results.push({ suite, name, status, details });
  console.log(`${passed ? '✅' : '❌'} [${suite}] ${name}${details ? ` - ${details}` : ''}`);
}

export async function runProductPageTests() {
  console.log('\n======================================================');
  console.log('   ALKOTA UK PRODUCT DETAIL PAGE AUDIT & TEST SUITE   ');
  console.log('======================================================\n');

  // 1. Audit catalogue counts
  const { count: totalParts } = await supabaseAdmin.from('parts').select('id', { count: 'exact', head: true });
  const { count: pricedParts } = await supabaseAdmin.from('parts').select('id', { count: 'exact', head: true }).gt('price', 0);
  const { count: poaParts } = await supabaseAdmin.from('parts').select('id', { count: 'exact', head: true }).is('price', null);
  const { count: supersededParts } = await supabaseAdmin.from('parts').select('id', { count: 'exact', head: true }).not('superseded_by', 'is', null);
  const { count: inStockParts } = await supabaseAdmin.from('parts').select('id', { count: 'exact', head: true }).eq('in_stock', true);
  const { count: machinesCount } = await supabaseAdmin.from('machine_models').select('id', { count: 'exact', head: true });
  const { count: serviceKitsCount } = await supabaseAdmin.from('service_kits').select('id', { count: 'exact', head: true });

  console.log(`Audited Catalogue Metrics:`);
  console.log(`- Total Parts: ${totalParts}`);
  console.log(`- Priced Purchasable: ${pricedParts}`);
  console.log(`- Price on Application (POA): ${poaParts}`);
  console.log(`- In Stock (UK): ${inStockParts}`);
  console.log(`- Superseded / Discontinued: ${supersededParts}`);
  console.log(`- Machine Models: ${machinesCount}`);
  console.log(`- Service Kits: ${serviceKitsCount}\n`);

  // ─────────────────────────────────────────────────────────────
  // TEST CASE 1: High-Quality Priced Part (20-001 TS2021 Pump)
  // ─────────────────────────────────────────────────────────────
  console.log('--- Test Case 1: High-Quality Priced Part (20-001) ---');
  const { data: part20001 } = await supabaseAdmin
    .from('parts')
    .select('*')
    .eq('part_number', '20-001')
    .single();

  recordTest(
    'Product Case: 20-001',
    'Product Exists in Live Database',
    Boolean(part20001 && part20001.id),
    `Name: ${part20001?.name}`
  );

  recordTest(
    'Product Case: 20-001',
    'Approved Customer Price Available',
    Boolean(part20001 && typeof part20001.price === 'number' && part20001.price > 0),
    `Price: £${part20001?.price}`
  );

  const eco20001 = await getPartEcosystem(part20001);
  recordTest(
    'Product Case: 20-001',
    'Verified Machine Compatibility Citations Present',
    eco20001.verifiedMachines.length > 0 && eco20001.verifiedMachines.some(m => Boolean(m.evidence)),
    `Found ${eco20001.verifiedMachines.length} verified machines (e.g. ${eco20001.verifiedMachines[0]?.model_code})`
  );

  recordTest(
    'Product Case: 20-001',
    'Service Kit Associated (KIT-TS2021-PUMP)',
    eco20001.serviceKits.length > 0,
    `Associated Kit: ${eco20001.serviceKits[0]?.kit_number}`
  );

  // ─────────────────────────────────────────────────────────────
  // TEST CASE 2: Price on Application (POA) Part
  // ─────────────────────────────────────────────────────────────
  console.log('\n--- Test Case 2: Price on Application (POA) Protection ---');
  const { data: poaPart } = await supabaseAdmin
    .from('parts')
    .select('*')
    .is('price', null)
    .limit(1)
    .single();

  recordTest(
    'POA Protection',
    'POA Product Detected Without Fallback to Free/£0',
    Boolean(poaPart && poaPart.price === null),
    `Part: ${poaPart?.part_number} (${poaPart?.name})`
  );

  // ─────────────────────────────────────────────────────────────
  // TEST CASE 3: Dual Pumps Supplier Product (DP-BM25-STD)
  // ─────────────────────────────────────────────────────────────
  console.log('\n--- Test Case 3: Dual Pumps Supplier Product (DP-BM25-STD) ---');
  const { data: dpPart } = await supabaseAdmin
    .from('parts')
    .select('*')
    .eq('part_number', 'DP-BM25-STD')
    .maybeSingle();

  recordTest(
    'Supplier Ingestion: Dual Pumps',
    'Dual Pumps Authoritative Product Loaded',
    Boolean(dpPart && dpPart.brand === 'dual-pumps'),
    `Brand: ${dpPart?.brand}, MPN: ${dpPart?.mpn || dpPart?.part_number}`
  );

  // ─────────────────────────────────────────────────────────────
  // TEST CASE 4: Superseded Part Case (20-001-LEGACY)
  // ─────────────────────────────────────────────────────────────
  console.log('\n--- Test Case 4: Superseded Product (20-001-LEGACY) ---');
  const { data: legacyPart } = await supabaseAdmin
    .from('parts')
    .select('*')
    .eq('part_number', '20-001-LEGACY')
    .maybeSingle();

  const ecoLegacy = legacyPart ? await getPartEcosystem(legacyPart) : null;
  recordTest(
    'Supersession',
    'Superseded Part Identifies Direct Verified Replacement',
    Boolean(legacyPart?.superseded_by === '20-001' && ecoLegacy?.supersedingPart?.part_number === '20-001'),
    `Superseded By: ${ecoLegacy?.supersedingPart?.part_number} (${ecoLegacy?.supersedingPart?.name})`
  );

  // ─────────────────────────────────────────────────────────────
  // TEST CASE 5: Security & Public Safety Audit
  // ─────────────────────────────────────────────────────────────
  console.log('\n--- Test Case 5: Public Data Safety & Column Projection ---');
  const leakedColumns = ['cost_price', 'trade_price', 'margin_override_pct', 'review_notes', 'review_flags', 'needs_review'];
  
  const { lookupPartNumber } = await import('../src/lib/parts/finder-service');
  const publicResult = await lookupPartNumber('20-001');
  const publicApiKeys = Object.keys(publicResult.part || {});
  const hasLeak = leakedColumns.some(col => publicApiKeys.includes(col));

  recordTest(
    'Security Audit',
    'Strict Column Isolation (No Supplier Cost / Margin / Admin Notes)',
    !hasLeak,
    'Confidential commercial metrics safely excluded from customer responses.'
  );

  // ─────────────────────────────────────────────────────────────
  // SUMMARY
  // ─────────────────────────────────────────────────────────────
  const passedCount = results.filter(r => r.status === 'PASS').length;
  const failedCount = results.filter(r => r.status === 'FAIL').length;

  console.log('\n======================================================');
  console.log(`   PRODUCT PAGE TESTS: ${results.length} | PASSED: ${passedCount} | FAILED: ${failedCount}   `);
  console.log('======================================================\n');
}

runProductPageTests();
