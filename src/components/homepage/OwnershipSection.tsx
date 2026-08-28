import Link from 'next/link';
import { ArrowRight, ShieldCheck, Wrench, Package, MapPin } from 'lucide-react';

export default function OwnershipSection() {
  return (
    <section className="bg-[#F5F4F0]" aria-label="Ownership & UK Support">

      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="px-8 sm:px-12 lg:px-16 pt-20 pb-12 border-b border-[#DDDDD8]">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <span className="font-ibm-plex-mono text-[9px] font-bold uppercase tracking-[0.4em] text-[#999] block mb-3">
              Lifecycle Commitment
            </span>
            <h2 className="font-barlow-condensed font-black uppercase italic tracking-tight text-alkota-black leading-none"
              style={{ fontSize: 'clamp(2.5rem, 4vw, 3.75rem)' }}
            >
              OWNERSHIP IS<br />JUST THE START.
            </h2>
          </div>
          <p className="font-inter text-[#666] text-sm leading-relaxed font-normal max-w-xs pb-1">
            Every Alkota machine is backed by UK engineering support, genuine parts stock, and factory-trained technical expertise.
          </p>
        </div>
      </div>

      {/* ── 4 pillars ──────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#DDDDD8]">
        {[
          {
            icon: ShieldCheck,
            title: '7-Year Coil Warranty',
            desc: 'Every Schedule 80 coil hydro-tested and protected under Alkota\'s industry-leading factory warranty. No pro-rating in years 1–5.',
            link: '/support/warranty',
            cta: 'Register Your Machine',
          },
          {
            icon: Wrench,
            title: 'UK Technical Support',
            desc: 'Direct access to factory-certified British application engineers for troubleshooting, servicing, and specification advice.',
            link: '/support/service',
            cta: 'Service & Repairs',
          },
          {
            icon: Package,
            title: 'Open Parts Architecture',
            desc: 'Zero captive electronic lockouts. All fittings, pumps, switches, and components are standard high-grade industrial parts.',
            link: '/support/replacement-parts',
            cta: 'Genuine Parts',
          },
          {
            icon: MapPin,
            title: 'Nationwide Dealer Network',
            desc: 'Regional coverage across England, Scotland, Wales, and Northern Ireland for on-site demos, commissioning, and servicing.',
            link: '/dealers',
            cta: 'Find Your Dealer',
          },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="bg-white p-8 sm:p-10 flex flex-col group hover:bg-[#F8F8F6] transition-colors">
              <div className="h-12 w-12 bg-[#F0EFE9] border border-[#E0E0DE] flex items-center justify-center text-alkota-black mb-6 group-hover:border-alkota-orange group-hover:text-alkota-orange transition-colors">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="font-inter text-base font-bold text-alkota-black mb-3 leading-tight">
                {item.title}
              </h3>
              <p className="font-inter text-sm text-[#666] leading-relaxed flex-1 mb-6">
                {item.desc}
              </p>
              <Link
                href={item.link}
                className="inline-flex items-center gap-2 font-ibm-plex-mono text-[10px] font-bold uppercase tracking-widest text-alkota-black hover:text-alkota-orange transition-colors no-underline group/link"
              >
                <span>{item.cta}</span>
                <ArrowRight className="h-3 w-3 transition-transform group-hover/link:translate-x-1" />
              </Link>
            </div>
          );
        })}
      </div>

      {/* ── Final CTA Strip ─────────────────────────────────────────── */}
      <div className="bg-alkota-black px-8 sm:px-12 lg:px-16 py-14">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h4 className="font-inter text-xl sm:text-2xl font-bold text-white mb-1">
              Speak to an Application Specialist
            </h4>
            <p className="font-inter text-sm text-[#aaa]">
              Direct line:{' '}
              <a href="tel:+447912506738" className="text-alkota-orange font-bold hover:underline">
                +44 7912 506738
              </a>{' '}
              · Monday – Friday 08:00–17:30
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-alkota-orange text-white px-10 py-4 font-ibm-plex-mono text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all no-underline group shrink-0"
          >
            <span>Contact Alkota UK</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
