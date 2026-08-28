import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function BespokeAndWaterSection() {
  return (
    <section className="bg-[#F5F4F0]" aria-label="Bespoke Engineering & Water Recovery">

      {/* ── Bespoke Trailer — Full-Width ─────────────────────────────── */}
      <div className="flex flex-col lg:flex-row min-h-[75vh]">

        {/* Content */}
        <div className="w-full lg:w-[45%] flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-16 lg:py-24">
          <span className="font-ibm-plex-mono text-[9px] font-bold uppercase tracking-[0.4em] text-[#999] block mb-4">
            Bespoke Engineering
          </span>
          <h2 className="font-barlow-condensed font-black uppercase italic tracking-tight text-alkota-black leading-[0.88] mb-6"
            style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)' }}
          >
            ENGINEERED<br />
            AROUND<br />
            <span className="text-alkota-orange">THE JOB.</span>
          </h2>
          <p className="font-inter text-[#555] leading-relaxed mb-8 font-normal text-base"
            style={{ maxWidth: '40ch' }}
          >
            From a single-axle highway wash rig to a multi-bay containerised wash plant — every Alkota bespoke build begins with your application, your site, and your operational demands.
          </p>

          <div className="space-y-3 font-ibm-plex-mono text-xs text-alkota-black border-t border-[#DDDDD8] pt-6 mb-8">
            {[
              'Highway-certified single & tandem-axle trailer chassis',
              'On-board baffled water tanks up to 1,000 litres',
              'Dual simultaneous lance outlets, spring-rewind hose reels',
              'Integrated frost-protection purge circuits',
              'Van pack, static skid, and containerised formats',
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-alkota-orange shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/machines/trailers"
              className="inline-flex items-center gap-3 bg-alkota-black text-white px-8 py-4 font-ibm-plex-mono text-xs font-bold uppercase tracking-[0.2em] hover:bg-alkota-orange transition-colors no-underline group"
            >
              <span>Explore Mobile Rigs</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 border border-[#999] text-alkota-black px-8 py-4 font-ibm-plex-mono text-xs font-bold uppercase tracking-[0.2em] hover:border-alkota-black transition-colors no-underline"
            >
              Discuss Your Application
            </Link>
          </div>
        </div>

        {/* Large trailer photograph */}
        <div className="relative w-full lg:w-[55%] min-h-[400px] lg:min-h-full bg-[#EDEDEA] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 flex items-end justify-center p-8 pb-0">
            <img
              src="/assets/products/trailer-single.png"
              alt="Alkota bespoke single-axle mobile wash trailer"
              className="w-full max-w-3xl object-contain"
              style={{ filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.2))' }}
              loading="lazy"
            />
          </div>
          {/* Gradient edge fade */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#F5F4F0] to-transparent pointer-events-none" />

          {/* Caption */}
          <div className="absolute top-8 right-8 text-right font-ibm-plex-mono">
            <span className="text-[9px] text-[#888] uppercase tracking-widest block">Alkota UK</span>
            <span className="text-sm text-alkota-black font-bold">Single-Axle Mobile Wash Rig</span>
          </div>
        </div>
      </div>

      {/* ── Water Recovery — Full-Width ──────────────────────────────── */}
      <div className="flex flex-col lg:flex-row-reverse min-h-[65vh] border-t border-[#DDDDD8]">

        {/* Content */}
        <div className="w-full lg:w-[45%] flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-16 lg:py-24 bg-white">
          <span className="font-ibm-plex-mono text-[9px] font-bold uppercase tracking-[0.4em] text-[#999] block mb-4">
            Environmental Compliance
          </span>
          <h2 className="font-barlow-condensed font-black uppercase italic tracking-tight text-alkota-black leading-[0.88] mb-6"
            style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)' }}
          >
            CLOSED-LOOP<br />
            WATER<br />
            RECOVERY.
          </h2>
          <p className="font-inter text-[#555] leading-relaxed mb-8 font-normal text-base"
            style={{ maxWidth: '40ch' }}
          >
            Multi-stage hydro-cyclonic separation and media sand filtration. Recycle up to 90% of wash bay effluent — eliminating trade effluent discharge into municipal sewers and drastically cutting mains water costs.
          </p>

          <div className="space-y-3 font-ibm-plex-mono text-xs text-alkota-black border-t border-[#EAEAEA] pt-6 mb-8">
            {[
              'PPG3 & BS EN 858 Class 1 aligned — Environment Agency',
              '99% removal of free petroleum hydrocarbons',
              'Up to 90% wash water recycled per cycle',
              'Eliminates trade effluent consent requirements',
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-alkota-orange shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <Link
            href="/water-treatment"
            className="inline-flex items-center gap-3 bg-alkota-black text-white px-8 py-4 font-ibm-plex-mono text-xs font-bold uppercase tracking-[0.2em] hover:bg-alkota-orange transition-colors no-underline group"
          >
            <span>Water Recovery Systems</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Large equipment photograph */}
        <div className="relative w-full lg:w-[55%] min-h-[360px] lg:min-h-full bg-[#1A1A18] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center p-12">
            <img
              src="/assets/products/ged-12v-skid.png"
              alt="Alkota closed-loop water recovery and recycling system"
              className="w-full max-w-xl object-contain"
              style={{ filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.6))' }}
              loading="lazy"
            />
          </div>
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent pointer-events-none" />

          {/* Compliance badge */}
          <div className="absolute bottom-8 left-8 font-ibm-plex-mono">
            <span className="text-[9px] text-[#666] block uppercase tracking-widest mb-1">Compliance</span>
            <span className="text-white font-bold text-sm">PPG3 · BS EN 858</span>
          </div>
        </div>
      </div>
    </section>
  );
}
