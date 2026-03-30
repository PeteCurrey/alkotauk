import Link from 'next/link';
import { Globe, Lock, Megaphone } from 'lucide-react';

export default function AdminSettingsPage() {
  return (
    <div className="text-white">
      <div className="mb-8">
        <h1 className="font-barlow-condensed text-4xl font-black uppercase italic">Settings</h1>
        <p className="font-ibm-plex-mono text-[10px] text-[#555] uppercase tracking-widest mt-1">// Admin panel configuration</p>
      </div>

      <div className="grid grid-cols-1 gap-4 max-w-2xl">
        {[
          { icon: Globe, label: 'Site Settings', desc: 'Meta, contact info, social links, analytics', href: '/admin/settings/site' },
          { icon: Lock, label: 'Maintenance Mode', desc: 'Toggle maintenance screen and customise the message', href: '/admin/maintenance' },
          { icon: Megaphone, label: 'Banners', desc: 'Sitewide announcement strips', href: '/admin/banners' },
        ].map(({ icon: Icon, label, desc, href }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-5 p-5 border border-[#222] bg-[#141414] hover:border-[#FF6900] hover:bg-[#1A1A1A] transition-all group"
          >
            <Icon className="h-6 w-6 text-[#444] group-hover:text-[#FF6900] shrink-0 transition-colors" />
            <div>
              <p className="font-barlow-condensed text-xl font-black uppercase italic text-white">{label}</p>
              <p className="font-inter text-[13px] text-[#666] mt-0.5">{desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
