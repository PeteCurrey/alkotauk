import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { BookOpen, FileText, DollarSign, Users, ChevronRight, Wrench, Info } from "lucide-react";

const resourceLinks = [
  {
    label: "About Alkota",
    to: "/about",
    icon: <Info size={18} strokeWidth={1.5} />,
    description: "Our heritage and story since 1964",
  },
  {
    label: "Resource Library",
    to: "/resources",
    icon: <Wrench size={18} strokeWidth={1.5} />,
    description: "Manuals, guides & technical documents",
  },
  {
    label: "Blog",
    to: "/blog",
    icon: <FileText size={18} strokeWidth={1.5} />,
    description: "Industry news, tips & cleaning insights",
  },
  {
    label: "Financing",
    to: "/financing",
    icon: <DollarSign size={18} strokeWidth={1.5} />,
    description: "Flexible payment options for equipment",
  },
  {
    label: "Become a Distributor",
    to: "/become-distributor",
    icon: <Users size={18} strokeWidth={1.5} />,
    description: "Partner with us and grow your business",
  },
];

interface ResourcesMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  triggerRef: React.RefObject<HTMLElement>;
}

const ResourcesMegaMenu = ({ isOpen, onClose, onMouseEnter, onMouseLeave, triggerRef }: ResourcesMegaMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

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

  return (
    <div
      ref={menuRef}
      className="absolute top-full left-0 right-0 bg-background border-b border-border shadow-xl z-50"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Links column */}
          <div className="col-span-5">
            <p className="text-[10px] font-medium tracking-[0.25em] uppercase text-muted-foreground mb-4">
              Resources & Company
            </p>
            <div className="space-y-1">
              {resourceLinks.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={onClose}
                  className="flex items-center gap-4 px-3 py-3 rounded-sm text-foreground/70 hover:text-foreground hover:bg-muted/50 transition-all duration-200 group"
                >
                  <span className="text-muted-foreground group-hover:text-primary transition-colors">
                    {item.icon}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-light tracking-wide">{item.label}</p>
                    <p className="text-xs text-muted-foreground font-light">{item.description}</p>
                  </div>
                  <ChevronRight
                    size={14}
                    strokeWidth={1.5}
                    className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-muted-foreground"
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Featured / CTA column */}
          <div className="col-span-4 pl-6 border-l border-border">
            <p className="text-[10px] font-medium tracking-[0.25em] uppercase text-muted-foreground mb-4">
              Quick Links
            </p>
            <div className="bg-muted/30 rounded-sm p-5 mb-4">
              <BookOpen size={20} strokeWidth={1.5} className="text-primary mb-3" />
              <p className="text-sm font-light text-foreground mb-1">Need help choosing?</p>
              <p className="text-xs text-muted-foreground font-light leading-relaxed mb-3">
                Our team can help you find the right cleaning system for your application and budget.
              </p>
              <Link
                to="/contact"
                onClick={onClose}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-sm text-xs font-light tracking-wide hover:bg-primary/90 transition-colors"
              >
                Get Expert Advice
                <ChevronRight size={12} strokeWidth={1.5} />
              </Link>
            </div>
          </div>

          {/* Distributors CTA */}
          <div className="col-span-3 pl-6 border-l border-border">
            <p className="text-[10px] font-medium tracking-[0.25em] uppercase text-muted-foreground mb-4">
              Find a Dealer
            </p>
            <p className="text-sm font-light text-muted-foreground leading-relaxed mb-4">
              Locate your nearest authorised Alkota distributor for sales, service, and support.
            </p>
            <Link
              to="/distributors"
              onClick={onClose}
              className="inline-flex items-center gap-2 text-xs font-light tracking-wide text-primary hover:text-primary/80 transition-colors"
            >
              View Distributors →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesMegaMenu;
