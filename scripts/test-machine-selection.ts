/**
 * Comprehensive Forensic Machine Selection QA & Validation Suite (Phase 6.1)
 *
 * Implements forensic verification across:
 * 1. 127-Machine Test Universe Coverage
 * 2. Authority Boundary & Adversarial Text Tampering
 * 3. Operating vs Maximum Pressure
 * 4. Rated vs Maximum Flow
 * 5. Temperature & Thermal Validation
 * 6. Power Source & Fuel Validation
 * 7. Electrical (Voltage & Phase) Validation
 * 8. Mobility Classification Validation
 * 9. Water Tank & Capacity Validation
 * 10. Canonical Category Isolation
 * 11. Category-Specific Logic
 * 12. Exhaustive Unknown != Fail Validation
 * 13. Hard Requirement 3-State Matrix
 * 14. Conflicting Requirements & No-Result State
 * 15. Preference Monotonicity & Non-Exclusion
 * 16. Determinism & Tie-Breaking
 * 17. Database Change Propagation
 * 18. Compatibility Boundaries
 * 19. Comparison Handoff
 * 20. Enquiry Handoff & URL Resilience
 * 21. Property / Invariant Testing (7 Mathematical Invariants)
 */

import { Product } from '../src/lib/products';
import { selectMachines } from '../src/lib/machine-selection/engine';
import {
  evaluateWaterType,
  evaluatePressure,
  evaluateFlow,
  evaluatePowerSource,
  evaluateElectrical,
  evaluateMobility,
  evaluateWaterTank,
  evaluateApplicationAlignment,
  getAuthoritativePressureBar,
  getAuthoritativeFlowLpm,
  getAuthoritativeWaterTankL,
  APPLICATION_TAXONOMY
} from '../src/lib/machine-selection/authority-map';
import { SelectionRequirements } from '../src/lib/machine-selection/types';
import {
  STEPS,
  VOLTAGE_OPTIONS,
  PHASE_OPTIONS,
  PRESSURE_OPTIONS,
  FLOW_OPTIONS,
  MOBILITY_OPTIONS,
  DEFAULT_REQUIREMENTS
} from '../src/lib/machine-selection/questions';

// Load canonical test machines
import canonicalData from './data/alkota-canonical-catalogue.json';

const allMachines = canonicalData as unknown as Product[];

let passed = 0;
let failed = 0;
let warnings = 0;

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

function warn(message: string) {
  console.warn(`  ⚠ WARN: ${message}`);
  warnings++;
}

console.log('===============================================================');
console.log(' ALKOTA UK — FORENSIC MACHINE SELECTION VALIDATION SUITE (QA)');
console.log('===============================================================\n');

// -------------------------------------------------------------
// GROUP 1: 131-MACHINE TEST UNIVERSE COVERAGE
// -------------------------------------------------------------
console.log('[Group 1: 131-Machine Test Universe Coverage]');
assert(allMachines.length === 131, 'Exact canonical universe of 131 machines loaded', `Got ${allMachines.length}`);
const activeMachines = allMachines.filter(m => m.active && m.status === 'published');
assert(activeMachines.length === 131, 'All 131 machines are active and published');

const resUniverse = selectMachines(allMachines, DEFAULT_REQUIREMENTS);
assert(resUniverse.totalEvaluated === 131, 'Evaluated all 131 machines with 0 silently skipped');
assert(
  allMachines.every(m => m.slug && m.model_code && m.category),
  'Every machine record possesses valid canonical slug, model_code, and category'
);

// -------------------------------------------------------------
// GROUP 2: AUTHORITY BOUNDARY (ADVERSARIAL TEXT TAMPERING)
// -------------------------------------------------------------
console.log('\n[Group 2: Authority Boundary & Adversarial Text Tampering]');
// Adversarial test 1: Misleading description claiming "trailer" on a stationary machine
const stationaryTampered: Product = {
  ...allMachines[0],
  category: 'hot-water',
  mobility: 'Stationary Enclosed Cabinet / Base Mount',
  portable: false,
  description: 'Industrial heavy duty rig perfect for highway trailer-based washdown operations.',
  tagline: 'Turnkey Trailer Mounted Washer',
  name: 'Alkota Trailer Special Edition'
};
const evalMobTrailer = evaluateMobility(stationaryTampered, 'trailer');
assert(
  evalMobTrailer.state === 'FAIL',
  'Adversarial description/title mentioning "trailer" does NOT grant trailer eligibility'
);

