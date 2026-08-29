import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ArrowRight, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-alkota-bg text-alkota-black flex flex-col justify-between pt-32">
      <Navigation />
      <div className="mx-auto max-w-2xl px-6 py-20 text-center space-y-6">
        <div className="inline-block p-3 bg-alkota-orange/10 text-alkota-orange border border-alkota-orange/30">
          <Compass className="h-8 w-8" />
        </div>
        <span className="font-ibm-plex-mono text-xs uppercase tracking-[0.3em] text-alkota-orange block">
          404 // RESOURCE NOT FOUND
        </span>
        <h1 className="font-extralight text-4xl sm:text-5xl uppercase tracking-tight text-alkota-black">
          Engineering Page Not Located.
        </h1>
        <p className="text-xs sm:text-sm text-alkota-silver leading-relaxed max-w-md mx-auto">
          The requested system document or pathway does not exist or has been relocated. Explore our primary industrial divisions below.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            href="/wash-plant"
            className="inline-flex items-center gap-2 bg-alkota-orange text-white px-6 py-3 text-xs uppercase tracking-widest hover:bg-alkota-black transition-colors"
          >
            <span>Wash Plant Infrastructure</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 border border-alkota-iron bg-white text-alkota-black px-6 py-3 text-xs uppercase tracking-widest hover:border-alkota-orange transition-colors"
          >
            <span>Alkota UK Home</span>
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
