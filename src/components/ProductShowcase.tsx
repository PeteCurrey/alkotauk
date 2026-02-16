import hotWater from "@/assets/products/hot-water-pressure-washer.png";
import coldWater from "@/assets/products/cold-water-pressure-washer.png";
import steamCleaner from "@/assets/products/steam-cleaner.png";
import trailer from "@/assets/products/pressure-washer-trailer.png";
import partsWasher from "@/assets/products/parts-washer.png";
import spaceHeater from "@/assets/products/space-heater.png";
import waterTreatment from "@/assets/products/water-treatment.png";
import { Button } from "@/components/ui/button";

const ProductShowcase = () => {
  const products = [
    {
      title: "Hot Water Pressure Washers",
      description:
        "Industry-leading industrial hot water pressure washing solutions. Portable, stationary, and skid units with a reputation for reliability you can count on.",
      image: hotWater,
      specs: "Up to 10 GPM · Up to 5,000 PSI",
    },
    {
      title: "Cold Water Pressure Washers",
      description:
        "The toughest, most reliable cold pressure washers in the industry. Built for demanding commercial and industrial applications.",
      image: coldWater,
      specs: "Gasoline & Electric Powered",
    },
    {
      title: "Steam & Dry Steam Cleaners",
      description:
        "Oil-fired steam cleaners and dry steam generators offering a diverse level of cleaning and sanitizing options for every application.",
      image: steamCleaner,
      specs: "Cleaning & Sanitizing",
    },
    {
      title: "Pressure Washer Trailers",
      description:
        "Custom pressure washer trailers for portable pressure washing solutions. Single and tandem axle options with all the configurations for your perfect build.",
      image: trailer,
      specs: "Single & Tandem Axle",
    },
    {
      title: "Industrial Parts Washers",
      description:
        "The perfect addition to shops, manufacturing facilities, and more. With a huge variety of options, we have solutions for every need.",
      image: partsWasher,
      specs: "Front & Top Load",
    },
    {
      title: "Space Heaters",
      description:
        "Forced air and infrared space heaters. Keep the job site toasty year-round with our oil-fired industrial space heaters.",
      image: spaceHeater,
      specs: "Forced Air & Infrared",
    },
    {
      title: "Water Treatment",
      description:
        "A variety of water treatment solutions to help stop contamination issues. Recycle and reduce waste water responsibly.",
      image: waterTreatment,
      specs: "Vacuum Filtration Systems",
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
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
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="group text-center"
            >
              <div className="relative bg-muted/30 rounded-sm p-6 mb-5 aspect-square flex items-center justify-center overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="text-lg font-light tracking-tight mb-2">
                {product.title}
              </h3>
              <p className="text-xs text-primary font-light tracking-wide uppercase mb-3">
                {product.specs}
              </p>
              <p className="text-sm text-muted-foreground font-light leading-relaxed mb-4">
                {product.description}
              </p>
              <Button variant="outline" size="sm" className="font-light text-xs tracking-wide">
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