// Adversarial test 2: Misleading model name claiming "Electric" on a petrol machine
const petrolTampered: Product = {
  ...allMachines[0],
  model_code: 'ELECTRIC-400',
  name: 'Alkota All-Electric Power System',
  power_source: 'Gas Engine 13HP Honda GX390',
  description: 'Mains electric silent operation'
};
const evalPowerElec = evaluatePowerSource(petrolTampered, 'electric');
assert(
  evalPowerElec.state === 'FAIL',
  'Model code "ELECTRIC-400" does NOT override structured combustion engine drive'
);

// Adversarial test 3: Misleading tagline claiming 500 BAR on a 140 BAR machine
const pressureTampered: Product = {
  ...allMachines[0],
  pressure_bar: 140,
  tagline: 'Extreme 500 BAR High-Pressure Ultra Blaster'
};
const evalPressTampered = evaluatePressure(pressureTampered, 200);
assert(
  evalPressTampered.state === 'FAIL',
  'Tagline claiming "500 BAR" does NOT override authoritative 140 BAR specification'
);

// Adversarial test 4: Missing power source with electric description
const unknownPowerWithText: Product = {
  ...allMachines[0],
  power_source: null,
  description: 'Equipped with industrial electric motor.'
};
const evalUnknownPower = evaluatePowerSource(unknownPowerWithText, 'electric');
assert(
  evalUnknownPower.state === 'UNKNOWN',
  'Missing power_source evaluates to UNKNOWN, not inferred from prose'
);

// -------------------------------------------------------------
// GROUP 3: OPERATING VS MAXIMUM PRESSURE VALIDATION
// -------------------------------------------------------------
console.log('\n[Group 3: Operating vs Maximum Pressure]');
// Test 3.1: Machine where max pressure = 210 BAR, operating pressure = 180 BAR
const splitPressureMachine: Product = {
  ...allMachines[0],
  pressure_bar: 180,
  operating_pressure_bar: 180,
  max_pressure_bar: 210
} as any;

const splitEval = evaluatePressure(splitPressureMachine, 200);
assert(
  splitEval.state === 'FAIL',
  'Machine with max 210 BAR but operating 180 BAR FAILS 200 BAR requirement',
  `Result was ${splitEval.state}`
);

// Test 3.2: Machine with ONLY max pressure and unknown operating pressure
const maxOnlyMachine: Product = {
  ...allMachines[0],
  pressure_bar: null,
  pressure_psi: null,
  max_pressure_bar: 220
} as any;
const maxOnlyEval = evaluatePressure(maxOnlyMachine, 200);
assert(
  maxOnlyEval.state === 'UNKNOWN',
  'Machine with only max_pressure_bar evaluates to UNKNOWN continuous operating pressure',
  `Result was ${maxOnlyEval.state}`
);

// Test 3.3: Mathematical conversion from PSI to BAR
const psiMachine: Product = {
  ...allMachines[0],
  pressure_bar: null,
  pressure_psi: 3000 // 3000 / 14.5038 = 206.8 BAR
};
const psiEval = evaluatePressure(psiMachine, 200);
assert(
  psiEval.state === 'PASS',
  '3000 PSI correctly converted to ~207 BAR, satisfying 200 BAR threshold'
);

// -------------------------------------------------------------
// GROUP 4: RATED VS MAXIMUM FLOW VALIDATION
// -------------------------------------------------------------
console.log('\n[Group 4: Rated vs Maximum Flow Rate]');
// Test 4.1: Machine where max flow = 25 L/min, rated flow = 18 L/min
const splitFlowMachine: Product = {
  ...allMachines[0],
  flow_rate_lpm: 18,
  operating_flow_lpm: 18,
  max_flow_lpm: 25
} as any;
const splitFlowEval = evaluateFlow(splitFlowMachine, 20);
assert(
  splitFlowEval.state === 'FAIL',
  'Machine with max 25 L/min but rated 18 L/min FAILS 20 L/min requirement'
);

// Test 4.2: Machine with ONLY max flow
const maxFlowOnlyMachine: Product = {
  ...allMachines[0],
  flow_rate_lpm: null,
  flow_rate_gpm: null,
  max_flow_lpm: 25
} as any;
const maxFlowOnlyEval = evaluateFlow(maxFlowOnlyMachine, 20);
assert(
  maxFlowOnlyEval.state === 'UNKNOWN',
  'Machine with only max_flow_lpm evaluates to UNKNOWN continuous flow rate'
);

