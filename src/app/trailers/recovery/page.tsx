'use client';

import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import {
  ArrowRight, Recycle, ShieldCheck, Droplets, Zap, Shield,
  ChevronRight, AlertTriangle, Layers, Filter, CheckCircle2, ArrowDown
} from 'lucide-react';

const RECOVERY_STAGES = [
  {
    step: '01',
    title: 'Clean Water Feed',
    subtitle: 'Onboard Reservoir or Hydrant',
    desc: 'Water enters the Alkota high-pressure pump from a baffled onboard poly reservoir or a WRAS Category 5 mains hydrant.'
  },
  {
    step: '02',
    title: 'High-Pressure Thermal Wash',
    subtitle: 'Hot Water / Steam Cut',
    desc: 'Alkota machine outputs up to 275 Bar @ 130°C hot water, dissolving grease, oils, mud, and road film from the target asset.'
  },
  {
    step: '03',
    title: 'Surface Containment',
    subtitle: 'Drive-Over Berms & Drains',
    desc: 'Wastewater is contained within heavy-duty vinyl drive-over wash berms, drain seals, or rotary surface cleaner recovery suction rings.'
  },
  {
    step: '04',
    title: 'VACGD Vacuum Extraction',
    subtitle: 'Positive Displacement Suction',
    desc: 'Alkota VACGD positive-displacement blower pulls slurry, water, and debris across up to 100m of 2" smooth-bore extraction hose.'
  },
  {
    step: '05',
    title: '5-Stage VFS Filtration',
    subtitle: 'Negative-Void Media & Carbon',
    desc: 'Effluent is drawn through moving filter media (down to 20 microns) and granular activated carbon canisters to strip emulsified hydrocarbons.'
  },
  {
    step: '06',
    title: 'Closed-Loop Reuse / Disposal',
    subtitle: '<5 mg/L Hydrocarbon Quality',
    desc: 'Purified water returns to the primary storage tank for continuous recycling or discharges legally to foul sewer under approved consent.'
  }
];

