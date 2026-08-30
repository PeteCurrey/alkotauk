'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import {
  LayoutDashboard,
  Package,
  Wrench,
  BookOpen,
  GraduationCap,
  Calendar,
  HeadphonesIcon,
  Megaphone,
  User,
  Users,
  LogOut,
  Bell,
  Search,
  Menu,
  X,
  ChevronRight,
  ShoppingCart,
  FileText,
  Zap,
  ExternalLink,
  Settings,
} from 'lucide-react';

const NAV_SECTIONS = [
  {
    section: 'Overview',
    items: [
      { icon: LayoutDashboard, label: 'Command Centre', href: '/dealer/dashboard' },
    ],
  },
  {
    section: 'Commerce',
    items: [
      { icon: ShoppingCart, label: 'Place an Order', href: '/dealer/orders/new' },
      { icon: Package, label: 'Parts Catalogue', href: '/dealer/parts' },
      { icon: FileText, label: 'Order History', href: '/dealer/orders' },
    ],
  },
  {
    section: 'Resources',
    items: [
      { icon: BookOpen, label: 'Resource Centre', href: '/dealer/resources' },
      { icon: Megaphone, label: 'Marketing Hub', href: '/dealer/marketing' },
    ],
  },
  {
    section: 'Training',
    items: [
      { icon: GraduationCap, label: 'Training Library', href: '/dealer/training' },
      { icon: Calendar, label: 'Upcoming Events', href: '/dealer/training/events' },
    ],
  },
  {
    section: 'Operations',
    items: [
      { icon: Zap, label: 'Demo Requests', href: '/dealer/demo-days' },
      { icon: HeadphonesIcon, label: 'Support', href: '/dealer/support' },
    ],
  },
  {
    section: 'Account',
    items: [
      { icon: User, label: 'Dealer Profile', href: '/dealer/account' },
      { icon: Users, label: 'Manage Users', href: '/dealer/account/users' },
    ],
  },
];

function NavItem({ href, icon: Icon, label }: { href: string; icon: React.ElementType; label: string }) {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== '/dealer/dashboard' && pathname.startsWith(href));

  return (
    <Link
      href={href}
      className={`group flex items-center gap-2.5 px-3 py-2 text-xs transition-all duration-150 ${
        isActive
          ? 'bg-alkota-orange/10 text-alkota-orange border-l-2 border-alkota-orange'
          : 'text-alkota-silver hover:text-alkota-black hover:bg-[#F5F4F0] border-l-2 border-transparent'
      }`}
    >
      <Icon className={`h-3.5 w-3.5 shrink-0 ${isActive ? 'text-alkota-orange' : 'text-alkota-silver group-hover:text-alkota-black'}`} />
      <span className="flex-1 truncate">{label}</span>
      {isActive && <ChevronRight className="h-3 w-3 text-alkota-orange/60" />}
    </Link>
  );
}

