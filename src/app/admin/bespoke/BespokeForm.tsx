'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { BespokeBuild, BuildType } from '@/lib/admin/types';
import { INDUSTRY_LABELS } from '@/lib/admin/types';

const BUILD_TYPES: BuildType[] = ['trailer', 'wash-plant', 'skid-unit', 'stationary'];
const INDUSTRIES = Object.entries(INDUSTRY_LABELS);

function slugify(s: string) { return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''); }

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

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className="block font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#666] mb-2">{label}</label>{children}</div>;
}

function SH({ label }: { label: string }) {
  return <div className="border-b border-[#1F1F1F] pb-3 mb-6 mt-10 first:mt-0"><p className="font-ibm-plex-mono text-[9px] font-black uppercase tracking-[0.3em] text-[#FF6900]">// {label}</p></div>;
}

function SpecHighlights({ rows, onChange }: { rows: { label: string; value: string }[]; onChange: (r: { label: string; value: string }[]) => void }) {
  return (
    <div className="space-y-2">
      {rows.map((r, i) => (
        <div key={i} className="flex gap-2">
          <input value={r.label} placeholder="e.g. Cleaning Speed" onChange={e => { const n = [...rows]; n[i] = { ...n[i], label: e.target.value }; onChange(n); }}
            className="flex-1 bg-[#0D0D0D] border border-[#2A2A2A] text-white px-3 py-2 text-[13px] focus:outline-none focus:border-[#FF6900]" />
          <input value={r.value} placeholder="e.g. 14ft mat in under 4 minutes" onChange={e => { const n = [...rows]; n[i] = { ...n[i], value: e.target.value }; onChange(n); }}
            className="flex-[2] bg-[#0D0D0D] border border-[#2A2A2A] text-white px-3 py-2 text-[13px] focus:outline-none focus:border-[#FF6900]" />
          <button type="button" onClick={() => onChange(rows.filter((_, j) => j !== i))} className="px-3 py-2 border border-[#333] text-[#555] hover:text-red-400 text-sm">×</button>
        </div>
      ))}
      <button type="button" onClick={() => onChange([...rows, { label: '', value: '' }])}
        className="px-4 py-2 border border-dashed border-[#333] font-ibm-plex-mono text-[9px] text-[#555] hover:text-[#FF6900] hover:border-[#FF6900] transition-colors uppercase tracking-widest w-full">
        + Add Highlight Row
      </button>
    </div>
  );
}

const INIT: Partial<BespokeBuild> = {
  name: '', slug: '', build_type: 'trailer', tagline: '', description: '',
  active: true, featured: false, spec_highlights: [], industries: [],
  primary_image_url: '', gallery_images: [], pdf_brochure_url: '',
  meta_title: '', meta_description: '', sort_order: 0,
};

