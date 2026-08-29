import {
  Part,
  PartCategoryDef,
  PartAssembly,
  ServiceKit,
  MachinePartsProfile,
} from '@/lib/types/parts';

export const PART_CATEGORIES: PartCategoryDef[] = [
  {
    slug: 'pumps',
    name: 'Pumps & Plunger Components',
    shortDesc: 'Complete triplex plunger pumps, ceramic pistons, manifold heads, and valve cages.',
    iconName: 'Gauge',
    popularParts: ['General Pump TS2021', 'Cat Pump 5CP2120W', 'AR RKV4G40', 'Ceramic Plunger Kit']
  },
  {
    slug: 'burners',
    name: 'Burners & Ignition Systems',
    shortDesc: 'Diesel & kerosene combustion heads, ignition transformers, electrodes, and blower motors.',
    iconName: 'Flame',
    popularParts: ['Beckett Burner Head', 'Ignition Electrode Pair', '12V / 240V Transformer', 'Fuel Solenoid Valve']
  },
  {
    slug: 'coils',
    name: 'Heating Coils & Insulation',
    shortDesc: 'Continuous-wound Schedule 80 ASTM A53 heating coils and ceramic blanket insulation.',
    iconName: 'Layers',
    popularParts: ['Schedule 80 Hydro-Insulated Coil', 'Bottom Ceramic Disc', 'Insulation Blanket Wrap']
  },
  {
    slug: 'valves-unloaders',
    name: 'Unloaders, Regulators & Safety Valves',
    shortDesc: 'Trapped-pressure unloaders, flow-actuated regulators, burst discs, and thermal relief valves.',
    iconName: 'ShieldAlert',
    popularParts: ['VRT3 Unloader Valve', 'Safety Relief Burst Disc 5000 PSI', 'Thermal Relief Valve 140°F']
  },
  {
    slug: 'hoses',
    name: 'High-Pressure & Steam Hoses',
    shortDesc: 'Single and double steel-braided wire hoses, non-marking covers, and bend restrictors.',
    iconName: 'Activity',
    popularParts: ['50ft 3/8" 4000 PSI Single Wire', '100ft Non-Marking Gray Hose', 'Steam Rated 350°F Hose']
  },
  {
    slug: 'trigger-guns',
    name: 'Trigger Guns & Spray Handles',
    shortDesc: 'Easy-pull fatigue-reducing spray handles, high-temperature linear guns, and dump guns.',
    iconName: 'Wrench',
    popularParts: ['Alkota Easy-Pull Gun 10-151', 'Suttner ST-1500 Industrial Gun', 'Steam Dump Gun 10-162']
  },
  {
    slug: 'lances-nozzles',
    name: 'Lances, Quick-Tips & Turbo Jets',
    shortDesc: 'Insulated wands, hardened stainless fan nozzles, rotary rotating turbo tips, and chemical jets.',
    iconName: 'Target',
    popularParts: ['48" Insulated Molded Lance', '0004 Red 0° Tip', '2504 Green 25° Tip', 'Turbo Rotating Nozzle']
  },
  {
    slug: 'filters',
    name: 'Filters & Strainers',
    shortDesc: 'Mesh inlet water strainers, primary fuel water-separators, and chemical suction check-valves.',
    iconName: 'Filter',
    popularParts: ['Inlet Water Filter Bowl 80 Mesh', 'Spin-On 10-Micron Fuel Filter', 'Brass Chemical Strainer']
  },
  {
    slug: 'electrical-switches',
    name: 'Electrical, Switches & Thermostats',
    shortDesc: 'Heavy-duty toggle switches, adjustable dial thermostats, flow switches, and contactors.',
    iconName: 'Zap',
    popularParts: ['Adjustable Thermostat 0-250°F', 'General Pump Flow Switch', 'Rotary Cam Power Switch']
  },
  {
    slug: 'engines-motors',
    name: 'Engines, Electric Motors & Drive Belts',
    shortDesc: 'TEFC electric motors, Honda/Vanguard engine service items, taper-lock pulleys, and belts.',
    iconName: 'Cpu',
    popularParts: ['Cast Iron Motor Pulley', 'Industrial BX-Cogged Belt', 'Vibration Isolator Mounts']
  },
  {
    slug: 'fuel-system',
    name: 'Fuel Pumps & Burner Nozzles',
    shortDesc: 'Suntec fuel pumps, copper delivery lines, and precision brass oil-burner atomising nozzles.',
    iconName: 'Droplet',
    popularParts: ['Suntec A2VA Fuel Pump', '1.75 GPH 80°A Burner Nozzle', '2.00 GPH 80°B Solid Cone Nozzle']
  },
  {
    slug: 'fittings-couplers',
    name: 'Fittings, Swivels & Quick-Couplers',
    shortDesc: 'Stainless and brass quick-release sockets, high-pressure live swivels, and BSP adaptors.',
    iconName: 'Link2',
    popularParts: ['3/8" Stainless Female Quick-Coupler', '3/8" Hardened Male Plug', 'Gun Inlet Live Swivel']
  },
  {
    slug: 'seals-o-rings',
    name: 'Seals, O-Rings & Service Kits',
    shortDesc: 'Viton / Buna packing seals, brass spacer rings, check valve kits, and complete maintenance sets.',
    iconName: 'CheckCircle2',
    popularParts: ['TS2021 Packing Seal Kit', 'Viton Quick-Coupler O-Ring (Pack 10)', 'Unloader Rebuild Kit']
  }
];

