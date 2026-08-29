'use client';

import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import {
  ArrowRight, ShieldCheck, Lock, Shield, Volume2,
  ChevronRight, ThermometerSnowflake, CheckCircle2, Box, Eye,
  Sparkles, Layers, PaintBucket
} from 'lucide-react';

const ENCLOSED_SUBSYSTEMS = [
  {
    num: '01',
    title: 'Cleaning Power Core',
    subtitle: 'High-Pressure Hot Water / Steam Skid',
    desc: 'Rubber-mounted Alkota industrial pressure washer fitted with a high-efficiency Schedule 80 down-draft combustion chamber. Exhaust gasses are vented safely through heat-shielded roof cowls with acoustic dampening.',
    specs: 'Up to 275 Bar · Up to 130°C · Roof Cowled Exhaust'
  },
  {
    num: '02',
    title: 'Protected Water Storage',
    subtitle: 'Baffled Internal Poly Reservoir',
    desc: 'Up to 2,000-litre baffled polyethylene water tank completely housed inside the insulated enclosure, shielding water reserves from direct sun in summer and sub-zero frost freezing in winter.',
    specs: '500L to 2,000L · Insulated Enclosure · Multi-Baffled'
  },
  {
    num: '03',
    title: 'Through-Wall Hose Management',
    subtitle: 'Internal Electric Reels & Fairleads',
    desc: '12V high-torque electric rewind reels mounted securely against the rear bulkheads. High-pressure hoses deploy cleanly through stainless steel roller fairleads without opening the main enclosure doors.',
    specs: 'Dual 50m / 100m Hose · Roller Fairleads · Sealed In Transit'
  },
  {
    num: '04',
    title: 'Autonomous Power Generation',
    subtitle: 'Silent Diesel Generator & Battery Bank',
    desc: 'Super-silent onboard diesel generator (5.0 kVA to 10.0 kVA) supplying independent 230V power for vacuum recovery blowers, battery buffer charging, and internal 6000K LED workshop lighting.',
    specs: '5kVA to 10kVA Super-Silent · 230V Sockets · Buffer Bank'
  },
  {
    num: '05',
    title: 'Environmental Closed-Loop Recovery',
    subtitle: 'Negative-Void VFS Filtration Plant',
    desc: 'Integrated VACGD high-suction vacuum blower and 8-VFS-1 filtration chamber for full on-board wastewater capture, oil-water separation down to <5 mg/L, and continuous closed-loop recycling.',
    specs: 'BS EN 858 Class 1 · <5 mg/L Hydrocarbons · Continuous Recycle'
  },
  {
    num: '06',
    title: 'Operator Walk-In Environment',
    subtitle: 'Full-Height Walkway & LED Workspace',
    desc: 'Ergonomic walk-in interior with full standing headroom, 6000K overhead LED strip lighting, non-slip marine flooring, chemical storage bunds, and high-security multi-point deadbolts.',
    specs: 'Full Headroom · Marine Flooring · Deadbolt Security'
  }
];

