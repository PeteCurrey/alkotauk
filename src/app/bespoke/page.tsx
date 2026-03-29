'use client';

import Navigation from '@/components/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import { motion } from 'framer-motion';
import Footer from '@/components/Footer';
import { ArrowRight, Tool, Settings, Truck, Factory, ShieldCheck, Zap } from 'lucide-react';
import Link from 'next/link';

export default function BespokeBuildsPage() {
  const categories = [
    {
      title: "BESPOKE TRAILER SYSTEMS",
      desc: "Single and tandem axle. Open deck or enclosed. Hot or cold. Multi-operator. Water recovery integrated. Custom RAL colour. Your livery applied.",
      cta: "Configure a Trailer →",
      href: "/machines/trailers/configure",
      icon: Truck
    },
    {
      title: "BESPOKE WASH PLANTS",
      desc: "Multi-bay plumbing. Hose reel towers. Chemical dosing stations. Water recovery at design stage. For fleet depots, food processing, and agricultural facilities.",
      cta: "Discuss a Wash Plant →",
      href: "/contact?enquiry=wash-bay",
      icon: Factory
    },
    {
      title: "CUSTOM SKID UNITS",
      desc: "Truck-bed, van or trailer skid mounting. 12V or 115V burner configuration. Custom frame dimensions. Single fuel diesel options. Built for any vehicle or platform.",
      cta: "Specify a Skid Unit →",
      href: "/contact?enquiry=skid",
      icon: Settings
    },
    {
      title: "SPECIALIST APPLICATIONS",
      desc: "High-reach systems for elevated cleaning. Multi-gun automatic clutch systems. ATEX-considered configurations for fuel and gas environments.",
      cta: "Discuss Your Application →",
      href: "/contact?enquiry=specialist",
      icon: ShieldCheck
    }
  ];

  const process = [
    { step: "01", title: "Brief", desc: "Consultation to define the cleaning challenge." },
    { step: "02", title: "Specification", desc: "Detailed engineering proposal and quote." },
    { step: "03", title: "Build", desc: "Precision assembly in the Alkota workshop." },
    { step: "04", title: "Handover", desc: "Training and deployment of the custom rig." }
  ];

  const examples = [
    "Hot water delivered over 400 feet at 5 GPM for transit authority platform cleaning.",
    "Dual operator tandem trailer with automatic clutch system for consistent pressure across two guns simultaneously.",
    "Closed-loop wash plant with integrated vacuum recovery and three-stage filtration for an environmental compliance requirement."
  ];

  return (
    <main className="min-h-screen bg-alkota-bg pt-32 pb-0">
      <Navigation />
      
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="relative z-10">
          <Breadcrumbs items={[{ label: 'Bespoke Builds' }]} />
          
          <header className="mb-24 mt-12 max-w-5xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8 flex items-center gap-4"
            >
              <div className="h-[2px] w-12 bg-alkota-orange" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-alkota-orange">
                // CUSTOM ENGINEERING
              </span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="font-barlow-condensed mb-10 text-7xl font-black text-alkota-black md:text-9xl uppercase italic leading-[0.8] tracking-tighter"
            >
              IF YOU CAN DESCRIBE IT <br />
              <span className="text-alkota-orange [text-stroke:1px_rgba(0,0,0,0.1)]">WE CAN BUILD IT.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-inter max-w-3xl text-lg text-alkota-silver leading-relaxed uppercase tracking-wider"
            >
              Up to 25% of all Alkota units are custom builds. 60 years of bespoke pressure washing engineering. Combined 150+ years of experience in the build team.
            </motion.p>
          </header>

          <section className="mb-40 grid grid-cols-1 md:grid-cols-2 gap-px bg-alkota-iron border border-alkota-iron">
            {categories.map((cat, i) => (
              <div key={i} className="bg-white p-12 flex flex-col group hover:bg-alkota-bg transition-all duration-500">
                <cat.icon className="h-10 w-10 text-alkota-orange mb-10" />
                <h3 className="font-barlow-condensed text-4xl font-black text-alkota-black uppercase italic leading-none mb-8">{cat.title}</h3>
                <p className="font-inter text-xs text-alkota-silver leading-relaxed uppercase tracking-widest mb-10 flex-1">{cat.desc}</p>
                <Link 
                  href={cat.href}
                  className="inline-flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.3em] text-alkota-orange hover:text-alkota-black transition-colors"
                >
                  {cat.cta}
                </Link>
              </div>
            ))}
          </section>

          <section className="mb-40 bg-alkota-black p-16 md:p-24">
            <h2 className="font-barlow-condensed text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter mb-16 text-center">
              THE <span className="text-alkota-orange">PROCESS.</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {process.map((p, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <span className="font-barlow-condensed text-6xl font-black text-white/10 mb-6">{p.step}</span>
                  <h4 className="font-barlow-condensed text-2xl font-black text-white uppercase italic mb-4">{p.title}</h4>
                  <p className="font-inter text-[10px] text-alkota-smoke uppercase tracking-widest">{p.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-40">
            <h2 className="font-barlow-condensed text-5xl md:text-7xl font-black text-alkota-black uppercase italic tracking-tighter mb-20">
              REAL WORLD <span className="text-alkota-orange">SCENARIOS.</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {examples.map((ex, i) => (
                <div key={i} className="bg-white p-10 border-l-4 border-alkota-orange shadow-sm italic text-alkota-silver font-inter text-sm flex items-center">
                  "{ex}"
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
