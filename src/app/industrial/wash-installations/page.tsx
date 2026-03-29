'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import { 
  ArrowRight, 
  Settings, 
  Layout, 
  Wifi, 
  Cpu,
  ChevronDown,
  Activity,
  Zap
} from 'lucide-react';
import Link from 'next/link';

const installationFeatures = [
  { title: 'Centralised Power', icon: Settings, desc: 'A dedicated plant room generates high-pressure water for multiple wash bays simultaneously.' },
  { title: 'Underground Reticulation', icon: Layout, desc: 'High-grade stainless steel pipework networks professionally installed beneath the concrete slab.' },
  { title: 'Remote Control', icon: Wifi, desc: 'Operators control pressure, temperature, and chemical mix via wireless or wall-mounted bay stations.' },
  { title: 'Automated Filtration', icon: Activity, desc: 'Site-wide water reclamation systems ensure 24/7 environmental compliance and resource efficiency.' },
];

const bayTypes = [
  {
    type: 'External Multi-Bay',
    application: 'Fleet & Heavy Plant',
    details: [
      'Galvanised steel boom systems',
      'Surface-mounted equipment protection',
      'Integrated silt & oil separators',
      'High-throughput traffic management'
    ]
  },
  {
    type: 'Internal Hygienic Bay',
    application: 'Food & Pharma Processing',
    details: [
      'Stainless steel 316 construction',
      'Wash-down rated electricals',
      'Automated sanitisation cycles',
      'Coved drainage integration'
    ]
  }
];

export default function WashInstallations() {
  return (
    <main className="min-h-screen bg-alkota-bg text-alkota-black overflow-x-hidden">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 px-6 overflow-hidden bg-white border-b border-alkota-iron">
        {/* Steel Plate Texture Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')`,
            backgroundRepeat: 'repeat'
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-ibm-plex-mono text-[10px] font-black uppercase tracking-[0.4em] text-alkota-orange mb-6 block">
              // Industrial System V.04
            </span>
            <h1 className="font-barlow-condensed text-6xl md:text-8xl lg:text-9xl font-black leading-[0.8] tracking-tighter italic mb-8 uppercase">
              FIXED WASH <br />
              <span className="text-alkota-orange">INSTALLATIONS.</span>
            </h1>
            <p className="font-inter text-xl text-alkota-silver max-w-2xl leading-relaxed mb-12">
              Permanent cleaning infrastructure for Tier 1 facilities. 
              Custom-engineered multi-bay systems with centralised pressure 
              generation and integrated site-wide biosecurity control.
            </p>
            <Link
                href="/industrial/brief"
                className="inline-flex bg-alkota-black text-white px-10 py-5 text-sm font-black uppercase tracking-widest hover:bg-alkota-orange transition-all items-center gap-3"
              >
                Request Site Audit <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Installation Features */}
      <section className="py-24 px-6 bg-alkota-bg">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {installationFeatures.map((feature, i) => (
              <div key={i} className="bg-white border border-alkota-iron p-8 group hover:border-alkota-orange transition-all">
                <feature.icon className="h-10 w-10 text-alkota-orange mb-8 transition-transform group-hover:scale-110" />
                <h4 className="font-barlow-condensed text-2xl font-black italic mb-4 uppercase">
                  {feature.title}
                </h4>
                <p className="text-xs text-alkota-silver leading-relaxed uppercase tracking-wider font-medium">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Central Plant Room Section */}
      <section className="py-24 px-6 bg-alkota-black text-white relative overflow-hidden">
        {/* Abstract CPU Sub-texture */}
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
           <Cpu className="h-[40vw] w-[40vw] text-white rotate-12" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="font-ibm-plex-mono text-[10px] font-black text-alkota-orange uppercase tracking-[0.5em] mb-4 block">
                // SYSTEM_CORE
              </span>
              <h2 className="font-barlow-condensed text-6xl font-black italic tracking-tighter uppercase leading-none mb-8">
                THE POWER HOUSE.
              </h2>
              <div className="space-y-6 text-alkota-smoke text-lg leading-relaxed font-inter mb-10">
                <p>
                  At the heart of every Alkota installation is a centralised plant room. 
                  By locating the pressure generation and heating units in a secure, 
                  climate-controlled environment, we maximise equipment lifespan and 
                  simplify maintenance protocols.
                </p>
                <p>
                  Our multi-pump central systems are redundant by design. If one unit 
                  requires service, the system intelligently redistributes load across 
                  active units, ensuring your wash bays never go offline.
                </p>
              </div>
              <div className="flex items-center gap-12 border-t border-white/10 pt-10">
                <div>
                   <div className="font-barlow-condensed text-4xl font-black italic text-alkota-orange">99.9%</div>
                   <div className="text-[10px] font-bold uppercase tracking-widest text-alkota-silver">Uptime Rating</div>
                </div>
                <div>
                   <div className="font-barlow-condensed text-4xl font-black italic text-alkota-orange">Modular</div>
                   <div className="text-[10px] font-bold uppercase tracking-widest text-alkota-silver">Scaleability</div>
                </div>
              </div>
            </div>

            <div className="relative aspect-video bg-white/5 border border-white/10 group overflow-hidden">
               <img 
                 src="https://alkota.co.uk/assets/custom-build-C4FaO6d5.png" 
                 alt="Central Plant Room" 
                 className="h-full w-full object-cover grayscale opacity-60 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110"
               />
               <div className="absolute inset-0 bg-alkota-orange/10 mix-blend-overlay" />
            </div>
          </div>
        </div>
      </section>

      {/* Configuration Grid */}
      <section className="py-24 px-6 bg-white border-b border-alkota-iron">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
             <h2 className="font-barlow-condensed text-6xl font-black italic tracking-tighter uppercase leading-none mb-4">
               BAY CONFIGURATIONS
             </h2>
             <p className="font-ibm-plex-mono text-[10px] font-black text-alkota-orange uppercase tracking-[0.4em]">
               // PURPOSE_BUILT_INFRASTRUCTURE
             </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {bayTypes.map((bay, i) => (
              <div key={i} className="bg-alkota-bg border border-alkota-iron p-12 hover:border-alkota-orange transition-all">
                <h3 className="font-barlow-condensed text-4xl font-black italic mb-2 uppercase">
                  {bay.type}
                </h3>
                <p className="font-ibm-plex-mono text-[10px] font-bold text-alkota-silver uppercase tracking-widest mb-10">
                  Primary Application: {bay.application}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {bay.details.map((detail, j) => (
                    <div key={j} className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest leading-tight">
                       <Zap className="h-3 w-3 text-alkota-orange shrink-0" />
                       {detail}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Site Engineering CTA */}
      <section className="py-24 px-6 bg-alkota-orange text-white">
        <div className="max-w-4xl mx-auto text-center">
           <h2 className="font-barlow-condensed text-6xl font-black italic tracking-tighter mb-8 uppercase leading-none">
             EVERY SITE IS UNIQUE. <br />
             OUR ENGINEERING IS TOO.
           </h2>
           <p className="font-inter text-xl text-white/90 mb-12 leading-relaxed">
             From initial site survey and drainage consultation to final commissioning, 
             the Alkota UK projects team manages every aspect of your fixed wash installation.
           </p>
           <Link 
             href="/industrial/brief"
             className="bg-alkota-black text-white px-12 py-6 text-sm font-black uppercase tracking-[0.2em] hover:bg-white hover:text-alkota-black transition-all inline-flex items-center gap-4"
           >
             Start Project Brief <ChevronDown className="h-3 w-3 -rotate-90" />
           </Link>
        </div>
      </section>

    </main>
  );
}
