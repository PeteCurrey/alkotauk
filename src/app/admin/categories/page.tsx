import { supabaseAdmin } from '@/lib/supabase/server';
import Link from 'next/link';
import { 
  Flame, Waves, Wind, Truck, Wrench, Droplets, 
  SunMedium, Zap, Factory, ArrowRight, ExternalLink, Plus, Tag, Layers
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
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">Store Categories</h1>
          <p className="text-sm font-medium text-[#64748B] mt-1">
            {categories.length} industrial store categories · {allProducts.length} linked machine configurations
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products/new"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FF6900] text-white text-xs font-bold hover:bg-[#e55f00] transition-colors shadow-sm"
          >
            <Plus className="h-4 w-4" /> Add Product
          </Link>
        </div>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white rounded-[24px] border border-[#E6E8EC] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
          <p className="text-xs font-bold uppercase tracking-wider text-[#64748B]">Active Categories</p>
          <p className="text-4xl font-extrabold text-[#0F172A] mt-2">{categories.length}</p>
          <p className="text-xs text-[#94A3B8] mt-1 font-medium">Mapped to public store taxonomy</p>
        </div>
        <div className="bg-white rounded-[24px] border border-[#E6E8EC] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
          <p className="text-xs font-bold uppercase tracking-wider text-[#FF6900]">Total Machines</p>
          <p className="text-4xl font-extrabold text-[#0F172A] mt-2">{allProducts.length}</p>
          <p className="text-xs text-[#94A3B8] mt-1 font-medium">{allProducts.filter((p: any) => p.active).length} live across categories</p>
        </div>
        <div className="bg-white rounded-[24px] border border-[#E6E8EC] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">Pricing Protocol</p>
          <p className="text-3xl font-extrabold text-emerald-600 mt-2">Request Pricing</p>
          <p className="text-xs text-[#94A3B8] mt-1 font-medium">Configured for bespoke commercial quotes</p>
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
              className="bg-white rounded-[24px] border border-[#E6E8EC] p-7 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:border-[#CBD5E1] transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="h-12 w-12 rounded-2xl bg-[#F6F7F9] border border-[#E6E8EC] flex items-center justify-center text-[#FF6900] shadow-sm">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#F1F3F7] text-xs font-bold text-[#0F172A]">
                    {cat.total} {cat.total === 1 ? 'model' : 'models'}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#0F172A] group-hover:text-[#FF6900] transition-colors mb-1">
                  {cat.name}
                </h3>
                <p className="text-xs font-semibold text-[#FF6900] tracking-wide mb-3">
                  {cat.tagline}
                </p>
                <p className="text-xs text-[#64748B] leading-relaxed mb-6 font-medium">
                  {cat.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#F0F2F5] flex items-center justify-between">
                <Link
                  href={adminUrl}
                  className="px-4 py-2 rounded-full bg-[#F6F7F9] hover:bg-[#111] hover:text-white text-xs font-bold text-[#334155] transition-all flex items-center gap-1.5"
                >
                  Manage Products <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href={liveUrl}
                  target="_blank"
                  className="text-xs font-semibold text-[#94A3B8] hover:text-[#0F172A] flex items-center gap-1 transition-colors"
                >
                  Storefront <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

