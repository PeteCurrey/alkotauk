'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { Chemical, ChemicalCategory } from '@/lib/admin/types';
import { CHEMICAL_CATEGORY_LABELS } from '@/lib/admin/types';

const CATEGORIES = Object.entries(CHEMICAL_CATEGORY_LABELS) as [ChemicalCategory, string][];

function slugify(s: string) { return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''); }

function TagInput({ value, onChange, placeholder }: { value: string[]; onChange: (v: string[]) => void; placeholder?: string }) {
  const [input, setInput] = useState('');
  const add = () => { const v = input.trim(); if (v && !value.includes(v)) onChange([...value, v]); setInput(''); };
  return (
    <div className="border border-[#2A2A2A] bg-[#0D0D0D] p-2 min-h-[44px] flex flex-wrap gap-1.5">
      {value.map(tag => (
        <span key={tag} className="flex items-center gap-1 px-2 py-0.5 bg-[#1A1A1A] border border-[#333] font-ibm-plex-mono text-[10px] text-white">
          {tag}<button type="button" onClick={() => onChange(value.filter(t => t !== tag))} className="text-[#555] hover:text-red-400 ml-1">×</button>
        </span>
      ))}
      <input value={input} onChange={e => setInput(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); add(); } }} onBlur={add}
        placeholder={placeholder || 'Type & press Enter'}
        className="flex-1 min-w-[120px] bg-transparent font-inter text-[13px] text-white focus:outline-none placeholder:text-[#444]" />
    </div>
  );
}

function Toggle({ value, onChange, label }: { value: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <div onClick={() => onChange(!value)} className="relative w-10 h-5 rounded-full transition-colors" style={{ background: value ? '#FF6900' : '#2A2A2A' }}>
        <div className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all" style={{ left: value ? '22px' : '2px' }} />
      </div>
      <span className="font-inter text-[13px] text-[#888]">{label}</span>
    </label>
  );
}

function Field({ label, children, note }: { label: string; children: React.ReactNode; note?: string }) {
  return (
    <div>
      <label className="block font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#666] mb-2">{label}</label>
      {children}
      {note && <p className="font-inter text-[11px] text-[#555] mt-1">{note}</p>}
    </div>
  );
}

function SH({ label }: { label: string }) {
  return <div className="border-b border-[#1F1F1F] pb-3 mb-6 mt-10 first:mt-0"><p className="font-ibm-plex-mono text-[9px] font-black uppercase tracking-[0.3em] text-[#FF6900]">// {label}</p></div>;
}

const INIT: Partial<Chemical> = {
  name: '', slug: '', code: '', category: 'degreaser', tagline: '', description: '',
  active: true, featured: false, use_cases: [], compatible_surfaces: [], not_suitable_for: [],
  biodegradable: true, hazardous: false, available_sizes: [], primary_image_url: '',
  pdf_datasheet_url: '', meta_title: '', meta_description: '', sort_order: 0,
};

