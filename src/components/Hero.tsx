'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import AccentLine from './ui/AccentLine';

const INDUSTRIAL_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  const itemVariants = shouldReduceMotion
    ? {
        hidden: { opacity: 1, y: 0 },
        visible: { opacity: 1, y: 0 },
      }
    : {
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.9, ease: INDUSTRIAL_EASE },
        },
      };

  return (
    <section
      className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden bg-[#0F0F0D] text-white px-6 sm:px-12 font-normal"
      aria-label="Alkota UK Industrial Cleaning Equipment"
    >
      {/* Full-bleed authentic photography background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="relative h-full w-full animate-ambient-zoom">
          <Image
            src="/assets/hero-home-header.jpg"
            alt="Alkota industrial hot water pressure washer on site"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center scale-105"
            style={{ filter: 'brightness(0.65) contrast(1.12)' }}
          />
        </div>
        {/* Cinematic soft vignettes for text clarity */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0D] via-transparent to-black/60" />
      </div>

      {/* Main hero typography & CTAs — Vertically centered */}
      <div className="relative z-10 mx-auto max-w-7xl w-full my-auto py-20">
        <motion.div
          className="max-w-2xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Subtle provenance monoline */}
          <motion.div
            variants={itemVariants}
            className="mb-5 inline-flex items-center gap-3 font-normal"
          >
            <AccentLine widthClass="w-5" immediate delay={0.1} />
            <span className="text-xs uppercase tracking-[0.25em] text-white/80 font-light">
              Est. 1964 · Alcester, South Dakota · UK Direct
            </span>
          </motion.div>

          {/* Primary Statement — Extra Light Work Sans */}
          <motion.h1
            variants={itemVariants}
            className="font-extralight uppercase tracking-tight text-white leading-[0.92] mb-6"
            style={{ fontSize: 'clamp(3.2rem, 7.5vw, 6.8rem)' }}
          >
            Industrial Power.<br />
            <span className="text-alkota-orange">Built to</span> Outlast.
          </motion.h1>

          {/* Concise supporting paragraph — clean Normal Work Sans */}
          <motion.p
            variants={itemVariants}
            className="text-[#E0E0DC] text-base sm:text-lg leading-relaxed mb-10 max-w-lg font-normal"
          >
            Six decades of heavy American industrial engineering. Cold-rolled structural steel, ceramic triplex pumps, and Schedule 80 seamless heating coils built for continuous duty.
          </motion.p>

          {/* Dual CTAs — Clean and confident */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 font-normal"
          >
            <Link
              href="/machines"
              className="inline-flex items-center justify-center gap-3 bg-alkota-orange text-white px-8 py-3.5 text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all no-underline group shadow-xl font-normal rounded-[4px] shadow-button hover:shadow-button-hover btn-tactile"
            >
              <span>Explore Fleet</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/dealers/demo-request"
              className="inline-flex items-center justify-center gap-3 border border-white/40 bg-black/40 backdrop-blur-sm text-white px-7 py-3.5 text-xs uppercase tracking-[0.2em] hover:border-white hover:bg-white hover:text-black transition-all no-underline font-normal rounded-[4px] shadow-button hover:shadow-button-hover btn-tactile"
            >
              <span>Book On-Site Demo</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
