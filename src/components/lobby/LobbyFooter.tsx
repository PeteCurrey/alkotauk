import Link from 'next/link';
import { ArrowUpRight, ShieldCheck, Mail, Phone, BookOpen, Terminal } from 'lucide-react';

export default function LobbyFooter() {
  return (
    <footer className="border-t border-[#222] bg-[#050505] text-white">
      {/* Editorial Mission Statement Banner */}
      <div className="border-b border-[#1A1A1A] py-12 px-6 sm:px-12">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <span className="font-ibm-plex-mono text-[9px] font-bold uppercase tracking-[0.3em] text-[#FF6900]">
              // EDITORIAL CHARTER
            </span>
            <h3 className="mt-2 font-barlow-condensed text-3xl sm:text-4xl font-black uppercase italic tracking-tight text-white">
              ENGINEERING INTEGRITY OVER MARKETING HYPERBOLE.
            </h3>
            <p className="mt-2 font-inter text-sm text-[#888] max-w-3xl leading-relaxed">
              The Lobby is Alkota UK’s open technical repository. We document thermal equations, metallurgy standards, UK environmental compliance guidelines, and hydraulic system design for specifiers, plant engineers, and fleet operators.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-[#FF6900] px-6 py-3.5 text-center font-ibm-plex-mono text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-white hover:text-black"
            >
              <span>Submit Technical Inquiry</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href="/machines"
              className="inline-flex items-center justify-center gap-2 border border-[#333] bg-[#111] px-6 py-3.5 text-center font-ibm-plex-mono text-xs uppercase tracking-widest text-[#bbb] transition-all hover:border-white hover:text-white"
            >
              <span>View Industrial Machines</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="h-6 w-6 bg-[#FF6900] text-white flex items-center justify-center font-black text-xs">
              A
            </div>
            <span className="font-barlow-condensed text-xl font-black uppercase tracking-wider">
              THE LOBBY
            </span>
          </div>
          <p className="font-inter text-xs text-[#777] leading-relaxed mb-4">
            Published by Alkota UK. Authorised distributor of Alkota Cleaning Systems (Est. 1964, Alcester, South Dakota, USA).
          </p>
          <div className="font-ibm-plex-mono text-[10px] text-[#555] space-y-1">
            <p>Direct Support: +44 7912 506738</p>
            <p>HQ: UK National Distribution</p>
          </div>
        </div>

        <div>
          <h4 className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF6900] mb-4">
            // Core Disciplines
          </h4>
          <ul className="space-y-2 font-inter text-xs text-[#888]">
            <li>
              <Link href="/lobby#engineering-design" className="hover:text-white transition-colors">
                Coil Metallurgy & Thermal Shock
              </Link>
            </li>
            <li>
              <Link href="/lobby#regulatory-compliance" className="hover:text-white transition-colors">
                Environment Agency Wash Bay Rules
              </Link>
            </li>
            <li>
              <Link href="/lobby#application-science" className="hover:text-white transition-colors">
                Vapour Steam vs Hot Water Physics
              </Link>
            </li>
            <li>
              <Link href="/lobby#economics-tco" className="hover:text-white transition-colors">
                Aqueous Rotary Degreasing Economics
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF6900] mb-4">
            // Interactive Engineering
          </h4>
          <ul className="space-y-2 font-inter text-xs text-[#888]">
            <li>
              <Link href="/tools/machine-match" className="hover:text-white transition-colors">
                Alkota Machine Matcher AI
              </Link>
            </li>
            <li>
              <Link href="/tools/configurator" className="hover:text-white transition-colors">
                Bespoke Machine Configurator
              </Link>
            </li>
            <li>
              <Link href="/tools/tco-calculator" className="hover:text-white transition-colors">
                Fleet TCO Calculator
              </Link>
            </li>
            <li>
              <Link href="/tools/wash-bay-compliance" className="hover:text-white transition-colors">
                Wash Bay Compliance Evaluator
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF6900] mb-4">
            // Compliance Notice
          </h4>
          <p className="font-inter text-xs text-[#777] leading-relaxed">
            All environmental and regulatory citations reference UK legislation (Environmental Permitting Regs 2016, BS EN 858, Water UK guidance). Consult site environmental officers before discharge.
          </p>
          <div className="mt-4 pt-4 border-t border-[#1A1A1A] flex items-center gap-2 text-[10px] font-ibm-plex-mono text-[#555]">
            <ShieldCheck className="h-4 w-4 text-[#FF6900]" />
            <span>UKCA & CE Compliant Systems</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#1A1A1A] px-6 py-6 text-center text-[10px] font-ibm-plex-mono text-[#555]">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Alkota UK. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-white">Alkota Main Site</Link>
            <Link href="/machines" className="hover:text-white">Machines</Link>
            <Link href="/contact" className="hover:text-white">Contact</Link>
            <Link href="/admin" className="text-[#333] hover:text-[#555]">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
