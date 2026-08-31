'use client';

import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion';

interface AmericanHeritageFlagOverlayProps {
  className?: string;
  opacity?: number;
}

export default function AmericanHeritageFlagOverlay({
  className = '',
  opacity = 0.20,
}: AmericanHeritageFlagOverlayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Track scroll progress and velocity through the section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const scrollVelocity = useVelocity(scrollYProgress);

  // Damped spring — gives the scroll-coupled ripple physical inertia and smooth decay
  const smoothVelocity = useSpring(scrollVelocity, {
    stiffness: 55,
    damping: 18,
    mass: 0.5,
  });

  // Scroll progress drives a gentle vertical parallax drift across the section
  const scrollDriftY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  // Scroll velocity adds ripple amplitude — satin cloth light sheen shifts as the flag billows
  const sheenX = useTransform(scrollYProgress, [0, 1], ['-10%', '50%']);
  const sheenOpacity = useTransform(smoothVelocity, [-1.5, 0, 1.5], [0.40, 0.10, 0.40]);

  // Extra rotateY boost from scroll velocity — simulates gusts of wind
  const scrollRotateBoost = useTransform(smoothVelocity, [-1.5, 0, 1.5], [-4, 0, 4]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-0 ${className}`}
      aria-hidden="true"
    >
      {/* ── AMBIENT WIND WAVE + SCROLL RIPPLE WRAPPER ── */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{
          opacity,
          y: shouldReduceMotion ? 0 : scrollDriftY,
          perspective: '1400px',
        }}
      >
        {/* ── FLAG BODY: rotateY around left edge (pole) to simulate cloth wave ── */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{
            transformOrigin: 'left center',
            transformStyle: 'preserve-3d',
            rotateY: shouldReduceMotion ? 0 : scrollRotateBoost,
          }}
          animate={shouldReduceMotion ? {} : {
            // Multi-keyframe irregular wave: avoids mechanical loop feel
            // Inspired by cloth billowing: slow build, peak, settle, repeat asymmetrically
            rotateY: [0, 2.8, 1.2, -1.8, 3.4, 1.0, -0.6, 2.2, 0],
            rotateZ: [0, 0.35, -0.15, 0.45, -0.25, 0.30, -0.10, 0.20, 0],
            scaleX: [1.00, 1.012, 1.005, 0.996, 1.018, 1.004, 0.998, 1.010, 1.00],
            y: [0, -5, -2, 3, -7, -1, 4, -3, 0],
          }}
          transition={{
            duration: 9.0,
            repeat: Infinity,
            ease: 'easeInOut',
            // Irregular timing creates organic, non-mechanical wave feel
            times: [0, 0.12, 0.25, 0.40, 0.55, 0.66, 0.78, 0.90, 1.0],
          }}
        >
          <svg
            viewBox="0 0 1200 630"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
            className="w-full h-full filter contrast-[1.10]"
          >
            <defs>
              <linearGradient id="flagLightWave" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.0" />
                <stop offset="30%" stopColor="#FFFFFF" stopOpacity="0.12" />
                <stop offset="55%" stopColor="#000000" stopOpacity="0.15" />
                <stop offset="80%" stopColor="#FFFFFF" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0.10" />
              </linearGradient>
            </defs>

            {/* 13 Alternate Red & White Stripes — full 1200px width */}
            <rect y="0"      width="1200" height="48.46" fill="#B22234" fillOpacity="0.75" />
            <rect y="48.46"  width="1200" height="48.46" fill="#F4F1EA" fillOpacity="0.85" />
            <rect y="96.92"  width="1200" height="48.46" fill="#B22234" fillOpacity="0.75" />
            <rect y="145.38" width="1200" height="48.46" fill="#F4F1EA" fillOpacity="0.85" />
            <rect y="193.84" width="1200" height="48.46" fill="#B22234" fillOpacity="0.75" />
            <rect y="242.30" width="1200" height="48.46" fill="#F4F1EA" fillOpacity="0.85" />
            <rect y="290.76" width="1200" height="48.46" fill="#B22234" fillOpacity="0.75" />
            <rect y="339.22" width="1200" height="48.46" fill="#F4F1EA" fillOpacity="0.85" />
            <rect y="387.68" width="1200" height="48.46" fill="#B22234" fillOpacity="0.75" />
            <rect y="436.14" width="1200" height="48.46" fill="#F4F1EA" fillOpacity="0.85" />
            <rect y="484.60" width="1200" height="48.46" fill="#B22234" fillOpacity="0.75" />
            <rect y="533.06" width="1200" height="48.46" fill="#F4F1EA" fillOpacity="0.85" />
            <rect y="581.52" width="1200" height="48.46" fill="#B22234" fillOpacity="0.75" />

            {/* Blue Union Canton */}
            <rect width="480" height="339.22" fill="#1E3A8A" fillOpacity="0.92" />

            {/* 50 Stars */}
            <g fill="#FFFFFF" fillOpacity="0.95">
              {Array.from({ length: 9 }).map((_, rowIndex) => {
                const isEvenRow = rowIndex % 2 === 0;
                const starCount = isEvenRow ? 6 : 5;
                const y = 22 + rowIndex * 34;
                const xStart = isEvenRow ? 30 : 68;
                const xSpacing = 76;
                return Array.from({ length: starCount }).map((__, colIndex) => {
                  const cx = xStart + colIndex * xSpacing;
                  const cy = y;
                  return (
                    <path
                      key={`s-${rowIndex}-${colIndex}`}
                      d={`M ${cx} ${cy-8.5} L ${cx+2.5} ${cy-2.6} L ${cx+8.5} ${cy-2.6} L ${cx+3.7} ${cy+1.2} L ${cx+5.5} ${cy+7.4} L ${cx} ${cy+3.5} L ${cx-5.5} ${cy+7.4} L ${cx-3.7} ${cy+1.2} L ${cx-8.5} ${cy-2.6} L ${cx-2.5} ${cy-2.6} Z`}
                    />
                  );
                });
              })}
            </g>

            {/* Cloth light-wave shading — shifts with the wind */}
            <rect width="1200" height="630" fill="url(#flagLightWave)" />
          </svg>
        </motion.div>

        {/* ── SECONDARY CLOTH RIPPLE LIGHT LAYER ──
            Animates independently at a different period (5.7s vs 9s)
            to create the illusion of multiple wave crests crossing the cloth */}
        {!shouldReduceMotion && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              background: [
                'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 20%, transparent 42%, rgba(255,255,255,0.07) 68%, transparent 88%, rgba(255,255,255,0.04) 100%)',
                'linear-gradient(90deg, rgba(255,255,255,0.06) 0%, transparent 22%, rgba(255,255,255,0.05) 48%, transparent 72%, rgba(255,255,255,0.07) 92%, transparent 100%)',
                'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 15%, rgba(255,255,255,0.08) 40%, transparent 65%, rgba(255,255,255,0.05) 85%, transparent 100%)',
                'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 20%, transparent 42%, rgba(255,255,255,0.07) 68%, transparent 88%, rgba(255,255,255,0.04) 100%)',
              ],
            }}
            transition={{
              duration: 5.7,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{ mixBlendMode: 'screen' }}
          />
        )}
      </motion.div>

      {/* ── SCROLL-DRIVEN SATIN SHEEN — billows across the full flag as you scroll ── */}
      {!shouldReduceMotion && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            x: sheenX,
            opacity: sheenOpacity,
            background: 'radial-gradient(ellipse 60% 80% at 30% 50%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 65%)',
            mixBlendMode: 'screen',
          }}
        />
      )}

      {/* ── ATMOSPHERIC EDGE INTEGRATION into dark #1A1917 canvas ── */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1A1917]/65 via-[#1A1917]/75 to-[#1A1917]/88" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1A1917] via-transparent to-[#1A1917]/65" />
    </div>
  );
}
