/**
 * src/lib/spec-format.ts
 * Canonical specification formatting — single source of truth.
 * Used by: machine detail page, comparison engine, MachineCard, HelpMeChoose.
 * NEVER renders 0, N/A, — or Unknown unless genuinely authoritative.
 */

import { Product } from './products';

export type UnitSystem = 'metric' | 'imperial';

export interface SpecValue {
  display: string;
  raw: number | string | null;
  unit?: string;
  isSpecified: boolean;
  secondary?: string; // e.g. "(1,600 PSI)" shown alongside BAR
}

// ── Pressure ──────────────────────────────────────────────────────────────────

export function formatPressure(p: Product, unit: UnitSystem = 'metric'): SpecValue {
  if (unit === 'metric') {
    if (p.pressure_bar && p.pressure_bar > 0) {
      return {
        display: `${p.pressure_bar} BAR`,
        raw: p.pressure_bar,
        unit: 'BAR',
        isSpecified: true,
        secondary: p.pressure_psi ? `${p.pressure_psi} PSI` : undefined,
      };
    }
    if (p.pressure_psi && p.pressure_psi > 0) {
      const bar = Math.round(p.pressure_psi / 14.5038);
      return {
        display: `${bar} BAR`,
        raw: bar,
        unit: 'BAR',
        isSpecified: true,
        secondary: `${p.pressure_psi} PSI`,
      };
    }
  } else {
    if (p.pressure_psi && p.pressure_psi > 0) {
      return {
        display: `${p.pressure_psi} PSI`,
        raw: p.pressure_psi,
        unit: 'PSI',
        isSpecified: true,
        secondary: p.pressure_bar ? `${p.pressure_bar} BAR` : undefined,
      };
    }
    if (p.pressure_bar && p.pressure_bar > 0) {
      const psi = Math.round(p.pressure_bar * 14.5038);
      return {
        display: `${psi} PSI`,
        raw: psi,
        unit: 'PSI',
        isSpecified: true,
        secondary: `${p.pressure_bar} BAR`,
      };
    }
  }
  return { display: 'Not published', raw: null, isSpecified: false };
}

// ── Flow Rate ─────────────────────────────────────────────────────────────────

export function formatFlowRate(p: Product, unit: UnitSystem = 'metric'): SpecValue {
  if (unit === 'metric') {
    if (p.flow_rate_lpm && p.flow_rate_lpm > 0) {
      return {
        display: `${Number(p.flow_rate_lpm).toFixed(1)} L/min`,
        raw: Number(p.flow_rate_lpm),
        unit: 'L/min',
        isSpecified: true,
        secondary: p.flow_rate_gpm ? `${p.flow_rate_gpm} GPM` : undefined,
      };
    }
    if (p.flow_rate_gpm && p.flow_rate_gpm > 0) {
      const lpm = Number((p.flow_rate_gpm * 3.78541).toFixed(1));
      return {
        display: `${lpm} L/min`,
        raw: lpm,
        unit: 'L/min',
        isSpecified: true,
        secondary: `${p.flow_rate_gpm} GPM`,
      };
    }
  } else {
    if (p.flow_rate_gpm && p.flow_rate_gpm > 0) {
      return {
        display: `${p.flow_rate_gpm} GPM`,
        raw: p.flow_rate_gpm,
        unit: 'GPM',
        isSpecified: true,
        secondary: p.flow_rate_lpm ? `${Number(p.flow_rate_lpm).toFixed(1)} L/min` : undefined,
      };
    }
    if (p.flow_rate_lpm && p.flow_rate_lpm > 0) {
      const gpm = Number((p.flow_rate_lpm / 3.78541).toFixed(1));
      return {
        display: `${gpm} GPM`,
        raw: gpm,
        unit: 'GPM',
        isSpecified: true,
        secondary: `${p.flow_rate_lpm} L/min`,
      };
    }
  }
  return { display: 'Not published', raw: null, isSpecified: false };
}

// ── Temperature ───────────────────────────────────────────────────────────────

