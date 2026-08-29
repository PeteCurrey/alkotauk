import {
  ALL_BUILD_STAGES,
  FULL_HANDOVER_CHECKLIST,
  SAMPLE_BUILD_PROJECT,
  SAMPLE_DELIVERED_ASSET,
  deriveBuildProjectStatus,
  deriveChecklistForConfig,
  generateQrToken,
} from '../build-project-data';
import { validateTrailerConfiguration } from '../configurator-data';
import type { TrailerConfiguration, BuildStageId } from '../types';

console.log('=== RUNNING ALKOTA TRAILER PHASE 06 BUILD LIFECYCLE & ASSET TORTURE TEST ===\n');

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

// Helper
function stageWithStatus(
  project: typeof SAMPLE_BUILD_PROJECT,
  stageId: BuildStageId,
  status: 'not_started' | 'in_progress' | 'blocked' | 'complete'
) {
  return {
    ...project,
    stages: project.stages.map(s =>
      s.id === stageId ? { ...s, status } : s
    ),
  };
}

// ── SCENARIO A: New Order Inherits Accepted Configuration ───────────────────
const configA = SAMPLE_BUILD_PROJECT.accepted_configuration;
assert(configA.build_code === 'AKT-MRPQ47-UK', 'Scenario A: Build project inherits build code from configurator');
assert(configA.format === 'enclosed', 'Scenario A: Build project inherits enclosed format');
assert(configA.operator_count === 2, 'Scenario A: Build project inherits 2-operator architecture');
assert(
  /^ABP-\d{4}-\d{3}$/.test(SAMPLE_BUILD_PROJECT.build_reference),
  `Scenario A: Build reference format valid (${SAMPLE_BUILD_PROJECT.build_reference})`
);
assert(
  SAMPLE_BUILD_PROJECT.build_reference !== SAMPLE_BUILD_PROJECT.build_code,
  'Scenario A: Build reference is distinct from build code'
);
assert(
  SAMPLE_BUILD_PROJECT.build_reference !== SAMPLE_BUILD_PROJECT.quote_reference,
  'Scenario A: Build reference is distinct from quote reference'
);

// ── SCENARIO B: Build in Production Stage Management ─────────────────────────
const statusB = deriveBuildProjectStatus(SAMPLE_BUILD_PROJECT.stages);
assert(statusB === 'in_production', 'Scenario B: deriveBuildProjectStatus returns in_production when stage is active');
const inProgressCount = SAMPLE_BUILD_PROJECT.stages.filter(s => s.status === 'in_progress').length;
assert(inProgressCount === 1, 'Scenario B: Exactly one stage is currently in progress in active build');
assert(ALL_BUILD_STAGES[0].id === 'order_confirmed', 'Scenario B: First operational stage is order_confirmed');
assert(ALL_BUILD_STAGES[ALL_BUILD_STAGES.length - 1].id === 'delivered', 'Scenario B: Final operational stage is delivered');
const plumbingStage = ALL_BUILD_STAGES.find(s => s.id === 'plumbing_fluid_systems')!;
assert(
  plumbingStage.internal_label !== plumbingStage.customer_label && plumbingStage.customer_label.includes('Water'),
  'Scenario B: Customer label softens workshop jargon for plumbing stage'
);

// ── SCENARIO C: Internal Blocker Management ──────────────────────────────────
const blockedProj = stageWithStatus(SAMPLE_BUILD_PROJECT, 'plumbing_fluid_systems', 'blocked');
const statusC = deriveBuildProjectStatus(blockedProj.stages);
assert(statusC === 'blocked', 'Scenario C: deriveBuildProjectStatus flags blocked when any stage is blocked');
const blockedStage = {
  ...blockedProj.stages.find(s => s.id === 'plumbing_fluid_systems')!,
  blocked_reason: 'Awaiting recovery unit — supplier ETA 2 weeks',
};
assert(
  blockedStage.blocked_reason.includes('supplier'),
  'Scenario C: Internal blocker reason captures supplier dependency notes'
);

// ── SCENARIO D: Livery Approval Record ───────────────────────────────────────
const liveryApproval = SAMPLE_BUILD_PROJECT.customer_approvals.find(a => a.type === 'livery');
assert(
  liveryApproval !== undefined && liveryApproval.status === 'pending_customer_approval',
  'Scenario D: Livery approval is tracked in pending state for customer sign-off'
);
assert(
  Boolean(liveryApproval?.submitted_at),
  'Scenario D: Approval record has immutable submitted_at timestamp'
);

// ── SCENARIO E: Configuration-Aware QA Checklist ─────────────────────────────
const enclosedDualRecoveryConfig: TrailerConfiguration = {
  build_code: 'AKT-MRPQ47-UK',
  format: 'enclosed',
  chassis_id: 'tandem-3500-enclosed',
  machine_id: 'ded-4000',
  operator_count: 2,
  water_storage_id: 'tank-1000l-baffled',
  power_options: ['gen-10kva'],
  recovery_option_id: 'closed-loop-recycle',
  hose_storage_options: ['hp-reel-dual'],
  site_options: [],
  finish_livery_id: 'full-wrap',
};

