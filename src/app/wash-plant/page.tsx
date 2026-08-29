'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import WashPlantSubNav from '@/components/wash-plant/WashPlantSubNav';
import WashPlantCapabilityBadge from '@/components/wash-plant/WashPlantCapabilityBadge';
import WashPlantSpecifierCta from '@/components/wash-plant/WashPlantSpecifierCta';
import WashPlantSchema from '@/components/wash-plant/WashPlantSchema';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Droplets,
  Cpu,
  Layout,
  RefreshCw,
  Clock,
  CheckCircle2,
  ChevronRight,
  Settings,
  Factory,
  Layers,
  Sliders,
  FileText,
  Truck,
  Building2,
  Wrench,
  Activity,
  Award,
  BarChart3,
  Flame,
  ArrowDown
} from 'lucide-react';
import Link from 'next/link';

// ─── 01. SYSTEM ARCHITECTURES ───────────────────────────────────────────────
interface Architecture {
  id: string;
  name: string;
  badge: 'VERIFIED ALKOTA BUILD' | 'PROJECT DEPENDENT' | 'ENGINEERED TO APPLICATION' | 'DATA-READY';
  headline: string;
  description: string;
  typicalAssets: string;
  operatorModel: string;
  automationLevel: string;
  throughputConsiderations: string;
  waterConsiderations: string;
  keySpecs: string[];
}

