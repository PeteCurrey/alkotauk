import { supabaseAdmin } from '@/lib/supabase/server';
import Navigation from '@/components/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import { ShoppingBasket, ShieldCheck, CheckCircle2, ChevronLeft, Beaker } from 'lucide-react';
import Link from 'next/link';

interface ChemicalsCategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export default async function ChemicalsCategoryPage({ params }: ChemicalsCategoryPageProps) {
  const resolvedParams = await params;
  const categorySlug = resolvedParams.category;
  const categoryName = categorySlug.replace(/-/g, ' ');

  // Fetch chemicals for this category from Supabase
  const { data: chemicals = [] } = await supabaseAdmin
    .from('chemicals')
    .select('*')
    .eq('category', categorySlug)
    .eq('active', true)
    .order('sort_order');

  const categoryDescriptions: Record<string, string> = {
    "degreasers": "Industrial strength degreasers designed for plant, machinery, heavy transport and workshop floor cleaning. Powerful alkaline formulations that turn oils into soap.",
    "auto-truck-wash": "Alkota vehicle soaps are engineered to penetrate road film and carbon without damaging paint finish. Formulation is safe for all automotive surfaces.",
    "parts-washer": "Specialized low-foaming, biodegradable detergents for automatic parts washers and soak tanks. All formulations contain multi-metal corrosion inhibitors.",
  };

  const currentDesc = categoryDescriptions[categorySlug] || `Professional ${categoryName} detergents formulated for industrial cleaning applications. Engineering grade quality.`;

  return (
    <main className="min-h-screen bg-alkota-bg pt-32 pb-0">
      <Navigation />
      
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="relative z-10">
          <Breadcrumbs items={[
            { label: 'Chemicals', href: '/chemicals' },
            { label: categoryName }
          ]} />
          
          <header className="mb-24 mt-12 max-w-5xl">
            <Link 
              href="/chemicals" 
              className="mb-8 inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-alkota-silver hover:text-alkota-orange transition-colors"
            >
               <ChevronLeft className="h-3 w-3" /> Back to All Chemicals
            </Link>
            <div className="mb-8 flex items-center gap-4">
              <div className="h-[2px] w-12 bg-alkota-orange" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-alkota-orange">
                Industrial Specification
              </span>
            </div>
            <h1 className="font-barlow-condensed mb-10 text-7xl font-black text-alkota-black md:text-9xl uppercase italic leading-[0.8] tracking-tighter">
              {categoryName} <br />
              <span className="text-alkota-orange [text-stroke:1px_rgba(0,0,0,0.1)]">SOLUTIONS.</span>
            </h1>
            <p className="font-inter max-w-3xl text-lg text-alkota-silver leading-relaxed uppercase tracking-wider">
              {currentDesc}
            </p>
          </header>

          <section className="mb-40">
             {chemicals.length > 0 ? (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-alkota-iron border border-alkota-iron">
                  {chemicals.map((item: any, i: number) => (
                    <Link 
                      key={item.id} 
                      href={`/chemicals/${categorySlug}/${item.slug}`}
                      className="bg-white p-10 flex flex-col group hover:bg-alkota-bg transition-colors no-underline border-b border-alkota-iron lg:border-none"
                    >
                       <div className="mb-8 flex items-start justify-between">
                          <h4 className="font-barlow-condensed text-4xl font-black text-alkota-black uppercase italic group-hover:text-alkota-orange transition-colors">
                            {item.name}
                          </h4>
                          <Beaker className="h-5 w-5 text-alkota-orange" />
                       </div>
                       <p className="font-inter text-[10px] text-alkota-silver uppercase tracking-wider leading-relaxed flex-1 mb-10">
                         {item.tagline}
                       </p>
                       
                           <div className="border-l border-alkota-iron pl-4">
                              <span className="block text-[8px] text-alkota-silver uppercase font-black tracking-widest mb-1">pH Level</span>
                              <span className="font-barlow-condensed text-xl font-black text-alkota-black italic">--</span>
                           </div>
                           <div className="border-l border-alkota-iron pl-4">
                              <span className="block text-[8px] text-alkota-silver uppercase font-black tracking-widest mb-1">Sizes</span>
                              <span className="font-barlow-condensed text-xl font-black text-alkota-black italic">{item.available_sizes?.length || 0} Options</span>
                           </div>

                       <div className="mt-auto border border-alkota-iron p-5 flex items-center justify-center gap-4 text-[11px] font-black uppercase tracking-widest text-alkota-black group-hover:bg-alkota-orange group-hover:text-white transition-all">
                          View Specification <ShieldCheck className="h-4 w-4" />
                       </div>
                    </Link>
                  ))}
               </div>
             ) : (
               <div className="py-40 text-center border border-alkota-iron bg-white">
                  <p className="font-ibm-plex-mono text-[10px] text-alkota-silver uppercase tracking-[0.2em]">Range coming soon. Contact for bulk orders.</p>
                  <Link href="/contact" className="mt-8 inline-block text-[11px] font-black uppercase tracking-widest text-alkota-orange hover:text-white transition-colors">Contact Enquiries →</Link>
               </div>
             )}
          </section>
        </div>
      </div>
    </main>
  );
}
