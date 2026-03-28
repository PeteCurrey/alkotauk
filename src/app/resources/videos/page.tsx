import Navigation from '@/components/Navigation';

export const metadata = {
  title: 'Video Vault | Alkota UK',
  description: 'Watch Alkota pressure washers in action. Instructional videos, machine walk-arounds, and maintenance tutorials.',
};

export default function VideosPage() {
  return (
    <main className="min-h-screen bg-alkota-black pt-32 pb-24 text-white">
      <Navigation />
      <div className="container mx-auto max-w-7xl px-6">
        <h1 className="mb-8 text-5xl font-black uppercase italic tracking-tighter sm:text-7xl">
          VIDEO <span className="text-alkota-orange">VAULT.</span>
        </h1>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
           <div className="aspect-video bg-alkota-iron/50 border border-alkota-iron flex items-center justify-center text-alkota-silver font-bold uppercase tracking-widest text-xs">
              Video Loading...
           </div>
        </div>
      </div>
    </main>
  );
}
