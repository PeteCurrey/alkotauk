'use client';

import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import {
  ArrowRight, Users, Flame, Zap, Droplets, ShieldCheck,
  CheckCircle2, ChevronRight, Gauge, AlertTriangle, Layers
} from 'lucide-react';

const ENGINEERING_COLUMNS = [
  {
    icon: Gauge,
    title: 'Pump Flow Displacement',
    subtitle: '17.0+ LPM Minimum Total Flow',
    desc: 'Two simultaneous operators require at least 8.5 LPM each to effectively cut grease and flush debris. A standard 11 LPM or 13 LPM machine cannot supply two guns without unacceptable pressure drop.'
  },
  {
    icon: Flame,
    title: 'Down-Draft Burner Capacity',
    subtitle: '350,000+ BTU Thermal Heating',
    desc: 'Heating 17 LPM of water from 10°C up to 90°C requires double the thermal input of a single-operator machine. Alkota Schedule 80 down-draft combustion chambers maintain continuous temperature without cooling down.'
  },
  {
    icon: Zap,
    title: 'Engine Power Reserve',
    subtitle: '18HP to 24HP Commercial Drive',
    desc: 'Running a high-displacement triplex pump at 240+ Bar demands high continuous shaft horsepower. Vanguard commercial V-Twins or Kubota liquid-cooled diesels provide non-stalling continuous torque.'
  },
  {
    icon: Droplets,
    title: 'Water Drawdown & Baffling',
    subtitle: '1,500L+ Baffled Storage',
    desc: 'Two operators consume 1,000 litres in under an hour of trigger time. Systems require 1,500L to 2,000L multi-baffled tanks with high-flow suction strainers preventing pump cavitation.'
  }
];

