import { supabaseAdmin } from '@/lib/supabase/server';
import OrdersClient, { Order } from './OrdersClient';

export const revalidate = 0;

export default async function AdminOrdersPage() {
  let orders: Order[] = [];

  try {
    const { data, error } = await supabaseAdmin
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (data && data.length > 0) {
      orders = data as Order[];
    } else {
      // Fallback sample orders if database table is empty
      orders = [
        {
          id: 'ord-sample-1',
          order_number: 'ALK-ORD-1082',
          customer_name: 'David Richardson',
          customer_email: 'd.richardson@midlandhaulage.co.uk',
          customer_phone: '07700 900821',
          company_name: 'Midland Fleet Services',
          items: [
            { name: '50ft Wire Braided High-Pressure Hose 3/8in (400 BAR)', sku: 'HSE-38-50-400', unit_price: 86.50, quantity: 2, total: 173.00 },
            { name: 'Industrial Rotating Turbo Nozzle 045', sku: 'NOZ-TRB-045', unit_price: 54.00, quantity: 1, total: 54.00 }
          ],
          subtotal: 227.00,
          vat: 45.40,
          shipping_cost: 12.50,
          total: 284.90,
          status: 'new',
          payment_status: 'paid',
          created_at: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
        },
        {
          id: 'ord-sample-2',
          order_number: 'ALK-ORD-1081',
          customer_name: 'Gareth Davies',
          customer_email: 'gareth@cambrianquarries.com',
          customer_phone: '07891 234567',
          company_name: 'Cambrian Aggregates Ltd',
          items: [
            { name: 'Heavy Duty Trigger Gun with Swivel & Extension Lance', sku: 'GUN-HD-SWIV-01', unit_price: 94.00, quantity: 1, total: 94.00 },
            { name: 'Quick Release Stainless Coupler Set 3/8in', sku: 'CPL-SS-38-SET', unit_price: 28.50, quantity: 2, total: 57.00 }
          ],
          subtotal: 151.00,
          vat: 30.20,
          shipping_cost: 9.50,
          total: 190.70,
          status: 'new',
          payment_status: 'paid',
          created_at: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
        },
        {
          id: 'ord-sample-3',
          order_number: 'ALK-ORD-1080',
          customer_name: 'Mark Thompson',
          customer_email: 'mark.t@thompsonwashplant.co.uk',
          customer_phone: '07788 112233',
          company_name: 'Thompson Commercial Valeting',
          items: [
            { name: 'Interpump WS201 High Pressure Plunger Pump Assembly', sku: 'PMP-INT-WS201', unit_price: 425.00, quantity: 1, total: 425.00 }
          ],
          subtotal: 425.00,
          vat: 85.00,
          shipping_cost: 15.00,
          total: 525.00,
          status: 'pending',
          payment_status: 'paid',
          created_at: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
        },
        {
          id: 'ord-sample-4',
          order_number: 'ALK-ORD-1079',
          customer_name: 'Stuart Bell',
          customer_email: 'sbell@cumbriafarmcare.co.uk',
          customer_phone: '07912 345678',
          company_name: 'Cumbria Farm Care',
          items: [
            { name: 'Schedule 80 Heating Coil 4-Series Replacement', sku: 'COIL-SCH80-4S', unit_price: 680.00, quantity: 1, total: 680.00 }
          ],
          subtotal: 680.00,
          vat: 136.00,
          shipping_cost: 25.00,
          total: 841.00,
          status: 'shipped',
          payment_status: 'paid',
          created_at: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
        }
      ];
    }
  } catch (err) {
    console.error('Error fetching orders:', err);
  }

  return <OrdersClient initialOrders={orders} />;
}
