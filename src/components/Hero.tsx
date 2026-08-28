'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Flame, Gauge, Wrench } from 'lucide-react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = containerRef.current?.querySelectorAll('.hero-fade-in');
    if (!items) return;
    items.forEach((el, i) => {
      const htmlEl = el as HTMLElement;
      htmlEl.style.opacity = '0';
      htmlEl.style.transform = 'translateY(24px)';
      setTimeout(() => {
        htmlEl.style.transition = 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
        htmlEl.style.opacity = '1';
        htmlEl.style.transform = 'translateY(0)';
      }, 60 + i * 100);
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-[#F7F7F5] border-b border-[#D8D8D5] pt-32 sm:pt-36 pb-12 sm:pb-16"
      aria-label="Alkota UK Industrial Cleaning Equipment"
    >
      {/* Precision architectural hairline background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#E8E8E5_1px,transparent_1px),linear-gradient(to_bottom,#E8E8E5_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_35%,#000_70%,transparent_100%)] opacity-70 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-12">
        {/* Top Provenance Monoline */}
        <div className="hero-fade-in mb-8 flex flex-wrap items-center gap-3">
          <span className="h-[2px] w-6 bg-alkota-orange" />
          <span className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-[0.35em] text-[#666]">
            Est. 1964 · Alcester, South Dakota · UK Specification & Support
          </span>
        </div>

        {/* Main Grid: Copy Left / Machine Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Brand & Value Prop */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h1 className="hero-fade-in font-barlow-condensed font-black uppercase italic tracking-tight text-alkota-black leading-[0.88] mb-8"
              style={{ fontSize: 'clamp(3.25rem, 6.5vw, 6.5rem)' }}
            >
              INDUSTRIAL<br />
              CLEANING.<br />
              <span className="text-alkota-orange">BUILT TO</span><br />
              OUTLAST.
            </h1>

            <p className="hero-fade-in font-inter text-[#444] text-base sm:text-lg leading-relaxed mb-10 max-w-xl font-normal">
              Six decades of American heavy industrial engineering. Cold-rolled steel chassis, slow-turning ceramic triplex plunger pumps, and continuous-wound Schedule 80 seamless heating coils. Built for operations where cleaning failure is not an option.
            </p>

            {/* CTAs */}
            <div className="hero-fade-in flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/machines"
                className="inline-flex items-center justify-center gap-3 bg-alkota-black text-white px-8 py-4 font-ibm-plex-mono text-xs font-bold uppercase tracking-[0.2em] hover:bg-alkota-orange transition-colors no-underline group shadow-md"
              >
                <span>Explore the Fleet</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/dealers/demo-request"
                className="inline-flex items-center justify-center gap-3 border border-[#333] bg-white text-alkota-black px-8 py-4 font-ibm-plex-mono text-xs font-bold uppercase tracking-[0.2em] hover:border-alkota-orange hover:text-alkota-orange transition-colors no-underline"
              >
                <span>Book On-Site Demo</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Physical Machine Hero */}
          <div className="lg:col-span-5 hero-fade-in relative flex items-center justify-center">
            <div className="relative w-full max-w-lg aspect-square sm:aspect-[4/3] lg:aspect-square flex items-center justify-center">
              {/* Subtle radial halo behind machine */}
              <div className="absolute inset-0 bg-gradient-to-tr from-alkota-orange/10 via-transparent to-black/5 rounded-full blur-3xl" />

              {/* Machine cutout */}
              <img
                src="/assets/products/420x4.png"
                alt="Alkota 420X4 Industrial Hot Water Pressure Washer"
                className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.25)] transition-transform duration-700 hover:scale-105"
              />

              {/* Spec Plate Overlay (Bottom-Right) */}
              <div className="absolute -bottom-2 right-0 sm:right-2 z-20 bg-white/95 backdrop-blur-sm border border-[#D5D5D2] px-4 py-3 shadow-lg font-ibm-plex-mono text-[10px]">
                <span className="text-[8px] text-[#888] uppercase tracking-widest block">FEATURED MODEL</span>
                <span className="font-bold text-alkota-black text-xs block">420X4 HOT WATER</span>
                <span className="text-alkota-orange font-bold">200 BAR · 90°C · SCH. 80</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Engineering Proof Ribbon */}
        <div className="hero-fade-in mt-14 sm:mt-16 pt-8 border-t border-[#DCDCD8] grid grid-cols-2 lg:grid-cols-4 gap-6 font-ibm-plex-mono">
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 bg-[#EAEAE7] border border-[#D0D0CD] flex items-center justify-center text-alkota-orange shrink-0">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <span className="text-alkota-black font-bold text-xs uppercase block">7-Year Warranty</span>
              <span className="text-[9px] text-[#777] uppercase tracking-wider block">Schedule 80 Heating Coil</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="h-8 w-8 bg-[#EAEAE7] border border-[#D0D0CD] flex items-center justify-center text-alkota-orange shrink-0">
              <Flame className="h-4 w-4" />
            </div>
            <div>
              <span className="text-alkota-black font-bold text-xs uppercase block">Up to 140°C Vapour</span>
              <span className="text-[9px] text-[#777] uppercase tracking-wider block">Heavy Thermal Breakdown</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="h-8 w-8 bg-[#EAEAE7] border border-[#D0D0CD] flex items-center justify-center text-alkota-orange shrink-0">
              <Gauge className="h-4 w-4" />
            </div>
            <div>
              <span className="text-alkota-black font-bold text-xs uppercase block">Slow-Turning Ceramic</span>
              <span className="text-[9px] text-[#777] uppercase tracking-wider block">Low-RPM Triplex Plungers</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="h-8 w-8 bg-[#EAEAE7] border border-[#D0D0CD] flex items-center justify-center text-alkota-orange shrink-0">
              <Wrench className="h-4 w-4" />
            </div>
            <div>
              <span className="text-alkota-black font-bold text-xs uppercase block">Open Architecture</span>
              <span className="text-[9px] text-[#777] uppercase tracking-wider block">Zero Captive Lockouts</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
