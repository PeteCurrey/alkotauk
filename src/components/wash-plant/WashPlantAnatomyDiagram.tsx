'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ArrowDown,
  Droplets,
  Truck,
  Flame,
  Cpu,
  Layers,
  Settings,
  ShieldCheck,
  CheckCircle2,
  Activity,
  Zap,
  Info,
  Maximize2
} from 'lucide-react';
import Link from 'next/link';

interface NodeDetail {
  id: string;
  stream: 'cleaning' | 'water' | 'auxiliary';
  num: string;
  name: string;
  category: string;
  summary: string;
  technicalSpecs: string[];
  operationalRole: string;
  effluentOrHydraulicNote: string;
}

const NODES: NodeDetail[] = [
  // Cleaning Stream
  {
    id: 'c1',
    stream: 'cleaning',
    num: '01',
    name: 'Asset Entry & Profiling',
    category: 'Asset Infeed',
    summary: 'Optical vehicle profiling and sonar sensors detect asset geometry, wheel locations, and clearances upon bay approach.',
    technicalSpecs: ['Sonar approach triggers', 'Optical contour profiling', 'Visual operator traffic signaling', 'Entry safety interlocks'],
    operationalRole: 'Initiates automated wash sequence recipes and verifies asset envelope before high-pressure actuation.',
    effluentOrHydraulicNote: 'Prevents dry-firing and ensures spray manifolds are energized only when the asset is correctly positioned.'
  },
  {
    id: 'c2',
    stream: 'cleaning',
    num: '02',
    name: 'High-Volume Pre-Clean / De-Muck',
    category: 'Primary Strip',
    summary: 'High-volume water monitors and oscillating spray bars knock down heavy caked mud, clay, and bulk sediment.',
    technicalSpecs: ['80–120 GPM mass water volume', 'Low-pressure / high-flow hydraulic balance', 'Oscillating flood headers', 'Joystick or automated control'],
    operationalRole: 'Removes 80%+ of gross soil mass before precision high-pressure detailing, preventing lance blockage.',
    effluentOrHydraulicNote: 'Generates the primary slurry load that drains directly into heavy-duty settlement sumps.'
  },
  {
    id: 'c3',
    stream: 'cleaning',
    num: '03',
    name: 'Hot-Water / High-Pressure Primary Wash',
    category: 'Thermal & Pressure',
    summary: 'Continuous-wound Schedule 80 heating coils deliver hot water (up to 85°C) or wet steam (150°C) at 150–200 BAR.',
    technicalSpecs: ['Heavy-wall heating coils (spec to application)', 'High-pressure pump delivery (type to application)', 'Synchronized rotary spray bars', 'Pneumatic chemical dosing'],
    operationalRole: 'Breaks hydrocarbon bonds, dissolves grease, and emulsifies road film across all external surfaces.',
    effluentOrHydraulicNote: 'Water stream carries emulsified oils and dissolved contaminants into the bay drainage and water recovery system.'
  },
  {
    id: 'c4',
    stream: 'cleaning',
    num: '04',
    name: 'Undercarriage & Specialist Detailing',
    category: 'Chassis & Detail',
    summary: 'High-pressure underbody spinner manifolds and balanced ergonomic operator lances clean chassis and running gear.',
    technicalSpecs: ['Underbody drive-over spinner arrays', 'Overhead 360° stainless boom arms', 'Twin-lance drop stations', 'Wheel & arch wash lances'],
    operationalRole: 'Ensures MOT-standard chassis cleanliness, wheel arch clearance, and access to critical mechanical assemblies.',
    effluentOrHydraulicNote: 'Concentrated oil and brake dust runoff is directed straight into the coalescing separation train.'
  },
  {
    id: 'c5',
    stream: 'cleaning',
    num: '05',
    name: 'Final Rinse & Surface Polishing',
    category: 'Final Stage',
    summary: 'Controlled final rinse using fresh mains or polished recycled water, with optional spot-free wax injection.',
    technicalSpecs: ['Low-pressure polished water feed', 'Wax / drying aid injection', 'Anti-streaking surface rinse', 'Total run-off containment'],
    operationalRole: 'Rinses residual surfactant and leaves asset clean and ready for immediate operational deployment or inspection.',
    effluentOrHydraulicNote: 'Runoff joins the secondary recycling buffer with minimal solids loading.'
  },
  {
    id: 'c6',
    stream: 'cleaning',
    num: '06',
    name: 'Clean Asset Exit & Inspection',
    category: 'Dispatch',
    summary: 'Clearance verification, optical exit sensors, cycle completion logging, and automated bay reset.',
    technicalSpecs: ['Exit clearance confirmation', 'Cycle time logging to PLC', 'Automated frost purge trigger', 'Green dispatch signal'],
    operationalRole: 'Logs completed wash cycle to asset history or fleet register and resets the bay for next asset entry.',
    effluentOrHydraulicNote: 'Automated drainage purge cleans lines if plant is entering idle or frost-protection mode.'
  },

  // Water Recovery Stream
  {
    id: 'w1',
    stream: 'water',
    num: 'W1',
    name: 'Graded Apron & Catchment Sumps',
    category: 'Collection',
    summary: 'Impermeable reinforced concrete aprons graded to central trenches with heavy-duty galvanized catchbaskets.',
    technicalSpecs: ['D400 load-rated galvanized grating', 'Multi-point silt catch baskets', 'Engineered apron gradient (1:40)', 'Sub-surface sump pumps'],
    operationalRole: 'Captures 100% of contaminated wash water, preventing uncontrolled site run-off and groundwater contamination.',
    effluentOrHydraulicNote: 'Primary barrier against uncontained environmental discharge, complying with PPG3 / GPP guidelines.'
  },
  {
    id: 'w2',
    stream: 'water',
    num: 'W2',
    name: 'Primary Settlement & Solids Extraction',
    category: 'Solids Management',
    summary: 'Multi-chamber gravity settlement pits and optional automated screw augers drop out dense grit, aggregate, and clay.',
    technicalSpecs: ['Multi-chamber baffle weir design', 'Automated sludge auger screw (optional)', 'Hydrocyclone solids separation', 'High-volume sump holding'],
    operationalRole: 'Eliminates gross particulate matter down to 50 microns before effluent reaches downstream filtration.',
    effluentOrHydraulicNote: 'Protects pumps and valves from catastrophic abrasive wear by dropping heavy aggregate immediately.'
  },
  {
    id: 'w3',
    stream: 'water',
    num: 'W3',
    name: 'Coalescing Oil Separation',
    category: 'Hydrocarbon Removal',
    summary: 'Coalescing oil interceptor with oleophilic plate packs and automatic closure devices, specified to achieve required discharge quality.',
    technicalSpecs: ['Class 1 coalescing media pack', 'Discharge oil concentration to consent standard', 'Automatic closure float valve', 'Visual & acoustic oil alarm'],
    operationalRole: 'Separates free-floating fuels, engine oils, and hydraulic fluids from the effluent stream.',
    effluentOrHydraulicNote: 'Ensures water quality meets statutory discharge standards or can safely enter closed-loop polishing vessels.'
  },
  {
    id: 'w4',
    stream: 'water',
    num: 'W4',
    name: 'Deep-Bed Media Sand Filtration',
    category: 'Polishing',
    summary: 'Pressurized multi-grade media vessels filter suspended solids to the clarity required for pump and system protection.',
    technicalSpecs: ['Multi-layer silica / anthracite / garnet bed', 'Automated differential backwash valve', 'Continuous differential pressure monitoring', 'Biocide / ozone dosing integration'],
    operationalRole: 'Polishes water to high optical clarity, stripping fine silt that would damage high-pressure pump ceramic seals.',
    effluentOrHydraulicNote: 'Automated backwash cycle flushes trapped particulate back to primary settlement chambers on pressure differential.'
  },
  {
    id: 'w5',
    stream: 'water',
    num: 'W5',
    name: 'Reclaim Storage & Buffer Tanks',
    category: 'Buffer Storage',
    summary: 'Rotomoulded or stainless steel buffer reservoirs with automated mains top-up and dry-run safety interlocks.',
    technicalSpecs: ['5,000–25,000L buffer capacity', 'Ultrasonic continuous level sensor', 'Mains fail-safe break tank', 'Submersible booster feed pumps'],
    operationalRole: 'Provides instantaneous hydraulic buffer capacity for high-volume wash cycles without draining mains supply.',
    effluentOrHydraulicNote: 'Stores reclaimed water for continuous loop return; balances supply during peak fleet washing shifts.'
  },
  {
    id: 'w6',
    stream: 'water',
    num: 'W6',
    name: 'Booster Return or Regulated Discharge',
    category: 'Recirculation / Discharge',
    summary: 'Pressurized booster pump re-feeds high-pressure skids, or compliant water is discharged under Trade Effluent consent.',
    technicalSpecs: ['Multistage stainless booster pumps', 'Trade effluent sample point chamber', 'Automated divert valve to sewer / reclaim', 'Flow totalizer & logging'],
    operationalRole: 'Completes the circular process loop, delivering up to 90% water reduction where closed-loop is specified.',
    effluentOrHydraulicNote: 'Water is either re-pressurised for the next wash cycle or safely discharged under water company consent.'
  }
];

