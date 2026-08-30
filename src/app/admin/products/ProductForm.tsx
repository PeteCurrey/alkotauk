'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ExternalLink, Trash2, Plus, X, Image as ImageIcon,
  CheckCircle2, AlertTriangle, Sparkles, Globe, Eye
} from 'lucide-react';
import type { Product, ProductCategory, Industry, ProductPricingType, ProductAvailability } from '@/lib/admin/types';
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
        <span key={tag} className="flex items-center gap-1 px-2.5 py-1 bg-[#1A1A1A] border border-[#333] font-ibm-plex-mono text-[10px] text-white">
          {tag}
          <button type="button" onClick={() => onChange(value.filter(t => t !== tag))} className="text-[#888] hover:text-red-400 ml-1.5">×</button>
        </span>
      ))}
      <input
        value={input} onChange={e => setInput(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); add(); } }}
        onBlur={add}
        placeholder={placeholder || 'Type & press Enter'}
        className="flex-1 min-w-[140px] bg-transparent font-inter text-[13px] text-white focus:outline-none placeholder:text-[#555]"
      />
    </div>
  );
}

function Toggle({ value, onChange, label, sub }: { value: boolean; onChange: (v: boolean) => void; label: string; sub?: string }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none">
      <div
        onClick={() => onChange(!value)}
        className="relative w-10 h-5 rounded-full transition-colors shrink-0"
        style={{ background: value ? '#FF6900' : '#2A2A2A' }}
      >
        <div className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all" style={{ left: value ? '22px' : '2px' }} />
      </div>
      <div>
        <span className="font-inter text-[13px] text-[#CCC] block">{label}</span>
        {sub && <span className="font-inter text-[10px] text-[#666] block">{sub}</span>}
      </div>
    </label>
  );
}

function SpecRow({ rows, onChange }: { rows: { label: string; value: string }[]; onChange: (r: { label: string; value: string }[]) => void }) {
  return (
    <div className="space-y-2">
      {rows.map((r, i) => (
        <div key={i} className="flex gap-2">
          <input value={r.label} placeholder="e.g. Hose Length" onChange={e => { const n = [...rows]; n[i] = { ...n[i], label: e.target.value }; onChange(n); }}
            className="flex-1 bg-[#0D0D0D] border border-[#2A2A2A] text-white px-3 py-2 text-[13px] focus:outline-none focus:border-[#FF6900]" />
          <input value={r.value} placeholder="e.g. 50 ft / 15m Wire Braided" onChange={e => { const n = [...rows]; n[i] = { ...n[i], value: e.target.value }; onChange(n); }}
            className="flex-1 bg-[#0D0D0D] border border-[#2A2A2A] text-white px-3 py-2 text-[13px] focus:outline-none focus:border-[#FF6900]" />
          <button type="button" onClick={() => onChange(rows.filter((_, j) => j !== i))} className="px-3 py-2 border border-[#333] text-[#777] hover:text-red-400 hover:border-red-800 transition-colors text-sm">×</button>
        </div>
      ))}
      <button type="button" onClick={() => onChange([...rows, { label: '', value: '' }])}
        className="px-4 py-2.5 border border-dashed border-[#333] font-ibm-plex-mono text-[9px] text-[#777] hover:text-[#FF6900] hover:border-[#FF6900] transition-colors uppercase tracking-widest w-full text-center">
        + Add Custom Specification Row
      </button>
    </div>
  );
}

function SectionHeader({ label, badge }: { label: string; badge?: string }) {
  return (
    <div className="border-b border-[#222] pb-3 mb-6 mt-10 first:mt-0 flex items-center justify-between">
      <p className="font-ibm-plex-mono text-[10px] font-black uppercase tracking-[0.3em] text-[#FF6900]">// {label}</p>
      {badge && <span className="font-ibm-plex-mono text-[9px] text-[#666] uppercase">{badge}</span>}
    </div>
  );
}

function Field({ label, children, note }: { label: string; children: React.ReactNode; note?: string }) {
  return (
    <div>
      <label className="block font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#777] mb-2">{label}</label>
      {children}
      {note && <p className="font-inter text-[11px] text-[#555] mt-1">{note}</p>}
    </div>
  );
}

