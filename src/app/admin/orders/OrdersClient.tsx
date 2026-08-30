'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  PackageCheck, ShoppingBag, Truck, CheckCircle2, Clock, 
  AlertCircle, ChevronRight, Search, Filter, ExternalLink,
  DollarSign, User, Mail, Phone, MapPin, Eye, ArrowRight
} from 'lucide-react';

interface OrderItem {
  name: string;
  sku?: string;
  unit_price: number;
  quantity: number;
  total: number;
}

export interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  company_name?: string;
  items: OrderItem[];
  subtotal: number;
  vat: number;
  shipping_cost: number;
  total: number;
  status: 'new' | 'pending' | 'hold' | 'shipped' | 'completed' | 'cancelled';
  payment_status: 'paid' | 'awaiting_payment' | 'invoice_30_days' | 'refunded';
  tracking_number?: string;
  carrier?: string;
  notes?: string;
  created_at: string;
}

const STATUS_CONFIG: Record<string, { label: string; bg: string; text: string; dot: string }> = {
  new: { label: 'New Order', bg: 'bg-[#FF6900]/10', text: 'text-[#FF6900]', dot: 'bg-[#FF6900]' },
  pending: { label: 'Processing', bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
  hold: { label: 'On Hold', bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
  shipped: { label: 'Dispatched', bg: 'bg-purple-50', text: 'text-purple-700', dot: 'bg-purple-500' },
  completed: { label: 'Completed', bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  cancelled: { label: 'Cancelled', bg: 'bg-slate-100', text: 'text-slate-600', dot: 'bg-slate-400' },
};

export default function OrdersClient({ initialOrders }: { initialOrders: Order[] }) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Filter orders
  const filtered = orders.filter(o => {
    const matchesStatus = selectedStatus === 'all' || o.status === selectedStatus;
    const matchesSearch = !search ||
      o.order_number.toLowerCase().includes(search.toLowerCase()) ||
      o.customer_name.toLowerCase().includes(search.toLowerCase()) ||
      o.customer_email.toLowerCase().includes(search.toLowerCase()) ||
      o.company_name?.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const countNew = orders.filter(o => o.status === 'new').length;
  const countPending = orders.filter(o => o.status === 'pending').length;
  const countShipped = orders.filter(o => o.status === 'shipped').length;
  const countCompleted = orders.filter(o => o.status === 'completed').length;

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus as any } : o));
        if (activeOrder && activeOrder.id === orderId) {
          setActiveOrder(prev => prev ? { ...prev, status: newStatus as any } : null);
        }
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Orders & Parts Dispatch
          </h1>
          <p className="text-sm font-medium text-[#64748B] mt-1">
            Manage customer checkout orders, fulfillment stages, and carrier tracking
          </p>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-[#E2E4E8] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#FF6900]">New Orders</p>
          <div className="flex items-baseline gap-2 mt-1">
            <p className="text-3xl font-black text-[#0F172A]">{countNew}</p>
            {countNew > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-[#FF6900] text-white text-[10px] font-extrabold">
                Action Required
              </span>
            )}
          </div>
          <p className="text-xs text-[#94A3B8] font-medium mt-1">Awaiting fulfillment triage</p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E2E4E8] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
          <p className="text-[11px] font-bold uppercase tracking-wider text-blue-600">Processing</p>
          <p className="text-3xl font-black text-[#0F172A] mt-1">{countPending}</p>
          <p className="text-xs text-[#94A3B8] font-medium mt-1">Being picked & packed in warehouse</p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E2E4E8] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
          <p className="text-[11px] font-bold uppercase tracking-wider text-purple-600">Dispatched / In Transit</p>
          <p className="text-3xl font-black text-[#0F172A] mt-1">{countShipped}</p>
          <p className="text-xs text-[#94A3B8] font-medium mt-1">With carrier / tracking assigned</p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E2E4E8] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
          <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">Completed</p>
          <p className="text-3xl font-black text-[#0F172A] mt-1">{countCompleted}</p>
          <p className="text-xs text-[#94A3B8] font-medium mt-1">Delivered to commercial customer</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-[#E2E4E8] p-3.5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
        <div className="flex flex-wrap gap-1.5">
          {['all', 'new', 'pending', 'hold', 'shipped', 'completed'].map(st => {
            const count = st === 'all' ? orders.length : orders.filter(o => o.status === st).length;
            const isSelected = selectedStatus === st;
            return (
              <button
                key={st}
                type="button"
                onClick={() => setSelectedStatus(st)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  isSelected 
                    ? 'bg-[#111] text-white shadow-sm' 
                    : 'bg-[#F6F7F9] text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                <span>{st === 'all' ? 'All Orders' : STATUS_CONFIG[st]?.label || st}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-white text-[#475569]'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#94A3B8]" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by order #, customer, company, email..."
            className="w-full bg-[#F6F7F9] border border-[#E2E4E8] rounded-full text-[#0F172A] pl-9 pr-4 py-2 text-xs font-medium focus:outline-none focus:border-[#FF6900] transition-colors placeholder:text-[#94A3B8]"
          />
        </div>
      </div>

      {/* Orders List & Detail Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Orders Table (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-[#E2E4E8] shadow-[0_2px_12px_rgba(0,0,0,0.02)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[700px]">
              <thead>
                <tr className="bg-[#F8F9FB] border-b border-[#F0F2F5] text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">
                  <th className="px-5 py-3.5">Order</th>
                  <th className="px-5 py-3.5">Customer & Company</th>
                  <th className="px-5 py-3.5">Items</th>
                  <th className="px-5 py-3.5">Total</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0F2F5] text-xs font-medium">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center text-[#64748B]">
                      <ShoppingBag className="h-8 w-8 text-[#CBD5E1] mx-auto mb-2" />
                      No orders found matching the filter criteria.
                    </td>
                  </tr>
                ) : (
                  filtered.map(order => {
                    const st = STATUS_CONFIG[order.status] || STATUS_CONFIG.new;
                    const isSelected = activeOrder?.id === order.id;

                    return (
                      <tr
                        key={order.id}
                        onClick={() => setActiveOrder(order)}
                        className={`hover:bg-[#F8F9FB] transition-colors cursor-pointer ${
                          isSelected ? 'bg-[#F6F7F9]' : ''
                        }`}
                      >
                        <td className="px-5 py-4">
                          <p className="font-extrabold text-[#0F172A]">{order.order_number}</p>
                          <p className="text-[10px] text-[#94A3B8] font-mono mt-0.5">
                            {new Date(order.created_at).toLocaleDateString('en-GB')}
                          </p>
                        </td>
                        <td className="px-5 py-4">
                          <p className="font-bold text-[#0F172A]">{order.customer_name}</p>
                          {order.company_name && (
                            <p className="text-[11px] text-[#64748B] truncate">{order.company_name}</p>
                          )}
                        </td>
                        <td className="px-5 py-4">
                          <p className="text-[#0F172A] font-semibold">
                            {order.items?.length || 1} item{order.items?.length !== 1 ? 's' : ''}
                          </p>
                          <p className="text-[10px] text-[#64748B] truncate max-w-[160px]">
                            {order.items?.[0]?.name || 'Spare Parts'}
                          </p>
                        </td>
                        <td className="px-5 py-4 font-bold text-[#0F172A]">
                          £{order.total?.toFixed(2)}
                        </td>
                        <td className="px-5 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${st.bg} ${st.text}`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${st.dot}`} />
                            {st.label}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveOrder(order);
                            }}
                            className="px-3 py-1.5 rounded-xl bg-[#F6F7F9] border border-[#E2E4E8] text-xs font-bold text-[#334155] hover:bg-[#111] hover:text-white transition-all"
                          >
                            Inspect
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Order Detail & Status Changer (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {activeOrder ? (
            <div className="bg-white rounded-2xl border border-[#E2E4E8] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-5">
              <div className="flex items-center justify-between border-b border-[#F0F2F5] pb-3">
                <div>
                  <p className="text-[10px] font-bold uppercase text-[#FF6900]">Order Summary</p>
                  <h3 className="text-base font-extrabold text-[#0F172A]">{activeOrder.order_number}</h3>
                </div>
                <span className="text-[11px] font-mono text-[#94A3B8]">
                  {new Date(activeOrder.created_at).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>

              {/* Status Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                  Update Fulfillment Stage
                </label>
                <select
                  value={activeOrder.status}
                  disabled={updatingId === activeOrder.id}
                  onChange={(e) => handleStatusChange(activeOrder.id, e.target.value)}
                  className="w-full bg-[#F6F7F9] border border-[#E2E4E8] rounded-xl text-[#0F172A] px-3.5 py-2.5 text-xs font-bold focus:bg-white focus:border-[#FF6900] focus:outline-none"
                >
                  <option value="new">New Order (Unprocessed)</option>
                  <option value="pending">Processing (Picking & Packing)</option>
                  <option value="hold">On Hold</option>
                  <option value="shipped">Dispatched / Shipped</option>
                  <option value="completed">Completed & Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              {/* Customer Contact */}
              <div className="p-3.5 bg-[#F8F9FB] rounded-xl border border-[#F0F2F5] space-y-1.5 text-xs">
                <p className="font-bold text-[#0F172A]">{activeOrder.customer_name}</p>
                {activeOrder.company_name && <p className="text-[#64748B] font-medium">{activeOrder.company_name}</p>}
                <p className="text-[#64748B] truncate flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-[#94A3B8]" /> {activeOrder.customer_email}
                </p>
                {activeOrder.customer_phone && (
                  <p className="text-[#64748B] flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5 text-[#94A3B8]" /> {activeOrder.customer_phone}
                  </p>
                )}
              </div>

              {/* Line Items */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#475569] mb-2">
                  Purchased Items ({activeOrder.items?.length || 1})
                </p>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {activeOrder.items?.map((item, idx) => (
                    <div key={idx} className="flex items-start justify-between gap-2 p-2.5 rounded-lg bg-[#F8F9FB] text-xs">
                      <div className="min-w-0">
                        <p className="font-bold text-[#0F172A] truncate">{item.name}</p>
                        <p className="text-[10px] text-[#64748B]">Qty: {item.quantity} × £{item.unit_price?.toFixed(2)}</p>
                      </div>
                      <span className="font-bold text-[#0F172A] shrink-0">
                        £{item.total?.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Financial Breakdown */}
              <div className="pt-3 border-t border-[#F0F2F5] space-y-1.5 text-xs">
                <div className="flex justify-between text-[#64748B]">
                  <span>Subtotal</span>
                  <span>£{activeOrder.subtotal?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#64748B]">
                  <span>VAT (20%)</span>
                  <span>£{activeOrder.vat?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#64748B]">
                  <span>Shipping</span>
                  <span>£{activeOrder.shipping_cost?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-extrabold text-[#0F172A] pt-1.5 border-t border-[#F0F2F5] text-sm">
                  <span>Grand Total</span>
                  <span>£{activeOrder.total?.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-[#E2E4E8] p-8 text-center shadow-[0_2px_12px_rgba(0,0,0,0.02)] text-xs text-[#64748B]">
              <PackageCheck className="h-8 w-8 text-[#CBD5E1] mx-auto mb-2" />
              Select an order from the list to view items and update fulfillment stages.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
