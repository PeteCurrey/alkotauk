import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';

export const revalidate = 0;

export async function GET() {
  try {
    const [ordersRes, quotesRes, leadsRes, lowStockRes] = await Promise.all([
      supabaseAdmin
        .from('orders')
        .select('id, order_number, customer_name, total, created_at, status')
        .eq('status', 'new')
        .order('created_at', { ascending: false })
        .limit(5),

      supabaseAdmin
        .from('enquiries')
        .select('id, name, company, subject, metadata, created_at, status, type')
        .in('type', ['quote', 'product-quote'])
        .eq('status', 'new')
        .order('created_at', { ascending: false })
        .limit(5),

      supabaseAdmin
        .from('enquiries')
        .select('id, name, company, subject, metadata, created_at, status, type')
        .not('type', 'in', '("quote","product-quote")')
        .eq('status', 'new')
        .order('created_at', { ascending: false })
        .limit(5),

      supabaseAdmin
        .from('parts')
        .select('id, name, sku, stock_quantity')
        .eq('active', true)
        .lte('stock_quantity', 3)
        .order('stock_quantity', { ascending: true })
        .limit(5),
    ]);

    const newOrders = ordersRes.data || [];
    const newQuotes = quotesRes.data || [];
    const newLeads = leadsRes.data || [];
    const lowStockParts = lowStockRes.data || [];

    const totalCount = newOrders.length + newQuotes.length + newLeads.length + lowStockParts.length;

    return NextResponse.json({
      totalCount,
      newOrders,
      newQuotes,
      newLeads,
      lowStockParts,
    });
  } catch (err: any) {
    console.error('Error fetching notifications:', err);
    return NextResponse.json({
      totalCount: 0,
      newOrders: [],
      newQuotes: [],
      newLeads: [],
      lowStockParts: [],
    });
  }
}
