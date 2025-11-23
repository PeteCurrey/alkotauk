import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <NavLink to="/" className="flex items-center">
            <span className="text-2xl font-bold tracking-tight">ALKOTA</span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink
              to="/"
              className="text-sm font-light tracking-wide text-foreground/80 hover:text-foreground transition-colors"
            >
              Products
            </NavLink>
            <NavLink
              to="/"
              className="text-sm font-light tracking-wide text-foreground/80 hover:text-foreground transition-colors"
            >
              About
            </NavLink>
            <Button
              variant="outline"
              size="sm"
              className="text-sm font-light tracking-wide"
            >
              Contact
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <NavLink
              to="/"
              className="block text-sm font-light tracking-wide text-foreground/80"
            >
              Products
            </NavLink>
            <NavLink
              to="/"
              className="block text-sm font-light tracking-wide text-foreground/80"
            >
              About
            </NavLink>
            <Button
              variant="outline"
              size="sm"
              className="text-sm font-light tracking-wide w-full"
            >
              Contact
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
