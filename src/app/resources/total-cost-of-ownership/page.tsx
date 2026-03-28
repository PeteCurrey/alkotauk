import Navigation from '@/components/Navigation';

export const metadata = {
  title: 'Total Cost of Ownership | Alkota UK',
  description: 'Analyse the true total cost of ownership of an industrial pressure washer versus cheaper commercial units.',
};

export default function TCOPage() {
  return (
    <main className="min-h-screen bg-alkota-black pt-32 pb-24 text-white">
      <Navigation />
      <div className="container mx-auto max-w-4xl px-6">
        <h1 className="mb-8 text-5xl font-black uppercase italic tracking-tighter sm:text-7xl">
          TOTAL COST OF <span className="text-alkota-orange">OWNERSHIP.</span>
        </h1>
        <article className="prose prose-invert prose-lg max-w-none prose-a:text-alkota-orange prose-headings:font-black prose-headings:italic">
           <p className="lead border-l-4 border-alkota-orange pl-6 py-2 bg-alkota-iron/30">
              The purchase price is only a fraction of the cost of running a pressure washer. Cheap machines cost fortunes.
           </p>
           <h2>The Hidden Costs of Cheap Equipment</h2>
           <p>When you buy a lower-tier commercial machine for £1,500 instead of a Platinum Standard unit for £4,000, you aren't saving money. You are deferring the cost.</p>
           <ul>
             <li><strong>Downtime:</strong> What is the hourly cost of your wash bay crew standing around while a vital machine is broken?</li>
             <li><strong>Replacement Cycle:</strong> A cheap machine used industrially will burn out its high-speed pump in 12-18 months. An Alkota pump running at low RPMs will last for thousands of hours.</li>
             <li><strong>Fuel Efficiency:</strong> Our Schedule 80 hydro-insulated coils reach operating temperature faster and retain heat better, using significantly less diesel/kerosene over a 5-year period.</li>
           </ul>
        </article>
      </div>
    </main>
  );
}