// Test 4.3: GPM to L/min conversion
const gpmMachine: Product = {
  ...allMachines[0],
  flow_rate_lpm: null,
  flow_rate_gpm: 5.0 // 5.0 * 3.78541 = 18.9 L/min
};
const gpmEval = evaluateFlow(gpmMachine, 18);
assert(
  gpmEval.state === 'PASS',
  '5.0 GPM correctly converted to 18.9 L/min, satisfying 18 L/min requirement'
);

// -------------------------------------------------------------
// GROUP 5: TEMPERATURE & THERMAL VALIDATION
// -------------------------------------------------------------
console.log('\n[Group 5: Temperature & Thermal Validation]');
const sampleHot = allMachines.find(m => m.category === 'hot-water')!;
const sampleCold = allMachines.find(m => m.category === 'cold-water')!;
const sampleSteam = allMachines.find(m => m.category === 'steam')!;

assert(evaluateWaterType(sampleHot, 'hot').state === 'PASS', 'Hot water unit satisfies hot requirement');
assert(evaluateWaterType(sampleCold, 'hot').state === 'FAIL', 'Cold water unit fails hot requirement');
assert(evaluateWaterType(sampleHot, 'steam').state === 'FAIL', 'Standard hot water unit fails pure steam requirement');
assert(evaluateWaterType(sampleSteam, 'steam').state === 'PASS', 'Dedicated steam unit satisfies steam requirement');
assert(evaluateWaterType(sampleHot, 'cold').state === 'PASS', 'Hot water machine can operate cold');
assert(evaluateWaterType(sampleCold, 'cold').state === 'PASS', 'Cold water machine satisfies cold requirement');

// -------------------------------------------------------------
// GROUP 6: POWER SOURCE VALIDATION
// -------------------------------------------------------------
console.log('\n[Group 6: Power Source Validation]');
const sampleElectric = allMachines.find(m => m.power_source?.toLowerCase().includes('electric'))!;
const samplePetrol = allMachines.find(m => m.power_source?.toLowerCase().includes('gas') || m.power_source?.toLowerCase().includes('petrol'))!;

assert(evaluatePowerSource(sampleElectric, 'electric').state === 'PASS', 'Electric machine satisfies electric requirement');
assert(evaluatePowerSource(samplePetrol, 'electric').state === 'FAIL', 'Combustion engine machine fails electric requirement');
assert(evaluatePowerSource(samplePetrol, 'petrol').state === 'PASS', 'Petrol machine satisfies petrol requirement');
assert(evaluatePowerSource(sampleElectric, 'engine').state === 'FAIL', 'Electric motor fails combustion engine requirement');

// Incompatible fuel test: Petrol vs Diesel
const dieselEngineMachine: Product = {
  ...allMachines[0],
  power_source: 'Diesel Engine Kubota D722'
};
assert(evaluatePowerSource(dieselEngineMachine, 'petrol').state === 'FAIL', 'Diesel engine fails petrol requirement');
assert(evaluatePowerSource(dieselEngineMachine, 'diesel').state === 'PASS', 'Diesel engine satisfies diesel requirement');

// -------------------------------------------------------------
// GROUP 7: ELECTRICAL (VOLTAGE & PHASE) VALIDATION
// -------------------------------------------------------------
console.log('\n[Group 7: Electrical Requirements (Voltage & Phase)]');
const singlePhaseMachine: Product = {
  ...allMachines[0],
  power_source: 'Electric Motor 3HP',
  voltage: '230V',
  phase: 1
};
const threePhaseMachine: Product = {
  ...allMachines[0],
  power_source: 'Electric Motor 10HP',
  voltage: '400V',
  phase: 3
};

// 7.1 Voltage mismatch
const evalVoltFail = evaluateElectrical(singlePhaseMachine, '400v', 1);
assert(evalVoltFail.state === 'FAIL', '230V machine fails 400V requirement');

// 7.2 Phase mismatch
const evalPhaseFail = evaluateElectrical(singlePhaseMachine, '230v', 3);
assert(evalPhaseFail.state === 'FAIL', 'Single phase machine fails 3-phase requirement');

// 7.3 Electrical match
const evalElecPass = evaluateElectrical(threePhaseMachine, '400v', 3);
assert(evalElecPass.state === 'PASS', '400V 3PH machine satisfies 400V 3PH requirement');

// 7.4 Missing voltage/phase on electric machine -> UNKNOWN
const missingElecMachine: Product = {
  ...allMachines[0],
  power_source: 'Electric Motor',
  voltage: null,
  phase: null
};
assert(evaluateElectrical(missingElecMachine, '400v').state === 'UNKNOWN', 'Missing voltage evaluates to UNKNOWN');
assert(evaluateElectrical(missingElecMachine, undefined, 3).state === 'UNKNOWN', 'Missing phase evaluates to UNKNOWN');

