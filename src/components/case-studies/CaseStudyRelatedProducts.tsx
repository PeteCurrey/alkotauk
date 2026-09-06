import Link from 'next/link';
import { ArrowRight, Flame, Shield, ArrowUpRight } from 'lucide-react';
import { getProductBySlug, getProducts, Product } from '@/lib/products';

interface Props {
  productSlugs?: string[];
  fallbackCategory?: string;
  headline?: string;
}

export default async function CaseStudyRelatedProducts({
  productSlugs = [],
  fallbackCategory = 'hot-water',
  headline = 'The Equipment Behind the Work',
}: Props) {
  let products: Product[] = [];

  if (productSlugs.length > 0) {
    const fetched = await Promise.all(
      productSlugs.map(async (slug) => {
        const p = await getProductBySlug(slug);
        return p;
      })
    );
    products = fetched.filter((p): p is Product => p !== null);
  }

  // Fallback to category products if specific slugs were not found
  if (products.length === 0) {
    products = await getProducts({ category: fallbackCategory, limit: 3 });
  }

  return (
    <section className="my-20 pt-16 border-t border-[#E8E8E4] font-normal">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#FF6900] mb-2 font-normal">
            <Flame className="h-4 w-4" />
            <span>Canonical Product Fleet</span>
          </div>
          <h3 className="font-extralight text-3xl sm:text-4xl uppercase tracking-tight text-alkota-black">
            {headline}
          </h3>
          <p className="text-sm text-[#666] mt-2 max-w-xl">
            Direct access to the Alkota engineering systems referenced in this field study.
          </p>
        </div>
        <div>
          <Link
            href="/machines"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#FF6900] hover:underline font-normal"
          >
            <span>View All Machines</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => {
          const cat = product.category || 'hot-water';
          const href = `/machines/${cat}/${product.slug}`;
          const imgUrl = product.cutout_image_url || product.primary_image_url || '/assets/products/420x4.png';

          return (
            <div
              key={product.id || product.slug}
              className="bg-white border border-[#E8E8E4] hover:border-black transition-all flex flex-col justify-between group overflow-hidden rounded-[6px] shadow-tactile hover:shadow-tactile-hover transition-shadow"
            >
              {/* Product Visual Area */}
              <div className="relative aspect-[16/11] bg-[#F8F7F4] p-6 flex items-center justify-center overflow-hidden">
                <img
                  src={imgUrl}
                  alt={product.name || 'Alkota Industrial Cleaning Machine'}
                  className="w-full h-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.08)] transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 bg-black text-white px-2.5 py-1 text-[10px] uppercase tracking-wider font-normal rounded-[3px]">
                  {product.series || product.category || 'Industrial'}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] text-[#888] uppercase tracking-wider mb-1">
                    Model: {product.model_code || product.slug}
                  </div>
                  <h4 className="text-lg font-light uppercase tracking-tight text-alkota-black mb-2 group-hover:text-[#FF6900] transition-colors">
                    {product.name}
                  </h4>
                  <p className="text-xs text-[#666] leading-relaxed line-clamp-2 mb-4 font-normal">
                    {product.tagline || product.short_description || 'Industrial continuous-duty cleaning system with Schedule 80 coil architecture.'}
                  </p>
                </div>

                <div>
                  {/* Key specs badge line */}
                  <div className="grid grid-cols-2 gap-2 pt-4 border-t border-[#E8E8E4] mb-4 text-xs">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#888] block">Pressure</span>
                      <span className="text-alkota-black font-normal">
                        {product.pressure_bar ? `${product.pressure_bar} BAR` : (product.pressure_psi ? `${product.pressure_psi} PSI` : 'Industrial High Pressure')}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#888] block">Flow Rate</span>
                      <span className="text-alkota-black font-normal">
                        {product.flow_rate_lpm ? `${product.flow_rate_lpm} L/min` : (product.flow_rate_gpm ? `${product.flow_rate_gpm} GPM` : 'Continuous High Flow')}
                      </span>
                    </div>
                  </div>

                  <Link
                    href={href}
                    className="inline-flex items-center justify-between w-full bg-[#121212] text-white px-5 py-3 text-xs uppercase tracking-[0.2em] group-hover:bg-[#FF6900] transition-colors font-normal no-underline rounded-[4px] shadow-button hover:shadow-button-hover btn-tactile"
                  >
                    <span>View Machine Specs</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