function FileUploadField({
  label,
  value,
  onChange,
  accept,
  placeholder,
  helper,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  accept: string;
  placeholder?: string;
  helper?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Upload failed');
      }

      const data = await res.json();
      onChange(data.url);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="block font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#777] mb-2">{label}</label>
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-[#0D0D0D] border border-[#2A2A2A] text-white px-4 py-2.5 font-inter text-sm focus:outline-none focus:border-[#FF6900] transition-colors"
        />
        <label className="relative shrink-0 flex items-center justify-center px-4 border border-[#333] font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#888] hover:text-white hover:border-[#FF6900] transition-all cursor-pointer bg-[#141414]">
          {uploading ? 'Uploading...' : 'Upload'}
          <input
            type="file"
            accept={accept}
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>
      {error && <p className="font-ibm-plex-mono text-[9px] text-red-500 mt-1 uppercase">{error}</p>}
      {helper && <p className="font-inter text-[11px] text-[#555] mt-1">{helper}</p>}
    </div>
  );
}

const INITIAL: Partial<Product> = {
  name: '', slug: '', series: '', category: 'hot-water', subcategory: '', tagline: '', description: '',
  uk_description: '', engineering_story: '', featured: false, active: true, is_elite_series: false,
  pricing_type: 'request_quote', availability: 'quote_only', price: undefined,
  flow_rate_gpm: undefined, flow_rate_lpm: undefined, pressure_psi: undefined, pressure_bar: undefined,
  power_source: '', heating_fuel: '', voltage: '', portable: true, weight_kg: undefined, dimensions_mm: '',
  max_temp_c: undefined, warranty_years: 7, pump_type: '', coil_type: 'Schedule 80 Hydro-Insulated',
  certifications: ['CE', 'UKCA'], extra_specs: [], features: [], options: [], applications: [], industries: [],
  primary_image_url: '', cutout_image_url: '', gallery_images: [], pdf_spec_url: '', pdf_manual_url: '',
  meta_title: '', meta_description: '', canonical_url: '', no_index: false, sort_order: 0,
};

