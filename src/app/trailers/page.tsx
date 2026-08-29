'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  ArrowRight, ChevronRight, Truck, Droplets, Zap, Shield, Recycle,
  Flame, Settings, Users, Package, Lightbulb, Factory, Building2,
  Tractor, Wind, MapPin, Clock, Weight, ChevronDown,
} from 'lucide-react';
import { APPLICATION_PRESETS, UK_CHASSIS_OPTIONS, WATER_RECOVERY_OPTIONS } from '@/lib/trailers/configurator-data';

// ─── ANIMATION VARIANTS ──────────────────────────────────────────────────────

const fadeUp: any = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

const stagger: any = {
  visible: { transition: { staggerChildren: 0.1 } }
};

// ─── CHAPTER SEPARATOR ───────────────────────────────────────────────────────

function ChapterLabel({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center gap-4 mb-10">
      <span className="font-ibm-plex-mono text-[10px] font-bold text-alkota-orange tracking-[0.4em] uppercase">
        {number}
      </span>
      <span className="h-px flex-1 bg-alkota-iron max-w-12" />
      <span className="font-ibm-plex-mono text-[10px] font-bold tracking-[0.3em] uppercase text-[#555]">
        {label}
      </span>
    </div>
  );
}

// ─── SECTION REF FADE ────────────────────────────────────────────────────────

function FadeSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={fadeUp}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── SYSTEM HOTSPOT DATA ─────────────────────────────────────────────────────

const SYSTEM_COMPONENTS = [
  { id: '01', label: 'Chassis / Trailer Frame', desc: 'UK-approved hot-dip galvanised or powdercoated steel chassis, calculated for optimal tongue weight and axle load distribution.', x: 35, y: 72 },
  { id: '02', label: 'Alkota Cleaning Machine', desc: 'Hot water, cold water, or steam. Skid-mounted and pump-plumbed directly into the trailer chassis for a single unified system.', x: 55, y: 45 },
  { id: '03', label: 'Baffled Water Storage', desc: 'Up to 2,000L baffled poly tank. Triple internal baffles resist water surge under braking at 60mph on UK roads.', x: 25, y: 45 },
  { id: '04', label: 'Diesel / Fuel Tanks', desc: '80L bunded long-range fuel tank supplies both burner and diesel generator from a single consolidated fuel source.', x: 70, y: 68 },
  { id: '05', label: 'Generator / Power', desc: '5kVA to 10kVA super-silent onboard diesel generator supplying vacuum recovery, lighting, and auxiliary 230V power.', x: 80, y: 42 },
  { id: '06', label: 'High-Pressure Hose Reels', desc: 'Single or dual 400-bar hose reels with 50m to 100m of wire-braided high-temperature hose. Manual or 12V electric auto-rewind.', x: 15, y: 58 },
  { id: '07', label: 'Tool & Equipment Vault', desc: 'Heavy-duty lockable aluminium chequerplate storage chest. Lance clips, surface-cleaner deck holders, chemical bays.', x: 60, y: 75 },
  { id: '08', label: 'Scene Lighting', desc: 'Telescopic 2.5m LED night-work scene mast illuminating 30m+ working perimeter. 12V or 230V operation.', x: 45, y: 20 },
  { id: '09', label: 'Water Recovery', desc: 'Alkota VACGD high-suction vacuum blower captures wastewater from up to 100m. Mounted within the trailer chassis.', x: 20, y: 78 },
  { id: '10', label: 'Filtration / VFS', desc: '5-stage negative-void vacuum filtration removes >99% hydrocarbons, polishing water to <5mg/L for closed-loop reuse.', x: 42, y: 82 },
  { id: '11', label: 'Operator Distribution Manifold', desc: 'High-pressure Y-manifold splitting single machine output for dual-operator simultaneous washing.', x: 68, y: 55 },
];

// ─── APPLICATION SECTORS ─────────────────────────────────────────────────────

const SECTORS = [
  { icon: Truck, label: 'Commercial Fleet', slug: 'fleet-logistics' },
  { icon: Building2, label: 'Facilities Management', slug: 'fleet-logistics' },
  { icon: Tractor, label: 'Agriculture & Estates', slug: 'highways-municipal' },
  { icon: Factory, label: 'Construction & Plant', slug: 'heavy-plant-construction' },
  { icon: Wind, label: 'Utilities & Infrastructure', slug: 'fleet-logistics' },
  { icon: MapPin, label: 'Municipal & Highways', slug: 'highways-municipal' },
  { icon: Recycle, label: 'Environmental Specialist', slug: 'environmental-closed-loop' },
  { icon: Package, label: 'Contract Cleaning', slug: 'fleet-logistics' },
];

// ─── PAYLOAD FACTS ────────────────────────────────────────────────────────────

const PAYLOAD_FACTS = [
  { value: '1,000 kg', label: 'Mass of 1,000L water', sub: '1 litre ≈ 1 kilogram' },
  { value: '2,000 kg', label: 'Maximum legal trailer water payload on a 3,500kg MAM', sub: 'With full equipment, this fills the entire MAM' },
  { value: '55 min', label: 'Typical continuous wash from a 1,000L tank', sub: 'At 18 LPM machine flow — ~90 min real-world trigger time' },
  { value: '3,500 kg', label: 'Maximum UK braked trailer MAM', sub: 'Requiring Type Approval / IVA certification' },
];

// ─── BUILD PROCESS ────────────────────────────────────────────────────────────

