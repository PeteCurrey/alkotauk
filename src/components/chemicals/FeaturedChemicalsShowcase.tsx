'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShoppingCart, Check } from 'lucide-react';
import { usePartsRequest } from '@/components/parts/PartsRequestListContext';
import AmericanHeritageFlagOverlay from './AmericanHeritageFlagOverlay';

interface ChemicalExhibit {
  id: string;
  slug: string;
  code: string;
  name: string;
  tagline: string;
  promise: string;
  bgImage: string;
  dilution: string;
  temperature: string;
  substrate: string;
  packs: { size: string; price: number; sku: string }[];
}

const FEATURED_CHEMICALS: ChemicalExhibit[] = [
  {
    id: 'feat-roadforce',
    slug: 'roadforce-fleet-heavy-tfr',
    code: 'TR-407 Master',
    name: 'RoadForce Fleet Heavy TFR',
    tagline: 'TOUCHLESS TRAFFIC FILM REMOVAL',
    promise: 'Cuts through road film and diesel soot in one touchless pass without etching vehicle livery or polished aluminium.',
    bgImage: '/assets/industries/fleet.png',
    dilution: '1:50 to 1:100',
    temperature: 'Accelerates at 50°C–90°C',
    substrate: 'Paint, Livery & Alloy Safe',
    packs: [
      { size: '5L Canister', price: 14.50, sku: 'ALK-CHM-TR407-5L' },
      { size: '20L Drum', price: 38.50, sku: 'ALK-CHM-TR407-20L' },
      { size: '200L Barrel', price: 295.00, sku: 'ALK-CHM-TR407-200L' },
      { size: '1000L IBC', price: 1180.00, sku: 'ALK-CHM-TR407-1000L' },
    ],
  },
  {
    id: 'feat-greasecut',
    slug: 'greasecut-multi-surface-workshop-degreaser',
    code: 'DE-703 Master',
    name: 'GreaseCut Industrial Workshop Degreaser',
    tagline: 'HYDROCARBON CRACKING FORMULA',
    promise: 'Dissolves baked engine oil and chassis grease on contact, turning heavy sludge into a free-rinsing emulsion.',
    bgImage: '/assets/parts/parts-hero-workshop.jpg',
    dilution: '1:10 Heavy / 1:30 General',
    temperature: 'Cold or Hot Water',
    substrate: 'Concrete, Gearboxes, Steel',
    packs: [
      { size: '5L Canister', price: 12.00, sku: 'ALK-CHM-DE703-5L' },
      { size: '20L Drum', price: 29.50, sku: 'ALK-CHM-DE703-20L' },
      { size: '200L Barrel', price: 245.00, sku: 'ALK-CHM-DE703-200L' },
      { size: '1000L IBC', price: 980.00, sku: 'ALK-CHM-DE703-1000L' },
    ],
  },
  {
    id: 'feat-alumarestore',
    slug: 'alumarestore-aluminium-acid-brightener',
    code: 'TS-602 Master',
    name: 'AlumaRestore Aluminium Acid Brightener',
    tagline: 'OXIDATION & TARNISH RESTORATION',
    promise: 'Restores weathered aluminium fuel tanks, side guards, and tipper bodies to satin brilliance in under two minutes.',
    bgImage: '/assets/hot-water-gauge-hero.jpg',
    dilution: '1:5 to 1:15',
    temperature: 'Ambient / Cold Water',
    substrate: 'Raw Mill-Finish Aluminium',
    packs: [
      { size: '5L Canister', price: 18.00, sku: 'ALK-CHM-TS602-5L' },
      { size: '20L Drum', price: 46.00, sku: 'ALK-CHM-TS602-20L' },
      { size: '200L Barrel', price: 380.00, sku: 'ALK-CHM-TS602-200L' },
    ],
  },
  {
    id: 'feat-scaleguard',
    slug: 'scaleguard-water-softener-coil-protector',
    code: 'SD-927 Master',
    name: 'ScaleGuard Water Softener & Coil Protector',
    tagline: 'PREVENTATIVE BOILER CHELATION',
    promise: 'Binds hard water minerals before they precipitate into scale choke points, protecting your 7-year boiler warranty.',
    bgImage: '/assets/engineered-continuous-duty.jpg',
    dilution: '1:1000 Continuous Metering',
    temperature: 'Effective up to 150°C Steam',
    substrate: 'Internal Coil & Valves',
    packs: [
      { size: '5L Canister', price: 15.00, sku: 'ALK-CHM-SD927-5L' },
      { size: '20L Drum', price: 34.00, sku: 'ALK-CHM-SD927-20L' },
    ],
  },
];

