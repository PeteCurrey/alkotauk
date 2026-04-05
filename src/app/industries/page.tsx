'use client';

import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { getMockIndustries } from '@/sanity/client';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

import { useState, useEffect } from 'react';

export default function IndustriesPage() {
  const [industries, setIndustries] = useState<any[]>([]);

  useEffect(() => {
    getMockIndustries().then(setIndustries);
  }, []);

  return (
    <main className="min-h-screen bg-alkota-black pt-32">
      <Navigation />
      
      <div className="mx-auto max-w-7xl px-6 pb-24">
        <Breadcrumbs items={[{ label: 'Industries' }]} />
        
        <header className="mb-16 mt-8 max-w-3xl">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.2em] text-alkota-orange"
          >
            Sectors & Applications
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6 text-5xl font-bold text-white md:text-7xl lg:text-8xl italic uppercase tracking-tighter"
          >
            BUILT FOR <br />
            <span className="text-alkota-orange">YOUR WORLD.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-alkota-silver"
          >
            From the deep-sea maritime industry to the dust-choked mines of the outback, Alkota machines are engineered for the specific challenges of your sector.
          </motion.p>
        </header>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((industry, i) => {
            const IconComponent = (LucideIcons as any)[industry.icon] || LucideIcons.Globe;
            return (
              <motion.div
                key={industry.slug.current}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link 
                  href={`/industries/${industry.slug.current}`}
                  className="group relative flex h-full flex-col justify-between border border-alkota-iron bg-alkota-steel/30 p-8 transition-all hover:bg-alkota-orange/5 hover:border-alkota-orange"
                >
                  <div>
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-sm bg-alkota-iron/50 text-alkota-orange transition-colors group-hover:bg-alkota-orange group-hover:text-white">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <h3 className="mb-4 text-2xl font-bold text-white group-hover:text-alkota-orange transition-colors uppercase italic">
                      {industry.name}
                    </h3>
                    <p className="text-sm text-alkota-silver leading-relaxed">
                      {industry.description}
                    </p>
                  </div>
                  <div className="mt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-alkota-steel group-hover:text-white transition-colors">
                    Explore Solutions
                    <LucideIcons.ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
