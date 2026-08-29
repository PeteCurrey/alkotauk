import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function BrandStatement() {
  return (
    <section className="bg-[#F8F7F4] text-alkota-black py-24 sm:py-32 font-normal" aria-label="Brand Philosophy">
      <div className="mx-auto max-w-7xl px-6 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Provenance Tagline */}
          <div className="lg:col-span-4 font-normal">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#888] block mb-3 font-light">
              Engineering Heritage
            </span>
            <p className="text-sm text-[#666] leading-relaxed font-normal">
              Handcrafted in Alcester, South Dakota since 1964. Distributed, specified, and supported across the United Kingdom.
            </p>
          </div>

          {/* Large Architectural Statement */}
          <div className="lg:col-span-8 font-normal">
            <h2 className="font-extralight text-2xl sm:text-3xl lg:text-4xl text-alkota-black leading-snug tracking-tight mb-8">
              Heavy industrial cleaning systems engineered for continuous duty where equipment downtime halts production.
            </h2>
            <p className="text-base sm:text-lg text-[#555] leading-relaxed max-w-2xl font-normal mb-8">
              Every Alkota machine is built around structural cold-rolled steel, slow-turning industrial ceramic plunger pumps, and ASTM A53 Schedule 80 seamless steel heating coils. When transport depots, manufacturing facilities, agricultural operations, and food processing lines demand absolute reliability, they specify Alkota.
            </p>
            <div className="flex items-center gap-6 font-normal">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-alkota-black hover:text-alkota-orange transition-colors no-underline group font-normal"
              >
                <span>The Alkota Story (1964 — Present)</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