const ARCHITECTURES: Architecture[] = [
  {
    id: 'manual_bay',
    name: 'Manual Industrial Wash Bay',
    badge: 'VERIFIED ALKOTA BUILD',
    headline: 'Centralised high-pressure delivery with heavy-duty multi-bay reticulation.',
    description: 'Designed for depots and industrial yards requiring operator-controlled washing with fixed overhead 360° boom arms, balanced high-temperature lances, and frost-protected cabinet enclosures.',
    typicalAssets: 'HGVs, municipal vehicles, general plant, trailers, chassis.',
    operatorModel: 'Dedicated trained operator with balanced ergonomic lance drop stations.',
    automationLevel: 'Operator-controlled with interlocked run timers and auto-shutdown.',
    throughputConsiderations: '4 to 12 vehicles per operator shift depending on soil mass.',
    waterConsiderations: 'Graded bay sumps, silt catchpits & Class 1 coalescing oil interception.',
    keySpecs: [
      'Overhead 360° stainless steel boom arms with high-pressure swivel joints',
      'Centralised triplex ceramic plunger pump skid in secure plant room',
      'Continuous Schedule 80 ASTM A53 heating coil thermal water delivery',
      'Low-voltage operator remote touchpoints with pneumatic chemical selection'
    ]
  },
  {
    id: 'multi_operator',
    name: 'Multi-Operator Wash Reticulation',
    badge: 'VERIFIED ALKOTA BUILD',
    headline: 'Single powerhouse plant room feeding up to 8 simultaneous operator stations.',
    description: 'Centralises heavy motor assemblies, continuous-wound Schedule 80 heating coils, and automated chemical metering into a dedicated plant room away from the wash apron, feeding high-pressure ring mains across multiple bays.',
    typicalAssets: 'Logistics fleets, bus depots, waste collection vehicles, mining plant.',
    operatorModel: 'Simultaneous multi-lance operator deployment across parallel bays.',
    automationLevel: 'PLC-managed pressure balancing and automatic N+1 pump staging on demand.',
    throughputConsiderations: 'Continuous multi-bay operational availability without pressure drop.',
    waterConsiderations: 'Central trench drainage with high-capacity continuous solids separation.',
    keySpecs: [
      'N+1 pump redundancy for zero-downtime operations during servicing',
      'PLC-managed pressure and temperature load-balancing manifolds',
      'Heavy-wall Schedule 80 stainless distribution ring main reticulation',
      'Individual bay lockouts and automated frost purge cycles'
    ]
  },
  {
    id: 'automated_drive_through',
    name: 'Automated Drive-Through Wash',
    badge: 'ENGINEERED TO APPLICATION',
    headline: 'High-speed automated washing for high-frequency transport operations.',
    description: 'Optical vehicle profiling and sonar-triggered arch arrays clean commercial chassis, wheels, and side panels in under 3 minutes per vehicle as they traverse the wash apron.',
    typicalAssets: 'Buses, coaches, logistics trailers, municipal refuse trucks.',
    operatorModel: 'Driver-only drive-through or automated traffic control signaling.',
    automationLevel: 'Fully automated sonar and optical contour vehicle profiling.',
    throughputConsiderations: 'Up to 25 to 30 commercial vehicles per hour during peak windows.',
    waterConsiderations: 'High-volume closed-loop water recovery & media sand recycling essential.',
    keySpecs: [
      'Sonar vehicle entry detection & automated multi-stage sequencing',
      'High-impact oscillating contour spray arches for cab and side panels',
      'Automated high-pressure underbody & tyre wash spinner manifolds',
      'Rapid cycle turnaround with integrated traffic light guidance'
    ]
  },
  {
    id: 'conveyorised_tunnel',
    name: 'Conveyorised Cleaning Tunnel',
    badge: 'ENGINEERED TO APPLICATION',
    headline: 'Heavy mechanical handling with 360° synchronized high-pressure cleaning.',
    description: 'Continuous heavy-duty variable-speed conveyor systems engineered for repetitive planar assets, stripping heavy mud, grease, and biological contamination through synchronized multi-angle rotating spray arrays.',
    typicalAssets: 'Rig mats, access roadways, sheet piling, trench boxes, heavy panels.',
    operatorModel: 'Forklift loading/unloading at tunnel entry and exit staging buffers.',
    automationLevel: 'Automated variable-speed conveyor with sensor interlocks & auto-wash.',
    throughputConsiderations: '30 to 60 units per hour continuous process throughput.',
    waterConsiderations: '100% Closed-loop continuous multi-stage recycling & solids screw extraction.',
    keySpecs: [
      'Variable-speed heavy-duty chain or roller conveyor drive assembly',
      '20+ synchronized rotating spray manifolds (top, bottom, and side coverage)',
      'Dual 1,000,000 BTU thermal water heating generation skids',
      'Heavy solids screw conveyor for continuous de-watering and mud evacuation'
    ]
  },
  {
    id: 'gantry_moving',
    name: 'Gantry / Moving Wash System',
    badge: 'PROJECT DEPENDENT',
    headline: 'Motorized gantry traversing stationary assets with contour-tracking arches.',
    description: 'Engineered for extremely large or rail-bound assets where the vehicle remains stationary and an overhead or track-mounted gantry travels the length of the asset executing staged wash cycles.',
    typicalAssets: 'Locomotives, passenger trains, heavy mining haulers, aerospace components.',
    operatorModel: 'Push-button or HMI cycle initialization by facility technician.',
    automationLevel: 'PLC-controlled automated gantry traversal with anti-collision laser sensors.',
    throughputConsiderations: 'Programmed cycle times calibrated to asset length (10–25 mins).',
    waterConsiderations: 'Trackside trench collection with coalescing oil separation and reuse.',
    keySpecs: [
      'Precision track-guided motorized gantry carriage structure',
      'Multi-nozzle contouring side, skirt, and roof rinse arches',
      'Chemical pre-soak, high-pressure wash, and final RO rinse stages',
      'Category 4 safety interlocks, light curtains, and emergency stop loops'
    ]
  },
  {
    id: 'mat_sheet_rig',
    name: 'Mat & Sheet Pile Cleaning Rig',
    badge: 'ENGINEERED TO APPLICATION',
    headline: 'Specialist high-volume washing for temporary infrastructure and groundworks.',
    description: 'Groundwork and access matting systems return from sites encrusted with clay, aggregate, and environmental contaminants. Our specialized rigs restore assets to clean condition for re-hire or biosecure transfer.',
    typicalAssets: 'Timber and composite rig mats, steel sheet piles, trench shoring.',
    operatorModel: 'Mechanical crane or loader placement with automated hydraulic feed.',
    automationLevel: 'Automated hydraulic feed with variable pressure modulation.',
    throughputConsiderations: 'High-speed continuous cleaning to match rapid hire turnaround.',
    waterConsiderations: 'Massive solids settlement lagoons & closed-loop clarification.',
    keySpecs: [
      'High-flow multi-pump assemblies generating up to 40 GPM at 4,000 PSI',
      'Integrated biosecurity disinfectant dosing options for agricultural compliance',
      'Automated scraper and de-silting primary containment troughs',
      'Heavy structural steel frame construction for harsh site environments'
    ]
  },
  {
    id: 'heavy_demucking',
    name: 'Heavy Plant De-Mucking System',
    badge: 'VERIFIED ALKOTA BUILD',
    headline: 'Extreme-volume water delivery for rapid bulk mud and clay evacuation.',
    description: 'Before mechanical inspection, servicing, or highway transit, heavy earthmoving equipment must be stripped of tonnes of compacted soil. High-volume de-mucking delivers high flow (up to 80 GPM) combined with targeted pressure.',
    typicalAssets: 'Excavators, tracked dozers, dump trucks, crushers, agricultural machinery.',
    operatorModel: 'Remote joystick operator console or high-volume manual wash monitors.',
    automationLevel: 'Remote joystick wash monitors & sonar-triggered underbody flush.',
    throughputConsiderations: 'Reduces de-mucking time from 4 hours to 15–20 minutes.',
    waterConsiderations: 'High-capacity settlement lagoons with automated mud-hopper discharge.',
    keySpecs: [
      'Heavy-duty industrial wash monitors (water cannons) with joystick control',
      'Multi-stage high-volume centrifugal and plunger pump arrays',
      'Reinforced drive-over steel rumble grids and underbody chassis flush ramps',
      'High-solids slurry evacuation sumps with submersible slurry pumps'
    ]
  },
  {
    id: 'sanitary_process',
    name: 'Sanitary Process & Hygiene Cleaning',
    badge: 'PROJECT DEPENDENT',
    headline: 'Sanitary Grade 316 stainless reticulation and clean-in-place (CIP) integration.',
    description: 'Custom-engineered wash stations and hygienic clean-down systems designed for food processing facilities, abattoirs, pharmaceutical production, and chemical processing facilities.',
    typicalAssets: 'Food contact containers, mixing vessels, tote boxes, process machinery.',
    operatorModel: 'Recipe-driven automated CIP or hygienic wash station operation.',
    automationLevel: 'Automated recipe-driven thermal sanitation and chemical proportioning.',
    throughputConsiderations: 'Calibrated to production line sanitation and shift changeover schedules.',
    waterConsiderations: 'Thermal heat recovery & compliant trade effluent neutralisation.',
    keySpecs: [
      'Full AISI 316 stainless steel frame, pipework, and delivery manifolds',
      'High-temperature 95°C water plus 140°C dry steam generation',
      'Automated sanitiser manifold and chemical dosing integration',
      'IP66 stainless wash-down control enclosures with hygienic seals'
    ]
  },
  {
    id: 'bespoke_engineering',
    name: 'Bespoke Infrastructure Engineering',
    badge: 'ENGINEERED TO APPLICATION',
    headline: 'Custom mechanical, hydraulic, and electrical engineering for non-standard assets.',
    description: 'When standard configurations do not fit site footprints, power envelopes, or unique contamination profiles, Alkota engineers bespoke systems from first principles.',
    typicalAssets: 'Specialized industrial assets, offshore containers, defense equipment.',
    operatorModel: 'Engineered strictly to facility EHS and operating model requirements.',
    automationLevel: 'Configurable from manual operator lances to automated PLC integration.',
    throughputConsiderations: 'Modelled during discovery and verified during Factory Acceptance Testing.',
    waterConsiderations: 'Custom-designed water treatment and trade effluent balance.',
    keySpecs: [
      'Full CAD mechanical and electrical layout design',
      'Site feasibility survey and civil engineering interface scoping',
      'Custom pump skid fabrication and thermal power integration',
      'Comprehensive O&M documentation and operator training'
    ]
  }
];

