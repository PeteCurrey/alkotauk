import fs from 'fs';
import path from 'path';
import { resolveMachineImage } from '../src/lib/images';

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
console.log('Alkota UK — Phase 8.4 Manufacturer Source Reconciliation Tests');
console.log('===============================================================\n');

// 1. Load canonical catalogue and source reconciliation dataset
const cataloguePath = path.join(process.cwd(), 'scripts/data/alkota-canonical-catalogue.json');
const reconciliationPath = path.join(process.cwd(), 'scripts/data/alkota-131-source-reconciliation.json');

assert(fs.existsSync(cataloguePath), 'Canonical catalogue JSON exists');
assert(fs.existsSync(reconciliationPath), 'Reconciliation dataset JSON exists');

const catalogue = JSON.parse(fs.readFileSync(cataloguePath, 'utf-8'));
const reconciliation = JSON.parse(fs.readFileSync(reconciliationPath, 'utf-8'));

console.log('\n[Group 1: Exact Machine Counts & Routing Identity]');
assert(catalogue.length === 131, `Exactly 131 machines in canonical catalogue (found ${catalogue.length})`);
assert(reconciliation.length === 131, `Exactly 131 records in reconciliation dataset (found ${reconciliation.length})`);

const published = catalogue.filter((m: any) => m.status === 'published' && m.active === true);
assert(published.length === 131, `All 131 machines are status="published" and active=true (found ${published.length})`);

// 2. Slug and Model Code Uniqueness
console.log('\n[Group 2: Slug and Model Code Uniqueness]');
const slugs = new Set<string>();
const modelCodes = new Set<string>();
let duplicateSlugs = 0;
let duplicateCodes = 0;

catalogue.forEach((m: any) => {
  if (slugs.has(m.slug)) duplicateSlugs++;
  slugs.add(m.slug);

  if (modelCodes.has(m.model_code)) duplicateCodes++;
  modelCodes.add(m.model_code);
});

assert(duplicateSlugs === 0, `No duplicate machine slugs found (total unique: ${slugs.size})`);
assert(duplicateCodes === 0, `No duplicate model codes found (total unique: ${modelCodes.size})`);

// 3. Manufacturer Source Provenance
console.log('\n[Group 3: Manufacturer Source Provenance]');
let missingSource = 0;
let invalidSourceDomain = 0;

reconciliation.forEach((r: any) => {
  if (!r.source_url) missingSource++;
  else if (!r.source_url.startsWith('https://alkota.com/')) invalidSourceDomain++;
});

assert(missingSource === 0, 'Every machine has a manufacturer source record');
assert(invalidSourceDomain === 0, 'Every machine source URL is on authoritative alkota.com domain');

// 4. Primary Image Validation and Resolution
console.log('\n[Group 4: Primary Image Resolution & Integrity]');
let invalidPrimaryImage = 0;
let emptyResolvedImage = 0;
let crossModelCorruptedImage = 0;

catalogue.forEach((m: any) => {
  if (!m.primary_image_url || m.primary_image_url.trim() === '') invalidPrimaryImage++;
  const resolved = resolveMachineImage(m.primary_image_url, m.model_code, m.category);
  if (!resolved || resolved.trim() === '') emptyResolvedImage++;
});

assert(invalidPrimaryImage === 0, 'All 131 machines have a valid primary image URL');
assert(emptyResolvedImage === 0, 'All 131 machines successfully resolve an image via resolveMachineImage()');

// 5. Specification Precision & Formatting Sanitisation
console.log('\n[Group 5: Specification Precision & Character Sanitation]');
let htmlEntityCount = 0;
let nbspCount = 0;

