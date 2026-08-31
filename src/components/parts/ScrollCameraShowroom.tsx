'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import VideoBackground from '@/components/ui/VideoBackground';
import { usePartsRequest } from './PartsRequestListContext';

export default function ScrollCameraShowroom() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { addItem, setIsDrawerOpen } = usePartsRequest();

  // Scroll Progress mapped across the camera journey track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // ── CAMERA STAGE 01: ARRIVAL FILM (0% -> 35%)
  const filmOpacity = useTransform(scrollYProgress, [0, 0.28, 0.42], [1, 0.9, 0]);
  const filmScale = useTransform(scrollYProgress, [0, 0.35], [1, 1.08]);
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.18, 0.28], [1, 0.7, 0]);
  const heroTextY = useTransform(scrollYProgress, [0, 0.28], [0, -60]);

  // ── CAMERA STAGE 02: MOSMATIC REVEAL (25% -> 70%)
  const studioBgOpacity = useTransform(scrollYProgress, [0.22, 0.35, 0.65, 0.78], [0, 1, 1, 0]);
  const mosmaticOpacity = useTransform(scrollYProgress, [0.22, 0.35, 0.65, 0.78], [0, 1, 1, 0]);
  const mosmaticScale = useTransform(scrollYProgress, [0.22, 0.5, 0.75], [0.82, 1.05, 1.18]);
  const mosmaticX = useTransform(scrollYProgress, [0.22, 0.5], ['-5%', '0%']);
  const mosmaticTextOpacity = useTransform(scrollYProgress, [0.3, 0.42, 0.62, 0.72], [0, 1, 1, 0]);
  const mosmaticTextY = useTransform(scrollYProgress, [0.3, 0.42], [40, 0]);

  // ── CAMERA STAGE 03: CONCRETE IN-USE TRANSFORMATION (65% -> 100%)
  const concreteBgOpacity = useTransform(scrollYProgress, [0.65, 0.78, 1], [0, 1, 1]);
  const concreteScale = useTransform(scrollYProgress, [0.65, 1], [1.05, 1]);
  const concreteTextOpacity = useTransform(scrollYProgress, [0.72, 0.85, 1], [0, 1, 1]);
  const concreteTextY = useTransform(scrollYProgress, [0.72, 0.85], [40, 0]);

  const handleAddMosmatic = () => {
    addItem({
      id: 'featured-mosmatic-43',
      part_number: 'MOS-DL-UHD-43',
      name: 'Mosmatic DL-UHD 43 Flat Surface Cleaner (18")',
      price_each: 445.00,
      quantity: 1,
      image: '/assets/products/whirl-away-surface-cleaner.png',
      category: 'surface-cleaners',
    });
    setIsDrawerOpen(true);
  };

  return (
    <div ref={containerRef} className="relative w-full h-[320vh] bg-[#0A0A0A]">
      
      {/* Pinned 100vh Camera Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between select-none">
        
        {/* ══════════════════════════════════════════════════════════════════════
            LAYER 01: ARRIVAL INDUSTRIAL FILM
            ══════════════════════════════════════════════════════════════════════ */}
        <motion.div 
          style={{ opacity: filmOpacity, scale: filmScale }}
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
        >
          <VideoBackground
            src="/assets/video/alkota-action.mp4"
            poster="/assets/industrial-steam-washers.jpg"
            className="w-full h-full"
            overlayClassName="bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-black/20"
          />
        </motion.div>

        {/* ══════════════════════════════════════════════════════════════════════
            LAYER 02: ARCHITECTURAL STUDIO CANVAS (WARM STONE #FAF9F5)
            ══════════════════════════════════════════════════════════════════════ */}
        <motion.div 
          style={{ opacity: studioBgOpacity }}
          className="absolute inset-0 w-full h-full bg-[#FAF9F5] z-20 pointer-events-none"
        />

        {/* ══════════════════════════════════════════════════════════════════════
            LAYER 03: WET CONCRETE HARDSTANDING CANVAS
            ══════════════════════════════════════════════════════════════════════ */}
        <motion.div 
          style={{ opacity: concreteBgOpacity, scale: concreteScale }}
          className="absolute inset-0 w-full h-full z-30 pointer-events-none overflow-hidden"
        >
          <img
            src="/assets/industries/construction.png"
            alt="Real-world commercial concrete surface cleaning in action"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        </motion.div>

        {/* ══════════════════════════════════════════════════════════════════════
            STAGE 01 SPATIAL NARRATION (0% -> 25%)
            ══════════════════════════════════════════════════════════════════════ */}
        <motion.div 
          style={{ opacity: heroTextOpacity, y: heroTextY }}
          className="relative z-40 max-w-7xl mx-auto w-full px-6 sm:px-12 lg:px-24 my-auto pt-32 pb-12"
        >
          <div className="max-w-4xl space-y-6">
            <h1 
              className="font-extralight text-white tracking-tight uppercase leading-[0.88] select-none"
              style={{ fontSize: 'clamp(3.5rem, 8.5vw, 7.5rem)' }}
            >
              Make your <br />
              Alkota <br />
              <span className="text-white/60 font-light">do more.</span>
            </h1>

            <p className="text-base sm:text-xl text-white/80 font-light leading-relaxed max-w-xl">
              Swiss rotary surface cleaners, heavy-duty hose management, and genuine factory spares. Stocked in the UK for next-day delivery.
            </p>
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════════════════════════════════
            STAGE 02 PHYSICAL PRODUCT REVEAL (25% -> 65%)
            ══════════════════════════════════════════════════════════════════════ */}
        <div className="absolute inset-0 w-full h-full z-40 pointer-events-none flex items-center justify-center px-6 sm:px-12 lg:px-24">
          <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Massive Physical Cutout with Natural Ambient Shadow */}
            <div className="lg:col-span-7 relative flex items-center justify-center">
              <motion.div
                style={{ 
                  opacity: mosmaticOpacity, 
                  scale: mosmaticScale, 
                  x: mosmaticX 
                }}
                className="relative w-full max-w-[620px] flex items-center justify-center"
              >
                {/* Natural Ground Contact Ambient Floor Shadow */}
                <div className="absolute -bottom-6 inset-x-8 h-16 bg-black/20 blur-3xl rounded-full" />

                <img
                  src="/assets/products/whirl-away-surface-cleaner.png"
                  alt="Mosmatic DL-UHD 43 Stainless Steel Rotary Surface Cleaner"
                  className="relative z-10 w-full h-auto object-contain filter drop-shadow-[0_24px_40px_rgba(0,0,0,0.16)]"
                  onError={(e) => {
                    (e.target as HTMLElement).setAttribute('src', '/assets/products/industrial-pump.png');
                  }}
                />
              </motion.div>
            </div>

            {/* Asymmetric Floating Narration & Integrated Quiet Commerce */}
            <motion.div 
              style={{ opacity: mosmaticTextOpacity, y: mosmaticTextY }}
              className="lg:col-span-5 space-y-6 text-alkota-black pointer-events-auto"
            >
              <div className="space-y-2">
                <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.3em] text-[#888] font-medium block">
                  Mosmatic Switzerland · 18" Rotary Dome
                </span>
                <h2 
                  className="font-extralight text-[#0A0A0A] tracking-tight uppercase leading-[0.92]"
                  style={{ fontSize: 'clamp(2.4rem, 4.2vw, 3.8rem)' }}
                >
                  Clean large areas<br />
                  <span className="text-[#666] font-light">faster.</span>
                </h2>
              </div>

              <p className="text-base sm:text-lg text-[#555] font-normal leading-relaxed">
                Twin stainless steel spray arms rotate at 2,000 RPM inside a welded protective dome. Blasts concrete yards, forecourts, and workshop bays streak-free with zero overspray.
              </p>

              {/* Quiet Single-Line Commerce */}
              <div className="pt-2 space-y-4">
                <div className="flex items-baseline gap-3">
                  <span className="font-ibm-plex-mono text-3xl text-alkota-black font-light">£445.00</span>
                  <span className="font-ibm-plex-mono text-xs text-[#777] uppercase">ex VAT</span>
                  <span className="text-xs text-[#888] font-ibm-plex-mono ml-auto">In Stock · UK Warehouse</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-1">
                  <button
                    type="button"
                    onClick={handleAddMosmatic}
                    className="bg-alkota-black hover:bg-alkota-orange text-white py-4 px-8 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors font-medium flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <span>Add to Order</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <Link
                    href="/parts-attachments/product/mosmatic-dl-uhd-43"
                    className="py-4 px-6 border border-[#DCDAD4] hover:border-black text-alkota-black text-center font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors font-medium bg-white/60 backdrop-blur-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════════
            STAGE 03 SPATIAL NARRATION ON CONCRETE (70% -> 100%)
            ══════════════════════════════════════════════════════════════════════ */}
        <div className="absolute inset-0 w-full h-full z-40 pointer-events-none flex items-center px-6 sm:px-12 lg:px-24">
          <div className="w-full max-w-7xl">
            <motion.div 
              style={{ opacity: concreteTextOpacity, y: concreteTextY }}
              className="max-w-xl space-y-6 text-white pointer-events-auto"
            >
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.3em] text-white/70 font-medium block">
                Real-World Application · Commercial Concrete
              </span>
              
              <h3 
                className="font-extralight text-white tracking-tight uppercase leading-[0.95]"
                style={{ fontSize: 'clamp(2.4rem, 4vw, 4rem)' }}
              >
                Clean more<br />
                <span className="text-white/60 font-light">ground.</span>
              </h3>

              <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed">
                Wand cleaning creates uneven pressure peaks and leaves zebra stripes on concrete. Mosmatic rotary arm geometry maintains a constant 25mm clearance and uniform pass coverage across thousands of square metres.
              </p>

              <div className="pt-2">
                <Link
                  href="/parts-attachments/surface-cleaners"
                  className="inline-flex items-center gap-2 font-ibm-plex-mono text-xs text-white hover:text-alkota-orange uppercase tracking-wider font-medium transition-colors"
                >
                  <span>Explore All Rotary Cleaners</span>
                  <ArrowRight className="w-3.5 h-3.5 text-alkota-orange" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Pinned Cue */}
        <div className="relative z-40 px-6 sm:px-12 lg:px-24 pb-8 flex items-center justify-between text-xs font-ibm-plex-mono text-white/50 pointer-events-none">
          <span>Scroll to Travel Through Tooling</span>
          <div className="inline-flex items-center gap-2 text-white/60">
            <span className="text-[10px] uppercase tracking-widest">Camera</span>
            <ChevronDown className="w-3.5 h-3.5 text-alkota-orange animate-bounce" />
          </div>
        </div>

      </div>

    </div>
  );
}
