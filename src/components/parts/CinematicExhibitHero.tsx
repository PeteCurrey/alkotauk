'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Plus, Check, ChevronDown } from 'lucide-react';
import { usePartsRequest } from './PartsRequestListContext';

export interface ExhibitItem {
  id: string;
  partNumber: string;
  brand: string;
  name: string;
  tagline: string;
  promise: string;
  specs: { label: string; value: string }[];
  price: number;
  image: string;
  bgWatermark: string;
  category: string;
  inStock: boolean;
  material?: string;
  origin?: string;
  packSizes?: string[];
  slug?: string;
}

interface Props {
  exhibits: ExhibitItem[];
  mode?: 'parts' | 'chemicals';
  subtitle?: string;
}

export default function CinematicExhibitHero({ exhibits, mode = 'parts', subtitle }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedPackSize, setSelectedPackSize] = useState<string>('20L Drum');
  const [added, setAdded] = useState(false);
  const { addItem, setIsDrawerOpen } = usePartsRequest();

  const current = exhibits[currentIndex];

  useEffect(() => {
    if (current.packSizes && current.packSizes.length > 0) {
      setSelectedPackSize(current.packSizes[1] || current.packSizes[0]);
    }
  }, [currentIndex, current]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % exhibits.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + exhibits.length) % exhibits.length);
  };

  const handleOrder = () => {
    addItem({
      id: current.id,
      part_number: current.partNumber,
      name: mode === 'chemicals' ? `${current.name} (${selectedPackSize})` : current.name,
      price_each: current.price,
      quantity: 1,
      image: current.image,
      pack_size: mode === 'chemicals' ? selectedPackSize : undefined,
      category: current.category,
    });
    setAdded(true);
    setIsDrawerOpen(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section 
      className="relative w-full min-h-[92vh] lg:min-h-screen bg-[#EBEAE5] text-[#111110] font-sans overflow-hidden flex flex-col justify-between pt-28 pb-8 px-6 sm:px-12 lg:px-16 select-none"
      aria-label={mode === 'parts' ? 'Featured Tooling Exhibits' : 'Featured Formulation Exhibits'}
    >
      {/* ── GIANT SPATIAL WATERMARK TYPOGRAPHY ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none">
        <AnimatePresence mode="wait">
          <motion.span
            key={current.bgWatermark}
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 0.045, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.08, y: -30 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-[17vw] font-extrabold uppercase tracking-tighter text-[#111110] leading-none text-center"
          >
            {current.bgWatermark}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* ── TOP METADATA & BRAND ANCHOR BAR ── */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-4 border-b border-[#D8D6CE] pb-5">
        
        {/* Left: Flame Logo Anchor + Heritage */}
        <div className="flex items-center gap-3">
          <img
            src="/assets/alkota-flame-logo.png"
            alt="Alkota Flame Mark"
            className="h-7 w-auto object-contain"
          />
          <div className="border-l border-[#C8C6BD] pl-3 py-0.5">
            <span className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.25em] text-[#FF6900] block font-semibold">
              ALKOTA {mode === 'chemicals' ? 'CHEMISTRY' : 'PARTS & TOOLING'}
            </span>
            <span className="font-ibm-plex-mono text-[10px] text-[#777] uppercase tracking-wider block">
              EST. 1964 · ALCESTER, SD
            </span>
          </div>
        </div>

        {/* Center: Exhibit Switcher Tabs */}
        <div className="hidden md:flex items-center gap-1 bg-[#DFDDD6] p-1 rounded-sm">
          {exhibits.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setCurrentIndex(idx)}
              className={`px-3.5 py-1.5 font-ibm-plex-mono text-[10px] uppercase tracking-wider transition-all cursor-pointer ${
                currentIndex === idx
                  ? 'bg-[#111110] text-white shadow-sm font-semibold'
                  : 'text-[#666] hover:text-[#111110]'
              }`}
            >
              {item.partNumber.replace('MOS-', '').replace('COX-', '').replace('ALK-', '')}
            </button>
          ))}
        </div>

        {/* Right: Origin & Engineering Certification */}
        <div className="text-right">
          <span className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.3em] text-[#777] block font-medium">
            {mode === 'chemicals' ? 'SAFETY STANDARD' : 'ORIGIN & CRAFT'}
          </span>
          <span className="font-ibm-plex-mono text-xs text-[#111110] font-semibold">
            {mode === 'chemicals' ? '100% GB-CLP VERIFIED' : (current.origin || 'ALCESTER, SD, USA')}
          </span>
        </div>
      </div>

      {/* ── MAIN SCULPTURAL PRODUCT HERO ── */}
      <div className="relative z-10 w-full my-auto py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column: Tagline, Monumental Title & Narrative (4 Cols) */}
        <div className="lg:col-span-4 space-y-6 order-2 lg:order-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-5"
            >
              <div className="space-y-2">
                <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.3em] text-[#FF6900] font-semibold block">
                  {current.tagline}
                </span>
                <h1 
                  className="font-extralight text-[#111110] tracking-tight uppercase leading-[0.88]"
                  style={{ fontSize: 'clamp(2.4rem, 4.2vw, 4rem)' }}
                >
                  {current.name}
                </h1>
              </div>

              <p className="text-sm sm:text-base text-[#555] font-normal leading-relaxed">
                {current.promise}
              </p>

              {/* Pack Formats (for chemicals) or Material Pill (for tooling) */}
              {mode === 'chemicals' && current.packSizes && (
                <div className="space-y-2 pt-1">
                  <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#777] block">
                    Select Container Size:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {current.packSizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedPackSize(size)}
                        className={`px-3 py-1.5 font-ibm-plex-mono text-[11px] uppercase tracking-wider transition-all cursor-pointer ${
                          selectedPackSize === size
                            ? 'bg-[#111110] text-white shadow-sm'
                            : 'bg-[#DFDDD6] text-[#444] hover:bg-[#D0CEC5]'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {mode === 'parts' && current.material && (
                <div className="pt-1">
                  <span className="font-ibm-plex-mono text-[10px] text-[#444] uppercase tracking-wider bg-[#DFDDD6] px-3 py-1.5 border border-[#D0CEC5]">
                    Material: {current.material}
                  </span>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Center Column: Enormous Sculptural Centerpiece with Ken Burns Motion (5 Cols) */}
        <div className="lg:col-span-5 relative flex items-center justify-center min-h-[380px] sm:min-h-[480px] order-1 lg:order-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 0.88, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.08, y: -30 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full flex items-center justify-center"
            >
              {/* Natural Ambient Contact Floor Shadow */}
              <div className="absolute -bottom-8 inset-x-8 h-20 bg-black/20 blur-3xl rounded-full pointer-events-none" />

              <motion.img
                src={current.image}
                alt={current.name}
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10 w-full h-auto max-w-[540px] max-h-[460px] object-contain filter drop-shadow-[0_32px_52px_rgba(0,0,0,0.2)] select-none hover:scale-[1.03] transition-transform duration-700"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Column: Clean Ruled Spec Strip & Direct Commerce (3 Cols) */}
        <div className="lg:col-span-3 space-y-6 order-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              {/* Clean Ruled Specification Strip */}
              <div className="space-y-2">
                <span className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.3em] text-[#777] font-semibold block">
                  {mode === 'chemicals' ? 'FORMULATION SPECIFICATION' : 'ENGINEERING DATA'}
                </span>
                <div className="divide-y divide-[#D8D6CE] border-y border-[#D8D6CE] text-xs font-ibm-plex-mono">
                  {current.specs.map((s, idx) => (
                    <div key={idx} className="py-2 flex justify-between gap-2">
                      <span className="text-[#777] uppercase text-[10px]">{s.label}</span>
                      <span className="text-[#111110] font-medium text-right">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trade Price & Direct Purchase Action */}
              <div className="space-y-4 pt-1">
                <div>
                  <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#888] block">
                    UK TRADE PRICE
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-ibm-plex-mono text-3xl sm:text-4xl text-[#111110] font-light">
                      £{current.price.toFixed(2)}
                    </span>
                    <span className="font-ibm-plex-mono text-xs text-[#777] uppercase">ex VAT</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2.5">
                  <button
                    type="button"
                    onClick={handleOrder}
                    className="w-full bg-[#111110] hover:bg-[#FF6900] text-white py-4 px-6 font-ibm-plex-mono text-xs uppercase tracking-widest transition-all font-medium flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{added ? 'Added to Order ✓' : 'Add to Order'}</span>
                  </button>

                  <Link
                    href={
                      mode === 'chemicals'
                        ? `/chemicals/product/${current.slug || current.partNumber.toLowerCase()}`
                        : `/parts-attachments/product/${current.partNumber.toLowerCase().replace(/[^a-z0-9]/g, '-')}`
                    }
                    className="w-full py-3 border border-[#C5C3BB] hover:border-black text-[#111110] text-center font-ibm-plex-mono text-[11px] uppercase tracking-widest transition-colors bg-white/40"
                  >
                    Technical Dossier →
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* ── BOTTOM CAROUSEL CONTROLS & TRUST BAR ── */}
      <div className="relative z-20 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#D8D6CE] pt-5 font-ibm-plex-mono text-xs">
        
        {/* Next / Previous Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrev}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#DFDDD6] hover:bg-[#111110] hover:text-white transition-colors uppercase tracking-widest text-[10px] cursor-pointer"
            aria-label="Previous exhibit"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>Prev</span>
          </button>
          <button
            onClick={handleNext}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#DFDDD6] hover:bg-[#111110] hover:text-white transition-colors uppercase tracking-widest text-[10px] cursor-pointer"
            aria-label="Next exhibit"
          >
            <span>Next</span>
            <ArrowRight className="w-3 h-3" />
          </button>
          <span className="text-[#888] text-[10px] uppercase ml-1">
            {currentIndex + 1} of {exhibits.length}
          </span>
        </div>

        {/* High-Weight Trust Signals */}
        <div className="flex flex-wrap items-center justify-center gap-5 text-[#666] text-[10px] uppercase tracking-wider">
          <span>Next-Day UK Mainland Delivery</span>
          <span className="text-[#C8C6BD]">•</span>
          <span>Official Factory Warranties</span>
          <span className="text-[#C8C6BD]">•</span>
          <a href="#catalogue" className="text-[#111110] hover:text-[#FF6900] transition-colors font-semibold">
            {mode === 'chemicals' ? 'Browse 20+ Formulations ↓' : 'Browse 500+ Spares ↓'}
          </a>
        </div>
      </div>

    </section>
  );
}
