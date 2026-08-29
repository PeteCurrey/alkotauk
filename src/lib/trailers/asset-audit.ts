export interface TrailerAssetAuditItem {
  id: string;
  filePath: string;
  category: 'trailer-open' | 'trailer-enclosed' | 'machine' | 'component' | 'industry' | 'archive';
  subject: string;
  genuineAlkota: boolean;
  genuineAlkotaUk: boolean;
  era: 'current' | 'historic' | 'concept-preview';
  orientation: 'landscape' | 'portrait' | 'square' | 'transparent-cutout';
  quality: 'high' | 'medium' | 'archive';
  currentUsage: string[];
  recommendedRole: string;
  altText: string;
  caption?: string;
}

export const TRAILER_ASSET_AUDIT: TrailerAssetAuditItem[] = [
  {
    id: 'ast-01',
    filePath: '/assets/products/trailer-single.png',
    category: 'trailer-open',
    subject: 'Alkota Single-Axle Highway Open-Deck Trailer Rig with Baffled Poly Tank, 12V Hose Reel, and Hot Water Skid',
    genuineAlkota: true,
    genuineAlkotaUk: true,
    era: 'current',
    orientation: 'transparent-cutout',
    quality: 'high',
    currentUsage: ['/trailers', '/trailers/open', '/trailers/configure', '/trailers/builds', '/trailers/applications'],
    recommendedRole: 'Primary Open-Deck Visual & Configurator Base Layer',
    altText: 'Alkota UK highway-certified single-axle open-deck pressure washer trailer with integrated water reservoir and hose reel',
    caption: 'Alkota UK single-axle turnkey mobile cleaning plant.'
  },
  {
    id: 'ast-02',
    filePath: '/assets/products/stationary-gas-fired.png',
    category: 'trailer-enclosed',
    subject: 'Alkota Industrial Enclosed Cleaning Unit / Plant Room Housing Structure',
    genuineAlkota: true,
    genuineAlkotaUk: true,
    era: 'current',
    orientation: 'transparent-cutout',
    quality: 'high',
    currentUsage: ['/trailers', '/trailers/enclosed', '/trailers/recovery', '/trailers/builds/enclosed-closed-loop-recovery-plant-room'],
    recommendedRole: 'Enclosed Plant Room Visual & Recovery Architecture Visual',
    altText: 'Alkota enclosed mobile cleaning system housing with weather-resistant insulated panels and lockable security doors',
    caption: 'Enclosed mobile plant room architecture protecting high-value cleaning and recovery machinery.'
  },
  {
    id: 'ast-03',
    filePath: '/assets/products/ged-12v-skid.png',
    category: 'machine',
    subject: 'Alkota GED 12V Commercial Petrol Hot Water Pressure Washer Skid',
    genuineAlkota: true,
    genuineAlkotaUk: true,
    era: 'current',
    orientation: 'transparent-cutout',
    quality: 'high',
    currentUsage: ['/trailers/configure', '/trailers/open', '/trailers/builds/twin-operator-haulage-depot-rig'],
    recommendedRole: 'Machine Component & Skid Anatomy Closeup',
    altText: 'Alkota GED 12V petrol hot water pressure washer skid unit with Schedule 80 down-draft burner',
    caption: 'Alkota GED 12V industrial skid delivering instantaneous hot water up to 130°C.'
  },
  {
    id: 'ast-04',
    filePath: '/assets/products/4305xd4.png',
    category: 'machine',
    subject: 'Alkota 4305-GED High-Flow Commercial Hot Water Skid (17.0 LPM @ 240 Bar)',
    genuineAlkota: true,
    genuineAlkotaUk: true,
    era: 'current',
    orientation: 'transparent-cutout',
    quality: 'high',
    currentUsage: ['/trailers/multi-operator', '/trailers/builds/twin-operator-haulage-depot-rig'],
    recommendedRole: 'Multi-Operator High-Flow Machine Spotlight',
    altText: 'Alkota 4305 high-flow hot water pressure washer with Vanguard 18HP V-Twin engine for dual-gun operation',
    caption: 'High-displacement 17 LPM pump and 350,000 BTU burner for true simultaneous dual-operator demand.'
  },
  {
    id: 'ast-05',
    filePath: '/assets/products/ded-big-boy.png',
    category: 'machine',
    subject: 'Alkota DED All-Diesel Single-Fuel Heavy Industrial Skid (Kubota 24HP Liquid-Cooled Diesel)',
    genuineAlkota: true,
    genuineAlkotaUk: true,
    era: 'current',
    orientation: 'transparent-cutout',
    quality: 'high',
    currentUsage: ['/trailers/builds/quarry-heavy-plant-diesel-rig', '/trailers/applications/construction'],
    recommendedRole: 'Quarry & Heavy Plant Single-Fuel Diesel Power Core',
    altText: 'Alkota DED 4,000 PSI industrial diesel pressure washer powered by a 3-cylinder liquid-cooled Kubota engine',
    caption: 'Single-fuel Kubota diesel architecture sharing fuel with the burner for zero-petrol site compliance.'
  },
  {
    id: 'ast-06',
    filePath: '/assets/products/325csh.png',
    category: 'machine',
    subject: 'Alkota 325-CSH Extreme Thermal Saturated Steam Generator (155°C Wet Steam)',
    genuineAlkota: true,
    genuineAlkotaUk: true,
    era: 'current',
    orientation: 'transparent-cutout',
    quality: 'high',
    currentUsage: ['/trailers/applications/municipal', '/trailers/builds/compact-urban-highways-steam-rig'],
    recommendedRole: 'Municipal Gum & Graffiti Thermal Steam Powerplant',
    altText: 'Alkota 325-CSH saturated wet steam generator for chemical-free civic stone sanitisation',
    caption: '155°C saturated wet steam dissolving chewing gum and graffiti polymers without masonry abrasion.'
  },
  {
    id: 'ast-07',
    filePath: '/assets/products/industrial-pump.png',
    category: 'component',
    subject: 'Alkota Ceramic Triplex Plunger Pump Assembly with Brass Manifold and Stainless Steel Valves',
    genuineAlkota: true,
    genuineAlkotaUk: true,
    era: 'current',
    orientation: 'transparent-cutout',
    quality: 'high',
    currentUsage: ['/trailers/configure', '/service/trailers'],
    recommendedRole: 'Hydraulic Component Inspection & Service Deep-Dive',
    altText: 'Alkota commercial triplex plunger pump with solid ceramic plungers and forged brass head',
    caption: 'Low-RPM ceramic triplex plunger pump engineered for 10,000+ hour industrial duty cycles.'
  },
  {
    id: 'ast-08',
    filePath: '/assets/products/high-pressure-hose.png',
    category: 'component',
    subject: 'Double Wire-Braided High-Temperature High-Pressure Hose Assembly',
    genuineAlkota: true,
    genuineAlkotaUk: true,
    era: 'current',
    orientation: 'transparent-cutout',
    quality: 'high',
    currentUsage: ['/trailers/open', '/trailers/configure'],
    recommendedRole: 'Hose & Reel Management Closeup',
    altText: 'Double wire-braided oil-resistant high-pressure hose rated to 400 Bar and 150°C',
    caption: 'Heavy-gauge wire-braided hose designed for continuous abrasive contact on concrete yard surfaces.'
  },
  {
    id: 'ast-09',
    filePath: '/assets/products/trigger-gun.png',
    category: 'component',
    subject: 'Heavy-Duty Industrial Insulated Trigger Gun & Vented Lance Assembly',
    genuineAlkota: true,
    genuineAlkotaUk: true,
    era: 'current',
    orientation: 'transparent-cutout',
    quality: 'high',
    currentUsage: ['/trailers/multi-operator', '/trailers/configure'],
    recommendedRole: 'Operator Interface & Ergonomics Showcase',
    altText: 'Alkota industrial insulated high-pressure trigger gun and stainless steel spray wand',
    caption: 'Ergonomic low-fatigue trigger gun rated for 300 Bar hot water operation.'
  },
  {
    id: 'ast-10',
    filePath: '/assets/products/whirl-away-surface-cleaner.png',
    category: 'component',
    subject: 'Alkota Rotary Flatwork Surface Cleaner Tool with Dual Spray Bar',
    genuineAlkota: true,
    genuineAlkotaUk: true,
    era: 'current',
    orientation: 'transparent-cutout',
    quality: 'high',
    currentUsage: ['/trailers/applications/contract-cleaning', '/trailers/configure'],
    recommendedRole: 'Specialist Flatwork & Paving Tool Callout',
    altText: 'Alkota stainless steel rotary flatwork surface cleaner for high-speed block paving and concrete washing',
    caption: 'Rotary surface cleaner cleaning up to 15 square metres per minute with zero operator streaking.'
  },
  {
    id: 'ast-11',
    filePath: '/assets/industries/fleet.png',
    category: 'industry',
    subject: 'Commercial Articulated Tractor Units and Logistics Distribution Yard Context',
    genuineAlkota: false,
    genuineAlkotaUk: false,
    era: 'current',
    orientation: 'landscape',
    quality: 'high',
    currentUsage: ['/trailers/applications/fleet'],
    recommendedRole: 'Commercial Fleet Application Hero & Context',
    altText: 'Commercial haulage logistics fleet depot with articulated trucks and distribution bays'
  },
  {
    id: 'ast-12',
    filePath: '/assets/industries/construction.png',
    category: 'industry',
    subject: 'Heavy Excavator and Civil Engineering Quarry Site Environment',
    genuineAlkota: false,
    genuineAlkotaUk: false,
    era: 'current',
    orientation: 'landscape',
    quality: 'high',
    currentUsage: ['/trailers/applications/construction'],
    recommendedRole: 'Construction Plant Application Hero & Context',
    altText: 'Heavy 50-tonne excavator on civil engineering construction site'
  },
  {
    id: 'ast-13',
    filePath: '/assets/industries/agriculture.png',
    category: 'industry',
    subject: 'High-Horsepower Farm Tractor in Agricultural Yard Context',
    genuineAlkota: false,
    genuineAlkotaUk: false,
    era: 'current',
    orientation: 'landscape',
    quality: 'high',
    currentUsage: ['/trailers/applications/agriculture'],
    recommendedRole: 'Agricultural Washdown Application Hero & Context',
    altText: 'Agricultural tractor and farming machinery in rural farm yard'
  },
  {
    id: 'ast-14',
    filePath: '/assets/industries/waste-management.png',
    category: 'industry',
    subject: 'Municipal Utilities, Waste Treatment & Environmental Water Infrastructure',
    genuineAlkota: false,
    genuineAlkotaUk: false,
    era: 'current',
    orientation: 'landscape',
    quality: 'high',
    currentUsage: ['/trailers/applications/utilities'],
    recommendedRole: 'Utilities & Critical Infrastructure Application Context',
    altText: 'Industrial water processing facility and utilities environmental infrastructure'
  }
];

