'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Droplets,
  Cpu,
  Layout,
  RefreshCw,
  Clock,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Settings,
  Factory,
  Layers,
  Sliders,
  FileText,
  HelpCircle,
  Truck,
  Building2,
  Wrench,
  Activity,
  Award,
  BarChart3,
  Flame
} from 'lucide-react';
import Link from 'next/link';

// ─── 01. SYSTEM ARCHITECTURES ───────────────────────────────────────────────
interface Architecture {
  id: string;
  name: string;
  badge: string;
  headline: string;
  description: string;
  typicalAssets: string;
  automationLevel: string;
  waterStrategy: string;
  throughput: string;
  keySpecs: string[];
}

const ARCHITECTURES: Architecture[] = [
  {
    id: 'manual-bay',
    name: 'Manual Industrial Wash Bay',
    badge: 'Manual Infrastructure',
    headline: 'Centralised high-pressure delivery with heavy-duty multi-bay reticulation.',
    description: 'Designed for depots and industrial yards requiring operator-controlled washing with fixed overhead 360° booms, balanced high-temperature lances, and frost-protected cabinet enclosures.',
    typicalAssets: 'HGVs, municipal vehicles, general plant, trailers, chassis.',
    automationLevel: 'Operator-Controlled with Interlocked Timers',
    waterStrategy: 'Graded bay sumps, silt separation & oil-water interception.',
    throughput: '4 to 12 vehicles per operator shift.',
    keySpecs: [
      'Overhead 360° stainless steel boom arms',
      'Centralised triplex pump skid in secure plant room',
      'Thermal cabinet or remote lance drop stations',
      'Integrated foam application manifolds'
    ]
  },
  {
    id: 'multi-operator',
    name: 'Multi-Operator Wash System',
    badge: 'Centralised Reticulation',
    headline: 'Single powerhouse plant room feeding up to 8 simultaneous operator stations.',
    description: 'Centralises heavy motor assemblies, continuous-wound Schedule 80 heating coils, and chemical metering into a dedicated plant room away from the wash apron, feeding high-pressure ring mains across multiple bays.',
    typicalAssets: 'Logistics fleets, bus depots, waste collection vehicles, mining plant.',
    automationLevel: 'Semi-Automated Pressure Balancing & On-Demand Delivery',
    waterStrategy: 'Central trench drainage with high-capacity continuous filtration.',
    throughput: 'Continuous multi-bay operational availability.',
    keySpecs: [
      'N+1 pump redundancy for zero-downtime operations',
      'PLC-managed pressure and temperature load-balancing',
      'Low-voltage operator remote touchpoints in each bay',
      'Heavy-wall Schedule 80 stainless distribution ring main'
    ]
  },
  {
    id: 'drive-through',
    name: 'Automated Drive-Through Wash',
    badge: 'High Throughput',
    headline: 'High-speed automated washing for high-frequency transport operations.',
    description: 'Optical vehicle profiling and sonar-triggered arch arrays clean commercial chassis, wheels, and side panels in under 3 minutes per vehicle as they traverse the wash apron.',
    typicalAssets: 'Buses, coaches, logistics trailers, municipal refuse trucks.',
    automationLevel: 'Fully Automated Sonar & Optical Activation',
    waterStrategy: 'High-volume closed-loop water recovery & media sand recycling.',
    throughput: 'Up to 30 vehicles per hour.',
    keySpecs: [
      'Sonar vehicle entry detection & automated sequencing',
      'Oscillating high-impact contour spray arches',
      'Automated high-pressure underbody & tyre wash bars',
      'Rapid cycle time with minimum operator intervention'
    ]
  },
  {
    id: 'conveyorised',
    name: 'Conveyorised Cleaning System',
    badge: 'Continuous Process',
    headline: 'Heavy mechanical handling with 360° synchronized high-pressure cleaning.',
    description: 'Continuous heavy-duty variable-speed conveyor systems engineered for repetitive planar assets, stripping heavy mud, grease, and biological contamination through synchronized multi-angle rotating spray arrays.',
    typicalAssets: 'Rig mats, access roadways, sheet piling, trench boxes, heavy panels.',
    automationLevel: 'Automated Variable-Speed Conveyor with Sensor Interlocks',
    waterStrategy: '100% Closed-loop continuous multi-stage recycling & solids extraction.',
    throughput: '30 to 60 units per hour continuous.',
    keySpecs: [
      'Variable-speed heavy chain or roller conveyor drive',
      '20+ synchronized rotating spray manifolds (top, bottom, sides)',
      'Dual 1,000,000 BTU thermal water heating generation',
      'Heavy solids screw conveyor for continuous mud evacuation'
    ]
  },
  {
    id: 'gantry-moving',
    name: 'Gantry / Moving Wash System',
    badge: 'Rail & Large Assets',
    headline: 'Motorized gantry traversing stationary assets with contour-tracking arches.',
    description: 'Engineered for extremely large or rail-bound assets where the vehicle remains stationary and an overhead or track-mounted gantry travels the length of the asset executing staged wash cycles.',
    typicalAssets: 'Locomotives, passenger trains, heavy mining haulers, aerospace components.',
    automationLevel: 'PLC-Controlled Automated Gantry Traversal',
    waterStrategy: 'Trackside trench collection with coalescing oil separation.',
    throughput: 'Programmed cycle times calibrated to asset length.',
    keySpecs: [
      'Precision track-guided motorized gantry carriage',
      'Multi-nozzle contouring side and roof rinse arches',
      'Chemical pre-soak, high-pressure wash, and RO rinse stages',
      'Comprehensive safety interlocks & anti-collision sensors'
    ]
  },
  {
    id: 'mat-sheet',
    name: 'Mat & Sheet Pile Cleaning Rigs',
    badge: 'Bespoke Engineering',
    headline: 'Specialist high-volume washing for temporary infrastructure and groundworks.',
    description: 'Groundwork and access matting systems return from sites encrusted with clay, aggregate, and environmental contaminants. Our specialized rigs restore assets to clean condition for re-hire or biosecure transfer.',
    typicalAssets: 'Timber and composite rig mats, steel sheet piles, trench shoring.',
    automationLevel: 'Automated Hydraulic Feed with Variable Cleaning Pressure',
    waterStrategy: 'Massive solids settlement & closed-loop clarification.',
    throughput: 'High-speed continuous cleaning to match hire turnaround.',
    keySpecs: [
      'High-flow multi-pump assemblies generating up to 40 GPM at 4,000 PSI',
      'Integrated biosecurity disinfectant dosing options',
      'Automated scraper and de-silting primary containment',
      'Robust structural steel enclosure for harsh site duty'
    ]
  },
  {
    id: 'heavy-demucking',
    name: 'Heavy Plant De-Mucking System',
    badge: 'Mining & Quarry',
    headline: 'Extreme-volume water delivery for rapid bulk mud and clay evacuation.',
    description: 'Before mechanical inspection, servicing, or highway transit, heavy earthmoving equipment must be stripped of tonnes of compacted soil. High-volume de-mucking delivers high flow (up to 80 GPM) combined with targeted pressure.',
    typicalAssets: 'Excavators, tracked dozers, dump trucks, crushers, agricultural machinery.',
    automationLevel: 'Remote Joystick Wash Monitors & Underbody Ramps',
    waterStrategy: 'High-capacity settlement lagoons with mud-hopper discharge.',
    throughput: 'Reduces de-mucking time from 4 hours to 20 minutes.',
    keySpecs: [
      'Heavy-duty industrial wash monitors (water cannons) with joystick control',
      'Multi-stage high-volume centrifugal and plunger pump arrays',
      'Reinforced drive-over steel rumble grids and wheel wash ramps',
      'High-solids slurry evacuation sumps'
    ]
  },
  {
    id: 'custom-process',
    name: 'Custom Process & Hygiene Cleaning',
    badge: 'Bespoke Engineering',
    headline: 'Sanitary Grade 316 stainless reticulation and clean-in-place (CIP) integration.',
    description: 'Custom-engineered wash stations and hygienic clean-down systems designed for food processing facilities, abattoirs, pharmaceutical production, and chemical processing facilities.',
    typicalAssets: 'Food contact containers, mixing vessels, tote boxes, process machinery.',
    automationLevel: 'Automated Recipe-Driven Thermal CIP & Sanitation',
    waterStrategy: 'Thermal heat recovery & compliant effluent neutralisation.',
    throughput: 'Calibrated to line production and shift sanitation schedules.',
    keySpecs: [
      'Full AISI 316 stainless steel frame, pipework, and manifolds',
      'High-temperature 95°C water plus 140°C dry steam generation',
      'Automated sanitiser manifold and chemical dosing integration',
      'IP66 stainless wash-down control enclosures'
    ]
  }
];

