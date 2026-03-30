import { supabaseAdmin } from '@/lib/supabase/server';
import Link from 'next/link';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import BlogActions from './BlogActions';

export default async function BlogAdminPage() {
  const { data: posts } = await supabaseAdmin.from('blog_posts').select('*').order('created_at', { ascending: false });

  return (
    <div className="text-white">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-barlow-condensed text-4xl font-black uppercase italic">Blog Posts</h1>
          <p className="font-ibm-plex-mono text-[10px] text-[#555] uppercase tracking-widest mt-1">// {posts?.length ?? 0} posts total</p>
        </div>
        <Link href="/admin/blog/new" className="flex items-center gap-2 px-5 py-3 bg-[#FF6900] text-white font-ibm-plex-mono text-[10px] uppercase tracking-widest hover:bg-[#e55f00] transition-colors">
          <Plus className="h-4 w-4" /> New Post
        </Link>
      </div>

      <div className="border border-[#222]">
        <table className="w-full">
          <thead>
            <tr style={{ background: '#1A1A1A', borderBottom: '1px solid #222' }}>
              {['Title', 'Category', 'Status', 'Published', 'Actions'].map((h) => (
                <th key={h} className="text-left px-4 py-3 font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#555]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {posts?.map((post: any, i: number) => (
              <tr key={post.id} style={{ borderBottom: '1px solid #1A1A1A', background: i % 2 === 0 ? '#111' : '#0D0D0D' }} className="hover:bg-[#1A1A1A] transition-colors">
                <td className="px-4 py-3">
                  <Link href={`/admin/blog/${post.id}/edit`} className="font-inter text-[13px] text-white hover:text-[#FF6900] transition-colors">
                    {post.title}
                  </Link>
                  <p className="font-ibm-plex-mono text-[10px] text-[#444]">/{post.slug}</p>
                </td>
                <td className="px-4 py-3 font-ibm-plex-mono text-[10px] uppercase text-[#888]">{post.category}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 font-ibm-plex-mono text-[9px] uppercase" style={{
                    color: post.published ? '#22C55E' : '#666',
                    border: `1px solid ${post.published ? '#22C55E' : '#333'}`,
                    background: post.published ? '#22C55E18' : '#33333318',
                  }}>
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-4 py-3 font-ibm-plex-mono text-[10px] text-[#555]">
                  {post.published_at ? new Date(post.published_at).toLocaleDateString('en-GB') : '—'}
                </td>
                <td className="px-4 py-3">
                  <BlogActions post={post} />
                </td>
              </tr>
            ))}
            {(!posts || posts.length === 0) && (
              <tr><td colSpan={5} className="px-4 py-12 text-center font-ibm-plex-mono text-[10px] text-[#444] uppercase">No blog posts yet — <Link href="/admin/blog/new" className="text-[#FF6900]">create the first one</Link></td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