const BUILD_STEPS = [
  {
    phase: '01',
    title: 'Discover',
    desc: 'Tell us about the work — what surfaces, what contaminants, how many operators, and where the rig will travel.',
    icon: Settings
  },
  {
    phase: '02',
    title: 'Configure',
    desc: 'Build the complete system yourself using our engineering configurator, selecting every component that fits your operation.',
    icon: Package
  },
  {
    phase: '03',
    title: 'Engineer',
    desc: 'Alkota engineers validate weight distribution, hydraulic compatibility, trailer approval, and tow vehicle suitability.',
    icon: Flame
  },
  {
    phase: '04',
    title: 'Approve',
    desc: 'You receive a final engineering drawing, specification sheet, and quotation for sign-off before a single component is ordered.',
    icon: Shield
  },
  {
    phase: '05',
    title: 'Build',
    desc: 'Your rig is handcrafted in the UK by our specialist trailer fabrication team, integrating American Alkota machinery with bespoke British engineering.',
    icon: Truck
  },
  {
    phase: '06',
    title: 'Commission',
    desc: 'Full operational handover, staff training, documentation, and post-installation technical support from the Alkota UK team.',
    icon: Zap
  },
];

// ─── FEATURED BUILDS DATA ────────────────────────────────────────────────────

const FEATURED_BUILDS = [
  {
    id: 'haulage-dual-op',
    tag: 'OPEN DECK — TANDEM',
    title: 'Dual-Operator Heavy Fleet Washdown Rig',
    application: 'Commercial Fleet Depot',
    specs: [
      { label: 'Format', value: 'Open Deck, Tandem Axle' },
      { label: 'Machine', value: 'Alkota 4305-GED Dual-Output Hot Water' },
      { label: 'Water', value: '1,500L Triple-Baffled Tank' },
      { label: 'Operators', value: '2 simultaneous @ 241 Bar' },
      { label: 'Recovery', value: 'VACGD High-Suction Blower' },
      { label: 'Hose', value: 'Dual Electric Auto-Rewind 50m Reels' },
    ],
    image: '/assets/products/trailer-single.png',
    description: 'Designed to clean 40 HGV units per day. Twin-gun output means two operators cover twice the ground from a single hot water skid.',
  },
  {
    id: 'enclosed-env-flagship',
    tag: 'ENCLOSED — FLAGSHIP',
    title: 'Closed-Loop Environmental Mobile Plant Room',
    application: 'Specialist Environmental Contractor',
    specs: [
      { label: 'Format', value: 'Enclosed 3,500kg Tandem Axle' },
      { label: 'Machine', value: 'Alkota DED All-Diesel Skid @ 4,000 PSI' },
      { label: 'Water', value: '2,000L Dual Baffled Tank System' },
      { label: 'Recovery', value: 'Full Closed-Loop Hydro-Recycle System' },
      { label: 'Power', value: '10kVA 3-Phase Kubota Generator' },
      { label: 'Livery', value: 'Full Corporate Fleet Wrap' },
    ],
    image: '/assets/products/stationary-gas-fired.png',
    description: 'Zero-runoff capability meeting Environment Agency requirements. Washes, recovers, filters, and recycles water in a single self-contained mobile operation.',
  },
  {
    id: 'steam-municipal',
    tag: 'OPEN DECK — COMPACT',
    title: 'Compact Urban Steam & Graffiti Rig',
    application: 'Municipal Highways Department',
    specs: [
      { label: 'Format', value: 'Open Deck, Single Axle 1,500kg' },
      { label: 'Machine', value: 'Alkota 325-CSH Steam @ 155°C' },
      { label: 'Water', value: '500L Slimline Baffled Tank' },
      { label: 'Recovery', value: 'VACGD Vacuum Capture' },
      { label: 'Tow', value: 'Standard commercial van (2,000kg cap.)' },
      { label: 'Hose', value: '50m Manual HP Reel + LED Scene Mast' },
    ],
    image: '/assets/products/steam-oil.png',
    description: 'Ultra-compact single-axle steam rig towable behind a standard Transit. Instant 155°C wet steam eliminates chewing gum, graffiti, and bituminous contamination without damaging historic stone.',
  },
];

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

