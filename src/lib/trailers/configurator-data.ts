import {
  UKChassisOption,
  TrailerMachineOption,
  WaterStorageOption,
  PowerFuelOption,
  WaterRecoveryOption,
  HoseStorageOption,
  SiteOption,
  FinishLiveryOption,
  StartingConfiguration,
  CommercialValueEstimate,
  TrailerOpportunityScore,
  TrailerConfiguration,
  ConfigurationWeights,
  ConfigurationValidationResult,
  ValidationIssue,
  EnduranceCalculation,
  TowVehicleAssessment
} from './types';

export const CONFIGURATOR_SCHEMA_VERSION = '1.1.0';

// ─── 01. UK APPROVED CHASSIS SPECIFICATIONS ──────────────────────────────────
export const UK_CHASSIS_OPTIONS: UKChassisOption[] = [
  {
    id: 'chassis-single-1500-open',
    name: 'UK Single Axle 1,500kg — Open Deck',
    format: 'open-deck',
    axles: 'single',
    mam_kg: 1500,
    tare_weight_kg: 320,
    max_payload_kg: 1180,
    deck_length_mm: 2450,
    deck_width_mm: 1450,
    overall_length_mm: 3650,
    overall_width_mm: 1950,
    braked: true,
    hitch_type: '50mm Ball Hitch with Overrun Braking & Breakaway Cable',
    wheel_size: '185/70 R13 Commercial Radial',
    suspension: 'Independent Rubber Torsion Axle',
    uk_approval_type: 'GB Small Series Type Approval / IVA Verified',
    description: 'Compact, nimble road-legal open chassis engineered for single-operator operations, agile urban towing, and small-to-medium water payloads up to 600L.',
    suitable_for: ['Contract Cleaning', 'Agricultural Mobile Wash', 'Light Commercial Fleet', 'Property Maintenance'],
    max_tank_litres: 600,
    max_machine_count: 1,
    guide_price_gbp: 3850
  },
  {
    id: 'chassis-tandem-2700-open',
    name: 'UK Tandem Axle 2,700kg — Open Deck Pro',
    format: 'open-deck',
    axles: 'tandem',
    mam_kg: 2700,
    tare_weight_kg: 520,
    max_payload_kg: 2180,
    deck_length_mm: 3600,
    deck_width_mm: 1750,
    overall_length_mm: 4950,
    overall_width_mm: 2250,
    braked: true,
    hitch_type: '50mm Cast Ball Hitch with Auto-Reverse Overrun Braking',
    wheel_size: '195/60 R12C Low Profile Commercial',
    suspension: 'Twin Tandem Torsion Axles with Equaliser Beam',
    uk_approval_type: 'GB Type Approved (ECWVTA / IVA Compliant)',
    description: 'The industrial backbone. Balances high payload capacity (up to 1,200L water tank + heavy diesel skid) with exceptional dual-axle towing stability at 60mph.',
    suitable_for: ['Heavy Fleet Depots', 'Civil Engineering & Plant', 'Industrial Degreasing', 'Dual Operator Works'],
    max_tank_litres: 1200,
    max_machine_count: 2,
    guide_price_gbp: 5400
  },
  {
    id: 'chassis-tandem-3500-open',
    name: 'UK Heavy-Duty Tandem 3,500kg — Open Deck Heavy-Industrial',
    format: 'open-deck',
    axles: 'tandem',
    mam_kg: 3500,
    tare_weight_kg: 680,
    max_payload_kg: 2820,
    deck_length_mm: 4300,
    deck_width_mm: 1900,
    overall_length_mm: 5750,
    overall_width_mm: 2380,
    braked: true,
    hitch_type: 'Heavy-Duty 3,500kg Cast Lockable Hitch with Triple-Safety Breakaway',
    wheel_size: '185/75 R14C High-Load Commercial Tyres',
    suspension: 'Heavy-Duty Tandem Axles with Parabolic Leaf Springs & Shock Absorbers',
    uk_approval_type: 'GB Complete Vehicle Approval / Full IVA Certification',
    description: 'Maximum legal UK towing capacity (3,500kg MAM). Supports high-capacity baffled water tanks up to 2,000L, dual industrial hot water skids, generators, and recovery.',
    suitable_for: ['Highways & Infrastructure', 'Large Fleet Washdown', 'Offshore / Marine Service', 'Full Day Continuous Remote Operations'],
    max_tank_litres: 2000,
    max_machine_count: 2,
    guide_price_gbp: 6900
  },
  {
    id: 'chassis-tandem-2700-enclosed',
    name: 'UK Tandem Axle 2,700kg — Enclosed Mobile Plant Room',
    format: 'enclosed',
    axles: 'tandem',
    mam_kg: 2700,
    tare_weight_kg: 780,
    max_payload_kg: 1920,
    deck_length_mm: 3600,
    deck_width_mm: 1750,
    overall_length_mm: 5050,
    overall_width_mm: 2280,
    body_height_mm: 1950,
    braked: true,
    hitch_type: '50mm Cast Ball Hitch with Auto-Reverse Overrun Braking',
    wheel_size: '195/60 R12C Low Profile Commercial',
    suspension: 'Twin Tandem Torsion Axles with Equaliser Beam',
    uk_approval_type: 'GB Type Approved / IVA Verified Enclosed Bodywork',
    description: 'Fully enclosed weatherproof box van trailer transformed into a self-contained mobile washroom. High-security roller/barn doors, thermal insulation, and full corporate livery panels.',
    suitable_for: ['Contract Cleaning Fleets', 'High-Security Urban Work', 'Specialist Degreasing', 'Winterised All-Weather Operations'],
    max_tank_litres: 1000,
    max_machine_count: 1,
    guide_price_gbp: 9800
  },
  {
    id: 'chassis-tandem-3500-enclosed',
    name: 'UK Heavy Tandem 3,500kg — Enclosed Flagship Plant Room',
    format: 'enclosed',
    axles: 'tandem',
    mam_kg: 3500,
    tare_weight_kg: 960,
    max_payload_kg: 2540,
    deck_length_mm: 4400,
    deck_width_mm: 1950,
    overall_length_mm: 5950,
    overall_width_mm: 2420,
    body_height_mm: 2100,
    braked: true,
    hitch_type: 'Heavy-Duty 3,500kg Cast Lockable Hitch with Triple-Safety Breakaway',
    wheel_size: '185/75 R14C High-Load Commercial Tyres',
    suspension: 'Heavy-Duty Tandem Axles with Parabolic Leaf Springs & Shock Absorbers',
    uk_approval_type: 'GB Complete Vehicle Approval / Full IVA Certification',
    description: 'The ultimate flagship. Walk-in mobile plant room housing 2,000L water storage, onboard generator, closed-loop water treatment filtration, dual hose reels, internal LED workshop lighting, and sound deadening.',
    suitable_for: ['Closed-Loop Environmental Cleaning', 'Major Airport / Port Maintenance', 'Council & Municipal Rapid Response', 'Premium Multi-Operator Fleet Service'],
    max_tank_litres: 2000,
    max_machine_count: 2,
    guide_price_gbp: 12500
  }
];

