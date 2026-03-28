import Navigation from '@/components/Navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Wrench, Shield, Globe } from 'lucide-react';

export const metadata = {
  title: 'About Alkota UK | Industrial Pressure Washers',
  description: 'Alkota UK is the premier distributor of Alkota Cleaning Systems. Handcrafted in the USA since 1964, our industrial pressure washers are the platinum standard.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-alkota-black">
      <Navigation />
      
      {/* Hero */}
      <section className="relative flex min-h-[70vh] items-center p-6 lg:p-12 overflow-hidden border-b border-alkota-iron">
        <div className="absolute inset-0 z-0 opacity-30">
          <Image
            src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=2000"
            alt="Alkota Manufacturing"
            fill
            priority
            className="object-cover object-center grayscale mix-blend-multiply"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-alkota-black via-alkota-black/80 to-transparent" />
        </div>
        
        <div className="relative z-10 w-full max-w-4xl pt-32">
          <h1 className="mb-6 text-6xl font-black uppercase italic tracking-tighter text-white sm:text-8xl">
            BUILT TO <span className="text-alkota-orange">LAST.</span>
          </h1>
          <p className="mb-8 max-w-2xl text-xl text-alkota-silver leading-relaxed">
            Since 1964, Alkota has been handcrafting the world’s most durable industrial cleaning systems. No plastic housings. No domestic components. Just pure, unadulterated American manufacturing brought direct to the UK.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/about/heritage" className="flex items-center gap-2 border-2 border-alkota-orange bg-alkota-orange px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-alkota-orange-bright hover:border-alkota-orange-bright">
              Our Heritage <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/about/alkota-uk" className="border-2 border-alkota-iron bg-transparent px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-alkota-iron">
              The UK Operation
            </Link>
          </div>
        </div>
      </section>

      {/* Grid Links */}
      <section className="py-24 px-6 md:px-12 lg:px-24">
        <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          
          <Link href="/about/heritage" className="group p-8 border border-alkota-iron bg-alkota-steel/30 transition-colors hover:border-alkota-orange">
            <div className="mb-6 h-12 w-12 text-alkota-steel group-hover:text-alkota-orange transition-colors"><Globe className="h-full w-full" /></div>
            <h3 className="mb-3 text-xl font-black uppercase italic tracking-tight text-white group-hover:text-alkota-orange">Heritage</h3>
            <p className="text-sm text-alkota-silver leading-relaxed">Discover our history dating back to 1964 in Alcester, South Dakota.</p>
          </Link>
          
          <Link href="/about/craftsmanship" className="group p-8 border border-alkota-iron bg-alkota-steel/30 transition-colors hover:border-alkota-orange">
            <div className="mb-6 h-12 w-12 text-alkota-steel group-hover:text-alkota-orange transition-colors"><Wrench className="h-full w-full" /></div>
            <h3 className="mb-3 text-xl font-black uppercase italic tracking-tight text-white group-hover:text-alkota-orange">Craftsmanship</h3>
            <p className="text-sm text-alkota-silver leading-relaxed">Hand-built by experts. Schedule 80 steel, premium pumps, and no shortcuts.</p>
          </Link>

          <Link href="/about/coil-technology" className="group p-8 border border-alkota-iron bg-alkota-steel/30 transition-colors hover:border-alkota-orange">
            <div className="mb-6 h-12 w-12 text-alkota-steel group-hover:text-alkota-orange transition-colors"><Shield className="h-full w-full" /></div>
            <h3 className="mb-3 text-xl font-black uppercase italic tracking-tight text-white group-hover:text-alkota-orange">Coil Technology</h3>
            <p className="text-sm text-alkota-silver leading-relaxed">Learn why our hydro-insulated coils are guaranteed for 7 years.</p>
          </Link>
          
          <Link href="/about/why-alkota" className="group p-8 border border-alkota-iron bg-alkota-steel/30 transition-colors hover:border-alkota-orange">
            <div className="mb-6 flex h-12 w-12 items-center justify-center font-black italic text-3xl text-alkota-steel group-hover:text-alkota-orange transition-colors">?</div>
            <h3 className="mb-3 text-xl font-black uppercase italic tracking-tight text-white group-hover:text-alkota-orange">Why Alkota?</h3>
            <p className="text-sm text-alkota-silver leading-relaxed">What separates the Platinum Standard from the rest of the market.</p>
          </Link>

        </div>
      </section>

    </main>
  );
}