// ─── 02. ANATOMY OF A WASH PLANT (12 STAGES) ────────────────────────────────
interface Stage {
  num: string;
  name: string;
  category: 'Cleaning Stream' | 'Water Stream' | 'Control Stream';
  classification: 'CORE' | 'OPTIONAL' | 'PROJECT DEPENDENT';
  description: string;
}

const STAGES: Stage[] = [
  { num: '01', name: 'Asset Entry & Positioning', category: 'Control Stream', classification: 'CORE', description: 'Optical sensors, ground loops, and guidance curbing ensure the asset is safely positioned with correct clearances before sequence initialization.' },
  { num: '02', name: 'Pre-Wash / Bulk De-Muck', category: 'Cleaning Stream', classification: 'OPTIONAL', description: 'High-volume low-pressure flood arches or wash monitors soften compacted mud, road salt, and heavy aggregate prior to detergent application.' },
  { num: '03', name: 'Chemical Proportioning & Dwell', category: 'Cleaning Stream', classification: 'OPTIONAL', description: 'Automated chemical proportioners apply clinging alkaline foam or degreasing agents to break down traffic film and hydrocarbon bonds.' },
  { num: '04', name: 'Primary High-Pressure Wash', category: 'Cleaning Stream', classification: 'CORE', description: 'Continuous-wound Schedule 80 thermal heating coils deliver water at up to 95°C and 345 BAR across oscillating spray arches or lance drops.' },
  { num: '05', name: 'Underbody & Wheel Wash', category: 'Cleaning Stream', classification: 'OPTIONAL', description: 'Targeted high-pressure spinner nozzles flush wheel arches, brake assemblies, axles, and under-chassis cavities from below-ground spray bars.' },
  { num: '06', name: 'Effluent Collection & Sumps', category: 'Water Stream', classification: 'CORE', description: 'Graded impermeable concrete bays and heavy-duty galvanized trench gratings route all wash water into primary collection sumps.' },
  { num: '07', name: 'Solids & Sediment Separation', category: 'Water Stream', classification: 'PROJECT DEPENDENT', description: 'Gravity settlement pits, sediment baskets, and automated screw conveyors remove heavy gravel, sand, and suspended silt down to 50 microns.' },
  { num: '08', name: 'Coalescing Oil Separation', category: 'Water Stream', classification: 'PROJECT DEPENDENT', description: 'BS EN 858 coalescing plate interceptors and floating surface skimmers strip free petroleum hydrocarbons and oily films from the effluent stream.' },
  { num: '09', name: 'Water Treatment & Filtration', category: 'Water Stream', classification: 'PROJECT DEPENDENT', description: 'Deep-bed silica sand, multi-stage cartridge polishing, or vacuum filtration systems remove fine particulate and chemical residues.' },
  { num: '10', name: 'Buffer Reservoir & Closed Loop', category: 'Water Stream', classification: 'PROJECT DEPENDENT', description: 'Treated water is transferred to high-capacity holding reservoirs with automated level controls, supplying up to 90% recycled water back to pumps.' },
  { num: '11', name: 'Automation & PLC Master Controls', category: 'Control Stream', classification: 'CORE', description: 'IP66 PLC control suites govern pump sequencing, variable speed drives, interlocks, temperature modulation, cycle logs, and safety systems.' },
  { num: '12', name: 'Asset Exit & Clearance Logging', category: 'Control Stream', classification: 'CORE', description: 'Automated exit barriers open, wash counters increment, and throughput telemetry records the completed cycle into the site operations register.' }
];

