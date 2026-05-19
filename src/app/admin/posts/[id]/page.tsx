import { supabaseAdmin } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import PostForm from '../../PostForm';

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data } = await supabaseAdmin.from('posts').select('*').eq('id', id).single();
  if (!data) notFound();
  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/posts" className="text-[#555] hover:text-white transition-colors"><ArrowLeft className="h-5 w-5" /></Link>
        <div>
          <h1 className="font-barlow-condensed text-4xl font-black uppercase italic text-white line-clamp-1">{data.title}</h1>
          <p className="font-ibm-plex-mono text-[10px] text-[#555] uppercase tracking-widest mt-1">// Editing post · {data.slug}</p>
        </div>
      </div>
      <PostForm initial={data} id={id} />
    </div>
  );
}
