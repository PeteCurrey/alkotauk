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
  Layers,
  ArrowRight,
  AlertTriangle,
  Download,
  HelpCircle,
  Package,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { supabaseAdmin } from '@/lib/supabase/server';
import SafeImage from '@/components/ui/SafeImage';
import ProductDetailActions from '@/components/parts/ProductDetailActions';
import ProductCard from '@/components/parts/ProductCard';
import { getPartEcosystem } from '@/lib/relationships/service';
import { resolveProductAction } from '@/lib/commerce/action-resolver';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ machine?: string; preview?: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { data: part } = await supabaseAdmin
    .from('parts')
    .select('name, part_number, brand, description, price, active, meta_title, meta_description')
    .eq('slug', slug)
    .eq('active', true)
    .single();

  if (!part) {
    return {
      title: 'Part Not Found | Alkota UK',
      robots: { index: false, follow: false },
    };
  }

  const isPriced = typeof part.price === 'number' && part.price > 0;
  const brandName = part.brand || 'Alkota';

  return {
    title: part.meta_title || `${part.name} (${part.part_number}) | Alkota UK Parts`,
    description: part.meta_description || part.description || `Buy genuine ${brandName} ${part.name}. Part Number: ${part.part_number}. Sourced and stocked in the UK.`,
    alternates: {
      canonical: `https://alkota.co.uk/parts-attachments/product/${slug}`,
    },
    robots: {
      index: isPriced,
      follow: true,
    },
    openGraph: {
      title: `${part.name} (${part.part_number}) | Alkota UK`,
      description: part.description || `${part.name} OEM replacement component.`,
      url: `https://alkota.co.uk/parts-attachments/product/${slug}`,
    },
  };
}

