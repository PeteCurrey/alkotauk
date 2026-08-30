'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/components/Logo';
import {
  LayoutDashboard, Inbox, FileText, Wrench, FlaskConical,
  Building2, Globe, Settings, ExternalLink, LogOut,
  Flame, Waves, Wind, Truck, Factory,
  Droplets, Zap, PenSquare, BookOpen, Film,
  Bell, Package, Tag, ChevronDown, User, ShieldCheck, HardDrive,
  ShoppingBag, AlertTriangle, ArrowRight, CheckCircle2, Clock
} from 'lucide-react';

const NAV_SECTIONS = [
  {
    section: 'Overview',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard Overview', href: '/admin/dashboard' },
    ],
  },
  {
    section: 'Orders & Commerce',
    items: [
      { icon: ShoppingBag, label: 'Orders & Dispatch', href: '/admin/orders', badge: 'orders' },
      { icon: FileText, label: 'Quote Requests', href: '/admin/quotes', badge: 'quotes' },
      { icon: Inbox, label: 'Contact Leads', href: '/admin/leads', badge: 'leads' },
      { icon: Truck, label: 'Trailer Builds Pipeline', href: '/admin/trailer-builds' },
    ],
  },
  {
    section: 'Catalogue & Inventory',
    items: [
      { icon: Package, label: 'Machine Inventory', href: '/admin/products' },
      { icon: Tag, label: 'Store Categories', href: '/admin/categories' },
      { icon: Flame, label: 'Hot Water Washers', href: '/admin/products?category=hot-water' },
      { icon: Waves, label: 'Cold Water Washers', href: '/admin/products?category=cold-water' },
      { icon: Wind, label: 'Steam Cleaners', href: '/admin/products?category=steam' },
      { icon: Truck, label: 'Trailers & Skids', href: '/admin/bespoke' },
      { icon: Wrench, label: 'Parts Washers', href: '/admin/products?category=parts-washer' },
      { icon: Droplets, label: 'Water Treatment', href: '/admin/products?category=water-treatment' },
    ],
  },
  {
    section: 'Chemical Commerce',
    items: [
      { icon: FlaskConical, label: 'Chemical Dashboard', href: '/admin/chemicals' },
      { icon: Tag, label: 'Master Formulations', href: '/admin/chemicals/formulations' },
      { icon: Package, label: 'Retail Products', href: '/admin/chemicals/products' },
      { icon: Globe, label: 'Applications & Sectors', href: '/admin/chemicals/applications' },
    ],
  },
  {
    section: 'Parts & Spares',
    items: [
      { icon: Wrench, label: 'Parts Catalogue', href: '/admin/parts' },
      { icon: Tag, label: 'Parts Categories', href: '/admin/parts/categories' },
      { icon: Building2, label: 'Brand Partners', href: '/admin/parts/brands' },
    ],
  },
  {
    section: 'Commercial & Solutions',
    items: [
      { icon: Building2, label: 'Dealer Network', href: '/admin/dealers' },
      { icon: Globe, label: 'Industry Solutions', href: '/admin/industries' },
    ],
  },
  {
    section: 'Wash Plant Projects',
    items: [
      { icon: Factory, label: 'Plant Projects Pipeline', href: '/admin/wash-plant' },
      { icon: Zap, label: 'Installed Plant Assets', href: '/admin/wash-plant/assets' },
      { icon: FileText, label: 'Project Media Hub', href: '/admin/wash-plant/media' },
    ],
  },
  {
    section: 'Content Management',
    items: [
      { icon: BookOpen, label: 'The Lobby CMS', href: '/admin/lobby' },
      { icon: Film, label: 'Mess Quest Series', href: '/admin/mess-quest' },
      { icon: PenSquare, label: 'Blog & Case Studies', href: '/admin/posts' },
    ],
  },
  {
    section: 'System & Settings',
    items: [
      { icon: Settings, label: 'System Settings', href: '/admin/settings' },
      { icon: Bell, label: 'Sitewide Banners', href: '/admin/banners' },
      { icon: ShieldCheck, label: 'Maintenance Mode', href: '/admin/maintenance' },
      { icon: HardDrive, label: 'Database Utilities', href: '/admin/settings/utilities' },
    ],
  },
];