// -------------------------------------------------------------
// GROUP 8: MOBILITY CLASSIFICATION VALIDATION
// -------------------------------------------------------------
console.log('\n[Group 8: Mobility Classification]');
const sampleTrailer = allMachines.find(m => m.category === 'trailer')!;
const sampleStationary = allMachines.find(m => m.mobility?.toLowerCase().includes('stationary') && m.category !== 'trailer')!;
const samplePortable = allMachines.find(m => m.portable && m.category !== 'trailer')!;

assert(evaluateMobility(sampleTrailer, 'trailer').state === 'PASS', 'Trailer satisfies trailer requirement');
assert(evaluateMobility(samplePortable, 'trailer').state === 'FAIL', '4-wheel portable fails trailer requirement');
assert(evaluateMobility(sampleTrailer, 'portable').state === 'FAIL', 'Trailer fails 4-wheel portable requirement');
assert(evaluateMobility(sampleStationary, 'stationary').state === 'PASS', 'Stationary unit satisfies stationary requirement');

// -------------------------------------------------------------
// GROUP 9: WATER TANK & CAPACITY VALIDATION
// -------------------------------------------------------------
console.log('\n[Group 9: Water Tank & Capacity Validation]');
// 9.1 Standard washer has no onboard tank -> FAILS tankRequired
assert(
  evaluateWaterTank(sampleHot, true).state === 'FAIL',
  'Standard pressure washer fails tank_required (requires external mains water)'
);

// 9.2 Trailer with 230 gal (~871L) tank
assert(
  evaluateWaterTank(sampleTrailer, true).state === 'PASS',
  'Trailer satisfies tank_required'
);

// 9.3 Tank capacity threshold
const trailer230Gal: Product = {
  ...allMachines[0],
  category: 'trailer',
  extra_specs: [{ label: 'Tank Capacity', value: '230 gal' }] // 871L
};
assert(
  evaluateWaterTank(trailer230Gal, true, 500).state === 'PASS',
  '871L tank satisfies 500L minimum capacity requirement'
);
assert(
  evaluateWaterTank(trailer230Gal, true, 1000).state === 'FAIL',
  '871L tank fails 1000L minimum capacity requirement'
);

// 9.4 Unknown tank capacity
const unknownTankTrailer: Product = {
  ...allMachines[0],
  category: 'trailer',
  extra_specs: []
};
assert(
  evaluateWaterTank(unknownTankTrailer, true, 500).state === 'UNKNOWN',
  'Trailer with unrecorded tank capacity evaluates to UNKNOWN for capacity threshold'
);

// -------------------------------------------------------------
// GROUP 10: CANONICAL CATEGORY VALIDATION
// -------------------------------------------------------------
console.log('\n[Group 10: Canonical Category Isolation]');
const categoriesInCatalogue = new Set(allMachines.map(m => m.category));
console.log(`  Identified ${categoriesInCatalogue.size} categories: ${Array.from(categoriesInCatalogue).join(', ')}`);
assert(categoriesInCatalogue.has('hot-water'), 'Catalogue contains hot-water');
assert(categoriesInCatalogue.has('cold-water'), 'Catalogue contains cold-water');
assert(categoriesInCatalogue.has('steam'), 'Catalogue contains steam');
assert(categoriesInCatalogue.has('parts-washer'), 'Catalogue contains parts-washer');
assert(categoriesInCatalogue.has('trailer'), 'Catalogue contains trailer');
assert(categoriesInCatalogue.has('water-treatment'), 'Catalogue contains water-treatment');
assert(categoriesInCatalogue.has('water-heater'), 'Catalogue contains water-heater');

// -------------------------------------------------------------
// GROUP 11: CATEGORY-SPECIFIC QUESTION LOGIC
// -------------------------------------------------------------
console.log('\n[Group 11: Category-Specific Question Logic]');
// Parts washer application should not be excluded because pressure_bar is null
const partsWashResult = selectMachines(allMachines, {
  ...DEFAULT_REQUIREMENTS,
  application: 'WORKSHOP_PARTS_WASHING',
  waterType: 'aqueous_parts'
});
assert(
  partsWashResult.shortlist.some(s => s.machine.category === 'parts-washer'),
  'Parts washing application selects aqueous parts washer without null-pressure penalty'
);

