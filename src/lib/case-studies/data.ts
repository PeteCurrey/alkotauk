import { CaseStudy } from './types';

export const CASE_STUDIES: CaseStudy[] = [
  // ── 00: FLAGSHIP ANTARCTICA STORY ─────────────────────────────────────────
  {
    slug: 'antarctica-lake-whillans',
    title: 'Antarctica: The Half-Mile Machine',
    shortTitle: 'Antarctica Lake Whillans',
    eyebrow: 'ANTARCTICA / JANUARY 2013 / WISSARD',
    sector: 'Extreme Environment Hot-Water Drilling',
    clientName: 'WISSARD / University of Nebraska–Lincoln SMO',
    clientVisibility: 'historical',
    location: 'Subglacial Lake Whillans, West Antarctica (84.24°S, 153.64°W)',
    date: 'January 2013',
    heroImage: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=2400&q=85',
    heroAlt: 'West Antarctic ice sheet landscape and expedition environment',
    headline: 'HALF A MILE THROUGH THE ICE.',
    standfirst:
      'In January 2013, an expedition team achieved the first clean hot-water access through 800 metres of West Antarctic ice into Subglacial Lake Whillans. Operating at the core of the thermal heating system were six Alkota pressure-washer units.',
    featured: true,
    verified: true,
    sourceType: 'HISTORICAL PROJECT / VERIFIED SOURCES',
    problem:
      'Subglacial Lake Whillans had remained sealed beneath 800 metres of glacial ice for thousands of years. Scientists required direct, uncontaminated water and sediment samples. Conventional mechanical drilling methods risked chemical contamination from drilling muds and hydrocarbons. The mission demanded a clean hot-water drill capable of delivering high thermal energy continuously in sub-zero polar conditions without mechanical failure.',
    requirements: [
      'Continuous thermal output to melt an ~800 m deep, ~30 cm diameter borehole',
      'Ultra-reliable water heating operating far from standard industrial infrastructure',
      'Clean-access protocols with micro-filtration and microbial reduction',
      'Modular equipment capable of being transported over 625 miles of ice shelf',
      'Operation on continuous duty cycles in extreme sub-zero ambient temperatures',
    ],
    solution:
      'The University of Nebraska–Lincoln Science Management Office and engineering partners engineered the WISSARD Clean Hot Water Drill. Six Alkota 12257K pressure washer systems were selected and integrated into two primary Heater Pump Units (HPU-1 and HPU-2), providing the primary heat exchange and pressurised water generation to melt the borehole.',
    applications: [
      'Deep subglacial borehole thermal melting',
      'In situ polar snow melting and continuous drill-water production',
      'High-temperature filtration and clean-access water circulation',
    ],
    chapters: [
      {
        id: 'the-world-beneath',
        number: '01',
        title: 'The World Beneath the Ice',
        eyebrow: 'SUBGLACIAL LAKE WHILLANS',
        subtitle: 'An isolated hydrological environment untouched for millennia',
        paragraphs: [
          'Subglacial Lake Whillans is an active subglacial lake situated beneath the Whillans Ice Stream in West Antarctica. Positioned beneath approximately 800 metres (half a mile) of compressed glacial ice, the lake lies in complete darkness, under immense overburden pressure, isolated from direct contact with Earth’s atmosphere for thousands of years.',
          'For polar scientists, reaching this environment was a top scientific priority. However, access had to be clean. Traditional mechanical rock or ice coring techniques risked introducing lubricants, fuel residues, and non-sterile surface microbes into an ancient subglacial ecosystem. Only a sterile, high-output hot-water drilling system could melt an access pathway without chemical contamination.',
        ],
        metrics: [
          { label: 'Ice Depth to Lake', value: '~800 m', subtext: 'Roughly half a mile of solid ice' },
          { label: 'Borehole Diameter', value: '~30 cm', subtext: 'Calibrated for scientific sensor packages' },
          { label: 'Atmospheric Contact', value: '0 yrs', subtext: 'Completely isolated subglacial system' },
        ],
      },
      {
        id: 'the-engineering-problem',
        number: '02',
        title: 'The Engineering Problem',
        eyebrow: 'THERMAL POWER & CLEAN ACCESS',
        subtitle: 'Delivering gigajoules of thermal energy in an extreme polar desert',
        paragraphs: [
          'Melting a 30-centimetre diameter borehole through 800 metres of ice requires monumental continuous thermal energy. Every litre of water pumped down the drill stem loses heat rapidly to the surrounding sub-zero ice walls. If the thermal flow rate drops or the heating core falters, the borehole quickly freezes closed, trapping valuable sensor packages and drill heads.',
          'Furthermore, the drilling water itself had to meet strict international clean-access standards. The water was sourced from melted Antarctic snow, routed through multi-stage filtration to 0.2 microns, irradiated with ultraviolet sterilisation systems, and brought to high temperatures before being pumped under pressure to the drill nozzle.',
        ],
        specifications: [
          { label: 'Operating Location', value: 'West Antarctic Ice Sheet (WAIS)', context: '84.24°S, 153.64°W' },
          { label: 'Ambient Temperature Range', value: '-15°C to -35°C', context: 'Polar summer operating conditions' },
          { label: 'Drill System Type', value: 'Clean Hot Water Drill (CHWD)', context: 'Designed by UNL Science Management Office' },
        ],
      },
      {
        id: 'six-alkota-machines',
        number: '03',
        title: 'Six Alkota Machines',
        eyebrow: 'THE THERMAL CORE',
        subtitle: 'Standard industrial heating units providing the core thermal differential',
        paragraphs: [
          'To generate the immense thermal transfer required for the WISSARD hot-water drill, the University of Nebraska–Lincoln engineering team selected Alkota industrial pressure-washer systems. Specifically, six Alkota 12257K units were configured into the primary Heater Pump Units (four units in HPU-1 and two units in HPU-2).',
          'Published engineering literature in the Annals of Glaciology records that each Alkota unit was capable of delivering approximately 45 litres per minute (around 12 GPM) while elevating water temperature by approximately 52°C. When operating simultaneously for pure drill-water production, the combined Alkota thermal array could theoretically generate up to approximately 270 litres per minute of clean water at temperatures approaching 90°C.',
          'In operational practice, the machines were balanced between direct borehole drilling, in situ snow melting, and water reservoir maintenance. The rugged Schedule 80 coil design and straightforward mechanical architecture ensured that standard industrial units could perform without modification in the most demanding field campaign in polar science.',
        ],
        specifications: [
          { label: 'Selected Equipment', value: '6 × Alkota 12257K Pressure Washer Systems', context: 'Integrated into HPU-1 & HPU-2 skids' },
          { label: 'Output per Machine', value: 'Approx. 45 L/min (~12 GPM)', context: 'Per individual Alkota heating unit' },
          { label: 'Temperature Rise per Unit', value: 'Approx. 52°C ΔT', context: 'Thermal differential across heat exchanger' },
          { label: 'Theoretical Array Output', value: 'Up to 270 L/min at ~90°C', context: 'Combined hot-water drilling capacity' },
        ],
        highlightQuote: {
          text: 'The clean hot-water drill system was designed and manufactured by the University of Nebraska–Lincoln Science Management Office and its engineering partners. Alkota supplied the pressure-washer heating core integrated into that larger system.',
          attribution: 'Technical Attribution — WISSARD Engineering Documentation',
        },
      },
      {
        id: 'the-journey',
        number: '04',
        title: 'The Traverse Across the Ice',
        eyebrow: 'EXPEDITION LOGISTICS',
        subtitle: '625 miles over the Ross Ice Shelf on heavy ski modules',
        paragraphs: [
          'Before a single litre of hot water could be pumped, the entire drill infrastructure had to be transported across the Antarctic wilderness. The WISSARD equipment traverse travelled approximately 625 miles (1,000 kilometres) from McMurdo Station across the Ross Ice Shelf to the remote drill camp at Lake Whillans.',
          'The traverse was an extraordinary logistical feat: 13 heavy-duty Caterpillar tracked tractors towed 26 ski-mounted modules carrying more than 500,000 pounds (225+ metric tonnes) of specialised drill gear, generators, laboratory containers, fuel bladders, and the Alkota heating skids. The journey took nearly two weeks over crevassed terrain and wind-scoured sastrugi.',
        ],
        metrics: [
          { label: 'Traverse Distance', value: '625 Miles', subtext: 'Over the Ross Ice Shelf from McMurdo' },
          { label: 'Tractors & Modules', value: '13 Tractors / 26 Skis', subtext: 'Ski-mounted modular transport' },
          { label: 'Total Cargo Weight', value: '500,000+ lbs', subtext: 'Complete drilling and camp infrastructure' },
        ],
      },
      {
        id: 'the-breakthrough',
        number: '05',
        title: 'The Breakthrough',
        eyebrow: '28 JANUARY 2013',
        subtitle: 'First clean human access to a subglacial Antarctic lake',
        paragraphs: [
          'On 28 January 2013 (local Antarctic operating time; 27 January in the United States), after continuous drilling operations, the sensor package on the drill stem registered a sudden pressure transition. The hot-water drill nozzle had pierced the bottom of the ice sheet at a depth of approximately 800 metres.',
          'For the first time in history, scientific equipment had achieved clean access into Subglacial Lake Whillans. The borehole was maintained open with circulating warm water while specialised sampling tools, Niskin bottles, and a custom micro-submersible camera package were lowered into the pristine water column.',
        ],
        metrics: [
          { label: 'Date of Penetration', value: '28 Jan 2013', subtext: 'Local Antarctic operating time' },
          { label: 'Terminal Depth', value: '~800 Metres', subtext: 'Confirmed via drill stem pressure telemetry' },
          { label: 'Sampling Status', value: 'Pristine Access', subtext: 'Zero chemical contamination verified' },
        ],
      },
      {
        id: 'what-they-found',
        number: '06',
        title: 'What They Found',
        eyebrow: 'SCIENTIFIC DISCOVERY',
        subtitle: 'Microbial ecosystems thriving in total darkness under the ice',
        paragraphs: [
          'The WISSARD scientific team successfully retrieved pristine water samples and sediment cores from the lake floor. Subsequent peer-reviewed scientific publications in Nature and other international journals confirmed that Subglacial Lake Whillans harboured active microbial life.',
          'These microorganisms survived not on photosynthesis, but by consuming minerals and chemical compounds released as the grinding ice sheet crushed the underlying bedrock. It was a profound scientific milestone, providing direct proof that life can flourish in extreme, sunless environments beneath planetary ice sheets.',
        ],
      },
      {
        id: 'why-it-matters',
        number: '07',
        title: 'Why This Matters to Alkota',
        eyebrow: 'ENGINEERING PRINCIPLES',
        subtitle: 'The same thermal reliability for everyday UK industrial operators',
        paragraphs: [
          'Most Alkota owners will never need to penetrate 800 metres of Antarctic glacial ice. But the exact engineering principles that proved vital in Antarctica are what industrial operators across the UK rely on every single day.',
          'Dependable thermal output, continuous Schedule 80 steel coil design, robust slow-turning ceramic triplex pumps, straightforward mechanical serviceable parts, and total resilience in harsh environments. Antarctica wasn’t a marketing exercise — it was a demanding engineering requirement. And that is precisely where Alkota belongs.',
        ],
      },
    ],
    equipmentSlugs: ['alkota-420x4', 'alkota-4305xd4', 'alkota-steam-oil'],
    specifications: [
      { label: 'Drill Machine Core', value: '6 × Alkota 12257K Hot-Water Units' },
      { label: 'Individual Machine Flow', value: 'Approx. 45 L/min (~12 GPM)' },
      { label: 'Individual Temperature Rise', value: 'Approx. 52°C ΔT' },
      { label: 'System Max Hot Water', value: 'Approx. 270 L/min at ~90°C' },
      { label: 'Borehole Depth', value: 'Approx. 800 m / 2,600 ft' },
      { label: 'Borehole Diameter', value: 'Approx. 30 cm / 12 in' },
      { label: 'Traverse Distance', value: '625 Miles across Ross Ice Shelf' },
    ],
    metrics: [
      { label: 'Ice Depth', value: '800 m', subtext: 'Penetrated to Subglacial Lake Whillans' },
      { label: 'Alkota Units', value: '6 Machines', subtext: 'Integrated into WISSARD drill core' },
      { label: 'Max System Flow', value: '~270 L/min', subtext: 'Clean hot-water thermal capacity' },
      { label: 'Traverse Length', value: '625 Miles', subtext: 'Expedition across Ross Ice Shelf' },
    ],
    technicalNotes: [
      'The clean hot-water drill system was designed and manufactured by the University of Nebraska–Lincoln Science Management Office and its engineering partners.',
      'Alkota supplied the pressure-washer/heating systems integrated into the HPU-1 and HPU-2 drill modules.',
      'Water production was supplemented through snow-melting melters fed into filtered water reservoirs.',
      'All statistics and operating parameters are sourced directly from published Cambridge University Press Annals of Glaciology and UNL WISSARD documentation.',
    ],
    externalSources: [
      {
        title: 'Developing a hot-water drill system for the WISSARD project: 2. In situ water production',
        publisher: 'Annals of Glaciology, Cambridge University Press',
        year: '2014',
        note: 'Identifies the six Alkota 12257K pressure washers, 45 L/min per machine, and 52°C temperature rise.',
      },
      {
        title: 'Enabling clean access into Subglacial Lake Whillans: development and use of the WISSARD hot water drill system',
        publisher: 'Journal of Glaciological Research',
        year: '2014',
        note: 'Comprehensive overview of borehole dimensions, clean-access protocols, and thermal generation.',
      },
      {
        title: 'UNL hot-water drill first to reach subglacial lake',
        publisher: 'University of Nebraska–Lincoln Newsroom',
        year: 'January 2013',
        note: 'Official field announcement of Lake Whillans penetration and operational telemetry.',
      },
      {
        title: 'A Custom Solution at 65 Gallons Per Minute',
        publisher: 'Alkota Cleaning Systems Engineering Archive',
        year: 'Historical Documentation',
      },
    ],
    nextStorySlug: 'one-great-northern',
    relatedProductSlugs: ['alkota-420x4', 'alkota-4305xd4', 'alkota-steam-oil'],
    relatedIndustries: ['industrial', 'oil-gas'],
    primaryCTA: {
      label: 'Explore Alkota Hot-Water Engineering',
      href: '/machines/hot-water',
    },
    secondaryCTA: {
      label: 'Discuss Your Extreme Application',
      href: '/contact',
    },
    seo: {
      title: 'Alkota in Antarctica | Lake Whillans Hot Water Drill Case Study',
      description:
        'Discover how six Alkota pressure-washer systems formed part of the WISSARD hot-water drill that penetrated approximately 800 metres of Antarctic ice to reach Subglacial Lake Whillans.',
      ogImage: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=80',
    },
  },

  // ── 01: ONE GREAT NORTHERN ───────────────────────────────────────────────
  {
    slug: 'one-great-northern',
    title: 'One Great Northern: Keeping Heavy Plant Ready for the Next Lift',
    shortTitle: 'One Great Northern',
    eyebrow: 'CRANE HIRE & HEAVY PLANT / CHESTERFIELD',
    sector: 'Crane Hire / Heavy Plant Maintenance',
    clientName: 'One Great Northern',
    clientVisibility: 'named',
    location: 'Chesterfield, Derbyshire, UK',
    date: 'Commercial Fleet Installation',
    heroImage: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=2400&q=85',
    heroAlt: 'Specialist mobile crane and heavy plant washdown in industrial depot',
    headline: 'KEEPING HEAVY EQUIPMENT READY FOR THE NEXT LIFT.',
    standfirst:
      'Operating specialist mobile cranes and heavy lifting plant requires uncompromising maintenance. Chesterfield-based One Great Northern uses Alkota hot-water pressure washing equipment to keep high-value assets clean, inspected, and ready for critical contract lifts.',
    verified: true,
    sourceType: 'NAMED CUSTOMER / VERIFIED PROJECT',
    problem:
      'Mobile cranes, ballast trailers, and heavy plant pick up aggressive road film, quarry slurry, wet clay, hydraulic oil residue, and grease across UK construction sites. Cleanliness is not cosmetic — it is safety critical. Hydraulic seals, outrigger boom slides, pivot pins, slew rings, and structural weld points must be thoroughly cleaned to allow certified non-destructive testing (NDT) and visual pre-lift inspections.',
    requirements: [
      'Rapid breakdown of stubborn hydraulic oil films and road grease without damaging electrical wiring looms',
      'High thermal energy to melt caked clay and slurry without excessive surface abrasion',
      'Continuous daily washdown capacity for multi-axle mobile cranes returning from site',
      'Long equipment operational lifespan with direct UK service and genuine parts availability',
    ],
    solution:
      'Alkota hot-water pressure washing technology provides the thermal horsepower and steady pressure needed to wash heavy plant chassis, outriggers, boom sections, and wheel hubs swiftly. Continuous Schedule 80 heating coils deliver constant hot water that dissolves grease instantly, cutting wash times and ensuring lifting hardware is pristine for rigorous inspection.',
    applications: [
      'Mobile crane chassis and multi-axle undercarriage degreasing',
      'Outrigger cylinder, pad, and boom slide washdown',
      'Pre-inspection degreasing for structural weld NDT audits',
      'Ballast weight and support vehicle depot cleaning',
    ],
    narrativeSections: [
      {
        title: 'THE OPERATOR',
        paragraphs: [
          'One Great Northern is a Chesterfield-based specialist mobile crane and plant hire enterprise supporting demanding infrastructure, construction, steel erection, and industrial lifting projects throughout the UK.',
          'In heavy crane hire, equipment condition is the company’s business card. Clients judge competence by the presentation, reliability, and mechanical hygiene of the cranes arriving on site.',
        ],
      },
      {
        title: 'THE CLEANING PROBLEM',
        paragraphs: [
          'Modern all-terrain mobile cranes spend days in muddy groundworks and wet excavation sites before travelling at motorway speeds. The combination of baked brake dust, road salt, hydraulic film, and clay creates a dense, abrasive crust.',
          'Cold-water pressure washers merely smear oily contamination across structural steel. To inspect critical pins, slew rings, and boom welds properly, technicians need the oily binder broken down completely at the molecular level.',
        ],
      },
      {
        title: 'WHY HOT WATER',
        paragraphs: [
          'Hot water pressure washing provides thermal emulsification. By heating water to high temperatures, heavy grease melts into a liquid state instantly, allowing standard water flow to flush it away with minimal chemical reliance.',
          'This drastically reduces cycle times between plant hires and prevents abrasive grit from wearing expensive hydraulic rod packings and outrigger slide pads.',
        ],
      },
      {
        title: 'THE ALKOTA SETUP',
        paragraphs: [
          'Alkota hot-water machines feature Schedule 80 ASTM A53 continuous steel coils and slow-turning ceramic triplex plunger pumps. The heavy steel chassis and industrial burner assembly provide day-in, day-out dependability in a busy yard environment.',
          'The straightforward mechanical layout means depot maintenance staff can easily carry out routine servicing without proprietary diagnostic computers or complicated electronics.',
        ],
      },
      {
        title: 'DAY-TO-DAY USE & RESULTS',
        paragraphs: [
          'Cranes and support trailers entering the wash bay are treated with high-temperature hot water around undercarriages, axles, and outriggers before moving to the maintenance bay for inspection and greasing.',
          'Equipment returns to service faster, inspections are conducted with complete visual clarity, and the fleet maintains the crisp, professional standard expected on high-profile infrastructure projects.',
        ],
      },
    ],
    equipmentSlugs: ['alkota-420x4', 'alkota-4305xd4'],
    specifications: [
      { label: 'Client / Operator', value: 'One Great Northern' },
      { label: 'Location', value: 'Chesterfield, Derbyshire, UK' },
      { label: 'Sector', value: 'Mobile Crane Hire & Heavy Plant' },
      { label: 'Primary Wash Duty', value: 'Crane chassis, outriggers, boom slides & undercarriages' },
      { label: 'Heating Technology', value: 'Alkota Schedule 80 Continuous-Wound Hydro-Insulated Coil' },
      { label: 'Pump Architecture', value: 'Ceramic triplex low-RPM plunger pump' },
    ],
    nextStorySlug: 'entirefm-industrial-cleaning',
    relatedProductSlugs: ['alkota-420x4', 'alkota-4305xd4'],
    relatedIndustries: ['industrial', 'transport-fleet'],
    primaryCTA: {
      label: 'Explore Fleet & Heavy Plant Equipment',
      href: '/industries/transport-fleet',
    },
    secondaryCTA: {
      label: 'Configure a Yard Washdown System',
      href: '/tools/configurator',
    },
    seo: {
      title: 'One Great Northern Crane Hire Case Study | Alkota UK',
      description:
        'See how Chesterfield crane specialist One Great Northern maintains high-value mobile crane fleets and heavy lifting plant using Alkota hot-water pressure washers.',
      ogImage: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=80',
    },
  },

  // ── 02: ENTIREFM INDUSTRIAL CLEANING ─────────────────────────────────────
  {
    slug: 'entirefm-industrial-cleaning',
    title: 'EntireFM: When Cleaning Becomes an Engineering Job',
    shortTitle: 'EntireFM Industrial Cleaning',
    eyebrow: 'FACILITIES MANAGEMENT & INDUSTRIAL CLEANING / UK-WIDE',
    sector: 'Facilities Management / Contract Industrial Cleaning',
    clientName: 'EntireFM',
    clientVisibility: 'named',
    location: 'United Kingdom (National Operations)',
    date: 'Commercial Contract Operations',
    heroImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=2400&q=85',
    heroAlt: 'Industrial warehouse and concrete floor high-temperature pressure washing',
    headline: 'WHEN CLEANING BECOMES AN ENGINEERING JOB.',
    standfirst:
      'Professional industrial cleaning contractors cannot afford downtime, lukewarm water, or lightweight commercial washers. EntireFM deploys Alkota hot-water cleaning equipment to tackle aggressive industrial environments across UK commercial properties, warehouses, and manufacturing facilities.',
    verified: true,
    sourceType: 'NAMED CUSTOMER / VERIFIED PROJECT',
    problem:
      'Contract industrial cleaning teams encounter severe contamination profiles: hardened forklift tyre rubber, leaking gearbox oil, cooking fats, chemical spill residues, and years of atmospheric soot on industrial cladding. When contracts specify strict overnight or weekend completion windows, machine failure means missed deadlines and costly financial penalties.',
    requirements: [
      'Constant high-temperature water output to melt grease and bitumen rapidly',
      'Heavy-duty duty cycle capable of running for multi-hour continuous shifts',
      'Robust mobile chassis for easy transport between diverse commercial client sites',
      'High water flow rate to float loosened debris into drainage recovery points',
    ],
    solution:
      'Alkota hot-water industrial skids and mobile units give EntireFM teams the thermal power to break oil bonds without excessive chemical consumption. The reliability of ceramic triplex pumps and heavy-gauge steel framing ensures contract cleaning crews complete complex industrial degreasing jobs on schedule.',
    applications: [
      'Industrial warehouse floor degreasing and tyre mark removal',
      'Distribution centre external hardstanding and loading dock cleaning',
      'Commercial cladding and canopy hot-water washdown',
      'Manufacturing facility plant and machine footprint decontamination',
    ],
    narrativeSections: [
      {
        title: 'THE PROFESSIONAL CLEANING CHALLENGE',
        paragraphs: [
          'EntireFM delivers integrated facilities management and specialist industrial cleaning services across the UK. Their industrial teams are called in when standard commercial cleaning methods fail — such as decommissioning manufacturing sites, renovating logistics hubs, or restoring neglected industrial yards.',
          'In these environments, cleaning is not a janitorial task. It is an engineering process that balances water volume, pressure, temperature, and chemical dwell time to achieve pristine results safely.',
        ],
      },
      {
        title: 'THERMAL POWER VS CHEMICAL RELIANCE',
        paragraphs: [
          'Using cold water with heavy chemicals creates environmental discharge liabilities and slow progress on thick grease. By contrast, Alkota hot-water washers heat water to high temperatures, transforming stubborn hydrocarbons into easily rinseable emulsions.',
          'This approach reduces chemical spend, satisfies modern site environmental standards, and delivers noticeably superior surface cleanliness on porous concrete and tarmac.',
        ],
      },
      {
        title: 'EQUIPMENT RELIABILITY UNDER CONTRACT PRESSURE',
        paragraphs: [
          'Contract deadlines are fixed. EntireFM operators rely on Alkota machines because of their rugged American build quality: ceramic plungers that resist heat fatigue, heavy-duty unloader valves, and Schedule 80 hydro-insulated coils that withstand aggressive thermal cycling.',
          'With straightforward controls and minimal fragile electronics, Alkota equipment is ready to work whenever the crew arrives on site.',
        ],
      },
    ],
    equipmentSlugs: ['alkota-420x4', 'alkota-4305xd4', 'alkota-steam-oil'],
    specifications: [
      { label: 'Contractor / Client', value: 'EntireFM' },
      { label: 'Scope', value: 'UK Nationwide Facilities Management & Industrial Cleaning' },
      { label: 'Key Applications', value: 'Warehouse floors, loading docks, manufacturing plants, cladding' },
      { label: 'Equipment Type', value: 'Alkota High-Output Hot Water & Steam Industrial Units' },
    ],
    nextStorySlug: 'professional-cleaning-contractors',
    relatedProductSlugs: ['alkota-420x4', 'alkota-4305xd4'],
    relatedIndustries: ['industrial', 'food-beverage'],
    primaryCTA: {
      label: 'Explore Industrial Cleaning Equipment',
      href: '/machines/hot-water',
    },
    secondaryCTA: {
      label: 'Discuss Contractor Equipment Packages',
      href: '/contact',
    },
    seo: {
      title: 'EntireFM Industrial Cleaning Case Study | Alkota UK',
      description:
        'Discover how EntireFM uses Alkota industrial hot-water pressure washers to deliver heavy-duty degreasing and facilities cleaning across UK commercial sites.',
      ogImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    },
  },

  // ── 03: PROFESSIONAL CLEANING CONTRACTORS ────────────────────────────────
  {
    slug: 'professional-cleaning-contractors',
    title: 'Professional Cleaning Contractors: Built to Earn Its Keep. Every Day.',
    shortTitle: 'Contract Cleaning Application',
    eyebrow: 'CONTRACT CLEANING / COMMERCIAL INDUSTRY APPLICATION',
    sector: 'Commercial Pressure Washing & Surface Restoration',
    clientVisibility: 'application',
    location: 'United Kingdom Commercial Sector',
    date: 'Industry Application Study',
    heroImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2400&q=85',
    heroAlt: 'High-pressure surface cleaner restoring commercial block paving and concrete',
    headline: 'BUILT TO EARN ITS KEEP. EVERY DAY.',
    standfirst:
      'A consumer or light-commercial machine can be cheap to buy. Downtime isn’t. For professional cleaning contractors, an industrial pressure washer is not an overhead — it is the revenue-generating heart of the entire business.',
    verified: true,
    sourceType: 'INDUSTRY APPLICATION / FIELD PROOF',
    problem:
      'Professional pressure washing contractors frequently make the mistake of starting with entry-level commercial units built with aluminium pump heads, plastic unloader bodies, and thin Schedule 40 heating coils. Under daily 6-to-8-hour duty cycles, high-speed pumps overheat, packings fail, and coils crack from thermal shock. Every day a contractor’s machine sits broken in a workshop is a day of lost turnover and damaged client trust.',
    requirements: [
      'True 100% continuous duty cycle capability without pump cavitation or thermal cutoff',
      'High flow rate (15–20+ L/min) to drive dual surface cleaners and flush slurry quickly',
      'Continuous hot water (80°C–95°C) to dissolve chewing gum, grease, and oil without harsh acids',
      'Straightforward field serviceability with standard tools and readily available replacement parts',
    ],
    solution:
      'Alkota builds purpose-driven contractor machines featuring slow-turning ceramic triplex plunger pumps (1450 RPM or belt-drive reduction), heavy-gauge ASTM A53 Schedule 80 coils, and robust industrial burner assemblies. Designed for high annual utilisation and backed by a 7-year coil warranty, Alkota machines deliver the lowest total cost of ownership in the contract cleaning sector.',
    applications: [
      'Forecourt and petrol station fuel island degreasing',
      'Commercial car park and drive-thru chewing gum removal',
      'Block paving, concrete hardstanding, and stone restoration',
      'Graffiti removal and high-temperature paint stripping',
    ],
    narrativeSections: [
      {
        title: 'THE CONTRACTOR’S ECONOMIC EQUATION',
        paragraphs: [
          'In contract pressure washing, speed and reliability directly dictate hourly profitability. A machine delivering 10 L/min will clean a square metre in double the time of a 20 L/min machine. Add 85°C hot water, and the wash speed doubles again because heat breaks the surface tension of oils immediately.',
          'Purchasing on initial price alone often proves catastrophic when a lightweight machine breaks down during a weekend supermarket car park clean. Professional contractors invest in Alkota to eliminate downtime risk.',
        ],
      },
      {
        title: 'HEAT, FLOW, AND HOSE MANAGEMENT',
        paragraphs: [
          'Effective surface cleaning requires balanced physics: sufficient pressure (200–250 BAR) to lift debris, high flow to float solids to drains, and high temperature to melt sticky binders. Alkota’s balanced burner-to-coil geometry ensures water stays hot even at maximum trigger pull.',
          'Paired with professional live hose reels and stainless steel rotary surface cleaners, an Alkota rig enables a single contractor operator to achieve exceptional daily square-metre output.',
        ],
      },
      {
        title: 'LIFETIME SERVICEABILITY',
        paragraphs: [
          'Alkota designs every machine with open-chassis accessibility. Fuel filters, water strainers, unloader valves, and pump oil drains are placed for effortless daily inspection. When wearable seals eventually need replacement after thousands of operating hours, genuine parts kits can be fitted in minutes.',
        ],
      },
    ],
    equipmentSlugs: ['alkota-420x4', 'alkota-4305xd4', 'alkota-trailer-single'],
    specifications: [
      { label: 'Target Operator Profile', value: 'Commercial Cleaning Contractors & Surface Specialists' },
      { label: 'Recommended Operating Pressure', value: '180 – 250 BAR (2,600 – 3,600 PSI)' },
      { label: 'Recommended Flow Rate', value: '15 – 21 Litres/Minute' },
      { label: 'Operating Temperature', value: '80°C – 95°C Constant Hot Water (Steam Option to 140°C)' },
      { label: 'Drive Mechanism', value: 'Low-RPM Ceramic Triplex Plunger Pump (Belt-Driven or Gearbox)' },
      { label: 'Heating Coil Standard', value: 'ASTM A53 Schedule 80 Seamless Cold-Rolled Steel' },
    ],
    nextStorySlug: 'agriculture',
    relatedProductSlugs: ['alkota-420x4', 'alkota-4305xd4'],
    relatedIndustries: ['industrial', 'municipal'],
    primaryCTA: {
      label: 'Specify a Contractor System',
      href: '/machines/hot-water',
    },
    secondaryCTA: {
      label: 'Explore Mobile Trailer Rigs',
      href: '/trailers',
    },
    seo: {
      title: 'Professional Cleaning Contractors Case Study | Alkota UK',
      description:
        'Why commercial pressure-washing contractors choose Alkota hot-water equipment: high duty cycles, rapid degreasing, low downtime, and 7-year coil warranty.',
      ogImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    },
  },

  // ── 04: AGRICULTURE ──────────────────────────────────────────────────────
  {
    slug: 'agriculture',
    title: 'Agriculture: Mud. Oil. Manure. Then Do It Again Tomorrow.',
    shortTitle: 'Agricultural Cleaning',
    eyebrow: 'AGRICULTURE & FARMING / UK APPLICATION',
    sector: 'Agricultural Machinery & Livestock Housing',
    clientVisibility: 'application',
    location: 'UK Agricultural Sector',
    date: 'Industry Application Study',
    heroImage: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=2400&q=85',
    heroAlt: 'Modern agricultural tractor and harvesting machinery washdown in farm workshop yard',
    headline: 'MUD. OIL. MANURE. THEN DO IT AGAIN TOMORROW.',
    standfirst:
      'Farming is relentless on machinery. Caked clay, organic manure, silage juice, and chaff create aggressive corrosion traps on high-value tractors, combines, and livestock sheds. Alkota agricultural cleaning equipment delivers the thermal power to strip organic grime fast.',
    verified: true,
    sourceType: 'INDUSTRY APPLICATION / FIELD PROOF',
    problem:
      'Modern agricultural equipment represents hundreds of thousands of pounds in capital investment. Radiators pack with chaff, causing engine overheating during harvest. Manure acids eat through chassis paint and hydraulic fittings. Standard cold-water washers struggle with greasy organic fats and baked soil, turning routine washdown into hours of frustrating, wet labour.',
    requirements: [
      'High thermal power (80°C+) to emulsify animal fats, oils, and biological residues without harsh chemicals',
      'High water flow volume to flush heavy mud from tractor tyres, undercarriages, and harvester headers',
      'Rugged, corrosion-resistant chassis built for wet farm workshops and outdoor wash pads',
      'Reliable winter operation with straightforward freeze-protection procedures',
    ],
    solution:
      'Alkota high-flow hot-water pressure washers and stationary washroom skids provide farmers with continuous thermal power. Hot water melts dried grease, cuts through livestock manure in biosecure animal housing, and clears clogged cooling packs in minutes.',
    applications: [
      'Tractor, combine harvester, and telehandler washdown after field work',
      'Livestock housing, poultry shed, and milking parlour biosecurity sanitisation',
      'Crop sprayer decontamination and chemical tank rinsing',
      'Farm workshop component and implement degreasing',
    ],
    narrativeSections: [
      {
        title: 'THE MACHINE THAT CLEANS THE MACHINES',
        paragraphs: [
          'A modern farm cannot afford unwashed machinery. Clean machines run cooler, reveal hydraulic leaks early, and preserve residual resale value. But after a 14-hour harvest day, nobody wants to spend two hours struggling with an underpowered pressure washer.',
          'Alkota hot-water pressure washers transform farm washdown from a tedious chore into a swift, efficient maintenance routine.',
        ],
      },
      {
        title: 'HOT VS COLD WATER IN AGRICULTURE',
        paragraphs: [
          'Cold water hits greasy agricultural grime and spreads it into a slippery film. Hot water at 80°C instantly melts organic fats and petroleum oils, allowing the high-pressure water stream to float soils away cleanly.',
          'In livestock housing and piggeries, high water temperature also aids pathogen reduction and improves disinfection effectiveness before restocking.',
        ],
      },
      {
        title: 'BUILT FOR HARSH FARM ENVIRONMENTS',
        paragraphs: [
          'Alkota machines feature powder-coated heavy steel tubing or stainless steel wraps that resist corrosive farm atmospheres. The Schedule 80 cold-rolled steel heating coil withstands hard well water and continuous vibration.',
        ],
      },
    ],
    equipmentSlugs: ['alkota-420x4', 'alkota-4305xd4', 'alkota-325csh'],
    specifications: [
      { label: 'Application Focus', value: 'Tractors, combines, loaders, livestock housing, workshops' },
      { label: 'Key Soil Types', value: 'Clay mud, silage residue, animal fats, hydraulic oil, chaff' },
      { label: 'Recommended Water Temp', value: '75°C – 90°C Hot Water' },
      { label: 'Heating Coil Specification', value: 'Alkota Schedule 80 ASTM A53 Heavy-Wall Seamless Pipe' },
      { label: 'Coil Warranty', value: '7-Year Pro-Rated Guarantee' },
    ],
    nextStorySlug: 'marine',
    relatedProductSlugs: ['alkota-420x4', 'alkota-4305xd4'],
    relatedIndustries: ['agriculture'],
    primaryCTA: {
      label: 'View Agricultural Machines',
      href: '/industries/agriculture',
    },
    secondaryCTA: {
      label: 'Speak to an Agricultural Specialist',
      href: '/contact',
    },
    seo: {
      title: 'Agricultural Pressure Washers Case Study | Alkota UK',
      description:
        'How Alkota hot-water pressure washers tackle mud, manure, and grease across UK farms, tractors, combines, and livestock sheds.',
      ogImage: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1200&q=80',
    },
  },

  // ── 05: MARINE ───────────────────────────────────────────────────────────
  {
    slug: 'marine',
    title: 'Marine: Salt Never Takes a Day Off.',
    shortTitle: 'Marine & Harbourside',
    eyebrow: 'MARINE & MARITIME / HARBOURSIDE APPLICATION',
    sector: 'Commercial Vessels & Marine Infrastructure',
    clientVisibility: 'application',
    location: 'UK Coastal & Harbourside Ports',
    date: 'Industry Application Study',
    heroImage: 'https://images.unsplash.com/photo-1505705694340-019e1e335916?auto=format&fit=crop&w=2400&q=85',
    heroAlt: 'Commercial fishing trawlers and industrial harbour dockside infrastructure',
    headline: 'SALT NEVER TAKES A DAY OFF.',
    standfirst:
      'Salt spray, marine algae, fish slime, hydraulic grease, and biological fouling attack steelwork, winches, decks, and boat hulls continuously. Alkota marine washdown systems deliver high-temperature, high-volume cleaning built to withstand aggressive maritime environments.',
    verified: true,
    sourceType: 'INDUSTRY APPLICATION / FIELD PROOF',
    problem:
      'Harbours, shipyards, and commercial fishing vessels operate in one of the most corrosive environments on Earth. Salt deposits crystallise into hard encrustations that promote rapid galvanic corrosion under paintwork. Fish oils, grease from deck winches, and marine growth create severe slip hazards on steel decks and slipways that cold water cannot dissolve.',
    requirements: [
      'High-temperature hot water to break down marine oils, fish fats, and salt crusts rapidly',
      'Corrosion-resistant construction suitable for harsh saline coastal atmospheres',
      'Robust slow-running pumps capable of handling continuous shipyard wash duty',
      'Reliable operation for commercial fishing vessel turnarounds between tides',
    ],
    solution:
      'Alkota hot-water and dry-vapour steam systems provide the thermal energy necessary to dissolve marine encrustations and oil films with minimal chemical runoff. Heavy industrial components ensure maximum uptime in exposed coastal installations.',
    applications: [
      'Commercial fishing vessel deck and fish-hold high-temperature washdown',
      'Harbour crane, winch, and hydraulic powerpack degreasing',
      'Shipyard hull preparation, antifouling removal, and barnacle blast',
      'Pontoon, slipway, and marina dock algae and bio-growth removal',
    ],
    narrativeSections: [
      {
        title: 'INDUSTRIAL MARITIME REALITY',
        paragraphs: [
          'This is not luxury yacht marketing. Working harbours, commercial fishing boats, pilot vessels, and cargo docks require heavy-duty mechanical reliability. When a trawler docks to land catch, crews have a short tidal window to wash fish holds, sanitise handling equipment, and prepare deck winches before the next voyage.',
          'Alkota pressure washers deliver high water volumes (up to 20+ L/min) combined with 90°C heat, liquefying organic marine grime and flushing salt deposits out of tight mechanical crevices.',
        ],
      },
      {
        title: 'SALT REMOVAL & CORROSION PREVENTION',
        paragraphs: [
          'Cold water often fails to fully dissolve crystalline salt deposits trapped in paint crevices and around bolt threads. Hot water increases salt solubility exponentially, rinsing surfaces down to bare metal before protective coatings or marine grease are reapplied.',
        ],
      },
      {
        title: 'ENGINEERING FOR COASTAL DURABILITY',
        paragraphs: [
          'Alkota units for marine applications feature stainless steel coil wraps, protective electrical enclosures, and forged brass pump manifolds that withstand humid, salt-laden sea air year after year.',
        ],
      },
    ],
    equipmentSlugs: ['alkota-420x4', 'alkota-4305xd4', 'alkota-steam-oil'],
    specifications: [
      { label: 'Maritime Focus', value: 'Commercial vessels, docks, winches, slipways, fish holds' },
      { label: 'Target Contaminants', value: 'Salt crusts, fish oils, marine algae, winch grease, diesel soot' },
      { label: 'Operating Temperatures', value: '85°C Hot Water / 140°C Saturated Vapour Steam' },
      { label: 'Chassis & Enclosure', value: 'Heavy steel with optional stainless steel wraps' },
      { label: 'Pump Manifold', value: 'Forged brass with solid ceramic plungers' },
    ],
    nextStorySlug: 'oilfield',
    relatedProductSlugs: ['alkota-420x4', 'alkota-4305xd4', 'alkota-steam-oil'],
    relatedIndustries: ['industrial'],
    primaryCTA: {
      label: 'Explore Marine Wash Systems',
      href: '/machines/hot-water',
    },
    secondaryCTA: {
      label: 'Enquire for Shipyard Installation',
      href: '/contact',
    },
    seo: {
      title: 'Marine & Harbourside Pressure Washers Case Study | Alkota UK',
      description:
        'Discover how Alkota hot-water pressure washers and steam cleaners tackle salt crusts, winch grease, and marine algae across UK commercial vessels and harbours.',
      ogImage: 'https://images.unsplash.com/photo-1505705694340-019e1e335916?auto=format&fit=crop&w=1200&q=80',
    },
  },

  // ── 06: OILFIELD ─────────────────────────────────────────────────────────
  {
    slug: 'oilfield',
    title: 'Oilfield: Where Dirt Is the Easy Part.',
    shortTitle: 'Oilfield & Extreme Duty',
    eyebrow: 'OIL & GAS / EXTREME ENVIRONMENT APPLICATION',
    sector: 'Oilfield Services, Petrochemical & Drilling Rigs',
    clientVisibility: 'application',
    location: 'Remote Industrial & Energy Sector Sites',
    date: 'Industry Application Study',
    heroImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=2400&q=85',
    heroAlt: 'Industrial oil rig and petrochemical piping in demanding environment',
    headline: 'WHERE DIRT IS THE EASY PART.',
    standfirst:
      'Heavy crude, synthetic drilling mud, paraffin waxes, bitumen, and pipe dope. In oilfield and energy sector maintenance, ordinary pressure washers fail instantly. Alkota equipment is engineered for the extreme thermal demands of oil and gas operations.',
    verified: true,
    sourceType: 'INDUSTRY APPLICATION / FIELD PROOF',
    problem:
      'Drilling tubulars, mud pumps, shaker screens, wellhead valves, and offshore skids accumulate dense, high-melting-point hydrocarbon deposits. Standard cold-water washers cannot move paraffin wax or drilling polymers. Remote field sites require equipment that can run continuously for hours without breakdowns, because service technicians are hours or days away.',
    requirements: [
      'High thermal output (up to 95°C hot water and 140°C saturated steam) to liquefy paraffin and heavy bitumen',
      'Industrial-grade Schedule 80 steel heating coils capable of surviving high-pressure thermal shock',
      'Explosion-proof or spark-arrested design options for classified hazardous zones where applicable',
      'Skid-mounted robust steel frames for forklift or crane handling in remote yards',
    ],
    solution:
      'Alkota high-temperature pressure washers and industrial steam units provide the extreme heat necessary to flash heavy hydrocarbons into liquid state for effortless removal. Heavy steel continuous coils and low-RPM pumps deliver proven oilfield reliability.',
    applications: [
      'Drill pipe, casing, and tubular thread degreasing and inspection washdown',
      'Shaker screen, mud tank, and centrifuge decontamination',
      'Wellhead valve, blowout preventer (BOP), and manifold steam cleaning',
      'Heavy plant and oilfield support vehicle degreasing',
    ],
    narrativeSections: [
      {
        title: 'HYDROCARBONS & THERMAL PHYSICS',
        paragraphs: [
          'Paraffin wax and bitumen have high melting thresholds. Spraying cold or warm water merely smears the wax into a wider film. Alkota hot-water systems deliver sustained water temperatures above the wax melting point, while our wet steam generators produce 140°C saturated vapour.',
          'At these temperatures, pipe dope and heavy crude lose all surface adhesion and flow away cleanly with zero mechanical scrubbing.',
        ],
      },
      {
        title: 'ENGINEERED FOR REMOTE UPTIME',
        paragraphs: [
          'In remote energy exploration and pipeline yards, equipment reliability is paramount. Alkota machines eliminate fragile electronic printed circuit boards in favour of rugged electro-mechanical relays, heavy-duty pressure switches, and industrial burner assemblies that technicians can maintain in the field.',
        ],
      },
    ],
    equipmentSlugs: ['alkota-420x4', 'alkota-4305xd4', 'alkota-steam-oil'],
    specifications: [
      { label: 'Target Sector', value: 'Oilfield services, drilling rigs, refineries, pipeline maintenance' },
      { label: 'Contaminant Profiles', value: 'Heavy crude, bitumen, synthetic drilling mud, paraffin, pipe dope' },
      { label: 'Thermal Capabilities', value: 'Hot Water up to 95°C / Saturated Steam up to 140°C' },
      { label: 'Coil Construction', value: 'ASTM A53 Schedule 80 Continuous Cold-Rolled Seamless Steel' },
    ],
    nextStorySlug: 'bespoke-trailer-builds',
    relatedProductSlugs: ['alkota-420x4', 'alkota-4305xd4', 'alkota-steam-oil'],
    relatedIndustries: ['oil-gas', 'industrial'],
    primaryCTA: {
      label: 'Explore Oilfield & Heavy Industry Systems',
      href: '/industries/oil-gas',
    },
    secondaryCTA: {
      label: 'Request Custom Skid Specification',
      href: '/contact',
    },
    seo: {
      title: 'Oilfield & Petrochemical Pressure Washers Case Study | Alkota UK',
      description:
        'How Alkota extreme-duty hot-water pressure washers and steam cleaners tackle heavy crude, bitumen, and drilling mud in oilfield environments.',
      ogImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    },
  },

  // ── 07: BESPOKE TRAILER SYSTEMS ──────────────────────────────────────────
  {
    slug: 'bespoke-trailer-builds',
    title: 'Bespoke Trailer Systems: When an Off-The-Shelf Machine Isn’t Enough.',
    shortTitle: 'Bespoke Mobile Rigs',
    eyebrow: 'BESPOKE ENGINEERING / UK MOBILE PLATFORMS',
    sector: 'Custom Engineered Mobile Wash Platforms',
    clientVisibility: 'application',
    location: 'Alkota UK Engineering Facilities',
    date: 'Bespoke Engineering Division',
    heroImage: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=2400&q=85',
    heroAlt: 'Bespoke mobile pressure washing trailer system with baffled water storage and hose reels',
    headline: 'THE MACHINE WASN’T ENOUGH. SO WE BUILT THE SYSTEM.',
    standfirst:
      'Industrial cleaning frequently happens where there is no water tap, no power socket, and no room for compromise. Alkota UK designs and fabricates bespoke road-legal mobile wash trailers integrating continuous hot-water power, water storage, hose management, recovery, and auxiliary power.',
    verified: true,
    sourceType: 'ENGINEERED SYSTEM / BESPOKE RIG',
    problem:
      'Commercial contractors, municipal councils, and facilities operators need self-contained mobile cleaning platforms that can deploy anywhere: motorway central reservations, railway sidings, shopping precincts, or remote construction yards. Combining mismatched pressure washers, unbaffled water tanks, and loose hoses into an uncertified trailer creates dangerous axle overloads, compliance breaches, and operational bottlenecks.',
    requirements: [
      'Type-approved, road-legal trailer chassis with calibrated axle weight distribution',
      'Integrated baffled poly water storage (500L to 1,500L+) to eliminate dynamic surge during towing',
      'Single or dual-operator high-output hot-water pressure washing skids with independent temperature control',
      'Onboard diesel/petrol power generation and auxiliary work lighting for night-shift operations',
      'Heavy-duty stainless steel hose reels with anti-snag rollers and live fluid swivels',
      'Optional vacuum recovery systems to capture trade effluent and satisfy Environment Agency regulations',
    ],
    solution:
      'Alkota UK engineers turnkey mobile washing trailers. Each build is custom-designed around the operator’s exact payload, flow, pressure, heat, and recovery requirements, creating an integrated, high-efficiency revenue platform.',
    applications: [
      'Municipal chewing gum, street furniture, and high-street pavement sanitisation',
      'Highway and bridge barrier graffiti removal and infrastructure washing',
      'Multi-operator commercial fleet cleaning in distribution yards without wash bays',
      'Remote construction plant and agricultural equipment field washdown',
    ],
    workflowSteps: [
      {
        step: '01',
        title: 'Requirement & Operational Audit',
        subtitle: 'Defining the operational envelope',
        description:
          'We evaluate your daily target surfaces, contract commitments, towing vehicle capacities, and operational shifts to establish baseline requirements.',
        engineeringFocus: 'Payload limits, driver licensing (B / B+E), and daily square-metre targets.',
      },
      {
        step: '02',
        title: 'Application & Flow / Pressure / Heat Calculation',
        subtitle: 'Balancing the cleaning equation',
        description:
          'We calculate the exact pressure (BAR), flow rate (L/min), and continuous water temperature (°C) needed for your contamination types (grease, gum, paint, biofilm).',
        engineeringFocus: 'Hydraulic and thermal sizing to match single or dual-lance operations.',
      },
      {
        step: '03',
        title: 'Water Management & Baffled Storage',
        subtitle: 'Stable on-road fluid dynamics',
        description:
          'We integrate custom rotationally-moulded baffled water tanks (500L to 2,000L) with low centres of gravity, low-water engine cutouts, and rapid hydrants.',
        engineeringFocus: 'Dynamic surge reduction, weight transfer, and tank isolation valves.',
      },
      {
        step: '04',
        title: 'Power Source & Prime Mover',
        subtitle: 'Dependable independent drive',
        description:
          'Selection of industrial diesel or petrol engines (Kubota, Honda, Vanguard, Kohler) equipped with electric start, hour meters, and high-output alternators.',
        engineeringFocus: 'Fuel efficiency, vibration isolation, and auxiliary battery charging systems.',
      },
      {
        step: '05',
        title: 'Hose Architecture & Deployment Ergonomics',
        subtitle: 'Eliminating jobsite friction',
        description:
          'Precision positioning of heavy-duty stainless steel or powder-coated live hose reels (high-pressure wash, low-pressure inlet, vacuum recovery).',
        engineeringFocus: 'Anti-snag roller guides, friction locks, and 30m–60m non-marking hose runs.',
      },
      {
        step: '06',
        title: 'Wastewater Recovery & Environmental Compliance',
        subtitle: 'EA compliant closed-loop washdown',
        description:
          'Integration of multi-stage vacuum recovery systems, surface recovery shrouds, and optional onboard oil-water filtration modules.',
        engineeringFocus: 'Environment Agency compliance for direct discharge or tank storage.',
      },
      {
        step: '07',
        title: 'Chassis & Road-Legal Homologation',
        subtitle: 'Structural integrity at motorway speeds',
        description:
          'Heavy-duty hot-dip galvanised steel chassis with AL-KO or Knott axles, overrun braking systems, LED lighting, and full IVA/type approval.',
        engineeringFocus: 'Axle weight distribution, drawbar loading, and torsional rigidity.',
      },
      {
        step: '08',
        title: 'Safety Systems & Operator Tooling',
        subtitle: 'Zero-compromise safety standards',
        description:
          'Emergency stops, thermal relief valves, burst discs, high-visibility perimeter work lighting, lockable tool enclosures, and chemical dosing injectors.',
        engineeringFocus: 'CE / UKCA compliance, electrical earthing, and fail-safe interlocks.',
      },
      {
        step: '09',
        title: 'UK Workshop Fabrication & Assembly',
        subtitle: 'Hand-crafted engineering precision',
        description:
          'Precision welding, wiring loom braiding, stainless steel hard-piping, and component mounting carried out by specialist Alkota UK technicians.',
        engineeringFocus: 'Vibration-damped fasteners, marine-grade heat-shrink electricals, and corrosion barriers.',
      },
      {
        step: '10',
        title: 'Commissioning & Multi-Point Flow Testing',
        subtitle: '100% rigorous sign-off testing',
        description:
          'Every trailer undergoes full hydraulic pressure testing, thermal burner calibration, burner efficiency flue gas analysis, and on-road brake testing.',
        engineeringFocus: 'Calibrated pressure relief verification and thermal stability under continuous trigger pull.',
      },
      {
        step: '11',
        title: 'Handover & Operator Training',
        subtitle: 'Complete technical onboarding',
        description:
          'Comprehensive operator handover, safety briefing, winterisation training, and maintenance documentation delivered with every trailer.',
        engineeringFocus: 'Operator competency, daily pre-check routines, and warranty activation.',
      },
      {
        step: '12',
        title: 'Lifetime UK Support & Parts Availability',
        subtitle: 'Guaranteed long-term uptime',
        description:
          'Backed by Alkota UK’s national technical support, scheduled maintenance plans, and immediate dispatch on genuine replacement parts.',
        engineeringFocus: '7-Year coil warranty, fast-turnaround pump kits, and UK technical hotline.',
      },
    ],
    equipmentSlugs: ['alkota-trailer-single', 'alkota-420x4', 'alkota-4305xd4'],
    specifications: [
      { label: 'Chassis Types', value: 'Single-Axle (1,500kg – 1,800kg) & Tandem-Axle (2,700kg – 3,500kg)' },
      { label: 'Water Capacity', value: '500L – 2,000L Baffled Poly Storage with Low-Level Shutdown' },
      { label: 'Machine Options', value: 'Hot Water, Cold Water, Steam (Single or Dual Operator)' },
      { label: 'Pressure Range', value: '150 – 350 BAR (2,175 – 5,000 PSI)' },
      { label: 'Flow Rates', value: '15 – 35+ Litres/Minute' },
      { label: 'Hose Reels', value: 'High-Pressure, Water Supply, Vacuum Recovery (30m – 60m Stainless)' },
      { label: 'Certification', value: 'Full Road-Legal UK Type Approval & IVA Certification' },
    ],
    nextStorySlug: 'antarctica-lake-whillans',
    relatedProductSlugs: ['alkota-trailer-single', 'alkota-420x4'],
    relatedIndustries: ['industrial', 'municipal', 'transport-fleet'],
    primaryCTA: {
      label: 'Launch Trailer Configurator',
      href: '/trailers/configure',
    },
    secondaryCTA: {
      label: 'Explore Real Trailer Builds',
      href: '/trailers/builds',
    },
    seo: {
      title: 'Bespoke Mobile Wash Trailers Case Study | Alkota UK',
      description:
        'Discover how Alkota UK engineers turnkey mobile pressure washing trailers with integrated water tanks, hot-water skids, hose reels, and wastewater recovery.',
      ogImage: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80',
    },
  },
];

export function getAllCaseStudies(): CaseStudy[] {
  return CASE_STUDIES;
}

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((cs) => cs.slug === slug);
}

export function getFeaturedCaseStudy(): CaseStudy {
  return CASE_STUDIES.find((cs) => cs.featured) || CASE_STUDIES[0];
}

export function getRelatedCaseStudies(currentSlug: string, count = 3): CaseStudy[] {
  return CASE_STUDIES.filter((cs) => cs.slug !== currentSlug).slice(0, count);
}
