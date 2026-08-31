'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useVelocity, useSpring, useTransform, useReducedMotion } from 'framer-motion';

interface AmericanHeritageFlagOverlayProps {
  className?: string;
  opacity?: number;
}

export default function AmericanHeritageFlagOverlay({ 
  className = '', 
  opacity = 0.20 
}: AmericanHeritageFlagOverlayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Track scroll position through the parent section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Calculate scroll velocity
  const scrollVelocity = useVelocity(scrollYProgress);

  // Smooth the scroll velocity with physics spring to simulate natural air resistance
  const smoothVelocity = useSpring(scrollVelocity, {
    stiffness: 85,
    damping: 24,
    mass: 0.8,
  });

  // Smooth scroll progression
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 28,
  });

  // Dynamic wind billow transforms mapped to spring-smoothed velocity
  const windSkewX = useTransform(smoothVelocity, [-1.2, 0, 1.2], [-2.5, 0, 2.5]);
  const windSkewY = useTransform(smoothVelocity, [-1.2, 0, 1.2], [1.2, 0, -1.2]);
  const windTranslateX = useTransform(smoothVelocity, [-1.2, 0, 1.2], [12, 0, -12]);
  const windTranslateY = useTransform(smoothProgress, [0, 1], [-16, 16]);
  const windScale = useTransform(smoothVelocity, [-1.2, 0, 1.2], [1.02, 1.0, 1.02]);

  // Satin cloth light sheen shift across the flag surface
  const sheenShiftX = useTransform(smoothProgress, [0, 1], ['-20%', '40%']);
  const sheenOpacity = useTransform(smoothVelocity, [-1.2, 0, 1.2], [0.30, 0.12, 0.30]);

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-0 ${className}`}
      aria-hidden="true"
    >
      {/* ── FULL SECTION AMERICAN FLAG WITH SCROLL-COUPLED WIND WAVE ── */}
      <motion.div 
        className="absolute inset-0 w-full h-full origin-center"
        style={{
          opacity,
          skewX: shouldReduceMotion ? 0 : windSkewX,
          skewY: shouldReduceMotion ? 0 : windSkewY,
          x: shouldReduceMotion ? 0 : windTranslateX,
          y: shouldReduceMotion ? 0 : windTranslateY,
          scale: shouldReduceMotion ? 1 : windScale,
        }}
      >
        <svg 
          viewBox="0 0 1200 630" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full object-cover filter contrast-[1.10]"
        >
          <defs>
            {/* Ambient wind wave gradient lighting sheen */}
            <linearGradient id="flagWindLightSheenFull" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.14" />
              <stop offset="25%" stopColor="#000000" stopOpacity="0.20" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.22" />
              <stop offset="75%" stopColor="#000000" stopOpacity="0.24" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.10" />
            </linearGradient>
          </defs>

          {/* 13 Alternate Red & White Stripes spanning full 1200 width */}
          <rect y="0" width="1200" height="48.46" fill="#B22234" fillOpacity="0.75" />
          <rect y="48.46" width="1200" height="48.46" fill="#F4F1EA" fillOpacity="0.85" />
          <rect y="96.92" width="1200" height="48.46" fill="#B22234" fillOpacity="0.75" />
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

          {/* Blue Union Canton Field (scaled proportionally) */}
          <rect width="480" height="339.22" fill="#1E3A8A" fillOpacity="0.92" />

          {/* 50 Precision Stars Pattern */}
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
                    key={`star-${rowIndex}-${colIndex}`}
                    d={`M ${cx} ${cy - 8.5} 
                        L ${cx + 2.5} ${cy - 2.6} 
                        L ${cx + 8.5} ${cy - 2.6} 
                        L ${cx + 3.7} ${cy + 1.2} 
                        L ${cx + 5.5} ${cy + 7.4} 
                        L ${cx} ${cy + 3.5} 
                        L ${cx - 5.5} ${cy + 7.4} 
                        L ${cx - 3.7} ${cy + 1.2} 
                        L ${cx - 8.5} ${cy - 2.6} 
                        L ${cx - 2.5} ${cy - 2.6} Z`}
                  />
                );
              });
            })}
          </g>

          {/* Wind Ripple Lighting Sheen across full width */}
          <rect width="1200" height="630" fill="url(#flagWindLightSheenFull)" />
        </svg>
      </motion.div>

      {/* Dynamic Scroll-Coupled Satin Sheen Layer across Full Section */}
      {!shouldReduceMotion && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            x: sheenShiftX,
            opacity: sheenOpacity,
            background: 'radial-gradient(ellipse 75% 60% at 40% 40%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 70%)',
          }}
        />
      )}

      {/* Atmospheric Ambient Gradients Fading Across Full Section */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1A1917]/75 via-[#1A1917]/80 to-[#1A1917]/90" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1A1917] via-transparent to-[#1A1917]/70" />
    </div>
  );
}