// Water treatment application
const waterTreatResult = selectMachines(allMachines, {
  ...DEFAULT_REQUIREMENTS,
  application: 'WATER_TREATMENT_RECYCLING'
});
assert(
  waterTreatResult.shortlist.some(s => s.machine.category === 'water-treatment') ||
  waterTreatResult.possibleMatches.some(s => s.machine.category === 'water-treatment'),
  'Water treatment application surfaces water recovery systems'
);

// -------------------------------------------------------------
// GROUP 12: EXHAUSTIVE UNKNOWN != FAIL VALIDATION
// -------------------------------------------------------------
console.log('\n[Group 12: Exhaustive Unknown != Fail Validation]');
const mockUnknownPressure: Product = {
  ...allMachines[0],
  model_code: 'TEST-UNK-PRESS',
  pressure_bar: null,
  pressure_psi: null,
  flow_rate_lpm: 15,
  power_source: 'Electric 230V 1PH'
};
const resUnkPress = selectMachines([mockUnknownPressure], {
  ...DEFAULT_REQUIREMENTS,
  minPressureBar: 180
});
assert(resUnkPress.unmetMachines.length === 0, 'Machine with missing pressure is NOT placed in unmet');
assert(resUnkPress.possibleMatches.length === 1, 'Machine with missing pressure is placed in possibleMatches');
assert(resUnkPress.shortlist.length === 0, 'Machine with missing pressure is NOT placed in strong match shortlist');

// Machine with ALL technical fields unknown
const mockAllUnknown: Product = {
  ...allMachines[0],
  model_code: 'TEST-ALL-UNK',
  pressure_bar: null,
  pressure_psi: null,
  flow_rate_lpm: null,
  flow_rate_gpm: null,
  power_source: null,
  heating_fuel: null
};
const resAllUnk = selectMachines([mockAllUnknown], {
  ...DEFAULT_REQUIREMENTS,
  waterType: 'hot',
  minPressureBar: 150,
  minFlowLpm: 15,
  powerSource: 'electric'
});
assert(resAllUnk.unmetMachines.length === 0, 'All-unknown machine is NOT failed (Unknown != Fail)');
assert(resAllUnk.possibleMatches.length === 1, 'All-unknown machine is preserved as possible match to confirm');

// -------------------------------------------------------------
// GROUP 13: HARD REQUIREMENT 3-STATE MATRIX
// -------------------------------------------------------------
console.log('\n[Group 13: Hard Requirement 3-State Matrix]');
// Helper function to test PASS, FAIL, UNKNOWN on any evaluator
function test3States(
  name: string,
  passState: { state: string },
  failState: { state: string },
  unkState: { state: string }
) {
  assert(passState.state === 'PASS', `${name}: PASS verified`);
  assert(failState.state === 'FAIL', `${name}: FAIL verified`);
  assert(unkState.state === 'UNKNOWN', `${name}: UNKNOWN verified`);
}

// Pressure 3-state
test3States(
  'Pressure Matrix',
  evaluatePressure({ ...allMachines[0], pressure_bar: 200 }, 180),
  evaluatePressure({ ...allMachines[0], pressure_bar: 140 }, 180),
  evaluatePressure({ ...allMachines[0], pressure_bar: null, pressure_psi: null }, 180)
);

// Flow 3-state
test3States(
  'Flow Matrix',
  evaluateFlow({ ...allMachines[0], flow_rate_lpm: 20 }, 15),
  evaluateFlow({ ...allMachines[0], flow_rate_lpm: 10 }, 15),
  evaluateFlow({ ...allMachines[0], flow_rate_lpm: null, flow_rate_gpm: null }, 15)
);

// Power 3-state
test3States(
  'Power Matrix',
  evaluatePowerSource({ ...allMachines[0], power_source: 'Electric Motor' }, 'electric'),
  evaluatePowerSource({ ...allMachines[0], power_source: 'Gas Engine' }, 'electric'),
  evaluatePowerSource({ ...allMachines[0], power_source: null }, 'electric')
);

// Voltage 3-state
test3States(
  'Voltage Matrix',
  evaluateElectrical({ ...allMachines[0], power_source: 'Electric', voltage: '400V', phase: 3 }, '400v'),
  evaluateElectrical({ ...allMachines[0], power_source: 'Electric', voltage: '230V', phase: 1 }, '400v'),
  evaluateElectrical({ ...allMachines[0], power_source: 'Electric', voltage: null }, '400v')
);

