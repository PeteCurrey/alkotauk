import { Product } from '@/lib/products';
import { UnitSystem, SpecValue, SpecRow, SpecGroup, ComparisonHighlight } from './types';

/**
 * Mathematical unit conversion helpers with sensible engineering precision.
 */
export function formatPressure(p: Product, unit: UnitSystem): SpecValue {
  if (unit === 'metric') {
    if (p.pressure_bar !== null && p.pressure_bar !== undefined && p.pressure_bar > 0) {
      return { display: `${p.pressure_bar} BAR`, raw: p.pressure_bar, unit: 'BAR', isSpecified: true };
    }
    if (p.pressure_psi !== null && p.pressure_psi !== undefined && p.pressure_psi > 0) {
      const bar = Math.round(p.pressure_psi / 14.5038);
      return { display: `${bar} BAR`, raw: bar, unit: 'BAR', isSpecified: true };
    }
  } else {
    if (p.pressure_psi !== null && p.pressure_psi !== undefined && p.pressure_psi > 0) {
      return { display: `${p.pressure_psi} PSI`, raw: p.pressure_psi, unit: 'PSI', isSpecified: true };
    }
    if (p.pressure_bar !== null && p.pressure_bar !== undefined && p.pressure_bar > 0) {
      const psi = Math.round(p.pressure_bar * 14.5038);
      return { display: `${psi} PSI`, raw: psi, unit: 'PSI', isSpecified: true };
    }
  }
  return { display: 'Not specified', raw: null, isSpecified: false };
}

export function formatFlowRate(p: Product, unit: UnitSystem): SpecValue {
  if (unit === 'metric') {
    if (p.flow_rate_lpm !== null && p.flow_rate_lpm !== undefined && p.flow_rate_lpm > 0) {
      const lpm = Number(p.flow_rate_lpm).toFixed(1);
      return { display: `${lpm} L/min`, raw: Number(lpm), unit: 'L/min', isSpecified: true };
    }
    if (p.flow_rate_gpm !== null && p.flow_rate_gpm !== undefined && p.flow_rate_gpm > 0) {
      const lpm = Number((p.flow_rate_gpm * 3.78541).toFixed(1));
      return { display: `${lpm} L/min`, raw: lpm, unit: 'L/min', isSpecified: true };
    }
  } else {
    if (p.flow_rate_gpm !== null && p.flow_rate_gpm !== undefined && p.flow_rate_gpm > 0) {
      const gpm = Number(p.flow_rate_gpm).toFixed(1);
      return { display: `${gpm} GPM`, raw: Number(gpm), unit: 'GPM', isSpecified: true };
    }
    if (p.flow_rate_lpm !== null && p.flow_rate_lpm !== undefined && p.flow_rate_lpm > 0) {
      const gpm = Number((p.flow_rate_lpm / 3.78541).toFixed(1));
      return { display: `${gpm} GPM`, raw: gpm, unit: 'GPM', isSpecified: true };
    }
  }
  return { display: 'Not specified', raw: null, isSpecified: false };
}

export function formatTemperature(p: Product, unit: UnitSystem): SpecValue {
  if (p.max_temp_c !== null && p.max_temp_c !== undefined && p.max_temp_c > 0) {
    if (unit === 'metric') {
      return { display: `${p.max_temp_c}°C`, raw: p.max_temp_c, unit: '°C', isSpecified: true };
    } else {
      const f = Math.round((p.max_temp_c * 9) / 5 + 32);
      return { display: `${f}°F`, raw: f, unit: '°F', isSpecified: true };
    }
  }
  if (p.category === 'cold-water') {
    return { display: 'Cold Water (Ambient)', raw: 'ambient', isSpecified: true };
  }
  return { display: 'Not specified', raw: null, isSpecified: false };
}

