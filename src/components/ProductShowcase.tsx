import pressureWasher from "@/assets/pressure-washer-product.jpg";
import cleaningSystem from "@/assets/cleaning-system.jpg";
import { Button } from "@/components/ui/button";

const ProductShowcase = () => {
  const products = [
    {
      title: "Pressure Washers",
      description: "Heavy-duty industrial pressure washers built for the toughest jobs. Precision-engineered components deliver consistent, reliable performance.",
      image: pressureWasher,
    },
    {
      title: "Cleaning Systems",
      description: "Complete high-pressure cleaning systems designed for commercial and industrial applications. Built to withstand demanding environments.",
      image: cleaningSystem,
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-4">
            Premium Equipment
          </h2>
          <p className="text-muted-foreground font-light max-w-2xl mx-auto">
            Industry-leading pressure washing solutions crafted with precision and built to last
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {products.map((product, index) => (
            <div key={index} className="group">
              <div className="relative overflow-hidden bg-muted mb-6 aspect-square">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <h3 className="text-2xl font-light tracking-tight mb-3">
                {product.title}
              </h3>
              <p className="text-muted-foreground font-light mb-6 leading-relaxed">
                {product.description}
              </p>
              <Button variant="outline" size="sm" className="font-light">
                Learn More
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
