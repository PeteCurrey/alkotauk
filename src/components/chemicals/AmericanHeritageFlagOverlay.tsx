import React from 'react';

interface AmericanHeritageFlagOverlayProps {
  className?: string;
  opacity?: number;
}

export default function AmericanHeritageFlagOverlay({ 
  className = '', 
  opacity = 0.14 
}: AmericanHeritageFlagOverlayProps) {
  return (
    <div 
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-0 ${className}`}
      aria-hidden="true"
    >
      {/* Precision Distressed American Flag Art with Gradual Fade Across Screen */}
      <div 
        className="absolute -top-12 -left-12 w-[1000px] max-w-none h-[650px] transition-opacity duration-1000"
        style={{
          opacity: opacity,
          maskImage: 'linear-gradient(135deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.65) 30%, rgba(0,0,0,0.18) 60%, rgba(0,0,0,0) 85%)',
          WebkitMaskImage: 'linear-gradient(135deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.65) 30%, rgba(0,0,0,0.18) 60%, rgba(0,0,0,0) 85%)',
        }}
      >
        <svg 
          viewBox="0 0 760 400" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover"
        >
          {/* 13 Alternate Stripes */}
          <rect y="0" width="760" height="30.77" fill="#E5E5E0" fillOpacity="0.45" />
          <rect y="30.77" width="760" height="30.77" fill="#141414" fillOpacity="0.8" />
          <rect y="61.54" width="760" height="30.77" fill="#E5E5E0" fillOpacity="0.45" />
          <rect y="92.31" width="760" height="30.77" fill="#141414" fillOpacity="0.8" />
          <rect y="123.08" width="760" height="30.77" fill="#E5E5E0" fillOpacity="0.45" />
          <rect y="153.85" width="760" height="30.77" fill="#141414" fillOpacity="0.8" />
          <rect y="184.62" width="760" height="30.77" fill="#E5E5E0" fillOpacity="0.45" />
          <rect y="215.38" width="760" height="30.77" fill="#141414" fillOpacity="0.8" />
          <rect y="246.15" width="760" height="30.77" fill="#E5E5E0" fillOpacity="0.45" />
          <rect y="276.92" width="760" height="30.77" fill="#141414" fillOpacity="0.8" />
          <rect y="307.69" width="760" height="30.77" fill="#E5E5E0" fillOpacity="0.45" />
          <rect y="338.46" width="760" height="30.77" fill="#141414" fillOpacity="0.8" />
          <rect y="369.23" width="760" height="30.77" fill="#E5E5E0" fillOpacity="0.45" />

          {/* Red Heritage Undertone for 7 Red Stripes */}
          {[0, 61.54, 123.08, 184.62, 246.15, 307.69, 369.23].map((y, i) => (
            <rect 
              key={i} 
              y={y} 
              width="760" 
              height="30.77" 
              fill="#FF6900" 
              fillOpacity="0.3" 
            />
          ))}

          {/* Blue Union Canton Field */}
          <rect width="304" height="215.38" fill="#0A1828" fillOpacity="0.88" />
          <rect width="304" height="215.38" fill="#1E3A8A" fillOpacity="0.32" />

          {/* 50 Precision Stars Pattern */}
          <g fill="#FFFFFF" fillOpacity="0.75">
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
        </svg>
      </div>

      {/* Atmospheric Ambient Gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-black/85" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-black/70" />
    </div>
  );
}
