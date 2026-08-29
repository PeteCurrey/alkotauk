/**
 * Mess Quest — Episode Content Architecture & Engineering Intelligence
 *
 * PROVENANCE PRINCIPLE:
 * - Official Source Data: Factually derived from the official Alkota Mess Quest series and published documentation.
 * - Alkota UK Editorial Data: Technical engineering commentary and application analysis explaining the physics,
 *   variables, and equipment demands of each industrial challenge.
 */

export const MESS_QUEST_PLAYLIST_ID = 'PLKaGYY0CshvoC0ES9SQh7gqjF5p79V43N';
export const MESS_QUEST_PLAYLIST_URL = `https://www.youtube.com/playlist?list=${MESS_QUEST_PLAYLIST_ID}`;
export const MESS_QUEST_EMBED_URL = `https://www.youtube-nocookie.com/embed/videoseries?list=${MESS_QUEST_PLAYLIST_ID}&rel=0&modestbranding=1`;

export type CleaningEquationVariable = {
  level: 'LOW' | 'MEDIUM' | 'HIGH' | 'MAX';
  weight: number; // 1 to 5 scale
  label: string;
  role: string;
};

export type MessQuestEpisode = {
  // Official Source Data
  id: string;
  slug: string;
  title: string;
  youtubeVideoId: string;
  youtubeUrl: string;
  thumbnail: string;
  shortDescription: string;
  sourceSummary: string;
  location: string;
  publishedDate?: string;
  duration?: string;
  featured?: boolean;
  categoryFilter: 'AGRICULTURE' | 'INFRASTRUCTURE' | 'HEAVY EQUIPMENT' | 'INDUSTRIAL';

  // Alkota UK Editorial Intelligence
  editorialData: {
    theJob: {
      environment: string;
      contaminationType: string;
      accessChallenge: string;
      scale: string;
      operationalImplications: string;
      narrative: string;
    };
    difficultyFactors: Array<{
      title: string;
      explanation: string;
    }>;
    theEngineering: {
      overview: string;
      variables: Array<{
        variable: string;
        role: string;
        importance: string;
        explanation: string;
      }>;
    };
    cleaningEquation: {
      pressure: CleaningEquationVariable;
      flow: CleaningEquationVariable;
      heat: CleaningEquationVariable;
      chemistry: CleaningEquationVariable;
      time: CleaningEquationVariable;
      summary: string;
    };
    systemDemands: Array<{
      requirement: string;
      why: string;
    }>;
    relatedProductCategories: Array<{
      slug: string;
      name: string;
      href: string;
      reason: string;
    }>;
    relatedProductSlugs: string[];
    relatedApplications: Array<{
      slug: string;
      name: string;
      href: string;
    }>;
    relatedChemicals: {
      heading: string;
      explanation: string;
      suggestedTypes: string[];
      href: string;
    };
    relatedAccessories: Array<{
      name: string;
      role: string;
      href: string;
    }>;
    trailerConfigurator?: {
      suggested: boolean;
      applicationIntent?: string;
      why: string;
      href: string;
    };
    bespokeEngineering?: {
      suggested: boolean;
      why: string;
      href: string;
    };
  };
};

