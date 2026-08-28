import Link from 'next/link';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export default function EngineeringTeardown() {
  const components = [
    {
      number: '01',
      title: 'Schedule 80 Continuous-Wound Steel Coil',
      subtitle: 'ASTM A53 Cold-Rolled Seamless Pipe · 7-Year Guarantee',
      description: 'Wound on precision CNC mandrels with zero internal welds. Schedule 80 pipe features 35% heavier wall thickness than commercial Schedule 40 coils, resisting thermal shock and high operating pressure for decades.',
      spec: '7-YEAR COIL WARRANTY',
    },
    {
      number: '02',
      title: 'Slow-Turning Ceramic Triplex Plunger Pump',
      subtitle: 'Forged Brass Manifolds · Solid Ceramic Pistons',
      description: 'Operating at low RPM dramatically reduces internal friction, cavitation, and thermal degradation of V-packings. Built for continuous multi-shift industrial operation.',
      spec: 'LOW-RPM CERAMIC PLUNGERS',
    },
    {
      number: '03',
      title: 'Dual-Pass Aerodynamic Combustion Chamber',
      subtitle: 'Precision Flue Gas Labyrinth · 82–86% Thermal Efficiency',
      description: 'Engineered dual-draft airflow captures maximum latent heat from diesel, kerosene, or natural gas burners directly into the Schedule 80 coil stack.',
      spec: 'UP TO 140°C STEAM SANITISATION',
    },
  ];

  return (
    <section className="bg-[#F8F7F4] text-alkota-black py-24 sm:py-32" aria-label="Mechanical Engineering Architecture">
      <div className="mx-auto max-w-7xl px-6 sm:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <span className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-[0.35em] text-alkota-orange block mb-3">
            Mechanical Architecture
          </span>
          <h2 className="font-barlow-condensed text-4xl sm:text-5xl lg:text-6xl font-black uppercase italic tracking-tight text-alkota-black leading-none mb-6">
            ENGINEERED WITHOUT WEAK POINTS.
          </h2>
          <p className="font-inter text-base sm:text-lg text-[#555] leading-relaxed font-normal">
            Industrial pressure washers fail at thermal welds and high-speed bearings. Alkota eliminates captive weak points with heavy-gauge metallurgy and proven open-architecture industrial components.
          </p>
        </div>

        {/* Macro Component Sequence — Editorial Asymmetric Layout */}
        <div className="space-y-12 sm:space-y-16 border-t border-[#E0E0DC] pt-12 sm:pt-16">
          {components.map((item) => (
            <div key={item.number} className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start pb-12 sm:pb-16 border-b border-[#E0E0DC]">
              <div className="lg:col-span-2">
                <span className="font-barlow-condensed font-black text-4xl sm:text-5xl text-alkota-orange">
                  {item.number}
                </span>
              </div>

              <div className="lg:col-span-6">
                <h3 className="font-inter font-bold text-xl sm:text-2xl text-alkota-black mb-2">
                  {item.title}
                </h3>
                <p className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-wider text-[#777] mb-4">
                  {item.subtitle}
                </p>
                <p className="font-inter text-sm sm:text-base text-[#555] leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col lg:items-end justify-between self-stretch">
                <span className="inline-block bg-white border border-[#D5D5D2] px-4 py-2 font-ibm-plex-mono text-[10px] font-bold text-alkota-black uppercase tracking-wider">
                  {item.spec}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Whitepaper Link */}
        <div className="mt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-4">
          <p className="font-inter text-sm text-[#777]">
            Technical whitepaper on Barlow’s formula, hoop stress calculations, and coil wall metallurgy available in The Lobby.
          </p>
          <Link
            href="/lobby/engineering-design/metallurgy-of-heavy-heating-coils-schedule-80"
            className="inline-flex items-center gap-2 font-ibm-plex-mono text-xs font-bold uppercase tracking-widest text-alkota-black hover:text-alkota-orange transition-colors no-underline shrink-0"
          >
            <span>Read Engineering Paper</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