// ─── 02. ANATOMY OF A WASH PLANT (12 STAGES) ────────────────────────────────
interface Stage {
  num: string;
  name: string;
  subtitle: string;
  description: string;
  optional: boolean;
}

const STAGES: Stage[] = [
  {
    num: '01',
    name: 'Asset Entry & Positioning',
    subtitle: 'Traffic Control & Approach',
    description: 'Optical sensors, ground loops, and guidance curbing ensure the asset is safely positioned with correct clearances before wash sequence initialization.',
    optional: false
  },
  {
    num: '02',
    name: 'Pre-Wash / Bulk De-Muck',
    subtitle: 'High-Volume Stripping',
    description: 'High-volume low-pressure flood arches or wash monitors soften compacted mud, road salt, and heavy aggregate prior to detergent application.',
    optional: true
  },
  {
    num: '03',
    name: 'Chemical & Detergent Application',
    subtitle: 'Low-Pressure Foam Dwell',
    description: 'Automated chemical proportioners apply clinging alkaline foam or degreasing agents to break down traffic film and hydrocarbon bonds.',
    optional: true
  },
  {
    num: '04',
    name: 'Primary High-Pressure Wash',
    subtitle: 'Schedule 80 Thermal Power',
    description: 'Continuous-wound thermal heating coils deliver water at up to 95°C and 345 BAR across oscillating spray arches or manual lance drops.',
    optional: false
  },
  {
    num: '05',
    name: 'Underbody & Wheel Wash',
    subtitle: 'Chassis Integrity',
    description: 'Targeted high-pressure spinner nozzles flush wheel arches, brake assemblies, axles, and under-chassis cavities from below-ground spray bars.',
    optional: true
  },
  {
    num: '06',
    name: 'Effluent Containment & Collection',
    subtitle: 'Impermeable Sump Grids',
    description: 'Graded impermeable concrete bays and heavy-duty galvanized trench gratings route all wash water into primary collection sumps.',
    optional: false
  },
  {
    num: '07',
    name: 'Solids Separation & Settling',
    subtitle: 'Sediment Baskets & Traps',
    description: 'Gravity settlement pits, sediment baskets, and automated screw conveyors remove heavy gravel, sand, and suspended silt down to 50 microns.',
    optional: true
  },
  {
    num: '08',
    name: 'Oil & Contaminant Management',
    subtitle: 'BS EN 858 Separation',
    description: 'Coalescing plate interceptors and floating surface skimmers strip free petroleum hydrocarbons and oily films from the effluent stream.',
    optional: true
  },
  {
    num: '09',
    name: 'Water Treatment & Filtration',
    subtitle: 'Multi-Media Purification',
    description: 'Deep-bed silica sand, multi-stage cartridge polishing, or vacuum filtration systems remove fine particulate and chemical residues.',
    optional: true
  },
  {
    num: '10',
    name: 'Buffer Storage & Closed-Loop Reuse',
    subtitle: 'Sustainable Recirculation',
    description: 'Treated water is transferred to high-capacity holding reservoirs with automated level controls, supplying up to 90% recycled water back to the pumps.',
    optional: true
  },
  {
    num: '11',
    name: 'Automation & PLC Master Controls',
    subtitle: 'Industrial Instrumentation',
    description: 'IP66 PLC control suites govern pump sequencing, variable speed drives, interlocks, temperature modulation, cycle logs, and safety systems.',
    optional: false
  },
  {
    num: '12',
    name: 'Asset Exit & Clearance',
    subtitle: 'Operational Handover',
    description: 'Automated exit barriers open, wash counters increment, and throughput telemetry records the completed cycle into the site operations register.',
    optional: false
  }
];

