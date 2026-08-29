import {
  UKChassisOption,
  TrailerMachineOption,
  WaterStorageOption,
  PowerFuelOption,
  WaterRecoveryOption,
  HoseStorageOption,
  SiteOption,
  FinishLiveryOption,
  TrailerConfiguration,
  ConfigurationWeights,
  EnduranceCalculation,
  TowVehicleAssessment
} from './types';

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
    max_machine_count: 1
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
    max_machine_count: 2
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
    max_machine_count: 2
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
    max_machine_count: 1
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
    max_machine_count: 2
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
    primary_application: ['Contract Cleaning', 'Plant Washdown', 'Graffiti & Masonry', 'Agricultural Equipment']
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
    primary_application: ['Heavy Fleet Depots', 'Earthmoving Machinery', 'Concrete & Civil Washout', 'Multi-Gun Mobile Washing']
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
    primary_application: ['Mining & Quarrying', 'Marine & Shipping Docks', 'Rail & Train Depots', 'Refuse & Heavy Logistics']
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
    primary_application: ['Bitumen & Asphalt Plant', 'Food Industry Sanitisation', 'Tanker Barrel Cleaning', 'Chewing Gum & Urban Cleaning']
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
    description: 'No bulk onboard water storage. Uses site hydrant / mains water through a compliant CAT 5 air gap break tank. Maximum payload availability for tools and equipment.'
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
    description: 'Baffled slimline poly tank preventing water surge during towing. Ideal for single-axle 1,500kg chassis and compact urban response.'
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
    description: 'The standard industrial mobile tank. Triple internal baffle walls arrest transverse and longitudinal water surge for safe braking on UK roads. Over 1 hour continuous heavy washing.'
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
    description: 'Extended remote operation capacity. Recommended for 2,700kg and 3,500kg tandem chassis. Delivers ~1.5 to 2 hours of off-grid pressure washing.'
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
    description: 'Maximum legal mobile water payload on a 3,500kg MAM chassis. Interlinked twin tanks with low-level balance manifold for continuous dual-operator remote washing all day.'
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
    compatible_formats: ['open-deck', 'enclosed']
  },
  {
    id: 'power-gen-5kw-diesel',
    name: '5.0 kVA Super-Silent Onboard Diesel Generator',
    category: 'generator',
    weight_kg: 110,
    output_rating: '5.0 kVA / 4.0 kW 230V 50Hz (68 dB(A) @ 7m)',
    description: 'Supplies auxiliary 230V power for vacuum recovery pumps, flood lighting masts, power tools, and battery charging stations.',
    compatible_formats: ['open-deck', 'enclosed']
  },
  {
    id: 'power-gen-10kw-3ph',
    name: '10.0 kVA Multi-Phase Silent Plant Room Generator',
    category: 'generator',
    weight_kg: 210,
    output_rating: '10.0 kVA 400V / 230V Dual Voltage (Kubota Powered)',
    description: 'Heavy continuous generator installed inside enclosed trailers to power multi-stage VFS water recycling skids and heavy industrial plant.',
    compatible_formats: ['enclosed']
  },
  {
    id: 'power-bulk-fuel-80l',
    name: '80L Heavy-Duty Long-Range Diesel Tank',
    category: 'fuel-tank',
    weight_kg: 28,
    fuel_capacity_litres: 80,
    description: 'Bunded aluminium bulk fuel tank with level gauge and quick-release fuel supply lines to machine burner and generator for multi-day runtime.',
    compatible_formats: ['open-deck', 'enclosed']
  },
  {
    id: 'power-shore-power',
    name: '230V 16A / 32A External Shore Power Hookup & Inverter Pack',
    category: 'electrical',
    weight_kg: 22,
    output_rating: '230V Input with 2.5kW Pure Sine Wave Inverter',
    description: 'Allows the trailer to plug into depot mains electricity for indoor washbay operation without running combustion engines.',
    compatible_formats: ['enclosed']
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
    dimensions_mm: 'N/A'
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
    dimensions_mm: '950 × 600 × 850'
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
    dimensions_mm: '1350 × 800 × 1150'
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
    dimensions_mm: '1850 × 900 × 1300'
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
    description: 'Direct-crank stainless steel manifold reel with 50m of 3/8" wire-braided 400 Bar hot-water hose.'
  },
  {
    id: 'hose-dual-100m-manual',
    name: 'Dual High-Pressure 100m Manual Hose Reels (Split Manifold)',
    category: 'hp-reel',
    weight_kg: 42,
    length_metres: 100,
    description: 'Two independent stacked hose reels with 2 × 50m (100m total) 400 Bar hoses for dual-operator setups or extreme reach.'
  },
  {
    id: 'hose-electric-rewind-50m',
    name: '12V Heavy-Duty Electric Auto-Rewind High-Pressure Reel (50m)',
    category: 'hp-reel',
    weight_kg: 36,
    length_metres: 50,
    description: 'Push-button 12V motor-driven auto rewind reel. Eliminates operator fatigue when recovering long hose runs.'
  },
  {
    id: 'hose-inlet-30m-reel',
    name: '30m 3/4" High-Flow Water Inlet Hose Reel',
    category: 'inlet-reel',
    weight_kg: 16,
    length_metres: 30,
    description: 'Dedicated commercial inlet supply reel for rapid hydrant/mains hookup without hose tangling.'
  },
  {
    id: 'hose-vac-recovery-30m',
    name: '30m 2" Crush-Proof Vacuum Recovery Hose & Reel',
    category: 'vacuum-reel',
    weight_kg: 32,
    length_metres: 30,
    description: 'Heavy-duty 2-inch smooth-bore suction hose for connecting vacuum scuppers and berms back to the trailer.'
  },
  {
    id: 'storage-steel-vault',
    name: 'Heavy-Duty Lockable Aluminium Tool & Lance Vault',
    category: 'vault',
    weight_kg: 26,
    description: 'Weatherproof chequerplate storage chest with twin gas struts, recessed stainless T-latches, and lance clips.'
  },
  {
    id: 'storage-surface-cleaner-bracket',
    name: 'Integrated Deck Mounting Brackets for Whirl-A-Way Cleaner',
    category: 'surface-cleaner',
    weight_kg: 8,
    description: 'Lockable chassis frame brackets to secure 20" / 24" rotary flat surface cleaners safely during transit.'
  }
];

