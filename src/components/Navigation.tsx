import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
  { label: "Products", to: "/#products" },
  { label: "Industries", to: "/industries" },
  { label: "About", to: "/about" },
  { label: "Resources", to: "/resources" },
  { label: "Financing", to: "/financing" },
  { label: "Distributors", to: "/distributors" }];


  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <NavLink to="/" className="flex items-center">
            <span className="text-2xl font-bold tracking-tight">ALKOTA</span>
            <span className="hidden sm:inline text-xs text-muted-foreground font-light tracking-wider ml-3 border-l border-border pl-3">
              CLEANING SYSTEMS
            </span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item) =>
            <NavLink
              key={item.label}
              to={item.to}
              className="text-sm font-light tracking-wide text-foreground/80 hover:text-foreground transition-colors">

                {item.label}
              </NavLink>
            )}
            <a

              className="flex items-center gap-2 text-sm font-light tracking-wide text-primary hover:text-primary/80 transition-colors" href="tel:+447912506738">

              <Phone size={14} strokeWidth={1} />
              1-800-255-6823
            </a>
            <Link to="/contact">
              <Button
                variant="outline"
                size="sm"
                className="text-sm font-light tracking-wide">

                Get a Quote
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden"
            aria-label="Toggle menu">

            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen &&
        <div className="lg:hidden mt-4 pb-4 space-y-4">
            {navItems.map((item) =>
          <NavLink
            key={item.label}
            to={item.to}
            className="block text-sm font-light tracking-wide text-foreground/80"
            onClick={() => setIsOpen(false)}>

                {item.label}
              </NavLink>
          )}
            <a href="tel:1-800-255-6823" className="flex items-center gap-2 text-sm font-light text-primary">
              <Phone size={14} strokeWidth={1} />
              1-800-255-6823
            </a>
            <Link to="/contact" onClick={() => setIsOpen(false)}>
              <Button variant="outline" size="sm" className="text-sm font-light tracking-wide w-full">
                Get a Quote
              </Button>
            </Link>
          </div>
        }
      </div>
    </nav>);

};

export default Navigation;