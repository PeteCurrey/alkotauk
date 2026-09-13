'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Gauge, Scale, Check, Flame, Thermometer } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { calculateDealerPrice, formatCurrency } from '@/lib/pricing';
import { resolveMachineImage } from '@/lib/images';
import RequestPricingModal from './RequestPricingModal';
import { useMachineComparison } from '@/lib/comparison/context';
import { Product } from '@/lib/products';
import { toCategoryRoute } from '@/lib/catalogue/series';

interface MachineCardProps {
  machine: Product;
  index: number;
}

export default function MachineCard({ machine, index }: MachineCardProps) {
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const { data: session } = useSession();
  const user = session?.user as any;
  const isDealer = user?.role === 'dealer' || user?.role === 'admin';

  const { isComparing, toggleMachine } = useMachineComparison();
  const comparing = isComparing(machine.slug);

  const dealerPrice = isDealer ? calculateDealerPrice((machine as any).price, user?.tier) : null;

  // Technical specifications (strict null / zero suppression)
  const gpm = machine.flow_rate_gpm && machine.flow_rate_gpm > 0 ? machine.flow_rate_gpm : null;
  const lpm = machine.flow_rate_lpm && machine.flow_rate_lpm > 0 ? machine.flow_rate_lpm : null;
  const psi = machine.pressure_psi && machine.pressure_psi > 0 ? machine.pressure_psi : null;
  const bar = machine.pressure_bar && machine.pressure_bar > 0 ? machine.pressure_bar : null;
  const tempC = machine.max_temp_c && machine.max_temp_c > 0 ? machine.max_temp_c : null;
  const power = machine.power_source || (machine.motor_hp ? `${machine.motor_hp} HP` : null);
  const fuel = machine.heating_fuel || null;

  const modelCode = machine.model_code || machine.slug.replace(/^alkota-/, '').toUpperCase();
  const categoryRoute = toCategoryRoute(machine.category || 'hot-water');
  const resolvedImage = resolveMachineImage(machine.primary_image_url, modelCode, machine.category);

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
          pressure_bar: bar || undefined,
          flow_rate_lpm: lpm || undefined,
        }}
      />

      <motion.article
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: Math.min(index * 0.04, 0.4), duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, margin: '-50px' }}
        className="group relative flex flex-col bg-white border border-[#E5E5E0] hover:border-[#FF6900] transition-colors duration-300 rounded-[4px] shadow-xs hover:shadow-md overflow-hidden"
      >
        {/* Top Badges & Comparison Action */}
        <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between gap-2 pointer-events-none">
          {/* Series Pill / Elite Badge */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {machine.is_elite_series && (
              <span className="bg-[#1A1A18] text-[#FF6900] border border-[#333] px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider rounded-[2px]">
                Elite Series
              </span>
            )}
            {machine.series && (
              <span className="bg-white/90 backdrop-blur-xs text-[#666] border border-[#E5E5E0] px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider rounded-[2px] truncate max-w-[180px]">
                {machine.series.replace(/Series$/i, '').trim()}
              </span>
            )}
          </div>

          {/* Comparison Toggle Control */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleMachine(machine.slug);
            }}
            className={`pointer-events-auto flex items-center gap-1 px-2.5 py-1 rounded-[3px] font-mono text-[10px] uppercase tracking-wider transition-all cursor-pointer ${
              comparing
                ? 'bg-[#FF6900] text-white font-bold shadow-sm ring-2 ring-[#FF6900]/30'
                : 'bg-white/95 hover:bg-white text-[#1A1A18] border border-[#DDD] shadow-xs'
            }`}
            aria-label={comparing ? `Remove ${modelCode} from comparison` : `Add ${modelCode} to comparison`}
            aria-pressed={comparing}
          >
            {comparing ? <Check className="w-3 h-3 text-white" /> : <Scale className="w-3 h-3 text-[#FF6900]" />}
            <span className="hidden xs:inline">{comparing ? 'Added' : 'Compare'}</span>
          </button>
        </div>

        {/* Machine Photography Frame */}
        <Link 
          href={`/machines/${categoryRoute}/${machine.slug}`}
          className="relative aspect-[4/3] w-full bg-[#FAF9F5] border-b border-[#EFEFEA] p-6 flex items-center justify-center overflow-hidden block"
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Real machine image framed with clean containment and subtle elevation */}
            <img
              src={resolvedImage}
              alt={`${machine.name} industrial pressure washer`}
              loading="lazy"
              className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-[1.03] filter drop-shadow-sm"
            />
          </div>

          {/* Model Code Watermark / Badge */}
          <span className="absolute bottom-3 left-4 font-mono text-[11px] font-bold uppercase tracking-widest text-[#888] bg-white/80 px-2 py-0.5 rounded-[2px] border border-[#EAEAEA]">
            {modelCode}
          </span>
        </Link>

        {/* Card Content & Specifications */}
        <div className="flex flex-1 flex-col p-5 font-normal">
          {/* Model Title */}
          <Link 
            href={`/machines/${categoryRoute}/${machine.slug}`}
            className="no-underline mb-1.5"
          >
            <h3 className="text-lg font-medium text-[#1A1A18] group-hover:text-[#FF6900] transition-colors leading-tight">
              {machine.name}
            </h3>
          </Link>

          {/* Tagline / Subtitle */}
          <p className="text-xs text-[#666] line-clamp-2 leading-relaxed mb-4 min-h-[32px]">
            {machine.tagline || machine.short_description || 'Heavy-duty industrial build engineered for continuous operation.'}
          </p>

          {/* Factual Specification Cells */}
          <div className="mt-auto grid grid-cols-2 gap-2 text-xs font-mono mb-4 pt-3 border-t border-[#F0F0EC]">
            {/* Flow Rate */}
            {lpm ? (
              <div className="bg-[#FAF9F5] p-2.5 rounded-[2px] border border-[#EAEAEA]">
                <div className="flex items-center gap-1.5 text-[#888] text-[9px] uppercase tracking-wider mb-0.5">
                  <Zap className="h-3 w-3 text-[#FF6900]" />
                  <span>Flow Rate</span>
                </div>
                <div className="text-xs font-bold text-[#1A1A18]">
                  {lpm} <span className="font-normal text-[10px] text-[#666]">L/M</span>
                  {gpm && <span className="font-normal text-[10px] text-[#999] ml-1.5">({gpm} GPM)</span>}
                </div>
              </div>
            ) : power ? (
              <div className="bg-[#FAF9F5] p-2.5 rounded-[2px] border border-[#EAEAEA]">
                <div className="flex items-center gap-1.5 text-[#888] text-[9px] uppercase tracking-wider mb-0.5">
                  <Zap className="h-3 w-3 text-[#FF6900]" />
                  <span>Drive Unit</span>
                </div>
                <div className="text-xs font-bold text-[#1A1A18] truncate" title={power}>
                  {power}
                </div>
              </div>
            ) : null}

            {/* Operating Pressure */}
            {bar ? (
              <div className="bg-[#FAF9F5] p-2.5 rounded-[2px] border border-[#EAEAEA]">
                <div className="flex items-center gap-1.5 text-[#888] text-[9px] uppercase tracking-wider mb-0.5">
                  <Gauge className="h-3 w-3 text-[#FF6900]" />
                  <span>Pressure</span>
                </div>
                <div className="text-xs font-bold text-[#1A1A18]">
                  {bar} <span className="font-normal text-[10px] text-[#666]">BAR</span>
                  {psi && <span className="font-normal text-[10px] text-[#999] ml-1.5">({psi} PSI)</span>}
                </div>
              </div>
            ) : tempC ? (
              <div className="bg-[#FAF9F5] p-2.5 rounded-[2px] border border-[#EAEAEA]">
                <div className="flex items-center gap-1.5 text-[#888] text-[9px] uppercase tracking-wider mb-0.5">
                  <Thermometer className="h-3 w-3 text-[#FF6900]" />
                  <span>Max Temp</span>
                </div>
                <div className="text-xs font-bold text-[#1A1A18]">
                  {tempC}°C
                </div>
              </div>
            ) : null}
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between pt-3 border-t border-[#F0F0EC] gap-2">
            <div>
              {dealerPrice ? (
                <div>
                  <span className="text-[9px] uppercase font-mono text-[#888] block">Dealer Net</span>
                  <span className="text-xs font-bold font-mono text-[#FF6900]">{formatCurrency(dealerPrice)}</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsPricingModalOpen(true)}
                  className="font-mono text-[11px] text-[#666] hover:text-[#FF6900] transition-colors uppercase tracking-wider cursor-pointer"
                >
                  Request Quote
                </button>
              )}
            </div>

            <Link
              href={`/machines/${categoryRoute}/${machine.slug}`}
              className="inline-flex items-center gap-1.5 text-xs font-medium font-mono uppercase tracking-wider text-[#1A1A18] group-hover:text-[#FF6900] transition-colors no-underline"
            >
              <span>View Machine</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 text-[#FF6900]" />
            </Link>
          </div>
        </div>
      </motion.article>
    </>
  );
}
