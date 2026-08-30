import {
  ChemicalMasterFormulation,
  ChemicalRetailProduct,
  ChemicalApplication,
  ChemicalCleaningProblem,
  ChemicalSurface,
  ChemicalSKU,
} from '@/lib/types/chemical-commerce';

// ============================================================================
// 1. APPLICATIONS TAXONOMY
// ============================================================================
export const CHEMICAL_APPLICATIONS: ChemicalApplication[] = [
  {
    id: 'app-truck-hgv',
    slug: 'trucks-hgv',
    name: 'Trucks & HGV',
    tagline: 'Heavy-duty commercial road film & chassis cleaning chemistry.',
    description: 'Specialised high-alkaline and multi-stage detergents designed to penetrate static road film, diesel soot, and winter salt from commercial fleet vehicles.',
    editorial_intro: 'Commercial transport fleets demand uncompromising cleaning power. Alkota HGV formulations cut through traffic film without compromising livery vinyls or aluminium side-guards.',
    icon_name: 'Truck',
    sort_order: 10,
    active: true,
  },
  {
    id: 'app-agriculture',
    slug: 'agriculture',
    name: 'Agricultural Machinery',
    tagline: 'Bio-secure slurry, mud and organic soil removal chemistry.',
    description: 'Engineered for combines, tractors, livestock trailers, and parlour washdowns. Formulated to dissolve compacted clay, greases, and manure deposits quickly.',
    editorial_intro: 'Agricultural washdowns require heavy-impact surfactants that dissolve sticky organic muck, clay, and protective silage oils while remaining safe around farm machinery.',
    icon_name: 'Tractor',
    sort_order: 20,
    active: true,
  },
  {
    id: 'app-plant-machinery',
    slug: 'plant-machinery',
    name: 'Plant & Heavy Equipment',
    tagline: 'Serious chemistry for excavators, dumpers and tracked machinery.',
    description: 'Ultra-concentrated degreasers and hydraulic oil cutters designed to prepare heavy equipment for maintenance, repainting, and hire turnarounds.',
    editorial_intro: 'Earthmoving and quarry machinery accumulates hydraulic leaks, heavy bitumen, and baked-on mud. Our extreme degreasers lift heavy build-ups on contact.',
    icon_name: 'HardHat',
    sort_order: 30,
    active: true,
  },
  {
    id: 'app-aluminium-metal',
    slug: 'aluminium-metal',
    name: 'Aluminium & Metal Restoration',
    tagline: 'Clean, brighten, and acid-restore weathered raw aluminium.',
    description: 'Phosphoric and organic acid formulations that deoxidise fuel tanks, curtain-sider rails, and tipper bodies back to a uniform satin luster.',
    editorial_intro: 'Weathered raw aluminium rapidly oxidises into dull grey and white chalking. Alkota acid brighteners and phosphatising cleaners restore satin brilliance in minutes.',
    icon_name: 'Sparkles',
    sort_order: 40,
    active: true,
  },
  {
    id: 'app-automotive-vans',
    slug: 'automotive-vans',
    name: 'Automotive & Light Commercial',
    tagline: 'High-gloss touchless washes and premium vehicle care.',
    description: 'Balanced pH touchless shampoos, snow foams, and gloss enhancers for car dealerships, light commercial fleets, and valeting operations.',
    editorial_intro: 'Engineered for high-volume commercial van fleets and automotive operations where rapid sheeting, scratch-free road film removal, and gloss finish are paramount.',
    icon_name: 'Car',
    sort_order: 50,
    active: true,
  },
  {
    id: 'app-workshop-floors',
    slug: 'workshops-floors',
    name: 'Workshops & Hard Surfaces',
    tagline: 'Fast-acting floor degreasers, pit cleaners and parts washer fluids.',
    description: 'Low-foaming alkaline degreasers engineered for scrubber-driers, high-pressure floor spinners, and rotary parts washing machines.',
    editorial_intro: 'Keep service bays, MOT lanes, and industrial concrete floors free from slip hazards and hydraulic oil staining with Alkota workshop floor cleaners.',
    icon_name: 'Wrench',
    sort_order: 60,
    active: true,
  },
  {
    id: 'app-machine-care',
    slug: 'machine-care',
    name: 'Pressure Washer & Coil Care',
    tagline: 'Schedule 80 coil descaling, scale-stop & equipment protection.',
    description: 'Inhibited acid descalers, anti-foams, and scale prevention concentrates designed specifically to protect high-pressure coils and heating circuits.',
    editorial_intro: 'Hard water scale buildup drastically reduces burner heat transfer and clogs Schedule 80 coils. Alkota coil chemistry preserves heating efficiency and pump lifespan.',
    icon_name: 'Flame',
    sort_order: 70,
    active: true,
  },
  {
    id: 'app-building-exterior',
    slug: 'building-exterior',
    name: 'Buildings & Exterior Facades',
    tagline: 'Graffiti eradication, stone restoration, and cladding washdowns.',
    description: 'Specialist graffiti removers, brickwork cleaners, timber rejuvenators, and architectural facade detergents.',
    editorial_intro: 'From removing spray paint on porous brickwork to revitalising sun-bleached composite cladding, Alkota exterior chemistry delivers targeted restoration.',
    icon_name: 'Building',
    sort_order: 80,
    active: true,
  },
];

// ============================================================================
// 2. CLEANING PROBLEMS TAXONOMY
// ============================================================================
export const CHEMICAL_CLEANING_PROBLEMS: ChemicalCleaningProblem[] = [
  { id: 'prob-road-film', slug: 'road-film', name: 'Traffic & Road Film', category: 'Vehicle', sort_order: 10 },
  { id: 'prob-grease-oil', slug: 'grease-oil', name: 'Heavy Grease & Hydraulic Oil', category: 'Industrial', sort_order: 20 },
  { id: 'prob-soot-carbon', slug: 'soot-carbon', name: 'Carbon & Exhaust Soot', category: 'Vehicle', sort_order: 30 },
  { id: 'prob-mud-clay', slug: 'mud-clay', name: 'Compacted Mud & Field Dirt', category: 'Agriculture', sort_order: 40 },
  { id: 'prob-oxidation', slug: 'oxidation', name: 'Aluminium Oxidation & White Rust', category: 'Metal', sort_order: 50 },
  { id: 'prob-salt', slug: 'salt', name: 'Winter Road Salt & De-icer Residue', category: 'Winter', sort_order: 60 },
  { id: 'prob-limescale', slug: 'limescale', name: 'Coil Limescale & Hard Water Scale', category: 'Machine', sort_order: 70 },
  { id: 'prob-graffiti', slug: 'graffiti', name: 'Graffiti, Spray Paint & Ink', category: 'Exterior', sort_order: 80 },
  { id: 'prob-mould-algae', slug: 'mould-algae', name: 'Mould, Algae & Organic Staining', category: 'Exterior', sort_order: 90 },
];

// ============================================================================
// 3. SUBSTRATES / SURFACES TAXONOMY
// ============================================================================
export const CHEMICAL_SURFACES: ChemicalSurface[] = [
  { id: 'surf-paint', slug: 'paint-clearcoat', name: 'Automotive Paint & Clearcoat', sort_order: 10 },
  { id: 'surf-aluminium', slug: 'raw-aluminium', name: 'Raw / Mill-Finish Aluminium', sort_order: 20 },
  { id: 'surf-polished-alu', slug: 'polished-aluminium', name: 'Polished / Anodised Aluminium', sort_order: 30 },
  { id: 'surf-stainless', slug: 'stainless-steel', name: 'Stainless Steel & Chrome', sort_order: 40 },
  { id: 'surf-concrete', slug: 'concrete-hardstanding', name: 'Concrete & Workshop Floors', sort_order: 50 },
  { id: 'surf-plastics', slug: 'plastics-grp', name: 'Plastics, Decals & GRP Cladding', sort_order: 60 },
  { id: 'surf-glass', slug: 'glass-glazing', name: 'Glass & Polycarbonate Glazing', sort_order: 70 },
  { id: 'surf-stone', slug: 'brick-masonry', name: 'Brickwork, Stone & Render', sort_order: 80 },
  { id: 'surf-coils', slug: 'steel-coils', name: 'Schedule 80 Internal Steel Coils', sort_order: 90 },
];

