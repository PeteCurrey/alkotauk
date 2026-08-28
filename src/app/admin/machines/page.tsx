import Link from 'next/link';
import { ArrowRight, Database } from 'lucide-react';

export default function AdminMachinesPage() {
  return (
    <div className="text-white">
      <div className="mb-8">
        <h1 className="font-barlow-condensed text-4xl font-black uppercase italic">Machines</h1>
        <p className="font-ibm-plex-mono text-[10px] text-[#555] uppercase tracking-widest mt-1">
          // Redirected — machine management moved to Products CMS
        </p>
      </div>

      <div className="border border-[#F59E0B]/40 bg-[#F59E0B]/5 p-6 mb-8 flex items-start gap-4">
        <Database className="h-5 w-5 text-[#F59E0B] shrink-0 mt-0.5" />
        <div>
          <p className="font-ibm-plex-mono text-[10px] text-[#F59E0B] uppercase tracking-widest mb-2">
            // Architecture Updated
          </p>
          <p className="font-inter text-sm text-[#aaa] leading-relaxed">
            Machine management has moved to the{' '}
            <strong className="text-white">Products CMS</strong>. The legacy{' '}
            <code className="text-[#FF6900]">machines.ts</code> static file has been superseded by a
            database-driven catalogue imported from the Alkota USA product range.
          </p>
          <p className="font-inter text-sm text-[#aaa] leading-relaxed mt-2">
            All 127 products are now managed via the Products admin. Use the button below to go there.
          </p>
        </div>
      </div>

      <Link
        href="/admin/products"
        className="inline-flex items-center gap-3 bg-[#FF6900] text-white px-6 py-4 font-ibm-plex-mono text-[10px] uppercase tracking-widest hover:bg-white hover:text-[#FF6900] transition-colors"
      >
        Go to Products CMS <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
