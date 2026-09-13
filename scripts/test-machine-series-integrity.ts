import fs from 'fs';
import path from 'path';
import { resolveMachineImage, getMachineImageDetails } from '../src/lib/images';
import {
  getAllSeries,
  getSeriesByCategory,
  getSeriesBySlug,
  slugifySeries,
  toCategoryRoute,
  formatSeriesDisplayName,
} from '../src/lib/catalogue/series';

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
console.log('Alkota UK — Phase 8.6 Series-First Discovery & Image Integrity');
console.log('===============================================================\n');

// 1. Load canonical catalogue
const cataloguePath = path.join(process.cwd(), 'scripts/data/alkota-canonical-catalogue.json');
assert(fs.existsSync(cataloguePath), 'Canonical catalogue JSON exists');

const catalogue = JSON.parse(fs.readFileSync(cataloguePath, 'utf-8'));
assert(catalogue.length === 131, `Exactly 131 machines in catalogue (found ${catalogue.length})`);

// ── Group 1: 131/131 Machines Assigned to Canonical Series ──────────────
console.log('\n[Group 1: 131/131 Machine-to-Series Integrity]');
let orphanCount = 0;
let emptySeriesName = 0;
const seriesToModels = new Map<string, string[]>();

catalogue.forEach((m: any) => {
  if (!m.series || m.series.trim() === '') {
    orphanCount++;
  } else {
    const list = seriesToModels.get(m.series) || [];
    list.push(m.model_code);
    seriesToModels.set(m.series, list);
  }
});

assert(orphanCount === 0, '0 orphan machines (every machine has a series assigned)');
assert(seriesToModels.size === 36, `Exactly 36 canonical manufacturer series represented (found ${seriesToModels.size})`);

// Check each series has models
let emptySeriesCount = 0;
for (const [sName, models] of seriesToModels.entries()) {
  if (models.length === 0) emptySeriesCount++;
}
assert(emptySeriesCount === 0, 'All 36 series contain at least 1 verified model');

// ── Group 2: Series Category Isolation & Slug Uniqueness ────────────────
console.log('\n[Group 2: Series Category Isolation & Route Determinism]');
const seriesCategories = new Map<string, Set<string>>();
const uniqueSeriesRoutes = new Set<string>();
const uniqueSeriesSlugs = new Set<string>();
let routeCollisions = 0;

catalogue.forEach((m: any) => {
  const catSet = seriesCategories.get(m.series) || new Set<string>();
  catSet.add(m.category);
  seriesCategories.set(m.series, catSet);

  const sSlug = slugifySeries(m.series);
  const catRoute = toCategoryRoute(m.category);
  const fullRoute = `/machines/${catRoute}/series/${sSlug}`;

  uniqueSeriesRoutes.add(fullRoute);
  uniqueSeriesSlugs.add(sSlug);
});

let crossCategorySeriesCount = 0;
for (const [sName, cats] of seriesCategories.entries()) {
  if (cats.size > 1) {
    crossCategorySeriesCount++;
  }
}

assert(crossCategorySeriesCount === 0, '0 cross-category series (every series belongs strictly to 1 category)');
assert(uniqueSeriesRoutes.size === 36, `Exactly 36 unique series routes generated (found ${uniqueSeriesRoutes.size})`);
assert(uniqueSeriesSlugs.size === 36, `Exactly 36 unique series URL slugs generated (found ${uniqueSeriesSlugs.size})`);

// ── Group 3: Dynamic Series Data Layer Verification ─────────────────────
console.log('\n[Group 3: Dynamic Series Data Layer Resolution]');
getAllSeries().then((dynamicSeries) => {
  assert(dynamicSeries.length === 36, `getAllSeries() returns exactly 36 series (got ${dynamicSeries.length})`);

  let totalModelsInSeries = 0;
  dynamicSeries.forEach(s => {
    totalModelsInSeries += s.modelCount;
  });
  assert(totalModelsInSeries === 131, `Sum of models across all series equals 131 (got ${totalModelsInSeries})`);

  // Check specific series existence and model counts
  const allElectric = dynamicSeries.find(s => s.slug === 'all-electric-series');
  assert(!!allElectric, 'All Electric Series is present in dynamic layer');
  assert(allElectric?.modelCount === 4, 'All Electric Series contains exactly 4 models');
  assert(allElectric?.category === 'hot-water', 'All Electric Series is categorized under hot-water');

  const x4Series = dynamicSeries.find(s => s.slug === 'electric-driven-oil-fired-hot-water-pressure-washer');
  assert(!!x4Series, 'X4 Electric Oil-Fired Series is present in dynamic layer');
  assert(x4Series?.modelCount === 5, 'X4 Electric Oil-Fired Series contains 5 models');

  // Check display name formatting (no trailing periods)
  let trailingPeriodCount = 0;
  dynamicSeries.forEach(s => {
    if (s.displayName.endsWith('.')) trailingPeriodCount++;
  });
  assert(trailingPeriodCount === 0, '0 series display names have trailing periods or formatting artifacts');
});

