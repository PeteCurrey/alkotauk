import { supabaseAdmin } from '@/lib/supabase/server';
import Link from 'next/link';
import { Plus, Edit, Eye } from 'lucide-react';

export default async function PostsPage() {
  const { data } = await supabaseAdmin
    .from('posts')
    .select('id,slug,title,category,published,published_at,created_at')
    .order('created_at', { ascending: false });
  const items = data ?? [];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-barlow-condensed text-4xl font-black uppercase italic text-white">Blog & Resources</h1>
          <p className="font-ibm-plex-mono text-[10px] text-[#555] uppercase tracking-widest mt-1">// {items.filter((p: any) => p.published).length} published · {items.length} total</p>
        </div>
        <Link href="/admin/posts/new" className="flex items-center gap-2 bg-[#FF6900] px-5 py-2.5 font-ibm-plex-mono text-[10px] font-black uppercase tracking-widest text-white hover:bg-[#e55f00] transition-colors">
          <Plus className="h-4 w-4" /> New Post
        </Link>
      </div>

      <div className="border border-[#222] overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: '#1A1A1A', borderBottom: '1px solid #222' }}>
              {['Title', 'Category', 'Published', 'Date', 'Actions'].map(h => (
                <th key={h} className="text-left px-4 py-3 font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#555]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-16 text-center font-ibm-plex-mono text-[10px] text-[#444] uppercase tracking-widest">
                No posts yet — <Link href="/admin/posts/new" className="text-[#FF6900] hover:underline">write the first one</Link>
              </td></tr>
            )}
            {items.map((p: any, i: number) => (
              <tr key={p.id} style={{ borderBottom: '1px solid #1A1A1A', background: i % 2 === 0 ? '#111' : '#0D0D0D' }} className="hover:bg-[#1A1A1A] transition-colors">
                <td className="px-4 py-3">
                  <p className="font-inter text-[13px] text-white font-medium">{p.title}</p>
                  <p className="font-ibm-plex-mono text-[10px] text-[#555]">{p.slug}</p>
                </td>
                <td className="px-4 py-3 font-ibm-plex-mono text-[10px] text-[#888] uppercase">{p.category?.replace('-', ' ') || '—'}</td>
                <td className="px-4 py-3">
                  <span className={`font-ibm-plex-mono text-[9px] px-2 py-0.5 border ${p.published ? 'text-green-400 border-green-900/50 bg-green-950/30' : 'text-[#555] border-[#222]'}`}>
                    {p.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-4 py-3 font-ibm-plex-mono text-[10px] text-[#555]">
                  {new Date(p.published_at || p.created_at).toLocaleDateString('en-GB')}
                </td>
                <td className="px-4 py-3 flex items-center gap-2">
                  <Link href={`/admin/posts/${p.id}`} className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#333] font-ibm-plex-mono text-[9px] uppercase text-[#888] hover:text-white hover:border-[#FF6900] transition-all">
                    <Edit className="h-3 w-3" /> Edit
                  </Link>
                  {p.published && (
                    <Link href={`/blog/${p.slug}`} target="_blank" className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#222] font-ibm-plex-mono text-[9px] uppercase text-[#555] hover:text-white transition-all">
                      <Eye className="h-3 w-3" /> View
                    </Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