export default function ChemicalForm({ initial, id }: { initial?: Partial<Chemical>; id?: string }) {
  const router = useRouter();
  const [form, setForm] = useState<Partial<Chemical>>({ ...INIT, ...initial });
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'ok' | 'err' } | null>(null);

  const set = useCallback((field: keyof Chemical, val: any) => {
    setForm(prev => {
      const next = { ...prev, [field]: val };
      if (field === 'name' && !id) next.slug = slugify(val as string);
      return next;
    });
  }, [id]);

  const inp = (field: keyof Chemical, type = 'text', ph = '') => (
    <input type={type} value={(form[field] ?? '') as string}
      onChange={e => set(field, e.target.value)} placeholder={ph}
      className="w-full bg-[#0D0D0D] border border-[#2A2A2A] text-white px-4 py-2.5 font-inter text-sm focus:outline-none focus:border-[#FF6900]" />
  );

  const showToast = (msg: string, type: 'ok' | 'err') => { setToast({ msg, type }); setTimeout(() => setToast(null), 3000); };

  const save = async () => {
    setSaving(true);
    try {
      const url = id ? `/api/admin/chemicals/${id}` : '/api/admin/chemicals';
      const method = id ? 'PATCH' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (!res.ok) { const e = await res.json(); throw new Error(e.error || 'Save failed'); }
      showToast(id ? 'Chemical updated' : 'Chemical created', 'ok');
      if (!id) router.push('/admin/chemicals');
    } catch (e: any) {
      showToast(e.message, 'err');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="pb-32">
      {toast && (
        <div className={`fixed top-6 right-6 z-50 px-5 py-3 font-ibm-plex-mono text-[10px] uppercase tracking-widest ${toast.type === 'ok' ? 'bg-green-900/80 text-green-300 border border-green-700' : 'bg-red-900/80 text-red-300 border border-red-700'}`}>
          {toast.msg}
        </div>
      )}

      <SH label="Identity" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Field label="Product Name *">{inp('name', 'text', 'e.g. Farm Soap TR-440')}</Field>
        <Field label="Product Code">{inp('code', 'text', 'e.g. TR-440')}</Field>
        <Field label="Slug" note={`alkota.co.uk/chemicals/${form.slug || '...'}`}>{inp('slug', 'text', 'auto-generated')}</Field>
        <Field label="Category *">
          <select value={form.category || ''} onChange={e => set('category', e.target.value)}
            className="w-full bg-[#0D0D0D] border border-[#2A2A2A] text-white px-4 py-2.5 font-inter text-sm focus:outline-none focus:border-[#FF6900]">
            {CATEGORIES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </Field>
        <Field label="Tagline">{inp('tagline', 'text', 'Short one-liner')}</Field>
        <Field label="Sort Order">{inp('sort_order', 'number', '0')}</Field>
      </div>
      <div className="flex gap-8 mb-2">
        <Toggle value={!!form.featured} onChange={v => set('featured', v)} label="Featured" />
        <Toggle value={!!form.active} onChange={v => set('active', v)} label="Active / Live" />
      </div>

      <SH label="Description" />
      <Field label="Full Description">
        <textarea rows={5} value={form.description || ''} onChange={e => set('description', e.target.value)}
          className="w-full bg-[#0D0D0D] border border-[#2A2A2A] text-white px-4 py-2.5 font-inter text-sm focus:outline-none focus:border-[#FF6900] resize-y"
          placeholder="Full product description..." />
      </Field>

      <SH label="Properties" />
      <div className="flex gap-8 mb-6">
        <Toggle value={!!form.biodegradable} onChange={v => set('biodegradable', v)} label="Biodegradable" />
        <Toggle value={!!form.hazardous} onChange={v => {
          set('hazardous', v);
          if (v) alert('⚠️ Marked as Hazmat — ensure shipping compliance before publishing.');
        }} label="Hazardous Material (Hazmat)" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Field label="Use Cases (press Enter)"><TagInput value={form.use_cases || []} onChange={v => set('use_cases', v)} placeholder="e.g. agricultural equipment" /></Field>
        <Field label="Compatible Surfaces"><TagInput value={form.compatible_surfaces || []} onChange={v => set('compatible_surfaces', v)} placeholder="e.g. painted metal" /></Field>
        <Field label="Not Suitable For"><TagInput value={form.not_suitable_for || []} onChange={v => set('not_suitable_for', v)} placeholder="e.g. polished aluminium" /></Field>
      </div>

      <SH label="Available Sizes" />
      <Field label="Sizes (press Enter after each)">
        <TagInput value={form.available_sizes || []} onChange={v => set('available_sizes', v)} placeholder="5L, 25L, 200L Drum, 1000L IBC..." />
      </Field>

      <SH label="Media" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="Product Image URL">
          {inp('primary_image_url', 'text', 'https://...')}
          {form.primary_image_url && <img src={form.primary_image_url} alt="" className="mt-2 h-24 w-24 object-cover border border-[#222]" />}
        </Field>
        <Field label="Technical Datasheet PDF URL">{inp('pdf_datasheet_url', 'text', 'https://...')}</Field>
      </div>

      <SH label="SEO" />
      <div className="space-y-4">
        <Field label={`Meta Title (${(form.meta_title || '').length}/60)`}>{inp('meta_title', 'text', 'e.g. Farm Soap TR-440 | Agricultural Cleaner UK')}</Field>
        <Field label={`Meta Description (${(form.meta_description || '').length}/160)`}>
          <textarea rows={3} value={form.meta_description || ''} onChange={e => set('meta_description', e.target.value)}
            className="w-full bg-[#0D0D0D] border border-[#2A2A2A] text-white px-4 py-2.5 font-inter text-sm focus:outline-none focus:border-[#FF6900] resize-none" />
        </Field>
      </div>

      <div className="fixed bottom-0 left-[260px] right-0 flex items-center justify-between px-8 py-4 border-t border-[#1F1F1F] bg-[#0D0D0D] z-40">
        <button type="button" onClick={() => router.back()} className="font-ibm-plex-mono text-[10px] text-[#555] uppercase tracking-widest hover:text-white transition-colors">← Cancel</button>
        <button type="button" onClick={save} disabled={saving}
          className="px-6 py-2.5 bg-[#FF6900] font-ibm-plex-mono text-[10px] uppercase tracking-widest text-white hover:bg-[#e55f00] transition-all disabled:opacity-50">
          {saving ? 'Saving...' : id ? 'Save Changes' : 'Create Chemical'}
        </button>
      </div>
    </div>
  );
}
