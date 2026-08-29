'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { Chemical, ChemicalCategory, ChemicalUKStatus } from '@/lib/admin/types';
import { CHEMICAL_CATEGORY_LABELS } from '@/lib/admin/types';

const CATEGORIES = Object.entries(CHEMICAL_CATEGORY_LABELS) as [ChemicalCategory, string][];

const UK_STATUS_OPTIONS: { label: string; value: ChemicalUKStatus }[] = [
  { label: 'Published (Publicly Live)', value: 'published' },
  { label: 'Needs UK Review (Staged / Unverified)', value: 'needs_uk_review' },
  { label: 'UK Approved (Ready for Release)', value: 'uk_approved' },
  { label: 'Draft (Internal Work in Progress)', value: 'draft' },
  { label: 'Archived (Discontinued)', value: 'archived' },
];

const SIGNAL_WORD_OPTIONS = [
  { label: 'None (Non-Hazardous)', value: 'NONE' },
  { label: 'Warning (Irritant / Mild Hazard)', value: 'WARNING' },
  { label: 'Danger (Corrosive / Severe Hazard)', value: 'DANGER' },
];

const FOOD_STATUS_OPTIONS = [
  { label: 'Non-Food / General Industrial', value: 'non_food' },
  { label: 'Food Equipment (Potable Rinse Required)', value: 'rinse_required' },
  { label: 'Validated Food Contact Surface', value: 'validated_contact' },
  { label: 'Under Regulatory Review', value: 'under_review' },
];

const MEDIA_STATUS_OPTIONS = [
  { label: 'Placeholder Active (Editorial slot ready)', value: 'placeholder_active' },
  { label: 'Media Required (Needs photography/render)', value: 'media_required' },
  { label: 'Media Verified (Final verified photography)', value: 'media_verified' },
];

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function TagInput({
  value,
  onChange,
  placeholder
}: {
  value: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
}) {
  const [input, setInput] = useState('');
  const add = () => {
    const v = input.trim();
    if (v && !value.includes(v)) onChange([...value, v]);
    setInput('');
  };

  return (
    <div className="border border-[#2A2A2A] bg-[#0D0D0D] p-2 min-h-[44px] flex flex-wrap gap-1.5">
      {value.map((tag) => (
        <span
          key={tag}
          className="flex items-center gap-1 px-2 py-0.5 bg-[#1A1A1A] border border-[#333] font-ibm-plex-mono text-[10px] text-white"
        >
          {tag}
          <button
            type="button"
            onClick={() => onChange(value.filter((t) => t !== tag))}
            className="text-[#666] hover:text-red-400 ml-1 cursor-pointer"
          >
            ×
          </button>
        </span>
      ))}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            add();
          }
        }}
        onBlur={add}
        placeholder={placeholder || 'Type & press Enter'}
        className="flex-1 min-w-[120px] bg-transparent font-inter text-[13px] text-white focus:outline-none placeholder:text-[#444]"
      />
    </div>
  );
}

function Toggle({
  value,
  onChange,
  label
}: {
  value: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none">
      <div
        onClick={() => onChange(!value)}
        className="relative w-10 h-5 rounded-full transition-colors"
        style={{ background: value ? '#FF6900' : '#2A2A2A' }}
      >
        <div
          className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all"
          style={{ left: value ? '22px' : '2px' }}
        />
      </div>
      <span className="font-inter text-[13px] text-[#AAA]">{label}</span>
    </label>
  );
}

function Field({
  label,
  children,
  note
}: {
  label: string;
  children: React.ReactNode;
  note?: string;
}) {
  return (
    <div>
      <label className="block font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#777] mb-2">
        {label}
      </label>
      {children}
      {note && <p className="font-inter text-[11px] text-[#555] mt-1">{note}</p>}
    </div>
  );
}

function SH({ label }: { label: string }) {
  return (
    <div className="border-b border-[#1F1F1F] pb-3 mb-6 mt-10 first:mt-0">
      <p className="font-ibm-plex-mono text-[9px] font-black uppercase tracking-[0.3em] text-[#FF6900]">
        // {label}
      </p>
    </div>
  );
}