export default function MultiOperatorTrailersPage() {
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
                Multi-Operator Engineering
              </span>
            </div>

            <h1 className="font-barlow-condensed text-6xl md:text-8xl font-black uppercase italic text-white leading-[0.9] tracking-tight mb-6">
              ONE MOBILE SYSTEM.<br />
              <span className="text-alkota-orange">MULTIPLE OPERATORS.</span>
            </h1>

            <p className="text-alkota-silver text-lg md:text-xl leading-relaxed mb-10 max-w-2xl font-light">
              Multi-operator capability is not achieved by merely adding a second hose reel. It demands a fully balanced thermal, hydraulic, and engine ecosystem engineered from the chassis up.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/trailers/configure?operators=2"
                className="inline-flex items-center justify-center gap-3 bg-alkota-orange px-8 py-4 text-xs font-black uppercase tracking-[0.25em] text-white hover:bg-alkota-orange/90 transition-all group"
              >
                <span>Configure Multi-Operator Rig</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 border border-white/20 px-8 py-4 text-xs font-black uppercase tracking-[0.25em] text-white/80 hover:text-white hover:border-white/40 transition-all"
              >
                Talk to Alkota Engineering
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── 02 WHY CATALOGUE RIGS FAIL (WARM STONE LIGHT) ─────────────────── */}
      <section className="py-24 px-6 bg-[#F7F7F5] border-b border-[#E5E5E0]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.3em] text-alkota-orange font-bold block mb-3">
              01 // Hydraulic Competence
            </span>
            <h2 className="font-barlow-condensed text-4xl md:text-5xl font-black uppercase italic text-alkota-black leading-tight mb-6">
              WHY CATALOGUE RIGS FAIL ON DUAL-GUN DEMAND.
            </h2>
            <p className="text-[#555] text-base leading-relaxed font-light">
              When two operators pull high-pressure triggers simultaneously, an undersized machine experiences catastrophic pressure collapse, burner temperature drops, and pump cavitation. True dual-operator productivity requires precise component matching across every stage of the system.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ENGINEERING_COLUMNS.map(col => {
              const Icon = col.icon;
              return (
                <div key={col.title} className="bg-white border border-[#E0E0DC] p-6 shadow-sm hover:border-alkota-orange transition-colors">
                  <Icon className="h-7 w-7 text-alkota-orange mb-4" />
                  <h3 className="font-barlow-condensed text-2xl font-bold uppercase text-alkota-black mb-1">{col.title}</h3>
                  <p className="font-ibm-plex-mono text-[9px] uppercase text-[#777] mb-3">{col.subtitle}</p>
                  <p className="text-xs text-[#666] leading-relaxed font-light">{col.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 03 BALANCED OPERATOR WORKSPACES (WARM NEUTRAL) ────────────────── */}
      <section className="py-28 px-6 bg-[#EFEFEA] border-b border-[#DDD]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.3em] text-alkota-orange font-bold block mb-3">
              02 // Distribution Architecture
            </span>
            <h2 className="font-barlow-condensed text-4xl md:text-6xl font-black uppercase italic text-alkota-black leading-tight mb-4">
              BALANCED OPERATOR WORKSPACES.
            </h2>
            <p className="text-[#555] text-sm md:text-base font-light">
              How our engineered Y-manifold splits high-pressure hot water evenly to two independent 50m operating zones.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 items-center">
            {/* Operator 1 */}
            <div className="bg-white border border-[#D5D5D0] p-8 text-center shadow-sm">
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange font-bold block mb-2">
                OPERATOR 01 (PORT ZONE)
              </span>
              <h3 className="font-barlow-condensed text-3xl font-black text-alkota-black mb-2">
                8.5 LPM @ 240 BAR
              </h3>
              <p className="text-xs text-[#666] leading-relaxed mb-4 font-light">
                50m High-Pressure Hot Water Lance · Independent trigger control
              </p>
              <div className="font-ibm-plex-mono text-[9px] text-green-700 bg-green-50 border border-green-200 p-2 inline-block font-semibold">
                ✓ Full 130°C Thermal Degreasing
              </div>
            </div>

            {/* Central Rig */}
            <div className="border-2 border-alkota-orange bg-white p-8 text-center relative shadow-md">
              <span className="font-ibm-plex-mono text-[10px] bg-alkota-orange text-white px-3 py-1 uppercase font-bold tracking-widest block mb-4 mx-auto w-fit">
                CENTRAL RIG
              </span>
              <h4 className="font-barlow-condensed text-2xl font-black uppercase italic text-alkota-black mb-2">
                Alkota 4305-GED Unit
              </h4>
              <p className="font-ibm-plex-mono text-xs text-alkota-orange mb-3 font-bold">
                17.0 LPM Total Continuous Output
              </p>
              <p className="text-xs text-[#666] leading-relaxed mb-4 font-light">
                Schedule 80 Down-Draft Burner · Vanguard 18HP V-Twin · 1,500L Baffled Reservoir
              </p>
              <div className="font-ibm-plex-mono text-[9px] text-[#777] border-t border-[#F0F0EC] pt-3 font-medium">
                Precision Flow-Balancing Manifold
              </div>
            </div>

            {/* Operator 2 */}
            <div className="bg-white border border-[#D5D5D0] p-8 text-center shadow-sm">
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange font-bold block mb-2">
                OPERATOR 02 (STARBOARD ZONE)
              </span>
              <h3 className="font-barlow-condensed text-3xl font-black text-alkota-black mb-2">
                8.5 LPM @ 240 BAR
              </h3>
              <p className="text-xs text-[#666] leading-relaxed mb-4 font-light">
                50m High-Pressure Hot Water Lance · Independent trigger control
              </p>
              <div className="font-ibm-plex-mono text-[9px] text-green-700 bg-green-50 border border-green-200 p-2 inline-block font-semibold">
                ✓ Full 130°C Thermal Degreasing
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 04 REAL CASE STUDY LINK (CINEMATIC DARK) ──────────────────────── */}
      <section className="py-24 px-6 bg-[#0E0E0E] text-white border-b border-alkota-iron">
        <div className="max-w-7xl mx-auto">
          <div className="border border-alkota-iron bg-[#111] p-8 md:p-12 grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.3em] text-alkota-orange font-bold block mb-2">
                Proven Multi-Operator Build
              </span>
              <h3 className="font-barlow-condensed text-3xl md:text-4xl font-black uppercase italic text-white mb-4">
                Twin-Operator Haulage Depot Washdown Rig
              </h3>
              <p className="text-alkota-silver text-sm leading-relaxed mb-6 font-light">
                See how a major Northern UK haulage depot deployed our 2-operator system to clean 40+ articulated trucks per shift, doubling wash throughput without doubling labour hours.
              </p>
              <Link
                href="/trailers/builds/twin-operator-haulage-depot-rig"
                className="inline-flex items-center gap-2 text-xs font-ibm-plex-mono uppercase tracking-widest text-alkota-orange hover:underline font-bold"
              >
                Read Project Case Study →
              </Link>
            </div>
            <div className="relative aspect-[4/3] bg-[#0A0A0A] border border-[#222] overflow-hidden flex items-center justify-center p-6">
              <img
                src="/assets/products/trailer-single.png"
                alt="Dual Operator Rig"
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── 05 FINAL CTA (CINEMATIC DARK) ─────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#0A0A0A] text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-barlow-condensed text-4xl md:text-6xl font-black uppercase italic text-white leading-tight mb-4">
            SPECIFY A DUAL-GUN ALKOTA RIG.
          </h2>
          <p className="text-alkota-silver text-sm md:text-base leading-relaxed mb-8 font-light">
            Launch our configurator with 2-operator hydraulics and compatible high-flow machinery preselected.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/trailers/configure?operators=2"
              className="inline-flex items-center justify-center gap-3 bg-alkota-orange px-8 py-4 text-xs font-black uppercase tracking-[0.25em] text-white hover:bg-alkota-orange/90 transition-all group"
            >
              <span>Build Dual-Operator Rig</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/trailers"
              className="inline-flex items-center justify-center gap-3 border border-white/20 px-8 py-4 text-xs font-black uppercase tracking-[0.25em] text-white/80 hover:text-white transition-all"
            >
              Explore Trailer Systems
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
