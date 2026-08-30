'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ExternalLink, Trash2, Plus, X, Image as ImageIcon,
  CheckCircle2, AlertTriangle, Sparkles, Globe, Eye, UploadCloud, FileText, ArrowLeft, Save
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
    <div className="border border-[#E6E8EC] bg-[#F6F7F9] rounded-2xl p-2.5 min-h-[46px] flex flex-wrap gap-1.5 focus-within:bg-white focus-within:border-[#FF6900] transition-colors">
      {value.map(tag => (
        <span key={tag} className="flex items-center gap-1.5 px-3 py-1 bg-white border border-[#E6E8EC] rounded-full text-xs font-semibold text-[#0F172A] shadow-sm">
          {tag}
          <button type="button" onClick={() => onChange(value.filter(t => t !== tag))} className="text-[#94A3B8] hover:text-red-500 ml-1">×</button>
        </span>
      ))}
      <input
        value={input} onChange={e => setInput(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); add(); } }}
        onBlur={add}
        placeholder={placeholder || 'Type & press Enter'}
        className="flex-1 min-w-[140px] bg-transparent text-xs text-[#0F172A] focus:outline-none placeholder:text-[#94A3B8]"
      />
    </div>
  );
}

function Toggle({ value, onChange, label, sub }: { value: boolean; onChange: (v: boolean) => void; label: string; sub?: string }) {
  return (
    <label className="flex items-center gap-3.5 cursor-pointer select-none">
      <div
        onClick={() => onChange(!value)}
        className="relative w-11 h-6 rounded-full transition-colors shrink-0"
        style={{ background: value ? '#FF6900' : '#E2E4E9' }}
      >
        <div className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all" style={{ left: value ? '24px' : '4px' }} />
      </div>
      <div>
        <span className="text-xs font-bold text-[#0F172A] block">{label}</span>
        {sub && <span className="text-[11px] text-[#64748B] block mt-0.5">{sub}</span>}
      </div>
    </label>
  );
}

function SpecRow({ rows, onChange }: { rows: { label: string; value: string }[]; onChange: (r: { label: string; value: string }[]) => void }) {
  return (
    <div className="space-y-2.5">
      {rows.map((r, i) => (
        <div key={i} className="flex gap-2.5">
          <input value={r.label} placeholder="e.g. Hose Length" onChange={e => { const n = [...rows]; n[i] = { ...n[i], label: e.target.value }; onChange(n); }}
            className="flex-1 bg-[#F6F7F9] border border-[#E6E8EC] rounded-xl text-[#0F172A] px-3.5 py-2 text-xs focus:bg-white focus:outline-none focus:border-[#FF6900]" />
          <input value={r.value} placeholder="e.g. 50 ft / 15m Wire Braided" onChange={e => { const n = [...rows]; n[i] = { ...n[i], value: e.target.value }; onChange(n); }}
            className="flex-1 bg-[#F6F7F9] border border-[#E6E8EC] rounded-xl text-[#0F172A] px-3.5 py-2 text-xs focus:bg-white focus:outline-none focus:border-[#FF6900]" />
          <button type="button" onClick={() => onChange(rows.filter((_, j) => j !== i))} className="h-8 w-8 rounded-full bg-[#F6F7F9] border border-[#E6E8EC] text-[#94A3B8] hover:text-red-500 hover:bg-red-50 transition-colors flex items-center justify-center text-sm shrink-0">×</button>
        </div>
      ))}
      <button type="button" onClick={() => onChange([...rows, { label: '', value: '' }])}
        className="px-4 py-2.5 border border-dashed border-[#CBD5E1] rounded-xl text-xs font-semibold text-[#64748B] hover:text-[#FF6900] hover:border-[#FF6900] transition-colors w-full text-center">
        + Add Custom Engineering Specification Row
      </button>
    </div>
  );
}

