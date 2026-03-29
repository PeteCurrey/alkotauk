'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import { ChevronRight, ArrowRight, Shield, Globe, Settings, Factory, Zap, Droplet } from 'lucide-react';
import Link from 'next/link';

const sectors = [
  { name: 'Oil & Gas', icon: Droplet, desc: 'Exploration, refining, and infrastructure maintenance.' },
  { name: 'Renewables', icon: Zap, desc: 'Wind farm component cleaning and site preparation.' },
  { name: 'Civil Engineering', icon: Settings, desc: 'Large-scale site de-watering and asset cleaning.' },
  { name: 'Food Processing', icon: Factory, desc: 'Hygienic multi-bay fixed wash installations.' },
  { name: 'Military & Defense', icon: Shield, desc: 'Fleet maintenance and extreme environment cleaning.' },
  { name: 'Mining & Quarrying', icon: Globe, desc: 'Heavy plant and equipment wash platforms.' },
  { name: 'Maritime', icon: Globe, desc: 'Port infrastructure and vessel maintenance systems.' },
  { name: 'Logistics', icon: Settings, desc: 'High-throughput fleet automated wash bays.' },
];

export default function IndustrialHub() {
  return (
    <main className="min-h-screen bg-alkota-bg text-alkota-black overflow-x-hidden">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 px-6 overflow-hidden border-b border-alkota-iron">
        {/* Steel Plate Texture Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
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
            <span className="font-ibm-plex-mono text-[11px] font-black uppercase tracking-[0.4em] text-alkota-orange mb-6 block">
              // Industrial Systems Division
            </span>
            <h1 className="font-barlow-condensed text-[clamp(4rem,10vw,9rem)] font-black leading-[0.8] tracking-tighter italic mb-8">
              ENGINEERED FOR THE <br />
              <span className="text-alkota-orange">JOBS THAT CAN'T WAIT.</span>
            </h1>
            <p className="font-inter text-xl text-alkota-silver max-w-3xl leading-relaxed mb-12">
              Alkota UK Industrial Systems represent the pinnacle of high-throughput cleaning infrastructure. 
              From automated mat wash plants to self-contained containerised hubs, we build the systems 
              that power the world's most demanding sectors.
            </p>
            <div className="flex flex-wrap gap-6">
              <Link
                href="/industrial/brief"
                className="bg-alkota-black text-white px-10 py-5 text-sm font-black uppercase tracking-widest hover:bg-alkota-orange transition-all flex items-center gap-3"
              >
                Submit Project Brief <ArrowRight className="h-4 w-4" />
              </Link>
              <button className="border border-alkota-iron px-10 py-5 text-sm font-black uppercase tracking-widest hover:border-alkota-orange transition-all">
                View Case Studies
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Editorial Content */}
      <section className="py-24 px-6 bg-white relative z-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="font-barlow-condensed text-5xl font-black italic tracking-tighter mb-8 leading-tight">
              AUTHORITATIVE SPECIFICATION. <br />
              UNCOMPROMISING DELIVERY.
            </h2>
            <div className="space-y-6 font-inter text-alkota-silver leading-relaxed text-lg">
              <p>
                In an era of tightening environmental regulations and increasing operational costs, 
                standard pressure washing equipment is no longer sufficient for Tier 1 contractors. 
                Alkota UK provides purpose-engineered systems that integrate water reclamation, 
                automated throughput, and extreme durability.
              </p>
              <p>
                Our systems are currently deployed across the UK's largest infrastructure projects, 
                ensuring biosecurity compliance, environmental protection, and maximum equipment uptime 
                in environments where failure is not a viable option.
              </p>
            </div>
          </div>
          <div className="relative aspect-video bg-alkota-steel overflow-hidden border border-alkota-iron group">
             <img 
               src="https://alkota.co.uk/assets/custom-build-C4FaO6d5.png" 
               alt="Industrial Installation" 
               className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-alkota-black/60 to-transparent" />
             <div className="absolute bottom-6 left-6 flex items-center gap-4 text-white">
               <span className="font-ibm-plex-mono text-[10px] font-bold tracking-widest">// DEPLOYMENT_VUE.04</span>
               <div className="h-px w-12 bg-alkota-orange" />
             </div>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="py-24 px-6 bg-alkota-bg relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="font-ibm-plex-mono text-[10px] font-black uppercase tracking-[0.4em] text-alkota-orange mb-4 block">
              // Core Capabilities
            </span>
            <h2 className="font-barlow-condensed text-6xl font-black italic tracking-tighter leading-none">
              CLEANING INFRASTRUCTURE
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Mat Wash Plants',
                slug: 'mat-wash-plants',
                spec: 'High-Volume Automated',
                desc: 'Specifically engineered for the access mat industry. Automated conveyor systems with integrated water reclamation.'
              },
              {
                title: 'Containerised Systems',
                slug: 'containerised',
                spec: 'Self-Contained Mobile',
                desc: 'Secure, climate-controlled hubs built into 20ft or 40ft containers for rapid deployment on high-security sites.'
              },
              {
                title: 'Wash Installations',
                slug: 'wash-installations',
                spec: 'Permanent Fixed Infrastructure',
                desc: 'Custom-designed multi-bay facilities with centralised pressure generation and underground pipework networks.'
              }
            ].map((cat, i) => (
              <Link 
                key={i}
                href={`/industrial/${cat.slug}`}
                className="group relative bg-white border border-alkota-iron p-8 transition-all hover:border-alkota-orange hover:-translate-y-2"
              >
                <span className="font-ibm-plex-mono text-[10px] font-black text-alkota-orange uppercase tracking-widest mb-4 block">
                  {cat.spec}
                </span>
                <h3 className="font-barlow-condensed text-3xl font-black italic mb-4 group-hover:text-alkota-orange transition-colors">
                  {cat.title}
                </h3>
                <p className="text-sm text-alkota-silver leading-relaxed mb-10">
                  {cat.desc}
                </p>
                <div className="flex items-center gap-2 font-ibm-plex-mono text-[11px] font-bold uppercase tracking-widest group-hover:gap-4 transition-all">
                  Explore System <ChevronRight className="h-3 w-3 text-alkota-orange" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors Served */}
      <section className="py-24 px-6 bg-alkota-black text-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
             <h2 className="font-barlow-condensed text-6xl font-black italic tracking-tighter mb-4">
               SECTORS SERVED
             </h2>
             <p className="font-ibm-plex-mono text-[10px] font-black text-alkota-orange uppercase tracking-[0.5em]">
               // TOTAL_COVERAGE_CAPABILITY
             </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
            {sectors.map((sector, i) => (
              <div key={i} className="bg-alkota-black p-10 group hover:bg-white/5 transition-colors">
                <sector.icon className="h-8 w-8 text-alkota-orange mb-8" />
                <h4 className="font-barlow-condensed text-2xl font-black italic mb-4 group-hover:text-alkota-orange transition-colors">
                  {sector.name}
                </h4>
                <p className="text-xs text-alkota-smoke leading-relaxed uppercase tracking-wider">
                  {sector.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