export function formatWeight(p: Product, unit: UnitSystem): SpecValue {
  if (unit === 'metric') {
    if (p.weight_kg !== null && p.weight_kg !== undefined && p.weight_kg > 0) {
      return { display: `${p.weight_kg} kg`, raw: p.weight_kg, unit: 'kg', isSpecified: true };
    }
    if (p.weight_lbs !== null && p.weight_lbs !== undefined && p.weight_lbs > 0) {
      const kg = Math.round(p.weight_lbs * 0.453592);
      return { display: `${kg} kg`, raw: kg, unit: 'kg', isSpecified: true };
    }
  } else {
    if (p.weight_lbs !== null && p.weight_lbs !== undefined && p.weight_lbs > 0) {
      return { display: `${p.weight_lbs} lbs`, raw: p.weight_lbs, unit: 'lbs', isSpecified: true };
    }
    if (p.weight_kg !== null && p.weight_kg !== undefined && p.weight_kg > 0) {
      const lbs = Math.round(p.weight_kg / 0.453592);
      return { display: `${lbs} lbs`, raw: lbs, unit: 'lbs', isSpecified: true };
    }
  }
  return { display: 'Not specified', raw: null, isSpecified: false };
}

export function formatDimensions(p: Product, unit: UnitSystem): SpecValue {
  if (unit === 'metric') {
    if (p.dimensions_mm) {
      return { display: p.dimensions_mm, raw: p.dimensions_mm, isSpecified: true };
    }
    if (p.dimensions_inches) {
      return { display: p.dimensions_inches, raw: p.dimensions_inches, isSpecified: true };
    }
  } else {
    if (p.dimensions_inches) {
      return { display: p.dimensions_inches, raw: p.dimensions_inches, isSpecified: true };
    }
    if (p.dimensions_mm) {
      return { display: p.dimensions_mm, raw: p.dimensions_mm, isSpecified: true };
    }
  }
  return { display: 'Not specified', raw: null, isSpecified: false };
}

export function formatPower(p: Product, unit: UnitSystem): SpecValue {
  const parts: string[] = [];
  if (p.power_source) parts.push(p.power_source);
  if (unit === 'metric' && p.motor_kw) parts.push(`${p.motor_kw} kW`);
  else if (unit === 'imperial' && p.motor_hp) parts.push(`${p.motor_hp} HP`);
  else if (p.motor_hp) parts.push(`${p.motor_hp} HP`);
  else if (p.motor_kw) parts.push(`${p.motor_kw} kW`);

  if (p.engine_details) parts.push(`(${p.engine_details})`);

  if (parts.length > 0) {
    return { display: parts.join(' · '), raw: parts.join(' '), isSpecified: true };
  }
  return { display: 'Not specified', raw: null, isSpecified: false };
}

export function formatElectrical(p: Product): SpecValue {
  const parts: string[] = [];
  if (p.voltage) parts.push(p.voltage);
  if (p.phase) parts.push(p.phase === 1 ? '1-Phase' : p.phase === 3 ? '3-Phase' : `${p.phase}-Phase`);
  if (p.amp_requirement) parts.push(`${p.amp_requirement}A`);

  if (parts.length > 0) {
    return { display: parts.join(' · '), raw: parts.join(' '), isSpecified: true };
  }
  return { display: 'Not specified', raw: null, isSpecified: false };
}

export function formatGeneric(val: any): SpecValue {
  if (val === null || val === undefined || val === '') {
    return { display: 'Not specified', raw: null, isSpecified: false };
  }
  if (typeof val === 'boolean') {
    return { display: val ? 'Standard Equipment' : 'Optional / Not Fitted', raw: val, isSpecified: true };
  }
  if (Array.isArray(val)) {
    if (val.length === 0) return { display: 'Not specified', raw: null, isSpecified: false };
    return { display: val.join(', '), raw: val.join(', '), isSpecified: true };
  }
  return { display: String(val), raw: val, isSpecified: true };
}

/**
 * Tests whether specification values differ across compared machines.
 * Normalises numbers and case-insensitively trims strings.
 */