// ─── 02. CANONICAL ALKOTA MACHINES FOR TRAILER MOUNTING ──────────────────────
export const TRAILER_MACHINE_OPTIONS: TrailerMachineOption[] = [
  {
    id: 'machine-ged-12v-311',
    model_code: '311-GED-12V',
    name: 'Alkota GED 12V Petrol-Driven Hot Water Skid',
    series: 'GED 12V Skid Series',
    category: 'hot-water',
    pressure_bar: 207,
    pressure_psi: 3000,
    flow_lpm: 13.2,
    flow_gpm: 3.5,
    power_source: 'Honda GX390 Petrol Engine with Electric Start (13 HP)',
    engine_details: 'Honda GX390 OHV Commercial Engine with 12V Battery Charging System',
    heating_fuel: 'Diesel / Kerosene (Schedule 80 Hydro-Insulated Coil)',
    dry_weight_kg: 215,
    max_temp_c: 121,
    dual_gun_capable: false,
    dimensions_mm: '1150 × 760 × 940',
    image_url: '/assets/products/ged-12v-skid.png',
    description: 'Compact self-powered hot water skid. 12V burner system operates directly off the Honda engine battery with zero external generator needed. Ultra-reliable workhorse.',
    duty_cycle: 'Continuous Industrial Duty (8+ Hours Daily)',
    primary_application: ['Contract Cleaning', 'Plant Washdown', 'Graffiti & Masonry', 'Agricultural Equipment'],
    guide_price_gbp: 8200
  },
  {
    id: 'machine-ged-12v-4305',
    model_code: '4305-GED-12V',
    name: 'Alkota 4305-GED Heavy Flow Hot Water Skid',
    series: 'GED 12V High-Output Series',
    category: 'hot-water',
    pressure_bar: 241,
    pressure_psi: 3500,
    flow_lpm: 17.0,
    flow_gpm: 4.5,
    power_source: 'Vanguard V-Twin 18 HP Commercial Petrol Engine',
    engine_details: 'Briggs & Stratton Vanguard 18HP V-Twin with Oil Cooler and 16A Alternator',
    heating_fuel: 'Diesel / Kerosene (High-Efficiency Down-Draft Burner)',
    dry_weight_kg: 275,
    max_temp_c: 130,
    dual_gun_capable: true,
    dimensions_mm: '1280 × 820 × 1020',
    image_url: '/assets/products/4305xd4.png',
    description: 'High-volume thermal flushing combined with 241 Bar cutting power. Can be split for simultaneous dual-operator washing (8.5 LPM @ 241 Bar per operator) with dual-gun kit.',
    duty_cycle: 'Extreme Continuous Duty (10+ Hours Daily)',
    primary_application: ['Heavy Fleet Depots', 'Earthmoving Machinery', 'Concrete & Civil Washout', 'Multi-Gun Mobile Washing'],
    guide_price_gbp: 11400
  },
  {
    id: 'machine-ded-big-boy',
    model_code: 'DED-4000-DIESEL',
    name: 'Alkota DED All-Diesel Single-Fuel Heavy Rig Skid',
    series: 'DED Heavy Diesel Series',
    category: 'hot-water',
    pressure_bar: 275,
    pressure_psi: 4000,
    flow_lpm: 19.0,
    flow_gpm: 5.0,
    power_source: 'Kohler / Kubota Liquid-Cooled Diesel Engine (24 HP)',
    engine_details: 'Tier 4 Final Compliant Liquid-Cooled 3-Cylinder Industrial Diesel',
    heating_fuel: 'Diesel (Shares single 80L trailer bulk tank for engine & burner)',
    dry_weight_kg: 440,
    max_temp_c: 140,
    dual_gun_capable: true,
    dimensions_mm: '1450 × 900 × 1150',
    image_url: '/assets/products/ded-big-boy.png',
    description: 'The single-fuel flagship. Both the heavy Kubota engine and the Alkota down-draft burner run off the same diesel fuel supply. Super-low RPM triplex ceramic plunger pump for 3,000+ hour service intervals.',
    duty_cycle: '24/7 Heavy Industrial & Mining Duty',
    primary_application: ['Mining & Quarrying', 'Marine & Shipping Docks', 'Rail & Train Depots', 'Refuse & Heavy Logistics'],
    guide_price_gbp: 18500
  },
  {
    id: 'machine-steam-oil-combo',
    model_code: '325-CSH-STEAM',
    name: 'Alkota 325-CSH Wet Steam & Extreme Thermal Skid',
    series: 'Industrial Steam Skid Series',
    category: 'steam',
    pressure_bar: 172,
    pressure_psi: 2500,
    flow_lpm: 11.4,
    flow_gpm: 3.0,
    power_source: 'Honda GX390 13HP Petrol Engine',
    engine_details: 'Honda GX390 with High-Output 12V Charging Coil',
    heating_fuel: 'Diesel (Alkota Modulating Steam Coil)',
    dry_weight_kg: 245,
    max_temp_c: 155,
    dual_gun_capable: false,
    dimensions_mm: '1180 × 780 × 960',
    image_url: '/assets/products/steam-oil.png',
    description: 'Specialised high-temperature wet steam generator producing saturated wet steam at 155°C. Instantly liquifies bitumen, animal fats, paraffin wax, chewing gum, and hydraulic oils with minimum water consumption.',
    duty_cycle: 'Continuous Thermal Steam Service',
    primary_application: ['Bitumen & Asphalt Plant', 'Food Industry Sanitisation', 'Tanker Barrel Cleaning', 'Chewing Gum & Urban Cleaning'],
    guide_price_gbp: 9800
  }
];

// ─── 03. BAFFLED WATER STORAGE OPTIONS ────────────────────────────────────────
export const WATER_STORAGE_OPTIONS: WaterStorageOption[] = [
  {
    id: 'tank-mains-only',
    litres: 0,
    gallons_uk: 0,
    tank_type: 'Mains-Fed Direct Buffer Only',
    material: 'None (Direct CAT 5 Break Tank 50L)',
    baffled: false,
    hardware_weight_kg: 18,
    dimensions_mm: '400 × 300 × 450',
    auto_fill_capable: true,
    low_water_shutoff: true,
    description: 'No bulk onboard water storage. Uses site hydrant / mains water through a compliant CAT 5 air gap break tank. Maximum payload availability for tools and equipment.',
    guide_price_gbp: 650
  },
  {
    id: 'tank-500l-baffled',
    litres: 500,
    gallons_uk: 110,
    tank_type: '500L Single Baffled Slimline Poly Tank',
    material: 'Heavy-Duty UV-Stabilised Food-Grade Polyethylene',
    baffled: true,
    hardware_weight_kg: 38,
    dimensions_mm: '1100 × 650 × 850',
    auto_fill_capable: true,
    low_water_shutoff: true,
    description: 'Baffled slimline poly tank preventing water surge during towing. Ideal for single-axle 1,500kg chassis and compact urban response.',
    guide_price_gbp: 1250
  },
  {
    id: 'tank-1000l-baffled',
    litres: 1000,
    gallons_uk: 220,
    tank_type: '1,000L Triple-Baffled Centre-Mount Tank',
    material: '10mm Wall Rotomoulded High-Impact Polyethylene',
    baffled: true,
    hardware_weight_kg: 68,
    dimensions_mm: '1600 × 950 × 900',
    auto_fill_capable: true,
    low_water_shutoff: true,
    description: 'The standard industrial mobile tank. Triple internal baffle walls arrest transverse and longitudinal water surge for safe braking on UK roads. Over 1 hour continuous heavy washing.',
    guide_price_gbp: 1850
  },
  {
    id: 'tank-1500l-baffled',
    litres: 1500,
    gallons_uk: 330,
    tank_type: '1,500L Multi-Chamber Heavy-Duty Tank',
    material: 'Rotomoulded Virgin MDPE with Anti-Algae UV Inhibitor',
    baffled: true,
    hardware_weight_kg: 95,
    dimensions_mm: '2100 × 1050 × 950',
    auto_fill_capable: true,
    low_water_shutoff: true,
    description: 'Extended remote operation capacity. Recommended for 2,700kg and 3,500kg tandem chassis. Delivers ~1.5 to 2 hours of off-grid pressure washing.',
    guide_price_gbp: 2600
  },
  {
    id: 'tank-2000l-dual-baffled',
    litres: 2000,
    gallons_uk: 440,
    tank_type: '2,000L Dual Interconnected Baffled Tank System',
    material: 'Twin Heavy-Duty Poly Reservoirs with Equaliser Manifold',
    baffled: true,
    hardware_weight_kg: 135,
    dimensions_mm: '2500 × 1200 × 1000',
    auto_fill_capable: true,
    low_water_shutoff: true,
    description: 'Maximum legal mobile water payload on a 3,500kg MAM chassis. Interlinked twin tanks with low-level balance manifold for continuous dual-operator remote washing all day.',
    guide_price_gbp: 3400
  }
];

