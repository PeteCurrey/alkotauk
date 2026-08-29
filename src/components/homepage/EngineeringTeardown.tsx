import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function EngineeringTeardown() {
  const components = [
    {
      number: '01',
      title: 'Schedule 80 Continuous-Wound Steel Coil',
      subtitle: 'ASTM A53 Cold-Rolled Seamless Pipe · 7-Year Guarantee',
      description: 'Wound on precision CNC mandrels with zero internal welds. Schedule 80 pipe features 35% heavier wall thickness than commercial Schedule 40 coils, resisting thermal shock and high operating pressure for decades.',
      spec: '7-Year Coil Warranty',
    },
    {
      number: '02',
      title: 'Slow-Turning Ceramic Triplex Plunger Pump',
      subtitle: 'Forged Brass Manifolds · Solid Ceramic Pistons',
      description: 'Operating at low RPM dramatically reduces internal friction, cavitation, and thermal degradation of V-packings. Built for continuous multi-shift industrial operation.',
      spec: 'Low-RPM Ceramic Plungers',
    },
    {
      number: '03',
      title: 'Dual-Pass Aerodynamic Combustion Chamber',
      subtitle: 'Precision Flue Gas Labyrinth · 82–86% Thermal Efficiency',
      description: 'Engineered dual-draft airflow captures maximum latent heat from diesel, kerosene, or natural gas burners directly into the Schedule 80 coil stack.',
      spec: 'Up to 140°C Steam Sanitisation',
    },
  ];

  return (
    <section className="bg-[#F8F7F4] text-alkota-black py-24 sm:py-32 font-normal" aria-label="Mechanical Engineering Architecture">
      <div className="mx-auto max-w-7xl px-6 sm:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20 font-normal">
          <span className="text-[11px] uppercase tracking-[0.3em] text-alkota-orange block mb-3 font-light">
            Mechanical Architecture
          </span>
          <h2 className="font-extralight text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-alkota-black leading-none mb-6">
            Engineered Without Weak Points.
          </h2>
          <p className="text-base sm:text-lg text-[#555] leading-relaxed font-normal">
            Industrial pressure washers fail at thermal welds and high-speed bearings. Alkota eliminates captive weak points with heavy-gauge metallurgy and proven open-architecture industrial components.
          </p>
        </div>

        {/* Macro Component Sequence — Editorial Asymmetric Layout */}
        <div className="space-y-12 sm:space-y-16 border-t border-[#E0E0DC] pt-12 sm:pt-16 font-normal">
          {components.map((item) => (
            <div key={item.number} className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start pb-12 sm:pb-16 border-b border-[#E0E0DC] font-normal">
              <div className="lg:col-span-2">
                <span className="font-extralight text-4xl sm:text-5xl text-alkota-orange">
                  {item.number}
                </span>
              </div>

              <div className="lg:col-span-6 font-normal">
                <h3 className="font-light text-xl sm:text-2xl text-alkota-black mb-2">
                  {item.title}
                </h3>
                <p className="text-[11px] uppercase tracking-wider text-[#777] mb-4 font-light">
                  {item.subtitle}
                </p>
                <p className="text-sm sm:text-base text-[#555] leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col lg:items-end justify-between self-stretch font-normal">
                <span className="inline-block bg-white border border-[#D5D5D2] px-4 py-2 text-xs text-alkota-black uppercase tracking-wider font-normal">
                  {item.spec}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Whitepaper Link */}
        <div className="mt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-4 font-normal">
          <p className="text-sm text-[#777] font-normal">
            Technical whitepaper on Barlow’s formula, hoop stress calculations, and coil wall metallurgy available in The Lobby.
          </p>
          <Link
            href="/lobby/engineering-design/metallurgy-of-heavy-heating-coils-schedule-80"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-alkota-black hover:text-alkota-orange transition-colors no-underline shrink-0 font-normal"
          >
            <span>Read Engineering Paper</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