// ─── 03. ENGINEERING PROCESS (12 STEPS) ─────────────────────────────────────
const ENGINEERING_STEPS = [
  { step: '01', title: 'Operational Discovery', desc: 'Throughput modelling, asset geometry review, and contamination profiling.' },
  { step: '02', title: 'Site Feasibility Survey', desc: 'Power verification, drainage assessment, and civil works review.' },
  { step: '03', title: 'Concept Engineering', desc: 'Process flow diagrams, hydraulic sizing, and initial GA layouts.' },
  { step: '04', title: 'Environmental Scoping', desc: 'Water balance calculations, trade effluent strategy, and closed-loop design.' },
  { step: '05', title: 'Detailed CAD Design', desc: 'Mechanical, electrical, PLC control architecture, and pipe reticulation.' },
  { step: '06', title: 'Workshop Fabrication', desc: 'Heavy-gauge steel frames, Schedule 80 coils, and pump skid assembly.' },
  { step: '07', title: 'Factory Acceptance Test', desc: 'Rigorous 48-hour pressure, electrical, and sensor validation prior to dispatch.' },
  { step: '08', title: 'Site Mechanical Install', desc: 'Pipework reticulation, gantry placement, and plant room fit-out.' },
  { step: '09', title: 'Commissioning & SAT', desc: 'Flow calibration, temperature tuning, and full operational cycle sign-off.' },
  { step: '10', title: 'Operator & EHS Training', desc: 'Safety protocols, daily pre-checks, and emergency response procedures.' },
  { step: '11', title: 'Handover & Documentation', desc: 'Full O&M manuals, asset registers, and electrical schematic delivery.' },
  { step: '12', title: 'Lifecycle PPM Support', desc: 'Planned preventative maintenance, critical spares holding, and telemetry.' }
];

// ─── 04. APPLICATION SECTORS ────────────────────────────────────────────────
const SECTORS = [
  {
    name: 'Heavy Plant & Mining',
    desc: 'Aggressive de-mucking and chassis washing for earthmoving fleets, quarry equipment, and tracked excavators. Engineered for extreme solids loading.',
    aspects: ['High-flow wash monitors', 'Heavy solids screw conveyors', 'Chassis flush arrays']
  },
  {
    name: 'Fleet & Logistics Depots',
    desc: 'High-throughput multi-bay or drive-through wash installations for HGVs, tractor units, and distribution trailers. Zero-downtime N+1 reliability.',
    aspects: ['Simultaneous multi-operator bays', '360° overhead boom arms', 'Rapid chemical foam systems']
  },
  {
    name: 'Rail & Depot Systems',
    desc: 'Bespoke train wash plants, undercarriage bogie cleaning, and depot maintenance wash rooms engineered to rail safety standards.',
    aspects: ['Profile-tracking wash gantries', 'Demineralised final rinse', 'Depot-integrated drainage']
  },
  {
    name: 'Construction & Civil Engineering',
    desc: 'Wash bay infrastructure for highway compliance, wheel wash systems, and plant cleaning before leaving construction sites.',
    aspects: ['Automatic wheel wash ramps', 'Closed-loop silt recovery', 'Mobile & permanent options']
  },
  {
    name: 'Rig & Access Matting',
    desc: 'Specialist automated conveyor systems cleaning timber and composite roadways at high speed with closed-loop water recycling.',
    aspects: ['Variable-speed conveyor drive', '20+ rotating spray manifolds', 'Clay & silt evacuation']
  },
  {
    name: 'Manufacturing & Process',
    desc: 'Hygienic Grade 316 stainless steel wash plants for food, dairy, and manufacturing. High-temperature thermal sanitation up to 95°C and steam.',
    aspects: ['Full AISI 316 construction', 'CIP system integration', 'Chemical dosing manifolds']
  }
];