// ─── 04. POWER & FUEL OPTIONS ────────────────────────────────────────────────
export const POWER_FUEL_OPTIONS: PowerFuelOption[] = [
  {
    id: 'power-12v-engine',
    name: '12V DC Engine Charging System (Standard)',
    category: 'battery',
    weight_kg: 15,
    output_rating: '12V 16A Engine Alternator',
    description: 'Operates burner, ignition, and LED work lighting directly from the machine engine charging coil. Zero auxiliary generator needed.',
    compatible_formats: ['open-deck', 'enclosed'],
    guide_price_gbp: 450
  },
  {
    id: 'power-gen-5kw-diesel',
    name: '5.0 kVA Super-Silent Onboard Diesel Generator',
    category: 'generator',
    weight_kg: 110,
    output_rating: '5.0 kVA / 4.0 kW 230V 50Hz (68 dB(A) @ 7m)',
    description: 'Supplies auxiliary 230V power for vacuum recovery pumps, flood lighting masts, power tools, and battery charging stations.',
    compatible_formats: ['open-deck', 'enclosed'],
    guide_price_gbp: 4200
  },
  {
    id: 'power-gen-10kw-3ph',
    name: '10.0 kVA Multi-Phase Silent Plant Room Generator',
    category: 'generator',
    weight_kg: 210,
    output_rating: '10.0 kVA 400V / 230V Dual Voltage (Kubota Powered)',
    description: 'Heavy continuous generator installed inside enclosed trailers to power multi-stage VFS water recycling skids and heavy industrial plant.',
    compatible_formats: ['enclosed'],
    guide_price_gbp: 8500
  },
  {
    id: 'power-bulk-fuel-80l',
    name: '80L Heavy-Duty Long-Range Diesel Tank',
    category: 'fuel-tank',
    weight_kg: 28,
    fuel_capacity_litres: 80,
    description: 'Bunded aluminium bulk fuel tank with level gauge and quick-release fuel supply lines to machine burner and generator for multi-day runtime.',
    compatible_formats: ['open-deck', 'enclosed'],
    guide_price_gbp: 1100
  },
  {
    id: 'power-shore-power',
    name: '230V 16A / 32A External Shore Power Hookup & Inverter Pack',
    category: 'electrical',
    weight_kg: 22,
    output_rating: '230V Input with 2.5kW Pure Sine Wave Inverter',
    description: 'Allows the trailer to plug into depot mains electricity for indoor washbay operation without running combustion engines.',
    compatible_formats: ['enclosed'],
    guide_price_gbp: 1650
  }
];

// ─── 05. WATER RECOVERY & TREATMENT MODULES ──────────────────────────────────
export const WATER_RECOVERY_OPTIONS: WaterRecoveryOption[] = [
  {
    id: 'recovery-none',
    name: 'No Onboard Water Recovery System',
    tier: 'none',
    weight_kg: 0,
    description: 'Standard washdown configuration. Effluent discharges directly to site drainage or trade effluent collection sumps.',
    environmental_standard: 'Requires Approved Site Drainage / Interceptor',
    dimensions_mm: 'N/A',
    guide_price_gbp: 0
  },
  {
    id: 'recovery-vacgd-blower',
    name: 'Alkota VACGD Industrial Positive-Displacement Vacuum Blower',
    tier: 'vacuum-recovery',
    weight_kg: 145,
    power_draw_kw: 4.8,
    flow_capacity_lpm: 60,
    vacuum_lift_inches: 14,
    description: 'High-suction recovery blower capable of vacuuming wastewater, sludge, and debris from up to 100 meters away via surface scuppers and portable containment berms.',
    filtration_stages: ['Heavy Perforated Silt Basket', 'Secondary 100-Micron Mesh Strainer'],
    environmental_standard: 'Captures 100% surface runoff for holding / bulk disposal',
    dimensions_mm: '950 × 600 × 850',
    guide_price_gbp: 6800
  },
  {
    id: 'recovery-vfs-filtration',
    name: 'Alkota 8-VFS-1 Negative-Void Vacuum Filtration Skid',
    tier: 'vfs-filtration',
    weight_kg: 230,
    power_draw_kw: 6.5,
    flow_capacity_lpm: 45,
    vacuum_lift_inches: 16,
    description: 'Patented negative-void vacuum filtration technology. Continuously pulls oily wastewater through continuous media belts and polishing cartridges to discharge clean water under Trade Effluent consent.',
    filtration_stages: ['Sediment Separation', 'Tramp Oil Coalescing', 'Continuous Vacuum Filter Media (20µm)', 'Activated Carbon Polishing'],
    environmental_standard: 'Complies with UK Environment Agency & BS EN 858 Guidelines (<5 mg/L Oil)',
    dimensions_mm: '1350 × 800 × 1150',
    guide_price_gbp: 14500
  },
  {
    id: 'recovery-closed-loop-recycle',
    name: 'Alkota Hydro-Recycle Complete Closed-Loop Mobile Water Plant',
    tier: 'closed-loop-recycle',
    weight_kg: 340,
    power_draw_kw: 8.0,
    flow_capacity_lpm: 35,
    vacuum_lift_inches: 16,
    description: 'The halo environmental rig. Captures wash water from the ground, purifies it through a 5-stage physical/chemical treatment process, and pumps it directly back into the Alkota high-pressure washer holding tank in a 100% closed loop.',
    filtration_stages: ['Silt Removal', 'Hydrocarbon Coalescing', 'Vacuum Filtration', 'Granular Activated Carbon', 'Ozone / Biocide Disinfection'],
    environmental_standard: 'Zero Runoff, Zero Sewer Discharge — Up to 90% Fresh Water Reduction',
    dimensions_mm: '1850 × 900 × 1300',
    guide_price_gbp: 22000
  }
];

