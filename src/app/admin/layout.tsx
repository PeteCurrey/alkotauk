'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/components/Logo';
import {
  LayoutDashboard, Package, Tag, FileText, Inbox,
  Factory, BookOpen, Settings, ExternalLink, LogOut,
  Bell, Search, User, ChevronDown, Flame, Waves, Wind, Truck
} from 'lucide-react';

const TOP_NAV = [
  { id: 'dashboard', href: '/admin/dashboard', icon: LayoutDashboard, label: 'Studio Overview' },
  { id: 'products', href: '/admin/products', icon: Package, label: 'Machine Inventory' },
  { id: 'categories', href: '/admin/categories', icon: Tag, label: 'Store Categories' },
  { id: 'quotes', href: '/admin/quotes', icon: FileText, label: 'Quote Requests', badge: 'quotes' },
  { id: 'leads', href: '/admin/leads', icon: Inbox, label: 'Commercial Leads', badge: 'leads' },
  { id: 'wash-plant', href: '/admin/wash-plant', icon: Factory, label: 'Wash Plant Pipeline' },
  { id: 'settings', href: '/admin/settings', icon: Settings, label: 'System Settings' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [newQuoteCount, setNewQuoteCount] = useState(0);
  const [newLeadCount, setNewLeadCount] = useState(0);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Fetch live counts
  useEffect(() => {
    fetch('/api/admin/enquiries?status=new&type=quote&countOnly=true')
      .then(r => r.json())
      .then(d => { if (typeof d.count === 'number') setNewQuoteCount(d.count); })
      .catch(() => {});

    fetch('/api/admin/enquiries?status=new&countOnly=true')
      .then(r => r.json())
      .then(d => { if (typeof d.count === 'number') setNewLeadCount(d.count); })
      .catch(() => {});
  }, [pathname]);

  // Login page — clean light canvas with no shell
  if (pathname === '/admin' || pathname === '/admin/login') {
    return <div className="min-h-screen bg-[#EBECEF] text-[#0F172A]">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-[#EBECEF] text-[#0F172A] antialiased selection:bg-[#FF6900] selection:text-white flex flex-col font-sans">
      {/* ── TOP FLOATING CONTROL DECK ────────────────────────────────────── */}
      <header className="sticky top-0 z-50 w-full px-6 py-4">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-4">
          {/* Brand Emblem */}
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-[#E2E4E8] hover:border-[#CBD5E1] transition-all"
          >
            <div className="h-6 w-6 rounded-full bg-[#FF6900] flex items-center justify-center text-white font-black text-xs">
              A
            </div>
            <span className="font-extrabold tracking-tight text-sm text-[#0F172A]">
              ALKOTA <span className="text-[#FF6900] font-bold">UK</span>
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#F1F3F7] text-[10px] font-bold text-[#64748B] uppercase">
              Studio
            </span>
          </Link>

          {/* Centered Floating Pill Navigation Island */}
          <nav className="flex items-center gap-1 bg-white p-1.5 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-[#E2E4E8]">
            {TOP_NAV.map(item => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== '/admin/dashboard' && pathname.startsWith(item.href));
              const badgeNum = item.badge === 'quotes' ? newQuoteCount : item.badge === 'leads' ? newLeadCount : 0;

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  title={item.label}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-[#111111] text-white shadow-sm'
                      : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F6F7F9]'
                  }`}
                >
                  <div className={`h-6 w-6 rounded-full flex items-center justify-center shrink-0 ${
                    isActive ? 'bg-transparent text-white' : 'text-[#64748B]'
                  }`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="hidden xl:inline-block pr-1 font-medium">{item.label}</span>
                  {badgeNum > 0 && (
                    <span className={`h-4 min-w-4 px-1 rounded-full text-[9px] font-extrabold flex items-center justify-center ${
                      isActive ? 'bg-[#FF6900] text-white' : 'bg-[#FF6900] text-white'
                    }`}>
                      {badgeNum}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Tools & Operator Profile Capsule */}
          <div className="flex items-center gap-2">
            {/* Direct Storefront Link */}
            <Link
              href="/"
              target="_blank"
              title="Open Public Storefront"
              className="h-10 w-10 rounded-full bg-white border border-[#E2E4E8] flex items-center justify-center text-[#64748B] hover:text-[#0F172A] hover:bg-[#F6F7F9] shadow-[0_2px_8px_rgba(0,0,0,0.03)] transition-all"
            >
              <ExternalLink className="h-4 w-4" />
            </Link>

            {/* Operator Profile Capsule */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2.5 pl-1.5 pr-3.5 py-1.5 rounded-full bg-white border border-[#E2E4E8] shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:border-[#CBD5E1] transition-all"
              >
                <div className="h-7 w-7 rounded-full bg-[#FF6900] text-white flex items-center justify-center font-extrabold text-xs shadow-sm">
                  PC
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-xs font-bold text-[#0F172A] leading-tight">Pete Currey</p>
                  <p className="text-[10px] text-[#64748B] font-medium leading-none">Administrator</p>
                </div>
                <ChevronDown className="h-3.5 w-3.5 text-[#94A3B8] ml-0.5" />
              </button>

              {/* User Dropdown */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl border border-[#E2E4E8] shadow-xl p-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3 py-2 border-b border-[#F0F2F5]">
                    <p className="text-xs font-bold text-[#0F172A]">Pete Currey</p>
                    <p className="text-[11px] text-[#64748B] truncate">admin@alkota.co.uk</p>
                  </div>
                  <Link
                    href="/admin/settings"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-[#475569] hover:bg-[#F6F7F9] hover:text-[#0F172A] transition-colors"
                  >
                    <Settings className="h-3.5 w-3.5" />
                    <span>Studio Settings</span>
                  </Link>
                  <Link
                    href="/"
                    target="_blank"
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-[#475569] hover:bg-[#F6F7F9] hover:text-[#0F172A] transition-colors"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span>View Public Store</span>
                  </Link>
                  <Link
                    href="/api/admin/logout"
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    <span>Sign Out</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ── MAIN PANORAMIC STUDIO WORKSPACE ───────────────────────────────── */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-6 pb-12 pt-2">
        {children}
      </main>
    </div>
  );
}


