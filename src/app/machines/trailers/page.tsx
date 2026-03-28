'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import {
  Settings, Droplets, Zap, Shield,
  Truck, Factory, Building2, Tractor, Users, Recycle, CheckCircle2, ArrowRight,
  ShieldCheck,
  Wrench,
  Cpu,
  FileCheck2,
  Navigation as NavIcon
} from 'lucide-react';

// ─── DATA ────────────────────────────────────────────────────────────────────

const TRAILER_MODELS = [
  {
    model: '20171',
    axle: 'Single Axle',
    tank: '909 L',
    gvw: '1,587 kg',
    weight: '431 kg',
    flagship: false,
    notes: 'Compact single axle. Ideal for agricultural, small fleet and contract cleaning operations requiring a nimble, towable system.',
    specs: ['200 gal tank', 'GVW 3,500 lbs', '15" wheels', '950 lbs tare'],
  },
  {
    model: '20152',
    axle: 'Tandem Axle',
    tank: '1,500 L',
    gvw: '3,175 kg',
    weight: '658 kg',
    flagship: false,
    notes: 'Mid-range tandem. Balanced capacity and manoeuvrability. Popular for fleet depots, agricultural contractors, and hire operations.',
    specs: ['330 gal tank', 'GVW 7,000 lbs', '168" × 72" deck', 'A-Frame hose reel'],
  },
  {
    model: '20152K / MWVFS',
    axle: 'Tandem Axle',
    tank: '2,091 L (Dual)',
    gvw: '3,500 kg',
    flagship: true,
    notes: 'The flagship self-contained system. Built-in wastewater vacuum recovery and filtration. Fully environmentally compliant.',
    specs: ['460 gal dual tank', 'Honda GX690 engine', '5,000W generator', 'VSF-1 vacuum recovery'],
  },
];