const INIT: Partial<Chemical> = {
  name: '',
  slug: '',
  code: '',
  category: 'degreasers',
  tagline: '',
  description: '',
  uk_status: 'needs_uk_review',
  active: true,
  featured: false,
  form: 'Concentrated Liquid',
  appearance: '',
  ph_level: '',
  specific_gravity: '',
  active_ingredients: [],
  voc_content: '',
  biodegradability_claim: 'Readily Biodegradable (OECD 301B)',
  biodegradable: true,
  hazardous: false,
  food_safe: false,
  food_process_status: 'non_food',
  use_cases: [],
  compatible_surfaces: [],
  not_suitable_for: [],
  contamination_types: [],
  application_methods: [],
  compatible_equipment_types: [],
  dilution_hot: '',
  dilution_cold: '',
  surface_notes: '',
  application_notes: '',
  water_recovery_compatible: true,
  separator_compatible: true,
  recycling_compatible: false,
  water_recovery_notes: '',
  hazard_classification: '',
  signal_word: 'NONE',
  hazard_pictograms: [],
  hazard_statements: [],
  precautionary_statements: [],
  available_sizes: ['5L', '25L', '200L Drum', '1000L IBC'],
  storage_notes: '',
  shelf_life: '24 Months',
  manufacturer: 'Hydrus Detergents / Alkota Cleaning Systems',
  country_of_origin: 'USA / UK Formulated',
  features: [],
  sds_url: '',
  sds_revision_date: '',
  tds_url: '',
  tds_revision_date: '',
  label_url: '',
  primary_image_url: '',
  media_status: 'placeholder_active',
  meta_title: '',
  meta_description: '',
  sort_order: 0,
};

