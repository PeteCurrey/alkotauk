import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Alkota UK | Handcrafted Cleaning Systems Since 1964',
  description: 'Alkota has been building industrial pressure washing equipment in Alcester, South Dakota since 1964. 60 years of craft, 150+ years of combined engineering experience, and a machine that bored through half a mile of Antarctic ice.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-alkota-bg overflow-x-hidden">
      <Navigation />

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-between pt-36 pb-16 px-6 overflow-hidden border-b border-alkota-iron">
        <div className="absolute top-0 right-0 pointer-events-none select-none opacity-[0.025]">
          <span className="font-barlow-condensed text-[50vw] font-black uppercase italic leading-none text-alkota-black whitespace-nowrap">
            1964
          </span>
        </div>
        <div className="relative z-10 mx-auto max-w-7xl w-full my-auto">
          <div className="mb-8 flex items-center gap-4">
            <div className="h-[2px] w-12 bg-alkota-orange" />
            <span className="font-ibm-plex-mono text-[10px] font-black uppercase tracking-[0.4em] text-alkota-orange">
              // AMERICAN HERITAGE. UK PRESENCE.
            </span>
          </div>
          <h1 className="font-barlow-condensed text-7xl font-black uppercase italic leading-[0.82] tracking-tighter text-alkota-black md:text-[8.5rem] mb-12 max-w-5xl">
            GLOBAL INNOVATION.<br />
            <span className="text-alkota-orange">LOCAL EXPERTISE.</span>
          </h1>
          <p className="font-inter text-xl text-alkota-silver uppercase tracking-wider leading-relaxed max-w-2xl">
            Sixty years of American engineering, backed by an established, full-service sales and support team right here in the UK.
          </p>
        </div>
      </section>

      {/* ── SECTION 1: ALKOTA UK ─────────────────────────────────── */}
      <section className="py-40 px-6 border-b border-alkota-iron bg-alkota-black">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[2px] w-8 bg-alkota-orange" />
              <span className="font-ibm-plex-mono text-[9px] font-black uppercase tracking-[0.4em] text-alkota-orange">
                // OUR UK OPERATION
              </span>
            </div>
            <h2 className="font-barlow-condensed text-6xl font-black uppercase italic leading-[0.85] tracking-tighter text-white">
              THE UK IS NOT AN<br />
              <span className="text-alkota-orange">EXPORT MARKET.</span>
            </h2>
          </div>
          <div className="lg:col-span-8 space-y-6">
            <p className="font-inter text-lg text-white leading-relaxed">
              Alkota operates globally, but our main trading areas are the USA and the UK. The UK operation is a full-service presence — we provide a complete, established sales and service team ready to support you with total turnkey solutions.
            </p>
            <p className="font-inter text-lg text-alkota-silver leading-relaxed">
              We offer complete business packages, from diesel and petrol skid-mounted pressure washers, to mobile and portable units, electric pressure washers, and advanced water recovery systems. Every solution can be custom built into bespoke van or trailer configurations.
            </p>
            <p className="font-inter text-lg text-alkota-silver leading-relaxed">
              Our UK team understands the specific requirements of the British market: UK road-legal trailer specifications, UKCA and CE certifications, 230V / 400V electrical standards, Trade Effluent legislation, Environment Agency compliance, and strict biosecurity obligations. When you work with Alkota UK, you are backed by a local team that knows the industry inside and out.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-8">
              {['Dedicated UK Service Team', 'Complete Turnkey Packages', 'UK Road Legal Trailers', 'UKCA / CE Certified', '230V & 400V Electrical', 'Trade Effluent Compliant'].map((item) => (
                <div key={item} className="flex items-center gap-3 border border-alkota-iron bg-alkota-steel p-4">
                  <div className="h-1.5 w-1.5 rounded-full bg-alkota-orange shrink-0" />
                  <span className="font-ibm-plex-mono text-[8px] font-black uppercase tracking-wider text-white">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: ORIGIN ────────────────────────────────────── */}
      <section id="origin" className="py-40 px-6 border-b border-alkota-iron">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[2px] w-8 bg-alkota-orange" />
              <span className="font-ibm-plex-mono text-[9px] font-black uppercase tracking-[0.4em] text-alkota-orange">
                // THE USA HERITAGE
              </span>
            </div>
            <div className="border-l-4 border-alkota-orange pl-8">
              <p className="font-barlow-condensed text-6xl font-black italic text-alkota-black uppercase leading-[0.85] tracking-tighter">
                ALCESTER.<br />SOUTH<br />DAKOTA.
              </p>
            </div>
          </div>
          <div className="lg:col-span-8">
            <div className="prose max-w-none">
              <p className="font-inter text-lg text-alkota-black leading-relaxed mb-6">
                Alkota. The name is not a brand invention. It is a place.
              </p>
              <p className="font-inter text-lg text-alkota-silver leading-relaxed mb-6">
                In 1964, a small company started building steam cleaners in a converted creamery in Alcester, South Dakota. The company took its name from that town and that state. Al, for Alcester. Kota, for South Dakota.
              </p>
              <p className="font-inter text-lg text-alkota-silver leading-relaxed">
                Over the years, Alkota developed and perfected technology that combines higher pressures, higher volumes, and higher temperatures, resulting in an excellent balance between performance and efficiency. Sixty years later, the creamery is long gone, but the commitment to durability and ease of maintenance remains our driving force.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: PEOPLE ────────────────────────────────────── */}
      <section className="py-40 px-6 border-b border-alkota-iron bg-alkota-bg">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-4 mb-16">
            <div className="h-[2px] w-8 bg-alkota-orange" />
            <span className="font-ibm-plex-mono text-[9px] font-black uppercase tracking-[0.4em] text-alkota-orange">
              // MASTERS OF THE TRADE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-alkota-iron border border-alkota-iron mb-20">
            {[
              { stat: '60+', label: 'Years Experience', sub: 'Innovating since 1964' },
              { stat: '17', label: 'Years Average Tenure', sub: 'Across our global manufacturing crew' },
              { stat: '100%', label: 'Dedicated Support', sub: 'Established UK sales & service' },
            ].map((item, i) => (
              <div key={i} className="bg-white p-12">
                <p className="font-barlow-condensed text-8xl font-black italic text-alkota-orange leading-none mb-4">{item.stat}</p>
                <p className="font-barlow-condensed text-2xl font-black uppercase italic text-alkota-black mb-2">{item.label}</p>
                <p className="font-inter text-[10px] text-alkota-silver uppercase tracking-widest">{item.sub}</p>
              </div>
            ))}
          </div>

          <div className="max-w-3xl space-y-6">
            <p className="font-inter text-lg text-alkota-silver leading-relaxed">
              Everything we do starts with the devotion and care of our people. A good many of our manufacturing crew and engineers have been with us for more than twenty years — some over thirty.
            </p>
            <p className="font-inter text-lg text-alkota-silver leading-relaxed">
              That means we know the industry and what it takes to deliver the perfect fit better than just about anyone. Our creative engineering staff has distinguished us as the leader in custom-designed pressure washers for unique applications.
            </p>
            <p className="font-inter text-lg text-alkota-black leading-relaxed font-semibold">
              When you take an Alkota pressure washer to work, you take more wisdom, know-how, and back-up than any other equipment in the business.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: TECHNOLOGY ────────────────────────────────── */}
      <section className="py-40 px-6 border-b border-alkota-iron bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-4 mb-16">
            <div className="h-[2px] w-8 bg-alkota-orange" />
            <span className="font-ibm-plex-mono text-[9px] font-black uppercase tracking-[0.4em] text-alkota-orange">
              // THE TECHNOLOGY
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-alkota-iron border border-alkota-iron">
            {[
              {
                title: 'The Hydro-Insulated Coil',
                body: "Alkota's most significant engineering contribution to the industry. The hydro-insulated coil wraps cold water around the outside of the heating coil, creating a protective layer that protects the operator from a hot surface and pre-heats incoming water to increase efficiency.",
                stat: '7yr',
                statLabel: 'Coil Warranty',
              },
              {
                title: 'The Wayne Combustion Partnership',
                body: "Alkota has worked directly with Wayne Combustion to develop burner designs that are more reliable, fuel-efficient, and user-friendly than the competition. When you light an Alkota burner, you benefit from decades of co-developed engineering.",
                stat: '60yr',
                statLabel: 'Partnership',
              },
              {
                title: 'Schedule 80 Coil Pipe',
                body: "Every Alkota hot water coil is wound from Schedule 80 high-test steel pipe to ASTM A53 standards. It resists the thermal cycling, pressure surges, and chemical exposure that kills lesser coils. Sixty years of coil engineering in every unit.",
                stat: 'A53',
                statLabel: 'ASTM Standard',
              },
            ].map((card, i) => (
              <div key={i} className="bg-alkota-bg p-10 flex flex-col">
                <div className="mb-8">
                  <p className="font-barlow-condensed text-6xl font-black italic text-alkota-orange leading-none">{card.stat}</p>
                  <p className="font-ibm-plex-mono text-[8px] font-black uppercase tracking-widest text-alkota-silver mt-1">{card.statLabel}</p>
                </div>
                <h3 className="font-barlow-condensed text-2xl font-black uppercase italic text-alkota-black mb-6 leading-tight">{card.title}</h3>
                <p className="font-inter text-sm text-alkota-silver leading-relaxed flex-1">{card.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <Link
              href="/technology"
              className="inline-flex items-center gap-3 font-ibm-plex-mono text-[10px] font-black uppercase tracking-widest text-alkota-orange hover:text-alkota-black transition-colors"
            >
              Full Technology Breakdown <ArrowRight className="h-3 w-3" />
            </Link>
            <Link
              href="/resources/case-studies/antarctica-lake-whillans"
              className="inline-flex items-center gap-3 font-ibm-plex-mono text-[10px] font-black uppercase tracking-widest text-alkota-black hover:text-alkota-orange transition-colors"
            >
              Read Antarctica Field Proof →
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="py-40 px-6 bg-alkota-orange relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white opacity-[0.04] skew-x-12 translate-x-1/2" />
        <div className="relative z-10 mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-12">
          <div>
            <h2 className="font-barlow-condensed text-6xl font-black uppercase italic tracking-tighter text-white leading-[0.85] md:text-7xl mb-4">
              SEE THE FULL<br />CAPABILITY.
            </h2>
            <p className="font-inter text-white/80 text-lg uppercase tracking-wider">
              Bespoke builds, wash plants, water recovery and beyond.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <Link
              href="/bespoke"
              className="inline-flex items-center justify-center gap-3 bg-white text-alkota-black px-10 py-5 font-black uppercase tracking-[0.3em] text-[11px] hover:bg-alkota-black hover:text-white transition-all"
            >
              Bespoke Builds <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 border-2 border-white text-white px-10 py-5 font-black uppercase tracking-[0.3em] text-[11px] hover:bg-white hover:text-alkota-black transition-all"
            >
              Contact Our UK Team
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
