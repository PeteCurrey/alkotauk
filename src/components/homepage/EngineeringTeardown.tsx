import Link from 'next/link';
import { ArrowRight, ShieldCheck, Cpu, Flame, Wrench } from 'lucide-react';

export default function EngineeringTeardown() {
  return (
    <section className="bg-white overflow-hidden" aria-label="Engineering Architecture">
      {/* ── Full-width machine + headline split ─────────────────────── */}
      <div className="flex flex-col lg:flex-row min-h-[60vh]">
        {/* Left: Oversized machine detail */}
        <div className="relative w-full lg:w-[50%] min-h-[400px] lg:min-h-full bg-[#F0EFE9] flex items-center justify-center overflow-hidden">
          {/* Enormous machine that bleeds off edges */}
          <img
            src="/assets/products/480x4.png"
            alt="Alkota engineering detail — Schedule 80 industrial pressure washer"
            className="w-[120%] max-w-none object-contain"
            style={{ filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.15))' }}
            loading="lazy"
          />
          {/* 7-year badge — anchored bottom-left */}
          <div className="absolute bottom-8 left-8 bg-alkota-orange text-white px-6 py-4 font-ibm-plex-mono">
            <span className="text-[9px] uppercase font-bold tracking-widest block mb-1">Factory Warranty</span>
            <span className="text-3xl font-black font-barlow-condensed uppercase italic">7-Year Coil</span>
          </div>
        </div>

        {/* Right: Engineering narrative */}
        <div className="w-full lg:w-[50%] flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-16 lg:py-24">
          <span className="font-ibm-plex-mono text-[9px] font-bold uppercase tracking-[0.4em] text-[#999] block mb-4">
            Engineering Architecture
          </span>
          <h2 className="font-barlow-condensed font-black uppercase italic tracking-tight text-alkota-black leading-[0.88] mb-6"
            style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)' }}
          >
            WHY ALKOTA<br />IS DIFFERENT.
          </h2>
          <p className="font-inter text-[#555] leading-relaxed mb-8 font-normal"
            style={{ fontSize: 'clamp(0.9rem, 1.2vw, 1.05rem)', maxWidth: '42ch' }}
          >
            Industrial equipment fails at the weakest joint. We build without weak joints. Every Alkota leaves Alcester, South Dakota with a mechanical specification no light commercial washer can match.
          </p>

          <Link
            href="/technology"
            className="inline-flex items-center gap-3 font-ibm-plex-mono text-xs font-bold uppercase tracking-widest text-alkota-black hover:text-alkota-orange transition-colors no-underline group"
          >
            <span>Engineering Detail</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* ── 4-pillar grid ────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#E0E0DE] border-t border-[#E0E0DE]">
        {[
          {
            icon: ShieldCheck,
            title: 'Schedule 80 Continuous Coil',
            spec: 'ASTM A53 Cold-Rolled Seamless Steel',
            desc: 'Wound on CNC mandrels. 35% thicker walls than Schedule 40. No internal welds. Backed by the only 7-Year Coil Warranty in the industry.',
            metric: '7-YEAR WARRANTY',
          },
          {
            icon: Cpu,
            title: 'Slow-Turning Ceramic Triplex Pump',
            spec: 'Forged Brass Heads · Ceramic Plungers',
            desc: 'Lower RPM means dramatically less thermal wear, reduced cavitation, and extended seal life during continuous multi-hour shifts.',
            metric: 'LOW RPM CERAMIC',
          },
          {
            icon: Flame,
            title: 'Dual-Pass Aerodynamic Burner',
            spec: '82–86% Thermal Combustion Efficiency',
            desc: 'Precision flue-gas labyrinth maximises heat transfer from diesel, kerosene, or natural gas burners into the Schedule 80 coil.',
            metric: 'UP TO 140°C STEAM',
          },
          {
            icon: Wrench,
            title: 'Open Parts Architecture',
            spec: 'Standard Industrial Fittings Throughout',
            desc: 'No captive electronic lockouts. Every hose, switch, valve, and relay is a proven, readily available industrial standard component.',
            metric: 'ZERO LOCK-IN',
          },
        ].map((pillar, i) => {
          const Icon = pillar.icon;
          return (
            <div key={i} className="bg-white p-8 sm:p-10 group hover:bg-[#F8F8F6] transition-colors flex flex-col">
              <div className="flex items-start justify-between mb-8">
                <div className="h-12 w-12 bg-[#F0EFE9] border border-[#E0E0DE] flex items-center justify-center text-alkota-black group-hover:border-alkota-orange group-hover:text-alkota-orange transition-colors">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="font-ibm-plex-mono text-[9px] font-bold uppercase tracking-widest text-alkota-orange bg-alkota-orange/10 px-2 py-1 text-right">
                  {pillar.metric}
                </span>
              </div>

              <h3 className="font-inter text-base font-bold text-alkota-black mb-1 leading-tight">
                {pillar.title}
              </h3>
              <p className="font-ibm-plex-mono text-[9px] font-bold uppercase tracking-wider text-[#888] mb-4">
                {pillar.spec}
              </p>
              <p className="font-inter text-sm text-[#666] leading-relaxed flex-1">
                {pillar.desc}
              </p>

              <div className="mt-8 pt-4 border-t border-[#EAEAEA]">
                <span className="font-ibm-plex-mono text-[9px] text-[#aaa] uppercase tracking-widest">
                  // Standard on all UK spec units
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Crossover to Lobby whitepaper ────────────────────────────── */}
      <div className="px-8 sm:px-12 lg:px-16 py-10 bg-[#F5F4F0] border-t border-[#E0E0DE]">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="h-10 w-10 bg-alkota-black text-white flex items-center justify-center font-ibm-plex-mono text-[9px] font-bold uppercase shrink-0">
              DOC
            </div>
            <div>
              <p className="font-inter text-sm font-bold text-alkota-black">
                Read the Schedule 80 Metallurgy Whitepaper
              </p>
              <p className="font-inter text-xs text-[#888]">
                Barlow's formula, hoop stress, thermal shock data. In The Lobby.
              </p>
            </div>
          </div>
          <Link
            href="/lobby/engineering-design/metallurgy-of-heavy-heating-coils-schedule-80"
            className="inline-flex items-center gap-2 bg-alkota-black text-white px-6 py-3 font-ibm-plex-mono text-xs font-bold uppercase tracking-widest hover:bg-alkota-orange transition-colors shrink-0 no-underline"
          >
            Read Technical Paper
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