export const VERIFIED_PARTS: Part[] = [
  // ─── PUMPS & PLUNGERS ──────────────────────────────────────────────────────
  {
    id: 'part-gp-ts2021',
    part_number: '20-001',
    name: 'General Pump TS2021 Triplex Plunger Pump',
    slug: 'general-pump-ts2021',
    description: 'The benchmark triplex plunger pump used across Alkota heavy-duty hot and cold water pressure washers. Features forged brass manifold, solid ceramic plungers, unitised stainless steel inlet/discharge valves, and heavy die-cast anodised aluminium crankcase.',
    category: 'pumps',
    assembly_category: 'pump',
    manufacturer: 'General Pump / Alkota OEM',
    price: 645.00,
    in_stock: true,
    availability_status: 'in_stock',
    weight_kg: 14.5,
    technical_notes: 'Rated for 5.6 GPM (21.2 LPM) @ 3500 PSI (240 BAR) at 1450 RPM. Requires 1.1L 30W Non-Detergent Pump Oil.',
    compatible_machines: ['alkota-430xh', 'alkota-4358', 'alkota-216x4', 'standard-trailer-single-axle'],
    image_url: '/assets/products/pump-ts2021.png',
    oem_genuine: true,
    active: true,
    sort_order: 10
  },
  {
    id: 'part-cat-5cp2120w',
    part_number: '20-010',
    name: 'Cat Pump 5CP2120W Industrial Plunger Pump',
    slug: 'cat-pump-5cp2120w',
    description: 'High-temperature industrial triplex pump with special blend high-pressure seals, concentric solid ceramic plungers, and 316 stainless steel valve seats for severe continuous-duty wash bay service.',
    category: 'pumps',
    assembly_category: 'pump',
    manufacturer: 'Cat Pumps / Alkota OEM',
    price: 890.00,
    in_stock: true,
    availability_status: 'in_stock',
    weight_kg: 16.2,
    technical_notes: 'Rated for 4.0 GPM (15.1 LPM) @ 2500 PSI at 950 RPM. Safe for inlet water temperatures up to 70°C.',
    compatible_machines: ['alkota-31105', 'alkota-5305a'],
    image_url: null,
    oem_genuine: true,
    active: true,
    sort_order: 20
  },

  // ─── GUNS & LANCES ─────────────────────────────────────────────────────────
  {
    id: 'part-gun-10151',
    part_number: '10-151',
    name: 'Alkota Easy-Pull Industrial Trigger Gun',
    slug: 'alkota-easy-pull-trigger-gun-10151',
    description: 'Proprietary fatigue-reducing trigger gun designed specifically for 8-hour commercial wash shifts. Features light trigger hold-open force, impact-resistant composite housing, and stainless steel ball and seat.',
    category: 'trigger-guns',
    assembly_category: 'plumbing',
    manufacturer: 'Alkota Genuine Equipment',
    price: 78.50,
    in_stock: true,
    availability_status: 'in_stock',
    weight_kg: 0.95,
    technical_notes: 'Rated up to 5000 PSI (345 BAR), 12 GPM (45 LPM), and 300°F (150°C). 3/8" FPT inlet, 1/4" FPT outlet.',
    compatible_machines: ['alkota-430xh', 'alkota-4358', 'alkota-216x4', 'alkota-31105', 'alkota-5305a', 'standard-trailer-single-axle'],
    image_url: '/assets/products/easy-pull-gun.png',
    oem_genuine: true,
    active: true,
    sort_order: 30
  },
  {
    id: 'part-gun-st1500',
    part_number: 'ST-1500',
    name: 'Suttner ST-1500 Heavy-Duty Spray Gun',
    slug: 'suttner-st1500-trigger-gun',
    description: 'Industry standard linear trigger gun built with solid brass forged body, stainless valve needle, and unitised trigger lock.',
    category: 'trigger-guns',
    assembly_category: 'plumbing',
    manufacturer: 'Suttner / Alkota Approved',
    price: 64.00,
    in_stock: true,
    availability_status: 'in_stock',
    weight_kg: 0.85,
    technical_notes: 'Rated 4000 PSI (275 BAR) @ 10.5 GPM, 300°F.',
    compatible_machines: ['alkota-430xh', 'alkota-4358'],
    image_url: null,
    oem_genuine: true,
    active: true,
    sort_order: 40
  },

  // ─── HOSES ─────────────────────────────────────────────────────────────────
  {
    id: 'part-hose-12101',
    part_number: '12-101',
    name: '50ft 3/8" 4000 PSI Wire-Braided High-Pressure Hose',
    slug: '50ft-3-8-4000psi-high-pressure-hose',
    description: 'Single-wire high-tensile steel braided hose with oil-resistant synthetic rubber tube and abrasion-resistant outer cover. Includes heavy-duty molded bend restrictors at both ends to eliminate kinking.',
    category: 'hoses',
    assembly_category: 'plumbing',
    manufacturer: 'Alkota Genuine',
    price: 94.00,
    in_stock: true,
    availability_status: 'in_stock',
    weight_kg: 4.8,
    technical_notes: '3/8" MPT solid x 3/8" MPT swivel fittings. Rated 4000 PSI working pressure, 16000 PSI burst, 250°F max.',
    compatible_machines: ['alkota-430xh', 'alkota-4358', 'alkota-216x4', 'alkota-31105'],
    image_url: null,
    oem_genuine: true,
    active: true,
    sort_order: 50
  },
  {
    id: 'part-hose-12205',
    part_number: '12-205',
    name: '50ft 3/8" 4000 PSI Non-Marking Gray Hose',
    slug: '50ft-3-8-non-marking-gray-hose',
    description: 'Special non-marking gray outer cover engineered specifically for food processing plants, vehicle showrooms, swimming pools, and architectural concrete pads where black rubber scuffs cannot be tolerated.',
    category: 'hoses',
    assembly_category: 'plumbing',
    manufacturer: 'Alkota Genuine',
    price: 118.00,
    in_stock: true,
    availability_status: 'in_stock',
    weight_kg: 5.0,
    technical_notes: 'Rated 4000 PSI @ 250°F. Includes heavy-duty bend restrictors.',
    compatible_machines: ['alkota-430xh', 'alkota-5305a'],
    image_url: null,
    oem_genuine: true,
    active: true,
    sort_order: 60
  },

  // ─── UNLOADERS & VALVES ────────────────────────────────────────────────────
  {
    id: 'part-unloader-vrt3',
    part_number: '30-105',
    name: 'VRT3 Trapped-Pressure Unloader Valve with Knob',
    slug: 'vrt3-trapped-pressure-unloader-valve',
    description: 'Precision mechanical unloader valve engineered to divert high-pressure water flow into bypass when trigger gun is closed, protecting the triplex pump and motor from hydraulic lock and pressure spikes.',
    category: 'valves-unloaders',
    assembly_category: 'unloader',
    manufacturer: 'PA / Alkota Approved',
    price: 125.00,
    in_stock: true,
    availability_status: 'in_stock',
    weight_kg: 1.2,
    technical_notes: 'Rated 4500 PSI (310 BAR) @ 10.5 GPM, 195°F. 3/8" FPT inlet, 3/8" FPT outlet, dual 3/8" FPT bypass ports.',
    compatible_machines: ['alkota-430xh', 'alkota-4358', 'alkota-216x4'],
    image_url: null,
    oem_genuine: true,
    active: true,
    sort_order: 70
  },
  {
    id: 'part-safety-burst-disc',
    part_number: '30-201',
    name: 'Alkota High-Pressure Safety Burst Disc (5000 PSI)',
    slug: 'alkota-safety-burst-disc-5000psi',
    description: 'Mandatory safety relief component installed directly on the heating coil outlet. If unloader fails or coil line becomes blocked, the sacrificial disc ruptures cleanly to prevent dangerous coil over-pressurisation.',
    category: 'valves-unloaders',
    assembly_category: 'coil',
    manufacturer: 'Alkota Genuine',
    price: 36.00,
    in_stock: true,
    availability_status: 'in_stock',
    weight_kg: 0.15,
    technical_notes: 'Calibrated burst rating: 5000 PSI ± 5%. 3/8" MPT fitting.',
    compatible_machines: ['alkota-430xh', 'alkota-4358', 'alkota-216x4', 'alkota-31105'],
    image_url: null,
    oem_genuine: true,
    active: true,
    sort_order: 80
  },

  // ─── BURNERS & HEATING ─────────────────────────────────────────────────────
  {
    id: 'part-burner-electrodes',
    part_number: '40-102',
    name: 'Beckett Burner Ignition Electrode Pair with Leads',
    slug: 'beckett-burner-ignition-electrode-pair',
    description: 'Precision spark gap electrodes with high-dielectric ceramic insulators and heavy brass clamp bars for Alkota down-draft diesel burners. Generates steady 10,000V arc for instant, smoke-free burner ignition.',
    category: 'burners',
    assembly_category: 'burner',
    manufacturer: 'Beckett / Alkota OEM',
    price: 42.00,
    in_stock: true,
    availability_status: 'in_stock',
    weight_kg: 0.35,
    technical_notes: 'Electrode gap specification: 5/32" (4mm) spark gap, 1/16" above nozzle center.',
    compatible_machines: ['alkota-430xh', 'alkota-4358', 'alkota-216x4', 'standard-trailer-single-axle'],
    image_url: null,
    oem_genuine: true,
    active: true,
    sort_order: 90
  },
  {
    id: 'part-burner-nozzle-175',
    part_number: '40-205',
    name: 'Delavan 1.75 GPH 80°A Solid Cone Burner Nozzle',
    slug: 'delavan-1-75-gph-burner-nozzle',
    description: 'Precision brass oil-burner atomising nozzle calibrated to deliver an exact hollow/solid fuel spray pattern into the Schedule 80 coil combustion chamber at 100–140 PSI fuel pump pressure.',
    category: 'fuel-system',
    assembly_category: 'burner',
    manufacturer: 'Delavan / Alkota OEM',
    price: 18.50,
    in_stock: true,
    availability_status: 'in_stock',
    weight_kg: 0.08,
    technical_notes: 'Replace annually to prevent burner soot accumulation and maintain maximum combustion thermal efficiency.',
    compatible_machines: ['alkota-430xh'],
    image_url: null,
    oem_genuine: true,
    active: true,
    sort_order: 100
  },

  // ─── COILS ─────────────────────────────────────────────────────────────────
  {
    id: 'part-coil-4000',
    part_number: '50-400',
    name: 'Alkota Schedule 80 ASTM A53 Cold-Wound Heating Coil',
    slug: 'alkota-schedule-80-heating-coil-4000-series',
    description: 'Alkota\'s signature Schedule 80 heavy-wall steel continuous-wound heating coil. Cold-wound on precision mandrels with no internal welds or sharp 90-degree elbows. Backed by Alkota\'s 7-year warranty.',
    category: 'coils',
    assembly_category: 'coil',
    manufacturer: 'Alkota Genuine Equipment',
    price: 1450.00,
    in_stock: true,
    availability_status: 'in_stock',
    weight_kg: 58.0,
    technical_notes: '1/2" Schedule 80 ASTM A53 pipe, hydro-insulated outer blanket, rated 5000 PSI test pressure.',
    compatible_machines: ['alkota-430xh', 'alkota-4358'],
    image_url: '/assets/products/schedule-80-coil.png',
    oem_genuine: true,
    active: true,
    sort_order: 110
  },

  // ─── FILTERS ───────────────────────────────────────────────────────────────
  {
    id: 'part-filter-water-inlet',
    part_number: '60-101',
    name: '3/4" Clear Bowl Water Inlet Strainer (80 Mesh Stainless)',
    slug: '3-4-clear-bowl-water-inlet-strainer',
    description: 'Heavy-duty clear polymer filter bowl with reusable 80-mesh stainless steel filter element. Protects triplex pump check valves from sand, grit, and mains water scale.',
    category: 'filters',
    assembly_category: 'plumbing',
    manufacturer: 'Alkota Genuine',
    price: 34.00,
    in_stock: true,
    availability_status: 'in_stock',
    weight_kg: 0.45,
    technical_notes: '3/4" FPT inlet x 3/4" MPT outlet. Max flow 10 GPM.',
    compatible_machines: ['alkota-430xh', 'alkota-4358', 'alkota-216x4', 'alkota-31105', 'alkota-5305a'],
    image_url: null,
    oem_genuine: true,
    active: true,
    sort_order: 120
  },
  {
    id: 'part-filter-fuel-spinon',
    part_number: '60-205',
    name: 'Spin-On 10-Micron Fuel Water Separator Filter',
    slug: 'spin-on-10-micron-fuel-water-separator',
    description: 'Primary diesel fuel filter cartridge with built-in water separation trap and drain valve. Traps microscopic diesel sediment and water condensation before it enters the Suntec fuel pump.',
    category: 'filters',
    assembly_category: 'fuel',
    manufacturer: 'Alkota OEM',
    price: 28.00,
    in_stock: true,
    availability_status: 'in_stock',
    weight_kg: 0.65,
    technical_notes: '10-micron cellulose media. Replace every 250 operational hours.',
    compatible_machines: ['alkota-430xh', 'alkota-4358', 'alkota-216x4', 'standard-trailer-single-axle'],
    image_url: null,
    oem_genuine: true,
    active: true,
    sort_order: 130
  },

  // ─── NOZZLES & LANCES ──────────────────────────────────────────────────────
  {
    id: 'part-nozzle-turbo-30',
    part_number: '15-500',
    name: 'Industrial Rotating Turbo Nozzle (Size 035 / 5000 PSI)',
    slug: 'industrial-rotating-turbo-nozzle-035',
    description: 'High-impact ceramic rotating nozzle combining the deep cutting power of a 0-degree solid pencil jet with the cleaning swath of a 25-degree fan nozzle. Cuts concrete cleaning time in half.',
    category: 'lances-nozzles',
    assembly_category: 'plumbing',
    manufacturer: 'Suttner / Alkota Approved',
    price: 88.00,
    in_stock: true,
    availability_status: 'in_stock',
    weight_kg: 0.42,
    technical_notes: 'Rated 5000 PSI @ 212°F. 1/4" Quick-Connect plug inlet.',
    compatible_machines: ['alkota-430xh', 'alkota-4358', 'alkota-216x4'],
    image_url: null,
    oem_genuine: true,
    active: true,
    sort_order: 140
  }
];

