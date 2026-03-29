'use client';

import Navigation from '@/components/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import { motion } from 'framer-motion';
import Footer from '@/components/Footer';
import { Settings, RefreshCw, Layers, ArrowRight, Gauge, CheckSquare, Trash2, ShieldCheck, Factory } from 'lucide-react';
import Link from 'next/link';

export default function PartsWashersHub() {
  const models = [
    {
      id: 'model-110',
      name: 'Model 110',
      type: 'Top Load',
      specs: '24" Turntable | 300 lbs Capacity',
      description: 'Compact easy-lift lid design. Hot water and biodegradable detergent. No solvents required. Ideal for workshops, garages and agricultural maintenance.',
      icon: Layers,
    },
    {
      id: 'al2424',
      name: 'Model AL2424',
      type: 'Top Load',
      specs: '50 PSI | 26 GPM | 500 lbs Capacity',
      description: 'Gear-driven 24 inch turntable. Oil skimmer, debris screen, low water shutoff. For truck and automotive repair shops, equipment repair, machine shops.',
      icon: Layers,
    },
    {
      id: 'al3040',
      name: 'Model AL3040',
      type: 'Front Load',
      specs: '30" Turntable | 1000 lbs Capacity',
      description: 'Front load industrial cabinet washer for heavy continuous use. Gear-driven turntable, hot water and biodegradable detergent.',
      icon: Settings,
    },
    {
      id: 'al3654',
      name: 'Model AL3654',
      type: 'Front Load',
      specs: '75 PSI | 60 GPM | 1500 lbs Capacity',
      description: 'The flagship front load parts washer. 36 inch gear-driven turntable, oil skimmer, debris screen, low water shutoff, turntable jog switch. For intensive continuous industrial use.',
      icon: Settings,
    },
    {
      id: 'al3640-ro',
      name: 'Model AL3640-RO',
      type: 'Rollout Turntable',
      specs: '36" Rollout | 1500 lbs Capacity',
      description: 'Rollout turntable allows loading from front or side — ideal for oversized or awkwardly shaped components that cannot be lifted into a standard front load cabinet.',
      icon: RefreshCw,
    }
  ];

  return (
    <main className="min-h-screen bg-alkota-black pt-32 pb-0">
      <Navigation />
      
      <div className="relative mx-auto max-w-7xl px-6">
        {/* Background Watermark */}
        <div className="absolute top-20 right-0 pointer-events-none select-none opacity-[0.02] z-0">
          <span className="font-barlow-condensed text-[40vw] font-black uppercase italic leading-none text-white whitespace-nowrap">
            WASH
          </span>
        </div>

        <div className="relative z-10">
          <Breadcrumbs items={[{ label: 'Parts Washers' }]} />
          
          <header className="mb-24 mt-12 max-w-5xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8 flex items-center gap-4"
            >
              <div className="h-[2px] w-12 bg-alkota-orange" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-alkota-orange">
                Automatic Industrial Cleaning
              </span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="font-barlow-condensed mb-10 text-7xl font-black text-white md:text-9xl uppercase italic leading-[0.8] tracking-tighter"
            >
              AUTOMATIC <br />
              <span className="text-alkota-orange stroke-text">PURE POWER.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-inter max-w-2xl text-lg text-alkota-silver leading-relaxed uppercase tracking-wider"
            >
              Aqueous hot water parts washers using biodegradable detergents. No solvents. No aerosols. Load the parts, set the timer, return when clean.
            </motion.p>
          </header>

          {/* Industrial Logic Stats */}
          <section className="mb-40 grid grid-cols-1 md:grid-cols-4 gap-px bg-alkota-iron border border-alkota-iron">
             {[
               { label: 'Labor Reduction', value: '85%' },
               { label: 'Cleaning Temp', value: '80C+' },
               { label: 'Spray Pressure', value: '50 PSI' },
               { label: 'Filter Rating', value: '100 MIC' },
             ].map((stat, i) => (
                <div key={i} className="bg-alkota-black p-10 flex flex-col items-center justify-center text-center">
                   <span className="font-ibm-plex-mono text-[10px] text-alkota-orange uppercase tracking-widest mb-4">{stat.label}</span>
                   <span className="font-barlow-condensed text-5xl font-black text-white uppercase italic">{stat.value}</span>
                </div>
             ))}
          </section>

          {/* Product Series */}
          <section className="mb-60">
            <div className="mb-20 flex items-center justify-between border-b border-alkota-iron pb-12">
              <h2 className="font-barlow-condensed text-5xl font-black text-white uppercase italic tracking-tighter md:text-7xl">
                MACHINE <span className="text-alkota-orange">FLEET.</span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-alkota-iron border border-alkota-iron">
              {models.map((model, i) => (
                <div 
                  key={model.id}
                  className="group relative flex flex-col bg-alkota-black p-12 transition-all duration-500 hover:bg-alkota-orange/10"
                >
                  <model.icon className="h-10 w-10 text-alkota-orange mb-10 transition-transform group-hover:scale-110" />
                  <span className="font-ibm-plex-mono text-[9px] font-black text-alkota-orange uppercase mb-4">
                    {model.type}
                  </span>
                  <h3 className="font-barlow-condensed text-4xl font-black text-white uppercase italic leading-none mb-4 group-hover:text-alkota-orange transition-colors duration-300">
                    {model.name}
                  </h3>
                  <p className="font-inter text-[10px] text-alkota-smoke uppercase tracking-[0.2em] font-bold mb-8">
                    {model.specs}
                  </p>
                  <p className="font-inter text-xs text-alkota-silver leading-relaxed mb-12 flex-1">
                    {model.description}
                  </p>
                  <div className="mt-auto flex items-center gap-4 text-[10px] font-black text-white uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                    Request Quote <ArrowRight className="h-3 w-3" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-alkota-orange transform scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
                </div>
              ))}
            </div>
          </section>

          {/* Environmental Commitment */}
          <section className="mb-60 grid grid-cols-1 lg:grid-cols-2 gap-20">
             <div className="border border-alkota-iron p-1 px-1">
                <div className="bg-alkota-steel/10 p-16">
                   <h3 className="font-barlow-condensed text-4xl font-black text-white uppercase italic border-l-4 border-alkota-orange pl-6 mb-8">Green Cleaning Technology</h3>
                   <p className="font-inter text-sm text-alkota-silver leading-relaxed uppercase tracking-wider mb-8">
                      Our parts washers use aqueous (water-based) detergents, eliminating the need for hazardous solvents and reducing your environmental liability.
                   </p>
                   <ul className="space-y-4">
                      {[
                        'Zero Solvent Hazards',
                        'Biodegradable Detergents',
                        'Energy Efficient Insulated Cabinets',
                        'Integrated Oil Skimmers'
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-4 font-ibm-plex-mono text-[9px] text-white uppercase tracking-widest">
                           <CheckSquare className="h-4 w-4 text-alkota-orange" /> {item}
                        </li>
                      ))}
                   </ul>
                </div>
             </div>
             <div className="flex flex-col justify-center">
                <h2 className="font-barlow-condensed text-6xl font-black text-white uppercase italic tracking-tighter leading-[0.8] mb-12">
                   CLEAN PARTS. <br />
                   <span className="text-alkota-orange stroke-text">SAFE SHOP.</span>
                </h2>
                <div className="grid grid-cols-2 gap-8">
                   <div className="group">
                      <div className="h-16 w-16 mb-6 border border-alkota-iron flex items-center justify-center transition-colors group-hover:bg-alkota-orange group-hover:border-alkota-orange">
                         <Trash2 className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="font-barlow-condensed text-xl font-black text-white uppercase italic mb-2">Eliminate Hazmat</h4>
                      <p className="font-inter text-[10px] text-alkota-smoke uppercase font-bold tracking-widest">Remove the risks of solvent disposal and worker exposure.</p>
                   </div>
                   <div className="group">
                      <div className="h-16 w-16 mb-6 border border-alkota-iron flex items-center justify-center transition-colors group-hover:bg-alkota-orange group-hover:border-alkota-orange">
                         <Factory className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="font-barlow-condensed text-xl font-black text-white uppercase italic mb-2">Maximize Throughput</h4>
                      <p className="font-inter text-[10px] text-alkota-smoke uppercase font-bold tracking-widest">Mechanics spend more time wrenching and less time washing.</p>
                   </div>
                </div>
             </div>
          </section>
        </div>
      </div>

      <Footer />

      <style jsx>{`
        .stroke-text {
          -webkit-text-stroke: 1.5px rgba(255,255,255,0.1);
          color: transparent;
        }
      `}</style>
    </main>
  );
}