export const messQuestEpisodes: MessQuestEpisode[] = [
  {
    id: '01',
    slug: 'hog-heaven',
    title: 'Hog Heaven — 2,400-Head Swine Facility Deep Clean',
    youtubeVideoId: 'hZSdq14KNTM',
    youtubeUrl: 'https://www.youtube.com/watch?v=hZSdq14KNTM',
    thumbnail: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&auto=format&fit=crop&q=80',
    shortDescription:
      'The inaugural Mess Quest episode: tackling massive biological muck, encrusted manure, and biosecurity sanitisation across a 2,400-head swine finishing barn.',
    sourceSummary:
      'Official Alkota Mess Quest Series (Episode 01) — Filmed on location with host J.B. and local agricultural operators.',
    location: 'Southern Minnesota, USA',
    publishedDate: '2013-05-01',
    duration: '4:30',
    featured: true,
    categoryFilter: 'AGRICULTURE',
    editorialData: {
      theJob: {
        environment: 'Intensive Agricultural Swine Finishing Facility (2,400-Head Multi-Bay Barn)',
        contaminationType: 'Heavy biological manure, compacted straw chaff, urine scale, and fatty animal oils',
        accessChallenge: 'Slatted concrete flooring, pen partitions, narrow alleyways, and overhead ventilation fixtures',
        scale: 'Thousands of square metres of slatted floors and penning to turn around between livestock rotations',
        operationalImplications:
          'Livestock turnaround windows require rapid decontamination. Inadequate thermal sanitisation leaves pathogens that compromise biosecurity and herd health.',
        narrative:
          'In livestock farming, barn cleaning is not an aesthetic task — it is a strict biosecurity barrier. When a 2,400-head swine barn is cleared, every pen, slat, feeder, and wall is coated in compacted biological matter. The turnaround clock starts immediately: every hour the barn sits uncleaned delays the arrival of the next herd. The job requires moving immense volumes of solid waste while using elevated water temperatures to melt organic fats without damaging concrete integrity.',
      },
      difficultyFactors: [
        {
          title: 'Compacted Organic Fats & Muck',
          explanation:
            'Dried swine waste contains dense organic proteins and fats that resist cold water. Cold water simply smears the grease and creates aerosolised mud without sanitising the underlying substrate.',
        },
        {
          title: 'Slatted Floor Drainage Constraints',
          explanation:
            'Water must penetrate through narrow slatted concrete floor gaps into slurry storage without clogging nozzles or causing back-splash onto operators.',
        },
        {
          title: 'High-Volume Turnover Window',
          explanation:
            'Operators face multi-hour continuous wash cycles. Equipment must maintain full thermal output and pump pressure non-stop across full 8-to-12 hour cleaning shifts.',
        },
        {
          title: 'Chemical & Detergent Compatibility',
          explanation:
            'Agricultural sanitising detergents need adequate foaming and dwell time before high-temperature rinsing to ensure complete microbial clearance.',
        },
      ],
      theEngineering: {
        overview:
          'Agricultural decontamination relies on a precise balance of sensible heat to liquify organic fats, high water volume (L/min) to displace bulk solids, and sustained industrial duty cycles.',
        variables: [
          {
            variable: 'HEAT (80°C – 95°C)',
            role: 'Fat & Lipid Liquefaction',
            importance: 'CRITICAL',
            explanation:
              'Hot water breaks down animal fats and organic residues immediately on contact, reducing wash time by up to 60% compared to cold water.',
          },
          {
            variable: 'FLOW (15 – 25 L/MIN)',
            role: 'Bulk Waste Transport',
            importance: 'HIGH',
            explanation:
              'While pressure cuts through crusted matter, high volumetric flow is what carries hundreds of kilograms of solid waste down through the slatted floors.',
          },
          {
            variable: 'PRESSURE (180 – 240 BAR)',
            role: 'Surface Impingement',
            importance: 'HIGH',
            explanation:
              'Sufficient kinetic energy to strip hardened deposits from rough cast concrete without etching or pitting the structural surface.',
          },
          {
            variable: 'DUTY CYCLE (Continuous)',
            role: 'Multi-Hour Thermal Reliability',
            importance: 'CRITICAL',
            explanation:
              'Schedule 80 steel coils and slow-turning triplex pumps ensure the burner and hydraulic system do not overheat during all-day washdowns.',
          },
        ],
      },
      cleaningEquation: {
        pressure: { level: 'HIGH', weight: 4, label: '200+ BAR', role: 'Concrete blast force' },
        flow: { level: 'MAX', weight: 5, label: '18–25 L/MIN', role: 'Solid muck displacement' },
        heat: { level: 'MAX', weight: 5, label: '85–95°C', role: 'Animal fat liquefaction' },
        chemistry: { level: 'HIGH', weight: 4, label: 'Agricultural Sanitiser', role: 'Pathogen clearance' },
        time: { level: 'MEDIUM', weight: 3, label: 'Rapid Turnaround', role: 'Dwell & rinse efficiency' },
        summary:
          'Agricultural barn cleanouts demand maximum Heat and Flow to melt grease and transport bulk matter, backed by robust chemical foam application.',
      },
      systemDemands: [
        {
          requirement: 'Schedule 80 Hot Water Heating Coil',
          why: 'Continuous thermal performance up to 95°C is essential to melt organic greases without burner lockout.',
        },
        {
          requirement: 'High-Volume Ceramic Triplex Pump (15–25 L/min)',
          why: 'Displacing dense agricultural sediment requires high water volume, not just pinpoint pressure.',
        },
        {
          requirement: 'Corrosion-Resistant Steel Frame & Mobility',
          why: 'Ammonia-rich barn environments rapidly corrode cheap sheet metal; heavy-gauge powder-coated steel chassis is mandatory.',
        },
        {
          requirement: 'Detergent Chemical Foaming System',
          why: 'Pre-foaming agricultural detergents allows active agents to penetrate crust before hot water pressure rinsing.',
        },
      ],
      relatedProductCategories: [
        {
          slug: 'hot-water',
          name: 'Hot Water Pressure Washers',
          href: '/machines/hot-water',
          reason: 'Essential for high-temperature organic fat and manure removal in agricultural facilities.',
        },
        {
          slug: 'cold-water',
          name: 'Cold Water Industrial Washers',
          href: '/machines/cold-water',
          reason: 'High-volume plunger pumps for preliminary bulk muck washdown.',
        },
        {
          slug: 'trailers',
          name: 'Mobile Pressure Washer Trailers',
          href: '/trailers',
          reason: 'Independent mobile water and power for multi-building farm complexes.',
        },
      ],
      relatedProductSlugs: ['420x4', '4305xd4', '5355ens'],
      relatedApplications: [
        {
          slug: 'agriculture',
          name: 'Agricultural & Farming Machinery Washdown',
          href: '/industries/agriculture',
        },
        {
          slug: 'industrial',
          name: 'Heavy Plant & Agricultural Depots',
          href: '/industries/industrial',
        },
      ],
      relatedChemicals: {
        heading: 'Agricultural Sanitising & Degreasing Chemistry',
        explanation:
          'In intense livestock environments, specialised alkaline detergents and biosecurity sanitisers break the surface tension of dried proteins before thermal pressure rinsing.',
        suggestedTypes: ['Hydrus Bio-Clean HD', 'Hydrus Ag-Wash Sanitiser', 'Hydrus Heavy Alkaline Degreaser'],
        href: '/chemicals',
      },
      relatedAccessories: [
        {
          name: 'Rotary Turbo Nozzle (0° Impact at 25° Cone)',
          role: 'Maximises kinetic strip force on encrusted concrete floors.',
          href: '/attachments',
        },
        {
          name: 'Long-Reach Insulated Lance & Swivel',
          role: 'Operator ergonomic comfort during high-temperature all-day washing.',
          href: '/attachments',
        },
        {
          name: 'Heavy-Duty Chemical Foam Cannon',
          role: 'Lays thick clinging foam across pen walls for maximum dwell time.',
          href: '/attachments',
        },
      ],
      trailerConfigurator: {
        suggested: true,
        applicationIntent: 'agricultural',
        why: 'Farms without local high-flow water hydrants require highway trailers with 1,000L+ onboard water tanks and diesel hot-water generators.',
        href: '/trailers/configure',
      },
      bespokeEngineering: {
        suggested: false,
        why: 'Standard Alkota 420X4 and 4305XD4 portable skid units readily service standard agricultural facilities.',
        href: '/wash-plant',
      },
    },
  },
  {
    id: '02',
    slug: 'water-tower-cleaning',
    title: 'Municipal Water Tower — 135-Ft Elevated Tank Restoration',
    youtubeVideoId: 's1X9e_Z5-O0',
    youtubeUrl: 'https://www.youtube.com/watch?v=s1X9e_Z5-O0',
    thumbnail: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=1200&auto=format&fit=crop&q=80',
    shortDescription:
      'Extreme height, severe vertical atmospheric fallout, and industrial biological algae stripped from a 135-foot municipal water tower structure.',
    sourceSummary:
      'Official Alkota Mess Quest Showcase & Cleaner Times Magazine Feature — Submitted by Greg Rentschler (Indiana ProWash) showcasing extreme municipal infrastructure cleaning.',
    location: 'Midwest Municipal District, USA',
    publishedDate: '2013-08-15',
    duration: '5:10',
    featured: true,
    categoryFilter: 'INFRASTRUCTURE',
    editorialData: {
      theJob: {
        environment: 'Municipal Water Infrastructure (135-Foot Elevated Steel Storage Vessel)',
        contaminationType: 'Decades of atmospheric pollution, diesel particulate soot, stubborn black algae (Gloeocapsa magma), and mineral oxidation',
        accessChallenge: 'Rope access, boom lifts, and 50+ metres of vertical high-pressure hose routing with gravity head loss',
        scale: 'Immense spherical and column steel surface area exposed to severe weathering',
        operationalImplications:
          'Municipal water towers cannot be taken offline lightly. Harsh abrasives would damage the multi-million-pound protective epoxy coatings; precision chemical application and controlled hydrostatic washing are mandatory.',
        narrative:
          'Cleaning a 135-foot elevated municipal water tower is one of the most hazardous and logistically demanding tasks in industrial maintenance. The structure is constantly attacked by airborne diesel soot, industrial emissions, and biological growth that embeds into the painted steel skin. The operator works suspended at dizzying heights while equipment on the ground must push high-pressure water and cleaning chemistry up 50 vertical metres without pressure drop.',
      },
      difficultyFactors: [
        {
          title: 'Vertical Hydraulic Head Loss',
          explanation:
            'Pumping water 135 feet vertically incurs approximately 4 BAR (58 PSI) of pure hydrostatic head loss plus significant frictional drag across 60+ metres of continuous high-pressure hose.',
        },
        {
          title: 'Epoxy Coating Preservation',
          explanation:
            'Excessive mechanical pressure or incorrect nozzle angles will strip expensive protective fluoropolymer coatings. The clean must be achieved through chemical lift and thermal rinsing rather than abrasive blasting.',
        },
        {
          title: 'Remote Ground Support & Water Supply',
          explanation:
            'Elevated sites frequently lack dedicated wash bays. Complete self-contained mobile rigs with onboard water tanks and continuous diesel generators are essential.',
        },
        {
          title: 'Operator Fatigue & High-Reach Safety',
          explanation:
            'Operating a high-recoil lance in a suspended harness or boom basket requires smooth trigger control and zero pump pulsation.',
        },
      ],
      theEngineering: {
        overview:
          'Infrastructure high-reach cleaning requires low-pulsation ceramic triplex pumps capable of overcoming severe line friction, coupled with chemical dwell capability and temperature modulation.',
        variables: [
          {
            variable: 'PRESSURE CONTROL (100 – 180 BAR at Surface)',
            role: 'Substrate Preservation',
            importance: 'CRITICAL',
            explanation:
              'Must deliver crisp impact at height without exceeding the failure threshold of industrial protective topcoats.',
          },
          {
            variable: 'FLOW CAPACITY (15 – 22 L/MIN)',
            role: 'Vertical Rinse Volume',
            importance: 'HIGH',
            explanation:
              'Ample flow volume ensures loosened atmospheric grime washes completely down the curved tank walls rather than drying in streaks.',
          },
          {
            variable: 'CHEMISTRY & DWELL TIME',
            role: 'Biological & Oxidation Breakdown',
            importance: 'MAXIMUM',
            explanation:
              'Biocidal and surfactant chemistry does 80% of the work breaking down algae bonds, allowing gentle pressure washing to complete the clean.',
          },
          {
            variable: 'HOSE RUN MANAGEMENT (60 – 100m)',
            role: 'Hydraulic Friction Compensation',
            importance: 'HIGH',
            explanation:
              'Large-bore 3/8" or 1/2" dual-wire braided hose reduces line pressure drop over extended vertical ascents.',
          },
        ],
      },
      cleaningEquation: {
        pressure: { level: 'MEDIUM', weight: 3, label: '140–180 BAR', role: 'Safe coating rinse' },
        flow: { level: 'HIGH', weight: 4, label: '18–22 L/MIN', role: 'Vertical wall washdown' },
        heat: { level: 'MEDIUM', weight: 3, label: '50–65°C', role: 'Atmospheric soot lift' },
        chemistry: { level: 'MAX', weight: 5, label: 'Biocidal Surfactant', role: 'Algae bond termination' },
        time: { level: 'HIGH', weight: 4, label: '15–20 min Dwell', role: 'Complete surface penetration' },
        summary:
          'High-reach infrastructure demands maximum Chemistry and Dwell Time with controlled Pressure to protect costly protective coatings.',
      },
      systemDemands: [
        {
          requirement: 'Trailer-Mounted Mobile Wash Rig',
          why: 'Self-sufficient operation with 1,000L+ baffled water storage and independent diesel power is mandatory on municipal sites.',
        },
        {
          requirement: 'Low-RPM Triplex Plunger Pump',
          why: 'Smooth hydraulic delivery with minimal pulsation protects operator stability in elevated baskets and rope systems.',
        },
        {
          requirement: 'Dual Hose Reel Integration (100m Capacity)',
          why: 'High-pressure live hose reels with friction-minimised fittings allow smooth vertical line extension.',
        },
        {
          requirement: 'Downstream Chemical Injection System',
          why: 'Allows applying cleaning agents at full pressure without passing harsh chemicals through the heating coil.',
        },
      ],
      relatedProductCategories: [
        {
          slug: 'trailers',
          name: 'Mobile Pressure Washer Trailers',
          href: '/trailers',
          reason: 'Turnkey mobile platforms engineered for off-grid municipal and infrastructure contracts.',
        },
        {
          slug: 'hot-water',
          name: 'Hot Water Diesel Engine Skids',
          href: '/machines/hot-water',
          reason: 'Self-contained diesel engine units with onboard generators for remote field operation.',
        },
        {
          slug: 'water-treatment',
          name: 'Water Recovery Systems',
          href: '/water-treatment',
          reason: 'Containment berms and vacuum recovery for environmental compliance in municipal zones.',
        },
      ],
      relatedProductSlugs: ['420x4', 'trailer-single', 'trailer-tandem'],
      relatedApplications: [
        {
          slug: 'industrial',
          name: 'Infrastructure & Municipal Maintenance',
          href: '/industries/industrial',
        },
        {
          slug: 'transport-fleet',
          name: 'Commercial Mobile Fleet Cleaning',
          href: '/industries/transport-fleet',
        },
      ],
      relatedChemicals: {
        heading: 'Infrastructure Biocide & Atmospheric Cleaners',
        explanation:
          'Specialised exterior facade and tank cleaners loosen atmospheric diesel exhaust and kill deep-rooted biological lichen without etching underlying paint.',
        suggestedTypes: ['Hydrus Facade Bioclean', 'Hydrus TFR Pro', 'Hydrus Neutraliser'],
        href: '/chemicals',
      },
      relatedAccessories: [
        {
          name: '100m Heavy-Duty Double-Wire Braid Hose',
          role: 'Engineered for extreme burst pressure and minimal vertical pressure drop.',
          href: '/attachments',
        },
        {
          name: 'Telescoping Carbon Fibre High-Reach Wand',
          role: 'Ground-based extension up to 12 metres for lower vessel sections.',
          href: '/attachments',
        },
        {
          name: 'Heavy-Duty Electric Rewind Hose Reel',
          role: 'Effortless retrieval of extended high-pressure hose lines at end of shift.',
          href: '/attachments',
        },
      ],
      trailerConfigurator: {
        suggested: true,
        applicationIntent: 'infrastructure',
        why: 'Elevated water tower and municipal contracts are best served by a tandem-axle trailer with 1,500L water tank, twin hose reels, and diesel power.',
        href: '/trailers/configure',
      },
      bespokeEngineering: {
        suggested: true,
        why: 'Specialised dual-lance trailer rigs with high-volume chemical injection and vacuum recovery can be bespoke-engineered.',
        href: '/wash-plant',
      },
    },
  },
  {
    id: '03',
    slug: 'big-red',
    title: 'Big Red — Heavy Plant & Industrial Greasing Overhaul',
    youtubeVideoId: 'vFnvcx3vRUY',
    youtubeUrl: 'https://www.youtube.com/watch?v=vFnvcx3vRUY',
    thumbnail: 'https://images.unsplash.com/photo-1584467735815-f778f274e296?w=1200&auto=format&fit=crop&q=80',
    shortDescription:
      'Deep thermal degreasing and hydraulic oil decontamination across heavy quarrying and earthmoving plant machinery.',
    sourceSummary:
      'Official Alkota Mess Quest Series Entry — Demonstrating extreme heavy equipment grease and mineral dirt stripping.',
    location: 'Heavy Industrial Plant Workshop, USA',
    publishedDate: '2013-10-10',
    duration: '4:45',
    featured: false,
    categoryFilter: 'HEAVY EQUIPMENT',
    editorialData: {
      theJob: {
        environment: 'Quarry & Earthmoving Plant Maintenance Bay',
        contaminationType: 'Lithium-based heavy chassis grease, hydraulic oil leaks, baked-on mineral clay, and road tar',
        accessChallenge: 'Undercarriage tracks, hydraulic cylinder rams, engine bay recesses, and pivot pins',
        scale: 'Heavy 40-tonne excavator and wheel loader rebuild preparations',
        operationalImplications:
          'Weld inspections, hydraulic repairs, and engine overhauls cannot proceed until raw steel is stripped bare of grease. Uncleaned grease conceals fatigue cracks and causes catastrophic site downtime.',
        narrative:
          'Earthmoving plant machines live in punishing environments. Over months of digging, heavy lithium grease mixes with abrasive crushed stone and mineral dust, baking into a rock-hard composite on undercarriages and hydraulic rams. Cold water bounces off this layer like rubber. To prepare machines for certified weld inspection and mechanical rebuild, technicians need continuous 90°C thermal energy that instantly converts solid bitumen and grease into a free-flowing emulsion.',
      },
      difficultyFactors: [
        {
          title: 'High-Melting-Point Industrial Greases',
          explanation:
            'Moly and lithium complex greases have drop points exceeding 180°C. Standard pressure washers cannot overcome the chemical cohesion without sustained high-temperature hot water.',
        },
        {
          title: 'Aggressive Mineral Encapsulation',
          explanation:
            'Abrasive quarry silt creates an armoured crust over grease pockets. The machine must deliver enough kinetic impact to fracture the crust while hot water flushes out the grease beneath.',
        },
        {
          title: 'Sensitive Electrical & Seal Components',
          explanation:
            'Hydraulic chrome cylinder rods, rubber seals, and wiring harnesses require precise temperature and pressure modulation to avoid damaging delicate components.',
        },
        {
          title: 'Wastewater & Oil Interception Compliance',
          explanation:
            'Stripping heavy petroleum hydrocarbons requires effective oil-water separator integration and closed-loop wash bay drainage.',
        },
      ],
      theEngineering: {
        overview:
          'Heavy plant degreasing requires high thermodynamic energy (BTU burner output) paired with industrial pressure and targeted alkaline degreasers to dissolve petrochemical bonds.',
        variables: [
          {
            variable: 'HEAT (90°C – 110°C Wet Steam)',
            role: 'Petrochemical Emulsification',
            importance: 'MAXIMUM',
            explanation:
              'Elevated temperature drops the viscosity of heavy grease by over 90%, allowing it to wash away instantly without heavy solvent scrubbing.',
          },
          {
            variable: 'PRESSURE (200 – 280 BAR)',
            role: 'Armoured Mud Fracture',
            importance: 'HIGH',
            explanation:
              'High hydrostatic force shears through packed road clay and stone aggregate baked onto track frames.',
          },
          {
            variable: 'CHEMISTRY (Heavy Alkaline Degreaser)',
            role: 'Saponification & Dispersion',
            importance: 'HIGH',
            explanation:
              'Alkaline surfactants saponify fatty acids and keep suspended hydrocarbons from redepositing onto clean steel during rinsing.',
          },
          {
            variable: 'WET STEAM CAPABILITY',
            role: 'Low-Moisture Engine Cleaning',
            importance: 'HIGH',
            explanation:
              'Saturated wet steam (140°C) cleans delicate engine blocks and wiring bays without the high impact force that damages electrical connectors.',
          },
        ],
      },
      cleaningEquation: {
        pressure: { level: 'HIGH', weight: 4, label: '240 BAR', role: 'Crust fracture' },
        flow: { level: 'HIGH', weight: 4, label: '15–20 L/MIN', role: 'Debris flush' },
        heat: { level: 'MAX', weight: 5, label: '95–110°C', role: 'Grease liquefaction' },
        chemistry: { level: 'HIGH', weight: 4, label: 'Heavy Degreaser', role: 'Hydrocarbon breakdown' },
        time: { level: 'MEDIUM', weight: 3, label: 'Targeted Dwell', role: 'Penetration' },
        summary:
          'Heavy plant degreasing demands maximum Heat and Pressure to liquefy heavy complex greases and fracture baked-on mineral crusts.',
      },
      systemDemands: [
        {
          requirement: 'High-Output Schedule 80 Heating Coil (300,000+ BTU/hr)',
          why: 'Maintains continuous 90°C+ water temperature at full 15–20 L/min flow rate without thermal drop.',
        },
        {
          requirement: 'Combination Hot Water + Saturated Steam Valve',
          why: 'Allows switching seamlessly between 240 BAR hot water for tracks and 140°C dry steam for delicate engine bays.',
        },
        {
          requirement: 'Belt-Driven Industrial Ceramic Triplex Pump',
          why: 'Runs at 1450 RPM to minimise wear during continuous multi-hour workshop rebuild cleaning.',
        },
        {
          requirement: 'Oil-Water Interceptor Compatibility',
          why: 'Ensures run-off meets Environment Agency standards for trade effluent discharge.',
        },
      ],
      relatedProductCategories: [
        {
          slug: 'hot-water',
          name: 'Hot Water Pressure Washers',
          href: '/machines/hot-water',
          reason: 'The gold standard for industrial heavy equipment degreasing and plant wash bays.',
        },
        {
          slug: 'steam',
          name: 'Industrial Steam Cleaners',
          href: '/machines/steam',
          reason: '140°C saturated vapour for engine bay and hydraulic seal degreasing without flooding.',
        },
        {
          slug: 'water-treatment',
          name: 'Water Treatment & Oil Separation',
          href: '/water-treatment',
          reason: 'Closed-loop oil-water separators and recycling systems for plant wash bays.',
        },
      ],
      relatedProductSlugs: ['420x4', '4305xd4', 'steam-oil'],
      relatedApplications: [
        {
          slug: 'industrial',
          name: 'Heavy Plant & Machinery Maintenance',
          href: '/industries/industrial',
        },
        {
          slug: 'transport-fleet',
          name: 'Fleet Chassis & Drivetrain Degreasing',
          href: '/industries/transport-fleet',
        },
      ],
      relatedChemicals: {
        heading: 'Heavy Plant Petrochemical Degreasers',
        explanation:
          'Industrial emulsifying degreasers designed specifically for quick-release oil-water separators to comply with UK environmental regulations.',
        suggestedTypes: ['Hydrus Heavy Duty Degreaser', 'Hydrus Super Stripper', 'Hydrus Emulsion Break TFR'],
        href: '/chemicals',
      },
      relatedAccessories: [
        {
          name: 'Dual-Lance Wand with Low-Pressure Steam Valve',
          role: 'Instant switching from high-pressure blast to low-pressure chemical/steam application.',
          href: '/attachments',
        },
        {
          name: 'Under-Chassis Pressure Wash Broom',
          role: 'Multi-nozzle wheeled spray bar for rapid tracked vehicle undercarriage cleaning.',
          href: '/attachments',
        },
      ],
      trailerConfigurator: {
        suggested: true,
        applicationIntent: 'heavy-equipment',
        why: 'Field service technicians require trailer or van-mounted hot water skids to service breakdowns directly on quarry sites.',
        href: '/trailers/configure',
      },
      bespokeEngineering: {
        suggested: true,
        why: 'Quarries and plant hire depots frequently require multi-bay wash installations with automated wheel-wash demuckers.',
        href: '/wash-plant',
      },
    },
  },
];

export function getMessQuestEpisodeBySlug(slug: string): MessQuestEpisode | undefined {
  return messQuestEpisodes.find((ep) => ep.slug === slug);
}

export function getAllMessQuestEpisodes(): MessQuestEpisode[] {
  return messQuestEpisodes;
}

export function getRelatedMessQuestEpisodes(currentSlug: string, limit = 2): MessQuestEpisode[] {
  return messQuestEpisodes.filter((ep) => ep.slug !== currentSlug).slice(0, limit);
}
