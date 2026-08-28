import Link from 'next/link';
import { ArrowRight, ShieldCheck, Wrench, FileText, Phone, MapPin, Headphones } from 'lucide-react';

export default function OwnershipSection() {
  return (
    <section className="py-24 sm:py-32 px-6 sm:px-12 bg-[#FFFFFF] border-b border-[#D8D8D6]">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between border-b border-[#D8D8D6] pb-8 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-[2px] w-8 bg-alkota-orange" />
              <span className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-[0.35em] text-alkota-orange">
                // LIFECYCLE COMMITMENT
              </span>
            </div>
            <h2 className="font-barlow-condensed text-5xl sm:text-7xl font-black uppercase italic tracking-tight text-alkota-black leading-none">
              ENGINEERED FOR DECADES OF SERVICE.
            </h2>
          </div>
          <p className="font-inter text-sm text-[#555] max-w-md leading-relaxed">
            Buying an Alkota is the beginning of a supported commercial relationship. Every machine is backed by UK engineering support, genuine parts stock, and factory-trained technical assistance.
          </p>
        </div>

        {/* 4 Support Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="border border-[#D5D5D3] p-8 bg-[#F8F8F7]">
            <ShieldCheck className="h-8 w-8 text-alkota-orange mb-6" />
            <h3 className="font-barlow-condensed text-2xl font-bold uppercase text-alkota-black mb-2">
              7-Year Coil Standard
            </h3>
            <p className="font-inter text-xs text-[#666] leading-relaxed">
              Every hot water schedule 80 coil is hydro-tested and protected under Alkota’s industry-leading 7-year manufacturer warranty.
            </p>
          </div>

          <div className="border border-[#D5D5D3] p-8 bg-[#F8F8F7]">
            <Wrench className="h-8 w-8 text-alkota-orange mb-6" />
            <h3 className="font-barlow-condensed text-2xl font-bold uppercase text-alkota-black mb-2">
              UK Technical Support
            </h3>
            <p className="font-inter text-xs text-[#666] leading-relaxed">
              Direct access to British application engineers and factory-certified service technicians for troubleshooting and servicing.
            </p>
          </div>

          <div className="border border-[#D5D5D3] p-8 bg-[#F8F8F7]">
            <FileText className="h-8 w-8 text-alkota-orange mb-6" />
            <h3 className="font-barlow-condensed text-2xl font-bold uppercase text-alkota-black mb-2">
              Open Parts Architecture
            </h3>
            <p className="font-inter text-xs text-[#666] leading-relaxed">
              Zero captive electronic lockouts. All fittings, pumps, switches, and components are standard high-grade industrial parts.
            </p>
          </div>

          <div className="border border-[#D5D5D3] p-8 bg-[#F8F8F7]">
            <MapPin className="h-8 w-8 text-alkota-orange mb-6" />
            <h3 className="font-barlow-condensed text-2xl font-bold uppercase text-alkota-black mb-2">
              Nationwide Network
            </h3>
            <p className="font-inter text-xs text-[#666] leading-relaxed">
              Regional coverage across England, Scotland, Wales, and Northern Ireland for on-site commissioning and demonstrations.
            </p>
          </div>
        </div>

        {/* Action Strip */}
        <div className="p-8 sm:p-12 bg-alkota-black text-white flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h4 className="font-barlow-condensed text-3xl sm:text-4xl font-black uppercase italic tracking-tight">
              SPEAK TO AN APPLICATION SPECIALIST
            </h4>
            <p className="font-inter text-xs sm:text-sm text-[#aaa] mt-1">
              Direct telephone line: <a href="tel:+447912506738" className="text-alkota-orange font-bold hover:underline">+44 7912 506738</a> • Monday to Friday 08:00 – 17:30
            </p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-alkota-orange text-white px-8 py-4 font-ibm-plex-mono text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors no-underline"
            >
              <span>Contact Alkota UK</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
