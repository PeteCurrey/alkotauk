'use client';

import React from 'react';
import Link from 'next/link';
import { Wrench, Plus, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import SafeImage from '@/components/ui/SafeImage';
import { usePartsRequest } from './PartsRequestListContext';
import { Part } from '@/lib/types/parts';

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
  const brandName = part.brand || part.manufacturer || 'Alkota OEM';

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
    <div className="group relative flex flex-col bg-white border border-[#E8E8E4] hover:border-alkota-orange transition-all duration-200 overflow-hidden shadow-xs hover:shadow-md">
      {/* Top Media Section */}
      <Link 
        href={`/parts-attachments/product/${part.slug}`} 
        className="relative aspect-[4/3] bg-[#F7F7F5] flex items-center justify-center p-4 border-b border-[#EFEFEA] overflow-hidden no-underline"
      >
        {part.image_url ? (
          <SafeImage
            src={part.image_url}
            alt={part.name}
            fill
            className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-[#AAA] gap-2">
            <Wrench className="h-8 w-8 text-[#CCC] group-hover:text-alkota-orange transition-colors" />
            <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#999]">
              {part.part_number}
            </span>
          </div>
        )}

        {/* Brand / OEM Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {part.oem_genuine && (
            <span className="inline-flex items-center gap-1 bg-[#0A0A0A] text-white px-2 py-0.5 font-ibm-plex-mono text-[8px] uppercase tracking-widest">
              <ShieldCheck className="h-2.5 w-2.5 text-alkota-orange" />
              OEM Genuine
            </span>
          )}
          {part.brand && (
            <span className="inline-block bg-white/90 backdrop-blur-xs border border-[#DDD] text-[#333] px-2 py-0.5 font-ibm-plex-mono text-[8px] uppercase tracking-wider">
              {part.brand.replace('-', ' ')}
            </span>
          )}
        </div>

        {/* In Stock Dot */}
        <div className="absolute top-2.5 right-2.5 z-10">
          <span 
            className={`inline-block h-2 w-2 rounded-full ${
              part.in_stock ? 'bg-green-500 ring-2 ring-white' : 'bg-amber-500'
            }`} 
            title={part.in_stock ? 'In Stock' : 'Check Availability'}
          />
        </div>
      </Link>

      {/* Card Body */}
      <div className="p-5 flex flex-col flex-1">
        {/* Part Number */}
        <div className="flex items-center justify-between mb-1.5">
          <span className="font-ibm-plex-mono text-[10px] text-alkota-orange uppercase tracking-wider font-normal">
            {part.part_number}
          </span>
          <span className="font-ibm-plex-mono text-[9px] text-[#888] uppercase tracking-widest">
            {part.category?.replace('-', ' ')}
          </span>
        </div>

        {/* Part Name */}
        <h3 className="text-sm font-light text-alkota-black tracking-tight leading-snug mb-3 group-hover:text-alkota-orange transition-colors line-clamp-2">
          <Link href={`/parts-attachments/product/${part.slug}`} className="no-underline text-inherit">
            {part.name}
          </Link>
        </h3>

        {/* Price & Action Row */}
        <div className="mt-auto pt-4 border-t border-[#F0EFEB] flex items-center justify-between gap-2">
          <div>
            <span className="block font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#888]">
              {part.price ? 'Price Ex VAT' : 'Availability'}
            </span>
            <span className="font-ibm-plex-mono text-sm text-alkota-black">
              {displayPrice}
            </span>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className={`px-3 py-2 text-[10px] font-ibm-plex-mono uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
              isAdded 
                ? 'bg-green-700 text-white' 
                : 'bg-[#141414] hover:bg-alkota-orange text-white'
            }`}
            title="Add to Parts Enquiry List"
          >
            {isAdded ? (
              <>
                <Check className="h-3 w-3" />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus className="h-3 w-3" />
                <span>Enquire</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
