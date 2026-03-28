import Link from 'next/link';
import { Globe, Mail, Phone, MapPin } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-alkota-bg border-t border-alkota-iron/50 pt-24 pb-12 text-alkota-black">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Identity */}
          <div className="flex flex-col gap-8">
            <Link href="/" className="group">
              <Logo className="h-10 text-alkota-black" />
            </Link>
            <p className="font-inter text-[13px] leading-relaxed text-alkota-silver uppercase tracking-wider max-w-xs">
              EST. 1964. Handcrafted in South Dakota, USA. Engineered for the extreme UK climates. The cinematic standard in industrial cleaning.
            </p>
            <div className="flex gap-5">
              <Link href="#" className="text-alkota-smoke transition-all hover:text-alkota-orange hover:scale-110"><Globe className="h-5 w-5" /></Link>
              <Link href="#" className="text-alkota-smoke transition-all hover:text-alkota-orange hover:scale-110"><Globe className="h-5 w-5" /></Link>
              <Link href="#" className="text-alkota-smoke transition-all hover:text-alkota-orange hover:scale-110"><Globe className="h-5 w-5" /></Link>
            </div>
          </div>

          {/* Machine Hub */}
          <div>
            <h4 className="font-barlow-condensed text-xl font-black uppercase tracking-widest text-alkota-orange mb-8">Industrial Machines</h4>
            <ul className="flex flex-col gap-4 font-inter text-[12px] font-bold uppercase tracking-[0.15em] text-alkota-silver">
              <li><Link href="/machines/hot-water" className="hover:text-alkota-black transition-all hover:pl-2">Hot Water Elite</Link></li>
              <li><Link href="/machines/cold-water" className="hover:text-alkota-black transition-all hover:pl-2">Cold Water Belt Drive</Link></li>
              <li><Link href="/machines/steam" className="hover:text-alkota-black transition-all hover:pl-2">Steam Generators</Link></li>
              <li><Link href="/machines/parts-washers" className="hover:text-alkota-black transition-all hover:pl-2">Automatic Parts Washers</Link></li>
              <li><Link href="/machines/trailers" className="hover:text-alkota-black transition-all hover:pl-2">Trailer Systems</Link></li>
            </ul>
          </div>

          {/* Environmental Hub */}
          <div>
            <h4 className="font-barlow-condensed text-xl font-black uppercase tracking-widest text-alkota-orange mb-8">Water Treatment</h4>
            <ul className="flex flex-col gap-4 font-inter text-[12px] font-bold uppercase tracking-[0.15em] text-alkota-silver">
              <li><Link href="/water-treatment/vacuum-filtration" className="hover:text-alkota-black transition-all hover:pl-2">Vacuum Filtration (VFS)</Link></li>
              <li><Link href="/water-treatment/media-filtration" className="hover:text-alkota-black transition-all hover:pl-2">Media Filtration</Link></li>
              <li><Link href="/water-treatment/evaporators" className="hover:text-alkota-black transition-all hover:pl-2">Waste Water Evap</Link></li>
              <li><Link href="/water-treatment/compliance" className="hover:text-alkota-black transition-all hover:pl-2">Regulatory Compliance</Link></li>
              <li><Link href="/chemicals" className="hover:text-alkota-black transition-all hover:pl-2">Industrial Detergents</Link></li>
            </ul>
          </div>

          {/* Contact UK */}
          <div>
            <h4 className="font-barlow-condensed text-xl font-black uppercase tracking-widest text-alkota-orange mb-8">Contact Alkota UK</h4>
            <ul className="flex flex-col gap-8 text-[11px] font-bold uppercase tracking-widest text-alkota-silver">
              <li className="flex gap-4">
                <MapPin className="h-5 w-5 shrink-0 text-alkota-orange" />
                <span className="leading-relaxed text-alkota-black">Alcester, South Dakota (HQ)<br />Serving the United Kingdom</span>
              </li>
              <li className="flex gap-4">
                <Phone className="h-5 w-5 shrink-0 text-alkota-orange" />
                <span className="text-alkota-black">+44 (0) 1234 567890</span>
              </li>
              <li className="flex gap-4">
                <Mail className="h-5 w-5 shrink-0 text-alkota-orange" />
                <span className="group-hover:text-alkota-black transition-colors text-alkota-black">sales@alkota.co.uk</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Global Footer Bottom */}
        <div className="mt-24 border-t border-alkota-iron pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-alkota-smoke">
              © {currentYear} ALKOTA UK • Industrial Cleaning Systems
            </p>
            <p className="text-[9px] text-alkota-smoke uppercase tracking-widest">
              Engineered Excellence Since 1964
            </p>
          </div>
          <div className="flex gap-10 text-[9px] font-black uppercase tracking-[0.2em] text-alkota-smoke">
            <Link href="/privacy" className="hover:text-alkota-black transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-alkota-black transition-colors">Terms</Link>
            <Link href="/sitemap" className="hover:text-alkota-black transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
