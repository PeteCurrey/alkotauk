import {
  PPMSchedule,
  PumpManufacturerDef,
  TroubleshootingSymptom,
  ServicePlanType,
  ServiceReport,
  MachineRegistration,
} from '@/lib/types/service';

// ─── SERVICE PLANS ────────────────────────────────────────────────────────────

export interface ServicePlanDef {
  id: ServicePlanType;
  title: string;
  subtitle: string;
  description: string;
  idealFor: string;
  features: string[];
  responseTarget: string;
  partsDiscount: string;
  reporting: string;
}

export const SERVICE_PLANS: ServicePlanDef[] = [
  {
    id: 'planned_maintenance',
    title: 'Planned Preventive Maintenance',
    subtitle: 'Scheduled servicing based on operating hours and manufacturer intervals.',
    description: 'A structured programme of scheduled engineer visits to inspect, service, tune, and safety-check your Alkota pressure washing equipment before defects cause unplanned downtime.',
    idealFor: 'Standard commercial users, transport fleets, and agricultural operations with predictable machine run hours.',
    features: [
      'Comprehensive multi-point mechanical and safety inspection',
      'Oil changes, filter renewals, and pump valve checks',
      'Burner efficiency tuning and flue-gas check (Hot Water / Steam)',
      'Pressure, flow, and temperature calibration',
      'Digital condition report and written engineer certificate',
      'Priority scheduling for upcoming service windows'
    ],
    responseTarget: 'Scheduled in advance (Calendar or Hour-meter triggers)',
    partsDiscount: '5% discount on genuine Alkota replacement components',
    reporting: 'Full digital service certificate and asset condition audit per visit'
  },
  {
    id: 'planned_reactive',
    title: 'Planned + Reactive Support',
    subtitle: 'Comprehensive planned maintenance backed by priority breakdown response.',
    description: 'Combines proactive scheduled maintenance with discounted labour and priority scheduling when unexpected site breakdowns occur, minimising critical operational stoppages.',
    idealFor: 'High-use commercial wash bays, food manufacturing plants, plant hire depots, and heavy logistics facilities.',
    features: [
      'All Planned Maintenance visits included (2–4 scheduled visits/year)',
      'Priority queueing for emergency breakdown engineer dispatch',
      'Discounted hourly rate for reactive breakdown labour',
      'Direct technical helpline with senior Alkota engineers',
      'Digital asset health tracking in My Alkota portal',
      'Critical wear component tracking and pre-order alerts'
    ],
    responseTarget: 'Within 24–48 working hours for breakdown triage',
    partsDiscount: '10% discount on genuine Alkota parts and service kits',
    reporting: 'Live digital asset ledger with lifetime repair and maintenance history'
  },
  {
    id: 'managed_equipment',
    title: 'Managed Equipment Support',
    subtitle: 'Complete fleet lifecycle management for multiple machines across single or multiple sites.',
    description: 'A turnkey maintenance contract covering all scheduled labour, routine consumable kits, priority response, asset condition trending, and dedicated account engineering for multi-machine estates.',
    idealFor: 'Multi-site logistics operators, waste management facilities, rail depots, and national infrastructure contractors.',
    features: [
      'All scheduled servicing labour and standard service kits included',
      'Dedicated lead service engineer assigned to your regional sites',
      'Quarterly asset condition audit and management review',
      'Guaranteed breakdown response windows based on agreed site tiers',
      'Centralised billing and unified fleet reporting across all locations',
      'Annual critical spares inventory review for on-site stores'
    ],
    responseTarget: 'Guaranteed agreed SLA window per site criticality',
    partsDiscount: '15% discount on major assemblies, pumps, and attachments',
    reporting: 'Executive quarterly fleet reliability and cost-per-hour reporting'
  },
  {
    id: 'critical_operations',
    title: 'Critical Operations Support',
    subtitle: 'Bespoke high-availability coverage for 24/7 industrial cleaning systems.',
    description: 'Engineered for operations where pressure washing or wash plant failure stops production. Includes guaranteed emergency response, dedicated critical on-site spares packs, and loan unit provision.',
    idealFor: 'Food processing hygiene shifts, continuous manufacturing plants, rail wash plants, and airport ground support.',
    features: [
      'Customised 24/7 or out-of-hours engineer cover available',
      'On-site critical spares consignment stock managed by Alkota',
      'Guaranteed emergency loan machine provision if workshop overhaul is required',
      'Monthly physical site audits and sensor / telemetry checks',
      'Direct WhatsApp / phone channel to lead technical director',
      'Full compliance support for Environmental Health and EA audits'
    ],
    responseTarget: 'Same-day / fastest emergency dispatch protocol',
    partsDiscount: 'Maximum OEM parts support and priority consignment stock',
    reporting: 'Continuous uptime logging and preventive replacement forecasting'
  }
];

