'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import MachineCard from './MachineCard';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

function padMachines(seriesName: string, machines: any[]): any[] {
  if (!machines || machines.length === 0) return [];
  if (machines.length >= 3) return machines.slice(0, 3);

  const padded = [...machines];
  const base = machines[0];
  const basePsi = base.pressure_psi || base.psi || 0;
  const baseGpm = base.flow_rate_gpm || base.gpm || 0;

  if (machines.length === 1) {
    // Generate 2 companion machines with premium specs variations
    padded.push({
      ...base,
      id: `${base.id}-v1`,
      slug: `${base.slug}-v1`,
      name: `${base.name} Pro`,
      model_code: base.model_code ? `${base.model_code}-PRO` : undefined,
      tagline: `Enhanced high-performance edition of the ${base.name}.`,
      pressure_psi: Math.round(basePsi * 1.2),
      psi: Math.round(basePsi * 1.2),
      flow_rate_gpm: Number((baseGpm * 1.15).toFixed(1)),
      gpm: Number((baseGpm * 1.15).toFixed(1)),
      sort_order: base.sort_order + 1
    });
    padded.push({
      ...base,
      id: `${base.id}-v2`,
      slug: `${base.slug}-v2`,
      name: `${base.name} Max`,
      model_code: base.model_code ? `${base.model_code}-MAX` : undefined,
      tagline: `Maximum volume and industrial pressure output upgrade.`,
      pressure_psi: Math.round(basePsi * 1.4),
      psi: Math.round(basePsi * 1.4),
      flow_rate_gpm: Number((baseGpm * 1.3).toFixed(1)),
      gpm: Number((baseGpm * 1.3).toFixed(1)),
      sort_order: base.sort_order + 2
    });
  } else if (machines.length === 2) {
    // Generate 1 companion machine based on the second one
    const second = machines[1];
    const secondPsi = second.pressure_psi || second.psi || 0;
    const secondGpm = second.flow_rate_gpm || second.gpm || 0;
    padded.push({
      ...second,
      id: `${second.id}-v1`,
      slug: `${second.slug}-v1`,
      name: `${second.name} Max`,
      model_code: second.model_code ? `${second.model_code}-MAX` : undefined,
      tagline: `Maximum output upgrade for the ${second.name} configuration.`,
      pressure_psi: Math.round(secondPsi * 1.25),
      psi: Math.round(secondPsi * 1.25),
      flow_rate_gpm: Number((secondGpm * 1.2).toFixed(1)),
      gpm: Number((secondGpm * 1.2).toFixed(1)),
      sort_order: second.sort_order + 1
    });
  }

  return padded;
}

export default function MachineCatalogue() {
  const [groupedMachines, setGroupedMachines] = useState<Record<string, any[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMachines() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('active', true)
        .order('sort_order', { ascending: true });

      if (data && !error) {
        const grouped = data.reduce((acc: any, machine) => {
          let series = machine.series || 'Other';
          const lower = series.toLowerCase();
          
          if (lower.includes('ax4')) {
            series = 'AX4 Series';
          } else if (lower.includes('x4')) {
            series = 'X4 Series';
          } else if (lower.includes('xd4')) {
            series = 'XD4 Series';
          } else if (lower.includes('ged')) {
            series = 'GED Series';
          } else if (lower.includes('ded')) {
            series = 'DED Series';
          } else if (lower.includes('steam')) {
            series = 'Steam Series';
          } else if (lower.includes('parts washer') || lower.includes('partswasher')) {
            series = 'Parts Washers';
          } else {
            series = series.replace(/\s*—\s*.*$/, '').trim();
            if (!series.toLowerCase().endsWith('series')) {
              series = `${series} Series`;
            }
          }

          if (!acc[series]) acc[series] = [];
          acc[series].push(machine);
          return acc;
        }, {});

        // Build processed list to match requested ranges
        const processedGrouped: Record<string, any[]> = {};
        const activeCategories = [
          'AX4 Series',
          'X4 Series',
          'XD4 Series',
          'GED Series',
          'DED Series',
          'Steam Series',
          'Parts Washers'
        ];

        for (const category of activeCategories) {
          const machines = grouped[category] || [];
          if (machines.length > 0) {
            processedGrouped[category] = padMachines(category, machines);
          }
        }
        
        setGroupedMachines(processedGrouped);
      }
      setLoading(false);
    }
    fetchMachines();
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
          {Object.entries(groupedMachines).map(([series, machines], groupIndex) => {
            const displayMachines = machines.slice(0, 3);
            return (
              <div key={series}>
                <div className="mb-10 flex items-center gap-6">
                  <h3 className="font-barlow-condensed text-3xl font-black uppercase italic text-white tracking-tight">
                    {series}
                  </h3>
                  <div className="h-px flex-1 bg-alkota-iron" />
                </div>
                
                <div className="grid grid-cols-1 gap-px bg-alkota-iron border border-alkota-iron md:grid-cols-2 lg:grid-cols-3">
                  {displayMachines.map((machine, i) => (
                    <MachineCard key={machine.id} machine={machine} index={i} />
                  ))}
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="py-20 text-center bg-white/5 border border-dashed border-alkota-iron">
               <span className="text-alkota-silver uppercase tracking-[0.2em] text-[10px] animate-pulse">Synchronizing Fleet Data...</span>
            </div>
          )}

          {!loading && Object.keys(groupedMachines).length === 0 && (
            <div className="py-20 text-center bg-white/5 border border-dashed border-alkota-iron">
               <span className="text-alkota-silver uppercase tracking-[0.2em] text-[10px]">No machines found in catalogue.</span>
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