// ─── EXPLODED DIAGRAM ASSEMBLIES ─────────────────────────────────────────────

export const VERIFIED_ASSEMBLIES: PartAssembly[] = [
  {
    id: 'assembly-430xh-pump',
    name: 'Triplex Plunger Pump & Manifold Assembly',
    slug: '430xh-pump-assembly',
    machine_model_code: '430XH',
    machine_slug: 'alkota-430xh',
    category: 'pump',
    description: 'Exploded view of the General Pump TS2021 triplex pump crankcase, ceramic plungers, packing seals, brass manifold head, and check valve cages.',
    diagram_image_url: '/assets/diagrams/diagram-ts2021-pump-exploded.png',
    diagram_pdf_url: '/documents/schematics/alkota-430xh-pump-schematic.pdf',
    sort_order: 10,
    active: true,
    callouts: [
      { id: 'c-1', assembly_id: 'assembly-430xh-pump', callout_number: 1, x_percent: 28.5, y_percent: 34.0, part_number: '20-001', part_name: 'Pump Crankcase Anodised Aluminium', quantity_used: 1, price: 210.00 },
      { id: 'c-2', assembly_id: 'assembly-430xh-pump', callout_number: 2, x_percent: 42.0, y_percent: 45.5, part_number: '70-101', part_name: 'Solid Ceramic Plunger Sleeve 20mm', quantity_used: 3, price: 32.00 },
      { id: 'c-3', assembly_id: 'assembly-430xh-pump', callout_number: 3, x_percent: 54.0, y_percent: 48.0, part_number: '70-205', part_name: 'V-Packing High-Pressure Seal Kit 20mm', quantity_used: 1, price: 68.00 },
      { id: 'c-4', assembly_id: 'assembly-430xh-pump', callout_number: 4, x_percent: 68.0, y_percent: 52.0, part_number: '70-301', part_name: 'Forged Brass Manifold Head', quantity_used: 1, price: 265.00 },
      { id: 'c-5', assembly_id: 'assembly-430xh-pump', callout_number: 5, x_percent: 74.5, y_percent: 32.0, part_number: '70-405', part_name: 'Unitised Stainless Check Valve Assembly', quantity_used: 6, price: 16.50 },
      { id: 'c-6', assembly_id: 'assembly-430xh-pump', callout_number: 6, x_percent: 81.0, y_percent: 65.0, part_number: '30-105', part_name: 'VRT3 Unloader Valve with Knob', quantity_used: 1, price: 125.00 }
    ]
  },
  {
    id: 'assembly-430xh-burner',
    name: 'Down-Draft Diesel Burner & Ignition Assembly',
    slug: '430xh-burner-assembly',
    machine_model_code: '430XH',
    machine_slug: 'alkota-430xh',
    category: 'burner',
    description: 'Exploded view of the Beckett down-draft burner housing, ignition transformer, air blower wheel, electrode clamps, and atomising nozzle holder.',
    diagram_image_url: '/assets/diagrams/diagram-beckett-burner-exploded.png',
    diagram_pdf_url: '/documents/schematics/alkota-430xh-burner-schematic.pdf',
    sort_order: 20,
    active: true,
    callouts: [
      { id: 'c-10', assembly_id: 'assembly-430xh-burner', callout_number: 1, x_percent: 22.0, y_percent: 40.0, part_number: '40-102', part_name: 'Beckett Burner Ignition Electrode Pair', quantity_used: 1, price: 42.00 },
      { id: 'c-11', assembly_id: 'assembly-430xh-burner', callout_number: 2, x_percent: 38.0, y_percent: 44.0, part_number: '40-205', part_name: 'Delavan 1.75 GPH 80°A Solid Cone Nozzle', quantity_used: 1, price: 18.50 },
      { id: 'c-12', assembly_id: 'assembly-430xh-burner', callout_number: 3, x_percent: 58.0, y_percent: 30.0, part_number: '40-301', part_name: '10,000V Ignition Transformer (240V)', quantity_used: 1, price: 145.00 },
      { id: 'c-13', assembly_id: 'assembly-430xh-burner', callout_number: 4, x_percent: 72.0, y_percent: 60.0, part_number: '40-405', part_name: 'Suntec Fuel Pump Single-Stage', quantity_used: 1, price: 135.00 }
    ]
  }
];