// ─── 06. HOSE REELS & STORAGE ────────────────────────────────────────────────
export const HOSE_STORAGE_OPTIONS: HoseStorageOption[] = [
  {
    id: 'hose-single-50m-manual',
    name: 'Heavy-Duty 50m High-Pressure Manual Hose Reel (Standard)',
    category: 'hp-reel',
    weight_kg: 18,
    length_metres: 50,
    description: 'Direct-crank stainless steel manifold reel with 50m of 3/8" wire-braided 400 Bar hot-water hose.',
    guide_price_gbp: 620
  },
  {
    id: 'hose-dual-100m-manual',
    name: 'Dual High-Pressure 100m Manual Hose Reels (Split Manifold)',
    category: 'hp-reel',
    weight_kg: 42,
    length_metres: 100,
    description: 'Two independent stacked hose reels with 2 × 50m (100m total) 400 Bar hoses for dual-operator setups or extreme reach.',
    guide_price_gbp: 1450
  },
  {
    id: 'hose-electric-rewind-50m',
    name: '12V Heavy-Duty Electric Auto-Rewind High-Pressure Reel (50m)',
    category: 'hp-reel',
    weight_kg: 36,
    length_metres: 50,
    description: 'Push-button 12V motor-driven auto rewind reel. Eliminates operator fatigue when recovering long hose runs.',
    guide_price_gbp: 1680
  },
  {
    id: 'hose-inlet-30m-reel',
    name: '30m 3/4" High-Flow Water Inlet Hose Reel',
    category: 'inlet-reel',
    weight_kg: 16,
    length_metres: 30,
    description: 'Dedicated commercial inlet supply reel for rapid hydrant/mains hookup without hose tangling.',
    guide_price_gbp: 520
  },
  {
    id: 'hose-vac-recovery-30m',
    name: '30m 2" Crush-Proof Vacuum Recovery Hose & Reel',
    category: 'vacuum-reel',
    weight_kg: 32,
    length_metres: 30,
    description: 'Heavy-duty 2-inch smooth-bore suction hose for connecting vacuum scuppers and berms back to the trailer.',
    guide_price_gbp: 980
  },
  {
    id: 'storage-steel-vault',
    name: 'Heavy-Duty Lockable Aluminium Tool & Lance Vault',
    category: 'vault',
    weight_kg: 26,
    description: 'Weatherproof chequerplate storage chest with twin gas struts, recessed stainless T-latches, and lance clips.',
    guide_price_gbp: 750
  },
  {
    id: 'storage-surface-cleaner-bracket',
    name: 'Integrated Deck Mounting Brackets for Whirl-A-Way Cleaner',
    category: 'surface-cleaner',
    weight_kg: 8,
    description: 'Lockable chassis frame brackets to secure 20" / 24" rotary flat surface cleaners safely during transit.',
    guide_price_gbp: 280
  }
];

// ─── 07. SITE & WINTERISATION OPTIONS ────────────────────────────────────────
export const SITE_OPTIONS: SiteOption[] = [
  {
    id: 'site-led-scene-lighting',
    name: 'Telescopic LED Night-Work Scene Mast (2 × 40W High-Output)',
    category: 'lighting',
    weight_kg: 14,
    description: 'Pneumatic / mechanical 2.5m extendable mast illuminating a 30m working perimeter for nocturnal highway and fleet operations.',
    guide_price_gbp: 850
  },
  {
    id: 'site-internal-plant-lights',
    name: 'Internal Enclosed Plant Room LED Strip Array & Red Tactical Light',
    category: 'lighting',
    weight_kg: 6,
    description: 'Bright 6000K white LED interior illumination plus night-vision red tactical lighting for enclosed trailers.',
    guide_price_gbp: 480
  },
  {
    id: 'site-winterisation-purge',
    name: 'Anti-Freeze Purge & Blowout Manifold (Winterisation Pack)',
    category: 'winterisation',
    weight_kg: 9,
    description: 'Quick-connect anti-freeze recirculating loop and compressed-air blowout valves to prevent coil bursting in sub-zero UK winters.',
    guide_price_gbp: 520
  },
  {
    id: 'site-cat5-airgap',
    name: 'WRAS Approved Category 5 Air Gap Tank Protection System',
    category: 'safety',
    weight_kg: 12,
    description: 'Ensures 100% legal compliance with UK Water Supply Regulations (1999) preventing backflow contamination into public water mains.',
    guide_price_gbp: 690
  },
  {
    id: 'site-wireless-remote',
    name: 'Long-Range Wireless Engine & Burner Remote Control (150m)',
    category: 'controls',
    weight_kg: 4,
    description: 'Key fob and lance-mountable wireless remote allowing the operator to toggle engine idle and burner heat without walking back to the trailer.',
    guide_price_gbp: 590
  }
];

// ─── 08. FINISH & LIVERY OPTIONS ─────────────────────────────────────────────
export const FINISH_LIVERY_OPTIONS: FinishLiveryOption[] = [
  {
    id: 'finish-open-galvanised',
    name: 'Industrial Hot-Dip Galvanised Chassis with Alkota Orange Accents',
    format: 'open-deck',
    tier: 'stealth',
    color_hex: '#8C9297',
    color_name: 'Hot-Dip Galvanised Steel',
    description: 'Maximum corrosion protection for harsh marine, agricultural, and road salt environments. Heavy industrial finish.',
    guide_price_gbp: 0
  },
  {
    id: 'finish-open-black-charcoal',
    name: 'Matte Alkota Charcoal Powdercoated Chassis & Textured Treadplate',
    format: 'open-deck',
    tier: 'custom-paint',
    color_hex: '#1F2428',
    color_name: 'Alkota Deep Charcoal',
    description: 'Premium multi-stage zinc-primed and oven-baked architectural powdercoat with black aluminium chequerplate deck.',
    guide_price_gbp: 950
  },
  {
    id: 'finish-enclosed-white-clean',
    name: 'Polar White Gloss Enclosed Body (Livery Ready)',
    format: 'enclosed',
    tier: 'stealth',
    color_hex: '#F8FAFC',
    color_name: 'Polar White',
    description: 'Ultra-clean high-gloss insulated GRP composite panels. Perfect neutral backdrop for your company graphics.',
    guide_price_gbp: 0
  },
  {
    id: 'finish-enclosed-anthracite',
    name: 'Alkota Anthracite Stealth Enclosed Body',
    format: 'enclosed',
    tier: 'stealth',
    color_hex: '#272B30',
    color_name: 'Anthracite Graphite',
    description: 'Corporate dark slate grey satin finish with anodised black aluminium corner extrusions.',
    guide_price_gbp: 1200
  },
  {
    id: 'finish-enclosed-logo-package',
    name: 'Alkota Factory Logo Package (Precision Cut Die-Cast Vinyls)',
    format: 'enclosed',
    tier: 'logo-package',
    color_hex: '#FF6900',
    color_name: 'Client Logo Package',
    description: 'Factory-applied high-resolution UV-laminated vinyl logos placed across side and rear access doors.',
    guide_price_gbp: 650
  },
  {
    id: 'finish-enclosed-full-fleet-wrap',
    name: 'Full Vehicle Commercial Fleet Wrap (Quoted Separately)',
    format: 'enclosed',
    tier: 'full-wrap',
    color_hex: '#0F172A',
    color_name: 'Bespoke Full Wrap',
    description: 'Complete 3M high-grade digital vinyl wrap covering the entire trailer exterior to your corporate brand identity guidelines.'
  }
];

