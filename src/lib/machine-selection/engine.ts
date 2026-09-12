import { Product } from '@/lib/products';
import {
  SelectionRequirements,
  SelectionResult,
  ScoredMachine,
  MatchStatus
} from './types';
import {
  evaluateWaterType,
  evaluatePressure,
  evaluateFlow,
  evaluatePowerSource,
  evaluateElectrical,
  evaluateMobility,
  evaluateWaterTank,
  evaluateApplicationAlignment,
  APPLICATION_TAXONOMY
} from './authority-map';

/**
 * Deterministic Machine Selection Engine
 * Operates strictly against verified Tier 1 & Tier 2 data.
 * Does NOT infer or guess missing specifications.
 * Strictly preserves Unknown != Fail.
 */
export function selectMachines(
  allMachines: Product[],
  requirements: SelectionRequirements
): SelectionResult {
  const scored: ScoredMachine[] = [];

  for (const m of allMachines) {
    if (!m.active || m.status !== 'published') continue;

    const reasons: string[] = [];
    const unknowns: string[] = [];
    const failureReasons: string[] = [];

    // 1. Water Type Evaluation
    const waterEval = evaluateWaterType(m, requirements.waterType);
    if (waterEval.state === 'FAIL') failureReasons.push(waterEval.failureReason!);
    else if (waterEval.state === 'UNKNOWN') unknowns.push(waterEval.unknownReason!);
    else if (waterEval.reason) reasons.push(waterEval.reason);

    // 2. Pressure Evaluation (Category-aware)
    // Specialized equipment (parts washers, water treatment) are evaluated only if applicable
    const isSpecializedNonWasher = m.category === 'parts-washer' || m.category === 'water-treatment';
    const isSpecializedApp = requirements.application === 'WORKSHOP_PARTS_WASHING' || requirements.application === 'WATER_TREATMENT_RECYCLING';

    if (isSpecializedNonWasher && isSpecializedApp) {
      // Pressure threshold is not applicable for closed-loop cabinets or water recovery
    } else {
      const pressEval = evaluatePressure(m, requirements.minPressureBar);
      if (pressEval.state === 'FAIL') failureReasons.push(pressEval.failureReason!);
      else if (pressEval.state === 'UNKNOWN') unknowns.push(pressEval.unknownReason!);
      else if (pressEval.reason) reasons.push(pressEval.reason);
    }

    // 3. Flow Rate Evaluation (Category-aware)
    if (isSpecializedNonWasher && isSpecializedApp) {
      // High-pressure nozzle flow threshold not applicable
    } else {
      const flowEval = evaluateFlow(m, requirements.minFlowLpm);
      if (flowEval.state === 'FAIL') failureReasons.push(flowEval.failureReason!);
      else if (flowEval.state === 'UNKNOWN') unknowns.push(flowEval.unknownReason!);
      else if (flowEval.reason) reasons.push(flowEval.reason);
    }

    // 4. Power Source Evaluation
    const powerEval = evaluatePowerSource(m, requirements.powerSource);
    if (powerEval.state === 'FAIL') failureReasons.push(powerEval.failureReason!);
    else if (powerEval.state === 'UNKNOWN') unknowns.push(powerEval.unknownReason!);
    else if (powerEval.reason) reasons.push(powerEval.reason);

    // 5. Electrical Requirements (Voltage & Phase)
    const elecEval = evaluateElectrical(m, requirements.voltage, requirements.phase);
    if (elecEval.state === 'FAIL') failureReasons.push(elecEval.failureReason!);
    else if (elecEval.state === 'UNKNOWN') unknowns.push(elecEval.unknownReason!);
    else if (elecEval.reason) reasons.push(elecEval.reason);

    // 6. Mobility Evaluation
    const mobEval = evaluateMobility(m, requirements.mobility);
    if (mobEval.state === 'FAIL') failureReasons.push(mobEval.failureReason!);
    else if (mobEval.state === 'UNKNOWN') unknowns.push(mobEval.unknownReason!);
    else if (mobEval.reason) reasons.push(mobEval.reason);

    // 7. Water Tank Evaluation
    const tankEval = evaluateWaterTank(m, requirements.tankRequired, requirements.minTankCapacityL);
    if (tankEval.state === 'FAIL') failureReasons.push(tankEval.failureReason!);
    else if (tankEval.state === 'UNKNOWN') unknowns.push(tankEval.unknownReason!);
    else if (tankEval.reason) reasons.push(tankEval.reason);

    // 8. Application Alignment & Scoring
    let score = 50; // Base score
    const appAlign = evaluateApplicationAlignment(m, requirements.application);
    if (appAlign.matches) {
      score += appAlign.score;
      if (appAlign.matchedTag) {
        reasons.push(`Verified factory application: ${appAlign.matchedTag}.`);
      }
    }

    // Provenance Bonus (Verified OEM Data preferred)
    if (m.source_url && !m.needs_review) {
      score += 10;
    }

    // Preferences scoring (Additive ranking only — never excludes viable machines)
    if (requirements.preferences && requirements.preferences.length > 0) {
      if (requirements.preferences.includes('prefer_higher_flow') && m.flow_rate_lpm) {
        score += Math.min(20, Math.round(Number(m.flow_rate_lpm) / 2));
      }
      if (requirements.preferences.includes('prefer_higher_pressure') && m.pressure_bar) {
        score += Math.min(20, Math.round(Number(m.pressure_bar) / 15));
      }
      if (requirements.preferences.includes('prefer_compact') && m.dimensions_mm) {
        score += 10;
      }
    }

    // Determine status strictly: Unknown != Fail
    let status: MatchStatus = 'STRONG_MATCH';
    if (failureReasons.length > 0) {
      status = 'DOES_NOT_MEET';
    } else if (unknowns.length > 0) {
      status = 'POSSIBLE_MATCH';
    }

    scored.push({
      machine: m,
      status,
      score,
      explanation: {
        reasons,
        unknowns,
        failureReasons
      }
    });
  }

  // Segment candidates with 100% deterministic tie-breaker
  const sortDeterministic = (a: ScoredMachine, b: ScoredMachine) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.machine.model_code.localeCompare(b.machine.model_code);
  };

  const strongMatches = scored
    .filter(s => s.status === 'STRONG_MATCH')
    .sort(sortDeterministic);

  const possibleMatches = scored
    .filter(s => s.status === 'POSSIBLE_MATCH')
    .sort(sortDeterministic);

  const unmetMachines = scored
    .filter(s => s.status === 'DOES_NOT_MEET')
    .sort(sortDeterministic);

  // Shortlist contains ONLY confirmed STRONG_MATCH machines (top 3)
  const shortlist: ScoredMachine[] = strongMatches.slice(0, 3);

  // Possible matches contains ONLY machines with unverified specs to confirm (top 2)
  const surfacedPossible: ScoredMachine[] = possibleMatches.slice(0, 2);

  // Detect Conflicting / Overly Restrictive Requirements
  const isConflicted = shortlist.length === 0 && surfacedPossible.length === 0;
  let conflictNotice: string | undefined;
  const recommendations: string[] = [];

  if (isConflicted) {
    conflictNotice = "We couldn't identify a machine that clearly meets all of your stated requirements.";
    if (requirements.powerSource === 'electric' && requirements.minPressureBar && requirements.minPressureBar > 200) {
      recommendations.push("High operating pressure (>200 BAR) with electric power typically requires 400V 3-phase mains supply or an autonomous petrol/diesel engine drive.");
    }
    if (requirements.mobility === 'trailer' && requirements.powerSource === 'electric') {
      recommendations.push("Highway mobile trailer rigs typically utilize autonomous petrol or diesel engines for remote off-grid operation.");
    }
    if (requirements.waterType === 'steam' && requirements.minPressureBar && requirements.minPressureBar > 100) {
      recommendations.push("Industrial saturated steam generators operate at lower impact pressures (20–50 BAR) to preserve high steam heat (140°C–165°C); for high pressure, select hot water pressure washing.");
    }
    recommendations.push("Try adjusting or relaxing one of your specific thresholds, or contact an Alkota UK technical specialist for custom equipment engineering.");
  }

  // Format active requirements summary
  const activeRequirementsSummary: string[] = [];
  if (requirements.application !== 'NOT_SURE') {
    activeRequirementsSummary.push(APPLICATION_TAXONOMY[requirements.application].label);
  }
  if (requirements.waterType !== 'not_sure') {
    activeRequirementsSummary.push(
      requirements.waterType === 'hot' ? 'Hot Water Heating' :
      requirements.waterType === 'cold' ? 'Cold Wash' :
      requirements.waterType === 'steam' ? 'Pure Steam' : 'Parts Washer'
    );
  }
  if (requirements.minPressureBar) {
    const psi = Math.round(requirements.minPressureBar * 14.5);
    activeRequirementsSummary.push(`Min ${requirements.minPressureBar} BAR (${psi} PSI)`);
  }
  if (requirements.minFlowLpm) {
    const gpm = (requirements.minFlowLpm / 3.785).toFixed(1);
    activeRequirementsSummary.push(`Min ${requirements.minFlowLpm} L/min (${gpm} GPM)`);
  }
  if (requirements.powerSource !== 'any') {
    activeRequirementsSummary.push(
      requirements.powerSource === 'electric' ? 'Mains Electric' :
      requirements.powerSource === 'petrol' ? 'Petrol Engine' :
      requirements.powerSource === 'diesel' ? 'Diesel Drive' : 'Combustion Engine'
    );
  }
  if (requirements.voltage && requirements.voltage !== 'any') {
    activeRequirementsSummary.push(requirements.voltage.toUpperCase());
  }
  if (requirements.phase && requirements.phase !== 'any') {
    activeRequirementsSummary.push(`${requirements.phase}-Phase`);
  }
  if (requirements.mobility !== 'any') {
    activeRequirementsSummary.push(
      requirements.mobility === 'portable' ? 'Mobile Running Gear' :
      requirements.mobility === 'stationary' ? 'Fixed Cabinet' :
      requirements.mobility === 'trailer' ? 'Trailer Rig' : 'Skid Base'
    );
  }
  if (requirements.tankRequired) {
    activeRequirementsSummary.push(
      requirements.minTankCapacityL ? `Min ${requirements.minTankCapacityL}L Water Tank` : 'Onboard Water Tank'
    );
  }

  return {
    shortlist,
    possibleMatches: surfacedPossible,
    unmetMachines,
    totalEvaluated: scored.length,
    totalQualified: strongMatches.length + possibleMatches.length,
    activeRequirementsSummary,
    isConflicted,
    conflictNotice,
    recommendations
  };
}
