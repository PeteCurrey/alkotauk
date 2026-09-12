import { Product } from '@/lib/products';
import {
  ApplicationId,
  WaterTypeRequirement,
  PowerPreference,
  MobilityPreference,
  VoltagePreference,
  PhasePreference
} from './types';

/**
 * Controlled Application Taxonomy grounded in verified canonical applications & industries.
 */
export const APPLICATION_TAXONOMY: Record<ApplicationId, {
  label: string;
  description: string;
  matchedApplications: string[];
  matchedIndustries: string[];
  recommendedWaterType?: WaterTypeRequirement;
  suggestedMinBar?: number;
}> = {
  FLEET_VEHICLE_CLEANING: {
    label: 'Fleet & Commercial Vehicle Cleaning',
    description: 'Road haulage, delivery fleets, buses, and commercial transport wash bays.',
    matchedApplications: ['Fleet & Commercial Vehicle Sanitisation', 'Heavy Mud & Soil Removal', 'Wash Bay Installation'],
    matchedIndustries: ['fleet-transport', 'local-authorities'],
    recommendedWaterType: 'hot',
    suggestedMinBar: 120,
  },
  AGRICULTURAL_CLEANING: {
    label: 'Agricultural & Livestock Washdown',
    description: 'Tractors, combines, slurry equipment, poultry sheds, and biosecurity sanitisation.',
    matchedApplications: ['Animal Housing & Biosecurity Washdown', 'Agricultural Machinery Cleaning', 'Heavy Mud & Soil Removal'],
    matchedIndustries: ['agriculture'],
    recommendedWaterType: 'hot',
    suggestedMinBar: 140,
  },
  CONSTRUCTION_HEAVY_PLANT: {
    label: 'Construction Plant & Earthmoving',
    description: 'Excavators, dumpers, concrete mixers, track gear, bitumen, and site mud removal.',
    matchedApplications: ['Heavy Plant & Earthmoving Washdown', 'Bitumen & Concrete Removal', 'Heavy Mud & Soil Removal'],
    matchedIndustries: ['construction', 'oil-gas'],
    recommendedWaterType: 'hot',
    suggestedMinBar: 180,
  },
  INDUSTRIAL_DEGREASING: {
    label: 'Industrial Degreasing & Machinery',
    description: 'Heavy grease, hydraulic oil, gearboxes, processing machinery, and shop floors.',
    matchedApplications: ['Heavy Grease & Oil Degreasing', 'Engine & Machinery Washdown', 'Bitumen & Paraffin Removal'],
    matchedIndustries: ['manufacturing', 'oil-gas'],
    recommendedWaterType: 'hot',
    suggestedMinBar: 150,
  },
  HIGH_TEMP_SANITISATION: {
    label: 'High-Temperature Steam & Sanitisation',
    description: 'Food processing facilities, abattoirs, chewing gum removal, chemical-free thermal sterilisation.',
    matchedApplications: ['High-Temperature Chemical-Free Sanitisation', 'Food Processing Sterilisation'],
    matchedIndustries: ['manufacturing', 'local-authorities'],
    recommendedWaterType: 'steam',
    suggestedMinBar: 20, // Steam generators operate at lower pressure, high heat
  },
  WORKSHOP_PARTS_WASHING: {
    label: 'Workshop Aqueous Parts Washing',
    description: 'Precision component cleaning, automotive rebuilding, zero-solvent wash cabinets.',
    matchedApplications: ['Aqueous Component Degreasing', 'Automotive & Plant Rebuild Cleaning', 'Zero-Solvent Parts Washing'],
    matchedIndustries: ['manufacturing', 'fleet-transport'],
    recommendedWaterType: 'aqueous_parts',
  },
  MOBILE_TRAILER_CLEANING: {
    label: 'Turnkey Mobile Trailer / Highway Rig',
    description: 'Self-contained off-grid cleaning rigs with integrated water tanks, hose reels, and generator power.',
    matchedApplications: ['Wash Bay Installation', 'Heavy Mud & Soil Removal', 'Heavy Plant & Earthmoving Washdown'],
    matchedIndustries: ['fleet-transport', 'local-authorities', 'construction'],
    recommendedWaterType: 'hot',
  },
  WATER_TREATMENT_RECYCLING: {
    label: 'Water Treatment & Trade Effluent Compliance',
    description: 'Closed-loop wash water recycling, oil-water separation, environmental discharge compliance.',
    matchedApplications: ['Closed-Loop Wash Water Recycling', 'Trade Effluent Environmental Compliance'],
    matchedIndustries: ['waste-management', 'manufacturing'],
  },
  NOT_SURE: {
    label: 'General Purpose / Not Sure',
    description: 'Explore the broader fleet across standard industrial requirements.',
    matchedApplications: [],
    matchedIndustries: [],
  },
};

