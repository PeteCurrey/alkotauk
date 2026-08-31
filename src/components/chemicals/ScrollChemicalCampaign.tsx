'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';

interface Props {
  productCount: number;
}

export default function ScrollChemicalCampaign({ productCount }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // ── CHAPTER 01: ATMOSPHERIC OPENER (0% -> 30%)
  const openerOpacity = useTransform(scrollYProgress, [0, 0.22, 0.35], [1, 0.9, 0]);
  const openerScale = useTransform(scrollYProgress, [0, 0.35], [1, 1.06]);
  const openerTextOpacity = useTransform(scrollYProgress, [0, 0.18, 0.28], [1, 0.8, 0]);
  const openerTextY = useTransform(scrollYProgress, [0, 0.28], [0, -50]);

  // ── CHAPTER 02: ROADFORCE FLEET STORY (25% -> 65%)
  const roadforceOpacity = useTransform(scrollYProgress, [0.22, 0.35, 0.62, 0.72], [0, 1, 1, 0]);
  const roadforceScale = useTransform(scrollYProgress, [0.22, 0.5, 0.7], [1.08, 1, 0.95]);
  const roadforceTextOpacity = useTransform(scrollYProgress, [0.28, 0.38, 0.6, 0.7], [0, 1, 1, 0]);
  const roadforceTextY = useTransform(scrollYProgress, [0.28, 0.38], [40, 0]);

  // ── CHAPTER 03: GREASECUT WORKSHOP STORY (65% -> 100%)
  const greasecutOpacity = useTransform(scrollYProgress, [0.65, 0.78, 1], [0, 1, 1]);
  const greasecutScale = useTransform(scrollYProgress, [0.65, 1], [1.06, 1]);
  const greasecutTextOpacity = useTransform(scrollYProgress, [0.72, 0.85, 1], [0, 1, 1]);
  const greasecutTextY = useTransform(scrollYProgress, [0.72, 0.85], [40, 0]);

  return (
    <div ref={containerRef} className="relative w-full h-[320vh] bg-[#0A0A0A]">
      
      {/* Pinned 100vh Camera Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between select-none">
        
        {/* ══════════════════════════════════════════════════════════════════════
            LAYER 01: ATMOSPHERIC LAUNCH (0% -> 30%)
            ══════════════════════════════════════════════════════════════════════ */}
        <motion.div 
          style={{ opacity: openerOpacity, scale: openerScale }}
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
        >
          <img
            src="/assets/industries/fleet.png"
            alt="Alkota Commercial Cleaning Chemistry in action"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-black/30" />
        </motion.div>

        {/* ══════════════════════════════════════════════════════════════════════
            LAYER 02: ROADFORCE FLEET CANVAS (25% -> 65%)
            ══════════════════════════════════════════════════════════════════════ */}
        <motion.div 
          style={{ opacity: roadforceOpacity, scale: roadforceScale }}
          className="absolute inset-0 w-full h-full z-20 pointer-events-none"
        >
          <img
            src="/assets/industries/fleet.png"
            alt="Commercial fleet vehicle washing with RoadForce TFR"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-transparent" />
        </motion.div>

        {/* ══════════════════════════════════════════════════════════════════════
            LAYER 03: GREASECUT WORKSHOP CANVAS (65% -> 100%)
            ══════════════════════════════════════════════════════════════════════ */}
        <motion.div 
          style={{ opacity: greasecutOpacity, scale: greasecutScale }}
          className="absolute inset-0 w-full h-full z-30 pointer-events-none bg-[#111110]"
        >
          <img
            src="/assets/parts/parts-hero-workshop.jpg"
            alt="Workshop degreasing heavy plant machinery"
            className="w-full h-full object-cover object-center opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#111110] via-[#111110]/70 to-transparent" />
        </motion.div>

        {/* ══════════════════════════════════════════════════════════════════════
            CHAPTER 01 SPATIAL STATEMENT (0% -> 25%)
            ══════════════════════════════════════════════════════════════════════ */}
        <motion.div 
          style={{ opacity: openerTextOpacity, y: openerTextY }}
          className="relative z-40 max-w-7xl mx-auto w-full px-6 sm:px-12 lg:px-24 my-auto pt-36 pb-12"
        >
          <div className="max-w-2xl space-y-6">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.35em] text-white/50 font-medium block">
              Professional Cleaning Chemistry
            </span>

            <h1 
              className="font-extralight text-white tracking-tight uppercase leading-[0.88] select-none"
              style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)' }}
            >
              Cleaning <br />
              <span className="text-white/50 font-light">chemistry.</span>
            </h1>

            <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed max-w-md">
              Made for serious cleaning. Formulated to accelerate under 50°C–90°C hot water pressure washing. Not domestic. Not diluted.
            </p>
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════════════════════════════════
            CHAPTER 02 ROADFORCE SPATIAL CHAPTER (25% -> 65%)
            ══════════════════════════════════════════════════════════════════════ */}
        <div className="absolute inset-0 w-full h-full z-40 pointer-events-none flex items-center px-6 sm:px-12 lg:px-24">
          <div className="w-full max-w-7xl">
            <motion.div 
              style={{ opacity: roadforceTextOpacity, y: roadforceTextY }}
              className="max-w-xl space-y-6 text-white pointer-events-auto"
            >
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.3em] text-white/60 font-medium block">
                Chapter 01 · Traffic Film Remover
              </span>

              <h2 
                className="font-extralight text-white tracking-tight uppercase leading-[0.92]"
                style={{ fontSize: 'clamp(2.5rem, 4.5vw, 4.2rem)' }}
              >
                RoadForce<br />
                <span className="text-white/50 font-light">Fleet Heavy TFR</span>
              </h2>

              <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed">
                "Cuts through road film and diesel grime in one touchless pass — without etching vehicle livery or polished aluminium."
              </p>

              {/* Integrated Quiet Commerce */}
              <div className="pt-2 space-y-4">
                <div className="flex items-baseline gap-4 font-ibm-plex-mono">
                  <span className="text-2xl text-white font-light">£38.50</span>
                  <span className="text-xs text-white/50 uppercase">ex VAT</span>
                  <span className="text-[10px] text-white/40 uppercase tracking-widest ml-auto">5L · 20L · 200L · 1000L</span>
                </div>

                <Link
                  href="/chemicals/product/roadforce-fleet-heavy-tfr"
                  className="inline-flex items-center gap-2 bg-white hover:bg-alkota-orange text-alkota-black hover:text-white px-8 py-4 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors font-medium shadow-md"
                >
                  <span>View Product</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════════
            CHAPTER 03 GREASECUT SPATIAL CHAPTER (65% -> 100%)
            ══════════════════════════════════════════════════════════════════════ */}
        <div className="absolute inset-0 w-full h-full z-40 pointer-events-none flex items-center px-6 sm:px-12 lg:px-24">
          <div className="w-full max-w-7xl">
            <motion.div 
              style={{ opacity: greasecutTextOpacity, y: greasecutTextY }}
              className="max-w-xl space-y-6 text-white pointer-events-auto"
            >
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.3em] text-white/50 font-medium block">
                Chapter 02 · Plant &amp; Workshop Degreaser
              </span>

              <h2 
                className="font-extralight text-white tracking-tight uppercase leading-[0.92]"
                style={{ fontSize: 'clamp(2.5rem, 4.5vw, 4.2rem)' }}
              >
                GreaseCut<br />
                <span className="text-white/40 font-light">Workshop</span>
              </h2>

              <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed">
                "Dissolves baked oil and chassis grease on contact." Saponifies heavy hydraulic fluid and bitumen into a clean, free-rinsing emulsion.
              </p>

              {/* Integrated Quiet Commerce */}
              <div className="pt-2 space-y-4">
                <div className="flex items-baseline gap-4 font-ibm-plex-mono">
                  <span className="text-2xl text-white font-light">From £42.00</span>
                  <span className="text-xs text-white/50 uppercase">ex VAT</span>
                  <span className="text-[10px] text-white/40 uppercase tracking-widest ml-auto">Master Code DE-703</span>
                </div>

                <Link
                  href="/chemicals/product/greasecut-multi-surface-workshop-degreaser"
                  className="inline-flex items-center gap-2 bg-white hover:bg-alkota-orange text-alkota-black hover:text-white px-8 py-4 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors font-medium shadow-md"
                >
                  <span>View Product</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Pinned Cue */}
        <div className="relative z-40 px-6 sm:px-12 lg:px-24 pb-8 flex items-center justify-between text-xs font-ibm-plex-mono text-white/40 pointer-events-none">
          <span>Scroll to Discover Chemical Formulations</span>
          <div className="inline-flex items-center gap-2 text-white/50">
            <span className="text-[10px] uppercase tracking-widest">Chapters</span>
            <ChevronDown className="w-3.5 h-3.5 text-alkota-orange animate-bounce" />
          </div>
        </div>

      </div>

    </div>
  );
}
