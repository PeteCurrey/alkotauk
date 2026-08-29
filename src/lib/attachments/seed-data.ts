import {
  Attachment,
  AttachmentCategoryDef,
  AttachmentApplicationDef,
} from '@/lib/types/attachments';

// ─── APPLICATION DEFINITIONS ─────────────────────────────────────────────────

export const ATTACHMENT_APPLICATIONS: AttachmentApplicationDef[] = [
  {
    id: 'surface_cleaning',
    title: 'Surface Cleaning',
    shortDesc: 'High-output flat-surface cleaning for yards, depots, forecourts, warehouse aprons, and hardstanding.',
    technicalConsiderations: [
      'Working width determines area coverage rate.',
      'Requires sufficient flow (L/min) to spin internal nozzle bar.',
      'Hot-water units increase biological kill and degrease capability.',
      'Recovery-capable heads allow closed-loop wash water capture.'
    ],
    primaryCategories: ['surface-cleaners', 'water-recovery'],
    imageSubject: 'Industrial surface cleaner attachment cleaning concrete depot yard'
  },
  {
    id: 'drain_pipe_cleaning',
    title: 'Drain & Pipe Cleaning',
    shortDesc: 'Penetrating jetter nozzles and flexible push-rods for commercial drain maintenance, pipe scouring, and blockage clearance.',
    technicalConsiderations: [
      'Hose diameter must allow entry into target drain bore.',
      'Nozzle jet angle determines self-propulsion vs stationary jetting.',
      'Minimum 150–200 BAR typically required for effective pipe entry.',
      'Flow (L/min) drives nozzle thrust — insufficient flow reduces penetration.'
    ],
    primaryCategories: ['drain-pipe-cleaning', 'hoses'],
    imageSubject: 'Drain jetter hose entering pipe for blockage clearance'
  },
  {
    id: 'chemical_foam_application',
    title: 'Chemical & Foam Application',
    shortDesc: 'Controlled downstream injection and foam lance systems for pre-soak, contact wash, and dwell-time chemistry.',
    technicalConsiderations: [
      'Downstream injectors are post-pump — chemical dilution is approximate.',
      'Upstream chemical dosing (if offered) provides more precise concentration.',
      'Foam lance requires low-pressure chemical nozzle to generate foam volume.',
      'Chemical compatibility of the injector material must be verified with the detergent.'
    ],
    primaryCategories: ['foam-chemical-systems'],
    imageSubject: 'Dense foam from professional foam lance on fleet vehicle'
  },
  {
    id: 'long_reach_height',
    title: 'Long-Reach & Height Access',
    shortDesc: 'Telescopic lance systems and adjustable-angle heads for vehicle roofs, building façades, and large equipment above head height.',
    technicalConsiderations: [
      'Telescopic lances increase torque at nozzle — ergonomic handling required.',
      'Pressure loss through long lance bore should be verified against machine output.',
      'Working-at-height operations require site-specific risk assessment.',
      'Extension systems do not eliminate working-at-height considerations.'
    ],
    primaryCategories: ['extension-telescopic', 'lances'],
    imageSubject: 'Telescopic lance cleaning the roof of a commercial vehicle'
  },
  {
    id: 'coating_removal',
    title: 'Coating & Material Removal',
    shortDesc: 'Wet abrasive / wet blast systems and high-impact rotating heads for controlled removal of paint, coatings, and rust.',
    technicalConsiderations: [
      'Wet abrasive systems use water as carrier — reduce dust versus dry blasting.',
      'Surface damage risk is higher than standard washing — test areas first.',
      'Abrasive media selection determines aggressiveness and surface profile.',
      'Environmental controls required for abrasive media collection and disposal.'
    ],
    primaryCategories: ['specialist'],
    imageSubject: 'Wet abrasive blasting equipment for coating removal on steel'
  },
  {
    id: 'hose_management',
    title: 'Hose Management & Extended Reach',
    shortDesc: 'Self-retracting and motorised hose reels, extension hose sets, and quick-coupler systems for safe large-area operation.',
    technicalConsiderations: [
      'Pressure loss increases with hose length — verify machine output capability.',
      'Hose reel must be rated for the working pressure and temperature of the machine.',
      'Non-marking hose required in food, vehicle, or surface-sensitive environments.',
      'Long hose runs may require larger bore pipe to minimise flow restriction.'
    ],
    primaryCategories: ['hose-reels', 'hoses'],
    imageSubject: 'Heavy-duty industrial hose reel on commercial wash vehicle'
  },
  {
    id: 'spray_control',
    title: 'Spray Pattern & Nozzle Control',
    shortDesc: 'Fan nozzles, turbo rotating jets, adjustable pattern heads, and quick-connect tip systems for precise water impact management.',
    technicalConsiderations: [
      'Nozzle orifice size must match machine flow at working pressure.',
      'Incorrect orifice causes over/under-pressure and reduced cleaning performance.',
      'Turbo nozzles increase soil impact significantly — not suitable for delicate surfaces.',
      'Chemical nozzles (downstream injection) require low-pressure orifice to create venturi effect.'
    ],
    primaryCategories: ['nozzles', 'turbo-rotary', 'lances'],
    imageSubject: 'Nozzle selection and quick-change lance system'
  },
  {
    id: 'water_recovery',
    title: 'Water Recovery & Capture',
    shortDesc: 'Vacuum recovery surface heads, bund accessories, and recovery hose connections for closed-loop wash water capture and effluent compliance.',
    technicalConsiderations: [
      'Recovery head requires a separate vacuum or recovery pump — not included in standard wash machine.',
      'Surface recovery reduces effluent leaving the wash area.',
      'Filtered recovery enables water recirculation in closed-loop systems.',
      'Required by Environment Agency in many commercial wash bay applications.'
    ],
    primaryCategories: ['water-recovery', 'surface-cleaners'],
    imageSubject: 'Vacuum recovery surface cleaner capturing wash water on commercial forecourt'
  },
  {
    id: 'multi_operator',
    title: 'Multi-Operator Systems',
    shortDesc: 'Twin-lance distribution manifolds and independent hose reel stations for simultaneously deploying two operators from a single high-flow machine.',
    technicalConsiderations: [
      'Dual-operator operation halves available flow per lance — verify machine GPM is sufficient.',
      'Each operator typically requires 10–15 LPM minimum for effective cleaning.',
      'Machine must be rated and set up for the increased demand before dual deployment.',
      'Pressure at each outlet will be reduced from single-operator specification.'
    ],
    primaryCategories: ['hose-reels', 'hoses', 'trigger-guns'],
    imageSubject: 'Two operators using a twin hose system from a single industrial pressure washer'
  }
];

