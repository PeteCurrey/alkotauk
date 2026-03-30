import { supabaseAdmin } from '@/lib/supabase/server';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import ChemicalRowActions from './ChemicalRowActions';

export default async function ChemicalsAdminPage() {
  const { data: chemicals } = await supabaseAdmin
    .from('chemicals')
    .select('id,name,slug,category,available_sizes,in_stock,featured,active,sort_order')
    .order('sort_order').order('name');

  return (
    <div className="text-white">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-barlow-condensed text-4xl font-black uppercase italic">Chemicals</h1>
          <p className="font-ibm-plex-mono text-[10px] text-[#555] uppercase tracking-widest mt-1">// {chemicals?.length ?? 0} products</p>
        </div>
        <Link href="/admin/chemicals/new" className="flex items-center gap-2 px-5 py-3 bg-[#FF6900] text-white font-ibm-plex-mono text-[10px] uppercase tracking-widest hover:bg-[#e55f00] transition-colors">
          <Plus className="h-4 w-4" /> Add Chemical
        </Link>
      </div>

      <div className="border border-[#222]">
        <table className="w-full">
          <thead>
            <tr style={{ background: '#1A1A1A', borderBottom: '1px solid #222' }}>
              {['Name', 'Category', 'Sizes', 'Stock', 'Featured', 'Active', 'Actions'].map((h) => (
                <th key={h} className="text-left px-4 py-3 font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#555]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {chemicals?.map((c: any, i: number) => (
              <tr key={c.id} style={{ borderBottom: '1px solid #1A1A1A', background: i % 2 === 0 ? '#111' : '#0D0D0D' }}>
                <td className="px-4 py-3">
                  <Link href={`/admin/chemicals/${c.id}/edit`} className="font-inter text-[13px] text-white hover:text-[#FF6900]">{c.name}</Link>
                  <p className="font-ibm-plex-mono text-[10px] text-[#444]">{c.slug}</p>
                </td>
                <td className="px-4 py-3 font-ibm-plex-mono text-[10px] uppercase text-[#888]">{c.category}</td>
                <td className="px-4 py-3 font-inter text-[12px] text-[#666]">{(c.available_sizes || []).join(', ') || '—'}</td>
                <td className="px-4 py-3">
                  <span style={{ color: c.in_stock ? '#22C55E' : '#EF4444' }} className="font-ibm-plex-mono text-[10px] uppercase">{c.in_stock ? 'Yes' : 'No'}</span>
                </td>
                <td className="px-4 py-3">
                  <span style={{ color: c.featured ? '#FF6900' : '#444' }} className="font-ibm-plex-mono text-[10px]">{c.featured ? '★' : '—'}</span>
                </td>
                <td className="px-4 py-3">
                  <span style={{ color: c.active ? '#22C55E' : '#555' }} className="font-ibm-plex-mono text-[10px] uppercase">{c.active ? 'Active' : 'Inactive'}</span>
                </td>
                <td className="px-4 py-3"><ChemicalRowActions chemical={c} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