export default function TrailerRecoveryPage() {
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
              <span className="h-[2px] w-8 bg-green-500" />
              <span className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-[0.4em] text-green-400">
                Environmental Recovery Systems
              </span>
            </div>

            <h1 className="font-barlow-condensed text-6xl md:text-8xl font-black uppercase italic text-white leading-[0.9] tracking-tight mb-6">
              CLEAN WHERE THE WORK IS.<br />
              <span className="text-green-400">CONTROL WHERE THE WATER GOES.</span>
            </h1>

            <p className="text-alkota-silver text-lg md:text-xl leading-relaxed mb-10 max-w-2xl font-light">
              Mobile industrial cleaning without drainage penalties. Alkota trailer recovery systems capture, filter, and recycle wash-water on-site — meeting stringent UK Environment Agency regulations in marine ports, shopping centres, and remote utility assets.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/trailers/configure?recovery=true"
                className="inline-flex items-center justify-center gap-3 bg-alkota-orange px-8 py-4 text-xs font-black uppercase tracking-[0.25em] text-white hover:bg-alkota-orange/90 transition-all group"
              >
                <span>Build With Recovery</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/water-treatment"
                className="inline-flex items-center justify-center gap-3 border border-white/20 px-8 py-4 text-xs font-black uppercase tracking-[0.25em] text-white/80 hover:text-white hover:border-white/40 transition-all"
              >
                Explore Water Treatment Platform
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── 02 REGULATORY COMPLIANCE (WARM STONE LIGHT) ───────────────────── */}
      <section className="py-24 px-6 bg-[#F7F7F5] border-b border-[#E5E5E0]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.3em] text-green-700 font-bold block mb-3">
                01 // Environmental Regulations
              </span>
              <h2 className="font-barlow-condensed text-4xl md:text-5xl font-black uppercase italic text-alkota-black leading-tight mb-6">
                UK ENVIRONMENTAL LAW APPLIES EVERYWHERE.
              </h2>
              <p className="text-[#555] text-base leading-relaxed mb-6 font-light">
                Allowing wash-water contaminated with hydrocarbons, heavy metals, road salt, or detergents to enter surface stormwater drains is illegal under the UK Environmental Permitting Regulations and Water Resources Act. Fines are severe and reputational damage to commercial clients is immediate.
              </p>
              <p className="text-[#777] text-sm leading-relaxed mb-8">
                Alkota trailer-mounted recovery systems allow contractors and facility managers to clean legally anywhere in the UK, containing 100% of wastewater at the point of impact and treating it on-board.
              </p>

              <div className="border border-green-800/30 bg-green-50 p-6">
                <h4 className="font-barlow-condensed text-xl font-bold uppercase text-green-900 mb-2">
                  BS EN 858 Class 1 Discharge Threshold (&lt;5 mg/L)
                </h4>
                <p className="text-xs text-green-800 leading-relaxed font-light">
                  Our VFS continuous negative-void filtration technology removes free hydrocarbons down to under 5 mg/L, exceeding standard trade effluent requirements for closed-loop recycling.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white border border-[#E0E0DC] p-6 shadow-sm">
                <ShieldCheck className="h-6 w-6 text-green-600 mb-3" />
                <h3 className="font-barlow-condensed text-xl font-bold uppercase text-alkota-black mb-2">Zero Surface Runoff</h3>
                <p className="text-xs text-[#666] leading-relaxed font-light">High-vacuum blowers capture slurry immediately behind rotary cleaner heads and portable berms.</p>
              </div>
              <div className="bg-white border border-[#E0E0DC] p-6 shadow-sm">
                <Recycle className="h-6 w-6 text-green-600 mb-3" />
                <h3 className="font-barlow-condensed text-xl font-bold uppercase text-alkota-black mb-2">90% Water Reuse</h3>
                <p className="text-xs text-[#666] leading-relaxed font-light">Recycle filtered water back to high-pressure skids, multiplying operational endurance on remote sites.</p>
              </div>
              <div className="bg-white border border-[#E0E0DC] p-6 shadow-sm">
                <Filter className="h-6 w-6 text-green-600 mb-3" />
                <h3 className="font-barlow-condensed text-xl font-bold uppercase text-alkota-black mb-2">5-Stage Filtration</h3>
                <p className="text-xs text-[#666] leading-relaxed font-light">Suspended solids down to 20 microns and hydrocarbon polishing through granular activated carbon.</p>
              </div>
              <div className="bg-white border border-[#E0E0DC] p-6 shadow-sm">
                <Droplets className="h-6 w-6 text-green-600 mb-3" />
                <h3 className="font-barlow-condensed text-xl font-bold uppercase text-alkota-black mb-2">WRAS CAT 5 Break</h3>
                <p className="text-xs text-[#666] leading-relaxed font-light">Air-gap protection prevents any backflow of contaminated effluent into clean water supply lines.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 03 SYSTEM FLOW (WARM NEUTRAL) ─────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#EFEFEA] border-b border-[#DDD]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.3em] text-green-700 font-bold block mb-3">
              02 // Process Thermodynamics
            </span>
            <h2 className="font-barlow-condensed text-4xl md:text-6xl font-black uppercase italic text-alkota-black leading-tight mb-4">
              THE COMPLETE MOBILE RECOVERY CIRCUIT.
            </h2>
            <p className="text-[#555] text-sm md:text-base font-light">
              Follow how an Alkota trailer manages fluid from initial intake, through extreme thermal cleaning, to continuous vacuum capture and carbon-polishing.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {RECOVERY_STAGES.map((st, idx) => (
              <div key={st.step} className="bg-white border border-[#D5D5D0] p-6 relative flex flex-col justify-between shadow-sm">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-ibm-plex-mono text-[10px] font-bold text-green-700 border border-green-600/40 px-2 py-0.5 bg-green-50">
                      STAGE {st.step}
                    </span>
                    <span className="font-ibm-plex-mono text-[9px] text-[#888] uppercase">
                      Alkota Circuit
                    </span>
                  </div>
                  <h3 className="font-barlow-condensed text-2xl font-bold uppercase text-alkota-black mb-1">
                    {st.title}
                  </h3>
                  <p className="font-ibm-plex-mono text-[10px] text-[#777] uppercase mb-3">
                    {st.subtitle}
                  </p>
                  <p className="text-xs text-[#666] leading-relaxed font-light">
                    {st.desc}
                  </p>
                </div>
                {idx < 5 && (
                  <div className="mt-6 pt-4 border-t border-[#F0F0EC] flex items-center justify-between text-[9px] font-ibm-plex-mono text-green-700 font-bold">
                    <span>CONTINUOUS FLOW</span>
                    <span>→</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 04 REAL CASE STUDY (CINEMATIC DARK) ───────────────────────────── */}
      <section className="py-24 px-6 bg-[#0D0D0D] text-white border-b border-alkota-iron">
        <div className="max-w-7xl mx-auto">
          <div className="border border-green-900/30 bg-[#111] p-8 md:p-12 grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.3em] text-green-400 font-bold block mb-2">
                Proven Closed-Loop Engineering
              </span>
              <h3 className="font-barlow-condensed text-3xl md:text-4xl font-black uppercase italic text-white mb-4">
                Closed-Loop Environmental Recovery Plant Room
              </h3>
              <p className="text-alkota-silver text-sm leading-relaxed mb-6 font-light">
                Engineered for a specialist marine contractor cleaning dockside machinery and chemical bunds in sensitive coastal habitats. Integrates Alkota DED 4,000 PSI diesel power, VACGD vacuum capture, and the 8-VFS-1 negative-void filtration plant on a single 3,500kg tandem chassis.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/trailers/builds/enclosed-closed-loop-recovery-plant-room"
                  className="inline-flex items-center gap-2 text-xs font-ibm-plex-mono uppercase tracking-widest text-green-400 hover:underline font-bold"
                >
                  View Case Study Specification →
                </Link>
                <Link
                  href="/trailers/configure?preset=environmental-closed-loop"
                  className="inline-flex items-center gap-2 text-xs font-ibm-plex-mono uppercase tracking-widest text-[#888] hover:text-white"
                >
                  Configure Closed-Loop Rig →
                </Link>
              </div>
            </div>
            <div className="relative aspect-[4/3] bg-[#0A0A0A] border border-[#222] overflow-hidden flex items-center justify-center p-6">
              <img
                src="/assets/products/stationary-gas-fired.png"
                alt="Closed Loop Environmental Plant Room"
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── 05 FAQS (LIGHT STONE) ────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#F7F7F5] border-b border-[#E5E5E0]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.3em] text-green-700 font-bold block mb-2">
              Environmental FAQ
            </span>
            <h2 className="font-barlow-condensed text-3xl md:text-4xl font-black uppercase text-alkota-black">
              Mobile Recovery FAQs
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'Can all wastewater be 100% recycled back into the pressure washer?',
                a: 'Standard wash water containing hydrocarbons, road film, and silt can be continuously recycled through our VFS filtration system. However, wastewater containing high concentrations of foaming detergents, strong acids, or heavy solvents must be retained for controlled off-site disposal.'
              },
              {
                q: 'How far can the vacuum blower pull wastewater from the trailer?',
                a: 'The positive-displacement Alkota VACGD extraction blower creates up to 14" Hg vacuum, allowing water and heavy sludge to be recovered from distances up to 100 metres away from the trailer.'
              },
              {
                q: 'How are filtered solids and sludge emptied from the system?',
                a: 'Solid silt and particulates collect on a continuous roll of filter media or inside quick-drain sludge hoppers, which can be emptied into standard waste drums for licensed disposal.'
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
            CONFIGURE A ZERO-DISCHARGE RECOVERY RIG.
          </h2>
          <p className="text-alkota-silver text-sm md:text-base leading-relaxed mb-8 font-light">
            Build your trailer in our configurator with preselected VACGD extraction and VFS filtration options.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/trailers/configure?recovery=true"
              className="inline-flex items-center justify-center gap-3 bg-alkota-orange px-8 py-4 text-xs font-black uppercase tracking-[0.25em] text-white hover:bg-alkota-orange/90 transition-all group"
            >
              <span>Build With Recovery</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/water-treatment"
              className="inline-flex items-center justify-center gap-3 border border-white/20 px-8 py-4 text-xs font-black uppercase tracking-[0.25em] text-white/80 hover:text-white transition-all"
            >
              Explore Fixed Water Treatment
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
