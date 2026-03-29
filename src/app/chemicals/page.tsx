'use client';

import Navigation from '@/components/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import { motion } from 'framer-motion';
import { Beaker, ShieldCheck, ArrowRight, Info, Droplets, Truck, Factory, Zap, Cloud, Trash2, Wind, Plane, Anchor, Settings } from 'lucide-react';
import Link from 'next/link';

export default function ChemicalsHub() {
  const categories = [
    { name: 'DEGREASERS', slug: 'degreasers', desc: 'Blast through extreme road grime, grease and oil. Strong alkaline builders for plant and machinery.', icon: Trash2 },
    { name: 'AUTO & TRUCK WASH', slug: 'auto-truck-wash', desc: 'Powerful vehicle washing soaps designed to attack road film without damaging paintwork.', icon: Truck },
    { name: 'ALUMINUM BRIGHTENER', slug: 'aluminum-brightener', desc: 'Clean, brighten and restore aluminium and stainless steel. Strong professional formulations.', icon: Sun },
    { name: 'INDUSTRIAL', slug: 'industrial', desc: 'Detergents for agricultural and heavy applications. Including the top-selling TR-440.', icon: Factory },
    { name: 'FOOD PROCESSING', slug: 'food-processing', desc: 'Food-safe detergents for equipment surfaces. Formulated to clear fats without harmful residues.', icon: Zap },
    { name: 'MASONRY & ASPHALT', slug: 'masonry-asphalt', desc: 'Cleaning agents for brick, concrete, stucco and cement. Protective masonry cleaners.', icon: Droplets },
    { name: 'PARTS WASHER', slug: 'parts-washer', desc: 'Non-foaming, biodegradable detergents formulated for automatic parts washers. Rust inhibitors included.', icon: Settings },
    { name: 'RESIDENTIAL', slug: 'residential', desc: 'Concentrated pressure washer detergents for metal, buildings and painted surfaces.', icon: Home },
    { name: 'ADDITIVES & SCALE STOP', slug: 'additives', desc: 'Protect your equipment. Scale Stop additives prevent coil build-up. Essential for hard water areas.', icon: ShieldCheck },
    { name: 'COATINGS', slug: 'coatings', desc: 'Water-resistant protective coatings for painted and metal surfaces exposed to elements.', icon: Cloud },
    { name: 'AVIATION', slug: 'aviation', desc: 'Detergents formulated for aircraft exteriors and ground support. Sector approved formulations.', icon: Plane },
    { name: 'TRANSPORTATION', slug: 'transportation', desc: 'Salt residue removal for HGVs, snow ploughs and fleet vehicles. Road transport specialist.', icon: Anchor }
  ];

  return (
    <main className="min-h-screen bg-alkota-bg pt-32 pb-0">
      <Navigation />
      
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="relative z-10">
          <Breadcrumbs items={[{ label: 'Chemicals' }]} />
          
          <header className="mb-24 mt-12 max-w-5xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8 flex items-center gap-4"
            >
              <div className="h-[2px] w-12 bg-alkota-orange" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-alkota-orange">
                // ALKOTA DETERGENTS
              </span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="font-barlow-condensed mb-10 text-7xl font-black text-alkota-black md:text-9xl uppercase italic leading-[0.8] tracking-tighter"
            >
              FORMULATED FOR <br />
              <span className="text-alkota-orange [text-stroke:1px_rgba(0,0,0,0.1)]">ALKOTA MACHINES.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-inter max-w-3xl text-lg text-alkota-silver leading-relaxed uppercase tracking-wider"
            >
              Every detergent is formulated by Hydrus — Alkota's own chemical division — to work hand-in-hand with hot and cold water pressure washers. Tested with Alkota equipment. Built for industrial duty.
            </motion.p>
          </header>

          <section className="mb-24 bg-alkota-black p-12 border-l-8 border-alkota-orange">
             <div className="max-w-4xl">
                <h3 className="font-barlow-condensed text-3xl font-black text-white uppercase italic mb-6">Why Alkota chemicals with Alkota machines?</h3>
                <p className="font-inter text-sm text-alkota-smoke leading-relaxed uppercase tracking-widest">
                  Standard detergents can contain foaming agents and scale-forming compounds that damage coils and pumps over time. Alkota detergents contain <strong>Scale Stop</strong> — a scale preventative additive that protects your coil and water-contact components. If you're running hard water, this matters. A lot.
                </p>
             </div>
          </section>

          <section className="mb-40 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-alkota-iron border border-alkota-iron">
             {categories.map((cat, i) => (
                <Link 
                  key={i} 
                  href={`/chemicals/${cat.slug}`}
                  className="bg-white p-12 group hover:bg-alkota-bg transition-all duration-300 flex flex-col"
                >
                   <cat.icon className="h-10 w-10 text-alkota-orange mb-10 group-hover:scale-110 transition-transform" />
                   <h4 className="font-barlow-condensed text-3xl font-black text-alkota-black uppercase italic mb-4 group-hover:text-alkota-orange transition-colors">{cat.name}</h4>
                   <p className="font-inter text-[10px] text-alkota-silver uppercase tracking-widest leading-relaxed flex-1">{cat.desc}</p>
                   <div className="mt-10 flex items-center gap-4 text-[9px] font-black text-alkota-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">
                      View Range <ArrowRight className="h-3 w-3" />
                   </div>
                </Link>
             ))}
          </section>

          <section className="mb-40 bg-alkota-black p-12 flex flex-col md:flex-row items-center justify-between gap-8 group hover:border-alkota-orange transition-colors border border-alkota-iron">
              <div className="flex items-center gap-8">
                 <div className="h-16 w-16 bg-alkota-orange flex items-center justify-center shrink-0">
                    <Beaker className="h-8 w-8 text-white" />
                 </div>
                 <div>
                    <h3 className="font-barlow-condensed text-2xl font-black text-white uppercase italic mb-2">Not sure which product?</h3>
                    <p className="font-inter text-[10px] text-alkota-smoke uppercase tracking-widest">Use our professional chemical selector to find the exact formulation for your application.</p>
                 </div>
              </div>
              <Link 
                href="/chemicals/selector"
                className="bg-white px-10 py-5 text-[11px] font-black uppercase tracking-[0.3em] text-alkota-black hover:bg-alkota-orange hover:text-white transition-all flex items-center gap-4"
              >
                 Chemical Selector <ArrowRight className="h-4 w-4" />
              </Link>
          </section>
        </div>
      </div>
    </main>
  );
}

// Dummy icons for missing ones
function Sun(props: any) { return <Cloud {...props} /> }
function Home(props: any) { return <Factory {...props} /> }
