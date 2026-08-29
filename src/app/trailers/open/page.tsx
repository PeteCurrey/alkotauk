'use client';

import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import {
  ArrowRight, ShieldCheck, Droplets, Zap, Shield,
  ChevronRight, CheckCircle2, Wrench, Eye, Sparkles, Layers,
  Compass, Maximize2
} from 'lucide-react';

const ANATOMY_POINTS = [
  {
    num: '01',
    title: 'Alkota High-Pressure Skid Unit',
    desc: 'Rubber-isolated steel skid mounting an Alkota industrial hot water machine with Schedule 80 down-draft combustion chamber and ceramic triplex plunger pump.',
    specs: 'Up to 275 Bar · Up to 130°C Hot Water · 12V DC / Petrol / Diesel'
  },
  {
    num: '02',
    title: 'Baffled Polyethylene Reservoir',
    desc: 'Heavy-gauge UV-stabilised poly tank with internal anti-surge baffles. Prevents liquid sloshing and stabilises tow dynamics during transit on UK motorways.',
    specs: '500L, 1,000L, 1,500L or 2,000L · Top inspection hatch · 2" drain valve'
  },
  {
    num: '03',
    title: 'Dual 12V Electric Auto-Rewind Reels',
    desc: 'High-grade stainless steel fluid paths with industrial 12V rewind motors, pushbutton switches, and adjustable drag brakes for rapid 50m–100m deployment.',
    specs: 'Dual 50m / 100m wire-braided hose · 400 Bar rated · Low-effort retrieval'
  },
  {
    num: '04',
    title: 'Consolidated Fuel & Generator Bay',
    desc: 'Integrated steel bunding with long-range fuel cell supplying both burner and engine, alongside optional 5kVA super-silent auxiliary power generator.',
    specs: '80L Diesel Capacity · Single-fuel site compliance · Vibration damping'
  },
  {
    num: '05',
    title: 'Lockable Chequerplate Tool Vault',
    desc: 'Fabricated 3mm aluminium 5-bar chequerplate storage chest with twin gas struts, waterproof automotive weather seals, and high-security recessed T-locks.',
    specs: 'Lance rack mounts · Rotary deck cleaner stowage · Chemical jug bays'
  },
  {
    num: '06',
    title: 'Telescopic LED Scene Lighting Mast',
    desc: '2.5-metre pneumatic or manual mast fitted with twin 6000K LED floodlights providing 30m+ perimeter illumination for unlit night-shift operations.',
    specs: '10,000 Lumens · 12V or 230V · 360° pan and 90° tilt adjustment'
  }
];

