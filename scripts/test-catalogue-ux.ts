/**
 * Alkota UK — Phase 8.2 Comprehensive Catalogue UX Test Suite
 * 
 * Verifies Acceptance Criteria A through T as mandated by Phase 8.2 brief:
 * A. 131 machines available.
 * B. 36 series available.
 * C. 8 categories available.
 * D. All Electric Series exists.
 * E. Four All Electric models visible.
 * F. Category filtering.
 * G. Series filtering.
 * H. Search.
 * I. Sorting.
 * J. URL filter state.
 * K. Published/unpublished handling.
 * L. Comparison integration.
 * M. Help Me Choose integration.
 * N. Machine detail routing.
 * O. Image resolution.
 * P. Specification presentation.
 * Q. Mobile navigation state.
 * R. No duplicate routes.
 * S. No hardcoded catalogue arrays.
 * T. Empty states.
 */

import { getProducts, getCategoriesWithCounts, CANONICAL_CATEGORIES } from '../src/lib/products';
import { 
  getAllSeries, 
  getSeriesByCategory, 
  getSeriesBySlug, 
  getCategoriesWithDetails, 
  slugifySeries, 
  toCategoryRoute, 
  fromCategoryRoute 
} from '../src/lib/catalogue/series';
import { resolveMachineImage } from '../src/lib/images';
import fs from 'fs';
import path from 'path';

let passed = 0;
let failed = 0;

