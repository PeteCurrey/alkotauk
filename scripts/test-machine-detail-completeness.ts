import fs from 'fs';
import path from 'path';
import { resolveMachineImage } from '../src/lib/images';
import {
  formatPressure,
  formatFlowRate,
  formatTemperature,
  formatMotorPower,
  formatElectrical,
  formatWeight,
  formatDimensions,
  formatBtu,
  dedupeExtraSpecs,
  categoryHasPressure,
  categoryHasFlow,
  categoryHasHeating,
} from '../src/lib/spec-format';
import { toCategoryRoute } from '../src/lib/catalogue/series';
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
console.log('Alkota UK — Phase 8.5 Machine Detail & Specification Completeness');
console.log('===============================================================\n');

// 1. Load canonical catalogue
const cataloguePath = path.join(process.cwd(), 'scripts/data/alkota-canonical-catalogue.json');
assert(fs.existsSync(cataloguePath), 'Canonical catalogue JSON exists');

const catalogue = JSON.parse(fs.readFileSync(cataloguePath, 'utf-8'));
assert(catalogue.length === 131, `Exactly 131 machines in catalogue (found ${catalogue.length})`);

// Group 1: 131/131 Machine Route & Identity Integrity
console.log('\n[Group 1: 131/131 Machine Route & Identity Integrity]');
let invalidRoutes = 0;
let missingCategoryMapping = 0;
let missingSlugs = 0;
let missingModelCodes = 0;

catalogue.forEach((m: any) => {
  if (!m.slug || m.slug.trim() === '') missingSlugs++;
  if (!m.model_code || m.model_code.trim() === '') missingModelCodes++;
  
  const catRoute = toCategoryRoute(m.category);
  if (!catRoute || catRoute.trim() === '') invalidRoutes++;

  if (!CANONICAL_CATEGORIES[m.category]) missingCategoryMapping++;
});

assert(missingSlugs === 0, 'All 131 machines have valid slug');
assert(missingModelCodes === 0, 'All 131 machines have valid model_code');
assert(invalidRoutes === 0, 'All 131 machines map to a valid URL category route');
assert(missingCategoryMapping === 0, 'All 131 machines belong to a canonical category');

// Group 2: Image Resolution & Provenance
console.log('\n[Group 2: Image Resolution & Media Experience]');
let unresolvableImages = 0;
let emptyImagePaths = 0;

catalogue.forEach((m: any) => {
  const resolved = resolveMachineImage(m.primary_image_url, m.model_code, m.category);
  if (!resolved || resolved.trim() === '') {
    unresolvableImages++;
  }
  if (resolved.startsWith('/') && !fs.existsSync(path.join(process.cwd(), 'public', resolved))) {
    // If local asset path, check file exists
    emptyImagePaths++;
  }
});

assert(unresolvableImages === 0, 'All 131 machines resolve a valid primary image via resolveMachineImage()');
assert(emptyImagePaths === 0, 'All local machine image references exist in public/ directory');

// Group 3: Canonical Spec Formatting & Zero Suppression (BUG-01)
console.log('\n[Group 3: Canonical Spec Formatting & Zero Suppression]');
let zeroPressureDisplayed = 0;
let zeroFlowDisplayed = 0;
let fakeNaDisplayed = 0;

catalogue.forEach((m: any) => {
  const pSpec = formatPressure(m, 'metric');
  if (pSpec.isSpecified) {
    if (pSpec.raw === 0 || /(^|\s)0(\.0)?\s*(BAR|PSI)/i.test(pSpec.display)) {
      zeroPressureDisplayed++;
    }
  }

  const fSpec = formatFlowRate(m, 'metric');
  if (fSpec.isSpecified) {
    if (fSpec.raw === 0 || /(^|\s)0(\.0)?\s*(L\/min|GPM)/i.test(fSpec.display)) {
      zeroFlowDisplayed++;
    }
  }

  [pSpec, fSpec].forEach(spec => {
    if (spec.display.toLowerCase() === 'n/a' || spec.display === '—') {
      fakeNaDisplayed++;
    }
  });
});

assert(zeroPressureDisplayed === 0, 'No machine displays "0 BAR" or "0 PSI" (BUG-01 resolved)');
assert(zeroFlowDisplayed === 0, 'No machine displays "0 L/min" or "0 GPM" (BUG-01 resolved)');
assert(fakeNaDisplayed === 0, 'No machine renders uninformative placeholder "N/A" or "—"');

