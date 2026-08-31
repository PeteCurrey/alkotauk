'use client';

import React from 'react';

interface AmericanHeritageFlagOverlayProps {
  className?: string;
  opacity?: number;
}

export default function AmericanHeritageFlagOverlay({ 
  className = '', 
  opacity = 0.22 
}: AmericanHeritageFlagOverlayProps) {
  return (
    <div 
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-0 ${className}`}
      aria-hidden="true"
    >
      {/* Precision American Flag Art with Subtle Wind Wave Animation and Gradient Fade */}
      <div 
        className="absolute -top-10 -left-10 w-[1100px] lg:w-[1350px] max-w-none h-[750px] animate-flag-wave origin-top-left transition-opacity duration-1000"
        style={{
          opacity: opacity,
          maskImage: 'linear-gradient(135deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 35%, rgba(0,0,0,0.25) 65%, rgba(0,0,0,0) 85%)',
          WebkitMaskImage: 'linear-gradient(135deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 35%, rgba(0,0,0,0.25) 65%, rgba(0,0,0,0) 85%)',
        }}
      >
        <svg 
          viewBox="0 0 760 400" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover filter contrast-[1.15]"
        >
          <defs>
            {/* Wind wave displacement lighting filter */}
            <linearGradient id="flagWindLight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.15" />
              <stop offset="25%" stopColor="#000000" stopOpacity="0.18" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.22" />
              <stop offset="75%" stopColor="#000000" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.10" />
            </linearGradient>
          </defs>

          {/* 13 Alternate Red & White Stripes */}
          <rect y="0" width="760" height="30.77" fill="#B22234" fillOpacity="0.75" />
          <rect y="30.77" width="760" height="30.77" fill="#F4F1EA" fillOpacity="0.85" />
          <rect y="61.54" width="760" height="30.77" fill="#B22234" fillOpacity="0.75" />
          <rect y="92.31" width="760" height="30.77" fill="#F4F1EA" fillOpacity="0.85" />
          <rect y="123.08" width="760" height="30.77" fill="#B22234" fillOpacity="0.75" />
          <rect y="153.85" width="760" height="30.77" fill="#F4F1EA" fillOpacity="0.85" />
          <rect y="184.62" width="760" height="30.77" fill="#B22234" fillOpacity="0.75" />
          <rect y="215.38" width="760" height="30.77" fill="#F4F1EA" fillOpacity="0.85" />
          <rect y="246.15" width="760" height="30.77" fill="#B22234" fillOpacity="0.75" />
          <rect y="276.92" width="760" height="30.77" fill="#F4F1EA" fillOpacity="0.85" />
          <rect y="307.69" width="760" height="30.77" fill="#B22234" fillOpacity="0.75" />
          <rect y="338.46" width="760" height="30.77" fill="#F4F1EA" fillOpacity="0.85" />
          <rect y="369.23" width="760" height="30.77" fill="#B22234" fillOpacity="0.75" />

          {/* Blue Union Canton Field */}
          <rect width="304" height="215.38" fill="#1E3A8A" fillOpacity="0.92" />

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

          {/* Wind Ripple Overlay Layer */}
          <rect width="760" height="400" fill="url(#flagWindLight)" />
        </svg>
      </div>

      {/* Atmospheric Ambient Gradients Fading Across Page */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1A1917]/70 via-[#1A1917]/85 to-[#1A1917]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1A1917] via-transparent to-[#1A1917]/60" />
    </div>
  );
}
