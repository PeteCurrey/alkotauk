import { Metadata } from 'next';
import { supabaseAdmin } from '@/lib/supabase/server';
import PartCard from '@/components/PartCard';
import SectionHeading from '@/components/SectionHeading';
import Navigation from '@/components/Navigation';
import { generateSeo } from '@/lib/seo';
import Breadcrumbs from '@/components/Breadcrumbs';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return generateSeo({
    title: 'Parts & Consumables',
    description: 'Industrial-grade spares and accessories for Alkota pressure washers. Hoses, nozzles, detergents and more.',
  });
}

async function getParts() {
  const { data, error } = await supabaseAdmin
    .from('parts')
    .select('*')
    .eq('active', true)
    .order('sort_order', { ascending: true });

  if (error || !data) {
    if (error) console.error('Error fetching parts:', error);
    return [];
  }

  const parts = data;

  // Map to the structure expected by PartCard
  return parts.map(p => ({
    _id: p.id,
    name: p.name,
    sku: p.part_number,
    slug: { current: p.part_number }, // Using part_number as slug for now
    price: p.price,
    category: p.category,
    image: null, // Placeholders
    description: p.description
  }));
}

export default async function ShopPage() {
  const parts = await getParts();

  const categories = Array.from(new Set(parts.map((p: any) => p.category))).filter(Boolean);

  return (
    <main className="min-h-screen bg-alkota-black pt-20">
      <Navigation />
      
      {/* Hero Header */}
      <section className="relative border-b border-alkota-iron bg-alkota-steel/20 py-16">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs items={[{ label: 'Parts & Consumables' }]} />
        </div>
        <div className="container mx-auto px-4 text-left items-start pb-8">
          <SectionHeading 
            title="Parts & Consumables" 
            subtitle="Industrial-grade spares and accessories to keep your Alkota running at peak performance."
            align="left"
          />
          
          <div className="mt-8 flex flex-wrap gap-2">
            <button className="rounded-full bg-alkota-orange px-6 py-2 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-alkota-orange-bright">
              All Parts
            </button>
            {categories.map((cat: any) => (
              <button 
                key={cat}
                className="rounded-full border border-alkota-iron bg-alkota-black px-6 py-2 text-xs font-bold uppercase tracking-widest text-secondary transition-all hover:border-alkota-orange hover:text-white"
              >
                {cat as string}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          {parts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {parts.map((part: any) => (
                <PartCard key={part._id} part={part} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="text-xl text-secondary">The shop is currently being stocked.</p>
              <p className="text-sm text-alkota-iron mt-2">Check back soon for industrial parts and consumables.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
