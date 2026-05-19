'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { Post, PostCategory } from '@/lib/admin/types';

const CATEGORIES: PostCategory[] = ['guide', 'industry-news', 'product-update', 'case-study'];

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

function Field({ label, children, note }: { label: string; children: React.ReactNode; note?: string }) {
  return <div><label className="block font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#666] mb-2">{label}</label>{children}{note && <p className="font-inter text-[11px] text-[#555] mt-1">{note}</p>}</div>;
}

function SH({ label }: { label: string }) {
  return <div className="border-b border-[#1F1F1F] pb-3 mb-6 mt-10 first:mt-0"><p className="font-ibm-plex-mono text-[9px] font-black uppercase tracking-[0.3em] text-[#FF6900]">// {label}</p></div>;
}

const INIT: Partial<Post> = {
  title: '', slug: '', excerpt: '', content: '', category: 'guide', tags: [],
  featured_image_url: '', published: false, published_at: '', meta_title: '', meta_description: '',
};

export default function PostForm({ initial, id }: { initial?: Partial<Post>; id?: string }) {
  const router = useRouter();
  const [form, setForm] = useState<Partial<Post>>({ ...INIT, ...initial });
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'ok' | 'err' } | null>(null);

  const set = useCallback((field: keyof Post, val: any) => {
    setForm(prev => {
      const next = { ...prev, [field]: val };
      if (field === 'title' && !id) next.slug = slugify(val as string);
      return next;
    });
  }, [id]);

  const inp = (field: keyof Post, type = 'text', ph = '') => (
    <input type={type} value={(form[field] ?? '') as string} onChange={e => set(field, e.target.value)} placeholder={ph}
      className="w-full bg-[#0D0D0D] border border-[#2A2A2A] text-white px-4 py-2.5 font-inter text-sm focus:outline-none focus:border-[#FF6900]" />
  );

  const showToast = (msg: string, type: 'ok' | 'err') => { setToast({ msg, type }); setTimeout(() => setToast(null), 3000); };

  const save = async (publish?: boolean) => {
    setSaving(true);
    try {
      const body = { ...form };
      if (publish) { body.published = true; body.published_at = new Date().toISOString(); }
      const url = id ? `/api/admin/posts/${id}` : '/api/admin/posts';
      const method = id ? 'PATCH' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      if (!res.ok) { const e = await res.json(); throw new Error(e.error || 'Save failed'); }
      showToast(publish ? 'Post published!' : 'Saved', 'ok');
      if (!id) router.push('/admin/posts');
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
        <Field label="Title *">{inp('title', 'text', 'e.g. How to clean your agricultural equipment')}</Field>
        <Field label="Slug" note={`alkota.co.uk/blog/${form.slug || '...'}`}>{inp('slug')}</Field>
        <Field label="Category">
          <select value={form.category || ''} onChange={e => set('category', e.target.value as PostCategory)}
            className="w-full bg-[#0D0D0D] border border-[#2A2A2A] text-white px-4 py-2.5 font-inter text-sm focus:outline-none focus:border-[#FF6900]">
            {CATEGORIES.map(c => <option key={c} value={c}>{c.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</option>)}
          </select>
        </Field>
        <Field label="Featured Image URL">
          {inp('featured_image_url', 'text', 'https://...')}
          {form.featured_image_url && <img src={form.featured_image_url} alt="" className="mt-2 h-16 object-cover border border-[#222]" />}
        </Field>
      </div>
      <Field label={`Excerpt (${(form.excerpt || '').length}/160 chars)`}>
        <textarea rows={2} value={form.excerpt || ''} onChange={e => set('excerpt', e.target.value)}
          className="w-full bg-[#0D0D0D] border border-[#2A2A2A] text-white px-4 py-2.5 font-inter text-sm focus:outline-none focus:border-[#FF6900] resize-none" />
      </Field>
      <div className="mt-4 mb-2">
        <Field label="Tags"><TagInput value={form.tags || []} onChange={v => set('tags', v)} placeholder="agriculture, cleaning tips..." /></Field>
      </div>

      <SH label="Content" />
      <Field label="Content (Markdown supported)">
        <textarea rows={20} value={form.content || ''} onChange={e => set('content', e.target.value)}
          className="w-full bg-[#0D0D0D] border border-[#2A2A2A] text-white px-4 py-2.5 font-inter text-sm focus:outline-none focus:border-[#FF6900] resize-y font-ibm-plex-mono"
          placeholder="Write your post content here... Markdown supported." />
      </Field>

      <SH label="Publish Settings" />
      <div className="flex gap-8 mb-6">
        <Toggle value={!!form.published} onChange={v => set('published', v)} label="Published" />
      </div>
      {form.published && (
        <Field label="Published Date">
          <input type="datetime-local" value={form.published_at ? new Date(form.published_at).toISOString().slice(0, 16) : ''}
            onChange={e => set('published_at', e.target.value ? new Date(e.target.value).toISOString() : '')}
            className="bg-[#0D0D0D] border border-[#2A2A2A] text-white px-4 py-2.5 font-inter text-sm focus:outline-none focus:border-[#FF6900]" />
        </Field>
      )}

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
        <div className="flex gap-3">
          <button type="button" onClick={() => save(false)} disabled={saving}
            className="px-6 py-2.5 border border-[#333] font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#888] hover:text-white hover:border-[#555] transition-all disabled:opacity-50">
            {saving ? 'Saving...' : 'Save Draft'}
          </button>
          <button type="button" onClick={() => save(true)} disabled={saving}
            className="px-6 py-2.5 bg-[#FF6900] font-ibm-plex-mono text-[10px] uppercase tracking-widest text-white hover:bg-[#e55f00] transition-all disabled:opacity-50">
            {saving ? 'Saving...' : id ? 'Save Changes' : 'Publish Now'}
          </button>
        </div>
      </div>
    </div>
  );
}
