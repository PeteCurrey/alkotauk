'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Check, ShieldCheck, Wrench, Sparkles, ChevronRight, Plus } from 'lucide-react';
import SafeImage from '@/components/ui/SafeImage';
import { useCart } from '@/context/CartContext';

interface FeaturedToolingShowcaseProps {
  featuredParts?: any[];
}

export default function FeaturedToolingShowcase({ featuredParts = [] }: FeaturedToolingShowcaseProps) {
  const { addItem } = useCart();
  const [addedId, setAddedId] = React.useState<string | null>(null);

  const handleQuickAdd = (e: React.MouseEvent, part: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (!part.price) return;

    addItem({
      id: part.id || part.part_number,
      productId: part.id,
      productSlug: part.slug,
      name: part.name,
      category: 'part',
      price: Number(part.price),
      quantity: 1,
      variantName: part.part_number,
      maxQuantity: 10,
    });

    setAddedId(part.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  return (
    <section className="py-24 px-6 sm:px-12 lg:px-24 bg-[#0A0A0A] text-white border-b border-[#222]">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#222] pb-8">
          <div>
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.25em] text-alkota-orange block mb-2 font-medium">
              // Editorial Spotlight
            </span>
            <h2 className="text-4xl sm:text-5xl font-extralight text-white tracking-tight uppercase">
              Engineered For More.
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#888] font-light leading-relaxed">
            High-value attachments and OEM components precision-matched to maximise duty cycle, hydraulic flow, and cleaning speed across your equipment.
          </p>
        </div>

        {/* ── FLAGSHIP OVERSIZED SHOWROOM FEATURE (65% Visual Area) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Feature: Oversized Flagship Pump Assembly (7 cols) */}
          <div className="lg:col-span-7 bg-gradient-to-br from-[#161614] to-[#0D0D0B] border border-[#262624] p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden group shadow-2xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-radial from-alkota-orange/10 to-transparent pointer-events-none" />
            
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange bg-alkota-orange/10 border border-alkota-orange/30 px-3 py-1 font-medium">
                  FLAGSHIP PUMP ASSEMBLY
                </span>
                <span className="font-ibm-plex-mono text-xs text-[#AAA] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>100% Solid Ceramic</span>
                </span>
              </div>

              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extralight text-white tracking-tight leading-tight mb-3">
                General Pump TS2021 Series
              </h3>
              <span className="font-ibm-plex-mono text-xs text-[#AAA] block mb-6 uppercase tracking-wider">
                Industrial Triplex Ceramic Plunger Pump · 200 Bar · 21 L/min
              </span>

              <p className="text-sm text-[#CCC] font-light leading-relaxed max-w-xl mb-8">
                The benchmark industrial workhorse for Alkota hot water pressure washers. Features forged brass manifold, oversized connecting rods, solid ceramic plungers, and dual-pack V-seals built for continuous 8-hour daily wash bay operation.
              </p>

              {/* Technical Telemetry Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-y border-[#222] font-ibm-plex-mono text-xs mb-8">
                <div>
                  <span className="text-[#666] block text-[9px] uppercase">Max Pressure</span>
                  <span className="text-white font-medium">200 BAR (3000 PSI)</span>
                </div>
                <div>
                  <span className="text-[#666] block text-[9px] uppercase">Flow Rate</span>
                  <span className="text-white font-medium">21.0 L/MIN</span>
                </div>
                <div>
                  <span className="text-[#666] block text-[9px] uppercase">Shaft Diameter</span>
                  <span className="text-white font-medium">24mm Solid</span>
                </div>
                <div>
                  <span className="text-[#666] block text-[9px] uppercase">RPM Speed</span>
                  <span className="text-emerald-400 font-medium">1450 Low-Speed</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions Row */}
            <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="font-ibm-plex-mono text-[10px] text-[#666] uppercase block">Trade Price</span>
                <span className="font-ibm-plex-mono text-2xl text-white font-light">£645.00 <span className="text-xs text-[#888]">ex VAT</span></span>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href="/parts-attachments/product/general-pump-ts2021"
                  className="bg-alkota-orange hover:bg-white hover:text-black text-white px-7 py-3.5 font-ibm-plex-mono text-xs uppercase tracking-widest transition-all font-medium inline-flex items-center gap-2 shadow-lg"
                >
                  <span>View Specifications</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Supporting Feature Cards (5 cols - Staggered Asymmetrical Rhythm) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            
            {/* Card 1: Cox Reels High-Pressure Hose Reel */}
            <div className="bg-[#121210] border border-[#222] hover:border-alkota-orange/60 transition-all p-7 flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange">
                    Hose Management
                  </span>
                  <span className="font-ibm-plex-mono text-[10px] text-[#888]">
                    USA Heritage 1923
                  </span>
                </div>
                <h4 className="text-2xl font-light text-white tracking-tight mb-2">
                  Cox Reels 1125-3-100 Hand Crank Reel
                </h4>
                <p className="text-xs text-[#999] font-light leading-relaxed mb-4">
                  All-steel direct hand-crank hose reel accommodating up to 30m of 3/8" 300 Bar hose with nickel-plated brass live swivel.
                </p>
              </div>
              <div className="pt-4 border-t border-[#222] flex items-center justify-between">
                <span className="font-ibm-plex-mono text-sm text-white">£285.00 <span className="text-[10px] text-[#777]">ex VAT</span></span>
                <Link
                  href="/parts-attachments/product/cox-reels-1125-3-100"
                  className="font-ibm-plex-mono text-xs text-alkota-orange hover:text-white uppercase tracking-wider transition-colors inline-flex items-center gap-1"
                >
                  <span>Explore Reel</span>
                  <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Card 2: Turbo Rotating Nozzle Precision Head */}
            <div className="bg-[#121210] border border-[#222] hover:border-alkota-orange/60 transition-all p-7 flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange">
                    High-Impact Tooling
                  </span>
                  <span className="font-ibm-plex-mono text-[10px] text-emerald-400">
                    In Stock
                  </span>
                </div>
                <h4 className="text-2xl font-light text-white tracking-tight mb-2">
                  Ceramic Turbo Dirt Killer Nozzle (040)
                </h4>
                <p className="text-xs text-[#999] font-light leading-relaxed mb-4">
                  Zero-degree rotating ceramic pencil jet expanding to a 25-degree cone for 200% higher impact force on heavy mud and rust.
                </p>
              </div>
              <div className="pt-4 border-t border-[#222] flex items-center justify-between">
                <span className="font-ibm-plex-mono text-sm text-white">£48.00 <span className="text-[10px] text-[#777]">ex VAT</span></span>
                <Link
                  href="/parts-attachments/product/turbo-rotating-nozzle-04"
                  className="font-ibm-plex-mono text-xs text-alkota-orange hover:text-white uppercase tracking-wider transition-colors inline-flex items-center gap-1"
                >
                  <span>Explore Nozzle</span>
                  <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
