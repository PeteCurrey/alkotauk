import Navigation from '@/components/Navigation';

export const metadata = {
  title: 'Craftsmanship | Alkota UK',
  description: 'Inside the Alcester, South Dakota manufacturing plant. Hand-built machines designed for the toughest jobs.',
};

export default function CraftsmanshipPage() {
  return (
    <main className="min-h-screen bg-alkota-black pt-32 pb-24 text-white">
      <Navigation />
      <div className="container mx-auto max-w-4xl px-6">
        <h1 className="mb-8 text-5xl font-black uppercase italic tracking-tighter sm:text-7xl">
          HAND BUILT BY <span className="text-alkota-orange">EXPERTS.</span>
        </h1>
        <div className="prose prose-invert prose-lg max-w-none prose-headings:font-black prose-headings:italic prose-headings:uppercase prose-a:text-alkota-orange">
          <p className="lead text-xl text-alkota-silver">
            In an era of mass production, Alkota takes a different approach. Every single machine that leaves our factory has been hand-assembled, meticulously tested, and signed off by a master builder.
          </p>
          <h2 className="text-3xl mt-12 mb-6">No Cheap Plastic</h2>
          <p>
            We don't do flimsy plastic housings or proprietary fittings designed to lock you in. Alkota builds with heavy-gauge steel, durable powder coatings, and industry-standard, easily replaceable components. When you buy Alkota, you buy a machine engineered for serviceability.
          </p>
          <h2 className="text-3xl mt-12 mb-6">The Best Pumps in the Business</h2>
          <p>
            We partner with the world's most reliable pump manufacturers. Depending on the series, you’ll find premium General Pumps or AR pumps, spinning at lower RPMs to guarantee thousands of hours of flawless operation. Let the other guys burn out their high-speed pumps; your Alkota is built for the long haul.
          </p>
        </div>
      </div>
    </main>
  );
}