// ─── 03. ENGINEERING DELIVERY METHODOLOGY (12 STAGES) ──────────────────────
const DELIVERY_STEPS = [
  { step: '01', title: 'Operational Discovery', desc: 'Throughput modelling, asset geometry review, and contamination profiling.' },
  { step: '02', title: 'Site Feasibility Survey', desc: 'Power verification, drainage assessment, and civil works review.' },
  { step: '03', title: 'Concept Engineering', desc: 'Process flow diagrams, hydraulic sizing, and initial GA layouts.' },
  { step: '04', title: 'Water Balance Scoping', desc: 'Water balance calculations, trade effluent strategy, and closed-loop design.' },
  { step: '05', title: 'Detailed CAD Design', desc: 'Mechanical, electrical, PLC control architecture, and pipe reticulation.' },
  { step: '06', title: 'Workshop Fabrication', desc: 'Heavy-gauge steel frames, Schedule 80 coils, and pump skid assembly.' },
  { step: '07', title: 'Factory Acceptance (FAT)', desc: 'Rigorous pressure, electrical, and sensor validation prior to dispatch.' },
  { step: '08', title: 'Site Mechanical Install', desc: 'Pipework reticulation, gantry placement, and plant room fit-out.' },
  { step: '09', title: 'Commissioning & SAT', desc: 'Flow calibration, temperature tuning, and full operational cycle sign-off.' },
  { step: '10', title: 'Operator & EHS Training', desc: 'Safety protocols, daily pre-checks, and emergency response procedures.' },
  { step: '11', title: 'Handover & Documentation', desc: 'Full O&M manuals, asset registers, and electrical schematic delivery.' },
  { step: '12', title: 'Lifecycle PPM Governance', desc: 'Planned preventative maintenance, critical spares holding, and telemetry.' }
];