// ─── CATEGORY DEFINITIONS ─────────────────────────────────────────────────────

export const ATTACHMENT_CATEGORIES: AttachmentCategoryDef[] = [
  {
    slug: 'surface-cleaners',
    name: 'Surface Cleaners',
    shortDesc: 'High-output rotating spray bar heads with full shroud for consistent flat-surface cleaning.',
    applications: ['surface_cleaning', 'water_recovery']
  },
  {
    slug: 'hoses',
    name: 'High-Pressure Hoses',
    shortDesc: 'Single and double steel-braided wire reinforced hoses for hot water, cold water, and steam pressure washing.',
    applications: ['hose_management', 'drain_pipe_cleaning', 'multi_operator']
  },
  {
    slug: 'hose-reels',
    name: 'Hose Reels',
    shortDesc: 'Spring-return self-retracting, manual, and motorised reels for safe operator hose management.',
    applications: ['hose_management', 'multi_operator']
  },
  {
    slug: 'trigger-guns',
    name: 'Trigger Guns & Spray Handles',
    shortDesc: 'Industrial linear and pistol-grip trigger guns rated for high-pressure, high-temperature continuous commercial use.',
    applications: ['spray_control', 'multi_operator']
  },
  {
    slug: 'lances',
    name: 'Lances, Wands & Extension Tubes',
    shortDesc: 'Fixed and adjustable spray lances, insulated high-temperature wands, and extended reach pole kits.',
    applications: ['spray_control', 'long_reach_height']
  },
  {
    slug: 'nozzles',
    name: 'Nozzle Tips & Quick-Connect Sets',
    shortDesc: 'Hardened stainless fan nozzles, low-pressure chemical tips, and quick-connect colour-coded sets.',
    applications: ['spray_control', 'chemical_foam_application']
  },
  {
    slug: 'foam-chemical-systems',
    name: 'Foam Lance & Chemical Injection Systems',
    shortDesc: 'Downstream injectors, foam lance bottles, and adjustable dilution systems for controlled chemical application.',
    applications: ['chemical_foam_application']
  },
  {
    slug: 'drain-pipe-cleaning',
    name: 'Drain & Pipe Cleaning Equipment',
    shortDesc: 'Flexible jetter hoses with penetrating nozzles for commercial drain unblocking and internal pipe scouring.',
    applications: ['drain_pipe_cleaning']
  },
  {
    slug: 'turbo-rotary',
    name: 'Turbo & Rotating Nozzles',
    shortDesc: 'Ceramic oscillating rotating nozzles combining a pencil jet impact with wide-area fan coverage.',
    applications: ['spray_control', 'coating_removal', 'surface_cleaning']
  },
  {
    slug: 'extension-telescopic',
    name: 'Telescopic & Long-Reach Systems',
    shortDesc: 'Multi-section telescopic lance poles with trigger lock and swivel heads for vehicle roofs and elevated surfaces.',
    applications: ['long_reach_height']
  },
  {
    slug: 'water-recovery',
    name: 'Water Recovery Attachments',
    shortDesc: 'Vacuum recovery surface heads and bund accessories for wash water capture and closed-loop compliance.',
    applications: ['water_recovery']
  },
  {
    slug: 'specialist',
    name: 'Specialist Systems',
    shortDesc: 'Wet abrasive blasting, multi-operator manifolds, and specialist industrial cleaning heads.',
    applications: ['coating_removal', 'multi_operator', 'specialist']
  }
];

