import Image from 'next/image';
import { notFound } from 'next/navigation';
import { client, urlFor } from '@/sanity/client';
import Navigation from '@/components/Navigation';
import AddToCartButton from '@/components/AddToCartButton';
import { CheckCircle2, ShieldCheck, Truck } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export const dynamic = 'force-dynamic';

async function getPart(slug: string) {
  return await client.fetch(`*[_type == "part" && slug.current == $slug][0] {
    _id,
    name,
    sku,
    price,
    description,
    category,
    image,
    specs,
    "compatibleMachines": compatibility[]-> {
      name,
      slug,
      "category": category->slug.current
    }
  }`, { slug });
}

export default async function PartDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const part = await getPart(slug);

  if (!part) {
    notFound();
  }

  const imageUrl = part.image ? urlFor(part.image).width(800).height(800).url() : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": part.name,
    "image": imageUrl,
    "description": part.description,
    "sku": part.sku,
    "brand": {
      "@type": "Brand",
      "name": "Alkota"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://alkota.co.uk/shop/${slug}`,
      "priceCurrency": "GBP",
      "price": part.price,
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <main className="min-h-screen bg-alkota-black pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />

      <div className="container mx-auto px-4 py-12">
        <Breadcrumbs items={[
          { label: 'Shop', href: '/shop' },
          { label: part.name }
        ]} />
        
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 mt-8">
          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden border border-alkota-iron bg-alkota-steel/30 p-8">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={part.name}
                fill
                className="object-contain p-12"
                priority
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-alkota-iron">
                No Image Available
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <span className="mb-2 text-sm font-bold uppercase tracking-widest text-alkota-orange">
              {part.category}
            </span>
            <h1 className="mb-4 text-4xl font-black uppercase text-white lg:text-5xl">
              {part.name}
            </h1>
            <p className="mb-2 text-sm text-alkota-iron">SKU: {part.sku}</p>
            
            <div className="mb-8 mt-4 text-3xl font-bold text-white">
              £{part.price.toFixed(2)}
              <span className="ml-2 text-sm font-normal text-secondary italic">Excl. VAT</span>
            </div>

            <div className="mb-8 prose prose-invert max-w-none text-secondary">
              <p>{part.description}</p>
            </div>

            <div className="mb-10">
              <AddToCartButton 
                id={part._id}
                name={part.name}
                price={part.price}
                image={imageUrl || undefined}
                sku={part.sku}
              />
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 gap-4 border-t border-alkota-iron pt-8 sm:grid-cols-3">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-alkota-orange" />
                <span className="text-xs font-bold uppercase tracking-wider">OEM Certified</span>
              </div>
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-alkota-orange" />
                <span className="text-xs font-bold uppercase tracking-wider">UK Wide Shipping</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-alkota-orange" />
                <span className="text-xs font-bold uppercase tracking-wider">In Stock</span>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Details */}
        <div className="mt-20 grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 text-2xl font-black uppercase text-white">Technical Specifications</h2>
            <div className="border border-alkota-iron bg-alkota-steel/20">
              {Object.entries(part.specs || {}).map(([key, value]: [string, any]) => (
                <div key={key} className="flex border-b border-alkota-iron last:border-0">
                  <div className="w-1/3 border-r border-alkota-iron bg-alkota-black/50 p-4 font-bold uppercase tracking-wider text-secondary text-[10px]">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                  <div className="w-2/3 p-4 text-sm text-white">
                    {value}
                  </div>
                </div>
              ))}
              {!part.specs && (
                <div className="p-8 text-center text-alkota-iron italic">
                  Standard industrial specifications apply.
                </div>
              )}
            </div>
          </div>

          <div>
            <h2 className="mb-6 text-2xl font-black uppercase text-white">Compatible Machines</h2>
            {part.compatibleMachines && part.compatibleMachines.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {part.compatibleMachines.map((m: any) => (
                  <a 
                    key={m.slug.current}
                    href={`/machines/${m.category}/${m.slug.current}`}
                    className="flex items-center justify-between border border-alkota-iron bg-alkota-steel/20 p-4 transition-all hover:border-alkota-orange"
                  >
                    <span className="font-bold text-white">{m.name}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-alkota-orange">View Machine →</span>
                  </a>
                ))}
              </div>
            ) : (
              <div className="border border-dashed border-alkota-iron p-8 text-center text-alkota-iron italic">
                Compatible with most high-pressure systems. Contact us for verification.
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
