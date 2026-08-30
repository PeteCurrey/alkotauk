import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { 
  ChevronRight, 
  ShieldCheck, 
  FlaskConical, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  ArrowRight,
  Droplets,
  Sparkles
} from 'lucide-react';
import SafeImage from '@/components/ui/SafeImage';
import ChemicalProductInteractive from '@/components/chemicals/ChemicalProductInteractive';
import ChemicalCard from '@/components/chemicals/ChemicalCard';
import { getRetailProductBySlug, getRetailProducts } from '@/lib/chemicals/service';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getRetailProductBySlug(slug);
  if (!product) return { title: 'Chemical Product | Alkota UK' };

  return {
    title: product.seo_title || `${product.retail_name} | Alkota UK Chemicals`,
    description: product.seo_description || product.short_description,
  };
}

export default async function ChemicalProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getRetailProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Related products from same family or application
  const allProducts = await getRetailProducts();
  const relatedProducts = allProducts
    .filter(p => p.id !== product.id && (p.retail_family === product.retail_family || p.primary_application === product.primary_application))
    .slice(0, 4);

  return (
    <main className="min-h-screen bg-[#FAF9F5] text-alkota-black font-sans pb-28">

      {/* ── BREADCRUMB STRIP ── */}
      <div className="bg-[#0A0A0A] text-white pt-28 pb-6 px-6 sm:px-12 lg:px-24 border-b border-[#222]">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center gap-2 font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#777]">
            <Link href="/chemicals" className="hover:text-alkota-orange transition-colors">
              Chemicals
            </Link>
            <ChevronRight className="h-3 w-3 text-[#444]" />
            <Link href="/chemicals/applications" className="hover:text-white transition-colors">
              {product.retail_family} Series
            </Link>
            <ChevronRight className="h-3 w-3 text-[#444]" />
            <span className="text-alkota-orange truncate max-w-xs">{product.retail_name}</span>
          </nav>
        </div>
      </div>

      {/* ── PRODUCT HERO & PURCHASE INTERFACE ── */}
      <section className="py-12 px-6 sm:px-12 lg:px-24 border-b border-[#E0DEDC]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            {/* Left: Product Imagery (Col 6) */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative aspect-[4/3] sm:aspect-square bg-white border border-[#E0DEDC] flex items-center justify-center p-8 overflow-hidden shadow-xs">
                {product.hero_image ? (
                  <SafeImage
                    src={product.hero_image}
                    alt={product.retail_name}
                    fill
                    className="object-contain p-8"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-[#CCC] gap-3 text-center">
                    <FlaskConical className="h-16 w-16 text-[#DDD]" />
                    <span className="font-ibm-plex-mono text-xs uppercase tracking-widest text-[#AAA]">
                      {product.originating_master_code}
                    </span>
                  </div>
                )}

                {/* Master Formulation Subtle Pill */}
                <div className="absolute top-4 left-4 bg-[#0A0A0A] text-white px-3 py-1 font-ibm-plex-mono text-[9px] uppercase tracking-widest">
                  Formula: {product.originating_master_code}
                </div>
              </div>

              {/* Master Chemistry Integrity Notice */}
              <div className="p-4 bg-[#F5F4F0] border border-[#E8E6E0] flex items-center justify-between text-xs">
                <div>
                  <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#777] block">
                    Originating Master Chemistry
                  </span>
                  <span className="font-bold text-alkota-black font-mono">
                    {product.originating_master_code} — {product.originating_master_name}
                  </span>
                </div>
                <span className="font-ibm-plex-mono text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-bold">
                  CLP Verified
                </span>
              </div>
            </div>

            {/* Right: Merchandising & Purchasing (Col 6) */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.2em] text-alkota-orange block mb-2">
                  {product.primary_application}
                </span>
                <h1 className="text-3xl sm:text-4xl font-extralight text-alkota-black tracking-tight leading-tight">
                  {product.retail_name}
                </h1>
                <p className="text-sm sm:text-base text-[#555] font-normal leading-relaxed mt-3">
                  {product.short_description}
                </p>
              </div>

              {/* Interactive Pack Selector & Cart Button */}
              <ChemicalProductInteractive product={product} />
            </div>

          </div>
        </div>
      </section>

      {/* ── TECHNICAL PROFILE, SUBSTRATES & HOW TO USE ── */}
      <section className="py-16 px-6 sm:px-12 lg:px-24 border-b border-[#E0DEDC] bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* Left: Detailed Overview & How To Use (7 Cols) */}
            <div className="lg:col-span-7 space-y-10">
              <div>
                <span className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.2em] text-alkota-orange block mb-2">
                  // Formulation Chemistry
                </span>
                <h2 className="text-2xl font-light text-alkota-black tracking-tight mb-4">
                  What it does
                </h2>
                <p className="text-sm sm:text-base text-[#555] leading-relaxed font-normal">
                  {product.long_description}
                </p>
              </div>

              {/* Dilution & Usage Protocols */}
              <div className="space-y-4">
                <h3 className="text-lg font-light text-alkota-black tracking-tight">
                  How to use &amp; Dilution Guidelines
                </h3>
                <div className="p-5 bg-[#FAF9F5] border border-[#E8E8E4] space-y-3">
                  <div className="font-ibm-plex-mono text-xs text-[#333] leading-relaxed">
                    <span className="text-alkota-orange font-bold uppercase tracking-wider text-[10px] block mb-1">
                      Recommended Dilution:
                    </span>
                    {product.dilution_information}
                  </div>
                  <div className="text-xs text-[#666] leading-relaxed border-t border-[#E8E8E4] pt-3">
                    <span className="font-bold text-[#0F172A] block mb-0.5">Application Method:</span>
                    {product.usage_instructions}
                  </div>
                </div>
              </div>

              {/* Safety & Precautionary Notes */}
              {product.warnings && product.warnings.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#666]">
                    Safety &amp; Precautionary Guidance
                  </h3>
                  <ul className="space-y-1.5 text-xs text-[#666]">
                    {product.warnings.map((w, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Right: Substrate Compatibility Matrix & Tech Docs (5 Cols) */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-[#FAF9F5] border border-[#E0DEDC] p-6 space-y-4">
                <span className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.2em] text-alkota-orange block">
                  // Substrate Compatibility
                </span>
                <h3 className="text-lg font-light text-alkota-black">
                  Suitable Surfaces
                </h3>

                <div className="divide-y divide-[#E8E6E0]">
                  {product.surface_compatibility.map((sc, idx) => (
                    <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                      <span className="font-normal text-[#333]">{sc.surface}</span>
                      <span className={`px-2 py-0.5 font-ibm-plex-mono text-[9px] uppercase tracking-wider rounded font-bold ${
                        sc.suitability === 'recommended'
                          ? 'bg-emerald-100 text-emerald-800'
                          : sc.suitability === 'safe'
                          ? 'bg-blue-100 text-blue-800'
                          : sc.suitability === 'test_first'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {sc.suitability.replace(/_/g, ' ')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Documents Download */}
              <div className="bg-[#111] text-white p-6 rounded-none space-y-3">
                <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange block">
                  Safety Documentation
                </span>
                <h4 className="text-base font-light">
                  Safety Data Sheet (SDS)
                </h4>
                <p className="text-xs text-[#888] leading-relaxed">
                  Verified GB-CLP chemical composition data sheet for {product.originating_master_code} ({product.originating_master_name}).
                </p>
                <div className="pt-2">
                  <a
                    href={`/api/chemicals/sds?code=${product.originating_master_code}`}
                    target="_blank"
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white hover:text-black text-white px-4 py-2 text-[10px] font-ibm-plex-mono uppercase tracking-widest transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5 text-alkota-orange" />
                    <span>Download SDS Document</span>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── RELATED FORMULATIONS ── */}
      {relatedProducts.length > 0 && (
        <section className="py-20 px-6 sm:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.2em] text-alkota-orange block mb-2">
                  // Complementary Chemistry
                </span>
                <h2 className="text-2xl sm:text-3xl font-light text-alkota-black tracking-tight">
                  Related Formulations
                </h2>
              </div>
              <Link
                href="/chemicals"
                className="font-ibm-plex-mono text-xs uppercase tracking-widest text-alkota-orange hover:text-black transition-colors"
              >
                All Chemicals →
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-[#E0DEDC]">
              {relatedProducts.map((p) => (
                <div key={p.id} className="bg-[#FAF9F5]">
                  <ChemicalCard product={p} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

    </main>
  );
}