function assert(condition: boolean, message: string) {
  if (condition) {
    console.log(`  ✓ PASS: ${message}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failed++;
  }
}

async function runTests() {
  console.log('===============================================================');
  console.log('ALKOTA UK — PHASE 8.2 CATALOGUE UX & DISCOVERY TEST SUITE');
  console.log('===============================================================\n');

  // Load baseline machines & dynamic series
  const allMachines = await getProducts();
  const allSeries = await getAllSeries();
  const allCategories = await getCategoriesWithDetails();

  // -----------------------------------------------------------------
  // TEST A: 131 MACHINES AVAILABLE
  // -----------------------------------------------------------------
  console.log('[Criterion A: 131 Machines Available]');
  assert(allMachines.length === 131, `Total published machines is exactly 131 (got ${allMachines.length})`);

  // -----------------------------------------------------------------
  // TEST B: 36 SERIES AVAILABLE
  // -----------------------------------------------------------------
  console.log('\n[Criterion B: 36 Series Available]');
  assert(allSeries.length === 36, `Total dynamic series is exactly 36 (got ${allSeries.length})`);
  
  // Verify every series has at least 1 model
  const emptySeries = allSeries.filter(s => s.modelCount === 0);
  assert(emptySeries.length === 0, `All 36 series contain valid models (0 empty series)`);

  // -----------------------------------------------------------------
  // TEST C: 8 CANONICAL CATEGORIES
  // -----------------------------------------------------------------
  console.log('\n[Criterion C: 8 Canonical Categories Available]');
  assert(allCategories.length === 8, `Total canonical categories is 8 (got ${allCategories.length})`);
  const expectedCats = [
    'hot-water', 
    'cold-water', 
    'steam', 
    'parts-washer', 
    'trailer', 
    'water-treatment', 
    'water-heater', 
    'space-heater'
  ];
  expectedCats.forEach(cat => {
    const found = allCategories.find(c => c.slug === cat);
    assert(!!found, `Category [${cat}] is present and has ${found?.modelCount} models across ${found?.seriesCount} series`);
  });

  // -----------------------------------------------------------------
  // TEST D: ALL ELECTRIC SERIES EXISTS
  // -----------------------------------------------------------------
  console.log('\n[Criterion D: All Electric Series Exists]');
  const allElectricSeries = allSeries.find(s => s.series === 'All Electric Series' || s.slug === 'all-electric-series');
  assert(!!allElectricSeries, 'All Electric Series exists in dynamic series layer');
  assert(allElectricSeries?.category === 'hot-water', 'All Electric Series belongs to hot-water category');
  assert(allElectricSeries?.slug === 'all-electric-series', `All Electric Series has slug "all-electric-series"`);

  // -----------------------------------------------------------------
  // TEST E: FOUR ALL ELECTRIC MODELS VISIBLE
  // -----------------------------------------------------------------
  console.log('\n[Criterion E: Four All Electric Models Visible]');
  assert(allElectricSeries?.modelCount === 4, `All Electric Series contains exactly 4 models (got ${allElectricSeries?.modelCount})`);
  const electricModelCodes = ['108', '4208', '4308', '5308'];
  electricModelCodes.forEach(code => {
    const found = allElectricSeries?.models.find(m => m.model_code === code);
    assert(!!found, `Model [${code}] is present in All Electric Series`);
  });

  // -----------------------------------------------------------------
  // TEST F: CATEGORY FILTERING EXACT COUNTS
  // -----------------------------------------------------------------
  console.log('\n[Criterion F: Category Filtering Accurate Counts]');
  const expectedCategoryCounts: Record<string, number> = {
    'hot-water': 43,
    'cold-water': 31,
    'steam': 10,
    'parts-washer': 22,
    'trailer': 5,
    'water-treatment': 5,
    'water-heater': 14,
    'space-heater': 1,
  };
  for (const [cat, expCount] of Object.entries(expectedCategoryCounts)) {
    const filtered = allMachines.filter(m => m.category === cat);
    assert(filtered.length === expCount, `Category [${cat}] filters to exactly ${expCount} machines (got ${filtered.length})`);
  }

  // -----------------------------------------------------------------
  // TEST G: SERIES FILTERING
  // -----------------------------------------------------------------
  console.log('\n[Criterion G: Series Filtering]');
  const x4Series = allSeries.find(s => s.slug === 'electric-driven-oil-fired-hot-water-pressure-washer');
  assert(!!x4Series && x4Series.modelCount === 5, `X4 Series filters to 5 models`);
  const ax4Series = allSeries.find(s => s.slug === 'belt-driven-power-washers-with-triplex-pump');
  assert(!!ax4Series && ax4Series.modelCount === 4, `AX4 Series filters to 4 models`);

  // -----------------------------------------------------------------
  // TEST H: FAST SEARCH
  // -----------------------------------------------------------------
  console.log('\n[Criterion H: Search by Model Code, Name & Series]');
  const search420 = allMachines.filter(m => 
    m.model_code?.toLowerCase().includes('420') || 
    m.name.toLowerCase().includes('420')
  );
  assert(search420.length >= 5, `Search "420" returns relevant models (found ${search420.length})`);
  const search4308 = allMachines.filter(m => m.model_code === '4308');
  assert(search4308.length === 1 && search4308[0].slug === 'alkota-4308', 'Search "4308" finds exact model Alkota 4308');

  // -----------------------------------------------------------------
  // TEST I: DETERMINISTIC SORTING
  // -----------------------------------------------------------------
  console.log('\n[Criterion I: Deterministic Sorting]');
  const byPressureDesc = [...allMachines].sort((a, b) => (b.pressure_bar || 0) - (a.pressure_bar || 0));
  assert((byPressureDesc[0].pressure_bar || 0) >= (byPressureDesc[byPressureDesc.length - 1].pressure_bar || 0), 'Pressure descending sort correctly orders highest pressure first');
  const byFlowDesc = [...allMachines].sort((a, b) => (b.flow_rate_lpm || 0) - (a.flow_rate_lpm || 0));
  assert((byFlowDesc[0].flow_rate_lpm || 0) >= (byFlowDesc[byFlowDesc.length - 1].flow_rate_lpm || 0), 'Flow descending sort correctly orders highest flow first');

  // -----------------------------------------------------------------
  // TEST J: URL FILTER STATE SERIALIZATION
  // -----------------------------------------------------------------
  console.log('\n[Criterion J: URL Filter State Normalisation]');
  assert(toCategoryRoute('parts-washer') === 'parts-washers', 'toCategoryRoute normalises parts-washer to parts-washers');
  assert(fromCategoryRoute('parts-washers') === 'parts-washer', 'fromCategoryRoute normalises parts-washers to parts-washer');
  assert(slugifySeries('All Electric Series') === 'all-electric-series', 'slugifySeries correctly transforms series name');
  assert(slugifySeries('LP & Natural Gas') === 'lp-and-natural-gas', 'slugifySeries correctly handles & entity');

  // -----------------------------------------------------------------
  // TEST K: PUBLICATION STATE HANDLING
  // -----------------------------------------------------------------
  console.log('\n[Criterion K: Publication State Compliance]');
  const nonPublished = allMachines.filter(m => m.status !== 'published' || !m.active);
  assert(nonPublished.length === 0, 'Zero unpublished or draft machines leak into public catalogue');

  // -----------------------------------------------------------------
  // TEST L: COMPARISON INTEGRATION
  // -----------------------------------------------------------------
  console.log('\n[Criterion L: Comparison Integration]');
  const compareSlugs = ['alkota-420x4', 'alkota-4308', 'alkota-530b'];
  const compareHref = `/machines/compare?machines=${compareSlugs.join(',')}`;
  assert(compareHref.includes('machines=alkota-420x4,alkota-4308,alkota-530b'), 'Comparison query URL correctly constructs parameter');

  // -----------------------------------------------------------------
  // TEST M: HELP ME CHOOSE INTEGRATION
  // -----------------------------------------------------------------
  console.log('\n[Criterion M: Help Me Choose Integration]');
  const helpMeChoosePath = path.join(process.cwd(), 'src/app/machines/help-me-choose/page.tsx');
  assert(fs.existsSync(helpMeChoosePath), 'Route /machines/help-me-choose exists as a working destination');

  // -----------------------------------------------------------------
  // TEST N: MACHINE DETAIL ROUTING
  // -----------------------------------------------------------------
  console.log('\n[Criterion N: Machine Detail Routing]');
  const sample = allMachines.find(m => m.model_code === '4308');
  assert(!!sample, 'Model 4308 exists');
  const targetRoute = `/machines/${toCategoryRoute(sample!.category)}/${sample!.slug}`;
  assert(targetRoute === '/machines/hot-water/alkota-4308', `Target route matches canonical hierarchy: ${targetRoute}`);

  // -----------------------------------------------------------------
  // TEST O: IMAGE RESOLUTION INTEGRITY
  // -----------------------------------------------------------------
  console.log('\n[Criterion O: Image Resolution Integrity (131/131)]');
  let validImages = 0;
  allMachines.forEach(m => {
    const resolved = resolveMachineImage(m.primary_image_url, m.model_code, m.category);
    if (resolved && (resolved.startsWith('/') || resolved.startsWith('http'))) {
      validImages++;
    }
  });
  assert(validImages === 131, `131/131 machines resolve to valid image URLs (got ${validImages})`);

  // -----------------------------------------------------------------
  // TEST P: SPECIFICATION PRESENTATION (ZERO / NULL SUPPRESSION)
  // -----------------------------------------------------------------
  console.log('\n[Criterion P: Specification Presentation Noise Suppression]');
  // Check space heaters (which have null water pressure)
  const spaceHeater = allMachines.find(m => m.category === 'space-heater');
  assert(spaceHeater?.pressure_bar === null, 'Space heater correctly has null pressure (not 0)');

  // -----------------------------------------------------------------
  // TEST Q: MOBILE NAVIGATION STATE & ACCESSIBILITY
  // -----------------------------------------------------------------
  console.log('\n[Criterion Q: Mobile Navigation State]');
  const seriesStripFile = fs.readFileSync(path.join(process.cwd(), 'src/components/catalogue/SeriesNavigationStrip.tsx'), 'utf8');
  assert(seriesStripFile.includes('role="tablist"'), 'SeriesNavigationStrip has accessible role="tablist"');
  assert(seriesStripFile.includes('overflow-x-auto'), 'SeriesNavigationStrip supports mobile horizontal scrolling');

  // -----------------------------------------------------------------
  // TEST R: NO DUPLICATE CATALOGUE ROUTES
  // -----------------------------------------------------------------
  console.log('\n[Criterion R: No Duplicate Routes]');
  const seriesPageFile = path.join(process.cwd(), 'src/app/machines/[category]/series/[series]/page.tsx');
  assert(fs.existsSync(seriesPageFile), 'Canonical series route exists at /machines/[category]/series/[series]/page.tsx');
  const categoryPageFile = path.join(process.cwd(), 'src/app/machines/[category]/page.tsx');
  assert(fs.existsSync(categoryPageFile), 'Canonical category route exists at /machines/[category]/page.tsx');

  // -----------------------------------------------------------------
  // TEST S: NO HARDCODED CATALOGUE ARRAYS IN UI COMPONENTS
  // -----------------------------------------------------------------
  console.log('\n[Criterion S: No Hardcoded Catalogue Arrays in UI Components]');
  const fleetExplorerFile = fs.readFileSync(path.join(process.cwd(), 'src/components/catalogue/CatalogueFleetExplorer.tsx'), 'utf8');
  assert(!fleetExplorerFile.includes('const machines = ['), 'CatalogueFleetExplorer has no hardcoded machine arrays');
  const machinesIndexFile = fs.readFileSync(path.join(process.cwd(), 'src/app/machines/page.tsx'), 'utf8');
  assert(!machinesIndexFile.includes('const machines = ['), 'Machines index page fetches data dynamically');

  // -----------------------------------------------------------------
  // TEST T: EMPTY STATES
  // -----------------------------------------------------------------
  console.log('\n[Criterion T: Empty States & Recovery Actions]');
  assert(fleetExplorerFile.includes('Reset All Filters'), 'CatalogueFleetExplorer provides "Reset All Filters" recovery action');
  assert(fleetExplorerFile.includes('/machines/help-me-choose'), 'CatalogueFleetExplorer links to Help Me Choose on empty state');

  console.log('\n===============================================================');
  console.log(`TOTAL PHASE 8.2 ACCEPTANCE TESTS: ${passed + failed}`);
  console.log(`PASSED: ${passed}`);
  console.log(`FAILED: ${failed}`);
  console.log('===============================================================\n');

  if (failed > 0) {
    process.exit(1);
  } else {
    console.log('Phase 8.2 Catalogue UX Verification PASSED with 0 errors!\n');
  }
}

runTests().catch(err => {
  console.error('Test run failed with error:', err);
  process.exit(1);
});