// Group 4: Category-Adaptive Capability Integrity
console.log('\n[Group 4: Category-Adaptive Capability Integrity]');
const noPressureMachines = catalogue.filter((m: any) => !categoryHasPressure(m.category));
assert(noPressureMachines.length === 47, `Exactly 47 machines in non-pressure categories (found ${noPressureMachines.length})`);

let noPressureHasPressureSpec = 0;
noPressureMachines.forEach((m: any) => {
  if (formatPressure(m, 'metric').isSpecified) {
    noPressureHasPressureSpec++;
  }
});
assert(noPressureHasPressureSpec === 0, 'All 47 non-pressure machines correctly suppress pressure specifications');

const hotWaterMachines = catalogue.filter((m: any) => m.category === 'hot-water');
assert(hotWaterMachines.length === 43, `Exactly 43 hot-water machines in catalogue (found ${hotWaterMachines.length})`);
let hotWaterWithPressure = 0;
hotWaterMachines.forEach((m: any) => {
  if (formatPressure(m, 'metric').isSpecified) hotWaterWithPressure++;
});
assert(hotWaterWithPressure === 43, 'All 43 hot-water machines have active pressure specifications');

const pressureMachines = catalogue.filter((m: any) => categoryHasPressure(m.category));
assert(pressureMachines.length === 84, `Exactly 84 machines in pressure categories (found ${pressureMachines.length})`);
let pressureCategoryCount = 0;
pressureMachines.forEach((m: any) => {
  if (formatPressure(m, 'metric').isSpecified) pressureCategoryCount++;
});
assert(pressureCategoryCount === 84, 'All 84 pressure category machines (hot, cold, steam) have active pressure specs');

// Group 5: Electrical Specifications & Special Models
console.log('\n[Group 5: Electrical Specifications & Special Model Scrutiny]');
// Model 530B
const m530B = catalogue.find((m: any) => m.model_code === '530B');
assert(!!m530B, 'Model 530B exists in catalogue');
if (m530B) {
  const elec530B = formatElectrical(m530B);
  assert(elec530B.isSpecified, '530B has electrical specification');
  assert(elec530B.display.includes('Dual Phase') || elec530B.display.includes('3-Phase'), '530B electrical specifies dual or 3-phase correctly');
  assert(!elec530B.display.includes('13 Phase'), '530B does not contain corrupted "13 Phase"');
}

// Aqueous Parts Washers: 412, 612, 812A, 812B, 812C
const aqueousModels = ['412', '612', '812A', '812B', '812C'];
aqueousModels.forEach(code => {
  const m = catalogue.find((item: any) => item.model_code === code);
  assert(!!m, `Parts washer ${code} exists in catalogue`);
  if (m) {
    assert(m.phase === 3, `Parts washer ${code} is 3-Phase`);
    const elec = formatElectrical(m);
    assert(elec.display.includes('230/3 v') || elec.display.includes('3-Phase'), `Parts washer ${code} displays correct 3-phase voltage`);
    assert(!categoryHasPressure(m.category), `Parts washer ${code} does not display pressure`);
  }
});

// All Electric Hot Water: 108, 4208, 4308, 5308
const allElectricModels = ['108', '4208', '4308', '5308'];
allElectricModels.forEach(code => {
  const m = catalogue.find((item: any) => item.model_code === code);
  assert(!!m, `All-Electric model ${code} exists in catalogue`);
  if (m) {
    assert(m.category === 'hot-water', `All-Electric model ${code} is in hot-water category`);
    const p = formatPressure(m, 'metric');
    assert(p.isSpecified && p.raw! > 0, `All-Electric model ${code} has pressure (${p.display})`);
  }
});

// CSE Series: 216CSE, 320CSE
const cseModels = ['216CSE', '320CSE'];
cseModels.forEach(code => {
  const m = catalogue.find((item: any) => item.model_code === code);
  assert(!!m, `CSE model ${code} exists in catalogue`);
  if (m) {
    assert(m.phase === 1, `CSE model ${code} is 1-Phase`);
    assert(m.voltage === '230V / 1PH', `CSE model ${code} voltage is 230V / 1PH`);
  }
});

// Group 6: Specification Deduplication (BUG-07)
console.log('\n[Group 6: Specification Deduplication (BUG-07)]');
const m420X4 = catalogue.find((m: any) => m.model_code === '420X4');
assert(!!m420X4, 'Model 420X4 exists');
if (m420X4) {
  const rawCount = m420X4.extra_specs.length;
  const deduped = dedupeExtraSpecs(m420X4.extra_specs);
  assert(rawCount > deduped.length, `420X4 extra_specs deduplicated (from ${rawCount} to ${deduped.length})`);
  
  // Verify no duplicate labels in deduped array
  const seen = new Set<string>();
  let dupesInDeduped = 0;
  deduped.forEach((s: any) => {
    const key = s.label.toLowerCase().trim();
    if (seen.has(key)) dupesInDeduped++;
    seen.add(key);
  });
  assert(dupesInDeduped === 0, 'No duplicate labels remain after deduplication');
}

