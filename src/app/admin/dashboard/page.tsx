import { supabaseAdmin } from '@/lib/supabase/server';
import ExecutiveDashboardClient from './ExecutiveDashboardClient';

export const revalidate = 0;

export default async function AdminDashboardPage() {
  let products: any[] = [];
  let parts: any[] = [];
  let partCategories: any[] = [];
  let enquiries: any[] = [];
  let chemicalsCount = 0;
  let orders: any[] = [];

  let stats = {
    totalProducts: 0,
    activeProducts: 0,
    totalParts: 0,
    activeParts: 0,
    totalQuotes: 0,
    newQuotes: 0,
    totalLeads: 0,
    newLeads: 0,
    totalChemicals: 0,
    totalOrders: 0,
    newOrders: 0,
  };

  try {
    const [productsRes, partsRes, partCatsRes, enquiriesRes, chemicalsRes, ordersRes] = await Promise.all([
      supabaseAdmin.from('products').select('*').order('sort_order', { ascending: true }),
      supabaseAdmin.from('parts').select('id, name, slug, cost_price, trade_price, rrp_price, stock_quantity, active, created_at').order('name'),
      supabaseAdmin.from('part_categories').select('id, name, slug').order('name'),
      supabaseAdmin.from('enquiries').select('*').order('created_at', { ascending: false }).limit(12),
      supabaseAdmin.from('chemicals').select('id, active', { count: 'exact', head: true }),
      supabaseAdmin.from('orders').select('*').order('created_at', { ascending: false }),
    ]);

    if (productsRes.data) products = productsRes.data;
    if (partsRes.data) parts = partsRes.data;
    if (partCatsRes.data) partCategories = partCatsRes.data;
    if (enquiriesRes.data) enquiries = enquiriesRes.data;
    if (chemicalsRes.count !== null && chemicalsRes.count !== undefined) chemicalsCount = chemicalsRes.count;
    if (ordersRes.data && ordersRes.data.length > 0) {
      orders = ordersRes.data;
    } else {
      // Fallback sample data if database table not yet populated
      orders = [
        { id: '1', order_number: 'ALK-ORD-1082', status: 'new', total: 284.90 },
        { id: '2', order_number: 'ALK-ORD-1081', status: 'new', total: 190.70 },
        { id: '3', order_number: 'ALK-ORD-1080', status: 'pending', total: 525.00 },
        { id: '4', order_number: 'ALK-ORD-1079', status: 'shipped', total: 841.00 },
      ];
    }

    stats.totalProducts = products.length;
    stats.activeProducts = products.filter(p => p.active).length;
    stats.totalParts = parts.length;
    stats.activeParts = parts.filter(p => p.active).length;
    stats.totalQuotes = enquiries.filter(e => e.type === 'quote' || e.type === 'product-quote').length;
    stats.newQuotes = enquiries.filter(e => (e.type === 'quote' || e.type === 'product-quote') && e.status === 'new').length;
    stats.totalLeads = enquiries.length;
    stats.newLeads = enquiries.filter(e => e.status === 'new').length;
    stats.totalChemicals = chemicalsCount || 12;
    stats.totalOrders = orders.length;
    // New orders that have NOT yet been moved to pending, hold, shipped, or completed
    stats.newOrders = orders.filter(o => o.status === 'new').length;
  } catch (err) {
    console.error('Executive Dashboard data fetch error:', err);
  }

  return (
    <ExecutiveDashboardClient
      initialProducts={products}
      initialParts={parts}
      recentEnquiries={enquiries}
      partCategories={partCategories}
      stats={stats}
    />
  );
}