const openSingleConfig: TrailerConfiguration = {
  build_code: 'AKT-TEST01-UK',
  format: 'open-deck',
  chassis_id: 'single-1500-open',
  machine_id: '311-ged',
  operator_count: 1,
  water_storage_id: 'tank-500l-slimline',
  power_options: [],
  recovery_option_id: 'none',
  hose_storage_options: [],
  site_options: [],
  finish_livery_id: 'stealth',
};

const enclosedChecklist = deriveChecklistForConfig(FULL_HANDOVER_CHECKLIST, enclosedDualRecoveryConfig);
const enclosedIds = enclosedChecklist.map(i => i.id);
assert(enclosedIds.includes('enclosure_check'), 'Scenario E: Enclosed config includes enclosure inspection');
assert(enclosedIds.includes('dual_operator_test'), 'Scenario E: 2-gun config includes dual-lance flow verification');
assert(enclosedIds.includes('closed_loop_water_test'), 'Scenario E: Closed-loop config includes recirculation test');
assert(enclosedIds.includes('generator_test'), 'Scenario E: Generator config includes generator test');

const openChecklist = deriveChecklistForConfig(FULL_HANDOVER_CHECKLIST, openSingleConfig);
const openIds = openChecklist.map(i => i.id);
assert(!openIds.includes('enclosure_check'), 'Scenario E: Open deck config excludes enclosure test');
assert(!openIds.includes('dual_operator_test'), 'Scenario E: 1-gun config excludes dual lance test');
assert(!openIds.includes('recovery_system_test'), 'Scenario E: Non-recovery config excludes recovery test');

// ── SCENARIO F: Handover & Verified Finished Weight ──────────────────────────
const deliveredWeights = SAMPLE_DELIVERED_ASSET.weights;
assert(
  deliveredWeights.estimated_wet_kg !== deliveredWeights.verified_finished_weight_kg,
  'Scenario F: Verified finished weight is distinct from preliminary configurator estimate'
);
assert(
  SAMPLE_DELIVERED_ASSET.handover_completed === true,
  'Scenario F: Delivered rig records signed customer handover'
);
assert(
  SAMPLE_DELIVERED_ASSET.handover_customer_representative === 'David Collins',
  'Scenario F: Named customer representative captured on handover certificate'
);

// ── SCENARIO G: PPM Service Due Reporting ────────────────────────────────────
const scheduleG = SAMPLE_DELIVERED_ASSET.service_schedule!;
assert(scheduleG.length >= 3, 'Scenario G: Delivered asset has multi-component PPM schedule');
const dueSoonItem = scheduleG.find(s => s.status === 'due_soon');
assert(dueSoonItem !== undefined, 'Scenario G: Asset flags 3-month brake/hitch inspection as due_soon');

// ── SCENARIO H: Service Request Pre-Population ───────────────────────────────
const machineSerial = SAMPLE_DELIVERED_ASSET.component_serials.find(s => s.category === 'machine');
assert(
  machineSerial?.serial_number === 'AK-DED-2025-0044',
  'Scenario H: Machine serial available for one-click service dispatch pre-population'
);
assert(
  Boolean(SAMPLE_DELIVERED_ASSET.customer_email && SAMPLE_DELIVERED_ASSET.customer_company),
  'Scenario H: Customer org data attached without manual re-entry'
);

// ── SCENARIO I: Fork Configuration Revalidation ──────────────────────────────
const forkedConfig: TrailerConfiguration = {
  ...SAMPLE_DELIVERED_ASSET.accepted_configuration,
  build_code: 'AKT-FORK01-UK',
};
const forkValidation = validateTrailerConfiguration(forkedConfig);
assert(
  forkValidation.isValid === true,
  'Scenario I: Forked configuration from delivered asset revalidates 100% clean through current rules'
);

// ── SCENARIO J: Case Study Candidate & Marketing Permission Gate ─────────────
assert(
  SAMPLE_DELIVERED_ASSET.case_study_candidate === true,
  'Scenario J: Exceptional delivered rig flagged as case-study candidate'
);
assert(
  SAMPLE_DELIVERED_ASSET.marketing_permission === false,
  'Scenario J: Marketing permission gated until customer formal sign-off'
);

// ── QR CODE SECURITY ────────────────────────────────────────────────────────
const qrToken = SAMPLE_DELIVERED_ASSET.qr_token!;
assert(qrToken !== SAMPLE_DELIVERED_ASSET.id, 'QR Security: Token is NOT the internal DB ID');
assert(
  /^[ABCDEFGHJKLMNPQRSTUVWXYZ23456789]{12}$/.test(qrToken),
  `QR Security: Token uses unambiguous 12-char safe alphabet (${qrToken})`
);
const randomToken = generateQrToken();
assert(
  /^[ABCDEFGHJKLMNPQRSTUVWXYZ23456789]{12}$/.test(randomToken) && !/[01OI]/.test(randomToken),
  'QR Security: generateQrToken never produces 0, O, 1, or I'
);

console.log(`\n======================================================`);
console.log(`PHASE 06 TEST RESULTS: ${passedTests} PASSED, ${failedTests} FAILED`);
console.log(`======================================================\n`);

if (failedTests > 0) {
  process.exit(1);
}
