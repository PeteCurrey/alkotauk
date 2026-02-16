import { Button } from "@/components/ui/button";
import { productCategories } from "@/data/products";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
import { getStaggerDelay } from "@/hooks/useScrollAnimation";

const ProductShowcase = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <ScrollReveal className="text-center mb-16">
          <p className="text-primary text-sm font-light tracking-[0.3em] uppercase mb-4">
            Industrial Cleaning Equipment
          </p>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-4">
            Our Product Lines
          </h2>
          <p className="text-muted-foreground font-light max-w-2xl mx-auto">
            Commercial and industrial pressure washers, steam cleaners, parts
            washers, trailers, and accessories — all handcrafted in the USA
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {productCategories.map((product, index) => (
            <ScrollReveal key={product.slug} delay={getStaggerDelay(index, 80)}>
              <Link
                to={`/products/${product.slug}`}
                className="group text-center block"
              >
                <div className="relative bg-muted/30 rounded-sm p-6 mb-5 aspect-square flex items-center justify-center overflow-hidden">
                  <img
                    src={product.heroImage}
                    alt={product.title}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-lg font-light tracking-tight mb-2">
                  {product.title}
                </h3>
                <p className="text-xs text-primary font-light tracking-wide uppercase mb-3">
                  {product.subtitle}
                </p>
                <p className="text-sm text-muted-foreground font-light leading-relaxed mb-4 line-clamp-3">
                  {product.description}
                </p>
                <Button variant="outline" size="sm" className="font-light text-xs tracking-wide pointer-events-none">
                  View Products
                </Button>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
