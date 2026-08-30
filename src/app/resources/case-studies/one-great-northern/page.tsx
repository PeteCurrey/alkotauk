import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CaseStudyHeader from '@/components/case-studies/CaseStudyHeader';
import CaseStudySpecifications from '@/components/case-studies/CaseStudySpecifications';
import CaseStudyEvidencePanel from '@/components/case-studies/CaseStudyEvidencePanel';
import CaseStudyRelatedProducts from '@/components/case-studies/CaseStudyRelatedProducts';
import CaseStudyConsultationCTA from '@/components/case-studies/CaseStudyConsultationCTA';
import CaseStudyNextStory from '@/components/case-studies/CaseStudyNextStory';
import { getCaseStudyBySlug } from '@/lib/case-studies/data';
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Eye,
  Flame,
  Gauge,
  Droplets,
  Clock,
  Wrench,
  Truck,
  Building2,
  Compass,
  Layers,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'One Great Northern | Crane & Heavy Plant Cleaning Case Study | Alkota UK',
  description:
    'See how industrial hot-water pressure washing fits the demanding cleaning requirements of mobile cranes, heavy plant, and professional fleet operations at One Great Northern.',
  openGraph: {
    title: 'One Great Northern | Crane & Heavy Plant Cleaning Case Study | Alkota UK',
    description:
      'See how industrial hot-water pressure washing fits the demanding cleaning requirements of mobile cranes, heavy plant, and professional fleet operations at One Great Northern.',
    url: 'https://alkota.co.uk/resources/case-studies/one-great-northern',
    type: 'article',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'One Great Northern Mobile Crane Fleet & Heavy Plant Washdown',
      },
    ],
  },
  alternates: {
    canonical: 'https://alkota.co.uk/resources/case-studies/one-great-northern',
  },
};