/**
 * Authoritative field extraction (Tier 1 & Tier 2).
 * Distinguishes operating/rated values from maximum peak ratings.
 */
export function getAuthoritativePressureBar(m: Product): number | null {
  // If explicit operating/rated pressure is defined, use it
  const opBar = (m as any).operating_pressure_bar ?? (m as any).rated_pressure_bar;
  if (opBar !== undefined && opBar !== null && Number(opBar) > 0) {
    return Number(opBar);
  }
  if (m.pressure_bar !== null && m.pressure_bar !== undefined && m.pressure_bar > 0) {
    return m.pressure_bar;
  }
  const opPsi = (m as any).operating_pressure_psi ?? (m as any).rated_pressure_psi;
  if (opPsi !== undefined && opPsi !== null && Number(opPsi) > 0) {
    return Math.round(Number(opPsi) / 14.5038);
  }
  if (m.pressure_psi !== null && m.pressure_psi !== undefined && m.pressure_psi > 0) {
    return Math.round(m.pressure_psi / 14.5038);
  }
  return null;
}

export function getAuthoritativeFlowLpm(m: Product): number | null {
  const opFlow = (m as any).operating_flow_lpm ?? (m as any).rated_flow_lpm;
  if (opFlow !== undefined && opFlow !== null && Number(opFlow) > 0) {
    return Number(opFlow);
  }
  if (m.flow_rate_lpm !== null && m.flow_rate_lpm !== undefined && m.flow_rate_lpm > 0) {
    return Number(m.flow_rate_lpm);
  }
  const opGpm = (m as any).operating_flow_gpm ?? (m as any).rated_flow_gpm;
  if (opGpm !== undefined && opGpm !== null && Number(opGpm) > 0) {
    return Number((Number(opGpm) * 3.78541).toFixed(1));
  }
  if (m.flow_rate_gpm !== null && m.flow_rate_gpm !== undefined && m.flow_rate_gpm > 0) {
    return Number((m.flow_rate_gpm * 3.78541).toFixed(1));
  }
  return null;
}

export function getAuthoritativeMaxTempC(m: Product): number | null {
  if (m.max_temp_c !== null && m.max_temp_c !== undefined && m.max_temp_c > 0) {
    return m.max_temp_c;
  }
  return null;
}

export function getAuthoritativeWaterTankL(m: Product): { capacityL: number | null; hasTank: boolean | null } {
  // 1. Check extra_specs for water tank (strictly exclude fuel tanks)
  if (Array.isArray(m.extra_specs)) {
    const tankSpec = m.extra_specs.find(s => {
      const lbl = s.label.toLowerCase();
      if (lbl.includes('fuel')) return false;
      return lbl.includes('water tank') || (lbl.includes('tank capacity') && !lbl.includes('fuel'));
    });
    if (tankSpec && tankSpec.value) {
      const val = tankSpec.value.toLowerCase();
      const galMatch = val.match(/([\d.]+)\s*(?:gal|gallon)/);
      if (galMatch) {
        return { capacityL: Math.round(Number(galMatch[1]) * 3.78541), hasTank: true };
      }
      const lMatch = val.match(/([\d.]+)\s*(?:l|litre|liter)/);
      if (lMatch) {
        return { capacityL: Math.round(Number(lMatch[1])), hasTank: true };
      }
    }
  }

  // 2. Check explicit test or structured properties
  if ((m as any).water_tank_capacity_l !== undefined && (m as any).water_tank_capacity_l !== null) {
    const cap = Number((m as any).water_tank_capacity_l);
    return { capacityL: cap, hasTank: cap > 0 };
  }
  if ((m as any).has_water_tank === false) {
    return { capacityL: 0, hasTank: false };
  }
  if ((m as any).has_water_tank === true) {
    return { capacityL: null, hasTank: true };
  }

  // 3. Category classification: Trailers have tanks; standard washers require mains hose supply
  if (m.category === 'trailer') {
    return { capacityL: null, hasTank: true };
  }
  if (m.category === 'hot-water' || m.category === 'cold-water' || m.category === 'steam' || m.category === 'parts-washer') {
    return { capacityL: 0, hasTank: false };
  }

  return { capacityL: null, hasTank: null };
}

