'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';

interface LogoProps {
  className?: string;
  isAnimated?: boolean;
}

export default function Logo({ 
  className = "h-9",
  isAnimated = false 
}: LogoProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={`relative inline-flex items-center justify-center select-none group ${className}`}>
      
      {/* ── 01: ASYNCHRONOUS BLUE GAS FLAME THERMAL EMITTER (LEFT ZONE) ── */}
      {!shouldReduceMotion && (
        <motion.div
          className="absolute left-[8%] top-[12%] w-[42%] h-[68%] pointer-events-none rounded-full blur-[7px] mix-blend-screen"
          style={{
            background: 'radial-gradient(circle at 45% 45%, rgba(56, 189, 248, 0.55) 0%, rgba(30, 64, 175, 0.45) 45%, rgba(30, 58, 138, 0) 75%)',
          }}
          animate={{
            scale: [0.94, 1.06, 0.97, 1.04, 0.94],
            opacity: [0.30, 0.52, 0.36, 0.58, 0.30],
            x: [0, -1, 0.5, -0.5, 0],
            y: [0, -1, 0.5, -0.8, 0],
          }}
          transition={{
            duration: 7.3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}

      {/* ── 02: ASYNCHRONOUS RED/ORANGE COMBUSTION FLAME EMITTER (RIGHT ZONE) ── */}
      {!shouldReduceMotion && (
        <motion.div
          className="absolute right-[8%] top-[10%] w-[46%] h-[72%] pointer-events-none rounded-full blur-[8px] mix-blend-screen"
          style={{
            background: 'radial-gradient(circle at 55% 45%, rgba(255, 105, 0, 0.65) 0%, rgba(220, 38, 38, 0.50) 45%, rgba(185, 28, 28, 0) 75%)',
          }}
          animate={{
            scale: [1.04, 0.95, 1.07, 0.98, 1.04],
            opacity: [0.38, 0.22, 0.54, 0.32, 0.38],
            x: [0, 1, -0.5, 0.8, 0],
            y: [0, -1.2, 0.4, -0.6, 0],
          }}
          transition={{
            duration: 9.1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}

      {/* ── 03: SUBTLE FLAME MICRO-LUMINANCE FLICKER LAYER ── */}
      <motion.div
        className="relative z-10 w-auto h-full flex items-center"
        initial={isAnimated ? { opacity: 0, scale: 0.96 } : { opacity: 1 }}
        animate={shouldReduceMotion ? { opacity: 1, scale: 1 } : {
          opacity: 1,
          scale: 1,
          filter: [
            'brightness(1.00) saturate(1.00) drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
            'brightness(1.04) saturate(1.06) drop-shadow(0 2px 6px rgba(255,105,0,0.15))',
            'brightness(0.99) saturate(1.01) drop-shadow(0 2px 4px rgba(30,64,175,0.15))',
            'brightness(1.05) saturate(1.07) drop-shadow(0 2px 6px rgba(255,105,0,0.20))',
            'brightness(1.00) saturate(1.00) drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
          ],
        }}
        transition={{
          filter: {
            duration: 8.4,
            repeat: Infinity,
            ease: "easeInOut",
          },
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

    </div>
  );
}
