'use client';

import { useEffect, useState } from 'react';
import { client } from '@/sanity/client';
import MachineCard from './MachineCard';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function MachineCatalogue() {
  const [machines, setMachines] = useState<any[]>([]);

  useEffect(() => {
    client.fetch(`*[_type == "machine"][0...6] {
      _id,
      name,
      modelCode,
      "slug": slug.current,
      tagline,
      category,
      "series": series->name,
      "isEliteSeries": series->isEliteSeries,
      heroImage,
      specs
    }`).then(setMachines);
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

        <div className="grid grid-cols-1 gap-px bg-alkota-iron border border-alkota-iron md:grid-cols-2 lg:grid-cols-3">
          {machines.map((machine, i) => (
            <MachineCard key={machine._id} machine={machine} index={i} />
          ))}
          {machines.length === 0 && (
            <div className="col-span-full py-20 text-center bg-white/5 border border-dashed border-alkota-iron">
               <span className="text-alkota-silver uppercase tracking-[0.2em] text-[10px]">Synchronizing Catalogue...</span>
            </div>
          )}
        </div>

        <div className="mt-24 flex flex-col items-center gap-12">
          <div className="h-24 w-px bg-gradient-to-b from-alkota-orange to-transparent" />
          <Link 
            href="/machines"
            className="group relative flex items-center gap-6 border border-alkota-iron bg-alkota-black px-16 py-6 text-[11px] font-black uppercase tracking-[0.3em] text-white transition-all hover:bg-alkota-orange hover:border-alkota-orange no-underline"
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