export default async function ProductDetailPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const sp = searchParams ? await searchParams : {};
  const machineContextParam = sp.machine?.trim() || null;

  // 1. Fetch part from database
  const { data: part } = await supabaseAdmin
    .from('parts')
    .select('*')
    .eq('slug', slug)
    .eq('active', true)
    .single();

  if (!part) {
    notFound();
  }

  // 2. Fetch ecosystem (machines, service kits, accessories, superseding part)
  const ecosystem = await getPartEcosystem(part);

  // 3. Fetch brand partner details
  let brandInfo: { name: string; country_of_origin?: string; [key: string]: any } | null = null;
  if (part.brand) {
    const { data: b } = await supabaseAdmin
      .from('brand_partners')
      .select('*')
      .eq('slug', part.brand)
      .single();
    brandInfo = b as any;
  }

  // 4. Fetch category name
  let categoryName = part.category || 'Components';
  if (part.category) {
    const { data: cat } = await supabaseAdmin
      .from('part_categories')
      .select('name')
      .eq('slug', part.category)
      .single();
    if (cat) categoryName = cat.name;
  }

  // 5. Fetch related parts from same category
  const { data: relatedParts } = await supabaseAdmin
    .from('parts')
    .select('id, part_number, sku, mpn, name, slug, category, brand, price, in_stock, availability_status, image_url, manufacturer, oem_genuine, description')
    .eq('category', part.category)
    .eq('active', true)
    .neq('id', part.id)
    .limit(4);

  // 6. Central Product Action Resolution
  const decision = resolveProductAction(part, {
    machineModel: machineContextParam || undefined,
  });

  if (decision.action === 'HIDDEN') {
    notFound();
  }

  const priceExVat = decision.priceExVat;
  const priceIncVat = decision.priceIncVat;
  const isPurchasable = decision.action === 'PURCHASE';
  const compatibleList = Array.isArray(part.compatible_machines) ? part.compatible_machines : [];
  const verifiedMachines = ecosystem.verifiedMachines;
  const documentsList = Array.isArray(part.documents) ? part.documents : [];
  const supersededPart = ecosystem.supersedingPart;

  // 7. Machine-Specific Context Verification Check
  let machineVerificationState: 'confirmed' | 'unverified' | null = null;
  if (machineContextParam) {
    const upperCtx = machineContextParam.toUpperCase();
    const isConfirmed = verifiedMachines.some(m => m.model_code.toUpperCase() === upperCtx || m.machine_slug.toUpperCase() === upperCtx) ||
      compatibleList.some((c: string) => c.toUpperCase() === upperCtx);
    machineVerificationState = isConfirmed ? 'confirmed' : 'unverified';
  }

  // 8. Filtered technical specifications table (only show populated non-null fields)
  const technicalSpecs: Array<{ label: string; value: string }> = [
    { label: 'Part Number', value: part.part_number },
    ...(part.mpn ? [{ label: 'Manufacturer MPN', value: part.mpn }] : []),
    ...(part.sku ? [{ label: 'Internal SKU', value: part.sku }] : []),
    { label: 'Manufacturer', value: brandInfo?.name || part.manufacturer || 'Alkota OEM' },
    { label: 'Category', value: categoryName },
    ...(part.subcategory ? [{ label: 'Subcategory', value: part.subcategory }] : []),
    ...(part.weight_kg ? [{ label: 'Weight', value: `${part.weight_kg} kg` }] : []),
    ...(part.dimensions_cm ? [{ label: 'Dimensions', value: `${part.dimensions_cm} cm` }] : []),
  ];

  // Merge JSONB specifications if present
  if (part.specifications && typeof part.specifications === 'object') {
    Object.entries(part.specifications).forEach(([k, v]) => {
      if (v && typeof v === 'string') {
        technicalSpecs.push({
          label: k.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
          value: v,
        });
      }
    });
  }

  // Schema.org Product Structured Data
  const jsonLd: Record<string, any> = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: part.name,
    image: part.image_url ? [part.image_url] : [],
    description: part.description || `${part.name} industrial pressure washer replacement component.`,
    sku: part.sku || part.part_number,
    mpn: part.mpn || part.part_number,
    brand: {
      '@type': 'Brand',
      name: brandInfo?.name || part.manufacturer || 'Alkota',
    },
  };

  if (decision.action === 'PURCHASE' && priceExVat) {
    jsonLd.offers = {
      '@type': 'Offer',
      url: `https://alkota.co.uk/parts-attachments/product/${part.slug}`,
      priceCurrency: 'GBP',
      price: priceExVat.toFixed(2),
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: 'Alkota UK',
      },
    };
  } else if (decision.action === 'REQUEST_AVAILABILITY') {
    jsonLd.offers = {
      '@type': 'Offer',
      url: `https://alkota.co.uk/parts-attachments/product/${part.slug}`,
      priceCurrency: 'GBP',
      ...(priceExVat ? { price: priceExVat.toFixed(2) } : {}),
      availability: 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: 'Alkota UK',
      },
    };
  }

  return (
    <main className="min-h-screen bg-[#FAF9F5] text-[#1A1917] pb-24 font-sans selection:bg-[#FF6900] selection:text-white">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── 01: BREADCRUMBS BAR ── */}
      <div className="bg-white border-b border-[#E8E6DF] px-6 sm:px-12 lg:px-24 pt-28 pb-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <nav className="flex items-center gap-2 font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#777] overflow-x-auto whitespace-nowrap">
            <Link href="/parts-attachments" className="hover:text-[#FF6900] transition-colors">
              Parts
            </Link>
            <ChevronRight className="h-3 w-3 shrink-0 text-[#BBB]" />
            <Link href={`/parts-attachments/${part.category}`} className="hover:text-[#FF6900] transition-colors">
              {categoryName}
            </Link>
            {part.brand && (
              <>
                <ChevronRight className="h-3 w-3 shrink-0 text-[#BBB]" />
                <Link href={`/parts-attachments/brands/${part.brand}`} className="hover:text-[#FF6900] transition-colors">
                  {brandInfo?.name || part.brand}
                </Link>
              </>
            )}
            <ChevronRight className="h-3 w-3 shrink-0 text-[#BBB]" />
            <span className="text-[#FF6900] truncate max-w-xs">{part.part_number}</span>
          </nav>

          <Link
            href={`/parts-attachments/${part.category}`}
            className="hidden md:flex items-center gap-1.5 font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#777] hover:text-[#0F172A] transition-colors"
          >
            <ArrowLeft className="h-3 w-3 text-[#FF6900]" />
            <span>Back to {categoryName}</span>
          </Link>
        </div>
      </div>

      {/* ── 02: MACHINE CONTEXT BANNER (IF ARRIVED FROM MACHINE FINDER) ── */}
      {machineContextParam && machineVerificationState && (
        <div className={`px-6 sm:px-12 lg:px-24 py-3 border-b text-xs ${
          machineVerificationState === 'confirmed'
            ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
            : 'bg-amber-50 border-amber-200 text-amber-950'
        }`}>
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              {machineVerificationState === 'confirmed' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              )}
              <span>
                You are viewing this part for machine:{' '}
                <strong className="font-mono">{machineContextParam}</strong> —{' '}
                {machineVerificationState === 'confirmed'
                  ? 'Confirmed 100% Genuine Fitment for your machine.'
                  : 'We have not yet verified direct fitment for this specific model. Please check with our workshop before ordering.'}
              </span>
            </div>
            <Link
              href="/parts/find?tab=machine"
              className="font-ibm-plex-mono text-[10px] uppercase tracking-wider underline hover:text-[#FF6900] shrink-0"
            >
              Change Machine
            </Link>
          </div>
        </div>
      )}

      {/* ── 03: SUPERSEDED NOTIFICATION (IF APPLICABLE) ── */}
      {part.superseded_by && (
        <div className="bg-amber-50 border-b border-amber-200 px-6 sm:px-12 lg:px-24 py-4">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-amber-950 block text-xs">
                  This part number has been superseded by the manufacturer.
                </span>
                <span className="text-xs text-amber-800">
                  Original reference <strong>{part.part_number}</strong> is discontinued. Direct factory replacement is part #{part.superseded_by}.
                </span>
              </div>
            </div>
            {supersededPart && (
              <Link
                href={`/parts-attachments/product/${supersededPart.slug}`}
                className="px-4 py-2 bg-amber-800 hover:bg-amber-900 text-white text-xs font-ibm-plex-mono uppercase tracking-wider rounded transition-colors shrink-0 flex items-center gap-1.5"
              >
                <span>Order Replacement: {supersededPart.part_number}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>
      )}

      {/* ── 04: PRODUCT HERO (MEDIA + COMMERCIAL) ── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: Media Area (Col 1-7) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white border border-[#E8E6DF] rounded-[6px] p-8 sm:p-12 relative min-h-[440px] flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
              {part.image_url ? (
                <div className="relative w-full h-[360px]">
                  <SafeImage
                    src={part.image_url}
                    alt={part.name}
                    fill
                    className="object-contain p-2"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-[#BBB] space-y-2 text-center">
                  <Wrench className="h-16 w-16 text-[#DDD] stroke-[1.5]" />
                  <span className="font-ibm-plex-mono text-xs uppercase tracking-widest text-[#999]">
                    Factory Technical Schematic Component
                  </span>
                  <span className="font-ibm-plex-mono text-xs text-[#FF6900] font-bold">
                    {part.part_number}
                  </span>
                  <span className="text-[10px] text-[#AAA] max-w-xs">
                    Factory certified specification drawing item. Sourced and inspected to Alkota engineering tolerances.
                  </span>
                </div>
              )}

              {/* Status Badges Overlay */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
                {part.oem_genuine && (
                  <span className="inline-flex items-center gap-1.5 bg-[#0A0A0A] text-white px-3 py-1 font-ibm-plex-mono text-[9px] uppercase tracking-widest rounded-[2px]">
                    <ShieldCheck className="h-3 w-3 text-[#FF6900]" />
                    OEM Genuine
                  </span>
                )}
                {brandInfo && (
                  <span className="inline-block bg-[#F8FAFC] border border-[#E2E8F0] text-[#334155] px-3 py-1 font-ibm-plex-mono text-[9px] uppercase tracking-wider rounded-[2px] font-semibold">
                    {brandInfo.name} {brandInfo.country_of_origin ? `· ${brandInfo.country_of_origin}` : ''}
                  </span>
                )}
              </div>
            </div>

            {/* Value Props */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white border border-[#E8E6DF] rounded-[4px] p-3 text-center">
                <Truck className="h-4 w-4 text-[#FF6900] mx-auto mb-1" />
                <span className="font-ibm-plex-mono text-[8px] uppercase tracking-widest text-[#777] block">Despatch</span>
                <span className="text-xs font-semibold text-[#0F172A]">Next-Day UK</span>
              </div>
              <div className="bg-white border border-[#E8E6DF] rounded-[4px] p-3 text-center">
                <Clock className="h-4 w-4 text-[#FF6900] mx-auto mb-1" />
                <span className="font-ibm-plex-mono text-[8px] uppercase tracking-widest text-[#777] block">Warranty</span>
                <span className="text-xs font-semibold text-[#0F172A]">12 Months Factory</span>
              </div>
              <div className="bg-white border border-[#E8E6DF] rounded-[4px] p-3 text-center">
                <ShieldCheck className="h-4 w-4 text-[#FF6900] mx-auto mb-1" />
                <span className="font-ibm-plex-mono text-[8px] uppercase tracking-widest text-[#777] block">Fitment</span>
                <span className="text-xs font-semibold text-[#0F172A]">100% Guaranteed</span>
              </div>
            </div>

            {/* ── "IS THIS THE RIGHT PART?" REASSURANCE PANEL ── */}
            <div className="bg-[#FAF9F5] border border-[#E8E6DF] rounded-[6px] p-5">
              <div className="flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-[#FF6900] shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider font-ibm-plex-mono mb-1">
                    Not sure this is the right part?
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed mb-3">
                    Don't risk downtime with an incompatible component. You can identify the exact part using our guided tools or ask our workshop engineers to confirm your serial plate.
                  </p>
                  <div className="flex flex-wrap items-center gap-3 text-xs">
                    <Link
                      href="/parts/find?tab=machine"
                      className="font-ibm-plex-mono text-[#FF6900] hover:underline flex items-center gap-1"
                    >
                      <span>Check Your Machine Model</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                    <span className="text-[#CCC]">|</span>
                    <Link
                      href="/parts/find?tab=identify"
                      className="font-ibm-plex-mono text-[#0F172A] hover:text-[#FF6900] flex items-center gap-1"
                    >
                      <span>Upload Photo of Old Part</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Commercial & Actions (Col 8-12) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-[#E8E6DF] rounded-[6px] p-6 sm:p-8 space-y-6 shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
              
              {/* Brand & Stock Row */}
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#F0EFEB]">
                <div>
                  <span className="font-ibm-plex-mono text-xs font-bold text-[#FF6900] block mb-0.5">
                    {part.brand ? part.brand.toUpperCase().replace('-', ' ') : 'ALKOTA OEM'}
                  </span>
                  <span className="font-ibm-plex-mono text-[10px] text-[#888] uppercase tracking-wider">
                    {part.manufacturer || brandInfo?.name || 'Verified Alkota Partner'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      decision.action === 'PURCHASE' ? 'bg-green-500' : 'bg-amber-500'
                    }`}
                  />
                  <span className="font-ibm-plex-mono text-[10px] uppercase tracking-wider text-[#555]">
                    {decision.action === 'PURCHASE' ? 'In Stock (UK Despatch)' : decision.label}
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-light text-[#0F172A] tracking-tight leading-snug">
                  {part.name}
                </h1>
                {part.description && (
                  <p className="text-xs sm:text-sm text-[#64748B] font-light leading-relaxed mt-3">
                    {part.description}
                  </p>
                )}
              </div>

              {/* Pricing Display */}
              <div className="p-4 bg-[#FAF9F5] border border-[#E8E6DF] rounded-[4px] space-y-1">
                {decision.action === 'PURCHASE' && priceExVat !== null ? (
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-[#0F172A] tracking-tight font-ibm-plex-mono">
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
                ) : priceExVat !== null && decision.action === 'REQUEST_AVAILABILITY' ? (
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-[#0F172A] tracking-tight font-ibm-plex-mono">
                        £{priceExVat.toFixed(2)}
                      </span>
                      <span className="font-ibm-plex-mono text-[10px] text-[#777] uppercase tracking-widest">
                        Ex. VAT
                      </span>
                    </div>
                    <span className="font-ibm-plex-mono text-xs text-amber-700 font-semibold block">
                      Awaiting Stock — Request Availability for Lead Time
                    </span>
                  </div>
                ) : (
                  <div>
                    <span className="text-xl sm:text-2xl font-light text-[#0F172A]">
                      Price on Application (POA)
                    </span>
                    <span className="font-ibm-plex-mono text-[10px] text-[#888] block mt-0.5">
                      Contact parts desk for live quotation and UK depot lead time
                    </span>
                  </div>
                )}
              </div>

              {/* Client Action Component (Add to Basket / Request Quote / Mobile Sticky) */}
              <ProductDetailActions
                part={{
                  id: part.id,
                  part_number: part.part_number,
                  sku: part.sku,
                  mpn: part.mpn,
                  name: part.name,
                  slug: part.slug,
                  price: part.price,
                  brand: part.brand,
                  manufacturer: part.manufacturer,
                  image_url: part.image_url,
                  in_stock: part.in_stock,
                  superseded_by: part.superseded_by,
                }}
                supersededPartSlug={supersededPart?.slug || null}
              />
            </div>
          </div>
        </div>

        {/* ── 05: TECHNICAL SPECIFICATIONS & MACHINE COMPATIBILITY ── */}
        <div className="mt-16 bg-white border border-[#E8E6DF] rounded-[6px] p-8 sm:p-12 space-y-8 shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
          <div>
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#FF6900] font-semibold block mb-1">
              // Engineering Data
            </span>
            <h2 className="text-2xl font-light text-[#0F172A] tracking-tight">
              Technical Specifications &amp; Compatibility
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Component Attributes (Only non-empty rows) */}
            <div className="space-y-3">
              <h3 className="text-xs font-ibm-plex-mono uppercase tracking-widest text-[#777]">
                Identification &amp; Physical Specifications:
              </h3>
              <div className="border border-[#E8E6DF] rounded-[4px] divide-y divide-[#F0EFEB] font-ibm-plex-mono text-xs overflow-hidden">
                {technicalSpecs.map((spec, i) => (
                  <div key={i} className={`flex justify-between p-3 ${i % 2 === 0 ? 'bg-[#FAF9F5]' : 'bg-white'}`}>
                    <span className="text-[#64748B]">{spec.label}:</span>
                    <span className="text-[#0F172A] font-semibold">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Confirmed Machine Compatibility */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-ibm-plex-mono uppercase tracking-widest text-[#777]">
                  Confirmed Machine Fitment:
                </h3>
                {verifiedMachines.length > 0 && (
                  <span className="inline-flex items-center gap-1 font-mono text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    <span>{verifiedMachines.length} Verified {verifiedMachines.length === 1 ? 'Machine' : 'Machines'}</span>
                  </span>
                )}
              </div>

              {verifiedMachines.length > 0 ? (
                <div className="space-y-3">
                  <p className="text-xs text-[#64748B] font-light">
                    This component is verified for direct fitment on the following Alkota industrial equipment:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {verifiedMachines.map((m) => (
                      <Link
                        key={m.machine_slug}
                        href={`/machines/${m.category}/${m.machine_slug}`}
                        className="group flex flex-col p-3 bg-white hover:bg-[#FAF9F5] border border-[#E2E4E8] hover:border-[#FF6900] rounded-lg transition-all shadow-sm"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="font-mono text-xs font-bold text-[#0F172A] group-hover:text-[#FF6900] transition-colors">
                              {m.model_code}
                            </span>
                            <h4 className="text-xs text-[#475569] font-medium line-clamp-1">
                              {m.name}
                            </h4>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-[#94A3B8] group-hover:text-[#FF6900] group-hover:translate-x-0.5 transition-all shrink-0 mt-0.5" />
                        </div>
                        {(m.pressure_bar || m.flow_rate_lpm) && (
                          <div className="mt-2 font-mono text-[10px] text-[#64748B]">
                            {m.pressure_bar ? `${m.pressure_bar} BAR` : ''}
                            {m.pressure_bar && m.flow_rate_lpm ? ' · ' : ''}
                            {m.flow_rate_lpm ? `${m.flow_rate_lpm} LPM` : ''}
                          </div>
                        )}
                        {m.evidence && (
                          <div className="mt-1.5 text-[9px] text-emerald-700 bg-emerald-50/80 px-1.5 py-0.5 rounded border border-emerald-100 line-clamp-1" title={m.evidence}>
                            ✓ {m.evidence}
                          </div>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : compatibleList.length > 0 ? (
                <div>
                  <p className="text-xs text-[#64748B] mb-2 font-light">
                    This component is verified for direct OEM fitment on the following equipment models:
                  </p>
                  <div className="flex flex-wrap gap-2 p-3 bg-[#FAF9F5] border border-[#E8E6DF] rounded-[4px]">
                    {compatibleList.map((model: string) => (
                      <span
                        key={model}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#CBD5E1] text-xs font-ibm-plex-mono text-[#0F172A] rounded-[3px]"
                      >
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>{model}</span>
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-[#FAF9F5] border border-[#E8E6DF] rounded-[4px] text-xs text-[#64748B] space-y-2">
                  <p>
                    Specific machine model cross-references for this part number are verified via workshop schematics.
                  </p>
                  <Link
                    href={`/parts/find?tab=machine`}
                    className="inline-flex items-center gap-1 text-[#FF6900] font-semibold hover:underline"
                  >
                    <span>Check fitment for your machine →</span>
                  </Link>
                </div>
              )}

              {/* Technical Documents */}
              {documentsList.length > 0 && (
                <div className="pt-4 space-y-2">
                  <h4 className="text-xs font-ibm-plex-mono uppercase tracking-widest text-[#777]">
                    Technical Documents:
                  </h4>
                  <div className="space-y-1.5">
                    {documentsList.map((doc: any, i: number) => (
                      <a
                        key={i}
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-2.5 bg-white border border-[#CBD5E1] hover:border-[#FF6900] rounded-[4px] text-xs transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-[#FF6900]" />
                          <span className="font-medium text-[#0F172A]">{doc.name || 'Specification Sheet'}</span>
                        </div>
                        <Download className="w-3.5 h-3.5 text-[#64748B]" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── 06: SERVICE KIT AVAILABLE (IF APPLICABLE) ── */}
        {ecosystem.serviceKits.length > 0 && (
          <div className="mt-12 bg-white border border-[#E8E6DF] rounded-[6px] p-6 sm:p-8 space-y-4 shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
            <div className="flex items-center justify-between border-b border-[#F0EFEB] pb-3">
              <div>
                <span className="font-ibm-plex-mono text-[10px] uppercase text-[#FF6900] font-bold block mb-0.5">
                  // Scheduled Maintenance Pack
                </span>
                <h3 className="text-lg font-light text-[#0F172A]">
                  Factory Service Kit Available for This Component
                </h3>
              </div>
              <span className="text-xs font-ibm-plex-mono text-[#64748B]">
                {ecosystem.serviceKits.length} Kit{ecosystem.serviceKits.length === 1 ? '' : 's'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ecosystem.serviceKits.map((kit) => (
                <div key={kit.id} className="p-4 bg-[#FAF9F5] border border-[#E8E6DF] rounded flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-xs text-[#FF6900] font-bold block">
                      Kit #{kit.kit_number}
                    </span>
                    <h4 className="text-xs font-bold text-[#0F172A] mt-1 mb-1">{kit.name}</h4>
                    <p className="text-[11px] text-[#64748B] line-clamp-2 mb-3">
                      {kit.service_purpose || 'Comprehensive factory rebuild package containing all required seals and wear items.'}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-[#E8E6DF] flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#0F172A]">
                      {kit.price ? `£${Number(kit.price).toFixed(2)}` : 'POA'}
                    </span>
                    <Link
                      href={`/parts-attachments/product/${kit.slug}`}
                      className="text-xs font-mono text-[#FF6900] hover:text-black uppercase"
                    >
                      View Kit →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── 07: RECOMMENDED ACCESSORIES & ATTACHMENTS (Domain: GENERAL) ── */}
        {ecosystem.accessories.length > 0 && (
          <div className="mt-12 bg-white border border-[#E8E6DF] rounded-[6px] p-6 sm:p-8 space-y-4 shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
            <div className="border-b border-[#F0EFEB] pb-3">
              <span className="font-ibm-plex-mono text-[10px] uppercase text-[#777] font-bold block mb-0.5">
                // Commercial Recommendations (Domain: General Discovery)
              </span>
              <h3 className="text-lg font-light text-[#0F172A]">
                Recommended Accessories &amp; Tooling
              </h3>
              <p className="text-xs text-[#777]">
                Attachments and tooling frequently used alongside this component.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {ecosystem.accessories.map((acc) => (
                <div key={acc.id} className="p-4 bg-[#FAF9F5] border border-[#E8E6DF] rounded flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-[9px] uppercase text-[#888] block mb-1">
                      Tooling Recommendation
                    </span>
                    <h4 className="text-xs font-bold text-[#0F172A] mb-1">{acc.title}</h4>
                    <p className="text-[11px] text-[#64748B] line-clamp-2 mb-3">
                      {acc.tagline}
                    </p>
                  </div>
                  <Link
                    href={acc.href}
                    className="text-xs font-mono text-[#FF6900] hover:text-black uppercase flex items-center gap-1"
                  >
                    <span>Explore Tooling</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── 08: RELATED COMPONENTS ── */}
        {relatedParts && relatedParts.length > 0 && (
          <div className="mt-16 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E6DF]">
              <h2 className="text-xl font-light text-[#0F172A] tracking-tight">
                Related {categoryName} Components
              </h2>
              <Link
                href={`/parts-attachments/${part.category}`}
                className="text-xs font-ibm-plex-mono uppercase tracking-wider text-[#FF6900] hover:underline"
              >
                View all in {categoryName} →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedParts.map(rp => (
                <ProductCard key={rp.id} part={rp} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