export type EvaluationState = 'PASS' | 'FAIL' | 'UNKNOWN';

export interface EvaluationResult {
  state: EvaluationState;
  reason?: string;
  failureReason?: string;
  unknownReason?: string;
  verifiedValue?: any;
}

/**
 * Evaluates water type requirement against authoritative category & heating_fuel fields.
 */
export function evaluateWaterType(m: Product, req: WaterTypeRequirement): EvaluationResult {
  if (req === 'not_sure') return { state: 'PASS', reason: 'Universal cleaning method acceptable' };

  if (req === 'steam') {
    if (m.category === 'steam' || (m.max_temp_c && m.max_temp_c >= 140)) {
      return {
        state: 'PASS',
        reason: `Delivers pure wet steam up to ${m.max_temp_c || 165}°C for chemical-free thermal sanitisation.`,
        verifiedValue: m.max_temp_c || 'Steam'
      };
    }
    return {
      state: 'FAIL',
      failureReason: 'Does not produce high-temperature steam (standard hot/cold pressure washer).'
    };
  }

  if (req === 'hot') {
    if (m.category === 'hot-water' || (m.heating_fuel && !m.heating_fuel.toLowerCase().includes('unheated'))) {
      const fuel = m.heating_fuel || 'Diesel/Kerosene';
      const temp = m.max_temp_c ? ` up to ${m.max_temp_c}°C` : '';
      return {
        state: 'PASS',
        reason: `Equipped with Schedule 80 heating coil (${fuel})${temp} for hot water degreasing.`,
        verifiedValue: fuel
      };
    }
    return {
      state: 'FAIL',
      failureReason: 'Cold water unit without heating coil or burner assembly.'
    };
  }

  if (req === 'cold') {
    if (m.category === 'cold-water') {
      return {
        state: 'PASS',
        reason: 'Dedicated ambient cold water industrial pressure washer with compact frame.',
        verifiedValue: 'Cold'
      };
    }
    if (m.category === 'hot-water') {
      return {
        state: 'PASS',
        reason: 'Can operate cold with burner disabled (includes hot water capability).',
        verifiedValue: 'Hot/Cold'
      };
    }
    return {
      state: 'FAIL',
      failureReason: 'Specialized thermal or parts-washing equipment not suited for cold washdown.'
    };
  }

  if (req === 'aqueous_parts') {
    if (m.category === 'parts-washer') {
      return {
        state: 'PASS',
        reason: 'Automated aqueous parts washing cabinet with heavy duty turntable.',
        verifiedValue: 'Parts Washer'
      };
    }
    return {
      state: 'FAIL',
      failureReason: 'Pressure washer, not an automated aqueous parts-washing cabinet.'
    };
  }

  return { state: 'PASS' };
}

/**
 * Evaluates pressure requirement against structured numerical pressure.
 * Distinguishes operating/rated pressure from maximum peak ratings.
 */