// ============================================================================
// 4. MASTER FORMULATIONS (Authoritative Alkota Chemical Formulations)
// ============================================================================
export const MASTER_FORMULATIONS: ChemicalMasterFormulation[] = [
  // ── Vehicle Cleaning ──
  {
    id: 'form-tr-407',
    master_code: 'TR-407',
    original_name: 'Power Blast',
    manufacturer: 'Alkota / Hydrus',
    technical_description: 'Flagship commercial vehicle wash concentrate. High-potency alkaline surfactant blend with water conditioning agents designed for pressure washer hot/cold induction.',
    formulation_family: 'Vehicle Cleaning',
    sds_reference: 'SDS-UK-TR407-V2',
    compliance_status: 'VERIFIED_UK_CLP',
    uk_review_status: 'uk_approved',
    ph_level: '12.4 (Concentrate) / 10.2 (At 1:50 Dilution)',
    dilution_guidelines: '1:50 to 1:120 hot wash; 1:30 to 1:60 cold wash; 1:10 foam cannon',
    active: true,
    notes: 'Primary active vehicle wash chemical. High market adoption across commercial HGV fleets.',
  },
  {
    id: 'form-tr-406',
    master_code: 'TR-406',
    original_name: 'Blue Luster',
    manufacturer: 'Alkota / Hydrus',
    technical_description: 'Premium neutral-balanced wash and wax concentrate with optical brighteners and synthetic gloss polymers.',
    formulation_family: 'Vehicle Cleaning',
    sds_reference: 'SDS-UK-TR406-V1',
    compliance_status: 'VERIFIED_UK_CLP',
    uk_review_status: 'uk_approved',
    ph_level: '8.5 (Neutral-Alkaline)',
    dilution_guidelines: '1:60 to 1:150 hot/cold wash',
    active: true,
    notes: 'Safe on all delicate clearcoats, polished aluminium tanks, and vehicle livery graphics.',
  },
  {
    id: 'form-tr-413',
    master_code: 'TR-413',
    original_name: 'Mach 1 Degreaser',
    manufacturer: 'Alkota / Hydrus',
    technical_description: 'Fast-penetrating emulsifying vehicle chassis and engine degreaser with corrosion inhibitors.',
    formulation_family: 'Vehicle Cleaning',
    sds_reference: 'SDS-UK-TR413-V1',
    compliance_status: 'VERIFIED_UK_CLP',
    uk_review_status: 'uk_approved',
    ph_level: '13.1 (High Alkaline)',
    dilution_guidelines: '1:20 to 1:50 hot wash',
    active: true,
  },

  // ── Agriculture ──
  {
    id: 'form-tr-428',
    master_code: 'TR-428',
    original_name: 'Raptor',
    manufacturer: 'Alkota / Hydrus',
    technical_description: 'Ultra-heavy agricultural machinery cleaner formulated with soil-suspending polymers for high-clay and organic farm grime.',
    formulation_family: 'Agriculture',
    sds_reference: 'SDS-UK-TR428-V1',
    compliance_status: 'VERIFIED_UK_CLP',
    uk_review_status: 'uk_approved',
    ph_level: '12.8',
    dilution_guidelines: '1:30 to 1:80 hot wash',
    active: true,
  },
  {
    id: 'form-tr-440',
    master_code: 'TR-440',
    original_name: 'Farm Soap',
    manufacturer: 'Alkota / Hydrus',
    technical_description: 'Bio-secure general farm hygiene and parlour detergent. Free-rinsing, phosphate-free formulation.',
    formulation_family: 'Agriculture',
    sds_reference: 'SDS-UK-TR440-V1',
    compliance_status: 'VERIFIED_UK_CLP',
    uk_review_status: 'uk_approved',
    ph_level: '11.5',
    dilution_guidelines: '1:40 to 1:100',
    active: true,
  },
  {
    id: 'form-tr-451',
    master_code: 'TR-451',
    original_name: 'Brown Wonder',
    manufacturer: 'Alkota / Hydrus',
    technical_description: 'Heavy slurry, manure, and caked soil dissolving concentrate with rapid wet-out chemistry.',
    formulation_family: 'Agriculture',
    sds_reference: 'SDS-UK-TR451-V1',
    compliance_status: 'VERIFIED_UK_CLP',
    uk_review_status: 'uk_approved',
    ph_level: '13.0',
    dilution_guidelines: '1:25 to 1:60 hot wash',
    active: true,
  },

  // ── Heavy Duty / Extreme ──
  {
    id: 'form-ts-608',
    master_code: 'TS-608',
    original_name: 'Power Blast 2',
    manufacturer: 'Alkota / Hydrus',
    technical_description: 'Reinforced alkaline heavy duty degreaser with elevated caustic builders for extreme carbon, asphalt, and burnt-on oil deposits.',
    formulation_family: 'Heavy Duty / Extreme',
    sds_reference: 'SDS-UK-TS608-V2',
    compliance_status: 'VERIFIED_UK_CLP',
    uk_review_status: 'uk_approved',
    ph_level: '13.5 (Concentrate)',
    dilution_guidelines: '1:20 to 1:60 hot water wash',
    active: true,
  },
  {
    id: 'form-sd-926',
    master_code: 'SD-926',
    original_name: 'Power Blast 3',
    manufacturer: 'Alkota / Hydrus',
    technical_description: 'Ultra-concentrated industrial caustic powder/liquid compound for heavy manufacturing, mining, and oilfield equipment.',
    formulation_family: 'Heavy Duty / Extreme',
    sds_reference: 'SDS-UK-SD926-V1',
    compliance_status: 'VERIFIED_UK_CLP',
    uk_review_status: 'uk_approved',
    ph_level: '13.8',
    dilution_guidelines: '1:30 to 1:100 through hot steam generator',
    active: true,
  },
  {
    id: 'form-de-750',
    master_code: 'DE-750',
    original_name: 'Super Red Degreaser',
    manufacturer: 'Alkota / Hydrus',
    technical_description: 'High-alkaline industrial degreaser with penetrative wetting agents for heavy machinery, plant maintenance, and concrete extraction.',
    formulation_family: 'Heavy Duty / Extreme',
    sds_reference: 'SDS-UK-DE750-V1',
    compliance_status: 'VERIFIED_UK_CLP',
    uk_review_status: 'uk_approved',
    ph_level: '13.2',
    dilution_guidelines: '1:10 (heavy) to 1:40 (light)',
    active: true,
  },
  {
    id: 'form-de-782',
    master_code: 'DE-782',
    original_name: 'Ready Clean',
    manufacturer: 'Alkota / Hydrus',
    technical_description: 'Fast-rinsing general purpose industrial maintenance cleaner for heavy plant, workshop tooling, and transport components.',
    formulation_family: 'Heavy Duty / Extreme',
    sds_reference: 'SDS-UK-DE782-V1',
    compliance_status: 'VERIFIED_UK_CLP',
    uk_review_status: 'uk_approved',
    ph_level: '11.8',
    dilution_guidelines: '1:20 to 1:80',
    active: true,
  },

  // ── Degreasers ──
  {
    id: 'form-de-703',
    master_code: 'DE-703',
    original_name: 'Grease Cutter',
    manufacturer: 'Alkota / Hydrus',
    technical_description: 'Versatile non-caustic workshop and engine degreaser safe on aluminium components when used at recommended dilution.',
    formulation_family: 'Degreasers',
    sds_reference: 'SDS-UK-DE703-V2',
    compliance_status: 'VERIFIED_UK_CLP',
    uk_review_status: 'uk_approved',
    ph_level: '11.0',
    dilution_guidelines: '1:10 to 1:50',
    active: true,
  },
  {
    id: 'form-de-721',
    master_code: 'DE-721',
    original_name: 'Citrus Blast',
    manufacturer: 'Alkota / Hydrus',
    technical_description: 'Natural D-Limonene citrus terpene solvent degreaser for tar, bitumen, adhesive, and heavy grease removal.',
    formulation_family: 'Degreasers',
    sds_reference: 'SDS-UK-DE721-V1',
    compliance_status: 'VERIFIED_UK_CLP',
    uk_review_status: 'uk_approved',
    ph_level: '8.8 (Neutral-Solvent)',
    dilution_guidelines: 'Neat to 1:20',
    active: true,
  },

  // ── Aluminium & Metal ──
  {
    id: 'form-ts-602',
    master_code: 'TS-602',
    original_name: 'Aluma Shine 2',
    manufacturer: 'Alkota / Hydrus',
    technical_description: 'Specialist acid aluminium cleaner and brightener. Dissolves road film, oxidation, and diesel soot from raw unpolished aluminium.',
    formulation_family: 'Aluminium & Metal',
    sds_reference: 'SDS-UK-TS602-V2',
    compliance_status: 'VERIFIED_UK_CLP',
    uk_review_status: 'uk_approved',
    ph_level: '1.8 (Acidic Concentrate)',
    dilution_guidelines: '1:10 to 1:30 cold water application. Do not let dry.',
    active: true,
  },
  {
    id: 'form-ts-610',
    master_code: 'TS-610',
    original_name: 'Phos Clean',
    manufacturer: 'Alkota / Hydrus',
    technical_description: 'Phosphoric acid cleaner and iron phosphatiser. Cleans rust, conditions ferrous metals, and prepares steel surfaces for painting.',
    formulation_family: 'Aluminium & Metal',
    sds_reference: 'SDS-UK-TS610-V1',
    compliance_status: 'VERIFIED_UK_CLP',
    uk_review_status: 'uk_approved',
    ph_level: '2.0',
    dilution_guidelines: '1:10 to 1:25',
    active: true,
  },
  {
    id: 'form-ts-611',
    master_code: 'TS-611',
    original_name: 'Luma Polish',
    manufacturer: 'Alkota / Hydrus',
    technical_description: 'Mild non-etching aluminium wash designed to clean fuel tanks and trailers without dulling polished mirror finishes.',
    formulation_family: 'Aluminium & Metal',
    sds_reference: 'SDS-UK-TS611-V1',
    compliance_status: 'VERIFIED_UK_CLP',
    uk_review_status: 'uk_approved',
    ph_level: '4.5 (Mild Acid)',
    dilution_guidelines: '1:15 to 1:40',
    active: true,
  },
  {
    id: 'form-ts-630',
    master_code: 'TS-630',
    original_name: 'Luma Polish 2',
    manufacturer: 'Alkota / Hydrus',
    technical_description: 'Advanced dual-action metal cleaner with brighteners and chelating agents for high-speed fleet aluminium wash systems.',
    formulation_family: 'Aluminium & Metal',
    sds_reference: 'SDS-UK-TS630-V1',
    compliance_status: 'VERIFIED_UK_CLP',
    uk_review_status: 'uk_approved',
    ph_level: '2.5',
    dilution_guidelines: '1:20 to 1:50',
    active: true,
  },
  {
    id: 'form-sd-919',
    master_code: 'SD-919',
    original_name: 'Iron Phostight',
    manufacturer: 'Alkota / Hydrus',
    technical_description: 'Industrial iron phosphating conversion coating chemical for wash bay metal prep prior to powder coating.',
    formulation_family: 'Aluminium & Metal',
    sds_reference: 'SDS-UK-SD919-V1',
    compliance_status: 'VERIFIED_UK_CLP',
    uk_review_status: 'uk_approved',
    ph_level: '3.0',
    dilution_guidelines: '1:20 to 1:40 at 60°C',
    active: true,
  },

  // ── Machine Care ──
  {
    id: 'form-sd-927',
    master_code: 'SD-927',
    original_name: 'No Scale',
    manufacturer: 'Alkota / Hydrus',
    technical_description: 'Continuous coil scale prevention chemical. Injected into high-pressure washer water supply to sequester calcium and prevent coil calcification.',
    formulation_family: 'Machine Care',
    sds_reference: 'SDS-UK-SD927-V1',
    compliance_status: 'VERIFIED_UK_CLP',
    uk_review_status: 'uk_approved',
    ph_level: '7.2 (Neutral)',
    dilution_guidelines: 'Dosed via automatic anti-scale reservoir (approx 15-30ml per 1000L)',
    active: true,
  },
  {
    id: 'form-sd-929',
    master_code: 'SD-929',
    original_name: 'Coil ScaleAway',
    manufacturer: 'Alkota / Hydrus',
    technical_description: 'Inhibited acid coil descaler. Dissolves heavy limescale and mineral buildup in hot water pressure washer Schedule 80 coils without attacking parent steel.',
    formulation_family: 'Machine Care',
    sds_reference: 'SDS-UK-SD929-V2',
    compliance_status: 'VERIFIED_UK_CLP',
    uk_review_status: 'uk_approved',
    ph_level: '1.2 (Acid Concentrate)',
    dilution_guidelines: '1:4 to 1:10 recirculated through descaling pump loop',
    active: true,
  },
  {
    id: 'form-ts-617',
    master_code: 'TS-617',
    original_name: 'More Foam',
    manufacturer: 'Alkota / Hydrus',
    technical_description: 'High-cling foam boosting additive for pressure washer detergents and foam lances. Extends dwell time on vertical vehicle panels.',
    formulation_family: 'Machine Care',
    sds_reference: 'SDS-UK-TS617-V1',
    compliance_status: 'VERIFIED_UK_CLP',
    uk_review_status: 'uk_approved',
    ph_level: '7.5',
    dilution_guidelines: 'Add 5% to 10% volume to any chemical stock tank',
    active: true,
  },
  {
    id: 'form-ts-623',
    master_code: 'TS-623',
    original_name: 'DeFoam',
    manufacturer: 'Alkota / Hydrus',
    technical_description: 'Silicone-free fast-acting anti-foam emulsion for wastewater recovery tanks, floor scrubbers, and rotary parts washers.',
    formulation_family: 'Machine Care',
    sds_reference: 'SDS-UK-TS623-V1',
    compliance_status: 'VERIFIED_UK_CLP',
    uk_review_status: 'uk_approved',
    ph_level: '7.0',
    dilution_guidelines: '100ml per 500L recovery tank capacity',
    active: true,
  },
  {
    id: 'form-ts-660',
    master_code: 'TS-660',
    original_name: 'Rinse Aid',
    manufacturer: 'Alkota / Hydrus',
    technical_description: 'Hydrophobic sheeting rinse agent for automated and manual vehicle washing. Promotes spot-free water break and fast drying.',
    formulation_family: 'Machine Care',
    sds_reference: 'SDS-UK-TS660-V1',
    compliance_status: 'VERIFIED_UK_CLP',
    uk_review_status: 'uk_approved',
    ph_level: '5.5',
    dilution_guidelines: '1:200 to 1:500 final rinse',
    active: true,
  },

  // ── Finish & Protection ──
  {
    id: 'form-ts-616',
    master_code: 'TS-616',
    original_name: 'Gloss Wax',
    manufacturer: 'Alkota / Hydrus',
    technical_description: 'Hot water apply sealant wax with synthetic carnauba polymers. Imparts durable hydrophobic water beading and ultraviolet protection.',
    formulation_family: 'Finish & Protection',
    sds_reference: 'SDS-UK-TS616-V1',
    compliance_status: 'VERIFIED_UK_CLP',
    uk_review_status: 'uk_approved',
    ph_level: '6.5',
    dilution_guidelines: '1:100 to 1:250 applied hot at 50-60°C',
    active: true,
  },
  {
    id: 'form-sd-958',
    master_code: 'SD-958',
    original_name: 'KATS Coating',
    manufacturer: 'Alkota / Hydrus',
    technical_description: 'Water-based temporary transit protective coating for new machinery, vehicles, and metal assets during storage and sea transit.',
    formulation_family: 'Finish & Protection',
    sds_reference: 'SDS-UK-SD958-V1',
    compliance_status: 'VERIFIED_UK_CLP',
    uk_review_status: 'uk_approved',
    ph_level: '8.0',
    dilution_guidelines: 'Ready to use / 1:1 spray apply',
    active: true,
  },

  // ── Salt & Winter ──
  {
    id: 'form-ts-632',
    master_code: 'TS-632',
    original_name: 'Salt Destroyer',
    manufacturer: 'Alkota / Hydrus',
    technical_description: 'Chemical salt neutraliser and corrosion inhibitor. Breaks the electrochemical bond of sodium and magnesium chloride salts on vehicle chassis.',
    formulation_family: 'Salt & Winter',
    sds_reference: 'SDS-UK-TS632-V2',
    compliance_status: 'VERIFIED_UK_CLP',
    uk_review_status: 'uk_approved',
    ph_level: '7.8',
    dilution_guidelines: '1:30 to 1:80 cold water undercarriage wash',
    active: true,
  },
  {
    id: 'form-ts-635',
    master_code: 'TS-635',
    original_name: 'Salt Blaster',
    manufacturer: 'Alkota / Hydrus',
    technical_description: 'High-impact winter chassis wash combining surfactant road film cutters with active de-icer dissolution chemistry.',
    formulation_family: 'Salt & Winter',
    sds_reference: 'SDS-UK-TS635-V1',
    compliance_status: 'VERIFIED_UK_CLP',
    uk_review_status: 'uk_approved',
    ph_level: '11.2',
    dilution_guidelines: '1:40 to 1:100',
    active: true,
  },

  // ── Building & Exterior ──
  {
    id: 'form-ra-247',
    master_code: 'RA-247',
    original_name: 'Graffiti Eraser',
    manufacturer: 'Alkota / Hydrus',
    technical_description: 'Deep-penetrating graffiti stripper for porous masonry, brick, sandstone, and bare concrete surfaces.',
    formulation_family: 'Building & Exterior',
    sds_reference: 'SDS-UK-RA247-V1',
    compliance_status: 'VERIFIED_UK_CLP',
    uk_review_status: 'uk_approved',
    ph_level: '11.0 (Solvent-Alkaline)',
    dilution_guidelines: 'Apply neat, dwell 10-15 mins, pressure rinse with hot water',
    active: true,
  },
  {
    id: 'form-ra-248',
    master_code: 'RA-248',
    original_name: 'Graffiti Eradicator',
    manufacturer: 'Alkota / Hydrus',
    technical_description: 'Specialist graffiti remover for non-porous smooth surfaces: painted metals, glass, street furniture, and signs.',
    formulation_family: 'Building & Exterior',
    sds_reference: 'SDS-UK-RA248-V1',
    compliance_status: 'VERIFIED_UK_CLP',
    uk_review_status: 'uk_approved',
    ph_level: '7.5',
    dilution_guidelines: 'Apply neat with wipe/spray, agitate and rinse',
    active: true,
  },
  {
    id: 'form-ra-249',
    master_code: 'RA-249',
    original_name: 'Spray Away AP',
    manufacturer: 'Alkota / Hydrus',
    technical_description: 'All-purpose exterior facade, soffit, and render cleaning detergent with organic stain lifters.',
    formulation_family: 'Building & Exterior',
    sds_reference: 'SDS-UK-RA249-V1',
    compliance_status: 'VERIFIED_UK_CLP',
    uk_review_status: 'uk_approved',
    ph_level: '10.5',
    dilution_guidelines: '1:20 to 1:60',
    active: true,
  },
  {
    id: 'form-ra-250',
    master_code: 'RA-250',
    original_name: 'Wood Refresh',
    manufacturer: 'Alkota / Hydrus',
    technical_description: 'Oxalic and organic acid wood brightener. Restores weathered, silvered, and tannin-stained external timbers and decking.',
    formulation_family: 'Building & Exterior',
    sds_reference: 'SDS-UK-RA250-V1',
    compliance_status: 'VERIFIED_UK_CLP',
    uk_review_status: 'uk_approved',
    ph_level: '2.2',
    dilution_guidelines: '1:5 to 1:15 cold water application',
    active: true,
  },
  {
    id: 'form-ra-251',
    master_code: 'RA-251',
    original_name: 'Vinyl Rejuvinator',
    manufacturer: 'Alkota / Hydrus',
    technical_description: 'Architectural vinyl, composite cladding, and PVC washdown concentrate with antistatic agents to repel airborne grime.',
    formulation_family: 'Building & Exterior',
    sds_reference: 'SDS-UK-RA251-V1',
    compliance_status: 'VERIFIED_UK_CLP',
    uk_review_status: 'uk_approved',
    ph_level: '9.0',
    dilution_guidelines: '1:30 to 1:80',
    active: true,
  },
  {
    id: 'form-ra-252',
    master_code: 'RA-252',
    original_name: 'HydroClean Rx',
    manufacturer: 'Alkota / Hydrus',
    technical_description: 'Concentrated efflorescence, mortar smear, and atmospheric carbon cleaner for new brick and architectural masonry.',
    formulation_family: 'Building & Exterior',
    sds_reference: 'SDS-UK-RA252-V1',
    compliance_status: 'VERIFIED_UK_CLP',
    uk_review_status: 'uk_approved',
    ph_level: '1.5',
    dilution_guidelines: '1:5 to 1:20 on pre-wetted masonry',
    active: true,
  },
  {
    id: 'form-ra-253',
    master_code: 'RA-253',
    original_name: '1 Step Deck/House Cleaner HD',
    manufacturer: 'Alkota / Hydrus',
    technical_description: 'Heavy duty single-stage exterior wash for patios, render, roofs, and timber. Fast biocidal action against mould and algae.',
    formulation_family: 'Building & Exterior',
    sds_reference: 'SDS-UK-RA253-V1',
    compliance_status: 'VERIFIED_UK_CLP',
    uk_review_status: 'uk_approved',
    ph_level: '11.8',
    dilution_guidelines: '1:10 to 1:30',
    active: true,
  },
];

