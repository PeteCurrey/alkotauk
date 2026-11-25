import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';

export const revalidate = 0;

export async function GET() {
  try {
    const [ordersRes, enquiriesRes, quotesRes, leadsRes, lowStockRes] = await Promise.all([
      supabaseAdmin
        .from('orders')
        .select('id, order_number, customer_name, total, created_at, status', { count: 'exact' })
        .eq('status', 'new')
        .order('created_at', { ascending: false })
        .limit(5),

      supabaseAdmin
        .from('enquiries')
        .select('id, reference, name, company, subject, metadata, created_at, status, type', { count: 'exact' })
        .eq('status', 'new')
        .order('created_at', { ascending: false })
        .limit(10),

      supabaseAdmin
        .from('enquiries')
        .select('id, reference, name, company, subject, metadata, created_at, status, type', { count: 'exact' })
        .in('type', ['quote', 'product-quote'])
        .eq('status', 'new')
        .order('created_at', { ascending: false })
        .limit(5),

      supabaseAdmin
        .from('enquiries')
        .select('id, reference, name, company, subject, metadata, created_at, status, type', { count: 'exact' })
        .not('type', 'in', '("quote","product-quote")')
        .eq('status', 'new')
        .order('created_at', { ascending: false })
        .limit(5),

      supabaseAdmin
        .from('parts')
        .select('id, name, sku, stock_quantity', { count: 'exact' })
        .eq('active', true)
        .lte('stock_quantity', 3)
        .order('stock_quantity', { ascending: true })
        .limit(5),
    ]);

    const newOrders = ordersRes.data || [];
    const newEnquiries = enquiriesRes.data || [];
    const newQuotes = quotesRes.data || [];
    const newLeads = leadsRes.data || [];
    const lowStockParts = lowStockRes.data || [];

    const newOrdersCount = ordersRes.count ?? newOrders.length;
    const newEnquiriesCount = enquiriesRes.count ?? newEnquiries.length;
    const newQuotesCount = quotesRes.count ?? newQuotes.length;
    const newLeadsCount = leadsRes.count ?? newLeads.length;
    const lowStockCount = lowStockRes.count ?? lowStockParts.length;

    const totalCount = newOrdersCount + newEnquiriesCount + lowStockCount;

    return NextResponse.json({
      totalCount,
      newOrdersCount,
      newEnquiriesCount,
      newQuotesCount,
      newLeadsCount,
      lowStockCount,
      newOrders,
      newEnquiries,
      newQuotes,
      newLeads,
      lowStockParts,
    });
  } catch (err: any) {
    console.error('Error fetching notifications:', err);
    return NextResponse.json({
      totalCount: 0,
      newOrdersCount: 0,
      newEnquiriesCount: 0,
      newQuotesCount: 0,
      newLeadsCount: 0,
      lowStockCount: 0,
      newOrders: [],
      newEnquiries: [],
      newQuotes: [],
      newLeads: [],
      lowStockParts: [],
    });
  }
}