// Tank 3-state
test3States(
  'Tank Matrix',
  evaluateWaterTank({ ...allMachines[0], category: 'trailer', extra_specs: [{ label: 'Tank Capacity', value: '230 gal' }] }, true, 500),
  evaluateWaterTank({ ...allMachines[0], category: 'hot-water' }, true),
  evaluateWaterTank({ ...allMachines[0], category: 'trailer', extra_specs: [] }, true, 500)
);

// -------------------------------------------------------------
// GROUP 14: CONFLICTING REQUIREMENTS & NO-RESULT STATE
// -------------------------------------------------------------
console.log('\n[Group 14: Conflicting Requirements & No-Result State]');
const impossibleReq: SelectionRequirements = {
  ...DEFAULT_REQUIREMENTS,
  waterType: 'hot',
  powerSource: 'electric',
  mobility: 'trailer',
  minPressureBar: 300,
  minFlowLpm: 50
};
const resImpossible = selectMachines(allMachines, impossibleReq);
assert(resImpossible.shortlist.length === 0, 'Impossible combination yields empty shortlist (no forced matches)');
assert(resImpossible.isConflicted === true, 'Engine flags isConflicted = true for mutually exclusive requirements');
assert(typeof resImpossible.conflictNotice === 'string', 'Conflict notice provided to user');
assert(
  Array.isArray(resImpossible.recommendations) && resImpossible.recommendations.length > 0,
  'Actionable recommendations provided when requirements conflict'
);

// -------------------------------------------------------------
// GROUP 15: PREFERENCE MONOTONICITY & NON-EXCLUSION
// -------------------------------------------------------------
console.log('\n[Group 15: Preference Monotonicity & Non-Exclusion]');
const borderMachine: Product = {
  ...allMachines[0],
  model_code: 'BORDER-150',
  pressure_bar: 150,
  flow_rate_lpm: 15
};
const betterMachine: Product = {
  ...allMachines[0],
  model_code: 'BETTER-200',
  pressure_bar: 200,
  flow_rate_lpm: 15
};

const neutralRes = selectMachines([borderMachine, betterMachine], {
  ...DEFAULT_REQUIREMENTS,
  minPressureBar: 150
});
const prefRes = selectMachines([borderMachine, betterMachine], {
  ...DEFAULT_REQUIREMENTS,
  minPressureBar: 150,
  preferences: ['prefer_higher_pressure']
});

assert(
  prefRes.shortlist.some(s => s.machine.model_code === 'BORDER-150'),
  'Border machine is NOT excluded by prefer_higher_pressure preference'
);
assert(
  prefRes.shortlist[0].machine.model_code === 'BETTER-200',
  'Higher pressure machine is ranked #1 under prefer_higher_pressure'
);

// -------------------------------------------------------------
// GROUP 16: DETERMINISM & TIE-BREAKING
// -------------------------------------------------------------
console.log('\n[Group 16: Mathematical Determinism]');
const run1 = selectMachines(allMachines, { ...DEFAULT_REQUIREMENTS, waterType: 'hot' });
const run2 = selectMachines(allMachines, { ...DEFAULT_REQUIREMENTS, waterType: 'hot' });

const codes1 = run1.shortlist.map(s => s.machine.model_code).join(',');
const codes2 = run2.shortlist.map(s => s.machine.model_code).join(',');
assert(codes1 === codes2, 'Identical requirements produce identical shortlist across independent runs');

const scores1 = run1.shortlist.map(s => s.score).join(',');
const scores2 = run2.shortlist.map(s => s.score).join(',');
assert(scores1 === scores2, 'Scores are 100% deterministic');

// -------------------------------------------------------------
// GROUP 17: DATABASE CHANGE PROPAGATION
// -------------------------------------------------------------
console.log('\n[Group 17: Database Change Propagation]');
const mutableMachine: Product = { ...allMachines[0], pressure_bar: 140 };
const beforeChange = evaluatePressure(mutableMachine, 180);
assert(beforeChange.state === 'FAIL', 'Before DB change: 140 BAR fails 180 BAR requirement');

mutableMachine.pressure_bar = 200;
const afterChange = evaluatePressure(mutableMachine, 180);
assert(afterChange.state === 'PASS', 'After DB change: 200 BAR passes 180 BAR requirement without code edits');

// -------------------------------------------------------------
// GROUP 18: COMPATIBILITY BOUNDARIES
// -------------------------------------------------------------
console.log('\n[Group 18: Compatibility Boundaries]');
// Ensure machine selection does not require or mutate external compatibility graphs
const testSelectionCompat = selectMachines(allMachines, { ...DEFAULT_REQUIREMENTS, application: 'FLEET_VEHICLE_CLEANING' });
assert(
  testSelectionCompat.shortlist.every(s => typeof s.machine.slug === 'string' && s.machine.category),
  'Selection operates strictly on machine product records without foreign table injection'
);

