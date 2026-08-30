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

      <section id="architectures" className="py-28 px-6 sm:px-12 bg-[#F8F7F4] border-b border-alkota-iron/40">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 max-w-3xl">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.35em] text-alkota-orange block mb-4">
              WASH SYSTEM ARCHITECTURES
            </span>
            <h2 className="font-extralight text-4xl sm:text-6xl uppercase tracking-tight text-alkota-black leading-none">
              One cleaning problem does not have one wash plant solution.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Left: Numbered Architecture List — clean typographic selector */}
            <div className="lg:col-span-5 space-y-0 divide-y divide-alkota-iron/30">
              {ARCHITECTURES.map((arch, idx) => {
                const isSelected = idx === selectedArchIdx;
                return (
                  <button
                    key={arch.id}
                    onClick={() => setSelectedArchIdx(idx)}
                    className={`w-full text-left py-5 flex items-start gap-5 group transition-all ${
                      isSelected ? '' : 'opacity-50 hover:opacity-80'
                    }`}
                  >
                    <span className={`font-extralight text-3xl leading-none tabular-nums shrink-0 transition-colors ${
                      isSelected ? 'text-alkota-orange' : 'text-alkota-iron'
                    }`}>
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div className="pt-1">
                      <h4 className={`text-sm uppercase tracking-tight font-normal leading-snug transition-colors ${
                        isSelected ? 'text-alkota-black' : 'text-alkota-silver group-hover:text-alkota-black'
                      }`}>
                        {arch.name}
                      </h4>
                      <span className={`text-[10px] font-ibm-plex-mono uppercase tracking-widest mt-1 block transition-colors ${
                        isSelected ? 'text-alkota-orange' : 'text-alkota-iron'
                      }`}>
                        {arch.badge}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right: Open Architecture Detail — no card, just structured editorial prose */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedArch.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="mb-8 pb-8 border-b border-alkota-iron/30">
                    <h3 className="font-extralight text-3xl sm:text-4xl uppercase tracking-tight text-alkota-black mb-3 leading-tight">
                      {selectedArch.name}
                    </h3>
                    <p className="text-base text-alkota-black font-normal leading-relaxed">
                      {selectedArch.headline}
                    </p>
                  </div>

                  {/* Structured detail rows — no boxes, just spaced type */}
                  <div className="space-y-6 mb-10">
                    {[
                      { label: 'Best Suited To', value: selectedArch.bestSuitedTo },
                      { label: 'Cleaning Challenge', value: selectedArch.cleaningChallenge },
                      { label: 'Operating Principle', value: selectedArch.operatingPrinciple },
                      { label: 'Potential Integration', value: selectedArch.potentialIntegration },
                    ].map(({ label, value }) => (
                      <div key={label} className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-6">
                        <span className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.3em] text-alkota-orange sm:pt-0.5 shrink-0">
                          {label}
                        </span>
                        <p className="sm:col-span-2 text-sm text-alkota-silver leading-relaxed">
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Core mechanical elements — clean list, no icons */}
                  <div className="mb-10">
                    <span className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.3em] text-alkota-orange block mb-4">
                      Core Mechanical &amp; Hydraulic Elements
                    </span>
                    <div className="space-y-3">
                      {selectedArch.keySpecs.map((spec, sIdx) => (
                        <div key={sIdx} className="flex items-start gap-4 text-sm text-alkota-black">
                          <span className="text-alkota-orange font-light shrink-0 tabular-nums">{String(sIdx + 1).padStart(2, '0')}</span>
                          <span className="leading-snug">{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTAs — clean text links */}
                  <div className="flex flex-wrap items-center gap-6 pt-8 border-t border-alkota-iron/30">
                    <Link
                      href="/wash-plant/architect"
                      className="inline-flex items-center gap-3 bg-alkota-black text-white px-8 py-4 text-xs uppercase tracking-[0.2em] hover:bg-alkota-orange transition-colors"
                    >
                      <span>Scope in Architect</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    <Link
                      href={`/contact?enquiry=wash-plant-architecture&type=${selectedArch.id}`}
                      className="text-xs font-ibm-plex-mono uppercase tracking-widest text-alkota-silver hover:text-alkota-orange transition-colors"
                    >
                      Discuss This Application →
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
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
      <section className="py-28 px-6 sm:px-12 bg-[#0D0D0D] text-white border-b border-[#1A1A1A]">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-6 space-y-8">
              <div>
                <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.35em] text-alkota-orange block mb-5">
                  WASH PLANT ARCHITECT
                </span>
                <h2 className="font-extralight text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white mb-6 leading-none">
                  Start with the process.
                </h2>
                <p className="text-sm text-[#aaa] leading-relaxed mb-4">
                  Industrial wash plants are engineered capital projects. The Wash Plant Architect captures the primary engineering inputs needed to understand your application before a site survey or concept design.
                </p>
                <p className="text-xs text-[#666] leading-relaxed">
                  Structure your asset dimensions, throughput rates, contamination profile, site constraints, and water strategy into an actionable project brief. No premature sales pressure; only structured engineering definition.
                </p>
              </div>

              <div className="pt-4 space-y-4 border-t border-white/10">
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
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#888] hover:text-white transition-colors"
                  >
                    <span>Request a Site Survey →</span>
                  </Link>
                </div>
                <span className="block font-ibm-plex-mono text-[9px] text-[#555] uppercase tracking-widest">
                  Generates downloadable project brief &amp; routes directly to Alkota engineering
                </span>
              </div>
            </div>

            {/* 9-Step Framework — open numbered editorial grid, no row boxes */}
            <div className="lg:col-span-6">
              <span className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.3em] text-alkota-orange block mb-8">
                9-Step Scoping Framework
              </span>
              <div className="grid grid-cols-3 gap-x-8 gap-y-7">
                {[
                  { n: '01', title: 'Asset Profile', sub: 'Vehicles, Plant, Mats' },
                  { n: '02', title: 'Envelope', sub: 'Dimensions, No-Spray' },
                  { n: '03', title: 'Throughput', sub: 'Units/hr, Shift Windows' },
                  { n: '04', title: 'Contamination', sub: 'Mud, Bitumen, Slurry' },
                  { n: '05', title: 'Automation', sub: 'Manual vs Automated' },
                  { n: '06', title: 'Water & Effluent', sub: 'Mains, Closed-Loop' },
                  { n: '07', title: 'Site & Civils', sub: 'Footprint, Power' },
                  { n: '08', title: 'Project Stage', sub: 'Budget, Feasibility' },
                  { n: '09', title: 'Lifecycle PPM', sub: 'Spares, SLA' },
                ].map(({ n, title, sub }) => (
                  <div key={n}>
                    <span className="font-extralight text-2xl text-alkota-orange leading-none block mb-1">{n}</span>
                    <span className="font-ibm-plex-mono text-[10px] uppercase tracking-wide text-white block leading-snug">{title}</span>
                    <span className="font-ibm-plex-mono text-[9px] text-[#666] block mt-0.5">{sub}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CHAPTER 5: CONTROLS & AUTOMATION (DARK / INDUSTRIAL CONTROLS) ──── */}
      <section className="py-28 px-6 sm:px-12 bg-white border-b border-alkota-iron/40">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.35em] text-alkota-orange block mb-5">
                  CONTROLS &amp; AUTOMATION PHILOSOPHY
                </span>
                <h2 className="font-extralight text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-alkota-black leading-none mb-6">
                  Automate what creates value.
                </h2>
                <p className="text-sm text-alkota-silver leading-relaxed mb-4">
                  Modern industrial wash plants operate as integrated process control systems. We design electrical and automation architectures utilizing industrial PLCs, variable speed drives, optical profiling sensors, and safety interlocks.
                </p>
                <p className="text-sm text-alkota-silver leading-relaxed">
                  Where specified, wash systems are delivered <strong className="text-alkota-black font-normal">remote monitoring capable</strong> and <strong className="text-alkota-black font-normal">data-ready</strong> — structured to accommodate telemetry for operating hours, cycle counters, filter differential pressures, and predictive maintenance alerts.
                </p>
              </div>

              {/* Automation Spectrum — gradient bar, no boxes */}
              <div className="pt-4 border-t border-alkota-iron/30">
                <span className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.3em] text-alkota-orange block mb-3">
                  The Automation Spectrum
                </span>
                <div className="relative h-1.5 rounded-full bg-gradient-to-r from-alkota-iron/40 via-alkota-orange to-alkota-orange mb-3" />
                <div className="flex justify-between font-ibm-plex-mono text-[9px] uppercase tracking-wide text-alkota-silver">
                  {['Manual', 'Assisted', 'Semi-Auto', 'Automatic', 'Integrated'].map((label) => (
                    <span key={label}>{label}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Open editorial live-data display — no nested card boxes */}
            <div className="lg:col-span-7">
              <div className="mb-6 pb-4 border-b border-alkota-iron/30 flex items-center justify-between">
                <span className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.3em] text-alkota-orange">
                  Illustrative System Parameters
                </span>
                <span className="font-ibm-plex-mono text-[9px] text-alkota-silver uppercase tracking-widest">
                  Data-Ready
                </span>
              </div>

              {/* Data grid — clean type rows, no card borders */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-7 mb-6">
                {[
                  { label: 'Pump Status', value: 'Running / 160 Bar', accent: true },
                  { label: 'Water Temp', value: '85°C (Thermal)', accent: false },
                  { label: 'Sand Filter', value: 'ΔP Normal (0.4 Bar)', accent: false },
                  { label: 'Reclaim Level', value: '82% (16,400 L)', accent: false },
                  { label: 'Active Recipe', value: 'Chassis De-Muck', accent: false },
                  { label: 'Cycle Count', value: '42 Units (Shift 1)', accent: false },
                ].map(({ label, value, accent }) => (
                  <div key={label}>
                    <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-silver block mb-0.5">{label}</span>
                    <span className={`font-ibm-plex-mono text-xs font-medium ${accent ? 'text-alkota-orange' : 'text-alkota-black'}`}>{value}</span>
                  </div>
                ))}
              </div>

              <span className="block text-[10px] font-ibm-plex-mono text-alkota-silver/60 italic border-t border-alkota-iron/30 pt-4">
                * Interface parameters configured strictly per project specification.
              </span>

              {/* Two capability callouts — open, no box */}
              <div className="grid grid-cols-2 gap-8 mt-8 pt-6 border-t border-alkota-iron/30">
                <div>
                  <span className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.3em] text-alkota-orange block mb-1">Industrial PLC</span>
                  <span className="text-xs text-alkota-silver">IP-rated enclosure — specification to application</span>
                </div>
                <div>
                  <span className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.3em] text-alkota-orange block mb-1">Variable Speed Drives</span>
                  <span className="text-xs text-alkota-silver">Soft-start &amp; power staging</span>
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

            {/* Right: Numbered editorial water stage list */}
            <div className="lg:col-span-7 space-y-0 divide-y divide-alkota-iron/30">
              {[
                { n: '01', title: 'Collection & Sumps', sub: 'Containment', body: 'Impermeable graded concrete aprons and heavy galvanized sumps with silt catchbaskets prevent uncontrolled runoff.' },
                { n: '02', title: 'Solids Settlement', sub: 'Slurry Extraction', body: 'Gravity settlement weir chambers and optional automated screw augers drop out heavy gravel, aggregate, and clay.' },
                { n: '03', title: 'Coalescing Separation', sub: 'Consent Standard', body: 'Class 1 oleophilic coalescing plate packs separate free hydrocarbons and fuels to meet UK trade effluent standards.' },
                { n: '04', title: 'Closed-Loop Polishing', sub: 'Recirculation', body: 'Pressurized multi-media filter vessels remove suspended solids to the clarity required for closed-loop pump protection and recirculation.' },
              ].map(({ n, title, sub, body }) => (
                <div key={n} className="py-6 grid grid-cols-12 gap-6">
                  <span className="col-span-1 font-extralight text-2xl text-alkota-orange leading-none mt-0.5">{n}</span>
                  <div className="col-span-11">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="font-ibm-plex-mono text-[10px] uppercase tracking-tight text-alkota-black font-medium">{title}</span>
                      <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-silver">{sub}</span>
                    </div>
                    <p className="text-sm text-alkota-silver leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
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

              <div className="lg:col-span-6">
                <span className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.3em] text-alkota-orange block mb-6">
                  Engineering Activities &amp; Quality Gates
                </span>
                <div className="space-y-0 divide-y divide-white/10">
                  {MACRO_PHASES[activePhaseIdx].milestones.map((m, mIdx) => (
                    <div key={mIdx} className="py-3 flex items-start gap-4 font-ibm-plex-mono text-xs text-[#bbb]">
                      <span className="text-alkota-orange shrink-0 font-light">{String(mIdx + 1).padStart(2, '0')}</span>
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
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
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

              <div className="lg:col-span-5 space-y-4">
                <span className="text-[9px] uppercase tracking-[0.3em] text-alkota-orange block">SECTORS WE HAVE WORKED ACROSS</span>
                <span className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.3em] text-alkota-orange block mb-5">Sectors We Have Worked Across</span>
                {[
                  'Commercial Fleet & HGV Depots',
                  'Heavy Plant & Earthmoving Sites',
                  'Quarrying, Mining & Aggregate',
                  'Access Matting & Groundworks',
                  'Steel Sheet Piling & Formwork',
                  'Rail & Passenger Transport',
                  'Agriculture & Forestry',
                  'Industrial Components & Process Equipment'
                ].map((sector, i) => (
                  <div key={sector} className="py-2.5 border-b border-alkota-iron/30 flex items-baseline gap-3">
                    <span className="font-extralight text-sm text-alkota-orange shrink-0 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                    <span className="font-ibm-plex-mono text-[10px] uppercase tracking-wide text-alkota-black">{sector}</span>
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

          {/* Three service lines — open editorial columns, no card boxes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-alkota-iron/30 mb-16">
            {/* Service 1 */}
            <div className="md:pr-10 pb-10 md:pb-0 flex flex-col justify-between">
              <div>
                <span className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.3em] text-alkota-orange block mb-4">Operational Availability</span>
                <h3 className="font-extralight text-3xl sm:text-4xl uppercase tracking-tight text-alkota-black mb-4 leading-tight">
                  Service & Maintenance
                </h3>
                <p className="text-sm text-alkota-silver leading-relaxed mb-6">
                  Planned preventative maintenance, rapid emergency response, pump overhauls, combustion tuning, and multi-manufacturer support for all third-party industrial wash plants.
                </p>
                <div className="space-y-2.5 mb-8">
                  {['4 Tiered PPM & SLA Contracts', 'Multi-Brand Third-Party Support', 'Critical Spares Inventory Holding'].map((f) => (
                    <div key={f} className="text-sm text-alkota-black flex items-baseline gap-3">
                      <span className="text-alkota-orange shrink-0">—</span>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Link href="/wash-plant/service-maintenance" className="inline-flex items-center gap-2 text-xs font-ibm-plex-mono uppercase tracking-widest text-alkota-black hover:text-alkota-orange transition-colors">
                Explore Service Line <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            {/* Service 2 */}
            <div className="md:px-10 py-10 md:py-0 flex flex-col justify-between">
              <div>
                <span className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.3em] text-alkota-orange block mb-4">Digital Asset Governance</span>
                <h3 className="font-extralight text-3xl sm:text-4xl uppercase tracking-tight text-alkota-black mb-4 leading-tight">
                  Asset Management
                </h3>
                <p className="text-sm text-alkota-silver leading-relaxed mb-6">
                  Digital 5-level component registers, 45-point maintenance inspection scopes, condition grading, replacement forecasting, and data-ready telemetry integration.
                </p>
                <div className="space-y-2.5 mb-8">
                  {['5-Level Asset Hierarchy Register', 'Obsolescence Risk Mapping', 'Lifecycle Replacement Forecasting'].map((f) => (
                    <div key={f} className="text-sm text-alkota-black flex items-baseline gap-3">
                      <span className="text-alkota-orange shrink-0">—</span>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Link href="/wash-plant/asset-management" className="inline-flex items-center gap-2 text-xs font-ibm-plex-mono uppercase tracking-widest text-alkota-black hover:text-alkota-orange transition-colors">
                Explore Asset Governance <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            {/* Service 3 */}
            <div className="md:pl-10 pt-10 md:pt-0 flex flex-col justify-between">
              <div>
                <span className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.3em] text-alkota-orange block mb-4">Brownfield Life Extension</span>
                <h3 className="font-extralight text-3xl sm:text-4xl uppercase tracking-tight text-alkota-black mb-4 leading-tight">
                  Refurbishment & Upgrades
                </h3>
                <p className="text-sm text-alkota-silver leading-relaxed mb-6">
                  Targeted engineering overhauls on existing live wash sites: pump swaps, PLC migrations, water recycling retrofits, and automation upgrades without plant replacement.
                </p>
                <div className="space-y-2.5 mb-8">
                  {['Brownfield Live-Site Delivery', 'PLC Modernization & VSD Retrofit', 'Water Treatment Plant Upgrades'].map((f) => (
                    <div key={f} className="text-sm text-alkota-black flex items-baseline gap-3">
                      <span className="text-alkota-orange shrink-0">—</span>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Link href="/wash-plant/refurbishment-upgrades" className="inline-flex items-center gap-2 text-xs font-ibm-plex-mono uppercase tracking-widest text-alkota-black hover:text-alkota-orange transition-colors">
                Explore Upgrades <ArrowRight className="h-3 w-3" />
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
