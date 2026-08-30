'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import WashPlantSubNav from '@/components/wash-plant/WashPlantSubNav';
import WashPlantCapabilityBadge from '@/components/wash-plant/WashPlantCapabilityBadge';
import WashPlantSpecifierCta from '@/components/wash-plant/WashPlantSpecifierCta';
import WashPlantSchema from '@/components/wash-plant/WashPlantSchema';
import WashPlantVariablesMatrix from '@/components/wash-plant/WashPlantVariablesMatrix';
import WashPlantAnatomyDiagram from '@/components/wash-plant/WashPlantAnatomyDiagram';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Droplets,
  Cpu,
  RefreshCw,
  Clock,
  CheckCircle2,
  ChevronRight,
  Settings,
  Layers,
  Sliders,
  Truck,
  Building2,
  Wrench,
  Activity,
  BarChart3,
  Flame,
  ArrowDown,
  ChevronDown,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';

// ─── 01. SYSTEM ARCHITECTURES ───────────────────────────────────────────────
interface Architecture {
  id: string;
  name: string;
  badge: 'VERIFIED ALKOTA BUILD' | 'PROJECT DEPENDENT' | 'ENGINEERED TO APPLICATION' | 'DATA-READY';
  headline: string;
  bestSuitedTo: string;
  cleaningChallenge: string;
  operatingPrinciple: string;
  potentialIntegration: string;
  keySpecs: string[];
}

const ARCHITECTURES: Architecture[] = [
  {
    id: 'manual_bay',
    name: 'Manual Industrial Wash Bay',
    badge: 'VERIFIED ALKOTA BUILD',
    headline: 'Centralised high-pressure delivery with heavy-duty multi-bay reticulation.',
    bestSuitedTo: 'Fleet depots, equipment yards, municipal maintenance depots, and multi-asset transport facilities.',
    cleaningChallenge: 'Variable soil profiles on irregular asset geometry requiring operator inspection and targeted lance access.',
    operatingPrinciple: 'Dedicated trained operator utilizing overhead 360° stainless boom arms, balanced ergonomic lances, and remote low-voltage chemical control.',
    potentialIntegration: 'Automated underbody chassis flush nozzles, frost purge loops, and multi-stage coalescing oil separators.',
    keySpecs: [
      'Overhead 360° stainless steel boom arms with heavy-duty swivels',
      'Centralised triplex ceramic plunger pump skid in dedicated plant room',
      'Continuous Schedule 80 ASTM A53 heating coil thermal water delivery',
      'Low-voltage operator remote touchpoints with pneumatic chemical selection'
    ]
  },
  {
    id: 'multi_operator',
    name: 'Multi-Operator Wash Reticulation',
    badge: 'VERIFIED ALKOTA BUILD',
    headline: 'Single powerhouse plant room feeding up to 8 simultaneous operator stations.',
    bestSuitedTo: 'High-frequency logistics hubs, municipal waste collection depots, bus garages, and large plant hire depots.',
    cleaningChallenge: 'Multiple operators washing simultaneously during tight shift-change windows without line pressure collapse.',
    operatingPrinciple: 'N+1 triplex pump staging in a soundproof plant room feeding high-pressure stainless ring mains with automated pressure balancing.',
    potentialIntegration: 'Individual bay lockout fobs, automatic run-hour counters, and centralised chemical distribution manifolds.',
    keySpecs: [
      'N+1 pump redundancy for zero-downtime operations during servicing',
      'PLC-managed pressure and temperature load-balancing manifolds',
      'Heavy-wall Schedule 80 stainless distribution ring main reticulation',
      'Individual bay lockouts and automated frost purge cycles'
    ]
  },
  {
    id: 'heavy_demucking',
    name: 'Heavy Plant De-Mucking System',
    badge: 'VERIFIED ALKOTA BUILD',
    headline: 'Extreme-volume water delivery for rapid bulk mud, clay, and slurry evacuation.',
    bestSuitedTo: 'Quarries, mining sites, major civil earthworks, landfill sites, and demolition plant maintenance yards.',
    cleaningChallenge: 'Tonnes of compacted clay, aggregate, and slurry encrusting tracked excavators and 40-tonne dumpers.',
    operatingPrinciple: 'High-volume water monitors (water cannons) delivering 80+ GPM to break mass soil structure before precision pressure detailing.',
    potentialIntegration: 'Drive-over heavy steel rumble grids, under-chassis spray headers, and automated sludge screw evacuation augers.',
    keySpecs: [
      'Industrial wash monitors (water cannons) with remote joystick console options',
      'Multi-stage high-volume centrifugal and plunger pump assemblies',
      'Reinforced drive-over steel rumble grids and underbody flush ramps',
      'High-solids slurry evacuation sumps with submersible vortex slurry pumps'
    ]
  },
  {
    id: 'conveyorised_tunnel',
    name: 'Conveyorised Cleaning Tunnel',
    badge: 'ENGINEERED TO APPLICATION',
    headline: 'Heavy mechanical handling with 360° synchronized high-pressure cleaning.',
    bestSuitedTo: 'Rig & access roadway mat hire depots, sheet pile yards, modular building components, and repetitive planar assets.',
    cleaningChallenge: 'High-volume repetitive cleaning of heavily soiled planar assets required back-to-back at industrial throughput.',
    operatingPrinciple: 'Variable-speed mechanical conveyor drives assets through enclosed spray chambers equipped with 20+ synchronized rotating spray bars.',
    potentialIntegration: 'Dual 1,000,000 BTU thermal heating skids, 100% closed-loop media sand recycling, and automated de-silting augers.',
    keySpecs: [
      'Variable-speed heavy-duty chain or roller conveyor drive assembly',
      '20+ synchronized rotating spray manifolds (top, bottom, and side coverage)',
      'Dual 1,000,000 BTU thermal water heating generation skids',
      'Heavy solids screw conveyor for continuous de-watering and mud evacuation'
    ]
  },
  {
    id: 'automated_drive_through',
    name: 'Automated Drive-Through Wash',
    badge: 'ENGINEERED TO APPLICATION',
    headline: 'High-speed automated washing for high-frequency transport operations.',
    bestSuitedTo: 'Bus and coach operators, commercial logistics fleets, distribution centres, and refuse collection depots.',
    cleaningChallenge: 'Strict 3-minute vehicle turnaround times for high-volume fleets returning during peak evening windows.',
    operatingPrinciple: 'Sonar and optical profiling triggers automated contouring spray arches and underbody spinner bars as vehicles traverse the bay.',
    potentialIntegration: 'Closed-loop water reclaim systems, biocide dosing, traffic light guidance, and optical number-plate cycle logging.',
    keySpecs: [
      'Sonar vehicle entry detection & automated multi-stage sequencing',
      'High-impact oscillating contour spray arches for cab and side panels',
      'Automated high-pressure underbody & tyre wash spinner manifolds',
      'Rapid cycle turnaround with integrated traffic light guidance'
    ]
  },
  {
    id: 'gantry_moving',
    name: 'Gantry / Moving Wash System',
    badge: 'PROJECT DEPENDENT',
    headline: 'Motorized gantry traversing stationary assets with contour-tracking arches.',
    bestSuitedTo: 'Locomotives, passenger rail rolling stock, oversized mining machinery, and aerospace structures.',
    cleaningChallenge: 'Stationary, non-manoeuvrable or oversized assets where equipment must travel around the vehicle envelope.',
    operatingPrinciple: 'Track-mounted motorized gantry moves along the stationary asset executing pre-programmed multi-pass wash and rinse cycles.',
    potentialIntegration: 'Demineralised / RO water final rinse systems, laser distance profiling, and catenary safety interlocks.',
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
    bestSuitedTo: 'Timber and composite access mat hire, steel trench shoring, sheet piling, and construction formwork depots.',
    cleaningChallenge: 'Extreme aggregate, oil, and clay encrustation across thousands of square metres of heavy hire assets.',
    operatingPrinciple: 'Mechanical crane or loader placement onto specialized wash tables with high-pressure oscillating knife-jet manifolds.',
    potentialIntegration: 'Agricultural biosecurity disinfectant injection, settlement lagoons, and closed-loop filtration.',
    keySpecs: [
      'High-flow multi-pump assemblies generating up to 40 GPM at 4,000 PSI',
      'Integrated biosecurity disinfectant dosing options for agricultural compliance',
      'Automated scraper and de-silting primary containment troughs',
      'Heavy structural steel frame construction for harsh site environments'
    ]
  },
  {
    id: 'bespoke_process',
    name: 'Custom Process & Hygiene Cleaning',
    badge: 'PROJECT DEPENDENT',
    headline: 'Sanitary Grade 316 stainless reticulation and clean-in-place (CIP) integration.',
    bestSuitedTo: 'Food and beverage manufacturing, pharmaceutical production, chemical blending facilities, and non-standard industrial plants.',
    cleaningChallenge: 'Stringent hygiene standards, chemical exposure, thermal sanitation, and custom vessel geometry.',
    operatingPrinciple: 'Recipe-driven automated clean-in-place or sanitary wash stations built from AISI 316 stainless components.',
    potentialIntegration: 'Thermal heat recovery, pH effluent neutralisation, and cleanroom IP66 stainless wash-down control suites.',
    keySpecs: [
      'Full AISI 316 stainless steel frame, pipework, and delivery manifolds',
      'High-temperature 95°C water plus 140°C dry steam generation',
      'Automated sanitiser manifold and chemical dosing integration',
      'IP66 stainless wash-down control enclosures with hygienic seals'
    ]
  }
];