export function formatTemperature(p: Product, unit: UnitSystem = 'metric'): SpecValue {
  if (p.max_temp_c && p.max_temp_c > 0) {
    const f = Math.round((p.max_temp_c * 9) / 5 + 32);
    if (unit === 'metric') {
      return {
        display: `${p.max_temp_c}°C`,
        raw: p.max_temp_c,
        unit: '°C',
        isSpecified: true,
        secondary: `${f}°F`,
      };
    } else {
      return {
        display: `${f}°F`,
        raw: f,
        unit: '°F',
        isSpecified: true,
        secondary: `${p.max_temp_c}°C`,
      };
    }
  }
  if (p.category === 'cold-water') {
    return { display: 'Cold / Ambient', raw: 'ambient', isSpecified: true };
  }
  return { display: 'Not published', raw: null, isSpecified: false };
}

// ── Motor / Engine Power ──────────────────────────────────────────────────────

export function formatMotorPower(p: Product, unit: UnitSystem = 'metric'): SpecValue {
  const parts: string[] = [];
  if (p.power_source) parts.push(p.power_source);
  if (unit === 'metric' && p.motor_kw) {
    parts.push(`${p.motor_kw} kW`);
    if (p.motor_hp) parts.push(`(${p.motor_hp} HP)`);
  } else if (p.motor_hp) {
    parts.push(`${p.motor_hp} HP`);
    if (p.motor_kw) parts.push(`/ ${p.motor_kw} kW`);
  } else if (p.motor_kw) {
    parts.push(`${p.motor_kw} kW`);
  }
  if (p.engine_details) parts.push(`(${p.engine_details})`);
  if (parts.length > 0) {
    return { display: parts.join(' · '), raw: parts.join(' '), isSpecified: true };
  }
  return { display: 'Not published', raw: null, isSpecified: false };
}

// ── Electrical Supply ─────────────────────────────────────────────────────────
// Special handling for 530B: extra_specs Phase field overrides the bare numeric.

export function formatElectrical(p: Product): SpecValue {
  const parts: string[] = [];
  if (p.voltage) parts.push(p.voltage);

  // Check extra_specs for manufacturer phase description (e.g. "1/3 Dual Phase Available")
  const extraPhase = Array.isArray(p.extra_specs)
    ? p.extra_specs.find((s) => s.label.toLowerCase() === 'phase')?.value
    : undefined;

  if (extraPhase && extraPhase !== String(p.phase)) {
    parts.push(extraPhase);
  } else if (p.phase) {
    parts.push(p.phase === 1 ? '1-Phase' : p.phase === 3 ? '3-Phase' : `${p.phase}-Phase`);
  }

  if (p.amp_requirement) parts.push(`${p.amp_requirement}A`);

  if (parts.length > 0) {
    return { display: parts.join(' / '), raw: parts.join(' '), isSpecified: true };
  }
  return { display: 'Not published', raw: null, isSpecified: false };
}

// ── Weight ────────────────────────────────────────────────────────────────────

export function formatWeight(p: Product, unit: UnitSystem = 'metric'): SpecValue {
  if (unit === 'metric') {
    if (p.weight_kg && p.weight_kg > 0) {
      return {
        display: `${p.weight_kg} kg`,
        raw: p.weight_kg,
        unit: 'kg',
        isSpecified: true,
        secondary: p.weight_lbs ? `${p.weight_lbs} lbs` : undefined,
      };
    }
    if (p.weight_lbs && p.weight_lbs > 0) {
      const kg = Math.round(p.weight_lbs * 0.453592);
      return { display: `${kg} kg`, raw: kg, unit: 'kg', isSpecified: true, secondary: `${p.weight_lbs} lbs` };
    }
  } else {
    if (p.weight_lbs && p.weight_lbs > 0) {
      return {
        display: `${p.weight_lbs} lbs`,
        raw: p.weight_lbs,
        unit: 'lbs',
        isSpecified: true,
        secondary: p.weight_kg ? `${p.weight_kg} kg` : undefined,
      };
    }
    if (p.weight_kg && p.weight_kg > 0) {
      const lbs = Math.round(p.weight_kg / 0.453592);
      return { display: `${lbs} lbs`, raw: lbs, unit: 'lbs', isSpecified: true, secondary: `${p.weight_kg} kg` };
    }
  }
  return { display: 'Not published', raw: null, isSpecified: false };
}

// ── Dimensions ────────────────────────────────────────────────────────────────

