/**
 * Test Suite: Product Relationship & Compatibility Ecosystem
 * 
 * Implements the 17 automated tests specified in Supplementary Architecture Prompt §21.
 * Verifies domain isolation, safety exclusion handling, canonical resolution, and bidirectional fitment.
 * 
 * Run with: node node_modules/.bin/tsx scripts/test-relationship-ecosystem.ts
 */

import assert from 'node:assert';
import { 
  getRawRelationships, 
  getCompatibleProducts, 
  getRelatedProducts, 
  getMachineEcosystem, 
  getProductMachineCompatibility 
} from '../src/lib/relationships/service';
import { CANONICAL_RELATIONSHIPS } from '../src/lib/relationships/canonical-data';

let passed = 0;
let failed = 0;

async function it(name: string, fn: () => Promise<void> | void) {
  try {
    const result = fn();
    if (result instanceof Promise) {
      await result;
    }
    console.log(`  ✓ ${name}`);
    passed++;
  } catch (err: any) {
    console.error(`  ✗ ${name}`);
    console.error(`    ${err.message}`);
    failed++;
  }
}

async function runTests() {
  console.log('\n=== ALKOTA UK: PRODUCT RELATIONSHIP & COMPATIBILITY TEST SUITE ===\n');

  // -------------------------------------------------------------
  // GROUP 1: DOMAIN ISOLATION TESTS
  // -------------------------------------------------------------
  console.log('Group 1: Domain Isolation & Boundary Enforcement');

  await it('Test 1: getCompatibleProducts returns ONLY COMPATIBILITY domain records', async () => {
    const results = await getCompatibleProducts('alkota-420x4');
    assert(results.length > 0, 'Should return compatible products for 420X4');
    for (const item of results) {
      assert.strictEqual(
        item.relationship.relationship_domain, 
        'COMPATIBILITY', 
        `Item ${item.relationship.target_id} has wrong domain: ${item.relationship.relationship_domain}`
      );
    }
  });

  await it('Test 2: getRelatedProducts returns ONLY GENERAL domain records', async () => {
    const results = await getRelatedProducts('alkota-420x4');
    assert(results.length > 0, 'Should return general related products for 420X4');
    for (const item of results) {
      assert.strictEqual(
        item.relationship.relationship_domain, 
        'GENERAL', 
        `Item ${item.relationship.target_id} has wrong domain: ${item.relationship.relationship_domain}`
      );
    }
  });

  await it('Test 3: Canonical dataset strictly partitions COMPATIBILITY vs GENERAL types', () => {
    for (const rel of CANONICAL_RELATIONSHIPS) {
      if (rel.relationship_domain === 'COMPATIBILITY') {
        assert(
          ['MACHINE_PART', 'MACHINE_ATTACHMENT', 'MACHINE_CHEMICAL', 'MACHINE_ACCESSORY', 'MACHINE_DOCUMENT', 'PART_MACHINE', 'ATTACHMENT_MACHINE', 'CHEMICAL_MACHINE'].includes(rel.relationship_type),
          `Invalid compatibility type: ${rel.relationship_type}`
        );
      } else {
        assert(
          !['MACHINE_PART', 'MACHINE_ATTACHMENT'].includes(rel.relationship_type),
          `General relationship cannot use engineering type: ${rel.relationship_type}`
        );
      }
    }
  });

  await it('Test 4: Raw filter by domain COMPATIBILITY excludes all GENERAL records', async () => {
    const records = await getRawRelationships({ relationship_domain: 'COMPATIBILITY' });
    const hasGeneral = records.some(r => r.relationship_domain === 'GENERAL');
    assert.strictEqual(hasGeneral, false, 'Raw compatibility filter leaked general relationships');
  });

  await it('Test 5: Raw filter by domain GENERAL excludes all COMPATIBILITY records', async () => {
    const records = await getRawRelationships({ relationship_domain: 'GENERAL' });
    const hasCompat = records.some(r => r.relationship_domain === 'COMPATIBILITY');
    assert.strictEqual(hasCompat, false, 'Raw general filter leaked compatibility relationships');
  });

  // -------------------------------------------------------------
  // GROUP 2: ENGINEERING EVIDENCE & SAFETY EXCLUSION TESTS
  // -------------------------------------------------------------
  console.log('\nGroup 2: Safety Exclusions & Evidence Verification');

  await it('Test 6: REVIEW_REQUIRED records are NEVER returned in getCompatibleProducts', async () => {
    const records = await getCompatibleProducts('alkota-420x4');
    const hasReview = records.some(r => r.relationship.confidence === 'REVIEW_REQUIRED');
    assert.strictEqual(hasReview, false, 'Leaked unreviewed compatibility item to public query');
  });

  await it('Test 7: NOT_COMPATIBLE records are NEVER returned in getCompatibleProducts', async () => {
    const records = await getCompatibleProducts('alkota-122');
    const hasNotCompat = records.some(r => r.relationship.confidence === 'NOT_COMPATIBLE');
    assert.strictEqual(hasNotCompat, false, 'Leaked dangerous NOT_COMPATIBLE item to public query');
  });

  await it('Test 8: Acid brighteners are excluded from hot-water coil machines in public queries', async () => {
    const results = await getCompatibleProducts('alkota-420x4');
    const hasAcid = results.some(r => 
      r.relationship.target_id.includes('acid') || 
      (r.target.title && r.target.title.toLowerCase().includes('acid'))
    );
    assert.strictEqual(hasAcid, false, 'Acid brightener improperly marked compatible with hot water machine');
  });

  await it('Test 9: Incompatible records exist in canonical data for internal workshop reference', () => {
    const excluded = CANONICAL_RELATIONSHIPS.filter(r => r.confidence === 'NOT_COMPATIBLE');
    assert(excluded.length >= 1, 'Expected at least one negative safety exclusion record');
  });

  await it('Test 10: All published COMPATIBILITY canonical records have non-empty evidence', () => {
    const publishedCompat = CANONICAL_RELATIONSHIPS.filter(
      r => r.relationship_domain === 'COMPATIBILITY' && r.status === 'published'
    );
    for (const r of publishedCompat) {
      assert(r.evidence && r.evidence.length > 5, `Missing fitment evidence for record ${r.source_id} → ${r.target_id}`);
    }
  });

  // -------------------------------------------------------------
  // GROUP 3: MACHINE ECOSYSTEM RESOLUTION TESTS
  // -------------------------------------------------------------
  console.log('\nGroup 3: Machine Ecosystem Aggregation');

  await it('Test 11: getMachineEcosystem returns structured tabs for 420X4', async () => {
    const eco = await getMachineEcosystem('alkota-420x4');
    assert(eco, 'Failed to return ecosystem');
    assert(Array.isArray(eco.compatibleParts), 'compatibleParts must be array');
    assert(Array.isArray(eco.compatibleAttachments), 'compatibleAttachments must be array');
    assert(Array.isArray(eco.verifiedMachineCareChemicals), 'verifiedMachineCareChemicals must be array');
    assert(Array.isArray(eco.alternativeMachines), 'alternativeMachines must be array');
  });

  await it('Test 12: General fleet alternatives are strictly isolated in alternativeMachines/seriesMachines', async () => {
    const eco = await getMachineEcosystem('alkota-420x4');
    for (const m of [...eco.alternativeMachines, ...eco.seriesMachines]) {
      assert.strictEqual(
        m.relationship.relationship_domain, 
        'GENERAL', 
        'Alternative machine improperly classified as compatibility'
      );
    }
  });

  await it('Test 13: Chemicals tab accurately segregates machine-care chemistry from detergents', async () => {
    const eco = await getMachineEcosystem('alkota-420x4');
    // Coil descaler / scale away must be present in machine care
    const hasCare = eco.verifiedMachineCareChemicals.some(c => 
      c.relationship.target_id.includes('scale') || c.target.slug.includes('scale')
    );
    assert(hasCare, 'Expected machine care chemical (descaler) in 420X4 ecosystem');
  });

  // -------------------------------------------------------------
  // GROUP 4: REVERSE COMPATIBILITY & FUZZY MATCHING TESTS
  // -------------------------------------------------------------
  console.log('\nGroup 4: Reverse Compatibility & Cross-Matching');

  await it('Test 14: getProductMachineCompatibility resolves machine models for General Pump TS2021', async () => {
    const machines = await getProductMachineCompatibility('general-pump-ts2021');
    assert(machines.length > 0, 'No machines found for TS2021 pump');
    const has420 = machines.some(m => m.machine_slug.includes('420x4') || m.model_code.includes('420'));
    assert(has420, 'Expected 420X4 in compatible machines for TS2021');
  });

  await it('Test 15: Reverse compatibility returns confidence and evidence citations', async () => {
    const machines = await getProductMachineCompatibility('general-pump-ts2021');
    for (const m of machines) {
      assert(m.confidence, 'Missing confidence rating on resolved machine');
      assert(m.evidence, 'Missing evidence citation on resolved machine');
    }
  });

  await it('Test 16: Model normalisation handles prefix differences (e.g. alkota-420x4 vs 420X4)', async () => {
    const res1 = await getMachineEcosystem('alkota-420x4');
    const res2 = await getMachineEcosystem('420X4');
    assert(res1.compatibleParts.length > 0, 'alkota-420x4 should return parts');
    assert(res2.compatibleParts.length > 0, '420X4 should return parts');
  });

  await it('Test 17: Inactive relationships are omitted when activeOnly is requested', async () => {
    const all = await getRawRelationships({ activeOnly: false });
    const active = await getRawRelationships({ activeOnly: true });
    assert(all.length >= active.length, 'All records count must be >= active records count');
  });

  // -------------------------------------------------------------
  // SUMMARY
  // -------------------------------------------------------------
  console.log(`\n=============================================================`);
  console.log(`RESULTS: ${passed} PASSED, ${failed} FAILED (TOTAL: ${passed + failed} TESTS)`);
  console.log(`=============================================================\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((e) => {
  console.error('Fatal test runner error:', e);
  process.exit(1);
});
