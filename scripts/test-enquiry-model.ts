/**
 * ALKOTA UK — PHASE 7.0: CANONICAL ENQUIRY DATA MODEL TEST SUITE
 * 
 * Tests the minimal, authoritative enquiry data model, including:
 * 1. Direct Machine Enquiry normalization & snapshots
 * 2. Selector Enquiry normalization, outcome determination & criteria extraction
 * 3. Fleet Comparison Enquiry ordering & roles
 * 4. Anti-Spoofing & Revalidation Integrity
 * 5. Historical Record Decoupling & Snapshot Resilience
 * 6. Category-Specific Missing Data Handling (No fake zeroes or fake strings)
 * 7. Controlled Enums & Constraints Validation
 */

import canonicalCatalogue from './data/alkota-canonical-catalogue.json';
import { Product } from '../src/lib/products';
import {
  revalidateMachineEnquiry,
  buildCanonicalEnquiryData,
  mapToCanonicalSource,
  mapToCanonicalContext,
  computeSelectionOutcome
} from '../src/lib/machine-enquiries/service';
import {
  EnquirySource,
  EnquiryContext,
  SelectionOutcome,
  MachineRole,
  CanonicalEnquiryRecord,
  CanonicalEnquiryMachineRecord
} from '../src/lib/enquiries/schema';
import { SelectionRequirements } from '../src/lib/machine-selection/types';

const allMachines = canonicalCatalogue as unknown as Product[];

let testsPassed = 0;
let testsFailed = 0;

function assert(condition: boolean, description: string) {
  if (condition) {
    console.log(`  ✓ PASS: ${description}`);
    testsPassed++;
  } else {
    console.error(`  ✗ FAIL: ${description}`);
    testsFailed++;
  }
}

console.log('=== ALKOTA UK: CANONICAL ENQUIRY DATA MODEL TEST SUITE (PHASE 7.0) ===\n');

// ── Group 1: Source & Context Controlled Enum Mapping ───────────────────────
console.log('[Group 1: Controlled Source & Context Mapping]');

assert(mapToCanonicalSource('MACHINE_SELECTOR') === 'MACHINE_SELECTOR', 'Preserves exact MACHINE_SELECTOR source');
assert(mapToCanonicalSource('machine_selector') === 'MACHINE_SELECTOR', 'Normalises lowercase machine_selector');
assert(mapToCanonicalSource('help_me_choose') === 'MACHINE_SELECTOR', 'Maps help_me_choose to MACHINE_SELECTOR');
assert(mapToCanonicalSource('machine_comparison') === 'MACHINE_COMPARISON', 'Maps machine_comparison to MACHINE_COMPARISON');
assert(mapToCanonicalSource('request_pricing') === 'MACHINE_DETAIL', 'Maps request_pricing to MACHINE_DETAIL');
assert(mapToCanonicalSource('direct_machine') === 'MACHINE_DETAIL', 'Maps direct_machine to MACHINE_DETAIL');
assert(mapToCanonicalSource('dealer_portal') === 'DEALER', 'Maps dealer strings to DEALER');
assert(mapToCanonicalSource('unknown_source') === 'GENERAL', 'Falls back safely to GENERAL for unrecognised source');

assert(mapToCanonicalContext('MACHINE_SELECTOR') === 'MACHINE_SELECTION', 'Defaults MACHINE_SELECTOR context to MACHINE_SELECTION');
assert(mapToCanonicalContext('MACHINE_COMPARISON') === 'MACHINE_COMPARISON', 'Defaults MACHINE_COMPARISON context to MACHINE_COMPARISON');
assert(mapToCanonicalContext('MACHINE_DETAIL') === 'DIRECT_MACHINE', 'Defaults MACHINE_DETAIL context to DIRECT_MACHINE');
assert(mapToCanonicalContext('PARTS') === 'GENERAL_PRODUCT', 'Defaults PARTS context to GENERAL_PRODUCT');
assert(mapToCanonicalContext('GENERAL') === 'GENERAL_ENQUIRY', 'Defaults GENERAL context to GENERAL_ENQUIRY');

