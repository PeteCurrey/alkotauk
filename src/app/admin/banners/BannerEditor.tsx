'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';

const STYLES = [
  { value: 'info', label: 'Info', colour: '#3B82F6' },
  { value: 'promo', label: 'Promo', colour: '#FF6900' },
  { value: 'warning', label: 'Warning', colour: '#F59E0B' },
  { value: 'urgent', label: 'Urgent', colour: '#EF4444' },
];

interface BannerEditorProps { banner?: any }

export default function BannerEditor({ banner }: BannerEditorProps) {
  const router = useRouter();
  const isEdit = !!banner?.id;
  const [form, setForm] = useState({
    message: banner?.message || '',
    link_text: banner?.link_text || '',
    link_url: banner?.link_url || '',
    style: banner?.style || 'info',
    dismissible: banner?.dismissible ?? true,
    active: banner?.active ?? false,
    start_date: banner?.start_date ? banner.start_date.slice(0, 16) : '',
    end_date: banner?.end_date ? banner.end_date.slice(0, 16) : '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  function set(key: string, value: string | boolean) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function save() {
    if (!form.message.trim()) { setError('Message is required'); return; }
    setSaving(true);
    const url = isEdit ? `/api/admin/banners/${banner.id}` : '/api/admin/banners';
    const method = isEdit ? 'PATCH' : 'POST';
    const body = {
      ...form,
      start_date: form.start_date || null,
      end_date: form.end_date || null,
    };
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    if (res.ok) {
      router.push('/admin/banners');
      router.refresh();
    } else {
      const d = await res.json();
      setError(d.error || 'Save failed');
    }
    setSaving(false);
  }

  const selectedStyle = STYLES.find((s) => s.value === form.style);
  const charCount = form.message.length;

  return (
    <div className="text-white max-w-2xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/banners" className="flex items-center gap-2 font-ibm-plex-mono text-[10px] uppercase text-[#555] hover:text-[#FF6900] transition-colors">
          <ArrowLeft className="h-3 w-3" /> Back
        </Link>
        <h1 className="font-barlow-condensed text-3xl font-black uppercase italic">{isEdit ? 'Edit Banner' : 'New Banner'}</h1>
      </div>

      {error && <div className="border border-red-900/50 bg-red-950/30 px-4 py-3 mb-4 font-ibm-plex-mono text-[10px] text-red-400">{error}</div>}

      {/* Preview */}
      {form.message && (
        <div className="mb-6 px-4 py-3 flex items-center justify-between text-sm" style={{
          background: selectedStyle?.colour || '#3B82F6',
        }}>
          <span className="font-inter text-white text-[13px]">
            {form.message}
            {form.link_text && <a className="ml-3 underline font-semibold">{form.link_text}</a>}
          </span>
          {form.dismissible && <span className="text-white/70 text-lg ml-4">×</span>}
        </div>
      )}

      <div className="space-y-5">
        <div>
          <label className="block font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#555] mb-1.5">
            Message <span className="text-[#444]">({charCount}/120)</span>
          </label>
          <input
            value={form.message}
            onChange={(e) => set('message', e.target.value.slice(0, 120))}
            placeholder="Banner message..."
            className="w-full bg-[#141414] border border-[#222] text-white px-4 py-3 font-inter text-[14px] focus:outline-none focus:border-[#FF6900]"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#555] mb-1.5">Link Text (optional)</label>
            <input value={form.link_text} onChange={(e) => set('link_text', e.target.value)} placeholder="Request a Quote" className="w-full bg-[#141414] border border-[#222] text-white px-4 py-2.5 font-inter text-[13px] focus:outline-none focus:border-[#FF6900]" />
          </div>
          <div>
            <label className="block font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#555] mb-1.5">Link URL (optional)</label>
            <input value={form.link_url} onChange={(e) => set('link_url', e.target.value)} placeholder="/support" className="w-full bg-[#141414] border border-[#222] text-white px-4 py-2.5 font-inter text-[13px] focus:outline-none focus:border-[#FF6900]" />
          </div>
        </div>

        {/* Style */}
        <div>
          <label className="block font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#555] mb-3">Style</label>
          <div className="flex gap-3">
            {STYLES.map((s) => (
              <button
                key={s.value}
                onClick={() => set('style', s.value)}
                className="flex items-center gap-2 px-4 py-2.5 font-ibm-plex-mono text-[10px] uppercase tracking-widest border transition-all"
                style={{
                  borderColor: form.style === s.value ? s.colour : '#222',
                  color: form.style === s.value ? s.colour : '#555',
                  background: form.style === s.value ? `${s.colour}18` : '#141414',
                }}
              >
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.colour }} />{s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Schedule */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#555] mb-1.5">Start Date (optional)</label>
            <input type="datetime-local" value={form.start_date} onChange={(e) => set('start_date', e.target.value)} className="w-full bg-[#141414] border border-[#222] text-white px-4 py-2.5 font-inter text-[13px] focus:outline-none focus:border-[#FF6900]" />
          </div>
          <div>
            <label className="block font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#555] mb-1.5">End Date (optional)</label>
            <input type="datetime-local" value={form.end_date} onChange={(e) => set('end_date', e.target.value)} className="w-full bg-[#141414] border border-[#222] text-white px-4 py-2.5 font-inter text-[13px] focus:outline-none focus:border-[#FF6900]" />
          </div>
        </div>

        {/* Toggles */}
        <div className="flex gap-8">
          {[
            { key: 'dismissible', label: 'Dismissible by visitor' },
            { key: 'active', label: 'Active' },
          ].map(({ key, label }) => (
            <button key={key} onClick={() => set(key, !(form as any)[key])} className="flex items-center gap-3">
              <div className="relative inline-flex h-6 w-11 items-center" style={{ background: (form as any)[key] ? '#FF6900' : '#1A1A1A', border: '1px solid', borderColor: (form as any)[key] ? '#FF6900' : '#333' }}>
                <span className="inline-block h-4 w-4 bg-white transform transition-transform" style={{ transform: (form as any)[key] ? 'translateX(22px)' : 'translateX(2px)' }} />
              </div>
              <span className="font-inter text-[13px] text-[#888]">{label}</span>
            </button>
          ))}
        </div>

        <button onClick={save} disabled={saving} className="flex items-center gap-2 px-6 py-3 bg-[#FF6900] text-white font-ibm-plex-mono text-[10px] uppercase tracking-widest hover:bg-[#e55f00] transition-colors disabled:opacity-50">
          <Save className="h-4 w-4" />{saving ? 'Saving...' : 'Save Banner'}
        </button>
      </div>
    </div>
  );
}