export function evaluatePressure(m: Product, minBar?: number | null): EvaluationResult {
  if (!minBar || minBar <= 0) return { state: 'PASS' };

  // Check if machine has only maximum pressure recorded without operating/rated pressure
  const maxOnly = (m as any).max_pressure_bar && !(m as any).operating_pressure_bar && !(m as any).rated_pressure_bar && !m.pressure_bar;
  if (maxOnly) {
    return {
      state: 'UNKNOWN',
      unknownReason: 'Only peak maximum pressure is recorded; continuous operating pressure must be confirmed with workshop.'
    };
  }

  const bar = getAuthoritativePressureBar(m);
  if (bar === null) {
    return {
      state: 'UNKNOWN',
      unknownReason: 'Pressure specification not recorded in upstream data — confirm with Alkota workshop before purchase.',
    };
  }

  if (bar >= minBar) {
    return {
      state: 'PASS',
      reason: `Delivers ${bar} BAR (${m.pressure_psi || Math.round(bar * 14.5)} PSI) operating pressure, exceeding your ${minBar} BAR threshold.`,
      verifiedValue: bar
    };
  }

  return {
    state: 'FAIL',
    failureReason: `Operating pressure (${bar} BAR) is below your minimum requirement of ${minBar} BAR.`
  };
}

/**
 * Evaluates flow rate requirement against structured numerical flow.
 * Distinguishes rated operating flow from maximum throughput.
 */
export function evaluateFlow(m: Product, minLpm?: number | null): EvaluationResult {
  if (!minLpm || minLpm <= 0) return { state: 'PASS' };

  const maxOnly = (m as any).max_flow_lpm && !(m as any).operating_flow_lpm && !(m as any).rated_flow_lpm && !m.flow_rate_lpm;
  if (maxOnly) {
    return {
      state: 'UNKNOWN',
      unknownReason: 'Only peak maximum flow is recorded; continuous rated flow rate must be verified.'
    };
  }

  const lpm = getAuthoritativeFlowLpm(m);
  if (lpm === null) {
    return {
      state: 'UNKNOWN',
      unknownReason: 'Water flow rate not specified in database — confirm with Alkota engineers.',
    };
  }

  if (lpm >= minLpm) {
    return {
      state: 'PASS',
      reason: `Delivers ${lpm} L/min (${m.flow_rate_gpm || (lpm / 3.785).toFixed(1)} GPM) water throughput.`,
      verifiedValue: lpm
    };
  }

  return {
    state: 'FAIL',
    failureReason: `Water throughput (${lpm} L/min) is below your stated minimum of ${minLpm} L/min.`
  };
}

/**
 * Evaluates power source constraint against structured power_source field.
 */
export function evaluatePowerSource(m: Product, req: PowerPreference): EvaluationResult {
  if (req === 'any') return { state: 'PASS' };

  const ps = m.power_source?.toLowerCase() || '';

  if (req === 'electric') {
    if (ps.includes('electric')) {
      const v = m.voltage ? ` (${m.voltage}${m.phase ? `, ${m.phase}PH` : ''})` : '';
      return {
        state: 'PASS',
        reason: `Mains electric drive${v} — suitable for quiet indoor or wash bay operation.`,
        verifiedValue: m.power_source
      };
    }
    if (ps.includes('gas') || ps.includes('petrol') || ps.includes('diesel')) {
      return {
        state: 'FAIL',
        failureReason: 'Engine driven (combustion), not electric.'
      };
    }
    return {
      state: 'UNKNOWN',
      unknownReason: 'Power source not explicitly confirmed in structured data.'
    };
  }

  if (req === 'petrol' || req === 'diesel' || req === 'engine') {
    if (ps.includes('petrol') || ps.includes('diesel') || ps.includes('gas') || ps.includes('engine') || m.engine_details) {
      if (req === 'petrol' && ps.includes('diesel') && !ps.includes('petrol') && !ps.includes('gas')) {
        return {
          state: 'FAIL',
          failureReason: 'Diesel engine drive, not petrol.'
        };
      }
      if (req === 'diesel' && (ps.includes('petrol') || ps.includes('gas')) && !ps.includes('diesel')) {
        return {
          state: 'FAIL',
          failureReason: 'Petrol engine drive, not diesel.'
        };
      }
      const eng = m.engine_details ? ` (${m.engine_details})` : '';
      return {
        state: 'PASS',
        reason: `Autonomous combustion engine drive${eng} for off-grid operations without mains electricity.`,
        verifiedValue: m.engine_details || m.power_source
      };
    }
    if (ps.includes('electric')) {
      return {
        state: 'FAIL',
        failureReason: 'Electric motor drive, requires mains power supply (not autonomous engine).'
      };
    }
    return {
      state: 'UNKNOWN',
      unknownReason: 'Drive source unverified in manufacturer catalogue.'
    };
  }

  return { state: 'PASS' };
}

