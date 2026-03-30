import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
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
      <section className="relative pt-40 pb-40 px-6 overflow-hidden border-b border-alkota-iron">
        <div className="absolute top-0 right-0 pointer-events-none select-none opacity-[0.025]">
          <span className="font-barlow-condensed text-[50vw] font-black uppercase italic leading-none text-alkota-black whitespace-nowrap">
            1964
          </span>
        </div>
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-8 flex items-center gap-4">
            <div className="h-[2px] w-12 bg-alkota-orange" />
            <span className="font-ibm-plex-mono text-[10px] font-black uppercase tracking-[0.4em] text-alkota-orange">
              // CLEANING SINCE 1964
            </span>
          </div>
          <h1 className="font-barlow-condensed text-7xl font-black uppercase italic leading-[0.82] tracking-tighter text-alkota-black md:text-[11rem] mb-12 max-w-5xl">
            BUILT IN A CREAMERY.{' '}
            <span className="text-alkota-orange">SENT TO ANTARCTICA.</span>
          </h1>
          <p className="font-inter text-xl text-alkota-silver uppercase tracking-wider leading-relaxed max-w-2xl">
            Sixty years of American engineering. Worldwide distribution. The same family philosophy since day one.
          </p>
        </div>
      </section>

      {/* ── SECTION 1: ORIGIN ────────────────────────────────────── */}
      <section id="origin" className="py-40 px-6 border-b border-alkota-iron">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[2px] w-8 bg-alkota-orange" />
              <span className="font-ibm-plex-mono text-[9px] font-black uppercase tracking-[0.4em] text-alkota-orange">
                // WHERE THE NAME COMES FROM
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
                In 1964, a small company started building steam cleaners in a converted creamery in Alcester, South Dakota — a rural town of a few hundred people on the Great Northern Plains. The company took its name from that town and that state. Al, for Alcester. Kota, for South Dakota.
              </p>
              <p className="font-inter text-lg text-alkota-silver leading-relaxed">
                Sixty years later, Alkota still builds every machine in Alcester. The creamery is long gone, but the town is not. And neither is the philosophy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: 1983 ──────────────────────────────────────── */}
      <section className="py-40 px-6 border-b border-alkota-iron bg-alkota-black">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-4 mb-16">
            <div className="h-[2px] w-8 bg-alkota-orange" />
            <span className="font-ibm-plex-mono text-[9px] font-black uppercase tracking-[0.4em] text-alkota-orange">
              // SEVEN MEN. ONE DECISION.
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
            <div className="lg:col-span-4">
              <p className="font-barlow-condensed text-[12rem] font-black italic text-alkota-orange leading-none tracking-tighter opacity-20">
                1983
              </p>
            </div>
            <div className="lg:col-span-8 space-y-6">
              <p className="font-inter text-lg text-white leading-relaxed">
                In 1983, a competing pressure washer company in Vermillion, South Dakota was sold to an outside bidder. Seven of its key employees — engineers, craftsmen, people who had spent their careers in the industry — looked at each other and made a different choice.
              </p>
              <p className="font-inter text-lg text-alkota-silver leading-relaxed">
                They pooled together and bought Alkota Manufacturing. Not to extract value. Not to grow quickly and sell. To build the best pressure washing equipment in America.
              </p>
              <p className="font-inter text-lg text-alkota-silver leading-relaxed">
                Their shared philosophy was simple: treat customers right. Treat employees right. The rest will follow.
              </p>
              <p className="font-barlow-condensed text-2xl font-black italic text-alkota-orange uppercase tracking-tight">
                Two of those seven are still involved with the company today.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: PEOPLE ────────────────────────────────────── */}
      <section className="py-40 px-6 border-b border-alkota-iron">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-4 mb-16">
            <div className="h-[2px] w-8 bg-alkota-orange" />
            <span className="font-ibm-plex-mono text-[9px] font-black uppercase tracking-[0.4em] text-alkota-orange">
              // THE PEOPLE WHO STAY
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-alkota-iron border border-alkota-iron mb-20">
            {[
              { stat: '90', label: 'Employees', sub: 'All based in Alcester, South Dakota' },
              { stat: '17', label: 'Years average tenure', sub: 'Many over 20, some over 40 years' },
              { stat: '150+', label: 'Years combined engineering experience', sub: 'On the active build team' },
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
              Alkota has 90 employees. The average tenure is 17 years. Many have been with the company for over 20 years. Some for 30 years. A handful have been there for more than four decades.
            </p>
            <p className="font-inter text-lg text-alkota-silver leading-relaxed">
              The engineers and craftsmen who build Alkota machines know the industry and what it takes to deliver the right product better than almost anyone alive. That knowledge does not get outsourced. It does not retire when one person leaves. It compounds.
            </p>
            <p className="font-inter text-lg text-alkota-black leading-relaxed font-semibold">
              The combined engineering experience on the Alkota build team runs to over 150 years. When you have a problem, you have access to the people who designed the machine.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: HOW MACHINES ARE MADE ───────────────────── */}
      <section className="py-40 px-6 border-b border-alkota-iron bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-4 mb-16">
            <div className="h-[2px] w-8 bg-alkota-orange" />
            <span className="font-ibm-plex-mono text-[9px] font-black uppercase tracking-[0.4em] text-alkota-orange">
              // HOW EVERY MACHINE IS MADE
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div className="space-y-6">
              <p className="font-inter text-lg text-alkota-black leading-relaxed">
                Every Alkota machine starts as raw sheet metal — 11 gauge to 20 gauge — cut, bent, welded and punched in the Alcester factory. Angle iron, rod, tubing and pipe strengthen the frame. The combustion chamber, which Alkota engineers consider the critical differentiator in any hot water machine, is fabricated in house.
              </p>
              <p className="font-inter text-lg text-alkota-silver leading-relaxed">
                External components — pumps, motors, engines — are sourced from trusted American manufacturers. They are assembled to the frame by Alkota's own craftsmen.
              </p>
              <p className="font-inter text-lg text-alkota-silver leading-relaxed">
                Every machine is tested before it leaves Alcester. Pressure checked. Flow verified. Electrical checked. Visually inspected for fit and finish. Standard stock orders turn around in five business days.
              </p>
            </div>
            <div className="bg-alkota-black p-12 flex items-center justify-center">
              <div className="text-center">
                <p className="font-barlow-condensed text-[10rem] font-black italic text-alkota-orange leading-none">25%</p>
                <p className="font-barlow-condensed text-3xl font-black uppercase italic text-white mt-4 leading-tight">
                  of everything Alkota makes is a custom build.
                </p>
                <p className="font-inter text-[10px] text-alkota-silver uppercase tracking-widest mt-6 leading-relaxed">
                  That figure is not a marketing claim. It is what the factory actually produces.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: TECHNOLOGY ────────────────────────────────── */}
      <section className="py-40 px-6 border-b border-alkota-iron bg-alkota-bg">
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
                body: "Alkota's most significant engineering contribution to the industry. The hydro-insulated coil wraps cold water around the outside of the heating coil, creating a protective layer that does two things simultaneously: it protects the operator from a hot surface, and it pre-heats the incoming water before it enters the coil, increasing efficiency. Combined with the Soft Damping System — which protects the coil, pump and all high-pressure components from vibration and thermal stress — the result is a 7-year coil warranty. Industry standard is 1–2 years.",
                stat: '7yr',
                statLabel: 'Coil Warranty',
              },
              {
                title: 'The Wayne Combustion Partnership',
                body: "Alkota has worked directly with Wayne Combustion — the leading US combustion technology manufacturer — to develop burner designs that are more reliable, more fuel-efficient and more user-friendly than anything the competition offers. The Wayne-Alkota oil burner system has become an industry benchmark. When you light an Alkota burner, you are benefiting from decades of co-developed engineering.",
                stat: '60yr',
                statLabel: 'Partnership',
              },
              {
                title: 'Schedule 80 Coil Pipe',
                body: "Every Alkota hot water coil is wound from Schedule 80 high-test steel pipe to ASTM A53 standards. Schedule 80 is heavier walled than standard pipe — it resists the thermal cycling, pressure surges and chemical exposure that kills lesser coils in months. The stainless steel wrapper protects the outside. The hydro-insulated wrap protects the inside. Sixty years of coil engineering in every unit.",
                stat: 'A53',
                statLabel: 'ASTM Standard',
              },
            ].map((card, i) => (
              <div key={i} className="bg-white p-10 flex flex-col">
                <div className="mb-8">
                  <p className="font-barlow-condensed text-6xl font-black italic text-alkota-orange leading-none">{card.stat}</p>
                  <p className="font-ibm-plex-mono text-[8px] font-black uppercase tracking-widest text-alkota-silver mt-1">{card.statLabel}</p>
                </div>
                <h3 className="font-barlow-condensed text-2xl font-black uppercase italic text-alkota-black mb-6 leading-tight">{card.title}</h3>
                <p className="font-inter text-sm text-alkota-silver leading-relaxed flex-1">{card.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link
              href="/technology"
              className="inline-flex items-center gap-3 font-ibm-plex-mono text-[10px] font-black uppercase tracking-widest text-alkota-orange hover:text-alkota-black transition-colors"
            >
              Full Technology Breakdown <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: PROOF OF CAPABILITY ──────────────────────── */}
      <section className="py-40 px-6 border-b border-alkota-iron bg-alkota-black">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[2px] w-8 bg-alkota-orange" />
            <span className="font-ibm-plex-mono text-[9px] font-black uppercase tracking-[0.4em] text-alkota-orange">
              // THE BUILDS THAT PROVE IT
            </span>
          </div>
          <p className="font-inter text-lg text-alkota-silver uppercase tracking-wider mb-20 max-w-xl">
            Custom is not a word Alkota uses lightly. Here is what it actually means.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-alkota-iron border border-alkota-iron">
            {[
              {
                eyebrow: '// SUBGLACIAL SCIENCE',
                heading: 'Half a mile of ice. A subglacial lake. An Alkota machine.',
                body: "In 2013, scientists from the University of Nebraska-Lincoln used a battery of custom-built Alkota pressure washing machines as the centrepiece of a hot water drill system. Mounted on sleds and deployed on the Antarctic ice sheet, the machines bored through half a mile of ancient ice to reach a subglacial lake beneath — the first time this had ever been achieved. The project was a genuine scientific breakthrough, reported internationally. It required machines that could operate in conditions that no standard equipment would survive. Alkota built them.",
                stat: '½ mile',
                statLabel: 'of Antarctic ice',
              },
              {
                eyebrow: '// URBAN INFRASTRUCTURE',
                heading: "Philadelphia's water mains. Philadelphia's subways. Philadelphia's streets.",
                body: "Alkota dealer Brown's Equipment in Philadelphia has built custom machines for the city's transit authority — cleaning elevated rail platforms and subway infrastructure, delivering hot water over 400 feet at 5 GPM. They built machines for the city's sewer jetting operations — 8 to 10 GPM at extreme pressure to clear blocked city drains. They matched Alkota trailers to the Philadelphia Transit Department's specific shade of orange — so distinctive that when a trailer was stolen, an off-duty worker spotted it driving home and had it recovered. That is what a real custom build looks like.",
                stat: '400ft',
                statLabel: 'hot water delivery',
              },
              {
                eyebrow: '// UNEXPECTED APPLICATIONS',
                heading: 'Batman. Fort Lauderdale. Whatever needs cleaning.',
                body: "Alkota has provided custom steam machines for film production special effects — including Batman and We're the Millers. They have built custom trailer systems to clean the streets of Fort Lauderdale after spring break. As Joe Bjorkman, Alkota's VP, puts it: there are industries in every letter of the alphabet that use our product if something needs cleaning. No job is too big or too small.",
                stat: 'A–Z',
                statLabel: 'industries served',
              },
            ].map((card, i) => (
              <div key={i} className="bg-alkota-black p-10 flex flex-col border-alkota-iron hover:bg-alkota-steel/10 transition-colors group">
                <span className="font-ibm-plex-mono text-[8px] font-black uppercase tracking-widest text-alkota-orange mb-8">{card.eyebrow}</span>
                <p className="font-barlow-condensed text-5xl font-black italic text-alkota-orange leading-none mb-2">{card.stat}</p>
                <p className="font-ibm-plex-mono text-[8px] uppercase tracking-widest text-alkota-silver mb-8">{card.statLabel}</p>
                <h3 className="font-barlow-condensed text-2xl font-black uppercase italic text-white leading-tight mb-6">{card.heading}</h3>
                <p className="font-inter text-sm text-alkota-silver leading-relaxed flex-1">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 7: ALKOTA UK ─────────────────────────────────── */}
      <section className="py-40 px-6 border-b border-alkota-iron bg-alkota-bg">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[2px] w-8 bg-alkota-orange" />
              <span className="font-ibm-plex-mono text-[9px] font-black uppercase tracking-[0.4em] text-alkota-orange">
                // ALKOTA UK
              </span>
            </div>
            <h2 className="font-barlow-condensed text-6xl font-black uppercase italic leading-[0.85] tracking-tighter text-alkota-black">
              THE UK IS NOT AN<br />
              <span className="text-alkota-orange">EXPORT MARKET.</span>
            </h2>
          </div>
          <div className="lg:col-span-8 space-y-6">
            <p className="font-inter text-lg text-alkota-black leading-relaxed">
              Alkota's primary markets are the United States and the United Kingdom. The UK operation is the only international market where Alkota operates as a full-service presence — not just a product catalogue but a full bespoke build, water recovery, wash plant and service capability.
            </p>
            <p className="font-inter text-lg text-alkota-silver leading-relaxed">
              The UK industrial cleaning market has specific requirements that the American market does not share: UK road legal trailer specifications, UKCA and CE certifications, 230V / 400V electrical standards, trade effluent legislation, Environment Agency compliance, and the biosecurity obligations that govern matting and equipment movement across sites.
            </p>
            <p className="font-inter text-lg text-alkota-silver leading-relaxed">
              Alkota UK is built around these requirements. Every trailer system is UK road legal. Every electrical configuration is to UK standards. Every water recovery system is specified for UK regulatory compliance.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-8">
              {['UK Road Legal Trailers', 'UKCA / CE Certified', '230V & 400V Electrical', 'Trade Effluent Compliant', 'EA PPG2 Specification', 'Biosecurity Capable'].map((item) => (
                <div key={item} className="flex items-center gap-3 border border-alkota-iron bg-white p-4">
                  <div className="h-1.5 w-1.5 rounded-full bg-alkota-orange shrink-0" />
                  <span className="font-ibm-plex-mono text-[8px] font-black uppercase tracking-wider text-alkota-black">{item}</span>
                </div>
              ))}
            </div>
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
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
