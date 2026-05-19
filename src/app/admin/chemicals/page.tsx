import { supabaseAdmin } from '@/lib/supabase/server';
import Link from 'next/link';
import { Plus, Edit, AlertTriangle } from 'lucide-react';

const TABS = [
  { label: 'All', value: 'all' },
  { label: 'Degreasers', value: 'degreaser' },
  { label: 'Farm & Ag', value: 'farm-ag' },
  { label: 'Fleet', value: 'transportation-fleet' },
  { label: 'Heavy Industrial', value: 'heavy-industrial' },
  { label: 'Scale Stop', value: 'scale-stop' },
  { label: 'Parts Washer', value: 'parts-washer-solution' },
  { label: 'Aluminium', value: 'aluminium-brightener' },
  { label: 'Aircraft', value: 'aircraft-specialist' },
];

export default async function ChemicalsPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category = 'all' } = await searchParams;
  let q = supabaseAdmin.from('chemicals').select('id,slug,name,code,category,biodegradable,hazardous,featured,active,primary_image_url').order('sort_order').order('name');
  if (category !== 'all') q = q.eq('category', category);
  const { data: chemicals } = await q;
  const items = chemicals ?? [];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-barlow-condensed text-4xl font-black uppercase italic text-white">Chemicals</h1>
          <p className="font-ibm-plex-mono text-[10px] text-[#555] uppercase tracking-widest mt-1">// {items.length} products in range</p>
        </div>
        <Link href="/admin/chemicals/new" className="flex items-center gap-2 bg-[#FF6900] px-5 py-2.5 font-ibm-plex-mono text-[10px] font-black uppercase tracking-widest text-white hover:bg-[#e55f00] transition-colors">
          <Plus className="h-4 w-4" /> Add Chemical
        </Link>
      </div>

      <div className="flex flex-wrap gap-1 mb-6">
        {TABS.map(tab => (
          <Link key={tab.value} href={`/admin/chemicals${tab.value !== 'all' ? `?category=${tab.value}` : ''}`}
            className="px-3 py-1.5 font-ibm-plex-mono text-[9px] uppercase tracking-widest transition-all"
            style={{ background: category === tab.value ? '#FF6900' : '#1A1A1A', color: category === tab.value ? '#fff' : '#666', border: '1px solid', borderColor: category === tab.value ? '#FF6900' : '#222' }}>
            {tab.label}
          </Link>
        ))}
      </div>

      <div className="border border-[#222] overflow-x-auto">
        <table className="w-full text-sm min-w-[700px]">
          <thead>
            <tr style={{ background: '#1A1A1A', borderBottom: '1px solid #222' }}>
              {['Name / Code', 'Category', 'Biodeg.', 'Hazmat', 'Featured', 'Active', 'Actions'].map(h => (
                <th key={h} className="text-left px-4 py-3 font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#555]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && (
              <tr><td colSpan={7} className="px-4 py-16 text-center font-ibm-plex-mono text-[10px] text-[#444] uppercase tracking-widest">
                No chemicals — <Link href="/admin/chemicals/new" className="text-[#FF6900] hover:underline">add one</Link>
              </td></tr>
            )}
            {items.map((c: any, i: number) => (
              <tr key={c.id} style={{ borderBottom: '1px solid #1A1A1A', background: i % 2 === 0 ? '#111' : '#0D0D0D' }} className="hover:bg-[#1A1A1A] transition-colors">
                <td className="px-4 py-3">
                  <p className="font-inter text-[13px] text-white font-medium">{c.name}</p>
                  {c.code && <p className="font-ibm-plex-mono text-[10px] text-[#555]">{c.code}</p>}
                </td>
                <td className="px-4 py-3 font-ibm-plex-mono text-[10px] text-[#888] uppercase">{c.category?.replace(/-/g, ' ')}</td>
                <td className="px-4 py-3"><span className={`font-ibm-plex-mono text-[9px] px-2 py-0.5 border ${c.biodegradable ? 'text-green-400 border-green-900/50' : 'text-[#444] border-[#222]'}`}>{c.biodegradable ? 'Yes' : 'No'}</span></td>
                <td className="px-4 py-3"><span className={`font-ibm-plex-mono text-[9px] px-2 py-0.5 border ${c.hazardous ? 'text-amber-400 border-amber-900/50' : 'text-[#444] border-[#222]'}`}>{c.hazardous ? 'Hazmat' : 'Safe'}</span></td>
                <td className="px-4 py-3"><span className={`font-ibm-plex-mono text-[9px] px-2 py-0.5 border ${c.featured ? 'text-[#FF6900] border-[#FF6900]/40' : 'text-[#444] border-[#222]'}`}>{c.featured ? 'Yes' : 'No'}</span></td>
                <td className="px-4 py-3"><span className={`font-ibm-plex-mono text-[9px] px-2 py-0.5 border ${c.active ? 'text-green-400 border-green-900/50' : 'text-red-400 border-red-900/50'}`}>{c.active ? 'Live' : 'Hidden'}</span></td>
                <td className="px-4 py-3">
                  <Link href={`/admin/chemicals/${c.id}`} className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#333] font-ibm-plex-mono text-[9px] uppercase text-[#888] hover:text-white hover:border-[#FF6900] transition-all">
                    <Edit className="h-3 w-3" /> Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