// ─── VERIFIED ATTACHMENT PRODUCTS ────────────────────────────────────────────

export const VERIFIED_ATTACHMENTS: Attachment[] = [
  // ─── SURFACE CLEANERS ────────────────────────────────────────────────────────
  {
    id: 'att-sc-18',
    part_number: 'SC-18',
    name: 'Alkota 18" Heavy-Duty Surface Cleaner',
    slug: 'alkota-18-inch-surface-cleaner',
    tagline: 'Consistent flat-surface cleaning across 460mm per pass.',
    description: 'Professional 18-inch enclosed rotating spray bar surface cleaner for consistent, overspray-free flat-surface washing of yards, concrete aprons, workshop floors, and vehicle forecourts. Dual stainless rotating nozzle arms with sealed heavy-duty ball bearing hub and quick-release 1/4" QC swivel inlet.',
    category: 'surface-cleaners',
    applications: ['surface_cleaning'],
    ratings: {
      pressure_min_bar: 60,
      pressure_max_bar: 275,
      flow_min_lpm: 10,
      flow_max_lpm: 22,
      temperature_max_c: 95,
      connection_size: '1/4" FPT Quick-Connect',
      working_width_mm: 460,
      weight_kg: 3.8
    },
    compatible_machines: [
      { machine_slug: 'alkota-430xh', machine_model_code: '430XH', machine_name: 'Alkota 430XH Hot Water', status: 'compatible' },
      { machine_slug: 'alkota-4358', machine_model_code: '4358', machine_name: 'Alkota 4358', status: 'compatible' },
      { machine_slug: 'alkota-216x4', machine_model_code: '216X4', machine_name: 'Alkota 216X4', status: 'compatible' },
      { machine_slug: 'alkota-5305a', machine_model_code: '5305A', machine_name: 'Alkota 5305A Cold', status: 'compatible' }
    ],
    image_url: '/assets/attachments/surface-cleaner-18.png',
    price: 285.00,
    in_stock: true,
    featured: true,
    active: true,
    sort_order: 10
  },
  {
    id: 'att-sc-24',
    part_number: 'SC-24',
    name: 'Alkota 24" Commercial Surface Cleaner with Wheels',
    slug: 'alkota-24-inch-commercial-surface-cleaner',
    tagline: 'Covers 610mm per pass — maximum efficiency on large hardstanding.',
    description: 'Large 24-inch commercial surface cleaner fitted with four articulated caster wheels for effortless operator movement across large flat areas. Sealed precision bearing rotor, integrated water deflection skirt, and 1/4" QC quick-release inlet. Ideal for logistics depots, service yards, and large vehicle wash bays.',
    category: 'surface-cleaners',
    applications: ['surface_cleaning'],
    ratings: {
      pressure_min_bar: 80,
      pressure_max_bar: 275,
      flow_min_lpm: 14,
      flow_max_lpm: 30,
      temperature_max_c: 95,
      connection_size: '1/4" FPT Quick-Connect',
      working_width_mm: 610,
      weight_kg: 5.4
    },
    compatible_machines: [
      { machine_slug: 'alkota-430xh', machine_model_code: '430XH', machine_name: 'Alkota 430XH Hot Water', status: 'compatible' },
      { machine_slug: 'alkota-4358', machine_model_code: '4358', machine_name: 'Alkota 4358', status: 'compatible' },
      { machine_slug: 'alkota-216x4', machine_model_code: '216X4', machine_name: 'Alkota 216X4', status: 'compatible', notes: 'Verify flow at operating pressure — minimum 14 LPM required.' },
      { machine_slug: 'alkota-5305a', machine_model_code: '5305A', machine_name: 'Alkota 5305A Cold', status: 'compatible' }
    ],
    image_url: '/assets/attachments/surface-cleaner-24.png',
    price: 385.00,
    in_stock: true,
    featured: true,
    active: true,
    sort_order: 20
  },

  // ─── HOSES ──────────────────────────────────────────────────────────────────
  {
    id: 'att-hose-50-sw',
    part_number: '12-101',
    name: '50ft 3/8" 4000 PSI Single-Wire HP Hose with Bend Restrictors',
    slug: '50ft-3-8-high-pressure-hose',
    tagline: 'Standard working hose for most industrial hot and cold water pressure washers.',
    description: 'Single-wire steel braid reinforced high-pressure hose with oil-resistant EPDM synthetic inner tube and abrasion-resistant outer cover. Fitted with heavy molded bend restrictors at both ends to prevent kinking at the gun and machine outlet. The standard hose on most Alkota hot and cold water skid units.',
    category: 'hoses',
    applications: ['hose_management'],
    ratings: {
      pressure_max_bar: 275,
      temperature_max_c: 120,
      connection_size: '3/8" MPT Solid × 3/8" MPT Swivel',
      hose_length_m: 15,
      weight_kg: 4.8
    },
    compatible_machines: [
      { machine_slug: 'alkota-430xh', machine_model_code: '430XH', machine_name: 'Alkota 430XH Hot Water', status: 'compatible' },
      { machine_slug: 'alkota-4358', machine_model_code: '4358', machine_name: 'Alkota 4358', status: 'compatible' },
      { machine_slug: 'alkota-216x4', machine_model_code: '216X4', machine_name: 'Alkota 216X4', status: 'compatible' },
      { machine_slug: 'alkota-5305a', machine_model_code: '5305A', machine_name: 'Alkota 5305A Cold', status: 'compatible' }
    ],
    image_url: null,
    price: 94.00,
    in_stock: true,
    featured: false,
    active: true,
    sort_order: 30
  },
  {
    id: 'att-hose-100-nm',
    part_number: '12-205',
    name: '50ft 3/8" 4000 PSI Non-Marking Gray Cover Hose',
    slug: '50ft-non-marking-gray-hose',
    tagline: 'Prevents rubber scuffs on painted floors, polished concrete, and vehicle bodywork.',
    description: 'Premium gray non-marking outer cover on a standard 4000 PSI single-wire hose. Essential for food processing plants, vehicle showrooms, tiled floors, and architectural concrete surfaces where standard black rubber hose leaves scuff marks. Identical technical ratings to the standard black hose.',
    category: 'hoses',
    applications: ['hose_management', 'chemical_foam_application'],
    ratings: {
      pressure_max_bar: 275,
      temperature_max_c: 120,
      connection_size: '3/8" MPT Solid × 3/8" MPT Swivel',
      hose_length_m: 15,
      weight_kg: 5.0
    },
    compatible_machines: [
      { machine_slug: 'alkota-430xh', machine_model_code: '430XH', machine_name: 'Alkota 430XH Hot Water', status: 'compatible' },
      { machine_slug: 'alkota-5305a', machine_model_code: '5305A', machine_name: 'Alkota 5305A Cold', status: 'compatible' }
    ],
    image_url: null,
    price: 118.00,
    in_stock: true,
    featured: false,
    active: true,
    sort_order: 40
  },

  // ─── HOSE REELS ─────────────────────────────────────────────────────────────
  {
    id: 'att-reel-spring-50',
    part_number: 'HR-350',
    name: 'Industrial Spring-Return Self-Retracting Hose Reel (50ft)',
    slug: 'industrial-spring-return-hose-reel-50ft',
    tagline: 'Professional hose deployment and automatic safe retrieval.',
    description: 'Heavy-duty spring-return self-retracting hose reel constructed from galvanised pressed steel with a sealed precision swivel union rated for continuous high-pressure hot water service. Supplied without hose — compatible with standard 3/8" OD high-pressure hose. Wall, ceiling, or trolley mount.',
    category: 'hose-reels',
    applications: ['hose_management', 'multi_operator'],
    ratings: {
      pressure_max_bar: 275,
      temperature_max_c: 120,
      connection_size: '3/8" Swivel Inlet',
      weight_kg: 12.0
    },
    compatible_machines: [
      { machine_slug: 'alkota-430xh', machine_model_code: '430XH', machine_name: 'Alkota 430XH Hot Water', status: 'compatible' },
      { machine_slug: 'alkota-4358', machine_model_code: '4358', machine_name: 'Alkota 4358', status: 'compatible' },
      { machine_slug: 'alkota-5305a', machine_model_code: '5305A', machine_name: 'Alkota 5305A Cold', status: 'compatible' }
    ],
    image_url: null,
    price: 425.00,
    in_stock: true,
    featured: true,
    active: true,
    sort_order: 50
  },

  // ─── TRIGGER GUNS ────────────────────────────────────────────────────────────
  {
    id: 'att-gun-easypull',
    part_number: '10-151',
    name: 'Alkota Easy-Pull Industrial Trigger Gun',
    slug: 'alkota-easy-pull-trigger-gun',
    tagline: 'Engineered to reduce operator fatigue during 8-hour commercial wash shifts.',
    description: 'Proprietary design with reduced trigger hold-open force, balanced composite housing, and stainless ball valve seat. Rated up to 5000 PSI and 150°C — compatible with all hot and cold water Alkota pressure washers. The standard gun on most Alkota hot water skid and trailer units.',
    category: 'trigger-guns',
    applications: ['spray_control', 'multi_operator'],
    ratings: {
      pressure_max_bar: 345,
      temperature_max_c: 150,
      connection_size: '3/8" FPT Inlet, 1/4" FPT Outlet',
      weight_kg: 0.95
    },
    compatible_machines: [
      { machine_slug: 'alkota-430xh', machine_model_code: '430XH', machine_name: 'Alkota 430XH Hot Water', status: 'compatible' },
      { machine_slug: 'alkota-4358', machine_model_code: '4358', machine_name: 'Alkota 4358', status: 'compatible' },
      { machine_slug: 'alkota-216x4', machine_model_code: '216X4', machine_name: 'Alkota 216X4', status: 'compatible' },
      { machine_slug: 'alkota-5305a', machine_model_code: '5305A', machine_name: 'Alkota 5305A Cold', status: 'compatible' }
    ],
    image_url: '/assets/products/easy-pull-gun.png',
    price: 78.50,
    in_stock: true,
    featured: false,
    active: true,
    sort_order: 60
  },

  // ─── NOZZLES ─────────────────────────────────────────────────────────────────
  {
    id: 'att-nozzle-kit-qc',
    part_number: 'NZ-KIT-4',
    name: '4-Piece Colour-Coded Quick-Connect Nozzle Set (Stainless)',
    slug: '4-piece-colour-coded-nozzle-set',
    tagline: 'Red, Yellow, Green, White — the four core spray angles for every application.',
    description: 'Precision hardened stainless steel quick-connect nozzle set in 0°, 15°, 25°, and 40° spray patterns. Stainless steel orifice insert for corrosion resistance. Colour-coded polymer collar for fast pattern recognition during operation. Select orifice size based on machine flow rate and working pressure.',
    category: 'nozzles',
    applications: ['spray_control'],
    ratings: {
      pressure_max_bar: 345,
      temperature_max_c: 150,
      connection_size: '1/4" Male QC Push-Fit'
    },
    compatible_machines: [
      { machine_slug: 'alkota-430xh', machine_model_code: '430XH', machine_name: 'Alkota 430XH Hot Water', status: 'compatible', notes: 'Select size 04 orifice for rated output.' },
      { machine_slug: 'alkota-4358', machine_model_code: '4358', machine_name: 'Alkota 4358', status: 'compatible', notes: 'Select size 05 orifice for rated output.' },
      { machine_slug: 'alkota-5305a', machine_model_code: '5305A', machine_name: 'Alkota 5305A Cold', status: 'compatible' }
    ],
    image_url: null,
    price: 48.00,
    in_stock: true,
    featured: false,
    active: true,
    sort_order: 70
  },
  {
    id: 'att-nozzle-turbo',
    part_number: '15-500',
    name: 'Industrial Rotating Turbo Nozzle (035 Orifice / 5000 PSI)',
    slug: 'industrial-rotating-turbo-nozzle',
    tagline: 'Pencil-jet impact with wide-area fan coverage in a single rotating head.',
    description: 'Ceramic oscillating rotating nozzle that generates a rotating 0-degree pencil jet within a 25-degree cone pattern. Dramatically increases soil removal energy compared to a standard fan nozzle. Ideal for concrete cleaning, ingrained carbon, moss, and road film removal where a standard 25° tip is insufficient.',
    category: 'turbo-rotary',
    applications: ['spray_control', 'surface_cleaning'],
    ratings: {
      pressure_max_bar: 345,
      temperature_max_c: 120,
      connection_size: '1/4" Male QC Push-Fit',
      weight_kg: 0.42
    },
    compatible_machines: [
      { machine_slug: 'alkota-430xh', machine_model_code: '430XH', machine_name: 'Alkota 430XH Hot Water', status: 'compatible' },
      { machine_slug: 'alkota-4358', machine_model_code: '4358', machine_name: 'Alkota 4358', status: 'compatible' },
      { machine_slug: 'alkota-216x4', machine_model_code: '216X4', machine_name: 'Alkota 216X4', status: 'compatible' },
      { machine_slug: 'alkota-5305a', machine_model_code: '5305A', machine_name: 'Alkota 5305A Cold', status: 'compatible' }
    ],
    image_url: null,
    price: 88.00,
    in_stock: true,
    featured: false,
    active: true,
    sort_order: 80
  },

  // ─── FOAM LANCE ──────────────────────────────────────────────────────────────
  {
    id: 'att-foam-lance',
    part_number: 'FL-1200',
    name: 'Professional 1L Foam Lance with Adjustable Dilution',
    slug: 'professional-foam-lance-1l',
    tagline: 'Controlled foam application for maximum dwell time and chemical efficiency.',
    description: 'Pressure-fed downstream foam lance with 1-litre detergent bottle, adjustable foam-to-air ratio dial, and 0–100% concentration control. Generates dense creamy foam coverage on vehicle panels, machinery, and vertical surfaces. Uses low-pressure chemical nozzle to create venturi suction on trigger gun. Compatible with verified Alkota Hydrus detergent range.',
    category: 'foam-chemical-systems',
    applications: ['chemical_foam_application'],
    ratings: {
      pressure_min_bar: 30,
      pressure_max_bar: 200,
      temperature_max_c: 60,
      connection_size: '1/4" Male QC Input',
      weight_kg: 0.55
    },
    compatible_machines: [
      { machine_slug: 'alkota-430xh', machine_model_code: '430XH', machine_name: 'Alkota 430XH Hot Water', status: 'compatible', notes: 'Use cold downstream application for maximum foam generation. Avoid steam mode.' },
      { machine_slug: 'alkota-5305a', machine_model_code: '5305A', machine_name: 'Alkota 5305A Cold', status: 'compatible' },
      { machine_slug: 'alkota-216x4', machine_model_code: '216X4', machine_name: 'Alkota 216X4', status: 'compatible' }
    ],
    related_chemical_slugs: ['tr-440-farm-soap', 'grease-cutter-de-703', 'alkota-auto-shampoo'],
    image_url: null,
    price: 68.00,
    in_stock: true,
    featured: true,
    active: true,
    sort_order: 90
  },

  // ─── DRAIN JETTER ────────────────────────────────────────────────────────────
  {
    id: 'att-drain-25m',
    part_number: 'DJ-25',
    name: '25m Commercial Drain Jetter Hose with Penetrating Nozzle',
    slug: '25m-commercial-drain-jetter-hose',
    tagline: 'Commercial drain and pipe scouring — propelled by your existing pressure washer.',
    description: 'Heavy-duty 1/8" internal bore commercial-grade drain jetter hose, 25 metres in length, with precision front-jetting and rear-propulsion nozzle. Self-propels into drain pipes as rear jets flush debris back. For commercial drain maintenance, yard gully clearing, and trade pipe scouring. Must be used with a pressure washer rated at a minimum of 120 BAR.',
    category: 'drain-pipe-cleaning',
    applications: ['drain_pipe_cleaning'],
    ratings: {
      pressure_min_bar: 120,
      pressure_max_bar: 250,
      flow_min_lpm: 8,
      temperature_max_c: 80,
      connection_size: '1/4" FPT Inlet',
      hose_length_m: 25,
      weight_kg: 3.8
    },
    compatible_machines: [
      { machine_slug: 'alkota-430xh', machine_model_code: '430XH', machine_name: 'Alkota 430XH Hot Water', status: 'compatible' },
      { machine_slug: 'alkota-4358', machine_model_code: '4358', machine_name: 'Alkota 4358', status: 'compatible' },
      { machine_slug: 'alkota-5305a', machine_model_code: '5305A', machine_name: 'Alkota 5305A Cold', status: 'compatible', notes: 'Must verify minimum 120 BAR at rated flow before use.' },
      { machine_slug: 'alkota-216x4', machine_model_code: '216X4', machine_name: 'Alkota 216X4', status: 'technical_review', notes: 'Verify 120 BAR minimum output at operating flow.', limitation_reason: 'Minimum pressure requirement must be confirmed against machine rating.' }
    ],
    image_url: null,
    price: 185.00,
    in_stock: true,
    featured: true,
    active: true,
    sort_order: 100
  },

  // ─── TELESCOPIC LANCE ────────────────────────────────────────────────────────
  {
    id: 'att-lance-tele-4m',
    part_number: 'TL-400',
    name: '4-Metre Two-Section Telescopic Cleaning Lance',
    slug: '4-metre-telescopic-lance',
    tagline: 'Clean vehicle roofs and elevated surfaces from ground level.',
    description: 'Two-section telescopic aluminium and stainless steel lance extending from 1.8 to 4.0 metres. Adjustable trigger handle lock for continuous spray, 360-degree rotating nozzle holder, and comfortable rubber grip. Allows cleaning of vehicle cab roofs, building soffits, curtain-siders, and elevated plant without access equipment. Does not substitute site-specific height-access risk assessment.',
    category: 'extension-telescopic',
    applications: ['long_reach_height'],
    ratings: {
      pressure_max_bar: 200,
      temperature_max_c: 95,
      connection_size: '1/4" FPT Inlet at Handle',
      weight_kg: 2.2
    },
    compatible_machines: [
      { machine_slug: 'alkota-430xh', machine_model_code: '430XH', machine_name: 'Alkota 430XH Hot Water', status: 'compatible' },
      { machine_slug: 'alkota-4358', machine_model_code: '4358', machine_name: 'Alkota 4358', status: 'compatible' },
      { machine_slug: 'alkota-5305a', machine_model_code: '5305A', machine_name: 'Alkota 5305A Cold', status: 'compatible' }
    ],
    image_url: null,
    price: 225.00,
    in_stock: true,
    featured: false,
    active: true,
    sort_order: 110
  }
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

export function getAttachmentBySlug(slug: string): Attachment | undefined {
  return VERIFIED_ATTACHMENTS.find((a) => a.slug === slug);
}

export function getAttachmentsByApplication(appId: string): Attachment[] {
  return VERIFIED_ATTACHMENTS.filter((a) =>
    a.applications.includes(appId as any)
  );
}

export function getAttachmentsByCategory(categorySlug: string): Attachment[] {
  return VERIFIED_ATTACHMENTS.filter((a) => a.category === categorySlug);
}

export function getAttachmentsByMachine(machineSlug: string): Attachment[] {
  return VERIFIED_ATTACHMENTS.filter((a) =>
    a.compatible_machines?.some(
      (c) => c.machine_slug === machineSlug && c.status !== 'not_compatible'
    )
  );
}

export function checkAttachmentCompatibility(
  attachmentSlug: string,
  machineSlug: string
) {
  const att = getAttachmentBySlug(attachmentSlug);
  if (!att) return null;
  return (
    att.compatible_machines?.find((c) => c.machine_slug === machineSlug) ?? null
  );
}
