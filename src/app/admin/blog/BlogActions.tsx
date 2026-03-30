'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Edit, Trash2, Eye } from 'lucide-react';
import Link from 'next/link';

export default function BlogActions({ post }: { post: any }) {
  const router = useRouter();
  const [toggling, setToggling] = useState(false);

  async function togglePublish() {
    setToggling(true);
    await fetch(`/api/admin/blog/${post.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ published: !post.published }),
    });
    router.refresh();
    setToggling(false);
  }

  async function deletePost() {
    if (!confirm('Delete this post? This cannot be undone.')) return;
    await fetch(`/api/admin/blog/${post.id}`, { method: 'DELETE' });
    router.refresh();
  }

  return (
    <div className="flex items-center gap-2">
      <Link href={`/admin/blog/${post.id}/edit`} className="p-1.5 text-[#555] hover:text-white transition-colors"><Edit className="h-3.5 w-3.5" /></Link>
      {post.published && (
        <Link href={`/blog/${post.slug}`} target="_blank" className="p-1.5 text-[#555] hover:text-[#3B82F6] transition-colors"><Eye className="h-3.5 w-3.5" /></Link>
      )}
      <button onClick={togglePublish} disabled={toggling} className="px-2 py-1 font-ibm-plex-mono text-[9px] uppercase tracking-widest border transition-all" style={{
        borderColor: post.published ? '#666' : '#22C55E',
        color: post.published ? '#666' : '#22C55E',
      }}>
        {toggling ? '...' : post.published ? 'Unpublish' : 'Publish'}
      </button>
      <button onClick={deletePost} className="p-1.5 text-[#555] hover:text-red-400 transition-colors"><Trash2 className="h-3.5 w-3.5" /></button>
    </div>
  );
}