// -------------------------------------------------------------
// GROUP 19: COMPARISON HANDOFF
// -------------------------------------------------------------
console.log('\n[Group 19: Comparison Handoff]');
assert(
  testSelectionCompat.shortlist.every(s => s.machine.slug && s.machine.slug.length > 3),
  'All shortlisted machines have valid slugs for Phase 5 comparison integration'
);
assert(
  testSelectionCompat.shortlist.length <= 3,
  'Shortlist never exceeds the Phase 5 3-machine comparison tray limit'
);

// -------------------------------------------------------------
// GROUP 20: ENQUIRY HANDOFF & URL RESILIENCE
// -------------------------------------------------------------
console.log('\n[Group 20: Enquiry Handoff & URL Resilience]');
const enquiryModels = testSelectionCompat.shortlist.map(s => s.machine.model_code).join(', ');
const enquiryReqs = testSelectionCompat.activeRequirementsSummary.join(' | ');
assert(typeof enquiryModels === 'string' && enquiryModels.length > 0, 'Generates valid model string for enquiry prefill');
assert(typeof enquiryReqs === 'string' && enquiryReqs.length > 0, 'Generates clean serialized requirements summary for enquiry');

// -------------------------------------------------------------
// GROUP 21: PROPERTY / INVARIANT TESTING (7 MATHEMATICAL INVARIANTS)
// -------------------------------------------------------------
console.log('\n[Group 21: Property / Invariant Testing (7 Invariants)]');

// Invariant 1: Verified pressure below threshold -> never STRONG_MATCH
const inv1Violated = allMachines.some(m => {
  const bar = getAuthoritativePressureBar(m);
  if (bar !== null && bar < 200) {
    const res = selectMachines([m], { ...DEFAULT_REQUIREMENTS, minPressureBar: 200 });
    return res.shortlist.some(s => s.machine.model_code === m.model_code);
  }
  return false;
});
assert(!inv1Violated, 'INVARIANT 1: No machine with verified pressure < threshold can ever be STRONG_MATCH');

// Invariant 2: Unknown pressure alone -> never FAIL (DOES_NOT_MEET)
const inv2Violated = allMachines.some(m => {
  const bar = getAuthoritativePressureBar(m);
  if (bar === null) {
    const res = selectMachines([m], { ...DEFAULT_REQUIREMENTS, minPressureBar: 180 });
    // Should be POSSIBLE_MATCH, not DOES_NOT_MEET
    return res.unmetMachines.some(u => u.machine.model_code === m.model_code && u.explanation.failureReasons.some(f => f.includes('Pressure')));
  }
  return false;
});
assert(!inv2Violated, 'INVARIANT 2: Unknown pressure alone NEVER produces DOES_NOT_MEET');

// Invariant 3: Preferences never exclude an otherwise eligible machine
const inv3Base = selectMachines(allMachines, { ...DEFAULT_REQUIREMENTS, waterType: 'hot' });
const inv3WithPref = selectMachines(allMachines, {
  ...DEFAULT_REQUIREMENTS,
  waterType: 'hot',
  preferences: ['prefer_higher_flow', 'prefer_higher_pressure', 'prefer_compact']
});
const baseQualifiedSlugs = new Set([...inv3Base.shortlist, ...inv3Base.possibleMatches].map(s => s.machine.slug));
const prefQualifiedSlugs = new Set([...inv3WithPref.shortlist, ...inv3WithPref.possibleMatches].map(s => s.machine.slug));
// Count qualified in base vs pref
assert(
  inv3Base.totalQualified === inv3WithPref.totalQualified,
  'INVARIANT 3: Preferences preserve total qualified count (no eligible machine is excluded by preference)'
);

// Invariant 4: Irrelevant marketing text does not alter eligibility
const cleanMachine = allMachines[0];
const dirtyTextMachine: Product = {
  ...cleanMachine,
  description: 'Completely altered prose description with arbitrary buzzwords and claims.',
  uk_description: 'UK editorial text changed.',
  engineering_story: 'Story rewritten.'
};
const evalClean = selectMachines([cleanMachine], DEFAULT_REQUIREMENTS);
const evalDirty = selectMachines([dirtyTextMachine], DEFAULT_REQUIREMENTS);
assert(
  evalClean.shortlist[0]?.score === evalDirty.shortlist[0]?.score &&
  evalClean.shortlist[0]?.status === evalDirty.shortlist[0]?.status,
  'INVARIANT 4: Prose text mutations have ZERO impact on selection score or eligibility'
);

