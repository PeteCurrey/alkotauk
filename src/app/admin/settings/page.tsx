import Link from 'next/link';
import { Globe, Lock, Megaphone, Database, ArrowRight, ShieldCheck, Cpu, HardDrive } from 'lucide-react';

export default function AdminSettingsPage() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">Studio & System Settings</h1>
        <p className="text-sm font-medium text-[#64748B] mt-1">
          Configure storefront metadata, commercial protocols, and database utilities
        </p>
      </div>

      {/* Main Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {[
          {
            icon: Globe,
            label: 'Site & Brand Settings',
            desc: 'Storefront SEO defaults, official telephone numbers, head office address, and social links',
            href: '/admin/settings/site',
            badge: 'Global Config',
          },
          {
            icon: Lock,
            label: 'Maintenance Mode',
            desc: 'Lock public storefront access and display customer service holding banner',
            href: '/admin/maintenance',
            badge: 'System Guard',
          },
          {
            icon: Megaphone,
            label: 'Sitewide Banners',
            desc: 'Configure top promotional alert strips and factory closure notices',
            href: '/admin/banners',
            badge: 'Announcements',
          },
          {
            icon: Database,
            label: 'Database Utilities',
            desc: 'Inspect Supabase live tables, trigger machine schema sync, and review database backups',
            href: '/admin/settings/utilities',
            badge: 'Supabase Engine',
          },
        ].map(({ icon: Icon, label, desc, href, badge }) => (
          <Link
            key={href}
            href={href}
            className="flex items-start gap-4 p-6 rounded-[28px] bg-white border border-[#E2E4E8] hover:border-[#CBD5E1] shadow-[0_2px_12px_rgba(0,0,0,0.02)] transition-all group"
          >
            <div className="h-12 w-12 rounded-2xl bg-[#F6F7F9] border border-[#E2E4E8] flex items-center justify-center shrink-0 group-hover:bg-[#FF6900]/10 transition-colors">
              <Icon className="h-6 w-6 text-[#64748B] group-hover:text-[#FF6900] transition-colors" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-sm font-bold text-[#0F172A] group-hover:text-[#FF6900] transition-colors">{label}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#F1F3F7] text-[10px] font-bold text-[#64748B] uppercase">
                  {badge}
                </span>
              </div>
              <p className="text-xs text-[#64748B] leading-relaxed font-medium">{desc}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* System Status Pill Card */}
      <div className="bg-white rounded-[28px] border border-[#E2E4E8] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#FF6900] mb-4">Core Infrastructure</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-medium">
          <div className="p-4 rounded-2xl bg-[#F6F7F9] border border-[#E2E4E8] flex items-center gap-3">
            <Cpu className="h-5 w-5 text-[#FF6900]" />
            <div>
              <p className="text-[10px] text-[#94A3B8] font-bold uppercase">Framework</p>
              <p className="font-bold text-[#0F172A]">Next.js 15.5 App Router</p>
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-[#F6F7F9] border border-[#E2E4E8] flex items-center gap-3">
            <HardDrive className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-[10px] text-[#94A3B8] font-bold uppercase">Database Layer</p>
              <p className="font-bold text-[#0F172A]">Supabase PostgreSQL</p>
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-[#F6F7F9] border border-[#E2E4E8] flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-emerald-600" />
            <div>
              <p className="text-[10px] text-[#94A3B8] font-bold uppercase">Security Protocol</p>
              <p className="font-bold text-[#0F172A]">HttpOnly JWT Sessions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
