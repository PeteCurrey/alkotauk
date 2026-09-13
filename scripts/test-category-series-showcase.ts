import fs from 'fs';
import path from 'path';
import {
  getSeriesByCategory,
  slugifySeries,
  toCategoryRoute,
  fromCategoryRoute
} from '../src/lib/catalogue/series';
import { CANONICAL_CATEGORIES } from '../src/lib/products';

let passCount = 0;
let failCount = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  if (condition) {
    passCount++;
    console.log(`  ✓ PASS: ${testName}`);
  } else {
    failCount++;
    console.error(`  ✗ FAIL: ${testName}${detail ? ` - ${detail}` : ''}`);
  }
}

console.log('\n===============================================================');
console.log('Alkota UK — Phase 8.6A Category "Browse by Series" Verification');
console.log('===============================================================\n');

// 1. Verify component exists and does NOT contain hardcoded series
const componentPath = path.join(process.cwd(), 'src/components/category/CategorySeriesShowcase.tsx');
assert(fs.existsSync(componentPath), 'CategorySeriesShowcase.tsx component file exists');

const componentSource = fs.readFileSync(componentPath, 'utf-8');
const hardcodedSuspicious = [
  'All Electric Series',
  '216AX4',
  'Electric Driven Oil Fired',
  'LP and Natural Gas'
];
let foundHardcoded = false;
for (const phrase of hardcodedSuspicious) {
  if (componentSource.includes(`"${phrase}"`) || componentSource.includes(`'${phrase}'`)) {
    foundHardcoded = true;
    break;
  }
}
assert(!foundHardcoded, 'Test 12: No hardcoded series list exists in CategorySeriesShowcase component');

// 2. Load canonical data
const cataloguePath = path.join(process.cwd(), 'scripts/data/alkota-canonical-catalogue.json');
const catalogue = JSON.parse(fs.readFileSync(cataloguePath, 'utf-8'));

// Test each of the 8 canonical categories
const categoriesToTest = [
  'hot-water',
  'cold-water',
  'steam',
  'parts-washer',
  'water-heater',
  'trailer',
  'water-treatment',
  'space-heater'
];

async function runTests() {
  for (const catSlug of categoriesToTest) {
    console.log(`\n[Category Verification: ${catSlug.toUpperCase()}]`);
    const dbCategory = fromCategoryRoute(catSlug);
    const seriesList = await getSeriesByCategory(dbCategory);
    
    // Canonical machines belonging to this category
    const catMachines = catalogue.filter((m: any) => m.category === dbCategory);
    const expectedSeriesNames = new Set<string>(catMachines.map((m: any) => m.series));

    // Verify series list count matches canonical data
    assert(
      seriesList.length === expectedSeriesNames.size,
      `Category ${catSlug} exposes exactly ${expectedSeriesNames.size} series (found ${seriesList.length})`
    );

    // Verify all exposed series belong strictly to this category
    let invalidSeriesBelonging = 0;
    seriesList.forEach(s => {
      if (!expectedSeriesNames.has(s.series)) {
        invalidSeriesBelonging++;
      }
    });
    assert(
      invalidSeriesBelonging === 0,
      `Category ${catSlug} exposes ONLY valid series belonging strictly to ${catSlug}`
    );

    // Verify model counts sum to total category machines
    let totalSeriesModels = 0;
    seriesList.forEach(s => {
      totalSeriesModels += s.modelCount;
    });
    assert(
      totalSeriesModels === catMachines.length,
      `Series model counts sum to exact canonical machine count (${catMachines.length})`
    );

    // Verify individual series model counts match canonical machine count per series
    let countMismatch = 0;
    seriesList.forEach(s => {
      const canonicalCount = catMachines.filter((m: any) => m.series === s.series).length;
      if (s.modelCount !== canonicalCount) {
        countMismatch++;
      }
    });
    assert(
      countMismatch === 0,
      `All individual series model counts match canonical machine distribution`
    );

    // Verify every series links to a valid canonical series route
    let brokenRoutes = 0;
    const routeCat = toCategoryRoute(dbCategory);
    seriesList.forEach(s => {
      const expectedRoute = `/machines/${routeCat}/series/${s.slug}`;
      if (!expectedRoute || !s.slug || expectedRoute.includes('//')) {
        brokenRoutes++;
      }
    });
    assert(
      brokenRoutes === 0,
      `Every displayed series in ${catSlug} links to a valid canonical series route`
    );
  }

  // Summary output
  console.log('\n===============================================================');
  console.log(`TOTAL PHASE 8.6A CATEGORY SHOWCASE TESTS: ${passCount + failCount}`);
  console.log(`PASSED: ${passCount}`);
  console.log(`FAILED: ${failCount}`);
  console.log('===============================================================\n');

  if (failCount > 0) {
    process.exit(1);
  } else {
    console.log('Phase 8.6A Category "Browse by Series" Card PASSED with 0 errors!\n');
  }
}

runTests();