function SectionCard({ title, badge, children }: { title: string; badge?: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-[24px] border border-[#E6E8EC] p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-6">
      <div className="border-b border-[#F0F2F5] pb-4 flex items-center justify-between">
        <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#FF6900]">{title}</h3>
        {badge && <span className="px-2.5 py-1 rounded-full bg-[#F1F3F7] text-[10px] font-bold text-[#64748B] uppercase">{badge}</span>}
      </div>
      {children}
    </div>
  );
}

function Field({ label, children, note }: { label: string; children: React.ReactNode; note?: string }) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-wider text-[#475569] mb-2">{label}</label>
      {children}
      {note && <p className="text-[11px] text-[#94A3B8] font-medium mt-1.5">{note}</p>}
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
    formData.append('folder', 'products');

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Upload failed');
      }

      const { url } = await res.json();
      onChange(url);
    } catch (err: any) {
      console.error('Upload error:', err);
      setError(err.message || 'Error uploading file');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Field label={label} note={helper}>
      <div className="flex gap-2">
        <input
          type="text"
          value={value || ''}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder || 'https://... or upload below'}
          className="flex-1 bg-[#F6F7F9] border border-[#E6E8EC] rounded-xl text-[#0F172A] px-4 py-2.5 text-xs focus:bg-white focus:outline-none focus:border-[#FF6900]"
        />
        <label className="px-4 py-2.5 bg-white border border-[#E6E8EC] hover:bg-[#F6F7F9] rounded-xl text-xs font-bold text-[#334155] cursor-pointer flex items-center gap-1.5 transition-colors shrink-0 shadow-sm">
          <UploadCloud className="h-4 w-4 text-[#FF6900]" />
          <span>{uploading ? 'Uploading...' : 'Browse'}</span>
          <input type="file" accept={accept} onChange={handleUpload} className="hidden" disabled={uploading} />
        </label>
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </Field>
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
    setTimeout(() => setToast(null), 3500);
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

  const liveStoreUrl = `/machines/${form.category || 'hot-water'}/${form.slug || ''}`;

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-24">
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] border border-[#E6E8EC] p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-xl font-bold text-[#0F172A] mb-2">Delete Machine Record</h3>
            <p className="text-xs text-[#64748B] leading-relaxed mb-6 font-medium">
              Are you sure you want to permanently delete this product from the database and public catalogue?
            </p>
            <div className="flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="px-5 py-2.5 rounded-full border border-[#E6E8EC] text-xs font-semibold text-[#64748B] hover:bg-[#F8F9FA]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={deleteProduct}
                disabled={deleting}
                className="px-5 py-2.5 rounded-full bg-red-600 text-white text-xs font-bold hover:bg-red-700 disabled:opacity-50 shadow-sm"
              >
                {deleting ? 'Deleting...' : 'Confirm Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className={`fixed top-20 right-8 z-50 px-6 py-3 rounded-full text-xs font-bold shadow-2xl flex items-center gap-2 ${
          toast.type === 'ok' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
        }`}>
          {toast.type === 'ok' ? <CheckCircle2 className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
          <span>{toast.msg}</span>
        </div>
      )}

      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-20 z-20 bg-[#F4F5F8]/90 backdrop-blur-md py-3">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="h-10 w-10 rounded-full bg-white border border-[#E6E8EC] flex items-center justify-center text-[#64748B] hover:text-[#0F172A] shadow-sm transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">
              {id ? `Edit · ${form.name || 'Product'}` : 'Add New Machine'}
            </h1>
            <p className="text-xs text-[#64748B] font-medium">
              Database-backed specifications, commercial pricing, and SEO metadata
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {id && form.slug && (
            <Link
              href={liveStoreUrl}
              target="_blank"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white border border-[#E6E8EC] text-xs font-bold text-[#334155] hover:bg-[#F8F9FA] transition-colors shadow-sm"
            >
              <Eye className="h-3.5 w-3.5 text-[#FF6900]" />
              <span>Preview on Store</span>
              <ExternalLink className="h-3 w-3 text-[#94A3B8]" />
            </Link>
          )}

          <button
            type="button"
            onClick={() => save(false)}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#FF6900] text-white text-xs font-bold hover:bg-[#e55f00] disabled:opacity-50 transition-colors shadow-sm"
          >
            <Save className="h-4 w-4" />
            <span>{saving ? 'Saving...' : id ? 'Save Changes' : 'Create Machine'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Section 1: Basic Information */}
          <SectionCard title="Machine Identity & Catalogue Placement" badge="Core Data">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Model Name *">
                <input
                  required
                  type="text"
                  value={form.name || ''}
                  onChange={e => set('name', e.target.value)}
                  placeholder="e.g. Alkota 4355"
                  className="w-full bg-[#F6F7F9] border border-[#E6E8EC] rounded-xl text-[#0F172A] px-4 py-2.5 text-xs font-semibold focus:bg-white focus:border-[#FF6900] focus:outline-none"
                />
              </Field>
              <Field label="Series / Range">
                <input
                  type="text"
                  value={form.series || ''}
                  onChange={e => set('series', e.target.value)}
                  placeholder="e.g. 4-Series Oil Fired"
                  className="w-full bg-[#F6F7F9] border border-[#E6E8EC] rounded-xl text-[#0F172A] px-4 py-2.5 text-xs focus:bg-white focus:border-[#FF6900] focus:outline-none"
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Store Category *">
                <select
                  value={form.category || 'hot-water'}
                  onChange={e => set('category', e.target.value as ProductCategory)}
                  className="w-full bg-[#F6F7F9] border border-[#E6E8EC] rounded-xl text-[#0F172A] px-4 py-2.5 text-xs font-semibold focus:bg-white focus:border-[#FF6900] focus:outline-none"
                >
                  {CATEGORIES.map(([val, label]) => (
                    <option key={val} value={val}>{label}</option>
                  ))}
                </select>
              </Field>

              <Field label="URL Slug *">
                <input
                  required
                  type="text"
                  value={form.slug || ''}
                  onChange={e => set('slug', e.target.value)}
                  placeholder="e.g. alkota-4355"
                  className="w-full bg-[#F6F7F9] border border-[#E6E8EC] rounded-xl text-[#0F172A] px-4 py-2.5 text-xs font-mono focus:bg-white focus:border-[#FF6900] focus:outline-none"
                />
              </Field>
            </div>

            <Field label="Industrial Tagline">
              <input
                type="text"
                value={form.tagline || ''}
                onChange={e => set('tagline', e.target.value)}
                placeholder="e.g. Continuous heavy-duty hot water cleaning for plant and haulage"
                className="w-full bg-[#F6F7F9] border border-[#E6E8EC] rounded-xl text-[#0F172A] px-4 py-2.5 text-xs focus:bg-white focus:border-[#FF6900] focus:outline-none"
              />
            </Field>

            <Field label="UK Market Engineering Overview">
              <textarea
                rows={4}
                value={form.uk_description || form.description || ''}
                onChange={e => set('uk_description', e.target.value)}
                placeholder="High-authority UK market description focusing on power supply compatibility, pump durability, and typical applications..."
                className="w-full bg-[#F6F7F9] border border-[#E6E8EC] rounded-xl text-[#0F172A] px-4 py-2.5 text-xs focus:bg-white focus:border-[#FF6900] focus:outline-none"
              />
            </Field>
          </SectionCard>

          {/* Section 2: Technical Specifications */}
          <SectionCard title="Performance & Engineering Specifications" badge="Hydraulics & Power">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Field label="Pressure (PSI)">
                <input
                  type="number"
                  value={form.pressure_psi ?? ''}
                  onChange={e => set('pressure_psi', e.target.value ? Number(e.target.value) : undefined)}
                  placeholder="3000"
                  className="w-full bg-[#F6F7F9] border border-[#E6E8EC] rounded-xl text-[#0F172A] px-4 py-2.5 text-xs font-mono focus:bg-white focus:border-[#FF6900] focus:outline-none"
                />
              </Field>
              <Field label="Pressure (BAR)">
                <input
                  type="number"
                  value={form.pressure_bar ?? ''}
                  onChange={e => set('pressure_bar', e.target.value ? Number(e.target.value) : undefined)}
                  placeholder="207"
                  className="w-full bg-[#F6F7F9] border border-[#E6E8EC] rounded-xl text-[#0F172A] px-4 py-2.5 text-xs font-mono focus:bg-white focus:border-[#FF6900] focus:outline-none"
                />
              </Field>
              <Field label="Flow (GPM)">
                <input
                  type="number"
                  step="0.1"
                  value={form.flow_rate_gpm ?? ''}
                  onChange={e => set('flow_rate_gpm', e.target.value ? Number(e.target.value) : undefined)}
                  placeholder="4.0"
                  className="w-full bg-[#F6F7F9] border border-[#E6E8EC] rounded-xl text-[#0F172A] px-4 py-2.5 text-xs font-mono focus:bg-white focus:border-[#FF6900] focus:outline-none"
                />
              </Field>
              <Field label="Flow (LPM)">
                <input
                  type="number"
                  step="0.1"
                  value={form.flow_rate_lpm ?? ''}
                  onChange={e => set('flow_rate_lpm', e.target.value ? Number(e.target.value) : undefined)}
                  placeholder="15.1"
                  className="w-full bg-[#F6F7F9] border border-[#E6E8EC] rounded-xl text-[#0F172A] px-4 py-2.5 text-xs font-mono focus:bg-white focus:border-[#FF6900] focus:outline-none"
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Field label="Power Source / Motor">
                <input
                  type="text"
                  value={form.power_source || ''}
                  onChange={e => set('power_source', e.target.value)}
                  placeholder="e.g. Electric 400V 3-Phase / Honda GX390"
                  className="w-full bg-[#F6F7F9] border border-[#E6E8EC] rounded-xl text-[#0F172A] px-4 py-2.5 text-xs focus:bg-white focus:border-[#FF6900] focus:outline-none"
                />
              </Field>
              <Field label="Heating Fuel">
                <input
                  type="text"
                  value={form.heating_fuel || ''}
                  onChange={e => set('heating_fuel', e.target.value)}
                  placeholder="e.g. Diesel / Kerosene / Electric"
                  className="w-full bg-[#F6F7F9] border border-[#E6E8EC] rounded-xl text-[#0F172A] px-4 py-2.5 text-xs focus:bg-white focus:border-[#FF6900] focus:outline-none"
                />
              </Field>
              <Field label="Voltage / Power Supply">
                <input
                  type="text"
                  value={form.voltage || ''}
                  onChange={e => set('voltage', e.target.value)}
                  placeholder="e.g. 400V 3-Phase 50Hz"
                  className="w-full bg-[#F6F7F9] border border-[#E6E8EC] rounded-xl text-[#0F172A] px-4 py-2.5 text-xs font-mono focus:bg-white focus:border-[#FF6900] focus:outline-none"
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Field label="Pump Spec">
                <input
                  type="text"
                  value={form.pump_type || ''}
                  onChange={e => set('pump_type', e.target.value)}
                  placeholder="e.g. Triplex Ceramic Plunger Pump"
                  className="w-full bg-[#F6F7F9] border border-[#E6E8EC] rounded-xl text-[#0F172A] px-4 py-2.5 text-xs focus:bg-white focus:border-[#FF6900] focus:outline-none"
                />
              </Field>
              <Field label="Coil Spec">
                <input
                  type="text"
                  value={form.coil_type || 'Schedule 80 Hydro-Insulated'}
                  onChange={e => set('coil_type', e.target.value)}
                  placeholder="Schedule 80 Hydro-Insulated"
                  className="w-full bg-[#F6F7F9] border border-[#E6E8EC] rounded-xl text-[#0F172A] px-4 py-2.5 text-xs focus:bg-white focus:border-[#FF6900] focus:outline-none"
                />
              </Field>
              <Field label="Coil Warranty (Years)">
                <input
                  type="number"
                  value={form.warranty_years ?? 7}
                  onChange={e => set('warranty_years', Number(e.target.value))}
                  placeholder="7"
                  className="w-full bg-[#F6F7F9] border border-[#E6E8EC] rounded-xl text-[#0F172A] px-4 py-2.5 text-xs font-mono focus:bg-white focus:border-[#FF6900] focus:outline-none"
                />
              </Field>
            </div>
          </SectionCard>

          {/* Section 3: Visual & Document Assets */}
          <SectionCard title="Product Photography & Documentation" badge="Asset Pipeline">
            <FileUploadField
              label="Primary Studio Cutout / Photo URL *"
              value={form.primary_image_url || ''}
              onChange={url => set('primary_image_url', url)}
              accept="image/*"
              placeholder="https://..."
              helper="Primary high-resolution machine photography used on storefront and card grids."
            />

            {form.primary_image_url && (
              <div className="p-4 rounded-2xl bg-[#F6F7F9] border border-[#E6E8EC] flex items-center gap-4">
                <div className="h-16 w-16 rounded-xl bg-white border border-[#E6E8EC] p-1 flex items-center justify-center shrink-0">
                  <img src={form.primary_image_url} alt="Preview" className="h-full w-full object-contain" />
                </div>
                <div className="flex-1 min-w-0 text-xs">
                  <p className="font-bold text-[#0F172A]">Primary Cutout Photography Set</p>
                  <p className="text-[#64748B] truncate">{form.primary_image_url}</p>
                </div>
                <button
                  type="button"
                  onClick={() => set('primary_image_url', '')}
                  className="text-xs text-red-500 font-bold hover:underline"
                >
                  Remove
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FileUploadField
                label="Official Spec Sheet (PDF)"
                value={form.pdf_spec_url || ''}
                onChange={url => set('pdf_spec_url', url)}
                accept="application/pdf"
                placeholder="https://.../data-sheet.pdf"
                helper="Downloadable specification PDF link."
              />
              <FileUploadField
                label="Operator Manual (PDF)"
                value={form.pdf_manual_url || ''}
                onChange={url => set('pdf_manual_url', url)}
                accept="application/pdf"
                placeholder="https://.../manual.pdf"
                helper="Operator instructions and parts diagram PDF."
              />
            </div>

            {/* Additional Gallery */}
            <div>
              <Field label="Additional Machine Gallery Photos">
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={galleryInput}
                    onChange={e => setGalleryInput(e.target.value)}
                    placeholder="Paste image URL to add to gallery..."
                    className="flex-1 bg-[#F6F7F9] border border-[#E6E8EC] rounded-xl text-[#0F172A] px-4 py-2.5 text-xs focus:bg-white focus:outline-none focus:border-[#FF6900]"
                  />
                  <button
                    type="button"
                    onClick={addGalleryImage}
                    className="px-5 py-2.5 bg-white border border-[#E6E8EC] text-xs font-bold text-[#334155] rounded-xl hover:bg-[#F8F9FA] transition-colors shadow-sm"
                  >
                    Add Image
                  </button>
                </div>

                {(form.gallery_images || []).length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {(form.gallery_images || []).map((img, idx) => (
                      <div key={idx} className="relative group bg-[#F6F7F9] border border-[#E6E8EC] rounded-2xl p-2 overflow-hidden">
                        <img src={img} alt={`Gallery ${idx}`} className="h-24 w-full object-contain" />
                        <button
                          type="button"
                          onClick={() => set('gallery_images', form.gallery_images?.filter((_, i) => i !== idx))}
                          className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </Field>
            </div>
          </SectionCard>

          {/* Section 4: Features & Applications */}
          <SectionCard title="Engineering Features & Applications" badge="Commercial Tags">
            <Field label="Key Engineering Features (Press Enter to add)">
              <TagInput
                value={form.features || []}
                onChange={v => set('features', v)}
                placeholder="e.g. Schedule 80 Hydro-Insulated Coil"
              />
            </Field>

            <Field label="Target Industrial Applications (Press Enter to add)">
              <TagInput
                value={form.applications || []}
                onChange={v => set('applications', v)}
                placeholder="e.g. Plant Washdown, Haulage Degreasing"
              />
            </Field>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#475569] mb-2.5">Applicable Industry Sectors</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {INDUSTRIES.map(([val, label]) => {
                  const checked = (form.industries || []).includes(val);
                  return (
                    <label key={val} className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                      checked ? 'bg-[#111] text-white border-[#111]' : 'bg-[#F6F7F9] border-[#E6E8EC] text-[#475569] hover:bg-white'
                    }`}>
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={e => {
                          const curr = form.industries || [];
                          set('industries', e.target.checked ? [...curr, val] : curr.filter(i => i !== val));
                        }}
                        className="hidden"
                      />
                      <span>{label}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </SectionCard>

          {/* Section 5: SEO Suite & SERP Preview */}
          <SectionCard title="SEO & Google SERP Preview" badge="Rankings">
            <Field label="Meta Title" note={`${(form.meta_title || '').length}/60 recommended characters`}>
              <input
                type="text"
                value={form.meta_title || ''}
                onChange={e => set('meta_title', e.target.value)}
                placeholder={`${form.name || 'Machine'} | Industrial Specification | Alkota UK`}
                className="w-full bg-[#F6F7F9] border border-[#E6E8EC] rounded-xl text-[#0F172A] px-4 py-2.5 text-xs focus:bg-white focus:border-[#FF6900] focus:outline-none"
              />
            </Field>

            <Field label="Meta Description" note={`${(form.meta_description || '').length}/160 recommended characters`}>
              <textarea
                rows={3}
                value={form.meta_description || ''}
                onChange={e => set('meta_description', e.target.value)}
                placeholder={`Discover the ${form.name || 'Alkota'} pressure washer from Alkota UK. Delivering ${form.pressure_bar || 200} Bar pressure and ${form.flow_rate_lpm || 15} L/min flow rate for heavy industry.`}
                className="w-full bg-[#F6F7F9] border border-[#E6E8EC] rounded-xl text-[#0F172A] px-4 py-2.5 text-xs focus:bg-white focus:border-[#FF6900] focus:outline-none"
              />
            </Field>

            {/* Google SERP Card Preview */}
            <div className="bg-[#F8F9FA] rounded-2xl p-5 border border-[#E6E8EC] space-y-1 font-sans">
              <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5 text-[#FF6900]" /> Google Search Result Simulation
              </p>
              <p className="text-xs text-[#202124]">https://alkota.co.uk &rsaquo; machines &rsaquo; {form.category || 'hot-water'} &rsaquo; {form.slug || 'product-slug'}</p>
              <h4 className="text-base font-semibold text-[#1a0dab] hover:underline cursor-pointer">
                {form.meta_title || `${form.name || 'Alkota Machine'} | Industrial Specification | Alkota UK`}
              </h4>
              <p className="text-xs text-[#4d5156] leading-relaxed">
                {form.meta_description || form.tagline || `${form.name || 'Alkota Machine'} — Precision engineered industrial pressure washer built for demanding UK operations.`}
              </p>
            </div>
          </SectionCard>
        </div>

        {/* Right Column (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Commercial & Pricing Card */}
          <SectionCard title="Commercial & Pricing">
            <Field label="Pricing Protocol">
              <select
                value={form.pricing_type || 'request_quote'}
                onChange={e => set('pricing_type', e.target.value as ProductPricingType)}
                className="w-full bg-[#F6F7F9] border border-[#E6E8EC] rounded-xl text-[#0F172A] px-4 py-2.5 text-xs font-semibold focus:bg-white focus:border-[#FF6900] focus:outline-none"
              >
                <option value="request_quote">Request Pricing (Default)</option>
                <option value="fixed_price">Fixed List Price (£)</option>
              </select>
            </Field>

            {form.pricing_type === 'fixed_price' && (
              <Field label="List Price (GBP Ex. VAT)">
                <input
                  type="number"
                  value={form.price ?? ''}
                  onChange={e => set('price', e.target.value ? Number(e.target.value) : undefined)}
                  placeholder="e.g. 5450"
                  className="w-full bg-[#F6F7F9] border border-[#E6E8EC] rounded-xl text-[#0F172A] px-4 py-2.5 text-xs font-mono font-bold focus:bg-white focus:border-[#FF6900] focus:outline-none"
                />
              </Field>
            )}

            <Field label="Stock Availability Status">
              <select
                value={form.availability || 'quote_only'}
                onChange={e => set('availability', e.target.value as ProductAvailability)}
                className="w-full bg-[#F6F7F9] border border-[#E6E8EC] rounded-xl text-[#0F172A] px-4 py-2.5 text-xs font-semibold focus:bg-white focus:border-[#FF6900] focus:outline-none"
              >
                <option value="built_to_order">Built to Order (UK Factory Spec)</option>
                <option value="in_stock">UK Stock Ready for Dispatch</option>
                <option value="lead_time_2_weeks">2 Weeks Lead Time</option>
                <option value="quote_only">Quote Only (Custom Configuration)</option>
              </select>
            </Field>
          </SectionCard>

          {/* Visibility & Status Card */}
          <SectionCard title="Store Visibility & Badges">
            <div className="space-y-4">
              <Toggle
                value={form.active || false}
                onChange={v => set('active', v)}
                label="Live on Storefront"
                sub="Publicly accessible in catalogue"
              />
              <Toggle
                value={form.featured || false}
                onChange={v => set('featured', v)}
                label="Featured Machine"
                sub="Promote on homepage showcase"
              />
              <Toggle
                value={form.is_elite_series || false}
                onChange={v => set('is_elite_series', v)}
                label="Elite Series Badge"
                sub="Designate as flagship specification"
              />
              <Toggle
                value={form.portable || false}
                onChange={v => set('portable', v)}
                label="Portable Frame"
                sub="Includes industrial wheel kit"
              />
            </div>

            <div className="pt-4 border-t border-[#F0F2F5]">
              <Field label="Catalogue Sort Order">
                <input
                  type="number"
                  value={form.sort_order ?? 0}
                  onChange={e => set('sort_order', Number(e.target.value))}
                  className="w-full bg-[#F6F7F9] border border-[#E6E8EC] rounded-xl text-[#0F172A] px-4 py-2.5 text-xs font-mono focus:bg-white focus:border-[#FF6900] focus:outline-none"
                />
              </Field>
            </div>
          </SectionCard>

          {/* Delete Danger Zone */}
          {id && (
            <div className="bg-red-50/70 rounded-[24px] border border-red-200/70 p-6 space-y-3">
              <p className="text-xs font-bold text-red-900 uppercase tracking-wider">Danger Zone</p>
              <p className="text-xs text-red-700 font-medium">
                Permanently delete this product from the database and all store catalogues.
              </p>
              <button
                type="button"
                onClick={() => setShowDeleteModal(true)}
                className="w-full py-2.5 rounded-full border border-red-300 text-xs font-bold text-red-700 bg-white hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
              >
                <Trash2 className="h-3.5 w-3.5" /> Delete Machine
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
