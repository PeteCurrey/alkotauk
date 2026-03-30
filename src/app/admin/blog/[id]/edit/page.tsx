import { notFound } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase/server';
import BlogEditor from '../../BlogEditor';

export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: post, error } = await supabaseAdmin.from('blog_posts').select('*').eq('id', id).single();
  if (error || !post) notFound();
  return <BlogEditor post={post} />;
}