catalogue.forEach((m: any) => {
  const jsonStr = JSON.stringify(m);
  if (/&[a-z0-9#]+;/i.test(jsonStr)) {
    htmlEntityCount++;
  }
  if (/\u00a0/.test(jsonStr)) {
    nbspCount++;
  }
});

assert(htmlEntityCount === 0, `No HTML entities in manufacturer specification fields (found ${htmlEntityCount})`);
assert(nbspCount === 0, `No non-breaking spaces (NBSP) in catalogue strings (found ${nbspCount})`);

// 6. Phase and Voltage Parsing Precision
console.log('\n[Group 6: Electrical & Phase Precision]');
let corruptedPhase = 0;
let invalidVoltages = 0;

catalogue.forEach((m: any) => {
  // Phase should be a positive integer or null if not published
  if (m.phase !== null && (typeof m.phase !== 'number' || m.phase < 1 || m.phase > 3)) {
    corruptedPhase++;
  }
  // Check for corrupted strings like "13" from "1/3"
  if (m.voltage && /13\s*v/i.test(m.voltage)) {
    invalidVoltages++;
  }
});

assert(corruptedPhase === 0, `No phase parsing corruption (all phases are 1, 3, or null)`);
assert(invalidVoltages === 0, `No invalid voltage strings detected`);

// Model 530B Scrutiny
const model530B = catalogue.find((m: any) => m.model_code === '530B');
assert(model530B && model530B.phase === 3, 'Model 530B phase is accurately recorded as 3-phase');
assert(model530B && model530B.voltage === '230 v', 'Model 530B voltage is accurately recorded as 230 v');

// 7. No Accidental 0/N/A Replacing Unknown Data
console.log('\n[Group 7: Absolute Data Integrity (Unknown != Zero / N/A)]');
let zeroPressureCount = 0;
let zeroFlowCount = 0;
let stringZeroOrNA = 0;

catalogue.forEach((m: any) => {
  if (m.pressure_bar === 0 || m.pressure_psi === 0) zeroPressureCount++;
  if (m.flow_rate_lpm === 0 || m.flow_rate_gpm === 0) zeroFlowCount++;

  ['flow_rate_gpm', 'flow_rate_lpm', 'pressure_psi', 'pressure_bar', 'motor_hp', 'motor_kw'].forEach(k => {
    if (m[k] === 'N/A' || m[k] === '0' || m[k] === 'none') stringZeroOrNA++;
  });
});

assert(zeroPressureCount === 0, 'No accidental zero pressure values');
assert(zeroFlowCount === 0, 'No accidental zero flow values');
assert(stringZeroOrNA === 0, 'No fake string "0" or "N/A" stored in numeric specification fields');

// 8. Technical Documentation Verification
console.log('\n[Group 8: Technical Documentation Provenance]');
let validPdfDocs = 0;
let legitimateNoPdf = 0;
const expectedNoPdfModels = ['20151', '20152', '20152C', '20152K', '20171', '8-VFS-1'];

reconciliation.forEach((r: any) => {
  if (r.documentation.doc_status === 'VERIFIED_PDF_AVAILABLE') {
    if (r.documentation.pdf_spec_url?.startsWith('https://alkota.com/')) {
      validPdfDocs++;
    }
  } else if (r.documentation.doc_status === 'VERIFIED_NO_MANUFACTURER_PDF') {
    if (expectedNoPdfModels.includes(r.model_code)) {
      legitimateNoPdf++;
    }
  }
});

assert(validPdfDocs === 125, `Exactly 125 models linked to verified Alkota PDF documents (found ${validPdfDocs})`);
assert(legitimateNoPdf === 6, `Exactly 6 models honestly documented as web-only without PDF fabrication (found ${legitimateNoPdf})`);

// 9. Special Scrutiny Audit Models
console.log('\n[Group 9: Special Scrutiny Models]');
const scrutinyList = ['108', '4208', '4308', '5308', '216CSE', '320CSE', '845S', '530B', '420S', '420BD', '420X4', '216AX4'];

scrutinyList.forEach(code => {
  const rec = reconciliation.find((r: any) => r.model_code === code);
  assert(!!rec, `Special scrutiny model ${code} present in reconciliation`);
  assert(rec?.source_status === 'VERIFIED', `Special scrutiny model ${code} has source_status=VERIFIED`);
  assert(rec?.imagery.resolved_image_path.length > 0, `Special scrutiny model ${code} has resolved image`);
  assert(rec?.scoring.overall_confidence_score >= 85, `Special scrutiny model ${code} has high confidence score (${rec?.scoring.overall_confidence_score}%)`);
});

// 10. Completeness Scoring Distribution
console.log('\n[Group 10: Completeness Scoring Distribution]');
let scoreUnder80 = 0;
let totalConfidence = 0;

reconciliation.forEach((r: any) => {
  totalConfidence += r.scoring.overall_confidence_score;
  if (r.scoring.overall_confidence_score < 80) scoreUnder80++;
});

const avgConfidence = Math.round(totalConfidence / reconciliation.length);
assert(scoreUnder80 === 0, `All 131 models have confidence score >= 80% (lowest found: ${Math.min(...reconciliation.map((r: any) => r.scoring.overall_confidence_score))}%)`);
assert(avgConfidence >= 90, `Average catalogue confidence score is >= 90% (achieved ${avgConfidence}%)`);

// Summary
console.log('\n===============================================================');
console.log(`TOTAL PHASE 8.4 RECONCILIATION TESTS: ${passCount + failCount}`);
console.log(`PASSED: ${passCount}`);
console.log(`FAILED: ${failCount}`);
console.log('===============================================================\n');

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('Phase 8.4 Manufacturer Source Reconciliation QA verification SUCCEEDED with 0 errors!\n');
}
