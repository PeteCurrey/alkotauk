import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowDown } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import MessQuestVideoPlayer from '@/components/mess-quest/MessQuestVideoPlayer';
import EpisodeLibrary from '@/components/mess-quest/EpisodeLibrary';
import { getAllMessQuestEpisodes } from '@/lib/messQuestEpisodes';

/* ─── SEO ──────────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: 'Mess Quest | Extreme Industrial Cleaning Case Studies | Alkota UK',
  description:
    'Watch Alkota Mess Quest and see industrial pressure washing equipment tackling some of the toughest cleaning jobs in the field. Explore the machines, engineering and systems behind the clean.',
  alternates: {
    canonical: 'https://alkota.co.uk/mess-quest',
  },
  openGraph: {
    title: 'Mess Quest | Extreme Industrial Cleaning | Alkota UK',
    description:
      'Watch Alkota Mess Quest and see industrial pressure washing equipment tackling some of the toughest cleaning jobs in the field.',
    url: 'https://alkota.co.uk/mess-quest',
    siteName: 'Alkota UK',
    type: 'website',
  },
};

/* ─── Structured Data ───────────────────────────────────────────────────────── */

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': 'https://alkota.co.uk/mess-quest',
      name: 'Mess Quest | Alkota UK',
      description:
        'Mess Quest is the original Alkota documentary series capturing extreme industrial cleaning jobs — real operators, real contamination, real Alkota equipment.',
      url: 'https://alkota.co.uk/mess-quest',
      publisher: { '@id': 'https://alkota.co.uk/#organization' },
      about: {
        '@type': 'VideoObject',
        name: 'Mess Quest — Alkota Industrial Cleaning Series',
        description:
          'The official Mess Quest series from Alkota: extreme industrial cleaning challenges filmed in the field.',
        uploadDate: '2020-01-01',
        publisher: { '@id': 'https://alkota.co.uk/#organization' },
        url: 'https://www.youtube.com/playlist?list=PLKaGYY0CshvoC0ES9SQh7gqjF5p79V43N',
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://alkota.co.uk',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Resources',
          item: 'https://alkota.co.uk/resources',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Mess Quest',
          item: 'https://alkota.co.uk/mess-quest',
        },
      ],
    },
  ],
};

/* ─── Product category data ─────────────────────────────────────────────────── */

const PRODUCT_CATEGORIES = [
  {
    label: 'Hot Water Pressure Washers',
    href: '/machines/hot-water',
    image: '/assets/products/420x4.png',
    spec: 'Up to 95°C · 345 BAR',
  },
  {
    label: 'Cold Water Industrial',
    href: '/machines/cold-water',
    image: '/assets/products/4305xd4.png',
    spec: '100–350 BAR · Triplex Pump',
  },
  {
    label: 'Trailer Systems',
    href: '/trailers',
    image: '/assets/products/trailer-single.png',
    spec: 'Mobile · Turnkey Road Rigs',
  },
  {
    label: 'Wash Plant & Bespoke Systems',
    href: '/wash-plant',
    image: '/assets/engineered-continuous-duty.jpg',
    spec: 'Custom-Engineered Installations',
  },
  {
    label: 'Chemicals',
    href: '/chemicals',
    image: '/assets/industries/manufacturing.png',
    spec: 'Hydrus Formulations',
  },
  {
    label: 'Water Recovery & Recycling',
    href: '/water-treatment',
    image: '/assets/products/ged-12v-skid.png',
    spec: 'EA-Compliant Closed Loop',
  },
  {
    label: 'Attachments & Accessories',
    href: '/attachments',
    image: '/assets/industries/fleet.png',
    spec: 'Surface Cleaners · Foam Lances',
  },
];

/* ─── "From the Field" editorial stories ────────────────────────────────────── */