export interface MissingAssetEntry {
  route: string;
  section: string;
  requiredShot: string;
  orientation: 'landscape' | 'portrait' | 'cutout';
  aspectRatio: string;
  priority: 'critical' | 'high' | 'medium';
  notes: string;
}

export const MISSING_ASSET_REGISTER: MissingAssetEntry[] = [
  {
    route: '/trailers/enclosed',
    section: 'Hero & Exterior Header',
    requiredShot: 'Wide-angle 3/4 front view of fully enclosed Alkota branded box trailer with rear doors open showing interior plant room',
    orientation: 'landscape',
    aspectRatio: '16:9',
    priority: 'high',
    notes: 'Current page uses stationary industrial unit cutout with dark background. Genuine trailer photo will enhance realism.'
  },
  {
    route: '/trailers/multi-operator',
    section: 'In-Field Operation',
    requiredShot: 'Two operators in hi-vis PPE simultaneously washing opposite sides of an HGV using twin high-pressure lances from one trailer',
    orientation: 'landscape',
    aspectRatio: '16:9',
    priority: 'high',
    notes: 'Visually demonstrates the twin-gun proposition in an active commercial depot environment.'
  },
  {
    route: '/trailers/recovery',
    section: 'Closed-Loop Filtration Module',
    requiredShot: 'Close-up photograph of Alkota 8-VFS-1 filtration chamber with moving media roll and carbon canister installation inside trailer bed',
    orientation: 'landscape',
    aspectRatio: '4:3',
    priority: 'medium',
    notes: 'Provides physical proof of the <5 mg/L hydrocarbon negative-void filtration hardware.'
  },
  {
    route: '/service/trailers',
    section: 'Workshop & Inspection',
    requiredShot: 'Alkota UK service technician performing descaling and unloader valve calibration on a trailer rig inside the UK workshop',
    orientation: 'landscape',
    aspectRatio: '16:9',
    priority: 'medium',
    notes: 'Reinforces the "The Build is Day One" UK service capability.'
  }
];