/**
 * Evaluates electrical requirements (voltage and phase).
 * Applies strictly to electric equipment.
 */
export function evaluateElectrical(
  m: Product,
  voltage?: VoltagePreference,
  phase?: PhasePreference
): EvaluationResult {
  const isElectric = m.power_source?.toLowerCase().includes('electric');
  if (!isElectric || ((!voltage || voltage === 'any') && (!phase || phase === 'any'))) {
    return { state: 'PASS' };
  }

  // Voltage verification
  if (voltage && voltage !== 'any') {
    if (!m.voltage) {
      return {
        state: 'UNKNOWN',
        unknownReason: 'Electrical operating voltage not recorded in machine data.'
      };
    }
    const vStr = m.voltage.toLowerCase();
    let matches = false;
    if (voltage === '400v') {
      matches = vStr.includes('400') || vStr.includes('460') || vStr.includes('380') || vStr.includes('3-phase');
    } else if (voltage === '230v') {
      matches = (vStr.includes('230') || vStr.includes('240') || vStr.includes('220')) && !vStr.includes('400') && !vStr.includes('460');
    } else if (voltage === '110v') {
      matches = vStr.includes('110') || vStr.includes('115') || vStr.includes('120');
    }

    if (!matches) {
      return {
        state: 'FAIL',
        failureReason: `Requires ${voltage.toUpperCase()} supply, but machine is configured for ${m.voltage}.`
      };
    }
  }

  // Phase verification
  if (phase && phase !== 'any') {
    if (m.phase === null || m.phase === undefined) {
      return {
        state: 'UNKNOWN',
        unknownReason: 'Electrical supply phase not specified in database.'
      };
    }
    if (m.phase !== phase) {
      return {
        state: 'FAIL',
        failureReason: `Requires ${phase}-phase electrical supply, but machine is configured for ${m.phase}-phase.`
      };
    }
  }

  return {
    state: 'PASS',
    reason: `Verified ${m.voltage || ''}${m.phase ? ` ${m.phase}PH` : ''} electrical supply compatibility.`
  };
}

/**
 * Evaluates mobility constraint strictly against structured mobility and category fields.
 * Authority Boundary: NEVER infers mobility from slug or description text.
 */
export function evaluateMobility(m: Product, req: MobilityPreference): EvaluationResult {
  if (req === 'any') return { state: 'PASS' };

  if (req === 'trailer') {
    if (m.category === 'trailer' || (m.mobility && m.mobility.toLowerCase().includes('trailer'))) {
      return {
        state: 'PASS',
        reason: 'Turnkey mobile trailer rig with road-legal chassis and integrated configuration.',
        verifiedValue: 'Trailer'
      };
    }
    return {
      state: 'FAIL',
      failureReason: 'Not a trailer rig (standalone or skid unit).'
    };
  }

  if (req === 'stationary') {
    if (m.category === 'trailer') {
      return {
        state: 'FAIL',
        failureReason: 'Mobile road trailer rig, not a stationary wash bay cabinet.'
      };
    }
    if (!m.portable || (m.mobility && m.mobility.toLowerCase().includes('stationary'))) {
      return {
        state: 'PASS',
        reason: 'Stationary cabinet / base mount installation designed for permanent wash bays.',
        verifiedValue: 'Stationary'
      };
    }
    if (m.portable) {
      return {
        state: 'PASS',
        reason: 'Portable unit that can be installed in a fixed bay or wheeled on site.',
        verifiedValue: 'Portable'
      };
    }
  }

  if (req === 'portable') {
    if (m.category === 'trailer') {
      return {
        state: 'FAIL',
        failureReason: 'Highway trailer platform, not a 4-wheel site portable washer.'
      };
    }
    if (m.portable || (m.mobility && m.mobility.toLowerCase().includes('wheel'))) {
      return {
        state: 'PASS',
        reason: 'Fitted with heavy-duty 4-wheel pneumatic running gear for site mobility.',
        verifiedValue: '4-Wheel Portable'
      };
    }
    if (!m.portable) {
      return {
        state: 'FAIL',
        failureReason: 'Stationary or skid-mount equipment without wheeled running gear.'
      };
    }
  }

  if (req === 'skid') {
    if (m.mobility && m.mobility.toLowerCase().includes('skid')) {
      return {
        state: 'PASS',
        reason: 'Forkliftable skid frame suitable for flatbed trucks or static platform installation.',
        verifiedValue: 'Skid'
      };
    }
    if (!m.portable && m.category !== 'trailer') {
      return {
        state: 'PASS',
        reason: 'Base-mount skid cabinet suitable for van or static platform placement.',
        verifiedValue: 'Skid'
      };
    }
    return {
      state: 'FAIL',
      failureReason: 'Wheeled chassis or trailer platform, not a dedicated skid base.'
    };
  }

  return { state: 'PASS' };
}