export default function OpenTrailerPage() {
  return (
    <main className="bg-white text-alkota-black min-h-screen">
      <Navigation />

      {/* ─── HERO SECTION (CINEMATIC DARK) ─────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex flex-col justify-end overflow-hidden bg-[#0A0A0A] text-white border-b border-alkota-iron pt-32 pb-20 px-6">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/assets/products/trailer-single.png')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-[#0A0A0A]/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/85 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="h-[2px] w-8 bg-alkota-orange" />
              <span className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-[0.4em] text-alkota-orange">
                Open-Deck Trailer Rig Architecture
              </span>
            </div>

            <h1 className="font-barlow-condensed text-6xl md:text-8xl font-black uppercase italic text-white leading-[0.9] tracking-tight mb-6">
              EVERYTHING YOU NEED.<br />
              <span className="text-alkota-orange">NOTHING IN THE WAY.</span>
            </h1>

            <p className="text-alkota-silver text-lg md:text-xl leading-relaxed mb-10 max-w-2xl font-light">
              Maximum operational speed, 360° component access, and unrestricted natural airflow. Engineered for rapid washdown deployment in commercial haulage yards, agricultural estates, and highway maintenance.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/trailers/configure?format=open-deck"
                className="inline-flex items-center justify-center gap-3 bg-alkota-orange px-8 py-4 text-xs font-black uppercase tracking-[0.25em] text-white hover:bg-alkota-orange/90 transition-all group"
              >
                <span>Configure Open-Deck Rig</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/trailers/enclosed"
                className="inline-flex items-center justify-center gap-3 border border-white/20 px-8 py-4 text-xs font-black uppercase tracking-[0.25em] text-white/80 hover:text-white hover:border-white/40 transition-all"
              >
                Compare Enclosed Plant Room
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── 02 PHILOSOPHY & ANATOMY (WARM STONE LIGHT) ────────────────────── */}
      <section className="py-24 px-6 bg-[#F7F7F5] border-b border-[#E5E5E0]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.3em] text-alkota-orange font-bold block mb-3">
              01 // System Anatomy
            </span>
            <h2 className="font-barlow-condensed text-4xl md:text-5xl font-black uppercase italic text-alkota-black leading-tight mb-6">
              ENGINEERED FOR IMMEDIATE WORKING DEPLOYMENT.
            </h2>
            <p className="text-[#555] text-base md:text-lg leading-relaxed font-light">
              On an open-deck Alkota rig, there are no doors to unlatch or panels to remove before starting work. Every trigger gun, hose reel, fuel filler, and control switch is immediately accessible from ground level within 5 seconds of arriving on site.
            </p>
          </div>

          {/* Subsystem Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ANATOMY_POINTS.map(point => (
              <div key={point.num} className="bg-white border border-[#E0E0DC] p-8 flex flex-col justify-between hover:border-alkota-orange transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-ibm-plex-mono text-xs font-bold text-alkota-orange">
                      SUBSYSTEM {point.num}
                    </span>
                    <span className="h-2 w-2 rounded-full bg-alkota-orange" />
                  </div>
                  <h3 className="font-barlow-condensed text-2xl font-bold uppercase text-alkota-black mb-3">
                    {point.title}
                  </h3>
                  <p className="text-xs text-[#666] leading-relaxed mb-6 font-light">
                    {point.desc}
                  </p>
                </div>
                <div className="pt-4 border-t border-[#F0F0EC] font-ibm-plex-mono text-[10px] text-[#444] font-medium">
                  {point.specs}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 03 WHY OPEN DECK (WARM NEUTRAL) ──────────────────────────────── */}
      <section className="py-24 px-6 bg-[#EFEFEA] border-b border-[#DDD]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.3em] text-alkota-orange font-bold block mb-3">
              02 // Operational Advantages
            </span>
            <h2 className="font-barlow-condensed text-4xl md:text-5xl font-black uppercase italic text-alkota-black leading-tight mb-6">
              UNRESTRICTED COOLING & MAXIMUM WATER PAYLOAD.
            </h2>
            <div className="space-y-6 text-[#555] text-sm leading-relaxed font-light">
              <p>
                <strong className="text-alkota-black font-semibold">Natural Powerplant Airflow:</strong> Heavy-duty Vanguard V-Twin and Kubota diesel powerplants breathe freely with zero thermal build-up, ensuring continuous all-day performance in ambient summer heat.
              </p>
              <p>
                <strong className="text-alkota-black font-semibold">Maximum Useful Payload:</strong> By omitting heavy GRP or insulated box bodies, an open deck trailer saves up to 400kg of unladen tare mass. This weight reserve is converted directly into additional water storage capacity.
              </p>
              <p>
                <strong className="text-alkota-black font-semibold">Instant Visual Inspection:</strong> Fuel levels, water drawdown, pump oil clarity, and filter condition can all be verified with a single glance around the trailer bed before each shift.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#D5D5D0] p-8 shadow-sm">
            <h3 className="font-barlow-condensed text-2xl font-bold uppercase text-alkota-black mb-4">
              Open-Deck Chassis Engineering
            </h3>
            <div className="space-y-3 font-mono text-xs text-[#555]">
              <div className="flex justify-between border-b border-[#EAEAEA] pb-2">
                <span>Chassis Material</span>
                <span className="text-alkota-black font-bold">Hot-Dip Galvanised Structural Steel</span>
              </div>
              <div className="flex justify-between border-b border-[#EAEAEA] pb-2">
                <span>Axle Configuration</span>
                <span className="text-alkota-black font-bold">Single (1,500kg) or Tandem (2,700–3,500kg)</span>
              </div>
              <div className="flex justify-between border-b border-[#EAEAEA] pb-2">
                <span>Braking System</span>
                <span className="text-alkota-black font-bold">Overrun Inertia Braking with Auto-Reverse</span>
              </div>
              <div className="flex justify-between border-b border-[#EAEAEA] pb-2">
                <span>Decking Surface</span>
                <span className="text-alkota-black font-bold">Aluminium 5-Bar Chequerplate / Phenolic Board</span>
              </div>
              <div className="flex justify-between">
                <span>Road Certification</span>
                <span className="text-alkota-orange font-bold">UK IVA / Type Approval Certified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 04 REAL BUILD SPOTLIGHT (CINEMATIC DARK) ─────────────────────── */}
      <section className="py-24 px-6 bg-[#0E0E0E] text-white border-b border-alkota-iron">
        <div className="max-w-7xl mx-auto">
          <div className="border border-alkota-iron bg-[#141414] p-8 md:p-12 grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.3em] text-alkota-orange font-bold block mb-2">
                Verified Open-Deck Build Spotlight
              </span>
              <h3 className="font-barlow-condensed text-3xl md:text-4xl font-black uppercase italic text-white mb-4">
                Twin-Operator Haulage Depot Rig
              </h3>
              <p className="text-alkota-silver text-sm leading-relaxed mb-6 font-light">
                Delivered to a major haulage hub in Yorkshire. Open-deck architecture allows two operators to draw high-pressure hot water simultaneously from opposite sides of the rig, washing 40+ articulated trucks per shift.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/trailers/builds/twin-operator-haulage-depot-rig"
                  className="inline-flex items-center gap-2 text-xs font-ibm-plex-mono uppercase tracking-widest text-alkota-orange hover:underline font-bold"
                >
                  Read Technical Case Study →
                </Link>
                <Link
                  href="/trailers/configure?format=open-deck&operators=2"
                  className="inline-flex items-center gap-2 text-xs font-ibm-plex-mono uppercase tracking-widest text-[#888] hover:text-white"
                >
                  Configure Similar Rig →
                </Link>
              </div>
            </div>
            <div className="relative aspect-[4/3] bg-[#0A0A0A] border border-[#222] overflow-hidden">
              <img
                src="/assets/products/trailer-single.png"
                alt="Twin Operator Haulage Depot Rig"
                className="w-full h-full object-contain p-6"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── 05 FAQS (LIGHT STONE) ────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#F7F7F5] border-b border-[#E5E5E0]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.3em] text-alkota-orange font-bold block mb-2">
              Frequently Asked Questions
            </span>
            <h2 className="font-barlow-condensed text-3xl md:text-4xl font-black uppercase text-alkota-black">
              Open-Deck System FAQs
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'How are open-deck trailers protected against British winter weather?',
                a: 'All Alkota open trailers are equipped with lockable heavy-gauge aluminium tool vaults and weather-resistant industrial electrical enclosures. For severe freezing weather, we install anti-freeze glycol bypass loops allowing rapid winter purging in under 3 minutes.'
              },
              {
                q: 'Can equipment on an open trailer be secured against theft on site?',
                a: 'Yes. Machinery skids are bolted directly through the chassis frame with anti-tamper fixings. Lance holders, tools, and chemicals are housed inside lockable aluminium chequerplate vaults fitted with multi-point deadbolts.'
              },
              {
                q: 'What is the maximum water capacity on an open deck trailer?',
                a: 'On a 3,500kg MAM tandem chassis, an open deck configuration can carry up to 2,000 litres of water while remaining within legal UK highway payload limits.'
              }
            ].map(faq => (
              <div key={faq.q} className="border border-[#E0E0DC] bg-white p-6">
                <h4 className="font-barlow-condensed text-xl font-bold uppercase text-alkota-black mb-2">{faq.q}</h4>
                <p className="text-xs text-[#666] leading-relaxed font-light">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 06 FINAL CTA (CINEMATIC DARK) ─────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#0A0A0A] text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-barlow-condensed text-4xl md:text-6xl font-black uppercase italic text-white leading-tight mb-4">
            SPECIFY AN OPEN-DECK ALKOTA RIG.
          </h2>
          <p className="text-alkota-silver text-sm md:text-base leading-relaxed mb-8 font-light">
            Build your system in our 13-step configurator with live Maximum Authorised Mass (MAM) and water endurance calculation.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/trailers/configure?format=open-deck"
              className="inline-flex items-center justify-center gap-3 bg-alkota-orange px-8 py-4 text-xs font-black uppercase tracking-[0.25em] text-white hover:bg-alkota-orange/90 transition-all group"
            >
              <span>Build Open-Deck Rig</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/trailers"
              className="inline-flex items-center justify-center gap-3 border border-white/20 px-8 py-4 text-xs font-black uppercase tracking-[0.25em] text-white/80 hover:text-white transition-all"
            >
              Explore All Trailers
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
