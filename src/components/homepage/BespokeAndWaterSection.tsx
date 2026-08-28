import Link from 'next/link';
import { ArrowRight, Truck, Layers, Filter, CheckCircle2, ShieldCheck, Flame } from 'lucide-react';

export default function BespokeAndWaterSection() {
  return (
    <section className="py-24 sm:py-32 px-6 sm:px-12 bg-[#F8F8F7] border-b border-[#D8D8D6]">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between border-b border-[#D8D8D6] pb-8 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-[2px] w-8 bg-alkota-orange" />
              <span className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-[0.35em] text-alkota-orange">
                // BESPOKE ENGINEERING & COMPLIANCE
              </span>
            </div>
            <h2 className="font-barlow-condensed text-5xl sm:text-7xl font-black uppercase italic tracking-tight text-alkota-black leading-none">
              TAILORED PLANT. ZERO COMPROMISE.
            </h2>
          </div>
          <p className="font-inter text-sm text-[#555] max-w-md leading-relaxed">
            From single-axle highway mobile wash rigs to multi-bay containerised wash plants with integrated closed-loop water treatment.
          </p>
        </div>

        {/* 2-Column Split: Mobile Rigs & Water Recovery Systems */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 1: Bespoke Trailers & Van Packs */}
          <div className="bg-white border border-[#D5D5D3] p-8 sm:p-12 flex flex-col justify-between hover:border-alkota-orange transition-colors">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-widest text-alkota-orange bg-alkota-orange/10 px-3 py-1">
                  MOBILE FLEET SYSTEMS
                </span>
                <Truck className="h-6 w-6 text-[#888]" />
              </div>

              <h3 className="font-barlow-condensed text-3xl sm:text-5xl font-black uppercase italic tracking-tight text-alkota-black mb-4 leading-tight">
                BESPOKE TRAILER & VAN RIGS
              </h3>

              <p className="font-inter text-sm text-[#555] leading-relaxed mb-6">
                Complete turnkey wash platforms built on single or tandem axle chassis with on-board baffled water tanks (up to 1,000L), generator power, chemical dosing, and spring-rewind hose reels.
              </p>

              <div className="space-y-2.5 font-ibm-plex-mono text-xs text-alkota-black border-t border-[#EAEAEA] pt-6 mb-8">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-alkota-orange shrink-0" />
                  <span>Highway-certified chassis with overrun braking</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-alkota-orange shrink-0" />
                  <span>Dual operator simultaneous lance outlets</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-alkota-orange shrink-0" />
                  <span>Integrated frost-protection purge circuits</span>
                </div>
              </div>
            </div>

            <Link
              href="/machines/trailers"
              className="inline-flex items-center justify-between bg-alkota-black text-white px-6 py-4 font-ibm-plex-mono text-xs font-bold uppercase tracking-widest hover:bg-alkota-orange transition-colors"
            >
              <span>Explore Mobile Rigs</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Card 2: Environmental Water Recycling */}
          <div className="bg-white border border-[#D5D5D3] p-8 sm:p-12 flex flex-col justify-between hover:border-alkota-orange transition-colors">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-widest text-[#0EA5E9] bg-[#0EA5E9]/10 px-3 py-1">
                  ENVIRONMENT AGENCY COMPLIANCE
                </span>
                <Filter className="h-6 w-6 text-[#888]" />
              </div>

              <h3 className="font-barlow-condensed text-3xl sm:text-5xl font-black uppercase italic tracking-tight text-alkota-black mb-4 leading-tight">
                CLOSED-LOOP WATER TREATMENT
              </h3>

              <p className="font-inter text-sm text-[#555] leading-relaxed mb-6">
                Multi-stage hydro-cyclonic separation and media sand filtration systems designed to recycle up to 90% of wash bay effluent, eliminating costly trade effluent discharges into municipal sewers.
              </p>

              <div className="space-y-2.5 font-ibm-plex-mono text-xs text-alkota-black border-t border-[#EAEAEA] pt-6 mb-8">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#0EA5E9] shrink-0" />
                  <span>PPG3 & BS EN 858 Class 1 compliance</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#0EA5E9] shrink-0" />
                  <span>99% removal of free petroleum hydrocarbons</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#0EA5E9] shrink-0" />
                  <span>Drastically cuts annual mains water utility costs</span>
                </div>
              </div>
            </div>

            <Link
              href="/water-treatment"
              className="inline-flex items-center justify-between bg-alkota-black text-white px-6 py-4 font-ibm-plex-mono text-xs font-bold uppercase tracking-widest hover:bg-[#0EA5E9] transition-colors"
            >
              <span>Explore Water Treatment</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