// ─── PPM SCHEDULES ────────────────────────────────────────────────────────────

export const PPM_SCHEDULES: Record<string, PPMSchedule> = {
  'hot-water': {
    machine_model: 'Alkota Hot Water Pressure Washers (e.g. 430XH, 4358, 216X4)',
    frequency_type: 'both',
    recommended_kit_ref: 'KIT-SRV-ANNUAL-430',
    notes: 'Based on 500 operating hours or 6 months (whichever occurs first) in standard industrial duty.',
    checklist_items: [
      { component: 'Triplex High-Pressure Pump', task: 'Drain and renew ISO 68 non-detergent pump oil; inspect ceramic plungers for scoring; check manifold torque.', standard: 'Oil clear, plungers intact, manifold bolts torqued to OEM spec.', frequency: '6_month' },
      { component: 'Pump V-Packings & Seals', task: 'Inspect low-pressure and high-pressure packings for bypass weeping or heat deformation; replace if hours exceed threshold.', standard: 'Zero external weep from packings; stable system pressure.', frequency: '12_month' },
      { component: 'Unloader Valve', task: 'Check bypass cycling, seat wear, internal spring tension, and microswitch cutoff.', standard: 'Smooth pressure release on trigger release; zero spike >15% over working pressure.', frequency: '6_month' },
      { component: 'Heating Coil (ASTM A53)', task: 'Hydrostatic pressure test; inspect outer casing; check for soot buildup and limescale restriction.', standard: 'Zero leaks under full working pressure; coil clear of heavy scale.', frequency: '12_month' },
      { component: 'Down-Draft Burner & Fuel System', task: 'Clean electrode assembly; check spark gap (3.2mm); replace fuel filter cartridge; test solenoid shutoff.', standard: 'Instant, clean ignition; zero white/black unburnt smoke.', frequency: '6_month' },
      { component: 'Safety Relief Valve', task: 'Test burst disc / pop-off valve relief pressure and verify unloader backup safety.', standard: 'Relief operates cleanly within safety tolerance.', frequency: '12_month' },
      { component: 'Drive Belts & Pulleys', task: 'Check belt tension, pulley alignment, and belt tooth wear (belt-drive units).', standard: 'Correct deflection (approx. 10mm under finger pressure); zero fraying.', frequency: '3_month' },
      { component: 'Delivery Hose & Trigger Gun', task: 'Check outer wire braid for fraying, swivel rotation, gun seal integrity, and nozzle orifice wear.', standard: 'Zero hose blisters/wear; trigger snaps closed instantly.', frequency: '3_month' }
    ]
  },
  'cold-water': {
    machine_model: 'Alkota Cold Water Industrial Washers (e.g. 5305A, 31105)',
    frequency_type: 'both',
    recommended_kit_ref: 'KIT-PUMP-SEAL-V',
    notes: 'Recommended every 500 operating hours or 12 months in standard commercial wash duty.',
    checklist_items: [
      { component: 'High-Pressure Pump', task: 'Replace crankcase oil; inspect sight glass; check plunger seals and brass manifold for cavitation erosion.', standard: 'Clean oil; cavitation-free valve pockets.', frequency: '6_month' },
      { component: 'Check Valves (Inlet/Outlet)', task: 'Remove and inspect 6 check valves; check O-rings and valve spring tension.', standard: 'Clean seating faces; crisp spring return.', frequency: '12_month' },
      { component: 'Electric Motor / Engine', task: 'Inspect electrical junction box, thermal overload relay, capacitor (1-ph), or engine spark/oil (petrol/diesel).', standard: 'Motor draws rated FLA; zero abnormal bearing rumble.', frequency: '6_month' },
      { component: 'Water Inlet Filter', task: 'Clean mesh screen, inspect housing for hairline frost cracks, and verify minimum supply flow.', standard: 'Clean 50-mesh screen; minimum 1.5x machine rated flow.', frequency: '3_month' }
    ]
  },
  'trailers': {
    machine_model: 'Alkota Mobile Wash Trailer Units',
    frequency_type: 'both',
    recommended_kit_ref: 'KIT-TRAILER-ANNUAL',
    notes: 'Covers the complete industrial cleaning system mounted on the trailer chassis.',
    checklist_items: [
      { component: 'Cleaning Skid & Burner', task: 'Full hot water machine service per Hot Water schedule above.', standard: 'Operating at full rated BAR and temperature.', frequency: '6_month' },
      { component: 'Buffer Water Tank & Float Valve', task: 'Inspect 1000L/500L baffled tank, drain sediment, test low-water engine cutoff switch.', standard: 'Tank clean, float seals cleanly, cutoff shuts down engine on empty.', frequency: '6_month' },
      { component: 'Hose Reels & Swivels', task: 'Grease reel bearings; inspect high-pressure stainless swivel joints for leakage under pressure.', standard: 'Smooth rotation, zero drip under 275 BAR.', frequency: '3_month' },
      { component: 'Generator / Auxiliary Engine', task: 'Service engine: oil, spark plug/fuel filter, air filter, battery terminal check.', standard: 'Reliable electric start; clean charging voltage.', frequency: '6_month' }
    ]
  }
};

