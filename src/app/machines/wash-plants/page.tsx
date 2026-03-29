'use client';

import Navigation from '@/components/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import { motion } from 'framer-motion';
import { ArrowRight, Settings, Factory, ShieldCheck, Zap } from 'lucide-react';
import Link from 'next/link';

export default function WashPlantsPage() {
  const systemTypes = [
    {
      title: "COLD WATER WASH BAY (Wash Bay B Series)",
      for: "Fleet wash, general vehicle wash, light-contamination applications",
      power: "Mains electric — single or 3-phase",
      range: "2 GPM to 10 GPM / 1600–3500 PSI",
      benefit: "Self-contained cabinet, low maintenance, ETL/UL/CSA certified",
      cta: "View Wash Bay B Series →",
      href: "/machines/cold-water#wash-bay-series",
      icon: Factory
    },
    {
      title: "HOT WATER STATIONARY (Gas Fired Series)",
      for: "Grease and oil contamination, food processing, livestock, engineering workshops",
      power: "Electric motor + NG or LPG burner",
      range: "2.1 GPM to 10 GPM",
      benefit: "Mains gas connected — no diesel on site, no fuel deliveries",
      cta: "View Gas Fired Series →",
      href: "/machines/hot-water#gas-fired-series",
      icon: Zap
    },
    {
      title: "HIGH VOLUME WASH (Wash Cannon)",
      for: "Large open yards, livestock buildings, concrete areas requiring fast coverage",
      power: "Electric (3PH) or gas engine",
      range: "21–25 GPM at up to 1000 PSI",
      benefit: "Diaphragm pump — handles dirty water and solids",
      cta: "View Wash Cannon →",
      href: "/machines/cold-water#wash-cannon",
      icon: Settings
    }
  ];

  return (
    <main className="min-h-screen bg-alkota-bg pt-32 pb-0">
      <Navigation />
      
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="relative z-10">
          <Breadcrumbs items={[
            { label: 'Machines', href: '/machines' },
            { label: 'Wash Plants' }
          ]} />
          
          <header className="mb-24 mt-12 max-w-5xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8 flex items-center gap-4"
            >
              <div className="h-[2px] w-12 bg-alkota-orange" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-alkota-orange">
                // FIXED INSTALLATION SYSTEMS
              </span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="font-barlow-condensed mb-10 text-7xl font-black text-alkota-black md:text-9xl uppercase italic leading-[0.8] tracking-tighter"
            >
              WASH PLANTS & <br />
              <span className="text-alkota-orange [text-stroke:1px_rgba(0,0,0,0.1)]">BAY SYSTEMS.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-inter max-w-3xl text-lg text-alkota-silver leading-relaxed uppercase tracking-wider"
            >
              Permanent high-pressure cleaning installations for fleet depots, food processing facilities, agricultural buildings and industrial sites. Engineered for your throughput. Built to run every day.
            </motion.p>
          </header>

          <section className="mb-40 grid grid-cols-1 md:grid-cols-3 gap-px bg-alkota-iron border border-alkota-iron">
            {systemTypes.map((type, i) => (
              <div key={i} className="bg-white p-12 flex flex-col group hover:bg-alkota-bg transition-all duration-500">
                <type.icon className="h-10 w-10 text-alkota-orange mb-10" />
                <h3 className="font-barlow-condensed text-3xl font-black text-alkota-black uppercase italic leading-tight mb-8">
                  {type.title}
                </h3>
                <div className="space-y-6 flex-1">
                  <div>
                    <span className="font-ibm-plex-mono text-[9px] text-alkota-orange uppercase tracking-widest block mb-2">Ideal For</span>
                    <p className="font-inter text-xs text-alkota-silver uppercase leading-relaxed">{type.for}</p>
                  </div>
                  <div>
                    <span className="font-ibm-plex-mono text-[9px] text-alkota-orange uppercase tracking-widest block mb-2">Power Source</span>
                    <p className="font-inter text-xs text-alkota-silver uppercase leading-relaxed">{type.power}</p>
                  </div>
                  <div>
                    <span className="font-ibm-plex-mono text-[9px] text-alkota-orange uppercase tracking-widest block mb-2">Performance Range</span>
                    <p className="font-inter text-xs text-alkota-silver uppercase leading-relaxed">{type.range}</p>
                  </div>
                  <div className="bg-alkota-bg p-6 border-l-2 border-alkota-orange">
                    <span className="font-ibm-plex-mono text-[9px] text-alkota-black font-bold uppercase tracking-widest block mb-2">Engineering Advantage</span>
                    <p className="font-inter text-[10px] text-alkota-silver uppercase leading-relaxed">{type.benefit}</p>
                  </div>
                </div>
                <Link 
                  href={type.href}
                  className="mt-12 flex items-center gap-4 text-[10px] font-black text-alkota-black uppercase tracking-[0.3em] hover:text-alkota-orange transition-colors"
                >
                  {type.cta} <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            ))}
          </section>

          <section className="mb-40 bg-alkota-black p-16 md:p-24 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-10">
              <ShieldCheck className="h-64 w-64 text-white" />
            </div>
            <div className="relative z-10 max-w-4xl">
              <h2 className="font-barlow-condensed text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter mb-10">
                Nothing off the shelf fits <br />
                <span className="text-alkota-orange">your facility?</span>
              </h2>
              <p className="font-inter text-sm md:text-base text-alkota-smoke leading-relaxed uppercase tracking-widest mb-12">
                Alkota designs and builds fully bespoke wash plant systems. Multiple machines plumbed to multiple wash bays. Hose reel towers. Foam lance stations. Chemical dosing systems. Water recovery and recycling integrated at the design stage. We have built wash plants for transit authorities, large agricultural co-ops, food processing facilities and municipal vehicle depots.
                <br /><br />
                The process: you describe the facility and throughput requirements. We engineer the specification, quote the system, and manage the installation.
              </p>
              <Link 
                href="/contact?enquiry=wash-plant"
                className="inline-flex items-center justify-center gap-6 bg-alkota-orange px-12 py-6 text-xs font-black uppercase tracking-[0.4em] text-white hover:bg-white hover:text-alkota-black transition-all group"
              >
                Start a Wash Plant Conversation <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
              </Link>
            </div>
          </section>
        </div>
      </div>

    </main>
  );
}