const FIELD_STORIES = [
  {
    number: '01',
    heading: 'The Mess',
    body: 'Industrial contamination is rarely one-dimensional. Grease, oils, biological material, road film, mud and process residue frequently require different combinations of temperature, flow, pressure and chemistry. Understanding the contamination is the first part of solving it.',
    image: '/assets/industries/construction.png',
    imageAlt: 'Industrial construction contamination requiring pressure washing',
  },
  {
    number: '02',
    heading: 'The Machine',
    body: 'Industrial cleaning performance is about considerably more than headline PSI. Flow rate, heat, burner performance, pump design, duty cycle and reliability determine real-world productivity. A machine that can sustain 200 BAR at 90°C across an eight-hour shift is an entirely different proposition from one that hits those numbers briefly on a test bench.',
    image: '/assets/industries/manufacturing.png',
    imageAlt: 'Alkota industrial pressure washer in manufacturing environment',
  },
  {
    number: '03',
    heading: 'The Operator',
    body: 'The person behind the lance matters. Application knowledge, detergent selection, dwell time, nozzle choice and cleaning technique together determine the result. Mess Quest captures experienced operators working through the logic of a difficult cleaning challenge — not just the spectacle.',
    image: '/assets/industries/agriculture.png',
    imageAlt: 'Operator using Alkota hot water pressure washer in agricultural setting',
  },
  {
    number: '04',
    heading: 'The System',
    body: 'The most demanding jobs often require considerably more than a standalone washer. Water storage, hose management, generators, recovery equipment and purpose-built mobile systems may all form part of the solution. Mess Quest shows what a complete industrial cleaning system looks like when it is assembled for a specific task.',
    image: '/assets/industries/fleet.png',
    imageAlt: 'Complete Alkota mobile cleaning system deployed at fleet depot',
  },
];

/* ─── Bespoke capability list ───────────────────────────────────────────────── */

const BESPOKE_SPECS = [
  'Pressure · Flow · Heat Combinations',
  'Water Capacity & Buffer Storage',
  'Generators & Independent Diesel Power',
  'Dual-Operator Manifold Configurations',
  'Live High-Pressure Hose Management',
  'Chemical Dosing & Foaming Systems',
  'Closed-Loop Recovery & Recycling',
  'Custom Vehicle & Highway Trailer Mounting',
  'Integrated Digital Controls & Interlocks',
];

/* ─── Main Hub Page ─────────────────────────────────────────────────────────── */