// ============================================================================
// 5. RETAIL CHEMICAL PRODUCTS (Customer-Facing Ecommerce Entities)
// Linked directly to Master Formulations with originating code explicit
// ============================================================================
export const RETAIL_PRODUCTS: ChemicalRetailProduct[] = [
  // ── RoadForce Series (Master: TR-407) ──
  {
    id: 'ret-roadforce-fleet',
    master_formulation_id: 'form-tr-407',
    originating_master_code: 'TR-407',
    originating_master_name: 'Power Blast',
    retail_name: 'RoadForce Fleet Heavy TFR',
    retail_family: 'RoadForce',
    slug: 'roadforce-fleet-heavy-tfr',
    short_description: 'Heavy-duty traffic film remover engineered for commercial haulage, HGV fleets, and hard water wash bays.',
    long_description: 'RoadForce Fleet is Alkota\'s primary commercial traffic film remover. Formulated on the legendary TR-407 Power Blast formulation, it combines high-activity alkaline builders with advanced water softeners to dissolve electrostatically bonded road grime, diesel smoke film, and winter salt without brushing.',
    primary_application: 'Commercial HGV, Truck & Logistics Fleets',
    hero_image: '/assets/chemicals/roadforce-fleet.jpg',
    gallery: ['/assets/chemicals/roadforce-fleet.jpg', '/assets/chemicals/roadforce-app-hgv.jpg'],
    technical_summary: 'Concentrated alkaline liquid detergent for hot and cold pressure washer chemical induction. Safe on automotive paintwork and livery vinyls when diluted as specified.',
    usage_instructions: 'Apply via high pressure chemical injector or low-pressure foam cannon from bottom to top. Allow 2-3 minutes dwell time. Pressure rinse thoroughly with clean hot water (60°C optimal).',
    dilution_information: 'Hot Wash: 1:50 to 1:120 (approx 1-2% at nozzle). Cold Wash: 1:30 to 1:60. Foam Cannon: 1:10.',
    surface_compatibility: [
      { surface: 'Vehicle Paint & Clearcoat', suitability: 'recommended', notes: 'Excellent glossy finish' },
      { surface: 'Raw / Mill-Finish Aluminium', suitability: 'safe', notes: 'Do not allow concentrate to dry' },
      { surface: 'Plastics, Vinyl & Decals', suitability: 'recommended', notes: 'Livery-safe formulation' },
      { surface: 'Glass & Glazing', suitability: 'safe', notes: 'Free-rinsing without streaking' },
    ],
    warnings: ['Causes serious eye irritation.', 'Wear protective gloves and eye protection.', 'Do not allow chemical to dry on hot paint surfaces.'],
    compliance_status: 'VERIFIED_UK_CLP',
    merchandising_status: 'live',
    seo_title: 'RoadForce Fleet Heavy TFR | Commercial HGV Traffic Film Remover | Alkota UK',
    seo_description: 'Buy RoadForce Fleet Heavy Traffic Film Remover. Master formulation TR-407 Power Blast. 5L, 20L & 200L drums stocked in the UK for next-day dispatch.',
    featured: true,
    sort_order: 10,
    published: true,
  },
  {
    id: 'ret-roadforce-auto',
    master_formulation_id: 'form-tr-407',
    originating_master_code: 'TR-407',
    originating_master_name: 'Power Blast',
    retail_name: 'RoadForce Auto Touchless Wash',
    retail_family: 'RoadForce',
    slug: 'roadforce-auto-touchless-wash',
    short_description: 'Touchless vehicle wash formulated for light commercials, company vans, and dealership valeting.',
    long_description: 'Calibrated for rapid touchless cleaning on modern vehicle clearcoats. RoadForce Auto delivers the proven cleaning power of Alkota TR-407 with refined optical brighteners for a clean, streak-free vehicle hand-over.',
    primary_application: 'Vans, Light Commercials & Dealerships',
    hero_image: '/assets/chemicals/roadforce-auto.jpg',
    gallery: ['/assets/chemicals/roadforce-auto.jpg'],
    technical_summary: 'Balanced alkaline TFR with high wet-out performance and rapid sheeting action.',
    usage_instructions: 'Induct through pressure washer at 1:80. Spray evenly onto dry vehicle, dwell 2 minutes, high-pressure rinse.',
    dilution_information: 'Hot/Cold Wash: 1:60 to 1:100. Foam Lance: 1:12.',
    surface_compatibility: [
      { surface: 'Vehicle Paint & Clearcoat', suitability: 'recommended' },
      { surface: 'Plastics & Trim', suitability: 'recommended' },
      { surface: 'Glass', suitability: 'recommended' },
    ],
    warnings: ['Avoid contact with eyes.', 'Rinse thoroughly with clean water.'],
    compliance_status: 'VERIFIED_UK_CLP',
    merchandising_status: 'live',
    seo_title: 'RoadForce Auto Touchless Vehicle Wash | Alkota UK',
    seo_description: 'Shop RoadForce Auto touchless vehicle wash. Genuine Alkota TR-407 formulation. Next-day UK delivery.',
    featured: false,
    sort_order: 15,
    published: true,
  },

  // ── Luma / LumaForce (Master: TR-406) ──
  {
    id: 'ret-lumaforce-wash-wax',
    master_formulation_id: 'form-tr-406',
    originating_master_code: 'TR-406',
    originating_master_name: 'Blue Luster',
    retail_name: 'LumaForce Wash & Wax Gloss Detergent',
    retail_family: 'LumaForce',
    slug: 'lumaforce-wash-wax-gloss-detergent',
    short_description: 'Neutral-balanced wash & wax detergent with synthetic carnauba polymers for high-gloss vehicle protection.',
    long_description: 'Built on Alkota TR-406 Blue Luster, LumaForce combines mild cleaning power with water-repelling gloss wax polymers. Specifically recommended for owner-driver fleets, high-spec coaches, and prestige vehicle fleets where mirror-finish protection is essential.',
    primary_application: 'Coaches, Prestige Transporters & Light Fleets',
    hero_image: '/assets/chemicals/lumaforce-wax.jpg',
    gallery: ['/assets/chemicals/lumaforce-wax.jpg'],
    technical_summary: 'Neutral pH detergent with optical brighteners and wax polymers.',
    usage_instructions: 'Apply hot or cold through pressure washer. Rinse thoroughly and allow to sheet dry.',
    dilution_information: 'Standard Wash: 1:60 to 1:150.',
    surface_compatibility: [
      { surface: 'Vehicle Paint & Clearcoat', suitability: 'recommended', notes: 'Enhances depth of shine' },
      { surface: 'Polished Aluminium', suitability: 'recommended', notes: 'Safe on mirror polished tanks' },
      { surface: 'Chrome & Stainless Steel', suitability: 'recommended' },
    ],
    warnings: ['Do not swallow.', 'Keep out of reach of children.'],
    compliance_status: 'VERIFIED_UK_CLP',
    merchandising_status: 'live',
    seo_title: 'LumaForce Wash & Wax Detergent | TR-406 Blue Luster | Alkota UK',
    seo_description: 'Alkota LumaForce Wash & Wax. Formulation TR-406 Blue Luster. Neutral pH gloss detergent in 5L and 20L.',
    featured: true,
    sort_order: 20,
    published: true,
  },

  // ── Degrease Pro (Master: TR-413) ──
  {
    id: 'ret-degrease-pro',
    master_formulation_id: 'form-tr-413',
    originating_master_code: 'TR-413',
    originating_master_name: 'Mach 1 Degreaser',
    retail_name: 'Degrease Pro Rapid Chassis Degreaser',
    retail_family: 'Degrease',
    slug: 'degrease-pro-rapid-chassis-degreaser',
    short_description: 'Fast-penetrating emulsifying chassis and engine degreaser for MOT inspections and mechanical overhaul.',
    long_description: 'Derived from Alkota TR-413 Mach 1, Degrease Pro penetrates deep into heavy road tar, differential oil leaks, and encrusted engine grease, breaking down hydrocarbons for clean hot-water rinse-off.',
    primary_application: 'Chassis Wash Bays, MOT Test Centers & Workshops',
    hero_image: '/assets/chemicals/degrease-pro.jpg',
    gallery: ['/assets/chemicals/degrease-pro.jpg'],
    technical_summary: 'Alkaline degreasing concentrate with built-in corrosion protection for steel running gear.',
    usage_instructions: 'Apply hot at 60-70°C. Dwell 3-5 minutes on heavy oil. High pressure rinse off with turbo nozzle.',
    dilution_information: 'Heavy MOT Prep: 1:15 to 1:30. Standard Maintenance: 1:40 to 1:60.',
    surface_compatibility: [
      { surface: 'Chassis & Running Gear', suitability: 'recommended' },
      { surface: 'Cast Iron & Steel', suitability: 'recommended' },
      { surface: 'Raw Aluminium', suitability: 'safe', notes: 'Rinse within 5 minutes' },
    ],
    warnings: ['Causes skin and eye irritation.', 'Wear protective gear.'],
    compliance_status: 'VERIFIED_UK_CLP',
    merchandising_status: 'live',
    seo_title: 'Degrease Pro Chassis Degreaser | TR-413 Mach 1 | Alkota UK',
    seo_description: 'Buy Degrease Pro rapid engine and chassis degreaser. Formulated on Alkota TR-413. High alkaline MOT prep cleaner.',
    featured: false,
    sort_order: 25,
    published: true,
  },

  // ── FieldForce (Master: TR-428) ──
  {
    id: 'ret-fieldforce-farm',
    master_formulation_id: 'form-tr-428',
    originating_master_code: 'TR-428',
    originating_master_name: 'Raptor',
    retail_name: 'FieldForce Farm Heavy Wash',
    retail_family: 'FieldForce',
    slug: 'fieldforce-farm-heavy-wash',
    short_description: 'Extreme-impact agricultural equipment detergent for tractors, combines, and heavy farm machinery.',
    long_description: 'FieldForce Farm is powered by Alkota TR-428 Raptor. Engineered with soil-suspending surfactants that break the cohesive bond of compacted wet clay, silage sap, and organic muck from tractor tyres, boom sprayers, and tillage equipment.',
    primary_application: 'Agricultural Machinery, Tractors & Plant',
    hero_image: '/assets/chemicals/fieldforce-farm.jpg',
    gallery: ['/assets/chemicals/fieldforce-farm.jpg'],
    technical_summary: 'Heavy-duty agricultural alkaline detergent with advanced chelation for hard bore-hole water supplies.',
    usage_instructions: 'Foam onto agricultural machinery. Allow 5 minutes dwell time to soften caked mud. Blast clean with hot water.',
    dilution_information: 'Heavy Field Mud: 1:25 to 1:40. General Wash: 1:50 to 1:80.',
    surface_compatibility: [
      { surface: 'Painted Farm Machinery', suitability: 'recommended' },
      { surface: 'Galvanised Trailers', suitability: 'recommended' },
      { surface: 'Hydraulic Hoses & Rubber', suitability: 'recommended' },
    ],
    warnings: ['Wear eye protection.', 'Do not ingest.'],
    compliance_status: 'VERIFIED_UK_CLP',
    merchandising_status: 'live',
    seo_title: 'FieldForce Farm Heavy Wash | TR-428 Raptor Agricultural Detergent | Alkota UK',
    seo_description: 'FieldForce Farm agricultural pressure washer chemical. Formulation TR-428 Raptor. Stocked in 20L & 200L drums.',
    featured: true,
    sort_order: 30,
    published: true,
  },

  // ── AgriForce (Master: TR-440) ──
  {
    id: 'ret-agriforce-clean',
    master_formulation_id: 'form-tr-440',
    originating_master_code: 'TR-440',
    originating_master_name: 'Farm Soap',
    retail_name: 'AgriForce Biosecure Clean',
    retail_family: 'AgriForce',
    slug: 'agriforce-biosecure-clean',
    short_description: 'General farm parlour hygiene and bio-secure livestock transport wash.',
    long_description: 'Built on Alkota TR-440 Farm Soap, AgriForce provides a phosphate-free, free-rinsing clean for livestock sheds, milking parlours, and animal transport trailers before disinfectant application.',
    primary_application: 'Livestock Trailers & Parlour Hygiene',
    hero_image: '/assets/chemicals/agriforce-clean.jpg',
    gallery: ['/assets/chemicals/agriforce-clean.jpg'],
    technical_summary: 'Phosphate-free biodegradable farm wash for bio-security prep.',
    usage_instructions: 'Apply through pressure washer or foam lance. Rinse thoroughly with high pressure.',
    dilution_information: '1:40 to 1:100.',
    surface_compatibility: [
      { surface: 'Aluminium Livestock Floors', suitability: 'recommended' },
      { surface: 'Concrete & Masonry', suitability: 'recommended' },
    ],
    warnings: ['Keep out of reach of children.'],
    compliance_status: 'VERIFIED_UK_CLP',
    merchandising_status: 'live',
    seo_title: 'AgriForce Biosecure Farm Clean | TR-440 Farm Soap | Alkota UK',
    seo_description: 'Alkota AgriForce Farm Soap for biosecurity and livestock transport cleaning. Next-day UK delivery.',
    featured: false,
    sort_order: 35,
    published: true,
  },

  // ── IronForce (Master: TR-451) ──
  {
    id: 'ret-ironforce-slurry',
    master_formulation_id: 'form-tr-451',
    originating_master_code: 'TR-451',
    originating_master_name: 'Brown Wonder',
    retail_name: 'IronForce Mud & Slurry Remover',
    retail_family: 'IronForce',
    slug: 'ironforce-mud-slurry-remover',
    short_description: 'High-wetting chemical designed to dissolve baked-on slurry, clay, and manure deposits on contact.',
    long_description: 'Utilising Alkota TR-451 Brown Wonder formulation, IronForce features specialist wetting agents that penetrate dried-on farm muck faster than conventional soaps, cutting washing time by up to 50%.',
    primary_application: 'Muck Spreaders, Slurry Tankers & Yard Equipment',
    hero_image: '/assets/chemicals/ironforce-slurry.jpg',
    gallery: ['/assets/chemicals/ironforce-slurry.jpg'],
    technical_summary: 'High-pH fast wetting organic soil dissolve concentrate.',
    usage_instructions: 'Apply low pressure. Allow chemical to break down crust. Pressure wash off with 150+ bar hot water.',
    dilution_information: '1:20 to 1:50.',
    surface_compatibility: [
      { surface: 'Steel Tankers', suitability: 'recommended' },
      { surface: 'Agricultural Paintwork', suitability: 'recommended' },
    ],
    warnings: ['Corrosive to eyes.', 'Wear full PPE during application.'],
    compliance_status: 'VERIFIED_UK_CLP',
    merchandising_status: 'live',
    seo_title: 'IronForce Mud & Slurry Remover | TR-451 Brown Wonder | Alkota UK',
    seo_description: 'IronForce agricultural slurry dissolver. Genuine Alkota TR-451 chemistry. 20L and 200L drums.',
    featured: false,
    sort_order: 40,
    published: true,
  },

  // ── Forge (Master: TS-608) ──
  {
    id: 'ret-forge-carbon-stripper',
    master_formulation_id: 'form-ts-608',
    originating_master_code: 'TS-608',
    originating_master_name: 'Power Blast 2',
    retail_name: 'Forge Heavy Carbon & Oil Stripper',
    retail_family: 'Forge',
    slug: 'forge-heavy-carbon-oil-stripper',
    short_description: 'Reinforced industrial caustic degreaser for baked-on carbon, asphalt, and heavy industrial grease.',
    long_description: 'Formulated directly from Alkota TS-608 Power Blast 2, Forge is an industrial-strength alkaline stripper designed for extreme industrial applications: engine rebuilders, asphalt paving plant, and railway workshops.',
    primary_application: 'Industrial Engineering & Asphalt Plant',
    hero_image: '/assets/chemicals/forge-stripper.jpg',
    gallery: ['/assets/chemicals/forge-stripper.jpg'],
    technical_summary: 'Heavy caustic chemical formulation with high thermal stability for steam cleaning units.',
    usage_instructions: 'Apply through steam cleaner or hot pressure washer at 80°C+. Rinse thoroughly.',
    dilution_information: '1:20 (extreme) to 1:60 (standard industrial).',
    surface_compatibility: [
      { surface: 'Cast Iron & Heavy Steel', suitability: 'recommended' },
      { surface: 'Concrete Floors', suitability: 'recommended' },
      { surface: 'Raw Aluminium', suitability: 'do_not_use', notes: 'Caustic attacks aluminium' },
    ],
    warnings: ['Contains Sodium Hydroxide. Causes severe skin burns and eye damage.', 'Professional industrial use only.'],
    compliance_status: 'VERIFIED_UK_CLP',
    merchandising_status: 'live',
    seo_title: 'Forge Heavy Carbon & Oil Stripper | TS-608 Power Blast 2 | Alkota UK',
    seo_description: 'Industrial heavy carbon and grease stripper. Alkota TS-608 Power Blast 2 formulation. UK industrial supply.',
    featured: true,
    sort_order: 45,
    published: true,
  },

  // ── CarbonForce (Master: SD-926) ──
  {
    id: 'ret-carbonforce-caustic',
    master_formulation_id: 'form-sd-926',
    originating_master_code: 'SD-926',
    originating_master_name: 'Power Blast 3',
    retail_name: 'CarbonForce Ultra Caustic Concentrate',
    retail_family: 'CarbonForce',
    slug: 'carbonforce-ultra-caustic-concentrate',
    short_description: 'Ultra-concentrated heavy industrial cleaning compound for steam boilers, drill rigs, and bitumen tankers.',
    long_description: 'Directly sourced from Alkota SD-926 Power Blast 3, CarbonForce delivers maximum caustic alkalinity for deep-dissolving petroleum tar, synthetic oils, and carbon scale.',
    primary_application: 'Mining, Marine & Petrochemical Plant',
    hero_image: '/assets/chemicals/carbonforce.jpg',
    gallery: ['/assets/chemicals/carbonforce.jpg'],
    technical_summary: 'Maximum alkalinity concentrate for steam generators and heavy industrial spray wash plants.',
    usage_instructions: 'Strict industrial protocol. Dilute 1:30 to 1:100. Rinse thoroughly.',
    dilution_information: '1:30 to 1:100.',
    surface_compatibility: [
      { surface: 'Heavy Steel', suitability: 'recommended' },
      { surface: 'Aluminium & Brass', suitability: 'do_not_use' },
    ],
    warnings: ['Danger: Highly caustic.', 'Always wear protective face shield, gauntlets and rubber apron.'],
    compliance_status: 'VERIFIED_UK_CLP',
    merchandising_status: 'live',
    seo_title: 'CarbonForce Ultra Caustic Chemical | SD-926 | Alkota UK',
    seo_description: 'CarbonForce industrial caustic concentrate. Alkota SD-926 Power Blast 3. 20L, 200L & 1000L IBC.',
    featured: false,
    sort_order: 50,
    published: true,
  },

  // ── Redline (Master: DE-750) ──
  {
    id: 'ret-redline-degreaser',
    master_formulation_id: 'form-de-750',
    originating_master_code: 'DE-750',
    originating_master_name: 'Super Red Degreaser',
    retail_name: 'Redline High Alkaline Industrial Degreaser',
    retail_family: 'Redline',
    slug: 'redline-high-alkaline-industrial-degreaser',
    short_description: 'High-alkaline industrial degreaser with high-visibility red tracer for plant and concrete cleaning.',
    long_description: 'Based on Alkota DE-750 Super Red Degreaser, Redline is formulated with rapid-acting emulsifiers and a red visual indicator to ensure complete surface coverage on industrial floor slabs and construction machinery.',
    primary_application: 'Plant Hire Yards, Concrete Floors & Equipment Refurbishment',
    hero_image: '/assets/chemicals/redline.jpg',
    gallery: ['/assets/chemicals/redline.jpg'],
    technical_summary: 'Red-tinted high alkaline industrial degreasing chemical.',
    usage_instructions: 'Spray on greasy floor or plant chassis. Dwell 3 minutes. Pressure rinse.',
    dilution_information: '1:10 (heavy floor scrubbing) to 1:40 (chassis washing).',
    surface_compatibility: [
      { surface: 'Concrete Floors', suitability: 'recommended' },
      { surface: 'Structural Steel', suitability: 'recommended' },
    ],
    warnings: ['Wear protective eyewear and gloves.'],
    compliance_status: 'VERIFIED_UK_CLP',
    merchandising_status: 'live',
    seo_title: 'Redline High Alkaline Degreaser | DE-750 Super Red | Alkota UK',
    seo_description: 'Shop Redline industrial degreaser. Genuine Alkota DE-750 formulation. Stocked in UK for immediate dispatch.',
    featured: false,
    sort_order: 55,
    published: true,
  },

  // ── GreaseCut (Master: DE-703) ──
  {
    id: 'ret-greasecut-workshop',
    master_formulation_id: 'form-de-703',
    originating_master_code: 'DE-703',
    originating_master_name: 'Grease Cutter',
    retail_name: 'GreaseCut Multi-Surface Workshop Degreaser',
    retail_family: 'GreaseCut',
    slug: 'greasecut-multi-surface-workshop-degreaser',
    short_description: 'Versatile non-caustic workshop degreaser safe on aluminium components, machinery parts, and tools.',
    long_description: 'Powered by Alkota DE-703 Grease Cutter, GreaseCut provides high-potency hydrocarbon degreasing without harsh hydroxides, making it safe for gearbox casings, motorcycle engines, and precision alloy machinery.',
    primary_application: 'Automotive Workshops, Plant Maintenance & Machining',
    hero_image: '/assets/chemicals/greasecut.jpg',
    gallery: ['/assets/chemicals/greasecut.jpg'],
    technical_summary: 'Non-caustic solvent-surfactant hybrid degreaser with aluminium corrosion inhibitors.',
    usage_instructions: 'Apply via spray bottle, parts immersion tank, or pressure washer. Agitate stubborn oil if needed, then rinse.',
    dilution_information: 'Heavy Parts Cleaning: 1:5 to 1:10. General Degreasing: 1:20 to 1:50.',
    surface_compatibility: [
      { surface: 'Raw / Mill-Finish Aluminium', suitability: 'recommended', notes: 'Non-caustic inhibitor protected' },
      { surface: 'Stainless Steel', suitability: 'recommended' },
      { surface: 'Painted Surfaces', suitability: 'recommended' },
    ],
    warnings: ['Causes eye irritation.'],
    compliance_status: 'VERIFIED_UK_CLP',
    merchandising_status: 'live',
    seo_title: 'GreaseCut Workshop Degreaser | DE-703 Grease Cutter | Alkota UK',
    seo_description: 'GreaseCut aluminium-safe workshop degreaser. Master formulation Alkota DE-703. Buy online 5L, 20L.',
    featured: true,
    sort_order: 60,
    published: true,
  },

  // ── CitrusForce (Master: DE-721) ──
  {
    id: 'ret-citrusforce-solvent',
    master_formulation_id: 'form-de-721',
    originating_master_code: 'DE-721',
    originating_master_name: 'Citrus Blast',
    retail_name: 'CitrusForce Natural Solvent Degreaser',
    retail_family: 'CitrusForce',
    slug: 'citrusforce-natural-solvent-degreaser',
    short_description: 'Natural D-Limonene citrus terpene solvent for tar, asphalt, bitumen, adhesive, and heavy grease removal.',
    long_description: 'Sourced from Alkota DE-721 Citrus Blast, CitrusForce harnesses pure citrus terpenes to liquefy bitumen, road tar, tree sap, and mastic adhesives without petroleum solvent fumes.',
    primary_application: 'Tar Removal, Bitumen Plant & Adhesive Stripping',
    hero_image: '/assets/chemicals/citrusforce.jpg',
    gallery: ['/assets/chemicals/citrusforce.jpg'],
    technical_summary: 'Natural solvent emulsifier derived from orange peel terpenes.',
    usage_instructions: 'Apply neat to tar or heavy bitumen. Allow 3-5 minutes dwell. Pressure rinse with hot water.',
    dilution_information: 'Heavy Bitumen: Neat. General Degreasing: 1:5 to 1:20 with water.',
    surface_compatibility: [
      { surface: 'Metals & Steel', suitability: 'recommended' },
      { surface: 'Vehicle Clearcoat', suitability: 'safe', notes: 'Rinse promptly' },
      { surface: 'Tarmac / Asphalt', suitability: 'do_not_use', notes: 'Dissolves bitumen' },
    ],
    warnings: ['Flammable liquid.', 'May cause an allergic skin reaction.'],
    compliance_status: 'VERIFIED_UK_CLP',
    merchandising_status: 'live',
    seo_title: 'CitrusForce Natural Solvent Degreaser | DE-721 Citrus Blast | Alkota UK',
    seo_description: 'CitrusForce natural D-Limonene tar and bitumen remover. Alkota DE-721 formulation. 5L & 20L.',
    featured: false,
    sort_order: 65,
    published: true,
  },

  // ── AlumaRestore (Master: TS-602) ──
  {
    id: 'ret-alumarestore-brightener',
    master_formulation_id: 'form-ts-602',
    originating_master_code: 'TS-602',
    originating_master_name: 'Aluma Shine 2',
    retail_name: 'AlumaRestore Aluminium Acid Brightener',
    retail_family: 'AlumaRestore',
    slug: 'alumarestore-aluminium-acid-brightener',
    short_description: 'Specialist acid aluminium cleaner that dissolves oxidation, road scale, and diesel soot to restore a satin finish.',
    long_description: 'AlumaRestore is formulated directly on Alkota TS-602 Aluma Shine 2. Engineered with an inhibited multi-acid blend to etch away grey oxidation, road film, and welding discolouration from raw aluminium tipper bodies, bulk tanks, and side-guards.',
    primary_application: 'Aluminium Tippers, Fuel Tanks & Curtain Rails',
    hero_image: '/assets/chemicals/alumarestore.jpg',
    gallery: ['/assets/chemicals/alumarestore.jpg'],
    technical_summary: 'Inhibited acid aluminium restoration formulation.',
    usage_instructions: 'Pre-wet surface. Apply cold from bottom up. Dwell 1-2 minutes until foaming. High pressure rinse immediately. Never apply in direct sun or allow to dry.',
    dilution_information: 'Heavy Oxidation: 1:10. Maintenance Brightening: 1:20 to 1:30.',
    surface_compatibility: [
      { surface: 'Raw / Mill-Finish Aluminium', suitability: 'recommended', notes: 'Produces uniform satin luster' },
      { surface: 'Stainless Steel', suitability: 'recommended' },
      { surface: 'Polished / Anodised Aluminium', suitability: 'test_first', notes: 'May dull mirror polish' },
      { surface: 'Glass', suitability: 'do_not_use', notes: 'Can etch glass' },
    ],
    warnings: ['Danger: Contains acidic compounds. Causes severe skin burns and eye damage.', 'Always wear face visor, acid-resistant gloves and apron.'],
    compliance_status: 'VERIFIED_UK_CLP',
    merchandising_status: 'live',
    seo_title: 'AlumaRestore Aluminium Acid Brightener | TS-602 Aluma Shine 2 | Alkota UK',
    seo_description: 'Buy AlumaRestore acid aluminium cleaner and brightener. Master formulation Alkota TS-602. 5L, 20L & 200L.',
    featured: true,
    sort_order: 70,
    published: true,
  },

  // ── MetalForce (Master: TS-610) ──
  {
    id: 'ret-metalforce-phosclean',
    master_formulation_id: 'form-ts-610',
    originating_master_code: 'TS-610',
    originating_master_name: 'Phos Clean',
    retail_name: 'MetalForce Phosphoric Cleaner & Descaler',
    retail_family: 'MetalForce',
    slug: 'metalforce-phosphoric-cleaner-descaler',
    short_description: 'Phosphoric acid metal wash that removes light surface rust, cleans weld scale, and phosphatises steel.',
    long_description: 'Based on Alkota TS-610 Phos Clean, MetalForce cleans ferrous metals while converting surface iron into a micro-crystalline iron phosphate layer, preparing bare steel for primer coating and corrosion resistance.',
    primary_application: 'Metal Fabrication, Welding Workshops & Steel Pre-treatment',
    hero_image: '/assets/chemicals/metalforce.jpg',
    gallery: ['/assets/chemicals/metalforce.jpg'],
    technical_summary: 'Inhibited phosphoric acid formulation with metal conversion properties.',
    usage_instructions: 'Apply via brush or low-pressure spray. Dwell 5-10 minutes. Rinse or wipe dry.',
    dilution_information: '1:10 to 1:25 with clean water.',
    surface_compatibility: [
      { surface: 'Structural Steel & Cast Iron', suitability: 'recommended' },
      { surface: 'Stainless Steel', suitability: 'recommended' },
    ],
    warnings: ['Causes skin irritation and serious eye irritation.'],
    compliance_status: 'VERIFIED_UK_CLP',
    merchandising_status: 'live',
    seo_title: 'MetalForce Phosphoric Cleaner & Rust Converter | TS-610 | Alkota UK',
    seo_description: 'MetalForce phosphoric acid metal wash and iron phosphatiser. Alkota TS-610 Phos Clean. UK stock.',
    featured: false,
    sort_order: 75,
    published: true,
  },

  // ── ScaleGuard (Master: SD-927) ──
  {
    id: 'ret-scaleguard-preventative',
    master_formulation_id: 'form-sd-927',
    originating_master_code: 'SD-927',
    originating_master_name: 'No Scale',
    retail_name: 'ScaleGuard Water Softener & Coil Protector',
    retail_family: 'ScaleGuard',
    slug: 'scaleguard-water-softener-coil-protector',
    short_description: 'Continuous coil scale prevention concentrate for hot water pressure washers and steam generators.',
    long_description: 'Derived from Alkota SD-927 No Scale, ScaleGuard chemically binds calcium and magnesium carbonates in the water supply before they can bake onto the hot inner walls of Schedule 80 heating coils, preventing burner burnout and pressure drop.',
    primary_application: 'Hot Water Pressure Washers & Steam Cleaner Water Tanks',
    hero_image: '/assets/chemicals/scaleguard.jpg',
    gallery: ['/assets/chemicals/scaleguard.jpg'],
    technical_summary: 'Polyphosphate chelating agent for continuous automatic coil scale inhibition.',
    usage_instructions: 'Pour into machine anti-scale dosing tank. Machine meters 20-30ml per hour of continuous hot operation.',
    dilution_information: 'Dosed via automatic machine scale pump reservoir.',
    surface_compatibility: [
      { surface: 'Schedule 80 Steel Coils', suitability: 'recommended', notes: 'Extends coil life 300%+' },
      { surface: 'High Pressure Pumps & Valves', suitability: 'recommended' },
    ],
    warnings: ['Non-hazardous under CLP at ready-to-use levels.', 'Do not ingest.'],
    compliance_status: 'VERIFIED_UK_CLP',
    merchandising_status: 'live',
    seo_title: 'ScaleGuard Coil Scale Preventative | SD-927 No Scale | Alkota UK',
    seo_description: 'Protect pressure washer heating coils from limescale. Alkota SD-927 No Scale. 5L & 20L available.',
    featured: true,
    sort_order: 80,
    published: true,
  },

  // ── CoilRestore (Master: SD-929) ──
  {
    id: 'ret-coilrestore-descaler',
    master_formulation_id: 'form-sd-929',
    originating_master_code: 'SD-929',
    originating_master_name: 'Coil ScaleAway',
    retail_name: 'CoilRestore Schedule 80 Coil Descaler',
    retail_family: 'CoilRestore',
    slug: 'coilrestore-schedule-80-coil-descaler',
    short_description: 'Inhibited acid descaler that safely dissolves calcified limescale inside hot water pressure washer coils.',
    long_description: 'Formulated from Alkota SD-929 Coil ScaleAway. Contains organic acid inhibitors that rapidly dissolve rock-hard calcium carbonate scale inside heating coils without attacking the parent Schedule 80 carbon steel pipework.',
    primary_application: 'Service Centers & Machine Planned Maintenance (PPM)',
    hero_image: '/assets/chemicals/coilrestore.jpg',
    gallery: ['/assets/chemicals/coilrestore.jpg'],
    technical_summary: 'Inhibited acid descaling liquid with chemical indicator.',
    usage_instructions: 'Recirculate through coil using external acid descaling pump for 20-40 minutes until effervescence ceases. Neutralise and flush thoroughly.',
    dilution_information: '1:4 to 1:10 with water depending on scale severity.',
    surface_compatibility: [
      { surface: 'Schedule 80 Carbon Steel Coils', suitability: 'recommended' },
      { surface: 'Stainless Steel Coils', suitability: 'recommended' },
    ],
    warnings: ['Danger: Acidic formulation.', 'Wear protective gear during descaling loop.'],
    compliance_status: 'VERIFIED_UK_CLP',
    merchandising_status: 'live',
    seo_title: 'CoilRestore Schedule 80 Coil Descaler | SD-929 | Alkota UK',
    seo_description: 'Alkota CoilRestore acid coil descaler. Master code SD-929 ScaleAway. 5L & 20L containers.',
    featured: false,
    sort_order: 85,
    published: true,
  },

  // ── GlossGuard (Master: TS-616) ──
  {
    id: 'ret-glossguard-hot-wax',
    master_formulation_id: 'form-ts-616',
    originating_master_code: 'TS-616',
    originating_master_name: 'Gloss Wax',
    retail_name: 'GlossGuard Hot Spray Sealant Wax',
    retail_family: 'GlossGuard',
    slug: 'glossguard-hot-spray-sealant-wax',
    short_description: 'Hot water application sealant wax that imparts instant hydrophobic water beading and deep gloss.',
    long_description: 'Based on Alkota TS-616 Gloss Wax. Applied through the pressure washer chemical stage at 50-60°C to deposit a micro-fine protective polymeric film over paint, glass, and metals, speeding vehicle drying and reducing future dirt adhesion.',
    primary_application: 'Commercial Vehicle Wash Bays & Valeting Centers',
    hero_image: '/assets/chemicals/glossguard.jpg',
    gallery: ['/assets/chemicals/glossguard.jpg'],
    technical_summary: 'Cationic wax polymer emulsion with rapid sheeting and hydrophobic beading.',
    usage_instructions: 'Apply through hot water pressure washer (50-60°C) after vehicle cleaning. Low pressure apply, then high pressure cold rinse.',
    dilution_information: '1:100 to 1:250.',
    surface_compatibility: [
      { surface: 'Vehicle Paint & Clearcoat', suitability: 'recommended' },
      { surface: 'Glass & Glazing', suitability: 'recommended' },
      { surface: 'Polished Metals', suitability: 'recommended' },
    ],
    warnings: ['Keep out of reach of children.'],
    compliance_status: 'VERIFIED_UK_CLP',
    merchandising_status: 'live',
    seo_title: 'GlossGuard Hot Sealant Wax | TS-616 Gloss Wax | Alkota UK',
    seo_description: 'GlossGuard hot water pressure washer wax. Alkota TS-616 formulation. 5L and 20L containers.',
    featured: false,
    sort_order: 90,
    published: true,
  },

  // ── SaltGuard (Master: TS-632) ──
  {
    id: 'ret-saltguard-deicer',
    master_formulation_id: 'form-ts-632',
    originating_master_code: 'TS-632',
    originating_master_name: 'Salt Destroyer',
    retail_name: 'SaltGuard Winter De-icer Neutraliser',
    retail_family: 'SaltGuard',
    slug: 'saltguard-winter-deicer-neutraliser',
    short_description: 'Chemical salt neutraliser that breaks down road salt and calcium chloride crust to stop chassis corrosion.',
    long_description: 'Engineered from Alkota TS-632 Salt Destroyer. Standard water alone cannot dissolve compacted de-icing salt film. SaltGuard breaks the electrochemical bonds of road salts, dissolving corrosive chlorides and leaving a protective rust-inhibiting barrier.',
    primary_application: 'Winter Fleet Maintenance, Gritter Trucks & Undercarriage Wash',
    hero_image: '/assets/chemicals/saltguard.jpg',
    gallery: ['/assets/chemicals/saltguard.jpg'],
    technical_summary: 'Chloride neutralising chemical compound with dual-action corrosion inhibitors.',
    usage_instructions: 'Spray chassis and undercarriage thoroughly. Allow 2-3 minutes. High pressure rinse.',
    dilution_information: '1:30 to 1:80 cold water application.',
    surface_compatibility: [
      { surface: 'Vehicle Chassis & Subframe', suitability: 'recommended' },
      { surface: 'Brake Lines & Fasteners', suitability: 'recommended' },
      { surface: 'Automotive Paint', suitability: 'recommended' },
    ],
    warnings: ['Non-corrosive neutral formulation.', 'Wear eye protection.'],
    compliance_status: 'VERIFIED_UK_CLP',
    merchandising_status: 'live',
    seo_title: 'SaltGuard Winter De-icer Neutraliser | TS-632 Salt Destroyer | Alkota UK',
    seo_description: 'Stop chassis rust with SaltGuard salt neutraliser. Alkota TS-632 chemistry. 5L, 20L & 200L.',
    featured: true,
    sort_order: 95,
    published: true,
  },

  // ── GraffitiClear (Master: RA-247) ──
  {
    id: 'ret-graffiticlear-porous',
    master_formulation_id: 'form-ra-247',
    originating_master_code: 'RA-247',
    originating_master_name: 'Graffiti Eraser',
    retail_name: 'GraffitiClear Porous Masonry Stripper',
    retail_family: 'GraffitiClear',
    slug: 'graffiticlear-porous-masonry-stripper',
    short_description: 'Deep-penetrating graffiti stripper for porous brickwork, concrete, sandstone, and render.',
    long_description: 'Powered by Alkota RA-247 Graffiti Eraser. Penetrates deep into the porous matrix of stone and brick to dissolve spray enamel, lacquer, and marker pens without leaving shadow ghosts.',
    primary_application: 'Local Authorities, Facilities Management & Property Care',
    hero_image: '/assets/chemicals/graffiticlear.jpg',
    gallery: ['/assets/chemicals/graffiticlear.jpg'],
    technical_summary: 'Thickened solvent-alkaline graffiti remover for vertical masonry dwell.',
    usage_instructions: 'Apply neat with brush. Allow 10-15 minutes dwell time. Pressure rinse off using 80°C hot water.',
    dilution_information: 'Use neat.',
    surface_compatibility: [
      { surface: 'Brickwork & Concrete', suitability: 'recommended' },
      { surface: 'Sandstone & Natural Stone', suitability: 'recommended' },
    ],
    warnings: ['Causes skin and eye irritation.', 'Use outdoors or in well-ventilated areas.'],
    compliance_status: 'VERIFIED_UK_CLP',
    merchandising_status: 'live',
    seo_title: 'GraffitiClear Masonry Stripper | RA-247 Graffiti Eraser | Alkota UK',
    seo_description: 'GraffitiClear porous brickwork and stone graffiti remover. Alkota RA-247. 5L containers in stock.',
    featured: false,
    sort_order: 100,
    published: true,
  },

  // ── HydroClean (Master: RA-252) ──
  {
    id: 'ret-hydroclean-masonry',
    master_formulation_id: 'form-ra-252',
    originating_master_code: 'RA-252',
    originating_master_name: 'HydroClean Rx',
    retail_name: 'HydroClean Masonry & Mortar Restorer',
    retail_family: 'HydroClean',
    slug: 'hydroclean-masonry-mortar-restorer',
    short_description: 'Efflorescence, mortar smear, and atmospheric carbon cleaner for new brick and architectural stone.',
    long_description: 'Directly sourced from Alkota RA-252 HydroClean Rx. Formulated with buffered organic acids to remove white efflorescence salts and mortar stains without burning red brickwork.',
    primary_application: 'Building Contractors, Bricklayers & Restoration',
    hero_image: '/assets/chemicals/hydroclean.jpg',
    gallery: ['/assets/chemicals/hydroclean.jpg'],
    technical_summary: 'Buffered acid masonry cleaner with surfactant wetting agents.',
    usage_instructions: 'Pre-wet masonry. Apply diluted chemical with low pressure sprayer. Dwell 5 minutes. High pressure rinse thoroughly.',
    dilution_information: '1:5 (heavy mortar) to 1:20 (light efflorescence).',
    surface_compatibility: [
      { surface: 'Facing Brickwork & Masonry', suitability: 'recommended' },
      { surface: 'Polished Limestone & Marble', suitability: 'do_not_use', notes: 'Acid attacks calcium carbonate' },
    ],
    warnings: ['Danger: Contains acid.', 'Always pre-wet surfaces before application.'],
    compliance_status: 'VERIFIED_UK_CLP',
    merchandising_status: 'live',
    seo_title: 'HydroClean Masonry & Mortar Restorer | RA-252 | Alkota UK',
    seo_description: 'HydroClean masonry restorer for efflorescence and mortar. Alkota RA-252 formulation. 5L & 20L.',
    featured: false,
    sort_order: 105,
    published: true,
  },
];

