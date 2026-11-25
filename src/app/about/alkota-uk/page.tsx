import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import ReadingProgress from '@/components/ui/ReadingProgress';
import AccentLine from '@/components/ui/AccentLine';
import Reveal from '@/components/ui/Reveal';
import { ArrowRight, CheckCircle2, MapPin, Wrench, Truck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Alkota UK Operations | Direct UK Distribution, Service & Parts',
  description:
    'Alkota UK is the dedicated UK operation for Alkota Cleaning Systems Inc. Stocked UK machine & spares inventory, UKCA/CE compliance, and nationwide field engineering support.',
  alternates: { canonical: 'https://alkota.co.uk/about/alkota-uk' },
};

export default function AlkotaUKPage() {
  const standards = [
    { title: 'UK Stocked Inventory', desc: 'Hot water, cold water, steam, and OEM spares held in the UK for rapid dispatch — no transatlantic wait times.' },
    { title: '230V & 400V 3-Phase', desc: 'Machines configured specifically for UK industrial electrical supplies, RCD protection, and site switchgear.' },
    { title: 'UK Road-Legal Trailers', desc: 'Mobile wash rigs engineered to UK towing weight limits, braking regulations, and IVA lighting compliance.' },
    { title: 'Environment Agency Ready', desc: 'Closed-loop water recovery, oil-water separation, and BS EN 858 alignment for trade effluent compliance.' },
    { title: 'UKCA & CE Certified', desc: 'Full conformity documentation, pressure-vessel certification, and technical data sheets for UK H&S audits.' },
    { title: 'Authorised Dealer Network', desc: 'Sales, on-site demonstrations, planned maintenance, and emergency repairs via accredited regional specialists.' },
  ];

  return (
    <main className="min-h-screen bg-[#FAF9F5] text-alkota-black font-normal">
      <ReadingProgress />
      <Navigation />

      {/* Hero */}
      <section className="relative bg-[#0A0A0A] text-white pt-32 pb-24 px-6 sm:px-12 overflow-hidden border-b border-[#222]">
        <div className="absolute inset-0 z-0 opacity-25">
          <Image
            src="/assets/hero-home-header.jpg"
            alt="Alkota UK Industrial Cleaning Operations"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <Breadcrumbs items={[{ label: 'About', href: '/about' }, { label: 'Alkota UK Operations' }]} />

          <div className="mt-10 max-w-4xl">
            <div className="flex items-center gap-3 mb-5">
              <AccentLine widthClass="w-6" immediate />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-alkota-orange">
                Alkota UK // National Operation
              </span>
            </div>
            <h1 className="font-extralight text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-white leading-[0.95] mb-6">
              American Engineering.<br />
              <span className="text-alkota-orange">Dedicated UK Support.</span>
            </h1>
            <p className="text-base sm:text-lg text-[#CCC] leading-relaxed max-w-2xl">
              The UK is not an afterthought export market for Alkota. Alongside our South Dakota factory, Alkota UK operates as a full-service national operation — holding machine and spares stock in the UK and supporting British industry through factory-trained engineers and accredited dealers.
            </p>
          </div>
        </div>
      </section>

      {/* Core Standards */}
      <section className="py-24 px-6 sm:px-12 max-w-7xl mx-auto">
        <Reveal className="max-w-3xl mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-alkota-orange block mb-3">
            // Built For British Industry
          </span>
          <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-alkota-black leading-none mb-4">
            Turnkey UK Specification &amp; Compliance
          </h2>
          <p className="text-base text-[#555] leading-relaxed">
            Every machine and mobile rig supplied by Alkota UK is configured for UK voltages, UK road-towing legislation, and Environment Agency discharge rules.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {standards.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06} className="bg-white border border-[#E5E5E0] p-8 rounded-[6px] shadow-tactile-sm">
              <CheckCircle2 className="h-5 w-5 text-alkota-orange mb-4" />
              <h3 className="font-light text-xl text-alkota-black mb-2">{item.title}</h3>
              <p className="text-sm text-[#555] leading-relaxed">{item.desc}</p>
            </Reveal>
          ))}
        </div>

        {/* Navigation Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/dealers" className="group bg-white border border-[#E5E5E0] hover:border-alkota-orange p-7 rounded-[6px] transition-colors no-underline">
            <MapPin className="h-5 w-5 text-alkota-orange mb-3" />
            <h3 className="font-light text-lg text-alkota-black mb-1 flex items-center justify-between">
              <span>Authorised UK Dealers</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </h3>
            <p className="text-xs text-[#666]">Find regional sales, service, and demo support.</p>
          </Link>
          <Link href="/service" className="group bg-white border border-[#E5E5E0] hover:border-alkota-orange p-7 rounded-[6px] transition-colors no-underline">
            <Wrench className="h-5 w-5 text-alkota-orange mb-3" />
            <h3 className="font-light text-lg text-alkota-black mb-1 flex items-center justify-between">
              <span>UK Service &amp; PPM</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </h3>
            <p className="text-xs text-[#666]">Planned maintenance, pump rebuilds, and breakdown cover.</p>
          </Link>
          <Link href="/bespoke" className="group bg-white border border-[#E5E5E0] hover:border-alkota-orange p-7 rounded-[6px] transition-colors no-underline">
            <Truck className="h-5 w-5 text-alkota-orange mb-3" />
            <h3 className="font-light text-lg text-alkota-black mb-1 flex items-center justify-between">
              <span>Bespoke UK Builds</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </h3>
            <p className="text-xs text-[#666]">Custom trailers, skids, and turnkey wash plants.</p>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
