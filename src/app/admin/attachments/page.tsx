import { supabaseAdmin } from '@/lib/supabase/server';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import AttachmentRowActions from './AttachmentRowActions';

export default async function AttachmentsAdminPage() {
  const { data: items } = await supabaseAdmin.from('attachments').select('id,name,slug,category,compatible_machines,price,featured,active').order('sort_order').order('name');
  return (
    <div className="text-white">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-barlow-condensed text-4xl font-black uppercase italic">Attachments</h1>
          <p className="font-ibm-plex-mono text-[10px] text-[#555] uppercase tracking-widest mt-1">// {items?.length ?? 0} items</p>
        </div>
        <Link href="/admin/attachments/new" className="flex items-center gap-2 px-5 py-3 bg-[#FF6900] text-white font-ibm-plex-mono text-[10px] uppercase tracking-widest hover:bg-[#e55f00] transition-colors">
          <Plus className="h-4 w-4" /> Add Attachment
        </Link>
      </div>
      <div className="border border-[#222]">
        <table className="w-full">
          <thead>
            <tr style={{ background: '#1A1A1A', borderBottom: '1px solid #222' }}>
              {['Name','Category','Compatible','Price','Featured','Active','Actions'].map(h => (
                <th key={h} className="text-left px-4 py-3 font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#555]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items?.map((a: any, i: number) => (
              <tr key={a.id} style={{ borderBottom: '1px solid #1A1A1A', background: i % 2 === 0 ? '#111' : '#0D0D0D' }}>
                <td className="px-4 py-3"><Link href={`/admin/attachments/${a.id}/edit`} className="font-inter text-[13px] text-white hover:text-[#FF6900]">{a.name}</Link></td>
                <td className="px-4 py-3 font-ibm-plex-mono text-[10px] uppercase text-[#888]">{a.category}</td>
                <td className="px-4 py-3 font-inter text-[11px] text-[#666]">{(a.compatible_machines || []).slice(0,3).join(', ')}{(a.compatible_machines?.length||0)>3?'…':''}</td>
                <td className="px-4 py-3 font-ibm-plex-mono text-[12px] text-white">{a.price ? `£${a.price}` : 'POA'}</td>
                <td className="px-4 py-3 font-ibm-plex-mono text-[10px]" style={{ color: a.featured ? '#FF6900' : '#444' }}>{a.featured ? '★' : '—'}</td>
                <td className="px-4 py-3 font-ibm-plex-mono text-[10px]" style={{ color: a.active ? '#22C55E' : '#555' }}>{a.active ? 'Active' : 'Off'}</td>
                <td className="px-4 py-3"><AttachmentRowActions attachment={a} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
