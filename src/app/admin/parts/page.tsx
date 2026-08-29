import { supabaseAdmin } from '@/lib/supabase/server';
import Link from 'next/link';
import { Plus, Wrench, Layers, Inbox, ExternalLink } from 'lucide-react';
import PartRowActions from './PartRowActions';

export default async function PartsAdminPage() {
  const { data: parts } = await supabaseAdmin
    .from('parts')
    .select('id,part_number,name,category,compatible_machines,price,in_stock,active')
    .order('sort_order')
    .order('name');

  return (
    <div className="text-white space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-barlow-condensed text-4xl font-black uppercase italic">
            Parts & Spares Catalogue
          </h1>
          <p className="font-ibm-plex-mono text-[10px] text-[#555] uppercase tracking-widest mt-1">
            // {parts?.length ?? 0} active components · OEM engineering catalogue
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/parts"
            target="_blank"
            className="flex items-center gap-2 border border-[#333] bg-[#141414] px-4 py-3 font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#CCC] hover:text-white"
          >
            <span>Live Experience</span>
            <ExternalLink className="h-3 w-3" />
          </Link>
          <Link
            href="/admin/parts/new"
            className="flex items-center gap-2 px-5 py-3 bg-[#FF6900] text-white font-ibm-plex-mono text-[10px] uppercase tracking-widest hover:bg-[#e55f00] transition-colors"
          >
            <Plus className="h-4 w-4" /> Add Part
          </Link>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-[#222] pb-4">
        <Link
          href="/admin/parts"
          className="px-4 py-2 bg-alkota-orange text-white font-ibm-plex-mono text-[10px] uppercase tracking-wider font-bold"
        >
          All Components ({parts?.length || 0})
        </Link>
        <Link
          href="/admin/parts/kits"
          className="px-4 py-2 bg-[#141414] text-[#888] hover:text-white border border-[#262626] font-ibm-plex-mono text-[10px] uppercase tracking-wider"
        >
          Service Kits Builder
        </Link>
        <Link
          href="/admin/parts/requests"
          className="px-4 py-2 bg-[#141414] text-[#888] hover:text-white border border-[#262626] font-ibm-plex-mono text-[10px] uppercase tracking-wider"
        >
          Procurement Requests Inbox
        </Link>
      </div>

      {/* Main Table */}
      <div className="border border-[#222] overflow-x-auto bg-[#0E0E0E]">
        <table className="w-full text-left">
          <thead>
            <tr style={{ background: '#1A1A1A', borderBottom: '1px solid #222' }}>
              {['Part No.', 'Name', 'Category', 'Compatible Models', 'Price', 'Stock', 'Active', 'Actions'].map((h) => (
                <th
                  key={h}
                  className="text-left px-4 py-3 font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#555]"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {parts?.map((p: any, i: number) => (
              <tr
                key={p.id}
                style={{
                  borderBottom: '1px solid #1A1A1A',
                  background: i % 2 === 0 ? '#111' : '#0D0D0D',
                }}
                className="hover:bg-[#161616] transition-colors"
              >
                <td className="px-4 py-3 font-ibm-plex-mono text-[11px] text-[#FF6900] font-bold">
                  {p.part_number}
                </td>
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/parts/${p.id}/edit`}
                    className="font-inter text-[13px] text-white hover:text-[#FF6900]"
                  >
                    {p.name}
                  </Link>
                </td>
                <td className="px-4 py-3 font-ibm-plex-mono text-[10px] uppercase text-[#888]">
                  {p.category}
                </td>
                <td className="px-4 py-3 font-inter text-[11px] text-[#666]">
                  {(p.compatible_machines || []).slice(0, 3).join(', ')}
                  {(p.compatible_machines?.length || 0) > 3 ? '…' : ''}
                </td>
                <td className="px-4 py-3 font-ibm-plex-mono text-[12px] text-white">
                  {p.price ? `£${p.price.toFixed(2)}` : 'POA'}
                </td>
                <td className="px-4 py-3">
                  <span
                    style={{ color: p.in_stock ? '#22C55E' : '#EF4444' }}
                    className="font-ibm-plex-mono text-[10px]"
                  >
                    {p.in_stock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    style={{ color: p.active ? '#22C55E' : '#555' }}
                    className="font-ibm-plex-mono text-[10px]"
                  >
                    {p.active ? 'Active' : 'Draft'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <PartRowActions part={p} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
