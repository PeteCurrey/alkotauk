import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { productCategories } from "@/data/products";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = productCategories.find((p) => p.slug === slug);
  const [selectedSeries, setSelectedSeries] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-32 pb-24 container mx-auto px-6 text-center">
          <h1 className="text-4xl font-light mb-4">Product Not Found</h1>
          <Link to="/">
            <Button variant="outline" size="sm" className="font-light">
              Back to Home
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const activeSeries = product.series[selectedSeries];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-light mb-8"
          >
            <ArrowLeft size={14} strokeWidth={1} />
            All Products
          </Link>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-primary text-sm font-light tracking-[0.3em] uppercase mb-4">
                {product.subtitle}
              </p>
              <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
                {product.title}
              </h1>
              <p className="text-muted-foreground font-light leading-relaxed mb-4">
                {product.description}
              </p>
              {product.extendedDescription && (
                <p className="text-muted-foreground font-light leading-relaxed">
                  {product.extendedDescription}
                </p>
              )}
              <div className="mt-8 flex gap-4">
                <Button variant="outline" size="sm" className="font-light tracking-wide">
                  Get a Quote
                </Button>
                <Button variant="outline" size="sm" className="font-light tracking-wide">
                  Find a Distributor
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center bg-background rounded-sm p-8">
              <img
                src={activeSeries.image}
                alt={activeSeries.name}
                className="w-full max-w-sm object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Series Selector */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-light tracking-tight mb-8 text-center">
            Available Series
          </h2>

          {/* Series Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {product.series.map((series, index) => (
              <button
                key={index}
                onClick={() => setSelectedSeries(index)}
                className={`px-4 py-2 text-sm font-light tracking-wide border transition-colors ${
                  selectedSeries === index
                    ? "border-primary text-primary bg-primary/5"
                    : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                }`}
              >
                {series.name}
              </button>
            ))}
          </div>

          {/* Selected Series Detail */}
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="flex items-center justify-center bg-muted/30 rounded-sm p-8">
              <img
                src={activeSeries.image}
                alt={activeSeries.name}
                className="w-full max-w-sm object-contain"
              />
            </div>

            <div>
              <h3 className="text-2xl font-light tracking-tight mb-6">
                {activeSeries.name}
              </h3>

              {/* Highlights */}
              <div className="flex flex-wrap gap-2 mb-8">
                {activeSeries.highlights.map((highlight, i) => (
                  <span
                    key={i}
                    className="text-xs font-light tracking-wide uppercase px-3 py-1 border border-border text-muted-foreground"
                  >
                    {highlight}
                  </span>
                ))}
              </div>

              {/* Specs Table */}
              <div className="border border-border">
                <Table>
                  <TableBody>
                    {Object.entries(activeSeries.specs).map(([key, value]) => (
                      <TableRow key={key}>
                        <TableCell className="font-light text-muted-foreground text-sm py-3">
                          {key}
                        </TableCell>
                        <TableCell className="font-light text-sm py-3 text-right">
                          {value}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="mt-8">
                <Button variant="outline" size="sm" className="font-light tracking-wide">
                  Request a Quote
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Series Grid */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-light tracking-tight mb-10 text-center">
            All {product.title}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {product.series.map((series, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelectedSeries(index);
                  window.scrollTo({ top: 400, behavior: "smooth" });
                }}
                className="group text-left bg-background border border-border p-6 hover:border-primary/30 transition-colors"
              >
                <div className="aspect-square flex items-center justify-center mb-4">
                  <img
                    src={series.image}
                    alt={series.name}
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-lg font-light tracking-tight mb-2">
                  {series.name}
                </h3>
                <div className="flex flex-wrap gap-1">
                  {series.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="text-xs text-muted-foreground font-light"
                    >
                      {h}
                      {i < series.highlights.length - 1 && " · "}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductDetail;
