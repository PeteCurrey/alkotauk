import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ShoppingCart, Package, Plus, FileText, ArrowRight } from 'lucide-react';
import { getDealerOrders } from '@/lib/dealer-portal';

export default async function DealerOrdersPage() {
  const session = await auth();
  if (!session?.user) redirect('/dealer/login');

  const user = session.user as any;
  const dealerId = user.dealerId;
  const orders = dealerId ? await getDealerOrders(dealerId, 50) : [];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E8E4] pb-5">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-alkota-orange block mb-1">
            Commerce &amp; Purchasing
          </span>
          <h1 className="text-3xl font-extralight text-alkota-black tracking-tight">
            Order History
          </h1>
          <p className="text-xs text-alkota-silver mt-1">
            Track and manage your organisation's genuine parts and machine orders.
          </p>
        </div>

        <Link
          href="/dealer/orders/new"
          className="inline-flex items-center gap-2 bg-alkota-orange hover:bg-alkota-orange-hover text-white px-5 py-2.5 text-xs uppercase tracking-widest transition-colors"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>New Order</span>
        </Link>
      </div>

      {/* Orders List */}
      {orders.length === 0 ? (
        <div className="bg-white border border-[#E8E8E4] p-16 text-center">
          <ShoppingCart className="h-10 w-10 text-alkota-iron mx-auto mb-3" />
          <h3 className="text-base font-light text-alkota-black mb-1">No Orders Placed Yet</h3>
          <p className="text-xs text-alkota-silver max-w-sm mx-auto mb-6">
            Your dealership has not submitted any parts or equipment orders yet.
          </p>
          <Link
            href="/dealer/parts"
            className="inline-flex items-center gap-2 border border-alkota-black text-alkota-black px-6 py-2.5 text-xs uppercase tracking-widest hover:bg-alkota-black hover:text-white transition-colors"
          >
            <Package className="h-3.5 w-3.5" />
            <span>Browse Parts Catalogue</span>
          </Link>
        </div>
      ) : (
        <div className="bg-white border border-[#E8E8E4] divide-y divide-[#E8E8E4]">
          <div className="px-6 py-3 bg-[#FAF9F5] text-[10px] uppercase tracking-widest text-alkota-silver grid grid-cols-5 gap-4">
            <span>Order Reference</span>
            <span>Date</span>
            <span>PO Number</span>
            <span>Status</span>
            <span className="text-right">Total (ex. VAT)</span>
          </div>
          {orders.map((ord: any) => (
            <div
              key={ord.id}
              className="px-6 py-4 grid grid-cols-5 gap-4 items-center text-xs text-alkota-black hover:bg-[#FAF9F5] transition-colors"
            >
              <div className="flex items-center gap-2 font-medium">
                <FileText className="h-3.5 w-3.5 text-alkota-orange" />
                <span>{ord.order_number}</span>
              </div>
              <span className="text-alkota-silver">
                {new Date(ord.created_at).toLocaleDateString('en-GB')}
              </span>
              <span className="text-alkota-silver">
                {ord.po_number || '—'}
              </span>
              <div>
                <span className="text-[9px] uppercase tracking-widest px-2 py-0.5 border bg-[#FAF9F5] border-[#E8E8E4] text-alkota-black">
                  {ord.status}
                </span>
              </div>
              <span className="text-right font-medium text-alkota-black">
                £{(ord.total || 0).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