export default function WashPlantPage() {
  const [selectedArchIdx, setSelectedArchIdx] = useState<number>(3); // Default to conveyorised
  const selectedArch = ARCHITECTURES[selectedArchIdx];

  return (
    <main className="min-h-screen bg-alkota-bg text-alkota-black">
      <Navigation />

      {/* ── CHAPTER 01: CINEMATIC FULL-SCREEN HERO ────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-between bg-[#111] text-white pt-32 pb-16 px-6 sm:px-12 overflow-hidden">
        {/* Background Image / Texture slot */}
        <div 
          className="absolute inset-0 bg-cover bg-center filter brightness-[0.35] opacity-60 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(255,105,0,0.15), transparent 60%), linear-gradient(to bottom, #0A0A0A, #141414)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-transparent pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl w-full">
          <Breadcrumbs items={[{ label: 'Wash Plant Infrastructure' }]} />

          <div className="mt-12 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-[2px] w-12 bg-alkota-orange" />
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.4em] text-alkota-orange">
                // CAPITAL EQUIPMENT & INFRASTRUCTURE DIVISION
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="font-extralight text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tight text-white leading-[0.9] mb-8"
            >
              INDUSTRIAL CLEANING. <br />
              <span className="text-alkota-orange">ENGINEERED AS INFRASTRUCTURE.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg text-alkota-steel max-w-2xl leading-relaxed mb-10"
            >
              Alkota engineers turnkey industrial wash systems around your specific assets, contamination profile, throughput demands, site footprint, water treatment strategy, and lifecycle support. Every installation is site-specific.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Link
                href="/wash-plant/architect"
                className="inline-flex items-center gap-3 bg-alkota-orange text-white px-8 py-4 text-xs uppercase tracking-[0.25em] hover:bg-white hover:text-alkota-black transition-all"
              >
                <span>Launch Wash Plant Architect</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#architectures"
                className="inline-flex items-center gap-3 border border-white/30 bg-white/5 text-white px-8 py-4 text-xs uppercase tracking-[0.25em] hover:border-white hover:bg-white hover:text-black transition-all"
              >
                <span>Explore Architectures</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Hero Trust Detail Footer */}
        <div className="relative z-10 mx-auto max-w-7xl w-full pt-12 border-t border-white/10 mt-12 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs font-ibm-plex-mono text-alkota-silver uppercase tracking-widest">
          <div className="flex items-center gap-6">
            <span>DESIGN</span>
            <span>·</span>
            <span>ENGINEERING</span>
            <span>·</span>
            <span>FABRICATION</span>
            <span>·</span>
            <span>INSTALLATION</span>
            <span>·</span>
            <span>COMMISSIONING</span>
            <span>·</span>
            <span>PPM LIFECYCLE</span>
          </div>
          <div className="text-alkota-orange">
            // PROJECTS £100K — £1M+ CAPEX
          </div>
        </div>
      </section>

      {/* ── CHAPTER 02: THIS IS NOT A PRESSURE WASHER ─────────────────────── */}
      <section className="py-24 px-6 sm:px-12 bg-white border-b border-alkota-iron">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.35em] text-alkota-orange block mb-3">
                // SYSTEMIC ENGINEERING
              </span>
              <h2 className="font-extralight text-4xl sm:text-5xl uppercase tracking-tight text-alkota-black leading-tight">
                A wash plant is a production system.
              </h2>
            </div>

            <div className="lg:col-span-7 space-y-6 text-sm text-alkota-silver leading-relaxed">
              <p className="text-base text-alkota-black">
                When a facility must process vehicles, rolling stock, roadway matting, sheet piling, or industrial components through repeated high-intensity cleaning cycles, the correct solution depends on far more than PSI.
              </p>
              <p>
                A high-pressure washer is an individual tool. A wash plant is an integrated infrastructure asset: combining heavy mechanical reticulation, thermal water generation, automatic sequencing, civils interfaces, solids evacuation, oil separation, water recycling, and long-term asset management.
              </p>
              <p>
                We design systems from first principles — calculating asset geometry, cycle dwell time, effluent loading, and power constraints to guarantee operational continuity and statutory environmental compliance.
              </p>

              {/* Scoping Pillars */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 font-ibm-plex-mono text-[11px] uppercase tracking-wider text-alkota-black">
                <div className="p-3 bg-alkota-bg border border-alkota-iron">
                  <span className="text-alkota-orange block mb-1">01</span> Throughput & Dwell
                </div>
                <div className="p-3 bg-alkota-bg border border-alkota-iron">
                  <span className="text-alkota-orange block mb-1">02</span> Contamination Profile
                </div>
                <div className="p-3 bg-alkota-bg border border-alkota-iron">
                  <span className="text-alkota-orange block mb-1">03</span> Water Recovery Strategy
                </div>
                <div className="p-3 bg-alkota-bg border border-alkota-iron">
                  <span className="text-alkota-orange block mb-1">04</span> Automation Level
                </div>
                <div className="p-3 bg-alkota-bg border border-alkota-iron">
                  <span className="text-alkota-orange block mb-1">05</span> Site & Civils Interface
                </div>
                <div className="p-3 bg-alkota-bg border border-alkota-iron">
                  <span className="text-alkota-orange block mb-1">06</span> Lifecycle Availability
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CHAPTER 03: SYSTEM ARCHITECTURES SELECTOR ─────────────────────── */}
      <section id="architectures" className="py-24 px-6 sm:px-12 bg-alkota-bg border-b border-alkota-iron">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.35em] text-alkota-orange block mb-2">
              // ARCHITECTURAL FAMILIES
            </span>
            <h2 className="font-extralight text-4xl sm:text-6xl uppercase tracking-tight text-alkota-black">
              What can a wash plant be?
            </h2>
            <p className="text-xs text-alkota-silver uppercase tracking-widest mt-2">
              Select an architecture to inspect mechanical configuration and typical deployment profiles.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Selector List */}
            <div className="lg:col-span-5 space-y-1.5">
              {ARCHITECTURES.map((arch, idx) => {
                const isSelected = idx === selectedArchIdx;
                return (
                  <button
                    key={arch.id}
                    onClick={() => setSelectedArchIdx(idx)}
                    className={`w-full text-left p-4 transition-all flex items-center justify-between border ${
                      isSelected
                        ? 'bg-alkota-black text-white border-alkota-black shadow-md'
                        : 'bg-white text-alkota-black border-alkota-iron hover:border-alkota-orange'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[9px] font-ibm-plex-mono uppercase tracking-widest px-2 py-0.5 ${
                          isSelected ? 'bg-alkota-orange text-white' : 'bg-alkota-bg text-alkota-silver'
                        }`}>
                          {arch.badge}
                        </span>
                      </div>
                      <h4 className="text-sm uppercase tracking-tight">
                        {arch.name}
                      </h4>
                    </div>
                    <ChevronRight className={`h-4 w-4 transition-transform ${
                      isSelected ? 'text-alkota-orange translate-x-1' : 'text-alkota-silver'
                    }`} />
                  </button>
                );
              })}
            </div>

            {/* Right Architecture Detail Panel */}
            <div className="lg:col-span-7 bg-white border border-alkota-iron p-8 sm:p-10 shadow-sm flex flex-col justify-between min-h-[560px]">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-alkota-iron/60 mb-6">
                  <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange">
                    // SPECIFICATION PROFILE
                  </span>
                  <span className="text-xs font-ibm-plex-mono text-alkota-silver uppercase tracking-widest">
                    {selectedArch.badge}
                  </span>
                </div>

                <h3 className="font-extralight text-2xl sm:text-3xl uppercase tracking-tight text-alkota-black mb-3">
                  {selectedArch.name}
                </h3>
                <p className="text-sm text-alkota-black leading-snug mb-4">
                  {selectedArch.headline}
                </p>
                <p className="text-xs sm:text-sm text-alkota-silver leading-relaxed mb-8">
                  {selectedArch.description}
                </p>

                {/* Key Spec Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 bg-alkota-bg p-5 border border-alkota-iron/60 text-xs">
                  <div>
                    <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-silver block mb-1">
                      Typical Assets
                    </span>
                    <p className="text-alkota-black">{selectedArch.typicalAssets}</p>
                  </div>
                  <div>
                    <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-silver block mb-1">
                      Automation Level
                    </span>
                    <p className="text-alkota-black">{selectedArch.automationLevel}</p>
                  </div>
                  <div>
                    <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-silver block mb-1">
                      Water Strategy
                    </span>
                    <p className="text-alkota-black">{selectedArch.waterStrategy}</p>
                  </div>
                  <div>
                    <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-silver block mb-1">
                      Throughput Profile
                    </span>
                    <p className="text-alkota-black">{selectedArch.throughput}</p>
                  </div>
                </div>

                {/* Capabilities List */}
                <div className="space-y-2 mb-8">
                  <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange block mb-2">
                    Core Mechanical Elements:
                  </span>
                  {selectedArch.keySpecs.map((spec, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-2.5 text-xs text-alkota-black uppercase tracking-wide">
                      <CheckCircle2 className="h-3.5 w-3.5 text-alkota-orange shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-alkota-iron/60 flex flex-wrap items-center justify-between gap-4">
                <span className="text-[11px] font-ibm-plex-mono text-alkota-silver uppercase tracking-widest">
                  Every project is engineered bespoke.
                </span>
                <Link
                  href="/wash-plant/architect"
                  className="inline-flex items-center gap-2 bg-alkota-orange text-white px-6 py-3 text-xs uppercase tracking-widest hover:bg-alkota-black transition-colors"
                >
                  <span>Scope This Architecture</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CHAPTER 04: ANATOMY OF A WASH PLANT (SYSTEM MAP) ──────────────── */}
      <section className="py-24 px-6 sm:px-12 bg-[#0D0D0D] text-white border-b border-[#222]">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl mb-16">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.35em] text-alkota-orange block mb-2">
              // COMPLETE SYSTEM INTEGRATION
            </span>
            <h2 className="font-extralight text-4xl sm:text-6xl uppercase tracking-tight text-white mb-4">
              Anatomy of a Wash Plant.
            </h2>
            <p className="text-sm text-alkota-silver leading-relaxed">
              The cleaning equipment and the water infrastructure are designed together. Below are the 12 functional stages of a comprehensive high-throughput industrial wash installation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {STAGES.map((stage) => (
              <div
                key={stage.num}
                className="bg-[#141414] border border-[#222] p-6 flex flex-col justify-between hover:border-alkota-orange transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-extralight text-3xl text-alkota-orange">
                      {stage.num}
                    </span>
                    {stage.optional && (
                      <span className="font-ibm-plex-mono text-[8px] uppercase tracking-widest text-[#888] bg-[#222] px-2 py-0.5 border border-[#333]">
                        Project Dependent
                      </span>
                    )}
                  </div>
                  <h3 className="font-light text-lg uppercase tracking-tight text-white mb-1">
                    {stage.name}
                  </h3>
                  <span className="font-ibm-plex-mono text-[10px] text-alkota-orange uppercase tracking-wider block mb-3">
                    {stage.subtitle}
                  </span>
                  <p className="text-xs text-[#999] leading-relaxed">
                    {stage.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Direct Water Treatment Bridge */}
          <div className="mt-12 p-8 bg-[#181818] border border-[#2A2A2A] flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1 max-w-2xl">
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block">
                // CLOSED-LOOP COMPLIANCE & WATER RECOVERY
              </span>
              <h4 className="text-lg uppercase text-white font-light">
                Need detailed water filtration, vacuum recovery, or trade effluent solutions?
              </h4>
              <p className="text-xs text-[#888]">
                Explore our full water treatment technology range including media sand filtration, oil separators, and vacuum scuppers.
              </p>
            </div>
            <Link
              href="/water-treatment"
              className="inline-flex items-center gap-2 bg-white text-alkota-black px-6 py-3 text-xs uppercase tracking-widest hover:bg-alkota-orange hover:text-white transition-colors shrink-0"
            >
              <span>Explore Water Treatment</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CHAPTER 05: WASH PLANT ARCHITECT (SCOPING TOOL CALLOUT) ────────── */}
      <section className="py-20 px-6 sm:px-12 bg-white border-b border-alkota-iron">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 bg-[#121212] text-white overflow-hidden shadow-xl">
            {/* Left Content */}
            <div className="lg:col-span-7 p-8 sm:p-14 flex flex-col justify-between">
              <div>
                <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.35em] text-alkota-orange block mb-3">
                  // THE PROJECT SCOPING TOOL
                </span>
                <h2 className="font-extralight text-4xl sm:text-5xl uppercase tracking-tight text-white mb-4 leading-tight">
                  The Wash Plant Architect.
                </h2>
                <p className="text-sm text-alkota-steel leading-relaxed mb-8">
                  Not an instant online shopping basket. Industrial wash plants are complex engineered capital projects. The Wash Plant Architect allows you to structure your asset profile, throughput demands, water constraints, and site requirements into a preliminary engineering project brief.
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/10">
                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href="/wash-plant/architect"
                    className="inline-flex items-center gap-3 bg-alkota-orange text-white px-8 py-4 text-xs uppercase tracking-[0.25em] hover:bg-white hover:text-alkota-black transition-colors"
                  >
                    <span>Start Scoping Brief (9 Steps)</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/lobby"
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-alkota-silver hover:text-white transition-colors"
                  >
                    <span>Read Technical Guides in The Lobby →</span>
                  </Link>
                </div>
                <span className="block font-ibm-plex-mono text-[9px] text-[#666] uppercase tracking-widest">
                  Generates branded PDF brief & routes directly to Alkota engineering
                </span>
              </div>
            </div>

            {/* Right Steps Visual */}
            <div className="lg:col-span-5 bg-[#181818] p-8 sm:p-12 border-l border-white/10 flex flex-col justify-center">
              <span className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.25em] text-alkota-orange block mb-6">
                // 9-STEP SCOPING FRAMEWORK
              </span>
              <div className="space-y-2.5 font-ibm-plex-mono text-xs text-[#aaa]">
                <div className="flex items-center justify-between p-2 bg-[#101010] border border-[#222]">
                  <span>01. ASSET PROFILE</span>
                  <span className="text-alkota-orange">Vehicles, Plant, Mats</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-[#101010] border border-[#222]">
                  <span>02. GEOMETRY & DATA</span>
                  <span className="text-[#666]">Dimensions, No-Spray</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-[#101010] border border-[#222]">
                  <span>03. THROUGHPUT</span>
                  <span className="text-alkota-orange">Units/hr, Shift Hours</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-[#101010] border border-[#222]">
                  <span>04. CONTAMINATION</span>
                  <span className="text-[#666]">Mud, Bitumen, Salt</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-[#101010] border border-[#222]">
                  <span>05. ARCHITECTURE</span>
                  <span className="text-alkota-orange">Manual vs Automated</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-[#101010] border border-[#222]">
                  <span>06. WATER & RECOVERY</span>
                  <span className="text-[#666]">Mains, Closed-Loop</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-[#101010] border border-[#222]">
                  <span>07. SITE & CIVILS</span>
                  <span className="text-[#666]">Footprint, Power</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-[#101010] border border-[#222]">
                  <span>08. PROJECT STAGE</span>
                  <span className="text-alkota-orange">Budget, Tender, Stage</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-[#101010] border border-[#222]">
                  <span>09. LIFECYCLE PPM</span>
                  <span className="text-[#666]">Spares, SLA, Response</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CHAPTER 06: AUTOMATION & CONTROLS ─────────────────────────────── */}
      <section className="py-24 px-6 sm:px-12 bg-white border-b border-alkota-iron">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.35em] text-alkota-orange block">
                // AUTOMATION & CONTROLS
              </span>
              <h2 className="font-extralight text-4xl sm:text-5xl uppercase tracking-tight text-alkota-black leading-tight">
                Industrial instrumentation. <br />
                <span className="text-alkota-orange">Engineered reliability.</span>
              </h2>
              <p className="text-sm text-alkota-silver leading-relaxed">
                Modern industrial wash plants operate as integrated process control systems. We design bespoke electrical and automation architectures utilizing industrial PLCs, variable speed drives, optical profiling sensors, and safety interlocks.
              </p>
              <p className="text-sm text-alkota-silver leading-relaxed">
                Where specified, wash systems are delivered <strong className="text-alkota-black font-normal">remote monitoring capable</strong> — structured to accommodate live telemetry for operating hours, cycle counters, filter differentials, and predictive maintenance alerts.
              </p>

              <div className="pt-2">
                <Link
                  href="/contact?enquiry=automation-consultation"
                  className="inline-flex items-center gap-2 text-xs font-ibm-plex-mono uppercase tracking-widest text-alkota-black hover:text-alkota-orange transition-colors"
                >
                  <span>Discuss PLC & Automation Specifications →</span>
                </Link>
              </div>
            </div>

            {/* Automation Grid */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-3 font-ibm-plex-mono text-xs uppercase tracking-wider text-alkota-black">
              <div className="p-4 bg-alkota-bg border border-alkota-iron">
                <Cpu className="h-5 w-5 text-alkota-orange mb-2" />
                <span className="block text-alkota-black">PLC Master Control</span>
                <span className="text-[10px] text-alkota-silver">Siemens / Mitsubishi / Allen-Bradley</span>
              </div>
              <div className="p-4 bg-alkota-bg border border-alkota-iron">
                <Sliders className="h-5 w-5 text-alkota-orange mb-2" />
                <span className="block text-alkota-black">Variable Speed Drives</span>
                <span className="text-[10px] text-alkota-silver">Soft-start & pressure ramping</span>
              </div>
              <div className="p-4 bg-alkota-bg border border-alkota-iron">
                <Layers className="h-5 w-5 text-alkota-orange mb-2" />
                <span className="block text-alkota-black">Sonar & Optical Profiling</span>
                <span className="text-[10px] text-alkota-silver">Asset detection & zone firing</span>
              </div>
              <div className="p-4 bg-alkota-bg border border-alkota-iron">
                <Activity className="h-5 w-5 text-alkota-orange mb-2" />
                <span className="block text-alkota-black">Safety Interlocks</span>
                <span className="text-[10px] text-alkota-silver">Category 4 E-stop architectures</span>
              </div>
              <div className="p-4 bg-alkota-bg border border-alkota-iron">
                <BarChart3 className="h-5 w-5 text-alkota-orange mb-2" />
                <span className="block text-alkota-black">Wash Recipes</span>
                <span className="text-[10px] text-alkota-silver">Touchscreen HMI cycle presets</span>
              </div>
              <div className="p-4 bg-alkota-bg border border-alkota-iron">
                <Zap className="h-5 w-5 text-alkota-orange mb-2" />
                <span className="block text-alkota-black">Telemetry Ready</span>
                <span className="text-[10px] text-alkota-silver">Cloud diagnostics integration</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CHAPTER 07: APPLICATION SECTORS ───────────────────────────────── */}
      <section className="py-24 px-6 sm:px-12 bg-alkota-bg border-b border-alkota-iron">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 max-w-3xl">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.35em] text-alkota-orange block mb-2">
              // SECTOR CAPABILITIES
            </span>
            <h2 className="font-extralight text-4xl sm:text-6xl uppercase tracking-tight text-alkota-black">
              Built for demanding applications.
            </h2>
            <p className="text-xs text-alkota-silver uppercase tracking-widest mt-2">
              Engineering solutions calibrated to specific operational environments across the UK.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SECTORS.map((sec, idx) => (
              <div
                key={idx}
                className="bg-white border border-alkota-iron p-8 flex flex-col justify-between hover:border-alkota-orange transition-all shadow-sm"
              >
                <div>
                  <span className="font-ibm-plex-mono text-[10px] text-alkota-orange block mb-2">
                    0{idx + 1} //
                  </span>
                  <h3 className="font-extralight text-2xl uppercase tracking-tight text-alkota-black mb-3">
                    {sec.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-alkota-silver leading-relaxed mb-6">
                    {sec.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-alkota-iron/60 space-y-1.5 font-ibm-plex-mono text-[10px] text-alkota-black uppercase tracking-wider">
                  {sec.aspects.map((asp, aIdx) => (
                    <div key={aIdx} className="flex items-center gap-2">
                      <div className="h-1 w-1 bg-alkota-orange rounded-full" />
                      <span>{asp}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CHAPTER 08: ENGINEERING WORKFLOW & PROCESS ─────────────────────── */}
      <section className="py-24 px-6 sm:px-12 bg-[#0D0D0D] text-white border-b border-[#222]">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.35em] text-alkota-orange block mb-2">
              // STRUCTURED CAPITAL DELIVERY
            </span>
            <h2 className="font-extralight text-4xl sm:text-6xl uppercase tracking-tight text-white mb-4">
              From discovery to lifecycle support.
            </h2>
            <p className="text-xs text-[#888] uppercase tracking-widest">
              Every major capital installation follows a rigorous 12-stage engineering methodology.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#222] border border-[#222]">
            {ENGINEERING_STEPS.map((step) => (
              <div key={step.step} className="bg-[#111] p-6 sm:p-8 flex flex-col justify-between hover:bg-[#161616] transition-colors">
                <div>
                  <span className="font-extralight text-4xl text-alkota-orange block mb-3">
                    {step.step}
                  </span>
                  <h4 className="font-light text-base uppercase tracking-tight text-white mb-2">
                    {step.title}
                  </h4>
                </div>
                <p className="text-xs text-[#888] leading-relaxed mt-4">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CHAPTER 09: CASE STUDIES & PROJECTS ───────────────────────────── */}
      <section className="py-24 px-6 sm:px-12 bg-white border-b border-alkota-iron">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.35em] text-alkota-orange block mb-2">
                // REAL PROJECT ARCHIVE
              </span>
              <h2 className="font-extralight text-4xl sm:text-6xl uppercase tracking-tight text-alkota-black">
                Wash plant projects.
              </h2>
            </div>
            <Link
              href="/wash-plant/projects"
              className="inline-flex items-center gap-2 font-ibm-plex-mono text-xs uppercase tracking-widest text-alkota-orange hover:text-alkota-black transition-colors"
            >
              <span>View Full Project Archive →</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-alkota-bg border border-alkota-iron p-8 flex flex-col justify-between">
              <div>
                <span className="font-ibm-plex-mono text-[9px] bg-alkota-black text-white px-2.5 py-1 uppercase tracking-widest inline-block mb-4">
                  FLEET & LOGISTICS
                </span>
                <h3 className="font-extralight text-2xl uppercase tracking-tight text-alkota-black mb-2">
                  4-Bay Centralised Fleet Depot
                </h3>
                <p className="text-xs text-alkota-silver leading-relaxed mb-6">
                  Turnkey multi-bay installation featuring dual triplex pump skids in a secure plant room, overhead 360° stainless boom arms, and automatic underbody chassis rinse.
                </p>
              </div>
              <div className="pt-4 border-t border-alkota-iron/60 text-xs font-ibm-plex-mono text-alkota-black flex items-center justify-between">
                <span>Throughput: 60 HGVs/day</span>
                <Link href="/wash-plant/projects" className="text-alkota-orange hover:underline">Details →</Link>
              </div>
            </div>

            <div className="bg-alkota-bg border border-alkota-iron p-8 flex flex-col justify-between">
              <div>
                <span className="font-ibm-plex-mono text-[9px] bg-alkota-black text-white px-2.5 py-1 uppercase tracking-widest inline-block mb-4">
                  GROUNDWORKS & ACCESS
                </span>
                <h3 className="font-extralight text-2xl uppercase tracking-tight text-alkota-black mb-2">
                  Automated 360° Rig Mat Washer
                </h3>
                <p className="text-xs text-alkota-silver leading-relaxed mb-6">
                  Continuous variable-speed conveyor cleaning system with 20 rotating spray bars, 100% closed-loop media filtration, and continuous solids screw evacuation.
                </p>
              </div>
              <div className="pt-4 border-t border-alkota-iron/60 text-xs font-ibm-plex-mono text-alkota-black flex items-center justify-between">
                <span>Throughput: 45 mats/hr</span>
                <Link href="/wash-plant/projects" className="text-alkota-orange hover:underline">Details →</Link>
              </div>
            </div>

            <div className="bg-alkota-bg border border-alkota-iron p-8 flex flex-col justify-between">
              <div>
                <span className="font-ibm-plex-mono text-[9px] bg-alkota-black text-white px-2.5 py-1 uppercase tracking-widest inline-block mb-4">
                  MINING & QUARRY
                </span>
                <h3 className="font-extralight text-2xl uppercase tracking-tight text-alkota-black mb-2">
                  Heavy Plant De-Mucking System
                </h3>
                <p className="text-xs text-alkota-silver leading-relaxed mb-6">
                  High-volume 80 GPM water monitors with remote joystick operator stations, drive-over rumble grids, and deep settlement pit interception.
                </p>
              </div>
              <div className="pt-4 border-t border-alkota-iron/60 text-xs font-ibm-plex-mono text-alkota-black flex items-center justify-between">
                <span>Throughput: 15 mins/dumper</span>
                <Link href="/wash-plant/projects" className="text-alkota-orange hover:underline">Details →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CHAPTER 10: LIFECYCLE SERVICE DIVISIONS (3 PILLARS) ───────────── */}
      <section className="py-24 px-6 sm:px-12 bg-alkota-bg border-b border-alkota-iron">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.35em] text-alkota-orange block mb-2">
              // LIFECYCLE EXCELLENCE
            </span>
            <h2 className="font-extralight text-4xl sm:text-6xl uppercase tracking-tight text-alkota-black">
              Beyond Handover.
            </h2>
            <p className="text-xs text-alkota-silver uppercase tracking-widest mt-2">
              We design, build, commission, maintain, manage, and upgrade high-value wash infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 1. Service & Maintenance */}
            <div className="bg-[#111] text-white p-8 flex flex-col justify-between border border-[#222] hover:border-alkota-orange transition-colors">
              <div>
                <Wrench className="h-8 w-8 text-alkota-orange mb-6" />
                <span className="font-ibm-plex-mono text-[9px] text-alkota-orange uppercase tracking-widest block mb-2">
                  01 // AVAILABILITY
                </span>
                <h3 className="font-extralight text-2xl uppercase tracking-tight text-white mb-3">
                  Service & Maintenance
                </h3>
                <p className="text-xs text-alkota-steel leading-relaxed mb-6">
                  Planned preventative maintenance, emergency reactive callouts, high-pressure pump overhauls, burner servicing, and third-party plant support.
                </p>
              </div>
              <Link
                href="/wash-plant/service-maintenance"
                className="inline-flex items-center gap-2 text-xs font-ibm-plex-mono uppercase tracking-widest text-alkota-orange hover:text-white transition-colors pt-4 border-t border-white/10"
              >
                <span>Explore Service Agreements →</span>
              </Link>
            </div>

            {/* 2. Asset Management */}
            <div className="bg-[#111] text-white p-8 flex flex-col justify-between border border-[#222] hover:border-alkota-orange transition-colors">
              <div>
                <Activity className="h-8 w-8 text-alkota-orange mb-6" />
                <span className="font-ibm-plex-mono text-[9px] text-alkota-orange uppercase tracking-widest block mb-2">
                  02 // ASSET GOVERNANCE
                </span>
                <h3 className="font-extralight text-2xl uppercase tracking-tight text-white mb-3">
                  PPM & Asset Management
                </h3>
                <p className="text-xs text-alkota-steel leading-relaxed mb-6">
                  Digital asset registers, configurable PPM frequencies, critical spares strategies, visit reports, and data-ready telemetry tracking.
                </p>
              </div>
              <Link
                href="/wash-plant/asset-management"
                className="inline-flex items-center gap-2 text-xs font-ibm-plex-mono uppercase tracking-widest text-alkota-orange hover:text-white transition-colors pt-4 border-t border-white/10"
              >
                <span>Explore Asset Management →</span>
              </Link>
            </div>

            {/* 3. Refurbishment & Upgrades */}
            <div className="bg-[#111] text-white p-8 flex flex-col justify-between border border-[#222] hover:border-alkota-orange transition-colors">
              <div>
                <RefreshCw className="h-8 w-8 text-alkota-orange mb-6" />
                <span className="font-ibm-plex-mono text-[9px] text-alkota-orange uppercase tracking-widest block mb-2">
                  03 // LIFE EXTENSION
                </span>
                <h3 className="font-extralight text-2xl uppercase tracking-tight text-white mb-3">
                  Refurbishment & Upgrades
                </h3>
                <p className="text-xs text-alkota-steel leading-relaxed mb-6">
                  Brownfield engineering inside operational facilities: pump replacements, PLC migrations, water recycling retrofits, and life-extension overhauls.
                </p>
              </div>
              <Link
                href="/wash-plant/refurbishment-upgrades"
                className="inline-flex items-center gap-2 text-xs font-ibm-plex-mono uppercase tracking-widest text-alkota-orange hover:text-white transition-colors pt-4 border-t border-white/10"
              >
                <span>Explore Refurbishment →</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CHAPTER 11: SPECIFY ALKOTA & FINAL CTA ─────────────────────────── */}
      <section className="py-24 px-6 sm:px-12 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="bg-alkota-black text-white p-10 sm:p-16 relative overflow-hidden">
            <div className="relative z-10 max-w-3xl space-y-6">
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.4em] text-alkota-orange block">
                // SPECIFIER & CONSULTANT ENGAGEMENT
              </span>
              <h2 className="font-extralight text-4xl sm:text-6xl uppercase tracking-tight text-white leading-none">
                Start a Wash Plant Project.
              </h2>
              <p className="text-sm sm:text-base text-alkota-steel leading-relaxed">
                Connect directly with Alkota UK application engineering to review site plans, discuss throughput requirements, calculate water recovery strategies, or schedule an on-site feasibility survey.
              </p>

              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  href="/wash-plant/architect"
                  className="bg-alkota-orange text-white px-8 py-4 text-xs uppercase tracking-[0.25em] hover:bg-white hover:text-alkota-black transition-colors"
                >
                  Launch Scoping Tool
                </Link>
                <Link
                  href="/contact?enquiry=wash-plant-spec"
                  className="border border-white/30 bg-white/5 text-white px-8 py-4 text-xs uppercase tracking-[0.25em] hover:bg-white hover:text-alkota-black transition-colors"
                >
                  Request Technical Consultation
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