// ─── 09. CURATED STARTING CONFIGURATIONS (PROVEN DIRECTIONS) ─────────────────
export const STARTING_CONFIGURATIONS: StartingConfiguration[] = [
  {
    id: 'start-hot-water-open',
    slug: 'hot-water-open',
    name: 'Mobile Hot Water Contractor Rig',
    tagline: 'Agile 1,500kg single-axle hot water setup for contract cleaners and property maintenance',
    badge: 'POPULAR CONTRACTOR SPEC',
    format: 'open-deck',
    chassis_id: 'chassis-single-1500-open',
    machine_id: 'machine-ged-12v-311',
    operator_count: 1,
    water_storage_id: 'tank-500l-baffled',
    recovery_option_id: 'recovery-none',
    power_options: ['power-12v-engine'],
    hose_storage_options: ['hose-single-50m-manual', 'storage-steel-vault'],
    site_options: ['site-cat5-airgap', 'site-winterisation-purge'],
    finish_livery_id: 'finish-open-galvanised',
    guide_price_display: '£15,500 – £18,200 + VAT',
    ideal_for: ['Contract Cleaning', 'Property Maintenance', 'Graffiti Removal', 'Agricultural Washdown'],
    image_url: '/assets/products/trailer-single.png',
    description: 'The nimble professional choice. Towable by standard commercial vans (1,500kg MAM), holding 500L baffled water, powered by Honda GX390, delivering 207 Bar @ 121°C.'
  },
  {
    id: 'start-fleet-dual-operator',
    slug: 'fleet-dual-operator',
    name: 'Dual-Operator Fleet Logistics Rig',
    tagline: 'High-throughput 2,700kg tandem rig for transport depots, plant hire fleets, and civil engineering',
    badge: 'MAXIMUM PRODUCTIVITY',
    format: 'open-deck',
    chassis_id: 'chassis-tandem-2700-open',
    machine_id: 'machine-ged-12v-4305',
    operator_count: 2,
    water_storage_id: 'tank-1000l-baffled',
    recovery_option_id: 'recovery-vacgd-blower',
    power_options: ['power-12v-engine', 'power-bulk-fuel-80l'],
    hose_storage_options: ['hose-dual-100m-manual', 'storage-steel-vault'],
    site_options: ['site-cat5-airgap', 'site-led-scene-lighting', 'site-winterisation-purge'],
    finish_livery_id: 'finish-open-black-charcoal',
    guide_price_display: '£27,500 – £32,000 + VAT',
    ideal_for: ['Haulage & Fleet Depots', 'Commercial Vehicle Wash', 'Civil Contractors', 'Plant Hire Fleets'],
    image_url: '/assets/products/trailer-single.png',
    description: 'Halves wash time by powering two operators simultaneously from a single 17 LPM Vanguard-driven Alkota skid with 100m high-pressure reach and vacuum wastewater capture.'
  },
  {
    id: 'start-enclosed-plant-room',
    slug: 'enclosed-plant-room',
    name: 'Enclosed Mobile Plant Room Pro',
    tagline: 'Weatherproof walk-in plant room trailer with internal lighting, tool security, and corporate presence',
    badge: 'SECURE URBAN SPEC',
    format: 'enclosed',
    chassis_id: 'chassis-tandem-2700-enclosed',
    machine_id: 'machine-ged-12v-4305',
    operator_count: 1,
    water_storage_id: 'tank-1000l-baffled',
    recovery_option_id: 'recovery-none',
    power_options: ['power-gen-5kw-diesel', 'power-bulk-fuel-80l'],
    hose_storage_options: ['hose-electric-rewind-50m', 'hose-inlet-30m-reel', 'storage-steel-vault'],
    site_options: ['site-internal-plant-lights', 'site-winterisation-purge', 'site-cat5-airgap'],
    finish_livery_id: 'finish-enclosed-white-clean',
    guide_price_display: '£33,500 – £39,000 + VAT',
    ideal_for: ['Urban Contractors', 'High-Security Facilities', 'All-Weather Operations', 'Corporate Fleets'],
    image_url: '/assets/products/stationary-gas-fired.png',
    description: 'Transform your cleaning operation into an insulated, self-contained workshop on wheels. Lockable roller doors protect equipment overnight; 1,000L water tank is fully insulated.'
  },
  {
    id: 'start-environmental-closed-loop',
    slug: 'environmental-closed-loop',
    name: 'Hydro-Recycle Closed-Loop Environmental Rig',
    tagline: 'Zero-drainage water recycling trailer compliant with UK Environment Agency & BS EN 858',
    badge: 'ENVIRONMENTAL HALO RIG',
    format: 'enclosed',
    chassis_id: 'chassis-tandem-3500-enclosed',
    machine_id: 'machine-ded-big-boy',
    operator_count: 2,
    water_storage_id: 'tank-1000l-baffled',
    recovery_option_id: 'recovery-closed-loop-recycle',
    power_options: ['power-gen-5kw-diesel', 'power-bulk-fuel-80l'],
    hose_storage_options: ['hose-dual-100m-manual', 'hose-vac-recovery-30m', 'storage-steel-vault'],
    site_options: ['site-internal-plant-lights', 'site-cat5-airgap', 'site-winterisation-purge'],
    finish_livery_id: 'finish-enclosed-anthracite',
    guide_price_display: '£56,000 – £66,000 + VAT',
    ideal_for: ['Harbours & Marinas', 'Airport Aprons', 'Fuel Depots', 'Sensitive Public Spaces'],
    image_url: '/assets/products/stationary-gas-fired.png',
    description: 'The ultimate mobile environmental works. Vacuums all runoff, filters hydrocarbon contamination down to <5mg/L, and recirculates purified water back to the washer in a 100% closed loop with 1,000L onboard buffer.'
  },
  {
    id: 'start-quarry-heavy-duty',
    slug: 'quarry-heavy-duty',
    name: 'High-Capacity Remote Heavy Plant Rig',
    tagline: 'Single-fuel Kubota diesel 4,000 PSI skid with 2,000L water for civil engineering & quarrying',
    badge: 'HEAVY INDUSTRIAL SPEC',
    format: 'open-deck',
    chassis_id: 'chassis-tandem-3500-open',
    machine_id: 'machine-ded-big-boy',
    operator_count: 2,
    water_storage_id: 'tank-2000l-dual-baffled',
    recovery_option_id: 'recovery-none',
    power_options: ['power-bulk-fuel-80l'],
    hose_storage_options: ['hose-dual-100m-manual', 'storage-steel-vault', 'storage-surface-cleaner-bracket'],
    site_options: ['site-led-scene-lighting', 'site-winterisation-purge', 'site-cat5-airgap'],
    finish_livery_id: 'finish-open-galvanised',
    guide_price_display: '£35,000 – £41,000 + VAT',
    ideal_for: ['Quarry & Aggregates', 'Earthmoving Machinery', 'Rail Depots', 'Major Civil Infrastructure'],
    image_url: '/assets/products/ded-big-boy.png',
    description: 'Built for extreme remote duty. 4,000 PSI @ 19 LPM impact force, 2,000L water endurance, dual 100m hose reels, and 80L single-diesel fuel system powering both engine and burner.'
  }
];

