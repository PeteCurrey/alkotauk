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
    <section className="bg-white text-alkota-black py-24 sm:py-32 border-t border-[#E0E0DC] font-normal" aria-label="Ownership Lifecycle">
      <div className="mx-auto max-w-7xl px-6 sm:px-12">
        <div className="max-w-3xl mb-16 sm:mb-20 font-normal">
          <span className="text-[11px] uppercase tracking-[0.3em] text-alkota-orange block mb-3 font-light">
            Lifecycle & Support
          </span>
          <h2 className="font-extralight text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-alkota-black leading-none mb-6">
            Ownership is Just the Start.
          </h2>
          <p className="text-base sm:text-lg text-[#555] leading-relaxed font-normal">
            When you invest in an Alkota machine, you are backed by over six decades of manufacturing expertise and dedicated UK technical infrastructure.
          </p>
        </div>

        {/* 4 Clean Corporate Pillars — No Boxed Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 border-t border-[#E0E0DC] pt-12 font-normal">
          {pillars.map((pillar, idx) => (
            <div key={idx} className="flex flex-col justify-between font-normal">
              <div>
                <span className="text-xs uppercase text-alkota-orange block mb-2 font-light">
                  0{idx + 1}
                </span>
                <h3 className="font-light text-lg text-alkota-black mb-3 leading-snug">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#666] leading-relaxed mb-6 font-normal">
                  {pillar.desc}
                </p>
              </div>
              <Link
                href={pillar.href}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-alkota-black hover:text-alkota-orange transition-colors no-underline group font-normal"
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
