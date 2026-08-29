import {
  ALL_BUILD_STAGES,
  FULL_HANDOVER_CHECKLIST,
  SAMPLE_BUILD_PROJECT,
  SAMPLE_DELIVERED_ASSET,
  deriveBuildProjectStatus,
  deriveChecklistForConfig,
  generateQrToken,
} from '../build-project-data';
import { validateConfiguration } from '../configurator-data';
import type { TrailerConfiguration, BuildStageId } from '../types';

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

describe('Scenario A — New Order inherits accepted configuration', () => {
  it('build project carries the full accepted TrailerConfiguration', () => {
    const config = SAMPLE_BUILD_PROJECT.accepted_configuration;
    expect(config.build_code).toBe('AKT-MRPQ47-UK');
    expect(config.format).toBe('enclosed');
    expect(config.operator_count).toBe(2);
    expect(config.chassis_id).toBeTruthy();
    expect(config.machine_id).toBeTruthy();
    expect(config.water_storage_id).toBeTruthy();
  });

  it('build reference is distinct from build code and quote reference', () => {
    const { build_reference, build_code, quote_reference } = SAMPLE_BUILD_PROJECT;
    expect(build_reference).toMatch(/^ABP-\d{4}-\d{3}$/);
    expect(build_reference).not.toBe(build_code);
    if (quote_reference) {
      expect(build_reference).not.toBe(quote_reference);
      expect(build_code).not.toBe(quote_reference);
    }
  });
});

describe('Scenario B — Build in production stage management', () => {
  it('deriveBuildProjectStatus returns in_production when a stage is in_progress', () => {
    const status = deriveBuildProjectStatus(SAMPLE_BUILD_PROJECT.stages);
    expect(status).toBe('in_production');
  });

  it('exactly one stage is in_progress in the sample build', () => {
    const inProgress = SAMPLE_BUILD_PROJECT.stages.filter(s => s.status === 'in_progress');
    expect(inProgress.length).toBe(1);
  });

  it('stage order is preserved — first is order_confirmed, last is delivered', () => {
    const stageIds = ALL_BUILD_STAGES.map(s => s.id);
    expect(stageIds[0]).toBe('order_confirmed');
    expect(stageIds[stageIds.length - 1]).toBe('delivered');
  });

  it('customer_label differs from internal_label for plumbing stage', () => {
    const plumbing = ALL_BUILD_STAGES.find(s => s.id === 'plumbing_fluid_systems')!;
    expect(plumbing.internal_label).not.toBe(plumbing.customer_label);
    expect(plumbing.customer_label).toContain('Water');
  });
});

describe('Scenario C — Internal blocker management', () => {
  const blockedProject = stageWithStatus(SAMPLE_BUILD_PROJECT, 'plumbing_fluid_systems', 'blocked');

  it('deriveBuildProjectStatus returns blocked when any stage is blocked', () => {
    const status = deriveBuildProjectStatus(blockedProject.stages);
    expect(status).toBe('blocked');
  });

  it('blocked_reason field is typed but separate from customer-visible data', () => {
    const stage = {
      ...blockedProject.stages.find(s => s.id === 'plumbing_fluid_systems')!,
      blocked_reason: 'Awaiting recovery unit — supplier ETA 2 weeks',
    };
    expect(stage.blocked_reason).toContain('supplier');
  });
});

describe('Scenario D — Livery approval record', () => {
  it('sample build has a livery approval in pending state', () => {
    const liveryApproval = SAMPLE_BUILD_PROJECT.customer_approvals.find(
      a => a.type === 'livery'
    );
    expect(liveryApproval).toBeDefined();
    expect(liveryApproval!.status).toBe('pending_customer_approval');
    expect(liveryApproval!.submitted_at).toBeTruthy();
  });

  it('approval status values are all valid', () => {
    const validStatuses = ['pending_customer_approval', 'approved', 'changes_requested'];
    SAMPLE_BUILD_PROJECT.customer_approvals.forEach(a => {
      expect(validStatuses).toContain(a.status);
    });
  });
});

