import Navigation from '@/components/Navigation';
import { Search, Download } from 'lucide-react';

export const metadata = {
  title: 'Operating Manuals & Documents | Alkota UK',
  description: 'Download user manuals, technical specifications, and wiring diagrams for Alkota industrial pressure washers.',
};

export default function ManualsPage() {
  return (
    <main className="min-h-screen bg-alkota-black pt-32 pb-24 text-white">
      <Navigation />
      <div className="container mx-auto max-w-4xl px-6">
        <h1 className="mb-4 text-5xl font-black uppercase italic tracking-tighter sm:text-7xl">
          OPERATING <span className="text-alkota-orange">MANUALS.</span>
        </h1>
        <p className="mb-12 text-xl text-alkota-silver">Search and download comprehensive documentation for your machine series.</p>
        
        <div className="mb-16 relative">
          <input 
            type="text" 
            placeholder="Search by Model Number (e.g., 430XM4)" 
            className="w-full bg-alkota-steel/50 border border-alkota-iron p-6 pl-16 text-lg text-white focus:border-alkota-orange focus:outline-none focus:ring-1 focus:ring-alkota-orange"
          />
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-alkota-steel h-6 w-6" />
        </div>

        <div className="space-y-6">
           <div className="flex items-center justify-between border border-alkota-iron bg-alkota-steel/30 p-6 hover:border-alkota-orange transition-all">
              <div>
                <h3 className="font-bold text-lg text-white">X4 Belt Drive Series Manual</h3>
                <p className="text-alkota-steel text-sm">Includes 216X4, 320X4, 420X4, 430X4</p>
              </div>
              <button className="flex items-center gap-2 text-alkota-orange font-bold uppercase tracking-widest text-xs hover:text-white transition-colors">
                 <Download className="h-4 w-4" /> PDF (4.2MB)
              </button>
           </div>
           <div className="flex items-center justify-between border border-alkota-iron bg-alkota-steel/30 p-6 hover:border-alkota-orange transition-all">
              <div>
                <h3 className="font-bold text-lg text-white">Gas Fired Stationary Series Manual</h3>
                <p className="text-alkota-steel text-sm">Includes 4301, 5301, 8301 (NG/LP)</p>
              </div>
              <button className="flex items-center gap-2 text-alkota-orange font-bold uppercase tracking-widest text-xs hover:text-white transition-colors">
                 <Download className="h-4 w-4" /> PDF (5.1MB)
              </button>
           </div>
        </div>
      </div>
    </main>
  );
}
