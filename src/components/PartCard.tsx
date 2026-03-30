import Link from 'next/link';
import Image from 'next/image';

import AddToCartButton from './AddToCartButton';

interface PartCardProps {
  part: {
    _id: string;
    name: string;
    sku: string;
    slug: { current: string };
    price: number | null;
    category: string;
    image?: string; // Expecting a URL string now
    description?: string;
  };
}

export default function PartCard({ part }: PartCardProps) {
  const imageUrl = part.image || null;
  const displayPrice = part.price ? `£${part.price.toFixed(2)}` : 'Enquire for Pricing';

  return (
    <div className="group relative flex flex-col border border-alkota-iron bg-alkota-steel/30 p-4 transition-all hover:bg-alkota-steel/50">
      <Link href={`/shop/${part.slug.current}`} className="mb-4 aspect-square overflow-hidden bg-alkota-black/50 relative">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={part.name}
            fill
            className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-alkota-iron">
            No Image
          </div>
        )}
      </Link>

      <div className="flex flex-col flex-1">
        <span className="text-[10px] uppercase tracking-widest text-alkota-orange font-bold mb-1">
          {part.category || 'General Part'}
        </span>
        <h3 className="text-lg font-bold text-white group-hover:text-alkota-orange transition-colors mb-1">
          <Link href={`/shop/${part.slug.current}`}>{part.name}</Link>
        </h3>
        <p className="text-xs text-secondary mb-4 line-clamp-2">
          {part.description}
        </p>
        <p className="text-sm font-bold text-alkota-orange mb-4">
          {displayPrice}
        </p>
        <p className="text-xs text-alkota-iron mb-4">
          SKU: {part.sku}
        </p>
        
        <div className="mt-auto">
          {part.price !== null ? (
            <AddToCartButton 
              id={part._id}
              name={part.name}
              price={part.price}
              image={imageUrl || undefined}
              sku={part.sku}
            />
          ) : (
            <Link 
              href={`/contact?subject=Enquiry: ${part.name} (${part.sku})`}
              className="flex w-full items-center justify-center gap-2 border border-alkota-orange bg-transparent py-4 text-sm font-black uppercase tracking-widest text-alkota-orange transition-all duration-200 hover:bg-alkota-orange hover:text-white"
            >
              Enquire Now
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