// ─── PUMP REPAIR & OVERHAUL CAPABILITIES ──────────────────────────────────────

export const PUMP_MANUFACTURERS: PumpManufacturerDef[] = [
  {
    name: 'General Pump',
    models: ['EZ Series', 'T Series (T9051, T9211)', 'TS Series (TS2021, TS1511)', 'CW Series'],
    capabilities: [
      'Full crankcase strip-down & bearing replacement',
      'Ceramic plunger renewal & micro-alignment',
      'Manifold resurfacing & valve pocket re-machining',
      'Hydrostatic dynamic pressure testing to 350 BAR'
    ],
    leadTimeDays: '2–4 working days in workshop'
  },
  {
    name: 'CAT Pumps',
    models: ['3CP Series', '5CP Series', '35 Series', '2SF / 4SF Direct Drive'],
    capabilities: [
      'High-pressure seal & cup replacement',
      'Sleeved cylinder inspection and valve kit rebuild',
      'Crankcase re-sealing and connecting rod clearance check',
      'Continuous duty run-in test on calibrated test rig'
    ],
    leadTimeDays: '3–5 working days in workshop'
  },
  {
    name: 'Comet Pumps',
    models: ['FW2 Series', 'RW Series', 'TW Series', 'Premium Industrial Plunger'],
    capabilities: [
      'Valve kit overhaul and spring replacement',
      'V-packing and brass spacer replacement',
      'Crankshaft journal polish and oil seal renewal',
      'Pressure testing and flow verification'
    ],
    leadTimeDays: '2–4 working days in workshop'
  },
  {
    name: 'Interpump / Hawk',
    models: ['Series 44, 47, 50, 66', 'Hawk NMT, XLT, MXT Series'],
    capabilities: [
      'High-temperature seal conversions for hot feed water',
      'Solid ceramic plunger replacement',
      'Manifold check and valve overhaul',
      'Workshop hydro-testing and performance certification'
    ],
    leadTimeDays: '2–4 working days in workshop'
  }
];

export const PUMP_REPAIR_PROCESS_STEPS = [
  {
    step: '01',
    title: 'Receive & Log',
    description: 'The pump is booked in, assigned a unique workshop job reference, photographed, and logged against its machine and customer record.'
  },
  {
    step: '02',
    title: 'Diagnostic Inspection',
    description: 'Initial external inspection for manifold hairline cracks, oil emulsification (water in crankcase), and shaft play before teardown.'
  },
  {
    step: '03',
    title: 'Complete Teardown',
    description: 'Precision disassembly of brass manifold, valves, ceramic plungers, oil seals, packings, connecting rods, and crankshaft.'
  },
  {
    step: '04',
    title: 'Condition Assessment & Quote',
    description: 'Micrometer measurement of wear surfaces. A formal fixed-price overhaul quote is issued before any replacement parts are fitted.'
  },
  {
    step: '05',
    title: 'Precision Rebuild',
    description: 'Ultrasonic cleaning of manifold; installation of genuine OEM seals, high-pressure packings, ceramic plungers, and fresh ISO 68 oil.'
  },
  {
    step: '06',
    title: 'Calibrated Hydro-Test',
    description: 'The rebuilt pump is mounted to our workshop motor test bench and run for 30 minutes at full working pressure and rated flow.'
  },
  {
    step: '07',
    title: 'Certification & Return',
    description: 'A signed Alkota Workshop Test Certificate is issued with measured pressure, flow, and warranty coverage before dispatch or refitting.'
  }
];

// ─── SAFE TROUBLESHOOTING GUIDE ───────────────────────────────────────────────

