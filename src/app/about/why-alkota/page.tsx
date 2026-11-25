import type { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import ReadingProgress from '@/components/ui/ReadingProgress';
import AccentLine from '@/components/ui/AccentLine';
import Reveal from '@/components/ui/Reveal';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Why Alkota? | The Platinum Standard in Industrial Cleaning',
  description:
    'Why fleet depots, agriculture, food plants, and heavy industry choose Alkota: structural welded steel, open-component serviceability, 7-year coil warranty, and custom-built capability.',
  alternates: { canonical: 'https://alkota.co.uk/about/why-alkota' },
};

export default function WhyAlkotaPage() {
  const reasons = [
    {
      num: '01',
      title: 'Unmatched Structural Durability',
      desc: 'No brittle structural plastics. Heavy-gauge welded steel frames shield pumps, burners, and controls inside an industrial chassis built for multi-shift depots and quarries.',
    },
    {
      num: '02',
      title: 'Serviceability First — Zero Lock-In',
      desc: 'Wide-open service layouts, standard industrial couplings, and proven General / AR pumps mean your engineer isn’t fighting proprietary fasteners or sealed disposable assemblies.',
    },
    {
      num: '03',
      title: 'Custom-Built Flexibility',
      desc: 'Up to 25% of Alkota systems are custom builds. Need a dual-operator road trailer, coastal galvanised frame, or 120m remote wash bay? If you can describe it, we can build it.',
    },
    {
      num: '04',
      title: 'Lowest Total Cost of Ownership',
      desc: 'Cheap commercial washers are replaced every 18–24 months. An Alkota Schedule 80 machine is rebuilt, serviced, and kept in productive service for 10–15+ years.',
    },
  ];

  return (
    <main className="min-h-screen bg-[#FAF9F5] text-alkota-black font-normal">
      <ReadingProgress />
      <Navigation />

      <section className="bg-[#0A0A0A] text-white pt-32 pb-24 px-6 sm:px-12 border-b border-[#222]">
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs items={[{ label: 'About', href: '/about' }, { label: 'Why Alkota?' }]} />

          <div className="mt-10 max-w-4xl">
            <div className="flex items-center gap-3 mb-5">
              <AccentLine widthClass="w-6" immediate />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-alkota-orange">
                The Platinum Standard // Since 1964
              </span>
            </div>
            <h1 className="font-extralight text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-white leading-[0.95] mb-6">
              Built For Operators Who<br />
              <span className="text-alkota-orange">Cannot Afford Downtime.</span>
            </h1>
            <p className="text-base sm:text-lg text-[#CCC] leading-relaxed max-w-2xl">
              There are commercial pressure washers, and then there is Alkota. Our customers operate where wash-bay failure stalls MOT lanes, food production lines, or harvest operations.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 sm:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {reasons.map((r, i) => (
            <Reveal key={r.num} delay={i * 0.08} className="bg-white border border-[#E5E5E0] p-8 sm:p-10 rounded-[6px] shadow-tactile-sm">
              <span className="font-extralight text-3xl text-alkota-orange block mb-3">{r.num}</span>
              <h2 className="font-light text-2xl text-alkota-black mb-3">{r.title}</h2>
              <p className="text-sm text-[#555] leading-relaxed">{r.desc}</p>
            </Reveal>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/tools/tco-calculator"
            className="inline-flex items-center gap-3 bg-alkota-orange text-white px-8 py-4 text-xs uppercase tracking-[0.2em] hover:bg-black transition-colors rounded-[4px] no-underline btn-tactile"
          >
            <span>Calculate 5-Year TCO</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/dealers/demo-request"
            className="inline-flex items-center gap-3 border border-alkota-black text-alkota-black px-8 py-4 text-xs uppercase tracking-[0.2em] hover:bg-alkota-black hover:text-white transition-colors rounded-[4px] no-underline"
          >
            <span>Book On-Site Demo</span>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
