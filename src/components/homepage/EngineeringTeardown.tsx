import Link from 'next/link';
import { ShieldCheck, Cpu, Flame, Gauge, Wrench, RotateCcw, ArrowRight } from 'lucide-react';

const PILLARS = [
  {
    icon: ShieldCheck,
    title: 'Schedule 80 Continuous Coil',
    spec: 'ASTM A53 Cold-Rolled Seamless Steel',
    desc: 'Wound on CNC mandrels without internal welds. 35% thicker steel wall than standard commercial Schedule 40 tubing, backed by Alkota’s signature 7-Year Coil Warranty.',
    metric: '7-YEAR WARRANTY',
  },
  {
    icon: Cpu,
    title: 'Slow-Turning Triplex Pumps',
    spec: 'Ceramic Plungers & Forged Brass Heads',
    desc: 'Industrial ceramic plungers run at lower RPMs, drastically reducing thermal wear, cavitation damage, and seal degradation during continuous multi-hour shifts.',
    metric: 'LOW RPM CERAMIC',
  },
  {
    icon: Flame,
    title: 'Dual-Pass Aerodynamic Burners',
    spec: '82–86% Thermal Combustion Efficiency',
    desc: 'Precision flue-gas labyrinth ensures maximum radiant and convective heat transfer from diesel, kerosene, LPG, or natural gas burners into the heating coil.',
    metric: 'UP TO 140°C STEAM',
  },
  {
    icon: Wrench,
    title: 'Open Non-Proprietary Serviceability',
    spec: 'Standard Industrial Fittings & Components',
    desc: 'No captive electronic lockouts. All hoses, switches, valves, and electrical relays use proven, readily available industrial standard components.',
    metric: 'ZERO CAPTIVE LOCKOUT',
  },
];

export default function EngineeringTeardown() {
  return (
    <section className="py-24 sm:py-32 px-6 sm:px-12 bg-[#FFFFFF] border-b border-[#D8D8D6]">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between border-b border-[#D8D8D6] pb-8 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-[2px] w-8 bg-alkota-orange" />
              <span className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-[0.35em] text-alkota-orange">
                // ENGINEERING ARCHITECTURE
              </span>
            </div>
            <h2 className="font-barlow-condensed text-5xl sm:text-7xl font-black uppercase italic tracking-tight text-alkota-black leading-none">
              WHY ALKOTA.
            </h2>
          </div>
          <p className="font-inter text-sm text-[#555] max-w-md leading-relaxed">
            Industrial equipment fails at the weakest joint. We build without weak joints. Here is the mechanical anatomy separating Alkota from light commercial pressure washers.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#D8D8D6] border border-[#D8D8D6]">
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={i}
                className="bg-[#FFFFFF] p-8 sm:p-10 flex flex-col justify-between hover:bg-[#F8F8F7] transition-colors group"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex h-12 w-12 items-center justify-center bg-[#F3F3F1] border border-[#E0E0DE] text-alkota-black group-hover:border-alkota-orange group-hover:text-alkota-orange transition-colors">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="font-ibm-plex-mono text-[9px] font-bold uppercase tracking-widest text-alkota-orange bg-alkota-orange/10 px-2 py-1">
                      {pillar.metric}
                    </span>
                  </div>

                  <h3 className="font-barlow-condensed text-2xl sm:text-3xl font-black uppercase italic text-alkota-black leading-tight mb-2">
                    {pillar.title}
                  </h3>

                  <p className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-wider text-[#777] mb-4">
                    {pillar.spec}
                  </p>

                  <p className="font-inter text-xs sm:text-sm text-[#555] leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#EAEAEA]">
                  <span className="font-ibm-plex-mono text-[9px] text-[#888] uppercase tracking-widest">
                    // STANDARD ON ALL UK SPEC UNITS
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Crossover Link to The Lobby Whitepaper */}
        <div className="mt-12 p-8 bg-[#F8F8F7] border border-[#D5D5D3] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 shrink-0 bg-alkota-black text-white flex items-center justify-center font-bold text-xs">
              DOC
            </div>
            <div>
              <p className="font-barlow-condensed text-xl font-bold uppercase text-alkota-black">
                Read the Metallurgy Whitepaper in The Lobby
              </p>
              <p className="font-inter text-xs text-[#666]">
                Barlow's formula calculations, hoop stress comparisons, and thermal shock test results.
              </p>
            </div>
          </div>
          <Link
            href="/lobby/engineering-design/metallurgy-of-heavy-heating-coils-schedule-80"
            className="inline-flex items-center gap-2 bg-alkota-black text-white px-6 py-3 font-ibm-plex-mono text-xs font-bold uppercase tracking-widest hover:bg-alkota-orange transition-colors shrink-0"
          >
            <span>Read Technical Paper</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
