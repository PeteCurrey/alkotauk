'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Logo from '@/components/Logo';
import {
  LayoutDashboard, Inbox, FileText, Wrench, FlaskConical,
  Building2, Globe, Settings, ExternalLink, LogOut,
  ChevronRight, Flame, Waves, Wind, Truck, Factory,
  Droplets, Zap, BarChart3, PenSquare, BookOpen, Film,
  Bell,
} from 'lucide-react';

const NAV = [
  {
    section: 'OVERVIEW',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
    ],
  },
  {
    section: 'CATALOGUE',
    items: [
      { icon: Flame, label: 'Hot Water Machines', href: '/admin/products?category=hot-water' },
      { icon: Waves, label: 'Cold Water Machines', href: '/admin/products?category=cold-water' },
      { icon: Wind, label: 'Steam Cleaners', href: '/admin/products?category=steam' },
      { icon: Truck, label: 'Trailers & Bespoke', href: '/admin/bespoke' },
      { icon: Factory, label: 'Wash Plants', href: '/admin/bespoke?type=wash-plant' },
      { icon: Wrench, label: 'Parts Washers', href: '/admin/products?category=parts-washer' },
      { icon: Droplets, label: 'Water Treatment', href: '/admin/products?category=water-treatment' },
      { icon: FlaskConical, label: 'Chemicals', href: '/admin/chemicals' },
    ],
  },
  {
    section: 'COMMERCIAL',
    items: [
      { icon: Inbox, label: 'Enquiries & Leads', href: '/admin/leads', badge: true },
      { icon: Truck, label: 'Trailer Builds Pipeline', href: '/admin/trailer-builds' },
      { icon: Building2, label: 'Dealer Network', href: '/admin/dealers' },
      { icon: Globe, label: 'Industry Pages', href: '/admin/industries' },
    ],
  },
  {
    section: 'CONTENT',
    items: [
      { icon: BookOpen, label: 'The Lobby CMS', href: '/admin/lobby' },
      { icon: Film, label: 'Mess Quest Series', href: '/admin/mess-quest' },
      { icon: PenSquare, label: 'Blog & Resources', href: '/admin/posts' },
    ],
  },
  {
    section: 'SYSTEM',
    items: [
      { icon: Settings, label: 'Settings', href: '/admin/settings' },
    ],
  },
];

function NavItem({
  href, icon: Icon, label, badge, newCount,
}: {
  href: string; icon: React.ElementType; label: string; badge?: boolean; newCount?: number;
}) {
  const pathname = usePathname();
  const basePath = href.split('?')[0];
  const isActive = pathname === basePath || (basePath !== '/admin/dashboard' && pathname.startsWith(basePath));

  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-4 py-2.5 text-[13px] font-medium transition-all relative"
      style={{
        color: isActive ? '#fff' : '#888',
        background: isActive ? 'rgba(255,105,0,0.08)' : 'transparent',
        borderLeft: isActive ? '3px solid #FF6900' : '3px solid transparent',
      }}
    >
      <Icon className="h-4 w-4 shrink-0" style={{ color: isActive ? '#FF6900' : '#555' }} />
      <span className="flex-1">{label}</span>
      {badge && newCount && newCount > 0 ? (
        <span className="h-5 min-w-5 px-1.5 rounded-full bg-[#FF6900] text-white text-[10px] font-black flex items-center justify-center">
          {newCount > 99 ? '99+' : newCount}
        </span>
      ) : null}
      {isActive && <ChevronRight className="h-3 w-3 text-[#FF6900]" />}
    </Link>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [newEnquiryCount, setNewEnquiryCount] = useState(0);

  // Fetch new enquiry count for badge
  useEffect(() => {
    fetch('/api/admin/enquiries?status=new&countOnly=true')
      .then(r => r.json())
      .then(d => { if (typeof d.count === 'number') setNewEnquiryCount(d.count); })
      .catch(() => {});
  }, [pathname]);

  // Login page — no shell
  if (pathname === '/admin' || pathname === '/admin/login') {
    return <div className="min-h-screen bg-[#0D0D0D]">{children}</div>;
  }

  return (
    <div className="flex min-h-screen" style={{ background: '#111', fontFamily: 'Inter, sans-serif' }}>
      {/* ── SIDEBAR ──────────────────────────────────────────────────────── */}
      <aside
        className="fixed left-0 top-0 h-full z-50 flex flex-col overflow-y-auto"
        style={{ width: '260px', background: '#0D0D0D', borderRight: '1px solid #1F1F1F' }}
      >
        {/* Logo */}
        <div className="px-5 py-5 border-b border-[#1F1F1F] shrink-0">
          <Logo className="h-7 text-white" />
          <span className="inline-block mt-2 px-2 py-0.5 bg-[#FF6900]/15 border border-[#FF6900]/30 font-ibm-plex-mono text-[8px] font-black uppercase tracking-widest text-[#FF6900]">
            UK Admin
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4">
          {NAV.map((group) => (
            <div key={group.section} className="mb-1">
              <p className="px-4 pt-4 pb-1.5 font-ibm-plex-mono text-[8px] font-black uppercase tracking-[0.25em] text-[#444]">
                {group.section}
              </p>
              {group.items.map((item) => (
                <NavItem
                  key={item.href}
                  {...item}
                  newCount={item.badge ? newEnquiryCount : 0}
                />
              ))}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-[#1F1F1F] pb-4 pt-3 shrink-0">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-4 py-2.5 text-[13px] text-[#555] hover:text-white transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            <span>View Live Site</span>
          </Link>
          <Link
            href="/api/admin/logout"
            className="flex items-center gap-3 px-4 py-2.5 text-[13px] text-[#555] hover:text-red-400 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </Link>
        </div>
      </aside>

      {/* ── MAIN AREA ─────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col" style={{ marginLeft: '260px' }}>
        {/* Top Bar */}
        <header
          className="sticky top-0 z-40 flex items-center justify-between px-8 py-0"
          style={{ background: '#0D0D0D', borderBottom: '1px solid #1F1F1F', height: '56px' }}
        >
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#444]">
            <span>Alkota UK</span>
            <span>/</span>
            <span className="text-[#666]">Admin</span>
          </div>

          {/* Right: Bell + Avatar */}
          <div className="flex items-center gap-4">
            {newEnquiryCount > 0 && (
              <Link href="/admin/enquiries?status=new" className="relative text-[#555] hover:text-white transition-colors">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-[#FF6900] text-white text-[8px] font-black flex items-center justify-center">
                  {newEnquiryCount > 9 ? '9+' : newEnquiryCount}
                </span>
              </Link>
            )}
            <div className="flex items-center gap-3">
              <div className="h-7 w-7 rounded-full bg-[#FF6900] flex items-center justify-center font-black text-white text-[11px]">
                A
              </div>
              <Link
                href="/api/admin/logout"
                className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#555] hover:text-red-400 transition-colors"
              >
                Sign Out
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8 text-white">
          {children}
        </main>
      </div>
    </div>
  );
}
