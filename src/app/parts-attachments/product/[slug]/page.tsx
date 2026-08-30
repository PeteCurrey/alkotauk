import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  ChevronRight, 
  ShieldCheck, 
  Wrench, 
  ArrowLeft, 
  CheckCircle2, 
  FileText, 
  Truck, 
  Clock, 
  Cpu, 
  Activity,
  Layers,
  ArrowRight
} from 'lucide-react';
import { supabaseAdmin } from '@/lib/supabase/server';
import SafeImage from '@/components/ui/SafeImage';
import ProductDetailActions from '@/components/parts/ProductDetailActions';
import ProductCard from '@/components/parts/ProductCard';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;

  // Fetch part by slug
  const { data: part } = await supabaseAdmin
    .from('parts')
    .select('*')
    .eq('slug', slug)
    .eq('active', true)
    .single();

  if (!part) {
    notFound();
  }

  // Fetch brand partner details if associated
  let brandInfo: { name: string; country_of_origin?: string; [key: string]: any } | null = null;
  if (part.brand) {
    const { data: b } = await supabaseAdmin
      .from('brand_partners')
      .select('*')
      .eq('slug', part.brand)
      .single();
    brandInfo = b as any;
  }

  // Fetch category info for name
  let categoryName = part.category || 'Components';
  if (part.category) {
    const { data: cat } = await supabaseAdmin
      .from('part_categories')
      .select('name')
      .eq('slug', part.category)
      .single();
    if (cat) categoryName = cat.name;
  }

  // Fetch related parts from same category
  const { data: relatedParts } = await supabaseAdmin
    .from('parts')
    .select('id,part_number,name,slug,category,brand,price,in_stock,availability_status,image_url,manufacturer,oem_genuine')
    .eq('category', part.category)
    .eq('active', true)
    .neq('id', part.id)
    .limit(4);

  const displayPrice = part.price ? `£${Number(part.price).toFixed(2)}` : 'Price on Application (POA)';
  const compatibleList = Array.isArray(part.compatible_machines) ? part.compatible_machines : [];

  return (
    <main className="min-h-screen bg-[#FAF9F5] text-alkota-black pb-24">
      {/* Breadcrumb Navigation Bar */}
      <div className="bg-white border-b border-[#E8E8E4] px-6 sm:px-12 lg:px-24 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <nav className="flex items-center gap-2 font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#777] overflow-x-auto whitespace-nowrap">
            <Link href="/parts-attachments" className="hover:text-alkota-orange transition-colors">
              Parts
            </Link>
            <ChevronRight className="h-3 w-3 shrink-0" />
            <Link href={`/parts-attachments/${part.category}`} className="hover:text-alkota-orange transition-colors">
              {categoryName}
            </Link>
            <ChevronRight className="h-3 w-3 shrink-0" />
            <span className="text-alkota-orange font-normal truncate max-w-xs">{part.name}</span>
          </nav>

          <Link
            href={`/parts-attachments/${part.category || 'all'}`}
            className="hidden sm:inline-flex items-center gap-1.5 font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#777] hover:text-black transition-colors"
          >
            <ArrowLeft className="h-3 w-3" />
            <span>Back to {categoryName}</span>
          </Link>
        </div>
      </div>

      {/* Main Product Stage (Two-Column Layout) */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left Column: Visual Media Showcase */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-[4/3] bg-white border border-[#E8E8E4] p-8 flex items-center justify-center overflow-hidden shadow-xs">
              {part.image_url ? (
                <SafeImage
                  src={part.image_url}
                  alt={part.name}
                  fill
                  className="object-contain p-6"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-[#CCC] space-y-3">
                  <Wrench className="h-16 w-16 text-[#DDD]" />
                  <span className="font-ibm-plex-mono text-xs uppercase tracking-widest text-[#999]">
                    OEM Engineering Schematic Item
                  </span>
                  <span className="font-ibm-plex-mono text-[10px] text-alkota-orange">
                    {part.part_number}
                  </span>
                </div>
              )}

              {/* Status Badges Overlay */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
                {part.oem_genuine && (
                  <span className="inline-flex items-center gap-1.5 bg-[#0A0A0A] text-white px-3 py-1 font-ibm-plex-mono text-[9px] uppercase tracking-widest">
                    <ShieldCheck className="h-3 w-3 text-alkota-orange" />
                    OEM Genuine Component
                  </span>
                )}
                {brandInfo && (
                  <span className="inline-block bg-[#F0EFEB] border border-[#DDD] text-[#333] px-3 py-1 font-ibm-plex-mono text-[9px] uppercase tracking-wider">
                    {brandInfo.name} · {brandInfo.country_of_origin}
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail Strip / Secondary Indicators */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white border border-[#E8E8E4] p-3 text-center">
                <Truck className="h-4 w-4 text-alkota-orange mx-auto mb-1" />
                <span className="font-ibm-plex-mono text-[8px] uppercase tracking-widest text-[#777] block">Despatch</span>
                <span className="text-xs font-normal text-alkota-black">Next-Day UK</span>
              </div>
              <div className="bg-white border border-[#E8E8E4] p-3 text-center">
                <Clock className="h-4 w-4 text-alkota-orange mx-auto mb-1" />
                <span className="font-ibm-plex-mono text-[8px] uppercase tracking-widest text-[#777] block">Warranty</span>
                <span className="text-xs font-normal text-alkota-black">12 Months OEM</span>
              </div>
              <div className="bg-white border border-[#E8E8E4] p-3 text-center">
                <ShieldCheck className="h-4 w-4 text-alkota-orange mx-auto mb-1" />
                <span className="font-ibm-plex-mono text-[8px] uppercase tracking-widest text-[#777] block">Verification</span>
                <span className="text-xs font-normal text-alkota-black">100% Tested</span>
              </div>
            </div>
          </div>

          {/* Right Column: Specification & Purchase Controls */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              {/* Part SKU & Category Tag */}
              <div className="flex items-center gap-3 mb-2">
                <span className="font-ibm-plex-mono text-xs uppercase tracking-widest text-alkota-orange">
                  SKU: {part.part_number}
                </span>
                <span className="text-[#CCC]">|</span>
                <span className="font-ibm-plex-mono text-[10px] uppercase tracking-wider text-[#777]">
                  {categoryName}
                </span>
              </div>

              {/* Title */}
              <h1 className="font-extralight text-3xl sm:text-4xl text-alkota-black tracking-tight leading-tight mb-4">
                {part.name}
              </h1>

              {/* Manufacturer / Origin */}
              <div className="flex items-center gap-4 text-xs text-[#666] font-normal mb-6">
                <span>Manufacturer: <strong className="font-normal text-black">{part.manufacturer || 'Alkota OEM Approved'}</strong></span>
                {part.weight_kg && (
                  <>
                    <span>•</span>
                    <span>Weight: <strong className="font-normal text-black">{part.weight_kg} kg</strong></span>
                  </>
                )}
              </div>

              {/* Price & Stock Strip */}
              <div className="bg-white border border-[#E8E8E4] p-6 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2">
                  <div>
                    <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#888] block mb-1">
                      {part.price ? 'Unit Price Ex VAT' : 'Procurement'}
                    </span>
                    <span className="text-2xl sm:text-3xl font-extralight text-alkota-black">
                      {displayPrice}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${part.in_stock ? 'bg-green-600' : 'bg-amber-500'}`} />
                    <span className="font-ibm-plex-mono text-xs uppercase tracking-wider text-alkota-black">
                      {part.in_stock ? 'In Stock — Immediate Despatch' : 'Order on Demand'}
                    </span>
                  </div>
                </div>

                {part.price && (
                  <p className="text-[11px] text-[#888] font-mono mt-1">
                    Includes VAT: £{(Number(part.price) * 1.2).toFixed(2)} · Trade pricing available for fleet operators
                  </p>
                )}

                {/* Interactive Action Widget */}
                <ProductDetailActions part={part} />
              </div>

              {/* Description Snippet */}
              {part.description && (
                <div className="space-y-3">
                  <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block">
                    // Product Summary
                  </span>
                  <p className="text-sm text-[#555] leading-relaxed font-normal">
                    {part.description}
                  </p>
                </div>
              )}

              {/* Technical Notes */}
              {part.technical_notes && (
                <div className="bg-[#FAF9F5] border-l-2 border-alkota-orange p-4 space-y-1 mt-4">
                  <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange block">
                    Technical Engineering Note:
                  </span>
                  <p className="text-xs text-[#555] font-normal leading-relaxed">
                    {part.technical_notes}
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Machine Compatibility & Technical Matrix */}
        {compatibleList.length > 0 && (
          <section className="mt-16 pt-12 border-t border-[#E8E8E4]">
            <div className="flex items-center gap-3 mb-6">
              <Cpu className="h-5 w-5 text-alkota-orange" />
              <h2 className="font-extralight text-2xl text-alkota-black tracking-tight">
                Verified Machine Compatibility
              </h2>
            </div>
            <p className="text-xs text-[#777] mb-6">
              This component has been factory tested and approved for direct installation on the following Alkota machine series:
            </p>

            <div className="flex flex-wrap gap-2">
              {compatibleList.map((model: string) => (
                <span
                  key={model}
                  className="px-3 py-1.5 bg-white border border-[#E0E0DA] font-ibm-plex-mono text-xs text-alkota-black uppercase tracking-wider"
                >
                  {model}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Related Components Strip */}
        {relatedParts && relatedParts.length > 0 && (
          <section className="mt-20 pt-12 border-t border-[#E8E8E4]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-1">
                  // Related Components
                </span>
                <h2 className="font-extralight text-2xl sm:text-3xl text-alkota-black tracking-tight">
                  Frequently Purchased in {categoryName}
                </h2>
              </div>
              <Link
                href={`/parts-attachments/${part.category}`}
                className="hidden sm:inline-flex items-center gap-1.5 font-ibm-plex-mono text-xs uppercase tracking-widest text-alkota-black hover:text-alkota-orange transition-colors"
              >
                <span>View Full Category</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedParts.map((rp) => (
                <ProductCard key={rp.id} part={rp} />
              ))}
            </div>
          </section>
        )}

      </div>
    </main>
  );
}
