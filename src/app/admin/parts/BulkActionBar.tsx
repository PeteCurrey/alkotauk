'use client';

import { useState, useTransition } from 'react';
import { X, Tag, Layers, Package, ShieldAlert, ToggleLeft, ArchiveX, TrendingUp, Download, Loader2, ChevronDown } from 'lucide-react';

interface Category {
  slug: string;
  name: string;
}

interface Brand {
  slug: string;
  name: string;
}

interface Props {
  selectedIds: string[];
  onClear: () => void;
  categories: Category[];
  brands: Brand[];
  onActionComplete: () => void;
}

type Action = 'set_category' | 'set_brand' | 'set_stock_status' | 'set_review_status' | 'set_active_status' | 'bulk_archive' | 'price_adjustment' | 'export_csv';

export default function BulkActionBar({ selectedIds, onClear, categories, brands, onActionComplete }: Props) {
  const [isPending, startTransition] = useTransition();
  const [activeAction, setActiveAction] = useState<Action | null>(null);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Form state for each action
  const [categoryVal, setCategoryVal] = useState('');
  const [subcategoryVal, setSubcategoryVal] = useState('');
  const [brandVal, setBrandVal] = useState('');
  const [stockStatus, setStockStatus] = useState('in_stock');
  const [stockType, setStockType] = useState('direct_stock');
  const [inStock, setInStock] = useState(true);
  const [reviewStatus, setReviewStatus] = useState<boolean>(false);
  const [activeStatus, setActiveStatus] = useState<boolean>(true);
  const [markupType, setMarkupType] = useState<'margin_on_cost' | 'percent_on_retail' | 'fixed_price'>('margin_on_cost');
  const [markupValue, setMarkupValue] = useState('');
  const [vatRate, setVatRate] = useState('');

  if (selectedIds.length === 0) return null;

  async function executeAction(action: Action, payload: Record<string, any>) {
    setFeedback(null);
    startTransition(async () => {
      try {
        const res = await fetch('/api/admin/parts/bulk', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ids: selectedIds, action, payload }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Action failed');
        setFeedback({ type: 'success', message: `✓ Updated ${data.updated} of ${data.total} parts.` });
        setActiveAction(null);
        onActionComplete();
      } catch (err: any) {
        setFeedback({ type: 'error', message: err.message });
      }
    });
  }

  function exportCSV() {
    const params = new URLSearchParams({ ids: selectedIds.join(',') });
    window.open(`/api/admin/parts/export?${params.toString()}`, '_blank');
    setActiveAction(null);
  }

  const inputClass = 'bg-white border border-[#CBD5E1] rounded-[4px] px-3 py-1.5 text-xs text-[#0F172A] focus:outline-none focus:border-[#FF6900]';
  const selectClass = `${inputClass} appearance-none pr-8 cursor-pointer`;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4">
      <div className="bg-[#0F172A] border border-[#1E293B] rounded-[6px] shadow-[0_8px_32px_rgba(0,0,0,0.45)] overflow-hidden">
        {/* Main action bar */}
        <div className="flex flex-wrap items-center gap-2 px-4 py-3">
          {/* Selection count */}
          <div className="flex items-center gap-2 mr-2">
            <span className="inline-flex items-center justify-center h-6 w-6 rounded-[3px] bg-[#FF6900] text-white text-xs font-bold">
              {selectedIds.length}
            </span>
            <span className="text-white text-xs font-medium">
              part{selectedIds.length !== 1 ? 's' : ''} selected
            </span>
          </div>

          <div className="h-4 w-px bg-[#334155] mx-1" />

          {/* Action buttons */}
          {[
            { action: 'set_category' as Action, icon: Layers, label: 'Category' },
            { action: 'set_brand' as Action, icon: Tag, label: 'Brand' },
            { action: 'set_stock_status' as Action, icon: Package, label: 'Stock' },
            { action: 'set_review_status' as Action, icon: ShieldAlert, label: 'Review' },
            { action: 'set_active_status' as Action, icon: ToggleLeft, label: 'Status' },
            { action: 'price_adjustment' as Action, icon: TrendingUp, label: 'Pricing' },
            { action: 'bulk_archive' as Action, icon: ArchiveX, label: 'Archive' },
          ].map(({ action, icon: Icon, label }) => (
            <button
              key={action}
              onClick={() => setActiveAction(activeAction === action ? null : action)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] text-xs font-medium transition-all ${
                activeAction === action
                  ? 'bg-[#FF6900] text-white'
                  : action === 'bulk_archive'
                  ? 'bg-red-900/40 text-red-300 hover:bg-red-900/60'
                  : 'bg-[#1E293B] text-[#CBD5E1] hover:bg-[#334155] hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
              {activeAction === action ? null : <ChevronDown className="w-3 h-3 opacity-50" />}
            </button>
          ))}

          {/* Export */}
          <button
            onClick={exportCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] text-xs font-medium bg-[#1E293B] text-[#CBD5E1] hover:bg-[#334155] hover:text-white transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            Export
          </button>

          <div className="ml-auto">
            <button
              onClick={() => { setActiveAction(null); setFeedback(null); onClear(); }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] text-xs text-[#64748B] hover:text-white transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              Clear
            </button>
          </div>
        </div>

        {/* Feedback */}
        {feedback && (
          <div className={`px-4 py-2 text-xs font-medium border-t border-[#1E293B] ${
            feedback.type === 'success' ? 'text-green-400' : 'text-red-400'
          }`}>
            {feedback.message}
          </div>
        )}

        {/* Expanded action panel */}
        {activeAction && activeAction !== 'export_csv' && (
          <div className="border-t border-[#1E293B] px-4 py-4 bg-[#0A0F1A]">
            {/* SET CATEGORY */}
            {activeAction === 'set_category' && (
              <div className="flex flex-wrap items-end gap-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#64748B] mb-1">Category</label>
                  <select value={categoryVal} onChange={e => setCategoryVal(e.target.value)} className={selectClass}>
                    <option value="">— Select —</option>
                    {categories.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#64748B] mb-1">Subcategory (optional)</label>
                  <input value={subcategoryVal} onChange={e => setSubcategoryVal(e.target.value)} placeholder="e.g. seal-kits" className={inputClass} />
                </div>
                <button
                  onClick={() => executeAction('set_category', { category: categoryVal, subcategory: subcategoryVal })}
                  disabled={!categoryVal || isPending}
                  className="px-4 py-1.5 bg-[#FF6900] text-white text-xs font-bold rounded-[4px] disabled:opacity-40"
                >
                  {isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Apply to All Selected'}
                </button>
              </div>
            )}

            {/* SET BRAND */}
            {activeAction === 'set_brand' && (
              <div className="flex flex-wrap items-end gap-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#64748B] mb-1">Brand Partner</label>
                  <select value={brandVal} onChange={e => setBrandVal(e.target.value)} className={selectClass}>
                    <option value="">— Select —</option>
                    {brands.map(b => <option key={b.slug} value={b.slug}>{b.name}</option>)}
                  </select>
                </div>
                <button
                  onClick={() => executeAction('set_brand', { brand: brandVal })}
                  disabled={!brandVal || isPending}
                  className="px-4 py-1.5 bg-[#FF6900] text-white text-xs font-bold rounded-[4px] disabled:opacity-40"
                >
                  {isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Apply to All Selected'}
                </button>
              </div>
            )}

            {/* SET STOCK STATUS */}
            {activeAction === 'set_stock_status' && (
              <div className="flex flex-wrap items-end gap-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#64748B] mb-1">Availability Status</label>
                  <select value={stockStatus} onChange={e => setStockStatus(e.target.value)} className={selectClass}>
                    <option value="in_stock">In Stock</option>
                    <option value="check_availability">Check Availability</option>
                    <option value="backorder">Backorder</option>
                    <option value="special_order">Special Order</option>
                    <option value="obsolete">Obsolete</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#64748B] mb-1">Stock Type</label>
                  <select value={stockType} onChange={e => setStockType(e.target.value)} className={selectClass}>
                    <option value="direct_stock">Direct Stock</option>
                    <option value="supplier_stock">Supplier Stock</option>
                    <option value="special_order">Special Order</option>
                    <option value="made_to_order">Made to Order</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#64748B] mb-1">In Stock Flag</label>
                  <select value={inStock ? 'true' : 'false'} onChange={e => setInStock(e.target.value === 'true')} className={selectClass}>
                    <option value="true">In Stock = TRUE</option>
                    <option value="false">In Stock = FALSE</option>
                  </select>
                </div>
                <button
                  onClick={() => executeAction('set_stock_status', { in_stock: inStock, availability_status: stockStatus, stock_type: stockType })}
                  disabled={isPending}
                  className="px-4 py-1.5 bg-[#FF6900] text-white text-xs font-bold rounded-[4px] disabled:opacity-40"
                >
                  {isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Apply to All Selected'}
                </button>
              </div>
            )}

            {/* SET REVIEW STATUS */}
            {activeAction === 'set_review_status' && (
              <div className="flex flex-wrap items-end gap-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#64748B] mb-1">Review State</label>
                  <select value={reviewStatus ? 'true' : 'false'} onChange={e => setReviewStatus(e.target.value === 'true')} className={selectClass}>
                    <option value="false">Mark as Reviewed / Verified</option>
                    <option value="true">Flag for Review</option>
                  </select>
                </div>
                <button
                  onClick={() => executeAction('set_review_status', { needs_review: reviewStatus })}
                  disabled={isPending}
                  className="px-4 py-1.5 bg-[#FF6900] text-white text-xs font-bold rounded-[4px] disabled:opacity-40"
                >
                  {isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Apply to All Selected'}
                </button>
              </div>
            )}

            {/* SET ACTIVE STATUS */}
            {activeAction === 'set_active_status' && (
              <div className="flex flex-wrap items-end gap-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#64748B] mb-1">Publish Status</label>
                  <select value={activeStatus ? 'true' : 'false'} onChange={e => setActiveStatus(e.target.value === 'true')} className={selectClass}>
                    <option value="true">Active — Live in Storefront</option>
                    <option value="false">Inactive — Hidden from Storefront</option>
                  </select>
                </div>
                <button
                  onClick={() => executeAction('set_active_status', { active: activeStatus })}
                  disabled={isPending}
                  className="px-4 py-1.5 bg-[#FF6900] text-white text-xs font-bold rounded-[4px] disabled:opacity-40"
                >
                  {isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Apply to All Selected'}
                </button>
              </div>
            )}

            {/* PRICE ADJUSTMENT */}
            {activeAction === 'price_adjustment' && (
              <div className="flex flex-wrap items-end gap-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#64748B] mb-1">Method</label>
                  <select value={markupType} onChange={e => setMarkupType(e.target.value as typeof markupType)} className={selectClass}>
                    <option value="margin_on_cost">Margin % on Cost Price (retail = cost ÷ (1-margin))</option>
                    <option value="percent_on_retail">% Change on Current Retail Price</option>
                    <option value="fixed_price">Set Fixed Price (£)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#64748B] mb-1">
                    {markupType === 'fixed_price' ? 'Price (£ ex. VAT)' : 'Percentage (%)'}
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={markupValue}
                    onChange={e => setMarkupValue(e.target.value)}
                    placeholder={markupType === 'fixed_price' ? '0.00' : '35.0'}
                    className={`${inputClass} w-28`}
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#64748B] mb-1">VAT Rate (optional)</label>
                  <select value={vatRate} onChange={e => setVatRate(e.target.value)} className={selectClass}>
                    <option value="">— No Change —</option>
                    <option value="0.20">20% Standard</option>
                    <option value="0.05">5% Reduced</option>
                    <option value="0.00">0% Zero Rated</option>
                  </select>
                </div>
                <div className="text-[11px] text-[#64748B] max-w-xs">
                  {markupType === 'margin_on_cost' && 'Only applies to parts with a cost price set.'}
                  {markupType === 'percent_on_retail' && 'Only applies to parts that already have a retail price.'}
                  {markupType === 'fixed_price' && 'Sets the same retail price on ALL selected parts.'}
                </div>
                <button
                  onClick={() => executeAction('price_adjustment', { markup_type: markupType, value: markupValue, vat_rate: vatRate || undefined })}
                  disabled={!markupValue || isPending}
                  className="px-4 py-1.5 bg-[#FF6900] text-white text-xs font-bold rounded-[4px] disabled:opacity-40"
                >
                  {isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Apply to All Selected'}
                </button>
              </div>
            )}

            {/* BULK ARCHIVE */}
            {activeAction === 'bulk_archive' && (
              <div className="flex flex-wrap items-center gap-4">
                <div className="text-sm text-red-300">
                  <span className="font-bold text-red-400">Warning:</span> This will deactivate{' '}
                  <span className="font-bold">{selectedIds.length}</span> part{selectedIds.length !== 1 ? 's' : ''}, set them to{' '}
                  <span className="font-mono">active = false</span>, <span className="font-mono">discontinued = true</span>, and{' '}
                  <span className="font-mono">availability_status = 'obsolete'</span>. This is reversible via individual edit.
                </div>
                <button
                  onClick={() => executeAction('bulk_archive', {})}
                  disabled={isPending}
                  className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-[4px] disabled:opacity-40"
                >
                  {isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : `Confirm Archive ${selectedIds.length} Parts`}
                </button>
                <button onClick={() => setActiveAction(null)} className="px-3 py-1.5 text-[#64748B] hover:text-white text-xs">
                  Cancel
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