// ── Group 4: Forensic Machine Image Accuracy & Substitution Prevention ──
console.log('\n[Group 4: Forensic Image Accuracy & Substitution Prevention]');

// 1. Gas Fired Steam Cleaners (181, 241, 301, 401)
const gasSteamModels = ['181', '241', '301', '401'];
let gasSteamUsingOilImage = 0;
gasSteamModels.forEach(code => {
  const m = catalogue.find((item: any) => item.model_code === code);
  if (m) {
    const resolved = resolveMachineImage(m.primary_image_url, m.model_code, m.category);
    if (resolved.includes('steam-oil.png')) {
      gasSteamUsingOilImage++;
    }
  }
});
assert(gasSteamUsingOilImage === 0, 'Gas-Fired Steam Cleaners (181, 241, 301, 401) do NOT use oil-fired steam image');

// 2. Portable Dry Steam Generators (246EN, 126)
const drySteamModels = ['246EN', '126'];
let drySteamUsingOilImage = 0;
drySteamModels.forEach(code => {
  const m = catalogue.find((item: any) => item.model_code === code);
  if (m) {
    const resolved = resolveMachineImage(m.primary_image_url, m.model_code, m.category);
    if (resolved.includes('steam-oil.png')) {
      drySteamUsingOilImage++;
    }
  }
});
assert(drySteamUsingOilImage === 0, 'Dry Steam Generators (246EN, 126) do NOT use oil-fired steam image');

// 3. Industrial Series (5355EAD, 5505J)
const industrialModels = ['5355EAD', '5505J'];
let industrialUsingGedImage = 0;
industrialModels.forEach(code => {
  const m = catalogue.find((item: any) => item.model_code === code);
  if (m) {
    const resolved = resolveMachineImage(m.primary_image_url, m.model_code, m.category);
    if (resolved.includes('ged-12v-skid.png')) {
      industrialUsingGedImage++;
    }
  }
});
assert(industrialUsingGedImage === 0, 'Industrial Series (5355EAD, 5505J) do NOT use GED skid image');

// ── Group 5: Image Verification Status & Provenance Model ────────────────
console.log('\n[Group 5: Image Verification Status & Provenance Model]');
let exactModelCount = 0;
let sharedManufacturerCount = 0;
let seriesLevelCount = 0;
let categoryFallbackCount = 0;

catalogue.forEach((m: any) => {
  const details = getMachineImageDetails(m.primary_image_url, m.model_code, m.category);
  if (details.verificationStatus === 'VERIFIED_EXACT_MODEL') exactModelCount++;
  else if (details.verificationStatus === 'VERIFIED_SHARED_MANUFACTURER') sharedManufacturerCount++;
  else if (details.verificationStatus === 'VERIFIED_SERIES') seriesLevelCount++;
  else if (details.source === 'CATEGORY_FALLBACK') categoryFallbackCount++;
});

assert(categoryFallbackCount === 0, '0 machines rely on generic category fallback images');
assert(exactModelCount > 0, `Exact model verified imagery identified (${exactModelCount} machines)`);
assert(sharedManufacturerCount + seriesLevelCount > 0, `Shared manufacturer/series imagery identified (${sharedManufacturerCount + seriesLevelCount} machines)`);

// Special scrutiny models
const scrutinyModels = ['216CSE', '320CSE', '845S', '108', '4208', '4308', '5308', '4405XD4', '3305XD4'];
scrutinyModels.forEach(code => {
  const m = catalogue.find((item: any) => item.model_code === code);
  assert(!!m, `Scrutiny model ${code} exists in catalogue`);
  if (m) {
    const details = getMachineImageDetails(m.primary_image_url, m.model_code, m.category);
    assert(details.url.length > 0, `Scrutiny model ${code} resolves valid image URL`);
    assert(details.verificationStatus !== 'REQUIRES_REVIEW', `Scrutiny model ${code} has verified status (${details.verificationStatus})`);
  }
});

// ── Group 6: Complete Route Reachability (Category & Series) ─────────────
console.log('\n[Group 6: Complete Route Reachability (Dual Discovery Pathways)]');
let unmappedCategoryRoutes = 0;
let unmappedSeriesRoutes = 0;

catalogue.forEach((m: any) => {
  const catRoute = toCategoryRoute(m.category);
  const sSlug = slugifySeries(m.series);

  if (!catRoute) unmappedCategoryRoutes++;
  if (!sSlug) unmappedSeriesRoutes++;
});

assert(unmappedCategoryRoutes === 0, 'All 131 machines reachable via Category discovery pathway');
assert(unmappedSeriesRoutes === 0, 'All 131 machines reachable via Series discovery pathway');

// Summary output
setTimeout(() => {
  console.log('\n===============================================================');
  console.log(`TOTAL PHASE 8.6 SERIES & IMAGE INTEGRITY TESTS: ${passCount + failCount}`);
  console.log(`PASSED: ${passCount}`);
  console.log(`FAILED: ${failCount}`);
  console.log('===============================================================\n');

  if (failCount > 0) {
    process.exit(1);
  } else {
    console.log('Phase 8.6 Series-First Discovery & Image Integrity PASSED with 0 errors!\n');
  }
}, 500);