export function formatDimensions(p: Product, unit: UnitSystem = 'metric'): SpecValue {
  if (unit === 'metric') {
    if (p.dimensions_mm) return { display: p.dimensions_mm, raw: p.dimensions_mm, isSpecified: true };
    if (p.dimensions_inches) return { display: p.dimensions_inches, raw: p.dimensions_inches, isSpecified: true };
  } else {
    if (p.dimensions_inches) return { display: p.dimensions_inches, raw: p.dimensions_inches, isSpecified: true };
    if (p.dimensions_mm) return { display: p.dimensions_mm, raw: p.dimensions_mm, isSpecified: true };
  }
  return { display: 'Not published', raw: null, isSpecified: false };
}

// ── Fuel Tank ─────────────────────────────────────────────────────────────────

export function formatFuelTank(p: Product, unit: UnitSystem = 'metric'): SpecValue {
  if (!p.fuel_tank_capacity_gal) return { display: 'Not published', raw: null, isSpecified: false };
  if (unit === 'metric') {
    const litres = Number((p.fuel_tank_capacity_gal * 3.78541).toFixed(1));
    return {
      display: `${litres} L`,
      raw: litres,
      unit: 'L',
      isSpecified: true,
      secondary: `${p.fuel_tank_capacity_gal} gal`,
    };
  }
  return { display: `${p.fuel_tank_capacity_gal} gal`, raw: p.fuel_tank_capacity_gal, unit: 'gal', isSpecified: true };
}

// ── Fuel Consumption ──────────────────────────────────────────────────────────

export function formatFuelConsumption(p: Product, unit: UnitSystem = 'metric'): SpecValue {
  if (!p.fuel_consumption_gph) return { display: 'Not published', raw: null, isSpecified: false };
  if (unit === 'metric') {
    const lph = Number((p.fuel_consumption_gph * 3.78541).toFixed(1));
    return {
      display: `${lph} L/hr`,
      raw: lph,
      unit: 'L/hr',
      isSpecified: true,
      secondary: `${p.fuel_consumption_gph} gal/hr`,
    };
  }
  return { display: `${p.fuel_consumption_gph} gal/hr`, raw: p.fuel_consumption_gph, unit: 'gal/hr', isSpecified: true };
}

// ── Coil Length ───────────────────────────────────────────────────────────────

export function formatCoilLength(p: Product, unit: UnitSystem = 'metric'): SpecValue {
  if (!p.coil_length_ft) return { display: 'Not published', raw: null, isSpecified: false };
  if (unit === 'metric') {
    const m = Math.round(p.coil_length_ft * 0.3048);
    return { display: `${m} m`, raw: m, unit: 'm', isSpecified: true, secondary: `${p.coil_length_ft} ft` };
  }
  return { display: `${p.coil_length_ft} ft`, raw: p.coil_length_ft, unit: 'ft', isSpecified: true };
}

// ── BTU Output ────────────────────────────────────────────────────────────────

export function formatBtu(p: Product): SpecValue {
  if (!p.burner_btu || p.burner_btu <= 0) return { display: 'Not published', raw: null, isSpecified: false };
  const kw = Number((p.burner_btu / 3412.14).toFixed(1));
  return {
    display: `${p.burner_btu.toLocaleString()} BTU/hr`,
    raw: p.burner_btu,
    unit: 'BTU/hr',
    isSpecified: true,
    secondary: `${kw} kW thermal`,
  };
}

// ── Deduplicate extra_specs by label ──────────────────────────────────────────

export function dedupeExtraSpecs(
  specs: Array<{ label: string; value: string }>
): Array<{ label: string; value: string }> {
  const seen = new Set<string>();
  return (specs || []).filter((s) => {
    const key = s.label.toLowerCase().trim();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// ── Category capability helpers ───────────────────────────────────────────────

export function categoryHasHeating(category: string): boolean {
  return ['hot-water', 'steam', 'water-heater', 'space-heater'].includes(category);
}

export function categoryHasPressure(category: string): boolean {
  return ['hot-water', 'cold-water', 'steam'].includes(category);
}

export function categoryHasFlow(category: string): boolean {
  return ['hot-water', 'cold-water', 'steam'].includes(category);
}
