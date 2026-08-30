'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Search,
  SlidersHorizontal,
  Compass,
  CheckCircle2,
  Layers,
  Filter,
  X,
  Factory,
  Tractor,
  Anchor,
  Flame,
  Truck,
  Building2,
  Wrench,
  Droplets,
  Sparkles,
} from 'lucide-react';
import { CaseStudy } from '@/lib/case-studies/types';

interface Props {
  caseStudies: CaseStudy[];
}

export default function CaseStudyEditorialGrid({ caseStudies }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSector = searchParams?.get('sector') || 'ALL';

  const [selectedFilter, setSelectedFilter] = useState<string>(initialSector);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeApplication, setActiveApplication] = useState<string | null>(null);
  const [activeContamination, setActiveContamination] = useState<string | null>(null);

  // Sync state with URL parameter if present
  useEffect(() => {
    const sectorFromUrl = searchParams?.get('sector');
    if (sectorFromUrl) {
      setSelectedFilter(sectorFromUrl.toUpperCase());
    }
  }, [searchParams]);

  const handleFilterChange = (filterKey: string) => {
    setSelectedFilter(filterKey);
    setActiveApplication(null);
    setActiveContamination(null);
    if (filterKey === 'ALL') {
      router.push('/resources/case-studies', { scroll: false });
    } else {
      router.push(`/resources/case-studies?sector=${filterKey.toLowerCase()}`, { scroll: false });
    }
  };

  const filters = [
    { label: 'All Stories (08)', key: 'ALL' },
    { label: 'Fleet & Plant', key: 'FLEET' },
    { label: 'Facilities & Industrial', key: 'INDUSTRIAL' },
    { label: 'Contractors', key: 'CONTRACTORS' },
    { label: 'Agriculture', key: 'AGRICULTURE' },
    { label: 'Marine', key: 'MARINE' },
    { label: 'Oil & Gas', key: 'OILFIELD' },
    { label: 'Bespoke Rigs', key: 'BESPOKE' },
  ];

  // All 8 stories including Antarctica in the full dataset for search
  const allStories = caseStudies;

  // Filtered stories for the primary index
  const filteredStories = useMemo(() => {
    return allStories.filter((story) => {
      // Exclude Antarctica from the index grid since it has the flagship card above
      if (story.slug === 'antarctica-lake-whillans' && !searchQuery) return false;

      // Search query filtering
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = story.title.toLowerCase().includes(q) || story.shortTitle.toLowerCase().includes(q);
        const matchesSector = story.sector.toLowerCase().includes(q);
        const matchesLocation = story.location.toLowerCase().includes(q);
        const matchesSlug = story.slug.toLowerCase().includes(q);
        const matchesRequirements = story.requirements.some((r) => r.toLowerCase().includes(q));
        const matchesApps = story.applications.some((a) => a.toLowerCase().includes(q));
        const matchesClient = story.clientName ? story.clientName.toLowerCase().includes(q) : false;

        return matchesTitle || matchesSector || matchesLocation || matchesSlug || matchesRequirements || matchesApps || matchesClient;
      }

      // Application Matrix Filter
      if (activeApplication) {
        if (activeApplication === 'cranes' && story.slug === 'one-great-northern') return true;
        if (activeApplication === 'warehouses' && story.slug === 'entirefm-industrial-cleaning') return true;
        if (activeApplication === 'tractors' && story.slug === 'agriculture') return true;
        if (activeApplication === 'vessels' && story.slug === 'marine') return true;
        if (activeApplication === 'drilling' && story.slug === 'oilfield') return true;
        if (activeApplication === 'mobile' && (story.slug === 'professional-cleaning-contractors' || story.slug === 'bespoke-trailer-builds')) return true;
        return false;
      }

      // Contamination Matrix Filter
      if (activeContamination) {
        if (activeContamination === 'mud' && (story.slug === 'agriculture' || story.slug === 'oilfield' || story.slug === 'one-great-northern')) return true;
        if (activeContamination === 'salt' && story.slug === 'marine') return true;
        if (activeContamination === 'grease' && (story.slug === 'one-great-northern' || story.slug === 'professional-cleaning-contractors' || story.slug === 'agriculture')) return true;
        if (activeContamination === 'oil' && (story.slug === 'oilfield' || story.slug === 'entirefm-industrial-cleaning')) return true;
        if (activeContamination === 'wax' && story.slug === 'oilfield') return true;
        if (activeContamination === 'gum' && story.slug === 'professional-cleaning-contractors') return true;
        return false;
      }

      // Standard Sector Tabs Filter
      if (selectedFilter === 'ALL') return true;
      if (selectedFilter === 'FLEET' && story.slug === 'one-great-northern') return true;
      if (selectedFilter === 'INDUSTRIAL' && story.slug === 'entirefm-industrial-cleaning') return true;
      if (selectedFilter === 'CONTRACTORS' && story.slug === 'professional-cleaning-contractors') return true;
      if (selectedFilter === 'AGRICULTURE' && story.slug === 'agriculture') return true;
      if (selectedFilter === 'MARINE' && story.slug === 'marine') return true;
      if (selectedFilter === 'OILFIELD' && story.slug === 'oilfield') return true;
      if (selectedFilter === 'BESPOKE' && story.slug === 'bespoke-trailer-builds') return true;

      return true;
    });
  }, [allStories, selectedFilter, searchQuery, activeApplication, activeContamination]);

  return (
    <div className="bg-[#F8F7F4] text-alkota-black font-normal">
      {/* ── 01: CONTROLS / SEARCH & FILTER BAR ───────────────────────── */}
      <section className="bg-white border-b border-[#E8E8E4] px-6 sm:px-12 py-8 sticky top-0 z-30 shadow-sm">
        <div className="mx-auto max-w-7xl w-full">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Sector Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
              {filters.map((f) => {
                const isActive = selectedFilter === f.key && !activeApplication && !activeContamination && !searchQuery;
                return (
                  <button
                    key={f.key}
                    onClick={() => handleFilterChange(f.key)}
                    className={`px-3 py-2 uppercase tracking-wider transition-all cursor-pointer border ${
                      isActive
                        ? 'bg-[#121212] text-white border-[#121212]'
                        : 'bg-[#F8F7F4] text-[#666] border-[#E8E8E4] hover:border-black hover:text-black'
                    }`}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>

            {/* Local Search Input */}
            <div className="relative w-full lg:w-72">
              <input
                type="text"
                placeholder="Search stories, mud, crane..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#F8F7F4] border border-[#DDD] pl-9 pr-8 py-2 text-xs text-alkota-black placeholder:text-[#888] focus:outline-none focus:border-[#FF6900]"
              />
              <Search className="h-3.5 w-3.5 text-[#888] absolute left-3 top-2.5" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2.5 text-[#888] hover:text-black"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Active Filter Indicators if any */}
          {(activeApplication || activeContamination || searchQuery) && (
            <div className="flex items-center gap-2 mt-4 pt-3 border-t border-[#E8E8E4] text-xs font-mono text-[#666]">
              <span>Active Query Filter:</span>
              <span className="bg-[#121212] text-white px-2 py-0.5 text-[10px] uppercase">
                {activeApplication ? `Application: ${activeApplication}` : activeContamination ? `Contamination: ${activeContamination}` : `Keyword: "${searchQuery}"`}
              </span>
              <button
                onClick={() => {
                  setActiveApplication(null);
                  setActiveContamination(null);
                  setSearchQuery('');
                  setSelectedFilter('ALL');
                }}
                className="text-[#FF6900] hover:underline text-[10px] uppercase ml-2 cursor-pointer"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── 02: VERIFICATION ARCHITECTURE LEGEND ─────────────────────── */}
      <section className="py-12 px-6 sm:px-12 bg-[#EFEFEA] border-b border-[#E8E8E4]">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#FF6900]">
              Content Governance // Evidence & Classification Standards
            </span>
            <span className="text-[11px] text-[#777] font-mono">
              Every story adheres to strict editorial proof standards
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-white border border-[#DDD]">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />
                <span className="text-xs font-mono uppercase text-alkota-black font-semibold">
                  Verified Sources
                </span>
              </div>
              <p className="text-[11px] text-[#666] leading-relaxed">
                Documented historical and scientific projects backed by published peer-reviewed literature and academic archives (e.g. WISSARD Antarctica).
              </p>
            </div>

            <div className="p-4 bg-white border border-[#DDD]">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                <span className="text-xs font-mono uppercase text-alkota-black font-semibold">
                  Named Customer
                </span>
              </div>
              <p className="text-[11px] text-[#666] leading-relaxed">
                Active commercial projects and fleet deployments with verified customer identities and real UK operational scopes (e.g. One Great Northern, EntireFM).
              </p>
            </div>

            <div className="p-4 bg-white border border-[#DDD]">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                <span className="text-xs font-mono uppercase text-alkota-black font-semibold">
                  Industry Application
                </span>
              </div>
              <p className="text-[11px] text-[#666] leading-relaxed">
                Application-specific engineering guides based on decades of field machinery data rather than a single customer installation (e.g. Agriculture, Marine, Oilfield).
              </p>
            </div>

            <div className="p-4 bg-white border border-[#DDD]">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-[#FF6900]" />
                <span className="text-xs font-mono uppercase text-alkota-black font-semibold">
                  Engineered System
                </span>
              </div>
              <p className="text-[11px] text-[#666] leading-relaxed">
                Custom engineering and bespoke vehicle fabrication methodologies, baffled water storage, and road-legal IVA homologation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 03: ASYMMETRICAL EDITORIAL STORY INDEX ───────────────────── */}
      <section className="py-20 sm:py-32 px-6 sm:px-12">
        <div className="mx-auto max-w-7xl w-full">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16 pb-6 border-b border-[#E8E8E4]">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#FF6900] block mb-2">
                Field Stories Archive
              </span>
              <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-alkota-black">
                The Field Doesn’t Look the Same Twice
              </h2>
            </div>
            <div className="font-mono text-xs text-[#777]">
              Showing {filteredStories.length} of {allStories.length} Documented Stories
            </div>
          </div>

          {/* Stories Stream */}
          <div className="space-y-24 sm:space-y-32">
            {/* Story 01: ONE GREAT NORTHERN */}
            {filteredStories.some((s) => s.slug === 'one-great-northern') && (
              <article className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
                <div className="lg:col-span-6 order-2 lg:order-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs uppercase tracking-[0.2em] text-[#FF6900] font-mono">
                      01 // Heavy Plant
                    </span>
                    <span className="text-[10px] uppercase px-2.5 py-0.5 bg-[#E6F4EA] text-[#137333] border border-[#CEEAD6] font-mono font-medium">
                      Named Customer / Field Application
                    </span>
                  </div>
                  <h3 className="font-extralight text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-alkota-black leading-tight mb-4">
                    Keeping Heavy Equipment Ready for the Next Lift.
                  </h3>
                  <p className="text-xs font-mono text-[#FF6900] uppercase tracking-wider mb-4">
                    One Great Northern · Chesterfield, Derbyshire
                  </p>
                  <p className="text-base text-[#555] leading-relaxed mb-6">
                    Specialist all-terrain mobile cranes collect punishing quarry slurry, heavy clay, and hydraulic film. One Great Northern uses Alkota hot-water cleaning to keep structural steel, outriggers, and multi-axle steering gear pristine for certified pre-lift NDT inspections.
                  </p>
                  <div className="p-4 bg-white border border-[#E8E8E4] mb-8 grid grid-cols-2 gap-4 text-xs font-mono">
                    <div>
                      <span className="text-[#888] block uppercase text-[10px] tracking-wider">Primary Duty</span>
                      <span className="text-alkota-black">Crane Chassis & Outriggers</span>
                    </div>
                    <div>
                      <span className="text-[#888] block uppercase text-[10px] tracking-wider">Engineering Focus</span>
                      <span className="text-alkota-black">High Thermal Emulsification</span>
                    </div>
                  </div>
                  <Link
                    href="/resources/case-studies/one-great-northern"
                    className="inline-flex items-center gap-3 bg-[#121212] text-white px-7 py-4 text-xs uppercase tracking-[0.2em] hover:bg-[#FF6900] transition-colors font-mono no-underline group"
                  >
                    <span>Read One Great Northern Story</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
                <div className="lg:col-span-6 order-1 lg:order-2">
                  <Link href="/resources/case-studies/one-great-northern" className="block relative aspect-[16/11] overflow-hidden bg-[#EFEFEA] group border border-[#DDD]">
                    <img
                      src="https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1600&q=80"
                      alt="Mobile crane washdown in UK yard"
                      className="w-full h-full object-cover filter contrast-105 transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:opacity-0" />
                    <div className="absolute bottom-4 left-4 bg-black/85 backdrop-blur-sm text-white px-3 py-1.5 text-[10px] uppercase font-mono tracking-wider">
                      One Great Northern / Chesterfield Depot
                    </div>
                  </Link>
                </div>
              </article>
            )}

            {/* Story 02: ENTIREFM */}
            {filteredStories.some((s) => s.slug === 'entirefm-industrial-cleaning') && (
              <article className="border-t border-[#E8E8E4] pt-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
                  <div className="lg:col-span-7 relative min-h-[340px] sm:min-h-[440px] bg-[#EFEFEA] overflow-hidden group border border-[#DDD]">
                    <img
                      src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1800&q=80"
                      alt="Industrial floor and warehouse cleaning operations"
                      className="w-full h-full object-cover filter contrast-105 transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <span className="text-xs uppercase tracking-[0.2em] text-[#FF6900] font-mono block mb-1">
                        Facilities Management // UK National
                      </span>
                      <h4 className="text-xl sm:text-2xl font-light uppercase tracking-tight">
                        EntireFM Industrial Operations
                      </h4>
                    </div>
                  </div>
                  <div className="lg:col-span-5 flex flex-col justify-between bg-white p-8 sm:p-12 border border-[#E8E8E4]">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs uppercase tracking-[0.2em] text-[#FF6900] font-mono">
                          02 // Industrial Cleaning
                        </span>
                        <span className="text-[10px] uppercase px-2.5 py-0.5 bg-[#E6F4EA] text-[#137333] border border-[#CEEAD6] font-mono font-medium">
                          Named Customer / Field Application
                        </span>
                      </div>
                      <h3 className="font-extralight text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight text-alkota-black leading-tight mb-4">
                        When Cleaning Is the Business.
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
                      className="inline-flex items-center justify-between bg-[#121212] text-white px-7 py-4 text-xs uppercase tracking-[0.2em] hover:bg-[#FF6900] transition-colors font-mono no-underline group"
                    >
                      <span>Read EntireFM Case Study</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </article>
            )}

            {/* Story 03 & 04: CONTRACTORS & AGRICULTURE */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 border-t border-[#E8E8E4] pt-20">
              {/* Story 03: Professional Cleaning Contractors */}
              {filteredStories.some((s) => s.slug === 'professional-cleaning-contractors') && (
                <article className="flex flex-col justify-between bg-white border border-[#E8E8E4] p-8 sm:p-10">
                  <div>
                    <div className="aspect-[16/10] overflow-hidden bg-[#EFEFEA] mb-6 border border-[#DDD]">
                      <img
                        src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80"
                        alt="Commercial pressure washing surface restoration"
                        className="w-full h-full object-cover filter contrast-105"
                      />
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-[#FF6900] mb-2">
                      <span>03 // Contractors</span>
                      <span className="text-[#999]">·</span>
                      <span className="text-[#888]">Commercial Field Guide</span>
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
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-alkota-black hover:text-[#FF6900] transition-colors font-mono no-underline mt-4 group"
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
                    <div className="aspect-[16/10] overflow-hidden bg-[#EFEFEA] mb-6 border border-[#DDD]">
                      <img
                        src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1200&q=80"
                        alt="Agricultural tractor and combine washdown in farm workshop"
                        className="w-full h-full object-cover filter contrast-105"
                      />
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-[#FF6900] mb-2">
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
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-alkota-black hover:text-[#FF6900] transition-colors font-mono no-underline mt-4 group"
                  >
                    <span>Read Agriculture Field Study</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </article>
              )}
            </div>

            {/* Story 05 & 06: MARINE & OILFIELD */}
            <div className="border-t border-[#E8E8E4] pt-20 grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Marine */}
              {filteredStories.some((s) => s.slug === 'marine') && (
                <article className="bg-[#121212] text-white p-8 sm:p-10 border border-[#222] flex flex-col justify-between">
                  <div>
                    <div className="aspect-[16/9] overflow-hidden bg-[#1A1A18] mb-6 border border-white/10">
                      <img
                        src="https://images.unsplash.com/photo-1505705694340-019e1e335916?auto=format&fit=crop&w=1200&q=80"
                        alt="Commercial fishing vessels and marine harbourside"
                        className="w-full h-full object-cover filter brightness-90 contrast-110"
                      />
                    </div>
                    <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#FF6900] mb-2">
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
                    className="inline-flex items-center justify-between border border-white/20 text-white px-6 py-3.5 text-xs uppercase tracking-[0.2em] hover:bg-[#FF6900] hover:border-[#FF6900] transition-colors font-mono no-underline group"
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
                    <div className="aspect-[16/9] overflow-hidden bg-[#1A1A18] mb-6 border border-white/10">
                      <img
                        src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80"
                        alt="Oilfield drilling rig and industrial piping"
                        className="w-full h-full object-cover filter brightness-90 contrast-110"
                      />
                    </div>
                    <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#FF6900] mb-2">
                      06 // Oil & Gas
                    </div>
                    <h3 className="font-extralight text-2xl sm:text-3xl uppercase tracking-tight text-white leading-tight mb-3">
                      When the Dirt Is Part of the Job.
                    </h3>
                    <p className="text-sm text-[#CCC] leading-relaxed mb-6 font-normal">
                      Paraffin wax, synthetic drilling muds, pipe dope, and heavy bitumen. Operating in remote energy installations where equipment must run continuously without breakdown.
                    </p>
                  </div>
                  <Link
                    href="/resources/case-studies/oilfield"
                    className="inline-flex items-center justify-between border border-white/20 text-white px-6 py-3.5 text-xs uppercase tracking-[0.2em] hover:bg-[#FF6900] hover:border-[#FF6900] transition-colors font-mono no-underline group"
                  >
                    <span>Read Oilfield Case Study</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </article>
              )}
            </div>

            {/* Story 07: BESPOKE TRAILER BUILDS */}
            {filteredStories.some((s) => s.slug === 'bespoke-trailer-builds') && (
              <article className="border-t border-[#E8E8E4] pt-20">
                <div className="bg-[#0D0D0B] text-white p-8 sm:p-14 border border-[#222]">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12">
                    <div className="lg:col-span-8">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs uppercase tracking-[0.25em] text-[#FF6900] font-mono">
                          07 // Bespoke Engineering Division
                        </span>
                        <span className="text-[10px] uppercase px-2.5 py-0.5 bg-[#222] text-[#AAA] border border-[#333] font-mono">
                          UK Engineered
                        </span>
                      </div>
                      <h3 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-white leading-tight mb-4">
                        The Job Defines the Machine.
                      </h3>
                      <p className="text-base sm:text-lg text-[#CCC] leading-relaxed font-normal">
                        The trailer isn&apos;t the product. The system is. Turnkey road-legal mobile wash trailers engineered in the UK with integrated baffled water storage, power generation, hose reels, and closed-loop wastewater recovery.
                      </p>
                    </div>
                    <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4 justify-end">
                      <Link
                        href="/resources/case-studies/bespoke-trailer-builds"
                        className="inline-flex items-center justify-center gap-2 bg-[#FF6900] text-white px-6 py-4 text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors font-mono no-underline"
                      >
                        <span>Explore Bespoke Build Journey</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                      <Link
                        href="/trailers/configure"
                        className="inline-flex items-center justify-center gap-2 border border-white/30 bg-transparent text-white px-6 py-4 text-xs uppercase tracking-[0.2em] hover:bg-white/10 transition-colors font-mono no-underline"
                      >
                        <span>Launch Configurator</span>
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>

                  {/* 12-Step Quick Snapshot Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-8 border-t border-white/10 text-xs font-mono">
                    <div className="p-3 bg-white/5 border border-white/10">
                      <span className="text-[#FF6900] block text-[10px] uppercase tracking-wider mb-1">01 / AUDIT</span>
                      <span className="text-[#DDD]">Requirement Envelope</span>
                    </div>
                    <div className="p-3 bg-white/5 border border-white/10">
                      <span className="text-[#FF6900] block text-[10px] uppercase tracking-wider mb-1">02 / SIZING</span>
                      <span className="text-[#DDD]">Flow, Pressure & Heat</span>
                    </div>
                    <div className="p-3 bg-white/5 border border-white/10">
                      <span className="text-[#FF6900] block text-[10px] uppercase tracking-wider mb-1">03 / WATER</span>
                      <span className="text-[#DDD]">Baffled Poly Tanks</span>
                    </div>
                    <div className="p-3 bg-white/5 border border-white/10">
                      <span className="text-[#FF6900] block text-[10px] uppercase tracking-wider mb-1">04 / POWER</span>
                      <span className="text-[#DDD]">Kubota / Honda Engines</span>
                    </div>
                    <div className="p-3 bg-white/5 border border-white/10">
                      <span className="text-[#FF6900] block text-[10px] uppercase tracking-wider mb-1">05 / RECOVERY</span>
                      <span className="text-[#DDD]">EA Effluent Vacuum</span>
                    </div>
                    <div className="p-3 bg-white/5 border border-white/10">
                      <span className="text-[#FF6900] block text-[10px] uppercase tracking-wider mb-1">06 / HOMOLOGATION</span>
                      <span className="text-[#DDD]">Road-Legal IVA</span>
                    </div>
                  </div>
                </div>
              </article>
            )}
          </div>
        </div>
      </section>

      {/* ── 04: APPLICATION & CONTAMINATION DISCOVERY MATRICES ──────── */}
      <section className="bg-white border-y border-[#E8E8E4] py-20 sm:py-28 px-6 sm:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Matrix 01: Application */}
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#FF6900] font-mono mb-2">
                <Building2 className="h-4 w-4" />
                <span>Application Discovery</span>
              </div>
              <h3 className="font-extralight text-2xl sm:text-4xl uppercase tracking-tight text-alkota-black mb-4">
                What Are You Cleaning?
              </h3>
              <p className="text-xs sm:text-sm text-[#666] mb-6">
                Click an asset profile to filter the field journal to corresponding machinery:
              </p>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'cranes', label: 'Cranes & Heavy Plant', story: 'One Great Northern' },
                  { id: 'warehouses', label: 'Warehouses & Floors', story: 'EntireFM' },
                  { id: 'tractors', label: 'Tractors & Combines', story: 'Agriculture' },
                  { id: 'vessels', label: 'Vessels & Harbours', story: 'Marine' },
                  { id: 'drilling', label: 'Drilling & Petrochem', story: 'Oilfield' },
                  { id: 'mobile', label: 'Mobile Fleet Wash', story: 'Contractors / Trailer' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveApplication(activeApplication === item.id ? null : item.id);
                      setActiveContamination(null);
                      setSearchQuery('');
                    }}
                    className={`p-3 text-left border transition-all cursor-pointer ${
                      activeApplication === item.id
                        ? 'bg-[#121212] text-white border-[#121212]'
                        : 'bg-[#F8F7F4] text-alkota-black border-[#E8E8E4] hover:border-black'
                    }`}
                  >
                    <span className="text-xs uppercase font-medium block">{item.label}</span>
                    <span className={`text-[10px] font-mono block ${activeApplication === item.id ? 'text-[#FF6900]' : 'text-[#888]'}`}>
                      $\rightarrow$ {item.story}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Matrix 02: Contamination */}
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#FF6900] font-mono mb-2">
                <Flame className="h-4 w-4" />
                <span>Contamination Discovery</span>
              </div>
              <h3 className="font-extralight text-2xl sm:text-4xl uppercase tracking-tight text-alkota-black mb-4">
                What Are You Removing?
              </h3>
              <p className="text-xs sm:text-sm text-[#666] mb-6">
                Click a contaminant profile to surface thermal & hydraulic solutions:
              </p>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'mud', label: 'Compacted Clay & Mud', dest: 'Agriculture / Oilfield' },
                  { id: 'salt', label: 'Salt & Marine Scale', dest: 'Marine' },
                  { id: 'grease', label: 'Hydraulic Grease & Oil', dest: 'Plant / Contractors' },
                  { id: 'oil', label: 'Heavy Crude & Diesel', dest: 'Oilfield / Facilities' },
                  { id: 'wax', label: 'Paraffin Wax & Pipe Dope', dest: 'Oilfield' },
                  { id: 'gum', label: 'Chewing Gum & Tyre Marks', dest: 'Contractors / EntireFM' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveContamination(activeContamination === item.id ? null : item.id);
                      setActiveApplication(null);
                      setSearchQuery('');
                    }}
                    className={`p-3 text-left border transition-all cursor-pointer ${
                      activeContamination === item.id
                        ? 'bg-[#121212] text-white border-[#121212]'
                        : 'bg-[#F8F7F4] text-alkota-black border-[#E8E8E4] hover:border-black'
                    }`}
                  >
                    <span className="text-xs uppercase font-medium block">{item.label}</span>
                    <span className={`text-[10px] font-mono block ${activeContamination === item.id ? 'text-[#FF6900]' : 'text-[#888]'}`}>
                      $\rightarrow$ {item.dest}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 05: CINEMATIC BESPOKE ENGINEERING SECTION ────────────────── */}
      <section className="bg-[#0D0D0B] text-white py-24 sm:py-32 px-6 sm:px-12 border-b border-[#222]">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="h-[1.5px] w-8 bg-[#FF6900]" />
                <span className="text-xs uppercase tracking-[0.25em] text-[#FF6900] font-mono">
                  Bespoke Mobile Platforms
                </span>
              </div>
              <h2 className="font-extralight text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white leading-tight">
                The machine is only the start.
              </h2>
              <p className="text-base sm:text-lg text-[#CCC] leading-relaxed font-normal">
                Pressure. Flow. Heat. Chemistry. Water payload. Onboard power. Hose ergonomics. Closed-loop effluent recovery. Road-legal chassis homologation.
              </p>
              <p className="text-sm text-[#888] font-mono leading-relaxed">
                When standard machinery cannot satisfy site constraints, Alkota UK engineers turnkey mobile platforms calculated backwards from your operating envelope.
              </p>

              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  href="/resources/case-studies/bespoke-trailer-builds"
                  className="inline-flex items-center gap-2 bg-[#FF6900] text-white px-7 py-4 text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors font-mono no-underline"
                >
                  <span>Explore Bespoke Engineering</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/trailers/configure"
                  className="inline-flex items-center gap-2 border border-white/30 text-white px-7 py-4 text-xs uppercase tracking-[0.2em] hover:bg-white/10 transition-colors font-mono no-underline"
                >
                  <span>Launch Configurator</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#161614] border border-white/10 p-6 sm:p-8 space-y-4 font-mono text-xs">
              <span className="text-[#FF6900] block uppercase tracking-wider border-b border-white/10 pb-2">
                Condensed 7-Stage Build Methodology
              </span>
              <div className="space-y-2 text-[#AAA]">
                <div className="flex items-center gap-2">
                  <span className="text-[#FF6900]">01</span>
                  <span><strong>DISCOVER:</strong> Operational audit & site constraints</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#FF6900]">02</span>
                  <span><strong>ANALYSE:</strong> Flow, pressure & thermal sizing</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#FF6900]">03</span>
                  <span><strong>SPECIFY:</strong> Baffled water tanks & prime movers</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#FF6900]">04</span>
                  <span><strong>ENGINEER:</strong> Chassis payload & weight distribution</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#FF6900]">05</span>
                  <span><strong>FABRICATE:</strong> UK workshop assembly & wiring looms</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#FF6900]">06</span>
                  <span><strong>TEST:</strong> Multi-point hydraulic & IVA inspection</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#FF6900]">07</span>
                  <span><strong>DEPLOY:</strong> Operator training & nationwide support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 06: COMMERCIAL CLOSING CTA ──────────────────────────────── */}
      <section className="bg-[#121212] text-white py-24 sm:py-32 px-6 sm:px-12">
        <div className="mx-auto max-w-5xl text-center space-y-8">
          <span className="text-xs uppercase tracking-[0.25em] text-[#FF6900] font-mono block">
            Commercial Specification
          </span>
          <h2 className="font-extralight text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white leading-tight">
            Your job will have its own story.
          </h2>
          <p className="text-base sm:text-lg text-[#CCC] max-w-2xl mx-auto leading-relaxed font-normal">
            Tell us what you need to clean, where you need to clean it and what the operating environment looks like. We’ll help you work backwards from the application to the equipment.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/tools/configurator"
              className="inline-flex items-center gap-2 bg-[#FF6900] text-white px-8 py-5 text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors font-mono no-underline shadow-lg"
            >
              <span>Specify Your System</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-white/30 text-white px-8 py-5 text-xs uppercase tracking-[0.2em] hover:bg-white/10 transition-colors font-mono no-underline"
            >
              <span>Talk to an Engineer</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href="/machines"
              className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-[#AAA] hover:text-white px-8 py-5 text-xs uppercase tracking-[0.2em] hover:bg-white/10 transition-colors font-mono no-underline"
            >
              <span>View Machines</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
