import Navigation from '@/components/Navigation';
import { ShieldAlert, MapPin, Search } from 'lucide-react';

export const metadata = {
  title: 'Service & Maintenance | Alkota UK',
  description: 'Book a service or request breakdown support for your Alkota pressure washer via our nationwide dealer network.',
};

export default function ServicePage() {
  return (
    <main className="min-h-screen bg-alkota-black pt-32 pb-24 text-white">
      <Navigation />
      <div className="container mx-auto max-w-4xl px-6">
        <h1 className="mb-6 text-5xl font-black uppercase italic tracking-tighter sm:text-7xl">
          SERVICE & <span className="text-alkota-orange">REPAIR.</span>
        </h1>
        <p className="mb-12 text-xl text-alkota-silver max-w-2xl">
          Our independent UK dealer network provides fast, on-site service and scheduled maintenance to keep your operation running smoothly.
        </p>
        
        <div className="grid gap-6 sm:grid-cols-2">
           <div className="border border-alkota-orange bg-alkota-orange/10 p-8 text-center sm:text-left flex flex-col justify-between">
              <div>
                 <ShieldAlert className="h-12 w-12 text-alkota-orange mx-auto sm:mx-0 mb-6" />
                 <h3 className="text-2xl font-black italic uppercase mb-2">Breakdown Support</h3>
                 <p className="text-sm text-alkota-silver mb-8">Rapid response for emergency machine failures affecting your production.</p>
              </div>
              <button className="w-full bg-alkota-orange py-4 text-xs font-bold uppercase tracking-widest text-white hover:bg-alkota-orange-bright transition-colors">
                 Report Breakdown
              </button>
           </div>
           
           <div className="border border-alkota-iron bg-alkota-steel/30 p-8 text-center sm:text-left flex flex-col justify-between">
              <div>
                 <MapPin className="h-12 w-12 text-alkota-steel mx-auto sm:mx-0 mb-6" />
                 <h3 className="text-2xl font-black italic uppercase mb-2">Find A Dealer</h3>
                 <p className="text-sm text-alkota-silver mb-8">Locate your nearest authorized Alkota service agent for scheduled maintenance or servicing.</p>
              </div>
              <button className="flex items-center justify-center gap-2 w-full border border-alkota-steel py-4 text-xs font-bold uppercase tracking-widest text-white hover:bg-alkota-steel hover:text-black transition-colors">
                 <Search className="h-4 w-4" /> Dealer Locator
              </button>
           </div>
        </div>
      </div>
    </main>
  );
}
