export interface ChemicalLobbyDraft {
  slug: string;
  title: string;
  category: 'chemistry-guides' | 'equipment-synergy' | 'safety-compliance' | 'fleet-maintenance';
  estimatedReadTime: string;
  summary: string;
  outline: string[];
  keyTakeaways: string[];
  status: 'draft_ready_for_review';
}

export const CHEMICAL_LOBBY_DRAFTS: ChemicalLobbyDraft[] = [
  {
    slug: 'choosing-an-industrial-pressure-washer-detergent',
    title: 'Choosing an Industrial Pressure Washer Detergent: Heat, Pressure, and Chemistry Working in Harmony',
    category: 'chemistry-guides',
    estimatedReadTime: '7 min read',
    summary: 'A technical guide for facility managers and plant operators on matching surfactant chemistry to soil type, water temperature, and equipment metallurgy to achieve faster washdowns without surface degradation.',
    outline: [
      'The 4-Quadrant Sinner\'s Circle in Industrial Cleaning (Mechanical, Thermal, Chemical, Time)',
      'Identifying Contaminant Types: Hydrocarbon Oils, Polar Greases, Particulate Road Film, and Carbonaceous Crusts',
      'Determining Substrate Sensitivity: Mild Steel vs Cast Iron vs Mirror-Polished Aluminium',
      'The Role of Water Hardness and Why Heating Coils Require Built-in Chelating Builders',
      'Calculating Real Operational Cost: Chemical Concentration Ratios vs Gallons per Minute'
    ],
    keyTakeaways: [
      'Chemicals change the cleaning process by reducing surface tension and breaking chemical bonds rather than merely relying on blasting pressure.',
      'Using the correct hot-water formulation allows up to a 60% reduction in wash times and prevents premature burner coil burnout.'
    ],
    status: 'draft_ready_for_review'
  },
  {
    slug: 'hot-water-vs-detergent-thermodynamic-action',
    title: 'Hot Water vs Detergent: The Physics and Chemistry of Industrial Soil Emulsification',
    category: 'equipment-synergy',
    estimatedReadTime: '6 min read',
    summary: 'Why heat alone cannot dissolve electrostatic traffic film, and why chemical detergents require thermal activation to liquefy heavy hydrocarbons.',
    outline: [
      'Thermal Phase Change: Melting point dynamics of paraffinic waxes, greases, and fifth-wheel compounds',
      'Surfactant Micelle Formation at Elevated Temperatures (50°C to 85°C)',
      'Why Cold Water Pressure Washers Push Grease While Hot Water Emulsifies It',
      'Preventing Re-deposition: How Hydrotropic Surfactants Keep Soils Suspended During Rinsing',
      'Equipment Protection: Scaling Risks in Coils Above 65°C and the Necessity of Scale Stop Chemistry'
    ],
    keyTakeaways: [
      'Hot water liquefies grease; surfactants emulsify and encapsulate it so it can be flushed away without redepositing on clean surfaces.',
      'Alkota Schedule 80 continuous-wound heating coils are designed to operate symbiotically with high-alkaline and neutral chemistry.'
    ],
    status: 'draft_ready_for_review'
  },
  {
    slug: 'cleaning-aluminium-safely-preventing-etching',
    title: 'Cleaning Aluminium Safely: Preventing Caustic Etching, Pitting, and White Rust',
    category: 'chemistry-guides',
    estimatedReadTime: '8 min read',
    summary: 'A metallurgical breakdown of aluminium oxide passivation layers and how to select safe vehicle washes and degreasers for high-value fleet wheels and tankers.',
    outline: [
      'The Vulnerability of Aluminium: Amphoteric Metallurgy and Alkaline Attack at pH > 11.5',
      'Distinguishing Cast Aluminium Machine Blocks from Mirror-Polished Wheel Rims and Anodised Extrusions',
      'Formulation Science: How Silicate and Organic Inhibitors Form Temporary Sacrificial Barriers',
      'Neutral-pH Citrus Terpenes vs Mild Alkaline Formulations (Power Blast TR-407 vs Citrus Blast DE-721)',
      'Application Protocol: Dwell Times, Temperature Caps, and Potable Water Rinsing Best Practices'
    ],
    keyTakeaways: [
      'Never apply high-caustic sodium hydroxide degreasers to polished unlacquered aluminium.',
      'Alkota Power Blast TR-407 and Citrus Blast DE-721 are lab-tested to deliver streak-free optical gloss without dulling aluminium.'
    ],
    status: 'draft_ready_for_review'
  },
  {
    slug: 'fleet-road-film-chemistry-electrostatic-bond',
    title: 'Fleet Road-Film Chemistry: Breaking the Electrostatic Traffic Film Bond Without Brushes',
    category: 'fleet-maintenance',
    estimatedReadTime: '6 min read',
    summary: 'Understanding the electrostatic adhesive layer created by diesel soot, tire rubber, and silica road dust on commercial HGVs, and how touchless chemistry removes it.',
    outline: [
      'The Anatomy of Traffic Film: Carbon Soot, Mineral Dust, and Oxidised Binder Resins',
      'Why Pressure Alone Fails to Cut Traffic Film: The Boundary Layer Effect in Fluid Dynamics',
      'Anionic and Non-Ionic Surfactant Synergy in Touchless Formulations (TR-470)',
      'Application Technology: Downstream Hot Injection vs Pre-Foam Application Lances',
      'Two-Step Acid/Alkaline Wash Protocols for Extreme Winter Road Salt and De-icing Grime'
    ],
    keyTakeaways: [
      'Road film is electrostatically bonded to vehicle clear coats; specialized polar surfactants neutralize this charge.',
      'Touchless washing preserves commercial livery wraps and eliminates brush swirl scratches.'
    ],
    status: 'draft_ready_for_review'
  },
  {
    slug: 'aqueous-parts-washing-chemistry-explained',
    title: 'Aqueous Parts-Washer Chemistry: Low-Foam Surfactants and Flash-Rust Passivation',
    category: 'equipment-synergy',
    estimatedReadTime: '9 min read',
    summary: 'Transitioning from hazardous solvent wash tanks to heated aqueous rotary parts washers: chemical mechanism, bath life extension, and corrosion protection.',
    outline: [
      'Regulatory Drivers: Eliminating Solvent VOCs, Flammability Risks, and Hazardous Waste Disposal Costs',
      'The Mechanical Environment: Why Standard Pressure Washer Detergents Fail in 10-BAR Enclosed Turntables',
      'Low-Foam Surfactant Technology Operating at 60°C–80°C',
      'Vapour Phase Corrosion Inhibitors: Ensuring 30–60 Day Flash-Rust Protection on Bare Cast Iron',
      'Extending Tank Bath Life: Oil Skimming, Sludge Settling, and pH Maintenance'
    ],
    keyTakeaways: [
      'Alkota APW Pro Clean provides heavy grease cutting with zero foaming inside automatic turntable cabinets.',
      'Built-in corrosion inhibitors protect freshly degreased iron engine blocks from flash-rusting during air drying.'
    ],
    status: 'draft_ready_for_review'
  },
  {
    slug: 'reading-an-sds-for-coshh-assessments',
    title: 'Reading a Safety Data Sheet (SDS) for Site-Specific COSHH Assessments in the UK',
    category: 'safety-compliance',
    estimatedReadTime: '8 min read',
    summary: 'A practical compliance guide for UK wash bay managers on interpreting GB CLP hazard pictograms, H-statements, P-statements, and completing formal COSHH risk assessments.',
    outline: [
      'The Legal Distinction: Why an SDS is a Supplier Document, Not a Site COSHH Assessment',
      'Section 2: Decoding Hazard Classifications (Skin Corr. 1B, Eye Irrit. 2) and Signal Words (DANGER / WARNING)',
      'Section 8: Exposure Controls and Personal Protective Equipment (PPE) Specification for Wash Bays',
      'Section 9 & 10: Physical Properties (pH, Flash Point, Specific Gravity) and Incompatible Materials',
      'Section 12 & 13: Ecotoxicology, Effluent Disposal Rules, and Water Framework Directive Alignment'
    ],
    keyTakeaways: [
      'The SDS provides data to support your COSHH assessment; the assessment evaluates how the chemical is actually handled in your wash bay.',
      'All Alkota UK chemical documents include verified revision dates and GB CLP compliant classifications.'
    ],
    status: 'draft_ready_for_review'
  }
];
