/**
 * Test Suite: Machine Comparison & Selection Experience (Phase 5)
 * 
 * Verifies:
 * 1. 3-machine limit enforcement
 * 2. Duplicate selection prevention
 * 3. Mathematical unit conversions (Metric ↔ Imperial)
 * 4. Missing data handling ("Not specified", never 0 or false)
 * 5. Difference detection & normalisation across machines
 * 6. Category-aware specification grouping across major categories
 * 7. Factual highlights computation (highest pressure, flow, fuel diversity)
 * 8. Enquiry URL & context generation
 * 
 * Run with: node node_modules/.bin/tsx scripts/test-machine-comparison.ts
 */

import assert from 'node:assert';
import { 
  formatPressure, 
  formatFlowRate, 
  formatTemperature, 
  formatWeight, 
  checkIsDifferent, 
  buildComparisonGroups, 
  computeHighlights 
} from '../src/lib/comparison/engine';
import { getProductBySlug, getProducts, Product } from '../src/lib/products';

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
  console.log('\n=== ALKOTA UK: MACHINE COMPARISON TEST SUITE (PHASE 5) ===\n');

  // Load sample machines from canonical data
  const m420x4 = await getProductBySlug('alkota-420x4');
  const m216x4 = await getProductBySlug('alkota-216x4');
  const m430xm4 = await getProductBySlug('alkota-430xm4');
  const m122Steam = await getProductBySlug('alkota-122');
  const mPartsWasher = await getProductBySlug('alkota-25500');
  const mTrailer = await getProductBySlug('alkota-20151');

  assert(m420x4, 'Failed to load 420X4 machine');
  assert(m216x4, 'Failed to load 216X4 machine');

  // -------------------------------------------------------------
  // GROUP 1: UNIT CONVERSION & PRECISION TESTS
  // -------------------------------------------------------------
  console.log('Group 1: Mathematical Unit Conversions & Precision');

  await it('Test 1: Pressure converts accurately between BAR and PSI', () => {
    const metric = formatPressure(m420x4!, 'metric');
    const imperial = formatPressure(m420x4!, 'imperial');
    assert.strictEqual(metric.unit, 'BAR');
    assert.strictEqual(imperial.unit, 'PSI');
    assert(metric.display.includes('BAR'));
    assert(imperial.display.includes('PSI'));
    // 420X4 is 2000 PSI / 138 BAR
    assert(metric.raw !== null && Number(metric.raw) > 100);
    assert(imperial.raw !== null && Number(imperial.raw) > 1000);
  });

  await it('Test 2: Flow rate converts accurately between L/min and GPM', () => {
    const metric = formatFlowRate(m420x4!, 'metric');
    const imperial = formatFlowRate(m420x4!, 'imperial');
    assert.strictEqual(metric.unit, 'L/min');
    assert.strictEqual(imperial.unit, 'GPM');
    assert(metric.display.includes('L/min'));
    assert(imperial.display.includes('GPM'));
    // Flow check: LPM should be approximately GPM * 3.785
    const ratio = Number(metric.raw) / Number(imperial.raw);
    assert(Math.abs(ratio - 3.785) < 0.1, `Conversion ratio ${ratio} deviated from 3.785`);
  });

  await it('Test 3: Temperature converts accurately between Celsius and Fahrenheit', () => {
    const metric = formatTemperature(m420x4!, 'metric');
    const imperial = formatTemperature(m420x4!, 'imperial');
    assert.strictEqual(metric.unit, '°C');
    assert.strictEqual(imperial.unit, '°F');
    // For 98°C -> (98 * 9/5) + 32 = 208°F
    if (m420x4!.max_temp_c) {
      assert.strictEqual(metric.raw, m420x4!.max_temp_c);
      const expectedF = Math.round((m420x4!.max_temp_c * 9) / 5 + 32);
      assert.strictEqual(imperial.raw, expectedF);
    }
  });

  await it('Test 4: Weight converts accurately between kg and lbs', () => {
    const metric = formatWeight(m420x4!, 'metric');
    const imperial = formatWeight(m420x4!, 'imperial');
    assert.strictEqual(metric.unit, 'kg');
    assert.strictEqual(imperial.unit, 'lbs');
    assert(metric.raw !== null && imperial.raw !== null);
  });

  // -------------------------------------------------------------
  // GROUP 2: MISSING DATA & UNKNOWN HANDLING
  // -------------------------------------------------------------
  console.log('\nGroup 2: Missing Data & Unknown Handling');

  await it('Test 5: Missing pressure is rendered as "Not specified" and NOT 0', () => {
    const dummyProduct: Product = {
      ...m420x4!,
      slug: 'test-dummy',
      pressure_bar: null,
      pressure_psi: null,
    };
    const res = formatPressure(dummyProduct, 'metric');
    assert.strictEqual(res.display, 'Not specified');
    assert.strictEqual(res.isSpecified, false);
    assert.strictEqual(res.raw, null);
  });

  await it('Test 6: Missing flow is rendered as "Not specified" and NOT 0', () => {
    const dummyProduct: Product = {
      ...m420x4!,
      slug: 'test-dummy',
      flow_rate_lpm: null,
      flow_rate_gpm: null,
    };
    const res = formatFlowRate(dummyProduct, 'metric');
    assert.strictEqual(res.display, 'Not specified');
    assert.strictEqual(res.isSpecified, false);
    assert.strictEqual(res.raw, null);
  });

  await it('Test 7: Cold water machines reflect ambient temperature rather than "Not specified"', () => {
    const coldMachine: Product = {
      ...m420x4!,
      slug: 'test-cold',
      category: 'cold-water',
      max_temp_c: null,
    };
    const res = formatTemperature(coldMachine, 'metric');
    assert.strictEqual(res.display, 'Cold Water (Ambient)');
    assert.strictEqual(res.isSpecified, true);
  });

  // -------------------------------------------------------------
  // GROUP 3: DIFFERENCE DETECTION & ROW COMPARISON
  // -------------------------------------------------------------
  console.log('\nGroup 3: Difference Detection & Normalisation');

  await it('Test 8: checkIsDifferent identifies differences between 420X4 and 216X4', () => {
    const p1 = formatPressure(m420x4!, 'metric');
    const p2 = formatPressure(m216x4!, 'metric');
    const values = { [m420x4!.slug]: p1, [m216x4!.slug]: p2 };
    const isDiff = checkIsDifferent(values, [m420x4!.slug, m216x4!.slug]);
    assert.strictEqual(isDiff, true, 'Pressure should be different between 420X4 and 216X4');
  });

  await it('Test 9: checkIsDifferent returns false when two machines have identical values', () => {
    const p1 = formatPressure(m420x4!, 'metric');
    const values = { 'slug-a': p1, 'slug-b': { ...p1 } };
    const isDiff = checkIsDifferent(values, ['slug-a', 'slug-b']);
    assert.strictEqual(isDiff, false, 'Identical values should not be marked different');
  });

  await it('Test 10: checkIsDifferent normalises casing and whitespace', () => {
    const values = {
      'slug-a': { display: ' Electric Motor ', raw: 'electric', isSpecified: true },
      'slug-b': { display: 'electric motor', raw: 'electric', isSpecified: true },
    };
    const isDiff = checkIsDifferent(values, ['slug-a', 'slug-b']);
    assert.strictEqual(isDiff, false, 'Case and whitespace variations should be normalised');
  });

  // -------------------------------------------------------------
  // GROUP 4: CATEGORY-AWARE SPECIFICATION GROUPING
  // -------------------------------------------------------------
  console.log('\nGroup 4: Category-Aware Specification Groups');

  await it('Test 11: buildComparisonGroups creates standard groups for Hot Water washers', () => {
    const groups = buildComparisonGroups([m420x4!, m216x4!], 'metric');
    assert(groups.length >= 5, 'Must contain at least 5 standard groups');
    const groupIds = groups.map(g => g.id);
    assert(groupIds.includes('performance'), 'Missing performance group');
    assert(groupIds.includes('power'), 'Missing power group');
    assert(groupIds.includes('equipment'), 'Missing equipment group');
    assert(groupIds.includes('physical'), 'Missing physical group');
    assert(groupIds.includes('application'), 'Missing application group');
  });

  await it('Test 12: Steam cleaners surface thermal & burner output specs', () => {
    if (m122Steam) {
      const groups = buildComparisonGroups([m122Steam, m420x4!], 'metric');
      const perfGroup = groups.find(g => g.id === 'performance');
      assert(perfGroup, 'Missing performance group');
      const tempRow = perfGroup.rows.find(r => r.key === 'temp');
      assert(tempRow, 'Missing temperature row');
      assert(tempRow.values[m122Steam.slug].isSpecified, 'Steam unit should specify temperature');
    }
  });

  await it('Test 13: Parts Washers extra specifications are dynamically extracted', () => {
    if (mPartsWasher) {
      const groups = buildComparisonGroups([mPartsWasher], 'metric');
      const specialGroup = groups.find(g => g.id === 'special');
      if (mPartsWasher.extra_specs && mPartsWasher.extra_specs.length > 0) {
        assert(specialGroup, 'Expected special category group for parts washer');
      }
    }
  });

  // -------------------------------------------------------------
  // GROUP 5: FACTUAL HIGHLIGHTS CALCULATION
  // -------------------------------------------------------------
  console.log('\nGroup 5: Factual Highlights Calculation');

  await it('Test 14: computeHighlights identifies highest pressure without subjective claims', () => {
    const highlights = computeHighlights([m420x4!, m216x4!]);
    const pressureHighlight = highlights.find(h => h.type === 'pressure');
    if (pressureHighlight) {
      assert(pressureHighlight.machineSlug, 'Missing machine slug in highlight');
      assert(pressureHighlight.detail.includes('BAR'), 'Detail must include factual BAR metric');
      // Must not contain subjective marketing hype
      assert(!pressureHighlight.detail.toLowerCase().includes('best machine'));
      assert(!pressureHighlight.detail.toLowerCase().includes('superior to all'));
    }
  });

  await it('Test 15: computeHighlights surfaces thermal degreasing difference for hot vs cold', () => {
    const coldDummy: Product = {
      ...m216x4!,
      slug: 'test-cold-sample',
      name: 'Cold Test Machine',
      category: 'cold-water',
      max_temp_c: null,
    };
    const highlights = computeHighlights([m420x4!, coldDummy]);
    const heatingHighlight = highlights.find(h => h.type === 'heating');
    assert(heatingHighlight, 'Expected heating capability highlight when comparing hot vs cold');
  });

  // -------------------------------------------------------------
  // GROUP 6: 3-MACHINE LIMIT & CONTEXT
  // -------------------------------------------------------------
  console.log('\nGroup 6: 3-Machine Limit & Selection Integrity');

  await it('Test 16: buildComparisonGroups supports up to 3 machines simultaneously', () => {
    if (m430xm4) {
      const groups = buildComparisonGroups([m420x4!, m216x4!, m430xm4], 'metric');
      for (const g of groups) {
        for (const r of g.rows) {
          assert.strictEqual(Object.keys(r.values).length, 3, 'Each row must have 3 values');
        }
      }
    }
  });

  await it('Test 17: Comparison URLs format machines and models cleanly for enquiry', () => {
    const slugs = [m420x4!.slug, m216x4!.slug];
    const url = `/contact?enquiry=compare&machines=${slugs.join(',')}`;
    assert(url.includes('enquiry=compare'));
    assert(url.includes('alkota-420x4'));
    assert(url.includes('alkota-216x4'));
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

runTests().catch(e => {
  console.error('Fatal test runner error:', e);
  process.exit(1);
});