export default function DealerPortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  // Public routes that don't need auth — the layout still wraps them
  const isPublicRoute = pathname === '/dealer' || pathname === '/dealer/request' || pathname === '/dealer/login';

  useEffect(() => {
    if (!isPublicRoute && status === 'unauthenticated') {
      router.replace('/dealer/login');
    }
  }, [status, isPublicRoute, router]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // For public routes (landing, login, request) — render without the portal shell
  if (isPublicRoute) {
    return <>{children}</>;
  }

  // Loading state
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#FAF9F5] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-alkota-orange border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs text-alkota-silver">Loading dealer portal…</p>
        </div>
      </div>
    );
  }

  const user = session?.user as any;
  const dealerName = user?.company || 'Alkota Dealer';
  const userName = user?.name || '';
  const initials = userName
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="flex min-h-screen bg-[#FAF9F5] text-alkota-black antialiased">

      {/* ── MOBILE OVERLAY ───────────────────────────────────────── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── LEFT SIDEBAR ─────────────────────────────────────────── */}
      <aside
        className={`fixed left-0 top-0 h-full z-40 flex flex-col bg-white border-r border-[#E8E8E4] transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        style={{ width: '240px' }}
      >
        {/* Brand Header */}
        <div className="px-4 py-4 border-b border-[#E8E8E4] shrink-0">
          <Link href="/dealer/dashboard" className="flex items-center gap-2.5">
            <div className="h-8 w-8 bg-alkota-black flex items-center justify-center shrink-0">
              <span className="text-alkota-orange font-normal text-sm">A</span>
            </div>
            <div>
              <p className="text-xs text-alkota-black leading-tight">
                ALKOTA <span className="text-alkota-orange">UK</span>
              </p>
              <p className="text-[10px] text-alkota-silver uppercase tracking-widest">
                Dealer Portal
              </p>
            </div>
          </Link>
        </div>

        {/* Dealer Identity Strip */}
        <div className="px-4 py-3 border-b border-[#E8E8E4] bg-[#FAF9F5] shrink-0">
          <p className="text-[9px] uppercase tracking-widest text-alkota-silver mb-0.5">Logged in as</p>
          <p className="text-xs text-alkota-black leading-snug truncate">{userName}</p>
          <p className="text-[10px] text-alkota-orange truncate">{dealerName}</p>
        </div>

        {/* Nav Sections */}
        <nav className="flex-1 py-3 overflow-y-auto">
          {NAV_SECTIONS.map((group) => (
            <div key={group.section} className="mb-4">
              <p className="px-4 pb-1 text-[9px] uppercase tracking-widest text-alkota-iron">
                {group.section}
              </p>
              {group.items.map((item) => (
                <NavItem key={item.href} {...item} />
              ))}
            </div>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-[#E8E8E4] shrink-0 space-y-1">
          <Link
            href="/dealer/account"
            className="flex items-center gap-2 px-3 py-2 text-xs text-alkota-silver hover:text-alkota-black hover:bg-[#F5F4F0] transition-colors"
          >
            <Settings className="h-3.5 w-3.5" />
            <span>Account Settings</span>
          </Link>
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-3 py-2 text-xs text-alkota-silver hover:text-alkota-black hover:bg-[#F5F4F0] transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            <span>Alkota UK Website</span>
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: '/dealer' })}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-alkota-silver hover:text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ── MAIN AREA ─────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-[240px]">

        {/* Top Header Bar */}
        <header className="sticky top-0 z-20 bg-white border-b border-[#E8E8E4] px-4 lg:px-6 py-3">
          <div className="flex items-center justify-between gap-4">

            {/* Left: hamburger + breadcrumb */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden h-8 w-8 flex items-center justify-center text-alkota-silver hover:text-alkota-black border border-[#E8E8E4]"
              >
                {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>

              {/* Search bar */}
              <div className="hidden md:flex items-center gap-2 bg-[#FAF9F5] border border-[#E8E8E4] px-3 py-1.5 w-64">
                <Search className="h-3.5 w-3.5 text-alkota-silver shrink-0" />
                <input
                  type="text"
                  placeholder="Search parts, manuals, resources…"
                  className="bg-transparent text-xs text-alkota-black placeholder-alkota-silver outline-none flex-1"
                />
              </div>
            </div>

            {/* Right: notifications + profile */}
            <div className="flex items-center gap-3">

              {/* Notification Bell */}
              <div className="relative" ref={notifRef}>
                <button
                  onClick={() => setNotifOpen(!notifOpen)}
                  className="relative h-8 w-8 flex items-center justify-center text-alkota-silver hover:text-alkota-black border border-[#E8E8E4] hover:border-alkota-orange transition-colors"
                >
                  <Bell className="h-3.5 w-3.5" />
                </button>
                {notifOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white border border-[#E8E8E4] shadow-lg z-50">
                    <div className="px-4 py-3 border-b border-[#E8E8E4]">
                      <p className="text-xs text-alkota-black">Notifications</p>
                      <p className="text-[10px] text-alkota-silver">Your recent activity</p>
                    </div>
                    <div className="py-8 text-center">
                      <p className="text-xs text-alkota-silver">No new notifications</p>
                    </div>
                    <div className="px-4 py-2 border-t border-[#E8E8E4]">
                      <Link
                        href="/dealer/dashboard"
                        onClick={() => setNotifOpen(false)}
                        className="text-[10px] text-alkota-orange uppercase tracking-widest hover:underline"
                      >
                        View all →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* User avatar */}
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-alkota-black flex items-center justify-center shrink-0">
                  <span className="text-alkota-orange text-[11px]">{initials}</span>
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-xs text-alkota-black leading-tight">{userName}</p>
                  <p className="text-[10px] text-alkota-silver capitalize">{user?.role || 'Dealer'}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 px-4 lg:px-6 py-6">
          {children}
        </main>

        {/* Footer */}
        <footer className="px-6 py-4 border-t border-[#E8E8E4] bg-white">
          <div className="flex items-center justify-between text-[10px] text-alkota-silver">
            <span>© 2026 Alkota UK. Authorised Dealer Portal.</span>
            <span>For support: <a href="mailto:dealer@alkota.co.uk" className="text-alkota-orange hover:underline">dealer@alkota.co.uk</a></span>
          </div>
        </footer>
      </div>
    </div>
  );
}
