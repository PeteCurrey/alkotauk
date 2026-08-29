'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Droplets, 
  Filter, 
  Wind, 
  ShieldCheck, 
  Cpu, 
  Layout, 
  CheckCircle2, 
  Settings, 
  RefreshCw, 
  Sliders, 
  Gauge, 
  Sparkles, 
  ChevronRight, 
  Building2, 
  Truck, 
  Factory, 
  FileText, 
  Download, 
  HelpCircle, 
  AlertTriangle, 
  Clock, 
  Zap, 
  Flame,
  Layers,
  ArrowUpRight,
  ShieldAlert
} from 'lucide-react';
import Link from 'next/link';

// ─── 03. THE WATER JOURNEY STEPS ─────────────────────────────────────────────
const WATER_JOURNEY_STEPS = [
  {
    step: '01',
    name: 'CAPTURE',
    title: 'Site Containment & Inflow Capture',
    subtitle: 'Zero-Runoff Surface & Sump Recovery',
    description: 'Every high-pressure wash cycle creates an immediate effluent management requirement. The capture phase secures all wash water at the source before it can reach permeable ground, surface drains, or clean stormwater networks.',
    mechanics: 'Surface vacuum scuppers, flexible weighted containment berms, or dedicated 1:50 graded wash pad sumps with submersible slurry pumps.',
    supportedGear: 'Alkota VACGD vacuum recovery blower, portable suction dams, silt baskets, wash pad sumps.',
    metric: '100% Runoff Containment',
    color: 'from-cyan-900/30 to-transparent'
  },
  {
    step: '02',
    name: 'SEPARATION',
    title: 'Primary Solids & Tramp Oil Separation',
    subtitle: 'Density-Driven Gravitational Settling',
    description: 'Heavy suspended solids (aggregate, road mud, brake dust) and free floating petroleum hydrocarbons must be removed before biological or fine media filtration can function without blinding.',
    mechanics: 'Multi-chamber sediment traps catch heavy particulates (> 50 microns), while coalescing baffles and surface weir skimmers isolate non-emulsified floating oils.',
    supportedGear: 'Above-ground coalescing tanks, stainless weir skimmers, heavy-duty perforated sediment baskets.',
    metric: '> 50µm Solids Removed',
    color: 'from-teal-900/30 to-transparent'
  },
  {
    step: '03',
    name: 'FILTRATION',
    title: 'Multi-Stage Media & Vacuum Filtration',
    subtitle: 'Deep-Bed Purification & Hydrocarbon Removal',
    description: 'Water passes through progressive treatment beds designed to capture finer suspended particulate matter and break down chemical/detergent matrices.',
    mechanics: 'Alkota CSF deep-bed silica sand and multi-grade gravel media or VFS negative-void vacuum filtration chambers that maintain high throughput without premature filter fouling.',
    supportedGear: 'Alkota CSF-5 & CSF-10 Media Filtration Systems, 8-VFS-1 Negative-Void Vacuum chambers.',
    metric: '99% Free Hydrocarbon Reduction',
    color: 'from-emerald-900/30 to-transparent'
  },
  {
    step: '04',
    name: 'POLISHING',
    title: 'Fine Micron Polishing & Hydrocarbon Capture',
    subtitle: 'Polishing for Closed-Loop or Permitted Discharge',
    description: 'For high-specification applications, tertiary filtration polishes the effluent down to sub-micron thresholds, stripping residual trace hydrocarbons and chemical odours.',
    mechanics: 'Granular Activated Carbon (GAC) beds, oil-absorbing hydrophobic polymer cartridges, and fine 5-micron spun polypropylene filters.',
    supportedGear: 'Activated carbon canisters, 5µm cartridge arrays, inline chemical neutralisers.',
    metric: '< 5 mg/L Oil Target (BS EN 858)',
    color: 'from-slate-900/40 to-transparent'
  },
  {
    step: '05',
    name: 'OUTCOME',
    title: 'Closed-Loop Reuse or Controlled Reduction',
    subtitle: 'Sustainable Reuse, Consented Sewer, or Evaporation',
    description: 'The purified water is pumped directly back to buffer holding tanks to supply high-pressure washers in a 100% closed loop, discharged to foul sewer under Trade Effluent Consent, or volume-reduced via thermal evaporation.',
    mechanics: 'Automatic level-switched transfer pumps deliver clean recycled water at pressure back into Alkota hot/cold pressure washer holding reservoirs.',
    supportedGear: 'Closed-loop buffer tanks, 15/20 NG/LP Evaporators, Trade Effluent automated monitoring manifolds.',
    metric: 'Up to 90% Fresh Water Saved',
    color: 'from-orange-950/30 to-transparent'
  }
];

// ─── 04. THREE CORE TECHNOLOGIES DATA ────────────────────────────────────────
const TECH_DATA = {
  vfs: {
    id: 'vfs',
    category: 'VACUUM RECOVERY & RECLAIM',
    title: 'Alkota VFS Series',
    subtitle: 'Portable & Mobile Vacuum Filtration Systems',
    heroTag: 'Multi-Stage Negative-Void Reclaim',
    flowRate: '19 – 30 L/min (5 – 8 GPM)',
    power: '230V 1PH / 12V DC Pump Out / Vanguard Petrol (VACGD)',
    mobility: 'Portable Wheel Kit, Skid Base, or Turnkey Trailer Mount',
    summary: 'The Alkota VFS (Vacuum Filtration System) is a purpose-built water recovery and recycling unit engineered for mobile contract cleaning and sites without permanent drainage infrastructure. Operating under a negative-void vacuum chamber, it pulls wash water from up to 100 metres away without clogging filters.',
    capabilities: [
      'Multi-stage filtration: Pre-screen basket → negative void vacuum chamber → microfibre/perk stage → final cartridge polishing',
      'Removes up to 99% of free petroleum hydrocarbons and suspended solids',
      'On-demand automated operation with high-flow discharge pump',
      'Integrated seamlessly with Alkota VACGD surface cleaners and trailer wash packages',
      'Allows compliant commercial pressure washing in environmentally sensitive areas'
    ],
    idealFor: 'Mobile contract washers, car parks, forecourts, loading docks, pedestrianised high streets, and temporary wash pads.',
    image: 'https://easttnchemicals.com/wp-content/uploads/2023/11/Water_Treatment_8_VFS_1_Alkota-1024x1024.jpg',
    models: [
      { name: '8-VFS-1', type: 'Electric Vacuum Reclaim', cap: '19–30 L/min', specs: 'Negative-void vacuum, 4-stage filter, wheel kit / skid' },
      { name: 'VACGD', type: 'Engine-Driven Vacuum Blower', cap: 'High CFM Blower', specs: 'Vanguard V-Twin engine, Sutorbilt rotary lobe blower, direct surface cleaner link' }
    ],
    ctaHref: '/contact?enquiry=vfs-vacuum',
    ctaText: 'Enquire on VFS Series'
  },
  csf: {
    id: 'csf',
    category: 'MEDIA FILTRATION & RECYCLING',
    title: 'Alkota CSF Series',
    subtitle: 'Stationary Modular Media Sand Filtration Plants',
    heroTag: 'Continuous Duty Closed-Loop Wash Bays',
    flowRate: '19 – 38 L/min (5 – 10 GPM Continuous)',
    power: '230V / 400V 3-Phase Electric Motor Assembly',
    mobility: 'Stationary Heavy-Duty Floor / Pad Mount',
    summary: 'The Alkota CSF series represents our flagship stationary water-treatment and closed-loop recycling architecture. By routing wastewater through a 300 lb high-efficiency media sand bed coupled with an above-ground coalescing separation tank, it delivers continuous, ultra-low-maintenance filtration for permanent facilities.',
    capabilities: [
      '300 lbs multi-grade silica sand & aggregate media bed for deep particulate capture',
      'Integrated 200 gallon (757 Litre) heavy-duty coalescing treatment holding reservoir',
      'Automated multi-port backwash cycle cleans media bed in minutes with minimal downtime',
      'Non-corrosive heavy polymer tank construction with full service access',
      'Supplies continuous filtered water directly back to Alkota multi-bay pressure washers'
    ],
    idealFor: 'Commercial fleet haulage depots, bus & rail yards, plant hire facilities, agricultural machinery maintenance, and municipal depots.',
    image: 'https://alkota.com/wp-content/uploads/2023/07/Water_Treatment_CFS_10_Alkota-1024x1024.png',
    models: [
      { name: 'CSF-5', type: 'Stationary Media Filter', cap: '19 L/min (5 GPM)', specs: '200 gal tank, 300 lb media, 3/4 HP pump, compact footprint' },
      { name: 'CSF-10', type: 'High-Volume Media Filter', cap: '38 L/min (10 GPM)', specs: '200 gal tank, 300 lb media, automatic backwash, multi-bay feed' }
    ],
    ctaHref: '/contact?enquiry=csf-media',
    ctaText: 'Enquire on CSF Series'
  },
  evaporation: {
    id: 'evaporation',
    category: 'WASTEWATER THERMAL EVAPORATION',
    title: 'Alkota 15/20 Series Evaporators',
    subtitle: 'High-Volume Liquid Waste Volume Reduction',
    heroTag: 'Thermal Volume Reduction Up to 95%',
    flowRate: 'Up to 75 L/hr (20 Gallons / Hour)',
    power: 'Clean LP Gas / Natural Gas Combustion (Up to 300,000 BTU)',
    mobility: 'Stationary Workshop / Plant Room Installation',
    summary: 'When wastewater is heavily contaminated with spent machining coolants, aqueous parts cleaner chemistries, or hazardous chemical emulsions that cannot be filtered or discharged to sewer, thermal evaporation offers the definitive economic solution. It boils off clean water vapour, slashing liquid waste haulage volumes by up to 95%.',
    capabilities: [
      'Evaporates up to 480 gallons (1,816 Litres) of wastewater per 24-hour cycle',
      'Clean, whisper-quiet Natural Gas or LP burner with thermal efficiency controls',
      'Built-in automated defoamer injection pump prevents foaming boil-over events',
      'Heavy-gauge carbon or optional stainless steel evaporation pan for harsh chemistries',
      'Eliminates thousands in ongoing hazardous liquid waste tanker disposal fees'
    ],
    idealFor: 'Engineering machine shops, engine remanufacturers, parts cleaning operations, chemical processors, and facilities with zero foul sewer access.',
    image: 'https://alkota.com/wp-content/uploads/2023/10/Alkota_Model_30_evaporator_72dpi.jpg',
    models: [
      { name: '15/20-NG', type: 'Natural Gas Evaporator', cap: '75 L/hr (20 GPH)', specs: '300,000 BTU burner, defoamer pump, auto level control' },
      { name: '15/20-LP', type: 'LP Gas Evaporator', cap: '75 L/hr (20 GPH)', specs: '300,000 BTU propane burner, defoamer pump, auto shutoff' }
    ],
    ctaHref: '/contact?enquiry=evaporation',
    ctaText: 'Enquire on Evaporators'
  }
};

