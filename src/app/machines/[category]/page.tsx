'use client';

import { useParams } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getMockMachines } from '@/sanity/client';
import MachineCard from '@/components/MachineCard';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Footer from '@/components/Footer';

export default function MachineCategoryPage() {
  const params = useParams();
  const categorySlug = params.category as string;
  const machines = getMockMachines().filter(m => m.category === categorySlug);
  const categoryName = categorySlug.replace('-', ' ');

  return (
    <main className="min-h-screen bg-alkota-bg pt-32 pb-0">
      <Navigation />
      
      <div className="relative mx-auto max-w-7xl px-6">
        {/* Background Watermark */}
        <div className="absolute top-20 right-0 pointer-events-none select-none opacity-[0.05] z-0">
          <span className="font-barlow-condensed text-[40vw] font-black uppercase italic leading-none text-alkota-black whitespace-nowrap">
            {categorySlug.split('-')[0]}
          </span>
        </div>

        <div className="relative z-10">
          <Breadcrumbs items={[
            { label: 'Fleet', href: '/machines' },
            { label: categoryName }
          ]} />
          
          <header className="mb-24 mt-12 max-w-4xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8 flex items-center gap-4"
            >
              <div className="h-[2px] w-12 bg-alkota-orange" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-alkota-orange">
                Specialized Industrial Sector
              </span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="font-barlow-condensed mb-10 text-7xl font-black text-alkota-black md:text-9xl uppercase italic leading-[0.8] tracking-tighter"
            >
              {categoryName} <br />
              <span className="text-alkota-orange [text-stroke:1px_rgba(0,0,0,0.1)]">EQUIPMENT.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-inter max-w-2xl text-lg text-alkota-silver leading-relaxed uppercase tracking-wider"
            >
              Premium {categoryName} systems engineered for maximum efficiency and architectural durability.
            </motion.p>
          </header>

          <section className="mb-40">
            {machines.length > 0 ? (
              <div className="grid grid-cols-1 gap-px bg-alkota-iron border border-alkota-iron md:grid-cols-2 lg:grid-cols-3">
                {machines.map((machine, i) => (
                  <MachineCard key={machine._id} machine={machine} index={i} />
                ))}
              </div>
            ) : (
              <div className="py-24 text-center border border-alkota-iron bg-white">
                <p className="font-ibm-plex-mono text-[10px] text-alkota-silver uppercase tracking-[0.2em]">NO_UNITS_IDENTIFIED</p>
                <Link href="/machines" className="mt-8 inline-block text-[11px] font-black uppercase tracking-widest text-alkota-orange hover:text-white transition-colors">Return to full fleet</Link>
              </div>
            )}
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
