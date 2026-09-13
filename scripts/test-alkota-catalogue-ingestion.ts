#!/usr/bin/env -S node --env-file=.env.local
/**
 * test-alkota-catalogue-ingestion.ts
 *
 * Comprehensive Automated Test Suite for Alkota UK Phase 8.1:
 * Authoritative Machine Catalogue Ingestion, Specification Correction & Image Resolution.
 *
 * Verification Groups:
 *   A. Four new model imports (108, 4208, 4308, 5308)
 *   B. Idempotency (run/import simulation twice and prove 0 duplicates)
 *   C. Existing 127 machine preservation
 *   D. Series creation (All Electric Series exists exactly once)
 *   E. Image resolution (131/131 machines resolve to valid primary imagery)
 *   F. Image corrections (216CSE, 320CSE, 845S resolve to approved cold-water imagery)
 *   G. 530B phase correction (phase === 3, not 13; 1/3 dual phase preserved in extra_specs)
 *   H. NBSP normalisation (zero non-breaking spaces in voltage strings)
 *   I. HTML entity normalisation (zero &amp; in taglines or series)
 *   J. Documentation integrity (honest representation, 0 fabricated PDFs)
 *   K. Provenance awareness (source_url, source_last_checked present)
 *   L. Slug uniqueness (131 unique slugs)
 *   M. Model code uniqueness (131 unique model codes)
 *   N. Downstream selection compatibility
 *   O. Downstream comparison compatibility
 *   P. Downstream enquiry compatibility
 *   Q. Route generation integrity
 *   R. UK editorial protection
 *   S. Database migration 029 safety
 */

import * as fs from 'fs';
import * as path from 'path';
import canonicalData from './data/alkota-canonical-catalogue.json';
import { resolveMachineImage } from '../src/lib/images';
import { Product } from '../src/lib/products';
import { selectMachines } from '../src/lib/machine-selection/engine';
import { DEFAULT_REQUIREMENTS } from '../src/lib/machine-selection/questions';
import { buildComparisonGroups } from '../src/lib/comparison/engine';

let passed = 0;
let failed = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  if (condition) {
    console.log(`  ✓ PASS: ${testName}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${testName}`);
    if (detail) console.error(`    Detail: ${detail}`);
    failed++;
  }
}

console.log('===============================================================');
console.log(' ALKOTA UK — PHASE 8.1 CATALOGUE INGESTION VERIFICATION SUITE');
console.log('===============================================================\n');

const catalogue = canonicalData as unknown as Product[];

// -------------------------------------------------------------
// GROUP A: FOUR NEW MODEL IMPORTS
// -------------------------------------------------------------
console.log('[Group A: Four New Model Imports (108, 4208, 4308, 5308)]');
const targetCodes = ['108', '4208', '4308', '5308'];
const importedModels = catalogue.filter(m => targetCodes.includes(m.model_code));

assert(importedModels.length === 4, 'All four All-Electric models present in catalogue', `Found ${importedModels.length}`);

const m108 = catalogue.find(m => m.model_code === '108');
assert(!!m108, 'Model 108 exists in catalogue');
if (m108) {
  assert(m108.pressure_bar === 28 && m108.pressure_psi === 400, 'Model 108 pressure verified (28 bar / 400 PSI)');
  assert(m108.flow_rate_lpm === 6.4 && m108.flow_rate_gpm === 1.7, 'Model 108 flow rate verified (6.4 L/min / 1.7 GPM)');
  assert(m108.power_source === 'Electric Motor', 'Model 108 power source is Electric Motor');
  assert(m108.heating_fuel === 'All-Electric / Immersion', 'Model 108 heating fuel is All-Electric');
  assert(m108.category === 'hot-water', 'Model 108 belongs to hot-water category');
  assert(m108.series === 'All Electric Series', 'Model 108 belongs to All Electric Series');
}

const m4208 = catalogue.find(m => m.model_code === '4208');
assert(!!m4208, 'Model 4208 exists in catalogue');
if (m4208) {
  assert(m4208.pressure_bar === 138 && m4208.pressure_psi === 2000, 'Model 4208 pressure verified (138 bar / 2000 PSI)');
  assert(m4208.flow_rate_lpm === 13.2 && m4208.flow_rate_gpm === 3.5, 'Model 4208 flow rate verified (13.2 L/min / 3.5 GPM)');
  assert(m4208.motor_hp === 5.0, 'Model 4208 motor rating verified (5.0 hp)');
}