export default function FeaturedChemicalsShowcase() {
  const { addItem, setIsDrawerOpen } = usePartsRequest();
  const [selectedPacks, setSelectedPacks] = useState<Record<string, number>>({
    'feat-roadforce': 1,
    'feat-greasecut': 1,
    'feat-alumarestore': 1,
    'feat-scaleguard': 1,
  });
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const handleSelectPack = (chemId: string, packIdx: number) => {
    setSelectedPacks((prev) => ({ ...prev, [chemId]: packIdx }));
  };

  const handleAddChemical = (chem: ChemicalExhibit) => {
    const packIdx = selectedPacks[chem.id] ?? 1;
    const pack = chem.packs[packIdx] || chem.packs[0];

    addItem({
      id: `${chem.id}-${pack.size}`,
      part_number: pack.sku,
      name: `${chem.name} (${pack.size})`,
      price_each: pack.price,
      quantity: 1,
      image: chem.bgImage,
      pack_size: pack.size,
      category: 'chemicals',
    });

    setAddedIds((prev) => ({ ...prev, [chem.id]: true }));
    setIsDrawerOpen(true);

    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [chem.id]: false }));
    }, 2500);
  };

  return (
    <section id="featured-chemicals" className="relative py-20 lg:py-28 px-6 sm:px-10 lg:px-16 bg-[#1A1917] text-[#F4F1EA] border-b border-white/10 overflow-hidden">
      {/* ── AMERICAN HERITAGE FLAG OVERLAY (WITH WIND WAVE AND GRADIENT FADE) ── */}
      <AmericanHeritageFlagOverlay opacity={0.24} />

      <div className="relative z-10 max-w-7xl mx-auto space-y-12">
        {/* ── SECTION HEADER ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="font-ibm-plex-mono text-[11px] uppercase tracking-[0.25em] text-[#FF6900] font-semibold block">
              // Featured Master Formulations
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white drop-shadow-sm">
              Serious cleaning chemistry. No nonsense.
            </h2>
            <p className="text-sm sm:text-base text-[#AAA] font-normal leading-relaxed">
              Industrial formulas blended in the UK for pressure washers and automated wash bays. Choose your pack size below for instant despatch.
            </p>
          </div>

          <Link
            href="/chemicals"
            className="inline-flex items-center gap-2 font-ibm-plex-mono text-xs uppercase tracking-widest text-[#F4F1EA] hover:text-[#FF6900] transition-colors font-medium self-start md:self-auto py-1"
          >
            <span>Technical SDS Dossier</span>
            <ArrowRight className="w-4 h-4 text-[#FF6900]" />
          </Link>
        </div>

        {/* ── 4-PRODUCT FEATURED GRID WITH CARD BACKGROUND IMAGES & TACTILE DEPTH ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {FEATURED_CHEMICALS.map((chem) => {
            const currentPackIdx = selectedPacks[chem.id] ?? 1;
            const currentPack = chem.packs[currentPackIdx] || chem.packs[0];

            return (
              <div
                key={chem.id}
                className="relative group bg-[#201E1C] border border-white/10 hover:border-[#FF6900] rounded-[6px] shadow-tactile hover:shadow-tactile-hover transition-all duration-300 hover:-translate-y-[2px] flex flex-col justify-between p-8 sm:p-10 space-y-8 overflow-hidden"
              >
                {/* ── CARD RELEVANT BACKGROUND PHOTOGRAPHY ── */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                  <div className="relative w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out">
                    <Image
                      src={chem.bgImage}
                      alt={chem.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover object-center brightness-[0.25] contrast-[1.15]"
                    />
                  </div>
                  {/* Scrim Overlay for total readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1917] via-[#1A1917]/85 to-[#1A1917]/70" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#1A1917]/90 via-[#1A1917]/60 to-transparent" />
                </div>

                {/* Top: Code & Title */}
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between font-ibm-plex-mono text-xs">
                    <span className="text-[#FF6900] uppercase font-semibold">
                      {chem.code}
                    </span>
                    <span className="text-emerald-400 bg-emerald-950/70 border border-emerald-800/50 px-2.5 py-0.5 text-[10px] uppercase tracking-wider rounded-[3px] shadow-tactile-sm">
                      100% GB-CLP Verified
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-snug drop-shadow-sm">
                    {chem.name}
                  </h3>

                  <p className="text-sm text-[#DDD] font-normal leading-relaxed">
                    {chem.promise}
                  </p>

                  {/* Spec Row */}
                  <div className="pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-ibm-plex-mono text-[#AAA]">
                    <div>
                      <span className="block text-[10px] text-[#888] uppercase">Dilution:</span>
                      <span className="text-white font-medium">{chem.dilution}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-[#888] uppercase">Substrate:</span>
                      <span className="text-white font-medium truncate block">{chem.substrate}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-[#888] uppercase">Reaction:</span>
                      <span className="text-white font-medium truncate block">{chem.temperature}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom: Pack Selector & Commerce Action */}
                <div className="relative z-10 space-y-5 pt-6 border-t border-white/10">
                  <div className="space-y-2">
                    <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#888] block">
                      Select Pack Format:
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {chem.packs.map((p, pIdx) => {
                        const isSelected = pIdx === currentPackIdx;
                        return (
                          <button
                            key={p.size}
                            type="button"
                            onClick={() => handleSelectPack(chem.id, pIdx)}
                            className={`p-2.5 text-center font-ibm-plex-mono text-xs rounded-[4px] btn-tactile cursor-pointer border ${
                              isSelected
                                ? 'bg-[#FF6900] text-white border-[#FF6900] font-semibold shadow-button'
                                : 'bg-[#1A1917]/90 text-[#BBB] hover:text-white hover:bg-black/80 border-white/15'
                            }`}
                          >
                            <span className="block font-medium">{p.size}</span>
                            <span className="text-[11px] opacity-90 block mt-0.5">£{p.price.toFixed(2)}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 pt-2">
                    <div>
                      <span className="text-[10px] font-ibm-plex-mono text-[#888] uppercase block">
                        Trade Price ({currentPack.size})
                      </span>
                      <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                        £{currentPack.price.toFixed(2)}{' '}
                        <span className="text-xs font-ibm-plex-mono text-[#888] font-normal uppercase">ex VAT</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Link
                        href={`/chemicals/product/${chem.slug}`}
                        className="px-4 py-3.5 border border-white/20 hover:border-white text-white font-ibm-plex-mono text-xs uppercase tracking-widest rounded-[4px] btn-tactile bg-black/40"
                      >
                        Specs
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleAddChemical(chem)}
                        className={`inline-flex items-center gap-2 px-6 py-3.5 font-ibm-plex-mono text-xs uppercase tracking-widest font-semibold cursor-pointer rounded-[4px] shadow-button hover:shadow-button-hover btn-tactile ${
                          addedIds[chem.id]
                            ? 'bg-emerald-700 text-white'
                            : 'bg-[#FF6900] hover:bg-white hover:text-black text-white'
                        }`}
                      >
                        {addedIds[chem.id] ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-4 h-4" />
                            <span>Add to Order</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