// ============================================================================
// 6. SELLABLE SKUS (Pack Size Variants: 5L, 15L, 20L, 200L, 1000L)
// All tied to retail products with exact pricing
// ============================================================================
export const CHEMICAL_SKUS: ChemicalSKU[] = [
  // RoadForce Fleet
  { id: 'sku-rf-fleet-5l', retail_product_id: 'ret-roadforce-fleet', sku_code: 'ALK-CHM-TR407-5L', pack_size: '5 L Canister', volume_litres: 5, price: 28.50, cost_price: 14.20, in_stock: true, stock_quantity: 85, weight_kg: 5.8, sort_order: 10, active: true },
  { id: 'sku-rf-fleet-20l', retail_product_id: 'ret-roadforce-fleet', sku_code: 'ALK-CHM-TR407-20L', pack_size: '20 L Drum', volume_litres: 20, price: 84.00, cost_price: 42.50, in_stock: true, stock_quantity: 120, weight_kg: 23.2, sort_order: 20, active: true },
  { id: 'sku-rf-fleet-200l', retail_product_id: 'ret-roadforce-fleet', sku_code: 'ALK-CHM-TR407-200L', pack_size: '200 L Barrel', volume_litres: 200, price: 680.00, cost_price: 340.00, in_stock: true, stock_quantity: 14, weight_kg: 232.0, sort_order: 30, active: true },
  { id: 'sku-rf-fleet-1000l', retail_product_id: 'ret-roadforce-fleet', sku_code: 'ALK-CHM-TR407-1000L', pack_size: '1000 L IBC', volume_litres: 1000, price: 2850.00, cost_price: 1450.00, in_stock: true, stock_quantity: 4, weight_kg: 1160.0, sort_order: 40, active: true },

  // RoadForce Auto
  { id: 'sku-rf-auto-5l', retail_product_id: 'ret-roadforce-auto', sku_code: 'ALK-CHM-TR407A-5L', pack_size: '5 L Canister', volume_litres: 5, price: 26.50, cost_price: 13.00, in_stock: true, stock_quantity: 45, weight_kg: 5.6, sort_order: 10, active: true },
  { id: 'sku-rf-auto-20l', retail_product_id: 'ret-roadforce-auto', sku_code: 'ALK-CHM-TR407A-20L', pack_size: '20 L Drum', volume_litres: 20, price: 78.00, cost_price: 38.00, in_stock: true, stock_quantity: 60, weight_kg: 22.8, sort_order: 20, active: true },

  // LumaForce
  { id: 'sku-luma-5l', retail_product_id: 'ret-lumaforce-wash-wax', sku_code: 'ALK-CHM-TR406-5L', pack_size: '5 L Canister', volume_litres: 5, price: 34.00, cost_price: 17.50, in_stock: true, stock_quantity: 35, weight_kg: 5.5, sort_order: 10, active: true },
  { id: 'sku-luma-20l', retail_product_id: 'ret-lumaforce-wash-wax', sku_code: 'ALK-CHM-TR406-20L', pack_size: '20 L Drum', volume_litres: 20, price: 98.00, cost_price: 49.00, in_stock: true, stock_quantity: 40, weight_kg: 22.0, sort_order: 20, active: true },

  // Degrease Pro
  { id: 'sku-degrease-5l', retail_product_id: 'ret-degrease-pro', sku_code: 'ALK-CHM-TR413-5L', pack_size: '5 L Canister', volume_litres: 5, price: 32.00, cost_price: 16.00, in_stock: true, stock_quantity: 30, weight_kg: 5.7, sort_order: 10, active: true },
  { id: 'sku-degrease-20l', retail_product_id: 'ret-degrease-pro', sku_code: 'ALK-CHM-TR413-20L', pack_size: '20 L Drum', volume_litres: 20, price: 94.00, cost_price: 47.00, in_stock: true, stock_quantity: 50, weight_kg: 23.0, sort_order: 20, active: true },

  // FieldForce
  { id: 'sku-fieldforce-20l', retail_product_id: 'ret-fieldforce-farm', sku_code: 'ALK-CHM-TR428-20L', pack_size: '20 L Drum', volume_litres: 20, price: 88.00, cost_price: 44.00, in_stock: true, stock_quantity: 90, weight_kg: 23.5, sort_order: 10, active: true },
  { id: 'sku-fieldforce-200l', retail_product_id: 'ret-fieldforce-farm', sku_code: 'ALK-CHM-TR428-200L', pack_size: '200 L Barrel', volume_litres: 200, price: 720.00, cost_price: 360.00, in_stock: true, stock_quantity: 12, weight_kg: 235.0, sort_order: 20, active: true },
  { id: 'sku-fieldforce-1000l', retail_product_id: 'ret-fieldforce-farm', sku_code: 'ALK-CHM-TR428-1000L', pack_size: '1000 L IBC', volume_litres: 1000, price: 2980.00, cost_price: 1520.00, in_stock: true, stock_quantity: 3, weight_kg: 1175.0, sort_order: 30, active: true },

  // AgriForce
  { id: 'sku-agriforce-20l', retail_product_id: 'ret-agriforce-clean', sku_code: 'ALK-CHM-TR440-20L', pack_size: '20 L Drum', volume_litres: 20, price: 82.00, cost_price: 41.00, in_stock: true, stock_quantity: 40, weight_kg: 22.5, sort_order: 10, active: true },

  // IronForce
  { id: 'sku-ironforce-20l', retail_product_id: 'ret-ironforce-slurry', sku_code: 'ALK-CHM-TR451-20L', pack_size: '20 L Drum', volume_litres: 20, price: 92.00, cost_price: 46.00, in_stock: true, stock_quantity: 35, weight_kg: 23.4, sort_order: 10, active: true },

  // Forge
  { id: 'sku-forge-20l', retail_product_id: 'ret-forge-carbon-stripper', sku_code: 'ALK-CHM-TS608-20L', pack_size: '20 L Drum', volume_litres: 20, price: 108.00, cost_price: 54.00, in_stock: true, stock_quantity: 45, weight_kg: 24.2, sort_order: 10, active: true },
  { id: 'sku-forge-200l', retail_product_id: 'ret-forge-carbon-stripper', sku_code: 'ALK-CHM-TS608-200L', pack_size: '200 L Barrel', volume_litres: 200, price: 890.00, cost_price: 445.00, in_stock: true, stock_quantity: 6, weight_kg: 242.0, sort_order: 20, active: true },

  // CarbonForce
  { id: 'sku-carbonforce-20l', retail_product_id: 'ret-carbonforce-caustic', sku_code: 'ALK-CHM-SD926-20L', pack_size: '20 L Drum', volume_litres: 20, price: 115.00, cost_price: 58.00, in_stock: true, stock_quantity: 25, weight_kg: 24.8, sort_order: 10, active: true },

  // Redline
  { id: 'sku-redline-20l', retail_product_id: 'ret-redline-degreaser', sku_code: 'ALK-CHM-DE750-20L', pack_size: '20 L Drum', volume_litres: 20, price: 86.00, cost_price: 43.00, in_stock: true, stock_quantity: 55, weight_kg: 23.0, sort_order: 10, active: true },

  // GreaseCut
  { id: 'sku-greasecut-5l', retail_product_id: 'ret-greasecut-workshop', sku_code: 'ALK-CHM-DE703-5L', pack_size: '5 L Canister', volume_litres: 5, price: 29.50, cost_price: 14.80, in_stock: true, stock_quantity: 75, weight_kg: 5.6, sort_order: 10, active: true },
  { id: 'sku-greasecut-20l', retail_product_id: 'ret-greasecut-workshop', sku_code: 'ALK-CHM-DE703-20L', pack_size: '20 L Drum', volume_litres: 20, price: 86.00, cost_price: 43.00, in_stock: true, stock_quantity: 80, weight_kg: 22.8, sort_order: 20, active: true },

  // CitrusForce
  { id: 'sku-citrusforce-5l', retail_product_id: 'ret-citrusforce-solvent', sku_code: 'ALK-CHM-DE721-5L', pack_size: '5 L Canister', volume_litres: 5, price: 46.00, cost_price: 23.00, in_stock: true, stock_quantity: 30, weight_kg: 4.8, sort_order: 10, active: true },
  { id: 'sku-citrusforce-20l', retail_product_id: 'ret-citrusforce-solvent', sku_code: 'ALK-CHM-DE721-20L', pack_size: '20 L Drum', volume_litres: 20, price: 145.00, cost_price: 72.00, in_stock: true, stock_quantity: 25, weight_kg: 19.5, sort_order: 20, active: true },

  // AlumaRestore
  { id: 'sku-alumarestore-5l', retail_product_id: 'ret-alumarestore-brightener', sku_code: 'ALK-CHM-TS602-5L', pack_size: '5 L Canister', volume_litres: 5, price: 36.50, cost_price: 18.00, in_stock: true, stock_quantity: 40, weight_kg: 5.7, sort_order: 10, active: true },
  { id: 'sku-alumarestore-20l', retail_product_id: 'ret-alumarestore-brightener', sku_code: 'ALK-CHM-TS602-20L', pack_size: '20 L Drum', volume_litres: 20, price: 112.00, cost_price: 56.00, in_stock: true, stock_quantity: 65, weight_kg: 23.2, sort_order: 20, active: true },

  // MetalForce
  { id: 'sku-metalforce-5l', retail_product_id: 'ret-metalforce-phosclean', sku_code: 'ALK-CHM-TS610-5L', pack_size: '5 L Canister', volume_litres: 5, price: 38.00, cost_price: 19.00, in_stock: true, stock_quantity: 20, weight_kg: 5.8, sort_order: 10, active: true },
  { id: 'sku-metalforce-20l', retail_product_id: 'ret-metalforce-phosclean', sku_code: 'ALK-CHM-TS610-20L', pack_size: '20 L Drum', volume_litres: 20, price: 118.00, cost_price: 59.00, in_stock: true, stock_quantity: 25, weight_kg: 23.5, sort_order: 20, active: true },

  // ScaleGuard
  { id: 'sku-scaleguard-5l', retail_product_id: 'ret-scaleguard-preventative', sku_code: 'ALK-CHM-SD927-5L', pack_size: '5 L Canister', volume_litres: 5, price: 32.00, cost_price: 15.00, in_stock: true, stock_quantity: 80, weight_kg: 5.5, sort_order: 10, active: true },
  { id: 'sku-scaleguard-20l', retail_product_id: 'ret-scaleguard-preventative', sku_code: 'ALK-CHM-SD927-20L', pack_size: '20 L Drum', volume_litres: 20, price: 95.00, cost_price: 45.00, in_stock: true, stock_quantity: 50, weight_kg: 22.0, sort_order: 20, active: true },

  // CoilRestore
  { id: 'sku-coilrestore-5l', retail_product_id: 'ret-coilrestore-descaler', sku_code: 'ALK-CHM-SD929-5L', pack_size: '5 L Canister', volume_litres: 5, price: 39.00, cost_price: 19.50, in_stock: true, stock_quantity: 35, weight_kg: 5.8, sort_order: 10, active: true },
  { id: 'sku-coilrestore-20l', retail_product_id: 'ret-coilrestore-descaler', sku_code: 'ALK-CHM-SD929-20L', pack_size: '20 L Drum', volume_litres: 20, price: 125.00, cost_price: 62.00, in_stock: true, stock_quantity: 30, weight_kg: 23.6, sort_order: 20, active: true },

  // GlossGuard
  { id: 'sku-glossguard-5l', retail_product_id: 'ret-glossguard-hot-wax', sku_code: 'ALK-CHM-TS616-5L', pack_size: '5 L Canister', volume_litres: 5, price: 35.00, cost_price: 17.00, in_stock: true, stock_quantity: 30, weight_kg: 5.4, sort_order: 10, active: true },
  { id: 'sku-glossguard-20l', retail_product_id: 'ret-glossguard-hot-wax', sku_code: 'ALK-CHM-TS616-20L', pack_size: '20 L Drum', volume_litres: 20, price: 105.00, cost_price: 52.00, in_stock: true, stock_quantity: 25, weight_kg: 21.8, sort_order: 20, active: true },

  // SaltGuard
  { id: 'sku-saltguard-5l', retail_product_id: 'ret-saltguard-deicer', sku_code: 'ALK-CHM-TS632-5L', pack_size: '5 L Canister', volume_litres: 5, price: 34.50, cost_price: 16.50, in_stock: true, stock_quantity: 60, weight_kg: 5.6, sort_order: 10, active: true },
  { id: 'sku-saltguard-20l', retail_product_id: 'ret-saltguard-deicer', sku_code: 'ALK-CHM-TS632-20L', pack_size: '20 L Drum', volume_litres: 20, price: 98.00, cost_price: 48.00, in_stock: true, stock_quantity: 70, weight_kg: 22.8, sort_order: 20, active: true },

  // GraffitiClear
  { id: 'sku-graffiticlear-5l', retail_product_id: 'ret-graffiticlear-porous', sku_code: 'ALK-CHM-RA247-5L', pack_size: '5 L Canister', volume_litres: 5, price: 48.00, cost_price: 24.00, in_stock: true, stock_quantity: 20, weight_kg: 5.5, sort_order: 10, active: true },

  // HydroClean
  { id: 'sku-hydroclean-5l', retail_product_id: 'ret-hydroclean-masonry', sku_code: 'ALK-CHM-RA252-5L', pack_size: '5 L Canister', volume_litres: 5, price: 36.00, cost_price: 18.00, in_stock: true, stock_quantity: 25, weight_kg: 5.7, sort_order: 10, active: true },
  { id: 'sku-hydroclean-20l', retail_product_id: 'ret-hydroclean-masonry', sku_code: 'ALK-CHM-RA252-20L', pack_size: '20 L Drum', volume_litres: 20, price: 110.00, cost_price: 55.00, in_stock: true, stock_quantity: 20, weight_kg: 23.2, sort_order: 20, active: true },
];

