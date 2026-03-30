'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, X } from 'lucide-react';

const CATEGORIES = ['surface-cleaner','hose-reel','foam-lance','rotary-nozzle','turbo-nozzle','spray-gun','wand','lance','chemical-injector','sandblaster','other'];

function slugify(s: string) { return s.toLowerCase().trim().replace(/[^a-z0-9\s-]/g,'').replace(/\s+/g,'-'); }

export default function AttachmentEditor({ attachment }: { attachment?: any }) {
  const router = useRouter();
  const isEdit = !!attachment?.id;
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [machineInput, setMachineInput] = useState('');
  const [form, setForm] = useState({
    name: attachment?.name||'', slug: attachment?.slug||'',
    description: attachment?.description||'', category: attachment?.category||'other',
    compatible_machines: attachment?.compatible_machines||[] as string[],
    price: attachment?.price||'', in_stock: attachment?.in_stock??true,
    featured: attachment?.featured??false, active: attachment?.active??true,
    image_url: attachment?.image_url||'', sort_order: attachment?.sort_order??0,
  });

  function set(key: string, val: any) { setForm(f => { const next={...f,[key]:val}; if(key==='name'&&!isEdit) next.slug=slugify(val); return next; }); }
  function addMachine() { const v=machineInput.trim().toUpperCase(); if(!v||form.compatible_machines.includes(v))return; set('compatible_machines',[...form.compatible_machines,v]); setMachineInput(''); }
  function removeMachine(m: string) { set('compatible_machines', form.compatible_machines.filter((x: string)=>x!==m)); }

  async function save() {
    setSaving(true); setError('');
    const url = isEdit ? `/api/admin/attachments/${attachment.id}` : '/api/admin/attachments';
    const res = await fetch(url, { method: isEdit?'PATCH':'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) });
    if (res.ok) { router.push('/admin/attachments'); router.refresh(); }
    else { const d=await res.json(); setError(d.error||'Save failed'); }
    setSaving(false);
  }

  const inputClass = "w-full bg-[#0D0D0D] border border-[#222] text-white px-4 py-2.5 font-inter text-[13px] focus:outline-none focus:border-[#FF6900]";
  const labelClass = "block font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#555] mb-1.5";

  return (
    <div className="text-white max-w-2xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/attachments" className="flex items-center gap-2 font-ibm-plex-mono text-[10px] uppercase text-[#555] hover:text-[#FF6900] transition-colors"><ArrowLeft className="h-3 w-3"/>Back</Link>
          <h1 className="font-barlow-condensed text-3xl font-black uppercase italic">{isEdit?'Edit Attachment':'New Attachment'}</h1>
        </div>
        <button onClick={save} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-[#FF6900] text-white font-ibm-plex-mono text-[10px] uppercase tracking-widest hover:bg-[#e55f00] disabled:opacity-50">
          <Save className="h-4 w-4"/>{saving?'Saving...':'Save Attachment'}
        </button>
      </div>
      {error && <div className="border border-red-900/50 bg-red-950/30 px-4 py-3 mb-4 font-ibm-plex-mono text-[10px] text-red-400">{error}</div>}
      <div className="space-y-4">
        <div><label className={labelClass}>Name *</label><input value={form.name} onChange={e=>set('name',e.target.value)} className={inputClass}/></div>
        <div><label className={labelClass}>Slug</label><input value={form.slug} onChange={e=>set('slug',e.target.value)} className={inputClass}/></div>
        <div><label className={labelClass}>Description</label><textarea value={form.description} onChange={e=>set('description',e.target.value)} rows={3} className={inputClass+' resize-y'}/></div>
        <div><label className={labelClass}>Category</label>
          <select value={form.category} onChange={e=>set('category',e.target.value)} className={inputClass}>
            {CATEGORIES.map(c=><option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClass}>Compatible Machines</label>
          <div className="flex gap-2 mb-2">
            <input value={machineInput} onChange={e=>setMachineInput(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'){e.preventDefault();addMachine();}}} placeholder="Model code..." className={inputClass+' flex-1'}/>
            <button onClick={addMachine} className="px-4 bg-[#1A1A1A] border border-[#333] text-[#888] hover:text-white font-ibm-plex-mono text-[10px] uppercase">Add</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {form.compatible_machines.map((m: string)=>(
              <span key={m} className="flex items-center gap-1.5 px-3 py-1 bg-[#1A1A1A] border border-[#333] font-ibm-plex-mono text-[11px] text-[#FF6900]">
                {m} <button onClick={()=>removeMachine(m)} className="text-[#555] hover:text-red-400"><X className="h-3 w-3"/></button>
              </span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div><label className={labelClass}>Price (£)</label><input type="number" value={form.price} onChange={e=>set('price',e.target.value)} className={inputClass} placeholder="POA if blank"/></div>
          <div><label className={labelClass}>Sort Order</label><input type="number" value={form.sort_order} onChange={e=>set('sort_order',parseInt(e.target.value)||0)} className={inputClass}/></div>
          <div><label className={labelClass}>Image URL</label><input value={form.image_url} onChange={e=>set('image_url',e.target.value)} className={inputClass} placeholder="https://..."/></div>
        </div>
        <div className="flex gap-6">
          {[['in_stock','In Stock'],['featured','Featured'],['active','Active']].map(([k,l])=>(
            <label key={k} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={(form as any)[k]} onChange={e=>set(k,e.target.checked)} className="accent-[#FF6900]"/>
              <span className="font-inter text-[13px] text-[#888]">{l}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
