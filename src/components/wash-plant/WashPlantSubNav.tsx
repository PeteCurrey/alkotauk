'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Factory, 
  Cpu, 
  Wrench, 
  Activity, 
  RefreshCw, 
  FolderGit2, 
  ArrowRight,
  Sliders
} from 'lucide-react';

interface SubNavItem {
  label: string;
  href: string;
  badge?: string;
}

const SUB_NAV_ITEMS: SubNavItem[] = [
  { label: 'Overview', href: '/wash-plant' },
  { label: 'Architect Tool', href: '/wash-plant/architect', badge: 'Scoping' },
  { label: 'Projects', href: '/wash-plant/projects' },
  { label: 'Service & Maintenance', href: '/wash-plant/service-maintenance' },
  { label: 'Asset Management', href: '/wash-plant/asset-management' },
  { label: 'Refurbishment', href: '/wash-plant/refurbishment-upgrades' },
];

export default function WashPlantSubNav() {
  const pathname = usePathname();

  return (
    <div className="sticky top-20 z-40 bg-[#121212] border-b border-[#2A2A2A] text-white backdrop-blur-md bg-opacity-95 overflow-x-auto shadow-md">
      <div className="mx-auto max-w-7xl px-6 sm:px-12 flex items-center justify-between gap-6 py-2.5">
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <span className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.3em] text-alkota-orange pr-3 border-r border-[#333] hidden md:inline-block">
            WASH PLANT
          </span>

          <nav className="flex items-center gap-1 font-ibm-plex-mono text-[11px] uppercase tracking-wider">
            {SUB_NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1.5 transition-all rounded-sm flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-alkota-orange text-white font-normal shadow-sm'
                      : 'text-[#aaa] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && !isActive && (
                    <span className="text-[8px] bg-[#222] text-alkota-orange px-1.5 py-0.5 rounded">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="hidden lg:flex items-center gap-3 shrink-0 font-ibm-plex-mono text-[10px] text-[#888]">
          <span>CAPEX £100K–£1M+</span>
          <span>·</span>
          <Link
            href="/contact?enquiry=wash-plant-spec"
            className="text-alkota-orange hover:text-white transition-colors"
          >
            Specification Support →
          </Link>
        </div>
      </div>
    </div>
  );
}