export default function WashPlantPage() {
  const [selectedArchIdx, setSelectedArchIdx] = useState<number>(3); // Default to conveyorised tunnel
  const selectedArch = ARCHITECTURES[selectedArchIdx];

  return (
    <main className="min-h-screen bg-alkota-bg text-alkota-black">
      <WashPlantSchema
        pageTitle="Industrial Wash Plant Design, Installation & Lifecycle Support | Alkota UK"
        pageDescription="Alkota UK engineers bespoke industrial cleaning infrastructure: turnkey wash plant design, mechanical fabrication, water treatment, automation and lifecycle PPM for high-throughput commercial and industrial operations (£100k–£1m+ CAPEX)."
        pageUrl="https://alkota.co.uk/wash-plant"
      />

      <Navigation />
      <WashPlantSubNav />

      {/* ── CHAPTER 1: CINEMATIC INDUSTRIAL HERO ──────────────────────────── */}
      <section className="relative min-h-[88vh] flex flex-col justify-between bg-[#0E0E0E] text-white pt-24 pb-16 px-6 sm:px-12 overflow-hidden border-b border-[#222]">
        {/* Subtle engineering background texture */}
        <div 
          className="absolute inset-0 bg-cover bg-center filter brightness-[0.25] opacity-50 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 75% 25%, rgba(255,105,0,0.18), transparent 60%), linear-gradient(to bottom, #0A0A0A, #141414)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-transparent pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl w-full">
          <Breadcrumbs items={[{ label: 'Wash Plant Infrastructure' }]} />

          <div className="mt-12 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-[2px] w-10 bg-alkota-orange" />
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
                className="inline-flex items-center gap-3 bg-alkota-orange text-white px-8 py-4 text-xs uppercase tracking-[0.25em] hover:bg-white hover:text-alkota-black transition-all shadow-lg"
              >
                <span>Start a Wash Plant Project</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#process-system"
                className="inline-flex items-center gap-3 border border-white/30 bg-white/5 text-white px-8 py-4 text-xs uppercase tracking-[0.25em] hover:border-white hover:bg-white hover:text-black transition-all"
              >
                <span>Explore the System</span>
                <ArrowDown className="h-4 w-4" />
              </a>
            </motion.div>
          </div>
        </div>

        {/* Hero Restrained Capability Footer */}
        <div className="relative z-10 mx-auto max-w-7xl w-full pt-12 border-t border-white/10 mt-12 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs font-ibm-plex-mono text-alkota-silver uppercase tracking-widest">
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
            <span>DESIGN</span>
            <span>·</span>
            <span>ENGINEERING</span>
            <span>·</span>
            <span>INSTALLATION</span>
            <span>·</span>
            <span>COMMISSIONING</span>
            <span>·</span>
            <span>LIFECYCLE SUPPORT</span>
          </div>
          <div className="text-alkota-orange font-medium">
            // PROJECTS £100K — £1M+ CAPEX
          </div>
        </div>
      </section>

      {/* ── CHAPTER 2: A WASH PLANT IS A PROCESS SYSTEM (EDITORIAL) ───────── */}
      <section id="process-system" className="py-24 px-6 sm:px-12 bg-white border-b border-alkota-iron">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.35em] text-alkota-orange block mb-3">
                // SYSTEMIC PROCESS ENGINEERING
              </span>
              <h2 className="font-extralight text-4xl sm:text-5xl uppercase tracking-tight text-alkota-black leading-tight">
                A wash plant is a production system.
              </h2>
            </div>

            <div className="lg:col-span-7 space-y-6 text-sm text-alkota-silver leading-relaxed">
              <p className="text-base text-alkota-black font-normal">
                When an industrial facility must process commercial vehicles, heavy plant, rail rolling stock, or roadway matting through repeated high-intensity cleaning cycles, the correct solution depends on far more than PSI.
              </p>
              <p>
                A high-pressure washer is an individual tool. A wash plant is an integrated infrastructure asset: combining heavy mechanical reticulation, thermal water generation, automatic sequencing, civils interfaces, solids evacuation, oil separation, water recycling, and long-term asset management.
              </p>
              <p>
                We design systems from first principles — calculating asset geometry, cycle dwell time, effluent loading, and power constraints to guarantee operational continuity and statutory environmental compliance.
              </p>

              {/* 10 Operational Vectors */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-4 font-ibm-plex-mono text-[10px] uppercase tracking-wider text-alkota-black">
                <div className="p-3 bg-alkota-bg border border-alkota-iron">
                  <span className="text-alkota-orange block mb-0.5">01</span> Asset Envelope
                </div>
                <div className="p-3 bg-alkota-bg border border-alkota-iron">
                  <span className="text-alkota-orange block mb-0.5">02</span> Soil Chemistry
                </div>
                <div className="p-3 bg-alkota-bg border border-alkota-iron">
                  <span className="text-alkota-orange block mb-0.5">03</span> Throughput & Dwell
                </div>
                <div className="p-3 bg-alkota-bg border border-alkota-iron">
                  <span className="text-alkota-orange block mb-0.5">04</span> Flow vs Pressure
                </div>
                <div className="p-3 bg-alkota-bg border border-alkota-iron">
                  <span className="text-alkota-orange block mb-0.5">05</span> Water Balance
                </div>
                <div className="p-3 bg-alkota-bg border border-alkota-iron">
                  <span className="text-alkota-orange block mb-0.5">06</span> Drainage & Recovery
                </div>
                <div className="p-3 bg-alkota-bg border border-alkota-iron">
                  <span className="text-alkota-orange block mb-0.5">07</span> Operator Safety
                </div>
                <div className="p-3 bg-alkota-bg border border-alkota-iron">
                  <span className="text-alkota-orange block mb-0.5">08</span> Automation Level
                </div>
                <div className="p-3 bg-alkota-bg border border-alkota-iron">
                  <span className="text-alkota-orange block mb-0.5">09</span> Redundancy
                </div>
                <div className="p-3 bg-alkota-bg border border-alkota-iron">
                  <span className="text-alkota-orange block mb-0.5">10</span> Downtime Risk
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CHAPTER 3: SYSTEM ARCHITECTURES (INTERACTIVE SELECTOR) ─────────── */}
      <section id="architectures" className="py-24 px-6 sm:px-12 bg-alkota-bg border-b border-alkota-iron">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.35em] text-alkota-orange block mb-2">
              // ARCHITECTURAL FAMILIES
            </span>
            <h2 className="font-extralight text-4xl sm:text-6xl uppercase tracking-tight text-alkota-black">
              Purpose-Built Configurations.
            </h2>
            <p className="text-xs text-alkota-silver uppercase tracking-widest mt-2">
              Select an architecture to inspect mechanical configuration, automation level, and water balance.
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
                        <WashPlantCapabilityBadge label={arch.badge} />
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
            <div className="lg:col-span-7 bg-white border border-alkota-iron p-8 sm:p-10 shadow-sm flex flex-col justify-between min-h-[580px]">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-alkota-iron/60 mb-6">
                  <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange">
                    // SPECIFICATION PROFILE
                  </span>
                  <WashPlantCapabilityBadge label={selectedArch.badge} />
                </div>

                <h3 className="font-extralight text-2xl sm:text-3xl uppercase tracking-tight text-alkota-black mb-2">
                  {selectedArch.name}
                </h3>
                <p className="text-sm text-alkota-black font-normal leading-snug mb-4">
                  {selectedArch.headline}
                </p>
                <p className="text-xs sm:text-sm text-alkota-silver leading-relaxed mb-8">
                  {selectedArch.description}
                </p>

                {/* Key Parameter Matrix */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 bg-alkota-bg p-5 border border-alkota-iron/60 text-xs">
                  <div>
                    <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-silver block mb-1">
                      Typical Assets
                    </span>
                    <p className="text-alkota-black">{selectedArch.typicalAssets}</p>
                  </div>
                  <div>
                    <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-silver block mb-1">
                      Operator Model
                    </span>
                    <p className="text-alkota-black">{selectedArch.operatorModel}</p>
                  </div>
                  <div>
                    <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-silver block mb-1">
                      Automation Level
                    </span>
                    <p className="text-alkota-black">{selectedArch.automationLevel}</p>
                  </div>
                  <div>
                    <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-silver block mb-1">
                      Throughput Profile
                    </span>
                    <p className="text-alkota-black">{selectedArch.throughputConsiderations}</p>
                  </div>
                </div>

                {/* Core Mechanical Specs */}
                <div className="space-y-2 mb-8">
                  <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange block mb-2">
                    Core Engineering Elements:
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

      {/* ── CHAPTER 4: ANATOMY OF A WASH PLANT (INTERACTIVE MAP) ──────────── */}
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
                    <span className={`font-ibm-plex-mono text-[8px] uppercase tracking-widest px-2 py-0.5 border ${
                      stage.classification === 'CORE' ? 'bg-[#222] text-[#ccc] border-[#333]' :
                      stage.classification === 'OPTIONAL' ? 'bg-blue-950/60 text-blue-400 border-blue-800' :
                      'bg-purple-950/60 text-purple-400 border-purple-800'
                    }`}>
                      {stage.classification}
                    </span>
                  </div>
                  <span className="font-ibm-plex-mono text-[9px] text-[#777] uppercase tracking-wider block mb-1">
                    {stage.category}
                  </span>
                  <h3 className="font-light text-lg uppercase tracking-tight text-white mb-2">
                    {stage.name}
                  </h3>
                  <p className="text-xs text-[#999] leading-relaxed">
                    {stage.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Water Treatment Link Banner */}
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

      {/* ── CHAPTER 5: WASH PLANT ARCHITECT EMBEDDED PREVIEW ─────────────── */}
      <section className="py-20 px-6 sm:px-12 bg-white border-b border-alkota-iron">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 bg-[#121212] text-white overflow-hidden shadow-xl">
            <div className="lg:col-span-7 p-8 sm:p-14 flex flex-col justify-between">
              <div>
                <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.35em] text-alkota-orange block mb-3">
                  // THE PROJECT SCOPING TOOL
                </span>
                <h2 className="font-extralight text-4xl sm:text-5xl uppercase tracking-tight text-white mb-4 leading-tight">
                  The Wash Plant Architect.
                </h2>
                <p className="text-sm text-alkota-steel leading-relaxed mb-8">
                  Not an instant shopping basket. Industrial wash plants are complex engineered capital projects. The Wash Plant Architect allows you to structure your asset profile, throughput demands, water constraints, and site requirements into a preliminary engineering project brief.
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

      {/* ── CHAPTER 6: CONTROLS & PROCESS AUTOMATION ──────────────────────── */}
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

            <div className="lg:col-span-6 grid grid-cols-2 gap-3 font-ibm-plex-mono text-xs uppercase tracking-wider text-alkota-black">
              <div className="p-4 bg-alkota-bg border border-alkota-iron">
                <Cpu className="h-5 w-5 text-alkota-orange mb-2" />
                <span className="block text-alkota-black">PLC Master Control</span>
                <span className="text-[10px] text-alkota-silver">Siemens / Mitsubishi Architecture</span>
              </div>
              <div className="p-4 bg-alkota-bg border border-alkota-iron">
                <Sliders className="h-5 w-5 text-alkota-orange mb-2" />
                <span className="block text-alkota-black">Variable Speed Drives</span>
                <span className="text-[10px] text-alkota-silver">Soft-start & pressure ramping</span>
              </div>
              <div className="p-4 bg-alkota-bg border border-alkota-iron">
                <Layers className="h-5 w-5 text-alkota-orange mb-2" />
                <span className="block text-alkota-black">Sonar Profiling</span>
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
                <span className="text-[10px] text-alkota-silver">Data-ready cloud diagnostics</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CHAPTER 7: WATER IS A PROCESS STREAM ──────────────────────────── */}
      <section className="py-24 px-6 sm:px-12 bg-alkota-bg border-b border-alkota-iron">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-4">
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.35em] text-alkota-orange block">
                // CLOSED-LOOP PROCESS FLOW
              </span>
              <h2 className="font-extralight text-4xl sm:text-5xl uppercase tracking-tight text-alkota-black leading-tight">
                Water is a process stream.
              </h2>
              <p className="text-sm text-alkota-silver leading-relaxed">
                A wash plant does not simply consume water; it manages an entire effluent cycle. From primary sediment settlement and coalescing oil separation (BS EN 858) through deep-bed media sand filtration, we engineer water recovery systems that deliver up to 90% water recirculation while protecting high-pressure pump components.
              </p>
              <div className="pt-2">
                <Link
                  href="/water-treatment"
                  className="inline-flex items-center gap-2 text-xs font-ibm-plex-mono uppercase tracking-widest text-alkota-orange hover:text-alkota-black transition-colors"
                >
                  <span>Explore Water Treatment Technology →</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 font-ibm-plex-mono text-xs text-alkota-black">
              <div className="p-5 bg-white border border-alkota-iron space-y-2">
                <span className="text-alkota-orange block">01. COLLECTION & SUMPS</span>
                <p className="text-alkota-silver leading-relaxed">Impermeable graded concrete aprons and heavy galvanized sumps with silt catchbaskets.</p>
              </div>
              <div className="p-5 bg-white border border-alkota-iron space-y-2">
                <span className="text-alkota-orange block">02. SOLIDS SEPARATION</span>
                <p className="text-alkota-silver leading-relaxed">Gravity settlement chambers and automated screw conveyors extract heavy aggregate and clay.</p>
              </div>
              <div className="p-5 bg-white border border-alkota-iron space-y-2">
                <span className="text-alkota-orange block">03. COALESCING OIL INTERCEPTION</span>
                <p className="text-alkota-silver leading-relaxed">Class 1 coalescing plate packs separate free hydrocarbons to meet UK trade effluent standards.</p>
              </div>
              <div className="p-5 bg-white border border-alkota-iron space-y-2">
                <span className="text-alkota-orange block">04. CLOSED-LOOP RECIRCULATION</span>
                <p className="text-alkota-silver leading-relaxed">Media sand filtration vessels polish water for return into high-pressure booster feeds.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CHAPTER 8: PROJECT DELIVERY METHODOLOGY & CASE STUDIES ────────── */}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#222] border border-[#222] mb-16">
            {DELIVERY_STEPS.map((step) => (
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

          {/* Featured Project Case Studies */}
          <div className="border-t border-[#222] pt-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
              <div>
                <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.35em] text-alkota-orange block mb-2">
                  // VERIFIED INSTALLATION CASE STUDIES
                </span>
                <h3 className="font-extralight text-3xl sm:text-4xl uppercase tracking-tight text-white">
                  Recent Wash Plant Projects.
                </h3>
              </div>
              <Link
                href="/wash-plant/projects"
                className="inline-flex items-center gap-2 font-ibm-plex-mono text-xs uppercase tracking-widest text-alkota-orange hover:text-white transition-colors"
              >
                <span>View Full Project Archive →</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-[#141414] border border-[#222] p-8 flex flex-col justify-between">
                <div>
                  <span className="font-ibm-plex-mono text-[9px] bg-[#222] text-white px-2.5 py-1 uppercase tracking-widest inline-block mb-4">
                    FLEET & LOGISTICS
                  </span>
                  <h4 className="font-extralight text-2xl uppercase tracking-tight text-white mb-2">
                    4-Bay Fleet Depot Installation
                  </h4>
                  <p className="text-xs text-[#888] leading-relaxed mb-6">
                    Turnkey multi-bay installation featuring dual triplex pump skids in a secure plant room, overhead 360° stainless boom arms, and automatic underbody chassis rinse.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#222] text-xs font-ibm-plex-mono flex items-center justify-between text-[#aaa]">
                  <span>Throughput: 60 HGVs/day</span>
                  <Link href="/wash-plant/projects/multi-bay-fleet-depot-warrington" className="text-alkota-orange hover:underline">Dossier →</Link>
                </div>
              </div>

              <div className="bg-[#141414] border border-[#222] p-8 flex flex-col justify-between">
                <div>
                  <span className="font-ibm-plex-mono text-[9px] bg-[#222] text-white px-2.5 py-1 uppercase tracking-widest inline-block mb-4">
                    GROUNDWORKS & ENERGY
                  </span>
                  <h4 className="font-extralight text-2xl uppercase tracking-tight text-white mb-2">
                    Automated 360° Rig Mat Washer
                  </h4>
                  <p className="text-xs text-[#888] leading-relaxed mb-6">
                    Continuous variable-speed conveyor cleaning system with 20 rotating spray bars, 100% closed-loop media filtration, and continuous solids screw evacuation.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#222] text-xs font-ibm-plex-mono flex items-center justify-between text-[#aaa]">
                  <span>Throughput: 45 mats/hr</span>
                  <Link href="/wash-plant/projects/automated-rig-mat-washer-aberdeen" className="text-alkota-orange hover:underline">Dossier →</Link>
                </div>
              </div>

              <div className="bg-[#141414] border border-[#222] p-8 flex flex-col justify-between">
                <div>
                  <span className="font-ibm-plex-mono text-[9px] bg-[#222] text-white px-2.5 py-1 uppercase tracking-widest inline-block mb-4">
                    MINING & QUARRY
                  </span>
                  <h4 className="font-extralight text-2xl uppercase tracking-tight text-white mb-2">
                    Heavy Plant De-Mucking System
                  </h4>
                  <p className="text-xs text-[#888] leading-relaxed mb-6">
                    High-volume 80 GPM water monitors with remote joystick operator stations, drive-over rumble grids, and deep settlement pit interception.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#222] text-xs font-ibm-plex-mono flex items-center justify-between text-[#aaa]">
                  <span>Throughput: 15 mins/dumper</span>
                  <Link href="/wash-plant/projects/heavy-plant-demucking-quarry-buxton" className="text-alkota-orange hover:underline">Dossier →</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CHAPTER 9: OWN THE LIFECYCLE & COMMERCIAL PATHWAYS ───────────── */}
      <section className="py-24 px-6 sm:px-12 bg-white border-b border-alkota-iron">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.35em] text-alkota-orange block mb-2">
              // LIFECYCLE GOVERNANCE
            </span>
            <h2 className="font-extralight text-4xl sm:text-6xl uppercase tracking-tight text-alkota-black">
              Own the lifecycle.
            </h2>
            <p className="text-xs text-alkota-silver uppercase tracking-widest mt-2">
              From new capital project delivery to brownfield asset overhaul and structured PPM.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 font-ibm-plex-mono text-xs">
            {/* CAPEX -> Lifecycle Pathway */}
            <div className="bg-alkota-bg border border-alkota-iron p-8 space-y-4">
              <span className="text-alkota-orange text-[10px] uppercase font-bold block">
                01. NEW CAPITAL PROJECT LIFECYCLE
              </span>
              <div className="space-y-2 text-[#555]">
                <p>• Discovery & Throughput Modelling</p>
                <p>• Turnkey CAD Engineering & Fabrication</p>
                <p>• Site Installation & SAT Commissioning</p>
                <p>• Handover into Digital Asset Register</p>
                <p>• Configurable PPM & Scheduled Inspections</p>
                <p>• Condition Tracking & Planned Upgrades</p>
              </div>
              <Link
                href="/wash-plant/asset-management"
                className="inline-flex items-center gap-2 text-alkota-black hover:text-alkota-orange uppercase tracking-wider pt-2 border-t border-alkota-iron block"
              >
                <span>Explore Asset Management →</span>
              </Link>
            </div>

            {/* Existing Plant Pathway */}
            <div className="bg-alkota-bg border border-alkota-iron p-8 space-y-4">
              <span className="text-alkota-orange text-[10px] uppercase font-bold block">
                02. EXISTING / THIRD-PARTY PLANT LIFE EXTENSION
              </span>
              <div className="space-y-2 text-[#555]">
                <p>• Site Survey & Condition Assessment</p>
                <p>• Obsolescence & Failure Risk Mapping</p>
                <p>• Pump & Burner Overhaul / Replacement</p>
                <p>• PLC & Control Suite Modernization</p>
                <p>• Water Treatment & Recycling Retrofit</p>
                <p>• Managed PPM & Critical Spares Strategy</p>
              </div>
              <Link
                href="/wash-plant/refurbishment-upgrades"
                className="inline-flex items-center gap-2 text-alkota-black hover:text-alkota-orange uppercase tracking-wider pt-2 border-t border-alkota-iron block"
              >
                <span>Explore Refurbishment & Upgrades →</span>
              </Link>
            </div>
          </div>

          {/* Consultant & Specifier Intake Module */}
          <WashPlantSpecifierCta />
        </div>
      </section>

      <Footer />
    </main>
  );
}
