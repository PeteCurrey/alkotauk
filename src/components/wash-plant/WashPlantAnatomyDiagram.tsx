'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowDown,
  Droplets,
  Truck,
  Flame,
  Cpu,
  Settings,
  ShieldCheck,
  CheckCircle2,
  Activity,
  Zap
} from 'lucide-react';

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
    effluentOrHydraulicNote: 'Triggers post-cycle drainage sumps and readies reclaim staging buffers.'
  },

  // Water Treatment & Recovery Stream
  {
    id: 'w1',
    stream: 'water',
    num: '01',
    name: 'Impermeable Bay Catchment & Sumps',
    category: 'Containment',
    summary: 'Heavy-duty steel rumble grids and reinforced concrete collection channels direct 100% of effluent into primary sumps.',
    technicalSpecs: ['Class D400 loading ductile iron gratings', 'Continuous perimeter bunding', 'Galvanized silt catchbaskets', 'Submersible vortex pumps'],
    operationalRole: 'Captures all gross runoff, prevents environmental ground contamination, and feeds the primary separation stage.',
    effluentOrHydraulicNote: 'Designed with steep invert gradients to maintain self-cleansing velocity and prevent premature silting.'
  },
  {
    id: 'w2',
    stream: 'water',
    num: '02',
    name: 'Solids Sedimentation & Slurry Augers',
    category: 'Solids Drop',
    summary: 'Multi-stage gravity settlement weir tanks and automated mechanical augers drop out dense aggregate, gravel, and clay.',
    technicalSpecs: ['Multi-chamber weir baffles', 'Automated screw de-watering augers', 'High-density sludge hopper discharge', 'Level float monitoring'],
    operationalRole: 'Isolates and de-waters heavy solids before the water reaches pump skids and filtration media.',
    effluentOrHydraulicNote: 'Reduces total suspended solids (TSS) by up to 85% in the first hydraulic retention window.'
  },
  {
    id: 'w3',
    stream: 'water',
    num: '03',
    name: 'Coalescing Plate Oil/Water Separation',
    category: 'Hydrocarbon',
    summary: 'Class 1 oleophilic coalescing plate packs intercept fine emulsified droplets, separating free oils to under 5mg/L.',
    technicalSpecs: ['Class 1 BS EN 858 compliance (<5ppm oil)', 'Removable oleophilic matrix packs', 'Automated oil skimmer and holding tank', 'High-level alarm interlocks'],
    operationalRole: 'Removes hydrocarbons to meet statutory UK water authority trade effluent consent standards.',
    effluentOrHydraulicNote: 'Critical for compliance whether discharging to foul sewer or recycling through closed-loop media.'
  },
  {
    id: 'w4',
    stream: 'water',
    num: '04',
    name: 'Pressurized Deep-Bed Media Filtration',
    category: 'Fine Polishing',
    summary: 'High-rate multi-media vessels (graded sand, anthracite, and garnet) filter out remaining suspended particulates to 20 microns.',
    technicalSpecs: ['Automated differential pressure backwash', 'Multi-grade silica sand & anthracite media', 'Stainless internal laterals', 'Continuous turbidity tracking'],
    operationalRole: 'Protects high-pressure plunger pumps from abrasive wear when operating in 100% closed-loop reclaim mode.',
    effluentOrHydraulicNote: 'Automated differential pressure switches trigger cyclic backwashing to maintain continuous filtration rate.'
  },
  {
    id: 'w5',
    stream: 'water',
    num: '05',
    name: 'Biocide / Ozone Bio-Stabilization',
    category: 'Biological',
    summary: 'Continuous low-dose biocide dosing or automated ozone injection prevents bacterial proliferation, biofilm, and foul odours.',
    technicalSpecs: ['Continuous redox/ORP probe feedback', 'Proportional chemical dosing pump', 'Ozone venturi mass-transfer contactor', 'Automated aeration cycles'],
    operationalRole: 'Eliminates anaerobic bacteria, controls Legionella risks, and ensures recycled water is clean, safe, and odourless.',
    effluentOrHydraulicNote: 'Essential for EHS compliance in closed-loop systems with extended hydraulic dwell times.'
  },
  {
    id: 'w6',
    stream: 'water',
    num: '06',
    name: 'Recirculation Buffer or Regulated Discharge',
    category: 'Distribution',
    summary: 'Polished water is stored in clean-side buffer tanks for pressurized delivery back to wash arches, or discharged under consent.',
    technicalSpecs: ['Food-grade MDPE or GRP buffer storage', 'Variable-speed booster pump set', 'Fail-safe divert valve to foul sewer', 'Data-logged trade discharge meter'],
    operationalRole: 'Provides steady, surge-free hydraulic feed back to the primary wash skids, completing the closed-loop cycle.',
    effluentOrHydraulicNote: 'Can achieve up to 90% water reduction compared to single-pass mains water systems.'
  }
];

