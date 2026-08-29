import Link from 'next/link';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export default function HeroMachineReveal() {
  return (
    <section className="relative bg-[#F8F7F4] pt-4 pb-28 sm:pb-36 overflow-hidden font-normal" aria-label="Featured Machine Showcase">
      <div className="mx-auto max-w-7xl px-6 sm:px-12">
        {/* Machine Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-alkota-orange block mb-2 font-light">
              Featured Flagship System
            </span>
            <h2 className="font-extralight text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-alkota-black leading-tight">
              420X4 Hot Water Pressure Washer
            </h2>
          </div>
          <span className="text-xs text-[#777] uppercase tracking-wider font-light">
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
          <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 z-20 bg-white/90 backdrop-blur-sm border border-[#D8D8D5] px-5 py-3 shadow-sm font-normal">
            <div className="flex items-center gap-2 text-alkota-orange mb-1">
              <ShieldCheck className="h-4 w-4" />
              <span className="text-[10px] uppercase tracking-widest font-light">7-Year Coil Guarantee</span>
            </div>
            <span className="text-xs text-alkota-black block font-normal">Schedule 80 Seamless Steel</span>
          </div>

          {/* Quick Spec Strip */}
          <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-20 hidden md:flex items-center gap-6 bg-white/90 backdrop-blur-sm border border-[#D8D8D5] px-6 py-3 shadow-sm text-xs font-normal">
            <div>
              <span className="text-[9px] text-[#888] uppercase block font-light">Pressure</span>
              <span className="text-alkota-black font-normal">200 BAR</span>
            </div>
            <div className="h-6 w-px bg-[#E0E0DC]" />
            <div>
              <span className="text-[9px] text-[#888] uppercase block font-light">Water Temp</span>
              <span className="text-alkota-black font-normal">90°C Hot Water</span>
            </div>
            <div className="h-6 w-px bg-[#E0E0DC]" />
            <div>
              <span className="text-[9px] text-[#888] uppercase block font-light">Plunger Drive</span>
              <span className="text-alkota-black font-normal">Ceramic Triplex</span>
            </div>
          </div>
        </div>

        {/* Narrative & Navigation */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 font-normal">
          <p className="text-sm text-[#666] max-w-xl leading-relaxed font-normal">
            The workhorse of UK fleet depots and heavy industrial plant. Schedule 80 continuous-wound spiral heating coil with dual-pass burner delivers instant thermal breakdown of heavy road film, bitumen, grease, and hydraulic oil.
          </p>
          <div className="flex items-center gap-4 shrink-0 font-normal">
            <Link
              href="/machines/hot-water/alkota-420x4"
              className="inline-flex items-center gap-3 bg-alkota-black text-white px-7 py-3.5 text-xs uppercase tracking-[0.2em] hover:bg-alkota-orange transition-colors no-underline group font-normal"
            >
              <span>View Machine Details</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/machines"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#666] hover:text-alkota-black transition-colors no-underline font-normal"
            >
              <span>All Machines</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
