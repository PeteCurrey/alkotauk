import { supabaseAdmin } from '@/lib/supabase/server';
import Link from 'next/link';
import { 
  Flame, Waves, Wind, Truck, Wrench, Droplets, 
  SunMedium, Zap, Factory, ArrowRight, ExternalLink, Plus, Tag
} from 'lucide-react';
import { CANONICAL_CATEGORIES } from '@/lib/products';

export const revalidate = 0;

const CATEGORY_ICONS: Record<string, any> = {
  'hot-water': Flame,
  'cold-water': Waves,
  'steam': Wind,
  'trailer': Truck,
  'parts-washer': Wrench,
  'water-treatment': Droplets,
  'space-heater': SunMedium,
  'water-heater': Zap,
  'wash-plant': Factory,
};

export default async function AdminCategoriesPage() {
  // Query product counts per category from database
  const { data: products } = await supabaseAdmin
    .from('products')
    .select('id, category, active');

  const allProducts = products || [];
  const categoryCounts: Record<string, { total: number; active: number }> = {};

  allProducts.forEach((p: any) => {
    const cat = p.category;
    if (!categoryCounts[cat]) {
      categoryCounts[cat] = { total: 0, active: 0 };
    }
    categoryCounts[cat].total += 1;
    if (p.active) categoryCounts[cat].active += 1;
  });

  const categories = Object.entries(CANONICAL_CATEGORIES).map(([slug, info]) => ({
    slug,
    name: info.name,
    tagline: info.tagline,
    description: info.description,
    total: categoryCounts[slug]?.total || 0,
    active: categoryCounts[slug]?.active || 0,
    icon: CATEGORY_ICONS[slug] || Tag,
  }));

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-barlow-condensed text-4xl font-black uppercase italic text-white">Store Categories</h1>
          <p className="font-ibm-plex-mono text-[10px] text-[#777] uppercase tracking-widest mt-1">
            // {categories.length} industrial store categories · {allProducts.length} linked machines
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 bg-[#FF6900] px-5 py-2.5 font-ibm-plex-mono text-[10px] font-black uppercase tracking-widest text-white hover:bg-[#e55f00] transition-colors shadow-lg shadow-orange-950/20"
        >
          <Plus className="h-4 w-4" /> Add Product
        </Link>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="border border-[#222] bg-[#141414] p-5">
          <p className="font-ibm-plex-mono text-[9px] text-[#777] uppercase tracking-widest">Active Categories</p>
          <p className="font-barlow-condensed text-4xl font-black text-white mt-1">{categories.length}</p>
          <p className="font-inter text-xs text-[#555] mt-1">Directly wired to front-end taxonomy</p>
        </div>
        <div className="border border-[#222] bg-[#141414] p-5">
          <p className="font-ibm-plex-mono text-[9px] text-alkota-orange uppercase tracking-widest font-bold">Total Products</p>
          <p className="font-barlow-condensed text-4xl font-black text-white mt-1">{allProducts.length}</p>
          <p className="font-inter text-xs text-[#555] mt-1">{allProducts.filter((p: any) => p.active).length} live across categories</p>
        </div>
        <div className="border border-[#222] bg-[#141414] p-5">
          <p className="font-ibm-plex-mono text-[9px] text-[#22C55E] uppercase tracking-widest">Pricing Protocol</p>
          <p className="font-barlow-condensed text-3xl font-black text-[#22C55E] mt-1">Request Pricing</p>
          <p className="font-inter text-xs text-[#555] mt-1">Configured for bespoke commercial quotations</p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const liveUrl = `/machines/${cat.slug}`;
          const adminUrl = `/admin/products?category=${cat.slug}`;

          return (
            <div
              key={cat.slug}
              className="border border-[#222] bg-[#141414] p-6 flex flex-col justify-between hover:border-[#333] transition-colors group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 bg-[#1C1C1C] border border-[#2A2A2A] flex items-center justify-center text-[#FF6900]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-ibm-plex-mono text-[10px] px-2.5 py-1 bg-[#1C1C1C] border border-[#2A2A2A] text-white">
                    {cat.total} {cat.total === 1 ? 'product' : 'products'}
                  </span>
                </div>

                <h3 className="font-barlow-condensed text-2xl font-black uppercase italic text-white group-hover:text-[#FF6900] transition-colors mb-1">
                  {cat.name}
                </h3>
                <p className="font-ibm-plex-mono text-[10px] text-[#FF6900] uppercase tracking-wider mb-3">
                  {cat.tagline}
                </p>
                <p className="font-inter text-xs text-[#888] leading-relaxed mb-6">
                  {cat.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#1F1F1F] flex items-center justify-between font-ibm-plex-mono text-[10px] uppercase tracking-widest">
                <Link
                  href={adminUrl}
                  className="text-white hover:text-[#FF6900] flex items-center gap-1.5 transition-colors"
                >
                  Manage Products <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href={liveUrl}
                  target="_blank"
                  className="text-[#666] hover:text-white flex items-center gap-1 transition-colors"
                >
                  Store Page <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