export default function OneGreatNorthernPage() {
  const caseStudy = getCaseStudyBySlug('one-great-northern');
  if (!caseStudy) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': 'https://alkota.co.uk/resources/case-studies/one-great-northern#article',
        headline: caseStudy.title,
        description: caseStudy.standfirst,
        image: caseStudy.heroImage,
        datePublished: '2024-01-20T00:00:00Z',
        dateModified: new Date().toISOString(),
        author: {
          '@type': 'Organization',
          name: 'Alkota UK Editorial Intelligence',
          url: 'https://alkota.co.uk',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Alkota UK',
          url: 'https://alkota.co.uk',
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': 'https://alkota.co.uk/resources/case-studies/one-great-northern',
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
            name: 'Case Studies',
            item: 'https://alkota.co.uk/resources/case-studies',
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: 'One Great Northern',
            item: 'https://alkota.co.uk/resources/case-studies/one-great-northern',
          },
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#F8F7F4] text-alkota-black font-normal overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />

      {/* ── 00: FULL-VIEWPORT HERO ─────────────────────────────────── */}
      <CaseStudyHeader caseStudy={caseStudy} />

      {/* ── 01: OPENING EDITORIAL SEQUENCE ─────────────────────────── */}
      <section className="border-b border-[#E8E8E4] bg-white py-20 sm:py-28 px-6 sm:px-12">
        <div className="mx-auto max-w-5xl">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#FF6900] block mb-4">
            01 // Operational Value
          </span>
          <h2 className="font-extralight text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-alkota-black leading-[1.05] mb-8">
            A crane can be worth hundreds of thousands.<br />
            <span className="text-[#FF6900]">The dirt is the cheap part.</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start text-base sm:text-lg text-[#444] leading-relaxed">
            <div className="lg:col-span-7 space-y-6">
              <p>
                Mobile lifting equipment operates across roads, construction environments, industrial sites, and uneven working compounds. In heavy plant hire, equipment does not merely accumulate cosmetic dust; it gathers aggressive road film, traffic grime, caked clay slurry, hydraulic oil residue, and carbon deposits across multi-axle running gear.
              </p>
              <p>
                For a specialist mobile crane operator, cleaning is not an afterthought. It is the frontline process that keeps multi-axle chassis, hydraulic cylinders, outrigger beams, and slew rings in condition to be inspected, serviced, and safely deployed on the next contract lift.
              </p>
            </div>

            <div className="lg:col-span-5 bg-[#F8F7F4] p-6 sm:p-8 border border-[#E8E8E4] space-y-4">
              <span className="font-mono text-xs uppercase tracking-wider text-[#888] block border-b border-[#E8E8E4] pb-2">
                Five Fleet Cleanliness Demands
              </span>
              <ul className="space-y-3 text-xs sm:text-sm text-alkota-black">
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6900] shrink-0" />
                  <span><strong>Presentable:</strong> High-profile arrival on Tier-1 customer sites.</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6900] shrink-0" />
                  <span><strong>Inspectable:</strong> Clear visibility of critical structural welds and pins.</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6900] shrink-0" />
                  <span><strong>Maintainable:</strong> Preventing abrasive grit from tearing rod packings.</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6900] shrink-0" />
                  <span><strong>Serviceable:</strong> Rapid access to lubrication fittings and hydraulic lines.</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6900] shrink-0" />
                  <span><strong>Ready for Deployment:</strong> Swift turnaround between contract hires.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 02: THE OPERATOR PROFILE ───────────────────────────────── */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 bg-[#F8F7F4] border-b border-[#E8E8E4]">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[#FF6900] tracking-widest">02</span>
            <span className="h-[1px] w-8 bg-[#FF6900]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#777]">The Operator Profile</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6">
              <h2 className="font-extralight text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-alkota-black leading-tight mb-6">
                One Great Northern
              </h2>
              <p className="text-sm uppercase tracking-wider text-[#FF6900] font-mono mb-6">
                Chesterfield, Derbyshire · National Operations
              </p>
              <div className="space-y-4 text-base text-[#444] leading-relaxed">
                <p>
                  One Great Northern is an established mobile crane hire and plant specialist operating from Chesterfield, Derbyshire, supporting major infrastructure, steel erection, civil engineering, and specialist industrial lifting projects throughout the United Kingdom.
                </p>
                <p>
                  Their public positioning centres on modern equipment, certified operators, safety leadership, and comprehensive equipment maintenance capability. In this sector, client confidence is established the moment a multi-axle crane arrives at the compound gate.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-[#E8E8E4] text-xs">
                <div>
                  <span className="text-[#888] uppercase tracking-wider block text-[10px]">Headquarters</span>
                  <span className="text-alkota-black font-normal">Chesterfield, Derbyshire</span>
                </div>
                <div>
                  <span className="text-[#888] uppercase tracking-wider block text-[10px]">Primary Capability</span>
                  <span className="text-alkota-black font-normal">Mobile Crane & Plant Hire</span>
                </div>
                <div>
                  <span className="text-[#888] uppercase tracking-wider block text-[10px]">Geographic Reach</span>
                  <span className="text-alkota-black font-normal">National UK Operations</span>
                </div>
                <div>
                  <span className="text-[#888] uppercase tracking-wider block text-[10px]">Engineering Focus</span>
                  <span className="text-alkota-black font-normal">Plant Maintenance & Overhaul</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#EFEFEA] border border-[#E8E8E4] shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80"
                  alt="Industrial plant depot and mobile crane maintenance yard"
                  className="w-full h-full object-cover filter contrast-105"
                />
                <div className="absolute bottom-0 inset-x-0 bg-black/80 backdrop-blur-sm p-3 text-[11px] text-white flex items-center justify-between border-t border-white/10">
                  <span>Industrial depot hardstanding and heavy plant staging</span>
                  <span className="text-[#AAA] uppercase tracking-wider text-[10px]">Yard Operations</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 03: THE CLEANING PROBLEM ───────────────────────────────── */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 bg-white border-b border-[#E8E8E4]">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[#FF6900] tracking-widest">03</span>
            <span className="h-[1px] w-8 bg-[#FF6900]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#777]">The Physical Challenge</span>
          </div>

          <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-alkota-black leading-tight mb-8">
            The machine works. So does the dirt.
          </h2>

          <p className="text-base sm:text-lg text-[#555] leading-relaxed max-w-3xl mb-12">
            Heavy lifting plant presents a fundamentally different cleaning physics equation compared to light-commercial vehicles or flat warehouse walls.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-[#F8F7F4] border border-[#E8E8E4]">
              <span className="font-mono text-xs text-[#FF6900] block mb-2">01 / SURFACE AREA</span>
              <h3 className="font-light text-lg uppercase tracking-tight text-alkota-black mb-2">
                Massive Geometric Footprint
              </h3>
              <p className="text-xs sm:text-sm text-[#666] leading-relaxed">
                Multi-axle chassis, counterweight decks, outrigger beams, and telescoping booms represent hundreds of square metres of contamination-collecting surface area.
              </p>
            </div>

            <div className="p-6 bg-[#F8F7F4] border border-[#E8E8E4]">
              <span className="font-mono text-xs text-[#FF6900] block mb-2">02 / CONTAMINATION</span>
              <h3 className="font-light text-lg uppercase tracking-tight text-alkota-black mb-2">
                Oily Hydrophobic Binder
              </h3>
              <p className="text-xs sm:text-sm text-[#666] leading-relaxed">
                Site mud, clay slurry, and road salt combine with hydraulic weeping and grease to form a dense, sticky crust that cold water merely smears.
              </p>
            </div>

            <div className="p-6 bg-[#F8F7F4] border border-[#E8E8E4]">
              <span className="font-mono text-xs text-[#FF6900] block mb-2">03 / GEOMETRY</span>
              <h3 className="font-light text-lg uppercase tracking-tight text-alkota-black mb-2">
                Intricate Recesses & Pins
              </h3>
              <p className="text-xs sm:text-sm text-[#666] leading-relaxed">
                Outrigger slide pads, pivot pins, slew ring gear teeth, and brake assemblies trap abrasive grit in areas where high-volume rinsing is required.
              </p>
            </div>

            <div className="p-6 bg-[#F8F7F4] border border-[#E8E8E4]">
              <span className="font-mono text-xs text-[#FF6900] block mb-2">04 / ASSET VALUE</span>
              <h3 className="font-light text-lg uppercase tracking-tight text-alkota-black mb-2">
                Capital Protection
              </h3>
              <p className="text-xs sm:text-sm text-[#666] leading-relaxed">
                Mobile cranes represent significant capital investment. Preventing abrasive grit from tearing hydraulic cylinder packings preserves asset lifecycle.
              </p>
            </div>

            <div className="p-6 bg-[#F8F7F4] border border-[#E8E8E4]">
              <span className="font-mono text-xs text-[#FF6900] block mb-2">05 / UPTIME</span>
              <h3 className="font-light text-lg uppercase tracking-tight text-alkota-black mb-2">
                Industrial Reliability
              </h3>
              <p className="text-xs sm:text-sm text-[#666] leading-relaxed">
                Fleet cleaning equipment must be as reliable as the crane itself. An operator cannot build depot turnaround workflows around delicate machinery.
              </p>
            </div>

            <div className="p-6 bg-[#F8F7F4] border border-[#E8E8E4]">
              <span className="font-mono text-xs text-[#FF6900] block mb-2">06 / PRESENTATION</span>
              <h3 className="font-light text-lg uppercase tracking-tight text-alkota-black mb-2">
                Customer Site Perception
              </h3>
              <p className="text-xs sm:text-sm text-[#666] leading-relaxed">
                Immaculate machinery arriving on site signals engineering discipline, safety compliance, and operator professionalism to the client.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 04: WHY HOT WATER (PHYSICS OF CLEANING) ────────────────── */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 bg-[#121212] text-white border-b border-[#222]">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[#FF6900] tracking-widest">04</span>
            <span className="h-[1px] w-8 bg-[#FF6900]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#AAA]">The Science of Heat</span>
          </div>

          <h2 className="font-extralight text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white leading-[1.05] mb-6">
            Pressure moves dirt.<br />
            <span className="text-[#FF6900]">Heat changes the job.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#CCC] leading-relaxed max-w-3xl mb-14 font-normal">
            Cold water delivers mechanical force, but when contamination is bound by grease and oils, pressure alone merely pushes oily films across painted steel. Professional cleaning performance is a balanced system.
          </p>

          {/* 5-Factor Cleaning Dynamics Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-6 border-t border-white/15">
            <div className="p-5 bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#FF6900] font-mono mb-2">
                <Gauge className="h-4 w-4" />
                <span>Pressure</span>
              </div>
              <h4 className="font-light text-base uppercase tracking-tight text-white mb-2">Mechanical Force</h4>
              <p className="text-xs text-[#AAA] leading-relaxed">
                Provides the initial shear velocity to break the physical bond between caked mud and bare metal.
              </p>
            </div>

            <div className="p-5 bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#FF6900] font-mono mb-2">
                <Droplets className="h-4 w-4" />
                <span>Flow Rate</span>
              </div>
              <h4 className="font-light text-base uppercase tracking-tight text-white mb-2">Flushing Volume</h4>
              <p className="text-xs text-[#AAA] leading-relaxed">
                Hydraulic litres-per-minute that carry loosened clay and slurry away from recesses and into drains.
              </p>
            </div>

            <div className="p-5 bg-white/5 border border-white/10 border-t-2 border-t-[#FF6900]">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#FF6900] font-mono mb-2">
                <Flame className="h-4 w-4" />
                <span>Thermal Heat</span>
              </div>
              <h4 className="font-light text-base uppercase tracking-tight text-white mb-2">Emulsification</h4>
              <p className="text-xs text-[#AAA] leading-relaxed">
                80°C–90°C heat melts grease and hydraulic oil into liquid emulsions that rinse without abrasive friction.
              </p>
            </div>

            <div className="p-5 bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#FF6900] font-mono mb-2">
                <Sparkles className="h-4 w-4" />
                <span>Chemical</span>
              </div>
              <h4 className="font-light text-base uppercase tracking-tight text-white mb-2">Targeted Dwell</h4>
              <p className="text-xs text-[#AAA] leading-relaxed">
                Low-chemical reliance. Hot water allows biodegradable detergents to work at peak chemical activation.
              </p>
            </div>

            <div className="p-5 bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#FF6900] font-mono mb-2">
                <Clock className="h-4 w-4" />
                <span>Turnaround</span>
              </div>
              <h4 className="font-light text-base uppercase tracking-tight text-white mb-2">Labour Output</h4>
              <p className="text-xs text-[#AAA] leading-relaxed">
                Dramatically reduces wash times per axle, returning high-value mobile plant to service faster.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 05: IN THE YARD (WORKFLOW) ─────────────────────────────── */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 bg-white border-b border-[#E8E8E4]">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[#FF6900] tracking-widest">05</span>
            <span className="h-[1px] w-8 bg-[#FF6900]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#777]">Depot Operations</span>
          </div>

          <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-alkota-black leading-tight mb-4">
            Back from site. Cleaned. Checked. Ready again.
          </h2>
          <p className="text-sm text-[#777] uppercase tracking-wider font-mono mb-12">
            A typical professional heavy-fleet turnaround workflow
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-[#F8F7F4] border-l-2 border-[#FF6900] border-y border-r border-[#E8E8E4]">
              <span className="font-mono text-xs text-[#FF6900] block mb-1">STAGE 01</span>
              <h3 className="font-light text-xl uppercase tracking-tight text-alkota-black mb-2">01 / Return</h3>
              <p className="text-xs sm:text-sm text-[#666] leading-relaxed">
                Mobile crane returns from contract site to depot hardstanding, carrying road film, wet mud, and quarry grime.
              </p>
            </div>

            <div className="p-6 bg-[#F8F7F4] border-l-2 border-[#FF6900] border-y border-r border-[#E8E8E4]">
              <span className="font-mono text-xs text-[#FF6900] block mb-1">STAGE 02</span>
              <h3 className="font-light text-xl uppercase tracking-tight text-alkota-black mb-2">02 / Washdown</h3>
              <p className="text-xs sm:text-sm text-[#666] leading-relaxed">
                High-flow initial pass flushes loose mud, clay, and abrasive road salts from multi-axle undercarriages.
              </p>
            </div>

            <div className="p-6 bg-[#F8F7F4] border-l-2 border-[#FF6900] border-y border-r border-[#E8E8E4]">
              <span className="font-mono text-xs text-[#FF6900] block mb-1">STAGE 03</span>
              <h3 className="font-light text-xl uppercase tracking-tight text-alkota-black mb-2">03 / Degrease</h3>
              <p className="text-xs sm:text-sm text-[#666] leading-relaxed">
                High-temperature hot water dissolves grease and hydraulic film around outrigger cylinders and slew ring housings.
              </p>
            </div>

            <div className="p-6 bg-[#F8F7F4] border-l-2 border-[#FF6900] border-y border-r border-[#E8E8E4]">
              <span className="font-mono text-xs text-[#FF6900] block mb-1">STAGE 04</span>
              <h3 className="font-light text-xl uppercase tracking-tight text-alkota-black mb-2">04 / Detail</h3>
              <p className="text-xs sm:text-sm text-[#666] leading-relaxed">
                Targeted cleaning of cab steps, alloy wheels, mirrors, boom slides, and rigging equipment lockboxes.
              </p>
            </div>

            <div className="p-6 bg-[#F8F7F4] border-l-2 border-[#FF6900] border-y border-r border-[#E8E8E4]">
              <span className="font-mono text-xs text-[#FF6900] block mb-1">STAGE 05</span>
              <h3 className="font-light text-xl uppercase tracking-tight text-alkota-black mb-2">05 / Inspect</h3>
              <p className="text-xs sm:text-sm text-[#666] leading-relaxed">
                Pristine structural steel allows technicians to inspect weld lines, hydraulic fittings, and pivot pins with total visual clarity.
              </p>
            </div>

            <div className="p-6 bg-[#F8F7F4] border-l-2 border-[#FF6900] border-y border-r border-[#E8E8E4]">
              <span className="font-mono text-xs text-[#FF6900] block mb-1">STAGE 06</span>
              <h3 className="font-light text-xl uppercase tracking-tight text-alkota-black mb-2">06 / Ready</h3>
              <p className="text-xs sm:text-sm text-[#666] leading-relaxed">
                Lubrication points greased, pre-hire checks completed, and the asset staged ready for its next contract lift.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 06: CLEANING + MAINTENANCE CONNECTION ─────────────────── */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 bg-[#F8F7F4] border-b border-[#E8E8E4]">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[#FF6900] tracking-widest">06</span>
            <span className="h-[1px] w-8 bg-[#FF6900]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#777]">Maintenance & Overhaul</span>
          </div>

          <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-alkota-black leading-tight mb-8">
            You can see more when the machine is clean.
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-base sm:text-lg text-[#444] leading-relaxed">
              <p>
                In specialist crane hire and machinery maintenance, thorough cleaning is the prerequisite for rigorous engineering inspection. Thick layers of road grime and hydraulic film can obscure early warning signs of mechanical wear.
              </p>
              <p>
                A clean chassis enables mechanics and certified inspectors to instantly spot hydraulic hose micro-cracks, loose retaining bolts, weeping fittings, pin play, and subtle structural weld fatigue before the machine travels to another site.
              </p>
              <div className="p-6 bg-white border-l-4 border-[#121212] border-y border-r border-[#E8E8E4] text-xs sm:text-sm text-[#333] italic">
                <strong>Important Engineering Note:</strong> Cleaning supports inspection. It does not replace scheduled statutory LOLER/PUWER examinations, manufacturer servicing, or non-destructive testing protocols.
              </div>
            </div>

            <div className="lg:col-span-5 bg-white p-8 border border-[#E8E8E4] space-y-4">
              <span className="font-mono text-xs uppercase tracking-wider text-[#FF6900] block border-b border-[#E8E8E4] pb-2">
                Key Visual Inspection Points
              </span>
              <ul className="space-y-3 text-xs sm:text-sm text-[#555]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#FF6900] shrink-0 mt-0.5" />
                  <span>Hydraulic cylinder seals and rod surface pitting</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#FF6900] shrink-0 mt-0.5" />
                  <span>Outrigger box structural weld seams</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#FF6900] shrink-0 mt-0.5" />
                  <span>Multi-axle steering linkages and kingpin grease seals</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#FF6900] shrink-0 mt-0.5" />
                  <span>Brake chamber fittings and air lines</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#FF6900] shrink-0 mt-0.5" />
                  <span>Slew ring bolt tension and gear teeth condition</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 07: FLEET PRESENTATION ─────────────────────────────────── */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 bg-white border-b border-[#E8E8E4]">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[#FF6900] tracking-widest">07</span>
            <span className="h-[1px] w-8 bg-[#FF6900]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#777]">Brand & Perception</span>
          </div>

          <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-alkota-black leading-tight mb-8">
            The machine is part of your reputation.
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-6 text-base sm:text-lg text-[#444] leading-relaxed">
              <p>
                A modern crane fleet is both a productive engineering asset and a highly visible representation of the operator behind it. When equipment arrives on client premises — whether a nuclear power station, a busy steel fabrication yard, or a major highway bridge lift — initial visual presentation communicates competence.
              </p>
              <p>
                Keeping working machinery clean is not about turning heavy plant into a delicate showroom ornament. It is about operating valuable working iron with the pride, discipline, and attention to detail that industrial clients expect.
              </p>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-[16/10] overflow-hidden bg-[#EFEFEA] border border-[#E8E8E4]">
                <img
                  src="https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=80"
                  alt="Specialist mobile crane operating on site"
                  className="w-full h-full object-cover filter contrast-105"
                />
                <div className="absolute bottom-0 inset-x-0 bg-black/80 backdrop-blur-sm p-3 text-[11px] text-white flex items-center justify-between border-t border-white/10">
                  <span>Professional crane fleet presentation on commercial contract site</span>
                  <span className="text-[#AAA] uppercase tracking-wider text-[10px]">Client Staging</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 08: WHY INDUSTRIAL EQUIPMENT ───────────────────────────── */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 bg-[#0D0D0B] text-white border-b border-[#222]">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[#FF6900] tracking-widest">08</span>
            <span className="h-[1px] w-8 bg-[#FF6900]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#AAA]">The Alkota Difference</span>
          </div>

          <h2 className="font-extralight text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white leading-[1.05] mb-8">
            A pressure washer is easy to buy.<br />
            <span className="text-[#FF6900]">An industrial machine has to keep working.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#CCC] leading-relaxed max-w-3xl mb-12 font-normal">
            Under daily commercial wash bay duty cycles, consumer or lightweight commercial pressure washers quickly suffer pump fatigue, electrical failures, and cracked heating coils. Alkota is built around pure industrial longevity.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-white/5 border border-white/10">
              <span className="font-mono text-xs text-[#FF6900] block mb-2">METALLURGY</span>
              <h4 className="font-light text-base uppercase tracking-tight text-white mb-2">
                Schedule 80 Steel Coils
              </h4>
              <p className="text-xs text-[#AAA] leading-relaxed">
                ASTM A53 seamless cold-rolled steel pipe resists extreme thermal shock and aggressive hard water. Backed by our 7-year coil guarantee.
              </p>
            </div>

            <div className="p-6 bg-white/5 border border-white/10">
              <span className="font-mono text-xs text-[#FF6900] block mb-2">HYDRAULICS</span>
              <h4 className="font-light text-base uppercase tracking-tight text-white mb-2">
                Low-RPM Triplex Pumps
              </h4>
              <p className="text-xs text-[#AAA] leading-relaxed">
                Slow-running ceramic plunger pumps operate at cooler temperatures with reduced seal friction for thousands of trouble-free hours.
              </p>
            </div>

            <div className="p-6 bg-white/5 border border-white/10">
              <span className="font-mono text-xs text-[#FF6900] block mb-2">DESIGN</span>
              <h4 className="font-light text-base uppercase tracking-tight text-white mb-2">
                Open-Chassis Serviceability
              </h4>
              <p className="text-xs text-[#AAA] leading-relaxed">
                No fragile plastic housings. Fuel strainers, pump oil drains, and unloader valves are instantly accessible with standard hand tools.
              </p>
            </div>

            <div className="p-6 bg-white/5 border border-white/10">
              <span className="font-mono text-xs text-[#FF6900] block mb-2">SUPPORT</span>
              <h4 className="font-light text-base uppercase tracking-tight text-white mb-2">
                UK Parts & Servicing
              </h4>
              <p className="text-xs text-[#AAA] leading-relaxed">
                Direct UK technical support, preventative maintenance contracts, and rapid dispatch on genuine factory replacement parts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 09: WHAT THE SYSTEM IS THERE TO DELIVER ───────────────── */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 bg-white border-b border-[#E8E8E4]">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[#FF6900] tracking-widest">09</span>
            <span className="h-[1px] w-8 bg-[#FF6900]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#777]">Operational Objectives</span>
          </div>

          <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-alkota-black leading-tight mb-4">
            What the system is there to deliver.
          </h2>
          <p className="text-sm text-[#777] uppercase tracking-wider font-mono mb-12">
            Qualitative performance goals for heavy fleet wash bays
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-[#F8F7F4] border border-[#E8E8E4]">
              <h3 className="font-light text-base uppercase tracking-tight text-alkota-black mb-2">
                Effective Heavy-Equipment Cleaning
              </h3>
              <p className="text-xs sm:text-sm text-[#666] leading-relaxed">
                Reliable removal of stubborn road film, clay slurry, and traffic contamination across multi-axle undercarriages.
              </p>
            </div>

            <div className="p-6 bg-[#F8F7F4] border border-[#E8E8E4]">
              <h3 className="font-light text-base uppercase tracking-tight text-alkota-black mb-2">
                Support for Fleet Presentation
              </h3>
              <p className="text-xs sm:text-sm text-[#666] leading-relaxed">
                Maintaining corporate identity and professional equipment standards on client contract arrivals.
              </p>
            </div>

            <div className="p-6 bg-[#F8F7F4] border border-[#E8E8E4]">
              <h3 className="font-light text-base uppercase tracking-tight text-alkota-black mb-2">
                Grease & Oil Emulsification
              </h3>
              <p className="text-xs sm:text-sm text-[#666] leading-relaxed">
                High continuous water temperatures to liquefy sticky hydrocarbons around outriggers and hubs without harsh chemicals.
              </p>
            </div>

            <div className="p-6 bg-[#F8F7F4] border border-[#E8E8E4]">
              <h3 className="font-light text-base uppercase tracking-tight text-alkota-black mb-2">
                Dependable Industrial Duty
              </h3>
              <p className="text-xs sm:text-sm text-[#666] leading-relaxed">
                Continuous-duty components that run without thermal cutouts during intensive multi-vehicle wash shifts.
              </p>
            </div>

            <div className="p-6 bg-[#F8F7F4] border border-[#E8E8E4]">
              <h3 className="font-light text-base uppercase tracking-tight text-alkota-black mb-2">
                Maintainable Architecture
              </h3>
              <p className="text-xs sm:text-sm text-[#666] leading-relaxed">
                Straightforward mechanical design enabling yard technicians to perform routine servicing quickly.
              </p>
            </div>

            <div className="p-6 bg-[#F8F7F4] border border-[#E8E8E4]">
              <h3 className="font-light text-base uppercase tracking-tight text-alkota-black mb-2">
                Practical Day-to-Day Usability
              </h3>
              <p className="text-xs sm:text-sm text-[#666] leading-relaxed">
                Simple trigger operation, heavy-duty hose reels, and rapid winterisation procedures for harsh British weather.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 10: TECHNICAL SPECIFICATIONS TABLE ─────────────────────── */}
      <div className="mx-auto max-w-5xl px-6 sm:px-12 py-16">
        <CaseStudySpecifications
          specifications={caseStudy.specifications || []}
          title="Fleet Washdown Application Parameters"
          subtitle="Engineering parameters recorded for heavy crane and mobile plant wash bay installations"
        />

        {/* Customer Evidence (Renders if available) */}
        <CaseStudyEvidencePanel
          evidence={caseStudy.evidence}
          clientName={caseStudy.clientName}
        />

        {/* Canonical Equipment: Clearly distinguished as recommended for this application */}
        <CaseStudyRelatedProducts
          productSlugs={caseStudy.relatedProductSlugs}
          fallbackCategory="hot-water"
          headline="Recommended Equipment for Heavy Fleet Washdowns"
        />

        {/* ── 11: CONSULTATIVE CONVERSION CTA ──────────────────────── */}
        <CaseStudyConsultationCTA
          eyebrow="FLEET WASHDOWN SPECIFICATION"
          headline="Your Machine Doesn’t Have to Lift 100 Tonnes to Deserve the Right Cleaning System."
          description="Tell us what you're cleaning, how often it works and what contamination you're dealing with. We'll help specify the system around the job."
          primaryCTA={{
            label: 'Specify My Cleaning System',
            href: '/industries/transport-fleet',
          }}
          secondaryCTA={{
            label: 'Explore Hot Water Machines',
            href: '/machines/hot-water',
          }}
        />
      </div>

      {/* ── 12: NEXT FIELD STORY ───────────────────────────────────── */}
      <CaseStudyNextStory nextSlug={caseStudy.nextStorySlug} />

      {/* ── GLOBAL FOOTER ─────────────────────────────────────────── */}
      <Footer />
    </main>
  );
}
