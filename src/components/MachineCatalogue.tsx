'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import MachineCard from './MachineCard';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import canonicalData from '../../scripts/data/alkota-canonical-catalogue.json';

// Group initial canonical catalogue machines
function groupInitialMachines() {
  const grouped: Record<string, any[]> = {
    'Hot Water Belt Drive': [],
    'Hot Water Direct Drive': [],
    'Cold Water Industrial': [],
    'Steam Cleaners': [],
    'Aqueous Parts Washers': []
  };

  const list = canonicalData as any[];
  for (const m of list) {
    if (m.category === 'hot-water') {
      if (m.series?.toLowerCase().includes('direct') || m.model_code?.includes('XD')) {
        if (grouped['Hot Water Direct Drive'].length < 3) grouped['Hot Water Direct Drive'].push(m);
      } else {
        if (grouped['Hot Water Belt Drive'].length < 3) grouped['Hot Water Belt Drive'].push(m);
      }
    } else if (m.category === 'cold-water') {
      if (grouped['Cold Water Industrial'].length < 3) grouped['Cold Water Industrial'].push(m);
    } else if (m.category === 'steam') {
      if (grouped['Steam Cleaners'].length < 3) grouped['Steam Cleaners'].push(m);
    } else if (m.category === 'parts-washer') {
      if (grouped['Aqueous Parts Washers'].length < 3) grouped['Aqueous Parts Washers'].push(m);
    }
  }

  return grouped;
}

export default function MachineCatalogue() {
  const [groupedMachines, setGroupedMachines] = useState<Record<string, any[]>>(groupInitialMachines);

  useEffect(() => {
    async function fetchLiveMachines() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('active', true)
          .eq('status', 'published')
          .order('sort_order', { ascending: true });

        if (data && !error && data.length > 0) {
          const grouped: Record<string, any[]> = {};
          data.forEach((m: any) => {
            const series = m.series || 'Industrial Series';
            if (!grouped[series]) grouped[series] = [];
            if (grouped[series].length < 3) {
              grouped[series].push(m);
            }
          });
          setGroupedMachines(grouped);
        }
      } catch (err) {
        // Fallback already rendered synchronously
      }
    }
    fetchLiveMachines();
  }, []);

  return (
    <section className="bg-alkota-steel py-40 px-6 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-alkota-orange/5 skew-x-12 translate-x-1/2 pointer-events-none" />
      
      <div className="mx-auto max-w-7xl relative z-10">
        <div className="mb-32 flex flex-col items-start justify-between gap-12 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-8 flex items-center gap-4"
            >
              <div className="h-[2px] w-12 bg-alkota-orange" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-alkota-orange">
                Industrial Performance Fleet
              </span>
            </motion.div>
            <h2 className="font-barlow-condensed text-6xl font-black text-white md:text-8xl lg:text-9xl uppercase italic leading-[0.8] tracking-tighter">
              EXPLORE THE <br />
              <span className="text-alkota-orange stroke-text">COMMAND.</span>
            </h2>
          </div>
          <div className="max-w-md border-l border-alkota-iron pl-8 py-2">
            <p className="font-inter text-sm uppercase tracking-[0.1em] text-alkota-smoke leading-relaxed">
              Engineered for 24/7 industrial duty. From the legendary 420X4 Elite to extreme volume cold wash systems. Built to outlast.
            </p>
          </div>
        </div>

        <div className="space-y-24">
          {Object.entries(groupedMachines).map(([series, machines]) => {
            if (machines.length === 0) return null;
            return (
              <div key={series}>
                <div className="mb-10 flex items-center gap-6">
                  <h3 className="font-barlow-condensed text-3xl font-black uppercase italic text-white tracking-tight">
                    {series}
                  </h3>
                  <div className="h-px flex-1 bg-alkota-iron" />
                </div>
                
                <div className="grid grid-cols-1 gap-px bg-alkota-iron border border-alkota-iron md:grid-cols-2 lg:grid-cols-3">
                  {machines.map((machine, i) => (
                    <MachineCard key={machine.id || machine.slug} machine={machine} index={i} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-24 flex flex-col items-center gap-12">
          <div className="h-24 w-px bg-gradient-to-b from-alkota-orange to-transparent" />
          <Link 
            href="/machines"
            className="group relative flex items-center gap-6 border border-alkota-iron bg-alkota-black px-16 py-6 text-[11px] font-black uppercase tracking-[0.3em] text-white transition-all hover:bg-alkota-orange hover:border-alkota-orange no-underline rounded-[4px] shadow-button hover:shadow-button-hover btn-tactile"
          >
            View Full Catalogue
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
          </Link>
        </div>
      </div>

      <style jsx>{`
        .stroke-text {
          -webkit-text-stroke: 1.5px rgba(255,255,255,0.1);
          color: transparent;
        }
      `}</style>
    </section>
  );
}
