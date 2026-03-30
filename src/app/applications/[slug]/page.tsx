import { client, urlFor } from '@/sanity/client';
import Navigation from '@/components/Navigation';
import Image from 'next/image';
import Link from 'next/link';

async function getApplication(slug: string) {
  return await client.fetch(`*[_type == "application" && slug.current == $slug][0] {
    name,
    description,
    heroImage,
    seo,
    "featuredMachines": featuredMachines[]->{
      _id,
      name,
      "slug": slug.current,
      category,
      tagline,
      specs,
      heroImage
    }
  }`, { slug });
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const app = await getApplication(slug);
  if (!app) return { title: 'Application Not Found' };
  
  return {
    title: app.seo?.metaTitle || `${app.name} Applications | Alkota UK`,
    description: app.seo?.metaDescription || `Industrial cleaning solutions for ${app.name} applications.`,
  };
}

export default async function ApplicationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const app = await getApplication(slug);

  if (!app?.name) {
    return (
      <main className="min-h-screen bg-alkota-black pt-32 text-white">
        <Navigation />
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl text-alkota-orange font-barlow-condensed italic font-black">Application Not Found</h1>
          <Link href="/" className="mt-8 inline-block text-alkota-silver underline uppercase tracking-widest text-[10px]">Back to Home</Link>
        </div>
      </main>
    );
  }

  const bgUrl = app.heroImage ? urlFor(app.heroImage).url() : "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&q=80&w=2000";

  return (
    <main className="min-h-screen bg-alkota-black pb-0">
      <Navigation />
      
      {/* Cinematic Hero */}
      <section className="relative flex min-h-[70vh] items-center justify-center p-6 lg:p-12 overflow-hidden border-b border-alkota-iron">
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
          <span className="mb-6 inline-block text-[10px] font-black uppercase tracking-[0.4em] text-alkota-orange">Operational Application</span>
          <h1 className="mb-6 text-6xl font-black uppercase italic tracking-tighter text-white sm:text-8xl lg:text-9xl leading-[0.8] font-barlow-condensed">
            {app.name} <br />
            <span className="text-alkota-orange [text-stroke:1px_rgba(255,255,255,0.1)]">SOLUTIONS.</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-alkota-silver leading-relaxed uppercase tracking-wider font-inter">
            {app.description}
          </p>
        </div>
      </section>

      {/* Recommended Machines */}
      {app.featuredMachines && app.featuredMachines.length > 0 && (
        <section className="py-24 px-6 md:px-12 lg:px-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-20 flex items-center gap-8">
              <h2 className="font-barlow-condensed text-5xl font-black text-white uppercase italic tracking-tighter md:text-7xl">
                SYSTEM <span className="text-alkota-orange">RECOMMENDATION.</span>
              </h2>
              <div className="flex-1 h-px bg-alkota-iron/30" />
            </div>
            
            <div className="grid gap-px bg-alkota-iron border border-alkota-iron sm:grid-cols-2 lg:grid-cols-3">
              {app.featuredMachines.map((machine: any) => (
                <Link
                  key={machine._id}
                  href={`/machines/${machine.category || 'hot-water'}/${machine.slug}`}
                  className="group block bg-white p-10 transition-all hover:bg-alkota-bg no-underline"
                >
                  <div className="aspect-[16/10] overflow-hidden mb-8 bg-alkota-bg relative">
                     <img 
                       src={machine.heroImage ? urlFor(machine.heroImage).url() : "https://alkota.co.uk/assets/hot-water-pressure-washer-DHE0Q-_H.png"} 
                       alt={machine.name}
                       className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                     />
                     <div className="absolute inset-x-0 bottom-0 h-[2px] bg-alkota-orange transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  </div>
                  <h3 className="mb-3 text-3xl font-black uppercase italic tracking-tighter text-alkota-black group-hover:text-alkota-orange transition-colors font-barlow-condensed">
                    {machine.name}
                  </h3>
                  <p className="mb-10 text-[10px] uppercase tracking-widest text-alkota-silver leading-relaxed font-inter line-clamp-2">
                    {machine.tagline}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 border-t border-alkota-iron pt-8">
                    <div>
                      <span className="block text-[8px] text-alkota-silver uppercase font-black tracking-widest mb-1">Pressure</span>
                      <span className="text-xl font-black text-alkota-black font-barlow-condensed italic">{machine.specs?.pressureBar || '200'} <span className="text-[10px] text-alkota-orange not-italic">BAR</span></span>
                    </div>
                    <div>
                      <span className="block text-[8px] text-alkota-silver uppercase font-black tracking-widest mb-1">Flow</span>
                      <span className="text-xl font-black text-alkota-black font-barlow-condensed italic">{machine.specs?.flowRateLPM || '15'} <span className="text-[10px] text-alkota-orange not-italic">LPM</span></span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Quote Banner */}
      <section className="border-t border-alkota-iron bg-alkota-orange py-32 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white opacity-[0.03] skew-x-12 transform translate-x-1/2" />
        <div className="relative z-10">
          <h2 className="mb-8 text-6xl font-black uppercase italic tracking-tighter text-white sm:text-8xl font-barlow-condensed leading-[0.8]">
            SPECIFY A <br />
            <span className="[text-stroke:1.5px_white] text-transparent">CUSTOM BUILD.</span>
          </h2>
          <p className="mb-12 text-lg font-bold text-white max-w-2xl mx-auto uppercase tracking-wider font-inter">
            Our engineering team can fully customize any system to meet the exact technical requirements of your operational facility.
          </p>
          <Link 
            href="/contact"
            className="inline-block border border-white bg-transparent px-12 py-6 text-[11px] font-black uppercase tracking-[0.3em] text-white transition-all hover:bg-white hover:text-alkota-black no-underline shadow-2xl"
          >
            Request Engineering Brief
          </Link>
        </div>
      </section>
    </main>
  );
}
