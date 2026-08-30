import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getSupabaseAdmin } from '@/lib/supabase/server';
import { Package, Search, Filter, ArrowRight, ShieldCheck } from 'lucide-react';

export default async function DealerPartsCataloguePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect('/dealer/login');

  const { q: searchQuery, category: selectedCategory } = await searchParams;
  const db = getSupabaseAdmin();

  let query = db
    .from('parts')
    .select('*')
    .order('name')
    .limit(40);

  if (searchQuery) {
    query = query.or(`name.ilike.%${searchQuery}%,part_number.ilike.%${searchQuery}%,sku.ilike.%${searchQuery}%`);
  }
  if (selectedCategory) {
    query = query.eq('category', selectedCategory);
  }

  const { data: parts } = await query;
  const partsList = parts || [];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E8E4] pb-5">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-alkota-orange block mb-1">
            Genuine Components
          </span>
          <h1 className="text-3xl font-extralight text-alkota-black tracking-tight">
            Parts Catalogue
          </h1>
          <p className="text-xs text-alkota-silver mt-1">
            Browse genuine Alkota spares, pump components, coils, burner parts and accessories with tier pricing.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <form method="GET" className="flex items-center gap-3">
        <div className="flex-1 flex items-center gap-2 bg-white border border-[#E8E8E4] px-4 py-2.5">
          <Search className="h-4 w-4 text-alkota-silver shrink-0" />
          <input
            type="text"
            name="q"
            defaultValue={searchQuery || ''}
            placeholder="Search by part name, SKU, MPN or part number (e.g. TS2021, Packing Kit, Coil)..."
            className="w-full bg-transparent text-xs text-alkota-black placeholder-alkota-silver outline-none"
          />
        </div>
        <button
          type="submit"
          className="bg-alkota-orange hover:bg-alkota-orange-hover text-white px-6 py-2.5 text-xs uppercase tracking-widest transition-colors shrink-0"
        >
          Search
        </button>
      </form>

      {/* Parts Table */}
      {partsList.length === 0 ? (
        <div className="bg-white border border-[#E8E8E4] p-16 text-center">
          <Package className="h-10 w-10 text-alkota-iron mx-auto mb-3" />
          <h3 className="text-base font-light text-alkota-black mb-1">No Parts Found</h3>
          <p className="text-xs text-alkota-silver max-w-sm mx-auto">
            {searchQuery
              ? `No parts matched "${searchQuery}". Try a different part number or component keyword.`
              : 'The parts catalogue is currently being synchronised.'}
          </p>
        </div>
      ) : (
        <div className="bg-white border border-[#E8E8E4] divide-y divide-[#E8E8E4]">
          <div className="px-6 py-3 bg-[#FAF9F5] text-[10px] uppercase tracking-widest text-alkota-silver grid grid-cols-12 gap-4">
            <span className="col-span-5">Part Description</span>
            <span className="col-span-3">Part Number / SKU</span>
            <span className="col-span-2">Stock</span>
            <span className="col-span-2 text-right">Dealer Price</span>
          </div>
          {partsList.map((part: any) => {
            const price = part.trade_price || part.price || part.cost_price || 0;
            return (
              <div
                key={part.id}
                className="px-6 py-4 grid grid-cols-12 gap-4 items-center text-xs text-alkota-black hover:bg-[#FAF9F5] transition-colors"
              >
                <div className="col-span-5">
                  <p className="font-light text-alkota-black text-sm">{part.name}</p>
                  {part.description && (
                    <p className="text-[11px] text-alkota-silver truncate">{part.description}</p>
                  )}
                </div>
                <div className="col-span-3 font-mono text-[11px] text-alkota-silver">
                  <span>{part.part_number || part.sku || 'OEM'}</span>
                  {part.mpn && <span className="block text-[10px] text-alkota-iron">MPN: {part.mpn}</span>}
                </div>
                <div className="col-span-2">
                  <span className="text-[10px] px-2 py-0.5 border border-emerald-200 bg-emerald-50 text-emerald-700">
                    {part.stock_quantity !== undefined ? `${part.stock_quantity} in stock` : 'Available'}
                  </span>
                </div>
                <div className="col-span-2 text-right">
                  <span className="text-sm font-medium text-alkota-black">
                    £{Number(price).toFixed(2)}
                  </span>
                  {part.rrp_price && (
                    <span className="block text-[10px] text-alkota-silver line-through">
                      RRP £{Number(part.rrp_price).toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
