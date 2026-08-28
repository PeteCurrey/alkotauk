import Link from 'next/link';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export default function HeroMachineReveal() {
  return (
    <section className="relative bg-[#F8F7F4] pt-4 pb-28 sm:pb-36 overflow-hidden" aria-label="Featured Machine Showcase">
      <div className="mx-auto max-w-7xl px-6 sm:px-12">
        {/* Machine Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-[0.35em] text-alkota-orange block mb-2">
              Featured Flagship System
            </span>
            <h2 className="font-barlow-condensed text-4xl sm:text-5xl lg:text-6xl font-black uppercase italic tracking-tight text-alkota-black leading-none">
              420X4 HOT WATER PRESSURE WASHER
            </h2>
          </div>
          <span className="font-ibm-plex-mono text-xs font-bold text-[#777] uppercase tracking-wider">
            200 BAR · 90°C · SCHEDULE 80 COIL
          </span>
        </div>

        {/* Hero Machine Canvas — Enormous scale floating in gallery space */}
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/10] bg-[#EFEFEA] flex items-center justify-center p-8 sm:p-14 lg:p-20 overflow-hidden">
          {/* Subtle architectural radial lighting */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.7)_0%,transparent_75%)] pointer-events-none" />

          {/* Machine Cutout — Dominant visual hero */}
          <img
            src="/assets/products/420x4.png"
            alt="Alkota 420X4 Industrial Hot Water Pressure Washer"
            className="relative z-10 w-full h-full max-h-[580px] object-contain filter drop-shadow-[0_30px_50px_rgba(0,0,0,0.18)] transition-transform duration-700 hover:scale-[1.03]"
            loading="lazy"
          />

          {/* Precision Factory Badge */}
          <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 z-20 bg-white/90 backdrop-blur-sm border border-[#D8D8D5] px-5 py-3 shadow-sm font-ibm-plex-mono">
            <div className="flex items-center gap-2 text-alkota-orange mb-1">
              <ShieldCheck className="h-4 w-4" />
              <span className="text-[9px] font-bold uppercase tracking-widest">7-Year Coil Guarantee</span>
            </div>
            <span className="text-xs font-bold text-alkota-black block">Schedule 80 Seamless Steel</span>
          </div>

          {/* Quick Spec Strip */}
          <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-20 hidden md:flex items-center gap-6 bg-white/90 backdrop-blur-sm border border-[#D8D8D5] px-6 py-3 shadow-sm font-ibm-plex-mono text-xs">
            <div>
              <span className="text-[8px] text-[#888] uppercase block">Pressure</span>
              <span className="font-bold text-alkota-black">200 BAR</span>
            </div>
            <div className="h-6 w-px bg-[#E0E0DC]" />
            <div>
              <span className="text-[8px] text-[#888] uppercase block">Water Temp</span>
              <span className="font-bold text-alkota-black">90°C Hot Water</span>
            </div>
            <div className="h-6 w-px bg-[#E0E0DC]" />
            <div>
              <span className="text-[8px] text-[#888] uppercase block">Plunger Drive</span>
              <span className="font-bold text-alkota-black">Ceramic Triplex</span>
            </div>
          </div>
        </div>

        {/* Narrative & Navigation */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <p className="font-inter text-sm text-[#666] max-w-xl leading-relaxed">
            The workhorse of UK fleet depots and heavy industrial plant. Schedule 80 continuous-wound spiral heating coil with dual-pass burner delivers instant thermal breakdown of heavy road film, bitumen, grease, and hydraulic oil.
          </p>
          <div className="flex items-center gap-4 shrink-0">
            <Link
              href="/machines/hot-water/alkota-420x4"
              className="inline-flex items-center gap-3 bg-alkota-black text-white px-7 py-3.5 font-ibm-plex-mono text-xs font-bold uppercase tracking-[0.2em] hover:bg-alkota-orange transition-colors no-underline group"
            >
              <span>View Machine Details</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/machines"
              className="inline-flex items-center gap-2 font-ibm-plex-mono text-xs font-bold uppercase tracking-widest text-[#666] hover:text-alkota-black transition-colors no-underline"
            >
              <span>All Machines</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