// ============================================================================
// 5. BACKWARDS-COMPATIBILITY EXPORTS & HELPERS
// ============================================================================

export const CHEMICAL_CATEGORIES = [
  { slug: 'fleet-vehicle', name: 'Transportation & Commercial Fleet', description: 'Traffic film removers and touchless commercial vehicle detergents.' },
  { slug: 'degreasers', name: 'Industrial Degreasers & Solvents', description: 'Heavy-duty engine, chassis, and workshop floor degreasers.' },
  { slug: 'industrial', name: 'Agricultural & Plant Machinery', description: 'Heavy muck, clay, and bio-secure agricultural cleaners.' },
  { slug: 'parts-washers', name: 'Aqueous Parts Washer Solutions', description: 'Non-foaming rust-inhibited formulations for rotary parts washers.' },
  { slug: 'specialty', name: 'Specialty & Coil Descalers', description: 'Schedule 80 coil descalers, anti-scale solutions, and hot waxes.' },
  { slug: 'masonry', name: 'Masonry, Brick & Concrete Cleaners', description: 'Efflorescence, mortar smear, and graffiti removers.' },
];

export interface ChemicalProduct {
  id: string;
  slug: string;
  name: string;
  code: string;
  category: string;
  tagline: string;
  description: string;
  active: boolean;
  featured: boolean;
  uk_status?: string;
  sort_order?: number;
  form?: string;
  appearance?: string;
  ph_level?: string;
  specific_gravity?: string;
  active_ingredients?: string[];
  voc_content?: string;
  biodegradability_claim?: string;
  biodegradable?: boolean;
  hazardous?: boolean;
  food_safe?: boolean;
  food_process_status?: string;
  use_cases?: string[];
  compatible_surfaces?: string[];
  not_suitable_for?: string[];
  contamination_types?: string[];
  application_methods?: string[];
  compatible_equipment_types?: string[];
  dilution_hot?: string;
  dilution_cold?: string;
  surface_notes?: string;
  application_notes?: string;
  water_recovery_compatible?: boolean;
  separator_compatible?: boolean;
  recycling_compatible?: boolean;
  water_recovery_notes?: string;
  storage_notes?: string;
  shelf_life?: string;
  available_sizes?: string[];
  price_5l?: number;
  price_25l?: number;
  price_200l?: number;
  price_1000l?: number;
  manufacturer?: string;
  country_of_origin?: string;
  features?: string[];
  hazard_classification?: string;
  signal_word?: string;
  hazard_pictograms?: string[];
  hazard_statements?: string[];
  precautionary_statements?: string[];
  sds_url?: string;
  sds_revision_date?: string;
  tds_url?: string;
  tds_revision_date?: string;
  label_url?: string;
  primary_image_url?: string;
  image_url?: string;
  media_status?: string;
  meta_title?: string;
  meta_description?: string;
}

