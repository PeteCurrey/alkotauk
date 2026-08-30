'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Truck, 
  Flame, 
  Clock, 
  Gauge, 
  Droplets, 
  Building2, 
  ArrowRight, 
  Layers, 
  CheckCircle2, 
  RefreshCw,
  AlertCircle
} from 'lucide-react';

interface Variable {
  id: string;
  name: string;
  shortCode: string;
  icon: any;
  question: string;
  scope: string;
  examples: string[];
  systemImpact: string;
  engineeringConsideration: string;
}

const VARIABLES: Variable[] = [
  {
    id: 'asset',
    name: 'Asset Profile & Geometry',
    shortCode: '01',
    icon: Truck,
    question: 'What are we cleaning?',
    scope: 'Asset dimensions, envelope, sensitive components, mechanical clearance, and surface metallurgy.',
    examples: ['Articulated HGVs & Trailers', 'Heavy Tracked Excavators', 'Rig & Access Roadway Mats', 'Rail Rolling Stock', 'Fabricated Steel & Sheet Piling'],
    systemImpact: 'Dictates wash bay clearance, gantry dimensions, nozzle standoff distances, and mechanical conveyor payload capacity.',
    engineeringConsideration: 'Underbody clearance and surface blind-spots determine whether fixed spin-bars, oscillating arches, or manual lance stations are required.'
  },
  {
    id: 'contamination',
    name: 'Contamination Profile',
    shortCode: '02',
    icon: Flame,
    question: 'What soil chemistry are we removing?',
    scope: 'Soil composition, adhesion, mass loading, hydrocarbon presence, biological matter, and chemical bind.',
    examples: ['High-mass compacted clay & silt', 'Heavy grease & hydraulic oils', 'Bitumen, tar & asphalt', 'Concrete & cement slurry', 'Salt & road grime'],
    systemImpact: 'Determines hydraulic thermal requirement (hot water / steam), chemical pre-treatment dwell, and solids separation volume.',
    engineeringConsideration: 'Heavy oils may require coalescing oil separation; heavy silt demands high-capacity settlement lagoons or automated solids extraction.'
  },
  {
    id: 'throughput',
    name: 'Throughput & Dwell Time',
    shortCode: '03',
    icon: Clock,
    question: 'How fast must assets move through?',
    scope: 'Required cleaning cycles per shift, peak dispatch windows, operator availability, and allowable cycle time.',
    examples: ['4–8 vehicles per day (scheduled depot)', '20–30 units per hour (continuous logistics)', '45–60 mats per hour (automated tunnel)', '15 minutes per heavy dumper truck'],
    systemImpact: 'Defines whether manual, multi-operator, drive-through, or fully conveyorised automation is required.',
    engineeringConsideration: 'High-throughput operations require automated optical vehicle sensing and instant-start pump skids with zero pressure drop.'
  },
  {
    id: 'process',
    name: 'Cleaning Process Parameters',
    shortCode: '04',
    icon: Gauge,
    question: 'What hydraulic & thermal energy is needed?',
    scope: 'Balancing pressure (BAR / PSI), water volume (LPM / GPM), temperature (up to 150°C steam), and chemical action.',
    examples: ['High-flow de-mucking (80+ LPM at 100 BAR)', 'High-pressure detailing (15 LPM at 200 BAR)', 'Thermal degreasing (85°C hot water)', 'Flash surface preparation (dry steam)'],
    systemImpact: 'Sizes the thermal heating coils, high-pressure pump displacement, and motor kW drive ratings.',
    engineeringConsideration: 'High-mass soils need flow (mass momentum), while oil and bitumen require thermal water breakdown rather than excessive pressure.'
  },
  {
    id: 'water',
    name: 'Water Balance & Recovery',
    shortCode: '05',
    icon: Droplets,
    question: 'Where does the water come from and go?',
    scope: 'Mains supply flow rate, buffer tank capacity, solids filtration, oil interceptors, trade effluent consent, and closed-loop recycling.',
    examples: ['100% closed-loop media recycling', 'Primary settlement + trade effluent discharge', 'Rainwater harvesting integration', 'Total containment zero-drain bay'],
    systemImpact: 'Determines the subterranean civils layout, interceptor class, media sand polishing vessels, and effluent compliance.',
    engineeringConsideration: 'Recycling systems must remove suspended fines and free hydrocarbons to an appropriate level to protect high-pressure pump internals from accelerated wear.'
  },
  {
    id: 'site',
    name: 'Site Infrastructure & Civils',
    shortCode: '06',
    icon: Building2,
    question: 'What physical and utility constraints exist?',
    scope: 'Available 3-phase electrical power, gas/oil fuel supply, apron gradient, plant room footprint, frost exposure, and operator safety.',
    examples: ['Indoor dedicated plant room', 'Outdoor containerised frost-protected plant', 'Brownfield existing bay retrofit', 'Remote Greenfield site infrastructure'],
    systemImpact: 'Determines structural skid enclosures, thermal frost purges, electrical distribution boards, and civils trench reticulation.',
    engineeringConsideration: 'Site power constraints often require VSD soft-start motors or automated load staging to prevent substation overload.'
  }
];