export function checkIsDifferent(values: Record<string, SpecValue>, slugs: string[]): boolean {
  if (slugs.length <= 1) return false;

  const validEntries = slugs.map(s => values[s]).filter(Boolean);
  if (validEntries.length <= 1) return false;

  const first = validEntries[0];
  for (let i = 1; i < validEntries.length; i++) {
    const current = validEntries[i];
    
    // If one is specified and other is not, it's a difference
    if (first.isSpecified !== current.isSpecified) return true;
    if (!first.isSpecified && !current.isSpecified) continue;

    // Compare raw values if both numeric
    if (typeof first.raw === 'number' && typeof current.raw === 'number') {
      if (Math.abs(first.raw - current.raw) > 0.01) return true;
      continue;
    }

    // Compare string display
    const str1 = String(first.display).trim().toLowerCase();
    const str2 = String(current.display).trim().toLowerCase();
    if (str1 !== str2) return true;
  }

  return false;
}

/**
 * Builds all category-aware specification groups for the given machines.
 */
export function buildComparisonGroups(machines: Product[], unit: UnitSystem): SpecGroup[] {
  const slugs = machines.map(m => m.slug);

  // Helper to create a row
  const makeRow = (
    key: string,
    label: string,
    formatter: (p: Product) => SpecValue,
    tooltip?: string,
    categoryPriority?: string[]
  ): SpecRow => {
    const values: Record<string, SpecValue> = {};
    for (const m of machines) {
      values[m.slug] = formatter(m);
    }
    return {
      key,
      label,
      tooltip,
      values,
      isDifferent: checkIsDifferent(values, slugs),
      categoryPriority
    };
  };

  // Group 1: Performance & Thermodynamics
  const performanceRows: SpecRow[] = [
    makeRow('pressure', 'Operating Pressure', p => formatPressure(p, unit), 'Continuous operating pressure delivered at the spray nozzle.'),
    makeRow('flow', 'Water Flow Rate', p => formatFlowRate(p, unit), 'Water volume throughput per minute, critical for rinsing and mud displacement.'),
    makeRow('temp', 'Maximum Temperature', p => formatTemperature(p, unit), 'Peak operating temperature delivered by the thermal heating system.'),
    makeRow('burner', 'Thermal Output (BTU)', p => p.burner_btu ? { display: `${p.burner_btu.toLocaleString()} BTU/hr`, raw: p.burner_btu, isSpecified: true } : { display: 'Not specified', raw: null, isSpecified: false }, 'Heating burner thermal capacity for hot water and steam units.'),
  ];

  // Group 2: Power & Electrical
  const powerRows: SpecRow[] = [
    makeRow('power_source', 'Power & Drive Unit', p => formatPower(p, unit), 'Motor, engine, or drive assembly powering the high pressure pump.'),
    makeRow('electrical', 'Electrical Supply', p => formatElectrical(p), 'Voltage, phase, and full load operating current requirements.'),
    makeRow('fuel', 'Heating Fuel', p => formatGeneric(p.heating_fuel), 'Fuel source for the internal heat exchanger or boiler.'),
    makeRow('fuel_tank', 'Fuel Tank Capacity', p => {
      if (p.fuel_tank_capacity_gal) {
        return unit === 'metric' 
          ? { display: `${(p.fuel_tank_capacity_gal * 3.78541).toFixed(1)} Litres`, raw: p.fuel_tank_capacity_gal, isSpecified: true }
          : { display: `${p.fuel_tank_capacity_gal} Gallons`, raw: p.fuel_tank_capacity_gal, isSpecified: true };
      }
      return { display: 'Not specified', raw: null, isSpecified: false };
    }),
  ];

  // Group 3: Mechanical & Metallurgy
  const equipmentRows: SpecRow[] = [
    makeRow('pump', 'Pump Architecture', p => formatGeneric(p.pump_type), 'High pressure pump design, crankcase lubrication, and plunger metallurgy.'),
    makeRow('coil', 'Heating Coil System', p => formatGeneric(p.coil_type), 'Heat exchanger pipe schedule and structural thermal wrap design.'),
    makeRow('coil_len', 'Coil Pipe Length', p => {
      if (p.coil_length_ft) {
        return unit === 'metric'
          ? { display: `${Math.round(p.coil_length_ft * 0.3048)} Metres`, raw: p.coil_length_ft, isSpecified: true }
          : { display: `${p.coil_length_ft} Feet`, raw: p.coil_length_ft, isSpecified: true };
      }
      return { display: 'Not specified', raw: null, isSpecified: false };
    }),
  ];

  // Group 4: Physical Chassis & Mobility
  const physicalRows: SpecRow[] = [
    makeRow('mobility', 'Chassis / Mobility', p => formatGeneric(p.mobility), 'Chassis configuration, wheel assembly, or skid footprint.'),
    makeRow('portable', 'Portability', p => ({
      display: p.portable ? 'Mobile / Wheel Mounted' : 'Stationary / Skid Installation',
      raw: p.portable,
      isSpecified: true
    })),
    makeRow('dimensions', 'Dimensions', p => formatDimensions(p, unit), 'Overall footprint dimensions.'),
    makeRow('weight', 'Operating Weight', p => formatWeight(p, unit), 'Approximate equipment dry weight.'),
  ];

  // Group 5: Applications & Quality
  const applicationRows: SpecRow[] = [
    makeRow('duty', 'Duty Rating', p => formatGeneric(p.duty_application), 'Recommended daily continuous duty cycle.'),
    makeRow('apps', 'Verified Applications', p => {
      if (p.applications && p.applications.length > 0) {
        return { display: p.applications.join(' · '), raw: p.applications.join(' '), isSpecified: true };
      }
      return { display: 'General Industrial Cleaning', raw: null, isSpecified: false };
    }),
    makeRow('warranty', 'Equipment Warranty', p => ({
      display: `${p.warranty_years || 1} Year${p.warranty_years === 1 ? '' : 's'} Parts & Labour`,
      raw: p.warranty_years,
      isSpecified: true
    })),
    makeRow('coil_warranty', 'Heating Coil Warranty', p => p.coil_warranty_years ? ({
      display: `${p.coil_warranty_years} Years (Schedule 80 Guarantee)`,
      raw: p.coil_warranty_years,
      isSpecified: true
    }) : { display: 'Not specified', raw: null, isSpecified: false }),
    makeRow('certs', 'Official Certifications', p => {
      if (p.certifications && p.certifications.length > 0) {
        return { display: p.certifications.join(', '), raw: p.certifications.join(', '), isSpecified: true };
      }
      return { display: 'CE / Standard Manufacturer Conformity', raw: null, isSpecified: false };
    }),
  ];

  // Group 6: Category-Specific Special Specs (from extra_specs)
  const specialMap = new Map<string, SpecRow>();
  for (const m of machines) {
    if (Array.isArray(m.extra_specs)) {
      for (const s of m.extra_specs) {
        if (!s.label || !s.value) continue;
        const normKey = s.label.toLowerCase().trim();
        if (!specialMap.has(normKey)) {
          const values: Record<string, SpecValue> = {};
          for (const other of machines) {
            const found = other.extra_specs?.find(es => es.label.toLowerCase().trim() === normKey);
            values[other.slug] = found 
              ? { display: found.value, raw: found.value, isSpecified: true }
              : { display: 'Not specified', raw: null, isSpecified: false };
          }
          specialMap.set(normKey, {
            key: `extra_${normKey.replace(/[^a-z0-9]/g, '_')}`,
            label: s.label,
            values,
            isDifferent: checkIsDifferent(values, slugs)
          });
        }
      }
    }
  }

  const groups: SpecGroup[] = [
    { id: 'performance', title: 'Performance & Thermodynamics', rows: performanceRows },
    { id: 'power', title: 'Power & Propulsion', rows: powerRows },
    { id: 'equipment', title: 'Mechanical & Metallurgy', rows: equipmentRows },
    { id: 'physical', title: 'Chassis & Mobility', rows: physicalRows },
    { id: 'application', title: 'Duty Cycle & Warranty', rows: applicationRows },
  ];

  if (specialMap.size > 0) {
    groups.push({
      id: 'special',
      title: 'Category-Specific Engineering',
      description: 'Specific parameters extracted from manufacturer schematics.',
      rows: Array.from(specialMap.values())
    });
  }

  return groups;
}

