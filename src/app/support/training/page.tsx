import Navigation from '@/components/Navigation';
import Link from 'next/link';

export const metadata = {
  title: 'Operator Training & Certification | Alkota UK',
  description: 'Professional operator training for safe and efficient use of industrial high-pressure hot water equipment.',
};

export default function TrainingPage() {
  return (
    <main className="min-h-screen bg-alkota-black pt-32 pb-24 text-white">
      <Navigation />
      <div className="container mx-auto max-w-4xl px-6">
        <h1 className="mb-6 text-5xl font-black uppercase italic tracking-tighter sm:text-7xl">
          OPERATOR <span className="text-alkota-orange">TRAINING.</span>
        </h1>
        <div className="prose prose-invert prose-lg max-w-none prose-headings:font-black prose-headings:italic prose-headings:uppercase prose-a:text-alkota-orange">
          <p className="lead text-xl text-alkota-silver">
            Industrial pressure washers are powerful pieces of equipment. Ensure your team operates them safely, efficiently, and effectively with our official training courses.
          </p>
          
          <h2 className="text-3xl mt-12 mb-6 border-b border-alkota-iron pb-4">Available Courses</h2>
          
          <div className="grid gap-6 not-prose mt-8">
            <div className="border border-alkota-iron bg-alkota-steel/30 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <div>
                <h3 className="text-xl font-bold text-white">Safe Operation of High-Pressure Hot Water Systems</h3>
                <p className="text-sm text-alkota-steel mt-2">Format: On-Site (Half-Day) | For: Daily Operators</p>
              </div>
              <button className="shrink-0 bg-alkota-orange px-6 py-3 text-xs font-bold uppercase tracking-widest text-white hover:bg-alkota-orange-bright transition-colors">
                 Request Dates
              </button>
            </div>
            
            <div className="border border-alkota-iron bg-alkota-steel/30 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <div>
                <h3 className="text-xl font-bold text-white">Industrial Wash Bay Management</h3>
                <p className="text-sm text-alkota-steel mt-2">Format: Hybrid (1 Day) | For: Facility Managers</p>
              </div>
              <button className="shrink-0 bg-alkota-orange px-6 py-3 text-xs font-bold uppercase tracking-widest text-white hover:bg-alkota-orange-bright transition-colors">
                 Request Dates
              </button>
            </div>
          </div>
          
          <div className="mt-16 bg-alkota-iron/20 p-8 text-center border-t-2 border-alkota-orange">
             <h3 className="text-2xl font-black italic mb-4">Dealer Certification</h3>
             <p className="text-alkota-silver mb-6">Are you an Alkota Dealer looking to certify your service engineers?</p>
             <Link href="/portal/training" className="inline-block border border-alkota-steel px-8 py-4 text-xs font-bold uppercase tracking-widest text-white hover:bg-alkota-steel hover:text-alkota-black transition-colors">
                Access Dealer Portal
             </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