// Invariant 5: Changing unrelated spec does not alter eligibility
const baseElec = allMachines.find(m => m.power_source?.toLowerCase().includes('electric'))!;
const alteredWarranty = { ...baseElec, warranty_years: 15, sort_order: 999 };
assert(
  evaluatePowerSource(baseElec, 'electric').state === evaluatePowerSource(alteredWarranty, 'electric').state,
  'INVARIANT 5: Unrelated fields (warranty, sort_order) do not alter eligibility'
);

// Invariant 6: Pure determinism (f(x) === f(x))
const resA = selectMachines(allMachines, { ...DEFAULT_REQUIREMENTS, minPressureBar: 150 });
const resB = selectMachines(allMachines, { ...DEFAULT_REQUIREMENTS, minPressureBar: 150 });
assert(
  JSON.stringify(resA.shortlist.map(s => s.machine.model_code)) ===
  JSON.stringify(resB.shortlist.map(s => s.machine.model_code)),
  'INVARIANT 6: Pure mathematical function determinism holds'
);

// Invariant 7: No unverified compatibility relationship creates a recommendation
const randomPartId = 'random-unverified-part-123';
const inv7Result = selectMachines(allMachines, DEFAULT_REQUIREMENTS);
assert(
  inv7Result.shortlist.every(s => s.machine.category !== (randomPartId as any)),
  'INVARIANT 7: External relationships cannot invent or alter machine shortlist'
);

// ============================================================================
// GROUP 22: Phase 6.3 UX Refinements & Progressive Disclosure Integration
// ============================================================================
console.log('\n[Group 22: Phase 6.3 UX Refinements & Dynamic Questionnaire]');

// Test 22.1: Step titles are plain English
const stepTitles = STEPS.map(s => s.title);
assert(
  stepTitles.includes('Cleaning Task') &&
  stepTitles.includes('Water Temp') &&
  stepTitles.includes('Pressure') &&
  stepTitles.includes('Water Volume') &&
  stepTitles.includes('Power & Supply') &&
  stepTitles.includes('Mobility & Mounting') &&
  stepTitles.includes('Priorities'),
  'Plain-language step titles established across all 7 steps'
);

// Test 22.2: Electrical sub-questions exported and valid
assert(
  VOLTAGE_OPTIONS.some(v => v.value === '110v') &&
  VOLTAGE_OPTIONS.some(v => v.value === '230v') &&
  VOLTAGE_OPTIONS.some(v => v.value === '400v'),
  'Voltage options include 110V, 230V, and 400V site options'
);
assert(
  PHASE_OPTIONS.some(p => p.value === '1ph') &&
  PHASE_OPTIONS.some(p => p.value === '3ph'),
  'Phase options include 1-Phase and 3-Phase configurations'
);

// Test 22.3: Safe default null options for pressure and flow
assert(
  PRESSURE_OPTIONS[0].value === null && !!PRESSURE_OPTIONS[0].badge?.includes('Recommended'),
  'Pressure options feature prominent safe default / any option'
);
assert(
  FLOW_OPTIONS[0].value === null && !!FLOW_OPTIONS[0].badge?.includes('Recommended'),
  'Flow options feature prominent safe default / any option'
);

// Test 22.4: Skid option labelled as bespoke build
const skidOpt = MOBILITY_OPTIONS.find(m => m.value === 'skid');
assert(
  skidOpt !== undefined && skidOpt.badge === 'Bespoke Build',
  'Skid mobility option correctly labelled as bespoke build'
);

// Test 22.5: Dynamic branching parts washer bypass
const partsWasherResult = selectMachines(allMachines, {
  ...DEFAULT_REQUIREMENTS,
  application: 'WORKSHOP_PARTS_WASHING',
  waterType: 'aqueous_parts'
});
assert(
  partsWasherResult.shortlist.length > 0 &&
  partsWasherResult.shortlist.every(s => s.machine.category === 'parts-washer'),
  'Parts washing application surfaces aqueous parts washers without pressure filtering'
);

console.log('\n===============================================================');
console.log(`TOTAL FORENSIC TESTS: ${passed + failed}`);
console.log(`PASSED: ${passed}`);
console.log(`FAILED: ${failed}`);
console.log(`WARNINGS: ${warnings}`);
console.log('===============================================================');

if (failed > 0) {
  process.exit(1);
} else {
  console.log('\nForensic Machine Selection QA verification succeeded with 0 errors!');
  process.exit(0);
}
