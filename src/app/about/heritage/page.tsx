import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import ReadingProgress from '@/components/ui/ReadingProgress';
import AccentLine from '@/components/ui/AccentLine';
import Reveal from '@/components/ui/Reveal';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Heritage Since 1964 | Alcester, South Dakota to the UK | Alkota UK',
  description:
    'Founded in 1964 in Alcester, South Dakota. Six decades of continuous-duty industrial pressure washer engineering, from rotary gear drives to Subglacial Lake Whillans in Antarctica.',
  alternates: { canonical: 'https://alkota.co.uk/about/heritage' },
};

export default function HeritagePage() {
  const milestones = [
    {
      year: '1964',
      title: 'Founded in Alcester, South Dakota',
      desc: 'Alkota Cleaning Systems is established in rural South Dakota — a farming and heavy-equipment community where mechanical failure during harvest or winter freeze is unacceptable.',
    },
    {
      year: '1980s',
      title: 'Rotary Gear-Drive & Hydro-Insulated Coils',
      desc: 'Alkota pioneers rotary gear-driven hot water pressure washers and refines the cold-water-wrap Schedule 80 heating coil, setting a benchmark for thermal efficiency and operator safety.',
    },
    {
      year: '2013',
      title: 'Subglacial Lake Whillans — 800m Beneath Antarctica',
      desc: 'Custom-engineered Alkota hot-water systems are selected by the US Antarctic science programme to power the clean-water thermal drill piercing 800 metres of solid Antarctic ice with 100% mission uptime.',
    },
    {
      year: 'Today',
      title: '60+ Years & Direct UK Industrial Presence',
      desc: 'Operating from our manufacturing facility in Alcester, South Dakota, our master builders still hand-weld, assemble, and hot-test every machine before dispatch to UK fleets, farms, food plants, and quarries.',
    },
  ];

  return (
    <main className="min-h-screen bg-[#FAF9F5] text-alkota-black font-normal">
      <ReadingProgress />
      <Navigation />

      {/* Hero */}
      <section className="relative bg-[#0D0D0B] text-white pt-32 pb-24 px-6 sm:px-12 overflow-hidden border-b border-[#222]">
        <div className="absolute inset-0 z-0 opacity-35">
          <Image
            src="/assets/alkota-60-heritage-vintage.jpg"
            alt="Alkota 60th Anniversary Manufacturing Heritage"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0B] via-[#0D0D0B]/75 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <Breadcrumbs items={[{ label: 'About', href: '/about' }, { label: 'Heritage (Since 1964)' }]} />

          <div className="mt-10 max-w-4xl">
            <div className="flex items-center gap-3 mb-5">
              <AccentLine widthClass="w-6" immediate />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-alkota-orange">
                Est. 1964 // Alcester, South Dakota
              </span>
            </div>
            <h1 className="font-extralight text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-white leading-[0.95] mb-6">
              Six Decades of<br />
              <span className="text-alkota-orange">Unbroken Craft.</span>
            </h1>
            <p className="text-base sm:text-lg text-[#CCC] leading-relaxed max-w-2xl">
              Since 1964, Alkota has built industrial cleaning machines the hard way: heavy welded steel, Schedule 80 seamless coils, and serviceable components engineered to outlast multiple owners.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 px-6 sm:px-12 max-w-5xl mx-auto">
        <div className="space-y-12 border-l-2 border-[#E5E5E0] pl-8 sm:pl-12">
          {milestones.map((m, i) => (
            <Reveal key={m.year} delay={i * 0.08} className="relative">
              <span className="absolute -left-[41px] sm:-left-[57px] top-1.5 h-4 w-4 rounded-full bg-alkota-orange border-4 border-[#FAF9F5]" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-alkota-orange block mb-2">
                {m.year}
              </span>
              <h2 className="font-extralight text-2xl sm:text-3xl text-alkota-black mb-3">
                {m.title}
              </h2>
              <p className="text-sm sm:text-base text-[#555] leading-relaxed max-w-2xl">
                {m.desc}
              </p>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 pt-12 border-t border-[#E5E5E0] flex flex-wrap items-center justify-between gap-6">
          <div>
            <h3 className="font-light text-2xl text-alkota-black mb-1">Read the Antarctica Mission Case Study</h3>
            <p className="text-sm text-[#666]">How Alkota thermal systems operated at 800m depth beneath the Antarctic Ice Sheet.</p>
          </div>
          <Link
            href="/resources/case-studies/antarctica-lake-whillans"
            className="inline-flex items-center gap-3 bg-alkota-orange text-white px-7 py-3.5 text-xs uppercase tracking-[0.2em] hover:bg-black transition-colors rounded-[4px] no-underline btn-tactile"
          >
            <span>Read Case Study</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
