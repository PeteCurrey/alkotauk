import {
  calculateTrailerWeights,
  calculateEndurance,
  assessTowVehicle,
  validateTrailerConfiguration,
  reconcileTrailerConfiguration,
  generateBuildCode,
  calculateCommercialValue,
  calculateOpportunityScore,
  STARTING_CONFIGURATIONS,
  UK_CHASSIS_OPTIONS,
  TRAILER_MACHINE_OPTIONS,
  WATER_STORAGE_OPTIONS,
  WATER_RECOVERY_OPTIONS,
} from '../configurator-data';
import type { TrailerConfiguration } from '../types';

console.log('=== RUNNING ALKOTA TRAILER PHASE 05 COMMERCIAL & LOGIC TORTURE TEST ===\n');

let passedTests = 0;
let failedTests = 0;

function assert(condition: boolean, testName: string, detail?: any) {
  if (condition) {
    console.log(`✓ PASS: ${testName}`);
    passedTests++;
  } else {
    console.error(`✗ FAIL: ${testName}`, detail || '');
    failedTests++;
  }
}

// ── TEST 1: All 5 Curated Starting Configurations pass validation ─────────────
STARTING_CONFIGURATIONS.forEach(starting => {
  const weights = calculateTrailerWeights(starting);
  const validation = validateTrailerConfiguration(starting);
  const commVal = calculateCommercialValue(starting);

  assert(validation.isValid, `Starting Spec "${starting.name}" passes 100% of engineering rules`);
  assert(!weights.is_overweight, `Starting Spec "${starting.name}" is within legal MAM (${weights.estimated_wet_weight_kg}kg <= ${weights.chassis_mam_kg}kg)`);
  assert(commVal.price_state === 'guide_range', `Starting Spec "${starting.name}" has valid commercial guide value: ${commVal.guide_price_display}`);
});

// ── TEST 2: Scenario A — Early Researcher (No fake lead data) ─────────────────
const earlyConfig: Partial<TrailerConfiguration> = {
  format: 'open-deck',
  chassis_id: 'chassis-single-1500-open',
  machine_id: 'machine-ged-12v-311',
};
const earlyScore = calculateOpportunityScore(earlyConfig);
assert(earlyScore.score < 40, 'Scenario A: Early unsubmitted configuration has low score (<40)');
assert(earlyScore.tier === 'configuration_only', 'Scenario A: Tier is configuration_only');

// ── TEST 3: Scenario B — Serious Saved Build ─────────────────────────────────
const savedConfig: Partial<TrailerConfiguration> = {
  format: 'open-deck',
  chassis_id: 'chassis-tandem-2700-open',
  machine_id: 'machine-ged-12v-4305',
  operator_count: 2,
  water_storage_id: 'tank-1000l-baffled',
  recovery_option_id: 'recovery-vacgd-blower',
  power_options: ['power-12v-engine'],
  contact: {
    name: 'Dave Smith',
    company: 'Smith Haulage Ltd',
    email: 'dave@smithhaulage.co.uk',
    phone: '07987654321',
    postcode: 'PR1 3JJ',
    timeline: '1–3 Months',
    commercial_intent: 'engineering_review',
  },
};
const savedScore = calculateOpportunityScore(savedConfig);
assert(savedScore.score >= 80, `Scenario B: High-intent saved build has Priority score (${savedScore.score}/100)`);
assert(savedScore.tier === 'priority', 'Scenario B: Identified as Priority tier');
assert(savedScore.signals.includes('Verified Commercial Company entity (+10)'), 'Scenario B: Commercial company signal recorded');

// ── TEST 4: Scenario C — Quote-Ready Customer ────────────────────────────────
const quoteReadyConfig: Partial<TrailerConfiguration> = {
  format: 'enclosed',
  chassis_id: 'chassis-tandem-2700-enclosed',
  machine_id: 'machine-ged-12v-4305',
  operator_count: 1,
  water_storage_id: 'tank-1000l-baffled',
  power_options: ['power-gen-5kw-diesel', 'power-bulk-fuel-80l'],
  contact: {
    name: 'Sarah Connor',
    company: 'Clean Fleet Logistics',
    email: 'sarah@cleanfleet.co.uk',
    phone: '01234 567890',
    postcode: 'M1 1AA',
    timeline: 'Immediate (Within 30 Days)',
    commercial_intent: 'request_quote',
  },
};
const quoteScore = calculateOpportunityScore(quoteReadyConfig);
const quoteVal = calculateCommercialValue(quoteReadyConfig);
assert(quoteScore.score >= 80, `Scenario C: Quote-ready customer receives Priority score (${quoteScore.score}/100)`);
assert(quoteScore.signals.some(s => s.includes('High urgency project timeline')), 'Scenario C: Immediate timeline signal detected');
assert(quoteVal.min_guide_price_gbp! >= 30000, `Scenario C: Guide price correctly exceeds £30k (${quoteVal.guide_price_display})`);

// ── TEST 5: Scenario D — High-Complexity Environmental Build ─────────────────
const envComplexConfig: Partial<TrailerConfiguration> = {
  format: 'enclosed',
  chassis_id: 'chassis-tandem-3500-enclosed',
  machine_id: 'machine-ded-big-boy',
  operator_count: 2,
  water_storage_id: 'tank-2000l-dual-baffled',
  recovery_option_id: 'recovery-closed-loop-recycle',
  power_options: ['power-gen-5kw-diesel', 'power-bulk-fuel-80l'],
  hose_storage_options: ['hose-dual-100m-manual'],
  site_options: ['site-internal-plant-lights'],
  finish_livery_id: 'finish-enclosed-anthracite',
};
const envVal = calculateCommercialValue(envComplexConfig);
const envScore = calculateOpportunityScore(envComplexConfig);
assert(envScore.score >= 60, `Scenario D: Closed-loop build receives high score (${envScore.score}/100)`);
assert(envScore.signals.some(s => s.includes('Closed-Loop Environmental Treatment')), 'Scenario D: Closed loop signal detected');
assert(envVal.min_guide_price_gbp! >= 50000, `Scenario D: Complex closed-loop rig priced in £50k+ bracket (${envVal.guide_price_display})`);

// ── TEST 6: Scenario E — Sales-Assisted Build & Code Collision ───────────────
const staffCode1 = generateBuildCode();
const staffCode2 = generateBuildCode();
assert(staffCode1.startsWith('AKT-') && staffCode1.endsWith('-UK'), `Staff build code format canonical: ${staffCode1}`);
assert(staffCode1 !== staffCode2, 'Staff build codes unique');

// ── TEST 7: Pricing Guardrails (Never £0, NaN, or Missing Display) ───────────
const unpricedTest: Partial<TrailerConfiguration> = {};
const unpricedVal = calculateCommercialValue(unpricedTest);
assert(unpricedVal.guide_price_display === 'Price on Engineering Review', 'Unconfigured build falls back gracefully to "Price on Engineering Review"');
assert(unpricedVal.price_state === 'engineering_quote_only', 'Unconfigured build uses engineering_quote_only state');

console.log(`\n========================================`);
console.log(`PHASE 05 TEST RESULTS: ${passedTests} PASSED, ${failedTests} FAILED`);
console.log(`========================================\n`);

if (failedTests > 0) {
  process.exit(1);
} else {
  console.log('ALL PHASE 05 COMMERCIAL & ENGINEERING TESTS PASSED WITH 100% COMPLIANCE!');
}