export default function WashPlantVariablesMatrix() {
  const [activeVarId, setActiveVarId] = useState<string>('asset');
  const activeVar = VARIABLES.find((v) => v.id === activeVarId) || VARIABLES[0];

  return (
    <div className="bg-white border border-alkota-iron p-6 sm:p-10 shadow-sm">
      <div className="max-w-3xl mb-8">
        <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.3em] text-alkota-orange block mb-2">
          OPERATIONAL SYSTEM DYNAMICS
        </span>
        <h3 className="font-extralight text-2xl sm:text-4xl uppercase tracking-tight text-alkota-black mb-3">
          Six Design Inputs. One Cohesive System.
        </h3>
        <p className="text-xs sm:text-sm text-alkota-silver leading-relaxed">
          In an industrial wash plant, no engineering decision exists in isolation. Changing any single operational parameter shifts the hydraulic sizing, civils interfaces, automation level, and water treatment requirements.
        </p>
      </div>

      {/* Interactive 6-Vector Navigation Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mb-8">
        {VARIABLES.map((v) => {
          const isSelected = v.id === activeVarId;
          const IconComponent = v.icon;
          return (
            <button
              key={v.id}
              onClick={() => setActiveVarId(v.id)}
              className={`p-4 text-left border transition-all flex flex-col justify-between min-h-[110px] ${
                isSelected
                  ? 'bg-alkota-black text-white border-alkota-black shadow-md'
                  : 'bg-alkota-bg text-alkota-black border-alkota-iron hover:border-alkota-orange/60'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <span className={`font-ibm-plex-mono text-[10px] font-bold ${
                  isSelected ? 'text-alkota-orange' : 'text-alkota-silver'
                }`}>
                  {v.shortCode}
                </span>
                <IconComponent className={`h-4 w-4 ${
                  isSelected ? 'text-alkota-orange' : 'text-alkota-silver'
                }`} />
              </div>
              <span className="font-ibm-plex-mono text-xs uppercase tracking-tight font-medium leading-tight">
                {v.name.split('&')[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Deep-Dive Interactive Vector Analysis Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeVar.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="bg-alkota-bg border border-alkota-iron p-6 sm:p-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-2">
                <span className="font-ibm-plex-mono text-[10px] bg-alkota-black text-white px-2.5 py-0.5 uppercase tracking-widest">
                  Vector {activeVar.shortCode}
                </span>
                <span className="font-ibm-plex-mono text-xs text-alkota-orange uppercase tracking-wider">
                  {activeVar.question}
                </span>
              </div>

              <h4 className="font-extralight text-2xl uppercase tracking-tight text-alkota-black">
                {activeVar.name}
              </h4>

              <p className="text-xs sm:text-sm text-alkota-black leading-relaxed">
                {activeVar.scope}
              </p>

              <div>
                <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-silver block mb-2">
                  Typical Application Scenarios:
                </span>
                <div className="space-y-1.5 font-ibm-plex-mono text-xs text-alkota-black">
                  {activeVar.examples.map((ex, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-alkota-orange shrink-0" />
                      <span>{ex}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4 bg-white p-6 border border-alkota-iron">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <Layers className="h-4 w-4 text-alkota-orange shrink-0" />
                  <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-black font-medium">
                    System Architecture Consequence
                  </span>
                </div>
                <p className="text-xs text-alkota-silver leading-relaxed">
                  {activeVar.systemImpact}
                </p>
              </div>

              <div className="pt-4 border-t border-alkota-iron/60">
                <div className="flex items-center gap-2 mb-1.5">
                  <CheckCircle2 className="h-4 w-4 text-alkota-orange shrink-0" />
                  <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-black font-medium">
                    Engineering Definition
                  </span>
                </div>
                <p className="text-xs text-alkota-silver leading-relaxed">
                  {activeVar.engineeringConsideration}
                </p>
              </div>

              <div className="pt-4 border-t border-alkota-iron/60 text-[11px] font-ibm-plex-mono text-alkota-silver flex items-center justify-between">
                <span className="text-alkota-black">Change this variable</span>
                <span className="text-alkota-orange">→ System adjusts</span>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-6 pt-4 border-t border-alkota-iron/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-ibm-plex-mono text-alkota-silver">
        <span>Conclusion: The process defines the equipment, never the reverse.</span>
        <span className="text-alkota-black uppercase tracking-wider font-medium">
          Alkota UK Process Engineering
        </span>
      </div>
    </div>
  );
}