export const RETAIL_CHEMICAL_PRODUCTS = RETAIL_PRODUCTS;

export const VERIFIED_CHEMICAL_PRODUCTS: ChemicalProduct[] = RETAIL_PRODUCTS.map((ret, idx) => {
  const master = MASTER_FORMULATIONS.find(m => m.id === ret.master_formulation_id);
  const skus = CHEMICAL_SKUS.filter(s => s.retail_product_id === ret.id);

  let category = 'fleet-vehicle';
  if (ret.retail_family.toLowerCase().includes('degrease') || ret.retail_family.toLowerCase().includes('clean')) category = 'degreasers';
  if (ret.retail_family.toLowerCase().includes('force') || ret.retail_family.toLowerCase().includes('agri')) category = 'industrial';
  if (ret.retail_family.toLowerCase().includes('scale') || ret.retail_family.toLowerCase().includes('coil') || ret.retail_family.toLowerCase().includes('wax')) category = 'specialty';
  if (ret.retail_family.toLowerCase().includes('hydro') || ret.retail_family.toLowerCase().includes('graffiti') || ret.retail_family.toLowerCase().includes('masonry')) category = 'masonry';

  const price5 = skus.find(s => s.volume_litres === 5)?.price;
  const price25 = skus.find(s => s.volume_litres === 20 || s.volume_litres === 25)?.price;
  const price200 = skus.find(s => s.volume_litres === 200)?.price;
  const price1000 = skus.find(s => s.volume_litres === 1000)?.price;

  return {
    id: ret.id,
    slug: ret.slug,
    name: ret.retail_name,
    code: ret.originating_master_code || master?.master_code || `CHM-${idx + 1}`,
    category,
    tagline: ret.short_description,
    description: ret.long_description,
    active: ret.published && ret.merchandising_status === 'live',
    featured: ret.featured,
    uk_status: 'published',
    sort_order: ret.sort_order,
    ph_level: master?.ph_level || '11.5 - 13.0',
    primary_image_url: ret.hero_image,
    image_url: ret.hero_image,
    price_5l: price5,
    price_25l: price25,
    price_200l: price200,
    price_1000l: price1000,
    available_sizes: skus.map(s => s.pack_size),
    sds_url: `/documents/sds/alkota-sds-${ret.slug}.pdf`,
    tds_url: `/documents/tds/alkota-tds-${ret.slug}.pdf`,
    label_url: `/documents/labels/alkota-label-${ret.slug}.pdf`,
    meta_title: ret.seo_title || `${ret.retail_name} | Alkota UK Chemicals`,
    meta_description: ret.seo_description || ret.short_description,
    features: [ret.short_description, ret.dilution_information],
    use_cases: [ret.primary_application],
    compatible_surfaces: ret.surface_compatibility.map(s => s.surface),
  };
});

export function getChemicalBySlug(slug: string): ChemicalProduct | undefined {
  return VERIFIED_CHEMICAL_PRODUCTS.find(p => p.slug === slug || p.slug === slug.toLowerCase());
}

export function getChemicalsByCategory(categorySlug: string): ChemicalProduct[] {
  return VERIFIED_CHEMICAL_PRODUCTS.filter(p => {
    if (categorySlug === 'fleet-vehicle' && (p.category === 'fleet-vehicle' || p.category === 'transportation-fleet')) return true;
    if (categorySlug === 'degreasers' && (p.category === 'degreasers' || p.category === 'degreaser')) return true;
    if (categorySlug === 'industrial' && (p.category === 'industrial' || p.category === 'farm-ag')) return true;
    if (categorySlug === 'parts-washers' && (p.category === 'parts-washers' || p.category === 'parts-washer')) return true;
    if (categorySlug === 'specialty' && (p.category === 'specialty' || p.category === 'scale-stop')) return true;
    if (categorySlug === 'masonry' && (p.category === 'masonry' || p.category === 'masonry-asphalt')) return true;
    return p.category === categorySlug;
  });
}

