'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useVelocity, useSpring, useTransform, useReducedMotion } from 'framer-motion';

interface AmericanHeritageFlagOverlayProps {
  className?: string;
  opacity?: number;
}

export default function AmericanHeritageFlagOverlay({ 
  className = '', 
  opacity = 0.22 
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
  const windSkewX = useTransform(smoothVelocity, [-1.2, 0, 1.2], [-3.2, 0, 3.2]);
  const windSkewY = useTransform(smoothVelocity, [-1.2, 0, 1.2], [1.8, 0, -1.8]);
  const windTranslateX = useTransform(smoothVelocity, [-1.2, 0, 1.2], [14, 0, -14]);
  const windTranslateY = useTransform(smoothProgress, [0, 1], [-18, 18]);
  const windScale = useTransform(smoothVelocity, [-1.2, 0, 1.2], [1.025, 1.0, 1.025]);

  // Satin cloth light sheen shift across the flag surface
  const sheenShiftX = useTransform(smoothProgress, [0, 1], ['-15%', '35%']);
  const sheenOpacity = useTransform(smoothVelocity, [-1.2, 0, 1.2], [0.35, 0.15, 0.35]);

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-0 ${className}`}
      aria-hidden="true"
    >
      {/* Precision American Flag with Velocity-Coupled Wind Wave */}
      <motion.div 
        className="absolute -top-12 -left-12 w-[1100px] lg:w-[1350px] max-w-none h-[780px] origin-top-left"
        style={{
          opacity,
          skewX: shouldReduceMotion ? 0 : windSkewX,
          skewY: shouldReduceMotion ? 0 : windSkewY,
          x: shouldReduceMotion ? 0 : windTranslateX,
          y: shouldReduceMotion ? 0 : windTranslateY,
          scale: shouldReduceMotion ? 1 : windScale,
          maskImage: 'linear-gradient(135deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 30%, rgba(0,0,0,0.25) 65%, rgba(0,0,0,0) 85%)',
          WebkitMaskImage: 'linear-gradient(135deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 30%, rgba(0,0,0,0.25) 65%, rgba(0,0,0,0) 85%)',
        }}
      >
        <svg 
          viewBox="0 0 760 400" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover filter contrast-[1.12]"
        >
          <defs>
            {/* Ambient wind wave gradient lighting */}
            <linearGradient id="flagWindLightSheen" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.18" />
              <stop offset="25%" stopColor="#000000" stopOpacity="0.22" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.28" />
              <stop offset="75%" stopColor="#000000" stopOpacity="0.26" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.12" />
            </linearGradient>

            {/* Moving cloth ripple mask */}
            <radialGradient id="clothRipple" cx="40%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#E0E0DC" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#A0A09A" stopOpacity="0.6" />
            </radialGradient>
          </defs>

          {/* 13 Alternate Red & White Stripes */}
          <rect y="0" width="760" height="30.77" fill="#B22234" fillOpacity="0.78" />
          <rect y="30.77" width="760" height="30.77" fill="#F4F1EA" fillOpacity="0.88" />
          <rect y="61.54" width="760" height="30.77" fill="#B22234" fillOpacity="0.78" />
          <rect y="92.31" width="760" height="30.77" fill="#F4F1EA" fillOpacity="0.88" />
          <rect y="123.08" width="760" height="30.77" fill="#B22234" fillOpacity="0.78" />
          <rect y="153.85" width="760" height="30.77" fill="#F4F1EA" fillOpacity="0.88" />
          <rect y="184.62" width="760" height="30.77" fill="#B22234" fillOpacity="0.78" />
          <rect y="215.38" width="760" height="30.77" fill="#F4F1EA" fillOpacity="0.88" />
          <rect y="246.15" width="760" height="30.77" fill="#B22234" fillOpacity="0.78" />
          <rect y="276.92" width="760" height="30.77" fill="#F4F1EA" fillOpacity="0.88" />
          <rect y="307.69" width="760" height="30.77" fill="#B22234" fillOpacity="0.78" />
          <rect y="338.46" width="760" height="30.77" fill="#F4F1EA" fillOpacity="0.88" />
          <rect y="369.23" width="760" height="30.77" fill="#B22234" fillOpacity="0.78" />

          {/* Blue Union Canton Field */}
          <rect width="304" height="215.38" fill="#1E3A8A" fillOpacity="0.94" />

          {/* 50 Precision Stars Pattern */}
          <g fill="#FFFFFF" fillOpacity="0.95">
            {Array.from({ length: 9 }).map((_, rowIndex) => {
              const isEvenRow = rowIndex % 2 === 0;
              const starCount = isEvenRow ? 6 : 5;
              const y = 14 + rowIndex * 22;
              const xStart = isEvenRow ? 18 : 42;
              const xSpacing = 48;

              return Array.from({ length: starCount }).map((__, colIndex) => {
                const cx = xStart + colIndex * xSpacing;
                const cy = y;
                return (
                  <path
                    key={`star-${rowIndex}-${colIndex}`}
                    d={`M ${cx} ${cy - 5.5} 
                        L ${cx + 1.6} ${cy - 1.7} 
                        L ${cx + 5.5} ${cy - 1.7} 
                        L ${cx + 2.4} ${cy + 0.8} 
                        L ${cx + 3.6} ${cy + 4.8} 
                        L ${cx} ${cy + 2.3} 
                        L ${cx - 3.6} ${cy + 4.8} 
                        L ${cx - 2.4} ${cy + 0.8} 
                        L ${cx - 5.5} ${cy - 1.7} 
                        L ${cx - 1.6} ${cy - 1.7} Z`}
                  />
                );
              });
            })}
          </g>

          {/* Wind Ripple Lighting Layer */}
          <rect width="760" height="400" fill="url(#flagWindLightSheen)" />
        </svg>
      </motion.div>

      {/* Dynamic Scroll-Coupled Satin Sheen Layer */}
      {!shouldReduceMotion && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            x: sheenShiftX,
            opacity: sheenOpacity,
            background: 'radial-gradient(ellipse 65% 50% at 30% 30%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 70%)',
          }}
        />
      )}

      {/* Atmospheric Ambient Gradients Fading Across Page into Dark Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1A1917]/70 via-[#1A1917]/85 to-[#1A1917]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1A1917] via-transparent to-[#1A1917]/60" />
    </div>
  );
}