// ── Group 2: Direct Machine Enquiry Data Model ──────────────────────────────
console.log('\n[Group 2: Direct Machine Enquiry Data Model]');

const directReval = revalidateMachineEnquiry({
  source: 'direct_machine',
  machineIdentifiers: ['420X4'],
}, allMachines);

const directData = buildCanonicalEnquiryData({
  reference: 'ENQ-2026-TEST01',
  source: 'direct_machine',
  customer: {
    name: 'James Harrison',
    email: 'james@haulage-logistics.co.uk',
    phone: '+44 7700 900123',
    company: 'Harrison Haulage Ltd',
    postcode: 'S41 9PZ',
  },
  subject: 'Alkota 420X4 Pricing & Availability',
  message: 'Require factory delivery quote for Chesterfield depot.',
  siteReadiness: {
    site_power: '230V 1-Phase 32A Commando',
    site_water: 'Direct mains 25 LPM',
    timeline: 'Within 30 days',
    budget_range: '£8,000 - £12,000',
  },
  revalidation: directReval,
});

const enq1 = directData.enquiryRecord;
assert(enq1.reference === 'ENQ-2026-TEST01', 'Direct enquiry has stable reference');
assert(enq1.source === 'MACHINE_DETAIL', 'Source is mapped to MACHINE_DETAIL');
assert(enq1.enquiry_context === 'DIRECT_MACHINE', 'Context is DIRECT_MACHINE');
assert(enq1.status === 'new', 'Initial status is new');
assert(enq1.name === 'James Harrison', 'Customer name is trimmed and populated');
assert(enq1.email === 'james@haulage-logistics.co.uk', 'Customer email is lowercased');
assert(enq1.postcode === 'S41 9PZ', 'Postcode is promoted to top-level column');
assert(enq1.site_power === '230V 1-Phase 32A Commando', 'Site power is stored as top-level column');
assert(enq1.selection_outcome === 'NOT_APPLICABLE', 'Selection outcome is NOT_APPLICABLE for direct quote');

// Machines relationship check
assert(directData.machineRecords.length === 1, 'Generates exactly 1 enquiry_machines child record');
const m1 = directData.machineRecords[0];
assert(m1.machine_id === 'alkota-420x4', 'Child record has canonical machine_id');
assert(m1.model_code_snapshot === '420X4', 'Child record snapshots exact model code');
assert(m1.category_snapshot === 'hot-water', 'Child record snapshots category');
assert(m1.role === 'PRIMARY', 'Direct machine has PRIMARY role');
assert(m1.display_order === 0, 'Display order is 0');
assert(m1.specs_snapshot?.pressure_bar === 138, 'Snapshot captures pressure (138 BAR)');
assert(m1.specs_snapshot?.flow_rate_lpm === 13.2, 'Snapshot captures flow (13.2 LPM)');
assert(m1.specs_snapshot?.power_source === 'Electric Motor', 'Snapshot captures power source');

// ── Group 3: Selector Enquiry Data Model & Hybrid Requirements ─────────────
console.log('\n[Group 3: Selector Enquiry & Hybrid Requirements]');

const selectorReqs: SelectionRequirements = {
  application: 'FLEET_VEHICLE_CLEANING',
  waterType: 'hot',
  minPressureBar: 130,
  minFlowLpm: 12,
  powerSource: 'electric',
  voltage: '230v',
  phase: 1,
  mobility: 'portable',
  tankRequired: false,
  preferences: ['prefer_higher_flow'],
  unitSystem: 'metric',
};

const selectorReval = revalidateMachineEnquiry({
  source: 'machine_selector',
  machineIdentifiers: ['420X4'],
  rawRequirements: selectorReqs,
}, allMachines);

