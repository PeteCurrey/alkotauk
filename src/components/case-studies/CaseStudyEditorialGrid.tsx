'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, ShieldCheck, MapPin, Tag, Wrench } from 'lucide-react';
import { CaseStudy } from '@/lib/case-studies/types';

interface Props {
  caseStudies: CaseStudy[];
}

export default function CaseStudyEditorialGrid({ caseStudies }: Props) {
  // Filter out Antarctica because it is the featured flagship above
  const stories = caseStudies.filter((cs) => cs.slug !== 'antarctica-lake-whillans');
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');

  const filters = [
    { label: 'All Stories', key: 'ALL' },
    { label: 'Fleet & Heavy Plant', key: 'FLEET' },
    { label: 'Facilities & Industrial', key: 'INDUSTRIAL' },
    { label: 'Agriculture', key: 'AGRICULTURE' },
    { label: 'Marine & Maritime', key: 'MARINE' },
    { label: 'Oil & Gas', key: 'OILFIELD' },
    { label: 'Bespoke Rigs', key: 'BESPOKE' },
  ];

  const filteredStories = stories.filter((story) => {
    if (selectedFilter === 'ALL') return true;
    if (selectedFilter === 'FLEET' && (story.slug === 'one-great-northern' || story.slug === 'professional-cleaning-contractors')) return true;
    if (selectedFilter === 'INDUSTRIAL' && (story.slug === 'entirefm-industrial-cleaning' || story.slug === 'professional-cleaning-contractors')) return true;
    if (selectedFilter === 'AGRICULTURE' && story.slug === 'agriculture') return true;
    if (selectedFilter === 'MARINE' && story.slug === 'marine') return true;
    if (selectedFilter === 'OILFIELD' && story.slug === 'oilfield') return true;
    if (selectedFilter === 'BESPOKE' && story.slug === 'bespoke-trailer-builds') return true;
    return true;
  });

  return (
    <section className="bg-[#F8F7F4] text-alkota-black py-24 sm:py-32 px-6 sm:px-12 font-normal border-b border-[#E8E8E4]">
      <div className="mx-auto max-w-7xl w-full">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 mb-3">
            <span className="h-[1.5px] w-6 bg-[#FF6900]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#FF6900]">
              Field Index & Real-World Operations
            </span>
          </div>
          <h2 className="font-extralight text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-alkota-black leading-none mb-6">
            Documented Field Stories
          </h2>
          <p className="text-base sm:text-lg text-[#555] leading-relaxed">
            Exploration of actual operating environments across the UK. How professional contractors, fleet managers, and industrial teams deploy Alkota thermal power.
          </p>
        </div>

        {/* Filter Navigation Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-20 pb-6 border-b border-[#E8E8E4] text-xs">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setSelectedFilter(f.key)}
              className={`px-4 py-2 uppercase tracking-wider transition-all cursor-pointer ${
                selectedFilter === f.key
                  ? 'bg-[#121212] text-white'
                  : 'bg-white border border-[#E8E8E4] text-[#666] hover:text-black hover:border-black'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Asymmetrical Editorial Composition Stream */}
        <div className="space-y-24 sm:space-y-32">
          {/* Story 01: ONE GREAT NORTHERN (Split-screen with heavy typography & spec highlight) */}
          {filteredStories.some((s) => s.slug === 'one-great-northern') && (
            <article className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
              <div className="lg:col-span-6 order-2 lg:order-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs uppercase tracking-[0.2em] text-[#FF6900] font-normal">
                    01 // Crane Hire & Heavy Plant
                  </span>
                  <span className="text-[10px] uppercase px-2.5 py-0.5 bg-[#EAEAEA] text-[#555] border border-[#DDD] font-normal">
                    Named Customer / Field Application
                  </span>
                </div>
                <h3 className="font-extralight text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-alkota-black leading-tight mb-4">
                  Keeping Heavy Equipment Ready for the Next Lift.
                </h3>
                <p className="text-sm font-normal text-[#FF6900] uppercase tracking-wider mb-4">
                  One Great Northern · Chesterfield, UK
                </p>
                <p className="text-base text-[#555] leading-relaxed mb-6">
                  Mobile cranes operate in punishing groundworks, collecting heavy clay, abrasive grit, and hydraulic film. One Great Northern uses Alkota hot-water cleaning to keep structural steel, outriggers, and multi-axle steering gear pristine for certified pre-lift NDT inspections.
                </p>
                <div className="p-4 bg-white border border-[#E8E8E4] mb-8 grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-[#888] block uppercase text-[10px] tracking-wider">Primary Application</span>
                    <span className="text-alkota-black font-normal">Chassis & Outrigger Degreasing</span>
                  </div>
                  <div>
                    <span className="text-[#888] block uppercase text-[10px] tracking-wider">Key Requirement</span>
                    <span className="text-alkota-black font-normal">High Thermal Emulsification</span>
                  </div>
                </div>
                <Link
                  href="/resources/case-studies/one-great-northern"
                  className="inline-flex items-center gap-3 bg-[#121212] text-white px-7 py-4 text-xs uppercase tracking-[0.2em] hover:bg-[#FF6900] transition-colors font-normal no-underline group"
                >
                  <span>Read Field Story</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
              <div className="lg:col-span-6 order-1 lg:order-2">
                <Link href="/resources/case-studies/one-great-northern" className="block relative aspect-[16/11] overflow-hidden bg-[#EFEFEA] group">
                  <img
                    src="https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1600&q=80"
                    alt="Mobile crane washdown in UK yard"
                    className="w-full h-full object-cover filter contrast-105 transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:opacity-0" />
                  <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm text-white px-3 py-1.5 text-[11px] uppercase tracking-wider">
                    One Great Northern / Chesterfield Depot
                  </div>
                </Link>
              </div>
            </article>
          )}

          {/* Story 02: ENTIREFM (Full-width cinematic frame with embedded editorial callout) */}
          {filteredStories.some((s) => s.slug === 'entirefm-industrial-cleaning') && (
            <article className="border-t border-[#E8E8E4] pt-20">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
                <div className="lg:col-span-7 relative min-h-[340px] sm:min-h-[440px] bg-[#EFEFEA] overflow-hidden group">
                  <img
                    src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1800&q=80"
                    alt="Industrial floor and warehouse cleaning operations"
                    className="w-full h-full object-cover filter contrast-105 transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <span className="text-xs uppercase tracking-[0.2em] text-[#FF6900] block mb-1">
                      Facilities Management // National
                    </span>
                    <h4 className="text-xl sm:text-2xl font-light uppercase tracking-tight">
                      EntireFM Industrial Operations
                    </h4>
                  </div>
                </div>
                <div className="lg:col-span-5 flex flex-col justify-between bg-white p-8 sm:p-12 border border-[#E8E8E4]">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs uppercase tracking-[0.2em] text-[#FF6900] font-normal">
                        02 // Industrial Cleaning
                      </span>
                      <span className="text-[10px] uppercase px-2.5 py-0.5 bg-[#EAEAEA] text-[#555] border border-[#DDD] font-normal">
                        Named Customer / Field Application
                      </span>
                    </div>
                    <h3 className="font-extralight text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight text-alkota-black leading-tight mb-4">
                      When Cleaning Becomes an Engineering Job.
                    </h3>
                    <p className="text-sm sm:text-base text-[#555] leading-relaxed mb-6">
                      Hardened forklift tyre burns, heavy gearbox oil pools, and years of atmospheric soot. EntireFM deploys Alkota hot-water skids to complete demanding commercial facility degreasing on fixed weekend contract windows.
                    </p>
                    <div className="space-y-2 text-xs text-[#666] mb-8 pb-6 border-b border-[#E8E8E4]">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-[#FF6900] rounded-full" />
                        <span>Logistics Hubs & Warehouse Floor Scrubbing</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-[#FF6900] rounded-full" />
                        <span>Factory Decommissioning & Plant Footprint Degreasing</span>
                      </div>
                    </div>
                  </div>
                  <Link
                    href="/resources/case-studies/entirefm-industrial-cleaning"
                    className="inline-flex items-center justify-between bg-[#121212] text-white px-7 py-4 text-xs uppercase tracking-[0.2em] hover:bg-[#FF6900] transition-colors font-normal no-underline group"
                  >
                    <span>Read EntireFM Case Study</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </article>
          )}

          {/* Story 03 & 04: CONTRACTORS & AGRICULTURE (Side-by-side differentiated editorial modules) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 border-t border-[#E8E8E4] pt-20">
            {/* Story 03: Professional Cleaning Contractors */}
            {filteredStories.some((s) => s.slug === 'professional-cleaning-contractors') && (
              <article className="flex flex-col justify-between bg-white border border-[#E8E8E4] p-8 sm:p-10">
                <div>
                  <div className="aspect-[16/10] overflow-hidden bg-[#EFEFEA] mb-6">
                    <img
                      src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80"
                      alt="Commercial pressure washing surface restoration"
                      className="w-full h-full object-cover filter contrast-105"
                    />
                  </div>
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#FF6900] mb-2">
                    <span>03 // Contract Cleaning</span>
                    <span className="text-[#999]">·</span>
                    <span className="text-[#888]">Industry Application</span>
                  </div>
                  <h3 className="font-extralight text-2xl sm:text-3xl uppercase tracking-tight text-alkota-black leading-tight mb-3">
                    Built to Earn Its Keep. Every Day.
                  </h3>
                  <p className="text-sm text-[#555] leading-relaxed mb-6">
                    Why professional pressure-washing contractors invest in continuous-duty Schedule 80 coils and slow-running ceramic triplex pumps to eliminate downtime on daily commercial contracts.
                  </p>
                </div>
                <Link
                  href="/resources/case-studies/professional-cleaning-contractors"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-alkota-black hover:text-[#FF6900] transition-colors font-normal no-underline mt-4 group"
                >
                  <span>Explore Contractor Economics</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </article>
            )}

            {/* Story 04: Agriculture */}
            {filteredStories.some((s) => s.slug === 'agriculture') && (
              <article className="flex flex-col justify-between bg-white border border-[#E8E8E4] p-8 sm:p-10">
                <div>
                  <div className="aspect-[16/10] overflow-hidden bg-[#EFEFEA] mb-6">
                    <img
                      src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1200&q=80"
                      alt="Agricultural tractor and combine washdown in farm workshop"
                      className="w-full h-full object-cover filter contrast-105"
                    />
                  </div>
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#FF6900] mb-2">
                    <span>04 // Agriculture</span>
                    <span className="text-[#999]">·</span>
                    <span className="text-[#888]">UK Farming Application</span>
                  </div>
                  <h3 className="font-extralight text-2xl sm:text-3xl uppercase tracking-tight text-alkota-black leading-tight mb-3">
                    Mud. Oil. Manure. Then Do It Again Tomorrow.
                  </h3>
                  <p className="text-sm text-[#555] leading-relaxed mb-6">
                    Tractors, combines, telehandlers, and livestock housing. Why thermal heat at 85°C emulsifies bio-fats and clay mud rapidly without damaging delicate radiator fins and electrical harnesses.
                  </p>
                </div>
                <Link
                  href="/resources/case-studies/agriculture"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-alkota-black hover:text-[#FF6900] transition-colors font-normal no-underline mt-4 group"
                >
                  <span>Read Agriculture Field Study</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </article>
            )}
          </div>

          {/* Story 05 & 06: MARINE & OILFIELD (Horizontal High-Contrast Engineering Rails) */}
          <div className="border-t border-[#E8E8E4] pt-20 grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Marine */}
            {filteredStories.some((s) => s.slug === 'marine') && (
              <article className="bg-[#121212] text-white p-8 sm:p-10 border border-[#222] flex flex-col justify-between">
                <div>
                  <div className="aspect-[16/9] overflow-hidden bg-[#1A1A18] mb-6">
                    <img
                      src="https://images.unsplash.com/photo-1505705694340-019e1e335916?auto=format&fit=crop&w=1200&q=80"
                      alt="Commercial fishing vessels and marine harbourside"
                      className="w-full h-full object-cover filter brightness-90 contrast-110"
                    />
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.2em] text-[#FF6900] mb-2">
                    05 // Marine & Maritime
                  </div>
                  <h3 className="font-extralight text-2xl sm:text-3xl uppercase tracking-tight text-white leading-tight mb-3">
                    Salt Never Takes a Day Off.
                  </h3>
                  <p className="text-sm text-[#CCC] leading-relaxed mb-6 font-normal">
                    Commercial fishing boats, harbour winches, dockside cranes, and slipways. Tackling dense salt encrustations, algae, and fish grease under aggressive coastal conditions.
                  </p>
                </div>
                <Link
                  href="/resources/case-studies/marine"
                  className="inline-flex items-center justify-between border border-white/20 text-white px-6 py-3.5 text-xs uppercase tracking-[0.2em] hover:bg-[#FF6900] hover:border-[#FF6900] transition-colors font-normal no-underline group"
                >
                  <span>Explore Marine Systems</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </article>
            )}

            {/* Oilfield */}
            {filteredStories.some((s) => s.slug === 'oilfield') && (
              <article className="bg-[#121212] text-white p-8 sm:p-10 border border-[#222] flex flex-col justify-between">
                <div>
                  <div className="aspect-[16/9] overflow-hidden bg-[#1A1A18] mb-6">
                    <img
                      src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80"
                      alt="Oilfield drilling rig and industrial piping"
                      className="w-full h-full object-cover filter brightness-90 contrast-110"
                    />
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.2em] text-[#FF6900] mb-2">
                    06 // Oil & Gas
                  </div>
                  <h3 className="font-extralight text-2xl sm:text-3xl uppercase tracking-tight text-white leading-tight mb-3">
                    Where Dirt Is the Easy Part.
                  </h3>
                  <p className="text-sm text-[#CCC] leading-relaxed mb-6 font-normal">
                    Paraffin wax, synthetic drilling muds, pipe dope, and heavy bitumen. Operating in remote energy installations where equipment must run continuously without breakdown.
                  </p>
                </div>
                <Link
                  href="/resources/case-studies/oilfield"
                  className="inline-flex items-center justify-between border border-white/20 text-white px-6 py-3.5 text-xs uppercase tracking-[0.2em] hover:bg-[#FF6900] hover:border-[#FF6900] transition-colors font-normal no-underline group"
                >
                  <span>Read Oilfield Case Study</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </article>
            )}
          </div>

          {/* Story 07: BESPOKE TRAILER BUILDS (Grand 12-Step Custom Engineering Showcase) */}
          {filteredStories.some((s) => s.slug === 'bespoke-trailer-builds') && (
            <article className="border-t border-[#E8E8E4] pt-20">
              <div className="bg-[#0D0D0B] text-white p-8 sm:p-14 border border-[#222]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12">
                  <div className="lg:col-span-8">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs uppercase tracking-[0.25em] text-[#FF6900]">
                        07 // Bespoke Engineering Division
                      </span>
                      <span className="text-[10px] uppercase px-2.5 py-0.5 bg-[#222] text-[#AAA] border border-[#333]">
                        UK Engineered
                      </span>
                    </div>
                    <h3 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-white leading-tight mb-4">
                      When an Off-The-Shelf Machine Isn’t Enough.
                    </h3>
                    <p className="text-base sm:text-lg text-[#CCC] leading-relaxed font-normal">
                      The machine wasn’t enough, so we built the system. Turnkey road-legal mobile pressure washing trailers engineered in the UK with integrated baffled water storage, power generation, hose reels, and closed-loop wastewater recovery.
                    </p>
                  </div>
                  <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4 justify-end">
                    <Link
                      href="/resources/case-studies/bespoke-trailer-builds"
                      className="inline-flex items-center justify-center gap-2 bg-[#FF6900] text-white px-6 py-4 text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors font-normal no-underline"
                    >
                      <span>Explore Bespoke Build Journey</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href="/trailers/configure"
                      className="inline-flex items-center justify-center gap-2 border border-white/30 bg-transparent text-white px-6 py-4 text-xs uppercase tracking-[0.2em] hover:bg-white/10 transition-colors font-normal no-underline"
                    >
                      <span>Launch Configurator</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>

                {/* 12-Step Quick Snapshot Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-8 border-t border-white/10 text-xs">
                  <div className="p-3 bg-white/5 border border-white/10">
                    <span className="text-[#FF6900] block text-[10px] uppercase tracking-wider mb-1">01 / AUDIT</span>
                    <span className="text-[#DDD] font-normal">Requirement Envelope</span>
                  </div>
                  <div className="p-3 bg-white/5 border border-white/10">
                    <span className="text-[#FF6900] block text-[10px] uppercase tracking-wider mb-1">02 / SIZING</span>
                    <span className="text-[#DDD] font-normal">Flow, Pressure & Heat</span>
                  </div>
                  <div className="p-3 bg-white/5 border border-white/10">
                    <span className="text-[#FF6900] block text-[10px] uppercase tracking-wider mb-1">03 / WATER</span>
                    <span className="text-[#DDD] font-normal">Baffled Poly Tanks</span>
                  </div>
                  <div className="p-3 bg-white/5 border border-white/10">
                    <span className="text-[#FF6900] block text-[10px] uppercase tracking-wider mb-1">04 / POWER</span>
                    <span className="text-[#DDD] font-normal">Kubota / Honda Engines</span>
                  </div>
                  <div className="p-3 bg-white/5 border border-white/10">
                    <span className="text-[#FF6900] block text-[10px] uppercase tracking-wider mb-1">05 / RECOVERY</span>
                    <span className="text-[#DDD] font-normal">EA Trade Effluent Vacuum</span>
                  </div>
                  <div className="p-3 bg-white/5 border border-white/10">
                    <span className="text-[#FF6900] block text-[10px] uppercase tracking-wider mb-1">06 / HOMOLOGATION</span>
                    <span className="text-[#DDD] font-normal">Road-Legal IVA Certification</span>
                  </div>
                </div>
              </div>
            </article>
          )}
        </div>
      </div>
    </section>
  );
}
