import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function BespokeAndWaterSection() {
  return (
    <section className="bg-[#F8F7F4] text-alkota-black py-24 sm:py-32 overflow-hidden font-normal" aria-label="Bespoke Systems & Environmental Compliance">
      <div className="mx-auto max-w-7xl px-6 sm:px-12">
        {/* Bespoke Mobile Systems */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center pb-20 sm:pb-28 border-b border-[#E0E0DC]">
          <div className="lg:col-span-6 order-2 lg:order-1 font-normal">
            <span className="text-[11px] uppercase tracking-[0.3em] text-alkota-orange block mb-3 font-light">
              Bespoke Engineering
            </span>
            <h2 className="font-extralight text-4xl sm:text-5xl uppercase tracking-tight text-alkota-black leading-tight mb-6">
              Engineered Around Your Application.
            </h2>
            <p className="text-base sm:text-lg text-[#555] leading-relaxed mb-6 font-normal">
              From single-axle highway wash rigs to multi-lance skid-mounted plant, Alkota designs turnkey bespoke mobile cleaning systems tailored to your site specifications, water volume, and transport platform.
            </p>

            <div className="space-y-2.5 text-xs text-[#444] mb-8 font-normal">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 text-alkota-orange shrink-0" />
                <span>Highway-certified road-tow trailers and van installations</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 text-alkota-orange shrink-0" />
                <span>On-board baffled water tanks up to 1,000 litres</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 text-alkota-orange shrink-0" />
                <span>Integrated spring-rewind high-pressure hose reels</span>
              </div>
            </div>

            <div className="flex items-center gap-4 font-normal">
              <Link
                href="/machines/trailers"
                className="inline-flex items-center gap-3 bg-alkota-black text-white px-7 py-3.5 text-xs uppercase tracking-[0.2em] hover:bg-alkota-orange transition-colors no-underline group font-normal"
              >
                <span>Discuss Your Application</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="aspect-[4/3] bg-[#EFEFEA] flex items-center justify-center p-8 overflow-hidden">
              <img
                src="/assets/products/trailer-single.png"
                alt="Alkota Custom Highway Wash Trailer"
                className="w-full h-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.15)]"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Closed-Loop Water Recovery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center pt-20 sm:pt-28">
          <div className="lg:col-span-6">
            <div className="aspect-[4/3] bg-[#141412] flex items-center justify-center p-8 overflow-hidden">
              <img
                src="/assets/products/ged-12v-skid.png"
                alt="Alkota Closed-Loop Water Recycling System"
                className="w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
                loading="lazy"
              />
            </div>
          </div>

          <div className="lg:col-span-6 font-normal">
            <span className="text-[11px] uppercase tracking-[0.3em] text-alkota-orange block mb-3 font-light">
              Environmental Compliance
            </span>
            <h2 className="font-extralight text-4xl sm:text-5xl uppercase tracking-tight text-alkota-black leading-tight mb-6">
              Closed-Loop Water Recovery.
            </h2>
            <p className="text-base sm:text-lg text-[#555] leading-relaxed mb-6 font-normal">
              Hydro-cyclonic separation and filtration systems engineered for UK wash bay environmental compliance. Recycle wash water, reduce mains water consumption, and meet Environment Agency trade effluent requirements.
            </p>

            <div className="space-y-2.5 text-xs text-[#444] mb-8 font-normal">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 text-alkota-orange shrink-0" />
                <span>Aligned with UK PPG3 and Environment Agency standards</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 text-alkota-orange shrink-0" />
                <span>Up to 90% water recycling per wash cycle</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 text-alkota-orange shrink-0" />
                <span>Separates free hydrocarbons, suspended solids, and grease</span>
              </div>
            </div>

            <div className="flex items-center gap-4 font-normal">
              <Link
                href="/water-treatment"
                className="inline-flex items-center gap-3 bg-alkota-black text-white px-7 py-3.5 text-xs uppercase tracking-[0.2em] hover:bg-alkota-orange transition-colors no-underline group font-normal"
              >
                <span>Explore Water Recovery</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
