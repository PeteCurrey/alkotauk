import { ProductRelationship } from './types';

/**
 * Authoritative Canonical Product Relationships for Alkota UK
 * 
 * STRICT ENGINEERING CRITERIA:
 * 1. COMPATIBILITY relationships MUST cite verifiable evidence (OEM manual, spec ratings, fitting geometry).
 * 2. GENERAL relationships (discovery, alternatives, application recommendations) MUST NOT claim physical compatibility.
 * 3. REVIEW_REQUIRED records are flagged for internal review and MUST NOT be exposed publicly as compatible.
 */
export const CANONICAL_RELATIONSHIPS: ProductRelationship[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // 1. COMPATIBILITY: PUMPS & PLUNGERS → MACHINES
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'rel-pump-ts2021-420x4',
    source_id: 'alkota-420x4',
    source_type: 'machine',
    target_id: 'general-pump-ts2021',
    target_type: 'part',
    relationship_domain: 'COMPATIBILITY',
    relationship_type: 'MACHINE_PART',
    status: 'published',
    confidence: 'VERIFIED',
    evidence: 'Alkota USA factory parts manual (Section 4: Pump Assembly). Model 420X4 uses General Pump TS2021 at 1450 RPM.',
    source_document: 'Alkota X4 Series Technical Operations & Spares Manual',
    source_url: 'https://alkota.com/hot-water-pressure-washers/x4-series',
    verification_date: '2026-03-01T10:00:00Z',
    verified_by: 'Alkota UK Lead Application Engineer',
    notes: 'OEM direct replacement bare-shaft triplex ceramic plunger pump.',
    sort_order: 10,
    active: true
  },
  {
    id: 'rel-pump-ts2021-216x4',
    source_id: 'alkota-216x4',
    source_type: 'machine',
    target_id: 'general-pump-ts2021',
    target_type: 'part',
    relationship_domain: 'COMPATIBILITY',
    relationship_type: 'MACHINE_PART',
    status: 'published',
    confidence: 'VERIFIED',
    evidence: 'Factory build sheet: 216X4 chassis mounts TS2021 with direct belt pulley alignment.',
    source_document: 'Alkota X4 Series Factory Build Schedule',
    verification_date: '2026-03-01T10:00:00Z',
    verified_by: 'Alkota UK Engineering Desk',
    notes: 'Direct fitment.',
    sort_order: 10,
    active: true
  },
  {
    id: 'rel-pump-ts2021-430xm4',
    source_id: 'alkota-430xm4',
    source_type: 'machine',
    target_id: 'general-pump-ts2021',
    target_type: 'part',
    relationship_domain: 'COMPATIBILITY',
    relationship_type: 'MACHINE_PART',
    status: 'published',
    confidence: 'VERIFIED',
    evidence: 'Alkota USA factory parts manual. 430XM4 utilizes TS2021 high-pressure manifold variant.',
    source_document: 'Alkota XM4 Specification Manual',
    verification_date: '2026-03-01T10:00:00Z',
    verified_by: 'Alkota UK Lead Application Engineer',
    sort_order: 10,
    active: true
  },
  {
    id: 'rel-pump-ts2031-8405hnl',
    source_id: 'alkota-8405hnl',
    source_type: 'machine',
    target_id: 'general-pump-ts2031',
    target_type: 'part',
    relationship_domain: 'COMPATIBILITY',
    relationship_type: 'MACHINE_PART',
    status: 'published',
    confidence: 'VERIFIED',
    evidence: 'Alkota HN Series factory parts manual. 8405HNL requires TS2031 30.3 LPM continuous flow pump.',
    source_document: 'Alkota Heavy Commercial HN Manual',
    verification_date: '2026-03-02T11:00:00Z',
    verified_by: 'Alkota UK Engineering Desk',
    sort_order: 10,
    active: true
  },
  {
    id: 'rel-pump-5cp-5355j',
    source_id: 'alkota-5355j',
    source_type: 'machine',
    target_id: 'cat-pump-5cp2120w',
    target_type: 'part',
    relationship_domain: 'COMPATIBILITY',
    relationship_type: 'MACHINE_PART',
    status: 'published',
    confidence: 'VERIFIED',
    evidence: 'Cat Pumps 5CP factory high-temperature certification on Alkota 5355J skid.',
    source_document: 'Alkota GED/J Series Technical Guide',
    verification_date: '2026-03-02T11:30:00Z',
    verified_by: 'Alkota UK Engineering Desk',
    sort_order: 10,
    active: true
  },
  {
    id: 'rel-pump-rkv-4405xd4',
    source_id: 'alkota-4405xd4',
    source_type: 'machine',
    target_id: 'ar-rkv4g40',
    target_type: 'part',
    relationship_domain: 'COMPATIBILITY',
    relationship_type: 'MACHINE_PART',
    status: 'published',
    confidence: 'VERIFIED',
    evidence: 'Annovi Reverberi direct drive 1" hollow shaft flange specification on 4405XD4.',
    source_document: 'Alkota XD4 Series Direct Drive Manual',
    verification_date: '2026-03-02T12:00:00Z',
    verified_by: 'Alkota UK Engineering Desk',
    sort_order: 10,
    active: true
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 2. COMPATIBILITY: HEATING COILS & BURNER COMPONENTS → MACHINES
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'rel-coil-x4-420x4',
    source_id: 'alkota-420x4',
    source_type: 'machine',
    target_id: 'sch80-coil-x4',
    target_type: 'part',
    relationship_domain: 'COMPATIBILITY',
    relationship_type: 'MACHINE_PART',
    status: 'published',
    confidence: 'VERIFIED',
    evidence: 'Schedule 80 ASTM A53 seamless carbon steel hydro-insulated coil. 1/2" ID, 130ft length with horizontal pancake bottom.',
    source_document: 'Alkota Metallurgy & Pressure Vessel Certification Cert-ASTM-A53',
    verification_date: '2026-03-01T10:00:00Z',
    verified_by: 'Alkota Chief Metallurgist',
    notes: 'Backed by Alkota 7-year coil warranty.',
    sort_order: 20,
    active: true
  },
  {
    id: 'rel-coil-x4-216x4',
    source_id: 'alkota-216x4',
    source_type: 'machine',
    target_id: 'sch80-coil-x4',
    target_type: 'part',
    relationship_domain: 'COMPATIBILITY',
    relationship_type: 'MACHINE_PART',
    status: 'published',
    confidence: 'VERIFIED',
    evidence: 'Standard Alkota X4 chamber size fits Sch80-X4 coil directly.',
    source_document: 'Alkota X4 Metallurgy Reference',
    verification_date: '2026-03-01T10:00:00Z',
    verified_by: 'Alkota UK Engineering Desk',
    sort_order: 20,
    active: true
  },
  {
    id: 'rel-burner-beckett-420x4',
    source_id: 'alkota-420x4',
    source_type: 'machine',
    target_id: 'beckett-cleancut-fuel-pump',
    target_type: 'part',
    relationship_domain: 'COMPATIBILITY',
    relationship_type: 'MACHINE_PART',
    status: 'published',
    confidence: 'VERIFIED',
    evidence: 'Beckett CleanCut burner installation on 230V / 1PH X4 electrical control pack.',
    source_document: 'Beckett CleanCut Service Bulletin 21844',
    verification_date: '2026-03-01T10:00:00Z',
    verified_by: 'Alkota UK Engineering Desk',
    sort_order: 30,
    active: true
  },
  {
    id: 'rel-electrodes-420x4',
    source_id: 'alkota-420x4',
    source_type: 'machine',
    target_id: 'beckett-ignition-electrodes',
    target_type: 'part',
    relationship_domain: 'COMPATIBILITY',
    relationship_type: 'MACHINE_PART',
    status: 'published',
    confidence: 'VERIFIED',
    evidence: 'OEM twin porcelain glazed high-voltage electrode assembly for Alkota oil burners.',
    source_document: 'Alkota Burner Specification Sheet B-101',
    verification_date: '2026-03-01T10:00:00Z',
    verified_by: 'Alkota UK Engineering Desk',
    sort_order: 35,
    active: true
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 3. COMPATIBILITY: VALVES, HOSES, GUNS & NOZZLES → MACHINES
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'rel-unloader-vb9-420x4',
    source_id: 'alkota-420x4',
    source_type: 'machine',
    target_id: 'unloader-vb9',
    target_type: 'part',
    relationship_domain: 'COMPATIBILITY',
    relationship_type: 'MACHINE_PART',
    status: 'published',
    confidence: 'VERIFIED',
    evidence: 'PA VB9 flow-actuated unloader valve matches 420X4 hydraulic circuit (20 LPM @ 200 BAR).',
    source_document: 'PA SpA Technical Specification VB9-2024',
    verification_date: '2026-03-01T10:00:00Z',
    verified_by: 'Alkota UK Engineering Desk',
    sort_order: 40,
    active: true
  },
  {
    id: 'rel-hose-15m-420x4',
    source_id: 'alkota-420x4',
    source_type: 'machine',
    target_id: 'hp-hose-15m-38',
    target_type: 'part',
    relationship_domain: 'COMPATIBILITY',
    relationship_type: 'MACHINE_PART',
    status: 'published',
    confidence: 'VERIFIED',
    evidence: 'Standard 3/8" QC high-pressure outlet with 400 BAR burst pressure rating and 150°C thermal limit.',
    source_document: 'Alkota UK Standard Equipment Specification',
    verification_date: '2026-03-01T10:00:00Z',
    verified_by: 'Alkota UK Engineering Desk',
    sort_order: 50,
    active: true
  },
  {
    id: 'rel-gun-st2300-420x4',
    source_id: 'alkota-420x4',
    source_type: 'machine',
    target_id: 'suttner-st2300-gun',
    target_type: 'part',
    relationship_domain: 'COMPATIBILITY',
    relationship_type: 'MACHINE_PART',
    status: 'published',
    confidence: 'VERIFIED',
    evidence: 'Suttner easy-pull trigger gun with 3/8" M inlet and 1/4" F outlet. Rated 310 BAR / 150°C.',
    source_document: 'Suttner Germany OEM Spec Sheet',
    verification_date: '2026-03-01T10:00:00Z',
    verified_by: 'Alkota UK Engineering Desk',
    sort_order: 55,
    active: true
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 4. COMPATIBILITY: ATTACHMENTS → MACHINES
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'rel-att-sc18-420x4',
    source_id: 'alkota-420x4',
    source_type: 'machine',
    target_id: 'alkota-18-inch-surface-cleaner',
    target_type: 'attachment',
    relationship_domain: 'COMPATIBILITY',
    relationship_type: 'MACHINE_ATTACHMENT',
    status: 'published',
    confidence: 'VERIFIED',
    evidence: 'SC-18 operating parameters (60–275 BAR, 10–22 LPM) perfectly bracket 420X4 output (200 BAR, 15 LPM). Quick-connect 1/4" plug fits standard lance.',
    source_document: 'Alkota Commercial Attachments Guide',
    verification_date: '2026-03-02T14:00:00Z',
    verified_by: 'Alkota Technical Sales Director',
    notes: 'Dual rotary spray arms spinning at ~2000 RPM at 15 LPM.',
    sort_order: 10,
    active: true
  },
  {
    id: 'rel-att-sc24-8405hnl',
    source_id: 'alkota-8405hnl',
    source_type: 'machine',
    target_id: 'alkota-24-inch-commercial-surface-cleaner',
    target_type: 'attachment',
    relationship_domain: 'COMPATIBILITY',
    relationship_type: 'MACHINE_ATTACHMENT',
    status: 'published',
    confidence: 'VERIFIED',
    evidence: 'SC-24 requires minimum 15 LPM for efficient rotation. 8405HNL delivers 30.3 LPM, driving full rotor velocity with caster wheel stability.',
    source_document: 'Alkota Surface Cleaning Systems Specification',
    verification_date: '2026-03-02T14:30:00Z',
    verified_by: 'Alkota Technical Sales Director',
    sort_order: 10,
    active: true
  },
  {
    id: 'rel-att-reel-420x4',
    source_id: 'alkota-420x4',
    source_type: 'machine',
    target_id: 'alkota-stainless-hose-reel-30m',
    target_type: 'attachment',
    relationship_domain: 'COMPATIBILITY',
    relationship_type: 'MACHINE_ATTACHMENT',
    status: 'published',
    confidence: 'VERIFIED',
    evidence: 'X4 tubular frame features pre-drilled M8 mounting bosses for HR-30M direct bolt-on fitment.',
    source_document: 'Alkota Accessory Mounting Drawings B-442',
    verification_date: '2026-03-02T15:00:00Z',
    verified_by: 'Alkota Lead Fabrication Engineer',
    sort_order: 20,
    active: true
  },
  {
    id: 'rel-att-foam-420x4',
    source_id: 'alkota-420x4',
    source_type: 'machine',
    target_id: 'alkota-commercial-foam-lance-1l',
    target_type: 'attachment',
    relationship_domain: 'COMPATIBILITY',
    relationship_type: 'MACHINE_ATTACHMENT',
    status: 'published',
    confidence: 'VERIFIED',
    evidence: '1/4" QC quick connect with 1.25mm stainless nozzle insert calibrated for 15 LPM @ 200 BAR.',
    source_document: 'Alkota Foam Lance Sizing Matrix',
    verification_date: '2026-03-02T15:30:00Z',
    verified_by: 'Alkota UK Engineering Desk',
    sort_order: 30,
    active: true
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 5. COMPATIBILITY: MACHINE CARE CHEMICALS → MACHINES
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'rel-chem-scaleaway-420x4',
    source_id: 'alkota-420x4',
    source_type: 'machine',
    target_id: 'coil-scaleaway-sd929',
    target_type: 'chemical',
    relationship_domain: 'COMPATIBILITY',
    relationship_type: 'MACHINE_CHEMICAL',
    status: 'published',
    confidence: 'MANUFACTURER_SUPPORTED',
    evidence: 'Formulation SD-929 is explicitly manufactured by Hydrus/Alkota to descale Schedule 80 carbon steel coils without corrosion or pitting.',
    source_document: 'Hydrus Chemical Master Data Sheet SDS-UK-SD929-V2',
    source_url: 'https://alkota.com/chemicals/machine-care',
    verification_date: '2026-03-03T09:00:00Z',
    verified_by: 'Alkota Chemical Compliance Specialist',
    notes: 'Recirculated through descaling pump circuit at 1:4 dilution.',
    sort_order: 10,
    active: true
  },
  {
    id: 'rel-chem-defoam-partswasher',
    source_id: 'alkota-301-series-parts-washer',
    source_type: 'machine',
    target_id: 'defoam-ts623',
    target_type: 'chemical',
    relationship_domain: 'COMPATIBILITY',
    relationship_type: 'MACHINE_CHEMICAL',
    status: 'published',
    confidence: 'MANUFACTURER_SUPPORTED',
    evidence: 'Silicone-free anti-foam emulsion formulated for rotary spray wash cabinets and sump tanks.',
    source_document: 'Hydrus Parts Washer Care Bulletin TS-623',
    verification_date: '2026-03-03T09:30:00Z',
    verified_by: 'Alkota Chemical Compliance Specialist',
    sort_order: 10,
    active: true
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 6. GENERAL RELATIONSHIPS: EQUIPMENT DISCOVERY, ALTERNATIVES & LIFECYCLE
  // (Notice: NOT compatibility claims! These are commercial/discovery links)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'rel-gen-series-216x4-420x4',
    source_id: 'alkota-420x4',
    source_type: 'machine',
    target_id: 'alkota-216x4',
    target_type: 'machine',
    relationship_domain: 'GENERAL',
    relationship_type: 'SAME_SERIES',
    status: 'published',
    confidence: 'VERIFIED',
    evidence: 'Both models belong to the Alkota X4 belt-driven hot water fleet.',
    notes: '216X4 offers 1600 PSI / 2.1 GPM on standard 230V 13A supply; 420X4 offers 2000 PSI / 4.0 GPM on 16A supply.',
    sort_order: 10,
    active: true
  },
  {
    id: 'rel-gen-upgrade-420x4-430xm4',
    source_id: 'alkota-420x4',
    source_type: 'machine',
    target_id: 'alkota-430xm4',
    target_type: 'machine',
    relationship_domain: 'GENERAL',
    relationship_type: 'UPGRADE_TO',
    status: 'published',
    confidence: 'VERIFIED',
    notes: 'Higher pressure 3000 PSI / 200 BAR upgrade for heavy haulage and civil plant operations.',
    sort_order: 20,
    active: true
  },
  {
    id: 'rel-gen-alt-cold-420s',
    source_id: 'alkota-420x4',
    source_type: 'machine',
    target_id: 'alkota-420s',
    target_type: 'machine',
    relationship_domain: 'GENERAL',
    relationship_type: 'ALTERNATIVE_PRODUCT',
    status: 'published',
    confidence: 'VERIFIED',
    notes: 'Cold water industrial pressure washer alternative where thermal heat is not required.',
    sort_order: 30,
    active: true
  },
  {
    id: 'rel-gen-app-chem-mach1',
    source_id: 'alkota-420x4',
    source_type: 'machine',
    target_id: 'mach-1-degreaser-tr413',
    target_type: 'chemical',
    relationship_domain: 'GENERAL',
    relationship_type: 'RECOMMENDED_ALONGSIDE',
    status: 'published',
    confidence: 'VERIFIED',
    evidence: 'Fleet haulage wash application recommendation. Dosed via downstream injector.',
    notes: 'APPLICATION-BASED RELATIONSHIP: Suitable for use alongside 420X4 in commercial fleet washing. This is an application recommendation, not a mechanical fitment claim.',
    sort_order: 10,
    active: true
  },
  {
    id: 'rel-gen-app-chem-raptor',
    source_id: 'alkota-420x4',
    source_type: 'machine',
    target_id: 'raptor-agriculture-tr428',
    target_type: 'chemical',
    relationship_domain: 'GENERAL',
    relationship_type: 'SAME_APPLICATION',
    status: 'published',
    confidence: 'VERIFIED',
    notes: 'APPLICATION-BASED RELATIONSHIP: High-clay soil remover recommended for agricultural equipment cleaning.',
    sort_order: 20,
    active: true
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 7. REVIEW REQUIRED / UNVERIFIED COMPATIBILITY
  // (CRITICAL: Must NEVER be shown as compatible on the public website)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'rel-compat-review-turbo-181',
    source_id: 'alkota-181',
    source_type: 'machine',
    target_id: 'turbo-nozzle-040',
    target_type: 'part',
    relationship_domain: 'COMPATIBILITY',
    relationship_type: 'MACHINE_PART',
    status: 'review',
    confidence: 'REVIEW_REQUIRED',
    evidence: 'Steam cleaner 181 operates at 250-400 PSI. Standard rotary nozzles require minimum 1000 PSI to rotate internal ceramic ball.',
    notes: 'TECHNICAL REVIEW: Likely NOT compatible due to low operating pressure of steam cleaner. Must be bench-tested before approval.',
    sort_order: 99,
    active: false
  },
  {
    id: 'rel-compat-review-acid-aluminium',
    source_id: 'alkota-420x4',
    source_type: 'machine',
    target_id: 'alu-brightener-ab50',
    target_type: 'chemical',
    relationship_domain: 'COMPATIBILITY',
    relationship_type: 'MACHINE_CHEMICAL',
    status: 'review',
    confidence: 'NOT_COMPATIBLE',
    evidence: 'Hydrofluoric/phosphoric acid brightener must NEVER be run through hot pressure washer coil or brass pump manifold due to severe chemical attack.',
    notes: 'EXPLICIT SAFETY WARNING: Not compatible for internal machine injection. Must only be applied via external low-pressure acid pump sprayer.',
    sort_order: 99,
    active: false
  }
];