// ─── SERVICE & MAINTENANCE KITS ──────────────────────────────────────────────

export const VERIFIED_SERVICE_KITS: ServiceKit[] = [
  {
    id: 'kit-pump-ts2021-annual',
    kit_number: 'KIT-TS2021-ANNUAL',
    name: 'General Pump TS2021 Complete Annual Overhaul Kit',
    slug: 'general-pump-ts2021-annual-overhaul-kit',
    description: 'Everything required to rebuild the fluid end of your TS2021 triplex pump. Prevents loss of operating pressure and water intrusion into the crankcase.',
    service_purpose: 'Annual or 500-hour scheduled pump maintenance to restore peak pressure output and prevent seal blowout.',
    service_interval_hours: 500,
    compatible_machine_codes: ['430XH', '4358', '216X4', 'Single-Axle Trailer'],
    included_parts_summary: [
      '3 × 20mm V-Packing High-Pressure Seal Sets (Part 70-205)',
      '6 × Complete Stainless Steel Valve Assemblies with O-rings (Part 70-405)',
      '3 × Low-Pressure Seal Retainers & O-rings',
      '1 × 1.1L Bottle Alkota 30W Non-Detergent Pump Lubricant'
    ],
    price: 155.00,
    in_stock: true,
    image_url: '/assets/products/service-kit-pump.png',
    active: true,
    items: [
      { part_number: '70-205', part_name: 'V-Packing High-Pressure Seal Kit', quantity: 3 },
      { part_number: '70-405', part_name: 'Unitised Check Valve Assembly', quantity: 6 },
      { part_number: '90-001', part_name: 'Alkota 30W Pump Oil (1L)', quantity: 2 }
    ]
  },
  {
    id: 'kit-burner-tuneup',
    kit_number: 'KIT-BURNER-TUNEUP',
    name: 'Alkota Down-Draft Burner Annual Tune-Up Kit',
    slug: 'alkota-burner-annual-tune-up-kit',
    description: 'Ensures instant burner ignition, clean combustion, and maximum fuel efficiency. Eliminates diesel soot formation inside the Schedule 80 coil chamber.',
    service_purpose: 'Annual pre-winter burner overhaul to prevent hard starting, coil soot clogging, and flame sensor lockouts.',
    service_interval_hours: 500,
    compatible_machine_codes: ['430XH', '4358', '216X4', '31105', 'Single-Axle Trailer'],
    included_parts_summary: [
      '1 × Matched Delavan Atomising Oil Nozzle (Part 40-205)',
      '1 × Beckett Ignition Electrode Pair with Gauge Guide (Part 40-102)',
      '1 × 10-Micron Spin-on Fuel Water Separator Filter (Part 60-205)',
      '1 × Fuel Pump Inline Strainer & Gasket Kit'
    ],
    price: 88.00,
    in_stock: true,
    image_url: '/assets/products/service-kit-burner.png',
    active: true,
    items: [
      { part_number: '40-205', part_name: 'Delavan 1.75 GPH Nozzle', quantity: 1 },
      { part_number: '40-102', part_name: 'Beckett Electrode Pair', quantity: 1 },
      { part_number: '60-205', part_name: 'Spin-On 10-Micron Fuel Filter', quantity: 1 }
    ]
  },
  {
    id: 'kit-500hr-comprehensive',
    kit_number: 'KIT-500HR-FULL',
    name: '500-Hour Comprehensive Preventative Maintenance Pack',
    slug: '500-hour-comprehensive-preventative-maintenance-pack',
    description: 'The master plant maintenance pack designed for commercial fleet depots, quarry wash bays, and heavy contractors who cannot afford unpredicted machine downtime.',
    service_purpose: 'Complete 500-hour major service covering water filtration, burner tuning, pump seals, and coil scale descaling.',
    service_interval_hours: 500,
    compatible_machine_codes: ['430XH', '4358'],
    included_parts_summary: [
      'Complete TS2021 Pump Valve & Packing Seal Set',
      'Beckett Burner Electrode Pair & Fuel Nozzle',
      'Water Inlet 80-Mesh Stainless Strainer Element',
      '10-Micron Fuel Filter Cartridge',
      '5L Scale Stop Coil Protection Additive (Part Scale Stop)'
    ],
    price: 245.00,
    in_stock: true,
    image_url: '/assets/products/service-kit-full.png',
    active: true
  }
];

