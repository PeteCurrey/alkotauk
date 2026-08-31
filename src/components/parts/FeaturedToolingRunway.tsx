'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShoppingCart, Check } from 'lucide-react';
import { usePartsRequest } from './PartsRequestListContext';

interface FeaturedItem {
  id: string;
  partNumber: string;
  brand: string;
  name: string;
  descriptor: string;
  price: number;
  specs: string[];
  image: string;
  category: string;
  inStock: boolean;
}

const FEATURED_ITEMS: FeaturedItem[] = [
  {
    id: 'feat-mosmatic-43',
    partNumber: 'MOS-DL-UHD-43',
    brand: 'Mosmatic Switzerland',
    name: 'DL-UHD 43 Flat Surface Cleaner (18")',
    descriptor: 'Dual-jet rotary surface cleaner for concrete yards, forecourts, and workshop bays with zero overspray.',
    price: 445.00,
    specs: ['275 BAR / 4,000 PSI', '120°C Hot Water', '2,000 RPM Dual-Jet', '304 Welded Stainless'],
    image: '/assets/products/whirl-away-surface-cleaner.png',
    category: 'surface-cleaners',
    inStock: true,
  },
  {
    id: 'feat-coxreels-1125',
    partNumber: 'COX-1125-3-100',
    brand: 'Cox Reels USA',
    name: '1125 Series Heavy-Duty All-Steel Hose Reel',
    descriptor: 'Direct hand-crank hose management for 30m of 3/8" wire-braided hose. Tangle-free rapid deployment.',
    price: 285.00,
    specs: ['30m (100ft) Capacity', '300 BAR Working Pressure', 'Live Brass Swivel', 'Floor, Wall & Skid Mount'],
    image: '/assets/products/high-pressure-hose.png',
    category: 'hoses',
    inStock: true,
  },
  {
    id: 'feat-generalpump-ts2021',
    partNumber: 'ALK-PMP-001',
    brand: 'Alkota OEM / General Pump',
    name: 'TS2021 Industrial Triplex Plunger Pump',
    descriptor: 'The gold-standard commercial pressure pump with solid ceramic plungers and forged brass head for 24/7 duty.',
    price: 645.00,
    specs: ['15.0 L/min Flow', '200 BAR / 2,900 PSI', 'Solid Ceramic Plungers', 'Forged Brass Manifold'],
    image: '/assets/products/industrial-pump.png',
    category: 'pumps',
    inStock: true,
  },
  {
    id: 'feat-schedule80-coil',
    partNumber: 'ALK-COIL-4000',
    brand: 'Alkota OEM Genuine',
    name: 'Schedule 80 Hydro-Insulated Heating Coil',
    descriptor: 'Seamless cold-rolled boiler coil delivering instantaneous 140°C saturated steam for 4000 Series machines.',
    price: 890.00,
    specs: ['ASTM A53 Cold-Rolled Pipe', 'Schedule 80 Continuous-Wound', '1,000 Bar Proof Tested', '7-Year Boiler Guarantee'],
    image: '/assets/engineered-continuous-duty.jpg',
    category: 'coils',
    inStock: true,
  },
  {
    id: 'feat-st1500-gun',
    partNumber: 'ALK-GUN-1500',
    brand: 'Alkota OEM Genuine',
    name: 'ST-1500 Heavy-Duty Gun & 1200mm Vented Lance',
    descriptor: 'Ergonomic easy-pull trigger assembly with 1200mm insulated vented barrel and stainless quick-release coupling.',
    price: 102.50,
    specs: ['310 BAR Maximum', '150°C Rated Seal', '1200mm Vented Grip', '3/8" BSP Female Inlet'],
    image: '/assets/products/trigger-gun.png',
    category: 'trigger-guns',
    inStock: true,
  },
];

