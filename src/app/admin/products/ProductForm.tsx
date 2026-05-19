'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { Product, ProductCategory, Industry } from '@/lib/admin/types';
import { PRODUCT_CATEGORY_LABELS, INDUSTRY_LABELS } from '@/lib/admin/types';

const INDUSTRIES = Object.entries(INDUSTRY_LABELS) as [Industry, string][];
const CATEGORIES = Object.entries(PRODUCT_CATEGORY_LABELS) as [ProductCategory, string][];

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function TagInput({ value, onChange, placeholder }: { value: string[]; onChange: (v: string[]) => void; placeholder?: string }) {
  const [input, setInput] = useState('');
  const add = () => {
    const v = input.trim();
    if (v && !value.includes(v)) onChange([...value, v]);
    setInput('');
  };
  return (
    <div className="border border-[#2A2A2A] bg-[#0D0D0D] p-2 min-h-[44px] flex flex-wrap gap-1.5">
      {value.map(tag => (
        <span key={tag} className="flex items-center gap-1 px-2 py-0.5 bg-[#1A1A1A] border border-[#333] font-ibm-plex-mono text-[10px] text-white">
          {tag}
          <button type="button" onClick={() => onChange(value.filter(t => t !== tag))} className="text-[#555] hover:text-red-400 ml-1">×</button>
        </span>
      ))}
      <input
        value={input} onChange={e => setInput(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); add(); } }}
        onBlur={add}
        placeholder={placeholder || 'Type & press Enter'}
        className="flex-1 min-w-[120px] bg-transparent font-inter text-[13px] text-white focus:outline-none placeholder:text-[#444]"
      />
    </div>
  );
}

function Toggle({ value, onChange, label }: { value: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <div
        onClick={() => onChange(!value)}
        className="relative w-10 h-5 rounded-full transition-colors"
        style={{ background: value ? '#FF6900' : '#2A2A2A' }}
      >
        <div className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all" style={{ left: value ? '22px' : '2px' }} />
      </div>
      <span className="font-inter text-[13px] text-[#888]">{label}</span>
    </label>
  );
}

function SpecRow({ rows, onChange }: { rows: { label: string; value: string }[]; onChange: (r: { label: string; value: string }[]) => void }) {
  return (
    <div className="space-y-2">
      {rows.map((r, i) => (
        <div key={i} className="flex gap-2">
          <input value={r.label} placeholder="Label" onChange={e => { const n = [...rows]; n[i] = { ...n[i], label: e.target.value }; onChange(n); }}
            className="flex-1 bg-[#0D0D0D] border border-[#2A2A2A] text-white px-3 py-2 text-[13px] focus:outline-none focus:border-[#FF6900]" />
          <input value={r.value} placeholder="Value" onChange={e => { const n = [...rows]; n[i] = { ...n[i], value: e.target.value }; onChange(n); }}
            className="flex-1 bg-[#0D0D0D] border border-[#2A2A2A] text-white px-3 py-2 text-[13px] focus:outline-none focus:border-[#FF6900]" />
          <button type="button" onClick={() => onChange(rows.filter((_, j) => j !== i))} className="px-3 py-2 border border-[#333] text-[#555] hover:text-red-400 hover:border-red-800 transition-colors text-sm">×</button>
        </div>
      ))}
      <button type="button" onClick={() => onChange([...rows, { label: '', value: '' }])}
        className="px-4 py-2 border border-dashed border-[#333] font-ibm-plex-mono text-[9px] text-[#555] hover:text-[#FF6900] hover:border-[#FF6900] transition-colors uppercase tracking-widest w-full">
        + Add Spec Row
      </button>
    </div>
  );
}