export default function WashPlantAnatomyDiagram() {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('c3');
  const activeNode = NODES.find((n) => n.id === selectedNodeId) || NODES[2];

  const cleaningNodes = NODES.filter((n) => n.stream === 'cleaning');
  const waterNodes = NODES.filter((n) => n.stream === 'water');

  return (
    <div className="bg-[#0E0E0E] text-white border border-[#222] p-6 sm:p-10 shadow-2xl">
      {/* Header & Diagram Principle */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#222] mb-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-ibm-plex-mono text-[10px] bg-alkota-orange text-white px-2.5 py-0.5 uppercase tracking-widest">
              SYSTEM ARCHITECTURE SCHEMATIC
            </span>
            <span className="font-ibm-plex-mono text-[10px] text-[#777] uppercase tracking-wider">
              Project-Specific Engineering
            </span>
          </div>
          <h3 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-white">
            Anatomy of an Industrial Wash Plant.
          </h3>
          <p className="text-xs sm:text-sm text-[#999] max-w-2xl mt-2 leading-relaxed">
            The washing process and the water treatment stream are designed as a single continuous hydraulic cycle. Select any station below to inspect its operational role and engineering parameters.
          </p>
        </div>

        <div className="flex items-center gap-4 text-[11px] font-ibm-plex-mono text-[#888] shrink-0">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-alkota-orange" />
            <span>Cleaning Process</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-blue-500" />
            <span>Water Recovery Stream</span>
          </div>
        </div>
      </div>

      {/* ── DESKTOP & TABLET: DUAL-STREAM SYNCHRONIZED FLOW ─────────────────── */}
      <div className="space-y-8 mb-10">
        {/* Stream 1: Asset Cleaning Sequence */}
        <div className="bg-[#141414] border border-[#222] p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-alkota-orange" />
              <span className="font-ibm-plex-mono text-xs uppercase tracking-widest text-white font-medium">
                Surface Cleaning Stream (Above Bay)
              </span>
            </div>
            <span className="font-ibm-plex-mono text-[10px] text-alkota-orange uppercase tracking-wider">
              Asset Progression →
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {cleaningNodes.map((node) => {
              const isSelected = node.id === selectedNodeId;
              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedNodeId(node.id)}
                  className={`p-3.5 text-left border transition-all flex flex-col justify-between min-h-[110px] ${
                    isSelected
                      ? 'bg-alkota-black border-alkota-orange text-white ring-1 ring-alkota-orange shadow-lg'
                      : 'bg-[#101010] border-[#252525] text-[#ccc] hover:border-[#444] hover:bg-[#181818]'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className={`font-ibm-plex-mono text-xs font-bold ${
                      isSelected ? 'text-alkota-orange' : 'text-[#666]'
                    }`}>
                      {node.num}
                    </span>
                    {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-alkota-orange" />}
                  </div>
                  <div>
                    <span className="font-ibm-plex-mono text-[9px] text-[#777] uppercase block truncate">
                      {node.category}
                    </span>
                    <h5 className="font-light text-xs uppercase tracking-tight text-white mt-0.5 leading-snug">
                      {node.name}
                    </h5>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Hydraulic Return Loop Indicator */}
        <div className="flex items-center justify-between px-6 py-2 bg-[#121212] border border-[#222] font-ibm-plex-mono text-[10px] text-[#777] uppercase tracking-wider">
          <div className="flex items-center gap-2 text-alkota-silver">
            <ArrowDown className="h-3.5 w-3.5 text-alkota-orange shrink-0 animate-pulse" />
            <span>Continuous Bay Drainage & Hydrocarbon Runoff Collection</span>
          </div>
          <div className="flex items-center gap-2 text-blue-400">
            <span>Pressurized Booster Recirculation or Regulated Trade Effluent</span>
            <Droplets className="h-3.5 w-3.5 text-blue-400 shrink-0" />
          </div>
        </div>

        {/* Stream 2: Water Treatment & Recovery Stream */}
        <div className="bg-[#141414] border border-[#222] p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Droplets className="h-4 w-4 text-blue-400" />
              <span className="font-ibm-plex-mono text-xs uppercase tracking-widest text-white font-medium">
                Water Recovery & Treatment Stream (Subterranean / Plant Room)
              </span>
            </div>
            <span className="font-ibm-plex-mono text-[10px] text-blue-400 uppercase tracking-wider">
              Effluent Polishing →
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {waterNodes.map((node) => {
              const isSelected = node.id === selectedNodeId;
              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedNodeId(node.id)}
                  className={`p-3.5 text-left border transition-all flex flex-col justify-between min-h-[110px] ${
                    isSelected
                      ? 'bg-alkota-black border-blue-500 text-white ring-1 ring-blue-500 shadow-lg'
                      : 'bg-[#101010] border-[#252525] text-[#ccc] hover:border-[#444] hover:bg-[#181818]'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className={`font-ibm-plex-mono text-xs font-bold ${
                      isSelected ? 'text-blue-400' : 'text-[#666]'
                    }`}>
                      {node.num}
                    </span>
                    {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />}
                  </div>
                  <div>
                    <span className="font-ibm-plex-mono text-[9px] text-[#777] uppercase block truncate">
                      {node.category}
                    </span>
                    <h5 className="font-light text-xs uppercase tracking-tight text-white mt-0.5 leading-snug">
                      {node.name}
                    </h5>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── INTERACTIVE NODE DEEP-DIVE INSPECTION DRAWER ─────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeNode.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.2 }}
          className="bg-[#161616] border border-[#2A2A2A] p-6 sm:p-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-3">
                <span className={`font-ibm-plex-mono text-[10px] px-2.5 py-0.5 uppercase tracking-widest text-white ${
                  activeNode.stream === 'cleaning' ? 'bg-alkota-orange' : 'bg-blue-600'
                }`}>
                  Station {activeNode.num}
                </span>
                <span className="font-ibm-plex-mono text-xs text-[#888] uppercase tracking-wider">
                  {activeNode.category}
                </span>
              </div>

              <h4 className="font-extralight text-2xl sm:text-3xl uppercase tracking-tight text-white">
                {activeNode.name}
              </h4>

              <p className="text-xs sm:text-sm text-[#bbb] leading-relaxed">
                {activeNode.summary}
              </p>

              <div className="p-4 bg-[#101010] border border-[#222]">
                <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange block mb-1">
                  Operational Objective:
                </span>
                <p className="text-xs text-[#aaa] leading-relaxed">
                  {activeNode.operationalRole}
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4 bg-[#111] p-6 border border-[#222]">
              <div>
                <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-white block mb-3">
                  Core Engineering Elements:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-ibm-plex-mono text-xs text-[#ccc]">
                  {activeNode.technicalSpecs.map((spec, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-alkota-orange shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#222]">
                <div className="flex items-center gap-2 mb-1.5">
                  <Activity className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                  <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-blue-400">
                    Hydraulic & Effluent Interface
                  </span>
                </div>
                <p className="text-xs text-[#888] leading-relaxed">
                  {activeNode.effluentOrHydraulicNote}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Plant Room Auxiliary Equipment Strip */}
      <div className="mt-10 pt-8 border-t border-[#222]">
        <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.3em] text-[#888] block mb-4">
          INTEGRATED POWERHOUSE & AUXILIARY EQUIPMENT
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 font-ibm-plex-mono text-xs text-white">
          <div className="p-3 bg-[#121212] border border-[#222]">
            <Cpu className="h-4 w-4 text-alkota-orange mb-1" />
            <span className="block font-medium">PLC Master Panel</span>
            <span className="text-[10px] text-[#777]">Industrial PLC — type to specification</span>
          </div>
          <div className="p-3 bg-[#121212] border border-[#222]">
            <Flame className="h-4 w-4 text-alkota-orange mb-1" />
            <span className="block font-medium">Heating Coils</span>
            <span className="text-[10px] text-[#777]">Spec to project application</span>
          </div>
          <div className="p-3 bg-[#121212] border border-[#222]">
            <Zap className="h-4 w-4 text-alkota-orange mb-1" />
            <span className="block font-medium">High-Pressure Pump Skids</span>
            <span className="text-[10px] text-[#777]">Redundancy where duty justifies</span>
          </div>
          <div className="p-3 bg-[#121212] border border-[#222]">
            <Settings className="h-4 w-4 text-alkota-orange mb-1" />
            <span className="block font-medium">Chemical Dosing</span>
            <span className="text-[10px] text-[#777]">Pneumatic Metering</span>
          </div>
          <div className="p-3 bg-[#121212] border border-[#222]">
            <ShieldCheck className="h-4 w-4 text-alkota-orange mb-1" />
            <span className="block font-medium">Safety Interlocks</span>
            <span className="text-[10px] text-[#777]">Safety interlocks to risk assessment</span>
          </div>
        </div>
      </div>
    </div>
  );
}
