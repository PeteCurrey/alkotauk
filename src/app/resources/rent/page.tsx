import Navigation from '@/components/Navigation';

export const metadata = {
  title: 'Long-Term Rental | Alkota UK',
  description: 'Fixed-cost monthly rental of Alkota pressure washers, including servicing and PPM.',
};

export default function RentPage() {
  return (
    <main className="min-h-screen bg-alkota-black pt-32 pb-24 text-white">
      <Navigation />
      <div className="container mx-auto max-w-4xl px-6">
        <h1 className="mb-8 text-5xl font-black uppercase italic tracking-tighter sm:text-7xl">
          LONG-TERM <span className="text-alkota-orange">RENTAL.</span>
        </h1>
        <article className="prose prose-invert prose-lg max-w-none prose-a:text-alkota-orange prose-headings:font-black prose-headings:italic">
           <p className="lead border-l-4 border-alkota-orange pl-6 py-2 bg-alkota-iron/30">
              The "Plaque" Rental Programme. Fixed monthly costs with zero maintenance headaches.
           </p>
           <p>For corporate clients, wash bays, and fleet operators who prefer OpEx over CapEx, our long-term rental programme provides top-tier Alkota machinery fully supported by our national service network.</p>
           <ul>
             <li><strong>Zero Capital Outlay:</strong> Get the best equipment without draining cash reserves.</li>
             <li><strong>Fully Maintained:</strong> Scheduled PPM (Planned Preventative Maintenance) and breakdown cover are included in your monthly fee.</li>
             <li><strong>Priority Service:</strong> Rental clients receive top-tier VIP dispatch for any breakdowns.</li>
             <li><strong>Upgradeable:</strong> Swap your machine at the end of the term for the newest model.</li>
           </ul>
        </article>
      </div>
    </main>
  );
}
