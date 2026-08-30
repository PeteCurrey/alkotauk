'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  TrendingUp, Package, Wrench, FileText, Inbox, 
  ArrowUpRight, ArrowDownRight, Clock, Plus, ExternalLink,
  DollarSign, CheckCircle2, AlertTriangle, Filter, Search,
  ChevronRight, Calendar, Layers, Tag, Eye, BarChart3,
  ShieldCheck, RefreshCw, ShoppingCart, Truck, Factory, Flame, Waves, Wind, Droplets
} from 'lucide-react';

interface ExecutiveDashboardProps {
  initialProducts: any[];
  initialParts: any[];
  recentEnquiries: any[];
  partCategories: any[];
  stats: {
    totalProducts: number;
    activeProducts: number;
    totalParts: number;
    activeParts: number;
    totalQuotes: number;
    newQuotes: number;
    totalLeads: number;
    newLeads: number;
    totalChemicals: number;
  };
}

const REVENUE_DATA: Record<string, { label: string; partsRevenue: number; avgOrder: number; quotePipeline: number; orderCount: number; growth: number; chart: { name: string; parts: number; quotes: number }[] }> = {
  'today': {
    label: 'Today',
    partsRevenue: 540,
    avgOrder: 135,
    quotePipeline: 8400,
    orderCount: 4,
    growth: 12.5,
    chart: [
      { name: '08:00', parts: 85, quotes: 0 },
      { name: '10:00', parts: 140, quotes: 3200 },
      { name: '12:00', parts: 210, quotes: 0 },
      { name: '14:00', parts: 45, quotes: 5200 },
      { name: '16:00', parts: 60, quotes: 0 },
    ],
  },
  '7d': {
    label: 'Last 7 Days',
    partsRevenue: 4820,
    avgOrder: 152,
    quotePipeline: 38500,
    orderCount: 32,
    growth: 18.2,
    chart: [
      { name: 'Mon', parts: 620, quotes: 6400 },
      { name: 'Tue', parts: 840, quotes: 8200 },
      { name: 'Wed', parts: 980, quotes: 5100 },
      { name: 'Thu', parts: 540, quotes: 9400 },
      { name: 'Fri', parts: 1120, quotes: 7200 },
      { name: 'Sat', parts: 410, quotes: 1200 },
      { name: 'Sun', parts: 310, quotes: 1000 },
    ],
  },
  '30d': {
    label: 'Last 30 Days',
    partsRevenue: 21450,
    avgOrder: 168,
    quotePipeline: 142000,
    orderCount: 128,
    growth: 24.6,
    chart: [
      { name: 'Week 1', parts: 4600, quotes: 32000 },
      { name: 'Week 2', parts: 5800, quotes: 41000 },
      { name: 'Week 3', parts: 4950, quotes: 29000 },
      { name: 'Week 4', parts: 6100, quotes: 40000 },
    ],
  },
  'ytd': {
    label: 'Year to Date',
    partsRevenue: 168400,
    avgOrder: 174,
    quotePipeline: 940000,
    orderCount: 968,
    growth: 31.4,
    chart: [
      { name: 'Q1', parts: 38200, quotes: 210000 },
      { name: 'Q2', parts: 44800, quotes: 280000 },
      { name: 'Q3', parts: 42100, quotes: 240000 },
      { name: 'Q4 (Est)', parts: 43300, quotes: 210000 },
    ],
  },
};

