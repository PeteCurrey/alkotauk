'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import Link from 'next/link';
import {
  Wrench,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Download,
  Plus,
  ArrowRight,
  Truck,
  Layers,
  HelpCircle
} from 'lucide-react';
import {
  getPartBySlug,
  VERIFIED_PARTS,
  SUPERSEDED_PARTS_MAP,
} from '@/lib/parts/seed-data';
import { PartsRequestProvider, usePartsRequest } from '@/components/parts/PartsRequestListContext';
import PartsRequestDrawer from '@/components/parts/PartsRequestDrawer';

export default function PartDetailPage() {
  return (
    <PartsRequestProvider>
      <PartDetailContent />
      <PartsRequestDrawer />
    </PartsRequestProvider>
  );
}

function PartDetailContent() {
  const params = useParams();
  const rawSlug = (params?.slug as string) || 'general-pump-ts2021';
  const { addItem } = usePartsRequest();

  const part = getPartBySlug(rawSlug) || VERIFIED_PARTS[0];

  return (
    <main className="min-h-screen bg-[#FDFDFC] text-alkota-black selection:bg-alkota-orange selection:text-white pt-28 pb-0">
      <Navigation />

      {/* Breadcrumbs & Header */}
      <section className="border-b border-[#E8E8E4] bg-[#F7F7F4] py-12">
        <div className="mx-auto max-w-7xl px-6 sm:px-12 space-y-6">
          <Breadcrumbs
            items={[
              { label: 'Genuine Parts', href: '/parts' },
              { label: part.category, href: '/parts' },
              { label: part.part_number }
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-4">
            {/* Left Technical Image / Card (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="aspect-square bg-white border border-[#E0E0DC] p-8 flex items-center justify-center relative shadow-sm">
                {part.image_url ? (
                  <img
                    src={part.image_url}
                    alt={part.name}
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <div className="text-center space-y-3 p-6 bg-[#F8F7F4] border border-[#EBEBE8] w-full h-full flex flex-col justify-center items-center">
                    <Wrench className="h-12 w-12 text-[#888] opacity-60" />
                    <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#666] block">
                      Genuine OEM Replacement Component
                    </span>
                    <span className="font-ibm-plex-mono text-[9px] text-[#888] block">
                      Part Number: {part.part_number}
                    </span>
                  </div>
                )}

                <div className="absolute top-4 left-4">
                  <span className="font-ibm-plex-mono text-[9px] uppercase px-2.5 py-1 bg-alkota-orange text-white font-bold tracking-wider">
                    Genuine OEM
                  </span>
                </div>
              </div>

              <div className="p-4 bg-white border border-[#E0E0DC] text-xs font-ibm-plex-mono text-[#666] space-y-1.5 shadow-2xs">
                <div className="flex justify-between">
                  <span>Manufacturer:</span>
                  <span className="text-alkota-black font-medium">{part.manufacturer}</span>
                </div>
                {part.weight_kg && (
                  <div className="flex justify-between">
                    <span>Shipping Weight:</span>
                    <span className="text-alkota-black font-medium">{part.weight_kg} kg</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Stock Status:</span>
                  <span className="text-emerald-700 font-bold uppercase">UK Stock Available</span>
                </div>
              </div>
            </div>

            {/* Right Product Specifications (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-ibm-plex-mono text-sm font-bold text-alkota-orange">
                    PART NUMBER: {part.part_number}
                  </span>
                  <span className="font-ibm-plex-mono text-[10px] uppercase text-[#777] px-2 py-0.5 border border-[#DDD] bg-white">
                    {part.category}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-extralight uppercase tracking-tight text-alkota-black leading-tight">
                  {part.name}
                </h1>
              </div>

              {part.price && (
                <div className="p-4 bg-white border border-[#E0E0DC] flex items-baseline gap-3 shadow-2xs">
                  <span className="font-ibm-plex-mono text-3xl font-bold text-alkota-black">
                    £{part.price.toFixed(2)}
                  </span>
                  <span className="text-xs font-ibm-plex-mono text-[#777]">
                    excl. VAT / UK Same-Day Dispatch
                  </span>
                </div>
              )}

              <p className="text-sm text-[#555] leading-relaxed font-normal">
                {part.description}
              </p>

              {part.technical_notes && (
                <div className="p-5 bg-white border border-[#E0E0DC] space-y-2 shadow-2xs">
                  <span className="font-ibm-plex-mono text-[10px] uppercase text-alkota-orange font-bold block">
                    // Technical Specifications & Ratings
                  </span>
                  <p className="text-xs text-[#444] font-normal leading-relaxed">
                    {part.technical_notes}
                  </p>
                </div>
              )}

              {/* Action Area */}
              <div className="pt-4 flex flex-wrap gap-4">
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
                  className="inline-flex items-center gap-2 bg-alkota-orange text-white hover:bg-alkota-black px-8 py-4 text-xs font-ibm-plex-mono uppercase tracking-widest transition-colors font-normal shadow-md cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add to Parts Request List</span>
                </button>

                <Link
                  href="/contact?subject=Parts%20Technical%20Question"
                  className="inline-flex items-center gap-2 border border-[#D5D5D0] bg-white hover:border-alkota-black text-alkota-black px-6 py-4 text-xs font-ibm-plex-mono uppercase tracking-widest transition-colors"
                >
                  <HelpCircle className="h-4 w-4 text-alkota-orange" />
                  <span>Technical Fitment Advice</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── COMPATIBLE MACHINES MATRIX ────────────────────────────────────── */}
      {part.compatible_machines && part.compatible_machines.length > 0 && (
        <section className="py-16 bg-white border-b border-[#E8E8E4]">
          <div className="mx-auto max-w-7xl px-6 sm:px-12 space-y-6">
            <div>
              <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange block font-bold">
                Verified Fitment
              </span>
              <h2 className="text-2xl sm:text-3xl uppercase font-light text-alkota-black tracking-tight">
                Compatible Alkota Equipment Models
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {part.compatible_machines.map((machineSlug) => (
                <Link
                  key={machineSlug}
                  href={`/parts/machine/${machineSlug}`}
                  className="p-4 bg-[#F8F7F4] hover:bg-orange-50/40 border border-[#E0E0DC] hover:border-alkota-orange transition-all group no-underline flex items-center justify-between"
                >
                  <span className="text-xs uppercase font-ibm-plex-mono text-alkota-black group-hover:text-alkota-orange">
                    {machineSlug.toUpperCase()}
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 text-[#AAA] group-hover:text-alkota-orange" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
