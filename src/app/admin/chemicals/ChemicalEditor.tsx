'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';

const CATEGORIES = ['degreaser','auto-truck-wash','aluminum-brightener','industrial','food-processing','masonry-asphalt','parts-washer','residential','additives','coatings','aviation','transportation'];
const SURFACES = ['Vehicle paintwork','Farm machinery','Concrete floors','Food equipment','Stone & masonry','Aircraft','Engine bays','Graffiti surfaces','Roads & asphalt','Stainless steel','Aluminium','General'];
const CONTAMINATION = ['Grease & oil','Mud & soil','Mineral scale','Carbon deposits','Paint & graffiti','Biological','Road film & tar','Mixed'];
const TABS = ['Details','Dilution & Application','Pricing & Stock','SEO'];

function slugify(s: string) { return s.toLowerCase().trim().replace(/[^a-z0-9\s-]/g,'').replace(/\s+/g,'-'); }

export default function ChemicalEditor({ chemical }: { chemical?: any }) {
  const router = useRouter();
  const isEdit = !!chemical?.id;
  const [tab, setTab] = useState(0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: chemical?.name || '',
    slug: chemical?.slug || '',
    tagline: chemical?.tagline || '',
    description: chemical?.description || '',
    category: chemical?.category || 'industrial',
    surfaces: chemical?.surfaces || [],
    contamination_types: chemical?.contamination_types || [],
    dilution_hot: chemical?.dilution_hot || '',
    dilution_cold: chemical?.dilution_cold || '',
    dilution_foam: chemical?.dilution_foam || '',
    application_method: chemical?.application_method || '',
    contact_time: chemical?.contact_time || '',
    do_not_use_on: chemical?.do_not_use_on || '',
    safety_notes: chemical?.safety_notes || '',
    food_safe: chemical?.food_safe ?? false,
    biodegradable: chemical?.biodegradable ?? false,
    featured: chemical?.featured ?? false,
    active: chemical?.active ?? true,
    available_sizes: chemical?.available_sizes || [],
    price_5l: chemical?.price_5l || '',
    price_25l: chemical?.price_25l || '',
    price_200l: chemical?.price_200l || '',
    in_stock: chemical?.in_stock ?? true,
    sort_order: chemical?.sort_order ?? 0,
    meta_title: chemical?.meta_title || '',
    meta_description: chemical?.meta_description || '',
  });

  function set(key: string, val: any) {
    setForm((f) => {
      const next = { ...f, [key]: val };
      if (key === 'name' && !isEdit) next.slug = slugify(val);
      return next;
    });
  }

  function toggleArr(key: 'surfaces'|'contamination_types'|'available_sizes', val: string) {
    setForm((f) => {
      const arr: string[] = f[key];
      return { ...f, [key]: arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val] };
    });
  }

  async function save() {
    setSaving(true); setError('');
    const url = isEdit ? `/api/admin/chemicals/${chemical.id}` : '/api/admin/chemicals';
    const method = isEdit ? 'PATCH' : 'POST';
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    if (res.ok) { router.push('/admin/chemicals'); router.refresh(); }
    else { const d = await res.json(); setError(d.error || 'Save failed'); }
    setSaving(false);
  }

  const inputClass = "w-full bg-[#0D0D0D] border border-[#222] text-white px-4 py-2.5 font-inter text-[13px] focus:outline-none focus:border-[#FF6900]";
  const labelClass = "block font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#555] mb-1.5";

  return (
    <div className="text-white">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/chemicals" className="flex items-center gap-2 font-ibm-plex-mono text-[10px] uppercase text-[#555] hover:text-[#FF6900] transition-colors"><ArrowLeft className="h-3 w-3" /> Back</Link>
          <h1 className="font-barlow-condensed text-3xl font-black uppercase italic">{isEdit ? 'Edit Chemical' : 'New Chemical'}</h1>
        </div>
        <button onClick={save} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-[#FF6900] text-white font-ibm-plex-mono text-[10px] uppercase tracking-widest hover:bg-[#e55f00] disabled:opacity-50">
          <Save className="h-4 w-4" />{saving ? 'Saving...' : 'Save Chemical'}
        </button>
      </div>

      {error && <div className="border border-red-900/50 bg-red-950/30 px-4 py-3 mb-4 font-ibm-plex-mono text-[10px] text-red-400">{error}</div>}

      {/* Tabs */}
      <div className="flex gap-0 border-b border-[#222] mb-6">
        {TABS.map((t, i) => (
          <button key={t} onClick={() => setTab(i)} className="px-5 py-3 font-ibm-plex-mono text-[10px] uppercase tracking-widest border-b-2 transition-all" style={{ borderColor: tab === i ? '#FF6900' : 'transparent', color: tab === i ? '#FF6900' : '#555' }}>{t}</button>
        ))}
      </div>

      {/* Tab 1: Details */}
      {tab === 0 && (
        <div className="space-y-4 max-w-2xl">
          <div><label className={labelClass}>Name</label><input value={form.name} onChange={e => set('name', e.target.value)} className={inputClass} /></div>
          <div><label className={labelClass}>Slug</label><input value={form.slug} onChange={e => set('slug', e.target.value)} className={inputClass} /></div>
          <div><label className={labelClass}>Tagline</label><input value={form.tagline} onChange={e => set('tagline', e.target.value)} className={inputClass} /></div>
          <div><label className={labelClass}>Description</label><textarea value={form.description} onChange={e => set('description', e.target.value)} rows={4} className={inputClass + ' resize-y'} /></div>
          <div><label className={labelClass}>Category</label>
            <select value={form.category} onChange={e => set('category', e.target.value)} className={inputClass}>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Surface Types</label>
            <div className="grid grid-cols-3 gap-2">{SURFACES.map(s => (
              <label key={s} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.surfaces.includes(s)} onChange={() => toggleArr('surfaces', s)} className="accent-[#FF6900]" />
                <span className="font-inter text-[12px] text-[#888]">{s}</span>
              </label>
            ))}</div>
          </div>
          <div>
            <label className={labelClass}>Contamination Types</label>
            <div className="grid grid-cols-2 gap-2">{CONTAMINATION.map(c => (
              <label key={c} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.contamination_types.includes(c)} onChange={() => toggleArr('contamination_types', c)} className="accent-[#FF6900]" />
                <span className="font-inter text-[12px] text-[#888]">{c}</span>
              </label>
            ))}</div>
          </div>
          <div className="flex gap-6">
            {[['food_safe','Food Safe'],['biodegradable','Biodegradable'],['featured','Featured'],['active','Active']].map(([k, l]) => (
              <label key={k} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={(form as any)[k]} onChange={e => set(k, e.target.checked)} className="accent-[#FF6900]" />
                <span className="font-inter text-[13px] text-[#888]">{l}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Dilution */}
      {tab === 1 && (
        <div className="space-y-4 max-w-2xl">
          {[['dilution_hot','Dilution — Hot Water'],['dilution_cold','Dilution — Cold Water'],['dilution_foam','Dilution — Foam Lance'],['contact_time','Contact Time']].map(([k, l]) => (
            <div key={k}><label className={labelClass}>{l}</label><input value={(form as any)[k]} onChange={e => set(k, e.target.value)} placeholder="e.g. 1:20 to 1:50" className={inputClass} /></div>
          ))}
          {[['application_method','Application Method'],['do_not_use_on','Do Not Use On'],['safety_notes','Safety Notes']].map(([k, l]) => (
            <div key={k}><label className={labelClass}>{l}</label><textarea value={(form as any)[k]} onChange={e => set(k, e.target.value)} rows={3} className={inputClass + ' resize-y'} /></div>
          ))}
        </div>
      )}

      {/* Tab 3: Pricing */}
      {tab === 2 && (
        <div className="space-y-5 max-w-xl">
          <div>
            <label className={labelClass}>Available Sizes & Pricing</label>
            <div className="space-y-3">
              {[['5L','price_5l'],['25L','price_25l'],['200L','price_200l']].map(([size, priceKey]) => (
                <div key={size} className="flex items-center gap-4">
                  <label className="flex items-center gap-2 w-16 cursor-pointer">
                    <input type="checkbox" checked={form.available_sizes.includes(size)} onChange={() => toggleArr('available_sizes', size)} className="accent-[#FF6900]" />
                    <span className="font-ibm-plex-mono text-[11px] text-white">{size}</span>
                  </label>
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555] font-inter text-[13px]">£</span>
                    <input type="number" value={(form as any)[priceKey]} onChange={e => set(priceKey, e.target.value)} placeholder="0.00" className={inputClass + ' pl-7'} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.in_stock} onChange={e => set('in_stock', e.target.checked)} className="accent-[#FF6900]" />
              <span className="font-inter text-[13px] text-[#888]">In Stock</span>
            </label>
            <div className="flex items-center gap-3">
              <label className={labelClass + ' mb-0'}>Sort Order</label>
              <input type="number" value={form.sort_order} onChange={e => set('sort_order', parseInt(e.target.value)||0)} className="w-20 bg-[#0D0D0D] border border-[#222] text-white px-3 py-2 font-inter text-[13px] focus:outline-none focus:border-[#FF6900]" />
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: SEO */}
      {tab === 3 && (
        <div className="space-y-4 max-w-2xl">
          <div><label className={labelClass}>Meta Title</label><input value={form.meta_title} onChange={e => set('meta_title', e.target.value)} className={inputClass} /></div>
          <div><label className={labelClass}>Meta Description</label><textarea value={form.meta_description} onChange={e => set('meta_description', e.target.value)} rows={3} className={inputClass + ' resize-none'} /></div>
        </div>
      )}
    </div>
  );
}