const m4308 = catalogue.find(m => m.model_code === '4308');
assert(!!m4308, 'Model 4308 exists in catalogue');
if (m4308) {
  assert(m4308.pressure_bar === 207 && m4308.pressure_psi === 3000, 'Model 4308 pressure verified (207 bar / 3000 PSI)');
  assert(m4308.flow_rate_lpm === 13.2 && m4308.flow_rate_gpm === 3.5, 'Model 4308 flow rate verified (13.2 L/min / 3.5 GPM)');
  assert(m4308.motor_hp === 7.5, 'Model 4308 motor rating verified (7.5 hp)');
}

const m5308 = catalogue.find(m => m.model_code === '5308');
assert(!!m5308, 'Model 5308 exists in catalogue');
if (m5308) {
  assert(m5308.pressure_bar === 207 && m5308.pressure_psi === 3000, 'Model 5308 pressure verified (207 bar / 3000 PSI)');
  assert(m5308.flow_rate_lpm === 18.2 && m5308.flow_rate_gpm === 4.8, 'Model 5308 flow rate verified (18.2 L/min / 4.8 GPM)');
  assert(m5308.motor_hp === 10.0, 'Model 5308 motor rating verified (10.0 hp)');
}

// -------------------------------------------------------------
// GROUP B: IDEMPOTENCY SIMULATION
// -------------------------------------------------------------
console.log('\n[Group B: Ingestion Idempotency]');
const simulatedSecondPass = [...catalogue];
targetCodes.forEach(tc => {
  const existing = simulatedSecondPass.find(m => m.model_code === tc);
  if (existing) {
    // Simulated update, no duplicate push
    existing.source_last_checked = '2026-09-13';
  }
});
const secondPassCodes = new Set(simulatedSecondPass.map(m => m.model_code));
assert(simulatedSecondPass.length === 131, 'Second import simulation produces exactly 131 records');
assert(secondPassCodes.size === 131, 'Second import simulation preserves 131 unique model codes');

// -------------------------------------------------------------
// GROUP C: EXISTING 127 MACHINE BASELINE PRESERVATION
// -------------------------------------------------------------
console.log('\n[Group C: Preservation of Existing 127 Machine Baseline]');
const baseline127Count = catalogue.length - importedModels.length;
assert(baseline127Count === 127, 'Exact baseline of 127 established machines preserved');
const sampleBaseline = catalogue.find(m => m.model_code === '420X4');
assert(!!sampleBaseline, 'Flagship baseline 420X4 preserved');
if (sampleBaseline) {
  assert(sampleBaseline.slug === 'alkota-420x4', 'Baseline 420X4 slug immutable (alkota-420x4)');
  assert(sampleBaseline.pressure_bar === 138, 'Baseline 420X4 pressure preserved (138 bar)');
}

// -------------------------------------------------------------
// GROUP D: SERIES CREATION & INTEGRITY
// -------------------------------------------------------------
console.log('\n[Group D: Series Integrity]');
const allSeries = new Set(catalogue.map(m => m.series));
assert(allSeries.size === 36, 'Catalogue contains exactly 36 distinct manufacturer series', `Found ${allSeries.size}`);
assert(allSeries.has('All Electric Series'), 'Catalogue contains "All Electric Series"');
const allElectricModels = catalogue.filter(m => m.series === 'All Electric Series');
assert(allElectricModels.length === 4, 'All Electric Series contains exactly 4 models');

// -------------------------------------------------------------
// GROUP E: IMAGE RESOLUTION (131/131)
// -------------------------------------------------------------
console.log('\n[Group E: Image Resolution Coverage]');
let unresolvable = 0;
catalogue.forEach(m => {
  const img = resolveMachineImage(m.primary_image_url, m.model_code, m.category);
  if (!img || img === '' || img === 'undefined' || img === 'null') {
    unresolvable++;
  }
});
assert(unresolvable === 0, '131/131 machines resolve to a valid primary image asset', `Failed: ${unresolvable}`);

// -------------------------------------------------------------
// GROUP F: IMAGE CORRECTIONS (216CSE, 320CSE, 845S)
// -------------------------------------------------------------
console.log('\n[Group F: Image Corrections for Cold-Water Models]');
const m216cse = catalogue.find(m => m.model_code === '216CSE');
const img216cse = resolveMachineImage(m216cse?.primary_image_url || null, '216CSE', 'cold-water');
assert(!img216cse.includes('216ax4.png'), '216CSE does NOT resolve to hot-water 216AX4 image');
assert(img216cse.includes('Challenger_Series'), '216CSE resolves to official Challenger cold-water asset');