export default function ProductForm({ initial, id }: { initial?: Partial<Product>; id?: string }) {
  const router = useRouter();
  const [form, setForm] = useState<Partial<Product>>({ ...INITIAL, ...initial });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [galleryInput, setGalleryInput] = useState('');
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
      showToast(id ? 'Product updated successfully' : 'Product created successfully', 'ok');
      if (!id) router.push('/admin/products');
    } catch (e: any) {
      showToast(e.message, 'err');
    } finally {
      setSaving(false);
    }
  };

  const deleteProduct = async () => {
    if (!id) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
      if (!res.ok) { const e = await res.json(); throw new Error(e.error || 'Delete failed'); }
      showToast('Product removed from database', 'ok');
      router.push('/admin/products');
    } catch (e: any) {
      showToast(e.message, 'err');
      setDeleting(false);
      setShowDeleteModal(false);
    }
  };

  const addGalleryImage = () => {
    const val = galleryInput.trim();
    if (val) {
      const current = form.gallery_images || [];
      if (!current.includes(val)) {
        set('gallery_images', [...current, val]);
      }
      setGalleryInput('');
    }
  };

  const removeGalleryImage = (idx: number) => {
    const current = form.gallery_images || [];
    set('gallery_images', current.filter((_, i) => i !== idx));
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

  const liveStoreUrl = `/machines/${form.category || 'hot-water'}/${form.slug || ''}`;

  return (
    <div className="pb-36">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 px-5 py-3 font-ibm-plex-mono text-[10px] uppercase tracking-widest shadow-2xl ${toast.type === 'ok' ? 'bg-green-950 text-green-300 border border-green-700' : 'bg-red-950 text-red-300 border border-red-700'}`}>
          {toast.msg}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#141414] border border-red-900/60 p-8 max-w-md w-full">
            <h3 className="font-barlow-condensed text-2xl font-black uppercase italic text-white mb-2">Delete Product</h3>
            <p className="font-inter text-sm text-[#888] mb-6">
              Are you sure you want to permanently delete <strong className="text-white">{form.name}</strong> from the database? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3 font-ibm-plex-mono text-[10px] uppercase tracking-widest">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-[#333] text-[#888] hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={deleteProduct}
                disabled={deleting}
                className="px-5 py-2 bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
              >
                {deleting ? 'Deleting...' : 'Confirm Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Quick Action Bar */}
      {id && (
        <div className="mb-8 flex items-center justify-between border border-[#222] bg-[#141414] p-4">
          <div className="flex items-center gap-3">
            <span className={`h-2.5 w-2.5 rounded-full ${form.active ? 'bg-green-500' : 'bg-amber-500'}`} />
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#888]">
              Status: <strong className="text-white">{form.active ? 'Live on Store' : 'Draft / Hidden'}</strong>
            </span>
          </div>
          <Link
            href={liveStoreUrl}
            target="_blank"
            className="inline-flex items-center gap-2 px-3 py-1.5 border border-[#333] font-ibm-plex-mono text-[10px] uppercase tracking-widest text-white hover:border-[#FF6900] hover:text-[#FF6900] transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5" /> View on Live Store
          </Link>
        </div>
      )}

      {/* SECTION 1: IDENTITY & CATEGORY */}
      <SectionHeader label="Identity & Store Categorisation" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Field label="Product Name *">{inp('name', 'text', 'e.g. Alkota 5355HNL')}</Field>
        <Field label="URL Slug" note={`Live URL: /machines/${form.category || 'hot-water'}/${form.slug || '...'}`}>
          {inp('slug', 'text', 'auto-generated')}
        </Field>
        <Field label="Series / Family">{inp('series', 'text', 'e.g. HN / XH4 Series')}</Field>
        <Field label="Store Category *">
          <select 
            value={form.category || 'hot-water'} 
            onChange={e => set('category', e.target.value)}
            className="w-full bg-[#0D0D0D] border border-[#2A2A2A] text-white px-4 py-2.5 font-inter text-sm focus:outline-none focus:border-[#FF6900]"
          >
            {CATEGORIES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </Field>
        <Field label="Subcategory / Mounting">{inp('subcategory', 'text', 'e.g. Stationary Electric / Skid')}</Field>
        <Field label="Tagline" note="Glanceable summary banner">{inp('tagline', 'text', 'e.g. Continuous heavy-duty industrial degreasing')}</Field>
        <Field label="Sort Order Index">{inp('sort_order', 'number', '0')}</Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-4 bg-[#141414] border border-[#222] mb-8">
        <Toggle value={!!form.active} onChange={v => set('active', v)} label="Active on Store" sub="Visible in customer catalogues" />
        <Toggle value={!!form.featured} onChange={v => set('featured', v)} label="Featured Showcase" sub="Promoted on homepage & hero strips" />
        <Toggle value={!!form.is_elite_series} onChange={v => set('is_elite_series', v)} label="Elite Series Badge" sub="Renders gold industrial credential" />
      </div>

      {/* SECTION 2: COMMERCIAL, PRICING & AVAILABILITY */}
      <SectionHeader label="Commercial & Availability" badge="Currently defaulted to Request Pricing" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Field label="Pricing Display Mode">
          <select
            value={form.pricing_type || 'request_quote'}
            onChange={e => set('pricing_type', e.target.value as ProductPricingType)}
            className="w-full bg-[#0D0D0D] border border-[#2A2A2A] text-white px-4 py-2.5 font-inter text-sm focus:outline-none focus:border-[#FF6900]"
          >
            <option value="request_quote">Request Pricing (Default / Active)</option>
            <option value="fixed_price">Fixed Direct Price (£)</option>
          </select>
        </Field>

        <Field label="Indicative Price (£ GBP)" note="Optional reference price if toggled to Fixed">
          {inp('price', 'number', 'e.g. 8450')}
        </Field>

        <Field label="Inventory / Availability Status">
          <select
            value={form.availability || 'quote_only'}
            onChange={e => set('availability', e.target.value as ProductAvailability)}
            className="w-full bg-[#0D0D0D] border border-[#2A2A2A] text-white px-4 py-2.5 font-inter text-sm focus:outline-none focus:border-[#FF6900]"
          >
            <option value="quote_only">Request Quote Only</option>
            <option value="in_stock">UK Stock Ready</option>
            <option value="built_to_order">Built to Order (South Dakota)</option>
            <option value="lead_time_2_weeks">Lead Time 2–3 Weeks</option>
          </select>
        </Field>
      </div>

      {/* SECTION 3: DESCRIPTIONS & EDITORIAL */}
      <SectionHeader label="Descriptions & Technical Narrative" />
      <div className="space-y-6 mb-8">
        <Field label="Main Editorial Description">
          <textarea
            rows={5} value={form.description || ''}
            onChange={e => set('description', e.target.value)}
            className="w-full bg-[#0D0D0D] border border-[#2A2A2A] text-white px-4 py-2.5 font-inter text-sm focus:outline-none focus:border-[#FF6900] resize-y"
            placeholder="Full technical overview of machine capability, metallurgy, and performance..."
          />
        </Field>

        <Field label="UK Market / Compliance Description">
          <textarea
            rows={4} value={form.uk_description || ''}
            onChange={e => set('uk_description', e.target.value)}
            className="w-full bg-[#0D0D0D] border border-[#2A2A2A] text-white px-4 py-2.5 font-inter text-sm focus:outline-none focus:border-[#FF6900] resize-y"
            placeholder="Specific UK trade effluent, environmental regulations, or power specification notes..."
          />
        </Field>

        <Field label="Engineering Story">
          <textarea
            rows={3} value={form.engineering_story || ''}
            onChange={e => set('engineering_story', e.target.value)}
            className="w-full bg-[#0D0D0D] border border-[#2A2A2A] text-white px-4 py-2.5 font-inter text-sm focus:outline-none focus:border-[#FF6900] resize-y"
            placeholder="Deep engineering rationale behind coil design, ceramic plungers, or frame durability..."
          />
        </Field>
      </div>

      {/* SECTION 4: SPECIFICATIONS */}
      <SectionHeader label="Engineering Specifications" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Field label="Flow Rate (GPM)" note={form.flow_rate_gpm ? `= ${form.flow_rate_lpm} LPM` : ''}>{inp('flow_rate_gpm', 'number', 'e.g. 5.0')}</Field>
        <Field label="Flow Rate (LPM)" note={form.flow_rate_lpm ? `= ${form.flow_rate_gpm} GPM` : ''}>{inp('flow_rate_lpm', 'number', 'e.g. 19.0')}</Field>
        <Field label="Pressure (PSI)" note={form.pressure_psi ? `= ${form.pressure_bar} BAR` : ''}>{inp('pressure_psi', 'number', 'e.g. 3500')}</Field>
        <Field label="Pressure (BAR)" note={form.pressure_bar ? `= ${form.pressure_psi} PSI` : ''}>{inp('pressure_bar', 'number', 'e.g. 240')}</Field>
        <Field label="Power Source">{inp('power_source', 'text', 'Electric 400V 3-Phase')}</Field>
        <Field label="Heating Fuel">{inp('heating_fuel', 'text', 'Diesel / Kerosene / Gas')}</Field>
        <Field label="Voltage / Phase">{inp('voltage', 'text', '400V 3PH 50Hz')}</Field>
        <Field label="Max Temp (°C)">{inp('max_temp_c', 'number', '140')}</Field>
        <Field label="Weight (KG)">{inp('weight_kg', 'number', '320')}</Field>
        <Field label="Dimensions (MM)">{inp('dimensions_mm', 'text', '1200 x 750 x 980mm')}</Field>
        <Field label="Coil Type">{inp('coil_type', 'text', 'Schedule 80 Hydro-Insulated')}</Field>
        <Field label="Warranty (Years)">{inp('warranty_years', 'number', '7')}</Field>
      </div>

      <div className="space-y-4 mb-6">
        <Field label="Standard Features (Press Enter after each)">
          <TagInput value={form.features || []} onChange={v => set('features', v)} placeholder="Ceramic Triplex Pump, Soft Damping System, Heavy Gauge Chassis..." />
        </Field>
        <Field label="Target Application Use-Cases">
          <TagInput value={form.applications || []} onChange={v => set('applications', v)} placeholder="Heavy Fleet Degreasing, Plant Machinery, Food Production..." />
        </Field>
        <Field label="Certifications">
          <TagInput value={form.certifications || []} onChange={v => set('certifications', v)} placeholder="CE, UKCA, UL..." />
        </Field>
      </div>

      <Field label="Custom Technical Specs">
        <SpecRow rows={(form.extra_specs as any) || []} onChange={v => set('extra_specs', v)} />
      </Field>

      {/* SECTION 5: INDUSTRY TAGS */}
      <SectionHeader label="Target Industries" />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
        {INDUSTRIES.map(([key, label]) => (
          <label key={key} className="flex items-center gap-3 cursor-pointer p-3 border border-[#1F1F1F] bg-[#0E0E0E] hover:border-[#333] transition-colors">
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

      {/* SECTION 6: MEDIA & IMAGE MANAGEMENT */}
      <SectionHeader label="Media & Image Management" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <FileUploadField
            label="Primary Product Image URL *"
            value={form.primary_image_url || ''}
            onChange={val => set('primary_image_url', val)}
            accept="image/*"
            placeholder="https://... or /assets/products/..."
          />
          {form.primary_image_url && (
            <div className="mt-3 p-2 bg-[#0D0D0D] border border-[#222] inline-block">
              <img src={form.primary_image_url} alt="Preview" className="h-28 w-28 object-contain" onError={() => {}} />
            </div>
          )}
        </div>

        <div>
          <FileUploadField
            label="Transparent Cutout Image URL (Optional)"
            value={form.cutout_image_url || ''}
            onChange={val => set('cutout_image_url', val)}
            accept="image/*"
            placeholder="https://... or /assets/cutouts/..."
          />
          {form.cutout_image_url && (
            <div className="mt-3 p-2 bg-[#0D0D0D] border border-[#222] inline-block">
              <img src={form.cutout_image_url} alt="Preview" className="h-28 w-28 object-contain" onError={() => {}} />
            </div>
          )}
        </div>
      </div>

      {/* Gallery Images */}
      <div className="mb-6 border border-[#222] bg-[#141414] p-5">
        <label className="block font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#777] mb-3">Product Photo Gallery</label>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={galleryInput}
            onChange={e => setGalleryInput(e.target.value)}
            placeholder="Add gallery image URL..."
            className="flex-1 bg-[#0D0D0D] border border-[#2A2A2A] text-white px-4 py-2 text-sm focus:outline-none focus:border-[#FF6900]"
          />
          <button
            type="button"
            onClick={addGalleryImage}
            className="px-4 py-2 bg-[#222] border border-[#333] font-ibm-plex-mono text-[9px] uppercase tracking-widest text-white hover:border-[#FF6900]"
          >
            + Add to Gallery
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {(form.gallery_images || []).map((imgUrl, i) => (
            <div key={i} className="relative group border border-[#2A2A2A] bg-[#0D0D0D] p-1">
              <img src={imgUrl} alt="" className="h-20 w-full object-cover" onError={() => {}} />
              <button
                type="button"
                onClick={() => removeGalleryImage(i)}
                className="absolute top-1 right-1 bg-red-600 text-white h-5 w-5 rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ×
              </button>
            </div>
          ))}
          {(form.gallery_images || []).length === 0 && (
            <p className="col-span-full font-inter text-xs text-[#555] italic">No gallery images added yet.</p>
          )}
        </div>
      </div>

      {/* Documents */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <FileUploadField
          label="Official Specification Sheet PDF"
          value={form.pdf_spec_url || ''}
          onChange={val => set('pdf_spec_url', val)}
          accept="application/pdf"
          placeholder="https://... or /literature/..."
        />
        <FileUploadField
          label="Service & Operating Manual PDF"
          value={form.pdf_manual_url || ''}
          onChange={val => set('pdf_manual_url', val)}
          accept="application/pdf"
          placeholder="https://... or /literature/..."
        />
      </div>

      {/* SECTION 7: SEO SUITE & GOOGLE SERP PREVIEW */}
      <SectionHeader label="SEO & Metadata Suite" />
      <div className="space-y-6 mb-8">
        <Field label={`Meta Title (${(form.meta_title || '').length}/60 characters)`} note="Recommended: 50–60 chars for high SERP click-through rate">
          {inp('meta_title', 'text', 'e.g. Alkota 5355HNL | Industrial Hot Water Pressure Washer UK')}
        </Field>

        <Field label={`Meta Description (${(form.meta_description || '').length}/160 characters)`} note="Recommended: 140–160 chars summarizing capacity and compliance">
          <textarea
            rows={3}
            value={form.meta_description || ''}
            onChange={e => set('meta_description', e.target.value)}
            className="w-full bg-[#0D0D0D] border border-[#2A2A2A] text-white px-4 py-2.5 font-inter text-sm focus:outline-none focus:border-[#FF6900] resize-none"
            placeholder="Meta description for search engines and social share previews..."
          />
        </Field>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field label="Canonical URL Override (Optional)">
            {inp('canonical_url', 'text', 'https://alkota.co.uk/...')}
          </Field>
          <div className="flex items-center pt-6">
            <Toggle
              value={!!form.no_index}
              onChange={v => set('no_index', v)}
              label="Block Search Indexing (noindex)"
              sub="Hide this machine from Google search engines"
            />
          </div>
        </div>

        {/* Live SERP Preview */}
        <div className="border border-[#222] bg-[#0E0E0E] p-5 mt-4">
          <div className="flex items-center gap-2 mb-3">
            <Globe className="h-4 w-4 text-[#FF6900]" />
            <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#777]">Live Google Search Result Preview</span>
          </div>
          <div className="bg-[#181818] p-4 border border-[#262626] font-sans max-w-xl">
            <div className="flex items-center gap-2 text-xs text-[#8ab4f8] mb-1">
              <span className="text-white/80">https://alkota.co.uk</span>
              <span className="text-[#666]">› machines › {form.category || 'hot-water'} › {form.slug || 'model'}</span>
            </div>
            <p className="text-[#8ab4f8] hover:underline text-[18px] font-medium leading-snug cursor-pointer mb-1">
              {form.meta_title || `${form.name || 'Alkota Machine'} | Industrial Heavy Duty Cleaning | Alkota UK`}
            </p>
            <p className="text-[#bdc1c6] text-[13px] leading-relaxed">
              {form.meta_description || form.tagline || form.description?.slice(0, 150) || 'Engineered in South Dakota for continuous heavy industrial duty across the United Kingdom.'}
            </p>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Action Footer */}
      <div className="fixed bottom-0 left-[260px] right-0 flex items-center justify-between px-8 py-4 border-t border-[#1F1F1F] bg-[#0D0D0D]/95 backdrop-blur-md z-40">
        <div className="flex items-center gap-4">
          <button type="button" onClick={() => router.back()} className="font-ibm-plex-mono text-[10px] text-[#666] uppercase tracking-widest hover:text-white transition-colors">
            ← Back
          </button>
          {id && (
            <button
              type="button"
              onClick={() => setShowDeleteModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 font-ibm-plex-mono text-[10px] uppercase tracking-widest text-red-400 hover:text-red-300 border border-red-900/40 hover:border-red-600 transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5" /> Delete
            </button>
          )}
        </div>

        <div className="flex gap-3 font-ibm-plex-mono text-[10px] uppercase tracking-widest">
          {id && (
            <Link
              href={liveStoreUrl}
              target="_blank"
              className="px-5 py-2.5 border border-[#333] text-white hover:border-[#FF6900] transition-colors inline-flex items-center gap-2"
            >
              <Eye className="h-3.5 w-3.5" /> Preview Store
            </Link>
          )}
          <button
            type="button"
            onClick={() => save(false)}
            disabled={saving}
            className="px-6 py-2.5 border border-[#333] text-[#888] hover:text-white hover:border-[#555] transition-all disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Draft'}
          </button>
          <button
            type="button"
            onClick={() => save(true)}
            disabled={saving}
            className="px-6 py-2.5 bg-[#FF6900] text-white hover:bg-[#e55f00] transition-all disabled:opacity-50 shadow-lg shadow-orange-950/20"
          >
            {saving ? 'Saving...' : id ? 'Save & Publish Changes' : 'Create & Publish'}
          </button>
        </div>
      </div>
    </div>
  );
}