// ─── SUPERSEDED PARTS LOOKUP DICTIONARY ──────────────────────────────────────

export const SUPERSEDED_PARTS_MAP: Record<string, { currentPartNumber: string; name: string; notes: string }> = {
  '10-101': { currentPartNumber: '10-151', name: 'Alkota Easy-Pull Trigger Gun', notes: 'Legacy 10-101 trigger gun upgraded to fatigue-reducing 10-151 Easy-Pull design.' },
  '20-002': { currentPartNumber: '20-001', name: 'General Pump TS2021 Triplex Pump', notes: 'Legacy pump version replaced with modern heavy-duty TS2021 standard.' },
  '30-101': { currentPartNumber: '30-105', name: 'VRT3 Unloader Valve with Knob', notes: 'Obsolete brass unloader replaced with modern VRT3 trapped-pressure unit.' },
  '40-101': { currentPartNumber: '40-102', name: 'Beckett Burner Ignition Electrode Pair', notes: 'Superseded to high-dielectric ceramic electrode pair.' },
  '12-100': { currentPartNumber: '12-101', name: '50ft 3/8" 4000 PSI Single Wire Hose', notes: 'Upgraded with heavy-duty molded bend restrictors.' }
};

// ─── QUERY HELPERS ───────────────────────────────────────────────────────────

