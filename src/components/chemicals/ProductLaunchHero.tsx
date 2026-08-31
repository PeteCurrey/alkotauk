'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, ChevronDown } from 'lucide-react';
import { ChemicalRetailProduct, ChemicalSKU } from '@/lib/types/chemical-commerce';
import { usePartsRequest } from '@/components/parts/PartsRequestListContext';

interface Props {
  product: ChemicalRetailProduct;
}

export default function ProductLaunchHero({ product }: Props) {
  const { addItem, setIsDrawerOpen } = usePartsRequest();

  const skus: ChemicalSKU[] = product.skus && product.skus.length > 0
    ? product.skus
    : [
        {
          id: `sku-5l-${product.id}`,
          retail_product_id: product.id,
          sku_code: `ALK-${product.originating_master_code}-5L`,
          pack_size: '5 L Canister',
          volume_litres: 5,
          price: 28.50,
          in_stock: true,
          stock_quantity: 45,
          sort_order: 1,
          active: true,
        },
        {
          id: `sku-20l-${product.id}`,
          retail_product_id: product.id,
          sku_code: `ALK-${product.originating_master_code}-20L`,
          pack_size: '20 L Drum',
          volume_litres: 20,
          price: 84.00,
          in_stock: true,
          stock_quantity: 32,
          sort_order: 2,
          active: true,
        },
        {
          id: `sku-200l-${product.id}`,
          retail_product_id: product.id,
          sku_code: `ALK-${product.originating_master_code}-200L`,
          pack_size: '200 L Drum',
          volume_litres: 200,
          price: 540.00,
          in_stock: true,
          stock_quantity: 8,
          sort_order: 3,
          active: true,
        },
        {
          id: `sku-1000l-${product.id}`,
          retail_product_id: product.id,
          sku_code: `ALK-${product.originating_master_code}-1000L`,
          pack_size: '1000 L IBC',
          volume_litres: 1000,
          price: 2150.00,
          in_stock: true,
          stock_quantity: 3,
          sort_order: 4,
          active: true,
        },
      ];

  const [selectedSku, setSelectedSku] = useState<ChemicalSKU>(skus[1] || skus[0]);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addItem({
      id: `${product.id}-${selectedSku.id}`,
      part_number: selectedSku.sku_code,
      name: `${product.retail_name} (${selectedSku.pack_size})`,
      price_each: selectedSku.price,
      quantity: 1,
      pack_size: selectedSku.pack_size,
      machine_context: `${product.retail_family} (${product.originating_master_code})`,
      image: product.hero_image || undefined,
      category: 'chemical',
    });

    setAdded(true);
    setIsDrawerOpen(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section 
      id="overview" 
      className="relative min-h-[95vh] w-full flex flex-col justify-between bg-[#FAF9F5] text-alkota-black pt-32 pb-12 px-6 sm:px-12 lg:px-24 overflow-hidden select-none"
      aria-label={`${product.retail_name} Product Launch Presentation`}
    >
      {/* Top Quiet Breadcrumb */}
      <div className="relative z-10 max-w-7xl w-full mx-auto flex items-center justify-between gap-4 text-[10px] font-ibm-plex-mono uppercase tracking-widest text-[#888]">
        <div className="flex items-center gap-2">
          <Link href="/parts-attachments/chemicals" className="hover:text-black transition-colors">
            Chemicals
          </Link>
          <span>/</span>
          <span className="text-alkota-black font-semibold">{product.retail_family}</span>
        </div>

        <div className="flex items-center gap-3">
          <span>Master Formula {product.originating_master_code}</span>
          <span className="text-emerald-800 font-medium">GB-CLP Verified</span>
        </div>
      </div>

      {/* Main Campaign Canvas: Overwhelming Physical Product Dominance */}
      <div className="relative z-10 max-w-7xl w-full mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center py-8">
        
        {/* Left: Product Narration & Single-Line Commerce (5 Cols) */}
        <div className="lg:col-span-5 space-y-8 order-2 lg:order-1">
          <div className="space-y-3">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.3em] text-alkota-orange font-medium block">
              {product.descriptor || 'Commercial Formulation'}
            </span>

            <h1 
              className="font-extralight text-[#0A0A0A] tracking-tight uppercase leading-[0.9]"
              style={{ fontSize: 'clamp(2.8rem, 5vw, 4.4rem)' }}
            >
              {product.retail_name}
            </h1>

            <p className="text-base sm:text-lg text-[#555] font-normal leading-relaxed pt-1 max-w-md">
              {product.brand_identity?.product_promise || product.short_description}
            </p>
          </div>

          {/* Pack Format Strip (Horizontal Unboxed Toggle) */}
          <div className="space-y-2 pt-2">
            <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#888] block">
              Container Format
            </span>
            <div className="flex flex-wrap gap-2">
              {skus.map((sku) => {
                const isSelected = selectedSku.id === sku.id;
                return (
                  <button
                    key={sku.id}
                    type="button"
                    onClick={() => setSelectedSku(sku)}
                    className={`px-3.5 py-2 font-ibm-plex-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-alkota-black text-white shadow-sm'
                        : 'bg-white/80 border border-[#DCDAD4] text-[#555] hover:border-black'
                    }`}
                  >
                    <span>{sku.pack_size.split(' ')[0]} {sku.pack_size.split(' ')[1]}</span>
                    <span className="opacity-60 ml-2">£{sku.price.toFixed(2)}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Single-Line Integrated Commerce Action */}
          <div className="pt-4 space-y-4">
            <div className="flex items-baseline gap-3">
              <span className="font-ibm-plex-mono text-3xl sm:text-4xl text-alkota-black font-light">
                £{selectedSku.price.toFixed(2)}
              </span>
              <span className="font-ibm-plex-mono text-xs text-[#777] uppercase">ex VAT</span>
              <span className="text-xs text-[#888] font-ibm-plex-mono ml-auto">Stocked in UK Warehouse</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 bg-alkota-black hover:bg-alkota-orange text-white py-4 px-8 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors font-medium flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{added ? 'Added to Order ✓' : 'Add to Order'}</span>
              </button>

              <a
                href="#story"
                className="px-6 py-4 border border-[#DCDAD4] hover:border-black text-alkota-black text-center font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors font-medium"
              >
                Formulation Story
              </a>
            </div>
          </div>

        </div>

        {/* Right: Massive Physical Bottle Floating in Vast Space (7 Cols) */}
        <div className="lg:col-span-7 relative flex items-center justify-center min-h-[440px] sm:min-h-[540px] order-1 lg:order-2">
          {/* Ambient Ground Shadow */}
          <div className="absolute inset-x-8 bottom-4 h-16 bg-black/15 blur-3xl rounded-full pointer-events-none" />

          <img
            src={product.hero_image || '/assets/industries/fleet.png'}
            alt={product.retail_name}
            className="relative z-10 w-full h-auto max-w-[560px] object-contain filter drop-shadow-[0_28px_48px_rgba(0,0,0,0.16)] hover:scale-[1.02] transition-transform duration-700 select-none"
            onError={(e) => {
              (e.target as HTMLElement).setAttribute('src', '/assets/industries/fleet.png');
            }}
          />
        </div>

      </div>

      {/* Bottom Pinned Cue */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-4 flex items-center justify-between text-[10px] font-ibm-plex-mono text-[#888] uppercase tracking-wider">
        <span>Sourced, Stocked &amp; Despatched from Alkota UK</span>
        <a href="#story" className="inline-flex items-center gap-1.5 hover:text-black transition-colors">
          <span>Explore Transformation</span>
          <ChevronDown className="w-3.5 h-3.5 text-alkota-orange" />
        </a>
      </div>

    </section>
  );
}