function NavItem({
  href, icon: Icon, label, badgeCount,
}: {
  href: string; icon: React.ElementType; label: string; badgeCount?: number;
}) {
  const pathname = usePathname();
  const basePath = href.split('?')[0];
  const isActive = pathname === basePath || (basePath !== '/admin/dashboard' && pathname.startsWith(basePath));

  return (
    <Link
      href={href}
      className={`group flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 ${
        isActive
          ? 'bg-[#111111] text-white shadow-sm font-bold'
          : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F6F7F9]'
      }`}
    >
      <Icon
        className={`h-4 w-4 shrink-0 transition-colors ${
          isActive ? 'text-[#FF6900]' : 'text-[#94A3B8] group-hover:text-[#0F172A]'
        }`}
      />
      <span className="flex-1 truncate">{label}</span>
      {badgeCount !== undefined && badgeCount > 0 ? (
        <span
          className={`h-4 min-w-4 px-1.5 rounded-full text-[9px] font-extrabold flex items-center justify-center ${
            isActive ? 'bg-[#FF6900] text-white' : 'bg-[#FF6900] text-white'
          }`}
        >
          {badgeCount > 99 ? '99+' : badgeCount}
        </span>
      ) : null}
    </Link>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [newOrderCount, setNewOrderCount] = useState(0);
  const [newQuoteCount, setNewQuoteCount] = useState(0);
  const [newLeadCount, setNewLeadCount] = useState(0);
  const [lowStockCount, setLowStockCount] = useState(0);
  const [notifications, setNotifications] = useState<{
    totalCount: number;
    newOrders: any[];
    newQuotes: any[];
    newLeads: any[];
    lowStockParts: any[];
  }>({
    totalCount: 0,
    newOrders: [],
    newQuotes: [],
    newLeads: [],
    lowStockParts: [],
  });

  const [showNotifications, setShowNotifications] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  // Fetch live notifications stream
  useEffect(() => {
    fetch('/api/admin/notifications')
      .then(r => r.json())
      .then(d => {
        if (d) {
          setNotifications(d);
          setNewOrderCount(d.newOrders?.length || 0);
          setNewQuoteCount(d.newQuotes?.length || 0);
          setNewLeadCount(d.newLeads?.length || 0);
          setLowStockCount(d.lowStockParts?.length || 0);
        }
      })
      .catch(() => {});
  }, [pathname]);

  // Click outside to close notification dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Login page — clean light canvas with no shell
  if (pathname === '/admin' || pathname === '/admin/login') {
    return <div className="min-h-screen bg-[#EBECEF] text-[#0F172A]">{children}</div>;
  }

  const totalAlerts = notifications.totalCount || (newOrderCount + newQuoteCount + newLeadCount + lowStockCount);

  return (
    <div className="flex min-h-screen bg-[#EBECEF] text-[#0F172A] antialiased selection:bg-[#FF6900] selection:text-white font-sans">
      {/* ── LEFT SIDEBAR NAVIGATION ──────────────────────────────────────── */}
      <aside
        className="fixed left-0 top-0 h-full z-40 flex flex-col bg-white border-r border-[#E2E4E8] shadow-[2px_0_16px_rgba(0,0,0,0.02)]"
        style={{ width: '260px' }}
      >
        {/* Brand Header */}
        <div className="px-5 py-5 border-b border-[#F0F2F5] shrink-0">
          <Link href="/admin/dashboard" className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-xl bg-[#FF6900] flex items-center justify-center text-white font-black text-xs shadow-sm">
              A
            </div>
            <div>
              <p className="font-extrabold tracking-tight text-sm text-[#0F172A] leading-tight">
                ALKOTA <span className="text-[#FF6900]">UK</span>
              </p>
              <p className="text-[10px] text-[#94A3B8] font-bold uppercase tracking-wider">
                Admin Portal
              </p>
            </div>
          </Link>
        </div>

        {/* Scrollable Nav Sections */}
        <nav className="flex-1 px-3 py-4 space-y-5 overflow-y-auto scrollbar-thin">
          {NAV_SECTIONS.map((group) => (
            <div key={group.section} className="space-y-0.5">
              <p className="px-3 pb-1.5 text-[10px] font-extrabold uppercase tracking-wider text-[#94A3B8]">
                {group.section}
              </p>
              {group.items.map((item) => (
                <NavItem
                  key={item.href}
                  {...item}
                  badgeCount={
                    item.badge === 'orders' ? newOrderCount :
                    item.badge === 'quotes' ? newQuoteCount :
                    item.badge === 'leads' ? newLeadCount : undefined
                  }
                />
              ))}
            </div>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-[#F0F2F5] shrink-0 space-y-1 bg-[#FDFDFD]">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-[#64748B] hover:text-[#0F172A] hover:bg-[#F6F7F9] transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5 text-[#94A3B8]" />
            <span>Open Public Store</span>
          </Link>
          <Link
            href="/api/admin/logout"
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-[#64748B] hover:text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="h-3.5 w-3.5 text-[#94A3B8]" />
            <span>Sign Out</span>
          </Link>
        </div>
      </aside>

      {/* ── MAIN WORKSPACE ─────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0" style={{ marginLeft: '260px' }}>
        {/* Floating Top Bar */}
        <header className="sticky top-0 z-30 px-6 py-4 bg-[#EBECEF]/80 backdrop-blur-md">
          <div className="flex items-center justify-between gap-4 bg-white px-5 py-2.5 rounded-2xl border border-[#E2E4E8] shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
            {/* Left Breadcrumb / Context */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#F6F7F9] border border-[#E2E4E8] text-[11px] font-semibold text-[#475569]">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Alkota Production Core</span>
              </div>
              <span className="text-[#CBD5E1]">/</span>
              <span className="text-xs font-bold text-[#0F172A]">
                {pathname.split('/')[2] ? pathname.split('/')[2].charAt(0).toUpperCase() + pathname.split('/')[2].slice(1) : 'Dashboard Overview'}
              </span>
            </div>

            {/* Right Tools, Notification Bell, & Profile */}
            <div className="flex items-center gap-3">
              {/* Notification Bell with Dropdown */}
              <div className="relative" ref={notifRef}>
                <button
                  type="button"
                  onClick={() => setShowNotifications(!showNotifications)}
                  className={`relative h-10 w-10 rounded-full border flex items-center justify-center transition-all ${
                    showNotifications || totalAlerts > 0
                      ? 'bg-[#111111] text-white border-[#111111]'
                      : 'bg-[#F6F7F9] text-[#64748B] hover:text-[#0F172A] border-[#E2E4E8]'
                  }`}
                  title="Alerts & Notifications"
                >
                  <Bell className="h-4 w-4" />
                  {totalAlerts > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 min-w-5 px-1 rounded-full bg-[#FF6900] text-white text-[10px] font-extrabold flex items-center justify-center shadow-sm animate-pulse">
                      {totalAlerts}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown Modal */}
                {showNotifications && (
                  <div className="absolute right-0 mt-3 w-96 bg-white rounded-2xl border border-[#E2E4E8] shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 space-y-4">
                    <div className="flex items-center justify-between border-b border-[#F0F2F5] pb-3">
                      <div>
                        <h4 className="text-xs font-bold text-[#0F172A]">Notification Center</h4>
                        <p className="text-[11px] text-[#64748B]">Real-time operational alerts</p>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-[#FF6900]/10 text-[#FF6900] text-[10px] font-bold">
                        {totalAlerts} Pending Action
                      </span>
                    </div>

                    <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                      {/* New Orders Section */}
                      {notifications.newOrders && notifications.newOrders.length > 0 && (
                        <div className="space-y-1.5">
                          <p className="text-[10px] font-bold uppercase text-[#FF6900] tracking-wider px-1">
                            New Orders ({notifications.newOrders.length})
                          </p>
                          {notifications.newOrders.map((o) => (
                            <Link
                              key={o.id}
                              href="/admin/orders"
                              onClick={() => setShowNotifications(false)}
                              className="flex items-center justify-between p-2.5 rounded-xl bg-[#F8F9FB] hover:bg-[#F1F3F7] border border-[#F0F2F5] transition-colors"
                            >
                              <div className="min-w-0 pr-2">
                                <p className="text-xs font-bold text-[#0F172A] truncate">
                                  {o.order_number} · £{o.total?.toFixed(2)}
                                </p>
                                <p className="text-[10px] text-[#64748B] truncate">{o.customer_name}</p>
                              </div>
                              <span className="px-2 py-0.5 rounded-full bg-[#FF6900] text-white text-[9px] font-bold shrink-0">
                                Unprocessed
                              </span>
                            </Link>
                          ))}
                        </div>
                      )}

                      {/* New Quotes Section */}
                      {notifications.newQuotes && notifications.newQuotes.length > 0 && (
                        <div className="space-y-1.5">
                          <p className="text-[10px] font-bold uppercase text-blue-600 tracking-wider px-1">
                            New Quote Inquiries ({notifications.newQuotes.length})
                          </p>
                          {notifications.newQuotes.map((q) => (
                            <Link
                              key={q.id}
                              href={`/admin/quotes/${q.id}`}
                              onClick={() => setShowNotifications(false)}
                              className="flex items-center justify-between p-2.5 rounded-xl bg-[#F8F9FB] hover:bg-[#F1F3F7] border border-[#F0F2F5] transition-colors"
                            >
                              <div className="min-w-0 pr-2">
                                <p className="text-xs font-bold text-[#0F172A] truncate">
                                  {q.name} {q.company ? `(${q.company})` : ''}
                                </p>
                                <p className="text-[10px] text-[#64748B] truncate">
                                  {q.metadata?.product_name || q.subject || 'Machinery Quote'}
                                </p>
                              </div>
                              <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[9px] font-bold shrink-0">
                                Pricing Request
                              </span>
                            </Link>
                          ))}
                        </div>
                      )}

                      {/* Low Stock Section */}
                      {notifications.lowStockParts && notifications.lowStockParts.length > 0 && (
                        <div className="space-y-1.5">
                          <p className="text-[10px] font-bold uppercase text-amber-700 tracking-wider px-1">
                            Low Stock Alerts ({notifications.lowStockParts.length})
                          </p>
                          {notifications.lowStockParts.map((p) => (
                            <Link
                              key={p.id}
                              href="/admin/parts"
                              onClick={() => setShowNotifications(false)}
                              className="flex items-center justify-between p-2.5 rounded-xl bg-amber-50/70 hover:bg-amber-100/70 border border-amber-200/70 transition-colors"
                            >
                              <div className="min-w-0 pr-2">
                                <p className="text-xs font-bold text-amber-900 truncate">{p.name}</p>
                                <p className="text-[10px] text-amber-700">SKU: {p.sku || 'N/A'}</p>
                              </div>
                              <span className="px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 text-[9px] font-extrabold shrink-0">
                                {p.stock_quantity ?? 0} Left
                              </span>
                            </Link>
                          ))}
                        </div>
                      )}

                      {totalAlerts === 0 && (
                        <div className="py-8 text-center text-xs text-[#64748B]">
                          <CheckCircle2 className="h-6 w-6 text-emerald-500 mx-auto mb-1.5" />
                          All orders fulfilled, quotes processed, and stock levels healthy.
                        </div>
                      )}
                    </div>

                    <div className="pt-2 border-t border-[#F0F2F5] flex items-center justify-between text-xs">
                      <Link
                        href="/admin/orders"
                        onClick={() => setShowNotifications(false)}
                        className="font-bold text-[#FF6900] hover:underline"
                      >
                        All Orders →
                      </Link>
                      <Link
                        href="/admin/parts"
                        onClick={() => setShowNotifications(false)}
                        className="font-bold text-[#64748B] hover:text-[#0F172A]"
                      >
                        Parts Inventory →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/machines"
                target="_blank"
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F6F7F9] hover:bg-[#E2E4E8] text-xs font-semibold text-[#334155] transition-colors border border-[#E2E4E8]"
              >
                <span>Live Storefront</span>
                <ExternalLink className="h-3 w-3 text-[#94A3B8]" />
              </Link>

              {/* Operator Profile Capsule */}
              <div className="flex items-center gap-2 pl-1.5 pr-3 py-1 rounded-full bg-[#F6F7F9] border border-[#E2E4E8]">
                <div className="h-7 w-7 rounded-full bg-[#FF6900] text-white flex items-center justify-center font-extrabold text-xs shadow-sm">
                  PC
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-xs font-bold text-[#0F172A] leading-tight">Pete Currey</p>
                  <p className="text-[10px] text-[#64748B] font-medium leading-none">Administrator</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 px-6 pb-12 pt-2">
          {children}
        </main>
      </div>
    </div>
  );
}
