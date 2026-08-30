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
  ExternalLink,
  BookOpen,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'One Great Northern × Alkota | Heavy Plant Cleaning Case Study',
  description:
    'See how Alkota pressure-washing equipment supports heavy-plant and crane cleaning, with the One Great Northern application explored through real-world engineering requirements.',
  openGraph: {
    title: 'One Great Northern × Alkota | Heavy Plant Cleaning Case Study',
    description:
      'See how Alkota pressure-washing equipment supports heavy-plant and crane cleaning, with the One Great Northern application explored through real-world engineering requirements.',
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

      {/* ── 00B: CUSTOMER & PROJECT VERIFICATION BADGE ─────────────── */}
      <div className="bg-[#EFEFEA] border-b border-[#E8E8E4] px-6 sm:px-12 py-4">
        <div className="mx-auto max-w-5xl flex items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-2 text-[#333]">
            <ShieldCheck className="h-4 w-4 text-[#10B981] shrink-0" />
            <span>Named Customer // Commercial Field Application · Chesterfield, Derbyshire</span>
          </div>
          <span className="hidden sm:inline-block px-2 py-0.5 bg-white border border-[#DDD] text-[10px] uppercase text-[#666]">
            Application Analysis
          </span>
        </div>
      </div>

      {/* ── 01: OPENING EDITORIAL SEQUENCE ─────────────────────────── */}
      <section className="border-b border-[#E8E8E4] bg-white py-20 sm:py-28 px-6 sm:px-12">
        <div className="mx-auto max-w-5xl">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#FF6900] block mb-4">
            01 // Operational Value
          </span>
          <h2 className="font-extralight text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-alkota-black leading-[1.05] mb-8">
            When the machines<br />
            <span className="text-[#FF6900]">are the business.</span>
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

            <div className="lg:col-span-5 bg-[#F8F7F4] p-6 sm:p-8 border border-[#E8E8E4] space-y-4 font-mono text-xs">
              <span className="text-[#888] block uppercase tracking-wider border-b border-[#E8E8E4] pb-2">
                Customer & Application Profile
              </span>
              <div className="space-y-3 text-alkota-black">
                <div>
                  <span className="text-[#888] block text-[10px] uppercase">Customer</span>
                  <span className="font-medium text-sm">One Great Northern</span>
                </div>
                <div>
                  <span className="text-[#888] block text-[10px] uppercase">Industry</span>
                  <span>Specialist Crane Hire & Contract Lifting</span>
                </div>
                <div>
                  <span className="text-[#888] block text-[10px] uppercase">Location</span>
                  <span>Chesterfield, Derbyshire, UK</span>
                </div>
                <div>
                  <span className="text-[#888] block text-[10px] uppercase">Primary Equipment Class</span>
                  <span>High-Output Continuous Hot-Water Wash Bay Skid</span>
                </div>
              </div>
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
            <span className="text-xs uppercase tracking-[0.2em] text-[#777] font-mono">The Operator Profile</span>
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

              <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-[#E8E8E4] text-xs font-mono">
                <div>
                  <span className="text-[#888] uppercase tracking-wider block text-[10px]">Headquarters</span>
                  <span className="text-alkota-black">Chesterfield, Derbyshire</span>
                </div>
                <div>
                  <span className="text-[#888] uppercase tracking-wider block text-[10px]">Primary Capability</span>
                  <span className="text-alkota-black">Mobile Crane & Plant Hire</span>
                </div>
                <div>
                  <span className="text-[#888] uppercase tracking-wider block text-[10px]">Geographic Reach</span>
                  <span className="text-alkota-black">National UK Operations</span>
                </div>
                <div>
                  <span className="text-[#888] uppercase tracking-wider block text-[10px]">Engineering Focus</span>
                  <span className="text-alkota-black">Plant Maintenance & Overhaul</span>
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
                <div className="absolute bottom-0 inset-x-0 bg-black/80 backdrop-blur-sm p-3 text-[11px] text-white flex items-center justify-between border-t border-white/10 font-mono">
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
            <span className="text-xs uppercase tracking-[0.2em] text-[#777] font-mono">The Physical Challenge</span>
          </div>

          <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-alkota-black leading-tight mb-8">
            Heavy equipment creates heavy cleaning problems.
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

      {/* ── 04: WHY HOT WATER & FLOW DYNAMICS ──────────────────────── */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 bg-[#121212] text-white border-b border-[#222]">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[#FF6900] tracking-widest">04</span>
            <span className="h-[1px] w-8 bg-[#FF6900]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#AAA] font-mono">The Science of Heat & Flow</span>
          </div>

          <h2 className="font-extralight text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white leading-[1.05] mb-6">
            Pressure moves dirt.<br />
            <span className="text-[#FF6900]">Heat changes the job.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#CCC] leading-relaxed max-w-3xl mb-14 font-normal">
            Cold water delivers mechanical impact, but when contamination is bound by grease and hydraulic oil, pressure alone merely pushes oily films across painted steel.
          </p>

          {/* 5-Factor Cleaning Dynamics Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-6 border-t border-white/15">
            <div className="p-5 bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#FF6900] font-mono mb-2">
                <Gauge className="h-4 w-4" />
                <span>Pressure</span>
              </div>
              <h4 className="font-light text-base uppercase tracking-tight text-white mb-2">Mechanical Force</h4>
              <p className="text-xs text-[#AAA] leading-relaxed font-normal">
                Provides initial shear velocity to break the physical bond between caked mud and bare metal.
              </p>
            </div>

            <div className="p-5 bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#FF6900] font-mono mb-2">
                <Droplets className="h-4 w-4" />
                <span>Flow Rate</span>
              </div>
              <h4 className="font-light text-base uppercase tracking-tight text-white mb-2">Flushing Volume</h4>
              <p className="text-xs text-[#AAA] leading-relaxed font-normal">
                Hydraulic litres-per-minute (18–25+ L/min) that carry loosened clay away from multi-axle recesses into drains.
              </p>
            </div>

            <div className="p-5 bg-white/5 border border-white/10 border-t-2 border-t-[#FF6900]">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#FF6900] font-mono mb-2">
                <Flame className="h-4 w-4" />
                <span>Thermal Heat</span>
              </div>
              <h4 className="font-light text-base uppercase tracking-tight text-white mb-2">Emulsification</h4>
              <p className="text-xs text-[#AAA] leading-relaxed font-normal">
                80°C–90°C heat melts grease and hydraulic oil into liquid emulsions that rinse without abrasive friction.
              </p>
            </div>

            <div className="p-5 bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#FF6900] font-mono mb-2">
                <Sparkles className="h-4 w-4" />
                <span>Chemical</span>
              </div>
              <h4 className="font-light text-base uppercase tracking-tight text-white mb-2">Targeted Dwell</h4>
              <p className="text-xs text-[#AAA] leading-relaxed font-normal">
                Low-chemical reliance. Hot water allows biodegradable detergents to work at peak chemical activation.
              </p>
            </div>

            <div className="p-5 bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#FF6900] font-mono mb-2">
                <Clock className="h-4 w-4" />
                <span>Turnaround</span>
              </div>
              <h4 className="font-light text-base uppercase tracking-tight text-white mb-2">Labour Output</h4>
              <p className="text-xs text-[#AAA] leading-relaxed font-normal">
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
            <span className="text-xs uppercase tracking-[0.2em] text-[#777] font-mono">Depot Operations</span>
          </div>

          <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-alkota-black leading-tight mb-4">
            Back from site. Cleaned. Checked. Ready again.
          </h2>
          <p className="text-sm text-[#777] uppercase tracking-wider font-mono mb-12">
            A representative professional heavy-fleet turnaround workflow
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
                Pristine structural steel allows technicians to inspect weld lines, hydraulic fittings, and pivot pins with visual clarity.
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

      {/* ── 06: ALKOTA FIELD NOTE ──────────────────────────────────── */}
      <section className="py-12 px-6 sm:px-12 bg-[#F8F7F4] border-b border-[#E8E8E4]">
        <div className="mx-auto max-w-5xl">
          <div className="p-8 bg-white border-l-4 border-[#FF6900] border-y border-r border-[#E8E8E4]">
            <div className="text-xs font-mono uppercase tracking-wider text-[#FF6900] mb-2">
              Alkota Field Note // Operational Infrastructure
            </div>
            <p className="text-base sm:text-lg text-alkota-black italic leading-relaxed mb-4">
              “Cleaning is part of maintaining equipment ready for work. When capital assets earn revenue through uptime and inspection pass-rates, washdown infrastructure is part of the operational fleet.”
            </p>
            <span className="text-xs text-[#777] font-mono uppercase tracking-wider block">
              Editorial Observation · Heavy Plant Maintenance Dynamics
            </span>
          </div>
        </div>
      </section>

      {/* ── 07: TECHNICAL SPECIFICATIONS & EVIDENCE PANEL ──────────── */}
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

        {/* Sources & References Register */}
        <section className="my-16 p-8 sm:p-10 bg-white border border-[#E8E8E4]">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#FF6900] mb-3 font-mono">
            <BookOpen className="h-4 w-4" />
            <span>SOURCES & FURTHER READING // SOURCE REGISTER</span>
          </div>
          <h3 className="font-extralight text-2xl uppercase tracking-tight text-alkota-black mb-6">
            Verified Operational & Engineering References
          </h3>
          <div className="space-y-4 text-xs text-[#555]">
            {caseStudy.externalSources?.map((src, idx) => (
              <div key={idx} className="p-4 bg-[#F8F7F4] border border-[#E8E8E4] flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-sm text-alkota-black font-normal">{src.title}</span>
                    {src.url && (
                      <a
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[#FF6900] hover:underline shrink-0 text-[11px] uppercase tracking-wider font-mono"
                      >
                        <span>View Source</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                  {src.author && <span className="text-[#666] block mt-0.5">{src.author}</span>}
                  <span className="text-[#888] block mt-0.5">{src.publisher} ({src.year})</span>
                  {src.note && <span className="text-[#777] italic block mt-1.5">{src.note}</span>}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Canonical Equipment */}
        <CaseStudyRelatedProducts
          productSlugs={caseStudy.relatedProductSlugs}
          fallbackCategory="hot-water"
          headline="Recommended Equipment for Heavy Fleet Washdowns"
        />

        {/* ── 08: CONSULTATIVE CONVERSION CTA ──────────────────────── */}
        <CaseStudyConsultationCTA
          eyebrow="FLEET WASHDOWN SPECIFICATION"
          headline="Your Equipment Works Hard. Your Cleaning System Should Too."
          description="Tell us what you're cleaning, how often it works and what contamination you're dealing with. We'll help specify the system around the job."
          primaryCTA={{
            label: 'Specify My System',
            href: '/tools/configurator',
          }}
          secondaryCTA={{
            label: 'Talk to an Engineer',
            href: '/contact',
          }}
        />
      </div>

      {/* ── 09: NEXT FIELD STORY ───────────────────────────────────── */}
      <CaseStudyNextStory nextSlug={caseStudy.nextStorySlug} />

      {/* ── GLOBAL FOOTER ─────────────────────────────────────────── */}
      <Footer />
    </main>
  );
}
