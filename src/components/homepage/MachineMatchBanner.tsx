import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function MachineMatchBanner() {
  return (
    <section className="bg-[#F8F7F4] text-alkota-black py-20 sm:py-24 border-t border-[#E0E0DC] font-normal" aria-label="Machine Match Utility">
      <div className="mx-auto max-w-7xl px-6 sm:px-12">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl font-normal">
            <span className="text-[11px] uppercase tracking-[0.3em] text-alkota-orange block mb-2 font-light">
              Interactive Selector Tool
            </span>
            <h2 className="font-extralight text-3xl sm:text-4xl uppercase tracking-tight text-alkota-black leading-tight mb-3">
              Not Sure Which Alkota Suits Your Application?
            </h2>
            <p className="text-sm sm:text-base text-[#666] leading-relaxed font-normal">
              Answer four quick questions regarding your power supply, water volume, contamination type, and duty cycle to receive a tailored equipment recommendation.
            </p>
          </div>

          <div className="shrink-0 font-normal">
            <Link
              href="/tools/machine-match"
              className="inline-flex items-center gap-3 bg-alkota-orange text-white px-8 py-4 text-xs uppercase tracking-[0.2em] hover:bg-black transition-colors no-underline group shadow-lg font-normal"
            >
              <span>Launch Machine Match</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
