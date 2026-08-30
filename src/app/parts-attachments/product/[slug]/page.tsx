import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
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
  ArrowRight,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { supabaseAdmin } from '@/lib/supabase/server';
import SafeImage from '@/components/ui/SafeImage';
import ProductDetailActions from '@/components/parts/ProductDetailActions';
import ProductCard from '@/components/parts/ProductCard';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { data: part } = await supabaseAdmin
    .from('parts')
    .select('name, part_number, brand, description, meta_title, meta_description')
    .eq('slug', slug)
    .single();

  if (!part) {
    return {
      title: 'Part Not Found | Alkota UK',
    };
  }

  return {
    title: part.meta_title || `${part.name} (${part.part_number}) | Alkota UK Parts & Spares`,
    description: part.meta_description || part.description || `Buy genuine ${part.brand || 'OEM'} ${part.name}. Part Number: ${part.part_number}. Sourced and stocked in the UK.`,
  };
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

  const priceExVat = part.price ? Number(part.price) : null;
  const priceIncVat = priceExVat ? priceExVat * 1.20 : null;
  const compatibleList = Array.isArray(part.compatible_machines) ? part.compatible_machines : [];

  // Dynamic JSON-LD structured data for Google Product Schema
  const jsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: part.name,
    image: part.image_url ? [part.image_url] : [],
    description: part.description || `${part.name} replacement component.`,
    sku: part.sku || part.part_number,
    mpn: part.mpn || part.part_number,
    brand: {
      '@type': 'Brand',
      name: brandInfo?.name || part.manufacturer || 'Alkota',
    },
    offers: {
      '@type': 'Offer',
      url: `https://alkota.co.uk/parts-attachments/product/${part.slug}`,
      priceCurrency: 'GBP',
      price: priceExVat ? priceExVat.toFixed(2) : undefined,
      availability: part.in_stock ? 'https://schema.org/InStock' : 'https://schema.org/BackOrder',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: 'Alkota UK',
      },
    },
  };

  return (
    <main className="min-h-screen bg-[#FAF9F5] text-alkota-black pb-24 font-sans">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb Navigation Bar */}
      <div className="bg-white border-b border-[#E8E8E4] px-6 sm:px-12 lg:px-24 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <nav className="flex items-center gap-2 font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#777] overflow-x-auto whitespace-nowrap">
            <Link href="/parts-attachments" className="hover:text-alkota-orange transition-colors">
              Parts
            </Link>
            <ChevronRight className="h-3 w-3 shrink-0 text-[#BBB]" />
            <Link href={`/parts-attachments/${part.category}`} className="hover:text-alkota-orange transition-colors">
              {categoryName}
            </Link>
            {part.brand && (
              <>
                <ChevronRight className="h-3 w-3 shrink-0 text-[#BBB]" />
                <Link href={`/parts-attachments/brands/${part.brand}`} className="hover:text-alkota-orange transition-colors">
                  {brandInfo?.name || part.brand}
                </Link>
              </>
            )}
            <ChevronRight className="h-3 w-3 shrink-0 text-[#BBB]" />
            <span className="text-alkota-orange truncate max-w-xs">{part.part_number}</span>
          </nav>

          <Link
            href={`/parts-attachments/${part.category}`}
            className="hidden md:flex items-center gap-1.5 font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#777] hover:text-alkota-black transition-colors"
          >
            <ArrowLeft className="h-3 w-3 text-alkota-orange" />
            <span>Back to {categoryName}</span>
          </Link>
        </div>
      </div>

      {/* ── MAIN PRODUCT HERO SECTION ── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Product Schematic / Media (Col 1-7) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white border border-[#E8E8E4] p-8 sm:p-12 relative min-h-[440px] flex items-center justify-center">
              {part.image_url ? (
                <div className="relative w-full h-[360px]">
                  <SafeImage
                    src={part.image_url}
                    alt={part.name}
                    fill
                    className="object-contain"
                  />
                </div>
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

            {/* Service & Delivery Indicators */}
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
                <span className="font-ibm-plex-mono text-[8px] uppercase tracking-widest text-[#777] block">Fitment</span>
                <span className="text-xs font-normal text-alkota-black">100% Guaranteed</span>
              </div>
            </div>
          </div>

          {/* Right Column: Commercial & Actions (Col 8-12) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-[#E8E8E4] p-8 space-y-6">
              {/* Part Number & Manufacturer Row */}
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#F0EFEB]">
                <div>
                  <span className="font-ibm-plex-mono text-[10px] text-alkota-orange uppercase tracking-widest block mb-0.5">
                    // Part Number: {part.part_number}
                  </span>
                  <span className="font-ibm-plex-mono text-[10px] text-[#888] uppercase tracking-wider">
                    {part.manufacturer || brandInfo?.name || 'Alkota OEM Approved'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      part.in_stock ? 'bg-green-500' : 'bg-amber-500'
                    }`}
                  />
                  <span className="font-ibm-plex-mono text-[10px] uppercase tracking-wider text-[#555]">
                    {part.in_stock ? 'Direct Stock (UK)' : 'Available to Order'}
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-light text-alkota-black tracking-tight leading-snug">
                  {part.name}
                </h1>
                {part.description && (
                  <p className="text-xs sm:text-sm text-[#666] font-light leading-relaxed mt-3">
                    {part.description}
                  </p>
                )}
              </div>

              {/* Pricing Display */}
              <div className="p-4 bg-[#FAF9F5] border border-[#E8E8E4] space-y-1">
                {priceExVat ? (
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-light text-alkota-black tracking-tight">
                        £{priceExVat.toFixed(2)}
                      </span>
                      <span className="font-ibm-plex-mono text-[10px] text-[#777] uppercase tracking-widest">
                        Ex. VAT
                      </span>
                    </div>
                    <span className="font-ibm-plex-mono text-xs text-[#888]">
                      £{priceIncVat?.toFixed(2)} inc. 20% VAT
                    </span>
                  </div>
                ) : (
                  <div>
                    <span className="text-2xl font-light text-alkota-black">
                      Price on Application (POA)
                    </span>
                    <span className="font-ibm-plex-mono text-[10px] text-[#888] block mt-0.5">
                      Contact parts desk for live quotation and lead time
                    </span>
                  </div>
                )}
              </div>

              {/* Client Action Component (Add to Cart / Quote) */}
              <ProductDetailActions
                part={{
                  id: part.id,
                  part_number: part.part_number,
                  name: part.name,
                  price: part.price,
                  brand: part.brand,
                  manufacturer: part.manufacturer,
                  image_url: part.image_url,
                  in_stock: part.in_stock,
                }}
              />
            </div>
          </div>
        </div>

        {/* ── PROGRESSIVE DISCLOSURE TECHNICAL TABS ── */}
        <div className="mt-16 bg-white border border-[#E8E8E4] p-8 sm:p-12 space-y-10">
          <div>
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-1">
              // Engineering Data
            </span>
            <h2 className="text-2xl font-light text-alkota-black tracking-tight">
              Technical Specifications & Compatibility
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Technical Attributes Table */}
            <div className="space-y-4">
              <h3 className="text-xs font-ibm-plex-mono uppercase tracking-widest text-[#777]">
                Component Specifications:
              </h3>
              <div className="border border-[#E8E8E4] divide-y divide-[#F0EFEB] font-ibm-plex-mono text-xs">
                <div className="flex justify-between p-3 bg-[#FAF9F5]">
                  <span className="text-[#666]">Part Number / MPN:</span>
                  <span className="text-alkota-black font-normal">{part.part_number}</span>
                </div>
                <div className="flex justify-between p-3">
                  <span className="text-[#666]">Brand / Manufacturer:</span>
                  <span className="text-alkota-black">{brandInfo?.name || part.manufacturer || 'Alkota OEM'}</span>
                </div>
                <div className="flex justify-between p-3 bg-[#FAF9F5]">
                  <span className="text-[#666]">Component Category:</span>
                  <span className="text-alkota-black">{categoryName}</span>
                </div>
                {part.weight_kg && (
                  <div className="flex justify-between p-3">
                    <span className="text-[#666]">Item Weight:</span>
                    <span className="text-alkota-black">{part.weight_kg} kg</span>
                  </div>
                )}
                {part.dimensions_cm && (
                  <div className="flex justify-between p-3 bg-[#FAF9F5]">
                    <span className="text-[#666]">Dimensions:</span>
                    <span className="text-alkota-black">{part.dimensions_cm}</span>
                  </div>
                )}
              </div>

              {part.technical_notes && (
                <div className="p-4 bg-[#FAF9F5] border-l-2 border-alkota-orange text-xs text-[#555] font-light leading-relaxed">
                  <strong className="font-medium text-alkota-black block mb-1">Engineering Note:</strong>
                  {part.technical_notes}
                </div>
              )}
            </div>

            {/* Machine Compatibility Tag List */}
            <div className="space-y-4">
              <h3 className="text-xs font-ibm-plex-mono uppercase tracking-widest text-[#777]">
                Machine Fitment Matrix:
              </h3>
              {compatibleList.length > 0 ? (
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {compatibleList.map((m: string) => (
                      <span
                        key={m}
                        className="px-3 py-1.5 bg-[#FAF9F5] border border-[#DDD] font-ibm-plex-mono text-xs text-[#444] rounded"
                      >
                        ✓ {m}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-[#888] font-light">
                    Guaranteed direct replacement on all listed machine models and series.
                  </p>
                </div>
              ) : (
                <div className="p-4 bg-[#FAF9F5] border border-[#E8E8E4] text-xs text-[#777]">
                  Universal industrial standard fitting. Suitable for all major pressure washer platforms matching thread and pressure rating.
                </div>
              )}

              <div className="pt-4">
                <Link
                  href="/parts-attachments/finder"
                  className="inline-flex items-center gap-2 text-xs font-ibm-plex-mono uppercase tracking-widest text-alkota-orange hover:underline"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Verify fitment with Parts Finder Wizard →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ── RELATED COMPONENTS GRID ── */}
        {relatedParts && relatedParts.length > 0 && (
          <div className="mt-16 space-y-8">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E8E4]">
              <div>
                <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-1">
                  // Related Engineering Spares
                </span>
                <h2 className="text-2xl font-light text-alkota-black tracking-tight">
                  Frequently Specified Together
                </h2>
              </div>
              <Link
                href={`/parts-attachments/${part.category}`}
                className="text-xs font-ibm-plex-mono text-alkota-orange uppercase tracking-widest hover:underline flex items-center gap-1"
              >
                Browse All {categoryName} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedParts.map((rel: any) => (
                <ProductCard key={rel.id} part={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
