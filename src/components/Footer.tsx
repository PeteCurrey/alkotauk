import { Phone } from "lucide-react";

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
              href="tel:1-800-255-6823"
              className="flex items-center gap-2 text-sm font-light text-primary hover:text-primary/80 transition-colors"
            >
              <Phone size={14} strokeWidth={1} />
              1-800-255-6823
            </a>
          </div>

          <div>
            <h4 className="text-sm font-light tracking-wide mb-4">Products</h4>
            <ul className="space-y-2">
              {[
                "Hot Water Pressure Washers",
                "Cold Water Pressure Washers",
                "Steam Cleaners",
                "Pressure Washer Trailers",
                "Parts Washers",
                "Space Heaters",
                "Water Treatment",
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-light">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-light tracking-wide mb-4">Company</h4>
            <ul className="space-y-2">
              {["About Us", "Find a Distributor", "Resources", "Blog", "Pressure Washer Catalog", "Financing"].map(
                (item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-light">
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-light tracking-wide mb-4">Industries Served</h4>
            <ul className="space-y-2">
              {["Agriculture", "Oil & Gas", "Fleet Maintenance", "Industrial Operations", "Food Processing", "Construction"].map(
                (item) => (
                  <li key={item}>
                    <span className="text-sm text-muted-foreground font-light">{item}</span>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border">
          <p className="text-center text-sm text-muted-foreground font-light">
            © {new Date().getFullYear()} Alkota Cleaning Systems. All rights reserved. Made in Alcester, South Dakota, USA.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
