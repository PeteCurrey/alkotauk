import Navigation from '@/components/Navigation';

export const metadata = {
  title: 'Document Center | Alkota UK',
  description: 'Download brochures, catalogues, and safety data sheets for Alkota UK.',
};

export default function DownloadsPage() {
  return (
    <main className="min-h-screen bg-alkota-black pt-32 pb-24 text-white">
      <Navigation />
      <div className="container mx-auto max-w-4xl px-6">
        <h1 className="mb-8 text-5xl font-black uppercase italic tracking-tighter sm:text-7xl">
          DOCUMENT <span className="text-alkota-orange">CENTRE.</span>
        </h1>
        <p className="lead text-xl text-alkota-silver mb-8">
           Central repository for product brochures, Safety Data Sheets (SDS), and general documentation. For machine-specific manuals, please visit the <a href="/support/manuals" className="text-alkota-orange hover:underline">Manuals page</a>.
        </p>
        <div className="bg-alkota-steel/30 border border-alkota-iron p-12 text-center text-alkota-silver">
           Documentation repository syncing...
        </div>
      </div>
    </main>
  );
}
