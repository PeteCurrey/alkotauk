const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold tracking-tight mb-4">ALKOTA</h3>
            <p className="text-sm text-muted-foreground font-light">
              Handcrafted pressure washers since 1964
            </p>
          </div>

          <div>
            <h4 className="text-sm font-light tracking-wide mb-4">Products</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-light">
                  Pressure Washers
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-light">
                  Cleaning Systems
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-light">
                  Accessories
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-light tracking-wide mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-light">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-light">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-light">
                  Support
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-light tracking-wide mb-4">Contact</h4>
            <p className="text-sm text-muted-foreground font-light">
              Contact us to learn more about our industrial-grade pressure washing solutions.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-border">
          <p className="text-center text-sm text-muted-foreground font-light">
            © {new Date().getFullYear()} Alkota. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