function SectionHeader({ label }: { label: string }) {
  return (
    <div className="border-b border-[#1F1F1F] pb-3 mb-6 mt-10 first:mt-0">
      <p className="font-ibm-plex-mono text-[9px] font-black uppercase tracking-[0.3em] text-[#FF6900]">// {label}</p>
    </div>
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

const INITIAL: Partial<Product> = {
  name: '', slug: '', series: '', category: 'hot-water', tagline: '', description: '',
  featured: false, active: true, flow_rate_gpm: undefined, flow_rate_lpm: undefined,
  pressure_psi: undefined, pressure_bar: undefined, power_source: '', heating_fuel: '',
  voltage: '', portable: true, weight_kg: undefined, dimensions_mm: '', max_temp_c: undefined,
  warranty_years: undefined, certifications: [], extra_specs: [], industries: [],
  primary_image_url: '', gallery_images: [], pdf_spec_url: '', pdf_manual_url: '',
  meta_title: '', meta_description: '', sort_order: 0,
};

export default function ProductForm({ initial, id }: { initial?: Partial<Product>; id?: string }) {
  const router = useRouter();
  const [form, setForm] = useState<Partial<Product>>({ ...INITIAL, ...initial });
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'ok' | 'err' } | null>(null);

  const set = useCallback((field: keyof Product, val: any) => {
    setForm(prev => {
      const next = { ...prev, [field]: val };
      if (field === 'name' && !id) next.slug = slugify(val);
      if (field === 'flow_rate_gpm') next.flow_rate_lpm = val ? Math.round(val * 3.785 * 10) / 10 : undefined;
      if (field === 'flow_rate_lpm') next.flow_rate_gpm = val ? Math.round(val / 3.785 * 10) / 10 : undefined;
      if (field === 'pressure_psi') next.pressure_bar = val ? Math.round(val / 14.504 * 10) / 10 : undefined;
      if (field === 'pressure_bar') next.pressure_psi = val ? Math.round(val * 14.504) : undefined;
      return next;
    });
  }, [id]);

  const showToast = (msg: string, type: 'ok' | 'err') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const save = async (publish: boolean) => {
    setSaving(true);
    try {
      const body = { ...form, active: publish ? true : form.active };
      const url = id ? `/api/admin/products/${id}` : '/api/admin/products';
      const method = id ? 'PATCH' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      if (!res.ok) { const e = await res.json(); throw new Error(e.error || 'Save failed'); }
      showToast(id ? 'Product updated' : 'Product created', 'ok');
      if (!id) router.push('/admin/products');
    } catch (e: any) {
      showToast(e.message, 'err');
    } finally {
      setSaving(false);
    }
  };

  const inp = (field: keyof Product, type = 'text', placeholder = '') => (
    <input
      type={type}
      value={(form[field] ?? '') as string}
      onChange={e => set(field, type === 'number' ? (e.target.value ? parseFloat(e.target.value) : undefined) : e.target.value)}
      placeholder={placeholder}
      className="w-full bg-[#0D0D0D] border border-[#2A2A2A] text-white px-4 py-2.5 font-inter text-sm focus:outline-none focus:border-[#FF6900] transition-colors"
    />
  );

  return (
    <div className="pb-32">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 px-5 py-3 font-ibm-plex-mono text-[10px] uppercase tracking-widest ${toast.type === 'ok' ? 'bg-green-900/80 text-green-300 border border-green-700' : 'bg-red-900/80 text-red-300 border border-red-700'}`}>
          {toast.msg}
        </div>
      )}

      {/* SECTION 1: IDENTITY */}
      <SectionHeader label="Identity" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Field label="Product Name *">{inp('name', 'text', 'e.g. Alkota 5-4080H')}</Field>
        <Field label="Slug" note={`alkota.co.uk/machines/hot-water/${form.slug || '...'}`}>
          {inp('slug', 'text', 'auto-generated')}
        </Field>
        <Field label="Series">{inp('series', 'text', 'e.g. XH4 Series')}</Field>
        <Field label="Category *">
          <select value={form.category || ''} onChange={e => set('category', e.target.value)}
            className="w-full bg-[#0D0D0D] border border-[#2A2A2A] text-white px-4 py-2.5 font-inter text-sm focus:outline-none focus:border-[#FF6900]">
            {CATEGORIES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </Field>
        <Field label="Tagline" note="Max 80 chars">{inp('tagline', 'text', 'e.g. Elite portable electric hot water')}</Field>
        <Field label="Sort Order">{inp('sort_order', 'number', '0')}</Field>
      </div>
      <div className="flex gap-8 mb-2">
        <Toggle value={!!form.featured} onChange={v => set('featured', v)} label="Featured on homepage" />
        <Toggle value={!!form.active} onChange={v => set('active', v)} label="Active / Live" />
      </div>

      {/* SECTION 2: DESCRIPTION */}
      <SectionHeader label="Description" />
      <Field label="Full Description (Markdown supported)">
        <textarea
          rows={6} value={form.description || ''}
          onChange={e => set('description', e.target.value)}
          className="w-full bg-[#0D0D0D] border border-[#2A2A2A] text-white px-4 py-2.5 font-inter text-sm focus:outline-none focus:border-[#FF6900] resize-y"
          placeholder="Full product description..."
        />
      </Field>

      {/* SECTION 3: SPECS */}
      <SectionHeader label="Specifications" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Field label="Flow Rate (GPM)" note={form.flow_rate_gpm ? `= ${form.flow_rate_lpm} LPM` : ''}>{inp('flow_rate_gpm', 'number', '3.9')}</Field>
        <Field label="Flow Rate (LPM)" note={form.flow_rate_lpm ? `= ${form.flow_rate_gpm} GPM` : ''}>{inp('flow_rate_lpm', 'number', '14.8')}</Field>
        <Field label="Pressure (PSI)" note={form.pressure_psi ? `= ${form.pressure_bar} BAR` : ''}>{inp('pressure_psi', 'number', '3000')}</Field>
        <Field label="Pressure (BAR)" note={form.pressure_bar ? `= ${form.pressure_psi} PSI` : ''}>{inp('pressure_bar', 'number', '207')}</Field>
        <Field label="Power Source">{inp('power_source', 'text', 'Electric 230V')}</Field>
        <Field label="Heating Fuel">{inp('heating_fuel', 'text', 'Oil / Diesel / Kerosene')}</Field>
        <Field label="Voltage">{inp('voltage', 'text', '230V')}</Field>
        <Field label="Max Temp (°C)">{inp('max_temp_c', 'number', '150')}</Field>
        <Field label="Weight (KG)">{inp('weight_kg', 'number', '')}</Field>
        <Field label="Dimensions (MM)">{inp('dimensions_mm', 'text', '900 x 550 x 1100mm')}</Field>
        <Field label="Warranty (Years)">{inp('warranty_years', 'number', '7')}</Field>
        <div className="flex items-end pb-1">
          <Toggle value={!!form.portable} onChange={v => set('portable', v)} label="Portable unit" />
        </div>
      </div>
      <Field label="Certifications (press Enter after each)">
        <TagInput value={form.certifications || []} onChange={v => set('certifications', v)} placeholder="CE, UKCA, UL..." />
      </Field>
      <div className="mt-6">
        <Field label="Additional Specs">
          <SpecRow rows={(form.extra_specs as any) || []} onChange={v => set('extra_specs', v)} />
        </Field>
      </div>

      {/* SECTION 4: INDUSTRIES */}
      <SectionHeader label="Industries" />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {INDUSTRIES.map(([key, label]) => (
          <label key={key} className="flex items-center gap-3 cursor-pointer p-3 border border-[#1F1F1F] hover:border-[#333] transition-colors">
            <input
              type="checkbox"
              checked={(form.industries || []).includes(key)}
              onChange={e => {
                const curr = form.industries || [];
                set('industries', e.target.checked ? [...curr, key] : curr.filter(x => x !== key));
              }}
              className="accent-[#FF6900]"
            />
            <span className="font-inter text-[13px] text-[#888]">{label}</span>
          </label>
        ))}
      </div>

      {/* SECTION 5: MEDIA */}
      <SectionHeader label="Media" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="Primary Image URL">
          {inp('primary_image_url', 'text', 'https://...')}
          {form.primary_image_url && <img src={form.primary_image_url} alt="" className="mt-2 h-24 w-24 object-cover border border-[#222]" onError={() => {}} />}
        </Field>
        <Field label="Spec Sheet PDF URL">{inp('pdf_spec_url', 'text', 'https://...')}</Field>
        <Field label="Service Manual PDF URL">{inp('pdf_manual_url', 'text', 'https://...')}</Field>
      </div>

      {/* SECTION 6: SEO */}
      <SectionHeader label="SEO" />
      <div className="space-y-4">
        <Field label={`Meta Title (${(form.meta_title || '').length}/60 chars)`}>
          {inp('meta_title', 'text', 'e.g. Alkota 5-4080H | Hot Water Pressure Washer UK')}
        </Field>
        <Field label={`Meta Description (${(form.meta_description || '').length}/160 chars)`}>
          <textarea rows={3} value={form.meta_description || ''} onChange={e => set('meta_description', e.target.value)}
            className="w-full bg-[#0D0D0D] border border-[#2A2A2A] text-white px-4 py-2.5 font-inter text-sm focus:outline-none focus:border-[#FF6900] resize-none"
            placeholder="Meta description for search engines..."
          />
        </Field>
        {/* Google Preview */}
        {(form.meta_title || form.meta_description) && (
          <div className="p-4 border border-[#222] bg-[#0D0D0D]">
            <p className="font-ibm-plex-mono text-[8px] text-[#444] uppercase tracking-widest mb-2">Google Preview</p>
            <p className="text-blue-400 text-[16px] font-medium mb-0.5">{form.meta_title || form.name || 'Product Title'}</p>
            <p className="text-green-600 text-[12px] mb-1">alkota.co.uk › machines › {form.category} › {form.slug}</p>
            <p className="text-[#aaa] text-[13px] leading-relaxed">{form.meta_description || 'Meta description preview...'}</p>
          </div>
        )}
      </div>

      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-[260px] right-0 flex items-center justify-between px-8 py-4 border-t border-[#1F1F1F] bg-[#0D0D0D] z-40">
        <button type="button" onClick={() => router.back()} className="font-ibm-plex-mono text-[10px] text-[#555] uppercase tracking-widest hover:text-white transition-colors">
          ← Cancel
        </button>
        <div className="flex gap-3">
          <button type="button" onClick={() => save(false)} disabled={saving}
            className="px-6 py-2.5 border border-[#333] font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#888] hover:text-white hover:border-[#555] transition-all disabled:opacity-50">
            {saving ? 'Saving...' : 'Save Draft'}
          </button>
          <button type="button" onClick={() => save(true)} disabled={saving}
            className="px-6 py-2.5 bg-[#FF6900] font-ibm-plex-mono text-[10px] uppercase tracking-widest text-white hover:bg-[#e55f00] transition-all disabled:opacity-50">
            {saving ? 'Saving...' : id ? 'Save Changes' : 'Publish'}
          </button>
        </div>
      </div>
    </div>
  );
}
