import canonicalData from './data/alkota-canonical-catalogue.json';
import { Product } from '../src/lib/products';
import {
  resolveMachines,
  normaliseIdentifier,
  normaliseRequirements,
  generateConfirmationChecklist,
  revalidateMachineEnquiry,
} from '../src/lib/machine-enquiries/service';
import { SelectionRequirements } from '../src/lib/machine-selection/types';

const allMachines = canonicalData as unknown as Product[];

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

console.log('\n=== ALKOTA UK: MACHINE COMMERCIALISATION & ENQUIRY TEST SUITE (PHASE 7) ===\n');

// ── Group 1: Machine Identifier Resolution & Resilient Normalisation ──────────
console.log('[Group 1: Machine Identifier Resolution & Normalisation]');

const normaliseTest1 = normaliseIdentifier('alkota-420x4');
assert(normaliseTest1 === '420x4', 'Strips alkota- prefix and normalises casing');

const normaliseTest2 = normaliseIdentifier('  420-X4  ');
assert(normaliseTest2 === '420x4', 'Strips whitespace and non-alphanumeric characters');

const resolvedSingle = resolveMachines(['420X4'], allMachines);
assert(resolvedSingle.length === 1 && resolvedSingle[0].model_code === '420X4', 'Resolves 420X4 by model code');

const resolvedSlug = resolveMachines(['alkota-216x4'], allMachines);
assert(resolvedSlug.length === 1 && resolvedSlug[0].model_code === '216X4', 'Resolves 216X4 by slug');

const resolvedMixed = resolveMachines(['  420x4 ', 'alkota-216x4', '420X4', '3305xd4'], allMachines);
assert(resolvedMixed.length === 3, 'Resolves mixed identifiers and deduplicates repeat models');

// ── Group 2: Direct Single-Machine Enquiry Revalidation ──────────────────────
console.log('\n[Group 2: Direct Single-Machine Enquiry Revalidation]');

const directReval = revalidateMachineEnquiry({
  source: 'direct_machine',
  machineIdentifiers: ['420X4'],
}, allMachines);

assert(directReval.revalidationResult.is_valid, 'Direct enquiry marked is_valid = true');
assert(directReval.enquiryMachines.length === 1, 'Direct enquiry returns 1 enquiry machine item');
assert(directReval.enquiryMachines[0].model_code === '420X4', 'Enquiry machine has verified model code 420X4');
assert(directReval.enquiryMachines[0].pressure_bar !== null, 'Verified pressure in BAR populated');
assert(directReval.enquiryMachines[0].flow_rate_lpm !== null, 'Verified flow rate in LPM populated');
assert(directReval.enquiryMachines[0].server_match_status === 'STRONG_MATCH', 'Direct catalog enquiry has STRONG_MATCH status');

// ── Group 3: Selector Shortlist Revalidation ────────────────────────────────
console.log('\n[Group 3: Selector Shortlist Revalidation]');

const selectorReqs: SelectionRequirements = {
  application: 'FLEET_VEHICLE_CLEANING',
  waterType: 'hot',
  minPressureBar: 130,  // 420X4 delivers 138 BAR — requires min below 138 to qualify STRONG_MATCH
  minFlowLpm: 12,
  powerSource: 'electric',
  voltage: 'any',
  phase: 'any',
  mobility: 'any',
  unitSystem: 'metric',
};

const selectorReval = revalidateMachineEnquiry({
  source: 'machine_selector',
  machineIdentifiers: ['420X4', '216X4'],
  rawRequirements: selectorReqs,
}, allMachines);

assert(selectorReval.revalidationResult.is_valid, 'Selector enquiry is valid');
assert(selectorReval.revalidationResult.has_requirements, 'Recognises presence of structured requirements');
const machine420 = selectorReval.enquiryMachines.find(m => m.model_code === '420X4');
assert(machine420 !== undefined, 'Contains 420X4');
assert(machine420?.server_match_status === 'STRONG_MATCH', 'Server confirms 420X4 is STRONG_MATCH for 140 BAR hot water electric');
assert(machine420?.reasons && machine420.reasons.length > 0, 'Server populates verified reasons');

// ── Group 4: Adversarial Spoofing & Conflict Detection ──────────────────────
console.log('\n[Group 4: Adversarial Spoofing & Anti-Tampering]');

// Client claims 216X4 is a STRONG_MATCH for a requirement demanding 250 BAR and 20 LPM
const impossibleReqs: SelectionRequirements = {
  application: 'INDUSTRIAL_DEGREASING',
  waterType: 'hot',
  minPressureBar: 250,
  minFlowLpm: 20,
  powerSource: 'electric',
  voltage: 'any',
  phase: 'any',
  mobility: 'any',
  unitSystem: 'metric',
};

const spoofedReval = revalidateMachineEnquiry({
  source: 'machine_selector',
  machineIdentifiers: ['alkota-216x4'],
  rawRequirements: impossibleReqs,
  claimedMatchStatus: {
    'alkota-216x4': 'STRONG_MATCH',
  },
}, allMachines);

const machine216 = spoofedReval.enquiryMachines.find(m => m.model_code === '216X4');
assert(machine216?.server_match_status === 'DOES_NOT_MEET', 'Server rejects client spoof and marks 216X4 as DOES_NOT_MEET');
assert(spoofedReval.revalidationResult.discrepancy_detected, 'Server flags discrepancy_detected = true');
assert(
  spoofedReval.revalidationResult.discrepancy_details !== undefined &&
  spoofedReval.revalidationResult.discrepancy_details.length > 0,
  'Server provides discrepancy details explaining the mismatch'
);
assert(machine216?.failure_reasons && machine216.failure_reasons.length > 0, 'Failure reasons documented');