export default function FeaturedToolingRunway() {
  const { addItem, setIsDrawerOpen } = usePartsRequest();
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const handleQuickAdd = (item: FeaturedItem) => {
    addItem({
      id: item.id,
      part_number: item.partNumber,
      name: item.name,
      price_each: item.price,
      quantity: 1,
      image: item.image,
      category: item.category,
    });

    setAddedIds((prev) => ({ ...prev, [item.id]: true }));
    setIsDrawerOpen(true);

    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [item.id]: false }));
    }, 2500);
  };

  return (
    <section id="featured-tooling" className="py-20 lg:py-28 px-6 sm:px-10 lg:px-16 bg-[#F4F1EA] text-[#1A1917] border-b border-[#E2DDD3]">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* ── SECTION HEADER ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="font-ibm-plex-mono text-[11px] uppercase tracking-[0.25em] text-[#FF6900] font-semibold block">
              // Featured Attachments &amp; Spares
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1A1917]">
              The right attachment changes the job.
            </h2>
            <p className="text-sm sm:text-base text-[#555] font-normal leading-relaxed">
              Equip your pressure washer with Swiss rotary tooling, heavy-duty hose reels, and factory-certified OEM replacement components.
            </p>
          </div>

          <Link
            href="#catalogue-search"
            className="inline-flex items-center gap-2 font-ibm-plex-mono text-xs uppercase tracking-widest text-[#1A1917] hover:text-[#FF6900] transition-colors font-medium self-start md:self-auto py-1"
          >
            <span>Browse Full Catalogue</span>
            <ArrowRight className="w-4 h-4 text-[#FF6900]" />
          </Link>
        </div>

        {/* ── PRODUCT SHOWCASE RUNWAY (PHYSICAL DEPTH & CONTACT SHADOWS) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {FEATURED_ITEMS.map((item, idx) => {
            const isLarge = idx === 0;
            return (
              <div
                key={item.id}
                className={`group bg-white border border-[#DDD8CE] hover:border-[#FF6900] rounded-[6px] shadow-tactile hover:shadow-tactile-hover transition-all duration-300 hover:-translate-y-[2px] flex flex-col justify-between overflow-hidden ${
                  isLarge ? 'md:col-span-2 lg:col-span-2' : 'col-span-1'
                }`}
              >
                {/* Product Image Area with Contact Shadow */}
                <div className={`relative w-full bg-[#FAF9F6] p-6 flex items-center justify-center border-b border-[#EAE6DE] overflow-hidden rounded-t-[5px] ${
                  isLarge ? 'h-72 sm:h-80' : 'h-64'
                }`}>
                  <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
                    <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest bg-[#1A1917] text-white px-2.5 py-1 rounded-[3px] shadow-tactile-sm">
                      {item.brand}
                    </span>
                    {item.inStock && (
                      <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 font-medium rounded-[3px]">
                        In Stock
                      </span>
                    )}
                  </div>

                  {/* Soft Physical Contact Shadow Element */}
                  <div className="absolute bottom-5 w-3/5 h-3 bg-[radial-gradient(ellipse_at_center,rgba(26,25,23,0.18)_0%,rgba(26,25,23,0)_70%)] blur-[3px] pointer-events-none" />

                  {/* Product Image with Subtle Scale on Hover */}
                  <div className="relative w-full h-full max-h-56 transition-transform duration-500 ease-out group-hover:scale-[1.025] animate-breathe-subtle">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-contain object-center shadow-contact-subtle"
                    />
                  </div>
                </div>

                {/* Product Information Area */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-ibm-plex-mono text-xs text-[#FF6900] font-medium">
                        {item.partNumber}
                      </span>
                      <span className="font-ibm-plex-mono text-[11px] text-[#777]">
                        ex VAT
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1A1917] leading-snug">
                      {item.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#666] leading-relaxed font-normal">
                      {item.descriptor}
                    </p>

                    {/* Spec Bullets */}
                    <div className="pt-3 border-t border-[#F0EBE1] grid grid-cols-2 gap-2 text-xs font-ibm-plex-mono text-[#555]">
                      {item.specs.map((spec, sIdx) => (
                        <div key={sIdx} className="flex items-center gap-1.5 truncate">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#FF6900] shrink-0" />
                          <span className="truncate">{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Commerce Action Bar */}
                  <div className="pt-4 border-t border-[#EAE6DE] flex items-center justify-between gap-4">
                    <div>
                      <span className="text-xs text-[#777] block font-ibm-plex-mono">Trade Price</span>
                      <span className="text-2xl font-bold text-[#1A1917] tracking-tight">
                        £{item.price.toFixed(2)}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleQuickAdd(item)}
                      className={`inline-flex items-center gap-2 px-5 py-3 font-ibm-plex-mono text-xs uppercase tracking-widest font-semibold cursor-pointer rounded-[4px] shadow-button hover:shadow-button-hover btn-tactile ${
                        addedIds[item.id]
                          ? 'bg-emerald-700 text-white'
                          : 'bg-[#FF6900] hover:bg-[#1A1917] text-white'
                      }`}
                    >
                      {addedIds[item.id] ? (
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
