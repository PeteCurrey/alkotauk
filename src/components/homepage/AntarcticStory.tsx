import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function AntarcticStory() {
  return (
    <section className="bg-[#11110F] text-white py-24 sm:py-32 overflow-hidden" aria-label="Heritage & Scientific Exploration">
      <div className="mx-auto max-w-7xl px-6 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Authentic Manufacturing Archive Image */}
          <div className="lg:col-span-6 relative">
            <div className="aspect-[4/3] bg-[#1A1A18] overflow-hidden">
              <img
                src="/assets/industries/manufacturing.png"
                alt="Alkota Manufacturing Plant — Alcester, South Dakota"
                className="w-full h-full object-cover filter brightness-[0.65] contrast-[1.15]"
                loading="lazy"
              />
            </div>
            <div className="mt-3 flex items-center justify-between font-ibm-plex-mono text-[10px] text-[#777]">
              <span>// Factory Archive</span>
              <span>Alcester, South Dakota · Est. 1964</span>
            </div>
          </div>

          {/* Right Column: Heritage Narrative */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-[0.35em] text-alkota-orange block mb-4">
              Proven Provenance
            </span>

            <h2 className="font-barlow-condensed text-4xl sm:text-5xl lg:text-6xl font-black uppercase italic tracking-tight text-white leading-none mb-6">
              SIX DECADES OF AMERICAN HEAVY BUILD.
            </h2>

            <p className="font-inter text-base sm:text-lg text-[#ccc] leading-relaxed mb-6 font-normal">
              Founded in Alcester, South Dakota in 1964, Alkota has continuously refined industrial high-pressure heating systems for the world’s most demanding environments.
            </p>

            <p className="font-inter text-sm sm:text-base text-[#999] leading-relaxed mb-10 font-normal">
              In 2013, custom-engineered Alkota hot-water heating systems were selected to power the clean-water hot drill reaching Subglacial Lake Whillans — 800 metres beneath the Antarctic Ice Sheet. Operating in continuous sub-zero conditions, Alkota delivered uninterrupted thermal performance.
            </p>

            {/* Proof Metrics */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/15 mb-8 font-ibm-plex-mono">
              <div>
                <span className="text-2xl sm:text-3xl font-black font-barlow-condensed text-alkota-orange block">60+</span>
                <span className="text-[9px] text-[#888] uppercase tracking-wider">Years Manufacturing</span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black font-barlow-condensed text-white block">800m</span>
                <span className="text-[9px] text-[#888] uppercase tracking-wider">Antarctic Ice Depth</span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black font-barlow-condensed text-white block">100%</span>
                <span className="text-[9px] text-[#888] uppercase tracking-wider">Mission Uptime</span>
              </div>
            </div>

            <div>
              <Link
                href="/about"
                className="inline-flex items-center gap-3 bg-white text-black px-7 py-3.5 font-ibm-plex-mono text-xs font-bold uppercase tracking-[0.2em] hover:bg-alkota-orange hover:text-white transition-all no-underline group shadow-lg"
              >
                <span>Read Full Company History</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
