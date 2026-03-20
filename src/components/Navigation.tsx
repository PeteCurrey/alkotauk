import { useState, useRef, useEffect } from "react";
import { Menu, X, Mail, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";
import { Link } from "react-router-dom";
import MegaMenu from "@/components/MegaMenu";
import ResourcesMegaMenu from "@/components/ResourcesMegaMenu";
import { productCategories } from "@/data/products";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [resourcesMenuOpen, setResourcesMenuOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const productsTriggerRef = useRef<HTMLButtonElement>(null);
  const resourcesTriggerRef = useRef<HTMLButtonElement>(null);
  const [scrolled, setScrolled] = useState(false);
  let megaMenuTimeout: ReturnType<typeof setTimeout>;
  let resourcesMenuTimeout: ReturnType<typeof setTimeout>;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { label: "Industries", to: "/industries" },
    { label: "Distributors", to: "/distributors" },
  ];

  const mobileResourceLinks = [
    { label: "About Alkota", to: "/about" },
    { label: "Resource Library", to: "/resources" },
    { label: "Blog", to: "/blog" },
    { label: "Financing", to: "/financing" },
    { label: "Become a Distributor", to: "/become-distributor" },
  ];

  const handleProductsEnter = () => {
    clearTimeout(megaMenuTimeout);
    setResourcesMenuOpen(false);
    setMegaMenuOpen(true);
  };
  const handleProductsLeave = () => {
    megaMenuTimeout = setTimeout(() => setMegaMenuOpen(false), 150);
  };

  const handleResourcesEnter = () => {
    clearTimeout(resourcesMenuTimeout);
    setMegaMenuOpen(false);
    setResourcesMenuOpen(true);
  };
  const handleResourcesLeave = () => {
    resourcesMenuTimeout = setTimeout(() => setResourcesMenuOpen(false), 150);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm" : "bg-transparent text-white"}`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <NavLink to="/" className="flex items-center">
            <span className={`text-2xl tracking-tight font-light ${scrolled ? "text-primary" : "text-white"}`}>A L K O T A</span>
            <span className={`hidden sm:inline text-xs font-light tracking-wider ml-3 border-l pl-3 ${scrolled ? "text-muted-foreground border-border" : "text-white/70 border-white/30"}`}>
              C L E A N I N G  S Y S T E M S
            </span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Products mega menu trigger */}
            <div onMouseEnter={handleProductsEnter} onMouseLeave={handleProductsLeave} className="relative">
              <button
                ref={productsTriggerRef}
                className="flex items-center gap-1 text-sm font-light tracking-wide text-foreground/80 hover:text-foreground transition-colors"
                onClick={() => setMegaMenuOpen(!megaMenuOpen)}
              >
                Products
                <ChevronDown size={14} strokeWidth={1.5} className={`transition-transform duration-200 ${megaMenuOpen ? "rotate-180" : ""}`} />
              </button>
            </div>

            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                className="text-sm font-light tracking-wide text-foreground/80 hover:text-foreground transition-colors"
              >
                {item.label}
              </NavLink>
            ))}

            {/* Resources mega menu trigger */}
            <div onMouseEnter={handleResourcesEnter} onMouseLeave={handleResourcesLeave} className="relative">
              <button
                ref={resourcesTriggerRef}
                className="flex items-center gap-1 text-sm font-light tracking-wide text-foreground/80 hover:text-foreground transition-colors"
                onClick={() => setResourcesMenuOpen(!resourcesMenuOpen)}
              >
                Resources
                <ChevronDown size={14} strokeWidth={1.5} className={`transition-transform duration-200 ${resourcesMenuOpen ? "rotate-180" : ""}`} />
              </button>
            </div>

            <a
              className="flex items-center gap-2 text-sm font-light tracking-wide text-primary hover:text-primary/80 transition-colors"
              href="mailto:sales@alkota.co.uk"
            >
              <Mail size={14} strokeWidth={1} />
              sales@alkota.co.uk
            </a>
            <Link to="/contact">
              <Button variant="outline" size="sm" className="text-sm font-light tracking-wide">
                Get a Quote
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden" aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden mt-4 pb-4 space-y-1">
            {/* Mobile Products Accordion */}
            <button
              onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
              className="flex items-center justify-between w-full text-sm font-light tracking-wide text-foreground/80 px-2 py-2.5"
            >
              Products
              <ChevronDown size={16} strokeWidth={1.5} className={`transition-transform duration-200 ${mobileProductsOpen ? "rotate-180" : ""}`} />
            </button>
            {mobileProductsOpen && (
              <div className="pl-4 space-y-1 pb-2">
                {productCategories.map((cat) => (
                  <Link
                    key={cat.slug}
                    to={`/products/${cat.slug}`}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 text-sm font-light text-foreground/70 hover:text-foreground py-2 px-2 rounded-sm hover:bg-muted/50 transition-colors"
                  >
                    <img src={cat.heroImage} alt={cat.title} className="w-8 h-8 object-contain" />
                    <div>
                      <span className="block">{cat.title}</span>
                      <span className="text-[10px] text-muted-foreground">{cat.subtitle}</span>
                    </div>
                    <ChevronRight size={12} strokeWidth={1.5} className="ml-auto text-muted-foreground" />
                  </Link>
                ))}
              </div>
            )}

            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                className="block text-sm font-light tracking-wide text-foreground/80 px-2 py-2.5"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}

            {/* Mobile Resources Accordion */}
            <button
              onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}
              className="flex items-center justify-between w-full text-sm font-light tracking-wide text-foreground/80 px-2 py-2.5"
            >
              Resources
              <ChevronDown size={16} strokeWidth={1.5} className={`transition-transform duration-200 ${mobileResourcesOpen ? "rotate-180" : ""}`} />
            </button>
            {mobileResourcesOpen && (
              <div className="pl-4 space-y-1 pb-2">
                {mobileResourceLinks.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setIsOpen(false)}
                    className="block text-sm font-light text-foreground/70 hover:text-foreground py-2 px-2 rounded-sm hover:bg-muted/50 transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}

            <a href="mailto:sales@alkota.co.uk" className="flex items-center gap-2 text-sm font-light text-primary px-2 py-2.5">
              <Mail size={14} strokeWidth={1} />
              sales@alkota.co.uk
            </a>
            <Link to="/contact" onClick={() => setIsOpen(false)}>
              <Button variant="outline" size="sm" className="text-sm font-light tracking-wide w-full mt-2">
                Get a Quote
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Desktop Mega Menus */}
      <MegaMenu isOpen={megaMenuOpen} onClose={() => setMegaMenuOpen(false)} triggerRef={productsTriggerRef as React.RefObject<HTMLElement>} />
      <ResourcesMegaMenu isOpen={resourcesMenuOpen} onClose={() => setResourcesMenuOpen(false)} triggerRef={resourcesTriggerRef as React.RefObject<HTMLElement>} />
    </nav>
  );
};

export default Navigation;
