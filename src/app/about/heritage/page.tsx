import Navigation from '@/components/Navigation';

export const metadata = {
  title: 'Our Heritage | Alkota UK',
  description: 'Handcrafted in the USA since 1964. Discover the history of Alkota Cleaning Systems.',
};

export default function HeritagePage() {
  return (
    <main className="min-h-screen bg-alkota-black pt-32 pb-24 text-white">
      <Navigation />
      <div className="container mx-auto max-w-4xl px-6">
        <h1 className="mb-8 text-5xl font-black uppercase italic tracking-tighter sm:text-7xl">
          SINCE <span className="text-alkota-orange">1964.</span>
        </h1>
        <div className="prose prose-invert prose-lg max-w-none prose-headings:font-black prose-headings:italic prose-headings:uppercase prose-a:text-alkota-orange">
          <p className="lead text-2xl text-alkota-silver">
            Alkota was founded in Alcester, South Dakota in 1964. For six decades, we've remained true to our original mission: building the most reliable, durable, and serviceable cleaning equipment on the planet.
          </p>
          <div className="my-16 border-l-4 border-alkota-orange pl-8">
            <h3 className="text-alkota-orange text-xl">1964</h3>
            <p>Alkota is established in a rural South Dakota farming community, where hard work and reliability are non-negotiable traits.</p>
          </div>
          <div className="my-16 border-l-4 border-alkota-orange pl-8">
            <h3 className="text-alkota-orange text-xl">1980s</h3>
            <p>Pioneered the rotary gear driven hot water pressure washer, setting a new industry standard for heating efficiency.</p>
          </div>
          <div className="my-16 border-l-4 border-alkota-orange pl-8">
            <h3 className="text-alkota-orange text-xl">Today</h3>
            <p>Operating out of our massive manufacturing facility in Alcester, our dedicated artisans continue to weld, assemble, and test every single machine by hand before it ships to the UK market.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
