'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Check, ShieldCheck, FileText, ArrowRight, Droplet, Plus, Minus } from 'lucide-react';
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
          pack_size: '5L Canister',
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
          pack_size: '20L Drum',
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
          pack_size: '200L Barrel',
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
          pack_size: '1000L IBC',
          volume_litres: 1000,
          price: 2150.00,
          in_stock: true,
          stock_quantity: 3,
          sort_order: 4,
          active: true,
        },
      ];

  const [selectedSku, setSelectedSku] = useState<ChemicalSKU>(skus[1] || skus[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addItem({
      id: `${product.id}-${selectedSku.id}`,
      part_number: selectedSku.sku_code,
      name: `${product.retail_name} (${selectedSku.pack_size})`,
      price_each: selectedSku.price,
      quantity: quantity,
      pack_size: selectedSku.pack_size,
      machine_context: `${product.retail_family} (${product.originating_master_code})`,
      image: product.hero_image || undefined,
      category: 'chemicals',
    });

    setAdded(true);
    setIsDrawerOpen(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section 
      id="overview" 
      className="relative min-h-[90vh] w-full bg-[#F4F1EA] text-[#1A1917] pt-28 pb-16 px-6 sm:px-10 lg:px-16 border-b border-[#E2DDD3]"
    >
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Top Quiet Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-ibm-plex-mono text-[#777] pb-4 border-b border-[#E2DDD3]">
          <div className="flex items-center gap-2">
            <Link href="/parts-attachments/chemicals" className="hover:text-black transition-colors uppercase">
              Chemicals Store
            </Link>
            <span>/</span>
            <span className="text-[#1A1917] font-semibold uppercase">{product.retail_family}</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[#FF6900] font-semibold">{product.originating_master_code} Master Code</span>
            <span className="text-emerald-800 bg-emerald-50 px-2 py-0.5 border border-emerald-200 font-medium">
              100% GB-CLP Verified
            </span>
          </div>
        </div>

        {/* 2-Column High Impact Product Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left: Large Product Visual (7 Cols) */}
          <div className="lg:col-span-7 bg-white border border-[#E2DDD3] p-8 sm:p-12 flex flex-col justify-between min-h-[480px] lg:min-h-[560px] relative overflow-hidden shadow-sm">
            <div className="flex items-center justify-between z-10">
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest bg-[#1A1917] text-white px-3 py-1 font-medium">
                {product.originating_master_code}
              </span>
              <span className="font-ibm-plex-mono text-xs text-emerald-700 flex items-center gap-1.5 font-medium">
                <span className="h-2 w-2 rounded-full bg-emerald-600" />
                <span>UK Stock Ready for Despatch</span>
              </span>
            </div>

            {/* Main Product Hero Image */}
            <div className="relative w-full h-80 sm:h-96 my-4">
              <Image
                src={product.hero_image || '/assets/industries/fleet.png'}
                alt={product.retail_name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-contain object-center"
              />
            </div>

            {/* Bottom Quick Spec Strip */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#F0EBE1] text-xs font-ibm-plex-mono text-[#666] z-10">
              <div>
                <span className="block text-[10px] text-[#888] uppercase">Standard Dilution</span>
                <span className="text-[#1A1917] font-semibold">{product.dilution_standard || '1:50 to 1:100'}</span>
              </div>
              <div>
                <span className="block text-[10px] text-[#888] uppercase">Heated Reaction</span>
                <span className="text-[#1A1917] font-semibold">50°C–90°C Optimized</span>
              </div>
              <div>
                <span className="block text-[10px] text-[#888] uppercase">Substrate Safety</span>
                <span className="text-[#1A1917] font-semibold">Paint &amp; Alloy Safe</span>
              </div>
            </div>
          </div>

          {/* Right: Product Narrative & Commerce Ordering Box (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Title & Promise */}
            <div className="space-y-3">
              <span className="font-ibm-plex-mono text-xs uppercase tracking-[0.25em] text-[#FF6900] font-semibold block">
                {product.descriptor || 'Commercial Formulation'}
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1A1917] leading-tight">
                {product.retail_name}
              </h1>

              <p className="text-sm sm:text-base text-[#555] font-normal leading-relaxed">
                {product.brand_identity?.product_promise || product.short_description}
              </p>
            </div>

            {/* Pack Size Selector */}
            <div className="space-y-3 pt-4 border-t border-[#E2DDD3]">
              <div className="flex items-center justify-between">
                <span className="font-ibm-plex-mono text-xs uppercase tracking-widest text-[#777] font-medium">
                  Select Pack Format:
                </span>
                <span className="font-ibm-plex-mono text-xs text-[#FF6900]">
                  SKU: {selectedSku.sku_code}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {skus.map((sku) => {
                  const isSelected = selectedSku.id === sku.id;
                  return (
                    <button
                      key={sku.id}
                      type="button"
                      onClick={() => setSelectedSku(sku)}
                      className={`p-3.5 text-left font-ibm-plex-mono transition-all cursor-pointer border ${
                        isSelected
                          ? 'bg-[#1A1917] text-white border-[#1A1917] shadow-sm'
                          : 'bg-white text-[#555] hover:border-black border-[#DDD8CE]'
                      }`}
                    >
                      <span className="block text-xs font-semibold">{sku.pack_size}</span>
                      <span className={`text-sm block mt-1 ${isSelected ? 'text-[#FF6900] font-bold' : 'text-[#1A1917]'}`}>
                        £{sku.price.toFixed(2)}{' '}
                        <span className="text-[10px] opacity-75 font-normal uppercase">ex VAT</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Pricing & Add to Order */}
            <div className="bg-white border border-[#E2DDD3] p-6 space-y-6 shadow-sm">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="font-ibm-plex-mono text-[10px] text-[#888] uppercase block">Trade Price</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-bold text-[#1A1917] tracking-tight">
                      £{(selectedSku.price * quantity).toFixed(2)}
                    </span>
                    <span className="text-xs font-ibm-plex-mono text-[#777] uppercase">ex VAT</span>
                  </div>
                </div>

                {/* Quantity picker */}
                <div className="flex items-center border border-[#DDD8CE]">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2.5 hover:bg-[#F4F1EA] text-[#555] transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 font-ibm-plex-mono text-sm font-semibold text-[#1A1917]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2.5 hover:bg-[#F4F1EA] text-[#555] transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Primary Action Button */}
              <button
                type="button"
                onClick={handleAddToCart}
                className={`w-full py-4 font-ibm-plex-mono text-xs uppercase tracking-widest transition-all font-semibold flex items-center justify-center gap-3 cursor-pointer shadow-md ${
                  added
                    ? 'bg-emerald-700 text-white'
                    : 'bg-[#FF6900] hover:bg-[#1A1917] text-white shadow-[#FF6900]/20'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Order ✓</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Order — £{(selectedSku.price * quantity).toFixed(2)} ex VAT</span>
                  </>
                )}
              </button>

              {/* Safety Sheet Quick Link */}
              <div className="pt-2 flex items-center justify-between text-xs font-ibm-plex-mono text-[#777]">
                <a
                  href={`/api/chemicals/sds?code=${product.originating_master_code}`}
                  target="_blank"
                  className="flex items-center gap-1.5 text-[#1A1917] hover:text-[#FF6900] transition-colors font-medium"
                >
                  <FileText className="w-3.5 h-3.5 text-[#FF6900]" />
                  <span>Download Safety Data Sheet (SDS)</span>
                </a>
                <span>GB-CLP Registered</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
