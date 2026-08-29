import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function SouthDakotaHeritage() {
  return (
    <section
      id="heritage"
      className="relative min-h-[720px] lg:min-h-[800px] w-full bg-[#0D0D0B] text-white flex flex-col justify-center py-28 sm:py-36 px-6 sm:px-12 font-normal overflow-hidden"
      aria-label="Six Decades of South Dakota Build"
    >
      {/* Full-width authentic factory background of Alkota coil winder in Alcester, SD */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/assets/south-dakota-craft-hero.jpg"
          alt="Alkota Handcrafted Manufacturing & Coil Winding in Alcester, South Dakota"
          className="h-full w-full object-cover object-center"
          style={{ filter: 'brightness(0.62) contrast(1.1)', transform: 'scaleX(-1) scale(1.05)' }}
        />
        {/* Directional gradient: darker behind text on the left, revealing the craftsman and coils on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/60 to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0B] via-transparent to-[#0D0D0B]/60" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl w-full my-auto">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-[1.5px] w-6 bg-alkota-orange" />
            <span className="text-xs uppercase tracking-[0.25em] text-alkota-orange font-mono">
              Manufacturing Heritage · Est. 1964
            </span>
          </div>

          <h2 className="font-extralight text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white leading-none mb-6">
            Six Decades of<br />
            <span className="text-alkota-orange">South Dakota Build.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#ccc] leading-relaxed mb-6 font-normal">
            Founded in 1964 in Alcester, South Dakota, Alkota has continuously hand-fabricated industrial high-pressure heating systems for the world’s most demanding environments.
          </p>

          <p className="text-sm sm:text-base text-[#999] leading-relaxed mb-10 font-normal">
            In 2013, custom-engineered Alkota hot-water heating systems were selected to power the clean-water drill reaching Subglacial Lake Whillans — 800 metres beneath the Antarctic Ice Sheet. Operating in continuous sub-zero conditions, Alkota delivered uninterrupted thermal performance.{' '}
            <Link
              href="/resources/case-studies/antarctica-lake-whillans"
              className="text-alkota-orange hover:underline font-normal inline-flex items-center gap-1 ml-1"
            >
              <span>Read the Antarctica Story →</span>
            </Link>
          </p>

          {/* Proof Metrics */}
          <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/15 mb-10 max-w-lg font-normal">
            <div>
              <span className="text-3xl sm:text-4xl font-extralight text-alkota-orange block">60+</span>
              <span className="text-[11px] text-[#888] uppercase tracking-wider font-light">Years Manufacturing</span>
            </div>
            <div>
              <span className="text-3xl sm:text-4xl font-extralight text-white block">800m</span>
              <span className="text-[11px] text-[#888] uppercase tracking-wider font-light">Antarctic Ice Depth</span>
            </div>
            <div>
              <span className="text-3xl sm:text-4xl font-extralight text-white block">100%</span>
              <span className="text-[11px] text-[#888] uppercase tracking-wider font-light">Mission Uptime</span>
            </div>
          </div>

          <div>
            <Link
              href="/about"
              className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 text-xs uppercase tracking-[0.2em] hover:bg-alkota-orange hover:text-white transition-all no-underline group shadow-xl font-normal"
            >
              <span>The Alkota Story (1964 — Present)</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
