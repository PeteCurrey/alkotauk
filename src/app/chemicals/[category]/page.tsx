'use client';

import { useParams } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import { motion } from 'framer-motion';
import Footer from '@/components/Footer';
import { ShoppingBasket, ArrowRight, ShieldCheck, CheckCircle2, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function ChemicalsCategoryPage() {
  const params = useParams();
  const categorySlug = params.category as string;
  const categoryName = categorySlug.replace(/-/g, ' ');

  // Mapping of category data
  const categoryData: Record<string, { desc: string, products: any[] }> = {
    "degreasers": {
      desc: "Industrial strength degreasers designed for plant, machinery, heavy transport and workshop floor cleaning. Powerful alkaline formulations that turn oils into soap.",
      products: [
        { name: "Grease Cutter DE 703", desc: "Our strongest concentrated degreaser for extreme soil environments." },
        { name: "Citrus Degreaser", desc: "Natural solvent power with high cleaning efficiency and fresh scent." }
      ]
    },
    "auto-truck-wash": {
      desc: "Alkota vehicle soaps are engineered to penetrate road film and carbon without damaging paint finish. Formulation is safe for all automotive surfaces.",
      products: [
        { name: "TR-440 (Farm Soap)", desc: "The gold standard all-purpose vehicle wash. Non-corrosive and high-foaming." }
      ]
    },
    "parts-washer": {
      desc: "Specialized low-foaming, biodegradable detergents for automatic parts washers and soak tanks. All formulations contain multi-metal corrosion inhibitors.",
      products: [
        { name: "APW 229", desc: "Natural citrus degreaser, non-foaming, safe for all metals." },
        { name: "Pro Clean PW-1031", desc: "Alkaline, biodegradable, for intensive parts cleaning." },
        { name: "Luma Strip PW-1034", desc: "Aluminium, brass, stainless, copper — non-abrasive, low-foaming." },
        { name: "Phostight PW-1024", desc: "Cleans and phosphatises before painting — iron phosphate coating." }
      ]
    },
    // Add other placeholders if needed, but primarily 12 routes will work from here.
  };

  const currentData = categoryData[categorySlug] || { 
    desc: `Professional ${categoryName} detergents formulated for industrial cleaning applications. Engineering grade quality.`,
    products: [] 
  };

  return (
    <main className="min-h-screen bg-alkota-bg pt-32 pb-0">
      <Navigation />
      
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="relative z-10">
          <Breadcrumbs items={[
            { label: 'Chemicals', href: '/chemicals' },
            { label: categoryName }
          ]} />
          
          <header className="mb-24 mt-12 max-w-5xl">
            <Link 
              href="/chemicals" 
              className="mb-8 inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-alkota-silver hover:text-alkota-orange transition-colors"
            >
               <ChevronLeft className="h-3 w-3" /> Back to All Chemicals
            </Link>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8 flex items-center gap-4"
            >
              <div className="h-[2px] w-12 bg-alkota-orange" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-alkota-orange">
                Industrial Specification
              </span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="font-barlow-condensed mb-10 text-7xl font-black text-alkota-black md:text-9xl uppercase italic leading-[0.8] tracking-tighter"
            >
              {categoryName} <br />
              <span className="text-alkota-orange [text-stroke:1px_rgba(0,0,0,0.1)]">SOLUTIONS.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-inter max-w-3xl text-lg text-alkota-silver leading-relaxed uppercase tracking-wider"
            >
              {currentData.desc}
            </motion.p>
          </header>

          <section className="mb-40">
             {currentData.products.length > 0 ? (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-alkota-iron border border-alkota-iron">
                  {currentData.products.map((item, i) => (
                    <div key={i} className="bg-white p-10 flex flex-col group hover:bg-alkota-bg transition-colors">
                       <div className="mb-8 flex items-start justify-between">
                          <h4 className="font-barlow-condensed text-4xl font-black text-alkota-black uppercase italic group-hover:text-alkota-orange transition-colors">
                            {item.name}
                          </h4>
                          <CheckCircle2 className="h-5 w-5 text-alkota-orange" />
                       </div>
                       <p className="font-inter text-[10px] text-alkota-silver uppercase tracking-wider leading-relaxed flex-1 mb-10">
                         {item.desc}
                       </p>
                       <button className="mt-auto border border-alkota-iron p-5 flex items-center justify-center gap-4 text-[11px] font-black uppercase tracking-widest text-alkota-black hover:bg-alkota-orange hover:text-white transition-all">
                          <ShoppingBasket className="h-4 w-4" /> Add to Basket
                       </button>
                    </div>
                  ))}
               </div>
             ) : (
               <div className="py-40 text-center border border-alkota-iron bg-white">
                  <p className="font-ibm-plex-mono text-[10px] text-alkota-silver uppercase tracking-[0.2em]">Range coming soon. Contact for bulk orders.</p>
                  <Link href="/contact" className="mt-8 inline-block text-[11px] font-black uppercase tracking-widest text-alkota-orange hover:text-white transition-colors">Contact Enquiries →</Link>
               </div>
             )}
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