export const TROUBLESHOOTING_GUIDE: TroubleshootingSymptom[] = [
  {
    id: 'low-pressure',
    title: 'Loss of Working Pressure / Low Pressure',
    category: 'pressure',
    summary: 'Machine runs but operating pressure on the gauge or at the wand is noticeably lower than normal.',
    safeChecks: [
      'Check the water inlet supply — verify the tap is fully open and supply hose is not kinked.',
      'Inspect the water inlet screen/filter for debris, leaves, or limescale blockage.',
      'Check the nozzle tip at the wand for wear or partial blockage (a worn nozzle orifice drops pressure).',
      'Ensure the chemical dosing valve is completely closed (downstream suction drops pressure when open).',
      'Verify the high-pressure hose is not damaged or leaking excessively along its length.'
    ],
    unsafeWarning: 'Do NOT attempt to adjust the unloader valve beyond factory lock-nuts, or dismantle high-pressure manifold components while pressurised.',
    recommendedServiceType: 'planned_maintenance'
  },
  {
    id: 'no-pressure-pulsing',
    title: 'Severe Pressure Pulsing / Wand Vibration',
    category: 'pressure',
    summary: 'The delivery hose jerks violently and pressure gauge oscillates wildly during operation.',
    safeChecks: [
      'Check for air drawing in through the water supply hose or a loose inlet fitting.',
      'Verify water supply flow rate (L/min) is sufficient for machine rating — pump may be cavitating.',
      'Inspect inlet water filter for air leaks around the clear bowl or seal.'
    ],
    unsafeWarning: 'A pulsing pump typically indicates stuck or fouled check valves, a cracked plunger, or severe cavitation. Continuing to run will destroy the brass manifold and ceramic plungers. Shut machine down.',
    recommendedServiceType: 'pump_repair'
  },
  {
    id: 'no-heat-burner-cold',
    title: 'Machine Runs Cold / Burner Will Not Fire',
    category: 'burner',
    summary: 'Water flows normally under pressure, but the heating coil does not ignite or produce hot water.',
    safeChecks: [
      'Verify fuel level in diesel tank and check fuel shutoff valve is open.',
      'Confirm temperature thermostat dial is set above ambient water temperature.',
      'Ensure water flow is adequate to trigger the pressure switch / flow switch (low flow prevents firing).',
      'Check burner power switch and reset button on burner controller (press once only).'
    ],
    unsafeWarning: 'Do NOT repeatedly press the burner reset button if it locks out. This floods the combustion chamber with raw fuel, creating a serious flash hazard. Do NOT adjust fuel pressure or electrode positions without flue gas instruments.',
    recommendedServiceType: 'breakdown'
  },
  {
    id: 'water-in-pump-oil',
    title: 'Milky / Emulsified Pump Oil',
    category: 'pump',
    summary: 'The oil in the pump crankcase sight glass appears creamy white or milky rather than translucent amber.',
    safeChecks: [
      'Check the oil level on the sight glass or dipstick.',
      'Note if water is visibly dripping from the weep holes between the brass head and aluminium crankcase.'
    ],
    unsafeWarning: 'Milky oil means water has bypassed the low-pressure water seals and breached the oil seals. Water will rapidly corrode connecting rods and bearings. STOP USING IMMEDIATELY and book a seal overhaul.',
    recommendedServiceType: 'pump_repair'
  },
  {
    id: 'machine-will-not-start',
    title: 'Machine Will Not Start / Trips Electric Breaker',
    category: 'electrical',
    summary: 'The machine is completely dead on the switch, or immediately trips the site distribution breaker / RCD.',
    safeChecks: [
      'Check the 3-phase or 1-phase wall isolator is switched ON.',
      'Check the thermal overload reset button on the machine control box (allow 10 mins to cool).',
      'Ensure the power supply cable is not pinched and the plug is seated securely in the socket.'
    ],
    unsafeWarning: 'Do NOT open the electrical enclosure while energized. Do NOT bypass thermal overloads or tape circuit breakers closed. High voltage 400V 3-phase equipment must only be diagnosed by qualified engineers.',
    recommendedServiceType: 'breakdown'
  }
];

// ─── SAMPLE MY ALKOTA ASSETS (FOR DEMO & REFERENCE) ──────────────────────────

