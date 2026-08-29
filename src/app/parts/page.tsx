'use client';

import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import Link from 'next/link';
import {
  Wrench,
  Search,
  CheckCircle2,
  Flame,
  Droplets,
  Layers,
  ArrowRight,
  Download,
  FileText,
  ShieldCheck,
  RotateCcw,
  AlertTriangle,
  UploadCloud,
  ChevronRight,
  Phone,
  Plus,
  Send,
  Zap,
  Activity,
  Award
} from 'lucide-react';
import {
  PART_CATEGORIES,
  VERIFIED_PARTS,
  VERIFIED_ASSEMBLIES,
  VERIFIED_SERVICE_KITS,
  SUPERSEDED_PARTS_MAP,
} from '@/lib/parts/seed-data';
import PartsSearchBar from '@/components/parts/PartsSearchBar';
import MachineIdentifierModal from '@/components/parts/MachineIdentifierModal';
import InteractiveDiagramViewer from '@/components/parts/InteractiveDiagramViewer';
import { PartsRequestProvider, usePartsRequest } from '@/components/parts/PartsRequestListContext';
import PartsRequestDrawer from '@/components/parts/PartsRequestDrawer';

export default function PartsFlagshipPage() {
  return (
    <PartsRequestProvider>
      <PartsPageContent />
      <PartsRequestDrawer />
    </PartsRequestProvider>
  );
}

