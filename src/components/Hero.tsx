'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Staggered entrance — text slides up
    const items = containerRef.current?.querySelectorAll('.hero-reveal');
    if (!items) return;
    items.forEach((el, i) => {
      (el as HTMLElement).style.opacity = '0';
      (el as HTMLElement).style.transform = 'translateY(32px)';
      setTimeout(() => {
        (el as HTMLElement).style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        (el as HTMLElement).style.opacity = '1';
        (el as HTMLElement).style.transform = 'translateY(0)';
      }, 80 + i * 120);
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col lg:flex-row overflow-hidden bg-[#F5F4F0]"
      style={{ paddingTop: 0 }}
    >
      {/* ── LEFT PANE — Brand Statement ─────────────────────────────── */}
      <div className="relative z-10 flex flex-col justify-between px-8 sm:px-12 lg:px-16 pt-36 pb-12 lg:pb-16 w-full lg:w-[45%] lg:min-h-screen bg-[#F5F4F0]">
        <div className="flex-1 flex flex-col justify-center max-w-xl">
          {/* Heritage Monoline */}
          <div className="hero-reveal flex items-center gap-3 mb-10">
            <span className="h-px w-8 bg-alkota-orange" />
            <span className="font-ibm-plex-mono text-[9px] font-bold uppercase tracking-[0.4em] text-[#999]">
              Est. 1964 · Alcester, South Dakota
            </span>
          </div>

          {/* Primary Brand Statement */}
          <h1 className="hero-reveal font-barlow-condensed font-black uppercase italic leading-[0.88] tracking-tight text-alkota-black mb-8"
            style={{ fontSize: 'clamp(3.5rem, 7vw, 6.5rem)' }}
          >
            INDUSTRIAL<br />
            CLEANING<br />
            <span className="text-alkota-orange">BUILT TO</span><br />
            OUTLAST.
          </h1>

          {/* Supporting Statement */}
          <p className="hero-reveal font-inter text-[#555] leading-relaxed mb-10 font-normal"
            style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.125rem)', maxWidth: '36ch' }}
          >
            Six decades of American industrial engineering. Schedule&nbsp;80 seamless steel coils, slow-turning ceramic triplex pumps, cold-rolled frames. Engineered for organisations where cleaning failure halts production.
          </p>

          {/* CTAs */}
          <div className="hero-reveal flex flex-col sm:flex-row gap-4">
            <Link
              href="/machines"
              className="inline-flex items-center justify-center gap-3 bg-alkota-black text-white px-8 py-4 font-ibm-plex-mono text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-alkota-orange transition-colors no-underline group"
            >
              <span>Explore the Fleet</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/dealers/demo-request"
              className="inline-flex items-center justify-center gap-3 border border-[#999] text-alkota-black px-8 py-4 font-ibm-plex-mono text-[11px] font-bold uppercase tracking-[0.2em] hover:border-alkota-black transition-colors no-underline"
            >
              Request a Demonstration
            </Link>
          </div>
        </div>

        {/* Bottom Proof Strip */}
        <div className="hero-reveal mt-16 pt-8 border-t border-[#D8D8D6] grid grid-cols-3 gap-6 font-ibm-plex-mono">
          <div>
            <span className="text-alkota-orange font-bold text-xl block">7-Year</span>
            <span className="text-[9px] text-[#888] uppercase tracking-wider">Coil Warranty</span>
          </div>
          <div>
            <span className="text-alkota-black font-bold text-xl block">60+</span>
            <span className="text-[9px] text-[#888] uppercase tracking-wider">Years Engineering</span>
          </div>
          <div>
            <span className="text-alkota-black font-bold text-xl block">Sch. 80</span>
            <span className="text-[9px] text-[#888] uppercase tracking-wider">ASTM A53 Steel</span>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANE — Full-Bleed Machine Photograph ──────────────── */}
      <div className="relative w-full lg:w-[55%] min-h-[60vw] lg:min-h-screen overflow-hidden bg-[#1A1A18]">
        {/* Machine image — fills the pane */}
        <div className="absolute inset-0 flex items-center justify-center p-8 lg:p-16">
          <img
            src="/assets/products/420x4.png"
            alt="Alkota 420X4 Hot Water Pressure Washer — Schedule 80 Industrial"
            className="w-full h-full object-contain drop-shadow-2xl"
            style={{ filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.7))' }}
          />
        </div>

        {/* Dark gradient — fades machine into left pane edge */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#F5F4F0] to-transparent pointer-events-none" />

        {/* Bottom-right machine ID plate */}
        <div className="absolute bottom-8 right-8 text-right font-ibm-plex-mono">
          <span className="text-[9px] text-[#666] uppercase tracking-widest block">Model</span>
          <span className="text-white font-bold text-sm">420X4 HOT WATER</span>
          <span className="text-alkota-orange text-[9px] block">200 BAR · 90°C · SCHEDULE 80</span>
        </div>

        {/* Top-left category badge */}
        <div className="absolute top-8 left-8 lg:left-16 font-ibm-plex-mono">
          <span className="text-[9px] text-alkota-orange font-bold uppercase tracking-widest bg-black/60 px-3 py-1.5">
            // HOT WATER PRESSURE WASHERS
          </span>
        </div>
      </div>
    </section>
  );
}
