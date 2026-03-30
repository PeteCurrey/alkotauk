import { notFound } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase/server';
import PartEditor from '../../PartEditor';
export default async function EditPartPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data, error } = await supabaseAdmin.from('parts').select('*').eq('id', id).single();
  if (error || !data) notFound();
  return <PartEditor part={data} />;
}
