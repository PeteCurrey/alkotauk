import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function MachineMatchAndOwnership() {
  const ownershipLinks = [
    { title: '7-Year Heating Coil Warranty', href: '/support/warranty' },
    { title: 'UK Technical Support & Spares', href: '/support' },
    { title: 'Open Component Architecture', href: '/support/replacement-parts' },
    { title: 'Authorised UK Dealer Network', href: '/dealers' },
  ];

  return (
    <div className="bg-[#F8F7F4] text-alkota-black font-normal">
      {/* Interactive Machine Match Prompt */}
      <section className="py-24 sm:py-32 px-6 sm:px-12" aria-label="Machine Match Tool">
        <div className="mx-auto max-w-7xl w-full">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
            <div className="max-w-2xl font-normal">
              <span className="text-xs uppercase tracking-[0.25em] text-alkota-orange block mb-3 font-light">
                Interactive Selector Tool
              </span>
              <h2 className="font-extralight text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-alkota-black leading-tight mb-4">
                Not Sure Which Alkota Suits Your Application?
              </h2>
              <p className="text-base text-[#666] leading-relaxed font-normal">
                Answer four quick questions regarding power supply, water volume, contamination type, and duty cycle to receive a tailored equipment recommendation.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0 font-normal">
              <Link
                href="/tools/machine-match"
                className="inline-flex items-center justify-center gap-3 bg-alkota-orange text-white px-8 py-4 text-xs uppercase tracking-[0.2em] hover:bg-black transition-colors no-underline group shadow-lg font-normal"
              >
                <span>Launch Machine Match</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/tools/configurator"
                className="inline-flex items-center justify-center gap-3 border border-alkota-black text-alkota-black px-8 py-4 text-xs uppercase tracking-[0.2em] hover:bg-alkota-black hover:text-white transition-all no-underline font-normal"
              >
                <span>Build Configurator</span>
              </Link>
            </div>
          </div>

          {/* Understated Ownership Navigation — Clean horizontal links */}
          <div className="mt-20 pt-10 border-t border-[#E0E0DC] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 font-normal">
            {ownershipLinks.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                className="group flex items-center justify-between text-xs uppercase tracking-wider text-alkota-black hover:text-alkota-orange transition-colors no-underline"
              >
                <span>{link.title}</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final Cinematic Brand Signature — Engineered for Continuous Duty */}
      <section className="relative bg-[#0C0C0A] overflow-hidden py-28 sm:py-36 px-6 sm:px-12 text-white font-normal min-h-[640px] flex flex-col justify-center">
        {/* Full-bleed photography background with slight dark overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/assets/engineered-continuous-duty.jpg"
            alt="Alkota High Temperature Pressure Gauge & Engineering Components"
            className="h-full w-full object-cover object-center scale-105"
            style={{ filter: 'brightness(0.32) contrast(1.15)' }}
          />
          {/* Subtle dark gradient overlays for maximum text clarity */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/85" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0A] via-transparent to-[#0C0C0A]/80" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl text-center font-normal my-auto">
          <span className="text-xs uppercase tracking-[0.25em] text-alkota-orange block mb-6 font-light">
            Est. 1964 · Alcester, South Dakota · UK Direct
          </span>
          <h2
            className="font-extralight uppercase tracking-tight text-white leading-none mb-8"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            Engineered for Continuous Duty.<br />
            <span className="text-alkota-orange">Backed by 60 Years of Build.</span>
          </h2>
          <p className="text-[#ddd] leading-relaxed mb-12 font-normal text-base sm:text-lg max-w-xl mx-auto">
            Specify your industrial cleaning setup with confidence. Connect directly with Alkota technical specialists for advice, on-site demonstrations, or custom rig design.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 font-normal">
            <Link
              href="/machines"
              className="inline-flex items-center gap-3 bg-alkota-orange text-white px-9 py-4 text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all no-underline group shadow-xl font-normal"
            >
              <span>Explore Machine Fleet</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 border border-white/40 bg-black/40 backdrop-blur-sm text-white px-8 py-4 text-xs uppercase tracking-[0.2em] hover:border-white hover:bg-white hover:text-black transition-colors no-underline font-normal"
            >
              <span>Contact Alkota UK</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