/**
 * Computes factual "At A Glance" comparison observations.
 * NEVER makes subjective or unsubstantiated marketing statements.
 */
export function computeHighlights(machines: Product[]): ComparisonHighlight[] {
  if (machines.length <= 1) return [];

  const highlights: ComparisonHighlight[] = [];

  // 1. Highest Pressure
  const validPressures = machines.filter(m => (m.pressure_bar && m.pressure_bar > 0) || (m.pressure_psi && m.pressure_psi > 0));
  if (validPressures.length > 1) {
    const getBar = (m: Product) => m.pressure_bar || Math.round((m.pressure_psi || 0) / 14.5038);
    const sorted = [...validPressures].sort((a, b) => getBar(b) - getBar(a));
    const highest = sorted[0];
    const second = sorted[1];
    if (getBar(highest) > getBar(second) + 10) {
      highlights.push({
        type: 'pressure',
        machineSlug: highest.slug,
        machineModel: highest.model_code || highest.name,
        label: 'Highest Operating Pressure',
        detail: `${getBar(highest)} BAR (${highest.pressure_psi || Math.round(getBar(highest) * 14.5)} PSI) — optimal for hard-caked scale, concrete etching, and high-impact stripping.`
      });
    }
  }

  // 2. Highest Flow Rate
  const validFlows = machines.filter(m => (m.flow_rate_lpm && m.flow_rate_lpm > 0) || (m.flow_rate_gpm && m.flow_rate_gpm > 0));
  if (validFlows.length > 1) {
    const getLpm = (m: Product) => m.flow_rate_lpm || Number(((m.flow_rate_gpm || 0) * 3.78541).toFixed(1));
    const sorted = [...validFlows].sort((a, b) => getLpm(b) - getLpm(a));
    const highest = sorted[0];
    const second = sorted[1];
    if (getLpm(highest) > getLpm(second) + 1.0) {
      highlights.push({
        type: 'flow',
        machineSlug: highest.slug,
        machineModel: highest.model_code || highest.name,
        label: 'Highest Water Flow Rate',
        detail: `${getLpm(highest)} L/min (${highest.flow_rate_gpm || (getLpm(highest) / 3.785).toFixed(1)} GPM) — maximum flushing velocity and mud displacement.`
      });
    }
  }

  // 3. Hot Water / Thermal capability difference
  const hot = machines.find(m => m.category === 'hot-water' || m.category === 'steam' || (m.max_temp_c && m.max_temp_c > 60));
  const cold = machines.find(m => m.category === 'cold-water' && (!m.max_temp_c || m.max_temp_c <= 40));
  if (hot && cold) {
    highlights.push({
      type: 'heating',
      machineSlug: hot.slug,
      machineModel: hot.model_code || hot.name,
      label: 'Thermal Degreasing Capability',
      detail: `Features continuous hot water heating up to ${hot.max_temp_c || 98}°C for grease and hydrocarbon breakdown, compared to ambient cold water washdown on ${cold.model_code || cold.name}.`
    });
  }

  // 4. Power Source Differences
  const electric = machines.find(m => m.power_source?.toLowerCase().includes('electric'));
  const engine = machines.find(m => m.power_source?.toLowerCase().includes('gas') || m.power_source?.toLowerCase().includes('petrol') || m.power_source?.toLowerCase().includes('diesel'));
  if (electric && engine) {
    highlights.push({
      type: 'power',
      machineSlug: engine.slug,
      machineModel: engine.model_code || engine.name,
      label: 'Autonomous Site Mobility',
      detail: `Self-powered combustion engine for off-grid operations without mains electricity, compared to zero-emission quiet electric drive on ${electric.model_code || electric.name}.`
    });
  }

  return highlights;
}
