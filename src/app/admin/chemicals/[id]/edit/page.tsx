import { notFound } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase/server';
import ChemicalEditor from '../../ChemicalEditor';

export default async function EditChemicalPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data, error } = await supabaseAdmin.from('chemicals').select('*').eq('id', id).single();
  if (error || !data) notFound();
  return <ChemicalEditor chemical={data} />;
}