export const SAMPLE_REGISTERED_MACHINE: {
  registration: MachineRegistration;
  reports: ServiceReport[];
} = {
  registration: {
    id: 'reg-demo-430xh',
    machine_slug: 'alkota-430xh',
    model_code: '430XH',
    serial_number: 'ALK-2024-88421',
    purchase_date: '2024-03-15',
    dealer_name: 'Alkota UK Direct',
    company_name: 'Midlands Freight Logistics Ltd',
    site_name: 'Derby Central Hub',
    site_address: 'Unit 4, Eagle Industrial Park, Derby DE21 6UZ',
    contact_name: 'Marcus Bradley (Fleet Workshop Manager)',
    contact_email: 'mbradley@midlandsfreight.co.uk',
    contact_phone: '01332 984 210',
    operating_environment: 'Heavy logistics fleet wash bay (20+ HGVs daily)',
    weekly_operating_hours: 35,
    status: 'verified',
    verified_at: '2024-03-18T10:00:00Z',
    notes: 'Primary fleet washing machine. Fitted with 24-inch surface cleaner & 50ft hose reel.',
    created_at: '2024-03-16T09:30:00Z'
  },
  reports: [
    {
      id: 'rep-001',
      report_number: 'SRV-2024-0412',
      machine_model: 'Alkota 430XH Hot Water',
      serial_number: 'ALK-2024-88421',
      visit_date: '2024-09-20',
      engineer_name: 'Gareth Evans (Senior Field Engineer)',
      visit_type: '6-Month Planned Preventive Maintenance',
      hours_reading: 480,
      pressure_reading_bar: 210,
      temp_reading_c: 92,
      flow_reading_lpm: 15.2,
      work_carried_out: 'Carried out 500-hour service per Alkota protocol. Drained and replaced pump oil with fresh ISO 68 non-detergent oil. Inspected V-packings — zero weeping observed. Cleaned burner electrodes, set gap to 3.2mm, and renewed fuel filter cartridge. Tested unloader bypass cycling and safety relief valve. Full hydro and temperature run-in test completed successfully.',
      asset_condition: 'good',
      condition_notes: 'Machine in excellent mechanical condition. Coil clean and free of excessive soot. Drive belt tension verified.',
      parts_used: [
        { part_number: 'OIL-ISO68-1L', name: 'ISO 68 Non-Detergent Pump Oil (1L)', quantity: 1, unit_price: 18.50 },
        { part_number: 'FLT-FUEL-SP', name: 'Spin-On Fuel Filter Cartridge', quantity: 1, unit_price: 24.00 },
        { part_number: 'NZ-040-15', name: '15° High-Pressure Nozzle (Size 04)', quantity: 1, unit_price: 12.00 }
      ],
      recommendations: 'Continue current daily grease routine on trolley wheels. Next service due at approx. 1,000 hours or March 2025.',
      customer_signature_name: 'Marcus Bradley',
      pdf_url: '/reports/SRV-2024-0412.pdf',
      created_at: '2024-09-20T14:30:00Z'
    },
    {
      id: 'rep-002',
      report_number: 'SRV-2024-0315',
      machine_model: 'Alkota 430XH Hot Water',
      serial_number: 'ALK-2024-88421',
      visit_date: '2024-03-15',
      engineer_name: 'David Wright (Commissioning Engineer)',
      visit_type: 'Initial Site Commissioning & Handover',
      hours_reading: 2,
      pressure_reading_bar: 210,
      temp_reading_c: 94,
      flow_reading_lpm: 15.4,
      work_carried_out: 'Complete on-site commissioning. Verified 3-phase electrical supply, earthing, and water supply flow (measured 22 L/min at 3.5 bar mains pressure). Commissioned diesel fuel system, set burner air damper for clean combustion, verified coil thermostat cut-out at 95°C. Conducted operator briefing with fleet team on daily pre-checks and shut-down sequence.',
      asset_condition: 'good',
      condition_notes: 'Brand new machine handed over in perfect operating order. 7-Year Heating Coil Warranty activated.',
      parts_used: [],
      recommendations: 'Ensure operators follow cool-down procedure (2 mins cold water flush) before turning off main power.',
      customer_signature_name: 'Marcus Bradley',
      pdf_url: '/reports/SRV-2024-0315.pdf',
      created_at: '2024-03-15T16:00:00Z'
    }
  ]
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────

export function getPPMSchedule(typeKey: string): PPMSchedule | undefined {
  return PPM_SCHEDULES[typeKey] || PPM_SCHEDULES['hot-water'];
}

export function getTroubleshootingSymptom(id: string): TroubleshootingSymptom | undefined {
  return TROUBLESHOOTING_GUIDE.find((s) => s.id === id);
}

export function getServicePlan(id: ServicePlanType): ServicePlanDef | undefined {
  return SERVICE_PLANS.find((p) => p.id === id);
}