export default function MessQuestPage() {
  const episodes = getAllMessQuestEpisodes();

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-[#F8F7F4] text-alkota-black font-normal">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />

      <main>
        {/* ── 01 · HERO ─────────────────────────────────────────────────────────── */}
        <section
          className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden bg-[#0A0A08] text-white"
          aria-label="Mess Quest — Alkota Original Series"
        >
          {/* Background video */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <video
              autoPlay
              loop
              muted
              playsInline
              aria-hidden="true"
              className="h-full w-full object-cover object-center"
              style={{
                filter: 'brightness(0.55) contrast(1.1)',
                transform: 'scale(1.04)',
                transition: 'transform 6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              }}
            >
              <source src="/assets/videos/mess-quest.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-black/20" aria-hidden="true" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A08] via-transparent to-black/50" aria-hidden="true" />
          </div>

          {/* Content */}
          <div className="relative z-10 mx-auto max-w-7xl w-full px-6 sm:px-12 py-24 sm:py-32">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-8">
              <span className="h-[1.5px] w-6 bg-alkota-orange" aria-hidden="true" />
              <span className="text-[10px] uppercase tracking-[0.32em] text-alkota-orange">
                Alkota Original Series · Est. 1964
              </span>
            </div>

            {/* Title */}
            <h1
              className="font-extralight uppercase tracking-tight text-white leading-[0.88] mb-6"
              style={{ fontSize: 'clamp(4rem, 11vw, 9.5rem)' }}
            >
              Mess Quest.
            </h1>

            {/* Sub-heading */}
            <p
              className="font-extralight uppercase tracking-tight text-white/80 leading-tight mb-6"
              style={{ fontSize: 'clamp(1.1rem, 2.5vw, 2rem)' }}
            >
              The dirtiest jobs.<br className="sm:hidden" />{' '}
              The toughest cleaning systems.
            </p>

            {/* Body */}
            <p className="text-white/65 text-base sm:text-lg leading-relaxed mb-10 max-w-xl">
              Alkota went looking for some of the toughest industrial cleaning jobs on the
              planet. Mess Quest documents the operators, equipment and engineering behind
              getting them clean.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="#episodes"
                className="inline-flex items-center justify-center gap-3 bg-alkota-orange text-white px-8 py-3.5 text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all group shadow-xl no-underline"
                aria-label="Explore episode library"
              >
                <span>Browse All Episodes</span>
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
              </a>
              <Link
                href="/machines"
                className="inline-flex items-center justify-center gap-3 border border-white/35 bg-black/35 backdrop-blur-sm text-white px-7 py-3.5 text-xs uppercase tracking-[0.2em] hover:border-white hover:bg-white hover:text-black transition-all group no-underline"
              >
                <span>Explore Alkota Equipment</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2" aria-hidden="true">
            <span className="h-10 w-[1px] bg-white/20 block" />
            <span className="text-[9px] uppercase tracking-[0.3em] text-white/30">Scroll</span>
          </div>
        </section>

        {/* ── 02 · INTRODUCTION ─────────────────────────────────────────────────── */}
        <section
          className="bg-white py-24 sm:py-32 px-6 sm:px-12 border-b border-[#E0E0DC]"
          aria-label="Why Mess Quest exists"
        >
          <div className="mx-auto max-w-7xl w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">
              {/* Copy column */}
              <div className="lg:col-span-6">
                <span className="text-xs uppercase tracking-[0.25em] text-alkota-orange block mb-4">
                  Why Mess Quest Exists
                </span>
                <h2
                  className="font-extralight uppercase tracking-tight text-alkota-black leading-[0.95] mb-8"
                  style={{ fontSize: 'clamp(2rem, 4.5vw, 3.6rem)' }}
                >
                  Some jobs need more than a pressure washer.
                </h2>
                <div className="space-y-5 text-[#555] leading-relaxed text-base sm:text-[17px]">
                  <p>
                    Industrial cleaning can mean removing a decade of baked-on bitumen from
                    road-paving machinery. It can mean sanitising a 2,400-head livestock barn
                    between biosecurity rotations. It can mean restoring a 135-foot municipal water tower
                    under severe environmental and vertical access constraints.
                  </p>
                  <p>
                    These jobs demand real industrial equipment — machines designed and built for
                    continuous-duty operation across years of hard service, not consumer pressure
                    washers running at borrowed specification for an hour at a time.
                  </p>
                  <p>
                    Mess Quest was created by Alkota to put those jobs — and the people doing
                    them — in the spotlight. No staging. No studio conditions. Just the
                    equipment, the environment, and the result.
                  </p>
                </div>

                {/* Pull quote */}
                <blockquote className="border-l-2 border-alkota-orange pl-6 mt-10">
                  <p className="font-extralight text-xl sm:text-2xl text-alkota-black leading-snug italic">
                    &ldquo;Extreme cleaning is where industrial equipment earns its reputation.&rdquo;
                  </p>
                </blockquote>
              </div>

              {/* Image column */}
              <div className="lg:col-span-6">
                <div className="aspect-[4/3] bg-[#141412] overflow-hidden">
                  <img
                    src="/assets/industries/manufacturing.png"
                    alt="Industrial facility requiring Alkota hot water pressure washing"
                    className="w-full h-full object-cover"
                    style={{ filter: 'brightness(0.9) contrast(1.08)' }}
                    loading="lazy"
                  />
                </div>
                {/* Spec strip */}
                <div className="mt-4 grid grid-cols-3 gap-px bg-[#E0E0DC]">
                  {[
                    { value: '60+', label: 'Years Built' },
                    { value: '345 BAR', label: 'Max Pressure' },
                    { value: '95°C', label: 'Max Temperature' },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-[#F8F7F4] px-4 py-4 text-center">
                      <p className="text-alkota-orange text-xl font-extralight">{stat.value}</p>
                      <p className="text-[10px] uppercase tracking-widest text-[#888] mt-0.5">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 03 · OFFICIAL PLAYLIST VIDEO PLAYER (DARK) ────────────────────────── */}
        <section
          id="watch"
          className="bg-[#0A0A0A] py-20 sm:py-28 px-6 sm:px-12 border-b border-[#1F1F1D]"
          aria-label="Watch Mess Quest"
        >
          <div className="mx-auto max-w-5xl w-full">
            <div className="mb-10">
              <span className="text-[10px] uppercase tracking-[0.32em] text-alkota-orange block mb-3 font-mono">
                Official Series · YouTube Playlist
              </span>
              <h2
                className="font-extralight uppercase tracking-tight text-white leading-none"
                style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)' }}
              >
                Watch Mess Quest.
              </h2>
            </div>

            <MessQuestVideoPlayer />

            <p className="mt-10 text-sm text-[#888] leading-relaxed max-w-2xl font-light">
              Mess Quest is produced by Alkota Cleaning Systems. All episodes feature genuine
              Alkota industrial equipment operating in real cleaning environments. The series
              demonstrates the practical difference between industrial-duty machines and
              consumer-grade equipment across severe field conditions.
            </p>
          </div>
        </section>

        {/* ── 04 · ALL MESSES EPISODE LIBRARY (LIGHT) ───────────────────────────── */}
        <section
          id="episodes"
          className="bg-[#F8F7F4] py-24 sm:py-32 px-6 sm:px-12 border-b border-[#E0E0DC]"
          aria-label="Mess Quest Episode Library"
        >
          <div className="mx-auto max-w-7xl w-full">
            <div className="mb-16 max-w-2xl">
              <span className="text-xs uppercase tracking-[0.25em] text-alkota-orange block mb-4 font-mono font-medium">
                Case Study Library // Proof of Capability
              </span>
              <h2
                className="font-extralight uppercase tracking-tight text-alkota-black leading-[0.95]"
                style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}
              >
                All Messes.
              </h2>
              <p className="text-base text-[#666] leading-relaxed mt-4">
                Explore real industrial cleaning challenges. Each episode breaks down the contamination type, physical difficulty factors, cleaning equation balance, and recommended Alkota system architecture.
              </p>
            </div>

            {/* Interactive Episode Library with Category Filters */}
            <EpisodeLibrary episodes={episodes} />
          </div>
        </section>

        {/* ── 05 · FROM THE FIELD EDITORIAL ─────────────────────────────────────── */}
        <section
          className="bg-white py-24 sm:py-32 border-b border-[#E0E0DC]"
          aria-label="From the Field — what Mess Quest shows"
        >
          <div className="mx-auto max-w-7xl w-full px-6 sm:px-12">
            <div className="mb-20 max-w-2xl">
              <span className="text-xs uppercase tracking-[0.25em] text-alkota-orange block mb-4">
                From The Field
              </span>
              <h2
                className="font-extralight uppercase tracking-tight text-alkota-black leading-[0.95]"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 3.6rem)' }}
              >
                What to watch for in Mess Quest.
              </h2>
            </div>

            <div className="space-y-0">
              {FIELD_STORIES.map((story, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <div
                    key={story.number}
                    className={`grid grid-cols-1 lg:grid-cols-12 border-t border-[#E0E0DC] ${
                      idx === FIELD_STORIES.length - 1 ? 'border-b' : ''
                    }`}
                  >
                    {/* Number column */}
                    <div
                      className={`lg:col-span-1 flex lg:flex-col lg:justify-start pt-10 pb-0 lg:py-16 pr-0 lg:pr-8 ${
                        isEven ? 'order-1' : 'order-1 lg:order-1'
                      }`}
                    >
                      <span
                        className="font-extralight text-[#D8D8D0] leading-none select-none"
                        style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)' }}
                        aria-hidden="true"
                      >
                        {story.number}
                      </span>
                    </div>

                    {/* Text column */}
                    <div
                      className={`lg:py-16 py-6 lg:px-10 flex flex-col justify-center ${
                        isEven
                          ? 'order-2 lg:col-span-5'
                          : 'order-2 lg:col-span-5 lg:order-3'
                      }`}
                    >
                      <h3
                        className="font-light uppercase tracking-tight text-alkota-black leading-tight mb-5"
                        style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}
                      >
                        {story.heading}
                      </h3>
                      <p className="text-base text-[#555] leading-relaxed">
                        {story.body}
                      </p>
                    </div>

                    {/* Image column */}
                    <div
                      className={`aspect-[16/10] lg:aspect-auto lg:py-0 overflow-hidden ${
                        isEven
                          ? 'order-3 lg:col-span-6 lg:order-3'
                          : 'order-3 lg:col-span-6 lg:order-2'
                      }`}
                    >
                      <img
                        src={story.image}
                        alt={story.imageAlt}
                        className="w-full h-full object-cover min-h-[260px]"
                        style={{ filter: 'brightness(0.88) contrast(1.08)' }}
                        loading="lazy"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 06 · PRODUCT CATEGORIES ───────────────────────────────────────────── */}
        <section
          className="bg-white py-24 sm:py-32 px-6 sm:px-12 border-b border-[#E0E0DC]"
          aria-label="Alkota product categories — built for the jobs in Mess Quest"
        >
          <div className="mx-auto max-w-7xl w-full">
            <div className="mb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-8">
                <span className="text-xs uppercase tracking-[0.25em] text-alkota-orange block mb-4">
                  The Equipment Fleet
                </span>
                <h2
                  className="font-extralight uppercase tracking-tight text-alkota-black leading-[0.95]"
                  style={{ fontSize: 'clamp(2rem, 4.5vw, 3.6rem)' }}
                >
                  Built for the jobs<br />you just watched.
                </h2>
              </div>
              <div className="lg:col-span-4 lg:text-right">
                <Link
                  href="/machines"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-alkota-orange hover:text-alkota-black transition-colors group no-underline"
                >
                  <span>Browse All Equipment</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-[#E0E0DC]">
              {PRODUCT_CATEGORIES.map((cat, idx) => {
                const isFeature = idx === 0 || idx === 3;
                return (
                  <Link
                    key={cat.href}
                    href={cat.href}
                    className={`group relative overflow-hidden bg-[#141412] ${
                      isFeature ? 'col-span-2 md:col-span-1 lg:col-span-2' : ''
                    } no-underline`}
                    aria-label={cat.label}
                  >
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <img
                        src={cat.image}
                        alt={cat.label}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        style={{ filter: 'brightness(0.55) contrast(1.08)' }}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" aria-hidden="true" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-alkota-orange mb-1 font-mono">
                        {cat.spec}
                      </p>
                      <h3 className="font-light text-white text-sm sm:text-base uppercase leading-tight group-hover:text-alkota-orange transition-colors">
                        {cat.label}
                      </h3>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 07 · BESPOKE ENGINEERING ──────────────────────────────────────────── */}
        <section
          className="relative overflow-hidden bg-[#0A0A08] text-white py-24 sm:py-32 px-6 sm:px-12"
          aria-label="Bespoke cleaning systems — Alkota"
        >
          <div className="absolute inset-0 z-0" aria-hidden="true">
            <img
              src="/assets/engineered-continuous-duty.jpg"
              alt=""
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(0.15) contrast(1.1)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-black/90" />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              <div className="lg:col-span-7">
                <span className="text-[10px] uppercase tracking-[0.28em] text-alkota-orange block mb-5 font-mono">
                  Bespoke Engineering // UK Integration
                </span>
                <h2
                  className="font-extralight uppercase tracking-tight text-white leading-[0.92] mb-8"
                  style={{ fontSize: 'clamp(2rem, 4.5vw, 3.8rem)' }}
                >
                  When the job isn&apos;t standard,{' '}
                  <span className="text-alkota-orange">the machine</span>{' '}
                  shouldn&apos;t be either.
                </h2>
                <p className="text-[#999] text-base sm:text-lg leading-relaxed mb-6 font-light">
                  Mess Quest shows what industrial cleaning looks like in genuine field
                  conditions. Many of those jobs require considerably more than a
                  standard machine — they require a system engineered around the
                  specific demands of the application.
                </p>
                <p className="text-[#777] text-base leading-relaxed mb-10">
                  Alkota designs and builds bespoke cleaning systems that combine
                  every element of the cleaning process into a single purpose-built
                  solution.
                </p>

                <Link
                  href="/wash-plant"
                  className="inline-flex items-center gap-3 bg-alkota-orange text-white px-8 py-4 text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors group no-underline"
                >
                  <span>Discuss a Bespoke System</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </div>

              <div className="lg:col-span-5">
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#555] mb-4 font-mono">
                  System Capabilities
                </p>
                <ul className="space-y-0" aria-label="Bespoke system capabilities">
                  {BESPOKE_SPECS.map((spec, i) => (
                    <li
                      key={spec}
                      className="flex items-center gap-4 py-3.5 border-b border-[#1F1F1D]"
                    >
                      <span className="text-[10px] text-alkota-orange w-6 shrink-0 font-mono" aria-hidden="true">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-sm text-[#bbb] uppercase tracking-wide">
                        {spec}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#888] hover:text-white transition-colors group no-underline"
                  >
                    <span>Contact Applications Team</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
