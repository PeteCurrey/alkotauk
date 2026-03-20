import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageSEO from "@/components/PageSEO";
import ProductCompare from "@/components/ProductCompare";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { productCategories, ProductModel } from "@/data/products";
import { ArrowLeft, Scale, Search, X } from "lucide-react";
import { useState, useCallback, useMemo } from "react";
import { Input } from "@/components/ui/input";

interface CompareEntry {
  name: string;
  seriesName: string;
  gpm: string;
  psi: string;
  powerSource: string;
  heatingFuel?: string;
  configuration: string;
}

const MAX_COMPARE = 3;

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = productCategories.find((p) => p.slug === slug);
  const [selectedSeries, setSelectedSeries] = useState(0);
  const [compareModels, setCompareModels] = useState<CompareEntry[]>([]);
  const [showCompare, setShowCompare] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSeries = useMemo(() => {
    if (!product) return [];
    const q = searchQuery.toLowerCase().trim();
    if (!q) return product.series;
    return product.series
      .map((series) => {
        if (!series.models || series.models.length === 0) return null;
        const filtered = series.models.filter(
          (m) =>
            m.name.toLowerCase().includes(q) ||
            m.gpm.toLowerCase().includes(q) ||
            m.psi.toLowerCase().includes(q) ||
            m.powerSource.toLowerCase().includes(q) ||
            (m.heatingFuel && m.heatingFuel.toLowerCase().includes(q)) ||
            m.configuration.toLowerCase().includes(q)
        );
        if (filtered.length === 0) return null;
        return { ...series, models: filtered };
      })
      .filter(Boolean) as typeof product.series;
  }, [product, searchQuery]);

  const toggleCompare = useCallback(
    (model: ProductModel, seriesName: string) => {
      setCompareModels((prev) => {
        const exists = prev.find((m) => m.name === model.name && m.seriesName === seriesName);
        if (exists) {
          return prev.filter((m) => !(m.name === model.name && m.seriesName === seriesName));
        }
        if (prev.length >= MAX_COMPARE) return prev;
        return [...prev, { ...model, seriesName }];
      });
    },
    []
  );

  const isSelected = useCallback(
    (modelName: string, seriesName: string) =>
      compareModels.some((m) => m.name === modelName && m.seriesName === seriesName),
    [compareModels]
  );

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
      <PageSEO
        title={product.title}
        description={product.description}
        path={`/products/${product.slug}`}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.title,
          description: product.description,
          brand: { "@type": "Brand", name: "Alkota" },
          manufacturer: { "@type": "Organization", name: "Alkota Cleaning Systems" },
        }}
      />
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
                <Link to="/contact">
                  <Button variant="outline" size="sm" className="font-light tracking-wide">
                    Get a Quote
                  </Button>
                </Link>
                <Link to="/distributors">
                  <Button variant="outline" size="sm" className="font-light tracking-wide">
                    Find a Distributor
                  </Button>
                </Link>
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
                <Link to="/contact">
                  <Button variant="outline" size="sm" className="font-light tracking-wide">
                    Request a Quote
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Models Across Series */}
      {product.series.some((s) => s.models && s.models.length > 0) && (
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-light tracking-tight mb-4 text-center">
              All {product.title} Models
            </h2>
            <p className="text-sm text-muted-foreground font-light text-center mb-8">
              Select up to 3 models from any series to compare side by side.
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto mb-10 relative">
              <Search size={16} strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by model name, GPM, PSI, power source…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10 h-10 font-light text-sm border-border"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X size={14} strokeWidth={1.5} />
                </button>
              )}
            </div>

            {filteredSeries.length === 0 && (
              <p className="text-sm text-muted-foreground font-light text-center py-8">
                No models match "{searchQuery}"
              </p>
            )}

            <div className="space-y-12 max-w-5xl mx-auto">
              {filteredSeries.map((series) => {
                if (!series.models || series.models.length === 0) return null;
                const hasHeatingFuel = series.models.some((m) => m.heatingFuel);
                return (
                  <div key={series.name}>
                    <h3 className="text-lg font-light tracking-tight mb-4 flex items-center gap-3">
                      <span className="text-primary text-xs font-medium tracking-[0.2em] uppercase">
                        {series.name}
                      </span>
                      <span className="flex-1 h-px bg-border" />
                      <span className="text-xs text-muted-foreground font-light">
                        {series.models.length} models
                      </span>
                    </h3>
                    <div className="border border-border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="font-light text-xs w-[50px] text-center">
                              <Scale size={14} strokeWidth={1} className="mx-auto text-muted-foreground" />
                            </TableHead>
                            <TableHead className="font-light text-xs">Model</TableHead>
                            <TableHead className="font-light text-xs text-center">GPM</TableHead>
                            <TableHead className="font-light text-xs text-center">PSI</TableHead>
                            <TableHead className="font-light text-xs text-center hidden sm:table-cell">Power Source</TableHead>
                            {hasHeatingFuel && (
                              <TableHead className="font-light text-xs text-center hidden md:table-cell">Heating Fuel</TableHead>
                            )}
                            <TableHead className="font-light text-xs text-center hidden lg:table-cell">Configuration</TableHead>
                            <TableHead className="font-light text-xs w-[100px]"></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {series.models.map((model, i) => {
                            const selected = isSelected(model.name, series.name);
                            return (
                              <TableRow key={i} className={selected ? "bg-primary/5" : ""}>
                                <TableCell className="text-center">
                                  <Checkbox
                                    checked={selected}
                                    disabled={!selected && compareModels.length >= MAX_COMPARE}
                                    onCheckedChange={() => toggleCompare(model, series.name)}
                                    aria-label={`Compare ${model.name}`}
                                  />
                                </TableCell>
                                <TableCell className="text-sm font-light">{model.name}</TableCell>
                                <TableCell className="text-sm font-light text-center">
                                  <span className="text-primary font-normal">{model.gpm}</span>
                                </TableCell>
                                <TableCell className="text-sm font-light text-center">
                                  <span className="text-primary font-normal">{model.psi}</span>
                                </TableCell>
                                <TableCell className="text-xs font-light text-center text-muted-foreground hidden sm:table-cell">
                                  {model.powerSource}
                                </TableCell>
                                {hasHeatingFuel && (
                                  <TableCell className="text-xs font-light text-center text-muted-foreground hidden md:table-cell">
                                    {model.heatingFuel || "—"}
                                  </TableCell>
                                )}
                                <TableCell className="text-xs font-light text-center text-muted-foreground hidden lg:table-cell">
                                  {model.configuration}
                                </TableCell>
                                <TableCell>
                                  <Link to="/contact">
                                    <Button variant="outline" size="sm" className="font-light text-xs h-7 px-3">
                                      Quote
                                    </Button>
                                  </Link>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* All Series Grid */}
      <section className="py-16 bg-background">
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
                <div className="flex flex-wrap gap-1 mb-2">
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
                {series.models && (
                  <p className="text-xs text-primary font-light">
                    {series.models.length} models available
                  </p>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Compare Bar */}
      {compareModels.length >= 2 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-background border-t border-border shadow-lg">
          <div className="container mx-auto px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Scale size={18} strokeWidth={1} className="text-primary" />
              <span className="text-sm font-light">
                <span className="font-normal">{compareModels.length}</span> models selected
                {compareModels.length < MAX_COMPARE && (
                  <span className="text-muted-foreground ml-1">(max {MAX_COMPARE})</span>
                )}
              </span>
              <div className="hidden sm:flex items-center gap-2">
                {compareModels.map((m) => (
                  <span
                    key={`${m.seriesName}-${m.name}`}
                    className="text-xs px-2 py-1 border border-border text-muted-foreground font-light"
                  >
                    {m.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCompareModels([])}
                className="text-xs text-muted-foreground hover:text-foreground font-light transition-colors"
              >
                Clear
              </button>
              <Button
                variant="outline"
                size="sm"
                className="font-light tracking-wide"
                onClick={() => setShowCompare(true)}
              >
                <Scale size={14} strokeWidth={1} className="mr-2" />
                Compare
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Compare Modal */}
      {showCompare && (
        <ProductCompare
          models={compareModels}
          onRemove={(name, seriesName) => {
            const updated = compareModels.filter((m) => !(m.name === name && m.seriesName === seriesName));
            setCompareModels(updated);
            if (updated.length < 2) setShowCompare(false);
          }}
          onClose={() => setShowCompare(false)}
        />
      )}

      <Footer />
    </div>
  );
};

export default ProductDetail;