// ─── 02. SIX MACRO PROJECT DELIVERY PHASES ──────────────────────────────────
interface MacroPhase {
  phase: string;
  num: string;
  headline: string;
  summary: string;
  milestones: string[];
  deliverables: string;
}

const MACRO_PHASES: MacroPhase[] = [
  {
    phase: 'DISCOVER',
    num: '01',
    headline: 'Application & Operational Discovery',
    summary: 'We evaluate the asset envelope, contamination profile, target cycle time, operator model, and business objectives from first principles.',
    milestones: [
      'Asset geometry and sensitive component mapping',
      'Soil classification (clay, hydrocarbons, concrete, process soils)',
      'Throughput modelling (peak dispatch windows & shift cycles)',
      'EHS, water discharge, and statutory compliance scoping'
    ],
    deliverables: 'Preliminary Project Definition & Feasibility Matrix'
  },
  {
    phase: 'SURVEY',
    num: '02',
    headline: 'Site & Civil Infrastructure Survey',
    summary: 'A technical engineering survey of the physical site to verify civil interfaces, drainage gradients, utility supplies, and access routes.',
    milestones: [
      '3-Phase electrical capacity and substation headroom check',
      'Water supply mains flow, pressure, and buffer tank footprint',
      'Apron gradient, trench drainage, and invert level survey',
      'Plant room space allocation or containerised plant footprint'
    ],
    deliverables: 'Site Survey Engineering Report & Interface Scope'
  },
  {
    phase: 'ENGINEER',
    num: '03',
    headline: 'Process & Detailed System Engineering',
    summary: 'Development of detailed mechanical, hydraulic, thermal, and electrical architectures tailored strictly to the application.',
    milestones: [
      'Process Flow Diagrams (PFD) and hydraulic mass balance',
      'Schedule 80 thermal coil & pump skid sizing calculations',
      '3D CAD general arrangement and pipe reticulation drawings',
      'PLC control philosophy, safety interlocks, and HMI design'
    ],
    deliverables: 'Approved Engineering Design Package & Technical Spec'
  },
  {
    phase: 'BUILD',
    num: '04',
    headline: 'Workshop Fabrication & Factory Acceptance',
    summary: 'Precision fabrication of structural frames, cold-wound Schedule 80 heating coils, stainless manifolds, and pre-wired PLC control suites.',
    milestones: [
      'Heavy-gauge steel frame and stainless pipe fabrication',
      'Triplex pump assembly and N+1 manifold integration',
      'Control panel wiring, sensor calibration, and PLC programming',
      'Factory Acceptance Testing (FAT) under hydrostatic test pressure'
    ],
    deliverables: 'FAT Sign-Off Certificate & Pre-Dispatch Documentation'
  },
  {
    phase: 'INSTALL',
    num: '05',
    headline: 'Site Mechanical Install & Commissioning',
    summary: 'Delivery, positioning, mechanical pipe reticulation, electrical tie-in, and Site Acceptance Testing (SAT) on live site infrastructure.',
    milestones: [
      'Skid placement and civils tie-in by certified Alkota engineers',
      'Stainless overhead boom, gantry, or conveyor mechanical erection',
      'Hydraulic pressure testing, burner tuning, and flow calibration',
      'Site Acceptance Testing (SAT) with live asset cleaning cycles'
    ],
    deliverables: 'SAT Commissioning Certificate & Completed Handover Dossier'
  },
  {
    phase: 'SUPPORT',
    num: '06',
    headline: 'Asset Governance & Lifecycle PPM',
    summary: 'Structured operator handover, digital asset register onboarding, scheduled planned maintenance, critical spares holding, and remote diagnostics.',
    milestones: [
      'Operator EHS training and daily pre-check certification',
      'Digital asset register population and maintenance scheduling',
      'Guaranteed emergency breakdown SLA and critical spares holding',
      'Condition monitoring and planned lifecycle component overhauls'
    ],
    deliverables: 'O&M Manuals, Asset Register & PPM Service Contract'
  }
];