// ─── 06. APPLICATIONS MATRIX ────────────────────────────────────────────────
const APPLICATION_SCENARIOS = [
  {
    id: 'fleet',
    title: 'Transport & Fleet Haulage Depots',
    icon: Truck,
    challenge: 'High daily wash throughput of HGVs, trailers, and vans generating hundreds of litres of effluent loaded with traffic film, diesel residue, and road grime under strict local water company scrutiny.',
    solution: 'Dedicated wash pad with silt catchpit feeding an Alkota CSF-10 Media Filtration plant. 90% of water is recycled back into the hot pressure washer fleet.',
    recommendedTech: 'Alkota CSF-10 + Silt Interceptor',
    dischargeStrategy: 'Closed-loop wash recycling with overflow to foul sewer via Class 1 coalescing interceptor.'
  },
  {
    id: 'planthire',
    title: 'Plant Hire & Earthmoving Equipment',
    icon: Factory,
    challenge: 'Excavators, dumpers, and access mats carrying heavy clay, aggregate, and invasive weed seeds requiring biosecurity decontamination before site departure.',
    solution: 'High-volume wash bays paired with multi-stage sedimentation sumps, heavy-solids weir tanks, and automated 360° mat wash plants.',
    recommendedTech: 'Alkota Mat Wash Plant + Silt Separation + CSF Media',
    dischargeStrategy: 'High-volume solids settling with closed-loop recycling for wash lances.'
  },
  {
    id: 'mobile',
    title: 'Mobile Contract Cleaners & Forecourts',
    icon: Layout,
    challenge: 'Operating on commercial client sites, car parks, and petrol station forecourts where surface water drains lead directly to local rivers, making wash runoff a criminal offence.',
    solution: 'Turnkey trailer or van-pack equipped with Alkota VACGD vacuum recovery blower and 8-VFS-1 portable reclaim filtration unit.',
    recommendedTech: 'Alkota 8-VFS-1 + VACGD Vacuum Recovery Trailer',
    dischargeStrategy: '100% on-site surface capture and filtration into onboard buffer tanks.'
  },
  {
    id: 'workshop',
    title: 'Manufacturing & Machine Rebuild Workshops',
    icon: Settings,
    challenge: 'Spent machine coolants, oily wash rinses, and aqueous parts washer dump baths that are classified as hazardous waste and cost thousands per cubic metre to tanker away.',
    solution: 'Alkota 15/20 Thermal Evaporator converts water content into clean atmospheric vapour, leaving a dry or highly concentrated sludge for low-cost disposal.',
    recommendedTech: 'Alkota 15/20 Natural Gas / LP Evaporator',
    dischargeStrategy: 'Thermal volume reduction (zero liquid sewer discharge required).'
  },
  {
    id: 'food',
    title: 'Food Processing & Agricultural Sanitisation',
    icon: Building2,
    challenge: 'Abattoirs, dairy processing, and food packing plants generating organic grease, fats, and chemical sanitiser effluent subject to strict Water UK trade effluent COD/BOD thresholds.',
    solution: 'Grade 316 stainless steel wash bay reticulation, thermal steam sanitisation, automated grease skimming, and buffered trade effluent monitoring.',
    recommendedTech: 'Custom Stainless CSF Skid + Automated Trade Effluent Manifold',
    dischargeStrategy: 'Consented foul sewer discharge with continuous pH and temperature buffering.'
  }
];

// ─── 08. SYSTEM SELECTOR QUESTIONS ──────────────────────────────────────────
const SELECTOR_QUESTIONS = [
  {
    id: 'environment',
    title: '1. Where will your washing operations take place?',
    options: [
      { label: 'Mobile / Client Sites', desc: 'Car parks, forecourts, retail parks & temporary pads', value: 'mobile' },
      { label: 'Dedicated Fixed Wash Bay', desc: 'Permanent concrete wash pad at a depot or yard', value: 'fixed' },
      { label: 'Enclosed Workshop / Plant Room', desc: 'Inside an engineering facility or machine workshop', value: 'indoor' }
    ]
  },
  {
    id: 'volume',
    title: '2. What is your estimated daily wastewater volume?',
    options: [
      { label: 'Light (< 500 L / day)', desc: '1 to 5 vehicles or occasional maintenance washes', value: 'low' },
      { label: 'Medium (500 – 3,000 L / day)', desc: 'Continuous daily fleet or equipment washing', value: 'medium' },
      { label: 'High (3,000+ L / day)', desc: 'Multi-operator continuous multi-bay plant operations', value: 'high' }
    ]
  },
  {
    id: 'contaminant',
    title: '3. What is the primary contaminant in your wash stream?',
    options: [
      { label: 'Road Grime & Light Oil', desc: 'Standard vehicle traffic film, light greases & dust', value: 'road' },
      { label: 'Heavy Silt, Clay & Mud', desc: 'Excavators, quarry plant, track machinery & rig mats', value: 'heavy' },
      { label: 'Coolants, Solvents & Emulsions', desc: 'Machining lubricants, parts washer baths & chemicals', value: 'chemical' }
    ]
  },
  {
    id: 'objective',
    title: '4. What is your primary water management objective?',
    options: [
      { label: '100% Closed-Loop Recycling', desc: 'Recycle water back to washers & minimise water bills', value: 'recycle' },
      { label: 'Permitted Foul Sewer Discharge', desc: 'Treat water to meet Water Authority Trade Effluent consent', value: 'sewer' },
      { label: 'Liquid Waste Volume Reduction', desc: 'Eliminate expensive waste tanker pump-out fees', value: 'evap' }
    ]
  }
];

