import { Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold tracking-tight mb-2">ALKOTA</h3>
            <p className="text-xs text-muted-foreground font-light tracking-wider mb-4">
              CLEANING SYSTEMS
            </p>
            <p className="text-sm text-muted-foreground font-light mb-4">
              Handcrafted pressure washers since 1964. Made in Alcester, South Dakota.
            </p>
            <a

              className="flex items-center gap-2 text-sm font-light text-primary hover:text-primary/80 transition-colors" href="tel:+447912506738">

              <Phone size={14} strokeWidth={1} />
              07912 506738
            </a>
          </div>

          <div>
            <h4 className="text-sm font-light tracking-wide mb-4">Products</h4>
            <ul className="space-y-2">
              {[
              { label: "Hot Water Pressure Washers", slug: "hot-water-pressure-washers" },
              { label: "Cold Water Pressure Washers", slug: "cold-water-pressure-washers" },
              { label: "Steam Cleaners", slug: "steam-cleaners" },
              { label: "Pressure Washer Trailers", slug: "pressure-washer-trailers" },
              { label: "Parts Washers", slug: "parts-washers" },
              { label: "Space Heaters", slug: "space-heaters" },
              { label: "Water Treatment", slug: "water-treatment" }].
              map((item) =>
              <li key={item.slug}>
                  <Link
                  to={`/products/${item.slug}`}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors font-light">

                    {item.label}
                  </Link>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-light tracking-wide mb-4">Company</h4>
            <ul className="space-y-2">
              {[
              { label: "About Us", to: "/about" },
              { label: "Industries", to: "/industries" },
              { label: "Find a Distributor", to: "/distributors" },
              { label: "Resources & Blog", to: "/resources" },
              { label: "Financing", to: "/financing" },
              { label: "Contact", to: "/contact" }].
              map((item) =>
              <li key={item.to}>
                  <Link
                  to={item.to}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors font-light">

                    {item.label}
                  </Link>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-light tracking-wide mb-4">Industries Served</h4>
            <ul className="space-y-2">
              {["Agriculture", "Oil & Gas", "Fleet Maintenance", "Industrial Operations", "Food Processing", "Construction"].map(
                (item) =>
                <li key={item}>
                    <Link
                    to="/industries"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors font-light">

                      {item}
                    </Link>
                  </li>

              )}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border">
          <p className="text-center text-sm text-muted-foreground font-light">
            © {new Date().getFullYear()} Alkota. All rights reserved. Made in South Dakota, USA.
          </p>
        </div>
      </div>
    </footer>);

};

export default Footer;