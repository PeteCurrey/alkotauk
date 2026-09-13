'use client';

import React from 'react';
import Link from 'next/link';
import { Wrench } from 'lucide-react';
import SafeImage from '@/components/ui/SafeImage';
import ProductActionCTA from '@/components/commerce/ProductActionCTA';
import { resolveProductAction } from '@/lib/commerce/action-resolver';

export interface ProductCardProps {
  part: {
    id: string;
    part_number: string;
    sku?: string | null;
    mpn?: string | null;
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
    description?: string | null;
    superseded_by?: string | null;
    active?: boolean;
    needs_review?: boolean;
    view_only?: boolean;
    quote_only?: boolean;
  };
}

export default function ProductCard({ part }: ProductCardProps) {
  // Authoritative action decision evaluated via Central Product Action Resolver
  const decision = resolveProductAction(part);

  // Visibility Gate: Never render hidden products in customer card grids
  if (decision.action === 'HIDDEN') {
    return null;
  }

  const isSuperseded = decision.action === 'VIEW_REPLACEMENT';
  const brandName = (part.brand || part.manufacturer || 'Alkota OEM').replace(/-/g, ' ');

  return (
    <div className="group relative flex flex-col bg-white border border-[#E6E4DD] hover:border-[#CCC8BD] rounded-[5px] shadow-[0_2px_6px_rgba(26,25,23,0.03),0_1px_2px_rgba(26,25,23,0.02)] hover:shadow-[0_10px_24px_-2px_rgba(26,25,23,0.07),0_3px_8px_-1px_rgba(26,25,23,0.04)] hover:-translate-y-1 transition-all duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transform-none motion-reduce:transition-none overflow-hidden">
      {/* ── IMAGE AREA WITH CONTACT SHADOW ── */}
      <Link
        href={`/parts-attachments/product/${part.slug}`}
        className="relative aspect-[4/3] bg-[#FAF9F5] flex items-center justify-center p-5 overflow-hidden border-b border-[#F0EFEB] no-underline"
      >
        {part.image_url ? (
          <div className="relative w-full h-full">
            <SafeImage
              src={part.image_url}
              alt={part.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-[#C0BDB8] gap-1.5 text-center">
            <Wrench className="h-8 w-8 text-[#CCC9C2] group-hover:text-[#FF6900] transition-colors stroke-[1.5]" />
            <span className="font-ibm-plex-mono text-[9px] uppercase tracking-wider text-[#9E9B94]">
              Factory Diagram Spec
            </span>
          </div>
        )}

        {/* OEM Genuine / Superseded Badge */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
          {part.oem_genuine && (
            <span className="bg-[#0A0A0A] text-white text-[8px] font-ibm-plex-mono uppercase tracking-wider px-2 py-0.5 rounded-[2px]">
              OEM Genuine
            </span>
          )}
          {isSuperseded && (
            <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[8px] font-ibm-plex-mono uppercase tracking-wider px-2 py-0.5 rounded-[2px] font-bold">
              Superseded
            </span>
          )}
        </div>
      </Link>

      {/* ── CARD BODY ── */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 bg-white justify-between">
        <div className="space-y-2">
          {/* Brand + Stock Indicator */}
          <div className="flex items-center justify-between gap-2">
            <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#FF6900] font-semibold truncate">
              {brandName}
            </span>
            <span
              className={`inline-flex items-center gap-1.5 font-ibm-plex-mono text-[9px] uppercase tracking-wide ${
                decision.action === 'PURCHASE' ? 'text-emerald-700' : 'text-amber-700'
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  decision.action === 'PURCHASE' ? 'bg-emerald-500' : 'bg-amber-500'
                }`}
              />
              <span>{decision.action === 'PURCHASE' ? 'In Stock' : 'Check Availability'}</span>
            </span>
          </div>

          {/* Part Number Mono */}
          <div className="font-ibm-plex-mono text-xs font-bold text-[#0F172A] tracking-tight">
            {part.part_number}
          </div>

          {/* Product Name */}
          <h3 className="text-sm font-normal text-[#1A1917] tracking-tight leading-snug line-clamp-2 group-hover:text-[#FF6900] transition-colors min-h-[40px]">
            <Link href={`/parts-attachments/product/${part.slug}`} className="no-underline text-inherit">
              {part.name}
            </Link>
          </h3>

          {/* Description snippet if available */}
          {part.description && (
            <p className="text-xs text-[#71716D] line-clamp-1 font-light">
              {part.description}
            </p>
          )}
        </div>

        {/* ── FOOTER: PRICE & DETERMINISTIC ACTION ── */}
        <div className="mt-4 pt-3.5 border-t border-[#F0EFEB] flex items-center justify-between gap-3">
          <div>
            {decision.priceExVat !== null ? (
              <div>
                <span className="font-ibm-plex-mono text-base font-bold text-[#0F172A]">
                  £{decision.priceExVat.toFixed(2)}
                </span>
                <span className="block font-ibm-plex-mono text-[9px] uppercase tracking-wider text-[#888]">
                  Ex. VAT
                </span>
              </div>
            ) : (
              <div>
                <span className="font-ibm-plex-mono text-xs font-semibold text-[#666]">
                  POA
                </span>
                <span className="block font-ibm-plex-mono text-[8px] uppercase tracking-wider text-[#999]">
                  Quote Required
                </span>
              </div>
            )}
          </div>

          {/* Authoritative Action CTA Component */}
          <div className="shrink-0">
            <ProductActionCTA 
              product={part} 
              decision={decision} 
              size="sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
