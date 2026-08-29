import Link from 'next/link';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A0A0A] text-white border-t border-[#222] pt-20 pb-12 px-6 sm:px-12 text-xs font-normal">
      <div className="mx-auto max-w-7xl w-full">
        {/* Top Brand Banner */}
        <div className="pb-16 mb-16 border-b border-[#1F1F1F] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center font-normal">
          <div className="lg:col-span-8">
            <Link href="/" className="inline-block group mb-4">
              <Logo className="h-12" />
            </Link>
            <p className="text-sm text-[#888] max-w-2xl leading-relaxed font-normal">
              Alkota UK represents Alkota Cleaning Systems Inc. (Est. 1964, Alcester, South Dakota, USA). Engineered for the UK’s most aggressive industrial, fleet, agricultural, and manufacturing environments.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end font-normal">
            <Link
              href="/tools/configurator"
              className="inline-flex items-center justify-center gap-2 bg-[#FF6900] px-6 py-3.5 text-xs uppercase tracking-widest text-white hover:bg-white hover:text-black transition-colors font-normal"
            >
              <span>Launch Build Configurator</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* 5-Column Sitemap Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 mb-16 font-normal">
          {/* Col 1: Machines */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-[#FF6900] mb-4 font-light">
              // Equipment Fleet
            </h4>
            <ul className="space-y-2.5 text-[#999] font-normal">
              <li><Link href="/machines/hot-water" className="hover:text-white transition-colors">Hot Water Pressure Washers</Link></li>
              <li><Link href="/machines/cold-water" className="hover:text-white transition-colors">Cold Water Industrial</Link></li>
              <li><Link href="/machines/steam" className="hover:text-white transition-colors">Dry Vapour Steam Cleaners</Link></li>
              <li><Link href="/machines/parts-washers" className="hover:text-white transition-colors">Aqueous Parts Washers</Link></li>
              <li><Link href="/machines/trailers" className="hover:text-white transition-colors">Bespoke Mobile Trailers</Link></li>
              <li><Link href="/machines" className="text-white hover:text-[#FF6900] transition-colors mt-2 inline-block font-normal">All 127 Machines →</Link></li>
            </ul>
          </div>

          {/* Col 2: Solutions & Industries */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-[#FF6900] mb-4 font-light">
              // Sectors & Systems
            </h4>
            <ul className="space-y-2.5 text-[#999] font-normal">
              <li><Link href="/industries/agriculture" className="hover:text-white transition-colors">Agriculture & Farming</Link></li>
              <li><Link href="/industries/transport-fleet" className="hover:text-white transition-colors">Transport & Fleet Washing</Link></li>
              <li><Link href="/industries/food-beverage" className="hover:text-white transition-colors">Food & Hygiene Sanitisation</Link></li>
              <li><Link href="/industries/industrial" className="hover:text-white transition-colors">Heavy Plant & Manufacturing</Link></li>
              <li><Link href="/water-treatment" className="hover:text-white transition-colors">Water Treatment & Recycling</Link></li>
              <li><Link href="/chemicals" className="hover:text-white transition-colors">Hydrus Chemical Formulations</Link></li>
            </ul>
          </div>

          {/* Col 3: Knowledge & The Lobby */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-[#FF6900] mb-4 font-light">
              // Knowledge Base
            </h4>
            <ul className="space-y-2.5 text-[#999] font-normal">
              <li><Link href="/resources/case-studies" className="hover:text-white text-white font-medium transition-colors">Case Studies & Field Proof</Link></li>
              <li><Link href="/lobby" className="hover:text-white text-[#FF6900] transition-colors font-normal">The Lobby (Knowledge Hub)</Link></li>
              <li><Link href="/mess-quest" className="hover:text-white transition-colors">Mess Quest Video Series</Link></li>
              <li><Link href="/lobby#engineering-design" className="hover:text-white transition-colors">Schedule 80 Metallurgy</Link></li>
              <li><Link href="/lobby#regulatory-compliance" className="hover:text-white transition-colors">Wash Bay Water Regs</Link></li>
              <li><Link href="/tools/machine-match" className="hover:text-white transition-colors">Machine Matcher AI</Link></li>
              <li><Link href="/tools/tco-calculator" className="hover:text-white transition-colors">TCO Fleet Calculator</Link></li>
            </ul>
          </div>

          {/* Col 4: Support & Ownership */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-[#FF6900] mb-4 font-light">
              // Ownership & Support
            </h4>
            <ul className="space-y-2.5 text-[#999] font-normal">
              <li><Link href="/support/service" className="hover:text-white transition-colors">Service & Breakdown Support</Link></li>
              <li><Link href="/support/warranty" className="hover:text-white transition-colors">7-Year Warranty Registration</Link></li>
              <li><Link href="/support/replacement-parts" className="hover:text-white transition-colors">Genuine Replacement Parts</Link></li>
              <li><Link href="/support/manuals" className="hover:text-white transition-colors">Technical Manuals & Schematics</Link></li>
              <li><Link href="/portal" className="hover:text-white transition-colors">Dealer Portal Access</Link></li>
            </ul>
          </div>

          {/* Col 5: Company & Contact */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-[#FF6900] mb-4 font-light">
              // Alkota UK
            </h4>
            <div className="space-y-3 text-[#888] font-normal">
              <p className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-[#FF6900] shrink-0 mt-0.5" />
                <span>UK National Distribution & Support</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#FF6900] shrink-0" />
                <a href="tel:+447912506738" className="text-white hover:text-[#FF6900] font-normal">+44 7912 506738</a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#FF6900] shrink-0" />
                <a href="mailto:sales@alkota.co.uk" className="text-white hover:underline font-normal">sales@alkota.co.uk</a>
              </p>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-block text-xs uppercase tracking-widest text-[#FF6900] hover:underline font-normal"
                >
                  Contact Applications Team →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Global Legal & Copyright Bar */}
        <div className="pt-8 border-t border-[#1C1C1C] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#666] font-normal">
          <div>
            <span>© {currentYear} Alkota UK. All rights reserved. Handcrafted in South Dakota, USA.</span>
          </div>
          <div className="flex items-center gap-6 font-normal">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Supply</Link>
            <Link href="/sitemap.xml" className="hover:text-white transition-colors">XML Sitemap</Link>
            <Link href="/admin" className="text-[#444] hover:text-[#777] transition-colors">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
