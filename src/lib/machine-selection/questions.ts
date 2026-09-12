import {
  ApplicationId,
  WaterTypeRequirement,
  PowerPreference,
  MobilityPreference,
  VoltagePreference,
  PhasePreference,
  SelectionRequirements
} from './types';
import { APPLICATION_TAXONOMY } from './authority-map';

export interface QuestionOption<T> {
  value: T;
  label: string;
  sublabel?: string;
  badge?: string;
  iconName?: string;
}

export interface SelectionStep {
  id: string;
  stepNumber: number;
  title: string;
  subtitle: string;
  description: string;
}

export const STEPS: SelectionStep[] = [
  {
    id: 'application',
    stepNumber: 1,
    title: 'Cleaning Task',
    subtitle: 'What do you need to clean or operate?',
    description: 'Select your operational cleaning environment to establish baseline engineering requirements.'
  },
  {
    id: 'waterType',
    stepNumber: 2,
    title: 'Water Temp',
    subtitle: 'Hot water, cold water, or pure steam?',
    description: 'Grease, oils, and animal fats generally require hot water (80°C–120°C) or steam, while mud, dust, and general soil can be cleared with cold water.'
  },
  {
    id: 'pressure',
    stepNumber: 3,
    title: 'Pressure',
    subtitle: 'How tough is the dirt or surface?',
    description: 'Operating pressure (BAR / PSI) provides the cutting force to dislodge compacted matter. Higher is not always better for sensitive vehicle or coated surfaces.'
  },
  {
    id: 'flow',
    stepNumber: 4,
    title: 'Water Volume',
    subtitle: 'How quickly do you need to rinse and flush?',
    description: 'Flow rate (L/min / GPM) determines wash speed and flushing volume. Heavy mud, gravel, and slurry washdown demand high water throughput.'
  },
  {
    id: 'power',
    stepNumber: 5,
    title: 'Power & Supply',
    subtitle: 'Where will the machine be powered?',
    description: 'Choose between quiet, zero-emission electric motors for wash bays or autonomous petrol/diesel engines for off-grid operations.'
  },
  {
    id: 'mobility',
    stepNumber: 6,
    title: 'Mobility & Mounting',
    subtitle: 'How does the machine need to move or mount?',
    description: 'From heavy-duty site portable chassis to permanent enclosed wash bay cabinets or highway-towable trailer rigs.'
  },
  {
    id: 'preferences',
    stepNumber: 7,
    title: 'Priorities',
    subtitle: 'Any specific engineering priorities?',
    description: 'Optional ranking factors to fine-tune recommendations without eliminating viable machines.'
  }
];

export const APPLICATION_OPTIONS: QuestionOption<ApplicationId>[] = [
  {
    value: 'FLEET_VEHICLE_CLEANING',
    label: APPLICATION_TAXONOMY.FLEET_VEHICLE_CLEANING.label,
    sublabel: APPLICATION_TAXONOMY.FLEET_VEHICLE_CLEANING.description,
    iconName: 'Truck'
  },
  {
    value: 'AGRICULTURAL_CLEANING',
    label: APPLICATION_TAXONOMY.AGRICULTURAL_CLEANING.label,
    sublabel: APPLICATION_TAXONOMY.AGRICULTURAL_CLEANING.description,
    iconName: 'Tractor'
  },
  {
    value: 'CONSTRUCTION_HEAVY_PLANT',
    label: APPLICATION_TAXONOMY.CONSTRUCTION_HEAVY_PLANT.label,
    sublabel: APPLICATION_TAXONOMY.CONSTRUCTION_HEAVY_PLANT.description,
    iconName: 'HardHat'
  },
  {
    value: 'INDUSTRIAL_DEGREASING',
    label: APPLICATION_TAXONOMY.INDUSTRIAL_DEGREASING.label,
    sublabel: APPLICATION_TAXONOMY.INDUSTRIAL_DEGREASING.description,
    iconName: 'Wrench'
  },
  {
    value: 'HIGH_TEMP_SANITISATION',
    label: APPLICATION_TAXONOMY.HIGH_TEMP_SANITISATION.label,
    sublabel: APPLICATION_TAXONOMY.HIGH_TEMP_SANITISATION.description,
    iconName: 'Flame'
  },
  {
    value: 'WORKSHOP_PARTS_WASHING',
    label: APPLICATION_TAXONOMY.WORKSHOP_PARTS_WASHING.label,
    sublabel: APPLICATION_TAXONOMY.WORKSHOP_PARTS_WASHING.description,
    iconName: 'Cog'
  },
  {
    value: 'MOBILE_TRAILER_CLEANING',
    label: APPLICATION_TAXONOMY.MOBILE_TRAILER_CLEANING.label,
    sublabel: APPLICATION_TAXONOMY.MOBILE_TRAILER_CLEANING.description,
    iconName: 'Container'
  },
  {
    value: 'WATER_TREATMENT_RECYCLING',
    label: APPLICATION_TAXONOMY.WATER_TREATMENT_RECYCLING.label,
    sublabel: APPLICATION_TAXONOMY.WATER_TREATMENT_RECYCLING.description,
    iconName: 'Droplets'
  },
  {
    value: 'NOT_SURE',
    label: 'I\'m Not Sure / Broad Industrial Fleet',
    sublabel: 'Evaluate general-purpose industrial equipment across standard parameters.',
    iconName: 'HelpCircle'
  }
];