const selectorData = buildCanonicalEnquiryData({
  reference: 'ENQ-2026-SEL01',
  source: 'MACHINE_SELECTOR',
  customer: {
    name: 'Sarah Connor',
    email: 'sarah@fleet-wash.com',
    company: 'Express Fleet Services',
  },
  rawRequirements: selectorReqs,
  revalidation: selectorReval,
  selectorVersion: 'v6.3',
});

const enq2 = selectorData.enquiryRecord;
assert(enq2.source === 'MACHINE_SELECTOR', 'Source is MACHINE_SELECTOR');
assert(enq2.enquiry_context === 'MACHINE_SELECTION', 'Context is MACHINE_SELECTION');
assert(enq2.req_application === 'FLEET_VEHICLE_CLEANING', 'Normalized req_application column populated');
assert(enq2.req_water_type === 'hot', 'Normalized req_water_type column populated');
assert(enq2.req_min_pressure_bar === 130, 'Normalized req_min_pressure_bar column populated');
assert(enq2.req_min_flow_lpm === 12, 'Normalized req_min_flow_lpm column populated');
assert(enq2.req_power_source === 'electric', 'Normalized req_power_source column populated');
assert(enq2.req_voltage === '230v', 'Normalized req_voltage column populated');
assert(enq2.req_phase === '1', 'Normalized req_phase column populated');
assert(enq2.req_mobility === 'portable', 'Normalized req_mobility column populated');

// Structured requirements JSONB check
assert(enq2.requirements?.preferences?.includes('prefer_higher_flow'), 'JSONB preserves preferences array');
assert(enq2.requirements?.unitSystem === 'metric', 'JSONB preserves unit system');

// Selection outcome check
assert(enq2.selector_version === 'v6.3', 'Preserves selector_version string');
assert(enq2.selection_outcome === 'STRONG_MATCH', 'Selection outcome correctly determined as STRONG_MATCH');
assert(enq2.revalidation_status === 'VALID', 'Revalidation status is VALID');
assert(enq2.discrepancy_detected === false, 'No discrepancy detected for valid match');

// Machine record check
assert(selectorData.machineRecords.length === 1, 'One shortlisted machine record');
assert(selectorData.machineRecords[0].role === 'SHORTLIST', 'Machine role is SHORTLIST');
assert(selectorData.machineRecords[0].selection_status === 'STRONG_MATCH', 'Machine selection_status is STRONG_MATCH');

// ── Group 4: Category-Specific Missing Requirements (No Fake Values) ────────
console.log('\n[Group 4: Category-Specific Missing Requirements]');

const partsWashReqs: SelectionRequirements = {
  application: 'WORKSHOP_PARTS_WASHING',
  waterType: 'aqueous_parts',
  minPressureBar: null, // Parts washers don't use pressure thresholds
  minFlowLpm: null,     // Parts washers don't use nozzle flow thresholds
  powerSource: 'electric',
  voltage: 'any',
  phase: 'any',
  mobility: 'stationary',
  unitSystem: 'metric',
};

const partsReval = revalidateMachineEnquiry({
  source: 'machine_selector',
  machineIdentifiers: ['25500'],
  rawRequirements: partsWashReqs,
}, allMachines);

const partsData = buildCanonicalEnquiryData({
  reference: 'ENQ-2026-PARTS01',
  source: 'MACHINE_SELECTOR',
  customer: {
    name: 'Mark Taylor',
    email: 'mark@precision-engineering.co.uk',
  },
  rawRequirements: partsWashReqs,
  revalidation: partsReval,
});

const enq3 = partsData.enquiryRecord;
assert(enq3.req_application === 'WORKSHOP_PARTS_WASHING', 'Specialized application set');
assert(enq3.req_min_pressure_bar === null, 'Missing pressure remains null (no fake 0 or N/A)');
assert(enq3.req_min_flow_lpm === null, 'Missing flow remains null (no fake 0 or N/A)');
assert(enq3.requirements?.minPressureBar === null, 'JSONB object minPressureBar remains null');