export default function TrailersPage() {
  const [activeFormat, setActiveFormat] = useState<'open-deck' | 'enclosed'>('open-deck');
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [towCapacity, setTowCapacity] = useState('');

  const towCapKg = parseInt(towCapacity) || 0;
  const towWarning = towCapKg > 0 && towCapKg < 1500 ? 'Your vehicle may only legally tow a 750kg or smaller trailer. Consider a heavier tow vehicle for industrial rigs.' : null;
  const towOk = towCapKg >= 3500 ? 'Your vehicle can tow the maximum 3,500kg MAM Alkota Heavy Tandem Rig.' : towCapKg >= 2700 ? `Your vehicle (${towCapKg}kg capacity) can tow our 2,700kg Tandem rig with a ${towCapKg - 2700}kg reserve.` : towCapKg >= 1500 ? `Your vehicle (${towCapKg}kg capacity) is suited to our compact 1,500kg Single Axle rig.` : null;

  return (
    <main className="bg-alkota-black overflow-x-hidden">
      <Navigation />

      {/* ─── 01. HERO ───────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
        {/* Background — full-bleed industrial image */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-center bg-cover"
            style={{ backgroundImage: "url('/assets/products/trailer-single.png')", backgroundPosition: 'center 40%' }}
          />
          {/* Cinematic gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-alkota-black via-alkota-black/70 to-alkota-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-alkota-black/60 to-transparent" />
          {/* Orange flicker */}
          <div className="absolute inset-x-0 bottom-0 h-1 bg-alkota-orange/30" />
        </div>

        {/* Scrolling watermark */}
        <div className="absolute top-1/3 right-0 pointer-events-none select-none opacity-[0.025] z-0">
          <span className="font-barlow-condensed text-[22vw] font-black uppercase italic leading-none text-white whitespace-nowrap tracking-tighter">
            ALKOTA
          </span>
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 pt-48 w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="h-[2px] w-8 bg-alkota-orange" />
              <span className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-[0.4em] text-alkota-orange">
                Bespoke Mobile Industrial Cleaning Systems
              </span>
            </div>

            <h1 className="font-barlow-condensed text-6xl md:text-8xl lg:text-[100px] font-black uppercase italic text-white leading-[0.9] tracking-tight mb-8 max-w-4xl">
              BUILT TO GO<br />
              <span className="text-alkota-orange">WHERE THE</span><br />
              WORK IS.
            </h1>

            <p className="text-alkota-silver text-lg md:text-xl leading-relaxed mb-12 max-w-2xl">
              Purpose-built mobile industrial cleaning systems, engineered and assembled in the UK around your operation. Every Alkota trailer is a complete system — not a pressure washer bolted to a trailer.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/trailers/configure"
                className="inline-flex items-center justify-center gap-3 bg-alkota-orange px-10 py-5 text-xs font-black uppercase tracking-[0.25em] text-white hover:bg-alkota-orange/90 transition-all duration-300 group"
              >
                <span>Build Your Rig</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button
                onClick={() => document.getElementById('section-formats')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center justify-center gap-3 border border-white/20 px-10 py-5 text-xs font-black uppercase tracking-[0.25em] text-white/80 hover:text-white hover:border-white/40 transition-all duration-300"
              >
                Explore Trailer Systems
              </button>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="absolute bottom-8 right-6 flex flex-col items-center gap-2"
          >
            <span className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.3em] text-white/30 rotate-90 origin-center translate-x-4">SCROLL</span>
            <ChevronDown className="h-4 w-4 text-alkota-orange animate-bounce" />
          </motion.div>
        </div>
      </section>

      {/* ─── 02. BUILT AROUND THE JOB (WARM STONE LIGHT) ────────────────────── */}
      <section className="py-32 px-6 bg-[#F7F7F5] text-alkota-black border-t border-[#E5E5E0]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            <FadeSection>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-[0.35em] text-alkota-orange">02 // Built Around The Job</span>
              </div>
              <h2 className="font-barlow-condensed text-5xl md:text-6xl font-black uppercase italic text-alkota-black leading-tight tracking-tight mb-8">
                THE MACHINE<br />IS ONLY<br />
                <span className="text-alkota-orange">THE START.</span>
              </h2>
              <p className="text-[#555] text-lg leading-relaxed mb-8 font-light">
                A mobile cleaning operation depends on far more than a pressure washer. The entire system — water supply, fuel, power, operator reach, wastewater management, payload, weather, security — must be engineered together or it will fail in service.
              </p>
              <p className="text-[#666] text-base leading-relaxed font-light">
                This is why every Alkota trailer is designed around the operation first, then built around the components. We ask what your system needs to <em>do</em> — not which trailer you want.
              </p>
            </FadeSection>

            <FadeSection>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Droplets, label: 'Water Supply', desc: 'Onboard tank vs mains-fed. Storage capacity and endurance.' },
                  { icon: Zap, label: 'Power', desc: 'Diesel engine, onboard generator, shore power, or battery systems.' },
                  { icon: Clock, label: 'Runtime', desc: 'Hours of operation before refuelling, refilling, or recovery emptying.' },
                  { icon: Users, label: 'Operators', desc: 'Single-gun or dual-operator split manifold for maximum productivity.' },
                  { icon: Recycle, label: 'Recovery', desc: 'Vacuum capture, filtration, and closed-loop reuse for environmental compliance.' },
                  { icon: Weight, label: 'Payload', desc: 'UK Maximum Authorised Mass, axle loading, and tow vehicle compatibility.' },
                  { icon: Shield, label: 'Security', desc: 'Enclosed bodywork, locking vaults, and equipment protection.' },
                  { icon: Settings, label: 'Fabrication', desc: 'Bespoke chassis engineering, livery, and company branding.' },
                ].map(({ icon: Icon, label, desc }) => (
                  <div key={label} className="bg-white border border-[#E0E0DC] p-5 group hover:border-alkota-orange transition-all duration-300 shadow-sm">
                    <Icon className="h-5 w-5 text-alkota-orange mb-3" />
                    <h4 className="font-barlow-condensed text-base font-bold uppercase text-alkota-black mb-1">{label}</h4>
                    <p className="text-[#666] text-xs leading-relaxed font-light">{desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 border-l-2 border-alkota-orange bg-white shadow-sm">
                <p className="font-barlow-condensed text-xl font-bold uppercase italic text-alkota-black">
                  "What does your operation need to do?"
                </p>
                <p className="text-[#666] text-sm mt-2 font-light">
                  That is the question behind every Alkota trailer build. Not which trailer — but which system.
                </p>
              </div>
            </FadeSection>
          </div>
        </div>
      </section>

      {/* ─── 03. CHOOSE YOUR FORMAT (WARM NEUTRAL) ───────────────────────────── */}
      <section id="section-formats" className="py-32 px-6 bg-[#EFEFEA] text-alkota-black border-t border-[#DDD]">
        <div className="max-w-7xl mx-auto">
          <FadeSection>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-[0.35em] text-alkota-orange">03 // Choose Your Format</span>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
              <h2 className="font-barlow-condensed text-5xl md:text-6xl font-black uppercase italic text-alkota-black leading-tight tracking-tight">
                OPEN DECK<br />OR ENCLOSED<br />
                <span className="text-alkota-orange">MOBILE PLANT ROOM.</span>
              </h2>

              {/* Format toggle */}
              <div className="flex bg-white border border-[#D0D0CB] p-1 self-start shadow-sm">
                {(['open-deck', 'enclosed'] as const).map(fmt => (
                  <button
                    key={fmt}
                    onClick={() => setActiveFormat(fmt)}
                    className={`px-8 py-3 font-ibm-plex-mono text-[10px] font-bold uppercase tracking-[0.25em] transition-all duration-300 ${
                      activeFormat === fmt
                        ? 'bg-alkota-orange text-white'
                        : 'text-[#666] hover:text-alkota-black'
                    }`}
                  >
                    {fmt === 'open-deck' ? 'Open Deck' : 'Enclosed'}
                  </button>
                ))}
              </div>
            </div>
          </FadeSection>

          <AnimatePresence mode="wait">
            {activeFormat === 'open-deck' ? (
              <motion.div
                key="open-deck"
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 24 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="grid lg:grid-cols-2 gap-8"
              >
                <div className="relative aspect-[4/3] bg-[#090909] border border-[#222] overflow-hidden flex items-center justify-center p-6">
                  <img
                    src="/assets/products/trailer-single.png"
                    alt="Alkota Open Deck Trailer"
                    className="max-h-full max-w-full object-contain"
                  />
                  <div className="absolute bottom-6 left-6 z-20">
                    <span className="font-ibm-plex-mono text-[9px] font-bold uppercase tracking-[0.35em] text-alkota-orange border border-alkota-orange bg-black/80 px-3 py-1.5">
                      Open Deck System
                    </span>
                  </div>
                </div>

                <div className="flex flex-col justify-center">
                  <h3 className="font-barlow-condensed text-3xl font-black uppercase italic text-alkota-black mb-6">
                    Maximum Access.<br />Rapid Deployment.
                  </h3>
                  <p className="text-[#555] text-base leading-relaxed mb-8 font-light">
                    Open deck systems offer unrestricted access to every component from all sides. Ideal for multi-operator setups, frequently reconfigured equipment, and operations where hose runs, engine access, and visual inspection are important.
                  </p>

                  <div className="space-y-3 mb-8">
                    {[
                      'Full 360° equipment access for maintenance and hose management',
                      'Flexible deck layout — reconfigurable between contracts',
                      'Lower overall unladen weight maximises payload capacity',
                      'Multi-operator hose deployment from both sides',
                      'Natural engine cooling and ventilation in arduous conditions',
                      'Visible equipment status during operation',
                    ].map(point => (
                      <div key={point} className="flex items-start gap-3">
                        <span className="h-1.5 w-1.5 rounded-full bg-alkota-orange mt-2 shrink-0" />
                        <span className="text-[#555] text-sm font-light">{point}</span>
                      </div>
                    ))}
                  </div>

                  <p className="text-[#777] text-xs mb-8">
                    Typical applications: Contract cleaning, heavy plant depots, agricultural mobile washdown, civil engineering, hire fleets.
                  </p>

                  <Link
                    href="/trailers/configure?format=open-deck"
                    className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-[0.25em] text-alkota-orange hover:gap-5 transition-all duration-300"
                  >
                    Configure Open Deck Rig <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="enclosed"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="grid lg:grid-cols-2 gap-8"
              >
                <div className="relative aspect-[4/3] bg-[#090909] border border-[#222] overflow-hidden flex items-center justify-center p-6">
                  <img
                    src="/assets/products/stationary-gas-fired.png"
                    alt="Alkota Enclosed Mobile Plant Room"
                    className="max-h-full max-w-full object-contain"
                  />
                  <div className="absolute bottom-6 left-6 z-20">
                    <span className="font-ibm-plex-mono text-[9px] font-bold uppercase tracking-[0.35em] text-alkota-orange border border-alkota-orange bg-black/80 px-3 py-1.5">
                      Enclosed Mobile Plant Room
                    </span>
                  </div>
                </div>

                <div className="flex flex-col justify-center">
                  <h3 className="font-barlow-condensed text-3xl font-black uppercase italic text-alkota-black mb-6">
                    A Mobile Plant Room.<br />On Wheels.
                  </h3>
                  <p className="text-alkota-silver text-base leading-relaxed mb-8">
                    Enclosed trailers transform the cleaning operation into a professional, self-contained unit. High-security locking doors, weatherproof equipment protection, full corporate branding capability, internal LED workshop lighting, and onboard water treatment in a controlled environment.
                  </p>

                  <div className="space-y-3 mb-8">
                    {[
                      'Fully weatherproof — operates year-round in British conditions',
                      'High-security roller or barn doors with multi-point locking',
                      'Professional corporate livery and fleet identity',
                      'Internal LED workshop lighting for night operations',
                      'Equipment security: camera-grade tamper detection options',
                      'Integrates closed-loop VFS water recovery in a controlled space',
                    ].map(point => (
                      <div key={point} className="flex items-start gap-3">
                        <span className="h-1.5 w-1.5 rounded-full bg-alkota-orange mt-2 shrink-0" />
                        <span className="text-alkota-silver text-sm">{point}</span>
                      </div>
                    ))}
                  </div>

                  <p className="text-alkota-grey text-xs mb-8">
                    Typical applications: Contract cleaning fleets, specialist environmental contractors, urban municipal services, high-security facility cleaning.
                  </p>

                  <Link
                    href="/trailers/configure?format=enclosed"
                    className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-[0.25em] text-alkota-orange hover:gap-5 transition-all duration-300"
                  >
                    Configure Enclosed Plant Room <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ─── 04. FEATURED BUILDS ────────────────────────────────────────────── */}
      <section className="py-32 px-6 bg-alkota-black border-t border-alkota-iron">
        <div className="max-w-7xl mx-auto">
          <FadeSection>
            <ChapterLabel number="04" label="Alkota Builds" />
            <div className="flex items-end justify-between gap-8 mb-16">
              <h2 className="font-barlow-condensed text-5xl md:text-6xl font-black uppercase italic text-white leading-tight tracking-tight">
                REAL RIGS.<br />
                <span className="text-alkota-orange">REAL ENGINEERING.</span>
              </h2>
              <p className="text-alkota-silver text-base max-w-xs hidden lg:block leading-relaxed">
                Representative examples of Alkota UK mobile cleaning systems. Each is engineered around a specific operational requirement.
              </p>
            </div>
          </FadeSection>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="grid lg:grid-cols-3 gap-6"
          >
            {FEATURED_BUILDS.map((build) => (
              <motion.div
                key={build.id}
                variants={fadeUp}
                className="group border border-alkota-iron bg-[#0A0A0A] hover:border-alkota-orange/40 transition-all duration-500 flex flex-col"
              >
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-alkota-black to-transparent z-10" />
                  <img
                    src={build.image}
                    alt={build.title}
                    className="w-full h-full object-cover grayscale-[0.6] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute top-4 left-4 z-20">
                    <span className="font-ibm-plex-mono text-[8px] font-bold uppercase tracking-[0.35em] text-alkota-orange border border-alkota-orange/50 bg-alkota-black/80 px-2.5 py-1.5 backdrop-blur-sm">
                      {build.tag}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 z-20">
                    <span className="font-ibm-plex-mono text-[8px] text-alkota-grey uppercase tracking-widest">{build.application}</span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-barlow-condensed text-2xl font-black uppercase italic text-white leading-tight mb-3">
                    {build.title}
                  </h3>
                  <p className="text-alkota-grey text-sm leading-relaxed mb-6">{build.description}</p>

                  <div className="space-y-2 mb-6 mt-auto">
                    {build.specs.map(spec => (
                      <div key={spec.label} className="flex items-center justify-between text-xs border-b border-alkota-iron pb-2">
                        <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#555]">{spec.label}</span>
                        <span className="text-alkota-silver text-right max-w-48">{spec.value}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/trailers/configure"
                    className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-alkota-orange hover:gap-4 transition-all duration-300"
                  >
                    Build Similar Rig <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── 05. COMPLETE MOBILE SYSTEM — INTERACTIVE DIAGRAM ──────────────── */}
      <section className="py-32 px-6 bg-white border-t border-[#E5E5E0] text-[#1A1A18]">
        <div className="max-w-7xl mx-auto">
          <FadeSection>
            <ChapterLabel number="05" label="The Complete System" />
            <h2 className="font-extralight text-4xl md:text-6xl uppercase tracking-tight text-[#1A1A18] leading-tight mb-4 max-w-3xl">
              EVERY ELEMENT.<br />
              <span className="text-alkota-orange">ENGINEERED TOGETHER.</span>
            </h2>
            <p className="text-[#555] text-base sm:text-lg max-w-2xl leading-relaxed mb-16 font-light">
              An Alkota trailer is not assembled — it is engineered. Each subsystem is specified, positioned, plumbed, and wired in relation to every other. Select any component below to understand its role in the complete system.
            </p>
          </FadeSection>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* System diagram (left) */}
            <div className="lg:col-span-7">
              <div className="relative bg-alkota-black border border-alkota-iron aspect-[4/3] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-alkota-black/40 z-10 pointer-events-none" />
                <img
                  src="/assets/products/trailer-single.png"
                  alt="Alkota Trailer System Overview"
                  className="w-full h-full object-cover opacity-60"
                />

                {/* Hotspot overlay */}
                {SYSTEM_COMPONENTS.map(component => (
                  <button
                    key={component.id}
                    className={`absolute z-20 flex items-center justify-center transition-all duration-300 ${
                      activeHotspot === component.id ? 'scale-125' : 'hover:scale-110'
                    }`}
                    style={{ left: `${component.x}%`, top: `${component.y}%`, transform: 'translate(-50%, -50%)' }}
                    onClick={() => setActiveHotspot(activeHotspot === component.id ? null : component.id)}
                    aria-label={component.label}
                  >
                    <div className={`h-7 w-7 rounded-full border-2 flex items-center justify-center ${
                      activeHotspot === component.id
                        ? 'bg-alkota-orange border-alkota-orange text-white'
                        : 'bg-alkota-black/80 border-alkota-orange text-alkota-orange'
                    } backdrop-blur-sm`}>
                      <span className="font-ibm-plex-mono text-[8px] font-black">{component.id}</span>
                    </div>
                    {/* Pulse ring */}
                    {activeHotspot !== component.id && (
                      <span className="absolute inset-0 rounded-full border border-alkota-orange/50 animate-ping" />
                    )}
                  </button>
                ))}

                {/* Active hotspot label */}
                <AnimatePresence>
                  {activeHotspot && (() => {
                    const comp = SYSTEM_COMPONENTS.find(c => c.id === activeHotspot);
                    if (!comp) return null;
                    return (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute bottom-0 left-0 right-0 z-30 bg-alkota-black/95 border-t border-alkota-orange p-4 backdrop-blur-sm"
                      >
                        <div className="flex items-start gap-3">
                          <span className="font-ibm-plex-mono text-[9px] font-bold text-alkota-orange border border-alkota-orange px-2 py-1 shrink-0">
                            {comp.id}
                          </span>
                          <div>
                            <p className="font-barlow-condensed text-base font-bold uppercase text-white mb-0.5">{comp.label}</p>
                            <p className="text-alkota-grey text-xs leading-relaxed">{comp.desc}</p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })()}
                </AnimatePresence>
              </div>
            </div>

            {/* Component list (right) */}
            <div className="lg:col-span-5">
              <div className="space-y-1">
                {SYSTEM_COMPONENTS.map(component => (
                  <button
                    key={component.id}
                    onClick={() => setActiveHotspot(activeHotspot === component.id ? null : component.id)}
                    className={`w-full text-left px-4 py-3.5 border transition-all duration-300 flex items-center gap-4 ${
                      activeHotspot === component.id
                        ? 'border-alkota-orange bg-alkota-orange/8 text-white'
                        : 'border-alkota-iron bg-transparent text-alkota-grey hover:border-alkota-orange/30 hover:text-white'
                    }`}
                  >
                    <span className={`font-ibm-plex-mono text-[9px] font-bold w-6 shrink-0 ${
                      activeHotspot === component.id ? 'text-alkota-orange' : 'text-[#555]'
                    }`}>
                      {component.id}
                    </span>
                    <span className="font-barlow-condensed text-sm font-bold uppercase">{component.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 06. CONFIGURATOR ENTRY ─────────────────────────────────────────── */}
      <section className="py-32 px-6 bg-[#FAFAF8] border-t border-[#E5E5E0] text-[#1A1A18] relative overflow-hidden">
        {/* Background accent */}
        <div className="absolute top-0 right-0 w-2/3 h-full bg-alkota-orange/[0.03] -skew-x-12 translate-x-1/4 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <FadeSection>
            <ChapterLabel number="06" label="Build Your Alkota" />
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="font-extralight text-4xl md:text-6xl uppercase tracking-tight text-[#1A1A18] leading-tight mb-8">
                  BUILD THE<br />
                  SYSTEM YOUR<br />
                  <span className="text-alkota-orange">OPERATION NEEDS.</span>
                </h2>
                <p className="text-[#555] text-base sm:text-lg leading-relaxed mb-10 max-w-xl font-light">
                  The Alkota configurator works like configuring a premium vehicle — except the result is a production-ready specification for a real industrial cleaning system, sent directly to our engineering team.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-10">
                  {[
                    { v: '13', l: 'Configuration steps' },
                    { v: '5', l: 'Chassis options' },
                    { v: 'Live', l: 'Weight calculation' },
                    { v: '100%', l: 'UK engineering spec' },
                  ].map(({ v, l }) => (
                    <div key={l} className="border border-[#E5E5E0] bg-white p-4">
                      <div className="font-barlow-condensed text-3xl font-black text-alkota-orange mb-1">{v}</div>
                      <div className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#666]">{l}</div>
                    </div>
                  ))}
                </div>
                <Link
                  href="/trailers/configure"
                  className="inline-flex items-center gap-3 bg-alkota-orange px-10 py-5 text-xs font-black uppercase tracking-[0.25em] text-white hover:bg-alkota-orange/90 transition-all duration-300 group"
                >
                  <span>Build Your Rig</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="space-y-4">
                <div className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.3em] text-[#555] mb-6">
                  Configuration Journey
                </div>
                {[
                  'Your Operation & Application',
                  'Format — Open Deck or Enclosed',
                  'Chassis & UK Trailer Size',
                  'Alkota Cleaning Machine',
                  'Single or Dual Operator',
                  'Water Storage & Live Endurance',
                  'Power & Fuel Configuration',
                  'Water Recovery & Treatment',
                  'Hose Reels & Storage',
                  'Site & Work Options',
                  'Finish & Corporate Branding',
                  'Live UK Engineering Weight Review',
                  'Your Build Code & Engineering Review',
                ].map((step, i) => (
                  <div
                    key={step}
                    className="flex items-center gap-4 border-b border-[#E5E5E0] pb-3 group"
                  >
                    <span className="font-ibm-plex-mono text-[10px] text-alkota-orange font-bold w-6 shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[#333] text-sm font-medium">{step}</span>
                    <ChevronRight className="h-3.5 w-3.5 text-[#333] ml-auto" />
                  </div>
                ))}
              </div>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ─── 07. WATER / POWER / RECOVERY ENGINEERING ──────────────────────── */}
      <section className="py-32 px-6 bg-white border-t border-[#E5E5E0] text-[#1A1A18]">
        <div className="max-w-7xl mx-auto">
          <FadeSection>
            <ChapterLabel number="07" label="System Engineering" />
            <h2 className="font-extralight text-4xl md:text-6xl uppercase tracking-tight text-[#1A1A18] leading-tight mb-8 max-w-3xl">
              FROM WATER IN<br />
              <span className="text-alkota-orange">TO WATER BACK<br />UNDER CONTROL.</span>
            </h2>
            <p className="text-alkota-silver text-lg max-w-2xl leading-relaxed mb-16">
              For operations requiring environmental compliance, Alkota trailer systems can integrate the complete mobile water treatment circuit — capturing, filtering, and recycling wastewater on-site without connection to any drain.
            </p>
          </FadeSection>

          <div className="grid lg:grid-cols-5 gap-2 mb-16">
            {[
              { step: 'WATER IN', desc: 'Site mains or 2,000L onboard reservoir' },
              { step: 'ALKOTA SYSTEM', desc: 'Hot water, cold water, or steam at pressure' },
              { step: 'WORK AREA', desc: 'Contained wash zone with portable berms' },
              { step: 'RECOVERY', desc: 'VACGD vacuum capture from 100m distance' },
              { step: 'FILTER & REUSE', desc: 'VFS purification → recycled to tank' },
            ].map(({ step, desc }, i) => (
              <div key={step} className="relative">
                <div className="bg-alkota-black border border-alkota-iron p-5 text-center">
                  <div className="font-ibm-plex-mono text-[9px] font-bold uppercase tracking-[0.3em] text-alkota-orange mb-3">{step}</div>
                  <p className="text-alkota-grey text-xs leading-relaxed">{desc}</p>
                </div>
                {i < 4 && (
                  <div className="hidden lg:flex absolute -right-1 top-1/2 -translate-y-1/2 z-10">
                    <ChevronRight className="h-4 w-4 text-alkota-orange" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="border border-alkota-iron bg-alkota-black p-8">
              <div className="flex items-start gap-4 mb-6">
                <Recycle className="h-8 w-8 text-alkota-orange shrink-0 mt-1" />
                <div>
                  <h3 className="font-barlow-condensed text-2xl font-black uppercase italic text-white mb-2">Closed-Loop Recovery</h3>
                  <p className="text-alkota-grey text-sm leading-relaxed">
                    A fully closed-loop Alkota enclosed rig captures 100% of wash water, purifies it through 5 stages down to &lt;5mg/L hydrocarbon concentration, and returns it directly to the onboard pressure washer supply. No drain. No trade effluent consent. No water waste.
                  </p>
                </div>
              </div>
              <Link href="/water-treatment" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-alkota-orange">
                Explore Water Treatment Technology <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="border border-alkota-iron bg-alkota-black p-8">
              <div className="flex items-start gap-4 mb-6">
                <Shield className="h-8 w-8 text-alkota-orange shrink-0 mt-1" />
                <div>
                  <h3 className="font-barlow-condensed text-2xl font-black uppercase italic text-white mb-2">Environmental Compliance</h3>
                  <p className="text-alkota-grey text-sm leading-relaxed">
                    Washing in sensitive areas — harbours, town centres, fuel depots, water authority sites — requires containing and treating wastewater. The Alkota VFS-equipped trailer is the only mobile solution that can operate legally in these environments without additional site infrastructure.
                  </p>
                </div>
              </div>
              <Link href="/trailers/configure?preset=environmental-closed-loop" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-alkota-orange">
                Configure Environmental Recovery Rig <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 08. APPLICATIONS ───────────────────────────────────────────────── */}
      <section className="py-32 px-6 bg-alkota-black border-t border-alkota-iron">
        <div className="max-w-7xl mx-auto">
          <FadeSection>
            <ChapterLabel number="08" label="Applications" />
            <h2 className="font-barlow-condensed text-5xl md:text-6xl font-black uppercase italic text-white leading-tight tracking-tight mb-4">
              BUILT FOR YOUR<br />
              <span className="text-alkota-orange">INDUSTRY.</span>
            </h2>
            <p className="text-alkota-silver text-lg max-w-2xl leading-relaxed mb-16">
              Every sector listed here has a specific set of cleaning requirements, regulatory pressures, and operational constraints. Configure a rig tailored to your context.
            </p>
          </FadeSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SECTORS.map(({ icon: Icon, label, slug }) => (
              <Link
                key={label}
                href={`/trailers/configure?preset=${slug}`}
                className="group border border-alkota-iron bg-[#0A0A0A] p-6 hover:border-alkota-orange/50 hover:bg-alkota-orange/5 transition-all duration-300 flex flex-col gap-4"
              >
                <Icon className="h-6 w-6 text-alkota-orange" />
                <div>
                  <h4 className="font-barlow-condensed text-lg font-bold uppercase italic text-white mb-1">{label}</h4>
                  <p className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#555]">Configure for this sector</p>
                </div>
                <ChevronRight className="h-4 w-4 text-alkota-orange self-end group-hover:translate-x-1 transition-transform" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 09. PAYLOAD IS ENGINEERING ─────────────────────────────────────── */}
      <section className="py-32 px-6 bg-alkota-steel border-t border-alkota-iron">
        <div className="max-w-7xl mx-auto">
          <FadeSection>
            <ChapterLabel number="09" label="Payload Engineering" />
            <h2 className="font-barlow-condensed text-5xl md:text-6xl font-black uppercase italic text-white leading-tight tracking-tight mb-8 max-w-3xl">
              WATER IS<br />
              <span className="text-alkota-orange">VERY HEAVY.</span>
            </h2>
            <p className="text-alkota-silver text-lg max-w-2xl leading-relaxed mb-16">
              This is why mobile cleaning systems must be engineered rather than assembled casually. 1 litre of water weighs 1 kilogram. A 2,000L tank is 2,000kg of water — before the machine, trailer, fuel, generator, hose reels, and tools are counted.
            </p>
          </FadeSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {PAYLOAD_FACTS.map(({ value, label, sub }) => (
              <FadeSection key={label}>
                <div className="border border-alkota-iron bg-alkota-black p-6">
                  <div className="font-barlow-condensed text-4xl font-black text-alkota-orange mb-2">{value}</div>
                  <p className="text-white text-sm font-medium leading-snug mb-2">{label}</p>
                  <p className="text-alkota-grey text-xs leading-relaxed">{sub}</p>
                </div>
              </FadeSection>
            ))}
          </div>

          {/* Tow vehicle check tool */}
          <FadeSection>
            <div className="bg-alkota-black border border-alkota-iron p-8 max-w-2xl">
              <h3 className="font-barlow-condensed text-2xl font-black uppercase italic text-white mb-4">
                Quick Tow Vehicle Check
              </h3>
              <p className="text-alkota-grey text-sm leading-relaxed mb-6">
                Enter your vehicle's maximum braked towing capacity (from the V5C logbook or VIN plate) to see which Alkota trailer chassis is within your towing envelope.
              </p>
              <div className="flex items-center gap-3 mb-4">
                <input
                  type="number"
                  value={towCapacity}
                  onChange={e => setTowCapacity(e.target.value)}
                  placeholder="e.g. 3500"
                  className="flex-1 bg-[#111] border border-alkota-iron text-white px-4 py-3 font-inter text-sm focus:outline-none focus:border-alkota-orange"
                />
                <span className="text-alkota-grey text-sm font-medium shrink-0">kg capacity</span>
              </div>
              {towWarning && (
                <div className="border border-yellow-600/40 bg-yellow-900/10 px-4 py-3 text-yellow-400 text-xs font-medium">
                  ⚠ {towWarning}
                </div>
              )}
              {towOk && (
                <div className="border border-green-600/40 bg-green-900/10 px-4 py-3 text-green-400 text-xs font-medium">
                  ✓ {towOk}
                </div>
              )}
              <p className="text-[#444] text-[11px] mt-4">
                Note: All trailer configurations must be independently verified by an engineer prior to order. This tool is indicative only.
              </p>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ─── 10. BUILD PROCESS ───────────────────────────────────────────────── */}
      <section className="py-32 px-6 bg-alkota-black border-t border-alkota-iron">
        <div className="max-w-7xl mx-auto">
          <FadeSection>
            <ChapterLabel number="10" label="The Build Process" />
            <h2 className="font-barlow-condensed text-5xl md:text-6xl font-black uppercase italic text-white leading-tight tracking-tight mb-16 max-w-3xl">
              FROM BRIEF<br />
              <span className="text-alkota-orange">TO COMMISSIONED RIG.</span>
            </h2>
          </FadeSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BUILD_STEPS.map(({ phase, title, desc, icon: Icon }) => (
              <FadeSection key={phase}>
                <div className="group border border-alkota-iron bg-[#0A0A0A] p-7 hover:border-alkota-orange/40 transition-all duration-300 h-full">
                  <div className="flex items-start justify-between mb-6">
                    <span className="font-ibm-plex-mono text-[10px] font-bold text-alkota-orange tracking-[0.35em] uppercase">{phase}</span>
                    <Icon className="h-5 w-5 text-[#333] group-hover:text-alkota-orange transition-colors duration-300" />
                  </div>
                  <h4 className="font-barlow-condensed text-2xl font-black uppercase italic text-white mb-3">{title}</h4>
                  <p className="text-alkota-grey text-sm leading-relaxed">{desc}</p>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 11. BUILT IN THE UK ─────────────────────────────────────────────── */}
      <section className="py-32 px-6 bg-alkota-steel border-t border-alkota-iron">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <FadeSection>
              <ChapterLabel number="11" label="Provenance & Heritage" />
              <h2 className="font-barlow-condensed text-5xl font-black uppercase italic text-white leading-tight tracking-tight mb-8">
                SOUTH DAKOTA<br />POWER.<br />
                <span className="text-alkota-orange">ENGINEERED FOR<br />BRITISH OPERATIONS.</span>
              </h2>
              <p className="text-alkota-silver text-lg leading-relaxed mb-6">
                Alkota Manufacturing has built industrial cleaning equipment in South Dakota, USA, since 1964. Six decades of continuous-duty engineering. The machines are proven.
              </p>
              <p className="text-alkota-silver text-base leading-relaxed mb-10">
                Alkota UK takes those American machines and builds them into complete British mobile cleaning systems — engineered to UK road law, UK payload limits, WRAS water regulations, and UK Environment Agency requirements.
              </p>
              <div className="flex items-center gap-4">
                <span className="font-ibm-plex-mono text-[10px] font-bold text-alkota-orange">EST. 1964</span>
                <span className="h-px flex-1 bg-alkota-iron" />
                <span className="font-ibm-plex-mono text-[10px] text-[#555]">Alkota Manufacturing, Alcester, SD, USA</span>
              </div>
            </FadeSection>

            <FadeSection>
              <div className="space-y-6">
                {[
                  {
                    title: 'UK Type Approval & IVA Compliance',
                    desc: 'Every Alkota trailer is individually verified or type-approved to UK road traffic law requirements — not US DOT specifications.'
                  },
                  {
                    title: 'WRAS Category 5 Water Regulation',
                    desc: 'All onboard mains water connections incorporate WRAS-approved CAT 5 air gap break tanks preventing backflow contamination.'
                  },
                  {
                    title: 'UK Environment Agency Alignment',
                    desc: 'Recovery system specifications are reviewed against current EA Trade Effluent and Discharge guidelines, not generic manufacturer claims.'
                  },
                  {
                    title: '7-Year Coil Warranty',
                    desc: "Alkota's Schedule 80 hydro-insulated heating coils carry a 7-year warranty — the longest in the industry."
                  },
                ].map(({ title, desc }) => (
                  <div key={title} className="flex items-start gap-4 border-b border-alkota-iron pb-5">
                    <span className="h-1.5 w-1.5 rounded-full bg-alkota-orange shrink-0 mt-2" />
                    <div>
                      <h4 className="font-barlow-condensed text-base font-bold uppercase text-white mb-1">{title}</h4>
                      <p className="text-alkota-grey text-sm leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeSection>
          </div>
        </div>
      </section>

      {/* ─── 12. THE LOBBY ───────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-alkota-black border-t border-alkota-iron">
        <div className="max-w-7xl mx-auto">
          <FadeSection>
            <ChapterLabel number="12" label="Technical Knowledge" />
            <div className="flex items-end justify-between gap-8 mb-10">
              <h2 className="font-barlow-condensed text-4xl font-black uppercase italic text-white leading-tight">
                ALKOTA<br /><span className="text-alkota-orange">THE LOBBY.</span>
              </h2>
              <Link href="/lobby" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-alkota-orange shrink-0">
                All Technical Guides <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </FadeSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Bespoke Trailer Engineering — 12-Step Build Story', href: '/resources/case-studies/bespoke-trailer-builds' },
              { title: 'Trailer Payload & Towing — The Engineering Guide', href: '/lobby/engineering-design/trailer-payload-towing' },
              { title: 'Sizing a Mobile Wash System — Pressure vs Flow', href: '/lobby/engineering-design/sizing-mobile-wash-system' },
              { title: 'UK Wash-Water Recovery & Environmental Compliance', href: '/lobby/regulatory-compliance/wash-water-recovery' },
            ].map(({ title, href }) => (
              <Link
                key={title}
                href={href}
                className="group border border-alkota-iron bg-[#0A0A0A] p-5 hover:border-alkota-orange/40 transition-all duration-300"
              >
                <Lightbulb className="h-5 w-5 text-alkota-orange mb-4" />
                <h4 className="font-barlow-condensed text-base font-bold uppercase italic text-white mb-2 leading-snug group-hover:text-alkota-orange transition-colors">
                  {title}
                </h4>
                <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#555]">Read in The Lobby →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 14. FINAL CTA ───────────────────────────────────────────────────── */}
      <section className="relative py-40 px-6 bg-alkota-steel border-t border-alkota-iron overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-center bg-cover opacity-20"
            style={{ backgroundImage: "url('/assets/products/trailer-single.png')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-alkota-black via-alkota-black/90 to-alkota-black/50" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <FadeSection>
            <span className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-[0.4em] text-alkota-orange block mb-10">
              Alkota Trailers
            </span>
            <h2 className="font-barlow-condensed text-6xl md:text-8xl font-black uppercase italic text-white leading-[0.9] tracking-tight mb-8">
              THERE IS NO<br />STANDARD<br />
              <span className="text-alkota-orange">ALKOTA TRAILER.</span>
            </h2>
            <p className="text-alkota-silver text-xl leading-relaxed mb-16 max-w-2xl mx-auto">
              There is yours. Built around your operation, your payload, your operators, and your environment. The configurator is the starting point.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/trailers/configure"
                className="inline-flex items-center justify-center gap-3 bg-alkota-orange px-12 py-5 text-sm font-black uppercase tracking-[0.25em] text-white hover:bg-alkota-orange/90 transition-all duration-300 group"
              >
                <span>Build Your Alkota</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 border border-white/20 px-12 py-5 text-sm font-black uppercase tracking-[0.25em] text-white/70 hover:text-white hover:border-white/40 transition-all duration-300"
              >
                Speak to Engineering
              </Link>
            </div>
          </FadeSection>
        </div>
      </section>

      <Footer />
    </main>
  );
}
