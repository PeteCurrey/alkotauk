import Navigation from '@/components/Navigation';

export const metadata = {
  title: 'Financial Solutions & Leasing | Alkota UK',
  description: 'Spread the cost of your industrial pressure washer with Alkota UK leasing and financing solutions.',
};

export default function FinancingPage() {
  return (
    <main className="min-h-screen bg-alkota-black pt-32 pb-24 text-white">
      <Navigation />
      <div className="container mx-auto max-w-4xl px-6">
        <h1 className="mb-8 text-5xl font-black uppercase italic tracking-tighter sm:text-7xl">
          FINANCIAL <span className="text-alkota-orange">SOLUTIONS.</span>
        </h1>
        <div className="border border-alkota-iron bg-alkota-steel/30 p-12 text-center sm:text-left flex flex-col sm:flex-row gap-8 items-center">
           <div className="flex-1">
             <h3 className="text-2xl font-black italic uppercase text-white mb-4">Leasing & Asset Finance</h3>
             <p className="text-alkota-silver mb-6">Preserve your working capital while securing the Platinum Standard. We offer competitive asset finance packages spreading the cost over 1-5 years, subject to status.</p>
             <button className="bg-alkota-orange px-8 py-3 text-xs font-bold uppercase tracking-widest text-white hover:bg-alkota-orange-bright">
                Request a Finance Quote
             </button>
           </div>
           <div className="w-full sm:w-1/3 bg-alkota-black/50 p-6 border-l-4 border-alkota-orange">
              <span className="block text-4xl font-black text-white mb-2">100%</span>
              <span className="block text-sm text-alkota-silver leading-tight font-bold uppercase">Tax Deductible Allowances available on many lease setups.</span>
           </div>
        </div>
      </div>
    </main>
  );
}