// ─── 07. SITE & WINTERISATION OPTIONS ────────────────────────────────────────
export const SITE_OPTIONS: SiteOption[] = [
  {
    id: 'site-led-scene-lighting',
    name: 'Telescopic LED Night-Work Scene Mast (2 × 40W High-Output)',
    category: 'lighting',
    weight_kg: 14,
    description: 'Pneumatic / mechanical 2.5m extendable mast illuminating a 30m working perimeter for nocturnal highway and fleet operations.'
  },
  {
    id: 'site-internal-plant-lights',
    name: 'Internal Enclosed Plant Room LED Strip Array & Red Tactical Light',
    category: 'lighting',
    weight_kg: 6,
    description: 'Bright 6000K white LED interior illumination plus night-vision red tactical lighting for enclosed trailers.'
  },
  {
    id: 'site-winterisation-purge',
    name: 'Anti-Freeze Purge & Blowout Manifold (Winterisation Pack)',
    category: 'winterisation',
    weight_kg: 9,
    description: 'Quick-connect anti-freeze recirculating loop and compressed-air blowout valves to prevent coil bursting in sub-zero UK winters.'
  },
  {
    id: 'site-cat5-airgap',
    name: 'WRAS Approved Category 5 Air Gap Tank Protection System',
    category: 'safety',
    weight_kg: 12,
    description: 'Ensures 100% legal compliance with UK Water Supply Regulations (1999) preventing backflow contamination into public water mains.'
  },
  {
    id: 'site-wireless-remote',
    name: 'Long-Range Wireless Engine & Burner Remote Control (150m)',
    category: 'controls',
    weight_kg: 4,
    description: 'Key fob and lance-mountable wireless remote allowing the operator to toggle engine idle and burner heat without walking back to the trailer.'
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
    description: 'Maximum corrosion protection for harsh marine, agricultural, and road salt environments. Heavy industrial finish.'
  },
  {
    id: 'finish-open-black-charcoal',
    name: 'Matte Alkota Charcoal Powdercoated Chassis & Textured Treadplate',
    format: 'open-deck',
    tier: 'custom-paint',
    color_hex: '#1F2428',
    color_name: 'Alkota Deep Charcoal',
    description: 'Premium multi-stage zinc-primed and oven-baked architectural powdercoat with black aluminium chequerplate deck.'
  },
  {
    id: 'finish-enclosed-white-clean',
    name: 'Polar White Gloss Enclosed Body (Livery Ready)',
    format: 'enclosed',
    tier: 'stealth',
    color_hex: '#F8FAFC',
    color_name: 'Polar White',
    description: 'Ultra-clean high-gloss insulated GRP composite panels. Perfect neutral backdrop for your company graphics.'
  },
  {
    id: 'finish-enclosed-anthracite',
    name: 'Alkota Anthracite Stealth Enclosed Body',
    format: 'enclosed',
    tier: 'stealth',
    color_hex: '#272B30',
    color_name: 'Anthracite Graphite',
    description: 'Corporate dark slate grey satin finish with anodised black aluminium corner extrusions.'
  },
  {
    id: 'finish-enclosed-logo-package',
    name: 'Alkota Factory Logo Package (Precision Cut Die-Cast Vinyls)',
    format: 'enclosed',
    tier: 'logo-package',
    color_hex: '#FF6900',
    color_name: 'Client Logo Package',
    description: 'Factory-applied high-resolution UV-laminated vinyl logos placed across side and rear access doors.'
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

// ─── 09. APPLICATION PRESETS (FOR DEEP LINKING & CONTEXT PRE-SELECTION) ──────
export interface ApplicationPreset {
  slug: string;
  title: string;
  tagline: string;
  industry: string;
  recommendedFormat: 'open-deck' | 'enclosed';
  recommendedChassisId: string;
  recommendedMachineId: string;
  recommendedTankId: string;
  recommendedRecoveryId: string;
  recommendedOperators: 1 | 2;
  description: string;
  keyBenefits: string[];
  image: string;
}

export const APPLICATION_PRESETS: ApplicationPreset[] = [
  {
    slug: 'fleet-logistics',
    title: 'Fleet & Logistics Mobile Rig',
    tagline: 'Rapid depot washdown and chassis degreasing with dual-operator capability',
    industry: 'Commercial Fleet & Haulage',
    recommendedFormat: 'open-deck',
    recommendedChassisId: 'chassis-tandem-2700-open',
    recommendedMachineId: 'machine-ged-12v-4305',
    recommendedTankId: 'tank-1500l-baffled',
    recommendedRecoveryId: 'recovery-vacgd-blower',
    recommendedOperators: 2,
    description: 'Engineered for cleaning 30–50 heavy tractor units and curtain-sided trailers daily. High flow rate strips road film and brake dust in half the time of standard washers.',
    keyBenefits: ['Simultaneous 2-operator washing', '1,500L baffled water payload', 'Positive-displacement wastewater vacuum capture', 'Extreme thermal output'],
    image: '/assets/products/trailer-single.png'
  },
  {
    slug: 'environmental-closed-loop',
    title: 'Closed-Loop Environmental Recovery Rig',
    tagline: 'Zero runoff compliance for urban, harbour, and sensitive environmental zones',
    industry: 'Specialist Environmental Cleaning',
    recommendedFormat: 'enclosed',
    recommendedChassisId: 'chassis-tandem-3500-enclosed',
    recommendedMachineId: 'machine-ded-big-boy',
    recommendedTankId: 'tank-2000l-dual-baffled',
    recommendedRecoveryId: 'recovery-closed-loop-recycle',
    recommendedOperators: 2,
    description: 'A complete mobile water treatment works on wheels. Meets strict UK Environment Agency requirements by vacuuming all wash water, purifying it down to <5mg/L hydrocarbon threshold, and recycling it.',
    keyBenefits: ['100% Closed-loop water recycling', 'Walk-in weatherproof mobile plant room', 'High-security locking tool vaults', 'Single-fuel diesel operation'],
    image: '/assets/products/stationary-gas-fired.png'
  },
  {
    slug: 'highways-municipal',
    title: 'Highways, Graffiti & Chewing Gum Steam Rig',
    tagline: '155°C saturated steam technology for instant urban sanitation',
    industry: 'Councils & Civil Infrastructure',
    recommendedFormat: 'open-deck',
    recommendedChassisId: 'chassis-single-1500-open',
    recommendedMachineId: 'machine-steam-oil-combo',
    recommendedTankId: 'tank-500l-baffled',
    recommendedRecoveryId: 'recovery-vacgd-blower',
    recommendedOperators: 1,
    description: 'Compact, ultra-manoeuvrable single-axle steam rig designed for pedestrian zones, town centres, and bridge structures without damaging stonework or historic masonry.',
    keyBenefits: ['155°C Low-water steam generator', 'Instant bitumen, oil, and gum removal', 'Compact 1,500kg MAM for standard van towing', 'Low water consumption'],
    image: '/assets/products/steam-oil.png'
  },
  {
    slug: 'heavy-plant-construction',
    title: 'Heavy Plant & Earthmoving Degreasing Rig',
    tagline: 'Maximum 4,000 PSI cutting power for excavators, dump trucks, and quarry plant',
    industry: 'Construction & Quarrying',
    recommendedFormat: 'open-deck',
    recommendedChassisId: 'chassis-tandem-3500-open',
    recommendedMachineId: 'machine-ded-big-boy',
    recommendedTankId: 'tank-2000l-dual-baffled',
    recommendedRecoveryId: 'recovery-none',
    recommendedOperators: 2,
    description: 'Built for the most brutal job sites in Britain. Heavy-gauge chassis, heavy Kubota diesel engine, 4,000 PSI pump, and dual 100m high-pressure reels to wash down 50-tonne machines.',
    keyBenefits: ['4,000 PSI @ 19 LPM impact force', 'Single-fuel 80L diesel fuel capacity', 'Dual high-pressure hose reels up to 100m reach', 'Extreme duty cycle'],
    image: '/assets/products/ded-big-boy.png'
  }
];

// ─── 10. CALCULATION & VALIDATION HELPERS ────────────────────────────────────

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
    weight_status: weightStatus
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

  const effectiveFlow = operatorCount === 2 ? flowLpm : flowLpm;
  const continuousMins = Math.round(tankLitres / effectiveFlow);
  // Real world trigger time is ~60% on average
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

/**
 * Validates tow vehicle compatibility against the trailer's Maximum Authorised Mass (MAM).
 */
export function assessTowVehicle(towingCapacityKg: number | undefined, trailerMamKg: number): TowVehicleAssessment {
  if (!towingCapacityKg || towingCapacityKg <= 0) {
    return {
      is_compatible: true,
      status_message: 'Please verify your tow vehicle’s braked towing limit on the vehicle VIN plate or V5C logbook.'
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
 * Generates a human-friendly unique build code (e.g. AKT-7F4K2P)
 */
export function generateBuildCode(): string {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `AKT-${code}-UK`;
}

/**
 * Returns sensible default configuration
 */
export function getDefaultConfiguration(): TrailerConfiguration {
  return {
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
