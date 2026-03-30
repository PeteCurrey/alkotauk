import { notFound } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase/server';
import BannerEditor from '../../BannerEditor';

export default async function EditBannerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: banner, error } = await supabaseAdmin.from('banners').select('*').eq('id', id).single();
  if (error || !banner) notFound();
  return <BannerEditor banner={banner} />;
}
