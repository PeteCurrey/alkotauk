import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import ReadingProgress from '@/components/ui/ReadingProgress';
import AccentLine from '@/components/ui/AccentLine';
import Reveal from '@/components/ui/Reveal';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Schedule 80 Hydro-Insulated Coil Technology | Alkota UK',
  description:
    'Patented Alkota hydro-insulated cold-water-wrap coil wound from continuous ASTM A53 Schedule 80 seamless steel pipe. 35% heavier wall thickness and a 7-year coil warranty.',
  alternates: { canonical: 'https://alkota.co.uk/about/coil-technology' },
};

export default function CoilPage() {
  return (
    <main className="min-h-screen bg-[#FAF9F5] text-alkota-black font-normal">
      <ReadingProgress />
      <Navigation />

      <section className="relative bg-[#0A0A0A] text-white pt-32 pb-24 px-6 sm:px-12 overflow-hidden border-b border-[#222]">
        <div className="relative z-10 mx-auto max-w-7xl">
          <Breadcrumbs items={[{ label: 'About', href: '/about' }, { label: 'Schedule 80 Coil Technology' }]} />

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-5">
                <AccentLine widthClass="w-6" immediate />
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-alkota-orange">
                  Thermal Architecture // 7-Year Guarantee
                </span>
              </div>
              <h1 className="font-extralight text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-white leading-[0.95] mb-6">
                The Schedule 80<br />
                <span className="text-alkota-orange">Hydro-Insulated Coil.</span>
              </h1>
              <p className="text-base sm:text-lg text-[#CCC] leading-relaxed max-w-2xl">
                Most industrial pressure washers fail at welded coil joints or crumbling refractory brick insulation. Alkota winds continuous ASTM A53 Schedule 80 seamless pipe on precision CNC mandrels — wrapped in an incoming cold-water jacket that pre-heats water and keeps the outer shell cool.
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] bg-white/5 border border-white/10 rounded-[6px] p-6">
                <Image
                  src="/assets/products/420x4.png"
                  alt="Alkota Schedule 80 Hot Water Pressure Washer"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-contain p-4"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 sm:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Reveal delay={0} className="bg-white border border-[#E5E5E0] p-8 rounded-[6px]">
            <span className="font-mono text-xs uppercase tracking-widest text-alkota-orange block mb-3">01 · Metallurgy</span>
            <h2 className="font-light text-2xl text-alkota-black mb-3">35% Heavier Wall Thickness</h2>
            <p className="text-sm text-[#555] leading-relaxed">
              ASTM A53 Schedule 80 seamless steel pipe carries roughly 35% thicker walls than commercial Schedule 40 tubing, resisting extreme pressure spikes, thermal shock, and internal scale fatigue.
            </p>
          </Reveal>

          <Reveal delay={0.08} className="bg-white border border-[#E5E5E0] p-8 rounded-[6px]">
            <span className="font-mono text-xs uppercase tracking-widest text-alkota-orange block mb-3">02 · Cold Water Wrap</span>
            <h2 className="font-light text-2xl text-alkota-black mb-3">Hydro-Insulated Efficiency</h2>
            <p className="text-sm text-[#555] leading-relaxed">
              Incoming pump water spirals around the exterior of the combustion chamber before entering the high-heat core — capturing radiant heat, reducing diesel consumption, and keeping the exterior safe to touch.
            </p>
          </Reveal>

          <Reveal delay={0.16} className="bg-white border border-[#E5E5E0] p-8 rounded-[6px]">
            <span className="font-mono text-xs uppercase tracking-widest text-alkota-orange block mb-3">03 · Zero Internal Welds</span>
            <h2 className="font-light text-2xl text-alkota-black mb-3">Continuous CNC Mandrel Wind</h2>
            <p className="text-sm text-[#555] leading-relaxed">
              Eliminating mid-coil butt welds removes the #1 weak point in commercial burners. Backed by Alkota’s 7-Year Heating Coil Warranty across the UK.
            </p>
          </Reveal>
        </div>

        <div className="bg-[#121210] text-white p-10 rounded-[6px] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <ShieldCheck className="h-8 w-8 text-alkota-orange shrink-0 mt-1" />
            <div>
              <h3 className="font-light text-2xl mb-1">Explore Our Hot Water Fleet</h3>
              <p className="text-sm text-[#AAA]">Compare Schedule 80 hot water machines from 138 to 345 BAR.</p>
            </div>
          </div>
          <Link
            href="/machines/hot-water"
            className="inline-flex items-center gap-3 bg-alkota-orange text-white px-7 py-3.5 text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors rounded-[4px] shrink-0 no-underline btn-tactile"
          >
            <span>View Hot Water Range</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
