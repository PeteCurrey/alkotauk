import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function AntarcticStory() {
  return (
    <section className="relative bg-[#111110] text-white overflow-hidden" aria-label="Heritage — Alkota since 1964">

      {/* ── Heritage Banner ─────────────────────────────────────────── */}
      <div className="flex flex-col lg:flex-row min-h-[70vh]">

        {/* Left — editorial manufacturing photograph */}
        <div className="relative w-full lg:w-[55%] min-h-[50vw] lg:min-h-full overflow-hidden bg-[#0A0A08]">
          <img
            src="/assets/industries/manufacturing.png"
            alt="Alkota manufacturing — Alcester, South Dakota"
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.55) contrast(1.15) grayscale(0.25)', minHeight: 480 }}
            loading="lazy"
          />
          {/* Gradient edge */}
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#111110] to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#111110]/60 pointer-events-none" />

          {/* Archival caption overlay */}
          <div className="absolute bottom-8 left-8 font-ibm-plex-mono">
            <span className="text-[9px] text-[#666] block uppercase tracking-widest mb-1">// Factory Archive</span>
            <span className="text-white font-bold text-sm">Alcester, South Dakota</span>
          </div>
        </div>

        {/* Right — heritage narrative */}
        <div className="relative z-10 w-full lg:w-[45%] flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-16 lg:py-24">

          <span className="font-ibm-plex-mono text-[9px] font-bold uppercase tracking-[0.4em] text-[#666] block mb-6">
            Established 1964
          </span>

          {/* Year as large visual anchor */}
          <div className="font-barlow-condensed font-black text-[#2A2A28] select-none leading-none mb-6"
            style={{ fontSize: 'clamp(5rem, 10vw, 9rem)' }}
            aria-hidden="true"
          >
            1964
          </div>

          <h2 className="font-barlow-condensed font-black uppercase italic tracking-tight text-white leading-[0.9] mb-6"
            style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)' }}
          >
            SIX DECADES.<br />
            <span className="text-alkota-orange">ONE STANDARD.</span>
          </h2>

          <p className="font-inter text-[#aaa] leading-relaxed mb-6 font-normal"
            style={{ fontSize: '1rem', maxWidth: '40ch' }}
          >
            Alkota Cleaning Systems was founded in Alcester, South Dakota in 1964. Every machine leaves the same factory floor, hand-assembled by the same pool of skilled engineers who have built these machines for generations.
          </p>

          <p className="font-inter text-[#777] leading-relaxed mb-10 text-sm"
            style={{ maxWidth: '40ch' }}
          >
            In 2013, custom-engineered Alkota hot-water systems were selected to power the first-ever clean-water drill reaching Subglacial Lake Whillans — 800 metres beneath the Antarctic Ice Sheet. The mission demanded 100% thermal uptime. Alkota did not fail once.
          </p>

          {/* Proof metrics */}
          <div className="grid grid-cols-3 gap-6 border-t border-[#2A2A28] pt-8 mb-10 font-ibm-plex-mono">
            <div>
              <span className="text-alkota-orange font-black text-2xl font-barlow-condensed block">60+</span>
              <span className="text-[9px] text-[#666] uppercase tracking-wider">Years Building</span>
            </div>
            <div>
              <span className="text-white font-black text-2xl font-barlow-condensed block">800m</span>
              <span className="text-[9px] text-[#666] uppercase tracking-wider">Antarctic Depth</span>
            </div>
            <div>
              <span className="text-white font-black text-2xl font-barlow-condensed block">100%</span>
              <span className="text-[9px] text-[#666] uppercase tracking-wider">Mission Success</span>
            </div>
          </div>

          <Link
            href="/about"
            className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 font-ibm-plex-mono text-xs font-bold uppercase tracking-widest hover:bg-alkota-orange hover:text-white transition-all no-underline group"
          >
            <span>Alkota Heritage (Est. 1964)</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