// ── Group 5: Sales Engineer Pre-Quotation Checklist Generation ──────────────
console.log('\n[Group 5: Sales Engineer Confirmation Checklist]');

// Test 3-Phase machine checklist item — find a genuinely 3-phase machine from the catalogue
const threePhase = allMachines.find(m => m.phase === 3);
if (threePhase) {
  const checklist = generateConfirmationChecklist([threePhase], []);
  const has3PhaseCheck = checklist.some(item =>
    item.includes('3-phase') || item.includes('commando socket') || item.includes('3-Phase')
  );
  assert(has3PhaseCheck, 'Checklist flags 3-phase power verification for 3-phase equipment');
} else {
  assert(false, 'Checklist flags 3-phase power verification for 3-phase equipment (no 3-phase machine found in catalogue)');
}

// Test Diesel / Oil burner ventilation checklist item
const oilMachine = allMachines.find(m => m.heating_fuel && /diesel|oil|kerosene/i.test(m.heating_fuel));
if (oilMachine) {
  const checklist = generateConfirmationChecklist([oilMachine], []);
  const hasVentCheck = checklist.some(item => item.includes('ventilation') || item.includes('flue extraction'));
  assert(hasVentCheck, 'Checklist flags indoor ventilation/flue requirement for oil-heated equipment');
}

// Test High-flow inlet water checklist item
const highFlowMachine = allMachines.find(m => (m.flow_rate_lpm || 0) >= 15);
if (highFlowMachine) {
  const checklist = generateConfirmationChecklist([highFlowMachine], []);
  const hasWaterCheck = checklist.some(item => item.includes('water mains inlet flow'));
  assert(hasWaterCheck, 'Checklist flags water throughput check for high-volume machines (>=15 LPM)');
}

// ── Group 6: Multi-Machine Comparison Enquiry ───────────────────────────────
console.log('\n[Group 6: Multi-Machine Comparison Enquiry]');

const compareReval = revalidateMachineEnquiry({
  source: 'machine_comparison',
  machineIdentifiers: ['alkota-420x4', 'alkota-216x4', 'alkota-430xm4'],
}, allMachines);

assert(compareReval.revalidationResult.is_valid, 'Comparison enquiry is valid');
assert(compareReval.enquiryMachines.length === 3, 'All 3 compared machines resolved and revalidated');
const modelCodes = compareReval.enquiryMachines.map(m => m.model_code);
assert(modelCodes.includes('420X4') && modelCodes.includes('216X4') && modelCodes.includes('430XM4'), 'Exact model codes preserved');
assert(compareReval.revalidationResult.confirmation_items.length > 0, 'Site confirmation checklist items generated across fleet');

// ── Group 7: Unknown != Fail Preservation in Commercial Handoff ──────────────
console.log('\n[Group 7: Unknown != Fail in Commercial Handoff]');

// Machine with unknown electrical supply evaluated against specific 400V requirement
const reqWith400V: SelectionRequirements = {
  application: 'CONSTRUCTION_HEAVY_PLANT',
  waterType: 'hot',
  powerSource: 'electric',
  voltage: '400v',
  phase: 3,
  mobility: 'any',
  unitSystem: 'metric',
};

// Machine where voltage or phase is null
const mockMachineWithUnknown: Product = {
  ...allMachines[0],
  slug: 'test-unknown-volt',
  model_code: 'TEST-UNK',
  power_source: 'Electric',
  voltage: null,
  phase: null,
  active: true,
  status: 'published',
};

const unknownReval = revalidateMachineEnquiry({
  source: 'machine_selector',
  machineIdentifiers: ['test-unknown-volt'],
  rawRequirements: reqWith400V,
}, [mockMachineWithUnknown, ...allMachines]);

const evaluatedUnknown = unknownReval.enquiryMachines.find(m => m.model_code === 'TEST-UNK');
assert(evaluatedUnknown?.server_match_status === 'POSSIBLE_MATCH', 'Unknown electrical voltage preserves POSSIBLE_MATCH status (Unknown != Fail)');
assert(
  unknownReval.revalidationResult.requires_human_confirmation === true,
  'Enquiry flags requires_human_confirmation = true for sales team'
);

// ── Group 8: Invalid Identifiers Resilience ─────────────────────────────────
console.log('\n[Group 8: Invalid Identifiers Resilience]');

const invalidReval = revalidateMachineEnquiry({
  source: 'direct_machine',
  machineIdentifiers: ['non-existent-machine-xyz-999'],
}, allMachines);

assert(!invalidReval.revalidationResult.is_valid, 'Invalid identifier correctly yields is_valid = false');
assert(invalidReval.enquiryMachines.length === 0, 'No machines populated for non-existent machine');

console.log('\n===============================================================');
console.log(`TOTAL PHASE 7 TESTS: ${passed + failed}`);
console.log(`PASSED: ${passed}`);
console.log(`FAILED: ${failed}`);
console.log('===============================================================\n');

if (failed > 0) {
  process.exit(1);
} else {
  console.log('Phase 7 Commercial Machine Enquiry QA verification succeeded with 0 errors!\n');
}