export default function ChemicalForm({
  initial,
  id
}: {
  initial?: Partial<Chemical>;
  id?: string;
}) {
  const router = useRouter();
  const [form, setForm] = useState<Partial<Chemical>>({ ...INIT, ...initial });
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'ok' | 'err' } | null>(null);

  const set = useCallback((field: keyof Chemical, val: any) => {
    setForm((prev) => {
      const next = { ...prev, [field]: val };
      if (field === 'name' && !id && !prev.slug) {
        next.slug = slugify(val as string);
      }
      return next;
    });
  }, [id]);

  const inp = (field: keyof Chemical, type = 'text', ph = '') => (
    <input
      type={type}
      value={(form[field] ?? '') as string}
      onChange={(e) => set(field, e.target.value)}
      placeholder={ph}
      className="w-full bg-[#0D0D0D] border border-[#2A2A2A] text-white px-4 py-2.5 font-inter text-sm focus:outline-none focus:border-[#FF6900] transition-colors"
    />
  );

  const showToast = (msg: string, type: 'ok' | 'err') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const save = async () => {
    setSaving(true);
    try {
      const url = id ? `/api/admin/chemicals/${id}` : '/api/admin/chemicals';
      const method = id ? 'PATCH' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!res.ok) {
        const e = await res.json();
        throw new Error(e.error || 'Save failed');
      }
      showToast(id ? 'Chemical updated successfully' : 'Chemical created successfully', 'ok');
      if (!id) router.push('/admin/chemicals');
    } catch (e: any) {
      showToast(e.message, 'err');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="pb-36">
      {toast && (
        <div
          className={`fixed top-6 right-6 z-50 px-5 py-3 font-ibm-plex-mono text-[10px] uppercase tracking-widest ${
            toast.type === 'ok'
              ? 'bg-emerald-950/90 text-emerald-300 border border-emerald-700'
              : 'bg-red-950/90 text-red-300 border border-red-700'
          }`}
        >
          {toast.msg}
        </div>
      )}

      {/* ─── 1. CORE IDENTITY & PUBLISHING ───────────────────────────────── */}
      <SH label="01. Identity & UK Publishing Status" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Field label="Product Name *">{inp('name', 'text', 'e.g. Farm Soap TR-440')}</Field>
        <Field label="Product Code">{inp('code', 'text', 'e.g. TR-440')}</Field>
        <Field label="URL Slug" note={`alkota.co.uk/chemicals/.../${form.slug || '...'}`}>
          {inp('slug', 'text', 'e.g. farm-soap-tr440')}
        </Field>
        <Field label="Chemical Category *">
          <select
            value={form.category || 'degreasers'}
            onChange={(e) => set('category', e.target.value as ChemicalCategory)}
            className="w-full bg-[#0D0D0D] border border-[#2A2A2A] text-white px-4 py-2.5 font-inter text-sm focus:outline-none focus:border-[#FF6900]"
          >
            {CATEGORIES.map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </select>
        </Field>
        <Field label="UK Publishing Status *">
          <select
            value={form.uk_status || 'needs_uk_review'}
            onChange={(e) => set('uk_status', e.target.value as ChemicalUKStatus)}
            className="w-full bg-[#0D0D0D] border border-[#2A2A2A] text-white px-4 py-2.5 font-inter text-sm focus:outline-none focus:border-[#FF6900]"
          >
            {UK_STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Sort Order">{inp('sort_order', 'number', '0')}</Field>
      </div>

      <div className="mb-6">
        <Field label="Marketing Tagline">{inp('tagline', 'text', 'Single-sentence technical proposition')}</Field>
      </div>

      <div className="flex gap-8 mb-6">
        <Toggle value={!!form.featured} onChange={(v) => set('featured', v)} label="Featured Benchmark Product" />
        <Toggle value={!!form.active} onChange={(v) => set('active', v)} label="Active in Registry" />
      </div>

      <Field label="Full Technical Description">
        <textarea
          rows={5}
          value={form.description || ''}
          onChange={(e) => set('description', e.target.value)}
          className="w-full bg-[#0D0D0D] border border-[#2A2A2A] text-white px-4 py-2.5 font-inter text-sm focus:outline-none focus:border-[#FF6900] resize-y"
          placeholder="Comprehensive description covering chemical mechanism, surfactants, and application scope..."
        />
      </Field>

      {/* ─── 2. PHYSICAL & CHEMICAL PROPERTIES ────────────────────────────── */}
      <SH label="02. Chemical Physicals & Dosing" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Field label="Product Form">{inp('form', 'text', 'e.g. Concentrated Liquid, Powder')}</Field>
        <Field label="Colour / Appearance">{inp('appearance', 'text', 'e.g. Clear Amber Liquid')}</Field>
        <Field label="pH Level (Concentrate/Diluted)">{inp('ph_level', 'text', 'e.g. 11.8 – 12.2')}</Field>
        <Field label="Specific Gravity">{inp('specific_gravity', 'text', 'e.g. 1.08 @ 20°C')}</Field>
        <Field label="VOC Content">{inp('voc_content', 'text', 'e.g. Low VOC (<15 g/L)')}</Field>
        <Field label="Shelf Life">{inp('shelf_life', 'text', 'e.g. 24 Months')}</Field>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Field label="Hot Water Dilution Ratio">{inp('dilution_hot', 'text', 'e.g. 1:50 to 1:120')}</Field>
        <Field label="Cold Water Dilution Ratio">{inp('dilution_cold', 'text', 'e.g. 1:30 to 1:80')}</Field>
      </div>

      <div className="mb-6">
        <Field label="Active Ingredients (Press Enter to add)">
          <TagInput
            value={form.active_ingredients || []}
            onChange={(v) => set('active_ingredients', v)}
            placeholder="e.g. Alkaline Builders, d-Limonene Terpenes, Wetting Surfactants..."
          />
        </Field>
      </div>

      {/* ─── 3. SUBSTRATE & CONTAMINATION COMPATIBILITY ──────────────────── */}
      <SH label="03. Metallurgy & Contamination Compatibility Matrix" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Field label="Compatible Surfaces (Press Enter to add)">
          <TagInput
            value={form.compatible_surfaces || []}
            onChange={(v) => set('compatible_surfaces', v)}
            placeholder="e.g. Painted Mild Steel, 304 Stainless, Cast Aluminium..."
          />
        </Field>
        <Field label="NOT Suitable For / Surface Exclusions (Press Enter to add)">
          <TagInput
            value={form.not_suitable_for || []}
            onChange={(v) => set('not_suitable_for', v)}
            placeholder="e.g. Polished Raw Aluminium, Magnesium Alloys, Galvanised..."
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Field label="Target Contaminations (Press Enter to add)">
          <TagInput
            value={form.contamination_types || []}
            onChange={(v) => set('contamination_types', v)}
            placeholder="e.g. Electrostatic Traffic Film, Fifth-Wheel Grease, Baked Carbon..."
          />
        </Field>
        <Field label="Application Methods (Press Enter to add)">
          <TagInput
            value={form.application_methods || []}
            onChange={(v) => set('application_methods', v)}
            placeholder="e.g. Downstream Hot Injector, Foam Cannon, Parts Washer Bath..."
          />
        </Field>
      </div>

      {/* ─── 4. WATER TREATMENT & ENVIRONMENTAL ───────────────────────────── */}
      <SH label="04. Effluent, Recycling & Environmental Compliance" />
      <div className="flex flex-wrap gap-8 mb-6">
        <Toggle
          value={!!form.biodegradable}
          onChange={(v) => set('biodegradable', v)}
          label="Biodegradable Surfactants (OECD 301B)"
        />
        <Toggle
          value={!!form.separator_compatible}
          onChange={(v) => set('separator_compatible', v)}
          label="Oil-Water Separator Compatible (Quick-Break)"
        />
        <Toggle
          value={!!form.water_recovery_compatible}
          onChange={(v) => set('water_recovery_compatible', v)}
          label="Water Recycling Loop Compatible"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Field label="Food Process Environment Status">
          <select
            value={form.food_process_status || 'non_food'}
            onChange={(e) => set('food_process_status', e.target.value)}
            className="w-full bg-[#0D0D0D] border border-[#2A2A2A] text-white px-4 py-2.5 font-inter text-sm focus:outline-none focus:border-[#FF6900]"
          >
            {FOOD_STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Biodegradability Claim Wording">
          {inp('biodegradability_claim', 'text', 'e.g. Readily Biodegradable — OECD 301B Compliant')}
        </Field>
      </div>

      {/* ─── 5. SAFETY & GB CLP / COSHH ───────────────────────────────────── */}
      <SH label="05. Safety, GB CLP & COSHH Classification" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Field label="Signal Word">
          <select
            value={form.signal_word || 'NONE'}
            onChange={(e) => set('signal_word', e.target.value)}
            className="w-full bg-[#0D0D0D] border border-[#2A2A2A] text-white px-4 py-2.5 font-inter text-sm focus:outline-none focus:border-[#FF6900]"
          >
            {SIGNAL_WORD_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="GB CLP Classification Code">{inp('hazard_classification', 'text', 'e.g. Skin Corr. 1B; Eye Dam. 1')}</Field>
        <Field label="Hazardous Material (Hazmat Toggle)">
          <div className="pt-2">
            <Toggle value={!!form.hazardous} onChange={(v) => set('hazardous', v)} label="Classified as Hazardous / Hazmat" />
          </div>
        </Field>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Field label="Hazard Statements (H-codes)">
          <TagInput
            value={form.hazard_statements || []}
            onChange={(v) => set('hazard_statements', v)}
            placeholder="e.g. H314: Causes severe skin burns, H319: Serious eye irritation"
          />
        </Field>
        <Field label="Precautionary Statements (P-codes)">
          <TagInput
            value={form.precautionary_statements || []}
            onChange={(v) => set('precautionary_statements', v)}
            placeholder="e.g. P280: Wear protective gloves, P305: Eye rinse instructions"
          />
        </Field>
      </div>

      {/* ─── 6. DOCUMENTS & REVISION CONTROL ──────────────────────────────── */}
      <SH label="06. Technical Documents & Revision Tracking" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Field label="Safety Data Sheet (SDS) PDF URL">{inp('sds_url', 'text', '/documents/sds/...')}</Field>
        <Field label="SDS Revision Date">{inp('sds_revision_date', 'text', 'e.g. 14 January 2024 (Rev 4.1)')}</Field>
        <Field label="Technical Data Sheet (TDS) PDF URL">{inp('tds_url', 'text', '/documents/tds/...')}</Field>
        <Field label="TDS Revision Date">{inp('tds_revision_date', 'text', 'e.g. 02 March 2024')}</Field>
      </div>

      {/* ─── 7. MEDIA & PLACEHOLDERS ──────────────────────────────────────── */}
      <SH label="07. Product Imagery & Media Placeholders" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Field label="Primary Image URL">{inp('primary_image_url', 'text', '/assets/products/...')}</Field>
        <Field label="Media Status">
          <select
            value={form.media_status || 'placeholder_active'}
            onChange={(e) => set('media_status', e.target.value as any)}
            className="w-full bg-[#0D0D0D] border border-[#2A2A2A] text-white px-4 py-2.5 font-inter text-sm focus:outline-none focus:border-[#FF6900]"
          >
            {MEDIA_STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-[260px] right-0 flex items-center justify-between px-8 py-4 border-t border-[#1F1F1F] bg-[#0D0D0D] z-40">
        <button
          type="button"
          onClick={() => router.back()}
          className="font-ibm-plex-mono text-[10px] text-[#666] uppercase tracking-widest hover:text-white transition-colors cursor-pointer"
        >
          ← Cancel & Return
        </button>
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="px-8 py-3 bg-[#FF6900] font-ibm-plex-mono text-[10px] uppercase tracking-widest text-white hover:bg-[#e55f00] transition-all disabled:opacity-50 cursor-pointer shadow-lg"
        >
          {saving ? 'Saving...' : id ? 'Save Chemical Updates' : 'Create Chemical'}
        </button>
      </div>
    </div>
  );
}
