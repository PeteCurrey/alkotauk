'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { IndustryPage } from '@/lib/admin/types';

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
  return <div><label className="block font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#666] mb-2">{label}</label>{children}{note && <p className="font-inter text-[11px] text-[#555] mt-1">{note}</p>}</div>;
}

function SH({ label }: { label: string }) {
  return <div className="border-b border-[#1F1F1F] pb-3 mb-6 mt-10 first:mt-0"><p className="font-ibm-plex-mono text-[9px] font-black uppercase tracking-[0.3em] text-[#FF6900]">// {label}</p></div>;
}

export default function IndustryForm({ initial, id }: { initial?: Partial<IndustryPage>; id?: string }) {
  const router = useRouter();
  const [form, setForm] = useState<Partial<IndustryPage>>({ published: true, ...initial });
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'ok' | 'err' } | null>(null);

  const set = useCallback((field: keyof IndustryPage, val: any) => setForm(prev => ({ ...prev, [field]: val })), []);

  const inp = (field: keyof IndustryPage, type = 'text', ph = '') => (
    <input type={type} value={(form[field] ?? '') as string} onChange={e => set(field, e.target.value)} placeholder={ph}
      className="w-full bg-[#0D0D0D] border border-[#2A2A2A] text-white px-4 py-2.5 font-inter text-sm focus:outline-none focus:border-[#FF6900]" />
  );

  const showToast = (msg: string, type: 'ok' | 'err') => { setToast({ msg, type }); setTimeout(() => setToast(null), 3000); };

  const save = async () => {
    setSaving(true);
    try {
      const url = id ? `/api/admin/industries/${id}` : '/api/admin/industries';
      const method = id ? 'PATCH' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (!res.ok) { const e = await res.json(); throw new Error(e.error || 'Save failed'); }
      showToast('Saved', 'ok');
      if (!id) router.push('/admin/industries');
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
        <Field label="Industry Name *">{inp('name', 'text', 'e.g. Agriculture & Farming')}</Field>
        <Field label="Slug" note={`alkota.co.uk/industries/${form.slug || '...'}`}>{inp('slug', 'text', 'e.g. agriculture')}</Field>
      </div>
      <Toggle value={!!form.published} onChange={v => set('published', v)} label="Published" />

      <SH label="Page Content" />
      <div className="space-y-6">
        <Field label="Headline (H1)">{inp('headline', 'text', 'e.g. Industrial Pressure Washers for Agriculture & Farming')}</Field>
        <Field label="Intro Paragraph">
          <textarea rows={4} value={form.intro || ''} onChange={e => set('intro', e.target.value)}
            className="w-full bg-[#0D0D0D] border border-[#2A2A2A] text-white px-4 py-2.5 font-inter text-sm focus:outline-none focus:border-[#FF6900] resize-y"
            placeholder="Opening paragraph for this industry page..." />
        </Field>
        <Field label="Body Content (Markdown)">
          <textarea rows={12} value={form.body_content || ''} onChange={e => set('body_content', e.target.value)}
            className="w-full bg-[#0D0D0D] border border-[#2A2A2A] text-white px-4 py-2.5 font-inter text-sm focus:outline-none focus:border-[#FF6900] resize-y font-ibm-plex-mono"
            placeholder="Full page content in Markdown..." />
        </Field>
        <Field label="Hero Image URL">
          {inp('hero_image_url', 'text', 'https://...')}
          {form.hero_image_url && <img src={form.hero_image_url} alt="" className="mt-2 h-24 object-cover border border-[#222] w-full max-w-sm" />}
        </Field>
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
          {saving ? 'Saving...' : 'Save Page'}
        </button>
      </div>
    </div>
  );
}
