import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function OwnershipSection() {
  const pillars = [
    {
      title: '7-Year Heating Coil Warranty',
      desc: 'Industry-standard Schedule 80 ASTM A53 seamless steel coils protected by an unconditional 7-year replacement warranty.',
      href: '/support/warranty',
    },
    {
      title: 'UK Technical Support & Spares',
      desc: 'Direct factory-backed engineering assistance, comprehensive parts stock, and rapid next-day dispatch across mainland UK.',
      href: '/support',
    },
    {
      title: 'Open Component Architecture',
      desc: 'Zero proprietary lockouts. Standard metric fasteners, standard high-pressure fittings, and readily serviceable triplex pumps.',
      href: '/support/replacement-parts',
    },
    {
      title: 'Authorised Dealer Network',
      desc: 'Regional sales, routine servicing, mobile breakdown support, and on-site demonstration centres throughout the United Kingdom.',
      href: '/dealers',
    },
  ];

  return (
    <section className="bg-white text-alkota-black py-24 sm:py-32 border-t border-[#E0E0DC]" aria-label="Ownership Lifecycle">
      <div className="mx-auto max-w-7xl px-6 sm:px-12">
        <div className="max-w-3xl mb-16 sm:mb-20">
          <span className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-[0.35em] text-alkota-orange block mb-3">
            Lifecycle & Support
          </span>
          <h2 className="font-barlow-condensed text-4xl sm:text-5xl lg:text-6xl font-black uppercase italic tracking-tight text-alkota-black leading-none mb-6">
            OWNERSHIP IS JUST THE START.
          </h2>
          <p className="font-inter text-base sm:text-lg text-[#555] leading-relaxed font-normal">
            When you invest in an Alkota machine, you are backed by over six decades of manufacturing expertise and dedicated UK technical infrastructure.
          </p>
        </div>

        {/* 4 Clean Corporate Pillars — No Boxed Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 border-t border-[#E0E0DC] pt-12">
          {pillars.map((pillar, idx) => (
            <div key={idx} className="flex flex-col justify-between">
              <div>
                <span className="font-ibm-plex-mono text-[10px] font-bold uppercase text-alkota-orange block mb-2">
                  0{idx + 1}
                </span>
                <h3 className="font-inter font-bold text-lg text-alkota-black mb-3 leading-snug">
                  {pillar.title}
                </h3>
                <p className="font-inter text-xs sm:text-sm text-[#666] leading-relaxed mb-6 font-normal">
                  {pillar.desc}
                </p>
              </div>
              <Link
                href={pillar.href}
                className="inline-flex items-center gap-2 font-ibm-plex-mono text-xs font-bold uppercase tracking-wider text-alkota-black hover:text-alkota-orange transition-colors no-underline group"
              >
                <span>Learn More</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
