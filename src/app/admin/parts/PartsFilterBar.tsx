'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback, useTransition, useRef } from 'react';
import { Search, X, ChevronDown, SlidersHorizontal } from 'lucide-react';

interface FiltersProps {
  categories: { slug: string; name: string }[];
  brands: { slug: string; name: string }[];
  totalCount: number;
}

const selectClass =
  'bg-white border border-[#CBD5E1] rounded-[5px] pl-3 pr-8 py-2 text-xs text-[#0F172A] focus:outline-none focus:border-[#FF6900] appearance-none cursor-pointer min-w-0';

export default function PartsFilterBar({ categories, brands, totalCount }: FiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const searchRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);

  const current = {
    q: sp.get('q') || '',
    category: sp.get('category') || 'all',
    brand: sp.get('brand') || 'all',
    stock_status: sp.get('stock_status') || 'all',
    price_status: sp.get('price_status') || 'all',
    review_status: sp.get('review_status') || 'all',
    sort: sp.get('sort') || 'part_number_asc',
    pageSize: sp.get('pageSize') || '50',
  };

  const push = useCallback(
    (overrides: Record<string, string>) => {
      const params = new URLSearchParams(sp.toString());
      for (const [k, v] of Object.entries(overrides)) {
        if (!v || v === 'all' || v === '') {
          params.delete(k);
        } else {
          params.set(k, v);
        }
      }
      // Reset to page 1 whenever filters change
      if (!('page' in overrides)) params.delete('page');
      startTransition(() => router.push(`${pathname}?${params.toString()}`));
    },
    [sp, pathname, router]
  );

  function handleSearch(val: string) {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      push({ q: val });
    }, 350);
  }

  const hasActiveFilters =
    current.q ||
    current.category !== 'all' ||
    current.brand !== 'all' ||
    current.stock_status !== 'all' ||
    current.price_status !== 'all' ||
    current.review_status !== 'all';

  function clearAll() {
    if (searchRef.current) searchRef.current.value = '';
    push({ q: '', category: '', brand: '', stock_status: '', price_status: '', review_status: '' });
  }

  return (
    <div className={`bg-white border border-[#E2E4E8] rounded-[6px] shadow-tactile-sm transition-opacity ${isPending ? 'opacity-60 pointer-events-none' : ''}`}>
      {/* Top row: search + primary filters */}
      <div className="flex flex-wrap items-center gap-3 p-4">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="w-3.5 h-3.5 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            ref={searchRef}
            type="text"
            defaultValue={current.q}
            placeholder="SKU, part number, MPN, name…"
            onChange={e => handleSearch(e.target.value)}
            className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-[5px] pl-9 pr-4 py-2 text-xs text-[#0F172A] focus:outline-none focus:border-[#FF6900] transition-colors"
          />
        </div>

        {/* Category */}
        <div className="relative">
          <select
            value={current.category}
            onChange={e => push({ category: e.target.value })}
            className={selectClass}
          >
            <option value="all">All Categories</option>
            {categories.map(c => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>
          <ChevronDown className="w-3 h-3 text-[#94A3B8] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Brand */}
        <div className="relative">
          <select
            value={current.brand}
            onChange={e => push({ brand: e.target.value })}
            className={selectClass}
          >
            <option value="all">All Brands</option>
            {brands.map(b => (
              <option key={b.slug} value={b.slug}>{b.name}</option>
            ))}
          </select>
          <ChevronDown className="w-3 h-3 text-[#94A3B8] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Stock status */}
        <div className="relative">
          <select
            value={current.stock_status}
            onChange={e => push({ stock_status: e.target.value })}
            className={selectClass}
          >
            <option value="all">All Stock</option>
            <option value="in_stock">In Stock</option>
            <option value="out_of_stock">Out of Stock</option>
            <option value="check_availability">Check Availability</option>
            <option value="special_order">Special Order</option>
          </select>
          <ChevronDown className="w-3 h-3 text-[#94A3B8] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Price status */}
        <div className="relative">
          <select
            value={current.price_status}
            onChange={e => push({ price_status: e.target.value })}
            className={selectClass}
          >
            <option value="all">All Pricing</option>
            <option value="priced">Priced (Ecommerce)</option>
            <option value="poa">POA / Unpriced</option>
          </select>
          <ChevronDown className="w-3 h-3 text-[#94A3B8] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Review status */}
        <div className="relative">
          <select
            value={current.review_status}
            onChange={e => push({ review_status: e.target.value })}
            className={selectClass}
          >
            <option value="all">Any Review State</option>
            <option value="needs_review">Needs Review</option>
            <option value="reviewed">Reviewed / Verified</option>
          </select>
          <ChevronDown className="w-3 h-3 text-[#94A3B8] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Clear */}
        {hasActiveFilters && (
          <button
            onClick={clearAll}
            className="flex items-center gap-1 px-3 py-2 bg-[#FFF0E6] hover:bg-[#FFE0CC] text-[#FF6900] text-xs font-semibold rounded-[4px] transition-colors"
          >
            <X className="w-3 h-3" /> Clear filters
          </button>
        )}
      </div>

      {/* Bottom row: active filter pills + sort + page size */}
      <div className="flex flex-wrap items-center gap-2 px-4 pb-3 pt-0 border-t border-[#F1F3F7]">
        <SlidersHorizontal className="w-3 h-3 text-[#94A3B8] shrink-0" />
        <span className="text-[11px] text-[#94A3B8]">
          {isPending ? 'Loading…' : `${totalCount.toLocaleString()} parts`}
        </span>

        <div className="ml-auto flex items-center gap-2">
          {/* Sort */}
          <div className="relative">
            <select
              value={current.sort}
              onChange={e => push({ sort: e.target.value })}
              className={`${selectClass} text-[11px]`}
            >
              <option value="part_number_asc">Part # A→Z</option>
              <option value="part_number_desc">Part # Z→A</option>
              <option value="name_asc">Name A→Z</option>
              <option value="price_asc">Price Low→High</option>
              <option value="price_desc">Price High→Low</option>
              <option value="quality_asc">Quality Score ↑</option>
              <option value="updated_desc">Recently Updated</option>
            </select>
            <ChevronDown className="w-3 h-3 text-[#94A3B8] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Page size */}
          <div className="relative">
            <select
              value={current.pageSize}
              onChange={e => push({ pageSize: e.target.value, page: '1' })}
              className={`${selectClass} text-[11px]`}
            >
              <option value="25">25 / page</option>
              <option value="50">50 / page</option>
              <option value="100">100 / page</option>
            </select>
            <ChevronDown className="w-3 h-3 text-[#94A3B8] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