export default function WashPlantPage() {
  const [selectedArchIdx, setSelectedArchIdx] = useState<number>(3); // Default to conveyorised tunnel
  const selectedArch = ARCHITECTURES[selectedArchIdx];
  const [activePhaseIdx, setActivePhaseIdx] = useState<number>(0);

  return (
    <main className="min-h-screen bg-alkota-bg text-alkota-black">
      <WashPlantSchema
        pageTitle="Industrial Wash Plant Design, Installation & Lifecycle Support | Alkota UK"
        pageDescription="Alkota UK engineers bespoke industrial cleaning infrastructure: turnkey wash plant design, mechanical fabrication, water treatment, automation and lifecycle PPM for high-throughput commercial and industrial operations."
        pageUrl="https://alkota.co.uk/wash-plant"
      />

      {/* Global nav overlays the hero — transparent until scrolled (existing nav behaviour) */}
      <Navigation />

      {/* ── CHAPTER 0: FULL-SCREEN INDUSTRIAL HERO (LOCKED) ────────────────── */}
      <section
        className="relative flex flex-col justify-end text-white overflow-hidden border-b border-[#222]"
        style={{ minHeight: '100svh' }}
      >
        {/* Photography — the primary communication device */}
        {/* Source: rigmatwasher.com / hotandmighty.com — conveyorised industrial mat wash plant */}
        <picture>
          <source
            srcSet="/assets/wash-plant/hero-plant-conveyor.webp"
            type="image/webp"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/wash-plant/hero-plant-conveyor.jpg"
            alt="Industrial conveyorised wash plant in operation"
            className="absolute inset-0 w-full h-full object-cover object-center"
            fetchPriority="high"
            decoding="async"
          />
        </picture>

        {/* Art-directed gradient — left-to-right, preserves industrial detail on right half */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20 pointer-events-none" />
        {/* Subtle bottom darkening for capability strip legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

        {/* WashPlantSubNav — transparent while in hero, transitions on scroll */}
        <div className="absolute top-0 left-0 right-0 z-40 mt-20">
          <WashPlantSubNav heroOverlay />
        </div>

        {/* Hero content — sits in the lower-left over the image */}
        <div className="relative z-10 mx-auto max-w-7xl w-full px-6 sm:px-12 pb-16 pt-48">
          <div className="max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-extralight text-5xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-white leading-[0.9] mb-8"
            >
              INDUSTRIAL CLEANING.<br />
              <span className="text-alkota-orange">ENGINEERED AS<br />INFRASTRUCTURE.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="text-base sm:text-lg text-white/75 max-w-xl leading-relaxed mb-10"
            >
              Bespoke industrial wash systems engineered around the asset, contamination, throughput, site and water strategy — with installation, commissioning and lifecycle support from one team.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
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
        <div className="relative z-10 mx-auto max-w-7xl w-full pt-12 border-t border-white/10 mt-12 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs font-ibm-plex-mono text-alkota-silver uppercase tracking-widest px-6 sm:px-12 pb-6">
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
        </div>
      </section>

      {/* WashPlantSubNav appears here in its solid sticky state after hero */}
      <WashPlantSubNav />

      {/* ── CHAPTER 1: THE MACHINE IS ONLY ONE PART OF THE SYSTEM (WARM WHITE) */}
      <section id="process-system" className="py-24 px-6 sm:px-12 bg-white border-b border-alkota-iron">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
            <div className="lg:col-span-5">
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.35em] text-alkota-orange block mb-3">
                SYSTEMIC PROCESS ENGINEERING
              </span>
              <h2 className="font-extralight text-4xl sm:text-5xl uppercase tracking-tight text-alkota-black leading-tight">
                The machine is only one part of the system.
              </h2>
            </div>

            <div className="lg:col-span-7 space-y-6 text-sm text-alkota-silver leading-relaxed">
              <p className="text-base text-alkota-black font-normal">
                A pressure washer is an individual tool. An industrial wash plant is a process infrastructure asset: combining heavy mechanical reticulation, thermal water generation, automated sequencing, civils interfaces, solids evacuation, oil separation, water recycling, and long-term asset management.
              </p>
              <p>
                A successful installation is engineered around what must be cleaned, what is attached to it, how quickly it must move through the process, where the contaminated water goes, and how the plant will be operated and maintained.
              </p>
              <p>
                We design systems from first principles — calculating asset geometry, cycle dwell time, effluent loading, and power constraints to guarantee operational continuity and statutory environmental compliance.
              </p>
            </div>
          </div>

          {/* Interactive 6-Vector Dynamic Matrix */}
          <WashPlantVariablesMatrix />
        </div>
      </section>

      {/* ── CHAPTER 2: CHOOSE THE ARCHITECTURE AROUND THE PROCESS (LIGHT) ──── */}
      <section id="architectures" className="py-24 px-6 sm:px-12 bg-alkota-bg border-b border-alkota-iron">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.35em] text-alkota-orange block mb-2">
              WASH SYSTEM ARCHITECTURES
            </span>
            <h2 className="font-extralight text-4xl sm:text-6xl uppercase tracking-tight text-alkota-black">
              One cleaning problem does not have one wash plant solution.
            </h2>
            <p className="text-xs sm:text-sm text-alkota-silver uppercase tracking-widest mt-2">
              Select an architecture family to inspect operational principles, mechanical scope, and verified capability ratings.
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
                      <h4 className="text-sm uppercase tracking-tight font-medium">
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
                    SPECIFICATION PROFILE
                  </span>
                  <WashPlantCapabilityBadge label={selectedArch.badge} />
                </div>

                <h3 className="font-extralight text-2xl sm:text-3xl uppercase tracking-tight text-alkota-black mb-2">
                  {selectedArch.name}
                </h3>
                <p className="text-sm text-alkota-black font-normal leading-snug mb-6">
                  {selectedArch.headline}
                </p>

                {/* Structured Engineering Scope Matrix */}
                <div className="space-y-4 mb-8 bg-alkota-bg p-5 border border-alkota-iron/60 text-xs">
                  <div>
                    <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-silver block mb-1">
                      Best Suited To:
                    </span>
                    <p className="text-alkota-black font-medium">{selectedArch.bestSuitedTo}</p>
                  </div>
                  <div>
                    <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-silver block mb-1">
                      Cleaning Challenge:
                    </span>
                    <p className="text-alkota-silver">{selectedArch.cleaningChallenge}</p>
                  </div>
                  <div>
                    <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-silver block mb-1">
                      Operating Principle:
                    </span>
                    <p className="text-alkota-silver">{selectedArch.operatingPrinciple}</p>
                  </div>
                  <div>
                    <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-silver block mb-1">
                      Potential Integration:
                    </span>
                    <p className="text-alkota-silver">{selectedArch.potentialIntegration}</p>
                  </div>
                </div>

                {/* Core Mechanical Specs */}
                <div className="space-y-2 mb-8">
                  <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange block mb-2">
                    Core Mechanical & Hydraulic Elements:
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
                <Link
                  href={`/contact?enquiry=wash-plant-architecture&type=${selectedArch.id}`}
                  className="inline-flex items-center gap-2 text-xs font-ibm-plex-mono uppercase tracking-widest text-alkota-black hover:text-alkota-orange transition-colors"
                >
                  <span>Discuss This Application →</span>
                </Link>
                <Link
                  href="/wash-plant/architect"
                  className="inline-flex items-center gap-2 bg-alkota-orange text-white px-6 py-3 text-xs uppercase tracking-widest hover:bg-alkota-black transition-colors"
                >
                  <span>Scope in Architect</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CHAPTER 3: ANATOMY OF AN INDUSTRIAL WASH PLANT (SIGNATURE DARK) ── */}
      <section className="py-24 px-6 sm:px-12 bg-[#0A0A0A] border-b border-[#222]">
        <div className="mx-auto max-w-7xl">
          <WashPlantAnatomyDiagram />
        </div>
      </section>

      {/* ── CHAPTER 4: START WITH THE PROCESS (WASH PLANT ARCHITECT INTRO) ─── */}
      <section className="py-20 px-6 sm:px-12 bg-white border-b border-alkota-iron">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 bg-[#121212] text-white overflow-hidden shadow-2xl">
            <div className="lg:col-span-7 p-8 sm:p-14 flex flex-col justify-between">
              <div>
                <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.35em] text-alkota-orange block mb-3">
                  WASH PLANT ARCHITECT
                </span>
                <h2 className="font-extralight text-4xl sm:text-5xl uppercase tracking-tight text-white mb-4 leading-tight">
                  Start with the process.
                </h2>
                <p className="text-sm text-alkota-steel leading-relaxed mb-6">
                  Industrial wash plants are engineered capital projects. The Wash Plant Architect captures the primary engineering inputs needed to understand your application before a site survey or concept design.
                </p>
                <p className="text-xs text-[#888] leading-relaxed mb-8">
                  Structure your asset dimensions, throughput rates, contamination profile, site constraints, and water strategy into an actionable project brief. No premature sales pressure; only structured engineering definition.
                </p>
              </div>

              <div className="space-y-4 pt-6 border-t border-white/10">
                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href="/wash-plant/architect"
                    className="inline-flex items-center gap-3 bg-alkota-orange text-white px-8 py-4 text-xs uppercase tracking-[0.25em] hover:bg-white hover:text-alkota-black transition-colors shadow-lg"
                  >
                    <span>Build a Preliminary Project Brief</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/contact?enquiry=wash-plant-site-survey"
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-alkota-silver hover:text-white transition-colors px-4 py-4 border border-white/20 hover:border-white"
                  >
                    <span>Request a Site Survey</span>
                  </Link>
                </div>
                <span className="block font-ibm-plex-mono text-[9px] text-[#666] uppercase tracking-widest">
                  Generates downloadable project brief & routes directly to Alkota engineering
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#181818] p-8 sm:p-12 border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col justify-center">
              <span className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.25em] text-alkota-orange block mb-6">
                9-STEP SCOPING FRAMEWORK
              </span>
              <div className="space-y-2 font-ibm-plex-mono text-xs text-[#aaa]">
                <div className="flex items-center justify-between p-2.5 bg-[#101010] border border-[#222]">
                  <span>01. ASSET PROFILE</span>
                  <span className="text-alkota-orange">Vehicles, Plant, Mats</span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-[#101010] border border-[#222]">
                  <span>02. ENVELOPE & CLEARANCES</span>
                  <span className="text-[#666]">Dimensions, No-Spray</span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-[#101010] border border-[#222]">
                  <span>03. THROUGHPUT DEMAND</span>
                  <span className="text-alkota-orange">Units/hr, Shift Windows</span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-[#101010] border border-[#222]">
                  <span>04. CONTAMINATION</span>
                  <span className="text-[#666]">Mud, Bitumen, Slurry</span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-[#101010] border border-[#222]">
                  <span>05. AUTOMATION STRATEGY</span>
                  <span className="text-alkota-orange">Manual vs Automated</span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-[#101010] border border-[#222]">
                  <span>06. WATER & EFFLUENT</span>
                  <span className="text-[#666]">Mains, Closed-Loop</span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-[#101010] border border-[#222]">
                  <span>07. SITE & CIVILS</span>
                  <span className="text-[#666]">Footprint, Power, Trenches</span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-[#101010] border border-[#222]">
                  <span>08. PROJECT STAGE</span>
                  <span className="text-alkota-orange">Budget, Feasibility, Tender</span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-[#101010] border border-[#222]">
                  <span>09. LIFECYCLE PPM</span>
                  <span className="text-[#666]">Spares, SLA, Maintenance</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CHAPTER 5: CONTROLS & AUTOMATION (DARK / INDUSTRIAL CONTROLS) ──── */}
      <section className="py-24 px-6 sm:px-12 bg-[#101010] text-white border-b border-[#222]">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
            <div className="lg:col-span-6 space-y-6">
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.35em] text-alkota-orange block">
                CONTROLS & AUTOMATION PHILOSOPHY
              </span>
              <h2 className="font-extralight text-4xl sm:text-5xl uppercase tracking-tight text-white leading-tight">
                Automate what creates value.
              </h2>
              <p className="text-sm text-alkota-steel leading-relaxed">
                Modern industrial wash plants operate as integrated process control systems. We design electrical and automation architectures utilizing industrial PLCs, variable speed drives, optical profiling sensors, and safety interlocks.
              </p>
              <p className="text-sm text-alkota-steel leading-relaxed">
                Where specified, wash systems are delivered <strong className="text-white font-normal">remote monitoring capable</strong> and <strong className="text-white font-normal">data-ready</strong> — structured to accommodate telemetry for operating hours, cycle counters, filter differential pressures, and predictive maintenance alerts.
              </p>

              {/* Automation Spectrum */}
              <div className="pt-4 space-y-2">
                <span className="font-ibm-plex-mono text-[10px] text-[#777] uppercase tracking-widest block">
                  The Automation Spectrum:
                </span>
                <div className="grid grid-cols-5 gap-1 font-ibm-plex-mono text-[9px] uppercase tracking-wider text-center">
                  <div className="p-2 bg-[#181818] border border-[#252525] text-white">Manual</div>
                  <div className="p-2 bg-[#181818] border border-[#252525] text-white">Assisted</div>
                  <div className="p-2 bg-[#181818] border border-[#252525] text-alkota-orange font-medium">Semi-Auto</div>
                  <div className="p-2 bg-[#181818] border border-[#252525] text-alkota-orange font-medium">Automatic</div>
                  <div className="p-2 bg-[#181818] border border-[#252525] text-white">Integrated</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              {/* Illustrative Control Interface Preview */}
              <div className="bg-[#161616] border border-[#2A2A2A] p-6 shadow-xl">
                <div className="flex items-center justify-between pb-3 border-b border-[#2A2A2A] mb-4">
                  <span className="font-ibm-plex-mono text-[10px] text-alkota-orange uppercase tracking-widest">
                    ILLUSTRATIVE CONTROL INTERFACE
                  </span>
                  <span className="font-ibm-plex-mono text-[9px] bg-[#222] text-[#888] px-2 py-0.5 uppercase">
                    DATA-READY
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-ibm-plex-mono text-xs text-white mb-4">
                  <div className="p-3 bg-[#101010] border border-[#222]">
                    <span className="text-[9px] text-[#777] block">PUMP STATUS</span>
                    <span className="text-alkota-orange font-medium">RUNNING / 160 BAR</span>
                  </div>
                  <div className="p-3 bg-[#101010] border border-[#222]">
                    <span className="text-[9px] text-[#777] block">WATER TEMP</span>
                    <span className="text-white font-medium">85°C (THERMAL)</span>
                  </div>
                  <div className="p-3 bg-[#101010] border border-[#222]">
                    <span className="text-[9px] text-[#777] block">SAND FILTER</span>
                    <span className="text-green-400 font-medium">ΔP NORMAL (0.4 BAR)</span>
                  </div>
                  <div className="p-3 bg-[#101010] border border-[#222]">
                    <span className="text-[9px] text-[#777] block">RECLAIM LEVEL</span>
                    <span className="text-blue-400 font-medium">82% (16,400 L)</span>
                  </div>
                  <div className="p-3 bg-[#101010] border border-[#222]">
                    <span className="text-[9px] text-[#777] block">ACTIVE RECIPE</span>
                    <span className="text-white font-medium">CHASSIS & ARCH DE-MUCK</span>
                  </div>
                  <div className="p-3 bg-[#101010] border border-[#222]">
                    <span className="text-[9px] text-[#777] block">CYCLE COUNT</span>
                    <span className="text-white font-medium">42 UNITS (SHIFT 1)</span>
                  </div>
                </div>

                <span className="block text-[10px] font-ibm-plex-mono text-[#666] italic text-center">
                  * Interface parameters configured strictly per project specification. We do not publish fabricated live telemetry.
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 font-ibm-plex-mono text-xs uppercase tracking-wider text-white">
                <div className="p-3.5 bg-[#141414] border border-[#222]">
                  <Cpu className="h-4 w-4 text-alkota-orange mb-1.5" />
                  <span className="block font-medium">Industrial PLC</span>
                  <span className="text-[10px] text-[#777]">IP-rated enclosure — spec to application</span>
                </div>
                <div className="p-3.5 bg-[#141414] border border-[#222]">
                  <Sliders className="h-4 w-4 text-alkota-orange mb-1.5" />
                  <span className="block font-medium">Variable Speed Drives</span>
                  <span className="text-[10px] text-[#777]">Soft-start & power staging</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CHAPTER 6: WATER IS A PROCESS STREAM (LIGHT STEEL) ─────────────── */}
      <section className="py-24 px-6 sm:px-12 bg-white border-b border-alkota-iron">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
            <div className="lg:col-span-5 space-y-4">
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.35em] text-alkota-orange block">
                WATER PROCESS & EFFLUENT GOVERNANCE
              </span>
              <h2 className="font-extralight text-4xl sm:text-5xl uppercase tracking-tight text-alkota-black leading-tight">
                Water is a process stream.
              </h2>
              <p className="text-sm text-alkota-silver leading-relaxed">
                A wash plant does not simply consume water; it manages an entire effluent cycle. From primary sediment settlement and coalescing oil separation through deep-bed media filtration, we engineer water treatment systems that enable closed-loop recirculation or statutory trade effluent compliance.
              </p>
              <p className="text-xs text-alkota-silver leading-relaxed">
                Actual water treatment scope is engineered around site soil chemistry, local water authority discharge consents, and operational recovery objectives.
              </p>
              <div className="pt-4">
                <Link
                  href="/water-treatment"
                  className="inline-flex items-center gap-2 text-xs font-ibm-plex-mono uppercase tracking-widest text-alkota-orange hover:text-alkota-black transition-colors font-medium"
                >
                  <span>Explore Water Treatment Systems Range →</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 font-ibm-plex-mono text-xs text-alkota-black">
              <div className="p-5 bg-alkota-bg border border-alkota-iron space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-alkota-orange font-bold">01. COLLECTION & SUMPS</span>
                  <span className="text-[9px] text-alkota-silver">CONTAINMENT</span>
                </div>
                <p className="text-alkota-silver leading-relaxed">Impermeable graded concrete aprons and heavy galvanized sumps with silt catchbaskets prevent uncontrolled runoff.</p>
              </div>
              <div className="p-5 bg-alkota-bg border border-alkota-iron space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-alkota-orange font-bold">02. SOLIDS SETTLEMENT</span>
                  <span className="text-[9px] text-alkota-silver">SLURRY EXTRACTION</span>
                </div>
                <p className="text-alkota-silver leading-relaxed">Gravity settlement weir chambers and optional automated screw augers drop out heavy gravel, aggregate, and clay.</p>
              </div>
              <div className="p-5 bg-alkota-bg border border-alkota-iron space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-alkota-orange font-bold">03. COALESCING SEPARATION</span>
                  <span className="text-[9px] text-alkota-silver">CONSENT STANDARD</span>
                </div>
                <p className="text-alkota-silver leading-relaxed">Class 1 oleophilic coalescing plate packs separate free hydrocarbons and fuels to meet UK trade effluent standards.</p>
              </div>
              <div className="p-5 bg-alkota-bg border border-alkota-iron space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-alkota-orange font-bold">04. CLOSED-LOOP POLISHING</span>
                  <span className="text-[9px] text-alkota-silver">RECIRCULATION</span>
                </div>
                <p className="text-alkota-silver leading-relaxed">Pressurized multi-media filter vessels remove suspended solids to the clarity required for closed-loop pump protection and recirculation.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CHAPTER 7: FROM SITE SURVEY TO COMMISSIONING (DARK METHODOLOGY) ── */}
      <section className="py-24 px-6 sm:px-12 bg-[#0D0D0D] text-white border-b border-[#222]">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 max-w-3xl">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.35em] text-alkota-orange block mb-2">
              CAPITAL PROJECT DELIVERY
            </span>
            <h2 className="font-extralight text-4xl sm:text-6xl uppercase tracking-tight text-white mb-4">
              From site survey to commissioning.
            </h2>
            <p className="text-xs sm:text-sm text-[#888] uppercase tracking-widest">
              Every major capital installation follows our six-phase engineering delivery framework.
            </p>
          </div>

          {/* 6 Macro Phases Horizontal Flow */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mb-8">
            {MACRO_PHASES.map((p, idx) => {
              const isSelected = idx === activePhaseIdx;
              return (
                <button
                  key={p.num}
                  onClick={() => setActivePhaseIdx(idx)}
                  className={`p-4 text-left border transition-all flex flex-col justify-between min-h-[120px] ${
                    isSelected
                      ? 'bg-alkota-black border-alkota-orange text-white shadow-lg ring-1 ring-alkota-orange'
                      : 'bg-[#141414] border-[#222] text-[#aaa] hover:border-[#444] hover:bg-[#181818]'
                  }`}
                >
                  <span className={`font-ibm-plex-mono text-xs font-bold ${
                    isSelected ? 'text-alkota-orange' : 'text-[#666]'
                  }`}>
                    PHASE {p.num}
                  </span>
                  <div>
                    <h5 className="font-light text-sm uppercase tracking-tight text-white mt-1">
                      {p.phase}
                    </h5>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Selected Phase Breakdown */}
          <div className="bg-[#141414] border border-[#252525] p-8 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="font-ibm-plex-mono text-[10px] bg-alkota-orange text-white px-2.5 py-0.5 uppercase tracking-widest">
                    Phase {MACRO_PHASES[activePhaseIdx].num}
                  </span>
                  <span className="font-ibm-plex-mono text-xs text-[#888] uppercase tracking-wider">
                    {MACRO_PHASES[activePhaseIdx].phase}
                  </span>
                </div>

                <h3 className="font-extralight text-2xl sm:text-3xl uppercase tracking-tight text-white">
                  {MACRO_PHASES[activePhaseIdx].headline}
                </h3>

                <p className="text-xs sm:text-sm text-[#bbb] leading-relaxed">
                  {MACRO_PHASES[activePhaseIdx].summary}
                </p>

                <div className="p-4 bg-[#101010] border border-[#222] font-ibm-plex-mono text-xs">
                  <span className="text-[9px] uppercase tracking-widest text-alkota-orange block mb-1">
                    Primary Phase Deliverable:
                  </span>
                  <span className="text-white font-medium">
                    {MACRO_PHASES[activePhaseIdx].deliverables}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-3 bg-[#111] p-6 border border-[#222]">
                <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-white block mb-2">
                  Engineering Activities & Quality Gates:
                </span>
                <div className="space-y-2.5 font-ibm-plex-mono text-xs text-[#ccc]">
                  {MACRO_PHASES[activePhaseIdx].milestones.map((m, mIdx) => (
                    <div key={mIdx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-alkota-orange shrink-0 mt-0.5" />
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CHAPTER 8: ENGINEERED INSTALLATIONS (CASE STUDIES IN PREPARATION) ── */}
      <section className="py-24 px-6 sm:px-12 bg-white border-b border-alkota-iron">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.35em] text-alkota-orange block mb-2">
                PROJECT CASE STUDIES
              </span>
              <h2 className="font-extralight text-4xl sm:text-5xl uppercase tracking-tight text-alkota-black">
                Engineered installations.
              </h2>
            </div>
            <Link
              href="/wash-plant/projects"
              className="inline-flex items-center gap-2 font-ibm-plex-mono text-xs uppercase tracking-widest text-alkota-orange hover:text-alkota-black transition-colors font-medium shrink-0"
            >
              <span>Project Archive →</span>
            </Link>
          </div>

          {/* Case Studies — awaiting verified project authorisation */}
          <div className="bg-white border border-alkota-iron p-8 sm:p-12 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-7 space-y-5">
                <div>
                  <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-2">
                    PROJECT ARCHIVE IN PREPARATION
                  </span>
                  <h3 className="font-extralight text-3xl sm:text-4xl uppercase tracking-tight text-alkota-black mb-4">
                    Case studies are compiled with client authorisation.
                  </h3>
                  <p className="text-sm text-alkota-silver leading-relaxed">
                    Each installation we commission involves confidential site, operational, and commercial data. We do not publish project case studies without the express approval of the client organisation.
                  </p>
                  <p className="text-sm text-alkota-silver leading-relaxed mt-3">
                    If you are evaluating Alkota for a capital wash plant project, our engineering team can provide relevant project references on a confidential basis during your appraisal process.
                  </p>
                </div>

                <div className="pt-4">
                  <Link
                    href="/contact?enquiry=wash-plant-project-references"
                    className="inline-flex items-center gap-3 bg-alkota-orange text-white px-8 py-4 text-xs uppercase tracking-[0.25em] hover:bg-alkota-black transition-colors"
                  >
                    <span>Request Project References</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 bg-alkota-bg border border-alkota-iron p-6 space-y-4 font-ibm-plex-mono text-xs">
                <span className="text-[9px] uppercase tracking-[0.3em] text-alkota-orange block">SECTORS WE HAVE WORKED ACROSS</span>
                {[
                  'Commercial Fleet & HGV Depots',
                  'Heavy Plant & Earthmoving Sites',
                  'Quarrying, Mining & Aggregate',
                  'Access Matting & Groundworks',
                  'Steel Sheet Piling & Formwork',
                  'Rail & Passenger Transport',
                  'Agriculture & Forestry',
                  'Industrial Components & Process Equipment'
                ].map((sector) => (
                  <div key={sector} className="flex items-center gap-2 text-alkota-black">
                    <CheckCircle2 className="h-3.5 w-3.5 text-alkota-orange shrink-0" />
                    <span>{sector}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CHAPTER 9: OWN THE LIFECYCLE (LIFECYCLE ECOSYSTEM) ─────────────── */}
      <section className="py-24 px-6 sm:px-12 bg-alkota-bg border-b border-alkota-iron">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 max-w-3xl">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.35em] text-alkota-orange block mb-2">
              LIFECYCLE ECOSYSTEM
            </span>
            <h2 className="font-extralight text-4xl sm:text-6xl uppercase tracking-tight text-alkota-black">
              Commissioning is the start of the asset life.
            </h2>
            <p className="text-xs sm:text-sm text-alkota-silver uppercase tracking-widest mt-2">
              Three commercial service lines supporting your wash plant before, during, and for decades after installation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Service 1: Service & Maintenance */}
            <div className="bg-white border border-alkota-iron p-8 flex flex-col justify-between shadow-sm">
              <div>
                <span className="font-ibm-plex-mono text-[9px] bg-alkota-black text-white px-2.5 py-1 uppercase tracking-widest inline-block mb-4">
                  OPERATIONAL AVAILABILITY
                </span>
                <h3 className="font-extralight text-2xl uppercase tracking-tight text-alkota-black mb-3">
                  Service & Maintenance
                </h3>
                <p className="text-xs text-alkota-silver leading-relaxed mb-6">
                  Planned preventative maintenance, rapid emergency response, pump overhauls, combustion tuning, and multi-manufacturer support for all third-party industrial wash plants.
                </p>
                <div className="space-y-1.5 font-ibm-plex-mono text-xs text-alkota-black border-t border-alkota-iron/60 pt-4 mb-6">
                  <p>• 4 Tiered PPM & SLA Contracts</p>
                  <p>• Multi-Brand Third-Party Support</p>
                  <p>• Critical Spares Inventory Holding</p>
                </div>
              </div>
              <Link
                href="/wash-plant/service-maintenance"
                className="inline-flex items-center gap-2 bg-alkota-black text-white px-6 py-3 text-xs uppercase tracking-widest hover:bg-alkota-orange transition-colors"
              >
                <span>Explore Service Line</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Service 2: Asset Management */}
            <div className="bg-white border border-alkota-iron p-8 flex flex-col justify-between shadow-sm">
              <div>
                <span className="font-ibm-plex-mono text-[9px] bg-alkota-black text-white px-2.5 py-1 uppercase tracking-widest inline-block mb-4">
                  DIGITAL ASSET GOVERNANCE
                </span>
                <h3 className="font-extralight text-2xl uppercase tracking-tight text-alkota-black mb-3">
                  Asset Management
                </h3>
                <p className="text-xs text-alkota-silver leading-relaxed mb-6">
                  Digital 5-level component registers, 45-point maintenance inspection scopes, condition grading, replacement forecasting, and data-ready telemetry integration.
                </p>
                <div className="space-y-1.5 font-ibm-plex-mono text-xs text-alkota-black border-t border-alkota-iron/60 pt-4 mb-6">
                  <p>• 5-Level Asset Hierarchy Register</p>
                  <p>• Obsolescence Risk Mapping</p>
                  <p>• Lifecycle Replacement Forecasting</p>
                </div>
              </div>
              <Link
                href="/wash-plant/asset-management"
                className="inline-flex items-center gap-2 bg-alkota-black text-white px-6 py-3 text-xs uppercase tracking-widest hover:bg-alkota-orange transition-colors"
              >
                <span>Explore Asset Governance</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Service 3: Refurbishment & Upgrades */}
            <div className="bg-white border border-alkota-iron p-8 flex flex-col justify-between shadow-sm">
              <div>
                <span className="font-ibm-plex-mono text-[9px] bg-alkota-black text-white px-2.5 py-1 uppercase tracking-widest inline-block mb-4">
                  BROWNFIELD LIFE EXTENSION
                </span>
                <h3 className="font-extralight text-2xl uppercase tracking-tight text-alkota-black mb-3">
                  Refurbishment & Upgrades
                </h3>
                <p className="text-xs text-alkota-silver leading-relaxed mb-6">
                  Targeted engineering overhauls on existing live wash sites: pump swaps, PLC migrations, water recycling retrofits, and automation upgrades without plant replacement.
                </p>
                <div className="space-y-1.5 font-ibm-plex-mono text-xs text-alkota-black border-t border-alkota-iron/60 pt-4 mb-6">
                  <p>• Brownfield Live-Site Delivery</p>
                  <p>• PLC Modernization & VSD Retrofit</p>
                  <p>• Water Treatment Plant Upgrades</p>
                </div>
              </div>
              <Link
                href="/wash-plant/refurbishment-upgrades"
                className="inline-flex items-center gap-2 bg-alkota-black text-white px-6 py-3 text-xs uppercase tracking-widest hover:bg-alkota-orange transition-colors"
              >
                <span>Explore Upgrades</span>
                <ArrowRight className="h-3.5 w-3.5" />
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
