import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { productCategories } from "@/data/products";
import { ChevronRight, Flame, Droplets, Wind, Truck } from "lucide-react";

const featuredMachines = [
  {
    name: "X4 Belt Drive",
    category: "Hot Water",
    slug: "hot-water-pressure-washers",
    image: productCategories.find(p => p.slug === "hot-water-pressure-washers")?.heroImage || "",
    spec: "Up to 8 GPM / 5,000 PSI",
  },
  {
    name: "BD Industrial",
    category: "Cold Water",
    slug: "cold-water-pressure-washers",
    image: productCategories.find(p => p.slug === "cold-water-pressure-washers")?.heroImage || "",
    spec: "Up to 10 GPM / 7,000 PSI",
  },
  {
    name: "Steam Cleaner",
    category: "Steam",
    slug: "steam-cleaners",
    image: productCategories.find(p => p.slug === "steam-cleaners")?.heroImage || "",
    spec: "Up to 300°F Steam",
  },
];

const categoryIcons: Record<string, React.ReactNode> = {
  "hot-water-pressure-washers": <Flame size={16} strokeWidth={1.5} />,
  "cold-water-pressure-washers": <Droplets size={16} strokeWidth={1.5} />,
  "steam-cleaners": <Wind size={16} strokeWidth={1.5} />,
  "pressure-washer-trailers": <Truck size={16} strokeWidth={1.5} />,
};

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  triggerRef: React.RefObject<HTMLElement>;
}

const MegaMenu = ({ isOpen, onClose, onMouseEnter, onMouseLeave, triggerRef }: MegaMenuProps) => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      setHoveredCategory(null);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) return null;

  const activeCategory = hoveredCategory
    ? productCategories.find(p => p.slug === hoveredCategory)
    : null;

  return (
    <div
      ref={menuRef}
      className="absolute top-full left-0 right-0 bg-background border-b border-border shadow-xl z-50"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Left column — category list */}
          <div className="col-span-3 border-r border-border pr-6">
            <p className="text-[10px] font-medium tracking-[0.25em] uppercase text-muted-foreground mb-4">
              Product Categories
            </p>
            <div className="space-y-1">
              {productCategories.map((cat) => (
                <Link
                  key={cat.slug}
                  to={`/products/${cat.slug}`}
                  onClick={onClose}
                  onMouseEnter={() => setHoveredCategory(cat.slug)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm font-light tracking-wide transition-all duration-200 group ${
                    hoveredCategory === cat.slug
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/70 hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <span className={`transition-colors ${
                    hoveredCategory === cat.slug ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                  }`}>
                    {categoryIcons[cat.slug] || <Droplets size={16} strokeWidth={1.5} />}
                  </span>
                  <span className="flex-1">{cat.title}</span>
                  <ChevronRight
                    size={14}
                    strokeWidth={1.5}
                    className={`transition-all duration-200 ${
                      hoveredCategory === cat.slug
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-1"
                    }`}
                  />
                </Link>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-border">
              <Link
                to="/#products"
                onClick={onClose}
                className="text-xs font-light tracking-wide text-primary hover:text-primary/80 transition-colors"
              >
                View All Products →
              </Link>
            </div>
          </div>

          {/* Middle column — category preview or default */}
          <div className="col-span-5">
            {activeCategory ? (
              <div className="animate-in fade-in duration-200">
                <p className="text-[10px] font-medium tracking-[0.25em] uppercase text-muted-foreground mb-3">
                  {activeCategory.title}
                </p>
                <div className="relative bg-muted/30 rounded-sm aspect-[16/9] mb-4 overflow-hidden flex items-center justify-center">
                  <img
                    src={activeCategory.heroImage}
                    alt={activeCategory.title}
                    className="w-full h-full object-contain p-4"
                  />
                </div>
                <p className="text-sm font-light text-muted-foreground leading-relaxed mb-3 line-clamp-2">
                  {activeCategory.description}
                </p>
                <p className="text-xs text-muted-foreground/70 font-light">
                  {activeCategory.series.length} series available
                  {activeCategory.series.reduce((acc, s) => acc + (s.models?.length || 0), 0) > 0 &&
                    ` · ${activeCategory.series.reduce((acc, s) => acc + (s.models?.length || 0), 0)} models`
                  }
                </p>
                <Link
                  to={`/products/${activeCategory.slug}`}
                  onClick={onClose}
                  className="inline-block mt-3 text-xs font-light tracking-wide text-primary hover:text-primary/80 transition-colors"
                >
                  Explore {activeCategory.title} →
                </Link>
              </div>
            ) : (
              <div>
                <p className="text-[10px] font-medium tracking-[0.25em] uppercase text-muted-foreground mb-4">
                  Industrial Cleaning Solutions
                </p>
                <p className="text-sm font-light text-muted-foreground leading-relaxed mb-4">
                  Explore our complete range of American-made industrial cleaning equipment — pressure washers, steam cleaners, parts washers, and water treatment systems.
                </p>
                <div className="grid grid-cols-2 gap-3 mt-4">
                  {productCategories.slice(0, 4).map((cat) => (
                    <Link
                      key={cat.slug}
                      to={`/products/${cat.slug}`}
                      onClick={onClose}
                      className="group bg-muted/30 rounded-sm p-3 flex items-center gap-3 hover:bg-muted/50 transition-colors"
                    >
                      <img
                        src={cat.heroImage}
                        alt={cat.title}
                        className="w-12 h-12 object-contain"
                      />
                      <div>
                        <p className="text-xs font-light text-foreground/80 group-hover:text-foreground transition-colors">
                          {cat.title}
                        </p>
                        <p className="text-[10px] text-muted-foreground font-light">
                          {cat.subtitle}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right column — featured machines */}
          <div className="col-span-4 pl-6 border-l border-border">
            <p className="text-[10px] font-medium tracking-[0.25em] uppercase text-muted-foreground mb-4">
              Featured Machines
            </p>
            <div className="space-y-4">
              {featuredMachines.map((machine) => (
                <Link
                  key={machine.name}
                  to={`/products/${machine.slug}`}
                  onClick={onClose}
                  className="group flex gap-4 items-center"
                >
                  <div className="w-20 h-20 bg-muted/30 rounded-sm flex-shrink-0 flex items-center justify-center overflow-hidden">
                    <img
                      src={machine.image}
                      alt={machine.name}
                      className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-medium tracking-wide text-primary/80 uppercase">
                      {machine.category}
                    </p>
                    <p className="text-sm font-light text-foreground group-hover:text-foreground/80 transition-colors">
                      {machine.name}
                    </p>
                    <p className="text-xs text-muted-foreground font-light mt-0.5">
                      {machine.spec}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-border">
              <Link
                to="/contact"
                onClick={onClose}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-sm text-xs font-light tracking-wide hover:bg-primary/90 transition-colors"
              >
                Request a Custom Quote
                <ChevronRight size={12} strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
