'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Plus, Check, Search, Filter, X, ArrowRight, ShieldCheck, Droplet, ShoppingCart } from 'lucide-react';
import { ChemicalRetailProduct } from '@/lib/types/chemical-commerce';
import { usePartsRequest } from '@/components/parts/PartsRequestListContext';
import { CHEMICAL_APPLICATIONS } from '@/lib/chemicals/seed-data';

interface Props {
  products: ChemicalRetailProduct[];
}

export default function FacetedChemicalDirectory({ products }: Props) {
  const { addItem, setIsDrawerOpen } = usePartsRequest();
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const filteredProducts = useMemo(() => {
    return (products || []).filter((prod) => {
      // Search
      if (search.trim()) {
        const q = search.toLowerCase().trim();
        const matchesName = prod.retail_name.toLowerCase().includes(q);
        const matchesCode = prod.originating_master_code.toLowerCase().includes(q);
        const matchesDesc = prod.short_description.toLowerCase().includes(q);
        const matchesFamily = prod.retail_family.toLowerCase().includes(q);
        const matchesApp = prod.primary_application.toLowerCase().includes(q);
        if (!matchesName && !matchesCode && !matchesDesc && !matchesFamily && !matchesApp) {
          return false;
        }
      }

      // Sector facet
      if (selectedSector !== 'all') {
        const app = CHEMICAL_APPLICATIONS.find(a => a.slug === selectedSector);
        if (app) {
          const appKeyword = app.name.toLowerCase().split(' ')[0];
          const matchesPrimary = prod.primary_application.toLowerCase().includes(appKeyword);
          const matchesLong = prod.long_description.toLowerCase().includes(appKeyword);
          const matchesFamily = prod.retail_family.toLowerCase().includes(appKeyword);
          if (!matchesPrimary && !matchesLong && !matchesFamily) {
            return false;
          }
        }
      }

      return true;
    });
  }, [products, selectedSector, search]);

  const handleAddToCart = (product: ChemicalRetailProduct) => {
    const sku = (product.skus && product.skus[1]) || (product.skus && product.skus[0]) || {
      sku_code: `ALK-${product.originating_master_code}-20L`,
      pack_size: '20L Drum',
      price: 84.00,
    };

    addItem({
      id: `${product.id}-${sku.sku_code}`,
      part_number: sku.sku_code,
      name: `${product.retail_name} (${sku.pack_size})`,
      price_each: sku.price,
      quantity: 1,
      pack_size: sku.pack_size,
      machine_context: `${product.retail_family} (${product.originating_master_code})`,
      image: product.hero_image || undefined,
      category: 'chemicals',
    });

    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setIsDrawerOpen(true);
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  return (
    <section id="directory" className="w-full py-20 lg:py-28 px-6 sm:px-10 lg:px-16 bg-[#F4F1EA] text-[#1A1917] border-t border-[#E2DDD3]">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header & Sector Count */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E2DDD3]">
          <div className="space-y-2">
            <span className="font-ibm-plex-mono text-[11px] uppercase tracking-[0.25em] text-[#FF6900] font-semibold block">
              // Formulation Directory
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1A1917]">
              Complete Chemical Range ({filteredProducts.length} Formulations)
            </h2>
          </div>
          <p className="text-xs font-ibm-plex-mono text-[#666] max-w-sm">
            100% GB-CLP verified master chemical formulations engineered for high-pressure hot water delivery.
          </p>
        </div>

        {/* ── 8-SECTOR APPLICATION FACET BAR ── */}
        <div className="bg-white p-6 border border-[#DDD8CE] rounded-[6px] shadow-tactile space-y-6">
          
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search formulation name, master code (e.g. TR-407, DE-703, TS-602), application..."
              className="w-full pl-11 pr-4 py-3.5 bg-[#FAF9F6] border border-[#DDD8CE] text-xs font-ibm-plex-mono text-[#1A1917] placeholder-[#888] focus:outline-none focus:border-[#FF6900] focus:bg-white transition-all rounded-[5px] focus:shadow-tactile-sm"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888] hover:text-black p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* 8 Sector Pills */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#777] block font-medium">
                Faceted by Application Sector:
              </span>
              {(selectedSector !== 'all' || search) && (
                <button
                  type="button"
                  onClick={() => { setSelectedSector('all'); setSearch(''); }}
                  className="font-ibm-plex-mono text-[10px] text-rose-700 hover:underline uppercase"
                >
                  Reset Filters
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => setSelectedSector('all')}
                className={`px-3 py-1.5 font-ibm-plex-mono text-[11px] uppercase tracking-wider transition-all cursor-pointer rounded-[4px] btn-tactile ${
                  selectedSector === 'all'
                    ? 'bg-[#1A1917] text-white font-semibold shadow-button'
                    : 'bg-[#FAF9F6] text-[#555] hover:bg-[#1A1917] hover:text-white border border-[#DDD8CE]'
                }`}
              >
                All Sectors ({products.length})
              </button>

              {CHEMICAL_APPLICATIONS.map((app) => {
                const active = selectedSector === app.slug;
                return (
                  <button
                    key={app.slug}
                    type="button"
                    onClick={() => setSelectedSector(app.slug)}
                    className={`px-3 py-1.5 font-ibm-plex-mono text-[11px] uppercase tracking-wider transition-all cursor-pointer rounded-[4px] btn-tactile ${
                      active
                        ? 'bg-[#FF6900] text-white font-semibold shadow-button'
                        : 'bg-[#FAF9F6] text-[#555] hover:bg-[#FF6900] hover:text-white border border-[#DDD8CE]'
                    }`}
                  >
                    {app.name}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* ── PRODUCTS DIRECTORY GRID ── */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white p-12 text-center border border-[#DDD8CE] rounded-[6px] shadow-tactile space-y-4">
            <span className="font-ibm-plex-mono text-xs text-[#777] uppercase tracking-widest block">
              No Chemical Formulations Found
            </span>
            <p className="text-sm text-[#666] max-w-md mx-auto font-normal">
              Try adjusting your search keywords or resetting the sector filter.
            </p>
            <button
              type="button"
              onClick={() => { setSelectedSector('all'); setSearch(''); }}
              className="px-6 py-2.5 bg-[#1A1917] text-white font-ibm-plex-mono text-xs uppercase tracking-widest hover:bg-[#FF6900] transition-colors rounded-[4px] shadow-button btn-tactile"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((prod) => {
              const isAdded = addedIds[prod.id] ?? false;
              const defaultSku = (prod.skus && prod.skus[1]) || (prod.skus && prod.skus[0]) || { price: 84.00, pack_size: '20L Drum' };

              return (
                <div
                  key={prod.id}
                  className="bg-white border border-[#DDD8CE] hover:border-[#FF6900] rounded-[6px] shadow-tactile hover:shadow-tactile-hover transition-all duration-300 hover:-translate-y-[2px] p-6 sm:p-7 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    {/* Header line: Master Code & Retail Family */}
                    <div className="flex items-center justify-between font-ibm-plex-mono text-xs">
                      <span className="text-[#FF6900] font-semibold uppercase">
                        {prod.originating_master_code}
                      </span>
                      <span className="text-[#777] text-[11px] uppercase">
                        {prod.retail_family}
                      </span>
                    </div>

                    {/* Product Name */}
                    <h3 className="font-bold text-xl text-[#1A1917] group-hover:text-[#FF6900] leading-snug transition-colors">
                      {prod.retail_name}
                    </h3>

                    {/* Short Description */}
                    <p className="text-xs sm:text-sm text-[#666] line-clamp-3 font-normal leading-relaxed">
                      {prod.short_description}
                    </p>

                    {/* Dilution & Sector Pill */}
                    <div className="pt-3 border-t border-[#F0EBE1] flex flex-wrap items-center justify-between gap-2 text-xs font-ibm-plex-mono text-[#555]">
                      <div className="flex items-center gap-1.5">
                        <Droplet className="w-3.5 h-3.5 text-[#FF6900]" />
                        <span>Dilution: {prod.dilution_standard || '1:50'}</span>
                      </div>
                      <span className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 border border-emerald-200 rounded-[3px]">
                        GB-CLP Verified
                      </span>
                    </div>
                  </div>

                  {/* Price & Commerce Actions */}
                  <div className="pt-6 border-t border-[#F0EBE1] mt-6 space-y-4">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="font-ibm-plex-mono text-[10px] text-[#888] uppercase block">
                          Starting From ({defaultSku.pack_size})
                        </span>
                        <span className="font-ibm-plex-mono text-2xl font-bold text-[#1A1917]">
                          £{defaultSku.price.toFixed(2)}
                        </span>
                      </div>
                      <span className="font-ibm-plex-mono text-xs text-[#777] uppercase">ex VAT</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => handleAddToCart(prod)}
                        className="w-full bg-[#FF6900] hover:bg-[#1A1917] text-white py-3 px-3 font-ibm-plex-mono text-xs uppercase tracking-wider transition-colors font-semibold flex items-center justify-center gap-1.5 cursor-pointer rounded-[4px] shadow-button hover:shadow-button-hover btn-tactile"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>{isAdded ? 'Added ✓' : 'Add to Order'}</span>
                      </button>

                      <Link
                        href={`/chemicals/product/${prod.slug}`}
                        className="w-full py-3 border border-[#DDD8CE] hover:border-black text-[#1A1917] text-center font-ibm-plex-mono text-xs uppercase tracking-wider transition-colors bg-[#FAF9F6] font-medium flex items-center justify-center rounded-[4px] btn-tactile"
                      >
                        Specs &amp; SDS →
                      </Link>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
