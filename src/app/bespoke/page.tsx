'use client';

import Navigation from '@/components/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import AccentLine from '@/components/ui/AccentLine';
import Reveal from '@/components/ui/Reveal';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Settings, Factory, ShieldCheck, Truck, CheckCircle2, PhoneCall } from 'lucide-react';

const INDUSTRIAL_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function BespokeBuildsPage() {
  const shouldReduceMotion = useReducedMotion();

  const categories = [
    {
      num: '01',
      title: 'Bespoke Trailer Systems',
      subtitle: 'Built from the chassis up — never bolted onto generic frames',
      desc: 'Single and tandem axle road-legal rigs engineered to safely carry baffled water tanks (450L–2,000L+), hot or cold high-pressure plant, dual-operator reels, hidden frame wiring, and optional coastal galvanisation or corporate RAL liveries.',
      cta: 'Configure a Trailer',
      href: '/trailers/configure',
      icon: Truck,
      specs: ['UK Road-Legal IVA / Lighting', 'Custom RAL Paint or Full Galvanising', 'Integrated Recovery & Filtration'],
    },
    {
      num: '02',
      title: 'Turnkey Wash Plants',
      subtitle: 'Multi-bay depot & heavy plant infrastructure',
      desc: 'End-to-end mechanical wash bay design: central heated plant rooms, overhead stainless booms, multi-bay remote start/stop stations, chemical dosing manifolds, and Environment Agency-compliant closed-loop water recycling.',
      cta: 'Explore Wash Plants',
      href: '/wash-plant',
      icon: Factory,
      specs: ['£100k–£1M+ CAPEX Delivery', 'Closed-Loop BS EN 858 Water Reclaim', 'Automated Chassis & Rig-Mat Washers'],
    },
    {
      num: '03',
      title: 'Custom Skid & Van Mounts',
      subtitle: 'Engineered for your exact vehicle footprint',
      desc: 'Truck-bed, utility-van, or containerised skid frames tailored to exact payload and dimensional limits. Available with 12V or 230V/115V burner systems, single-fuel diesel operation, and vibration-isolated subframes.',
      cta: 'Specify a Skid Unit',
      href: '/contact?enquiry=skid',
      icon: Settings,
      specs: ['Custom Footprint & Frame Fabrication', '12V DC / 230V / 400V Configurations', 'Single-Fuel Diesel Convenience'],
    },
    {
      num: '04',
      title: 'Specialist & Hazardous Duty',
      subtitle: 'When off-the-shelf catalogues stop short',
      desc: 'Long-run remote piping delivering hot water over 120 metres, automatic dual-gun clutch balancing, marine and offshore coastal protection, and hazardous-zone engineering reviews for petrochemical and utilities.',
      cta: 'Discuss Your Application',
      href: '/contact?enquiry=specialist',
      icon: ShieldCheck,
      specs: ['120m+ High-Pressure Hot Water Runs', 'Dual-Operator Pressure Balancing', 'Offshore & Coastal Spec Finishes'],
    },
  ];

  const process = [
    {
      step: '01',
      title: 'Site & Operational Brief',
      desc: 'Our UK applications engineers assess contamination type, water/power supply, daily duty hours, and vehicle or bay constraints.',
    },
    {
      step: '02',
      title: 'CAD & Engineering Proposal',
      desc: 'Detailed mechanical schematic, weight/payload distribution, flow & thermal calculations, and fixed commercial quotation.',
    },
    {
      step: '03',
      title: 'Precision Fabrication',
      desc: 'Hand-welded structural steel chassis, Schedule 80 coil integration, custom RAL powder coat or galvanising, and full factory hot-test.',
    },
    {
      step: '04',
      title: 'Commissioning & Handover',
      desc: 'UK delivery, on-site operator training, QR-linked digital schematics, and ongoing planned preventive maintenance support.',
    },
  ];

  const examples = [
    {
      tag: 'TRANSIT INFRASTRUCTURE',
      quote: 'Hot water delivered continuously over 120 metres (400 ft) at 19 L/min for rail and transit authority platform sanitisation.',
    },
    {
      tag: 'DUAL-OPERATOR FLEET',
      quote: 'Twin-operator tandem highway trailer with automatic clutch balancing for simultaneous full-pressure washdown across two lances.',
    },
    {
      tag: 'ENVIRONMENTAL COMPLIANCE',
      quote: 'Closed-loop wash plant integrating vacuum recovery, 3-stage media filtration, and oil-water separation for zero trade effluent discharge.',
    },
  ];

  return (
    <main className="min-h-screen bg-[#FAF9F5] text-alkota-black font-normal">
      <Navigation />

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative bg-[#0A0A0A] text-white pt-32 pb-24 px-6 sm:px-12 overflow-hidden border-b border-[#222]">
        <div className="absolute inset-0 z-0 opacity-30">
          <Image
            src="/assets/south-dakota-craft-hero.jpg"
            alt="Alkota Custom Engineering and Fabrication"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <Breadcrumbs items={[{ label: 'Bespoke Builds' }]} />

          <div className="mt-10 max-w-4xl">
            <div className="flex items-center gap-3 mb-5">
              <AccentLine widthClass="w-6" immediate />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-alkota-orange">
                Alkota Custom Engineering // USA &amp; UK
              </span>
            </div>

            <motion.h1
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: INDUSTRIAL_EASE }}
              className="font-extralight text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-white leading-[0.95] mb-6"
            >
              If You Can Dream It,<br />
              <span className="text-alkota-orange">We Can Build It.</span>
            </motion.h1>

            <p className="text-base sm:text-lg text-[#CCC] leading-relaxed max-w-2xl mb-10 font-normal">
              Up to 25% of every Alkota system that leaves our factory is custom-engineered. Backed by over 150 years of combined engineering experience in Alcester, South Dakota and full UK fabrication and commissioning support.
            </p>

            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/15 max-w-xl mb-10">
              <div>
                <span className="text-2xl sm:text-3xl font-extralight text-alkota-orange block">25%</span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#888]">Custom-Built Fleet Share</span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-extralight text-white block">150+ Yrs</span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#888]">Engineering Experience</span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-extralight text-white block">7-Year</span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#888]">Schedule 80 Coil Warranty</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact?enquiry=bespoke"
                className="inline-flex items-center gap-3 bg-alkota-orange text-white px-8 py-4 text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors rounded-[4px] btn-tactile no-underline"
              >
                <span>Start a Custom Brief</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/trailers/configure"
                className="inline-flex items-center gap-3 border border-white/30 text-white px-8 py-4 text-xs uppercase tracking-[0.2em] hover:border-white hover:bg-white hover:text-black transition-colors rounded-[4px] no-underline"
              >
                <span>Configure a Trailer</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CAPABILITY PILLARS ───────────────────────────────────── */}
      <section className="py-24 px-6 sm:px-12 max-w-7xl mx-auto">
        <Reveal className="max-w-3xl mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-alkota-orange block mb-3">
            // Custom Capabilities
          </span>
          <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-alkota-black leading-none mb-4">
            Four Custom Engineering Disciplines
          </h2>
          <p className="text-base text-[#555] leading-relaxed">
            Every custom rig is designed around real operational physics — matching axle weight, tank baffling, water flow, burner BTU, and UK regulatory compliance.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat, i) => (
            <Reveal
              key={cat.num}
              delay={i * 0.08}
              className="bg-white border border-[#E5E5E0] p-8 sm:p-10 flex flex-col justify-between rounded-[6px] shadow-tactile-sm hover:border-alkota-orange/40 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <cat.icon className="h-7 w-7 text-alkota-orange" />
                  <span className="font-mono text-xs text-[#999]">{cat.num}</span>
                </div>
                <h3 className="font-light text-2xl sm:text-3xl text-alkota-black mb-2">
                  {cat.title}
                </h3>
                <p className="font-mono text-[11px] uppercase tracking-wider text-alkota-orange mb-4">
                  {cat.subtitle}
                </p>
                <p className="text-sm text-[#555] leading-relaxed mb-6">
                  {cat.desc}
                </p>
                <ul className="space-y-2 mb-8 border-t border-[#EFEFEA] pt-5">
                  {cat.specs.map((spec) => (
                    <li key={spec} className="flex items-center gap-2.5 text-xs text-[#444]">
                      <CheckCircle2 className="h-3.5 w-3.5 text-alkota-orange shrink-0" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href={cat.href}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-alkota-black hover:text-alkota-orange transition-colors no-underline group"
              >
                <span>{cat.cta}</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── ENGINEERING PROCESS ──────────────────────────────────── */}
      <section className="bg-[#0D0D0B] text-white py-24 px-6 sm:px-12 border-y border-[#222]">
        <div className="max-w-7xl mx-auto">
          <Reveal className="max-w-2xl mb-16">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-alkota-orange block mb-3">
              // Delivery Methodology
            </span>
            <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-white leading-none">
              From Site Brief to Commissioned Rig
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((p, i) => (
              <Reveal key={p.step} delay={i * 0.08} className="border-t border-white/15 pt-6">
                <span className="font-extralight text-4xl text-alkota-orange block mb-3">{p.step}</span>
                <h3 className="font-light text-xl text-white mb-3">{p.title}</h3>
                <p className="text-sm text-[#999] leading-relaxed">{p.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── REAL WORLD SCENARIOS ─────────────────────────────────── */}
      <section className="py-24 px-6 sm:px-12 max-w-7xl mx-auto">
        <Reveal className="mb-12">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-alkota-orange block mb-3">
            // Proven In The Field
          </span>
          <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-alkota-black leading-none">
            Real-World Custom Deployments
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {examples.map((ex, i) => (
            <Reveal key={ex.tag} delay={i * 0.08} className="bg-white border border-[#E5E5E0] p-8 rounded-[6px]">
              <span className="font-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-4">
                {ex.tag}
              </span>
              <p className="text-sm text-[#444] leading-relaxed">
                &ldquo;{ex.quote}&rdquo;
              </p>
            </Reveal>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="bg-[#121210] text-white p-10 sm:p-14 rounded-[6px] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div>
            <h3 className="font-extralight text-2xl sm:text-4xl uppercase tracking-tight mb-2">
              Have a Non-Standard Cleaning Challenge?
            </h3>
            <p className="text-sm text-[#AAA] max-w-xl">
              Speak directly with our UK applications engineering desk to scope a custom trailer, skid, or turnkey wash plant.
            </p>
          </div>
          <Link
            href="/contact?enquiry=bespoke"
            className="inline-flex items-center gap-3 bg-alkota-orange text-white px-8 py-4 text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors rounded-[4px] shrink-0 no-underline btn-tactile"
          >
            <PhoneCall className="h-4 w-4" />
            <span>Speak to an Engineer</span>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
