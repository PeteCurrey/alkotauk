export interface RealBuildSpecification {
  label: string;
  value: string;
}

export interface RealBuildStep {
  title: string;
  desc: string;
  component: string;
}

export interface RealBuild {
  slug: string;
  title: string;
  tagline: string;
  clientDescription: string;
  application: string;
  sectorSlug: string;
  format: 'open-deck' | 'enclosed';
  featured: boolean;
  heroImage: string;
  galleryImages: string[];
  specs: RealBuildSpecification[];
  theBrief: string;
  operationalChallenge: string;
  theSystem: string;
  engineeringSolutions: string[];
  annotatedWalkthrough: RealBuildStep[];
  machineCode: string;
  machineName: string;
  operatorCount: 1 | 2;
  waterCapacityLitres: number;
  recoveryType: 'none' | 'vacuum-recovery' | 'vfs-filtration' | 'closed-loop-recycle';
  chassisType: string;
  mamKg: number;
  dryWeightKg: number;
  wetWeightKg: number;
  configuratorParams: {
    format: 'open-deck' | 'enclosed';
    chassis_id: string;
    machine_id: string;
    water_storage_id: string;
    recovery_option_id: string;
    operator_count: 1 | 2;
    preset?: string;
  };
}

export const REAL_BUILDS: RealBuild[] = [
  {
    slug: 'twin-operator-haulage-depot-rig',
    title: 'Twin-Operator Haulage Depot Washdown Rig',
    tagline: 'High-volume 2-operator hot water system cleaning 40+ articulated tractor units and curtain trailers daily',
    clientDescription: 'Major Northern UK Distribution & Haulage Operator (350+ Fleet)',
    application: 'Commercial Vehicle & Haulage Fleet',
    sectorSlug: 'fleet',
    format: 'open-deck',
    featured: true,
    heroImage: '/assets/products/trailer-single.png',
    galleryImages: [
      '/assets/products/trailer-single.png',
      '/assets/products/4305xd4.png',
      '/assets/products/ged-12v-skid.png'
    ],
    specs: [
      { label: 'Chassis Type', value: 'UK Tandem Axle 2,700kg MAM (ECWVTA Type Approved)' },
      { label: 'Cleaning Machine', value: 'Alkota 4305-GED High-Flow Hot Water Pressure Washer' },
      { label: 'Working Pressure', value: '241 Bar (3,500 PSI)' },
      { label: 'Water Flow Output', value: '17.0 LPM (Balanced dual-gun split: 8.5 LPM per operator)' },
      { label: 'Operating Temp', value: 'Up to 130°C Hot Degreasing Water' },
      { label: 'Water Reservoir', value: '1,500L Multi-Baffled MDPE Poly Reservoir' },
      { label: 'Hose Architecture', value: '2 × 50m (100m total) 12V Electric Auto-Rewind Reels' },
      { label: 'Fuel Storage', value: '80L Bunded Aluminium Long-Range Diesel Tank' },
      { label: 'Lighting', value: 'Telescopic 2.5m 12V High-Output LED Mast' },
      { label: 'Tare / MAM', value: 'Tare 1,020 kg · Wet 2,520 kg · MAM 2,700 kg (180kg safety margin)' }
    ],
    theBrief:
      'The client operated a busy 24-hour haulage depot servicing 40 to 60 articulated tractor units, refrigerated trailers, and curtain-siders every day. Their existing fixed wash pad suffered constant bottlenecks, causing vehicle downtime during driver shift changeovers. They required a mobile, high-pressure hot water rig capable of simultaneously supporting two operators working on opposite sides of a 16.5m truck and trailer combination, with sufficient onboard water to complete multi-vehicle cleaning sessions without constant hydrant re-fills.',
    operationalChallenge:
      'Splitting single-machine high-pressure water between two simultaneous operators can cause severe pressure fluctuations and burner cycling if the hydraulic manifold and burner coil are undersized. Furthermore, moving 1,500 litres of water (1.5 tonnes) safely on depot roads requires precise baffle engineering and axle load calculations to prevent vehicle surge under braking.',
    theSystem:
      'Alkota UK designed and assembled a bespoke open-deck tandem axle trailer centered around the Alkota 4305-GED industrial hot water skid. A heavy-duty Vanguard 18HP V-Twin engine powers a high-displacement triplex ceramic plunger pump. Water is delivered from a central 1,500L baffled tank through a custom brass flow-balancing Y-manifold, feeding two independent 12V electric auto-rewind hose reels with 50m of high-temp wire-braided hose each.',
    engineeringSolutions: [
      'Engineered hydraulic flow-balancing manifold preventing pressure drop when second trigger gun is pulled',
      'High-capacity down-draft combustion chamber maintaining 130°C output across full 17.0 LPM total demand',
      'Rotomoulded triple-baffled water tank centered precisely over the twin tandem axles for neutral 75kg tongue weight',
      'Dual 12V electric rewind reels wired into the Vanguard alternator charging circuit with auxiliary AGM buffer battery',
      'Full UK IVA road certification enabling legal road transit between four regional depot hubs'
    ],
    annotatedWalkthrough: [
      {
        title: '01 — Primary Power & Pump Unit',
        desc: 'Alkota 4305-GED skid with Briggs & Stratton Vanguard commercial V-Twin engine and belt-driven triplex plunger pump running at a low 1,450 RPM for continuous 10-hour daily duty cycles.',
        component: 'Alkota 4305-GED Skid'
      },
      {
        title: '02 — Hydro-Insulated Heating Coil',
        desc: 'Schedule 80 cold-rolled seamless steel pipe hydro-insulated down-draft burner delivering instantaneous high-pressure hot water and backed by Alkota’s 7-year warranty.',
        component: 'Schedule 80 Down-Draft Burner'
      },
      {
        title: '03 — Baffled 1,500L Reservoir System',
        desc: 'Virgin MDPE tank with internal anti-surge baffle walls and low-level float switch that automatically cuts burner ignition if water supply is depleted.',
        component: '1,500L Baffled Water Tank'
      },
      {
        title: '04 — Dual Electric Hose Management',
        desc: 'Two heavy-gauge steel hose reels with 12V high-torque electric recovery motors, enabling single-touch recovery of 50m hoses in under 20 seconds.',
        component: 'Dual Electric Rewind Reels'
      }
    ],
    machineCode: '4305-GED-12V',
    machineName: 'Alkota 4305-GED High-Flow Hot Water Skid',
    operatorCount: 2,
    waterCapacityLitres: 1500,
    recoveryType: 'none',
    chassisType: 'chassis-tandem-2700-open',
    mamKg: 2700,
    dryWeightKg: 1020,
    wetWeightKg: 2520,
    configuratorParams: {
      format: 'open-deck',
      chassis_id: 'chassis-tandem-2700-open',
      machine_id: 'machine-ged-12v-4305',
      water_storage_id: 'tank-1500l-baffled',
      recovery_option_id: 'recovery-none',
      operator_count: 2,
      preset: 'fleet-logistics'
    }
  },
  {
    slug: 'enclosed-closed-loop-recovery-plant-room',
    title: 'Closed-Loop Environmental Recovery Plant Room',
    tagline: 'Zero-discharge mobile wash plant combining 4,000 PSI cleaning, VACGD vacuum containment, and 5-stage VFS water recycling',
    clientDescription: 'Specialist Environmental Contractor for Marine Ports & Chemical Sites',
    application: 'Environmental Port & Industrial Plant Maintenance',
    sectorSlug: 'environmental',
    format: 'enclosed',
    featured: true,
    heroImage: '/assets/products/stationary-gas-fired.png',
    galleryImages: [
      '/assets/products/stationary-gas-fired.png',
      '/assets/products/ded-big-boy.png',
      '/assets/products/ged-12v-skid.png'
    ],
    specs: [
      { label: 'Chassis Type', value: 'UK Heavy Tandem 3,500kg MAM Enclosed Box Body (IVA Approved)' },
      { label: 'Cleaning Machine', value: 'Alkota DED Heavy Diesel Skid (Kubota 24HP Liquid-Cooled Diesel)' },
      { label: 'Working Pressure', value: '275 Bar (4,000 PSI)' },
      { label: 'Water Flow Output', value: '19.0 LPM' },
      { label: 'Water Treatment', value: 'Alkota 8-VFS-1 Negative-Void Vacuum Filtration Skid' },
      { label: 'Recovery Blower', value: 'Alkota VACGD Positive-Displacement Recovery System (100m reach)' },
      { label: 'Water Reservoir', value: '2,000L Interconnected Twin Baffled Poly Reservoirs' },
      { label: 'Auxiliary Power', value: '10.0 kVA 400V/230V Super-Silent Kubota Diesel Generator' },
      { label: 'Environmental Target', value: '<5 mg/L Hydrocarbon Threshold (BS EN 858 & EA Compliant)' },
      { label: 'Tare / MAM', value: 'Tare 1,480 kg · Wet 3,480 kg · MAM 3,500 kg' }
    ],
    theBrief:
      'The client required a fully self-contained mobile cleaning rig to perform heavy degreasing on dockside marine loaders, offshore containers, and petrochemical bunds. Because these sites operate in ecologically sensitive coastal environments, zero wash-water runoff is permitted to enter surface drains or the sea. The system had to capture 100% of surface wash-water, filter out heavy oils and particulate matter, and recycle clean water back into the pressure washer for closed-loop operation without external mains or sewer connection.',
    operationalChallenge:
      'Housing high-pressure washing machinery, an 80L diesel tank, a 10 kVA 3-phase generator, 2,000L water storage, and a multi-stage vacuum filtration plant within a single road-legal 3,500kg trailer requires rigorous weight auditing. Every kilogram of structure, pipework, and equipment was engineered to stay strictly within the 3,500kg MAM legal threshold with a full 2,000L water payload.',
    theSystem:
      'Alkota UK engineered an enclosed tandem-axle walk-in mobile plant room. An Alkota DED heavy diesel pressure washer running off Kubota industrial power provides 275 Bar cutting pressure. Wastewater is vacuum-recovered from flexible drive-over containment berms by an Alkota VACGD positive-displacement blower. Recovered slurry passes through an Alkota 8-VFS-1 negative-void continuous filtration chamber, removing suspended solids down to 20 microns and hydrocarbons via granular activated carbon canisters, returning crystal-clear water back to the 2,000L holding tanks.',
    engineeringSolutions: [
      'Complete closed-loop water treatment recycling up to 90% of process water on-site',
      'Single-fuel diesel operation: Kubota machine engine, burner, and 10kVA generator share a central 80L bunded fuel reservoir',
      'Heavy-duty acoustic insulation keeping noise levels below 68 dB(A) @ 7m for 24/7 port operation',
      'Internal 6000K LED workshop strip lighting and twin lockable aluminium tool chests for equipment security',
      'Full external corporate branding wrap and reflective high-visibility Chapter 8 highway markings'
    ],
    annotatedWalkthrough: [
      {
        title: '01 — Heavy Diesel Pressure Power',
        desc: 'Alkota DED series 4,000 PSI skid powered by an industrial 3-cylinder liquid-cooled Kubota diesel engine with low-vibration rubber isolation mounts.',
        component: 'Alkota DED Diesel Skid'
      },
      {
        title: '02 — VACGD High-Vacuum Extraction Blower',
        desc: 'Positive displacement blower developing 14 inches of mercury vacuum suction, pulling water and heavy sludge through 30m of 2" smooth-bore recovery hose.',
        component: 'VACGD Vacuum Recovery Unit'
      },
      {
        title: '03 — VFS-1 Negative-Void Filtration Chamber',
        desc: 'Patented vacuum filtration system pulling wastewater through moving filter media and granular activated carbon to remove emulsified oils down to <5 mg/L.',
        component: '8-VFS-1 Filtration Module'
      },
      {
        title: '04 — Twin Interconnected 2,000L Reservoirs',
        desc: 'Dual baffled poly tanks with low-level balance manifold and ultrasonic level sensors providing continuous fluid monitoring.',
        component: '2,000L Dual Reservoir'
      }
    ],
    machineCode: 'DED-4000-DIESEL',
    machineName: 'Alkota DED All-Diesel Single-Fuel Skid',
    operatorCount: 2,
    waterCapacityLitres: 2000,
    recoveryType: 'closed-loop-recycle',
    chassisType: 'chassis-tandem-3500-enclosed',
    mamKg: 3500,
    dryWeightKg: 1480,
    wetWeightKg: 3480,
    configuratorParams: {
      format: 'enclosed',
      chassis_id: 'chassis-tandem-3500-enclosed',
      machine_id: 'machine-ded-big-boy',
      water_storage_id: 'tank-2000l-dual-baffled',
      recovery_option_id: 'recovery-closed-loop-recycle',
      operator_count: 2,
      preset: 'environmental-closed-loop'
    }
  },
  {
    slug: 'compact-urban-highways-steam-rig',
    title: 'Compact Urban Highways & Graffiti Steam Rig',
    tagline: '155°C saturated wet steam single-axle rig for civic sanitation, graffiti removal, and chewing gum eradication without stone damage',
    clientDescription: 'Metropolitan Borough Council & Public Works Department',
    application: 'Municipal Highways, Town Centres & Public Realm',
    sectorSlug: 'municipal',
    format: 'open-deck',
    featured: true,
    heroImage: '/assets/products/steam-oil.png',
    galleryImages: [
      '/assets/products/steam-oil.png',
      '/assets/products/trailer-single.png'
    ],
    specs: [
      { label: 'Chassis Type', value: 'UK Single Axle 1,500kg MAM (Torsion Axle with Overrun Brakes)' },
      { label: 'Cleaning Machine', value: 'Alkota 325-CSH Wet Steam & Extreme Thermal Skid' },
      { label: 'Working Pressure', value: '172 Bar (2,500 PSI)' },
      { label: 'Water Flow Output', value: '11.4 LPM (Modulated thermal steam output)' },
      { label: 'Steam Temperature', value: '155°C Saturated Wet Steam at Nozzle' },
      { label: 'Water Reservoir', value: '500L Slimline Baffled Poly Reservoir' },
      { label: 'Towing Vehicle', value: 'Standard 3.5T Commercial Van (e.g. Ford Transit with 2,000kg braked capacity)' },
      { label: 'Water Protection', value: 'WRAS Approved Category 5 Air Gap Break Tank' },
      { label: 'Tare / MAM', value: 'Tare 620 kg · Wet 1,120 kg · MAM 1,500 kg (380kg payload margin)' }
    ],
    theBrief:
      'A metropolitan council needed an ultra-compact, agile mobile wash system capable of operating in pedestrianised high streets, historic civic squares, and narrow access lanes. The primary tasks included chewing gum removal, graffiti removal from sandstone and heritage brickwork, street furniture cleaning, and emergency cleaning of diesel spills on pedestrian paving. The system had to be legal to tow behind a standard municipal transit van without special heavy towing licenses.',
    operationalChallenge:
      'Using conventional 250 Bar pressure washers on heritage masonry causes destructive surface erosion and mortar blowout. High-temperature saturated wet steam (150°C+) melts chewing gum and releases paint polymers thermally using very low water volume, preserving delicate brickwork while preventing excessive water pooling in public footpaths.',
    theSystem:
      'Alkota UK constructed a compact single-axle open rig powered by the Alkota 325-CSH steam generator with a Honda GX390 petrol engine. A 500L slimline baffled water tank provides up to 1.5 hours of continuous steam cleaning per fill. An onboard 12V battery charging system powers the diesel burner without requiring an auxiliary generator, keeping the unit whisper-quiet and lightweight.',
    engineeringSolutions: [
      'Modulating steam valve generating 155°C wet vapour steam for chemical-free thermal degreasing',
      'Slimline poly tank design keeping trailer overall width to 1,950mm for narrow urban cycleway access',
      'Integrated WRAS Category 5 backflow air-gap system allowing direct connection to street hydrants',
      'Chequerplate locking vault housing specialised steam nozzles, rotary surface heads, and safety PPE',
      'Total wet weight of 1,120kg, comfortably towable by any standard municipal van'
    ],
    annotatedWalkthrough: [
      {
        title: '01 — High-Temperature Steam Generator',
        desc: 'Alkota 325-CSH with specialised ceramic-packed down-draft coil producing true 155°C saturated wet steam at 172 Bar.',
        component: '325-CSH Steam Skid'
      },
      {
        title: '02 — Low-Width Slimline Reservoir',
        desc: '500L UV-stabilised tank with longitudinal anti-slosh baffles and integrated inline sediment filtration.',
        component: '500L Slimline Tank'
      },
      {
        title: '03 — CAT 5 Air Gap Break Tank',
        desc: 'Complies with UK Water Supply Regulations 1999, preventing any possibility of contaminated backflow into drinking water mains.',
        component: 'WRAS CAT 5 Break Tank'
      },
      {
        title: '04 — Telescopic Scene Lighting',
        desc: 'Extendable LED mast powered from the Honda 12V charging circuit, illuminating night-shift graffiti removal in pedestrian precincts.',
        component: '12V LED Mast'
      }
    ],
    machineCode: '325-CSH-STEAM',
    machineName: 'Alkota 325-CSH Industrial Steam Generator',
    operatorCount: 1,
    waterCapacityLitres: 500,
    recoveryType: 'none',
    chassisType: 'chassis-single-1500-open',
    mamKg: 1500,
    dryWeightKg: 620,
    wetWeightKg: 1120,
    configuratorParams: {
      format: 'open-deck',
      chassis_id: 'chassis-single-1500-open',
      machine_id: 'machine-steam-oil-combo',
      water_storage_id: 'tank-500l-baffled',
      recovery_option_id: 'recovery-none',
      operator_count: 1,
      preset: 'highways-municipal'
    }
  },
  {
    slug: 'quarry-heavy-plant-diesel-rig',
    title: 'Quarry & Earthmoving Heavy Plant 4,000 PSI Rig',
    tagline: 'Extreme-duty single-fuel diesel rig engineered to strip hardened clay, grease, and bitumen from 50-tonne quarry excavators',
    clientDescription: 'Civil Earthmoving & Quarry Operations Contractor',
    application: 'Quarrying, Mining & Heavy Plant Hire',
    sectorSlug: 'construction',
    format: 'open-deck',
    featured: false,
    heroImage: '/assets/products/ded-big-boy.png',
    galleryImages: [
      '/assets/products/ded-big-boy.png',
      '/assets/products/trailer-single.png'
    ],
    specs: [
      { label: 'Chassis Type', value: 'UK Heavy-Duty Tandem 3,500kg MAM (Parabolic Leaf Springs & Shocks)' },
      { label: 'Cleaning Machine', value: 'Alkota DED-4000 Heavy Diesel Skid' },
      { label: 'Working Pressure', value: '275 Bar (4,000 PSI)' },
      { label: 'Water Flow Output', value: '19.0 LPM High Impact Velocity' },
      { label: 'Engine', value: '3-Cylinder Kubota Liquid-Cooled Heavy Industrial Diesel (24 HP)' },
      { label: 'Water Reservoir', value: '2,000L Dual Interconnected Baffled Poly Reservoirs' },
      { label: 'Hose Reach', value: '2 × 50m (100m) Wire-Braided Heavy-Duty Reels' },
      { label: 'Fuel Autonomy', value: '80L Central Diesel Tank (~12 Hours continuous duty)' },
      { label: 'Tare / MAM', value: 'Tare 1,180 kg · Wet 3,180 kg · MAM 3,500 kg (320kg reserve)' }
    ],
    theBrief:
      'Operating across aggressive limestone quarries and major motorway earthworks projects, the client needed to wash down 30-to-50-tonne excavators, bulldozers, and crushing plant in remote locations where neither electric power nor running water was available. Hardened clay, track compacted limestone aggregate, and hydraulic leaks required massive impact force combined with 100°C hot water degreasing.',
    operationalChallenge:
      'Quarry haul roads are unpaved, potholed, and steep. Standard rubber torsion axles struggle under 3.5 tonnes over rough terrain. The chassis had to incorporate heavy parabolic leaf spring suspension, commercial 14-inch high-load tyres, and structural steel gusseting to survive continuous off-highway punishment.',
    theSystem:
      'Alkota UK engineered an ultra-rugged open deck tandem chassis with parabolic leaf springs and oil-damped shock absorbers. The power unit is an Alkota DED skid powered by a 3-cylinder liquid-cooled Kubota industrial diesel engine. A massive 2,000L water tank allows extended cleaning shifts on remote extraction faces without returning to the depot for water.',
    engineeringSolutions: [
      'Heavy-duty parabolic leaf suspension with commercial shock absorbers for brutal quarry haul roads',
      '4,000 PSI @ 19.0 LPM delivers massive kinetic impact for dislodging packed clay and track muck',
      'Unified single-fuel architecture: Kubota diesel engine and Alkota burner share single 80L diesel fuel supply',
      'Dual stacked 50m hose reels allowing operators to walk completely around massive 50T excavators',
      'Lockable chequerplate tool chests housing turbo nozzles, scrapers, and extension lances'
    ],
    annotatedWalkthrough: [
      {
        title: '01 — Kubota 3-Cylinder Diesel Power',
        desc: 'Industrial liquid-cooled diesel engine designed for 10,000+ hour operating lifetime under harsh dusty conditions.',
        component: 'Kubota Diesel Engine'
      },
      {
        title: '02 — 4,000 PSI Triplex Plunger Pump',
        desc: 'Low-RPM ceramic triplex pump delivering 19 LPM of cutting flow with stainless steel valve seats and brass manifold.',
        component: 'Industrial Triplex Pump'
      },
      {
        title: '03 — Parabolic Suspension System',
        desc: 'Twin heavy-duty axles with multi-leaf parabolic springs, equalising rocker beams, and automotive shock absorbers.',
        component: 'Parabolic Leaf Axles'
      },
      {
        title: '04 — 2,000L Heavy Reservoir System',
        desc: 'Dual interconnected baffled tanks with low center-of-gravity mounting across the axle bed.',
        component: '2,000L Reservoir'
      }
    ],
    machineCode: 'DED-4000-DIESEL',
    machineName: 'Alkota DED Heavy Diesel Skid',
    operatorCount: 2,
    waterCapacityLitres: 2000,
    recoveryType: 'none',
    chassisType: 'chassis-tandem-3500-open',
    mamKg: 3500,
    dryWeightKg: 1180,
    wetWeightKg: 3180,
    configuratorParams: {
      format: 'open-deck',
      chassis_id: 'chassis-tandem-3500-open',
      machine_id: 'machine-ded-big-boy',
      water_storage_id: 'tank-2000l-dual-baffled',
      recovery_option_id: 'recovery-none',
      operator_count: 2,
      preset: 'heavy-plant-construction'
    }
  }
];
