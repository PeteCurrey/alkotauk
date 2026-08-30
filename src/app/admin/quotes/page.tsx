import { supabaseAdmin } from '@/lib/supabase/server';
import QuotesClient from './QuotesClient';

export const revalidate = 0;

export default async function AdminQuotesPage() {
  const { data: quotes } = await supabaseAdmin
    .from('enquiries')
    .select('*')
    .in('type', ['quote', 'product-quote'])
    .order('created_at', { ascending: false });

  return <QuotesClient initialQuotes={quotes || []} />;
}
