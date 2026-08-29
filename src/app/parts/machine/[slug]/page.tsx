'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import Link from 'next/link';
import {
  Wrench,
  Download,
  FileText,
  ShieldCheck,
  Flame,
  CheckCircle2,
  Plus,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Search
} from 'lucide-react';
import {
  VERIFIED_PARTS,
  VERIFIED_ASSEMBLIES,
  VERIFIED_SERVICE_KITS,
  getPartsByMachine,
  getAssembliesByMachine,
} from '@/lib/parts/seed-data';
import InteractiveDiagramViewer from '@/components/parts/InteractiveDiagramViewer';
import { PartsRequestProvider, usePartsRequest } from '@/components/parts/PartsRequestListContext';
import PartsRequestDrawer from '@/components/parts/PartsRequestDrawer';

export default function MachinePartsPage() {
  return (
    <PartsRequestProvider>
      <MachinePartsContent />
      <PartsRequestDrawer />
    </PartsRequestProvider>
  );
}

function MachinePartsContent() {
  const params = useParams();
  const slug = (params?.slug as string) || 'alkota-430xh';
  const { addItem } = usePartsRequest();

  // Machine Details
  const is430XH = slug.includes('430') || slug.includes('4000');
  const machineModelCode = is430XH ? '430XH' : slug.toUpperCase();
  const machineName = is430XH
    ? 'Alkota 430XH (4000 Series) Hot Water Pressure Washer'
    : `Alkota ${machineModelCode} Industrial Unit`;

  const assemblies = getAssembliesByMachine(slug);
  const [activeAssemblyIdx, setActiveAssemblyIdx] = useState(0);
  const [partSearch, setPartSearch] = useState('');

  const currentAssembly = assemblies[activeAssemblyIdx] || assemblies[0];
  const machineParts = getPartsByMachine(slug);

  const filteredParts = machineParts.filter(
    (p) =>
      p.name.toLowerCase().includes(partSearch.toLowerCase()) ||
      p.part_number.toLowerCase().includes(partSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(partSearch.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#FDFDFC] text-alkota-black selection:bg-alkota-orange selection:text-white pt-28 pb-0">
      <Navigation />

      {/* Masthead */}
      <section className="relative border-b border-[#E8E8E4] bg-[#F7F7F4] py-12">
        <div className="mx-auto max-w-7xl px-6 sm:px-12 space-y-6">
          <Breadcrumbs
            items={[
              { label: 'Genuine Parts', href: '/parts' },
              { label: 'Machine Hub', href: '/parts' },
              { label: machineModelCode }
            ]}
          />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pt-4">
            <div className="space-y-3 max-w-3xl">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-alkota-orange" />
                <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.25em] text-alkota-orange font-bold">
                  // MACHINE PARTS PROFILE // MODEL: {machineModelCode}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extralight tracking-tight uppercase text-alkota-black leading-tight">
                {machineName}
              </h1>

              <p className="text-xs sm:text-sm text-[#666] leading-relaxed font-normal">
                Access factory exploded schematics, scheduled service overhaul kits, and verified genuine OEM components for model {machineModelCode}.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#E0E0DC] space-y-3 min-w-[280px] shadow-xs">
              <span className="font-ibm-plex-mono text-[9px] uppercase text-[#777] block font-bold">
                Machine Specifications:
              </span>
              <div className="text-xs font-ibm-plex-mono space-y-1 text-alkota-black">
                <div>Pressure: 3000 PSI (205 BAR)</div>
                <div>Flow Rate: 15.0 L/MIN</div>
                <div>Heating: Oil-Fired Schedule 80</div>
                <div>Standard Pump: General Pump TS2021</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 01: EXPLODED ASSEMBLIES ───────────────────────────────────────── */}
      {assemblies.length > 0 && (
        <section className="py-16 bg-white border-b border-[#E8E8E4]">
          <div className="mx-auto max-w-7xl px-6 sm:px-12 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange block">
                  Interactive Schematics
                </span>
                <h2 className="text-2xl sm:text-3xl uppercase font-light text-alkota-black tracking-tight">
                  Exploded Assembly Diagrams
                </h2>
              </div>

              <div className="flex items-center gap-2">
                {assemblies.map((ass, idx) => (
                  <button
                    key={ass.id}
                    type="button"
                    onClick={() => setActiveAssemblyIdx(idx)}
                    className={`px-4 py-2 font-ibm-plex-mono text-xs uppercase tracking-wider border transition-all cursor-pointer ${
                      activeAssemblyIdx === idx
                        ? 'bg-alkota-black text-white border-alkota-black shadow-xs'
                        : 'bg-[#F8F7F4] text-[#666] border-[#DDD] hover:border-alkota-black'
                    }`}
                  >
                    {ass.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[#FAF9F7] border border-[#E0E0DC] p-6 sm:p-8">
              <InteractiveDiagramViewer
                assembly={currentAssembly}
                machineModelCode={machineModelCode}
              />
            </div>
          </div>
        </section>
      )}

      {/* ─── 02: COMPATIBLE SERVICE KITS ───────────────────────────────────── */}
      <section className="py-16 bg-[#F7F7F4] border-b border-[#E8E8E4]">
        <div className="mx-auto max-w-7xl px-6 sm:px-12 space-y-8">
          <div>
            <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange block font-bold">
              Factory Maintenance Packs
            </span>
            <h2 className="text-2xl sm:text-3xl uppercase font-light text-alkota-black tracking-tight">
              Compatible Service Kits for {machineModelCode}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VERIFIED_SERVICE_KITS.map((kit) => (
              <div
                key={kit.id}
                className="bg-white border border-[#E0E0DC] p-6 flex flex-col justify-between space-y-4 shadow-xs hover:border-alkota-orange transition-all"
              >
                <div className="space-y-2">
                  <span className="font-ibm-plex-mono text-xs font-bold text-alkota-orange block">
                    {kit.kit_number}
                  </span>
                  <h3 className="text-lg uppercase font-normal text-alkota-black">
                    {kit.name}
                  </h3>
                  <p className="text-xs text-[#666] font-normal leading-relaxed">
                    {kit.service_purpose}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#EBEBE8] flex items-center justify-between">
                  {kit.price && (
                    <span className="font-ibm-plex-mono text-base font-bold text-alkota-black">
                      £{kit.price.toFixed(2)} excl. VAT
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() =>
                      addItem({
                        part_number: kit.kit_number,
                        name: kit.name,
                        quantity: 1,
                        price_each: kit.price || null,
                        machine_context: machineModelCode,
                      })
                    }
                    className="inline-flex items-center gap-1.5 bg-alkota-black text-white hover:bg-alkota-orange px-4 py-2 text-xs uppercase font-ibm-plex-mono tracking-wider transition-colors cursor-pointer"
                  >
                    <Plus className="h-3 w-3" />
                    <span>Add Kit</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 03: ALL COMPATIBLE PARTS LIST ─────────────────────────────────── */}
      <section className="py-16 bg-white border-b border-[#E8E8E4]">
        <div className="mx-auto max-w-7xl px-6 sm:px-12 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange block font-bold">
                Parts Inventory
              </span>
              <h2 className="text-2xl sm:text-3xl uppercase font-light text-alkota-black tracking-tight">
                All Verified Replacement Parts for {machineModelCode}
              </h2>
            </div>

            <div className="relative w-full sm:w-72">
              <input
                type="text"
                value={partSearch}
                onChange={(e) => setPartSearch(e.target.value)}
                placeholder="Filter parts by name or PN..."
                className="w-full bg-[#F8F7F4] border border-[#DDD] py-2 px-3 pl-8 text-xs font-ibm-plex-mono text-alkota-black focus:outline-none focus:border-alkota-orange"
              />
              <Search className="h-3.5 w-3.5 text-[#888] absolute left-2.5 top-3" />
            </div>
          </div>

          <div className="border border-[#E0E0DC] overflow-x-auto bg-white">
            <table className="w-full text-left text-xs min-w-[700px]">
              <thead>
                <tr className="bg-[#F8F7F4] border-b border-[#E0E0DC] font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#777]">
                  <th className="px-6 py-3.5">Part Number</th>
                  <th className="px-6 py-3.5">Component Name</th>
                  <th className="px-6 py-3.5">Category</th>
                  <th className="px-6 py-3.5">Price</th>
                  <th className="px-6 py-3.5">Stock Status</th>
                  <th className="px-6 py-3.5 text-right">Procurement Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EBEBE8]">
                {filteredParts.map((part) => (
                  <tr key={part.id} className="hover:bg-[#FAF9F7] transition-colors">
                    <td className="px-6 py-4 font-ibm-plex-mono font-bold text-alkota-orange">
                      {part.part_number}
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/parts/${part.slug}`}
                        className="text-alkota-black hover:text-alkota-orange font-medium transition-colors no-underline block"
                      >
                        {part.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 font-ibm-plex-mono text-[10px] uppercase text-[#666]">
                      {part.category}
                    </td>
                    <td className="px-6 py-4 font-ibm-plex-mono text-alkota-black">
                      {part.price ? `£${part.price.toFixed(2)}` : 'Enquire'}
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-ibm-plex-mono text-[9px] uppercase text-emerald-600">
                        OEM In Stock
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        type="button"
                        onClick={() =>
                          addItem({
                            part_number: part.part_number,
                            name: part.name,
                            quantity: 1,
                            price_each: part.price || null,
                            machine_context: machineModelCode,
                          })
                        }
                        className="inline-flex items-center gap-1 bg-alkota-black text-white hover:bg-alkota-orange px-3.5 py-1.5 text-[10px] font-ibm-plex-mono uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        <Plus className="h-3 w-3" />
                        <span>Add to List</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
