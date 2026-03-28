import Navigation from '@/components/Navigation';

export const metadata = {
  title: 'Alkota UK Operations | Industrial Cleaning Systems',
  description: 'Alkota UK brings American-made industrial pressure washers directly to British industry, supported by a nationwide dealer network.',
};

export default function AlkotaUKPage() {
  return (
    <main className="min-h-screen bg-alkota-black pt-32 pb-24 text-white">
      <Navigation />
      <div className="container mx-auto max-w-4xl px-6">
        <h1 className="mb-8 text-5xl font-black uppercase italic tracking-tighter sm:text-7xl">
          THE <span className="text-alkota-orange">UK</span> OPERATION.
        </h1>
        <div className="prose prose-invert prose-lg max-w-none prose-headings:font-black prose-headings:italic prose-headings:uppercase prose-a:text-alkota-orange">
          <p className="lead text-xl text-alkota-silver">
            Alkota UK bridges the gap between premium American manufacturing and the heavy demands of British industry. As the exclusive national distributor, we bring the Platinum Standard directly to the UK market.
          </p>
          <h2 className="text-3xl mt-12 mb-6">Stocked and Ready</h2>
          <p>
            We maintain a massive inventory of machines, parts, and accessories right here in the UK. No waiting months for transatlantic shipping. When you need a machine, or when your machine needs a part, Alkota UK delivers.
          </p>
          <h2 className="text-3xl mt-12 mb-6">The Elite Dealer Network</h2>
          <p>
            Alkota is sold, serviced, and supported by a carefully curated network of elite independent dealers across the UK. These are technical experts who understand their local industry needs and provide fast, on-site service.
          </p>
        </div>
      </div>
    </main>
  );
}
