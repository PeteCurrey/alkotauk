export interface ApplicationEngineeringFactor {
  title: string;
  desc: string;
  importance: 'critical' | 'recommended' | 'optional';
}

export interface ApplicationSection {
  slug: string;
  title: string;
  heroHeadline: string;
  tagline: string;
  industryCategory: string;
  heroImage: string;
  theOperation: string;
  theChallenge: string;
  theSystemArchitecture: string;
  keyEngineeringFactors: ApplicationEngineeringFactor[];
  recommendedFormat: 'open-deck' | 'enclosed';
  recommendedMachine: string;
  recommendedWaterLitres: number;
  recommendedOperators: 1 | 2;
  recommendedRecovery: string;
  conceptualConfigSummary: {
    format: string;
    machine: string;
    water: string;
    power: string;
    recovery: string;
    operators: string;
    estimatedMAM: string;
  };
  configuratorPresetSlug: string;
  deepLinkQuery: string;
  faqs: { q: string; a: string }[];
}

export const TRAILER_APPLICATIONS: ApplicationSection[] = [
  {
    slug: 'fleet',
    title: 'Commercial Fleet & Haulage Depots',
    heroHeadline: 'KEEP 40-FOOT FLEETS CLEAN. ON SCHEDULE.',
    tagline: 'High-throughput mobile wash systems engineered for HGV tractor units, curtain trailers, buses, and distribution depots.',
    industryCategory: 'Transport & Logistics',
    heroImage: '/assets/industries/fleet.png',
    theOperation:
      'Commercial fleet washdown encompasses articulated HGVs, refrigerated box trailers, local delivery vans, municipal refuse vehicles, and passenger coaches. Cleaning cycles must remove stubborn electrostatic road film, heavy diesel particulate soot, winter road salt, and grease from chassis pivot points, 5th wheels, and curtain sides without causing fleet schedule delays.',
    theChallenge:
      'Fixed drive-through wash pads create massive scheduling bottlenecks during driver shift changeovers. Furthermore, cold water pressure washers fail to dissolve diesel soot and road film without massive detergent overdosing. Transport operators need a fast, mobile hot water system capable of cleaning parked trucks directly in their bays across sprawling logistics yards.',
    theSystemArchitecture:
      'An open or enclosed tandem-axle trailer rig equipped with a high-flow Alkota hot water skid (17.0+ LPM @ 240 Bar) and an engineered flow-splitting Y-manifold. Two operators work simultaneously from 50m electric auto-rewind hose reels on opposite sides of the vehicle, cutting wash time per 44-tonne truck from 40 minutes down to 18 minutes.',
    keyEngineeringFactors: [
      {
        title: 'Water Flow Over Pure Pressure',
        desc: '17 to 19 LPM delivers the kinetic flushing mass required to quickly carry away dissolved road film from large 40-foot curtain sides.',
        importance: 'critical'
      },
      {
        title: 'Hot Water Degreasing (85°C–120°C)',
        desc: 'Thermal energy breaks chemical bond of traffic film and greasy 5th wheel deposits with 60% less chemical usage.',
        importance: 'critical'
      },
      {
        title: 'Dual-Operator Balanced Hydraulics',
        desc: 'Dual trigger guns require specialised manifold and burner coil engineering to prevent pressure sag during simultaneous operation.',
        importance: 'critical'
      },
      {
        title: '1,500L–2,000L Baffled Water Capacity',
        desc: 'Provides 60–90 minutes of continuous trigger washing, allowing 3 to 5 full articulated rigs to be cleaned per tank fill.',
        importance: 'recommended'
      }
    ],
    recommendedFormat: 'open-deck',
    recommendedMachine: 'Alkota 4305-GED High-Flow Hot Water Skid',
    recommendedWaterLitres: 1500,
    recommendedOperators: 2,
    recommendedRecovery: 'Optional VACGD Vacuum Recovery',
    conceptualConfigSummary: {
      format: 'Open Deck Tandem 2,700kg MAM',
      machine: 'Alkota 4305-GED (241 Bar · 17.0 LPM · 130°C)',
      water: '1,500L Multi-Baffled Tank (~1.5 hrs runtime)',
      power: '12V Alternator + Auxiliary Buffer Battery',
      recovery: 'Standard Discharge or Optional VACGD',
      operators: 'Dual Operator (2 × 50m Electric Reels)',
      estimatedMAM: '2,520kg Wet / 2,700kg MAM'
    },
    configuratorPresetSlug: 'fleet-logistics',
    deepLinkQuery: '?format=open-deck&preset=fleet-logistics&operators=2',
    faqs: [
      {
        q: 'Can two operators wash at the same time without losing pressure?',
        a: 'Yes. When configured with a high-displacement machine such as the Alkota 4305-GED (17.0 LPM), our engineered brass Y-manifold evenly distributes 8.5 LPM at 240 Bar to each operator simultaneously.'
      },
      {
        q: 'How many trucks can be washed from a 1,500L water tank?',
        a: 'With two operators working hot water at ~60% average trigger time, a 1,500L tank provides approximately 1.5 hours of continuous washing, which is typically sufficient for 3 to 5 articulated trucks or 8 to 10 standard delivery vans.'
      },
      {
        q: 'Can the trailer be towed on UK roads with a full tank of water?',
        a: 'Yes. All Alkota chassis are UK Type Approved / IVA certified. When paired with a 2,700kg or 3,500kg MAM tandem chassis, the unladen weight plus 1,500kg of water leaves a safe legal payload margin.'
      }
    ]
  },
  {
    slug: 'agriculture',
    title: 'Agriculture, Livestock & Estate Operations',
    heroHeadline: 'UNSTOPPABLE HOT WATER POWER FOR HARSH FARMLAND.',
    tagline: 'Rugged mobile wash rigs engineered to shift baked clay, livestock pens, combine harvesters, and forestry machinery.',
    industryCategory: 'Agriculture & Forestry',
    heroImage: '/assets/industries/agriculture.png',
    theOperation:
      'Agricultural washing demands extreme reliability in remote farm yards, milking parlours, poultry sheds, and crop processing barns. Tasks range from clearing heavy mud from 200HP tractors and combine harvesters before harvest maintenance to rigorous thermal sanitisation of livestock pens and biosecurity wash stations.',
    theChallenge:
      'Farm yards rarely have high-flow water hydrants or 3-phase electric supplies near remote machinery sheds. Mud and manure pack into wheel arches and cooling radiators, forming cement-like deposits that cold water machines simply cannot shift without wasting hours of operator time.',
    theSystemArchitecture:
      'A heavy-duty open deck chassis with high-clearance running gear, parabolic leaf suspension, and large 1,500L to 2,000L baffled water storage. Powered by a commercial Honda or Vanguard petrol engine paired with an Alkota Schedule 80 down-draft diesel burner, delivering 100°C water at 16+ LPM.',
    keyEngineeringFactors: [
      {
        title: 'Heavy Mud Kinetic Flushing',
        desc: 'High LPM volume combined with 200+ Bar pressure cuts through thick dried mud and vegetative buildup rapidly.',
        importance: 'critical'
      },
      {
        title: 'Water Independence in Remote Yards',
        desc: 'Large 1,500L+ onboard reservoir allows tractors and implements to be cleaned out in the field or in un-plumbed barns.',
        importance: 'critical'
      },
      {
        title: 'Extreme Mud & Dust Filtration',
        desc: 'Twin inline 50-mesh stainless steel water intake filters protect pump ceramic plungers from gritty borehole supplies.',
        importance: 'recommended'
      },
      {
        title: 'All-Mechanical Serviceability',
        desc: 'Rugged direct-drive and belt-driven components with no sensitive circuit boards that could fail in wet, dusty farm conditions.',
        importance: 'critical'
      }
    ],
    recommendedFormat: 'open-deck',
    recommendedMachine: 'Alkota GED 12V 311 or 4305 High Flow',
    recommendedWaterLitres: 1500,
    recommendedOperators: 1,
    recommendedRecovery: 'None (Field Discharge)',
    conceptualConfigSummary: {
      format: 'Open Deck Tandem 2,700kg MAM',
      machine: 'Alkota GED 12V High Pressure Skid',
      water: '1,500L Heavy Poly Reservoir',
      power: '12V Engine Alternator',
      recovery: 'Standard Yard Drainage',
      operators: 'Single Operator (1 × 50m Heavy-Duty Reel)',
      estimatedMAM: '2,480kg Wet / 2,700kg MAM'
    },
    configuratorPresetSlug: 'highways-municipal',
    deepLinkQuery: '?format=open-deck&app=agriculture&operators=1',
    faqs: [
      {
        q: 'Can the trailer draw water from farm boreholes or IBCs?',
        a: 'Yes. Alkota trailer machines incorporate positive-displacement ceramic triplex pumps and header break tanks designed to draw safely from unpressurised farm storage tanks or gravity feeds.'
      },
      {
        q: 'Can the hot water be used for biosecurity and livestock disinfection?',
        a: 'Yes. Thermal hot water at 90°C–120°C significantly accelerates pathogen reduction in cattle pens and poultry units, allowing approved disinfectants to work with maximum efficacy.'
      }
    ]
  },
  {
    slug: 'construction',
    title: 'Construction Plant & Civil Engineering',
    heroHeadline: 'CUT PACKED CLAY & GREASE FROM 50-TONNE PLANT.',
    tagline: 'Brutal 4,000 PSI diesel mobile rigs designed to wash excavators, dumpers, piling rigs, and site access roadways.',
    industryCategory: 'Construction & Mining',
    heroImage: '/assets/industries/construction.png',
    theOperation:
      'Construction plant hire depots, quarrying sites, and civil earthmoving projects require washing heavy machinery before off-hire inspection, mechanical servicing, and highway transport. Excavator track chains, hydraulic booms, wheel arches, and concrete batching equipment accumulate concrete splatter, hydraulic oil, and clay.',
    theChallenge:
      'Construction sites have zero permanent infrastructure during earthworks phases. Rigs must travel across uneven haul roads and operate self-sufficiently for entire 10-hour shifts using single-fuel diesel supplies without site mains water or grid electricity.',
    theSystemArchitecture:
      'A heavy-duty 3,500kg MAM tandem chassis with parabolic leaf springs and oil dampers. An Alkota DED series 4,000 PSI diesel skid powered by a Kubota liquid-cooled diesel engine, drawing from a central 80L bunded diesel tank and dual interconnected 2,000L baffled poly tanks.',
    keyEngineeringFactors: [
      {
        title: 'Single-Fuel Diesel Consolidator',
        desc: 'Engine and burner share red diesel from an 80L bunded fuel tank, eliminating the hazard of carrying petrol on construction sites.',
        importance: 'critical'
      },
      {
        title: '4,000 PSI Kinetic Cutting Force',
        desc: 'High impact pressure strips set concrete residue, bitumen, and compacted clay from excavator sprockets and buckets.',
        importance: 'critical'
      },
      {
        title: 'Heavy Off-Road Suspension',
        desc: 'Parabolic leaf springs and high-load commercial tyres withstand repeated abuse on potholed construction site tracks.',
        importance: 'critical'
      },
      {
        title: 'Extended 100m Hose Deployment',
        desc: 'Dual 50m heavy wire-braided hose reels allow operators to circle large 50T excavators and piling rigs without moving the trailer.',
        importance: 'recommended'
      }
    ],
    recommendedFormat: 'open-deck',
    recommendedMachine: 'Alkota DED All-Diesel Single-Fuel Skid',
    recommendedWaterLitres: 2000,
    recommendedOperators: 2,
    recommendedRecovery: 'Optional Drive-Over Berms',
    conceptualConfigSummary: {
      format: 'Open Deck Heavy Tandem 3,500kg MAM',
      machine: 'Alkota DED-4000 (275 Bar · 19.0 LPM · Kubota Diesel)',
      water: '2,000L Dual Interconnected Reservoir',
      power: 'Single 80L Central Bunded Diesel Tank',
      recovery: 'Optional Sediment Sump',
      operators: 'Dual Operator (2 × 50m Heavy Reels)',
      estimatedMAM: '3,180kg Wet / 3,500kg MAM'
    },
    configuratorPresetSlug: 'heavy-plant-construction',
    deepLinkQuery: '?format=open-deck&preset=heavy-plant-construction&operators=2',
    faqs: [
      {
        q: 'Why is a single-fuel diesel trailer advantageous on construction sites?',
        a: 'Most UK construction sites and quarries prohibit the storage of petrol on site due to insurance and safety regulations. A single-fuel diesel trailer allows the Kubota machine engine and Alkota burner to run from the site’s bulk diesel supply.'
      },
      {
        q: 'How durable is the heating coil against continuous vibration?',
        a: 'Alkota heating coils are wound from heavy Schedule 80 cold-rolled seamless pipe and insulated with ceramic blanket inside a heavy steel casing, backed by our 7-year warranty.'
      }
    ]
  },
  {
    slug: 'contract-cleaning',
    title: 'Contract Cleaning & Commercial Services',
    heroHeadline: 'A HIGH-REVENUE MOBILE ASSET. ON WHEELS.',
    tagline: 'Professional multi-service cleaning rigs delivering hot water, steam, chewing gum removal, and fleet washing from one unit.',
    industryCategory: 'Commercial Cleaning Services',
    heroImage: '/assets/products/trailer-single.png',
    theOperation:
      'Contract cleaning specialists service a diverse portfolio: commercial car parks, building facade restoration, shopping centre footpaths, retail loading docks, residential block paving, and cladding. Speed of setup and professional customer-facing appearance are critical to winning and retaining commercial contracts.',
    theChallenge:
      'Contractors waste unbillable hours locating water taps, running extension leads, and dealing with client complaints about surface water runoff. An enclosed, professional mobile rig turns the contractor into an autonomous mobile cleaning plant.',
    theSystemArchitecture:
      'An enclosed box body trailer on a 2,700kg or 3,500kg tandem chassis. Features full corporate branding on external GRP panels, an Alkota hot water/steam convertible machine, 1,000L baffled water reservoir, 5kVA silent generator, and onboard vacuum recovery.',
    keyEngineeringFactors: [
      {
        title: 'Customer-Facing Corporate Livery',
        desc: 'Enclosed white or charcoal GRP bodywork with crisp corporate branding presents a serious tier-one contractor appearance.',
        importance: 'critical'
      },
      {
        title: 'Convertible Hot Water / Steam Output',
        desc: 'Allows the contractor to switch between high-pressure flatwork surface cleaning (240 Bar) and low-pressure steam (155°C) for gum and stone.',
        importance: 'critical'
      },
      {
        title: 'All-Weather Equipment Protection',
        desc: 'Internal plant room keeps machinery secure overnight and protects pump manifolds from sub-zero winter freeze damage.',
        importance: 'recommended'
      },
      {
        title: 'Integrated Tool Vaults & Lighting',
        desc: 'Dedicated storage for surface cleaners, rotary lances, chemicals, and internal LED lighting for night retail cleaning.',
        importance: 'recommended'
      }
    ],
    recommendedFormat: 'enclosed',
    recommendedMachine: 'Alkota 4305-GED Convertible or DED Diesel',
    recommendedWaterLitres: 1000,
    recommendedOperators: 1,
    recommendedRecovery: 'Alkota VACGD Vacuum Recovery',
    conceptualConfigSummary: {
      format: 'Enclosed Mobile Plant Room 2,700kg MAM',
      machine: 'Alkota 4305-GED (241 Bar · 17.0 LPM · Steam Mode)',
      water: '1,000L Baffled Reservoir (~1.2 hrs runtime)',
      power: '5.0 kVA Silent Diesel Generator + 12V DC',
      recovery: 'Alkota VACGD Vacuum Blower Module',
      operators: '1 to 2 Operators (Electric Auto-Rewind)',
      estimatedMAM: '2,350kg Wet / 2,700kg MAM'
    },
    configuratorPresetSlug: 'fleet-logistics',
    deepLinkQuery: '?format=enclosed&app=contract-cleaning',
    faqs: [
      {
        q: 'Can the trailer be branded with my company logo and colours?',
        a: 'Yes. Alkota enclosed mobile plant rooms are available in high-gloss white, graphite charcoal, or full custom vinyl corporate livery with reflective safety chevrons.'
      },
      {
        q: 'Can equipment be operated with the trailer doors closed?',
        a: 'Enclosed trailers feature engineered high-volume air intake louvres and dedicated roof exhaust cowls, allowing machines and generators to run in all weather conditions.'
      }
    ]
  },
  {
    slug: 'municipal',
    title: 'Municipal & Public Realm Sanitation',
    heroHeadline: 'PRESERVE HISTORIC CIVIC SPACES CHEMICAL-FREE.',
    tagline: 'High-temperature steam and vacuum capture systems for town centres, pedestrian plazas, chewing gum, and graffiti removal.',
    industryCategory: 'Local Government & Public Works',
    heroImage: '/assets/products/steam-oil.png',
    theOperation:
      'Town centre management teams, local authorities, and highway agencies maintain public footpaths, bus shelters, monuments, subways, and street furniture. Operations require removing millions of chewing gum deposits, racist or offensive graffiti, food grease outside takeaways, and urban pigeon guano.',
    theChallenge:
      'High-pressure water washing erodes historic stone mortar joints and creates hazardous water pools in active shopping precincts. Harsh chemical solvents risk polluting stormwater drains. Municipalities require low-volume, high-heat wet steam (150°C+) with WRAS Category 5 water protection.',
    theSystemArchitecture:
      'A compact single-axle 1,500kg or tandem 2,700kg open/enclosed rig featuring the Alkota 325-CSH industrial steam generator. Includes a WRAS Category 5 air gap break tank, 500L–1,000L water tank, and an Alkota VACGD vacuum recovery system to suction slurry instantly.',
    keyEngineeringFactors: [
      {
        title: '155°C Saturated Steam Power',
        desc: 'Thermal breakdown dissolves chewing gum in under 3 seconds and liquefies graffiti paint without chemicals or abrasive sandblasting.',
        importance: 'critical'
      },
      {
        title: 'WRAS Category 5 Backflow Protection',
        desc: 'Mandatory air gap break tank prevents any possibility of contaminated wastewater syphoning back into public drinking water hydrants.',
        importance: 'critical'
      },
      {
        title: 'Low Water Consumption (11.4 LPM)',
        desc: 'Thermal steam uses significantly less water than standard washers, reducing wastewater volume in busy pedestrian high streets.',
        importance: 'critical'
      },
      {
        title: 'Instant Vacuum Recovery',
        desc: 'VACGD suction picks up wastewater immediately behind the lance, leaving pedestrian footways dry and safe to walk on within seconds.',
        importance: 'recommended'
      }
    ],
    recommendedFormat: 'open-deck',
    recommendedMachine: 'Alkota 325-CSH Wet Steam Generator',
    recommendedWaterLitres: 500,
    recommendedOperators: 1,
    recommendedRecovery: 'Alkota VACGD Vacuum Recovery',
    conceptualConfigSummary: {
      format: 'Open Deck Single Axle 1,500kg MAM',
      machine: 'Alkota 325-CSH (172 Bar · 11.4 LPM · 155°C Steam)',
      water: '500L Slimline Baffled Poly Tank',
      power: '12V DC Battery Circuit + WRAS CAT 5 Break Tank',
      recovery: 'VACGD Vacuum Recovery Unit',
      operators: 'Single Operator (1 × 50m Reel + Gum Head)',
      estimatedMAM: '1,120kg Wet / 1,500kg MAM'
    },
    configuratorPresetSlug: 'highways-municipal',
    deepLinkQuery: '?format=open-deck&preset=highways-municipal&operators=1',
    faqs: [
      {
        q: 'Why is steam superior to cold high-pressure water for chewing gum removal?',
        a: 'Cold water pressure washers rely on raw blast force that can damage the stone aggregate and gouge jointing sand. 155°C wet steam melts the rubber polymer bonds in chewing gum, cleanly vaporising the deposit with zero surface harm.'
      },
      {
        q: 'What is a WRAS Category 5 break tank and why is it needed?',
        a: 'UK Water Supply Regulations classify industrial washing equipment connected to commercial hydrants as Category 5 fluid risk. An approved mechanical air-gap break tank physically separates mains drinking water from the trailer plumbing.'
      }
    ]
  },
  {
    slug: 'utilities',
    title: 'Utilities, Water Infrastructure & Marine Ports',
    heroHeadline: 'CLOSED-LOOP CLEANING ON SENSITIVE ASSETS.',
    tagline: 'Zero-runoff mobile wash systems designed for water treatment plants, power substations, railway sidings, and coastal ports.',
    industryCategory: 'Utilities & Critical Infrastructure',
    heroImage: '/assets/industries/waste-management.png',
    theOperation:
      'Utility providers, railway maintainers, and port authorities clean transformers, rolling stock bogies, water intake grates, and oil storage bunds. Strict Environment Agency (EA) regulations prohibit any contaminated hydrocarbon runoff from entering watercourses or surface drainage.',
    theChallenge:
      'Setting up fixed wash bays at every substation or remote coastal jetty is economically unfeasible. Contractors must bring complete mobile water treatment plants capable of capturing 100% of wastewater, removing hydrocarbons down to <5 mg/L, and recycling the water on-site.',
    theSystemArchitecture:
      'An enclosed heavy tandem 3,500kg mobile plant room integrating an Alkota DED diesel machine, 2,000L twin holding tanks, an Alkota VACGD positive-displacement vacuum extractor, and an Alkota 8-VFS-1 negative-void vacuum filtration system.',
    keyEngineeringFactors: [
      {
        title: 'Zero-Runoff Closed-Loop Recycling',
        desc: 'Filters wastewater down to 20 microns and removes oils via activated carbon canisters, recycling water continuously to the pressure pump.',
        importance: 'critical'
      },
      {
        title: 'Environment Agency <5 mg/L Standard',
        desc: 'Treatment exceeds BS EN 858 class 1 discharge standards, allowing legal operation adjacent to rivers, reservoirs, and marine docks.',
        importance: 'critical'
      },
      {
        title: '10 kVA 3-Phase Onboard Power',
        desc: 'Super-silent diesel generator powers the entire vacuum and filtration plant without relying on grid power.',
        importance: 'critical'
      },
      {
        title: 'Weatherproof Plant Room Housing',
        desc: 'Fully enclosed lockable bodywork protects expensive filtration sensors, control valves, and carbon media from corrosive salt spray.',
        importance: 'recommended'
      }
    ],
    recommendedFormat: 'enclosed',
    recommendedMachine: 'Alkota DED All-Diesel Single-Fuel Skid',
    recommendedWaterLitres: 2000,
    recommendedOperators: 2,
    recommendedRecovery: '8-VFS-1 Closed-Loop Water Treatment Skid',
    conceptualConfigSummary: {
      format: 'Enclosed Heavy Tandem 3,500kg MAM',
      machine: 'Alkota DED-4000 (275 Bar · 19.0 LPM · Diesel)',
      water: '2,000L Dual Interconnected Reservoir',
      power: '10.0 kVA 3-Phase Generator + 80L Diesel Tank',
      recovery: 'Alkota VACGD Blower + 8-VFS-1 Filtration Plant',
      operators: 'Dual Operator (2 × 50m Reels + Berms)',
      estimatedMAM: '3,480kg Wet / 3,500kg MAM'
    },
    configuratorPresetSlug: 'environmental-closed-loop',
    deepLinkQuery: '?format=enclosed&preset=environmental-closed-loop&operators=2',
    faqs: [
      {
        q: 'How clean is the recycled water produced by the VFS-1 system?',
        a: 'The Alkota 8-VFS-1 vacuum filtration system removes suspended solids down to 20 microns and polishes free hydrocarbons down to under 5 mg/L, making it clean enough for continuous reuse in Alkota high-pressure pumps.'
      },
      {
        q: 'Does this system require trade effluent permits for on-site washing?',
        a: 'Because the closed-loop system recycles up to 90% of water and retains the contaminated sludge in onboard filter media for controlled off-site disposal, no contaminated water enters public drains.'
      }
    ]
  }
];