// Group 7: Factory Options and Features Coverage (BUG-09, BUG-11)
console.log('\n[Group 7: Factory Options and Features Coverage]');
let machinesWithOptions = 0;
let machinesWithFeatures = 0;
let machinesWithApplications = 0;

catalogue.forEach((m: any) => {
  if (Array.isArray(m.options) && m.options.length > 0) machinesWithOptions++;
  if (Array.isArray(m.features) && m.features.length > 0) machinesWithFeatures++;
  if (Array.isArray(m.applications) && m.applications.length > 0) machinesWithApplications++;
});

assert(machinesWithOptions === 131, `All 131 machines have factory options populated (found ${machinesWithOptions})`);
assert(machinesWithFeatures === 131, `All 131 machines have standard engineering features (found ${machinesWithFeatures})`);
assert(machinesWithApplications === 131, `All 131 machines have primary application use cases (found ${machinesWithApplications})`);

// Group 8: Technical Documentation Integrity (BUG-11 / brief section 11)
console.log('\n[Group 8: Technical Documentation Integrity]');
let withSpecPdf = 0;
let withBrochurePdf = 0;
let withManualPdf = 0;
let webOnlyHonest = 0;

catalogue.forEach((m: any) => {
  if (m.pdf_spec_url && m.pdf_spec_url.startsWith('https://alkota.com/')) withSpecPdf++;
  if (m.pdf_brochure_url && m.pdf_brochure_url.startsWith('https://alkota.com/')) withBrochurePdf++;
  if (m.pdf_manual_url && m.pdf_manual_url.startsWith('https://alkota.com/')) withManualPdf++;
  if (!m.pdf_spec_url && !m.pdf_brochure_url && !m.pdf_manual_url) webOnlyHonest++;
});

assert(withSpecPdf === 125, `Exactly 125 machines have verified manufacturer specification sheet (found ${withSpecPdf})`);
assert(webOnlyHonest === 6, `Exactly 6 machines honestly marked web-only without fabricated PDFs (found ${webOnlyHonest})`);

// Group 9: Character Sanitisation & HTML Entity Elimination
console.log('\n[Group 9: Character Sanitisation & HTML Entity Elimination]');
let textFieldsWithEntities = 0;
let textFieldsWithNbsp = 0;

catalogue.forEach((m: any) => {
  const checkFields = [
    m.uk_description,
    m.engineering_story,
    m.description,
    m.short_description,
    m.tagline,
    ...(m.features || []),
    ...(m.options || []),
    ...(m.applications || []),
  ];
  checkFields.forEach((str: any) => {
    if (typeof str === 'string') {
      if (/&[a-z0-9#]+;/i.test(str)) textFieldsWithEntities++;
      if (/\u00a0/.test(str)) textFieldsWithNbsp++;
    }
  });
});

assert(textFieldsWithEntities === 0, `0 HTML entities in customer-facing machine text (found ${textFieldsWithEntities})`);
assert(textFieldsWithNbsp === 0, `0 non-breaking spaces in customer-facing machine text (found ${textFieldsWithNbsp})`);

// Group 10: SEO & Structured Data Integrity
console.log('\n[Group 10: SEO & Structured Data Integrity]');
let missingMetaTitle = 0;
let missingMetaDesc = 0;
let accidentalNoIndex = 0;

catalogue.forEach((m: any) => {
  if (!m.meta_title || m.meta_title.trim() === '') missingMetaTitle++;
  if (!m.meta_description || m.meta_description.trim() === '') missingMetaDesc++;
  if (m.no_index === true) accidentalNoIndex++;
});

assert(missingMetaTitle === 0, 'All 131 machines have meta_title');
assert(missingMetaDesc === 0, 'All 131 machines have meta_description');
assert(accidentalNoIndex === 0, 'All 131 published machines have no_index=false');

// Summary
console.log('\n===============================================================');
console.log(`TOTAL PHASE 8.5 MACHINE DETAIL COMPLETENESS TESTS: ${passCount + failCount}`);
console.log(`PASSED: ${passCount}`);
console.log(`FAILED: ${failCount}`);
console.log('===============================================================\n');

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('Phase 8.5 Machine Detail & Specification Completeness PASSED with 0 errors!\n');
}