export const WATER_TYPE_OPTIONS: QuestionOption<WaterTypeRequirement>[] = [
  {
    value: 'hot',
    label: 'Hot Water Pressure Washer (Up to 90°C–120°C)',
    sublabel: 'Rapidly melts oils, road film, grease, and animal fats. Essential for heavy plant & fleet wash bays.',
    badge: 'Thermal Degreasing'
  },
  {
    value: 'cold',
    label: 'Cold Water Industrial Pressure Washer',
    sublabel: 'Dedicated high-impact ambient washdown for soil, grit, mud, and dust removal without heating fuel costs.',
    badge: 'Ambient Washdown'
  },
  {
    value: 'steam',
    label: 'Pure Steam Generator (Up to 140°C–165°C)',
    sublabel: 'Chemical-free thermal sanitisation, chewing gum removal, and delicate high-heat degreasing with low water usage.',
    badge: 'Thermal Sanitisation'
  },
  {
    value: 'aqueous_parts',
    label: 'Aqueous Parts Washing Cabinet',
    sublabel: 'Enclosed automated rotating turntable cabinet for zero-solvent mechanical component degreasing.',
    badge: 'Enclosed Cabinet'
  },
  {
    value: 'not_sure',
    label: 'I\'m Not Sure / Any Medium',
    sublabel: 'Show suitable cold, hot, or dual-capability machines for review.',
    badge: 'Universal'
  }
];

export interface PressureOption {
  value: number | null;
  labelMetric: string;
  labelImperial: string;
  sublabel: string;
  badge?: string;
}

export const PRESSURE_OPTIONS: PressureOption[] = [
  {
    value: null,
    labelMetric: 'No Minimum / Not Sure',
    labelImperial: 'No Minimum / Not Sure',
    sublabel: 'Safe default — evaluate all pressures suitable for your application without filtering out machines.',
    badge: 'Recommended / Any'
  },
  {
    value: 100,
    labelMetric: '100+ BAR',
    labelImperial: '1,450+ PSI',
    sublabel: 'Light commercial washdown, light vehicles, facilities maintenance.',
    badge: 'Light Commercial'
  },
  {
    value: 140,
    labelMetric: '140+ BAR',
    labelImperial: '2,000+ PSI',
    sublabel: 'Commercial fleet haulage, agricultural machinery, workshop wash bays.',
    badge: 'Standard Commercial'
  },
  {
    value: 180,
    labelMetric: '180+ BAR',
    labelImperial: '2,600+ PSI',
    sublabel: 'Heavy earthmoving plant, tracked excavators, concrete and bitumen removal.',
    badge: 'Heavy Industrial'
  },
  {
    value: 240,
    labelMetric: '240+ BAR',
    labelImperial: '3,500+ PSI',
    sublabel: 'Extreme duty industrial stripping, paint and rust prep, heavy quarrying.',
    badge: 'Extreme Duty'
  }
];

export interface FlowOption {
  value: number | null;
  labelMetric: string;
  labelImperial: string;
  sublabel: string;
  badge?: string;
}

export const FLOW_OPTIONS: FlowOption[] = [
  {
    value: null,
    labelMetric: 'No Minimum / Not Sure',
    labelImperial: 'No Minimum / Not Sure',
    sublabel: 'Safe default — evaluate all water flow throughputs without filtering out machines.',
    badge: 'Recommended / Any'
  },
  {
    value: 8,
    labelMetric: '8+ L/min',
    labelImperial: '2.1+ GPM',
    sublabel: 'Standard single-operator washdown with low water supply requirements.',
    badge: 'Compact Supply'
  },
  {
    value: 12,
    labelMetric: '12+ L/min',
    labelImperial: '3.2+ GPM',
    sublabel: 'High-speed fleet rinsing, good flushing balance with standard water supply.',
    badge: 'Standard Fleet'
  },
  {
    value: 15,
    labelMetric: '15+ L/min',
    labelImperial: '4.0+ GPM',
    sublabel: 'Heavy mud, gravel, and manure flushing in agricultural and construction sites.',
    badge: 'Heavy Flushing'
  },
  {
    value: 19,
    labelMetric: '19+ L/min',
    labelImperial: '5.0+ GPM',
    sublabel: 'High-volume rapid soil flushing or dual-gun simultaneous wash bay operations.',
    badge: 'High Throughput'
  }
];

