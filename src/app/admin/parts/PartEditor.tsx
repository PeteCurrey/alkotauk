'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Save, 
  X, 
  Plus, 
  Wrench, 
  DollarSign, 
  Package, 
  FileText, 
  Image as ImageIcon, 
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Globe,
  Cpu,
  Link2,
  Percent,
  History,
} from 'lucide-react';
import { PartCategoryAdmin, BrandPartner } from '@/lib/types/parts';
import { resolveProductAction, detectCommercialConflicts } from '@/lib/commerce/action-resolver';

const DEFAULT_CATEGORIES = [
  'pumps',
  'burners',
  'coils',
  'hoses',
  'trigger-guns',
  'lances-nozzles',
  'surface-cleaners',
  'valves-unloaders',
  'filters',
  'electrical-switches',
  'seals-o-rings',
  'service-kits',
  'fittings-couplers',
  'engines-motors',
  'attachments',
  'chemicals',
  'other'
];

const DEFAULT_BRANDS = [
  { slug: 'alkota', name: 'Alkota' },
  { slug: 'mosmatic', name: 'Mosmatic' },
  { slug: 'cox-reels', name: 'Cox Reels' },
  { slug: 'steel-eagle', name: 'Steel Eagle' },
  { slug: 'dual-pumps', name: 'Dual Pumps' },
  { slug: 'interpump', name: 'Interpump' },
  { slug: 'annovi-reverberi', name: 'Annovi Reverberi' },
  { slug: 'cat-pumps', name: 'CAT Pumps' },
  { slug: 'general-pump', name: 'General Pump' },
  { slug: 'nozzle-pro', name: 'Nozzle Pro' },
];

type TabId = 'general' | 'pricing' | 'inventory' | 'technical' | 'media' | 'compatibility' | 'seo' | 'quality' | 'provenance';