export default function EnclosedTrailerPage() {
  return (
    <main className="bg-white text-alkota-black min-h-screen">
      <Navigation />

      {/* ─── HERO SECTION (CINEMATIC DARK) ─────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex flex-col justify-end overflow-hidden bg-[#080808] text-white border-b border-alkota-iron pt-32 pb-20 px-6">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/assets/products/stationary-gas-fired.png')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/80 to-[#080808]/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/85 to-transparent" />
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
                Enclosed Plant Room Architecture
              </span>
            </div>

            <h1 className="font-barlow-condensed text-6xl md:text-8xl font-black uppercase italic text-white leading-[0.9] tracking-tight mb-6">
              A MOBILE PLANT ROOM<br />
              <span className="text-alkota-orange">ON WHEELS.</span>
            </h1>

            <p className="text-alkota-silver text-lg md:text-xl leading-relaxed mb-10 max-w-2xl font-light">
              Maximum security, all-weather thermal insulation, and complete acoustic containment. A self-contained industrial facility designed for corporate fleets, municipal contractors, and environmental recovery operations.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/trailers/configure?format=enclosed"
                className="inline-flex items-center justify-center gap-3 bg-alkota-orange px-8 py-4 text-xs font-black uppercase tracking-[0.25em] text-white hover:bg-alkota-orange/90 transition-all group"
              >
                <span>Configure Enclosed Plant Room</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/trailers/open"
                className="inline-flex items-center justify-center gap-3 border border-white/20 px-8 py-4 text-xs font-black uppercase tracking-[0.25em] text-white/80 hover:text-white hover:border-white/40 transition-all"
              >
                Compare Open Deck Rig
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── 02 WHY ENCLOSED (WARM STONE LIGHT) ────────────────────────────── */}
      <section className="py-24 px-6 bg-[#F7F7F5] border-b border-[#E5E5E0]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.3em] text-alkota-orange font-bold block mb-3">
              01 // Architectural Distinction
            </span>
            <h2 className="font-barlow-condensed text-4xl md:text-5xl font-black uppercase italic text-alkota-black leading-tight mb-6">
              WHY BUILD AN ENCLOSED MOBILE PLANT ROOM?
            </h2>
            <p className="text-[#555] text-base md:text-lg leading-relaxed font-light">
              An enclosed trailer transforms mobile cleaning equipment from exposed machinery into a professional, weather-sealed, and acoustically insulated operations hub.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-[#E0E0DC] p-6 shadow-sm">
              <Lock className="h-6 w-6 text-alkota-orange mb-4" />
              <h3 className="font-barlow-condensed text-xl font-bold uppercase text-alkota-black mb-2">High-Security Vault</h3>
              <p className="text-xs text-[#666] leading-relaxed font-light">High-value industrial machinery, high-pressure hose reels, and diagnostic tools are locked behind deadbolted steel and composite doors.</p>
            </div>

            <div className="bg-white border border-[#E0E0DC] p-6 shadow-sm">
              <ThermometerSnowflake className="h-6 w-6 text-alkota-orange mb-4" />
              <h3 className="font-barlow-condensed text-xl font-bold uppercase text-alkota-black mb-2">Thermal Protection</h3>
              <p className="text-xs text-[#666] leading-relaxed font-light">Insulated composite panels and internal heating options prevent winter freeze-up, eliminating frost downtime during cold UK winters.</p>
            </div>

            <div className="bg-white border border-[#E0E0DC] p-6 shadow-sm">
              <Volume2 className="h-6 w-6 text-alkota-orange mb-4" />
              <h3 className="font-barlow-condensed text-xl font-bold uppercase text-alkota-black mb-2">Acoustic Containment</h3>
              <p className="text-xs text-[#666] leading-relaxed font-light">Sound-dampening acoustic panelling dramatically reduces operational noise, enabling early-morning municipal and urban cleaning.</p>
            </div>

            <div className="bg-white border border-[#E0E0DC] p-6 shadow-sm">
              <PaintBucket className="h-6 w-6 text-alkota-orange mb-4" />
              <h3 className="font-barlow-condensed text-xl font-bold uppercase text-alkota-black mb-2">Fleet Branding</h3>
              <p className="text-xs text-[#666] leading-relaxed font-light">Smooth exterior GRP panels provide a premium canvas for company liveries, presenting an authoritative corporate profile on client sites.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 03 6-SUBSYSTEM WALKTHROUGH (WARM NEUTRAL) ─────────────────────── */}
      <section className="py-24 px-6 bg-[#EFEFEA] border-b border-[#DDD]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.3em] text-alkota-orange font-bold block mb-3">
              02 // Interior Engineering
            </span>
            <h2 className="font-barlow-condensed text-4xl md:text-5xl font-black uppercase italic text-alkota-black leading-tight mb-6">
              THE 6-SUBSYSTEM INTERIOR ARCHITECTURE.
            </h2>
            <p className="text-[#555] text-base leading-relaxed font-light">
              Step inside the plant room. Every system is engineered into dedicated structural zones for optimal weight balance, operator safety, and maintenance access.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ENCLOSED_SUBSYSTEMS.map(sys => (
              <div key={sys.num} className="bg-white border border-[#D5D5D0] p-8 flex flex-col justify-between shadow-sm hover:border-alkota-orange transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-ibm-plex-mono text-xs font-bold text-alkota-orange">
                      ZONE {sys.num}
                    </span>
                    <span className="font-ibm-plex-mono text-[9px] text-[#888] uppercase">
                      Alkota Subsystem
                    </span>
                  </div>
                  <h3 className="font-barlow-condensed text-2xl font-bold uppercase text-alkota-black mb-1">
                    {sys.title}
                  </h3>
                  <p className="font-ibm-plex-mono text-[10px] text-[#777] uppercase mb-3">
                    {sys.subtitle}
                  </p>
                  <p className="text-xs text-[#666] leading-relaxed mb-6 font-light">
                    {sys.desc}
                  </p>
                </div>
                <div className="pt-4 border-t border-[#F0F0EC] font-ibm-plex-mono text-[10px] text-alkota-black font-semibold">
                  {sys.specs}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 04 CORPORATE LIVERY SECTION (CINEMATIC DARK) ──────────────────── */}
      <section className="py-24 px-6 bg-[#0D0D0D] text-white border-b border-alkota-iron">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.3em] text-alkota-orange font-bold block mb-3">
                Corporate Finish & Livery
              </span>
              <h2 className="font-barlow-condensed text-4xl md:text-5xl font-black uppercase italic text-white leading-tight mb-6">
                PROFESSIONAL FLEET BRANDING.
              </h2>
              <p className="text-alkota-silver text-base leading-relaxed mb-6 font-light">
                An enclosed Alkota trailer represents your company on high-profile client facilities. We offer factory-applied high-gloss gelcoat finishes in High-Gloss White, Graphite Charcoal, or complete full-coverage vinyl wraps matching your corporate brand standards.
              </p>
              <div className="space-y-3 font-mono text-xs text-[#AAA] mb-8">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-alkota-orange" />
                  <span>High-Gloss Polar White Gelcoat (Reflective thermal barrier)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-alkota-orange" />
                  <span>Industrial Stealth Graphite Charcoal Finish</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-alkota-orange" />
                  <span>Full-Coverage Bespoke Corporate Vinyl Livery</span>
                </div>
              </div>
              <Link
                href="/trailers/configure?format=enclosed"
                className="inline-flex items-center gap-2 text-xs font-ibm-plex-mono uppercase tracking-widest text-alkota-orange hover:underline font-bold"
              >
                Choose Livery in Configurator →
              </Link>
            </div>

            <div className="border border-alkota-iron bg-[#121212] p-8">
              <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#777] block mb-4">
                Configuration Preview // Exterior Shell
              </span>
              <div className="aspect-[16/10] bg-[#080808] border border-[#222] overflow-hidden flex items-center justify-center p-6">
                <img
                  src="/assets/products/stationary-gas-fired.png"
                  alt="Enclosed Mobile Plant Room"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
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
              Enclosed System FAQs
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'How are burner exhaust fumes handled inside an enclosed box trailer?',
                a: 'Alkota enclosed systems feature heat-shielded, double-wall stainless steel exhaust chimneys that vent directly through roof cowls. Combustion air is drawn through filtered louvres, ensuring zero fume concentration in the operator walk-in area.'
              },
              {
                q: 'Do I need to open the trailer doors to wash?',
                a: 'No. Hoses feed through sealed stainless steel roller fairleads built into the side or rear bulkheads. The engine, burner, and reels operate with the main doors closed and locked, maintaining sound containment and weather protection.'
              },
              {
                q: 'What chassis rating is required for an enclosed plant room?',
                a: 'Due to the additional tare weight of the box body, generators, and recovery filtration, enclosed systems are typically built on 2,700kg or 3,500kg Maximum Authorised Mass (MAM) tandem-axle chassis with overrun inertia braking.'
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
      <section className="py-24 px-6 bg-[#080808] text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-barlow-condensed text-4xl md:text-6xl font-black uppercase italic text-white leading-tight mb-4">
            SPECIFY AN ENCLOSED MOBILE PLANT ROOM.
          </h2>
          <p className="text-alkota-silver text-sm md:text-base leading-relaxed mb-8 font-light">
            Build your enclosed system in our 13-step configurator with live component matching and Maximum Authorised Mass calculations.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/trailers/configure?format=enclosed"
              className="inline-flex items-center justify-center gap-3 bg-alkota-orange px-8 py-4 text-xs font-black uppercase tracking-[0.25em] text-white hover:bg-alkota-orange/90 transition-all group"
            >
              <span>Build Enclosed Rig</span>
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