function PartsPageContent() {
  const [isIdentifierOpen, setIsIdentifierOpen] = useState(false);
  const [selectedAssemblyIdx, setSelectedAssemblyIdx] = useState(0);
  const [selectedCatFilter, setSelectedCatFilter] = useState('pumps');
  const { addItem } = usePartsRequest();

  const activeAssembly = VERIFIED_ASSEMBLIES[selectedAssemblyIdx] || VERIFIED_ASSEMBLIES[0];
  const filteredParts = VERIFIED_PARTS.filter((p) => p.category === selectedCatFilter).slice(0, 4);

  return (
    <main className="min-h-screen bg-[#FDFDFC] text-alkota-black selection:bg-alkota-orange selection:text-white">
      <Navigation />

      {/* ─── 01: FULL-SCREEN LIGHT-FIRST HERO ──────────────────────────────── */}
      <section className="relative min-h-[90vh] flex flex-col justify-between border-b border-[#E8E8E4] bg-[#F7F7F4] pt-32 pb-16 overflow-hidden">
        {/* Subtle Engineering Grid Background */}
        <div className="absolute inset-0 bg-[radial-gradient(#D5D5CF_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-12 w-full my-auto space-y-10">
          <Breadcrumbs items={[{ label: 'Genuine Parts & Lifecycle Support' }]} />

          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2.5 px-3 py-1 bg-white border border-[#E0E0DC] shadow-xs">
              <span className="h-2 w-2 rounded-full bg-alkota-orange animate-pulse" />
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.25em] text-alkota-black font-bold">
                // ALKOTA UK OEM PARTS & SUPPORT ECOSYSTEM
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extralight tracking-tight uppercase leading-[0.92] text-alkota-black">
              BUILT TO WORK. <br />
              <span className="text-alkota-orange font-light">BUILT TO BE SERVICED.</span>
            </h1>

            <p className="text-base sm:text-xl text-[#666] leading-relaxed font-normal max-w-2xl">
              Industrial cleaning machinery is defined by serviceability. Access genuine OEM replacement parts, exploded assembly schematics, scheduled service kits, and specialist UK technical support for every generation of Alkota equipment.
            </p>
          </div>

          {/* Unified Smart Search Container */}
          <div className="pt-2">
            <PartsSearchBar
              onSelectMachineModalOpen={() => setIsIdentifierOpen(true)}
              className="shadow-xl"
            />

            <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs font-ibm-plex-mono text-[#777]">
              <span>Popular Lookups:</span>
              <button
                type="button"
                onClick={() => setIsIdentifierOpen(true)}
                className="text-alkota-black hover:text-alkota-orange underline transition-colors cursor-pointer"
              >
                4000 Series / 430XH
              </button>
              <Link href="/parts/general-pump-ts2021" className="text-alkota-black hover:text-alkota-orange underline transition-colors">
                General Pump TS2021
              </Link>
              <Link href="/parts/vrt3-trapped-pressure-unloader-valve" className="text-alkota-black hover:text-alkota-orange underline transition-colors">
                VRT3 Unloader
              </Link>
              <Link href="/parts/alkota-schedule-80-heating-coil-4000-series" className="text-alkota-black hover:text-alkota-orange underline transition-colors">
                Schedule 80 Coil
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Bottom Trust Bar */}
        <div className="relative z-10 border-t border-[#E8E8E4] bg-white/80 backdrop-blur-xs py-4">
          <div className="mx-auto max-w-7xl px-6 sm:px-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-ibm-plex-mono text-[#555]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-alkota-orange shrink-0" />
              <span>100% Genuine OEM Components</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-alkota-orange shrink-0" />
              <span>UK Warehouse Same-Day Dispatch</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-alkota-orange shrink-0" />
              <span>Verified Exploded Schematics</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-alkota-orange shrink-0" />
              <span>Full Legacy Model Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 02: START WITH THE MACHINE (PROGRESSIVE DISCOVERY) ─────────────── */}
      <section className="py-20 bg-white border-b border-[#E8E8E4]">
        <div className="mx-auto max-w-7xl px-6 sm:px-12 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#EBEBE8]">
            <div className="max-w-2xl">
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.3em] text-alkota-orange block mb-2 font-bold">
                // MACHINE-FIRST METHODOLOGY
              </span>
              <h2 className="text-3xl sm:text-5xl font-extralight uppercase tracking-tight text-alkota-black">
                Parts Start With <span className="text-alkota-orange font-light">The Machine.</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#666] leading-relaxed font-normal mt-2">
                Don&apos;t search through thousands of obscure part numbers. Select your Alkota model to immediately access its dedicated exploded schematics, service kits, and verified components.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsIdentifierOpen(true)}
              className="inline-flex items-center gap-2 bg-alkota-black text-white hover:bg-alkota-orange px-6 py-3.5 text-xs font-ibm-plex-mono uppercase tracking-widest transition-colors font-normal cursor-pointer shadow-xs shrink-0"
            >
              <span>Serial Number Lookup Assistant</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Machine Category Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/parts/machine/alkota-430xh"
              className="p-8 bg-[#F8F7F4] border border-[#E5E5E0] hover:border-alkota-orange hover:shadow-lg transition-all group no-underline flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-white border border-[#DDD] text-alkota-orange group-hover:bg-alkota-orange group-hover:text-white transition-colors">
                    <Flame className="h-6 w-6" />
                  </div>
                  <span className="font-ibm-plex-mono text-[10px] uppercase text-[#888]">
                    Flagship Range
                  </span>
                </div>
                <h3 className="text-2xl uppercase font-light text-alkota-black tracking-tight group-hover:text-alkota-orange transition-colors">
                  Hot Water Pressure Washers
                </h3>
                <p className="text-xs text-[#666] leading-relaxed font-normal">
                  4000 Series, 430XH, 4358, 200 Series, and 300 Series heavy stationary skids.
                </p>
              </div>
              <div className="pt-6 flex items-center justify-between border-t border-[#E8E8E4] mt-6 text-xs font-ibm-plex-mono uppercase tracking-wider text-alkota-black group-hover:text-alkota-orange">
                <span>View Assemblies</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </Link>

            <Link
              href="/parts/machine/alkota-5305a"
              className="p-8 bg-[#F8F7F4] border border-[#E5E5E0] hover:border-alkota-orange hover:shadow-lg transition-all group no-underline flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-white border border-[#DDD] text-alkota-orange group-hover:bg-alkota-orange group-hover:text-white transition-colors">
                    <Droplets className="h-6 w-6" />
                  </div>
                  <span className="font-ibm-plex-mono text-[10px] uppercase text-[#888]">
                    Industrial Wash
                  </span>
                </div>
                <h3 className="text-2xl uppercase font-light text-alkota-black tracking-tight group-hover:text-alkota-orange transition-colors">
                  Cold Water Washers
                </h3>
                <p className="text-xs text-[#666] leading-relaxed font-normal">
                  Electric heavy plant washers, site petrol units, triplex pump drives, and frame kits.
                </p>
              </div>
              <div className="pt-6 flex items-center justify-between border-t border-[#E8E8E4] mt-6 text-xs font-ibm-plex-mono uppercase tracking-wider text-alkota-black group-hover:text-alkota-orange">
                <span>View Assemblies</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </Link>

            <Link
              href="/parts/machine/alkota-apw-360"
              className="p-8 bg-[#F8F7F4] border border-[#E5E5E0] hover:border-alkota-orange hover:shadow-lg transition-all group no-underline flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-white border border-[#DDD] text-alkota-orange group-hover:bg-alkota-orange group-hover:text-white transition-colors">
                    <RotateCcw className="h-6 w-6" />
                  </div>
                  <span className="font-ibm-plex-mono text-[10px] uppercase text-[#888]">
                    Rotary Enclosed
                  </span>
                </div>
                <h3 className="text-2xl uppercase font-light text-alkota-black tracking-tight group-hover:text-alkota-orange transition-colors">
                  Parts Washers & Steam
                </h3>
                <p className="text-xs text-[#666] leading-relaxed font-normal">
                  APW-360 rotary wash cabinets, turntable motors, heating elements, and steam generators.
                </p>
              </div>
              <div className="pt-6 flex items-center justify-between border-t border-[#E8E8E4] mt-6 text-xs font-ibm-plex-mono uppercase tracking-wider text-alkota-black group-hover:text-alkota-orange">
                <span>View Assemblies</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 03: INTERACTIVE EXPLODED DIAGRAM SHOWCASE ─────────────────────── */}
      <section className="py-20 bg-[#F7F7F4] border-b border-[#E8E8E4]">
        <div className="mx-auto max-w-7xl px-6 sm:px-12 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4">
            <div>
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.3em] text-alkota-orange block mb-2 font-bold">
                // SIGNATURE TECHNICAL FEATURE
              </span>
              <h2 className="text-3xl sm:text-5xl font-extralight uppercase tracking-tight text-alkota-black">
                Interactive Assembly <span className="text-alkota-orange font-light">Finder.</span>
              </h2>
            </div>

            {/* Assembly Tab Switcher */}
            <div className="flex items-center gap-2">
              {VERIFIED_ASSEMBLIES.map((ass, idx) => (
                <button
                  key={ass.id}
                  type="button"
                  onClick={() => setSelectedAssemblyIdx(idx)}
                  className={`px-4 py-2 font-ibm-plex-mono text-xs uppercase tracking-wider border transition-all cursor-pointer ${
                    selectedAssemblyIdx === idx
                      ? 'bg-alkota-black text-white border-alkota-black shadow-xs'
                      : 'bg-white text-[#666] border-[#DDD] hover:border-alkota-black'
                  }`}
                >
                  {ass.name.split(' ')[0]} {ass.name.split(' ')[1]}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Viewer Component */}
          <div className="bg-white border border-[#E0E0DC] p-6 sm:p-10 shadow-sm">
            <InteractiveDiagramViewer
              assembly={activeAssembly}
              machineModelCode={activeAssembly.machine_model_code}
            />
          </div>
        </div>
      </section>

      {/* ─── 04: SCHEDULED SERVICE & MAINTENANCE KITS ──────────────────────── */}
      <section className="py-20 bg-white border-b border-[#E8E8E4]">
        <div className="mx-auto max-w-7xl px-6 sm:px-12 space-y-12">
          <div className="max-w-3xl">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.3em] text-alkota-orange block mb-2 font-bold">
              // PREVENTATIVE MAINTENANCE
            </span>
            <h2 className="text-3xl sm:text-5xl font-extralight uppercase tracking-tight text-alkota-black">
              Service & Maintenance <span className="text-alkota-orange font-light">Kits.</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#666] leading-relaxed font-normal mt-2">
              Pre-packaged OEM overhaul kits containing all factory-matched seals, O-rings, check valves, and filtration elements required for scheduled 500-hour and annual plant maintenance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VERIFIED_SERVICE_KITS.map((kit) => (
              <div
                key={kit.id}
                className="bg-[#F8F7F4] border border-[#E5E5E0] p-8 flex flex-col justify-between space-y-6 hover:border-alkota-orange transition-all group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#EBEBE8]">
                    <span className="font-ibm-plex-mono text-[10px] font-bold text-alkota-orange uppercase">
                      {kit.kit_number}
                    </span>
                    <span className="font-ibm-plex-mono text-[10px] text-[#777] uppercase">
                      {kit.service_interval_hours} Hours Interval
                    </span>
                  </div>

                  <h3 className="text-xl uppercase font-light text-alkota-black tracking-tight group-hover:text-alkota-orange transition-colors">
                    {kit.name}
                  </h3>

                  <p className="text-xs text-[#666] leading-relaxed font-normal">
                    {kit.service_purpose}
                  </p>

                  {/* Included Parts List */}
                  <div className="p-4 bg-white border border-[#E0E0DC] space-y-2">
                    <span className="font-ibm-plex-mono text-[9px] uppercase text-[#777] block font-bold">
                      Pack Contents:
                    </span>
                    <ul className="space-y-1 text-[11px] text-[#555] font-normal">
                      {kit.included_parts_summary.map((item, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-alkota-orange font-bold">·</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#EBEBE8] flex items-center justify-between">
                  {kit.price && (
                    <div>
                      <span className="font-ibm-plex-mono text-xl font-bold text-alkota-black block">
                        £{kit.price.toFixed(2)}
                      </span>
                      <span className="text-[10px] font-ibm-plex-mono text-[#888]">excl. VAT</span>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() =>
                      addItem({
                        part_number: kit.kit_number,
                        name: kit.name,
                        quantity: 1,
                        price_each: kit.price || null,
                      })
                    }
                    className="inline-flex items-center gap-1.5 bg-alkota-black text-white hover:bg-alkota-orange px-5 py-3 text-xs uppercase font-ibm-plex-mono tracking-wider transition-colors cursor-pointer shadow-xs"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Kit</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 05: COMMON COMPONENT FAMILIES CATALOGUE ───────────────────────── */}
      <section className="py-20 bg-[#F7F7F4] border-b border-[#E8E8E4]">
        <div className="mx-auto max-w-7xl px-6 sm:px-12 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#EBEBE8]">
            <div>
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.3em] text-alkota-orange block mb-2 font-bold">
                // COMPONENT TAXONOMY
              </span>
              <h2 className="text-3xl sm:text-5xl font-extralight uppercase tracking-tight text-alkota-black">
                Common Component <span className="text-alkota-orange font-light">Families.</span>
              </h2>
            </div>
            <span className="text-xs font-ibm-plex-mono text-[#777]">
              {PART_CATEGORIES.length} Technical Categories
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Category Selector (4 cols) */}
            <div className="lg:col-span-4 bg-white border border-[#E0E0DC] p-3 space-y-1 shadow-xs max-h-[500px] overflow-y-auto">
              {PART_CATEGORIES.map((cat) => {
                const isSelected = selectedCatFilter === cat.slug;
                return (
                  <button
                    key={cat.slug}
                    type="button"
                    onClick={() => setSelectedCatFilter(cat.slug)}
                    className={`w-full text-left p-3.5 transition-all flex items-center justify-between border cursor-pointer ${
                      isSelected
                        ? 'bg-[#F8F7F4] border-alkota-orange text-alkota-black font-medium shadow-2xs'
                        : 'bg-transparent border-transparent hover:bg-[#FAF9F7] text-[#666]'
                    }`}
                  >
                    <span className="text-xs uppercase tracking-tight">{cat.name}</span>
                    <ChevronRight className={`h-4 w-4 ${isSelected ? 'text-alkota-orange' : 'text-[#CCC]'}`} />
                  </button>
                );
              })}
            </div>

            {/* Right Displayed Parts (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredParts.length > 0 ? (
                  filteredParts.map((part) => (
                    <div
                      key={part.id}
                      className="bg-white border border-[#E0E0DC] p-6 flex flex-col justify-between space-y-4 hover:border-alkota-orange hover:shadow-md transition-all group"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-ibm-plex-mono text-xs font-bold text-alkota-orange uppercase">
                            PN: {part.part_number}
                          </span>
                          <span className="font-ibm-plex-mono text-[9px] uppercase px-1.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200">
                            OEM Stock
                          </span>
                        </div>
                        <h4 className="text-base uppercase font-normal text-alkota-black group-hover:text-alkota-orange transition-colors">
                          {part.name}
                        </h4>
                        <p className="text-xs text-[#666] font-normal line-clamp-2 leading-relaxed">
                          {part.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-[#EBEBE8] flex items-center justify-between">
                        {part.price && (
                          <span className="font-ibm-plex-mono text-base font-bold text-alkota-black">
                            £{part.price.toFixed(2)}
                          </span>
                        )}

                        <div className="flex items-center gap-2">
                          <Link
                            href={`/parts/${part.slug}`}
                            className="p-2 border border-[#DDD] hover:border-alkota-black text-[#555] hover:text-black transition-colors"
                            title="View technical details"
                          >
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                          <button
                            type="button"
                            onClick={() =>
                              addItem({
                                part_number: part.part_number,
                                name: part.name,
                                quantity: 1,
                                price_each: part.price || null,
                              })
                            }
                            className="bg-alkota-black text-white hover:bg-alkota-orange px-3.5 py-2 text-[10px] font-ibm-plex-mono uppercase tracking-wider transition-colors cursor-pointer"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 py-16 text-center bg-white border border-[#E0E0DC] text-xs font-ibm-plex-mono text-[#888] uppercase">
                    Select a component category on the left to view verified OEM parts.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 06: LEGACY ALKOTA SUPPORT & SUPERSEDED RESOLUTION ─────────────── */}
      <section className="py-20 bg-[#141412] text-white border-b border-[#222]">
        <div className="mx-auto max-w-7xl px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.3em] text-alkota-orange block font-bold">
              // LIFECYCLE COMMITMENT
            </span>
            <h2 className="text-3xl sm:text-5xl font-extralight uppercase tracking-tight text-white leading-tight">
              Still Running? <br />
              <span className="text-alkota-orange font-light">Let&apos;s Keep It That Way.</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#AAA] leading-relaxed font-normal max-w-xl">
              Alkota machines built in the 1980s, 1990s, and 2000s are still in active daily commercial service across the UK. Where historical parts numbers have been superseded, our technical team maintains cross-reference records to provide direct drop-in upgrades.
            </p>

            <div className="p-4 bg-black/60 border border-[#2E2E2E] space-y-2 max-w-xl">
              <span className="font-ibm-plex-mono text-[9px] uppercase text-alkota-orange block font-bold">
                Automated Part Number Supersession Example:
              </span>
              <div className="flex items-center justify-between text-xs font-ibm-plex-mono text-[#CCC]">
                <span>Legacy PN: 10-101 (Discontinued)</span>
                <span className="text-alkota-orange">→</span>
                <span className="text-white font-bold">Current OEM: 10-151 Easy-Pull</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#1C1C1A] border border-[#2E2E2E] p-8 space-y-6">
            <h3 className="text-xl uppercase font-light text-white tracking-tight">
              Have an Older Alkota Machine?
            </h3>
            <p className="text-xs text-[#AAA] leading-relaxed font-normal">
              Send us a photo of your machine rating plate or the worn component. Our engineering team will identify the modern replacement from factory archives.
            </p>
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('cant-find-part-form');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full inline-flex items-center justify-center gap-2 bg-alkota-orange text-white py-3.5 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors font-normal cursor-pointer shadow-lg"
            >
              <span>Submit Legacy Identification Request</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ─── 07: CAN'T FIND IT? PHOTO IDENTIFICATION FORM ─────────────────── */}
      <section id="cant-find-part-form" className="py-20 bg-white border-b border-[#E8E8E4]">
        <div className="mx-auto max-w-4xl px-6 sm:px-12 space-y-10">
          <div className="text-center space-y-3">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.3em] text-alkota-orange block font-bold">
              // TECHNICAL ASSISTANCE
            </span>
            <h2 className="text-3xl sm:text-5xl font-extralight uppercase tracking-tight text-alkota-black">
              Can&apos;t Find The Part? <br />
              <span className="text-alkota-orange font-light">We&apos;ll Help Identify It.</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#666] max-w-xl mx-auto leading-relaxed font-normal">
              Upload photos of your serial plate or failed component. Our UK technical team will trace the exact part number from factory build archives.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('Thank you. Your parts identification request has been sent to Alkota UK Technical Support.');
            }}
            className="bg-[#F8F7F4] border border-[#E0E0DC] p-8 sm:p-10 space-y-6 shadow-sm"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-ibm-plex-mono uppercase text-[#555] mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Smith"
                  className="w-full bg-white border border-[#DDD] p-3 text-xs focus:border-alkota-orange focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-ibm-plex-mono uppercase text-[#555] mb-2">
                  Company / Farm Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Apex Logistics Ltd"
                  className="w-full bg-white border border-[#DDD] p-3 text-xs focus:border-alkota-orange focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-ibm-plex-mono uppercase text-[#555] mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. service@company.co.uk"
                  className="w-full bg-white border border-[#DDD] p-3 text-xs focus:border-alkota-orange focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-ibm-plex-mono uppercase text-[#555] mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 07912 506738"
                  className="w-full bg-white border border-[#DDD] p-3 text-xs focus:border-alkota-orange focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-ibm-plex-mono uppercase text-[#555] mb-2">
                  Machine Model (If known)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 430X4 or Cold Skid"
                  className="w-full bg-white border border-[#DDD] p-3 text-xs focus:border-alkota-orange focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-ibm-plex-mono uppercase text-[#555] mb-2">
                  Serial Number (From rating plate)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 98412-A"
                  className="w-full bg-white border border-[#DDD] p-3 text-xs focus:border-alkota-orange focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-ibm-plex-mono uppercase text-[#555] mb-2">
                Describe the Component or Issue *
              </label>
              <textarea
                rows={3}
                required
                placeholder="Describe what part has failed, location on machine, or symptoms (e.g. loss of pressure, burner lockout)..."
                className="w-full bg-white border border-[#DDD] p-3 text-xs focus:border-alkota-orange focus:outline-none"
              />
            </div>

            {/* Photo Upload Area */}
            <div>
              <label className="block text-xs font-ibm-plex-mono uppercase text-[#555] mb-2">
                Attach Photos (Serial Plate or Failed Part)
              </label>
              <div className="border-2 border-dashed border-[#CCC] bg-white p-6 text-center space-y-2 cursor-pointer hover:border-alkota-orange transition-colors">
                <UploadCloud className="h-8 w-8 text-[#888] mx-auto" />
                <span className="block text-xs font-ibm-plex-mono uppercase text-alkota-black">
                  Click to select photos or drag & drop
                </span>
                <span className="block text-[10px] text-[#777]">
                  Supports JPG, PNG up to 10MB each
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-alkota-orange text-white py-4 text-xs uppercase tracking-widest hover:bg-alkota-black transition-colors font-normal cursor-pointer shadow-md"
            >
              <span>Submit Part Identification Enquiry</span>
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </section>

      {/* ─── 08: PARTS + SERVICE BRIDGE ────────────────────────────────────── */}
      <section className="py-20 bg-[#F7F7F4] border-b border-[#E8E8E4]">
        <div className="mx-auto max-w-7xl px-6 sm:px-12 flex flex-col md:flex-row items-center justify-between gap-8 bg-white border border-[#E0E0DC] p-8 sm:p-12 shadow-sm">
          <div className="space-y-3 max-w-2xl">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.25em] text-alkota-orange font-bold block">
              // ON-SITE UK ENGINEERING
            </span>
            <h3 className="text-2xl sm:text-3xl uppercase font-light text-alkota-black tracking-tight">
              Need The Part Fitted By An Alkota Engineer?
            </h3>
            <p className="text-xs text-[#666] leading-relaxed font-normal">
              Our certified UK field technicians provide on-site pump overhauls, burner recalibration, Schedule 80 coil replacements, and preventative plant servicing across England, Scotland, and Wales.
            </p>
          </div>

          <Link
            href="/contact?subject=Service%20Booking"
            className="inline-flex items-center gap-2 bg-alkota-black text-white hover:bg-alkota-orange px-8 py-4 text-xs uppercase tracking-widest transition-colors font-normal shadow-sm shrink-0"
          >
            <span>Book Certified Service</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />

      {/* Machine Identifier Modal */}
      <MachineIdentifierModal
        isOpen={isIdentifierOpen}
        onClose={() => setIsIdentifierOpen(false)}
      />
    </main>
  );
}