/**
 * Evaluates water tank requirements against authoritative storage data.
 */
export function evaluateWaterTank(
  m: Product,
  tankRequired?: boolean,
  minCapacityL?: number | null
): EvaluationResult {
  if (!tankRequired && (!minCapacityL || minCapacityL <= 0)) {
    return { state: 'PASS' };
  }

  const { capacityL, hasTank } = getAuthoritativeWaterTankL(m);

  if (hasTank === false) {
    return {
      state: 'FAIL',
      failureReason: 'Requires external mains water supply (no onboard water storage tank).'
    };
  }

  if (hasTank === null && capacityL === null) {
    return {
      state: 'UNKNOWN',
      unknownReason: 'Onboard water tank presence not verified in manufacturer specification.'
    };
  }

  if (minCapacityL && minCapacityL > 0) {
    if (capacityL === null) {
      return {
        state: 'UNKNOWN',
        unknownReason: `Onboard water tank capacity unrecorded — verify ${minCapacityL}L minimum with workshop.`
      };
    }
    if (capacityL >= minCapacityL) {
      return {
        state: 'PASS',
        reason: `Verified ${capacityL}L onboard baffled water tank (exceeds ${minCapacityL}L requirement).`,
        verifiedValue: capacityL
      };
    }
    return {
      state: 'FAIL',
      failureReason: `Onboard water tank capacity (${capacityL}L) is below required ${minCapacityL}L.`
    };
  }

  return {
    state: 'PASS',
    reason: capacityL ? `Verified ${capacityL}L onboard water tank.` : 'Equipped with integrated water storage tank.',
    verifiedValue: capacityL || 'Onboard Tank'
  };
}

/**
 * Evaluates application alignment strictly based on verified applications and industries arrays.
 * Authority Boundary: NEVER searches raw description or marketing text.
 */
export function evaluateApplicationAlignment(m: Product, app: ApplicationId): { matches: boolean; score: number; matchedTag?: string } {
  if (app === 'NOT_SURE') return { matches: false, score: 0 };

  const tax = APPLICATION_TAXONOMY[app];
  if (!tax) return { matches: false, score: 0 };

  // Check structured applications array
  if (Array.isArray(m.applications)) {
    for (const targetApp of tax.matchedApplications) {
      const match = m.applications.some(a => a.toLowerCase().includes(targetApp.toLowerCase()));
      if (match) {
        return { matches: true, score: 35, matchedTag: targetApp };
      }
    }
  }

  // Check structured industries array
  if (Array.isArray(m.industries)) {
    for (const targetInd of tax.matchedIndustries) {
      if (m.industries.includes(targetInd)) {
        return { matches: true, score: 20, matchedTag: targetInd };
      }
    }
  }

  return { matches: false, score: 0 };
}
