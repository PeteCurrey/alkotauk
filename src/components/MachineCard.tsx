'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Gauge, FileText } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { calculateDealerPrice, formatCurrency } from '@/lib/pricing';
import BorderBeam from './ui/BorderBeam';
import { resolveMachineImage } from '@/lib/images';
import RequestPricingModal from './RequestPricingModal';

interface MachineCardProps {
  machine: any;
  index: number;
}

export default function MachineCard({ machine, index }: MachineCardProps) {
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const { data: session } = useSession();
  const user = session?.user as any;
  const isDealer = user?.role === 'dealer' || user?.role === 'admin';

  const dealerPrice = isDealer ? calculateDealerPrice(machine.price, user.tier) : null;

  // Specs from Supabase / Products
  const gpm = machine.flow_rate_gpm !== undefined && machine.flow_rate_gpm !== null ? machine.flow_rate_gpm : (machine.gpm || 0);
  const lpm = machine.flow_rate_lpm !== undefined && machine.flow_rate_lpm !== null ? machine.flow_rate_lpm : (gpm * 3.785).toFixed(1);
  const psi = machine.pressure_psi || machine.psi || 0;
  const bar = machine.pressure_bar || (psi / 14.5).toFixed(0);
  const imageUrl = machine.primary_image_url || machine.image_url;
  const modelCode = machine.model_code || machine.slug?.replace('alkota-', '').toUpperCase() || machine.name;

  return (
    <>
      <RequestPricingModal
        isOpen={isPricingModalOpen}
        onClose={() => setIsPricingModalOpen(false)}
        product={{
          id: machine.id,
          name: machine.name,
          slug: machine.slug,
          category: machine.category,
          series: machine.series,
          pressure_bar: bar,
          flow_rate_lpm: lpm,
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="group relative flex flex-col bg-white border border-alkota-iron transition-all duration-500 hover:border-alkota-orange/50 hover:bg-white font-normal"
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
          <div className="absolute left-0 top-6 z-20 bg-alkota-orange px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] text-white shadow-xl font-light">
            Elite Series
          </div>
        ) : null}

        {/* Image Container */}
        <Link 
          href={`/machines/${machine.category || 'hot-water'}/${machine.slug}`}
          className="relative aspect-[16/10] w-full overflow-hidden bg-alkota-bg block"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent z-10" />
          <img
            src={resolveMachineImage(imageUrl, modelCode, machine.category)}
            alt={machine.name}
            className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[0.8] group-hover:grayscale-0"
          />
          <div className="absolute bottom-6 left-6 z-20 font-normal">
            <span className="text-[10px] uppercase tracking-[0.3em] text-alkota-orange font-light">
              {modelCode}
            </span>
          </div>
        </Link>

        {/* Content */}
        <div className="flex flex-1 flex-col p-8 font-normal">
          <Link 
            href={`/machines/${machine.category || 'hot-water'}/${machine.slug}`}
            className="no-underline"
          >
            <h3 className="mb-2 text-2xl font-light uppercase tracking-tight text-alkota-black group-hover:text-alkota-orange transition-colors duration-300">
              {machine.name}
            </h3>
          </Link>
          <p className="mb-8 text-xs leading-relaxed text-alkota-silver uppercase tracking-wider line-clamp-2 font-normal">
            {machine.tagline || 'Industrial engineering for the toughest environments.'}
          </p>

          {/* Technical Specification Grid */}
          <div className="mt-auto grid grid-cols-2 gap-px bg-alkota-iron border border-alkota-iron font-normal">
            <div className="bg-alkota-steel/40 p-4">
              <div className="flex items-center gap-2 mb-1 font-normal">
                <Zap className="h-3 w-3 text-alkota-orange" />
                <span className="text-[9px] uppercase tracking-widest text-alkota-smoke font-light">Flow Rate</span>
              </div>
              <div className="text-sm text-alkota-black font-normal">
                {gpm} <span className="text-[10px] text-alkota-silver">GPM</span>
                <span className="mx-2 text-alkota-iron">|</span>
                {lpm} <span className="text-[10px] text-alkota-silver">LPM</span>
              </div>
            </div>
            <div className="bg-alkota-steel/40 p-4">
              <div className="flex items-center gap-2 mb-1 font-normal">
                <Gauge className="h-3 w-3 text-alkota-orange" />
                <span className="text-[9px] uppercase tracking-widest text-alkota-smoke font-light">Pressure</span>
              </div>
              <div className="text-sm text-alkota-black font-normal">
                {bar} <span className="text-[10px] text-alkota-silver">BAR</span>
                <span className="mx-2 text-alkota-iron">|</span>
                {psi} <span className="text-[10px] text-alkota-silver">PSI</span>
              </div>
            </div>
          </div>

          {/* Action Link & Pricing Action */}
          <div className="mt-8 flex items-center justify-between border-t border-alkota-iron/40 pt-6 font-normal gap-2">
            <div>
              {dealerPrice ? (
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-alkota-smoke block font-light">Dealer Spec</span>
                  <span className="text-sm text-alkota-orange font-normal">{formatCurrency(dealerPrice)}</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsPricingModalOpen(true)}
                  className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange font-bold hover:underline text-left cursor-pointer"
                >
                  Request Pricing →
                </button>
              )}
            </div>
            <Link
              href={`/machines/${machine.category || 'hot-water'}/${machine.slug}`}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-alkota-black group-hover:text-alkota-orange transition-colors font-normal no-underline"
            >
              <span>Spec Sheet</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </motion.div>
    </>
  );
}