const BUILD_STEPS = [
  {
    phase: '01',
    title: 'Application Design',
    desc: 'Our engineers define flow, pressure, and water capacity matched to your specific cleaning application.',
    icon: Settings
  },
  {
    phase: '02',
    title: 'Chassis Engineering',
    desc: 'Heavy-duty steel fabrication. Axle positions are calculated for optimal tongue weight and stability.',
    icon: Wrench
  },
  {
    phase: '03',
    title: 'System Integration',
    desc: 'Precision plumbing of pumps, engines, and heating coils into the chassis for a single unified system.',
    icon: Cpu
  },
  {
    phase: '04',
    title: 'UK Compliance',
    desc: 'Full certification for road use. VTA/IVA inspections ensure your fleet is 100% legal on UK roads.',
    icon: FileCheck2
  }
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function TrailersPage() {
  return (
    <main className="bg-alkota-black pt-32 pb-0 overflow-x-hidden">
      <Navigation />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Background Watermark */}
        <div className="absolute top-20 right-0 pointer-events-none select-none opacity-[0.02] z-0">
          <span className="font-barlow-condensed text-[40vw] font-black uppercase italic leading-none text-white whitespace-nowrap">
            MOBILE
          </span>
        </div>

        <div className="relative z-10">
          <Breadcrumbs items={[{ label: 'Fleet', href: '/machines' }, { label: 'Trailers' }]} />
          
          <header className="mb-24 mt-12 max-w-5xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8 flex items-center gap-4"
            >
              <div className="h-[2px] w-12 bg-alkota-orange" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-alkota-orange">
                Bespoke Mobile Cleaning Platforms
              </span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="font-barlow-condensed mb-10 text-7xl font-black text-white md:text-9xl uppercase italic leading-[0.8] tracking-tighter"
            >
              ENGINEERED FOR <br />
              <span className="text-alkota-orange stroke-text">THE OPEN ROAD.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-inter max-w-2xl text-lg text-alkota-silver leading-relaxed uppercase tracking-wider"
            >
              Not just a machine on a trailer. A unified, road-legal cleaning platform designed to deliver massive industrial power wherever you need it.
            </motion.p>
          </header>

          {/* ── MODELS ── */}
          <section className="mb-60">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-alkota-iron border border-alkota-iron">
              {TRAILER_MODELS.map((t, i) => (
                <div key={t.model} className="group relative flex flex-col bg-alkota-black p-12 transition-all duration-500 hover:bg-alkota-orange/10">
                   {t.flagship && (
                      <span className="absolute top-4 right-4 font-ibm-plex-mono text-[8px] font-black text-alkota-orange border border-alkota-orange px-2 py-0.5">ELITE_FLAGSHIP</span>
                   )}
                   <span className="font-ibm-plex-mono text-[9px] font-black text-alkota-orange uppercase mb-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    [ CHASSIS_{t.model} ]
                  </span>
                  <h3 className="font-barlow-condensed text-4xl font-black text-white uppercase italic leading-none mb-4 group-hover:text-alkota-orange transition-colors">
                    {t.model}
                  </h3>
                  <div className="grid grid-cols-2 gap-4 mb-8">
                     <div>
                        <span className="font-ibm-plex-mono text-[8px] text-alkota-smoke uppercase tracking-widest block mb-1">Water Vol.</span>
                        <span className="font-barlow-condensed text-xl font-bold text-white uppercase">{t.tank}</span>
                     </div>
                     <div>
                        <span className="font-ibm-plex-mono text-[8px] text-alkota-smoke uppercase tracking-widest block mb-1">Max GVW</span>
                        <span className="font-barlow-condensed text-xl font-bold text-white uppercase">{t.gvw}</span>
                     </div>
                  </div>
                  <p className="font-inter text-xs text-alkota-silver leading-relaxed mb-12 flex-1">
                    {t.notes}
                  </p>
                  <div className="mt-auto flex items-center gap-4 text-[10px] font-black text-white uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                    Request Spec <ArrowRight className="h-3 w-3" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-alkota-orange transform scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
                </div>
              ))}
            </div>
          </section>

          {/* ── THE BUILD PROCESS ── */}
          <section className="mb-60">
            <div className="mb-24 flex items-center gap-8">
              <h2 className="font-barlow-condensed text-6xl font-black text-white uppercase italic tracking-tighter md:text-8xl">
                THE BUILD <span className="text-alkota-orange">PROCESS.</span>
              </h2>
              <div className="flex-1 h-[2px] bg-alkota-iron/30" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
               {BUILD_STEPS.map((step, i) => (
                 <div key={i} className="relative">
                    <div className="mb-10 flex items-center gap-6">
                       <span className="font-barlow-condensed text-5xl font-black text-alkota-iron/30 uppercase italic">{step.phase}</span>
                       <div className="h-px flex-1 bg-alkota-iron/30" />
                    </div>
                    <step.icon className="h-10 w-10 text-alkota-orange mb-8" />
                    <h4 className="font-barlow-condensed text-2xl font-black text-white uppercase italic mb-4">{step.title}</h4>
                    <p className="font-inter text-sm text-alkota-smoke uppercase tracking-wider leading-relaxed">{step.desc}</p>
                 </div>
               ))}
            </div>
          </section>

          {/* ── UK TECHNICAL COMPLIANCE ── */}
          <section className="mb-60 bg-alkota-steel/10 border border-alkota-iron p-12 md:p-20 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-12 opacity-[0.05]">
                <ShieldCheck className="h-64 w-64 text-white" />
             </div>
             
             <div className="relative z-10 max-w-4xl">
                <div className="bg-alkota-orange text-white text-[10px] font-black uppercase tracking-[0.4em] px-4 py-1 inline-block mb-10">
                  UK_TECHNICAL_SPEC
                </div>
                <h2 className="font-barlow-condensed text-5xl font-black text-white uppercase italic tracking-tighter md:text-7xl mb-12">
                  UK ROAD LEGAL <br />
                  <span className="text-alkota-orange">UNCOMPROMISED.</span>
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                   <div>
                      <h4 className="font-ibm-plex-mono text-xs font-black text-white uppercase tracking-widest mb-4">Weight & Braking</h4>
                      <p className="font-inter text-sm text-alkota-silver leading-relaxed uppercase tracking-wider mb-6">
                        All systems over 750kg are fitted with surge/inertia brakes. We calculate every tank position to ensure safe nose-weight (approx 5-10% GVW).
                      </p>
                      <ul className="space-y-4">
                        {['Type Approved Chassis', 'Individual Vehicle Approval (IVA)', 'AL-KO Braking Systems'].map((item, i) => (
                           <li key={i} className="flex items-center gap-3 font-ibm-plex-mono text-[9px] text-alkota-smoke uppercase tracking-widest">
                             <CheckCircle2 className="h-4 w-4 text-alkota-orange" /> {item}
                           </li>
                        ))}
                      </ul>
                   </div>
                   <div>
                      <h4 className="font-ibm-plex-mono text-xs font-black text-white uppercase tracking-widest mb-4">Operations & Compliance</h4>
                      <p className="font-inter text-sm text-alkota-silver leading-relaxed uppercase tracking-wider mb-6">
                        UK specific fill heights, air-gap tanks for Water Regs compliance, and high-visibility lighting for night-spec operations.
                      </p>
                      <ul className="space-y-4">
                        {['CAT 5 Air-Gap Protection', 'Road Hazard Lighting Pack', 'External Low-Point Drains'].map((item, i) => (
                           <li key={i} className="flex items-center gap-3 font-ibm-plex-mono text-[9px] text-alkota-smoke uppercase tracking-widest">
                             <CheckCircle2 className="h-4 w-4 text-alkota-orange" /> {item}
                           </li>
                        ))}
                      </ul>
                   </div>
                </div>
             </div>
          </section>

          {/* ── CONTACT Form ── */}
          <section id="contact" className="mb-60 py-40 border-t border-alkota-iron">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                <div>
                  <h2 className="font-barlow-condensed text-7xl font-black text-white uppercase italic tracking-tighter leading-[0.8] mb-12">
                     ACQUIRE YOUR <br />
                     <span className="text-alkota-orange stroke-text">COMMAND CENTER.</span>
                  </h2>
                  <p className="font-inter text-lg text-alkota-silver uppercase tracking-wider mb-12">
                    Start a conversation with our application engineers. We'll build your spec, review it with you, and quote within 2 working days.
                  </p>
                  <div className="bg-alkota-orange/10 border border-alkota-orange/30 p-8">
                     <div className="flex items-center gap-6">
                        <NavIcon className="h-10 w-10 text-alkota-orange" />
                        <div>
                           <h4 className="font-barlow-condensed text-xl font-black text-white uppercase italic">Nationwide HQ</h4>
                           <p className="font-inter text-[10px] text-alkota-smoke uppercase font-bold tracking-widest">Unit 20, West Thurrock Industrial Estate</p>
                        </div>
                     </div>
                  </div>
                </div>

                <div className="bg-alkota-steel/10 p-12 border border-alkota-iron">
                  <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="font-ibm-plex-mono text-[9px] text-alkota-smoke uppercase tracking-widest">Full Name</label>
                        <input className="w-full bg-transparent border-b border-alkota-iron text-white p-2 focus:outline-none focus:border-alkota-orange" />
                      </div>
                      <div className="space-y-2">
                        <label className="font-ibm-plex-mono text-[9px] text-alkota-smoke uppercase tracking-widest">Industry Section</label>
                        <select className="w-full bg-transparent border-b border-alkota-iron text-alkota-smoke p-2 focus:outline-none focus:border-alkota-orange">
                          <option>Agriculture</option>
                          <option>Municipal</option>
                          <option>Construction</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                        <label className="font-ibm-plex-mono text-[9px] text-alkota-smoke uppercase tracking-widest">Enquiry Detail</label>
                        <textarea className="w-full bg-transparent border-b border-alkota-iron text-white p-2 focus:outline-none focus:border-alkota-orange resize-none h-32" />
                    </div>
                    <button className="bg-alkota-orange px-12 py-5 text-[11px] font-black uppercase tracking-[0.3em] text-white hover:bg-alkota-orange-hover transition-all w-full">
                       Establish Build Order
                    </button>
                  </form>
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