export default function PartEditor({ part }: { part?: any }) {
  const router = useRouter();
  const isEdit = !!part?.id;
  const [activeTab, setActiveTab] = useState<TabId>('general');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [machineInput, setMachineInput] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [reviewFlagInput, setReviewFlagInput] = useState('');
  const [replacementInput, setReplacementInput] = useState('');
  const [categories, setCategories] = useState<string[]>(DEFAULT_CATEGORIES);
  const [brands, setBrands] = useState<Array<{ slug: string; name: string }>>(DEFAULT_BRANDS);

  const [form, setForm] = useState({
    // General
    part_number: part?.part_number || '',
    sku: part?.sku || '',
    mpn: part?.mpn || '',
    name: part?.name || '',
    category: part?.category || 'pumps',
    subcategory: part?.subcategory || '',
    brand: part?.brand || 'alkota',
    manufacturer: part?.manufacturer || '',
    oem_genuine: part?.oem_genuine ?? true,
    is_attachment: part?.is_attachment ?? false,
    featured: part?.featured ?? false,
    active: part?.active ?? true,

    // Pricing
    price: part?.price !== undefined && part?.price !== null ? part.price : '',
    cost_price: part?.cost_price !== undefined && part?.cost_price !== null ? part.cost_price : '',
    trade_price: part?.trade_price !== undefined && part?.trade_price !== null ? part.trade_price : '',
    rrp_price: part?.rrp_price !== undefined && part?.rrp_price !== null ? part.rrp_price : '',
    margin_override_pct: part?.margin_override_pct || '',
    vat_rate: part?.vat_rate ?? 0.20,

    // Inventory
    availability_status: part?.availability_status || 'in_stock',
    stock_type: part?.stock_type || 'direct_stock',
    stock_quantity: part?.stock_quantity ?? 10,
    supplier_stock_qty: part?.supplier_stock_qty || '',
    lead_time_days: part?.lead_time_days ?? 1,
    in_stock: part?.in_stock ?? true,
    discontinued: part?.discontinued ?? false,

    // Technical & Specs
    description: part?.description || '',
    technical_notes: part?.technical_notes || '',
    dimensions_cm: part?.dimensions_cm || '',
    weight_kg: part?.weight_kg || '',
    compatible_machines: part?.compatible_machines || [] as string[],
    tags: part?.tags || [] as string[],

    // Media
    image_url: part?.image_url || '',

    // Compatibility & Supersession
    superseded_by: part?.superseded_by || '',
    replacement_part_ids: part?.replacement_part_ids || [] as string[],

    // Data Quality
    needs_review: part?.needs_review ?? false,
    review_flags: part?.review_flags || [] as string[],
    review_notes: part?.review_notes || '',
    data_quality_score: part?.data_quality_score ?? 100,
    catalogue_source: part?.catalogue_source || 'manual',
    catalogue_page: part?.catalogue_page || '',
    catalogue_section: part?.catalogue_section || '',

    // SEO
    meta_title: part?.meta_title || '',
    meta_description: part?.meta_description || '',

    // Provenance & Overrides
    source_type: part?.source_type || 'manual',
    source_url: part?.source_url || '',
    source_document: part?.source_document || '',
    source_reference: part?.source_reference || '',
    source_version: part?.source_version || '',
    publication_status: part?.publication_status || 'published',
    manual_override_fields: part?.manual_override_fields || [] as string[],
  });

  useEffect(() => {
    async function loadMeta() {
      try {
        const [cRes, bRes] = await Promise.all([
          fetch('/api/admin/parts/categories'),
          fetch('/api/admin/parts/brands')
        ]);
        if (cRes.ok) {
          const cData: PartCategoryAdmin[] = await cRes.json();
          if (Array.isArray(cData) && cData.length > 0) {
            setCategories(Array.from(new Set([...cData.map(c => c.slug), ...DEFAULT_CATEGORIES])));
          }
        }
        if (bRes.ok) {
          const bData: BrandPartner[] = await bRes.json();
          if (Array.isArray(bData) && bData.length > 0) {
            setBrands(bData.map(b => ({ slug: b.slug, name: b.name })));
          }
        }
      } catch (err) {
        console.error('Failed to load categories/brands in PartEditor', err);
      }
    }
    loadMeta();
  }, []);

  function set(key: string, val: any) { 
    setForm(f => ({ ...f, [key]: val })); 
  }

  function addMachine() {
    const v = machineInput.trim().toUpperCase();
    if (!v || form.compatible_machines.includes(v)) return;
    set('compatible_machines', [...form.compatible_machines, v]);
    setMachineInput('');
  }

  function removeMachine(m: string) { 
    set('compatible_machines', form.compatible_machines.filter((x: string) => x !== m)); 
  }

  function addTag() {
    const v = tagInput.trim().toLowerCase();
    if (!v || form.tags.includes(v)) return;
    set('tags', [...form.tags, v]);
    setTagInput('');
  }

  function removeTag(t: string) {
    set('tags', form.tags.filter((x: string) => x !== t));
  }

  function addReviewFlag() {
    const v = reviewFlagInput.trim().toLowerCase().replace(/\s+/g, '_');
    if (!v || form.review_flags.includes(v)) return;
    set('review_flags', [...form.review_flags, v]);
    setReviewFlagInput('');
  }

  function removeReviewFlag(f: string) {
    set('review_flags', form.review_flags.filter((x: string) => x !== f));
  }

  function addReplacement() {
    const v = replacementInput.trim().toUpperCase();
    if (!v || form.replacement_part_ids.includes(v)) return;
    set('replacement_part_ids', [...form.replacement_part_ids, v]);
    setReplacementInput('');
  }

  function removeReplacement(r: string) {
    set('replacement_part_ids', form.replacement_part_ids.filter((x: string) => x !== r));
  }

  function toggleOverrideField(f: string) {
    const list: string[] = form.manual_override_fields || [];
    if (list.includes(f)) {
      set('manual_override_fields', list.filter((x: string) => x !== f));
    } else {
      set('manual_override_fields', [...list, f]);
    }
  }

  // Live margin calculator
  const marginCalc = useMemo(() => {
    const cost   = Number(form.cost_price) || 0;
    const retail = Number(form.price)      || 0;
    const trade  = Number(form.trade_price) || 0;
    const vatRate = Number(form.vat_rate)   || 0.20;

    const retailMargin = retail > 0 && cost > 0
      ? (((retail - cost) / retail) * 100).toFixed(1)
      : null;
    const retailMarkup = retail > 0 && cost > 0
      ? (((retail - cost) / cost) * 100).toFixed(1)
      : null;
    const tradeMargin = trade > 0 && cost > 0
      ? (((trade - cost) / trade) * 100).toFixed(1)
      : null;
    const retailIncVat = retail > 0
      ? (retail * (1 + vatRate)).toFixed(2)
      : null;

    return { retailMargin, retailMarkup, tradeMargin, retailIncVat };
  }, [form.cost_price, form.price, form.trade_price, form.vat_rate]);

  // Live Central Commercial Action Resolver Diagnostic
  const commercialDecision = useMemo(() => {
    return resolveProductAction(
      {
        ...form,
        id: part?.id,
        price: form.price === '' ? null : Number(form.price),
        vat_rate: Number(form.vat_rate) || 0.20,
        stock_quantity: Number(form.stock_quantity) || 0,
      },
      { includeAdminOverrides: false }
    );
  }, [form, part?.id]);

  async function save() {
    if (!form.part_number.trim() || !form.name.trim()) {
      setError('Part Number and Component Name are required.');
      return;
    }

    setSaving(true); 
    setError('');

    const baseSlug = `${form.part_number}-${form.name}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const payload = {
      ...form,
      slug: part?.slug || baseSlug,
      price: form.price === '' ? null : Number(form.price),
      cost_price: form.cost_price === '' ? null : Number(form.cost_price),
      trade_price: form.trade_price === '' ? null : Number(form.trade_price),
      rrp_price: form.rrp_price === '' ? null : Number(form.rrp_price),
      weight_kg: form.weight_kg === '' ? null : Number(form.weight_kg),
      catalogue_page: form.catalogue_page === '' ? null : Number(form.catalogue_page),
      supplier_stock_qty: form.supplier_stock_qty === '' ? null : Number(form.supplier_stock_qty),
      margin_override_pct: form.margin_override_pct === '' ? null : Number(form.margin_override_pct),
    };

    const url = isEdit ? `/api/admin/parts/${part.id}` : '/api/admin/parts';
    const method = isEdit ? 'PATCH' : 'POST';

    try {
      const res = await fetch(url, { 
        method, 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(payload) 
      });

      if (res.ok) { 
        router.push('/admin/parts'); 
        router.refresh(); 
      } else { 
        const d = await res.json(); 
        setError(d.error || 'Save failed'); 
      }
    } catch {
      setError('Network error while saving component.');
    } finally {
      setSaving(false);
    }
  }

  const inputClass = "w-full bg-[#0D0D0D] border border-[#262626] rounded-[5px] text-white px-3.5 py-2 font-inter text-[13px] focus:outline-none focus:border-[#FF6900] transition-colors";
  const labelClass = "block font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#737373] mb-1.5";

  return (
    <div className="text-white max-w-4xl pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-[#222]">
        <div className="flex items-center gap-4">
          <Link 
            href="/admin/parts" 
            className="flex items-center gap-1.5 font-ibm-plex-mono text-[10px] uppercase text-[#737373] hover:text-[#FF6900] transition-colors"
          >
            <ArrowLeft className="h-3 w-3" /> Back
          </Link>
          <div>
            <h1 className="font-barlow-condensed text-2xl sm:text-3xl font-black uppercase italic tracking-tight">
              {isEdit ? `Edit Part: ${part.part_number}` : 'New Catalogue Part'}
            </h1>
            {isEdit && (
              <div className="flex items-center gap-3 mt-1">
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-[3px] text-[10px] font-mono ${
                  form.needs_review ? 'bg-amber-950/40 text-amber-400 border border-amber-800/40' : 'bg-emerald-950/40 text-emerald-400 border border-emerald-800/40'
                }`}>
                  {form.needs_review ? <AlertTriangle className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                  {form.needs_review ? 'Needs Review' : 'Verified'}
                </span>
                <span className="text-[11px] font-mono text-[#737373]">
                  Score: <span className="text-white font-bold">{form.data_quality_score}%</span>
                </span>
              </div>
            )}
          </div>
        </div>

        <button 
          onClick={save} 
          disabled={saving} 
          className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[#FF6900] text-white font-ibm-plex-mono text-[10px] uppercase tracking-widest hover:bg-[#e55f00] rounded-[4px] btn-tactile shadow-button hover:shadow-button-hover disabled:opacity-50 cursor-pointer transition-all"
        >
          <Save className="h-4 w-4" />
          {saving ? 'Saving...' : 'Save Component'}
        </button>
      </div>

      {error && (
        <div className="border border-red-900/50 bg-red-950/30 rounded-[5px] px-4 py-3 mb-6 font-ibm-plex-mono text-[11px] text-red-400">
          {error}
        </div>
      )}

      {/* ── CENTRAL COMMERCIAL ACTION RESOLVER DIAGNOSTIC ── */}
      <div className="mb-6 p-4 rounded-[6px] bg-[#111] border border-[#262626] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#737373]">
              Authoritative Customer Action:
            </span>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-[3px] font-ibm-plex-mono text-[10px] uppercase font-bold tracking-wider ${
              commercialDecision.action === 'PURCHASE'
                ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/50'
                : commercialDecision.action === 'VIEW_REPLACEMENT'
                ? 'bg-amber-950/60 text-amber-400 border border-amber-800/50'
                : commercialDecision.action === 'REQUEST_QUOTE'
                ? 'bg-purple-950/60 text-purple-400 border border-purple-800/50'
                : commercialDecision.action === 'REQUEST_AVAILABILITY'
                ? 'bg-blue-950/60 text-blue-400 border border-blue-800/50'
                : commercialDecision.action === 'HIDDEN'
                ? 'bg-red-950/60 text-red-400 border border-red-800/50'
                : 'bg-zinc-800 text-zinc-300 border border-zinc-700'
            }`}>
              {commercialDecision.action}
            </span>
            <span className="font-ibm-plex-mono text-[10px] text-[#777]">
              Customer CTA: <strong className="text-white font-normal">"{commercialDecision.label}"</strong>
            </span>
          </div>
          <p className="text-xs text-[#999] font-sans">
            {commercialDecision.reason}
          </p>
        </div>

        {commercialDecision.conflicts && commercialDecision.conflicts.length > 0 && (
          <div className="md:max-w-xs p-2.5 bg-amber-950/30 border border-amber-800/50 rounded-[4px] text-[11px] text-amber-300">
            <div className="flex items-center gap-1.5 font-bold mb-1 text-[10px] font-mono uppercase">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Commercial Conflict</span>
            </div>
            <ul className="list-disc list-inside space-y-0.5 text-[10px] text-amber-200/90 font-light">
              {commercialDecision.conflicts.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-1 border-b border-[#222] mb-6 overflow-x-auto pb-px">
        {[
          { id: 'general', label: 'General & ID', icon: Wrench },
          { id: 'pricing', label: 'Pricing & Margin', icon: DollarSign },
          { id: 'inventory', label: 'Stock & Fulfilment', icon: Package },
          { id: 'technical', label: 'Technical Specs', icon: FileText },
          { id: 'media', label: 'Media & Docs', icon: ImageIcon },
          { id: 'compatibility', label: 'Fitment & Supersession', icon: Link2 },
          { id: 'seo', label: 'SEO & Search', icon: Globe },
          { id: 'quality', label: 'Review & Quality', icon: ShieldAlert },
          { id: 'provenance', label: 'Provenance & Audits', icon: History },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as TabId)}
              className={`flex items-center gap-2 px-3.5 py-2.5 font-ibm-plex-mono text-[10px] uppercase tracking-wider rounded-t-[4px] transition-all whitespace-nowrap cursor-pointer ${
                isActive 
                  ? 'bg-[#171717] text-[#FF6900] border-t-2 border-[#FF6900]' 
                  : 'text-[#737373] hover:text-white hover:bg-[#121212]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab 1: General & Identification */}
      {activeTab === 'general' && (
        <div className="space-y-5 bg-[#121212] border border-[#222] rounded-[6px] p-6 shadow-tactile-sm">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Part Number *</label>
              <input 
                value={form.part_number} 
                onChange={e => set('part_number', e.target.value)} 
                className={inputClass} 
                placeholder="e.g. 20-001 or MOS-46" 
              />
            </div>
            <div>
              <label className={labelClass}>SKU (Internal Code)</label>
              <input 
                value={form.sku} 
                onChange={e => set('sku', e.target.value)} 
                className={inputClass} 
                placeholder="e.g. PMP-GP-TS2021" 
              />
            </div>
            <div>
              <label className={labelClass}>MPN (Manufacturer Part #)</label>
              <input 
                value={form.mpn} 
                onChange={e => set('mpn', e.target.value)} 
                className={inputClass} 
                placeholder="e.g. TS2021" 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Brand Partner *</label>
              <select 
                value={form.brand} 
                onChange={e => set('brand', e.target.value)} 
                className={inputClass}
              >
                {brands.map(b => (
                  <option key={b.slug} value={b.slug}>{b.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Category *</label>
              <select 
                value={form.category} 
                onChange={e => set('category', e.target.value)} 
                className={inputClass}
              >
                {categories.map(c => (
                  <option key={c} value={c}>{c.replace(/-/g, ' ').toUpperCase()}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Subcategory</label>
              <input 
                value={form.subcategory} 
                onChange={e => set('subcategory', e.target.value)} 
                className={inputClass} 
                placeholder="e.g. complete-pumps, seal-kits" 
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Component Name *</label>
            <input 
              value={form.name} 
              onChange={e => set('name', e.target.value)} 
              className={inputClass} 
              placeholder="e.g. General Pump TS2021 Triplex Plunger Pump" 
            />
          </div>

          <div>
            <label className={labelClass}>Manufacturer / OEM Line</label>
            <input 
              value={form.manufacturer} 
              onChange={e => set('manufacturer', e.target.value)} 
              className={inputClass} 
              placeholder="e.g. General Pump / Alkota OEM" 
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#222]">
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={form.oem_genuine} 
                onChange={e => set('oem_genuine', e.target.checked)} 
                className="accent-[#FF6900] w-4 h-4 rounded-[3px]"
              />
              <span className="font-ibm-plex-mono text-[10px] uppercase text-white">OEM Genuine</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={form.is_attachment} 
                onChange={e => set('is_attachment', e.target.checked)} 
                className="accent-[#FF6900] w-4 h-4 rounded-[3px]"
              />
              <span className="font-ibm-plex-mono text-[10px] uppercase text-white">Is Attachment</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={form.featured} 
                onChange={e => set('featured', e.target.checked)} 
                className="accent-[#FF6900] w-4 h-4 rounded-[3px]"
              />
              <span className="font-ibm-plex-mono text-[10px] uppercase text-white">Featured Item</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={form.active} 
                onChange={e => set('active', e.target.checked)} 
                className="accent-[#FF6900] w-4 h-4 rounded-[3px]"
              />
              <span className="font-ibm-plex-mono text-[10px] uppercase text-white">Live in Store</span>
            </label>
          </div>
        </div>
      )}

      {/* Tab 2: Pricing & VAT */}
      {activeTab === 'pricing' && (
        <div className="space-y-5 bg-[#121212] border border-[#222] rounded-[6px] p-6 shadow-tactile-sm">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Retail Price (£ ex. VAT) — Leave blank for POA</label>
              <input 
                type="number" 
                step="0.01" 
                value={form.price} 
                onChange={e => set('price', e.target.value)} 
                className={inputClass} 
                placeholder="e.g. 645.00" 
              />
            </div>
            <div>
              <label className={labelClass}>Trade Price (£ ex. VAT)</label>
              <input 
                type="number" 
                step="0.01" 
                value={form.trade_price} 
                onChange={e => set('trade_price', e.target.value)} 
                className={inputClass} 
                placeholder="e.g. 485.00" 
              />
            </div>
            <div>
              <label className={labelClass}>Cost Price (£ ex. VAT)</label>
              <input 
                type="number" 
                step="0.01" 
                value={form.cost_price} 
                onChange={e => set('cost_price', e.target.value)} 
                className={inputClass} 
                placeholder="e.g. 390.00" 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Margin Override % (Optional)</label>
              <input 
                type="number" 
                step="0.1" 
                value={form.margin_override_pct} 
                onChange={e => set('margin_override_pct', e.target.value)} 
                className={inputClass} 
                placeholder="e.g. 35.0" 
              />
            </div>
            <div>
              <label className={labelClass}>VAT Rate</label>
              <select 
                value={form.vat_rate} 
                onChange={e => set('vat_rate', Number(e.target.value))} 
                className={inputClass}
              >
                <option value={0.20}>20% Standard Rate (UK Commercial)</option>
                <option value={0.05}>5% Reduced Rate</option>
                <option value={0.00}>0% Zero Rated / Export</option>
              </select>
            </div>
          </div>

          {/* Live Commercial Metrics Analysis Strip */}
          <div className="pt-4 border-t border-[#222]">
            <span className="block font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#FF6900] mb-3">
              // Commercial Margin & Profit Analysis
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-[#0A0A0A] border border-[#222] rounded-[4px] p-3">
                <span className="block font-ibm-plex-mono text-[9px] uppercase text-[#737373]">Retail Gross Margin</span>
                <span className={`block font-mono text-base font-bold mt-0.5 ${
                  marginCalc.retailMargin && Number(marginCalc.retailMargin) >= 30 ? 'text-emerald-400' : 'text-white'
                }`}>
                  {marginCalc.retailMargin !== null ? `${marginCalc.retailMargin}%` : '—'}
                </span>
                <span className="text-[10px] text-[#555] mt-0.5 block">(Price - Cost) / Price</span>
              </div>

              <div className="bg-[#0A0A0A] border border-[#222] rounded-[4px] p-3">
                <span className="block font-ibm-plex-mono text-[9px] uppercase text-[#737373]">Cost Markup %</span>
                <span className="block font-mono text-base font-bold mt-0.5 text-white">
                  {marginCalc.retailMarkup !== null ? `+${marginCalc.retailMarkup}%` : '—'}
                </span>
                <span className="text-[10px] text-[#555] mt-0.5 block">Markup over cost</span>
              </div>

              <div className="bg-[#0A0A0A] border border-[#222] rounded-[4px] p-3">
                <span className="block font-ibm-plex-mono text-[9px] uppercase text-[#737373]">Trade Margin</span>
                <span className="block font-mono text-base font-bold mt-0.5 text-[#AAA]">
                  {marginCalc.tradeMargin !== null ? `${marginCalc.tradeMargin}%` : '—'}
                </span>
                <span className="text-[10px] text-[#555] mt-0.5 block">Dealer / Trade rate</span>
              </div>

              <div className="bg-[#0A0A0A] border border-[#222] rounded-[4px] p-3">
                <span className="block font-ibm-plex-mono text-[9px] uppercase text-[#737373]">Retail (Inc. VAT)</span>
                <span className="block font-mono text-base font-bold mt-0.5 text-[#FF6900]">
                  {marginCalc.retailIncVat !== null ? `£${marginCalc.retailIncVat}` : 'POA'}
                </span>
                <span className="text-[10px] text-[#555] mt-0.5 block">Gross consumer total</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Stock & Fulfilment */}
      {activeTab === 'inventory' && (
        <div className="space-y-5 bg-[#121212] border border-[#222] rounded-[6px] p-6 shadow-tactile-sm">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Stock Status</label>
              <select 
                value={form.availability_status} 
                onChange={e => set('availability_status', e.target.value)} 
                className={inputClass}
              >
                <option value="in_stock">In Stock (UK Despatch)</option>
                <option value="low_stock">Low Stock</option>
                <option value="backorder">On Backorder</option>
                <option value="special_order">Special Order (Factory Direct)</option>
                <option value="obsolete">Obsolete</option>
                <option value="check_availability">Check Availability</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Stock Type</label>
              <select 
                value={form.stock_type} 
                onChange={e => set('stock_type', e.target.value)} 
                className={inputClass}
              >
                <option value="direct_stock">Direct Stock (Alkota UK Warehouse)</option>
                <option value="supplier_stock">Supplier Stock</option>
                <option value="made_to_order">Made to Order</option>
                <option value="special_order">Special Order</option>
                <option value="discontinued">Discontinued</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Warehouse Stock Qty</label>
              <input 
                type="number" 
                value={form.stock_quantity} 
                onChange={e => set('stock_quantity', Number(e.target.value))} 
                className={inputClass} 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Lead Time (Business Days)</label>
              <input 
                type="number" 
                value={form.lead_time_days} 
                onChange={e => set('lead_time_days', Number(e.target.value))} 
                className={inputClass} 
                placeholder="1 (Next day)" 
              />
            </div>
            <div className="flex items-center gap-6 pt-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={form.in_stock} 
                  onChange={e => set('in_stock', e.target.checked)} 
                  className="accent-[#FF6900] w-4 h-4 rounded-[3px]"
                />
                <span className="font-ibm-plex-mono text-[10px] uppercase text-white">Mark In Stock</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={form.discontinued} 
                  onChange={e => set('discontinued', e.target.checked)} 
                  className="accent-red-500 w-4 h-4 rounded-[3px]"
                />
                <span className="font-ibm-plex-mono text-[10px] uppercase text-red-400">Discontinued</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Technical Specs & Compatibility */}
      {activeTab === 'technical' && (
        <div className="space-y-5 bg-[#121212] border border-[#222] rounded-[6px] p-6 shadow-tactile-sm">
          <div>
            <label className={labelClass}>Editorial Description</label>
            <textarea 
              rows={4} 
              value={form.description} 
              onChange={e => set('description', e.target.value)} 
              className={inputClass} 
              placeholder="Commercial summary of part applications, materials, and features..."
            />
          </div>

          <div>
            <label className={labelClass}>Technical & Workshop Notes</label>
            <textarea 
              rows={3} 
              value={form.technical_notes} 
              onChange={e => set('technical_notes', e.target.value)} 
              className={inputClass} 
              placeholder="e.g. Torque specs, oil volume, installation requirements..."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Weight (kg)</label>
              <input 
                type="number" 
                step="0.01" 
                value={form.weight_kg} 
                onChange={e => set('weight_kg', e.target.value)} 
                className={inputClass} 
                placeholder="e.g. 14.5" 
              />
            </div>
            <div>
              <label className={labelClass}>Dimensions (cm L x W x H)</label>
              <input 
                value={form.dimensions_cm} 
                onChange={e => set('dimensions_cm', e.target.value)} 
                className={inputClass} 
                placeholder="e.g. 35 x 24 x 18" 
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className={labelClass}>Catalogue Search Tags</label>
            <div className="flex gap-2 mb-2">
              <input 
                value={tagInput} 
                onChange={e => setTagInput(e.target.value)} 
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
                className={inputClass} 
                placeholder="Add tag (e.g. triplex, ts2021) and press Add..."
              />
              <button 
                type="button" 
                onClick={addTag} 
                className="px-4 py-2 bg-[#222] hover:bg-[#333] text-white font-ibm-plex-mono text-[10px] uppercase rounded-[4px] btn-tactile cursor-pointer"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5 min-h-[32px]">
              {form.tags.map((t: string) => (
                <span 
                  key={t} 
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#1A1A1A] border border-[#2b2b2b] text-xs text-[#AAA] rounded-[3px]"
                >
                  #{t}
                  <button 
                    type="button" 
                    onClick={() => removeTag(t)} 
                    className="text-[#555] hover:text-red-400 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Media & Documents */}
      {activeTab === 'media' && (
        <div className="space-y-5 bg-[#121212] border border-[#222] rounded-[6px] p-6 shadow-tactile-sm">
          <div>
            <label className={labelClass}>Primary Product Image URL</label>
            <input 
              value={form.image_url} 
              onChange={e => set('image_url', e.target.value)} 
              className={inputClass} 
              placeholder="/assets/products/pump-ts2021.png or external CDN URL"
            />
          </div>

          {/* Image Preview Box */}
          {form.image_url && (
            <div className="p-4 bg-[#0A0A0A] border border-[#222] rounded-[5px]">
              <span className="block font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#737373] mb-2">
                Live Image Preview
              </span>
              <div className="w-40 h-40 bg-white rounded-[4px] p-2 flex items-center justify-center border border-[#333] overflow-hidden">
                <img 
                  src={form.image_url} 
                  alt="Product Preview" 
                  className="max-h-full max-w-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 6: Machine Fitment & Supersession */}
      {activeTab === 'compatibility' && (
        <div className="space-y-5 bg-[#121212] border border-[#222] rounded-[6px] p-6 shadow-tactile-sm">
          <div>
            <label className={labelClass}>Compatible Machine Models</label>
            <p className="text-xs text-[#737373] mb-2">
              Specify machine model codes where this component is confirmed OEM fitment (e.g. 420X4, 31105E, 5305A).
            </p>
            <div className="flex gap-2 mb-2">
              <input 
                value={machineInput} 
                onChange={e => setMachineInput(e.target.value)} 
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addMachine())}
                className={inputClass} 
                placeholder="Type machine model code (e.g. 420X4) and press Add..."
              />
              <button 
                type="button" 
                onClick={addMachine} 
                className="px-4 py-2 bg-[#222] hover:bg-[#333] text-white font-ibm-plex-mono text-[10px] uppercase rounded-[4px] btn-tactile cursor-pointer"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5 min-h-[36px] p-2 bg-[#0D0D0D] border border-[#222] rounded-[5px]">
              {form.compatible_machines.length === 0 ? (
                <span className="text-xs text-[#555] italic">No machine models linked yet.</span>
              ) : (
                form.compatible_machines.map((m: string) => (
                  <span 
                    key={m} 
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#1A1A1A] border border-[#333] text-xs font-mono text-[#DDD] rounded-[3px]"
                  >
                    {m}
                    <button 
                      type="button" 
                      onClick={() => removeMachine(m)} 
                      className="text-[#666] hover:text-red-400 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-[#222] grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Superseded By (New Part Number)</label>
              <input 
                value={form.superseded_by} 
                onChange={e => set('superseded_by', e.target.value)} 
                className={inputClass} 
                placeholder="e.g. 20-001-NEW (if this part is obsolete)"
              />
              <span className="text-[10px] text-[#666] mt-1 block">
                If this part is obsolete, enter the new part number that supersedes it.
              </span>
            </div>

            <div>
              <label className={labelClass}>Direct Replacement Part Numbers</label>
              <div className="flex gap-2 mb-2">
                <input 
                  value={replacementInput} 
                  onChange={e => setReplacementInput(e.target.value)} 
                  onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addReplacement())}
                  className={inputClass} 
                  placeholder="e.g. PMP-GP-TS2021"
                />
                <button 
                  type="button" 
                  onClick={addReplacement} 
                  className="px-3 py-2 bg-[#222] hover:bg-[#333] text-white font-ibm-plex-mono text-[10px] uppercase rounded-[4px] btn-tactile cursor-pointer"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5 min-h-[32px]">
                {form.replacement_part_ids.map((r: string) => (
                  <span 
                    key={r} 
                    className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#1A1A1A] border border-[#333] text-xs font-mono text-white rounded-[3px]"
                  >
                    {r}
                    <button type="button" onClick={() => removeReplacement(r)} className="text-[#666] hover:text-red-400">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 7: SEO & Search Snippet */}
      {activeTab === 'seo' && (
        <div className="space-y-5 bg-[#121212] border border-[#222] rounded-[6px] p-6 shadow-tactile-sm">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className={labelClass}>Meta Title (Browser & Search Snippet)</label>
              <span className={`text-[10px] font-mono ${
                form.meta_title.length >= 50 && form.meta_title.length <= 60 ? 'text-emerald-400' : 'text-[#737373]'
              }`}>
                {form.meta_title.length} / 60 chars
              </span>
            </div>
            <input 
              value={form.meta_title} 
              onChange={e => set('meta_title', e.target.value)} 
              className={inputClass} 
              placeholder={`e.g. ${form.name || 'Alkota Part'} | Genuine OEM Alkota UK`}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className={labelClass}>Meta Description</label>
              <span className={`text-[10px] font-mono ${
                form.meta_description.length >= 140 && form.meta_description.length <= 160 ? 'text-emerald-400' : 'text-[#737373]'
              }`}>
                {form.meta_description.length} / 160 chars
              </span>
            </div>
            <textarea 
              rows={3} 
              value={form.meta_description} 
              onChange={e => set('meta_description', e.target.value)} 
              className={inputClass} 
              placeholder="e.g. Buy genuine Alkota replacement part with next-day UK despatch. Verified OEM fitment and commercial technical support."
            />
          </div>

          {/* Google SERP Snippet Preview */}
          <div className="pt-4 border-t border-[#222]">
            <span className="block font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#FF6900] mb-3">
              // Google Search Result Live Preview
            </span>
            <div className="bg-[#1C1C1C] border border-[#2E2E2E] rounded-[6px] p-4 max-w-xl">
              <div className="flex items-center gap-2 mb-1 text-[11px] text-[#9AA0A6]">
                <span className="text-white font-medium">alkota.co.uk</span>
                <span>›</span>
                <span>parts-attachments</span>
                <span>›</span>
                <span>{form.category}</span>
              </div>
              <h4 className="text-[17px] text-[#8AB4F8] hover:underline cursor-pointer font-normal leading-snug">
                {form.meta_title || `${form.name || form.part_number || 'Product'} | Alkota UK`}
              </h4>
              <p className="text-[13px] text-[#BDC1C6] mt-1 leading-relaxed line-clamp-2">
                {form.meta_description || form.description || 'OEM genuine industrial pressure washer components and attachments stocked in the UK.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 6: Quality & Review */}
      {activeTab === 'quality' && (
        <div className="space-y-5 bg-[#121212] border border-[#222] rounded-[6px] p-6 shadow-tactile-sm">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Data Quality Score (0-100%)</label>
              <input 
                type="number" 
                value={form.data_quality_score} 
                onChange={e => set('data_quality_score', Number(e.target.value))} 
                className={inputClass} 
              />
            </div>
            <div>
              <label className={labelClass}>Catalogue Source</label>
              <select 
                value={form.catalogue_source} 
                onChange={e => set('catalogue_source', e.target.value)} 
                className={inputClass}
              >
                <option value="manual">Manual Entry</option>
                <option value="pdf_extract">PDF Catalogue Extract</option>
                <option value="seed_v2">Seed V2 Normalised</option>
                <option value="supplier_import">Supplier Feed Import</option>
                <option value="admin">Admin Created</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Catalogue Page #</label>
              <input 
                type="number" 
                value={form.catalogue_page} 
                onChange={e => set('catalogue_page', e.target.value)} 
                className={inputClass} 
                placeholder="e.g. 50" 
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={form.needs_review} 
                onChange={e => set('needs_review', e.target.checked)} 
                className="accent-amber-500 w-4 h-4 rounded-[3px]"
              />
              <span className="font-ibm-plex-mono text-[11px] uppercase text-amber-400 font-bold">
                Flag for Admin Review
              </span>
            </label>
          </div>

          {/* Review Flags */}
          <div>
            <label className={labelClass}>Review Flags</label>
            <div className="flex gap-2 mb-2">
              <input 
                value={reviewFlagInput} 
                onChange={e => setReviewFlagInput(e.target.value)} 
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addReviewFlag())}
                className={inputClass} 
                placeholder="Add flag (e.g. missing_price, check_compatibility) and press Add..."
              />
              <button 
                type="button" 
                onClick={addReviewFlag} 
                className="px-4 py-2 bg-[#222] hover:bg-[#333] text-white font-ibm-plex-mono text-[10px] uppercase rounded-[4px] btn-tactile cursor-pointer"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5 min-h-[32px]">
              {form.review_flags.map((f: string) => (
                <span 
                  key={f} 
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-950/40 border border-red-800/40 text-xs font-mono text-red-300 rounded-[3px]"
                >
                  {f}
                  <button 
                    type="button" 
                    onClick={() => removeReviewFlag(f)} 
                    className="text-red-400 hover:text-white cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className={labelClass}>Review Notes</label>
            <textarea 
              rows={3} 
              value={form.review_notes} 
              onChange={e => set('review_notes', e.target.value)} 
              className={inputClass} 
              placeholder="Internal review notes regarding missing data or verification steps needed..."
            />
          </div>
        </div>
      )}

      {/* ── TAB 9: PROVENANCE & AUDITS ── */}
      {activeTab === 'provenance' && (
        <div className="bg-[#141414] border border-[#222] rounded-[6px] p-6 space-y-6">
          <div>
            <h3 className="font-barlow-condensed text-base font-bold uppercase tracking-wider text-white mb-1">
              Data Provenance &amp; Supplier Origins
            </h3>
            <p className="text-xs text-[#737373]">
              Trace the authoritative source of specifications, documents, and pricing. Configure automated supplier overwrite protections.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Publication Status</label>
              <select
                value={form.publication_status}
                onChange={e => set('publication_status', e.target.value)}
                className={inputClass}
              >
                <option value="published">Published (Storefront Visible &amp; Searchable)</option>
                <option value="request_availability">Request Availability (Unpriced / POA)</option>
                <option value="ready">Ready (Awaiting Batch Publish)</option>
                <option value="needs_review">Needs Review (Staff Verification Required)</option>
                <option value="draft">Draft (Internal Only)</option>
                <option value="out_of_stock">Out of Stock</option>
                <option value="discontinued">Discontinued (Superseded or EOL)</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>Source Type</label>
              <select
                value={form.source_type}
                onChange={e => set('source_type', e.target.value)}
                className={inputClass}
              >
                <option value="manual">Manual Entry / Alkota UK Staff</option>
                <option value="supplier_import">Supplier Import (Dual Pumps / Steel Eagle)</option>
                <option value="manufacturer_catalogue">Official Manufacturer Catalogue</option>
                <option value="spec_sheet">Manufacturer Specification Sheet</option>
                <option value="supplier_feed">Direct Supplier Data Feed</option>
                <option value="pdf_extract">Factory PDF Technical Manual</option>
                <option value="seed_v2">Alkota Canonical Seed</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Source Document</label>
              <input
                type="text"
                value={form.source_document}
                onChange={e => set('source_document', e.target.value)}
                className={inputClass}
                placeholder="e.g. Dual Pumps Catalogue 2026 Edition 47"
              />
            </div>

            <div>
              <label className={labelClass}>Source Reference / Page #</label>
              <input
                type="text"
                value={form.source_reference}
                onChange={e => set('source_reference', e.target.value)}
                className={inputClass}
                placeholder="e.g. Section 04: Manifolds, p. 112"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Source Version</label>
              <input
                type="text"
                value={form.source_version}
                onChange={e => set('source_version', e.target.value)}
                className={inputClass}
                placeholder="e.g. 2026.1"
              />
            </div>

            <div>
              <label className={labelClass}>Source Document / Spec Sheet URL</label>
              <input
                type="text"
                value={form.source_url}
                onChange={e => set('source_url', e.target.value)}
                className={inputClass}
                placeholder="https://..."
              />
            </div>
          </div>

          {/* Manual Overwrite Protection */}
          <div className="pt-4 border-t border-[#262626] space-y-3">
            <div>
              <h4 className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#FF6900] font-bold">
                // Automated Supplier Overwrite Protection
              </h4>
              <p className="text-xs text-[#737373] mt-0.5">
                Check any fields that have been manually verified by Alkota UK. Subsequent automated supplier catalogue syncs will NOT overwrite these protected fields.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {[
                { id: 'price', label: 'Selling Price' },
                { id: 'name', label: 'Product Name' },
                { id: 'description', label: 'Description' },
                { id: 'category', label: 'Category & Fitment' },
                { id: 'specifications', label: 'Technical Specs' },
                { id: 'image_url', label: 'Verified Image' },
              ].map(f => {
                const isOverridden = (form.manual_override_fields || []).includes(f.id);
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => toggleOverrideField(f.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded border text-xs font-mono transition-all text-left ${
                      isOverridden
                        ? 'bg-[#1F160D] border-[#FF6900] text-[#FF6900]'
                        : 'bg-[#0D0D0D] border-[#262626] text-[#737373] hover:text-white'
                    }`}
                  >
                    <span className={`w-3.5 h-3.5 rounded-sm flex items-center justify-center text-[10px] border ${
                      isOverridden ? 'bg-[#FF6900] text-black border-[#FF6900]' : 'border-[#444]'
                    }`}>
                      {isOverridden && '✓'}
                    </span>
                    <span>{f.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