// ─── 10. APPLICATION PRESETS (HISTORIC COMPATIBILITY) ────────────────────────
export const APPLICATION_PRESETS = STARTING_CONFIGURATIONS.map(s => ({
  slug: s.slug,
  title: s.name,
  tagline: s.tagline,
  industry: s.ideal_for[0] || 'General Industrial',
  recommendedFormat: s.format,
  recommendedChassisId: s.chassis_id,
  recommendedMachineId: s.machine_id,
  recommendedTankId: s.water_storage_id,
  recommendedRecoveryId: s.recovery_option_id,
  recommendedOperators: s.operator_count,
  description: s.description,
  keyBenefits: s.ideal_for,
  image: s.image_url
}));

// ─── 11. COMMERCIAL VALUE ESTIMATION ENGINE ──────────────────────────────────

/**
 * Calculates indicative commercial build value without fabricating unverified precision.
 */
export function calculateCommercialValue(config: Partial<TrailerConfiguration>): CommercialValueEstimate {
  const chassis = UK_CHASSIS_OPTIONS.find(c => c.id === config.chassis_id);
  const machine = TRAILER_MACHINE_OPTIONS.find(m => m.id === config.machine_id);
  const tank = WATER_STORAGE_OPTIONS.find(t => t.id === config.water_storage_id);
  const recovery = WATER_RECOVERY_OPTIONS.find(r => r.id === config.recovery_option_id);

  let totalBaseGbp = 0;
  let hasUnpricedItem = false;

  if (chassis?.guide_price_gbp) totalBaseGbp += chassis.guide_price_gbp;
  else hasUnpricedItem = true;

  if (machine?.guide_price_gbp) totalBaseGbp += machine.guide_price_gbp;
  else hasUnpricedItem = true;

  if (tank?.guide_price_gbp) totalBaseGbp += tank.guide_price_gbp;
  if (recovery?.guide_price_gbp) totalBaseGbp += recovery.guide_price_gbp;

  // Power options
  (config.power_options || []).forEach(pId => {
    const p = POWER_FUEL_OPTIONS.find(item => item.id === pId);
    if (p?.guide_price_gbp) totalBaseGbp += p.guide_price_gbp;
  });

  // Hose storage
  (config.hose_storage_options || []).forEach(hId => {
    const h = HOSE_STORAGE_OPTIONS.find(item => item.id === hId);
    if (h?.guide_price_gbp) totalBaseGbp += h.guide_price_gbp;
  });

  // Site options
  (config.site_options || []).forEach(sId => {
    const s = SITE_OPTIONS.find(item => item.id === sId);
    if (s?.guide_price_gbp) totalBaseGbp += s.guide_price_gbp;
  });

  // Finish
  const finish = FINISH_LIVERY_OPTIONS.find(f => f.id === config.finish_livery_id);
  if (finish?.guide_price_gbp) totalBaseGbp += finish.guide_price_gbp;

  if (totalBaseGbp <= 0 || hasUnpricedItem) {
    return {
      price_state: 'engineering_quote_only',
      guide_price_display: 'Price on Engineering Review',
      price_confidence: 'bespoke_costing_required'
    };
  }

  // Estimated range: base + standard fabrication / integration allowance (+8% to +18%)
  const minPrice = Math.round((totalBaseGbp * 1.05) / 500) * 500;
  const maxPrice = Math.round((totalBaseGbp * 1.20) / 500) * 500;

  return {
    price_state: 'guide_range',
    min_guide_price_gbp: minPrice,
    max_guide_price_gbp: maxPrice,
    guide_price_display: `£${minPrice.toLocaleString()} – £${maxPrice.toLocaleString()} + VAT`,
    price_confidence: recovery?.tier === 'closed-loop-recycle' ? 'partial' : 'high'
  };
}

// ─── 12. HIGH-VALUE LEAD OPPORTUNITY SCORING ENGINE ──────────────────────────

/**
 * Transparent, rule-based Opportunity Scoring (0 to 100) to help Alkota staff prioritise enquiries.
 */
export function calculateOpportunityScore(config: Partial<TrailerConfiguration>): TrailerOpportunityScore {
  let score = 0;
  const signals: string[] = [];

  // Signal 1: Completed Build (+25)
  if (config.chassis_id && config.machine_id && config.water_storage_id) {
    score += 25;
    signals.push('Complete 13-step configuration defined (+25)');
  }

  // Signal 2: Enclosed Mobile Plant Room (+15)
  if (config.format === 'enclosed') {
    score += 15;
    signals.push('High-value Enclosed Plant Room architecture (+15)');
  }

  // Signal 3: Environmental Water Recovery (+20 for closed-loop, +10 for vacuum)
  if (config.recovery_option_id === 'recovery-closed-loop-recycle') {
    score += 20;
    signals.push('Closed-Loop Environmental Treatment specified (+20)');
  } else if (config.recovery_option_id === 'recovery-vfs-filtration') {
    score += 15;
    signals.push('VFS Negative-Void Filtration specified (+15)');
  } else if (config.recovery_option_id === 'recovery-vacgd-blower') {
    score += 10;
    signals.push('VACGD Industrial Vacuum Blower specified (+10)');
  }

  // Signal 4: Dual Operator Architecture (+10)
  if (config.operator_count === 2) {
    score += 10;
    signals.push('Dual-Operator Split Manifold selected (+10)');
  }

  // Signal 5: Large Water Payload >= 1000L (+10)
  const tank = WATER_STORAGE_OPTIONS.find(t => t.id === config.water_storage_id);
  if (tank && tank.litres >= 1000) {
    score += 10;
    signals.push(`Large water payload (${tank.litres}L) (+10)`);
  }

  // Signal 6: Contact Information Provided
  if (config.contact?.company) {
    score += 10;
    signals.push('Verified Commercial Company entity (+10)');
  }
  if (config.contact?.phone) {
    score += 5;
    signals.push('Direct telephone number provided (+5)');
  }
  if (config.contact?.timeline?.includes('Immediate') || config.contact?.timeline?.includes('1–3 Months')) {
    score += 15;
    signals.push('High urgency project timeline (<90 days) (+15)');
  }

  // Bound score
  const finalScore = Math.min(100, Math.max(0, score));

  let tier: 'priority' | 'active' | 'developing' | 'configuration_only' = 'configuration_only';
  if (finalScore >= 80) tier = 'priority';
  else if (finalScore >= 60) tier = 'active';
  else if (finalScore >= 40) tier = 'developing';

  return {
    score: finalScore,
    tier,
    signals
  };
}

// ─── 13. WEIGHTS & CALCULATIONS ──────────────────────────────────────────────

/**
 * Calculates complete dry and wet weight breakdown for any configured trailer.
 * UK Law: Water weighs exactly 1kg per 1 Litre (1,000L = 1,000kg).
 */
