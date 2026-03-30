'use client';

import Navigation from '@/components/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import { motion } from 'framer-motion';
import { ShieldAlert, Droplets, Waves, Wind, ArrowRight, Gauge, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function WaterTreatmentHub() {
  const systems = [
    {
      id: 'vfs',
      name: 'VFS Series',
      tagline: 'Vacuum Filtration Systems',
      description: 'Advanced solid-liquid separation for heavy industrial effluent.',
      icon: Waves,
      href: null,
    },
    {
      id: 'media',
      name: 'Media Filtration',
      tagline: 'Multi-Stage Purification',
      description: 'Granular activated carbon and specialized media for chemical removal.',
      icon: Droplets,
      href: null,
    },
    {
      id: 'evaporator',
      name: 'Evaporators',
      tagline: 'Thermal Volume Reduction',
      description: 'Drastically reduce waste disposal costs by evaporating water content.',
      icon: Wind,
      href: null,
    },
    {
      id: 'vacgd',
      name: 'VACGD',
      tagline: 'Vacuum Recovery System',
      description: 'Mobile wash water capture for surface cleaning operations. Vanguard powered. Sutorbilt blower. Integrates with surface cleaners and VFS filtration.',
      icon: Wind,
      href: '/water-treatment/vacgd',
    },
  ];

  return (
    <main className="min-h-screen bg-alkota-black pt-32 pb-0">
      <Navigation />
      
      <div className="relative mx-auto max-w-7xl px-6">
        {/* Background Watermark */}
        <div className="absolute top-20 right-0 pointer-events-none select-none opacity-[0.02] z-0">
          <span className="font-barlow-condensed text-[40vw] font-black uppercase italic leading-none text-white whitespace-nowrap">
            PURITY
          </span>
        </div>

        <div className="relative z-10">
          <Breadcrumbs items={[{ label: 'Water Treatment' }]} />
          
          <header className="mb-24 mt-12 max-w-5xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8 flex items-center gap-4"
            >
              <div className="h-[2px] w-12 bg-alkota-orange" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-alkota-orange">
                Industrial Compliance & Recovery
              </span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="font-barlow-condensed mb-10 text-7xl font-black text-white md:text-9xl uppercase italic leading-[0.8] tracking-tighter"
            >
              ZERO DISCHARGE <br />
              <span className="text-alkota-orange stroke-text">SOLUTIONS.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-inter max-w-2xl text-lg text-alkota-silver leading-relaxed uppercase tracking-wider"
            >
              Meet stringent UK environmental regulations including Trade Effluent discharge limits and PPG2 guidelines with Alkota's specialized reclamation systems.
            </motion.p>
          </header>

          {/* Regulatory Context Cards */}
          <section className="mb-40 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-alkota-orange/30 bg-alkota-orange/5 p-12 relative overflow-hidden group">
               <ShieldAlert className="h-12 w-12 text-alkota-orange mb-8 animate-pulse" />
               <h3 className="font-barlow-condensed text-3xl font-black text-white uppercase italic mb-4">Trade Effluent Compliance</h3>
               <p className="font-inter text-sm text-alkota-smoke uppercase tracking-wider leading-relaxed">
                 Water authority fines can be catastrophic. Our systems ensure your discharge meets pH, suspended solids, and oil/grease limits consistently.
               </p>
               <div className="absolute -right-8 -bottom-8 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity">
                  <ShieldAlert className="h-48 w-48 text-white" />
               </div>
            </div>
            <div className="border border-alkota-iron bg-alkota-steel/10 p-12 relative overflow-hidden group">
               <Gauge className="h-12 w-12 text-alkota-orange mb-8" />
               <h3 className="font-barlow-condensed text-3xl font-black text-white uppercase italic mb-4">Resource Recovery</h3>
               <p className="font-inter text-sm text-alkota-smoke uppercase tracking-wider leading-relaxed">
                  Recycle up to 90% of your wash water. Reduce utility overheads and establish a sustainable, closed-loop industrial process.
               </p>
               <div className="absolute -right-8 -bottom-8 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity">
                  <Gauge className="h-48 w-48 text-white" />
               </div>
            </div>
          </section>

          {/* System Catalogue */}
          <section className="mb-60">
            <div className="mb-20 flex items-center justify-between border-b border-alkota-iron pb-12">
              <h2 className="font-barlow-condensed text-5xl font-black text-white uppercase italic tracking-tighter md:text-7xl">
                TREATMENT <span className="text-alkota-orange">FLEET.</span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-alkota-iron border border-alkota-iron">
              {systems.map((system, i) => {
                const inner = (
                  <>
                    <system.icon className="h-10 w-10 text-alkota-orange mb-10 transition-transform group-hover:scale-110" />
                    <span className="font-ibm-plex-mono text-[9px] font-black text-alkota-orange uppercase mb-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      [ SYSTEM_RECLAM_0{i+1} ]
                    </span>
                    <h3 className="font-barlow-condensed text-4xl font-black text-white uppercase italic leading-none mb-4 group-hover:text-alkota-orange transition-colors duration-300">
                      {system.name}
                    </h3>
                    <p className="font-inter text-[10px] text-alkota-smoke uppercase tracking-[0.2em] font-bold mb-8">
                      {system.tagline}
                    </p>
                    <p className="font-inter text-xs text-alkota-silver leading-relaxed mb-12 flex-1">
                      {system.description}
                    </p>
                    {system.href && (
                      <div className="mt-auto flex items-center gap-4 text-[10px] font-black text-white uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                        View System →
                      </div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-alkota-orange transform scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
                  </>
                );

                return system.href ? (
                  <a
                    key={system.id}
                    href={system.href}
                    className="group relative flex flex-col bg-alkota-black p-12 transition-all duration-500 hover:bg-alkota-orange/10 no-underline"
                  >
                    {inner}
                  </a>
                ) : (
                  <div
                    key={system.id}
                    className="group relative flex flex-col bg-alkota-black p-12 transition-all duration-500 hover:bg-alkota-orange/10"
                  >
                    {inner}
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>


      <style jsx>{`
        .stroke-text {
          -webkit-text-stroke: 1.5px rgba(255,255,255,0.1);
          color: transparent;
        }
      `}</style>
    </main>
  );
}
