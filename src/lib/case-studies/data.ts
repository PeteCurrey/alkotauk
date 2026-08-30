import { CaseStudy } from './types';

export const CASE_STUDIES: CaseStudy[] = [
  // ── 00: FLAGSHIP ANTARCTICA STORY ─────────────────────────────────────────
  {
    slug: 'antarctica-lake-whillans',
    title: 'Antarctica: The Half-Mile Machine',
    shortTitle: 'Antarctica Lake Whillans',
    eyebrow: 'ANTARCTICA / JANUARY 2013 / WISSARD',
    sector: 'Extreme Environment Hot-Water Drilling',
    hierarchyLevel: 'FLAGSHIP_HISTORY',
    clientName: 'WISSARD / University of Nebraska–Lincoln SMO',
    clientVisibility: 'historical',
    location: 'Subglacial Lake Whillans, West Antarctica (84.24°S, 153.64°W)',
    date: 'January 2013 — August 2014',
    heroImage: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=2400&q=85',
    heroAlt: 'West Antarctic ice sheet landscape and polar expedition environment',
    heroCaption: 'The West Antarctic Ice Sheet above Subglacial Lake Whillans, where the WISSARD drilling campaign operated.',
    heroCredit: 'Documentary Expedition Context',
    headline: 'HALF A MILE THROUGH THE ICE.',
    standfirst:
      'In January 2013, an expedition team achieved the first clean hot-water access through 800 metres of West Antarctic ice into Subglacial Lake Whillans. Operating at the core of the thermal heating system were six Alkota pressure-washer units.',
    featured: true,
    verified: true,
    sourceType: 'HISTORICAL PROJECT / VERIFIED SOURCES',
    problem:
      'Subglacial Lake Whillans had remained sealed beneath approximately 800 metres of glacial ice for thousands of years. Scientists required direct, uncontaminated water and sediment samples. Conventional mechanical drilling methods risked chemical contamination from drilling muds and hydrocarbons. The mission demanded a clean hot-water drill capable of delivering high continuous thermal energy in sub-zero polar conditions without mechanical failure.',
    requirements: [
      'Continuous thermal output to melt an ~800 m deep, ~30 cm diameter borehole',
      'Ultra-reliable water heating operating far from standard industrial infrastructure',
      'Clean-access protocols with micro-filtration and microbial reduction',
      'Modular equipment capable of being transported over 625 miles across the Ross Ice Sheet',
      'Operation on continuous duty cycles in extreme sub-zero ambient temperatures',
    ],
    solution:
      'The University of Nebraska–Lincoln Science Management Office and engineering partners designed and manufactured the WISSARD Clean Hot Water Drill. Six Alkota 12257K pressure washer systems were selected and integrated into two primary Heater Pump Units (HPU-1 and HPU-2), providing the core thermal differential and pressurised hot water generation to melt the borehole.',
    applications: [
      'Deep subglacial borehole thermal melting',
      'In situ polar snow melting and continuous drill-water production',
      'High-temperature filtration and clean-access water circulation',
    ],
    timeline: [
      {
        yearOrDate: '2011',
        headline: 'Drill Engineering & Fabrication',
        description: 'Engineering and assembly of the WISSARD Clean Hot Water Drill begins by the University of Nebraska–Lincoln Science Management Office and partners.',
      },
      {
        yearOrDate: '2012',
        headline: 'Transport & Staging in Antarctica',
        description: 'Drill modules and Alkota heating skids transported by vessel to McMurdo Station and prepared for overland ice transit.',
      },
      {
        yearOrDate: 'JANUARY 2013',
        headline: 'Breakthrough into Subglacial Lake Whillans',
        description: 'The clean hot-water drill completes penetration through approximately 800 metres of glacial ice into the subglacial lake.',
      },
      {
        yearOrDate: '2013',
        headline: 'Pristine Sample Recovery',
        description: 'Water and sediment samples successfully recovered through the clean-access borehole and transferred for laboratory analysis.',
      },
      {
        yearOrDate: 'AUGUST 2014',
        headline: 'Peer-Reviewed Scientific Findings (Nature)',
        description: 'Research published in Nature (Christner et al.) confirms a diverse, metabolically active microbial ecosystem living in Subglacial Lake Whillans.',
      },
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
          { label: 'Atmospheric Isolation', value: 'Thousands of yrs', subtext: 'Completely sealed subglacial aquatic system' },
        ],
      },
      {
        id: 'the-engineering-problem',
        number: '02',
        title: 'The Engineering Problem',
        eyebrow: 'THERMAL POWER & CLEAN ACCESS',
        subtitle: 'Delivering continuous thermal energy in an extreme polar desert',
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
        eyebrow: 'THE THERMAL HEATING CORE',
        subtitle: 'Standard industrial heating units providing the core thermal differential',
        paragraphs: [
          'To generate the immense thermal transfer required for the WISSARD hot-water drill, the University of Nebraska–Lincoln engineering team selected Alkota industrial pressure-washer systems. Specifically, six Alkota 12257K units were configured into the primary Heater Pump Units (four units in HPU-1 and two units in HPU-2).',
          'Published engineering literature in the Annals of Glaciology records that each Alkota unit was capable of delivering approximately 45 litres per minute (around 12 GPM) while elevating water temperature by approximately 52°C. When operating simultaneously for pure drill-water production, the combined Alkota thermal array could theoretically generate up to approximately 270 litres per minute of clean water at temperatures approaching 90°C.',
          'In operational practice, the machines were balanced between direct borehole drilling, in situ snow melting, and water reservoir maintenance. The continuous-wound Schedule 80 coil design and straightforward mechanical architecture ensured that standard industrial units could perform without modification in one of the most demanding field campaigns in polar science.',
        ],
        specifications: [
          { label: 'Selected Equipment', value: '6 × Alkota 12257K Pressure Washer Systems', context: 'Integrated into HPU-1 & HPU-2 skids' },
          { label: 'Output per Machine', value: 'Approx. 45 L/min (~12 GPM)', context: 'Per individual Alkota heating unit' },
          { label: 'Temperature Rise per Unit', value: 'Approx. 52°C ΔT', context: 'Thermal differential across heat exchanger' },
          { label: 'Theoretical Array Output', value: 'Up to ~270 L/min at ~90°C', context: 'Combined hot-water drilling capacity' },
        ],
        highlightQuote: {
          text: 'The clean hot-water drill system was designed and manufactured by the University of Nebraska–Lincoln Science Management Office and its engineering partners. Alkota supplied the pressure-washer heating core integrated into that larger system.',
          attribution: 'Technical Attribution — WISSARD Engineering Documentation',
        },
      },
      {
        id: 'the-journey',
        number: '04',
        title: 'The Traverse Across the Ross Ice Sheet',
        eyebrow: 'EXPEDITION LOGISTICS',
        subtitle: 'A 625-mile traverse from the McMurdo region to Lake Whillans',
        paragraphs: [
          'Before a single litre of hot water could be pumped, the entire drill infrastructure had to be transported across the Antarctic wilderness. The WISSARD equipment traverse travelled approximately 625 miles (1,000 kilometres) from the McMurdo region across the Ross Ice Sheet to the remote drill camp at Lake Whillans.',
          'The traverse was an extraordinary logistical feat: 13 heavy-duty Caterpillar tracked tractors towed 26 ski-mounted modules carrying more than 500,000 pounds of specialised drill gear, generators, laboratory containers, fuel bladders, and the Alkota heating skids. The journey took nearly two weeks over crevassed terrain and wind-scoured sastrugi.',
        ],
        metrics: [
          { label: 'Traverse Distance', value: '625 Miles', subtext: 'Across the Ross Ice Sheet from McMurdo' },
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
          { label: 'Clean Access Status', value: 'Pristine Borehole', subtext: 'Zero chemical contamination verified' },
        ],
      },
      {
        id: 'what-the-samples-revealed',
        number: '06',
        title: 'What the Samples Revealed',
        eyebrow: 'SCIENTIFIC ANALYSIS & FINDINGS',
        subtitle: 'A living microbial ecosystem beneath the Antarctic ice sheet',
        paragraphs: [
          'The breakthrough in January 2013 was only the beginning. Water and sediment recovered through the clean-access borehole were subsequently preserved, catalogued, and subjected to rigorous laboratory analysis by the WISSARD science team.',
          'In August 2014, peer-reviewed scientific research published in Nature (Christner et al.) reported a diverse community of metabolically active microorganisms within Subglacial Lake Whillans. The research concluded that aquatic environments beneath the Antarctic ice sheet can support viable microbial ecosystems living in total darkness, drawing energy from mineral and chemical reactions rather than sunlight.',
          'Alkota equipment formed part of the engineered hot-water drilling system that enabled access to the subglacial lake; Alkota did not independently discover microbial life. The distinction between the engineering delivery of thermal access and the subsequent scientific analysis remains fundamental to our technical integrity.',
        ],
      },
      {
        id: 'why-it-matters',
        number: '07',
        title: 'Why This Matters to Alkota',
        eyebrow: 'ENGINEERING PRINCIPLES',
        subtitle: 'The same thermal reliability for everyday UK industrial operators',
        paragraphs: [
          'Most Alkota owners will never need to penetrate 800 metres of Antarctic glacial ice. But the exact engineering principles that proved vital in Antarctica are what industrial operators across Britain rely on every single day.',
          'Dependable thermal output, continuous Schedule 80 steel coil design, robust slow-turning ceramic triplex pumps, straightforward serviceable parts, and total resilience in harsh environments. Antarctica wasn’t a marketing exercise — it was a demanding engineering requirement. And that is precisely where Alkota belongs.',
        ],
      },
    ],
    equipmentSlugs: ['alkota-420x4', 'alkota-4305xd4', 'alkota-steam-oil'],
    specifications: [
      { label: 'Drill Machine Core', value: '6 × Alkota 12257K Hot-Water Units' },
      { label: 'Individual Machine Flow', value: 'Approx. 45 L/min (~12 GPM)' },
      { label: 'Individual Temperature Rise', value: 'Approx. 52°C ΔT' },
      { label: 'System Max Hot Water', value: 'Approx. 270 L/min at ~90°C (Theoretical Array Output)' },
      { label: 'Borehole Depth', value: 'Approx. 800 m / 2,600 ft' },
      { label: 'Borehole Diameter', value: 'Approx. 30 cm / 12 in' },
      { label: 'Traverse Distance', value: '625 Miles across the Ross Ice Sheet' },
    ],
    metrics: [
      { label: 'Ice Depth', value: '800 m', subtext: 'Penetrated to Subglacial Lake Whillans' },
      { label: 'Alkota Units', value: '6 Machines', subtext: 'Integrated into WISSARD drill core' },
      { label: 'Max System Flow', value: '~270 L/min', subtext: 'Clean hot-water thermal capacity' },
      { label: 'Traverse Length', value: '625 Miles', subtext: 'Overland across Ross Ice Sheet' },
    ],
    technicalNotes: [
      'The clean hot-water drill system was designed and manufactured by the University of Nebraska–Lincoln Science Management Office and its engineering partners.',
      'Alkota supplied the pressure-washer/heating systems integrated into the HPU-1 and HPU-2 drill modules.',
      'Water production was supplemented through snow-melting melters fed into filtered water reservoirs.',
      'All statistics and operating parameters are sourced directly from published Cambridge University Press Annals of Glaciology and UNL WISSARD documentation.',
    ],
    externalSources: [
      {
        title: 'UNL’s hot-water drill first to reach subglacial lake',
        publisher: 'University of Nebraska–Lincoln News Release',
        year: '2013',
        url: 'https://news.unl.edu',
        note: 'Official field announcement of Lake Whillans penetration and operational telemetry.',
      },
      {
        title: 'Developing a hot-water drill system for the WISSARD project: 2. In situ water production',
        publisher: 'Annals of Glaciology, Cambridge University Press',
        year: '2014',
        url: 'https://www.cambridge.org/core/journals/annals-of-glaciology',
        note: 'Identifies the six Alkota 12257K pressure washers, 45 L/min per machine, and 52°C temperature rise.',
      },
      {
        title: 'A microbial ecosystem beneath the West Antarctic ice sheet',
        author: 'Christner, B. C., Priscu, J. C., Achberger, A. M. et al.',
        publisher: 'Nature, Vol. 512, pp. 310–313',
        year: 'August 2014',
        url: 'https://www.nature.com/articles/nature13667',
        note: 'Peer-reviewed research documenting the diverse, active microbial community recovered from Subglacial Lake Whillans.',
      },
      {
        title: 'Enabling clean access into Subglacial Lake Whillans: development and use of the WISSARD hot water drill system',
        publisher: 'Journal of Glaciological Research',
        year: '2014',
        note: 'Comprehensive overview of borehole dimensions, clean-access protocols, and thermal generation.',
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
      label: 'Discuss Your Application',
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
    title: 'One Great Northern × Alkota | Heavy Plant Cleaning Case Study',
    shortTitle: 'One Great Northern',
    eyebrow: 'NAMED CUSTOMER // FIELD APPLICATION',
    sector: 'Crane Hire / Heavy Plant Maintenance',
    hierarchyLevel: 'CUSTOMER_STORY',
    clientName: 'One Great Northern',
    clientVisibility: 'named',
    location: 'Chesterfield, Derbyshire, UK',
    date: 'Commercial Fleet Application',
    heroImage: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=2400&q=85',
    heroAlt: 'Specialist mobile crane and heavy plant washdown in UK industrial depot',
    heroCaption: 'Heavy mobile crane chassis and outrigger maintenance in a working yard depot.',
    headline: 'WHEN THE MACHINES ARE THE BUSINESS.',
    standfirst:
      'Crane hire and heavy plant don’t get the luxury of staying clean. They have to arrive on site ready to work. The cleaning system therefore becomes part of the operational infrastructure.',
    verified: false,
    sourceType: 'NAMED CUSTOMER / FIELD APPLICATION',
    problem:
      'Mobile cranes, ballast trailers, and heavy plant pick up aggressive road film, quarry slurry, wet clay, hydraulic oil residue, and grease across UK construction sites. Cleanliness is safety critical. Hydraulic seals, outrigger boom slides, pivot pins, slew rings, and structural weld points must be thoroughly cleaned to allow certified non-destructive testing (NDT) and visual pre-lift inspections.',
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
          'In heavy crane hire, equipment condition is safety-critical. Clients and site managers evaluate competence by the presentation, reliability, and mechanical hygiene of the cranes arriving on site.',
        ],
      },
      {
        title: 'THE CLEANING REQUIREMENT',
        paragraphs: [
          'Modern all-terrain mobile cranes spend days in muddy groundworks and wet excavation sites before travelling at motorway speeds. The combination of brake dust, road salt, hydraulic film, and clay creates a dense, abrasive crust.',
          'Cold-water pressure washers merely smear oily contamination across structural steel. To inspect critical pins, slew rings, and boom welds properly, technicians need the oily binder broken down at high water temperatures.',
        ],
      },
      {
        title: 'WHY HOT WATER',
        paragraphs: [
          'Hot water pressure washing provides thermal emulsification. By heating water to high temperatures, heavy grease melts into a liquid state, allowing standard water flow to flush it away with minimal chemical reliance.',
          'This reduces turnaround times between plant hires and prevents abrasive grit from wearing hydraulic rod packings and outrigger slide pads.',
        ],
      },
      {
        title: 'THE ALKOTA SETUP',
        paragraphs: [
          'Alkota hot-water machines feature Schedule 80 ASTM A53 continuous steel coils and slow-turning ceramic triplex plunger pumps. The heavy steel chassis and industrial burner assembly provide day-in, day-out dependability in a busy yard environment.',
          'The straightforward mechanical layout means depot maintenance staff can carry out routine servicing without proprietary diagnostic computers or delicate electronics.',
        ],
      },
      {
        title: 'IN THE FIELD & RESULT',
        paragraphs: [
          'Cranes and support trailers entering the wash bay are treated with high-temperature hot water around undercarriages, axles, and outriggers before moving to the maintenance bay for inspection and greasing.',
          'Equipment returns to service with visual clarity on critical structural welds, outrigger cylinders, and axle steering assemblies.',
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
      { label: 'Pump Architecture', value: 'Ceramic triplex low-RPM plunger pump (1,450 RPM)' },
    ],
    evidence: {
      projectLocation: 'Chesterfield, Derbyshire, UK',
      suppliedBy: 'Alkota UK Regional Network',
      verificationNotes: 'Named customer field application. Formal machine model verification and workshop photography pending submission.',
    },
    externalSources: [
      {
        title: 'One Great Northern Heavy Lifting Operations',
        publisher: 'One Great Northern Company Information',
        year: 'Commercial Operations Profile',
        note: 'Specialist mobile crane hire and contract lifting services in Chesterfield and nationwide UK.',
      },
      {
        title: 'Safe Use of Lifting Equipment (LOLER 1998 Approved Code of Practice)',
        publisher: 'Health and Safety Executive (HSE)',
        year: 'Statutory Guidance L113',
        note: 'Outlines statutory requirements for thorough examination and visual cleanliness of lifting gear.',
      },
      {
        title: 'ASTM A53 Schedule 80 Steel Pipe Pressure Vessel Specifications',
        publisher: 'Alkota Cleaning Systems Engineering Archive',
        year: 'Technical Documentation',
        note: 'Engineering standards for hydro-insulated continuous-wound pressure washer heating coils.',
      },
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
      title: 'One Great Northern × Alkota | Heavy Plant Cleaning Case Study',
      description:
        'See how Alkota pressure-washing equipment supports heavy-plant and crane cleaning, with the One Great Northern application explored through real-world engineering requirements.',
      ogImage: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=80',
    },
  },

  // ── 02: ENTIREFM INDUSTRIAL CLEANING ─────────────────────────────────────
  {
    slug: 'entirefm-industrial-cleaning',
    title: 'EntireFM: When Cleaning Is the Business',
    shortTitle: 'EntireFM Industrial Cleaning',
    eyebrow: 'CASE STUDY // ENTIREFM / INDUSTRIAL CLEANING',
    sector: 'Facilities Management & Industrial Cleaning',
    hierarchyLevel: 'CUSTOMER_STORY',
    clientName: 'EntireFM',
    clientVisibility: 'named',
    location: 'United Kingdom (National Operations)',
    date: 'Commercial Contract Operations',
    heroImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=2400&q=85',
    heroAlt: 'Industrial warehouse and concrete floor high-temperature pressure washing with visible steam',
    heroCaption: 'Industrial warehouse floor decontamination and heavy degreasing operations.',
    headline: 'WHEN CLEANING IS THE BUSINESS.',
    standfirst:
      'For professional industrial cleaning teams, pressure-washing equipment has to do more than produce pressure. Heat, flow, duty cycle, serviceability and uptime all affect what can be achieved on site.',
    verified: false,
    sourceType: 'NAMED CUSTOMER / FIELD APPLICATION',
    problem:
      'Contract industrial cleaning teams encounter severe contamination profiles: hardened forklift tyre rubber, leaking gearbox oil, cooking fats, chemical spill residues, and years of atmospheric soot on industrial cladding. When contracts specify strict overnight or weekend completion windows, machine failure means missed deadlines and costly contract breaches.',
    requirements: [
      'Constant high-temperature water output (80°C–90°C) to melt grease, waxes, and bitumen rapidly',
      'Heavy-duty 100% continuous duty cycle capable of running for multi-hour continuous shifts',
      'High volumetric flow rate (15–21+ L/min) to float loosened debris into drainage recovery points',
      'Straightforward field serviceability with open component accessibility and rapid parts support',
      'Support for extensive hose runs (30m–60m) to clean deep warehouse floors without moving the machine',
    ],
    solution:
      'Alkota hot-water industrial skids and mobile units give professional cleaning contractors the thermal power to break oil bonds without excessive chemical consumption. The reliability of ceramic triplex plunger pumps and continuous Schedule 80 steel heating coils ensures contract cleaning crews complete complex industrial degreasing jobs on schedule.',
    applications: [
      'Industrial warehouse floor degreasing and tyre mark removal',
      'Distribution centre external hardstanding and loading dock cleaning',
      'Commercial cladding, canopy, and facade hot-water washdown',
      'Manufacturing facility plant and machine footprint decontamination',
      'Back-of-house service yard, bin store, and delivery bay sanitisation',
    ],
    narrativeSections: [
      {
        title: 'THE PROFESSIONAL CLEANING CHALLENGE',
        paragraphs: [
          'EntireFM delivers integrated facilities management and specialist industrial cleaning services across the UK. Their industrial teams are called in when standard commercial cleaning methods fail — such as decommissioning manufacturing sites, renovating logistics hubs, or restoring neglected industrial yards.',
          'In these environments, cleaning is an engineering process that balances water volume, pressure, temperature, and chemical dwell time to achieve pristine results safely.',
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
      { label: 'Heating Coil Specification', value: 'Alkota Schedule 80 ASTM A53 Cold-Rolled Steel' },
      { label: 'Pump Duty Cycle', value: '100% Continuous Industrial Duty (Low-RPM Ceramic Plunger)' },
    ],
    evidence: {
      projectLocation: 'UK Nationwide Operations',
      suppliedBy: 'Alkota UK Direct / Authorised Distribution',
      verificationNotes: 'Named customer field application. Live contract photography and site case documentation pending customer sign-off.',
    },
    nextStorySlug: 'professional-cleaning-contractors',
    relatedProductSlugs: ['alkota-420x4', 'alkota-4305xd4'],
    relatedIndustries: ['industrial', 'food-beverage'],
    primaryCTA: {
      label: 'Specify a Contractor System',
      href: '/machines/hot-water',
    },
    secondaryCTA: {
      label: 'Explore Hot Water Machines',
      href: '/machines/hot-water',
    },
    seo: {
      title: 'EntireFM Industrial Cleaning | Professional Pressure Washer Case Study | Alkota UK',
      description:
        'Explore how industrial hot-water pressure washing supports professional cleaning operations, from grease and heavy contamination to contractor productivity, serviceability and uptime.',
      ogImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    },
  },

  // ── 03: PROFESSIONAL CLEANING CONTRACTORS ────────────────────────────────
  {
    slug: 'professional-cleaning-contractors',
    title: 'Professional Pressure Washers for Cleaning Contractors | Commercial Field Guide',
    shortTitle: 'Contractor Field Guide',
    eyebrow: 'FIELD GUIDE // PROFESSIONAL CLEANING CONTRACTORS',
    sector: 'Commercial Pressure Washing & Exterior Cleaning',
    hierarchyLevel: 'INDUSTRY_APPLICATION',
    clientVisibility: 'application',
    location: 'United Kingdom Commercial Sector',
    date: 'Commercial Field Guide',
    heroImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2400&q=85',
    heroAlt: 'High-pressure surface cleaner restoring commercial block paving and concrete',
    heroCaption: 'Commercial rotary surface cleaner operating with hot water on paved hardstanding.',
    headline: 'BUILT TO EARN ITS KEEP. EVERY DAY.',
    standfirst:
      'When pressure washing becomes a business, equipment choice stops being about maximum PSI and purchase price. Productivity, heat, flow, serviceability, downtime and lifecycle cost start to matter far more.',
    verified: false,
    sourceType: 'INDUSTRY APPLICATION / FIELD PROOF',
    problem:
      'Professional pressure washing contractors frequently encounter premature equipment failure when using light commercial units built with aluminium pump heads, plastic unloader bodies, and thin Schedule 40 heating coils. Under daily 6-to-8-hour duty cycles, high-speed pumps overheat, packings fail, and coils crack from thermal shock. Every day a contractor’s machine sits broken in a workshop is a day of lost turnover and damaged client trust.',
    requirements: [
      'True 100% continuous duty cycle capability without pump cavitation or thermal cutoff',
      'High volumetric flow rate (15–21+ L/min) to drive rotary surface cleaners and flush slurry quickly',
      'Continuous hot water (80°C–95°C) to dissolve chewing gum, grease, and oil without harsh acids',
      'Straightforward field serviceability with standard tools and readily available UK replacement parts',
      'Support for 30m–60m live hose reels to clean expansive commercial sites without moving the machine',
    ],
    solution:
      'Alkota builds purpose-driven contractor machines featuring slow-turning ceramic triplex plunger pumps (1450 RPM or belt-drive reduction), heavy-gauge ASTM A53 Schedule 80 coils, and robust industrial burner assemblies. Designed for high annual utilisation and backed by a 7-year coil warranty, Alkota machines deliver the lowest total cost of ownership in the contract cleaning sector.',
    applications: [
      'Forecourt and petrol station fuel island degreasing',
      'Commercial car park and drive-thru chewing gum removal',
      'Block paving, concrete hardstanding, and stone restoration',
      'Graffiti removal and high-temperature paint stripping',
      'Multi-vehicle fleet washdowns and plant yard maintenance',
    ],
    equipmentSlugs: ['alkota-420x4', 'alkota-4305xd4', 'alkota-trailer-single'],
    specifications: [
      { label: 'Target Operator Profile', value: 'Commercial Cleaning Contractors & Surface Specialists' },
      { label: 'Recommended Operating Pressure', value: '180 – 250 BAR (2,600 – 3,600 PSI)' },
      { label: 'Recommended Flow Rate', value: '15 – 21 Litres/Minute (Higher for Dual Operator)' },
      { label: 'Operating Temperature', value: '80°C – 95°C Constant Hot Water (Steam Option to 140°C)' },
      { label: 'Drive Mechanism', value: 'Low-RPM Ceramic Triplex Plunger Pump (1,450 RPM Belt/Gearbox)' },
      { label: 'Heating Coil Standard', value: 'ASTM A53 Schedule 80 Seamless Cold-Rolled Steel' },
    ],
    nextStorySlug: 'agriculture',
    relatedProductSlugs: ['alkota-420x4', 'alkota-4305xd4', 'alkota-trailer-single'],
    relatedIndustries: ['industrial', 'municipal', 'transport-fleet'],
    primaryCTA: {
      label: 'Build My Contractor System',
      href: '/tools/configurator',
    },
    secondaryCTA: {
      label: 'Talk to Alkota Technical Team',
      href: '/contact?enquiry=contractor-system',
    },
    seo: {
      title: 'Professional Pressure Washers for Cleaning Contractors | Alkota UK',
      description:
        'A practical guide to specifying professional pressure-washing equipment for cleaning contractors, covering pressure, flow, hot water, duty cycle, hoses, tanks, trailers, serviceability and total operating cost.',
      ogImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    },
  },

  // ── 04: AGRICULTURE ──────────────────────────────────────────────────────
  {
    slug: 'agriculture',
    title: 'Agricultural Pressure Washers & Farm Machinery Cleaning | Alkota UK',
    shortTitle: 'Agricultural Field Story',
    eyebrow: 'FIELD STORY // AGRICULTURE',
    sector: 'Farming, Tractors & Livestock Biosecurity',
    hierarchyLevel: 'INDUSTRY_APPLICATION',
    clientVisibility: 'application',
    location: 'UK Agricultural Sector',
    date: 'Industry Application Study',
    heroImage: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=2400&q=85',
    heroAlt: 'Modern agricultural tractor and harvesting machinery washdown in farm workshop yard',
    heroCaption: 'Agricultural tractor and harvester wash pad cleaning with high-temperature water.',
    headline: 'MUD. OIL. MANURE. THEN DO IT AGAIN TOMORROW.',
    standfirst:
      'Agricultural equipment works in conditions designed to make cleaning difficult. Mud, grease, organic contamination, crop residue and oils build up around machinery that still has to be inspected, maintained and put back to work.',
    verified: false,
    sourceType: 'INDUSTRY APPLICATION / FIELD PROOF',
    problem:
      'Modern agricultural equipment represents hundreds of thousands of pounds in capital investment. Radiators pack with chaff, causing engine overheating during harvest. Manure acids eat through chassis paint and hydraulic fittings. Standard cold-water washers struggle with greasy organic fats and baked soil, turning routine washdown into hours of frustrating, wet labour.',
    requirements: [
      'High volumetric flow rate (18–25+ L/min) to carry heavy compacted clay and mud away from chassis recesses',
      'High thermal power (80°C–90°C) to emulsify animal fats, hydraulic oils, and biological residues rapidly',
      'Rugged, corrosion-resistant chassis built for wet farm workshops and outdoor wash pads',
      'Reliable winter operation with straightforward freeze-protection and draining procedures',
      'Safe pressure control to protect sensitive electronic sensors, harness seals, and delicate radiator cooling fins',
    ],
    solution:
      'Alkota high-flow hot-water pressure washers and stationary washroom skids provide farmers with continuous thermal power. Hot water melts dried grease, cuts through livestock manure in biosecure animal housing, and clears clogged cooling packs safely with calibrated pressure.',
    applications: [
      'Tractor, combine harvester, and telehandler washdown after field work',
      'Livestock housing, poultry shed, and milking parlour biosecurity sanitisation',
      'Crop sprayer decontamination and chemical tank rinsing',
      'Farm workshop component and implement degreasing',
      'Harvest machinery radiator and cooling pack clearing',
    ],
    equipmentSlugs: ['alkota-420x4', 'alkota-4305xd4', 'alkota-trailer-single'],
    specifications: [
      { label: 'Application Focus', value: 'Tractors, combines, loaders, livestock housing, farm workshops' },
      { label: 'Key Soil Types', value: 'Compacted clay, silage residue, animal fats, hydraulic oil, harvest chaff' },
      { label: 'Recommended Water Temp', value: '75°C – 90°C Hot Water (Cold water for general mud rinse)' },
      { label: 'Heating Coil Specification', value: 'Alkota Schedule 80 ASTM A53 Heavy-Wall Seamless Cold-Rolled Pipe' },
      { label: 'Coil Warranty', value: '7-Year Pro-Rated Guarantee' },
    ],
    nextStorySlug: 'marine',
    relatedProductSlugs: ['alkota-420x4', 'alkota-4305xd4', 'alkota-trailer-single'],
    relatedIndustries: ['agriculture'],
    primaryCTA: {
      label: 'Specify My Agricultural System',
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
    title: 'Marine Pressure Washers & Vessel Cleaning Equipment | Alkota UK',
    shortTitle: 'Marine & Harbourside',
    eyebrow: 'FIELD STORY // MARINE',
    sector: 'Commercial Marine, Fishing & Dockside Infrastructure',
    hierarchyLevel: 'INDUSTRY_APPLICATION',
    clientVisibility: 'application',
    location: 'UK Coastal & Harbourside Ports',
    date: 'Industry Application Study',
    heroImage: 'https://images.unsplash.com/photo-1505705694340-019e1e335916?auto=format&fit=crop&w=2400&q=85',
    heroAlt: 'Commercial fishing trawlers and industrial harbour dockside infrastructure',
    heroCaption: 'Commercial fishing vessels and industrial harbourside dock washdown.',
    headline: 'SALT NEVER TAKES A DAY OFF.',
    standfirst:
      'From working vessels to dockside machinery, marine equipment operates in an environment that constantly introduces salt, moisture, organic contamination and corrosion risk. Cleaning is part of keeping that environment under control.',
    verified: false,
    sourceType: 'INDUSTRY APPLICATION / FIELD PROOF',
    problem:
      'Harbours, shipyards, and commercial fishing vessels operate in one of the most corrosive environments on Earth. Salt deposits crystallise into hard encrustations that promote rapid galvanic corrosion under paintwork. Fish oils, grease from deck winches, and marine growth create severe slip hazards on steel decks and slipways that cold water cannot dissolve.',
    requirements: [
      'High-volume freshwater flushing capability to dissolve crystalline salt deposits effectively',
      'High-temperature hot water (80°C–90°C) to emulsify deck grease, winch lubricants, and fish fats',
      'Marine-grade corrosion-resistant chassis options with stainless steel coil wraps for coastal air',
      'Support for long hose runs (40m–80m) on quaysides without dropping operational pressure',
      'Compliance with dockside trade effluent and environmental discharge recovery requirements',
    ],
    solution:
      'Alkota marine-specified hot-water pressure washers and bespoke trailer systems provide commercial maritime operators with high-flow freshwater flushing and thermal degreasing. Heavy-duty Schedule 80 steel heating coils and slow-RPM ceramic plunger pumps ensure continuous reliability in demanding coastal installations.',
    applications: [
      'Commercial fishing vessel deck, net, and fish-hold hot-water washdown',
      'Quayside crane, winch, and hydraulic powerpack degreasing',
      'Shipyard hull preparation, antifouling scale removal, and slipway cleaning',
      'Harbourside pontoon, slipway, and dock algae and biofouling clearing',
      'Dry dock engineering overhaul and marine plant maintenance',
    ],
    equipmentSlugs: ['alkota-420x4', 'alkota-4305xd4', 'alkota-trailer-single'],
    specifications: [
      { label: 'Maritime Focus', value: 'Commercial vessels, docks, winches, slipways, fish holds' },
      { label: 'Target Contaminants', value: 'Salt crusts, fish oils, marine algae, winch grease, diesel soot' },
      { label: 'Operating Temperatures', value: '85°C Hot Water / 140°C Saturated Vapour Steam (Cold for salt rinse)' },
      { label: 'Chassis & Enclosure', value: 'Heavy-gauge steel with optional stainless steel wraps' },
      { label: 'Pump Manifold', value: 'Forged brass with solid ceramic plungers (1,450 RPM)' },
      { label: 'Heating Coil Standard', value: 'ASTM A53 Schedule 80 Seamless Cold-Rolled Steel' },
    ],
    nextStorySlug: 'oilfield',
    relatedProductSlugs: ['alkota-420x4', 'alkota-4305xd4', 'alkota-trailer-single'],
    relatedIndustries: ['industrial'],
    primaryCTA: {
      label: 'Specify a Marine System',
      href: '/tools/configurator',
    },
    secondaryCTA: {
      label: 'Explore Hot Water Machines',
      href: '/machines/hot-water',
    },
    seo: {
      title: 'Marine Pressure Washers & Vessel Cleaning Equipment | Alkota UK',
      description:
        'Explore industrial pressure-washing systems for marine environments, from salt and dockside contamination to fishing vessels, shipyards, hot-water cleaning, mobile rigs and wastewater considerations.',
      ogImage: 'https://images.unsplash.com/photo-1505705694340-019e1e335916?auto=format&fit=crop&w=1200&q=80',
    },
  },

  // ── 06: OILFIELD ─────────────────────────────────────────────────────────
  {
    slug: 'oilfield',
    title: 'Oilfield Pressure Washers & Industrial Cleaning Systems | Alkota UK',
    shortTitle: 'Oilfield & Heavy Industry',
    eyebrow: 'FIELD STORY // OILFIELD',
    sector: 'Oilfield Services, Drilling & Heavy Processing',
    hierarchyLevel: 'INDUSTRY_APPLICATION',
    clientVisibility: 'application',
    location: 'Remote Industrial & Energy Sector Sites',
    date: 'Industry Application Study',
    heroImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=2400&q=85',
    heroAlt: 'Industrial oil rig and petrochemical piping in demanding environment',
    heroCaption: 'Heavy petrochemical and oilfield equipment washdown.',
    headline: 'WHEN THE DIRT IS PART OF THE JOB, CLEANING BECOMES ENGINEERING.',
    standfirst:
      'Oilfield and heavy industrial equipment can encounter crude oil, grease, drilling mud, paraffin, bitumen, soil and other difficult contamination. The cleaning system has to be specified around the contamination, equipment and operating environment.',
    verified: false,
    sourceType: 'INDUSTRY APPLICATION / FIELD PROOF',
    problem:
      'Drilling tubulars, mud pumps, shaker screens, wellhead valves, and plant skids accumulate dense, high-melting-point hydrocarbon deposits. Standard cold-water washers cannot move paraffin wax or drilling polymers. Remote field sites require equipment that can run continuously for hours without breakdowns, because service technicians are hours or days away.',
    requirements: [
      'High thermal output (up to 95°C hot water and 140°C saturated steam) to liquefy paraffin and heavy bitumen',
      'Industrial-grade Schedule 80 steel heating coils capable of surviving continuous high-pressure thermal shock',
      'High volumetric flow rate (18–25+ L/min) to carry heavy drilling mud solids and dense slurry away from pipework',
      'Skid-mounted and trailer-mounted robust steel frames for remote field transport and crane/forklift handling',
      'Strict site qualification and procedure verification before deployment in classified industrial areas',
    ],
    solution:
      'Alkota high-temperature pressure washers and industrial steam units provide the extreme heat necessary to flash heavy hydrocarbons into liquid state for effortless removal. Heavy continuous Schedule 80 steel coils and low-RPM ceramic plunger pumps deliver proven industrial reliability.',
    applications: [
      'Drill pipe, casing, and tubular thread degreasing and inspection washdown',
      'Shaker screen, mud tank, and centrifuge decontamination',
      'Wellhead valve, blowout preventer (BOP), and manifold steam cleaning',
      'Heavy plant, generator skid, and oilfield support vehicle degreasing',
      'Paraffin wax and bitumen melting from mechanical components',
    ],
    equipmentSlugs: ['alkota-420x4', 'alkota-4305xd4', 'alkota-steam-oil'],
    specifications: [
      { label: 'Target Sector', value: 'Oilfield services, drilling rigs, refineries, pipeline maintenance' },
      { label: 'Contaminant Profiles', value: 'Heavy crude, bitumen, synthetic drilling mud, paraffin, pipe dope' },
      { label: 'Thermal Capabilities', value: 'Hot Water up to 95°C / Saturated Steam up to 140°C' },
      { label: 'Coil Construction', value: 'ASTM A53 Schedule 80 Continuous Cold-Rolled Seamless Steel' },
      { label: 'Pump Duty Cycle', value: '100% Continuous Industrial Duty (1,450 RPM Ceramic Plunger)' },
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
    title: 'Bespoke Pressure Washer Trailers & Mobile Wash Systems | Alkota UK',
    shortTitle: 'Bespoke Mobile Rigs',
    eyebrow: 'ENGINEERED SYSTEM // BESPOKE RIGS',
    sector: 'Custom Engineered Mobile Wash Platforms',
    hierarchyLevel: 'BESPOKE_SYSTEM',
    clientVisibility: 'application',
    location: 'Alkota UK Engineering Facilities',
    date: 'Bespoke Engineering Division',
    heroImage: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=2400&q=85',
    heroAlt: 'Bespoke mobile pressure washing trailer system with baffled water storage and hose reels',
    heroCaption: 'Custom engineered mobile pressure washing trailer chassis and water storage.',
    headline: 'THE JOB DEFINES THE MACHINE.',
    standfirst:
      'Every cleaning operation has different constraints. Water, power, mobility, duty cycle, contamination and workflow all change what the right system looks like.',
    verified: false,
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
    relatedProductSlugs: ['alkota-trailer-single', 'alkota-420x4', 'alkota-4305xd4'],
    relatedIndustries: ['industrial', 'contractors', 'highways', 'municipal'],
    primaryCTA: {
      label: 'Build My Bespoke System',
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
