'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, X, Plus } from 'lucide-react';
import { PartCategoryAdmin, BrandPartner } from '@/lib/types/parts';

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
  'other'
];

const DEFAULT_BRANDS = [
  { slug: 'alkota', name: 'Alkota Genuine' },
  { slug: 'mosmatic', name: 'Mosmatic' },
  { slug: 'cox-reels', name: 'Cox Reels' },
  { slug: 'steel-eagle', name: 'Steel Eagle' },
  { slug: 'dual-pumps', name: 'Dual Pumps' },
];

export default function PartEditor({ part }: { part?: any }) {
  const router = useRouter();
  const isEdit = !!part?.id;
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [machineInput, setMachineInput] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [categories, setCategories] = useState<string[]>(DEFAULT_CATEGORIES);
  const [brands, setBrands] = useState<Array<{ slug: string; name: string }>>(DEFAULT_BRANDS);

  const [form, setForm] = useState({
    part_number: part?.part_number || '',
    name: part?.name || '',
    description: part?.description || '',
    category: part?.category || 'pumps',
    brand: part?.brand || 'alkota',
    manufacturer: part?.manufacturer || '',
    compatible_machines: part?.compatible_machines || [] as string[],
    tags: part?.tags || [] as string[],
    price: part?.price !== undefined && part?.price !== null ? part.price : '',
    in_stock: part?.in_stock ?? true,
    active: part?.active ?? true,
    featured: part?.featured ?? false,
    is_attachment: part?.is_attachment ?? false,
    oem_genuine: part?.oem_genuine ?? true,
    image_url: part?.image_url || '',
    technical_notes: part?.technical_notes || '',
    weight_kg: part?.weight_kg || '',
  });

  useEffect(() => {
    // Load categories & brands dynamically from database
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

  async function save() {
    if (!form.part_number.trim() || !form.name.trim()) {
      setError('Part Number and Name are required.');
      return;
    }

    setSaving(true); 
    setError('');

    // Generate slug from part number and name if new
    const baseSlug = `${form.part_number}-${form.name}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const payload = {
      ...form,
      slug: part?.slug || baseSlug,
      price: form.price === '' ? null : Number(form.price),
      weight_kg: form.weight_kg === '' ? null : Number(form.weight_kg),
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

  const inputClass = "w-full bg-[#0D0D0D] border border-[#222] text-white px-4 py-2.5 font-inter text-[13px] focus:outline-none focus:border-[#FF6900]";
  const labelClass = "block font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#555] mb-1.5";

  return (
    <div className="text-white max-w-3xl pb-16">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#222]">
        <div className="flex items-center gap-4">
          <Link 
            href="/admin/parts" 
            className="flex items-center gap-2 font-ibm-plex-mono text-[10px] uppercase text-[#555] hover:text-[#FF6900] transition-colors"
          >
            <ArrowLeft className="h-3 w-3" /> Back
          </Link>
          <h1 className="font-barlow-condensed text-3xl font-black uppercase italic">
            {isEdit ? `Edit Part: ${part.part_number}` : 'New Catalogue Part'}
          </h1>
        </div>

        <button 
          onClick={save} 
          disabled={saving} 
          className="flex items-center gap-2 px-5 py-2.5 bg-[#FF6900] text-white font-ibm-plex-mono text-[10px] uppercase tracking-widest hover:bg-[#e55f00] disabled:opacity-50 cursor-pointer"
        >
          <Save className="h-4 w-4" />
          {saving ? 'Saving...' : 'Save Part'}
        </button>
      </div>

      {error && (
        <div className="border border-red-900/50 bg-red-950/30 px-4 py-3 mb-6 font-ibm-plex-mono text-[10px] text-red-400">
          {error}
        </div>
      )}

      <div className="space-y-6">
        {/* Core Identifiers */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Part Number / SKU *</label>
            <input 
              value={form.part_number} 
              onChange={e => set('part_number', e.target.value)} 
              className={inputClass} 
              placeholder="e.g. 20-001 or MOS-46" 
            />
          </div>

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
        </div>

        {/* Name */}
        <div>
          <label className={labelClass}>Component Name *</label>
          <input 
            value={form.name} 
            onChange={e => set('name', e.target.value)} 
            className={inputClass} 
            placeholder="e.g. General Pump TS2021 Triplex Plunger Pump"
          />
        </div>

        {/* Description */}
        <div>
          <label className={labelClass}>Technical Product Description</label>
          <textarea 
            value={form.description} 
            onChange={e => set('description', e.target.value)} 
            rows={3} 
            className={inputClass + ' resize-y'} 
            placeholder="Comprehensive description for catalogue listings..."
          />
        </div>

        {/* Technical Notes */}
        <div>
          <label className={labelClass}>Engineering / Workshop Notes</label>
          <textarea 
            value={form.technical_notes} 
            onChange={e => set('technical_notes', e.target.value)} 
            rows={2} 
            className={inputClass + ' resize-y'} 
            placeholder="e.g. Rated for 5.6 GPM @ 3500 PSI. Requires 1.1L 30W Non-Detergent Pump Oil."
          />
        </div>

        {/* Machine Compatibility */}
        <div>
          <label className={labelClass}>Compatible Machine Models (Type code + Enter or Add)</label>
          <div className="flex gap-2 mb-2">
            <input 
              value={machineInput} 
              onChange={e => setMachineInput(e.target.value)} 
              onKeyDown={e => { 
                if (e.key === 'Enter') { 
                  e.preventDefault(); 
                  addMachine(); 
                }
              }} 
              placeholder="e.g. 430XH4 or 4358" 
              className={inputClass + ' flex-1'} 
            />
            <button 
              type="button"
              onClick={addMachine} 
              className="px-4 bg-[#1A1A1A] border border-[#333] text-[#888] hover:text-white font-ibm-plex-mono text-[10px] uppercase cursor-pointer"
            >
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {form.compatible_machines.map((m: string) => (
              <span key={m} className="flex items-center gap-1.5 px-3 py-1 bg-[#1A1A1A] border border-[#333] font-ibm-plex-mono text-[11px] text-[#FF6900]">
                {m} 
                <button type="button" onClick={() => removeMachine(m)} className="text-[#555] hover:text-red-400">
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className={labelClass}>Search Tags (Type tag + Enter or Add)</label>
          <div className="flex gap-2 mb-2">
            <input 
              value={tagInput} 
              onChange={e => setTagInput(e.target.value)} 
              onKeyDown={e => { 
                if (e.key === 'Enter') { 
                  e.preventDefault(); 
                  addTag(); 
                }
              }} 
              placeholder="e.g. triplex, packing, ceramic, unloader" 
              className={inputClass + ' flex-1'} 
            />
            <button 
              type="button"
              onClick={addTag} 
              className="px-4 bg-[#1A1A1A] border border-[#333] text-[#888] hover:text-white font-ibm-plex-mono text-[10px] uppercase cursor-pointer"
            >
              Add Tag
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {form.tags.map((t: string) => (
              <span key={t} className="flex items-center gap-1.5 px-2.5 py-0.5 bg-[#141414] border border-[#2A2A2A] font-ibm-plex-mono text-[10px] text-[#AAA]">
                #{t} 
                <button type="button" onClick={() => removeTag(t)} className="text-[#555] hover:text-red-400">
                  <X className="h-2.5 w-2.5" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Commercials, Weight & Media */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Price (£ Ex VAT) — Leave blank for POA</label>
            <input 
              type="number" 
              step="0.01"
              value={form.price} 
              onChange={e => set('price', e.target.value)} 
              className={inputClass} 
              placeholder="0.00" 
            />
          </div>

          <div>
            <label className={labelClass}>Weight (kg)</label>
            <input 
              type="number" 
              step="0.1"
              value={form.weight_kg} 
              onChange={e => set('weight_kg', e.target.value)} 
              className={inputClass} 
              placeholder="e.g. 14.5" 
            />
          </div>

          <div>
            <label className={labelClass}>Primary Image URL (optional)</label>
            <input 
              value={form.image_url} 
              onChange={e => set('image_url', e.target.value)} 
              className={inputClass} 
              placeholder="/assets/products/... or https://..." 
            />
          </div>
        </div>

        {/* Feature & Stock Checkboxes */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#111] border border-[#222]">
          {[
            ['in_stock', 'In Stock'],
            ['active', 'Active Listing'],
            ['featured', 'Featured on Homepage'],
            ['is_attachment', 'Is High-Pressure Attachment'],
            ['oem_genuine', 'OEM Genuine'],
          ].map(([k, l]) => (
            <label key={k} className="flex items-center gap-2 cursor-pointer select-none">
              <input 
                type="checkbox" 
                checked={(form as any)[k]} 
                onChange={e => set(k, e.target.checked)} 
                className="accent-[#FF6900]" 
              />
              <span className="font-inter text-[12px] text-[#CCC]">{l}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