export const POWER_OPTIONS: QuestionOption<PowerPreference>[] = [
  {
    value: 'electric',
    label: 'Mains Electric Motor',
    sublabel: 'Zero exhaust emissions, quiet indoor/bay operation, low maintenance. Requires 230V or 400V supply.',
    badge: 'Clean / Indoor'
  },
  {
    value: 'petrol',
    label: 'Petrol Engine (Honda / Kohler)',
    sublabel: 'Autonomous off-grid operation without mains cables. Ideal for remote farm, forest, or utility work.',
    badge: 'Off-Grid Petrol'
  },
  {
    value: 'diesel',
    label: 'Diesel Engine Drive',
    sublabel: 'Heavy duty, high-hour autonomous drive for construction sites, quarrying, and plant yards.',
    badge: 'Off-Grid Diesel'
  },
  {
    value: 'engine',
    label: 'Any Combustion Engine (Petrol or Diesel)',
    sublabel: 'Any autonomous engine-driven rig for off-grid operations.',
    badge: 'Autonomous'
  },
  {
    value: 'any',
    label: 'Any Power Source / Not Sure',
    sublabel: 'Consider both mains electric and engine-driven configurations.',
    badge: 'Universal'
  }
];

export const VOLTAGE_OPTIONS: QuestionOption<VoltagePreference>[] = [
  {
    value: 'any',
    label: 'Any Voltage / Not Sure',
    sublabel: 'Evaluate all available electrical supply configurations.',
    badge: 'Universal'
  },
  {
    value: '110v',
    label: '110V Site Safe Supply',
    sublabel: 'Yellow 110V step-down transformer supply for UK construction sites.',
    badge: '110V Site'
  },
  {
    value: '230v',
    label: '230V Single Phase (Standard UK Mains)',
    sublabel: 'Standard commercial or domestic electrical supply (13A/16A/32A).',
    badge: '230V Standard'
  },
  {
    value: '400v',
    label: '400V Three-Phase (Industrial 3-Phase)',
    sublabel: 'Industrial 400V 3-phase supply for continuous duty and high motor kW.',
    badge: '400V 3-Phase'
  }
];

export const PHASE_OPTIONS: QuestionOption<PhasePreference>[] = [
  {
    value: 'any',
    label: 'Any Phase / Not Sure',
    sublabel: 'Accept either single-phase or three-phase equipment.',
    badge: 'Universal'
  },
  {
    value: '1ph',
    label: 'Single Phase (1-Phase)',
    sublabel: 'Standard UK commercial or workshop supply.',
    badge: '1-Phase'
  },
  {
    value: '3ph',
    label: 'Three Phase (3-Phase)',
    sublabel: 'High-power industrial 3-phase supply for continuous wash operations.',
    badge: '3-Phase'
  }
];

export const MOBILITY_OPTIONS: QuestionOption<MobilityPreference>[] = [
  {
    value: 'portable',
    label: '4-Wheel Heavy Duty Portable',
    sublabel: 'Equipped with pneumatic site tyres and push bar for moving around yard, plant, or building.',
    badge: 'Site Mobile'
  },
  {
    value: 'stationary',
    label: 'Stationary Enclosed Cabinet',
    sublabel: 'Base-mount or wall/floor-mounted cabinet for permanent indoor wash bays or pump rooms.',
    badge: 'Fixed Wash Bay'
  },
  {
    value: 'trailer',
    label: 'Highway Mobile Trailer Rig',
    sublabel: 'Self-contained road-legal trailer rig with integrated water tank, hose reels, and engine power.',
    badge: 'Turnkey Trailer'
  },
  {
    value: 'skid',
    label: 'Forkliftable Skid Mount (Bespoke / Enquiry)',
    sublabel: 'Compact steel skid base for flatbed van or truck bed installation. Available via custom engineering consultation.',
    badge: 'Bespoke Build'
  },
  {
    value: 'any',
    label: 'Any Chassis / Not Sure',
    sublabel: 'Evaluate both mobile and stationary chassis options.',
    badge: 'Universal'
  }
];

export interface PreferenceOption {
  id: string;
  label: string;
  description: string;
}

export const PREFERENCE_OPTIONS: PreferenceOption[] = [
  {
    id: 'prefer_higher_flow',
    label: 'Prioritise Higher Water Volume',
    description: 'Boost machines delivering higher L/min throughput for faster mud rinsing and mass flushing.'
  },
  {
    id: 'prefer_higher_pressure',
    label: 'Prioritise Higher Operating Pressure',
    description: 'Boost machines delivering maximum BAR/PSI for stubborn concrete, scale, or heavy stripping.'
  },
  {
    id: 'prefer_compact',
    label: 'Prioritise Compact Footprint',
    description: 'Boost machines engineered with space-saving vertical or compact chassis configurations.'
  }
];

export const DEFAULT_REQUIREMENTS: SelectionRequirements = {
  application: 'NOT_SURE',
  waterType: 'not_sure',
  minPressureBar: null,
  minFlowLpm: null,
  powerSource: 'any',
  voltage: 'any',
  phase: 'any',
  mobility: 'any',
  preferences: [],
  unitSystem: 'metric'
};
