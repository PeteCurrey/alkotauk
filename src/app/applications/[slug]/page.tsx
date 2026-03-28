import { urlFor, safeFetch } from '@/sanity/client';
import Navigation from '@/components/Navigation';
import Image from 'next/image';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const query = `*[_type == "application" && slug.current == $slug][0] {
    name,
    seo
  }`;
  const app = await safeFetch(query, { name: params.slug });
  if (!app) return { title: 'Application Not Found' };
  
  return {
    title: app.seo?.metaTitle || `${app.name} Applications | Alkota UK`,
    description: app.seo?.metaDescription || `Industrial cleaning solutions for ${app.name} applications.`,
  };
}

export default async function ApplicationDetailPage({ params }: { params: { slug: string } }) {
  const query = `*[_type == "application" && slug.current == $slug][0] {
    name,
    description,
    "heroImage": heroImage,
    "featuredMachines": featuredMachines[]->{
      _id,
      name,
      slug,
      "imageUrl": image.asset->url,
      tagline,
      specs
    }
  }`;

  const app = await safeFetch(query, {
    name: params.slug,
    description: 'Industrial cleaning solutions.',
  });

  if (!app?.name) {
    return (
      <main className="min-h-screen bg-alkota-black pt-32 text-white">
        <Navigation />
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl text-alkota-orange">Application Not Found</h1>
        </div>
      </main>
    );
  }

  const bgUrl = app.heroImage ? urlFor(app.heroImage).url() : "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&q=80&w=2000";

  return (
    <main className="min-h-screen bg-alkota-black">
      <Navigation />
      
      {/* Cinematic Hero */}
      <section className="relative flex min-h-[60vh] items-center justify-center p-6 lg:p-12 overflow-hidden border-b border-alkota-iron">
        <div className="absolute inset-0 z-0 opacity-40">
          <Image
            src={bgUrl}
            alt={app.name}
            fill
            priority
            className="object-cover object-center grayscale mix-blend-multiply transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-alkota-black via-alkota-black/80 to-transparent" />
        </div>
        
        <div className="relative z-10 w-full max-w-5xl text-center">
          <h1 className="mb-4 text-5xl font-black uppercase italic tracking-tighter text-white sm:text-7xl">
            {app.name} <span className="text-alkota-orange">SOLUTIONS.</span>
          </h1>
          <p className="mx-auto max-w-3xl text-xl text-alkota-silver leading-relaxed font-mono">
            {app.description}
          </p>
        </div>
      </section>

      {/* Recommended Machines */}
      {app.featuredMachines && app.featuredMachines.length > 0 && (
        <section className="py-24 px-6 md:px-12 lg:px-24">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-12 text-3xl font-black uppercase italic tracking-tighter text-white sm:text-5xl border-l-4 border-alkota-orange pl-6">
              RECOMMENDED <span className="text-alkota-steel">MACHINES</span>
            </h2>
            
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {app.featuredMachines.map((machine: any) => (
                <Link
                  key={machine._id}
                  href={`/machines/hot-water/${machine.slug?.current || machine.slug}`}
                  className="group block border border-alkota-iron bg-alkota-steel/30 p-8 transition-all hover:border-alkota-orange"
                >
                  <h3 className="mb-2 text-2xl font-black uppercase italic tracking-tight text-white group-hover:text-alkota-orange">
                    {machine.name}
                  </h3>
                  <p className="mb-6 text-sm font-mono text-alkota-steel">
                    {machine.tagline}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 border-t border-alkota-iron pt-6">
                    <div>
                      <span className="block text-[10px] text-alkota-steel uppercase font-bold tracking-widest">Pressure</span>
                      <span className="text-lg font-black text-white">{machine.specs?.pressurePSI} <span className="text-xs text-alkota-orange">PSI</span></span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-alkota-steel uppercase font-bold tracking-widest">Flow</span>
                      <span className="text-lg font-black text-white">{machine.specs?.flowRateGPM} <span className="text-xs text-alkota-orange">GPM</span></span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Quote Banner */}
      <section className="border-t border-alkota-iron bg-alkota-orange py-24 px-6 text-center">
        <h2 className="mb-6 text-4xl font-black uppercase italic tracking-tighter text-white sm:text-6xl text-shadow-xl">
          NEED A CUSTOM BUILD?
        </h2>
        <p className="mb-10 text-xl font-bold text-white max-w-2xl mx-auto drop-shadow-md">
          Our engineering team can fully customize any machine to meet the exact requirements of your application.
        </p>
        <Link 
          href="/quote"
          className="inline-block border-2 border-white bg-transparent px-10 py-5 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-white hover:text-alkota-orange"
        >
          Request A Specialist Quote
        </Link>
      </section>
    </main>
  );
}
