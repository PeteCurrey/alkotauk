'use client';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, X } from 'lucide-react';

const CATEGORIES = ['pump','coil','burner','nozzle','hose','gun','wand','seal','filter','valve','electrical','other'];

function slugify(s: string) { return s.toUpperCase().trim().replace(/\s+/g, '-'); }

export default function PartEditor({ part }: { part?: any }) {
  const router = useRouter();
  const isEdit = !!part?.id;
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [machineInput, setMachineInput] = useState('');
  const [form, setForm] = useState({
    part_number: part?.part_number || '',
    name: part?.name || '',
    description: part?.description || '',
    category: part?.category || 'other',
    compatible_machines: part?.compatible_machines || [] as string[],
    price: part?.price || '',
    in_stock: part?.in_stock ?? true,
    active: part?.active ?? true,
    image_url: part?.image_url || '',
  });

  function set(key: string, val: any) { setForm(f => ({ ...f, [key]: val })); }

  function addMachine() {
    const v = machineInput.trim().toUpperCase();
    if (!v || form.compatible_machines.includes(v)) return;
    set('compatible_machines', [...form.compatible_machines, v]);
    setMachineInput('');
  }

  function removeMachine(m: string) { set('compatible_machines', form.compatible_machines.filter((x: string) => x !== m)); }

  async function save() {
    setSaving(true); setError('');
    const url = isEdit ? `/api/admin/parts/${part.id}` : '/api/admin/parts';
    const method = isEdit ? 'PATCH' : 'POST';
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    if (res.ok) { router.push('/admin/parts'); router.refresh(); }
    else { const d = await res.json(); setError(d.error || 'Save failed'); }
    setSaving(false);
  }

  const inputClass = "w-full bg-[#0D0D0D] border border-[#222] text-white px-4 py-2.5 font-inter text-[13px] focus:outline-none focus:border-[#FF6900]";
  const labelClass = "block font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#555] mb-1.5";

  return (
    <div className="text-white max-w-2xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/parts" className="flex items-center gap-2 font-ibm-plex-mono text-[10px] uppercase text-[#555] hover:text-[#FF6900] transition-colors"><ArrowLeft className="h-3 w-3" /> Back</Link>
          <h1 className="font-barlow-condensed text-3xl font-black uppercase italic">{isEdit ? 'Edit Part' : 'New Part'}</h1>
        </div>
        <button onClick={save} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-[#FF6900] text-white font-ibm-plex-mono text-[10px] uppercase tracking-widest hover:bg-[#e55f00] disabled:opacity-50">
          <Save className="h-4 w-4" />{saving ? 'Saving...' : 'Save Part'}
        </button>
      </div>
      {error && <div className="border border-red-900/50 bg-red-950/30 px-4 py-3 mb-4 font-ibm-plex-mono text-[10px] text-red-400">{error}</div>}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelClass}>Part Number *</label><input value={form.part_number} onChange={e => set('part_number', e.target.value)} className={inputClass} placeholder="ALK-P-001" /></div>
          <div><label className={labelClass}>Category</label>
            <select value={form.category} onChange={e => set('category', e.target.value)} className={inputClass}>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <div><label className={labelClass}>Name *</label><input value={form.name} onChange={e => set('name', e.target.value)} className={inputClass} /></div>
        <div><label className={labelClass}>Description</label><textarea value={form.description} onChange={e => set('description', e.target.value)} rows={3} className={inputClass + ' resize-y'} /></div>
        <div>
          <label className={labelClass}>Compatible Machines — type model code + Enter</label>
          <div className="flex gap-2 mb-2">
            <input value={machineInput} onChange={e => setMachineInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addMachine(); }}} placeholder="e.g. 420X4" className={inputClass + ' flex-1'} />
            <button onClick={addMachine} className="px-4 bg-[#1A1A1A] border border-[#333] text-[#888] hover:text-white font-ibm-plex-mono text-[10px] uppercase">Add</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {form.compatible_machines.map((m: string) => (
              <span key={m} className="flex items-center gap-1.5 px-3 py-1 bg-[#1A1A1A] border border-[#333] font-ibm-plex-mono text-[11px] text-[#FF6900]">
                {m} <button onClick={() => removeMachine(m)} className="text-[#555] hover:text-red-400"><X className="h-3 w-3" /></button>
              </span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelClass}>Price (£) — leave blank for POA</label><input type="number" value={form.price} onChange={e => set('price', e.target.value)} className={inputClass} placeholder="0.00" /></div>
          <div><label className={labelClass}>Image URL (optional)</label><input value={form.image_url} onChange={e => set('image_url', e.target.value)} className={inputClass} placeholder="https://..." /></div>
        </div>
        <div className="flex gap-6">
          {[['in_stock','In Stock'],['active','Active']].map(([k, l]) => (
            <label key={k} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={(form as any)[k]} onChange={e => set(k, e.target.checked)} className="accent-[#FF6900]" />
              <span className="font-inter text-[13px] text-[#888]">{l}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