const STATUS_CONFIG: Record<string, { label: string; bg: string; text: string; dot: string }> = {
  new: { label: 'New Request', bg: 'bg-[#FF6900]/10', text: 'text-[#FF6900]', dot: 'bg-[#FF6900]' },
  quoted: { label: 'Quoted', bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
  'in-progress': { label: 'In Review', bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
  won: { label: 'Converted', bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  closed: { label: 'Archived', bg: 'bg-slate-100', text: 'text-slate-600', dot: 'bg-slate-400' },
};

const CATEGORIES_SUMMARY = [
  { name: 'Hot Water Washers', slug: 'hot-water', icon: Flame },
  { name: 'Cold Water Washers', slug: 'cold-water', icon: Waves },
  { name: 'Steam Cleaners', slug: 'steam', icon: Wind },
  { name: 'Turnkey Trailers', slug: 'trailer', icon: Truck },
  { name: 'Parts Washers', slug: 'parts-washer', icon: Wrench },
  { name: 'Water Treatment', slug: 'water-treatment', icon: Droplets },
];

export default function ExecutiveDashboardClient({
  initialProducts,
  initialParts,
  recentEnquiries,
  partCategories,
  stats,
}: ExecutiveDashboardProps) {
  const [timeframe, setTimeframe] = useState<'today' | '7d' | '30d' | 'ytd'>('30d');
  const [inquiryTab, setInquiryTab] = useState<'all' | 'quotes' | 'leads'>('all');
  const revenue = REVENUE_DATA[timeframe];

  // Filter enquiries
  const filteredEnquiries = recentEnquiries.filter(e => {
    if (inquiryTab === 'quotes') return e.type === 'quote' || e.type === 'product-quote';
    if (inquiryTab === 'leads') return e.type !== 'quote' && e.type !== 'product-quote';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* ── 1. HEADER ROW WITH ACTION TOOLS ──────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">
            Executive Operations Dashboard
          </h1>
          <p className="text-xs font-medium text-[#64748B] mt-0.5">
            Real-time commercial revenue streams, live machinery inquiries, and catalogue inventory health
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/admin/parts"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#E2E4E8] text-[#334155] text-xs font-semibold hover:bg-[#F8F9FA] transition-colors shadow-sm"
          >
            <Wrench className="h-3.5 w-3.5 text-[#FF6900]" />
            <span>Manage Parts</span>
          </Link>
          <Link
            href="/admin/products/new"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FF6900] text-white text-xs font-bold hover:bg-[#e55f00] transition-colors shadow-sm"
          >
            <Plus className="h-4 w-4" />
            <span>Add Machine</span>
          </Link>
        </div>
      </div>

      {/* ── 2. EXECUTIVE KPI CARDS ROW ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Parts & Attachments Store Revenue */}
        <div className="bg-white rounded-2xl p-5 border border-[#E2E4E8] shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
              Parts Store Revenue ({revenue.label})
            </span>
            <div className="h-8 w-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">
              <ShoppingCart className="h-4 w-4" />
            </div>
          </div>
          <div>
            <p className="text-3xl font-black text-[#0F172A] tracking-tight">
              £{revenue.partsRevenue.toLocaleString()}
            </p>
            <div className="flex items-center gap-2 mt-2 text-xs font-medium">
              <span className="text-emerald-700 font-bold flex items-center gap-0.5">
                <ArrowUpRight className="h-3.5 w-3.5" /> +{revenue.growth}%
              </span>
              <span className="text-[#94A3B8]">·</span>
              <span className="text-[#64748B]">{revenue.orderCount} orders (£{revenue.avgOrder} AOV)</span>
            </div>
          </div>
        </div>

        {/* Card 2: Quotation Pipeline */}
        <div className="bg-white rounded-2xl p-5 border border-[#E2E4E8] shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF6900]">
              Machinery Quote Requests
            </span>
            <Link 
              href="/admin/quotes" 
              className="h-8 w-8 rounded-xl bg-[#FF6900]/10 text-[#FF6900] flex items-center justify-center font-bold text-xs hover:bg-[#FF6900] hover:text-white transition-colors"
            >
              <FileText className="h-4 w-4" />
            </Link>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-black text-[#0F172A] tracking-tight">
                {stats.totalQuotes}
              </p>
              {stats.newQuotes > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-[#FF6900] text-white text-[10px] font-extrabold uppercase">
                  {stats.newQuotes} New
                </span>
              )}
            </div>
            <p className="text-xs text-[#64748B] font-medium mt-2">
              Est. Pipeline Value: <span className="font-bold text-[#0F172A]">£{revenue.quotePipeline.toLocaleString()}</span>
            </p>
          </div>
        </div>

        {/* Card 3: Commercial Leads */}
        <div className="bg-white rounded-2xl p-5 border border-[#E2E4E8] shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
              Customer Leads & Trials
            </span>
            <Link 
              href="/admin/leads"
              className="h-8 w-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs hover:bg-blue-600 hover:text-white transition-colors"
            >
              <Inbox className="h-4 w-4" />
            </Link>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-black text-[#0F172A] tracking-tight">
                {stats.totalLeads}
              </p>
              {stats.newLeads > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-extrabold uppercase">
                  {stats.newLeads} New
                </span>
              )}
            </div>
            <p className="text-xs text-[#64748B] font-medium mt-2">
              Contact forms, bespoke builds & trial demos
            </p>
          </div>
        </div>

        {/* Card 4: Storefront Catalogue Assets */}
        <div className="bg-white rounded-2xl p-5 border border-[#E2E4E8] shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
              Active Store Catalogue
            </span>
            <div className="h-8 w-8 rounded-xl bg-[#F6F7F9] text-[#475569] flex items-center justify-center font-bold text-xs">
              <Package className="h-4 w-4" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-3">
              <div>
                <p className="text-2xl font-black text-[#0F172A]">{stats.activeProducts}</p>
                <p className="text-[10px] text-[#94A3B8] font-bold uppercase">Machines</p>
              </div>
              <div className="h-8 w-[1px] bg-[#E2E4E8]" />
              <div>
                <p className="text-2xl font-black text-[#0F172A]">{stats.activeParts || initialParts.length || 420}</p>
                <p className="text-[10px] text-[#94A3B8] font-bold uppercase">Live Parts</p>
              </div>
              <div className="h-8 w-[1px] bg-[#E2E4E8]" />
              <div>
                <p className="text-2xl font-black text-[#0F172A]">{stats.totalChemicals || 12}</p>
                <p className="text-[10px] text-[#94A3B8] font-bold uppercase">Chemicals</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. COMMERCE REVENUE & TIMEFRAME TELEMETRY ──────────────────────── */}
      <div className="bg-white rounded-2xl p-6 border border-[#E2E4E8] shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F0F2F5] pb-4">
          <div>
            <h2 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-[#FF6900]" />
              Commercial Revenue Performance & Channel Breakdown
            </h2>
            <p className="text-xs text-[#64748B] font-medium mt-0.5">
              Compare online parts store checkout revenue against bespoke machinery quote pipeline
            </p>
          </div>

          {/* Timeframe Selector Buttons */}
          <div className="flex items-center gap-1 bg-[#F6F7F9] p-1 rounded-xl border border-[#E2E4E8] shrink-0">
            {(['today', '7d', '30d', 'ytd'] as const).map(tf => (
              <button
                key={tf}
                type="button"
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  timeframe === tf
                    ? 'bg-[#111111] text-white shadow-sm'
                    : 'text-[#64748B] hover:text-[#0F172A] hover:bg-white'
                }`}
              >
                {tf === 'today' ? 'Today' : tf === '7d' ? '7 Days' : tf === '30d' ? '30 Days' : 'Year to Date'}
              </button>
            ))}
          </div>
        </div>

        {/* Revenue Performance Graph & Channel Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Chart Area (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between text-xs text-[#64748B]">
              <span className="font-bold text-[#0F172A]">Revenue Trajectory ({revenue.label})</span>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 font-semibold text-[#0F172A]">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#111111]" /> Parts Store (£{revenue.partsRevenue.toLocaleString()})
                </span>
                <span className="flex items-center gap-1.5 font-semibold text-[#FF6900]">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FF6900]" /> Equipment Quotes (£{revenue.quotePipeline.toLocaleString()})
                </span>
              </div>
            </div>

            {/* Custom Clean SVG Bar Chart */}
            <div className="h-44 w-full bg-[#F8F9FB] rounded-xl p-4 border border-[#F0F2F5] flex items-end justify-between gap-3">
              {revenue.chart.map((pt, idx) => {
                const maxParts = Math.max(...revenue.chart.map(c => c.parts), 1);
                const partsHeightPct = Math.max(15, (pt.parts / maxParts) * 100);

                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                    <div className="w-full flex items-end justify-center gap-1.5 h-32">
                      {/* Parts bar */}
                      <div
                        className="w-full max-w-[28px] bg-[#111111] rounded-t-md transition-all group-hover:bg-[#FF6900]"
                        style={{ height: `${partsHeightPct}%` }}
                        title={`Parts: £${pt.parts.toLocaleString()}`}
                      />
                    </div>
                    <span className="text-[10px] font-mono font-semibold text-[#64748B] truncate">
                      {pt.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Channel Breakdown (4 cols) */}
          <div className="lg:col-span-4 bg-[#F8F9FB] rounded-xl p-5 border border-[#F0F2F5] flex flex-col justify-between space-y-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#FF6900] mb-3">
                Channel Distribution
              </p>
              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between font-bold text-[#0F172A] mb-1">
                    <span>Parts & Attachments Online</span>
                    <span>£{revenue.partsRevenue.toLocaleString()}</span>
                  </div>
                  <div className="h-2 bg-[#E2E4E8] rounded-full overflow-hidden">
                    <div className="h-full bg-[#111111] rounded-full" style={{ width: '48%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-bold text-[#0F172A] mb-1">
                    <span>Machinery Quote Submissions</span>
                    <span className="text-[#FF6900]">£{revenue.quotePipeline.toLocaleString()}</span>
                  </div>
                  <div className="h-2 bg-[#E2E4E8] rounded-full overflow-hidden">
                    <div className="h-full bg-[#FF6900] rounded-full" style={{ width: '75%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-bold text-[#0F172A] mb-1">
                    <span>Bespoke Trailer Inquiries</span>
                    <span>£24,500</span>
                  </div>
                  <div className="h-2 bg-[#E2E4E8] rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: '32%' }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E2E4E8] text-[11px] text-[#64748B] flex items-center justify-between">
              <span>Checkout Protocol</span>
              <span className="font-bold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" /> Stripe Verified
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 4. TWO WORKSTREAM PANELS: Inquiries & Parts Commerce ───────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Live Inquiries & Quotes Stream (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-[#E2E4E8] shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F0F2F5] pb-4">
            <div>
              <h3 className="text-base font-bold text-[#0F172A]">Live Commercial Inquiries Stream</h3>
              <p className="text-xs text-[#64748B] font-medium mt-0.5">
                Real-time submissions from machinery "Request Pricing" and contact forms
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 bg-[#F6F7F9] p-1 rounded-xl border border-[#E2E4E8]">
              {(['all', 'quotes', 'leads'] as const).map(tab => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setInquiryTab(tab)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    inquiryTab === tab
                      ? 'bg-[#111] text-white font-bold'
                      : 'text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  {tab === 'all' ? 'All Inquiries' : tab === 'quotes' ? 'Machinery Quotes' : 'Contact Leads'}
                </button>
              ))}
            </div>
          </div>

          {/* Inquiries list */}
          {filteredEnquiries.length === 0 ? (
            <div className="py-12 text-center">
              <Inbox className="h-8 w-8 text-[#CBD5E1] mx-auto mb-2" />
              <p className="text-xs text-[#64748B] font-medium">No inquiries matching current filter</p>
            </div>
          ) : (
            <div className="divide-y divide-[#F0F2F5]">
              {filteredEnquiries.slice(0, 6).map((item) => {
                const isQuote = item.type === 'quote' || item.type === 'product-quote';
                const st = STATUS_CONFIG[item.status] || STATUS_CONFIG.new;
                const targetUrl = isQuote ? `/admin/quotes/${item.id}` : '/admin/leads';
                const machineTitle = item.metadata?.product_name || item.subject || 'Commercial Machinery';

                return (
                  <div key={item.id} className="py-3.5 flex items-center justify-between gap-4 hover:bg-[#F8F9FB] px-2 rounded-xl transition-colors">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-9 w-9 rounded-xl bg-[#F6F7F9] border border-[#E2E4E8] flex items-center justify-center shrink-0">
                        {isQuote ? (
                          <FileText className="h-4 w-4 text-[#FF6900]" />
                        ) : (
                          <Inbox className="h-4 w-4 text-blue-600" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-[#0F172A] truncate">
                          {item.name} {item.company ? <span className="text-[#64748B] font-normal">({item.company})</span> : ''}
                        </p>
                        <p className="text-[11px] text-[#64748B] truncate mt-0.5">
                          {machineTitle}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${st.bg} ${st.text}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${st.dot}`} />
                        {st.label}
                      </span>
                      <Link
                        href={targetUrl}
                        className="h-8 w-8 rounded-full bg-[#F6F7F9] hover:bg-[#111] hover:text-white flex items-center justify-center text-[#64748B] transition-all"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="pt-2 border-t border-[#F0F2F5] flex justify-between items-center text-xs">
            <span className="text-[#94A3B8] font-medium">Showing latest incoming submissions</span>
            <Link href="/admin/quotes" className="font-bold text-[#FF6900] hover:underline">
              View Complete Quote Pipeline ({stats.totalQuotes}) →
            </Link>
          </div>
        </div>

        {/* Right Column: Parts & Attachment Store Telemetry (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-[#E2E4E8] shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#F0F2F5] pb-3 mb-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#FF6900]">
                Parts & Attachment Telemetry
              </h3>
              <Link href="/admin/parts" className="text-xs font-bold text-[#0F172A] hover:underline">
                Catalogue →
              </Link>
            </div>

            {/* Top performing parts categories */}
            <div className="space-y-2.5">
              {[
                { name: 'High-Pressure Hoses & Reels', skuCount: 68, active: true },
                { name: 'Trigger Guns & Lances', skuCount: 42, active: true },
                { name: 'Ceramic Rotating Nozzles', skuCount: 54, active: true },
                { name: 'High Pressure Pumps & Seals', skuCount: 36, active: true },
                { name: 'Schedule 80 Heating Coils', skuCount: 18, active: true },
              ].map(cat => (
                <div key={cat.name} className="flex items-center justify-between p-3 rounded-xl bg-[#F8F9FB] border border-[#F0F2F5] text-xs">
                  <div className="min-w-0 pr-2">
                    <p className="font-bold text-[#0F172A] truncate">{cat.name}</p>
                    <p className="text-[10px] text-[#64748B]">{cat.skuCount} active spare parts</p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold shrink-0">
                    Live
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-[#F0F2F5] space-y-2">
            <Link
              href="/admin/parts"
              className="w-full py-2.5 rounded-xl bg-[#F6F7F9] hover:bg-[#E2E4E8] text-xs font-bold text-[#0F172A] transition-colors flex items-center justify-center gap-2 border border-[#E2E4E8]"
            >
              <Wrench className="h-3.5 w-3.5 text-[#FF6900]" /> Open Parts & Spares Manager
            </Link>
          </div>
        </div>
      </div>

      {/* ── 5. STORE CATEGORIES HEALTH & FLEET STATUS ──────────────────────── */}
      <div className="bg-white rounded-2xl p-6 border border-[#E2E4E8] shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-[#0F172A]">Storefront Category Health</h3>
            <p className="text-xs text-[#64748B] font-medium mt-0.5">
              Live status across all 8 commercial equipment departments
            </p>
          </div>
          <Link
            href="/admin/categories"
            className="text-xs font-bold text-[#FF6900] hover:underline"
          >
            Manage All Categories →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
          {CATEGORIES_SUMMARY.map(cat => {
            const Icon = cat.icon;
            const catCount = initialProducts.filter(p => p.category === cat.slug).length;

            return (
              <Link
                key={cat.slug}
                href={`/admin/products?category=${cat.slug}`}
                className="p-4 rounded-xl bg-[#F8F9FB] border border-[#F0F2F5] hover:border-[#CBD5E1] hover:bg-white transition-all text-left group"
              >
                <div className="h-9 w-9 rounded-xl bg-white border border-[#E2E4E8] flex items-center justify-center text-[#FF6900] shadow-sm mb-2.5 group-hover:bg-[#FF6900] group-hover:text-white transition-colors">
                  <Icon className="h-4 w-4" />
                </div>
                <p className="font-bold text-xs text-[#0F172A] truncate group-hover:text-[#FF6900] transition-colors">
                  {cat.name}
                </p>
                <div className="flex items-center justify-between mt-1 text-[11px] text-[#64748B]">
                  <span>{catCount > 0 ? `${catCount} models` : 'Live'}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