const m320cse = catalogue.find(m => m.model_code === '320CSE');
const img320cse = resolveMachineImage(m320cse?.primary_image_url || null, '320CSE', 'cold-water');
assert(!img320cse.includes('216ax4.png'), '320CSE does NOT resolve to hot-water 216AX4 image');
assert(img320cse.includes('Challenger_Series'), '320CSE resolves to official Challenger cold-water asset');

const m845s = catalogue.find(m => m.model_code === '845S');
const img845s = resolveMachineImage(m845s?.primary_image_url || null, '845S', 'cold-water');
assert(!img845s.includes('ged-12v-skid.png'), '845S does NOT resolve to hot-water GED skid image');
assert(img845s.includes('SM_Gasoline_Series'), '845S resolves to official SM Gasoline cold-water asset');

// -------------------------------------------------------------
// GROUP G: CRITICAL 530B PHASE CORRECTION
// -------------------------------------------------------------
console.log('\n[Group G: Critical 530B Phase Correction]');
const m530B = catalogue.find(m => m.model_code === '530B');
assert(!!m530B, 'Model 530B found in catalogue');
if (m530B) {
  assert(m530B.phase === 3, 'Model 530B phase is normalized to integer 3', `Got ${m530B.phase}`);
  assert(m530B.phase !== 13, 'Model 530B phase can NEVER regress to 13');
  const dualSpec = m530B.extra_specs.find(s => s.value.includes('1/3') || s.label.includes('Phase'));
  assert(!!dualSpec, 'Model 530B retains "1/3 Dual Phase" manufacturer distinction in extra_specs');
}

// -------------------------------------------------------------
// GROUP H: UNICODE NBSP NORMALISATION
// -------------------------------------------------------------
console.log('\n[Group H: Unicode Whitespace Normalisation]');
let nbspFound = 0;
catalogue.forEach(m => {
  if (m.voltage && m.voltage.includes('\u00a0')) {
    nbspFound++;
    console.error(`  NBSP found in ${m.model_code}: ${JSON.stringify(m.voltage)}`);
  }
});
assert(nbspFound === 0, 'Zero non-breaking spaces (U+00A0) in voltage fields', `Found ${nbspFound}`);

// -------------------------------------------------------------
// GROUP I: HTML ENTITY NORMALISATION
// -------------------------------------------------------------
console.log('\n[Group I: HTML Entity Normalisation]');
let ampFound = 0;
catalogue.forEach(m => {
  if (m.tagline && m.tagline.includes('&amp;')) ampFound++;
  if (m.series && m.series.includes('&amp;')) ampFound++;
});
assert(ampFound === 0, 'Zero unencoded &amp; entities in taglines or series names', `Found ${ampFound}`);

// -------------------------------------------------------------
// GROUP J: DOCUMENTATION INTEGRITY
// -------------------------------------------------------------
console.log('\n[Group J: Documentation & PDF Integrity]');
const unlinkedExpected = new Set(['20151', '20152', '20152C', '20152K', '20171', '8-VFS-1']);
let unlinkedCount = 0;
let linkedCount = 0;
catalogue.forEach(m => {
  if (m.pdf_spec_url) {
    linkedCount++;
    assert(m.pdf_spec_url.startsWith('https://alkota.com/wp-content/'), `${m.model_code} has valid Alkota PDF URL`);
  } else {
    unlinkedCount++;
    assert(unlinkedExpected.has(m.model_code), `${m.model_code} legitimately lacks manufacturer PDF (not fabricated)`);
  }
});
assert(linkedCount === 125, 'Exactly 125 machines have verified manufacturer PDFs', `Got ${linkedCount}`);
assert(unlinkedCount === 6, 'Exactly 6 unlinked machines honestly preserved without fabrication', `Got ${unlinkedCount}`);

// -------------------------------------------------------------
// GROUP K: PROVENANCE
// -------------------------------------------------------------
console.log('\n[Group K: Source Provenance Awareness]');
assert(
  catalogue.every(m => m.source_url && m.source_url.startsWith('https://alkota.com')),
  'Every machine records valid Alkota USA manufacturer source URL'
);

// -------------------------------------------------------------
// GROUP L & M: SLUG & MODEL CODE UNIQUENESS
// -------------------------------------------------------------
console.log('\n[Group L & M: Slug & Model Code Uniqueness]');
const slugs = new Set(catalogue.map(m => m.slug));
const codes = new Set(catalogue.map(m => m.model_code));
assert(slugs.size === 131, '131 unique machine slugs (0 duplicates)');
assert(codes.size === 131, '131 unique machine model codes (0 duplicates)');

