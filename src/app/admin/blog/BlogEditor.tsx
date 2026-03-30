'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Eye } from 'lucide-react';

const CATEGORIES = ['news', 'application', 'maintenance', 'industry', 'product', 'compliance'];

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
}

export default function BlogEditor({ post }: { post?: any }) {
  const router = useRouter();
  const isEdit = !!post?.id;
  const [form, setForm] = useState({
    title: post?.title || '',
    slug: post?.slug || '',
    excerpt: post?.excerpt || '',
    content: post?.content || '',
    category: post?.category || 'news',
    published: post?.published ?? false,
    featured_image_url: post?.featured_image_url || '',
    meta_title: post?.meta_title || '',
    meta_description: post?.meta_description || '',
    author: post?.author || 'Alkota UK',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [seoOpen, setSeoOpen] = useState(false);

  function setField(key: string, value: string | boolean) {
    setForm((f) => {
      const next = { ...f, [key]: value };
      if (key === 'title' && !isEdit) next.slug = slugify(value as string);
      return next;
    });
  }

  async function save(publish?: boolean) {
    setSaving(true);
    setError('');
    const body = { ...form, published: publish !== undefined ? publish : form.published };
    const url = isEdit ? `/api/admin/blog/${post.id}` : '/api/admin/blog';
    const method = isEdit ? 'PATCH' : 'POST';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      const data = await res.json();
      router.push(`/admin/blog/${data.id}/edit`);
      router.refresh();
    } else {
      const d = await res.json();
      setError(d.error || 'Save failed');
    }
    setSaving(false);
  }

  return (
    <div className="text-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/blog" className="flex items-center gap-2 font-ibm-plex-mono text-[10px] uppercase text-[#555] hover:text-[#FF6900] transition-colors">
            <ArrowLeft className="h-3 w-3" /> Back
          </Link>
          <h1 className="font-barlow-condensed text-3xl font-black uppercase italic">
            {isEdit ? 'Edit Post' : 'New Post'}
          </h1>
        </div>
      </div>

      {error && <div className="border border-red-900/50 bg-red-950/30 px-4 py-3 mb-4 font-ibm-plex-mono text-[10px] text-red-400 uppercase tracking-wide">{error}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Content */}
        <div className="lg:col-span-2 space-y-4">
          <div>
            <label className="block font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#555] mb-1.5">Title</label>
            <input
              value={form.title}
              onChange={(e) => setField('title', e.target.value)}
              placeholder="Post title..."
              className="w-full bg-[#141414] border border-[#222] text-white px-4 py-3 font-barlow-condensed text-2xl font-black italic focus:outline-none focus:border-[#FF6900]"
            />
          </div>

          <div>
            <label className="block font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#555] mb-1.5">Slug</label>
            <input
              value={form.slug}
              onChange={(e) => setField('slug', e.target.value)}
              placeholder="post-url-slug"
              className="w-full bg-[#141414] border border-[#222] text-[#888] px-4 py-2 font-ibm-plex-mono text-[12px] focus:outline-none focus:border-[#FF6900]"
            />
          </div>

          <div>
            <label className="block font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#555] mb-1.5">Excerpt</label>
            <textarea
              value={form.excerpt}
              onChange={(e) => setField('excerpt', e.target.value)}
              placeholder="Short excerpt shown on blog listing..."
              rows={3}
              className="w-full bg-[#141414] border border-[#222] text-white px-4 py-3 font-inter text-[13px] resize-y focus:outline-none focus:border-[#FF6900]"
            />
          </div>

          <div>
            <label className="block font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#555] mb-1.5">
              Content (Markdown)
            </label>
            <p className="font-ibm-plex-mono text-[9px] text-[#444] mb-2"># H1 &nbsp; ## H2 &nbsp; **bold** &nbsp; *italic* &nbsp; [link](url) &nbsp; --- (rule)</p>
            <textarea
              value={form.content}
              onChange={(e) => setField('content', e.target.value)}
              placeholder="Write your post content in Markdown..."
              rows={20}
              className="w-full bg-[#0D0D0D] border border-[#222] text-white px-4 py-3 font-ibm-plex-mono text-[13px] resize-y focus:outline-none focus:border-[#FF6900] leading-relaxed"
            />
          </div>
        </div>

        {/* Right: Settings */}
        <div className="space-y-4 lg:sticky lg:top-20 self-start">
          {/* Status */}
          <div className="border border-[#222] bg-[#141414] p-5">
            <p className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#444] mb-4">// Status</p>
            <button
              onClick={() => save(!form.published)}
              disabled={saving}
              className="w-full py-3 font-black uppercase tracking-[0.2em] text-[11px] transition-all"
              style={{ background: form.published ? '#1A1A1A' : '#FF6900', color: form.published ? '#888' : '#fff', border: form.published ? '1px solid #333' : 'none' }}
            >
              {saving ? 'Saving...' : form.published ? 'Save Changes →' : 'Publish Post →'}
            </button>
            <button
              onClick={() => save(false)}
              disabled={saving}
              className="w-full mt-2 py-2 font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#555] hover:text-white transition-colors"
            >
              Save as Draft
            </button>
          </div>

          {/* Category */}
          <div className="border border-[#222] bg-[#141414] p-5">
            <label className="block font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#444] mb-3">Category</label>
            <select
              value={form.category}
              onChange={(e) => setField('category', e.target.value)}
              className="w-full bg-[#0D0D0D] border border-[#222] text-white px-3 py-2 font-inter text-[13px] focus:outline-none focus:border-[#FF6900]"
            >
              {CATEGORIES.map((c) => <option key={c} value={c} className="capitalize">{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
            </select>
          </div>

          {/* Featured Image */}
          <div className="border border-[#222] bg-[#141414] p-5">
            <label className="block font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#444] mb-3">Featured Image URL</label>
            <input
              value={form.featured_image_url}
              onChange={(e) => setField('featured_image_url', e.target.value)}
              placeholder="https://..."
              className="w-full bg-[#0D0D0D] border border-[#222] text-white px-3 py-2 font-inter text-[13px] focus:outline-none focus:border-[#FF6900]"
            />
          </div>

          {/* SEO */}
          <div className="border border-[#222] bg-[#141414]">
            <button
              onClick={() => setSeoOpen(!seoOpen)}
              className="w-full flex items-center justify-between px-5 py-3 font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#444] hover:text-white transition-colors"
            >
              SEO Settings <span>{seoOpen ? '−' : '+'}</span>
            </button>
            {seoOpen && (
              <div className="px-5 pb-5 space-y-3">
                <div>
                  <label className="block font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#444] mb-1.5">Meta Title</label>
                  <input value={form.meta_title} onChange={(e) => setField('meta_title', e.target.value)} className="w-full bg-[#0D0D0D] border border-[#222] text-white px-3 py-2 font-inter text-[13px] focus:outline-none focus:border-[#FF6900]" />
                </div>
                <div>
                  <label className="block font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#444] mb-1.5">Meta Description</label>
                  <textarea value={form.meta_description} onChange={(e) => setField('meta_description', e.target.value)} rows={3} className="w-full bg-[#0D0D0D] border border-[#222] text-white px-3 py-2 font-inter text-[13px] resize-none focus:outline-none focus:border-[#FF6900]" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
