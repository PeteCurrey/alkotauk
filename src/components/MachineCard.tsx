'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Target, Gauge } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { calculateDealerPrice, formatCurrency } from '@/lib/pricing';
import BorderBeam from './ui/BorderBeam';

interface MachineCardProps {
  machine: any;
  index: number;
}

export default function MachineCard({ machine, index }: MachineCardProps) {
  const { data: session } = useSession();
  const user = session?.user as any;
  const isDealer = user?.role === 'dealer' || user?.role === 'admin';

  const dealerPrice = isDealer ? calculateDealerPrice(machine.price, user.tier) : null;

  // Specs from Supabase
  const gpm = machine.gpm || 0;
  const lpm = (gpm * 3.785).toFixed(1);
  const psi = machine.psi || 0;
  const bar = (psi / 14.5).toFixed(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      className="group relative flex flex-col bg-white border border-alkota-iron transition-all duration-500 hover:border-alkota-orange/50 hover:bg-white"
    >
      <BorderBeam 
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        size={500} 
        duration={10}
        colorFrom="var(--color-alkota-orange)"
        colorTo="var(--color-alkota-iron)"
      />

      {/* Elite Series Indicator */}
      {machine.series?.toLowerCase().includes('elite') || machine.is_elite_series ? (
        <div className="absolute left-0 top-6 z-20 bg-alkota-orange px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-xl">
          Elite Series
        </div>
      ) : null}

      {/* Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-alkota-bg">
        <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent z-10" />
        <img
          src={
            machine.image_url ||
            (machine.category === 'hot-water'
              ? '/assets/products/420x4.png'
              : machine.category === 'steam-cleaner'
              ? '/assets/products/steam-oil.png'
              : '/assets/products/4305xd4.png')
          }
          alt={machine.name}
          className="h-full w-full object-contain p-8 transition-transform duration-1000 group-hover:scale-110 grayscale-[0.8] group-hover:grayscale-0"
        />
        <div className="absolute bottom-6 left-6 z-20">
          <span className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-[0.3em] text-alkota-orange">
            {machine.model_code || machine.name}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-8">
        <h3 className="mb-2 font-barlow-condensed text-3xl font-black uppercase italic tracking-tight text-alkota-black group-hover:text-alkota-orange transition-colors duration-300">
          {machine.name}
        </h3>
        <p className="mb-8 font-inter text-[11px] leading-relaxed text-alkota-silver uppercase tracking-wider line-clamp-2">
          {machine.tagline || 'Industrial engineering for the toughest environments.'}
        </p>

        {/* Technical Specification Grid */}
        <div className="mt-auto grid grid-cols-2 gap-px bg-alkota-iron border border-alkota-iron">
          <div className="bg-alkota-steel/40 p-4">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="h-3 w-3 text-alkota-orange" />
              <span className="text-[9px] font-bold uppercase tracking-widest text-alkota-smoke">Flow Rate</span>
            </div>
            <div className="font-ibm-plex-mono text-sm font-bold text-alkota-black">
              {gpm} <span className="text-[10px] text-alkota-silver">GPM</span>
              <span className="mx-2 text-alkota-iron">|</span>
              {lpm} <span className="text-[10px] text-alkota-silver">LPM</span>
            </div>
          </div>
          <div className="bg-alkota-steel/40 p-4">
            <div className="flex items-center gap-2 mb-1">
              <Gauge className="h-3 w-3 text-alkota-orange" />
              <span className="text-[9px] font-bold uppercase tracking-widest text-alkota-smoke">Pressure</span>
            </div>
            <div className="font-ibm-plex-mono text-sm font-bold text-alkota-black">
              {bar} <span className="text-[10px] text-alkota-silver">BAR</span>
              <span className="mx-2 text-alkota-iron">|</span>
              {psi} <span className="text-[10px] text-alkota-silver">PSI</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Link
          href={`/machines/${machine.category}/${machine.slug}`}
          className="mt-8 flex w-full items-center justify-between border border-alkota-iron bg-transparent px-6 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-alkota-black transition-all hover:bg-alkota-orange hover:border-alkota-orange hover:text-white group/btn"
        >
          <span>View Specifications</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
        </Link>

        {isDealer && (
          <div className="mt-4 border-l-2 border-alkota-amber bg-alkota-amber/10 p-3">
             <div className="flex flex-col">
               <span className="text-[8px] font-black uppercase tracking-widest text-alkota-amber leading-none mb-1">
                 Dealer Net Price
               </span>
               <span className="font-ibm-plex-mono text-lg font-bold text-alkota-black">{formatCurrency(dealerPrice || 0)}</span>
             </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
