import { notFound } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase/server';
import AttachmentEditor from '../../AttachmentEditor';
export default async function EditAttachmentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data, error } = await supabaseAdmin.from('attachments').select('*').eq('id', id).single();
  if (error || !data) notFound();
  return <AttachmentEditor attachment={data} />;
}