export default function WaterTreatmentFlagshipPage() {
  const [activeTech, setActiveTech] = useState<'vfs' | 'csf' | 'evaporation'>('csf');
  const [activeProcessStep, setActiveProcessStep] = useState<number>(2); // Default to Step 3: Filtration
  const [activeApp, setActiveApp] = useState<string>('fleet');

  // Selector state
  const [selectorAnswers, setSelectorAnswers] = useState<Record<string, string>>({
    environment: 'fixed',
    volume: 'medium',
    contaminant: 'road',
    objective: 'recycle'
  });

  const getRecommendation = () => {
    const { environment, objective, contaminant } = selectorAnswers;
    if (objective === 'evap' || contaminant === 'chemical') {
      return {
        system: 'Alkota 15/20 Evaporator Series',
        badge: 'Thermal Volume Reduction',
        reason: 'For chemical emulsions, spent coolants, and parts washer effluent where sewer discharge is prohibited, the Alkota 15/20 Evaporator reduces liquid waste volume by up to 95%, drastically cutting tanker disposal overheads.',
        gear: ['Alkota 15/20-NG / LP Gas Evaporator', 'Automated Defoamer Pump Package', 'Liquid Level Control System'],
        actionLink: '/contact?enquiry=evaporator-recommendation'
      };
    }
    if (environment === 'mobile') {
      return {
        system: 'Alkota VFS-1 Vacuum Filtration System + VACGD',
        badge: 'Mobile Reclaim & Compliance',
        reason: 'For mobile contractors and off-site operations, the VFS-1 paired with the VACGD engine-driven blower provides 100% surface water recovery and multi-stage filtration to allow compliant cleaning anywhere.',
        gear: ['Alkota 8-VFS-1 Reclaim Unit', 'Alkota VACGD Vanguard Vacuum Blower', 'Surface Cleaner Recovery Ring & Suction Berms'],
        actionLink: '/contact?enquiry=vfs-mobile-recommendation'
      };
    }
    return {
      system: 'Alkota CSF-10 Closed-Loop Media Filtration Plant',
      badge: 'Stationary Closed-Loop Recycling',
      reason: 'For fixed multi-bay depots and commercial wash pads, the CSF-10 provides continuous 38 L/min filtration through 300 lbs of silica media, recycling 90% of process water back to your pressure washers.',
      gear: ['Alkota CSF-10 Media Sand Filtration Plant', '200 Gallon Coalescing Tank with Auto Backwash', 'Submersible Sump Transfer Pump'],
      actionLink: '/contact?enquiry=csf-fixed-recommendation'
    };
  };

  const recommendation = getRecommendation();

  return (
    <main className="min-h-screen bg-alkota-bg text-alkota-black overflow-x-hidden pt-28 sm:pt-32 pb-0">
      <Navigation />

      {/* ─── CHAPTER 01: PREMIUM CATEGORY HERO ────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex flex-col justify-between bg-[#0E1513] text-white border-b border-[#213831] overflow-hidden px-6 sm:px-12 pt-12 pb-16">
        {/* Subtle Water-Slate Engineering Texture Background */}
        <div 
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#2DD4BF 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }}
        />
        
        {/* Ambient Desaturated Mineral Glow */}
        <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] bg-[#163832]/40 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 left-1/4 w-[400px] h-[400px] bg-[#0E2822]/50 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl w-full">
          <Breadcrumbs items={[{ label: 'Water Treatment' }]} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mt-8 lg:mt-14">
            {/* Left: Authority Typography */}
            <div className="lg:col-span-8 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3"
              >
                <div className="h-[2px] w-10 bg-alkota-orange" />
                <span className="font-ibm-plex-mono text-[10px] sm:text-xs font-black uppercase tracking-[0.4em] text-alkota-orange">
                  // THE OTHER HALF OF INDUSTRIAL CLEANING
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="font-barlow-condensed text-6xl sm:text-8xl lg:text-[7.5rem] font-black uppercase italic leading-[0.82] tracking-tighter text-white"
              >
                WATER TREATMENT.<br />
                <span className="text-alkota-orange">ENGINEER THE WATER.</span><br />
                <span className="text-white/40 italic">NOT JUST THE WASH.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.7 }}
                className="font-inter max-w-2xl text-base sm:text-lg text-[#A0B0AA] uppercase tracking-wider leading-relaxed font-normal"
              >
                Industrial washing creates a continuous wastewater management obligation. Alkota engineers complete water-management infrastructure — multi-stage vacuum recovery, media sand filtration, closed-loop recycling, and thermal evaporation.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="pt-4 flex flex-wrap items-center gap-4"
              >
                <a
                  href="#technologies"
                  className="inline-flex items-center gap-3 bg-alkota-orange text-white px-8 py-4 text-xs font-black uppercase tracking-[0.3em] hover:bg-white hover:text-alkota-black transition-all shadow-xl no-underline font-inter"
                >
                  <span>Explore Treatment Systems</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#selector"
                  className="inline-flex items-center gap-3 border border-[#2A4840] bg-[#142621]/60 text-white px-8 py-4 text-xs font-black uppercase tracking-[0.3em] hover:border-alkota-orange hover:bg-alkota-orange hover:text-white transition-all no-underline font-inter backdrop-blur-sm"
                >
                  <span>Design Your System</span>
                  <Sliders className="h-4 w-4 text-alkota-orange" />
                </a>
              </motion.div>
            </div>

            {/* Right: Featured Hero Visual Console */}
            <div className="lg:col-span-4 relative">
              <div className="relative bg-[#131F1C] border border-[#233F37] p-8 space-y-6 shadow-2xl backdrop-blur-md">
                <div className="flex items-center justify-between border-b border-[#233F37] pb-4">
                  <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange font-bold">
                    SYSTEM SPECIFICATION // V.04
                  </span>
                  <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>

                <div className="aspect-[4/3] flex items-center justify-center p-2 relative overflow-hidden bg-black/40 border border-[#1A332C]">
                  <img
                    src="https://alkota.com/wp-content/uploads/2023/07/Water_Treatment_CFS_10_Alkota-1024x1024.png"
                    alt="Alkota CSF-10 Media Filtration Plant"
                    className="h-full w-full object-contain filter drop-shadow-xl transition-transform duration-700 hover:scale-105"
                  />
                  <span className="absolute bottom-2 left-2 font-ibm-plex-mono text-[9px] text-[#7A9990] bg-[#0E1A16] px-2 py-0.5 border border-[#1F3D34]">
                    CSF-10 MEDIA PLANT
                  </span>
                </div>

                <div className="space-y-2 text-xs font-inter text-[#B0C4BE] uppercase tracking-wider">
                  <div className="flex justify-between py-1.5 border-b border-white/5">
                    <span className="text-[#6D8A82]">Architecture:</span>
                    <span className="text-white font-semibold">Modular Media Sand Filter</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-white/5">
                    <span className="text-[#6D8A82]">Primary Duty:</span>
                    <span className="text-white font-semibold">Closed-Loop Wash Water</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-white/5">
                    <span className="text-[#6D8A82]">Fresh Water Save:</span>
                    <span className="text-alkota-orange font-semibold">Up to 90%</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-[#6D8A82]">Standards:</span>
                    <span className="text-white font-semibold">BS EN 858 & EA Aligned</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Metric Strip */}
          <div className="mt-16 pt-10 border-t border-[#1F3B33] grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="space-y-1">
              <div className="font-barlow-condensed text-3xl sm:text-4xl font-black text-white italic">
                90% <span className="text-alkota-orange text-2xl font-light">REDUCTION</span>
              </div>
              <p className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#7A9990]">
                Fresh Water Demand in Closed-Loop
              </p>
            </div>
            <div className="space-y-1">
              <div className="font-barlow-condensed text-3xl sm:text-4xl font-black text-white italic">
                &lt; 5 <span className="text-alkota-orange text-2xl font-light">MG/L</span>
              </div>
              <p className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#7A9990]">
                Free Hydrocarbon Discharge Target
              </p>
            </div>
            <div className="space-y-1">
              <div className="font-barlow-condensed text-3xl sm:text-4xl font-black text-white italic">
                480 <span className="text-alkota-orange text-2xl font-light">GAL/DAY</span>
              </div>
              <p className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#7A9990]">
                Thermal Wastewater Evaporation
              </p>
            </div>
            <div className="space-y-1">
              <div className="font-barlow-condensed text-3xl sm:text-4xl font-black text-white italic">
                BS EN <span className="text-alkota-orange text-2xl font-light">858</span>
              </div>
              <p className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#7A9990]">
                UK Trade Effluent & Interceptor Standard
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CHAPTER 02: EDITORIAL: CLEANING DOESN'T END AT THE NOZZLE ────────── */}
      <section className="py-28 px-6 sm:px-12 bg-white border-b border-alkota-iron">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5 space-y-6">
              <span className="font-ibm-plex-mono text-[10px] font-black uppercase tracking-[0.4em] text-alkota-orange block">
                // THE INDUSTRIAL REALITY
              </span>
              <h2 className="font-barlow-condensed text-5xl sm:text-6xl lg:text-7xl font-black text-alkota-black uppercase italic leading-[0.88] tracking-tighter">
                CLEANING DOESN&apos;T END <br />
                <span className="text-alkota-orange">AT THE NOZZLE.</span>
              </h2>
              <div className="h-1 w-20 bg-alkota-black" />
            </div>

            <div className="lg:col-span-7 space-y-6 font-inter text-alkota-silver text-sm sm:text-base leading-relaxed uppercase tracking-wider">
              <p className="text-alkota-black font-semibold text-base sm:text-lg">
                Every litre of hot water delivered under 300 BAR of pressure becomes an immediate environmental and site management requirement.
              </p>
              <p>
                Industrial washing strips compacted diesel soot, mineral oils, hydraulic fluid, heavy silt, and surfactants off commercial machinery. Under UK law, this effluent cannot be discharged into clean rainwater surface drains, soakaways, or local watercourses.
              </p>
              <p>
                Facilities must manage the full lifecycle: capturing the spray runoff, separating suspended solids, stripping emulsified hydrocarbons, meeting sewerage undertaker trade effluent consents, and conserving clean metered water through closed-loop recycling.
              </p>
            </div>
          </div>

          {/* 6 Engineering Challenges Grid */}
          <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-alkota-iron border border-alkota-iron">
            {[
              {
                num: '01',
                title: 'Surface Runoff Containment',
                desc: 'Preventing contaminated wash water from migrating across open yards into permeable soil or surface water gullies.'
              },
              {
                num: '02',
                title: 'Suspended Solids Trapping',
                desc: 'Separating aggregate, brake dust, and heavy clay before pump wear and line blockages occur.'
              },
              {
                num: '03',
                title: 'Hydrocarbon Emulsification',
                desc: 'Breaking hot water and detergent chemical emulsions to strip free oils below 5 mg/L compliance targets.'
              },
              {
                num: '04',
                title: 'Trade Effluent Consents',
                desc: 'Adhering to regional water authority limits for COD, TSS, and pH when discharging to municipal foul sewers.'
              },
              {
                num: '05',
                title: 'Metered Water Conservation',
                desc: 'Reclaiming and filtering up to 90% of process water to combat escalating commercial water utility bills.'
              },
              {
                num: '06',
                title: 'Hazardous Waste Volume Reduction',
                desc: 'Thermal evaporation of spent coolant and chemical washes to eliminate expensive per-litre tanker haulage.'
              }
            ].map((c, i) => (
              <div key={i} className="bg-[#FAF9F6] p-8 md:p-10 flex flex-col justify-between hover:bg-white transition-colors">
                <div>
                  <span className="font-ibm-plex-mono text-xs font-bold text-alkota-orange block mb-3">
                    [ CHALLENGE // {c.num} ]
                  </span>
                  <h3 className="font-barlow-condensed text-2xl sm:text-3xl font-black text-alkota-black uppercase italic mb-3 leading-tight">
                    {c.title}
                  </h3>
                </div>
                <p className="font-inter text-xs text-alkota-silver leading-relaxed uppercase tracking-wider mt-4">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CHAPTER 03: THE ARCHITECTURAL WATER JOURNEY ──────────────────────── */}
      <section className="py-28 px-6 sm:px-12 bg-[#0E1513] text-white border-b border-[#213831] relative overflow-hidden">
        <div className="mx-auto max-w-7xl relative z-10">
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#213831] pb-10">
            <div>
              <span className="font-ibm-plex-mono text-[10px] font-black uppercase tracking-[0.4em] text-alkota-orange block mb-3">
                // PROCESS ARCHITECTURE
              </span>
              <h2 className="font-barlow-condensed text-5xl sm:text-7xl font-black uppercase italic tracking-tighter text-white">
                THE WATER <span className="text-alkota-orange">JOURNEY.</span>
              </h2>
            </div>
            <p className="font-inter text-xs sm:text-sm text-[#8BA8A0] uppercase tracking-wider max-w-md font-normal">
              Click through the five architectural treatment phases to inspect the mechanical engineering, separation physics, and equipment utilized at each step.
            </p>
          </div>

          {/* Interactive Process Phase Navigation */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-12">
            {WATER_JOURNEY_STEPS.map((s, idx) => {
              const isActive = activeProcessStep === idx;
              return (
                <button
                  key={s.step}
                  onClick={() => setActiveProcessStep(idx)}
                  className={`p-4 sm:p-6 text-left border transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#192E29] border-alkota-orange text-white shadow-lg'
                      : 'bg-[#111C19] border-[#1D352F] text-[#7A9990] hover:border-[#355E54] hover:text-white'
                  }`}
                >
                  <span className={`font-ibm-plex-mono text-[10px] font-bold block mb-1 ${isActive ? 'text-alkota-orange' : 'text-[#506E66]'}`}>
                    PHASE {s.step}
                  </span>
                  <div className="font-barlow-condensed text-xl sm:text-2xl font-black uppercase italic leading-none">
                    {s.name}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Process Phase Display Console */}
          <AnimatePresence mode="wait">
            {(() => {
              const current = WATER_JOURNEY_STEPS[activeProcessStep];
              return (
                <motion.div
                  key={current.step}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#121F1B] border border-[#233F37] p-8 sm:p-12 relative overflow-hidden"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    <div className="lg:col-span-7 space-y-6">
                      <div className="flex items-center gap-3">
                        <span className="font-ibm-plex-mono text-xs font-black text-white bg-alkota-orange px-3 py-1 uppercase tracking-widest">
                          PHASE // {current.step}
                        </span>
                        <span className="font-ibm-plex-mono text-xs text-[#7A9990] uppercase tracking-widest">
                          {current.subtitle}
                        </span>
                      </div>

                      <h3 className="font-barlow-condensed text-4xl sm:text-5xl font-black uppercase italic text-white leading-tight">
                        {current.title}
                      </h3>

                      <p className="font-inter text-sm sm:text-base text-[#D0E0DA] leading-relaxed uppercase tracking-wider">
                        {current.description}
                      </p>

                      <div className="space-y-3 pt-4 border-t border-[#233F37]">
                        <div>
                          <span className="font-ibm-plex-mono text-[10px] text-alkota-orange uppercase tracking-widest block mb-1 font-bold">
                            Mechanical Physics & Separation Method:
                          </span>
                          <p className="font-inter text-xs text-[#A0B8B0] uppercase tracking-wide">
                            {current.mechanics}
                          </p>
                        </div>
                        <div className="pt-2">
                          <span className="font-ibm-plex-mono text-[10px] text-alkota-orange uppercase tracking-widest block mb-1 font-bold">
                            Alkota Supported Equipment:
                          </span>
                          <p className="font-inter text-xs text-[#A0B8B0] uppercase tracking-wide">
                            {current.supportedGear}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-5 bg-[#0A1210] border border-[#1F3B33] p-8 flex flex-col justify-between space-y-6">
                      <div>
                        <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.2em] text-[#7A9990] block mb-2 font-bold">
                          ENGINEERING TARGET
                        </span>
                        <div className="font-barlow-condensed text-4xl sm:text-5xl font-black text-white uppercase italic text-alkota-orange leading-none mb-4">
                          {current.metric}
                        </div>
                        <p className="font-inter text-xs text-[#90ABA2] uppercase leading-relaxed tracking-wider">
                          Properly dimensioned for continuous industrial throughput without slowing operator wash cycles.
                        </p>
                      </div>

                      <div className="pt-4 border-t border-[#1F3B33] flex items-center justify-between">
                        <button
                          onClick={() => setActiveProcessStep((prev) => (prev > 0 ? prev - 1 : 4))}
                          className="text-xs font-ibm-plex-mono uppercase text-[#7A9990] hover:text-white transition-colors cursor-pointer bg-transparent border-none"
                        >
                          ← Previous Phase
                        </button>
                        <button
                          onClick={() => setActiveProcessStep((prev) => (prev < 4 ? prev + 1 : 0))}
                          className="text-xs font-ibm-plex-mono uppercase text-alkota-orange hover:text-white transition-colors cursor-pointer bg-transparent border-none font-bold"
                        >
                          Next Phase →
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })()}
          </AnimatePresence>
        </div>
      </section>

      {/* ─── CHAPTER 04: THREE ALKOTA TREATMENT TECHNOLOGIES ──────────────────── */}
      <section id="technologies" className="py-28 px-6 sm:px-12 bg-white border-b border-alkota-iron">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16">
            <span className="font-ibm-plex-mono text-[10px] font-black uppercase tracking-[0.4em] text-alkota-orange block mb-3">
              // CORE TREATMENT FAMILIES
            </span>
            <h2 className="font-barlow-condensed text-5xl sm:text-7xl font-black text-alkota-black uppercase italic tracking-tighter">
              THREE ALKOTA <span className="text-alkota-orange">TREATMENT TECHNOLOGIES.</span>
            </h2>
            <p className="font-inter text-sm sm:text-base text-alkota-silver uppercase tracking-wider max-w-3xl mt-4 font-normal">
              Not accessories. Core industrial systems engineered to solve vacuum water reclaim, permanent media filtration, and hazardous liquid waste evaporation.
            </p>
          </div>

          {/* Technology Switcher Tabs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {[
              { id: 'vfs', title: 'VACUUM RECOVERY', label: 'VFS Series', sub: 'Portable & Mobile Reclaim' },
              { id: 'csf', title: 'MEDIA FILTRATION', label: 'CSF Series', sub: 'Stationary Closed-Loop Sand Bed' },
              { id: 'evaporation', title: 'THERMAL EVAPORATION', label: '15/20 Series', sub: 'Wastewater Volume Reduction' }
            ].map((tab) => {
              const isActive = activeTech === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTech(tab.id as any)}
                  className={`p-6 text-left border transition-all cursor-pointer ${
                    isActive
                      ? 'bg-alkota-black text-white border-alkota-orange shadow-xl'
                      : 'bg-[#F9F8F5] text-alkota-black border-alkota-iron hover:border-alkota-orange hover:bg-white'
                  }`}
                >
                  <span className={`font-ibm-plex-mono text-[10px] font-bold block mb-1 ${isActive ? 'text-alkota-orange' : 'text-alkota-silver'}`}>
                    {tab.title}
                  </span>
                  <div className="font-barlow-condensed text-3xl font-black uppercase italic leading-none mb-1">
                    {tab.label}
                  </div>
                  <div className={`text-xs uppercase font-inter tracking-wider ${isActive ? 'text-alkota-smoke' : 'text-alkota-silver'}`}>
                    {tab.sub}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Technology Console */}
          <AnimatePresence mode="wait">
            {(() => {
              const tech = TECH_DATA[activeTech];
              return (
                <motion.div
                  key={tech.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.35 }}
                  className="bg-[#F8F7F4] border border-alkota-iron p-8 sm:p-12 shadow-sm"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Left Details */}
                    <div className="lg:col-span-7 space-y-6">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="font-ibm-plex-mono text-xs font-black text-white bg-alkota-black px-3 py-1 uppercase tracking-widest">
                          {tech.category}
                        </span>
                        <span className="font-ibm-plex-mono text-xs text-alkota-orange font-bold uppercase tracking-widest">
                          // {tech.heroTag}
                        </span>
                      </div>

                      <h3 className="font-barlow-condensed text-4xl sm:text-6xl font-black text-alkota-black uppercase italic leading-[0.9] tracking-tight">
                        {tech.title}
                      </h3>
                      <p className="font-ibm-plex-mono text-xs text-alkota-silver uppercase tracking-widest font-semibold">
                        {tech.subtitle}
                      </p>

                      <p className="font-inter text-sm sm:text-base text-alkota-silver leading-relaxed uppercase tracking-wider">
                        {tech.summary}
                      </p>

                      {/* Capabilities Checklist */}
                      <div className="space-y-3 py-6 border-t border-b border-alkota-iron">
                        <span className="font-ibm-plex-mono text-[10px] text-alkota-orange uppercase tracking-widest block font-bold">
                          Core Engineering Capabilities:
                        </span>
                        {tech.capabilities.map((cap, cIdx) => (
                          <div key={cIdx} className="flex items-start gap-3 text-xs sm:text-sm text-alkota-black uppercase font-medium tracking-wide">
                            <CheckCircle2 className="h-4 w-4 text-alkota-orange shrink-0 mt-0.5" />
                            <span>{cap}</span>
                          </div>
                        ))}
                      </div>

                      {/* Ideal Scenario */}
                      <div className="bg-white p-6 border-l-4 border-alkota-orange">
                        <span className="font-ibm-plex-mono text-[10px] text-alkota-black uppercase tracking-widest block mb-1 font-bold">
                          Ideal Application Scenario:
                        </span>
                        <p className="font-inter text-xs text-alkota-silver uppercase leading-relaxed tracking-wider">
                          {tech.idealFor}
                        </p>
                      </div>

                      {/* CTA */}
                      <div className="pt-4 flex flex-wrap items-center gap-4">
                        <Link
                          href={tech.ctaHref}
                          className="inline-flex items-center gap-3 bg-alkota-orange text-white px-8 py-4 text-xs font-black uppercase tracking-[0.3em] hover:bg-alkota-black transition-colors no-underline font-inter shadow-lg"
                        >
                          <span>{tech.ctaText}</span>
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                        {tech.id === 'vfs' && (
                          <Link
                            href="/water-treatment/vacgd"
                            className="inline-flex items-center gap-3 border border-alkota-iron bg-white text-alkota-black px-6 py-4 text-xs font-black uppercase tracking-[0.3em] hover:border-alkota-orange hover:text-alkota-orange transition-colors no-underline font-inter"
                          >
                            <span>Inspect VACGD System</span>
                            <ArrowUpRight className="h-4 w-4" />
                          </Link>
                        )}
                      </div>
                    </div>

                    {/* Right Machinery Specs & Models */}
                    <div className="lg:col-span-5 space-y-6">
                      <div className="aspect-square bg-white border border-alkota-iron p-6 flex items-center justify-center relative overflow-hidden shadow-inner">
                        <img
                          src={tech.image}
                          alt={tech.title}
                          className="h-full w-full object-contain filter drop-shadow-md"
                        />
                      </div>

                      {/* Spec Sheet Table */}
                      <div className="bg-white border border-alkota-iron p-6 space-y-3 font-inter text-xs uppercase tracking-wider">
                        <div className="flex justify-between py-2 border-b border-alkota-iron">
                          <span className="text-alkota-silver">Flow Rate / Output:</span>
                          <span className="font-bold text-alkota-black">{tech.flowRate}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-alkota-iron">
                          <span className="text-alkota-silver">Power / Utility:</span>
                          <span className="font-bold text-alkota-black">{tech.power}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-alkota-iron">
                          <span className="text-alkota-silver">Configuration:</span>
                          <span className="font-bold text-alkota-black">{tech.mobility}</span>
                        </div>
                      </div>

                      {/* Supported Models */}
                      <div className="space-y-2">
                        <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-silver block font-bold">
                          Published Family Models:
                        </span>
                        {tech.models.map((m, mIdx) => (
                          <div key={mIdx} className="bg-white border border-alkota-iron p-4 flex items-center justify-between">
                            <div>
                              <div className="font-barlow-condensed text-xl font-black uppercase italic text-alkota-black">
                                {m.name}
                              </div>
                              <div className="text-[11px] text-alkota-silver uppercase">
                                {m.type} · {m.cap}
                              </div>
                            </div>
                            <span className="font-ibm-plex-mono text-[9px] text-alkota-orange uppercase tracking-widest font-bold">
                              UK READY
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })()}
          </AnimatePresence>
        </div>
      </section>

      {/* ─── CHAPTER 05: BUILD THE COMPLETE WASH SYSTEM & BESPOKE INTEGRATION ── */}
      <section className="py-28 px-6 sm:px-12 bg-[#0E1513] text-white border-b border-[#213831] relative overflow-hidden">
        <div className="mx-auto max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="font-ibm-plex-mono text-[10px] font-black uppercase tracking-[0.4em] text-alkota-orange block">
                // COMPLETE SYSTEMS ENGINEERING
              </span>
              <h2 className="font-barlow-condensed text-5xl sm:text-7xl font-black uppercase italic tracking-tighter leading-[0.88] text-white">
                THE COMPLETE <br />
                <span className="text-alkota-orange">WASH-WATER ECOSYSTEM.</span>
              </h2>
              <p className="font-inter text-sm sm:text-base text-[#9DBDB5] leading-relaxed uppercase tracking-wider">
                Alkota does not treat water treatment as an afterthought accessory. We engineer the complete cycle: from the high-pressure hot water washer, to the wash bay catchment, to multi-stage filtration, and back into the machine buffer tank.
              </p>

              <div className="space-y-4 pt-4 border-t border-[#1F3B33]">
                <div className="flex items-start gap-4">
                  <div className="h-8 w-8 rounded-none bg-alkota-orange text-white flex items-center justify-center font-barlow-condensed text-lg font-black italic shrink-0">
                    A
                  </div>
                  <div>
                    <h4 className="font-barlow-condensed text-xl font-black uppercase italic text-white">
                      Bespoke Mobile Trailers & Skids
                    </h4>
                    <p className="font-inter text-xs text-[#8BA8A0] uppercase tracking-wide mt-1">
                      Integrated 8-VFS-1 vacuum filtration, baffled fresh/reclaim water tanks, hose reels, and diesel power generators on highway-certified chassis.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-8 w-8 rounded-none bg-alkota-orange text-white flex items-center justify-center font-barlow-condensed text-lg font-black italic shrink-0">
                    B
                  </div>
                  <div>
                    <h4 className="font-barlow-condensed text-xl font-black uppercase italic text-white">
                      Fixed Multi-Bay Wash Plants
                    </h4>
                    <p className="font-inter text-xs text-[#8BA8A0] uppercase tracking-wide mt-1">
                      Centralised plant rooms with automated CSF sand bed media filtration, underground reticulation, overhead 360° booms, and automated backwashing.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  href="/industrial/brief"
                  className="inline-flex items-center gap-3 bg-alkota-orange text-white px-8 py-4 text-xs font-black uppercase tracking-[0.3em] hover:bg-white hover:text-alkota-black transition-colors no-underline font-inter"
                >
                  <span>Engineer a Complete System</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/machines/trailers"
                  className="inline-flex items-center gap-3 border border-[#2B4B42] bg-[#142621]/60 text-white px-6 py-4 text-xs font-black uppercase tracking-[0.3em] hover:border-alkota-orange hover:text-alkota-orange transition-colors no-underline font-inter"
                >
                  <span>View Mobile Trailers</span>
                  <Truck className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Architecture Flow Diagram */}
            <div className="lg:col-span-6 bg-[#13221E] border border-[#233F37] p-8 sm:p-10 space-y-6">
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange font-bold block mb-2">
                SYSTEM INTERACTION SCHEMATIC
              </span>

              <div className="space-y-4 font-inter text-xs uppercase tracking-wider">
                <div className="p-4 bg-[#0B1411] border-l-4 border-alkota-orange flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#7A9990] block">INPUT PHASE</span>
                    <strong className="text-white text-sm">01. Alkota Hot Water / Steam Machine</strong>
                  </div>
                  <Flame className="h-5 w-5 text-alkota-orange" />
                </div>

                <div className="text-center font-ibm-plex-mono text-xs text-[#506E66]">↓ 300 BAR WASH IMPINGEMENT</div>

                <div className="p-4 bg-[#0B1411] border-l-4 border-cyan-500 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#7A9990] block">CAPTURE PHASE</span>
                    <strong className="text-white text-sm">02. Wash Pad Berm / VACGD Vacuum Scupper</strong>
                  </div>
                  <Layout className="h-5 w-5 text-cyan-400" />
                </div>

                <div className="text-center font-ibm-plex-mono text-xs text-[#506E66]">↓ RAW EFFLUENT TRANSFER</div>

                <div className="p-4 bg-[#0B1411] border-l-4 border-emerald-500 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#7A9990] block">PURIFICATION PHASE</span>
                    <strong className="text-white text-sm">03. CSF Media Sand Filter / VFS Vacuum System</strong>
                  </div>
                  <Filter className="h-5 w-5 text-emerald-400" />
                </div>

                <div className="text-center font-ibm-plex-mono text-xs text-[#506E66]">↓ 90% CLEAN RECYCLED WATER</div>

                <div className="p-4 bg-[#0B1411] border-l-4 border-alkota-orange flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#7A9990] block">CLOSED-LOOP BUFFER</span>
                    <strong className="text-white text-sm">04. Recycled Water Reservoir → Washer Feed</strong>
                  </div>
                  <RefreshCw className="h-5 w-5 text-alkota-orange" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CHAPTER 06: APPLICATIONS & INDUSTRY SCENARIOS ────────────────────── */}
      <section className="py-28 px-6 sm:px-12 bg-white border-b border-alkota-iron">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16">
            <span className="font-ibm-plex-mono text-[10px] font-black uppercase tracking-[0.4em] text-alkota-orange block mb-3">
              // PROVEN INDUSTRIAL APPLICATIONS
            </span>
            <h2 className="font-barlow-condensed text-5xl sm:text-7xl font-black text-alkota-black uppercase italic tracking-tighter">
              TARGETED INDUSTRY <span className="text-alkota-orange">SCENARIOS.</span>
            </h2>
          </div>

          {/* Interactive Scenario Buttons */}
          <div className="flex flex-wrap gap-3 mb-10">
            {APPLICATION_SCENARIOS.map((app) => {
              const isSelected = activeApp === app.id;
              const Icon = app.icon;
              return (
                <button
                  key={app.id}
                  onClick={() => setActiveApp(app.id)}
                  className={`inline-flex items-center gap-3 px-6 py-3.5 text-xs font-black uppercase tracking-widest transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-alkota-orange text-white border-alkota-orange shadow-md'
                      : 'bg-[#F7F7F5] text-alkota-black border-alkota-iron hover:border-alkota-orange hover:bg-white'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{app.title.split(' ')[0]} {app.title.split(' ')[1]}</span>
                </button>
              );
            })}
          </div>

          {/* Active Application Detail Card */}
          {(() => {
            const current = APPLICATION_SCENARIOS.find((a) => a.id === activeApp) || APPLICATION_SCENARIOS[0];
            const Icon = current.icon;
            return (
              <div className="bg-[#FAF9F6] border border-alkota-iron p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                <div className="lg:col-span-8 space-y-6">
                  <div className="flex items-center gap-3">
                    <Icon className="h-6 w-6 text-alkota-orange" />
                    <h3 className="font-barlow-condensed text-3xl sm:text-4xl font-black text-alkota-black uppercase italic">
                      {current.title}
                    </h3>
                  </div>

                  <div className="space-y-4 font-inter text-xs sm:text-sm text-alkota-silver uppercase tracking-wider leading-relaxed">
                    <div>
                      <span className="font-ibm-plex-mono text-[10px] text-alkota-orange uppercase tracking-widest font-bold block mb-1">
                        The Water Management Challenge:
                      </span>
                      <p className="text-alkota-black">{current.challenge}</p>
                    </div>

                    <div>
                      <span className="font-ibm-plex-mono text-[10px] text-alkota-orange uppercase tracking-widest font-bold block mb-1">
                        The Alkota Engineering Solution:
                      </span>
                      <p>{current.solution}</p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 bg-white border border-alkota-iron p-6 sm:p-8 space-y-6">
                  <div>
                    <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-silver font-bold block mb-1">
                      RECOMMENDED TECHNOLOGY
                    </span>
                    <div className="font-barlow-condensed text-2xl font-black uppercase italic text-alkota-black leading-tight">
                      {current.recommendedTech}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-alkota-iron">
                    <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-silver font-bold block mb-1">
                      DISCHARGE STRATEGY
                    </span>
                    <p className="font-inter text-xs text-alkota-silver uppercase leading-relaxed tracking-wider">
                      {current.dischargeStrategy}
                    </p>
                  </div>

                  <Link
                    href={`/contact?enquiry=application-${current.id}`}
                    className="inline-flex items-center justify-center w-full gap-2 bg-alkota-black text-white py-3.5 text-xs font-black uppercase tracking-widest hover:bg-alkota-orange transition-colors no-underline font-inter"
                  >
                    <span>Request Application Audit</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* ─── CHAPTER 07: UK ENVIRONMENTAL RESPONSIBILITY & THE LOBBY ─────────── */}
      <section className="py-28 px-6 sm:px-12 bg-[#0E1513] text-white border-b border-[#213831] relative overflow-hidden">
        <div className="mx-auto max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-6 space-y-6">
              <span className="font-ibm-plex-mono text-[10px] font-black uppercase tracking-[0.4em] text-alkota-orange block">
                // UK REGULATORY INTELLIGENCE
              </span>
              <h2 className="font-barlow-condensed text-5xl sm:text-7xl font-black uppercase italic tracking-tighter leading-[0.88] text-white">
                ENVIRONMENTAL <br />
                <span className="text-alkota-orange">RESPONSIBILITY.</span>
              </h2>

              <p className="font-inter text-sm sm:text-base text-[#9DBDB5] leading-relaxed uppercase tracking-wider">
                Under the Environmental Permitting Regulations 2016, discharging commercial vehicle wash effluent into surface water drains or soakaways is an illegal act carrying unlimited fines.
              </p>
              <p className="font-inter text-xs sm:text-sm text-[#7A9990] leading-relaxed uppercase tracking-wider">
                Alkota equipment can form part of a properly designed wash-water management strategy. Site-specific discharge and trade-effluent requirements should always be verified with your regional sewerage undertaker (e.g., Thames Water, Severn Trent, United Utilities) or environmental regulator (EA, SEPA, NRW).
              </p>

              <div className="p-6 bg-[#13221E] border-l-4 border-alkota-orange space-y-2">
                <span className="font-ibm-plex-mono text-[10px] text-alkota-orange uppercase tracking-widest font-bold block">
                  PPG3 / BS EN 858 Separator Guidance
                </span>
                <p className="font-inter text-xs text-white uppercase tracking-wider leading-relaxed">
                  Class 1 coalescing separators target &le; 5 mg/L hydrocarbon discharge. Class 2 gravity interceptors target &le; 100 mg/L for foul sewer discharge under consent.
                </p>
              </div>
            </div>

            {/* Featured Lobby Articles */}
            <div className="lg:col-span-6 space-y-6">
              <span className="font-ibm-plex-mono text-[10px] font-black uppercase tracking-widest text-[#7A9990] block">
                INTELLIGENCE FROM THE LOBBY //
              </span>

              <div className="bg-[#121F1B] border border-[#233F37] p-8 space-y-4 hover:border-alkota-orange transition-all">
                <div className="flex items-center justify-between">
                  <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange bg-[#0B1411] px-2.5 py-1 border border-[#1F3D34]">
                    REGULATORY WHITE PAPER
                  </span>
                  <span className="font-ibm-plex-mono text-[10px] text-[#7A9990]">7 MIN READ</span>
                </div>
                <h4 className="font-barlow-condensed text-2xl sm:text-3xl font-black uppercase italic text-white leading-snug">
                  UK Wash Bay Environmental Compliance: Drainage, Oil Separators & Trade Effluent Consents
                </h4>
                <p className="font-inter text-xs text-[#90ABA2] uppercase leading-relaxed tracking-wider">
                  By Claire Jenkins, MSc Environmental Engineering. An authoritative engineering guide detailing concrete gradients, interceptor sizing formulas, and water company compliance checklists.
                </p>
                <Link
                  href="/lobby/regulatory-compliance/uk-wash-bay-environmental-compliance-drainage-oil-separators"
                  className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.25em] text-alkota-orange hover:text-white transition-colors pt-2 no-underline font-inter"
                >
                  <span>Read Full Technical Briefing</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="bg-[#121F1B] border border-[#233F37] p-8 space-y-4 hover:border-alkota-orange transition-all">
                <div className="flex items-center justify-between">
                  <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange bg-[#0B1411] px-2.5 py-1 border border-[#1F3D34]">
                    ECONOMICS & COMPLIANCE
                  </span>
                  <span className="font-ibm-plex-mono text-[10px] text-[#7A9990]">7 MIN READ</span>
                </div>
                <h4 className="font-barlow-condensed text-2xl sm:text-3xl font-black uppercase italic text-white leading-snug">
                  Aqueous vs Solvent Parts Washing: Health, VOC Compliance & Operating Costs
                </h4>
                <p className="font-inter text-xs text-[#90ABA2] uppercase leading-relaxed tracking-wider">
                  How automated heated aqueous degreasers eliminate solvent waste disposal liabilities while accelerating workshop throughput.
                </p>
                <Link
                  href="/lobby/economics-tco/aqueous-vs-solvent-parts-washing-voc-compliance-costs"
                  className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.25em] text-alkota-orange hover:text-white transition-colors pt-2 no-underline font-inter"
                >
                  <span>Read Economic Teardown</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CHAPTER 08: WATER TREATMENT SYSTEM SELECTOR ───────────────────────── */}
      <section id="selector" className="py-28 px-6 sm:px-12 bg-white border-b border-alkota-iron">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <span className="font-ibm-plex-mono text-[10px] font-black uppercase tracking-[0.4em] text-alkota-orange block mb-3">
              // INTERACTIVE SPECIFICATION SELECTOR
            </span>
            <h2 className="font-barlow-condensed text-5xl sm:text-7xl font-black text-alkota-black uppercase italic tracking-tighter">
              WHAT HAPPENS TO <span className="text-alkota-orange">YOUR WASH WATER?</span>
            </h2>
            <p className="font-inter text-xs sm:text-sm text-alkota-silver uppercase tracking-wider mt-4">
              Select your operational parameters below to receive a structured equipment and discharge strategy recommendation from Alkota application engineers.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Questions Column */}
            <div className="lg:col-span-7 space-y-8">
              {SELECTOR_QUESTIONS.map((q) => (
                <div key={q.id} className="bg-[#FAF9F6] border border-alkota-iron p-6 sm:p-8 space-y-4">
                  <h4 className="font-barlow-condensed text-2xl font-black text-alkota-black uppercase italic">
                    {q.title}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {q.options.map((opt) => {
                      const isSelected = selectorAnswers[q.id] === opt.value;
                      return (
                        <button
                          key={opt.value}
                          onClick={() => setSelectorAnswers((prev) => ({ ...prev, [q.id]: opt.value }))}
                          className={`p-4 text-left border transition-all cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? 'bg-alkota-black text-white border-alkota-orange shadow-md'
                              : 'bg-white text-alkota-black border-alkota-iron hover:border-alkota-orange'
                          }`}
                        >
                          <span className="font-barlow-condensed text-lg font-black uppercase italic leading-tight mb-2">
                            {opt.label}
                          </span>
                          <span className={`text-[11px] font-inter uppercase leading-tight ${isSelected ? 'text-[#CCC]' : 'text-alkota-silver'}`}>
                            {opt.desc}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Dynamic Recommendation Output Console */}
            <div className="lg:col-span-5 sticky top-36 bg-[#0E1513] text-white border border-[#233F37] p-8 sm:p-10 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-[#233F37] pb-4">
                <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange font-bold">
                  RECOMMENDED ARCHITECTURE
                </span>
                <span className="font-ibm-plex-mono text-[9px] text-[#7A9990] bg-[#162924] px-2 py-0.5 border border-[#233F37]">
                  {recommendation.badge}
                </span>
              </div>

              <div>
                <h3 className="font-barlow-condensed text-3xl sm:text-4xl font-black text-white uppercase italic leading-tight text-alkota-orange mb-3">
                  {recommendation.system}
                </h3>
                <p className="font-inter text-xs text-[#B0C8C0] uppercase leading-relaxed tracking-wider">
                  {recommendation.reason}
                </p>
              </div>

              <div className="space-y-2 pt-4 border-t border-[#233F37]">
                <span className="font-ibm-plex-mono text-[10px] text-alkota-orange uppercase tracking-widest font-bold block mb-2">
                  Key System Components:
                </span>
                {recommendation.gear.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs uppercase font-medium text-white tracking-wide">
                    <CheckCircle2 className="h-3.5 w-3.5 text-alkota-orange shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 space-y-3">
                <Link
                  href={recommendation.actionLink}
                  className="inline-flex items-center justify-center w-full gap-3 bg-alkota-orange text-white py-4 text-xs font-black uppercase tracking-[0.3em] hover:bg-white hover:text-alkota-black transition-colors no-underline font-inter shadow-lg"
                >
                  <span>Request System Specification</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/lobby/regulatory-compliance/uk-wash-bay-environmental-compliance-drainage-oil-separators"
                  className="inline-flex items-center justify-center w-full gap-2 text-xs font-ibm-plex-mono uppercase text-[#7A9990] hover:text-white transition-colors py-1 no-underline"
                >
                  <span>Read UK Drainage Regulations →</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CHAPTER 09: TECHNICAL INVENTORY & CONVERSION ─────────────────────── */}
      <section className="py-28 px-6 sm:px-12 bg-[#FAF9F6] border-b border-alkota-iron">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16">
            <span className="font-ibm-plex-mono text-[10px] font-black uppercase tracking-[0.4em] text-alkota-orange block mb-3">
              // VERIFIED EQUIPMENT DATA
            </span>
            <h2 className="font-barlow-condensed text-5xl sm:text-7xl font-black text-alkota-black uppercase italic tracking-tighter">
              PUBLISHED TREATMENT <span className="text-alkota-orange">SPECIFICATIONS.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {[
              {
                model: '8-VFS-1',
                series: 'Vacuum Filtration System',
                power: '230V / 120V Electric',
                flow: '19 – 30 L/min (5–8 GPM)',
                footprint: 'Wheel Kit or Skid Mount',
                highlight: '99% Free Hydrocarbon Reduction',
                docUrl: '/downloads/Alkota_VFS1_Specification.pdf'
              },
              {
                model: 'VACGD',
                series: 'Vacuum Recovery Blower',
                power: 'Vanguard V-Twin Petrol',
                flow: 'High-CFM Sutorbilt Blower',
                footprint: 'Mobile Heavy-Duty Skid',
                highlight: 'Direct Surface Cleaner Link',
                docUrl: '/downloads/Alkota_VACGD_Specification.pdf'
              },
              {
                model: 'CSF-10',
                series: 'Media Sand Filtration',
                power: '230V / 400V Electric',
                flow: '38 L/min (10 GPM Continuous)',
                footprint: '300 lb Media + 757 L Tank',
                highlight: 'Automated Backwash Valve',
                docUrl: 'https://alkota.com/wp-content/uploads/2024/07/Tech_Data_Water_Treatment_CFS_Media_Filtration_Alkota.pdf'
              },
              {
                model: '15/20-NG/LP',
                series: 'Thermal Evaporation Unit',
                power: 'Natural Gas / LP Propane',
                flow: '75 L/hr (20 GPH Evap)',
                footprint: '300,000 BTU Combustion Pan',
                highlight: 'Up to 95% Waste Reduction',
                docUrl: 'https://alkota.com/wp-content/uploads/2025/08/15_20-Evaporator.pdf'
              }
            ].map((spec, sIdx) => (
              <div key={sIdx} className="bg-white border border-alkota-iron p-8 flex flex-col justify-between hover:border-alkota-orange transition-all">
                <div>
                  <span className="font-ibm-plex-mono text-[9px] text-alkota-orange font-bold uppercase tracking-widest block mb-1">
                    {spec.series}
                  </span>
                  <h3 className="font-barlow-condensed text-3xl font-black text-alkota-black uppercase italic mb-4">
                    {spec.model}
                  </h3>

                  <div className="space-y-2.5 font-inter text-xs uppercase tracking-wider py-4 border-t border-b border-alkota-iron">
                    <div className="flex justify-between">
                      <span className="text-alkota-silver">Power:</span>
                      <span className="font-semibold text-alkota-black">{spec.power}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-alkota-silver">Capacity:</span>
                      <span className="font-semibold text-alkota-black">{spec.flow}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-alkota-silver">Footprint:</span>
                      <span className="font-semibold text-alkota-black">{spec.footprint}</span>
                    </div>
                  </div>

                  <div className="py-3">
                    <span className="font-ibm-plex-mono text-[10px] text-alkota-orange font-bold uppercase tracking-widest block mb-1">
                      Key Feature:
                    </span>
                    <p className="font-inter text-xs text-alkota-silver uppercase leading-relaxed">
                      {spec.highlight}
                    </p>
                  </div>
                </div>

                <a
                  href={spec.docUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-xs font-ibm-plex-mono uppercase text-alkota-black hover:text-alkota-orange transition-colors no-underline font-bold"
                >
                  <Download className="h-3.5 w-3.5 text-alkota-orange" />
                  <span>Technical Data Sheet</span>
                </a>
              </div>
            ))}
          </div>

          {/* Final Flagship Conversion Block */}
          <div className="bg-[#0E1513] text-white p-12 sm:p-20 text-center relative overflow-hidden border border-[#213831]">
            <div className="max-w-3xl mx-auto space-y-6 relative z-10">
              <span className="font-ibm-plex-mono text-[10px] font-black uppercase tracking-[0.4em] text-alkota-orange block">
                // SIX DECADES OF AMERICAN HEAVY ENGINEERING
              </span>
              <h2 className="font-barlow-condensed text-5xl sm:text-7xl font-black uppercase italic tracking-tighter leading-none text-white">
                YOUR WASH SYSTEM IS MORE <br />
                <span className="text-alkota-orange">THAN THE MACHINE.</span>
              </h2>
              <p className="font-inter text-sm sm:text-base text-[#9DBDB5] uppercase tracking-widest leading-relaxed">
                Connect directly with our UK application engineering team to size your wash pad, review drainage layouts, or design a turnkey closed-loop water treatment installation.
              </p>
              <div className="pt-6 flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact?enquiry=water-treatment"
                  className="bg-alkota-orange text-white px-10 py-5 text-xs font-black uppercase tracking-[0.3em] hover:bg-white hover:text-alkota-black transition-colors no-underline font-inter shadow-xl"
                >
                  Start Water Treatment Consultation
                </Link>
                <Link
                  href="/industrial/brief"
                  className="bg-white text-alkota-black px-10 py-5 text-xs font-black uppercase tracking-[0.3em] hover:bg-alkota-orange hover:text-white transition-colors no-underline font-inter"
                >
                  Submit Site Engineering Brief
                </Link>
              </div>
              <div className="pt-4">
                <Link
                  href="/lobby"
                  className="inline-flex items-center gap-2 font-ibm-plex-mono text-xs text-[#7A9990] hover:text-white uppercase transition-colors no-underline"
                >
                  <span>Explore The Lobby Knowledge Base & UK Compliance Guides →</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
