import { supabaseAdmin } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import QuoteDetailClient from './QuoteDetailClient';

export const revalidate = 0;

export default async function AdminQuoteDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: quote } = await supabaseAdmin.from('enquiries').select('*').eq('id', id).single();
  if (!quote) notFound();

  return <QuoteDetailClient initialQuote={quote} />;
}
