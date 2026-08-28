import Link from 'next/link';
import { ArrowRight, Compass, History, Shield, Snowflake } from 'lucide-react';

export default function AntarcticStory() {
  return (
    <section className="relative py-24 sm:py-32 px-6 sm:px-12 bg-gradient-to-b from-[#111111] via-[#0A0A0A] to-[#0D0D0D] text-white border-b border-[#222] overflow-hidden">
      {/* Subtle Ice-Blue Ambient Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-950/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Narrative */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-4">
              <Snowflake className="h-4 w-4 text-cyan-400" />
              <span className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-[0.35em] text-cyan-400">
                SCIENTIFIC MILESTONE // ANTARCTIC DRILL SYSTEM
              </span>
            </div>

            <h2 className="font-barlow-condensed text-5xl sm:text-7xl lg:text-8xl font-black uppercase italic tracking-tight text-white leading-[0.88] mb-8">
              ½ MILE OF ICE. <br />
              <span className="text-cyan-400">ZERO FAILURES.</span>
            </h2>

            <p className="font-inter text-base sm:text-lg text-[#ccc] leading-relaxed mb-6 font-normal">
              In 2013, researchers from the University of Nebraska-Lincoln designed the first-ever clean hot water drill to reach Subglacial Lake Whillans — buried 800 metres beneath the West Antarctic Ice Sheet.
            </p>

            <p className="font-inter text-sm text-[#888] leading-relaxed mb-8">
              At the core of the drilling plant were custom-engineered Alkota hot-water heating systems operating continuously in sub-zero polar conditions. The mission required 100% thermal reliability; a burner shutdown would allow the ice borehole to freeze solid instantly, trapping millions of pounds of scientific instrumentation. Alkota completed the mission without a single mechanical interruption.
            </p>

            <div className="grid grid-cols-3 gap-4 border-t border-b border-[#222] py-6 mb-8 font-ibm-plex-mono text-xs">
              <div>
                <span className="text-[#666] block text-[9px] uppercase">BOREHOLE DEPTH</span>
                <span className="text-white font-bold text-lg">800 Metres</span>
              </div>
              <div>
                <span className="text-[#666] block text-[9px] uppercase">ENVIRONMENT</span>
                <span className="text-cyan-400 font-bold text-lg">-35°C Polar</span>
              </div>
              <div>
                <span className="text-[#666] block text-[9px] uppercase">PROJECT RESULT</span>
                <span className="text-white font-bold text-lg">100% Success</span>
              </div>
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 font-ibm-plex-mono text-xs font-bold uppercase tracking-widest hover:bg-alkota-orange hover:text-white transition-all no-underline"
            >
              <span>Explore Alkota Heritage (Est. 1964)</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Right: Archival Visual Plate */}
          <div className="lg:col-span-5 relative bg-[#141414] border border-[#2B2B2B] p-8">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-black mb-6 border border-[#222]">
              <img
                src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1000&auto=format&fit=crop&q=80"
                alt="Antarctic Research Rig"
                className="w-full h-full object-cover grayscale contrast-125 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 font-ibm-plex-mono text-[9px] text-cyan-400 bg-black/80 px-2 py-1 uppercase">
                // WISSARD PROJECT ARCHIVE
              </div>
            </div>

            <div className="space-y-3 font-ibm-plex-mono text-[10px] text-[#888]">
              <div className="flex items-center justify-between border-b border-[#222] pb-2">
                <span>MANUFACTURER:</span>
                <span className="text-white font-bold">Alkota Cleaning Systems</span>
              </div>
              <div className="flex items-center justify-between border-b border-[#222] pb-2">
                <span>PLANT LOCATION:</span>
                <span className="text-white font-bold">Alcester, South Dakota</span>
              </div>
              <div className="flex items-center justify-between">
                <span>FOUNDING YEAR:</span>
                <span className="text-alkota-orange font-bold">1964 (60+ Years)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