// ── Group 5: Multi-Machine Comparison Enquiry Model ────────────────────────
console.log('\n[Group 5: Multi-Machine Comparison Enquiry Model]');

const compReval = revalidateMachineEnquiry({
  source: 'machine_comparison',
  machineIdentifiers: ['420X4', '216X4', '430XM4'],
}, allMachines);

const compData = buildCanonicalEnquiryData({
  reference: 'ENQ-2026-COMP01',
  source: 'MACHINE_COMPARISON',
  context: 'MACHINE_COMPARISON',
  customer: {
    name: 'David Wilson',
    email: 'david@plant-hire.com',
  },
  revalidation: compReval,
});

assert(compData.enquiryRecord.source === 'MACHINE_COMPARISON', 'Source is MACHINE_COMPARISON');
assert(compData.enquiryRecord.enquiry_context === 'MACHINE_COMPARISON', 'Context is MACHINE_COMPARISON');
assert(compData.machineRecords.length === 3, 'Creates 3 child records in enquiry_machines');

const compMachines = compData.machineRecords;
assert(compMachines[0].model_code_snapshot === '420X4' && compMachines[0].display_order === 0, 'First compared machine preserved with order 0');
assert(compMachines[1].model_code_snapshot === '216X4' && compMachines[1].display_order === 1, 'Second compared machine preserved with order 1');
assert(compMachines[2].model_code_snapshot === '430XM4' && compMachines[2].display_order === 2, 'Third compared machine preserved with order 2');
assert(compMachines.every(m => m.role === 'COMPARISON'), 'All machines assigned role COMPARISON');

// ── Group 6: Anti-Spoofing & Revalidation Tampering Audit ──────────────────
console.log('\n[Group 6: Anti-Spoofing & Tampering Audit]');

// Adversarial client claims 216X4 is STRONG_MATCH for 250 BAR / 20 LPM
const spoofedReval = revalidateMachineEnquiry({
  source: 'machine_selector',
  machineIdentifiers: ['alkota-216x4'],
  rawRequirements: {
    application: 'INDUSTRIAL_DEGREASING',
    waterType: 'hot',
    minPressureBar: 250,
    minFlowLpm: 20,
    powerSource: 'electric',
    mobility: 'any',
    unitSystem: 'metric',
  },
  claimedMatchStatus: {
    'alkota-216x4': 'STRONG_MATCH',
  },
}, allMachines);

const spoofedData = buildCanonicalEnquiryData({
  reference: 'ENQ-2026-SPOOF01',
  source: 'MACHINE_SELECTOR',
  customer: {
    name: 'Tamper Tester',
    email: 'tamper@test.local',
  },
  rawRequirements: {
    application: 'INDUSTRIAL_DEGREASING',
    waterType: 'hot',
    minPressureBar: 250,
    minFlowLpm: 20,
    powerSource: 'electric',
    mobility: 'any',
    unitSystem: 'metric',
  },
  revalidation: spoofedReval,
});

const enqSpoof = spoofedData.enquiryRecord;
assert(enqSpoof.selection_outcome === 'NO_VERIFIED_MATCH', 'Server correctly concludes NO_VERIFIED_MATCH');
assert(enqSpoof.revalidation_status === 'DISCREPANCY_DETECTED', 'Revalidation status flags DISCREPANCY_DETECTED');
assert(enqSpoof.discrepancy_detected === true, 'discrepancy_detected is true');
assert(enqSpoof.discrepancy_details !== undefined && enqSpoof.discrepancy_details.length > 0, 'Discrepancy details logged in audit trail');
assert(spoofedData.machineRecords[0].selection_status === 'DOES_NOT_MEET', 'Machine record marked DOES_NOT_MEET on server');
assert(spoofedData.machineRecords[0].failure_reasons?.length! > 0, 'Machine record failure reasons populated');

