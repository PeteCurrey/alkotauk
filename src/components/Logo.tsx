'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface LogoProps {
  className?: string;
  isAnimated?: boolean;
}

export default function Logo({
  className = 'h-9',
  isAnimated = false,
}: LogoProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none group ${className}`}
    >
      {/* ── BASE LOGO IMAGE ── */}
      <motion.div
        className="relative z-10 w-auto h-full flex items-center"
        initial={isAnimated ? { opacity: 0, scale: 0.96 } : { opacity: 1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          opacity: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
        }}
      >
        <img
          src="/assets/alkota-flame-logo.png"
          alt="Alkota Cleaning Systems Inc."
          style={{ maxHeight: '42px', width: 'auto' }}
          className="w-auto h-full object-contain select-none transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </motion.div>

      {/* ── BLUE GAS FLAME — overlaid on top of logo, left zone ──
          mix-blend-lighten: only brightens, never darkens — safe over any logo bg.
          Positioned to align with the blue half of the Alkota flame mark. */}
      {!shouldReduceMotion && (
        <motion.div
          className="absolute z-20 pointer-events-none rounded-full"
          style={{
            left: '4%',
            top: '5%',
            width: '48%',
            height: '90%',
            background:
              'radial-gradient(ellipse 65% 80% at 40% 40%, rgba(56,189,248,0.80) 0%, rgba(30,64,175,0.60) 40%, rgba(30,58,138,0.20) 65%, transparent 85%)',
            filter: 'blur(4px)',
            mixBlendMode: 'lighten',
          }}
          animate={{
            scale: [1.00, 1.08, 0.96, 1.10, 0.98, 1.05, 1.00],
            opacity: [0.55, 0.90, 0.60, 0.95, 0.58, 0.85, 0.55],
            x: [0, -1.5, 0.8, -1.0, 1.2, -0.5, 0],
            y: [0, -2.0, 1.2, -1.5, 0.8, -1.0, 0],
          }}
          transition={{
            duration: 7.3,
            repeat: Infinity,
            ease: 'easeInOut',
            times: [0, 0.18, 0.35, 0.52, 0.67, 0.84, 1.0],
          }}
        />
      )}

      {/* ── RED / ORANGE COMBUSTION FLAME — right zone ──
          Slightly slower period (9.1s) so both flames are always out of phase. */}
      {!shouldReduceMotion && (
        <motion.div
          className="absolute z-20 pointer-events-none rounded-full"
          style={{
            right: '4%',
            top: '5%',
            width: '52%',
            height: '90%',
            background:
              'radial-gradient(ellipse 60% 85% at 58% 38%, rgba(255,120,0,0.85) 0%, rgba(220,38,38,0.65) 38%, rgba(185,28,28,0.25) 62%, transparent 82%)',
            filter: 'blur(4.5px)',
            mixBlendMode: 'lighten',
          }}
          animate={{
            scale: [1.05, 0.96, 1.12, 0.98, 1.08, 0.93, 1.05],
            opacity: [0.60, 0.38, 0.92, 0.48, 0.88, 0.42, 0.60],
            x: [0, 1.8, -1.0, 1.5, -0.8, 1.2, 0],
            y: [0, -2.5, 1.0, -1.8, 1.5, -0.8, 0],
          }}
          transition={{
            duration: 9.1,
            repeat: Infinity,
            ease: 'easeInOut',
            times: [0, 0.14, 0.32, 0.50, 0.66, 0.82, 1.0],
          }}
        />
      )}

      {/* ── WARM AMBIENT GLOW — radiates behind the whole logo ──
          Low z-index, large blur, gives the logo a subtle warm halo
          that breathes independently at a third period (11.2s). */}
      {!shouldReduceMotion && (
        <motion.div
          className="absolute z-0 pointer-events-none rounded-full"
          style={{
            inset: '-15%',
            background:
              'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,90,0,0.30) 0%, rgba(30,64,175,0.20) 45%, transparent 75%)',
            filter: 'blur(10px)',
            mixBlendMode: 'screen',
          }}
          animate={{
            opacity: [0.35, 0.65, 0.40, 0.70, 0.35],
            scale: [0.95, 1.05, 0.97, 1.08, 0.95],
          }}
          transition={{
            duration: 11.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}
    </div>
  );
}
