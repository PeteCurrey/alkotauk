import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { client, urlFor } from '@/sanity/client';
import Navigation from '@/components/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import { 
  Beaker, 
  ShieldCheck, 
  Droplets, 
  FileText, 
  ChevronLeft, 
  ArrowRight,
  Info,
  CheckCircle2,
  Trash2
} from 'lucide-react';

interface ChemicalDetailPageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

async function getChemical(slug: string) {
  return await client.fetch(`*[_type == "chemical" && slug.current == $slug][0] {
    _id,
    name,
    tagline,
    description,
    features,
    specs,
    image,
    gallery,
    "sdsUrl": sdsFile.asset->url,
    "techSheetUrl": techSheetFile.asset->url,
    variants,
    category,
    seo
  }`, { slug });
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const chemical = await getChemical(slug);
  if (!chemical) return {};

  return {
    title: chemical.seo?.metaTitle || `Alkota ${chemical.name} | Industrial Detergent`,
    description: chemical.seo?.metaDescription || chemical.tagline,
  };
}

export default async function ChemicalDetailPage({ params }: ChemicalDetailPageProps) {
  const { category: categorySlug, slug } = await params;
  const chemical = await getChemical(slug);

  if (!chemical) {
    notFound();
  }

  const categoryName = categorySlug.replace(/-/g, ' ');
  const mainImage = chemical.image ? urlFor(chemical.image).url() : 'https://alkota.co.uk/assets/water-treatment-CkILM82j.png';

  return (
    <main className="min-h-screen bg-alkota-bg pt-32 pb-0 overflow-x-hidden relative">
      <Navigation />
      
      {/* Background Watermark */}
      <div className="absolute top-40 right-0 pointer-events-none select-none opacity-[0.03] z-0">
        <span className="font-barlow-condensed text-[50vw] font-black uppercase italic leading-none text-alkota-black whitespace-nowrap">
          {chemical.name.split(' ')[0]}
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mb-20">
          <Breadcrumbs 
            items={[
              { label: 'Chemicals', href: '/chemicals' },
              { label: categoryName, href: `/chemicals/${categorySlug}` },
              { label: chemical.name }
            ]} 
          />
        </div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Visuals */}
          <div className="lg:col-span-7">
             <div className="relative aspect-[16/11] overflow-hidden border border-alkota-iron bg-white group p-12">
                <img 
                  src={mainImage} 
                  alt={chemical.name}
                  className="h-full w-full object-contain grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110"
                />
                <div className="absolute bottom-6 left-6 flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-alkota-orange animate-pulse" />
                  <span className="font-ibm-plex-mono text-[9px] font-black uppercase tracking-[0.2em] text-alkota-black">Chemical formulation // verified</span>
                </div>
             </div>

             {/* Description Section */}
             <div className="mt-20 max-w-2xl">
                <h3 className="font-barlow-condensed text-3xl font-black text-alkota-black uppercase italic mb-8 border-b border-alkota-iron pb-4">
                   Product <span className="text-alkota-orange">Profile.</span>
                </h3>
                <div className="prose prose-invert max-w-none text-alkota-silver uppercase text-sm tracking-wider leading-relaxed">
                   {/* Rich text would be rendered here, using static fallback for now */}
                   <p className="mb-6">
                      {chemical.description?.[0]?.children?.[0]?.text || chemical.tagline}
                   </p>
                </div>

                <div className="mt-12 space-y-4">
                   {chemical.features?.map((feature: string, i: number) => (
                      <div key={i} className="flex items-center gap-4 border-l-4 border-alkota-orange bg-alkota-steel/30 p-4">
                         <CheckCircle2 className="h-4 w-4 text-alkota-orange" />
                         <span className="font-barlow-condensed text-lg font-bold text-alkota-black uppercase italic">{feature}</span>
                      </div>
                   ))}
                </div>
             </div>
          </div>

          {/* Right Column: Specs & Options */}
          <div className="lg:col-span-5 lg:sticky lg:top-40">
             <div className="mb-6 flex items-center gap-3">
               <span className="font-ibm-plex-mono text-[10px] font-black uppercase tracking-[0.4em] text-alkota-orange">
                 {categoryName} Range
               </span>
               <div className="h-1 w-12 bg-alkota-iron" />
             </div>
             
             <h1 className="font-barlow-condensed mb-8 text-7xl font-black text-alkota-black md:text-8xl lg:text-9xl uppercase italic leading-[0.8] tracking-tighter">
               {chemical.name}
             </h1>
             
             <p className="font-inter mb-12 text-lg text-alkota-silver leading-relaxed uppercase tracking-wider">
               {chemical.tagline}
             </p>

             {/* Technical Matrix */}
             <div className="mb-12 border-y border-alkota-iron py-10 grid grid-cols-2 gap-8">
                <div>
                   <span className="block text-[8px] text-alkota-silver uppercase font-black tracking-widest mb-1">pH Classification</span>
                   <span className="font-barlow-condensed text-4xl font-black text-alkota-black italic">{chemical.specs?.phLevel || 'N/A'}</span>
                </div>
                <div>
                   <span className="block text-[8px] text-alkota-silver uppercase font-black tracking-widest mb-1">Dilution Strength</span>
                   <span className="font-barlow-condensed text-4xl font-black text-alkota-black italic">{chemical.specs?.dilutionRatio || 'N/A'}</span>
                </div>
                <div>
                   <span className="block text-[8px] text-alkota-silver uppercase font-black tracking-widest mb-1">Biodegradable</span>
                   <span className="font-barlow-condensed text-4xl font-black text-alkota-orange italic">{chemical.specs?.isBiodegradable ? 'YES' : 'NO'}</span>
                </div>
                <div>
                   <span className="block text-[8px] text-alkota-silver uppercase font-black tracking-widest mb-1">Product Color</span>
                   <span className="font-barlow-condensed text-4xl font-black text-alkota-black italic">{chemical.specs?.color || 'Clear'}</span>
                </div>
             </div>

             {/* Size Selector placeholder */}
             <div className="mb-12">
                <h4 className="font-ibm-plex-mono text-[10px] font-black uppercase tracking-[0.2em] text-alkota-silver mb-4">Availability & Packaging</h4>
                <div className="flex flex-wrap gap-2">
                   {chemical.variants?.map((v: any, i: number) => (
                      <button 
                        key={i} 
                        className={`border border-alkota-iron px-6 py-4 text-[10px] font-black uppercase tracking-widest transition-all ${i === 0 ? 'bg-alkota-black text-white' : 'bg-white text-alkota-black hover:border-alkota-orange'}`}
                      >
                         {v.size} — £{v.price}
                      </button>
                   ))}
                </div>
             </div>

             <div className="flex flex-col gap-4">
                <button className="flex items-center justify-center gap-4 bg-alkota-black p-6 text-xs font-black uppercase tracking-[0.3em] text-white hover:bg-alkota-orange transition-all group">
                   Add to Account Order
                   <ArrowRight className="h-4 w-4 transform group-hover:translate-x-2 transition-transform" />
                </button>
                <div className="grid grid-cols-2 gap-4">
                   <a 
                     href={chemical.sdsUrl || '#'} 
                     target="_blank"
                     className="flex items-center justify-center gap-3 border border-alkota-iron p-4 text-[9px] font-black uppercase tracking-widest text-alkota-black hover:border-alkota-orange transition-colors"
                   >
                      <FileText className="h-3 w-3" /> Safety Data (SDS)
                   </a>
                   <a 
                     href={chemical.techSheetUrl || '#'} 
                     target="_blank"
                     className="flex items-center justify-center gap-3 border border-alkota-iron p-4 text-[9px] font-black uppercase tracking-widest text-alkota-black hover:border-alkota-orange transition-colors"
                   >
                      <Info className="h-3 w-3" /> Tech Specification
                   </a>
                </div>
             </div>
          </div>
        </div>

        {/* Action Section */}
        <section className="mt-60 py-40 border-t border-alkota-iron">
           <div className="flex flex-col md:flex-row items-center justify-between gap-12 bg-alkota-black p-12 lg:p-24 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-1/4 h-full bg-alkota-orange opacity-10 skew-x-12 translate-x-1/2" />
              <div className="relative z-10 max-w-2xl">
                 <h2 className="font-barlow-condensed text-5xl font-black text-white uppercase italic tracking-tighter md:text-7xl leading-[0.8] mb-8">
                    NEED BULK <br />
                    <span className="text-alkota-orange">DISTRIBUTION?</span>
                 </h2>
                 <p className="font-inter text-sm text-alkota-smoke uppercase tracking-widest leading-relaxed">
                    Hydrus formulated chemicals are available in 1000L IBCs and bulk refill for high-volume operational facilities. Contact our logistical team for pallet rates and recurring delivery schedules.
                 </p>
              </div>
              <Link 
                href="/contact" 
                className="relative z-10 bg-white px-12 py-6 text-[11px] font-black uppercase tracking-[0.4em] text-alkota-black hover:bg-alkota-orange hover:text-white transition-all shrink-0"
              >
                 Request Bulk Pricing
              </Link>
           </div>
        </section>
      </div>
    </main>
  );
}
