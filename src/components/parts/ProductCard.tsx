'use client';

import React from 'react';
import Link from 'next/link';
import { Wrench, Plus, Check } from 'lucide-react';
import SafeImage from '@/components/ui/SafeImage';
import { usePartsRequest } from './PartsRequestListContext';

interface ProductCardProps {
  part: {
    id: string;
    part_number: string;
    name: string;
    slug: string;
    category?: string;
    brand?: string | null;
    price?: number | null;
    in_stock: boolean;
    availability_status?: string;
    image_url?: string | null;
    manufacturer?: string | null;
    oem_genuine?: boolean;
    featured?: boolean;
    is_attachment?: boolean;
    weight_kg?: number | null;
    short_desc?: string | null;
  };
}

export default function ProductCard({ part }: ProductCardProps) {
  const { addItem, items } = usePartsRequest();
  const isAdded = items.some((i) => i.part_number === part.part_number);

  const displayPrice = part.price ? `£${Number(part.price).toFixed(2)}` : 'POA';
  const brandName = (part.brand || part.manufacturer || 'Alkota OEM').replace('-', ' ');

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      part_number: part.part_number,
      name: part.name,
      price_each: part.price || null,
      machine_context: brandName,
      quantity: 1,
    });
  };

  return (
    <div className="group relative flex flex-col bg-white border border-[#EDECEA] hover:border-[#C0BDB8] transition-all duration-300 overflow-hidden">
      {/* ── IMAGE AREA ── */}
      <Link 
        href={`/parts-attachments/product/${part.slug}`} 
        className="relative aspect-[3/4] bg-[#F5F4F0] flex items-center justify-center p-6 overflow-hidden no-underline"
      >
        {part.image_url ? (
          <SafeImage
            src={part.image_url}
            alt={part.name}
            fill
            className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-[#BBB] gap-2 text-center">
            <Wrench className="h-7 w-7 text-[#CCC] group-hover:text-alkota-orange transition-colors" />
            <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#AAA]">
              {part.part_number}
            </span>
          </div>
        )}
      </Link>

      {/* ── CARD BODY ── */}
      <div className="p-5 flex flex-col flex-1 bg-white">
        {/* Brand & Stock Status */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange truncate">
            {brandName}
          </span>
          <span 
            className={`inline-block h-1.5 w-1.5 rounded-full shrink-0 ${
              part.in_stock ? 'bg-emerald-500' : 'bg-amber-500'
            }`} 
            title={part.in_stock ? 'In Stock' : 'Check Availability'}
          />
        </div>

        {/* Product Title */}
        <h3 className="text-sm font-light text-alkota-black tracking-tight leading-snug mb-1 group-hover:text-alkota-orange transition-colors line-clamp-2">
          <Link href={`/parts-attachments/product/${part.slug}`} className="no-underline text-inherit">
            {part.name}
          </Link>
        </h3>

        {/* Part Number Mono */}
        <span className="font-ibm-plex-mono text-[10px] text-[#999] mb-4">
          {part.part_number}
        </span>

        {/* Price & Action Row */}
        <div className="mt-auto pt-3 border-t border-[#F0EFEB] flex items-center justify-between gap-2">
          <div>
            <span className="block font-ibm-plex-mono text-[8px] uppercase tracking-widest text-[#999]">
              Ex VAT
            </span>
            <span className="font-ibm-plex-mono text-sm text-alkota-black font-normal">
              {displayPrice}
            </span>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className={`h-7 w-7 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              isAdded 
                ? 'bg-emerald-600 text-white' 
                : 'border border-[#E0DEDC] bg-white text-alkota-black hover:bg-alkota-orange hover:border-alkota-orange hover:text-white'
            }`}
            title={isAdded ? 'Added to enquiry' : 'Add to parts enquiry'}
            aria-label={isAdded ? 'Added to enquiry' : 'Add to parts enquiry'}
          >
            {isAdded ? (
              <Check className="h-3.5 w-3.5" />
            ) : (
              <Plus className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