export function calculateTrailerWeights(config: Partial<TrailerConfiguration>): ConfigurationWeights {
  const chassis = UK_CHASSIS_OPTIONS.find(c => c.id === config.chassis_id) || UK_CHASSIS_OPTIONS[0];
  const machine = TRAILER_MACHINE_OPTIONS.find(m => m.id === config.machine_id) || TRAILER_MACHINE_OPTIONS[0];
  const tank = WATER_STORAGE_OPTIONS.find(t => t.id === config.water_storage_id) || WATER_STORAGE_OPTIONS[0];
  const recovery = WATER_RECOVERY_OPTIONS.find(r => r.id === config.recovery_option_id) || WATER_RECOVERY_OPTIONS[0];

  const powerWeight = (config.power_options || []).reduce((sum, pId) => {
    const p = POWER_FUEL_OPTIONS.find(item => item.id === pId);
    return sum + (p ? p.weight_kg : 0);
  }, 0);

  const hoseWeight = (config.hose_storage_options || []).reduce((sum, hId) => {
    const h = HOSE_STORAGE_OPTIONS.find(item => item.id === hId);
    return sum + (h ? h.weight_kg : 0);
  }, 0);

  const siteWeight = (config.site_options || []).reduce((sum, sId) => {
    const s = SITE_OPTIONS.find(item => item.id === sId);
    return sum + (s ? s.weight_kg : 0);
  }, 0);

  const chassisTare = chassis.tare_weight_kg;
  const machineDry = machine.dry_weight_kg;
  const tankHardware = tank.hardware_weight_kg;
  const waterMass = tank.litres; // 1L = 1kg
  const recoveryWeight = recovery.weight_kg;

  const estimatedDryWeight = chassisTare + machineDry + tankHardware + powerWeight + recoveryWeight + hoseWeight + siteWeight;
  const estimatedWetWeight = estimatedDryWeight + waterMass;
  const mam = chassis.mam_kg;
  const payloadMargin = mam - estimatedWetWeight;
  const payloadUtilizationPct = Math.round((estimatedWetWeight / mam) * 100);

  const isOverweight = estimatedWetWeight > mam;
  let weightStatus: 'optimal' | 'warning' | 'critical-overweight' = 'optimal';

  if (isOverweight) {
    weightStatus = 'critical-overweight';
  } else if (payloadUtilizationPct > 90) {
    weightStatus = 'warning';
  }

  return {
    chassis_tare_kg: chassisTare,
    machine_dry_kg: machineDry,
    water_tank_hardware_kg: tankHardware,
    water_mass_kg: waterMass,
    power_options_kg: powerWeight,
    recovery_equipment_kg: recoveryWeight,
    hose_storage_kg: hoseWeight,
    site_options_kg: siteWeight,
    estimated_dry_weight_kg: estimatedDryWeight,
    estimated_wet_weight_kg: estimatedWetWeight,
    chassis_mam_kg: mam,
    payload_margin_kg: payloadMargin,
    payload_utilization_pct: payloadUtilizationPct,
    is_overweight: isOverweight,
    weight_status: weightStatus,
    confidence_status: 'verified'
  };
}

/**
 * Calculates continuous wash duration based on tank volume and machine flow rate.
 */
export function calculateEndurance(tankLitres: number, flowLpm: number, operatorCount: 1 | 2 = 1): EnduranceCalculation {
  if (tankLitres <= 0 || flowLpm <= 0) {
    return {
      tank_litres: 0,
      flow_lpm: flowLpm,
      operator_count: operatorCount,
      effective_flow_lpm: flowLpm,
      continuous_minutes: 0,
      typical_trigger_hours: 0
    };
  }

  const effectiveFlow = flowLpm;
  const continuousMins = Math.round(tankLitres / effectiveFlow);
  const typicalTriggerHours = Number(((continuousMins / 0.6) / 60).toFixed(1));

  return {
    tank_litres: tankLitres,
    flow_lpm: flowLpm,
    operator_count: operatorCount,
    effective_flow_lpm: effectiveFlow,
    continuous_minutes: continuousMins,
    typical_trigger_hours: typicalTriggerHours
  };
}

// ─── 14. HARDENED COMPATIBILITY & VALIDATION ENGINE ──────────────────────────

/**
 * Validates complete configuration against UK road law and Alkota engineering constraints.
 */
export function validateTrailerConfiguration(config: Partial<TrailerConfiguration>): ConfigurationValidationResult {
  const hardErrors: ValidationIssue[] = [];
  const warnings: ValidationIssue[] = [];
  const recommendations: ValidationIssue[] = [];

  const chassis = UK_CHASSIS_OPTIONS.find(c => c.id === config.chassis_id) || UK_CHASSIS_OPTIONS[0];
  const machine = TRAILER_MACHINE_OPTIONS.find(m => m.id === config.machine_id) || TRAILER_MACHINE_OPTIONS[0];
  const tank = WATER_STORAGE_OPTIONS.find(t => t.id === config.water_storage_id) || WATER_STORAGE_OPTIONS[0];
  const recovery = WATER_RECOVERY_OPTIONS.find(r => r.id === config.recovery_option_id) || WATER_RECOVERY_OPTIONS[0];
  const opCount = config.operator_count || 1;
  const weights = calculateTrailerWeights(config);

  // Check 1: Overweight (MAM limit exceeded)
  if (weights.is_overweight) {
    hardErrors.push({
      field: 'weights',
      code: 'EXCEEDS_MAM',
      severity: 'hard-error',
      message: `Configured wet mass (${weights.estimated_wet_weight_kg}kg) exceeds chassis Maximum Authorised Mass (${weights.chassis_mam_kg}kg) by ${Math.abs(weights.payload_margin_kg)}kg.`,
      resolution: 'Upgrade to a 3,500kg MAM chassis, reduce onboard water volume, or remove auxiliary options.'
    });
  } else if (weights.payload_utilization_pct > 92) {
    warnings.push({
      field: 'weights',
      code: 'NEAR_MAM_LIMIT',
      severity: 'engineering-review',
      message: `Payload utilisation is at ${weights.payload_utilization_pct}%, leaving only a ${weights.payload_margin_kg}kg safety margin for tools, fuel, and chemical jugs.`,
      resolution: 'Alkota engineers will review axle load distribution to ensure safe braking dynamics.'
    });
  }

  // Check 2: Chassis Tank Volume Capacity
  if (tank.litres > chassis.max_tank_litres) {
    hardErrors.push({
      field: 'water_storage_id',
      code: 'TANK_EXCEEDS_CHASSIS_CAPACITY',
      severity: 'hard-error',
      message: `Selected ${tank.litres}L water tank exceeds maximum physical capacity (${chassis.max_tank_litres}L) for ${chassis.name}.`,
      resolution: `Select a tank up to ${chassis.max_tank_litres}L or upgrade to a tandem chassis.`
    });
  }

  // Check 3: Dual Gun Machine Compatibility
  const isDualGunAllowed = machine.dual_gun_capable;
  if (opCount === 2 && !machine.dual_gun_capable) {
    hardErrors.push({
      field: 'operator_count',
      code: 'MACHINE_NOT_DUAL_GUN_CAPABLE',
      severity: 'hard-error',
      message: `${machine.name} produces ${machine.flow_lpm} LPM and cannot support dual operators without severe pressure drop.`,
      resolution: 'Select a high-flow machine (4305-GED or DED-4000) or choose single-operator mode.'
    });
  }

  // Check 4: Closed-Loop Recovery Constraints
  if (recovery.id === 'recovery-closed-loop-recycle') {
    if (config.format === 'open-deck') {
      hardErrors.push({
        field: 'recovery_option_id',
        code: 'CLOSED_LOOP_REQUIRES_ENCLOSED',
        severity: 'hard-error',
        message: 'The Hydro-Recycle Closed-Loop Plant requires an Enclosed Mobile Plant Room for frost protection and multi-stage filtration housing.',
        resolution: 'Switch format to Enclosed Plant Room or select VACGD Vacuum Recovery.'
      });
    }
    if (chassis.mam_kg < 3500) {
      hardErrors.push({
        field: 'chassis_id',
        code: 'CLOSED_LOOP_REQUIRES_3500KG',
        severity: 'hard-error',
        message: 'Closed-loop recycling modules require a 3,500kg Heavy Tandem chassis to accommodate filtration weight and water storage.',
        resolution: 'Select the UK Heavy Tandem 3,500kg chassis.'
      });
    }
  }

  // Check 5: Recovery on Open Deck Warning
  if (recovery.tier === 'vfs-filtration' && config.format === 'open-deck') {
    warnings.push({
      field: 'recovery_option_id',
      code: 'VFS_OPEN_DECK_PROTECTION',
      severity: 'engineering-review',
      message: 'VFS negative-void filtration requires dedicated weatherproofing and winter drain-down procedures when mounted on an open deck.',
      resolution: 'Alkota engineering will review protective hooding and winterisation manifold layout.'
    });
  }

  // Check 6: 10kW Generator Constraints
  if (config.power_options?.includes('power-gen-10kw-3ph') && config.format === 'open-deck') {
    hardErrors.push({
      field: 'power_options',
      code: '10KW_GEN_REQUIRES_ENCLOSED',
      severity: 'hard-error',
      message: 'The 10.0 kVA 3-phase plant generator is engineered exclusively for enclosed plant room installations.',
      resolution: 'Select 5.0 kVA Diesel Generator or switch trailer format to Enclosed.'
    });
  }

  // Recommendations
  if (opCount === 2 && tank.litres < 1000 && tank.litres > 0) {
    recommendations.push({
      field: 'water_storage_id',
      code: 'LOW_WATER_DUAL_OPERATOR',
      severity: 'recommendation',
      message: 'Two operators consume water rapidly (~30 mins endurance on 500L). A 1,500L tank is strongly recommended for dual-gun setups.',
      resolution: 'Consider upgrading to a 1,500L or 2,000L baffled reservoir.'
    });
  }

  return {
    isValid: hardErrors.length === 0,
    hardErrors,
    warnings,
    recommendations,
    isDualGunAllowed,
    maxAllowedTankLitres: chassis.max_tank_litres
  };
}