export const FUTURE_PHOTOGRAPHY_SHOT_LIST = {
  exterior: [
    'Front 3/4 full rig including tow hitch and jockey wheel',
    'Rear 3/4 showing hose reels, roller fairleads, and lighting bar',
    'True side elevation on neutral tarmac for configurator rendering',
    'Low-angle hero shot with tow vehicle hitched in industrial depot',
    'Overhead 45-degree angle showing internal deck layout and water tank mounting'
  ],
  interior: [
    'Full walk-in interior view with 6000K LED ceiling lighting illuminated',
    'Engine and machine isolation mounts bolted into structural chassis',
    'Through-wall hose fairleads with hoses extended 20m out',
    'Lockable tool chests and lance brackets mounted against bulkheads',
    'Electrical breaker panel, generator transfer switch, and battery buffer bank'
  ],
  details: [
    'Schedule 80 hydro-insulated coil casing and down-draft burner assembly',
    'Ceramic triplex plunger pump head with pressure gauge and unloader valve',
    'Brass flow-balancing Y-manifold for dual-operator setups',
    'WRAS Category 5 air-gap break tank with float mechanism',
    'Aluminium chequerplate fabrication welding and chassis galvanising finish'
  ],
  operational: [
    'Single operator washing 44T articulated tractor unit in logistics yard',
    'Two operators simultaneously washing curtain-sider on opposite flanks',
    'Steam lance removing chewing gum from civic granite paving (155°C vapour visible)',
    'Drive-over vinyl containment berm with VACGD recovery suction running',
    'Water tank refill from commercial hydrant via CAT 5 break tank'
  ],
  buildProcess: [
    'Raw laser-cut and galvanised steel trailer chassis on workshop build bay',
    'Mounting and bolting Alkota machine skid with rubber vibration dampening',
    'Plumbing stainless steel high-pressure pipework and brass manifolds',
    '12V DC and 230V electrical wiring loom routing inside protective conduit',
    'Factory pressure, flow, burner temperature, and overrun brake sign-off testing'
  ]
};
