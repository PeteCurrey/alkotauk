export interface ServiceScheduleItem {
  interval: string;
  title: string;
  scope: string[];
  importance: string;
}

export interface ServicePlan {
  id: string;
  name: string;
  tagline: string;
  recommendedFor: string;
  features: string[];
  intervalSummary: string;
}

export const TRAILER_SERVICE_SCHEDULE: ServiceScheduleItem[] = [
  {
    interval: 'Daily / Pre-Shift (Operator)',
    title: 'Pre-Flight Operational & Safety Check',
    scope: [
      'Inspect engine oil level and burner fuel level',
      'Check water inlet filters for debris / sediment buildup',
      'Inspect high-pressure hoses for abrasion, kinks, or wire exposure',
      'Check trailer tyre pressures, wheel nuts, and lighting plug',
      'Test breakaway cable and overrun hitch damper'
    ],
    importance: 'Preventative / Daily'
  },
  {
    interval: '50 Operating Hours / Monthly',
    title: 'Pump & Engine Break-In Service',
    scope: [
      'Change initial high-pressure pump crankcase oil (special non-detergent formulation)',
      'Engine oil & filter change (Honda / Vanguard / Kubota spec)',
      'Clean water break-tank CAT 5 float valve and intake strainer',
      'Check drive belt tension and pulley alignment on belt-drive models',
      'Inspect electrical harness and battery terminal connections'
    ],
    importance: 'Critical Early Break-In'
  },
  {
    interval: '250 Operating Hours / 6 Months',
    title: 'Intermediate Hydraulic & Thermal Health Check',
    scope: [
      'Comprehensive high-pressure pump valve and seal inspection',
      'Check unloader valve calibration, bypass pressure, and safety relief valve',
      'Inspect burner fuel nozzle, electrodes, and optical flame sensor',
      'Check fuel filter water trap and replace primary fuel filter element',
      'Test auto-rewind hose reel slip rings and swivel seals under full pressure'
    ],
    importance: 'PPM Mid-Cycle'
  },
  {
    interval: '500 Operating Hours / Annual',
    title: 'Major Alkota UK Annual Service & IVA Inspection',
    scope: [
      'Full combustion chamber inspection and optical soot removal',
      'Schedule 80 hydro-insulated coil flow-testing and descaling',
      'High-pressure pump full overhaul: ceramic plungers, packing seals, check valves',
      'Unloader valve re-seal and pressure calibration sign-off',
      'Trailer chassis full mechanical service: brake shoes, drums, cables, wheel bearings, suspension bushes, hitch damper',
      'Water recovery blower vacuum test and filtration media replacement (on VFS models)',
      'Issue Alkota UK Certified Maintenance & Compliance Certificate'
    ],
    importance: 'Comprehensive Annual Overhaul'
  },
  {
    interval: 'Pre-Winter (October / November)',
    title: 'Winterisation & Anti-Freeze Protection Service',
    scope: [
      'Complete drainage of water tanks, header break tanks, and booster pumps',
      'Charge high-pressure pump, unloader, flow manifold, and burner coil with food-grade propylene glycol anti-freeze',
      'Purge hose reels and lances with compressed air and anti-freeze solution',
      'Inspect enclosure internal thermostatically-controlled frost-heaters (enclosed models)',
      'Winter battery condition test and trickle-charge protocol'
    ],
    importance: 'Freeze-Damage Prevention'
  }
];

export const TRAILER_SERVICE_PLANS: ServicePlan[] = [
  {
    id: 'essential-ppm',
    name: 'Essential Trailer PPM',
    tagline: 'Scheduled biannual preventative maintenance for commercial contractors and single-shift operations.',
    recommendedFor: 'Independent contractors, municipal teams, and estate operations running up to 500 operating hours/year.',
    features: [
      '2 × Scheduled on-site service visits per annum by Alkota certified technicians',
      'Comprehensive 42-point mechanical, hydraulic, and trailer roadworthiness check',
      'Complete oil, filter, and burner nozzle replacement included',
      'Priority 48-hour emergency breakdown response window',
      '10% discount on all replacement high-pressure hoses, nozzles, and chemical consumables',
      'Digital service record history preserving Alkota 7-year coil warranty'
    ],
    intervalSummary: 'Biannual (Every 250 Operating Hours)'
  },
  {
    id: 'fleet-command',
    name: 'Fleet Command 24/7 Total Care',
    tagline: 'Zero-downtime mission-critical service contract for continuous multi-shift haulage and plant operations.',
    recommendedFor: 'High-volume logistics depots, environmental closed-loop contractors, and 24/7 plant fleets.',
    features: [
      '4 × Scheduled on-site service visits per annum (Quarterly PPM)',
      'Full annual pump rebuild (ceramic plungers, packings, and valves included)',
      'Complete annual down-draft burner descaling and combustion efficiency certification',
      'Trailer running gear overhaul (brakes, bearings, hitch, and lighting certified)',
      'Guaranteed 24-hour emergency on-site engineer dispatch',
      'Courtesy temporary mobile wash rig provided during major overhauls',
      'Dedicated technical account manager and direct engineering hotline'
    ],
    intervalSummary: 'Quarterly (Every 150 Operating Hours)'
  }
];
