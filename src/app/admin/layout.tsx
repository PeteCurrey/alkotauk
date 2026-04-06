'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Logo from '@/components/Logo';
import {
  BarChart3, Inbox, FileText, Wrench, FlaskConical,
  Component, Paperclip, Globe, Megaphone, Lock,
  Settings, ExternalLink, LogOut, ChevronRight,
} from 'lucide-react';

const NAV_SECTIONS = [
  {
    label: null,
    items: [
      { icon: BarChart3, label: 'Overview', href: '/admin/dashboard' },
      { icon: Inbox, label: 'Enquiries', href: '/admin/enquiries' },
      { icon: FileText, label: 'Blog Posts', href: '/admin/blog' },
    ],
  },
  {
    label: 'Products',
    items: [
      { icon: Wrench, label: 'Machines', href: '/admin/machines' },
      { icon: FlaskConical, label: 'Chemicals', href: '/admin/chemicals' },
      { icon: Component, label: 'Parts', href: '/admin/parts' },
      { icon: Paperclip, label: 'Attachments', href: '/admin/attachments' },
    ],
  },
  {
    label: 'Site',
    items: [
      { icon: Globe, label: 'Site Settings', href: '/admin/settings/site' },
      { icon: Megaphone, label: 'Banners', href: '/admin/banners' },
      { icon: Lock, label: 'Maintenance Mode', href: '/admin/maintenance' },
    ],
  },
  {
    label: 'Account',
    items: [
      { icon: Settings, label: 'Settings', href: '/admin/settings' },
    ],
  },
];

function SidebarLink({ href, icon: Icon, label }: { href: string; icon: React.ElementType; label: string }) {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== '/admin/dashboard' && pathname.startsWith(href));

  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-4 py-2.5 text-[13px] font-medium transition-all group relative"
      style={{
        color: isActive ? '#fff' : '#888',
        background: isActive ? 'rgba(255,105,0,0.08)' : 'transparent',
        borderLeft: isActive ? '3px solid #FF6900' : '3px solid transparent',
      }}
    >
      <Icon className="h-4 w-4 shrink-0" style={{ color: isActive ? '#FF6900' : '#555' }} />
      <span>{label}</span>
      {isActive && <ChevronRight className="h-3 w-3 ml-auto text-[#FF6900]" />}
    </Link>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Basic client-side check to improve UX
    if (!document.cookie.includes('alkota-admin-token')) {
      router.push('/admin');
    }
  }, [router]);

  return (
    <div className="flex min-h-screen" style={{ background: '#111', fontFamily: 'Inter, sans-serif' }}>
      {/* Sidebar */}
      <aside
        className="fixed left-0 top-0 h-full z-50 flex flex-col"
        style={{ width: '220px', background: '#0D0D0D', borderRight: '1px solid #1F1F1F' }}
      >
        {/* Logo */}
        <div className="px-4 py-5 border-b border-[#1F1F1F]">
          <Logo className="h-7 text-white" />
          <p className="font-ibm-plex-mono text-[8px] text-[#444] uppercase tracking-widest mt-1">Admin Panel</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4">
          {NAV_SECTIONS.map((section, i) => (
            <div key={i} className="mb-2">
              {section.label && (
                <p className="px-4 py-1 font-ibm-plex-mono text-[9px] uppercase tracking-[0.2em] text-[#444] mt-3 mb-1">
                  {section.label}
                </p>
              )}
              {section.items.map((item) => (
                <SidebarLink key={item.href} {...item} />
              ))}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-[#1F1F1F] pb-4 pt-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-4 py-2.5 text-[13px] text-[#555] hover:text-white transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            <span>Back to site</span>
          </Link>
          <Link
            href="/api/admin/logout"
            className="flex items-center gap-3 px-4 py-2.5 text-[13px] text-[#555] hover:text-red-400 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Log Out</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col" style={{ marginLeft: '220px' }}>
        {/* Top Bar */}
        <header
          className="sticky top-0 z-40 flex items-center justify-between px-8 py-4"
          style={{ background: '#0D0D0D', borderBottom: '1px solid #1F1F1F', height: '60px' }}
        >
          <p className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#444]">
            Alkota UK // Admin
          </p>
          <Link
            href="/api/admin/logout"
            className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#555] hover:text-red-400 transition-colors flex items-center gap-2"
          >
            <LogOut className="h-3 w-3" /> Log Out
          </Link>
        </header>

        {/* Page content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