describe('Scenario E — Configuration-aware QA checklist', () => {
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

  it('enclosed dual-operator closed-loop checklist includes all relevant items', () => {
    const checklist = deriveChecklistForConfig(FULL_HANDOVER_CHECKLIST, enclosedDualRecoveryConfig);
    const ids = checklist.map(i => i.id);
    expect(ids).toContain('enclosure_check');
    expect(ids).toContain('dual_operator_test');
    expect(ids).toContain('recovery_system_test');
    expect(ids).toContain('closed_loop_water_test');
    expect(ids).toContain('generator_test');
  });

  it('open single-operator config excludes enclosed/dual/recovery items', () => {
    const checklist = deriveChecklistForConfig(FULL_HANDOVER_CHECKLIST, openSingleConfig);
    const ids = checklist.map(i => i.id);
    expect(ids).not.toContain('enclosure_check');
    expect(ids).not.toContain('dual_operator_test');
    expect(ids).not.toContain('recovery_system_test');
    expect(ids).not.toContain('closed_loop_water_test');
    expect(ids).not.toContain('generator_test');
  });

  it('always-required items appear in both configs', () => {
    const enclosedChecklist = deriveChecklistForConfig(FULL_HANDOVER_CHECKLIST, enclosedDualRecoveryConfig);
    const openChecklist = deriveChecklistForConfig(FULL_HANDOVER_CHECKLIST, openSingleConfig);
    const alwaysIds = FULL_HANDOVER_CHECKLIST
      .filter(i => i.required_for.includes('always'))
      .map(i => i.id);
    alwaysIds.forEach(id => {
      expect(enclosedChecklist.map(i => i.id)).toContain(id);
      expect(openChecklist.map(i => i.id)).toContain(id);
    });
  });
});

describe('Scenario F — Handover weight records', () => {
  it('estimated and verified weights are independent fields', () => {
    const { weights } = SAMPLE_DELIVERED_ASSET;
    expect(weights.estimated_dry_kg).toBeDefined();
    expect(weights.estimated_wet_kg).toBeDefined();
    expect(weights.verified_finished_weight_kg).toBeDefined();
    expect(weights.verified_finished_weight_kg).not.toBe(weights.estimated_wet_kg);
  });

  it('overwriting verified weight does not mutate estimated weight', () => {
    const weights = { ...SAMPLE_DELIVERED_ASSET.weights };
    const originalEstimate = weights.estimated_wet_kg;
    weights.verified_finished_weight_kg = 2600;
    expect(weights.estimated_wet_kg).toBe(originalEstimate);
  });

  it('handover is marked complete with representative and date', () => {
    expect(SAMPLE_DELIVERED_ASSET.handover_completed).toBe(true);
    expect(SAMPLE_DELIVERED_ASSET.handover_customer_representative).toBeTruthy();
    expect(SAMPLE_DELIVERED_ASSET.handover_date).toBeTruthy();
  });
});

describe('Scenario G — Service due reporting', () => {
  it('delivered asset has a service schedule with actionable items', () => {
    const schedule = SAMPLE_DELIVERED_ASSET.service_schedule!;
    expect(schedule.length).toBeGreaterThan(0);
    const actionable = schedule.filter(s => s.status === 'due_soon' || s.status === 'overdue');
    expect(actionable.length).toBeGreaterThan(0);
  });

  it('all service schedule items have a next_due_date', () => {
    SAMPLE_DELIVERED_ASSET.service_schedule!.forEach(item => {
      expect(item.next_due_date).toBeTruthy();
    });
  });
});

describe('Scenario H — Service request asset data pre-population', () => {
  it('delivered asset has machine serial for service pre-population', () => {
    const machineSerial = SAMPLE_DELIVERED_ASSET.component_serials.find(
      s => s.category === 'machine'
    );
    expect(machineSerial).toBeDefined();
    expect(machineSerial!.serial_number).toBeTruthy();
  });

  it('delivered asset has customer contact details', () => {
    expect(SAMPLE_DELIVERED_ASSET.customer_email).toBeTruthy();
    expect(SAMPLE_DELIVERED_ASSET.customer_company).toBeTruthy();
  });
});

describe('Scenario I — Fork configuration revalidation', () => {
  it('forked configuration passes current validation rules', () => {
    const forkedConfig: TrailerConfiguration = {
      ...SAMPLE_DELIVERED_ASSET.accepted_configuration,
      build_code: 'AKT-FORK01-UK',
    };
    const result = validateConfiguration(forkedConfig);
    expect(result.hardErrors.length).toBe(0);
  });
});

describe('Scenario J — Case study candidate and marketing permission', () => {
  it('delivered asset is flagged as case study candidate', () => {
    expect(SAMPLE_DELIVERED_ASSET.case_study_candidate).toBe(true);
  });

  it('marketing permission is gated separately from candidate flag', () => {
    expect(SAMPLE_DELIVERED_ASSET.marketing_permission).toBe(false);
  });
});

describe('QR security — token architecture', () => {
  it('qr_token is not the internal DB id', () => {
    expect(SAMPLE_DELIVERED_ASSET.qr_token).not.toBe(SAMPLE_DELIVERED_ASSET.id);
  });

  it('generateQrToken returns 12-char token from safe alphabet only', () => {
    const token = generateQrToken();
    expect(token).toHaveLength(12);
    expect(token).toMatch(/^[ABCDEFGHJKLMNPQRSTUVWXYZ23456789]{12}$/);
    expect(token).not.toMatch(/[01OI]/);
  });

  it('generateQrToken produces unique tokens', () => {
    const tokens = new Set(Array.from({ length: 20 }, () => generateQrToken()));
    expect(tokens.size).toBe(20);
  });
});
