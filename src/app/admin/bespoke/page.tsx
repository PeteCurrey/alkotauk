import { supabaseAdmin } from '@/lib/supabase/server';
import Link from 'next/link';
import { Plus, Edit } from 'lucide-react';

const TABS = [
  { label: 'All', value: 'all' },
  { label: 'Trailers', value: 'trailer' },
  { label: 'Wash Plants', value: 'wash-plant' },
  { label: 'Skid Units', value: 'skid-unit' },
  { label: 'Stationary', value: 'stationary' },
];

export default async function BespokePage({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const { type = 'all' } = await searchParams;
  let q = supabaseAdmin.from('bespoke_builds').select('id,slug,name,build_type,featured,active,primary_image_url').order('sort_order').order('created_at', { ascending: false });
  if (type !== 'all') q = q.eq('build_type', type);
  const { data } = await q;
  const items = data ?? [];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-barlow-condensed text-4xl font-black uppercase italic text-white">Trailers & Bespoke</h1>
          <p className="font-ibm-plex-mono text-[10px] text-[#555] uppercase tracking-widest mt-1">// {items.length} custom builds</p>
        </div>
        <Link href="/admin/bespoke/new" className="flex items-center gap-2 bg-[#FF6900] px-5 py-2.5 font-ibm-plex-mono text-[10px] font-black uppercase tracking-widest text-white hover:bg-[#e55f00] transition-colors">
          <Plus className="h-4 w-4" /> Add Build
        </Link>
      </div>

      <div className="flex flex-wrap gap-1 mb-6">
        {TABS.map(tab => (
          <Link key={tab.value} href={`/admin/bespoke${tab.value !== 'all' ? `?type=${tab.value}` : ''}`}
            className="px-3 py-1.5 font-ibm-plex-mono text-[9px] uppercase tracking-widest transition-all"
            style={{ background: type === tab.value ? '#FF6900' : '#1A1A1A', color: type === tab.value ? '#fff' : '#666', border: '1px solid', borderColor: type === tab.value ? '#FF6900' : '#222' }}>
            {tab.label}
          </Link>
        ))}
      </div>

      <div className="border border-[#222] overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: '#1A1A1A', borderBottom: '1px solid #222' }}>
              {['Image', 'Name', 'Build Type', 'Featured', 'Active', 'Actions'].map(h => (
                <th key={h} className="text-left px-4 py-3 font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#555]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-16 text-center font-ibm-plex-mono text-[10px] text-[#444] uppercase tracking-widest">
                No builds yet — <Link href="/admin/bespoke/new" className="text-[#FF6900] hover:underline">create one</Link>
              </td></tr>
            )}
            {items.map((b: any, i: number) => (
              <tr key={b.id} style={{ borderBottom: '1px solid #1A1A1A', background: i % 2 === 0 ? '#111' : '#0D0D0D' }} className="hover:bg-[#1A1A1A] transition-colors">
                <td className="px-4 py-3">
                  {b.primary_image_url
                    ? <img src={b.primary_image_url} alt="" className="h-10 w-10 object-cover border border-[#222]" />
                    : <div className="h-10 w-10 bg-[#1A1A1A] border border-[#333]" />}
                </td>
                <td className="px-4 py-3 font-inter text-[13px] text-white font-medium">{b.name}</td>
                <td className="px-4 py-3 font-ibm-plex-mono text-[10px] text-[#888] uppercase">{b.build_type?.replace('-', ' ')}</td>
                <td className="px-4 py-3"><span className={`font-ibm-plex-mono text-[9px] px-2 py-0.5 border ${b.featured ? 'text-[#FF6900] border-[#FF6900]/40' : 'text-[#444] border-[#222]'}`}>{b.featured ? 'Yes' : 'No'}</span></td>
                <td className="px-4 py-3"><span className={`font-ibm-plex-mono text-[9px] px-2 py-0.5 border ${b.active ? 'text-green-400 border-green-900/50' : 'text-red-400 border-red-900/50'}`}>{b.active ? 'Live' : 'Hidden'}</span></td>
                <td className="px-4 py-3">
                  <Link href={`/admin/bespoke/${b.id}`} className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#333] font-ibm-plex-mono text-[9px] uppercase text-[#888] hover:text-white hover:border-[#FF6900] transition-all">
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