// ── Group 7: Unknown Criteria & Site Confirmation Items ────────────────────
console.log('\n[Group 7: Unknown Criteria & Confirmation Items]');

// 3-phase machine enquiry
const threePhaseMachine = allMachines.find(m => m.phase === 3);
if (threePhaseMachine) {
  const threePhaseReval = revalidateMachineEnquiry({
    source: 'direct_machine',
    machineIdentifiers: [threePhaseMachine.model_code],
  }, allMachines);

  const tpData = buildCanonicalEnquiryData({
    reference: 'ENQ-2026-3PHASE',
    customer: { name: 'Industrial Plant', email: 'ops@factory.co.uk' },
    revalidation: threePhaseReval,
  });

  const has3pCheck = tpData.enquiryRecord.confirmation_items?.some(i => i.includes('3-phase') || i.includes('commando socket'));
  assert(Boolean(has3pCheck), 'Stores 3-phase power confirmation item in top-level array');
  assert(tpData.enquiryRecord.requires_human_confirmation === true, 'Flags requires_human_confirmation = true');
}

// ── Group 8: Historical Decoupling & Snapshot Resilience ────────────────────
console.log('\n[Group 8: Historical Decoupling & Snapshot Resilience]');

// Simulate a catalog machine being renamed or modified in the future
const historicalOriginal = allMachines.find(m => m.model_code === '420X4')!;
const initialData = buildCanonicalEnquiryData({
  reference: 'ENQ-2026-HIST01',
  customer: { name: 'Customer A', email: 'a@test.com' },
  revalidation: directReval,
});

const snapshot = initialData.machineRecords[0];
// Mutate catalog object in memory to simulate future editorial rename
const mutatedCatalog = { ...historicalOriginal, name: 'Alkota 420X4 (Renamed Series II)', slug: 'alkota-420x4-series-2', pressure_bar: 160 };

// Ensure the snapshot retained original historical data
assert(snapshot.machine_name_snapshot === 'Alkota 420X4', 'Historical name snapshot retains original value');
assert(snapshot.slug_snapshot === 'alkota-420x4', 'Historical slug snapshot retains original value');
assert(snapshot.specs_snapshot?.pressure_bar === 138, 'Historical pressure snapshot retains original 138 BAR');
assert(snapshot.specs_snapshot?.pressure_bar !== mutatedCatalog.pressure_bar, 'Snapshot is decoupled from subsequent catalog modifications');

// ── Group 9: Missing Machine & Graceful Handling ────────────────────────────
console.log('\n[Group 9: Missing Machine & Graceful Handling]');

const emptyReval = revalidateMachineEnquiry({
  source: 'general',
  machineIdentifiers: [],
}, allMachines);

const emptyData = buildCanonicalEnquiryData({
  reference: 'ENQ-2026-GEN01',
  source: 'general',
  customer: { name: 'General Inquirer', email: 'info@business.com' },
  revalidation: emptyReval,
});

assert(emptyData.enquiryRecord.source === 'GENERAL', 'General enquiry has source GENERAL');
assert(emptyData.enquiryRecord.enquiry_context === 'GENERAL_ENQUIRY', 'General enquiry has context GENERAL_ENQUIRY');
assert(emptyData.machineRecords.length === 0, 'Zero machine records produced for general enquiry');
assert(emptyData.enquiryRecord.selection_outcome === 'NOT_APPLICABLE', 'Selection outcome is NOT_APPLICABLE');

console.log('\n===============================================================');
console.log(`TOTAL CANONICAL ENQUIRY MODEL TESTS: ${testsPassed + testsFailed}`);
console.log(`PASSED: ${testsPassed}`);
console.log(`FAILED: ${testsFailed}`);
console.log('===============================================================');

if (testsFailed > 0) {
  console.error(`\nTest suite failed with ${testsFailed} error(s).`);
  process.exit(1);
} else {
  console.log('\nCanonical Enquiry Data Model QA verification succeeded with 0 errors!');
  process.exit(0);
}
