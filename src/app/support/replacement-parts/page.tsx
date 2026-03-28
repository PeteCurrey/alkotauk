import Navigation from '@/components/Navigation';
import Link from 'next/link';
import { ArrowRight, Wrench } from 'lucide-react';

export const metadata = {
  title: 'Replacement Parts Lookup | Alkota UK',
  description: 'Find OEM replacement parts, exploded diagrams, and maintenance kits for your Alkota pressure washer.',
};

export default function PartsLookupPage() {
  return (
    <main className="min-h-screen bg-alkota-black pt-32 pb-24 text-white">
      <Navigation />
      <div className="container mx-auto max-w-4xl px-6 text-center">
        <Wrench className="h-16 w-16 text-alkota-orange mx-auto mb-8" />
        <h1 className="mb-6 text-5xl font-black uppercase italic tracking-tighter sm:text-7xl">
          REPLACEMENT <span className="text-alkota-orange">PARTS.</span>
        </h1>
        <p className="mb-12 text-xl text-alkota-silver max-w-2xl mx-auto">
          Keep your Platinum Standard machinery running like new. Look up exploded diagrams to identify the exact OEM component you need.
        </p>

        <div className="grid sm:grid-cols-2 gap-6 text-left">
           <div className="border border-alkota-iron bg-alkota-steel/30 p-8">
              <h3 className="font-black italic uppercase text-2xl mb-4">Shop Direct</h3>
              <p className="text-alkota-silver mb-8 text-sm">Browse our full catalogue of high-pressure hoses, nozzles, trigger guns, and maintenance oils.</p>
              <Link href="/shop/parts" className="flex items-center justify-between w-full border border-alkota-orange bg-alkota-orange/10 px-6 py-4 text-xs font-bold uppercase tracking-widest text-white hover:bg-alkota-orange transition-colors">
                Browse Parts Shop <ArrowRight className="h-4 w-4" />
              </Link>
           </div>
           
           <div className="border border-alkota-iron bg-alkota-steel/30 p-8">
              <h3 className="font-black italic uppercase text-2xl mb-4">Exploded Views</h3>
              <p className="text-alkota-silver mb-8 text-sm">Download PDF schematics for your specific machine series to identify part numbers.</p>
              <Link href="/support/manuals" className="flex items-center justify-between w-full border border-alkota-steel bg-alkota-steel/10 px-6 py-4 text-xs font-bold uppercase tracking-widest text-white hover:bg-alkota-steel hover:text-alkota-black transition-colors">
                View Schematics <span className="text-lg leading-none">↗</span>
              </Link>
           </div>
        </div>
      </div>
    </main>
  );
}