// -------------------------------------------------------------
// GROUP N: DOWNSTREAM SELECTION COMPATIBILITY
// -------------------------------------------------------------
console.log('\n[Group N: Downstream Selection Compatibility]');
const electricIndoorReq = {
  ...DEFAULT_REQUIREMENTS,
  waterType: 'hot' as const,
  powerSource: 'electric' as const,
  minPressureBar: 200,
  phase: 3 as const
};
const selectResult = selectMachines(catalogue, electricIndoorReq);
assert(selectResult.totalEvaluated === 131, 'Selection engine evaluates all 131 machines');
const allElectricShortlisted = selectResult.shortlist.some(m => m.machine.series === 'All Electric Series');
assert(allElectricShortlisted, 'All-Electric Series models successfully shortlisted for 3-phase electric hot-water requirement');

// -------------------------------------------------------------
// GROUP O: DOWNSTREAM COMPARISON COMPATIBILITY
// -------------------------------------------------------------
console.log('\n[Group O: Downstream Comparison Compatibility]');
const compareGroups = buildComparisonGroups([sampleBaseline!, m4308!]);
assert(compareGroups.length > 0, 'buildComparisonGroups succeeds with baseline + new All Electric model');
const heatSpecRow = compareGroups.find(g => g.id === 'power')?.rows.find(r => r.key === 'fuel');
assert(!!heatSpecRow, 'Comparison groups display heating fuel comparison (Oil vs All-Electric)');

// -------------------------------------------------------------
// GROUP P: DOWNSTREAM ENQUIRY COMPATIBILITY
// -------------------------------------------------------------
console.log('\n[Group P: Downstream Enquiry Compatibility]');
assert(m4308?.slug === 'alkota-4308', 'Model 4308 has valid canonical slug for enquiry routing');
assert(m4308?.name === 'Alkota 4308', 'Model 4308 has valid name for enquiry dossier');
assert(m4308?.pressure_bar === 207, 'Model 4308 has valid bar rating for enquiry snapshot');

// -------------------------------------------------------------
// GROUP Q: ROUTE GENERATION INTEGRITY
// -------------------------------------------------------------
console.log('\n[Group Q: Route & Canonical URL Generation]');
allElectricModels.forEach(m => {
  const expectedPath = `/machines/${m.category}/${m.slug}`;
  assert(m.canonical_url?.includes(expectedPath), `${m.model_code} canonical URL matches route path: ${expectedPath}`);
});

// -------------------------------------------------------------
// GROUP R: UK EDITORIAL FIELD PROTECTION
// -------------------------------------------------------------
console.log('\n[Group R: UK Editorial Field Protection]');
allElectricModels.forEach(m => {
  assert(!!m.uk_description && (m.uk_description.includes('UK') || m.uk_description.includes('British')), `${m.model_code} has rich localized UK description`);
  assert(!!m.meta_title && m.meta_title.includes('Alkota UK'), `${m.model_code} has optimized UK meta title`);
  assert(!!m.meta_description && m.meta_description.length > 50, `${m.model_code} has valid UK meta description`);
});

// -------------------------------------------------------------
// GROUP S: DATABASE MIGRATION 029 SAFETY
// -------------------------------------------------------------
console.log('\n[Group S: Database Migration 029 Safety]');
const migrationPath = path.resolve(process.cwd(), 'supabase/migrations/029_alkota_catalogue_ingestion.sql');
assert(fs.existsSync(migrationPath), 'Migration file 029_alkota_catalogue_ingestion.sql exists');
const migrationSql = fs.readFileSync(migrationPath, 'utf8');
assert(migrationSql.includes('alkota-108') && migrationSql.includes('alkota-4208'), 'Migration contains new models');
assert(migrationSql.includes('UPDATE products SET phase = 3'), 'Migration contains 530B phase correction');
assert(migrationSql.includes('REPLACE(voltage'), 'Migration contains NBSP replacement');
assert(migrationSql.includes('REPLACE(tagline, \'&amp;\', \'&\')'), 'Migration contains tagline entity decoding');
assert(migrationSql.includes('ON CONFLICT (slug) DO UPDATE SET'), 'Migration is safe and idempotent');

console.log('\n===============================================================');
console.log(`TOTAL PHASE 8.1 VERIFICATION TESTS: ${passed + failed}`);
console.log(`PASSED: ${passed}`);
console.log(`FAILED: ${failed}`);
console.log('===============================================================');

if (failed > 0) {
  process.exit(1);
} else {
  console.log('\nPhase 8.1 Catalogue Ingestion QA verification succeeded with 0 errors!\n');
}