export function getPartBySlug(slug: string): Part | undefined {
  return VERIFIED_PARTS.find((p) => p.slug === slug || p.id === slug);
}

export function getPartByNumber(partNumber: string): Part | undefined {
  const clean = partNumber.trim().toUpperCase();
  return VERIFIED_PARTS.find((p) => p.part_number.toUpperCase() === clean);
}

export function searchParts(query: string, categoryFilter: string = 'all'): Part[] {
  const q = query.toLowerCase().trim();
  return VERIFIED_PARTS.filter((part) => {
    const matchesCategory = categoryFilter === 'all' || part.category === categoryFilter;
    if (!matchesCategory) return false;
    if (!q) return true;
    return (
      part.name.toLowerCase().includes(q) ||
      part.part_number.toLowerCase().includes(q) ||
      (part.description && part.description.toLowerCase().includes(q)) ||
      (part.manufacturer && part.manufacturer.toLowerCase().includes(q)) ||
      (part.compatible_machines && part.compatible_machines.some((m) => m.toLowerCase().includes(q)))
    );
  });
}

export function getPartsByMachine(machineSlugOrCode: string): Part[] {
  const target = machineSlugOrCode.toLowerCase().trim();
  return VERIFIED_PARTS.filter((p) =>
    p.compatible_machines?.some((m) => m.toLowerCase().includes(target))
  );
}

export function getAssembliesByMachine(machineSlugOrCode: string): PartAssembly[] {
  const target = machineSlugOrCode.toLowerCase().trim();
  return VERIFIED_ASSEMBLIES.filter(
    (a) => a.machine_slug?.toLowerCase().includes(target) || a.machine_model_code.toLowerCase().includes(target)
  );
}