export default function WashPlantAnatomyDiagram() {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('c3');
  const activeNode = NODES.find((n) => n.id === selectedNodeId) || NODES[2];

  const cleaningNodes = NODES.filter((n) => n.stream === 'cleaning');
  const waterNodes = NODES.filter((n) => n.stream === 'water');

  return (
    <div className="bg-white text-alkota-black border border-alkota-iron/30 p-6 sm:p-10 shadow-sm">
      {/* Header & Diagram Principle */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-alkota-iron/30 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-ibm-plex-mono text-[10px] bg-alkota-orange text-white px-2.5 py-0.5 uppercase tracking-widest">
              SYSTEM ARCHITECTURE SCHEMATIC
            </span>
            <span className="font-ibm-plex-mono text-[10px] text-alkota-silver uppercase tracking-wider">
              Project-Specific Engineering
            </span>
          </div>
          <h3 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-alkota-black">
            Anatomy of an Industrial Wash Plant.
          </h3>
          <p className="text-xs sm:text-sm text-alkota-silver max-w-2xl mt-2 leading-relaxed font-normal">
            The washing process and the water treatment stream are designed as a single continuous hydraulic cycle. Select any station below to inspect its operational role and engineering parameters.
          </p>
        </div>

        <div className="flex items-center gap-4 text-[11px] font-ibm-plex-mono text-alkota-silver shrink-0">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-alkota-orange" />
            <span className="text-alkota-black font-medium">Cleaning Process</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-blue-600" />
            <span className="text-alkota-black font-medium">Water Recovery Stream</span>
          </div>
        </div>
      </div>

      {/* ── DESKTOP & TABLET: DUAL-STREAM SYNCHRONIZED FLOW ─────────────────── */}
      <div className="space-y-8 mb-10">
        {/* Stream 1: Asset Cleaning Sequence */}
        <div className="bg-[#FAF9F5] border border-alkota-iron/30 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-alkota-orange" />
              <span className="font-ibm-plex-mono text-xs uppercase tracking-widest text-alkota-black font-medium">
                Surface Cleaning Stream (Above Bay)
              </span>
            </div>
            <span className="font-ibm-plex-mono text-[10px] text-alkota-orange uppercase tracking-wider font-semibold">
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
                      ? 'bg-white border-alkota-orange text-alkota-black ring-2 ring-alkota-orange shadow-md'
                      : 'bg-white/70 border-alkota-iron/30 text-alkota-silver hover:border-alkota-black/40 hover:bg-white hover:text-alkota-black'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className={`font-ibm-plex-mono text-xs font-bold ${
                      isSelected ? 'text-alkota-orange' : 'text-alkota-iron'
                    }`}>
                      {node.num}
                    </span>
                    {isSelected && <span className="h-2 w-2 rounded-full bg-alkota-orange" />}
                  </div>
                  <div>
                    <span className="font-ibm-plex-mono text-[9px] text-alkota-silver uppercase block truncate">
                      {node.category}
                    </span>
                    <h5 className="font-normal text-xs uppercase tracking-tight text-alkota-black mt-0.5 leading-snug">
                      {node.name}
                    </h5>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Hydraulic Return Loop Indicator */}
        <div className="flex items-center justify-between px-6 py-2.5 bg-[#FAF9F5] border border-alkota-iron/30 font-ibm-plex-mono text-[10px] uppercase tracking-wider">
          <div className="flex items-center gap-2 text-alkota-silver font-medium">
            <ArrowDown className="h-3.5 w-3.5 text-alkota-orange shrink-0 animate-pulse" />
            <span>Continuous Bay Drainage &amp; Hydrocarbon Runoff Collection</span>
          </div>
          <div className="flex items-center gap-2 text-blue-700 font-medium">
            <span>Pressurized Booster Recirculation or Regulated Trade Effluent</span>
            <Droplets className="h-3.5 w-3.5 text-blue-600 shrink-0" />
          </div>
        </div>

        {/* Stream 2: Water Treatment & Recovery Stream */}
        <div className="bg-[#F4F7FB] border border-blue-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Droplets className="h-4 w-4 text-blue-600" />
              <span className="font-ibm-plex-mono text-xs uppercase tracking-widest text-alkota-black font-medium">
                Water Recovery &amp; Treatment Stream (Subterranean / Plant Room)
              </span>
            </div>
            <span className="font-ibm-plex-mono text-[10px] text-blue-600 uppercase tracking-wider font-semibold">
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
                      ? 'bg-white border-blue-600 text-alkota-black ring-2 ring-blue-600 shadow-md'
                      : 'bg-white/70 border-blue-100 text-alkota-silver hover:border-blue-400 hover:bg-white hover:text-alkota-black'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className={`font-ibm-plex-mono text-xs font-bold ${
                      isSelected ? 'text-blue-600' : 'text-blue-300'
                    }`}>
                      {node.num}
                    </span>
                    {isSelected && <span className="h-2 w-2 rounded-full bg-blue-600" />}
                  </div>
                  <div>
                    <span className="font-ibm-plex-mono text-[9px] text-alkota-silver uppercase block truncate">
                      {node.category}
                    </span>
                    <h5 className="font-normal text-xs uppercase tracking-tight text-alkota-black mt-0.5 leading-snug">
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
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="bg-[#FAF9F5] border border-alkota-iron/30 p-6 sm:p-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-3">
                <span className={`font-ibm-plex-mono text-[10px] px-2.5 py-0.5 uppercase tracking-widest text-white ${
                  activeNode.stream === 'cleaning' ? 'bg-alkota-orange' : 'bg-blue-600'
                }`}>
                  Station {activeNode.num}
                </span>
                <span className="font-ibm-plex-mono text-xs text-alkota-silver uppercase tracking-wider">
                  {activeNode.category}
                </span>
              </div>

              <h4 className="font-extralight text-2xl sm:text-3xl uppercase tracking-tight text-alkota-black">
                {activeNode.name}
              </h4>

              <p className="text-xs sm:text-sm text-alkota-silver leading-relaxed font-normal">
                {activeNode.summary}
              </p>

              <div className="p-4 bg-white border border-alkota-iron/30">
                <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange block mb-1">
                  Operational Objective:
                </span>
                <p className="text-xs text-alkota-black leading-relaxed">
                  {activeNode.operationalRole}
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4 bg-white p-6 border border-alkota-iron/30">
              <div>
                <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-black font-semibold block mb-3">
                  Core Engineering Elements:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-ibm-plex-mono text-xs text-alkota-silver">
                  {activeNode.technicalSpecs.map((spec, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-alkota-orange shrink-0" />
                      <span className="text-alkota-black">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-alkota-iron/20">
                <div className="flex items-center gap-2 mb-1.5">
                  <Activity className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                  <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-blue-600 font-semibold">
                    Hydraulic &amp; Effluent Interface
                  </span>
                </div>
                <p className="text-xs text-alkota-silver leading-relaxed">
                  {activeNode.effluentOrHydraulicNote}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Plant Room Auxiliary Equipment Strip */}
      <div className="mt-10 pt-8 border-t border-alkota-iron/30">
        <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.3em] text-alkota-silver block mb-4">
          INTEGRATED POWERHOUSE &amp; AUXILIARY EQUIPMENT
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 font-ibm-plex-mono text-xs text-alkota-black">
          <div className="p-3 bg-[#FAF9F5] border border-alkota-iron/30">
            <Cpu className="h-4 w-4 text-alkota-orange mb-1" />
            <span className="block font-medium">PLC Master Panel</span>
            <span className="text-[10px] text-alkota-silver">Industrial PLC to spec</span>
          </div>
          <div className="p-3 bg-[#FAF9F5] border border-alkota-iron/30">
            <Flame className="h-4 w-4 text-alkota-orange mb-1" />
            <span className="block font-medium">Heating Coils</span>
            <span className="text-[10px] text-alkota-silver">Schedule 80 ASTM A53</span>
          </div>
          <div className="p-3 bg-[#FAF9F5] border border-alkota-iron/30">
            <Zap className="h-4 w-4 text-alkota-orange mb-1" />
            <span className="block font-medium">High-Pressure Pumps</span>
            <span className="text-[10px] text-alkota-silver">Triplex ceramic plungers</span>
          </div>
          <div className="p-3 bg-[#FAF9F5] border border-alkota-iron/30">
            <Settings className="h-4 w-4 text-alkota-orange mb-1" />
            <span className="block font-medium">Chemical Dosing</span>
            <span className="text-[10px] text-alkota-silver">Pneumatic metering</span>
          </div>
          <div className="p-3 bg-[#FAF9F5] border border-alkota-iron/30">
            <ShieldCheck className="h-4 w-4 text-alkota-orange mb-1" />
            <span className="block font-medium">Safety Interlocks</span>
            <span className="text-[10px] text-alkota-silver">Category 4 E-stops</span>
          </div>
        </div>
      </div>
    </div>
  );
}