export default function BespokeForm({ initial, id }: { initial?: Partial<BespokeBuild>; id?: string }) {
  const router = useRouter();
  const [form, setForm] = useState<Partial<BespokeBuild>>({ ...INIT, ...initial });
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'ok' | 'err' } | null>(null);

  const set = useCallback((field: keyof BespokeBuild, val: any) => {
    setForm(prev => {
      const next = { ...prev, [field]: val };
      if (field === 'name' && !id) next.slug = slugify(val as string);
      return next;
    });
  }, [id]);

  const inp = (field: keyof BespokeBuild, type = 'text', ph = '') => (
    <input type={type} value={(form[field] ?? '') as string} onChange={e => set(field, e.target.value)} placeholder={ph}
      className="w-full bg-[#0D0D0D] border border-[#2A2A2A] text-white px-4 py-2.5 font-inter text-sm focus:outline-none focus:border-[#FF6900]" />
  );

  const showToast = (msg: string, type: 'ok' | 'err') => { setToast({ msg, type }); setTimeout(() => setToast(null), 3000); };

  const save = async () => {
    setSaving(true);
    try {
      const url = id ? `/api/admin/bespoke/${id}` : '/api/admin/bespoke';
      const method = id ? 'PATCH' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (!res.ok) { const e = await res.json(); throw new Error(e.error || 'Save failed'); }
      showToast('Saved successfully', 'ok');
      if (!id) router.push('/admin/bespoke');
    } catch (e: any) { showToast(e.message, 'err'); } finally { setSaving(false); }
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
        <Field label="Name *">{inp('name', 'text', 'e.g. Wash Plant — Mat & Access Panel System')}</Field>
        <Field label="Slug" >{inp('slug', 'text', 'auto-generated')}</Field>
        <Field label="Build Type *">
          <select value={form.build_type || ''} onChange={e => set('build_type', e.target.value)}
            className="w-full bg-[#0D0D0D] border border-[#2A2A2A] text-white px-4 py-2.5 font-inter text-sm focus:outline-none focus:border-[#FF6900]">
            {BUILD_TYPES.map(t => <option key={t} value={t}>{t.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase())}</option>)}
          </select>
        </Field>
        <Field label="Tagline">{inp('tagline', 'text', 'Short description')}</Field>
      </div>
      <div className="flex gap-8 mb-2">
        <Toggle value={!!form.featured} onChange={v => set('featured', v)} label="Featured" />
        <Toggle value={!!form.active} onChange={v => set('active', v)} label="Active / Live" />
      </div>

      <SH label="Description" />
      <Field label="Full Description">
        <textarea rows={5} value={form.description || ''} onChange={e => set('description', e.target.value)}
          className="w-full bg-[#0D0D0D] border border-[#2A2A2A] text-white px-4 py-2.5 font-inter text-sm focus:outline-none focus:border-[#FF6900] resize-y"
          placeholder="Full description of this custom build..." />
      </Field>

      <SH label="Spec Highlights" />
      <SpecHighlights rows={(form.spec_highlights as any) || []} onChange={v => set('spec_highlights', v)} />

      <SH label="Industries" />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {INDUSTRIES.map(([key, label]) => (
          <label key={key} className="flex items-center gap-3 cursor-pointer p-3 border border-[#1F1F1F] hover:border-[#333] transition-colors">
            <input type="checkbox" checked={(form.industries || []).includes(key)}
              onChange={e => { const c = form.industries || []; set('industries', e.target.checked ? [...c, key] : c.filter(x => x !== key)); }}
              className="accent-[#FF6900]" />
            <span className="font-inter text-[13px] text-[#888]">{label}</span>
          </label>
        ))}
      </div>

      <SH label="Media" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="Primary Image URL">
          {inp('primary_image_url', 'text', 'https://...')}
          {form.primary_image_url && <img src={form.primary_image_url} alt="" className="mt-2 h-24 w-24 object-cover border border-[#222]" />}
        </Field>
        <Field label="Brochure PDF URL">{inp('pdf_brochure_url', 'text', 'https://...')}</Field>
      </div>

      <SH label="SEO" />
      <div className="space-y-4">
        <Field label={`Meta Title (${(form.meta_title || '').length}/60)`}>{inp('meta_title')}</Field>
        <Field label={`Meta Description (${(form.meta_description || '').length}/160)`}>
          <textarea rows={3} value={form.meta_description || ''} onChange={e => set('meta_description', e.target.value)}
            className="w-full bg-[#0D0D0D] border border-[#2A2A2A] text-white px-4 py-2.5 font-inter text-sm focus:outline-none focus:border-[#FF6900] resize-none" />
        </Field>
      </div>

      <div className="fixed bottom-0 left-[260px] right-0 flex items-center justify-between px-8 py-4 border-t border-[#1F1F1F] bg-[#0D0D0D] z-40">
        <button type="button" onClick={() => router.back()} className="font-ibm-plex-mono text-[10px] text-[#555] uppercase tracking-widest hover:text-white transition-colors">← Cancel</button>
        <button type="button" onClick={save} disabled={saving}
          className="px-6 py-2.5 bg-[#FF6900] font-ibm-plex-mono text-[10px] uppercase tracking-widest text-white hover:bg-[#e55f00] transition-all disabled:opacity-50">
          {saving ? 'Saving...' : id ? 'Save Changes' : 'Create Build'}
        </button>
      </div>
    </div>
  );
}
