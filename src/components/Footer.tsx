import Link from 'next/link';
import { Globe, Mail, Phone, MapPin } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-alkota-bg border-t border-alkota-iron/50 pt-24 pb-12 text-alkota-black text-[11px] uppercase tracking-widest">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Identity */}
          <div className="flex flex-col gap-8">
            <Link href="/" className="group">
              <Logo className="h-10 text-alkota-black" />
            </Link>
            <p className="font-inter text-[13px] leading-relaxed text-alkota-silver max-w-xs">
              EST. 1964. Handcrafted in South Dakota, USA. Engineered for the extreme UK climates. The cinematic standard in industrial cleaning.
            </p>
          </div>

          {/* Machine Hub */}
          <div>
            <h4 className="font-barlow-condensed text-xl font-black text-alkota-orange mb-8">Industrial Machines</h4>
            <ul className="flex flex-col gap-4 font-inter font-bold text-alkota-silver">
              <li><Link href="/machines/hot-water" className="hover:text-alkota-black transition-all hover:pl-2">Hot Water Elite</Link></li>
              <li><Link href="/machines/cold-water" className="hover:text-alkota-black transition-all hover:pl-2">Cold Water Industrial</Link></li>
              <li><Link href="/machines/wash-plants" className="hover:text-alkota-black transition-all hover:pl-2">Wash Plants & Bay Systems</Link></li>
              <li><Link href="/machines/parts-washers" className="hover:text-alkota-black transition-all hover:pl-2">Automatic Parts Washers</Link></li>
              <li><Link href="/bespoke" className="hover:text-alkota-black transition-all hover:pl-2">Bespoke Builds</Link></li>
            </ul>
          </div>

          {/* Industrial Systems */}
          <div>
            <h4 className="font-barlow-condensed text-xl font-black text-alkota-orange mb-8">Industrial Systems</h4>
            <ul className="flex flex-col gap-4 font-inter font-bold text-alkota-silver">
              <li><Link href="/industrial/mat-wash-plants" className="hover:text-alkota-black transition-all hover:pl-2">Access Mat Wash Plants</Link></li>
              <li><Link href="/industrial/containerised" className="hover:text-alkota-black transition-all hover:pl-2">Containerised Systems</Link></li>
              <li><Link href="/industrial/wash-installations" className="hover:text-alkota-black transition-all hover:pl-2">Multi-Bay Installations</Link></li>
              <li><Link href="/industrial/brief" className="hover:text-alkota-black transition-all hover:pl-2">Engineering Brief</Link></li>
            </ul>
          </div>

          {/* Chemicals Hub */}
          <div>
            <h4 className="font-barlow-condensed text-xl font-black text-alkota-orange mb-8">Specialized Chemicals</h4>
            <ul className="flex flex-col gap-4 font-inter font-bold text-alkota-silver">
              <li><Link href="/chemicals/degreasers" className="hover:text-alkota-black transition-all hover:pl-2">Industrial Degreasers</Link></li>
              <li><Link href="/chemicals/auto-truck-wash" className="hover:text-alkota-black transition-all hover:pl-2">Auto & Truck Wash</Link></li>
              <li><Link href="/chemicals/parts-washer" className="hover:text-alkota-black transition-all hover:pl-2">Parts Washer Formulations</Link></li>
              <li><Link href="/chemicals/food-processing" className="hover:text-alkota-black transition-all hover:pl-2">Food Safe Detergents</Link></li>
              <li><Link href="/chemicals/additives" className="hover:text-alkota-black transition-all hover:pl-2">Scale Stop & Additives</Link></li>
            </ul>
          </div>

          {/* Contact UK */}
          <div>
            <h4 className="font-barlow-condensed text-xl font-black text-alkota-orange mb-8">Contact Alkota UK</h4>
            <ul className="flex flex-col gap-8 text-alkota-silver">
              <li className="flex gap-4">
                <MapPin className="h-5 w-5 shrink-0 text-alkota-orange" />
                <span className="leading-relaxed text-alkota-black">Chesterfield, Derbyshire, UK</span>
              </li>
              <li className="flex gap-4">
                <Phone className="h-5 w-5 shrink-0 text-alkota-orange" />
                <Link href="/contact" className="text-alkota-black hover:text-alkota-orange transition-colors">Contact us for enquiries</Link>
              </li>
              <li className="flex gap-4">
                <Mail className="h-5 w-5 shrink-0 text-alkota-orange" />
                <span className="text-alkota-black">sales@alkota.co.uk</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Global Footer Bottom */}
        <div className="mt-24 border-t border-alkota-iron pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-[10px] font-bold text-alkota-smoke">
              © {currentYear} ALKOTA UK • Industrial Cleaning Systems
            </p>
            <div className="flex items-center gap-2 text-[9px] text-alkota-smoke">
              <span>Engineered Excellence Since 1964</span>
              <span className="text-alkota-iron">|</span>
              <a href="https://avorria.com" target="_blank" rel="noopener noreferrer" className="hover:text-alkota-orange transition-colors font-bold uppercase tracking-[0.2em]">
                An Avorria Signature Build
              </a>
            </div>
          </div>
          <div className="flex gap-10 text-[9px] font-black text-alkota-smoke">
            <Link href="/privacy" className="hover:text-alkota-black transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-alkota-black transition-colors">Terms</Link>
            <Link href="/sitemap" className="hover:text-alkota-black transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
