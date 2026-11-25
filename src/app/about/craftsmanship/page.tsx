import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import ReadingProgress from '@/components/ui/ReadingProgress';
import AccentLine from '@/components/ui/AccentLine';
import Reveal from '@/components/ui/Reveal';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Craftsmanship & Hand-Built Manufacturing | Alkota UK',
  description:
    'Inside the Alcester, South Dakota manufacturing plant. 150+ years combined engineering experience, zero structural plastics, low-RPM triplex ceramic pumps, and 100% factory hot-testing.',
  alternates: { canonical: 'https://alkota.co.uk/about/craftsmanship' },
};

export default function CraftsmanshipPage() {
  const pillars = [
    {
      num: '01',
      title: 'Zero Structural Plastics',
      desc: 'Competitors shroud lightweight frames in moulded ABS plastic that cracks in winter frost and hides leaks. Alkota welds heavy-gauge structural steel frames finished in industrial powder coat or full coastal galvanisation.',
    },
    {
      num: '02',
      title: 'Low-RPM Ceramic Triplex Pumps',
      desc: 'We partner with proven industrial pump makers (General Pump & AR) and drive them at lower RPMs via belt or gear reduction. Cooler oil baths and solid ceramic plungers deliver thousands of hours between packing kits.',
    },
    {
      num: '03',
      title: 'Signed Off & Hot-Tested',
      desc: 'Every single machine is hand-assembled by a master builder in South Dakota, pressure-tested at full thermal load, and inspected before crating — never batch-sampled off a high-speed line.',
    },
    {
      num: '04',
      title: 'QR-Linked Digital Schematics',
      desc: 'Every Alkota machine carries durable identification linking directly to its model manual, wiring diagram, and parts breakdown so technicians on site can diagnose and source OEM spares without guesswork.',
    },
  ];

  return (
    <main className="min-h-screen bg-[#FAF9F5] text-alkota-black font-normal">
      <ReadingProgress />
      <Navigation />

      <section className="relative bg-[#0A0A0A] text-white pt-32 pb-24 px-6 sm:px-12 overflow-hidden border-b border-[#222]">
        <div className="absolute inset-0 z-0 opacity-30">
          <Image
            src="/assets/south-dakota-craft-hero.jpg"
            alt="Alkota South Dakota Coil Winding and Craftsmanship"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <Breadcrumbs items={[{ label: 'About', href: '/about' }, { label: 'Craftsmanship' }]} />

          <div className="mt-10 max-w-4xl">
            <div className="flex items-center gap-3 mb-5">
              <AccentLine widthClass="w-6" immediate />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-alkota-orange">
                Alcester, South Dakota // Factory Craft
              </span>
            </div>
            <h1 className="font-extralight text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-white leading-[0.95] mb-6">
              Hand Built by<br />
              <span className="text-alkota-orange">Master Builders.</span>
            </h1>
            <p className="text-base sm:text-lg text-[#CCC] leading-relaxed max-w-2xl">
              Our engineering and build team brings over 150 years of combined industrial pressure-washing experience. Every chassis is welded, plumbed, wired, and hot-tested for decades of serviceable duty.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 sm:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {pillars.map((p, i) => (
            <Reveal key={p.num} delay={i * 0.08} className="bg-white border border-[#E5E5E0] p-8 sm:p-10 rounded-[6px] shadow-tactile-sm">
              <span className="font-extralight text-3xl text-alkota-orange block mb-3">{p.num}</span>
              <h2 className="font-light text-2xl text-alkota-black mb-3">{p.title}</h2>
              <p className="text-sm text-[#555] leading-relaxed">{p.desc}</p>
            </Reveal>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-6 border-t border-[#E5E5E0] pt-10">
          <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-wider text-[#555]">
            <CheckCircle2 className="h-4 w-4 text-alkota-orange" />
            <span>Open-component architecture · Standard BSP/NPT fittings · Full UK spares stock</span>
          </div>
          <Link
            href="/about/coil-technology"
            className="inline-flex items-center gap-3 bg-alkota-black text-white px-7 py-3.5 text-xs uppercase tracking-[0.2em] hover:bg-alkota-orange transition-colors rounded-[4px] no-underline btn-tactile"
          >
            <span>Explore Schedule 80 Coil Tech</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