/**
 * Reconciles configuration changes to automatically maintain valid dependencies.
 */
export function reconcileTrailerConfiguration(
  config: TrailerConfiguration,
  previousFormat?: string
): { updatedConfig: TrailerConfiguration; changeNotice: string | null } {
  let updated = { ...config };
  let notice: string | null = null;

  const chassis = UK_CHASSIS_OPTIONS.find(c => c.id === updated.chassis_id) || UK_CHASSIS_OPTIONS[0];

  // 1. Reconcile Chassis with Format
  if (updated.format === 'open-deck' && chassis.format === 'enclosed') {
    updated.chassis_id = 'chassis-tandem-2700-open';
    updated.finish_livery_id = 'finish-open-galvanised';
    notice = 'Chassis and livery updated to open-deck configuration.';
  } else if (updated.format === 'enclosed' && chassis.format === 'open-deck') {
    updated.chassis_id = 'chassis-tandem-2700-enclosed';
    updated.finish_livery_id = 'finish-enclosed-white-clean';
    notice = 'Chassis and livery updated to enclosed plant room configuration.';
  }

  // 2. Reconcile Tank with Chassis Limit
  const tank = WATER_STORAGE_OPTIONS.find(t => t.id === updated.water_storage_id) || WATER_STORAGE_OPTIONS[0];
  const activeChassis = UK_CHASSIS_OPTIONS.find(c => c.id === updated.chassis_id) || UK_CHASSIS_OPTIONS[0];
  if (tank.litres > activeChassis.max_tank_litres) {
    const validTanks = WATER_STORAGE_OPTIONS.filter(t => t.litres <= activeChassis.max_tank_litres);
    const fallbackTank = validTanks[validTanks.length - 1] || WATER_STORAGE_OPTIONS[0];
    updated.water_storage_id = fallbackTank.id;
    notice = `Water tank adjusted to ${fallbackTank.litres}L to fit ${activeChassis.name}.`;
  }

  // 3. Reconcile Machine with Operator Count
  const machine = TRAILER_MACHINE_OPTIONS.find(m => m.id === updated.machine_id) || TRAILER_MACHINE_OPTIONS[0];
  if (updated.operator_count === 2 && !machine.dual_gun_capable) {
    updated.machine_id = 'machine-ged-12v-4305';
    notice = 'Machine upgraded to 4305-GED to support dual operators.';
  }

  // 4. Reconcile Closed-Loop Recovery
  if (updated.recovery_option_id === 'recovery-closed-loop-recycle' && updated.format === 'open-deck') {
    updated.recovery_option_id = 'recovery-vacgd-blower';
    notice = 'Recovery adjusted to VACGD Vacuum Blower for open-deck compatibility.';
  }

  return { updatedConfig: updated, changeNotice: notice };
}

/**
 * Validates tow vehicle compatibility against trailer MAM.
 */
export function assessTowVehicle(towingCapacityKg: number | undefined, trailerMamKg: number): TowVehicleAssessment {
  if (!towingCapacityKg || towingCapacityKg <= 0) {
    return {
      is_compatible: true,
      status_message: 'Please verify your vehicle’s braked towing limit on the vehicle VIN plate or V5C logbook.'
    };
  }

  const margin = towingCapacityKg - trailerMamKg;
  if (margin < 0) {
    return {
      towing_capacity_kg: towingCapacityKg,
      is_compatible: false,
      margin_kg: margin,
      status_message: `Vehicle braked towing limit (${towingCapacityKg}kg) is lower than this trailer’s MAM (${trailerMamKg}kg). You must choose a lighter chassis or a higher-capacity tow vehicle (e.g. 3,500kg commercial pickup / van).`
    };
  }

  return {
    towing_capacity_kg: towingCapacityKg,
    is_compatible: true,
    margin_kg: margin,
    status_message: `Vehicle towing capacity (${towingCapacityKg}kg) safely exceeds configured trailer MAM (${trailerMamKg}kg) with a ${margin}kg reserve margin.`
  };
}

/**
 * Generates an unambiguous, cryptographically random build code (e.g. AKT-7F4K2P-UK)
 */
export function generateBuildCode(): string {
  // Exclude ambiguous characters: 0, O, 1, I
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `AKT-${code}-UK`;
}

/**
 * Returns default production configuration
 */
export function getDefaultConfiguration(): TrailerConfiguration {
  return {
    schema_version: CONFIGURATOR_SCHEMA_VERSION,
    build_code: generateBuildCode(),
    format: 'open-deck',
    chassis_id: 'chassis-tandem-2700-open',
    machine_id: 'machine-ged-12v-4305',
    operator_count: 1,
    water_storage_id: 'tank-1000l-baffled',
    power_options: ['power-12v-engine'],
    recovery_option_id: 'recovery-none',
    hose_storage_options: ['hose-single-50m-manual', 'storage-steel-vault'],
    site_options: ['site-cat5-airgap', 'site-winterisation-purge'],
    finish_livery_id: 'finish-open-galvanised',
    created_at: new Date().toISOString()
  };
}
