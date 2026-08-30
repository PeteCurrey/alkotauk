import { supabaseAdmin } from '@/lib/supabase/server';
import StudioDashboardClient from './StudioDashboardClient';

export const revalidate = 0;

export default async function AdminDashboardPage() {
  let products: any[] = [];
  let enquiries: any[] = [];
  let stats = {
    totalProducts: 0,
    activeProducts: 0,
    totalQuotes: 0,
    newQuotes: 0,
    totalLeads: 0,
    newLeads: 0,
  };

  try {
    const [productsRes, enquiriesRes] = await Promise.all([
      supabaseAdmin.from('products').select('*').order('sort_order', { ascending: true }),
      supabaseAdmin.from('enquiries').select('*').order('created_at', { ascending: false }).limit(10),
    ]);

    if (productsRes.data) products = productsRes.data;
    if (enquiriesRes.data) enquiries = enquiriesRes.data;

    stats.totalProducts = products.length;
    stats.activeProducts = products.filter(p => p.active).length;
    stats.totalQuotes = enquiries.filter(e => e.type === 'quote' || e.type === 'product-quote').length;
    stats.newQuotes = enquiries.filter(e => (e.type === 'quote' || e.type === 'product-quote') && e.status === 'new').length;
    stats.totalLeads = enquiries.length;
    stats.newLeads = enquiries.filter(e => e.status === 'new').length;
  } catch (err) {
    console.error('Dashboard data fetch error:', err);
  }

  return (
    <StudioDashboardClient
      initialProducts={products}
      recentEnquiries={enquiries}
      stats={stats}
    />
  );
}
