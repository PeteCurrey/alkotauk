import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CaseStudyHeader from '@/components/case-studies/CaseStudyHeader';
import CaseStudyDepthIndicator from '@/components/case-studies/CaseStudyDepthIndicator';
import CaseStudyTelemetryMap from '@/components/case-studies/CaseStudyTelemetryMap';
import CaseStudySpecifications from '@/components/case-studies/CaseStudySpecifications';
import CaseStudyRelatedProducts from '@/components/case-studies/CaseStudyRelatedProducts';
import CaseStudyConsultationCTA from '@/components/case-studies/CaseStudyConsultationCTA';
import CaseStudyNextStory from '@/components/case-studies/CaseStudyNextStory';
import { getCaseStudyBySlug } from '@/lib/case-studies/data';
import { BookOpen, ExternalLink, ShieldCheck, Compass, Thermometer, Calendar, Clock, Layers, CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Alkota in Antarctica: The Lake Whillans WISSARD Story | Alkota UK',
  description:
    'Discover the documented story of Alkota equipment used within the WISSARD hot-water drilling system that accessed subglacial Lake Whillans beneath Antarctica.',
  openGraph: {
    title: 'Alkota in Antarctica: The Lake Whillans WISSARD Story | Alkota UK',
    description:
      'Discover the documented story of Alkota equipment used within the WISSARD hot-water drilling system that accessed subglacial Lake Whillans beneath Antarctica.',
    url: 'https://alkota.co.uk/resources/case-studies/antarctica-lake-whillans',
    type: 'article',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Subglacial Lake Whillans Antarctica Hot Water Drill Case Study',
      },
    ],
  },
  alternates: {
    canonical: 'https://alkota.co.uk/resources/case-studies/antarctica-lake-whillans',
  },
};

export default function AntarcticaCaseStudyPage() {
  const caseStudy = getCaseStudyBySlug('antarctica-lake-whillans');
  if (!caseStudy) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': 'https://alkota.co.uk/resources/case-studies/antarctica-lake-whillans#article',
        headline: caseStudy.title,
        description: caseStudy.standfirst,
        image: caseStudy.heroImage,
        datePublished: '2024-01-15T00:00:00Z',
        dateModified: new Date().toISOString(),
        author: {
          '@type': 'Organization',
          name: 'Alkota UK Editorial Intelligence',
          url: 'https://alkota.co.uk',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Alkota UK',
          url: 'https://alkota.co.uk',
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': 'https://alkota.co.uk/resources/case-studies/antarctica-lake-whillans',
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://alkota.co.uk',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Resources',
            item: 'https://alkota.co.uk/resources',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Case Studies',
            item: 'https://alkota.co.uk/resources/case-studies',
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: 'Antarctica',
            item: 'https://alkota.co.uk/resources/case-studies/antarctica-lake-whillans',
          },
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#F8F7F4] text-alkota-black font-normal overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />

      {/* ── 00: EDITORIAL HEADER ───────────────────────────────────── */}
      <CaseStudyHeader caseStudy={caseStudy} />

      {/* ── 00B: FACTUAL VERIFICATION DISCLAIMER ───────────────────── */}
      <div className="bg-[#EFEFEA] border-b border-[#E8E8E4] px-6 sm:px-12 py-4">
        <div className="mx-auto max-w-5xl flex items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-2 text-[#333]">
            <ShieldCheck className="h-4 w-4 text-[#3B82F6] shrink-0" />
            <span>This field story reconstructs the historical WISSARD Lake Whillans project using published scientific and institutional sources.</span>
          </div>
          <span className="hidden sm:inline-block px-2 py-0.5 bg-white border border-[#DDD] text-[10px] uppercase text-[#666]">
            Historical Field Record
          </span>
        </div>
      </div>

      {/* ── LONG-FORM DOCUMENTARY BODY ─────────────────────────────── */}
      <div className="mx-auto max-w-5xl px-6 sm:px-12 py-20 sm:py-28 font-normal">
        
        {/* Chapter 01 */}
        <section id="chapter-01" className="mb-24">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-xs text-[#FF6900] tracking-widest">CHAPTER 01</span>
            <span className="h-[1px] w-8 bg-[#FF6900]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#777] font-mono">Subglacial Lake Whillans</span>
          </div>
          <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-alkota-black leading-tight mb-8">
            The Surface Is Only the Beginning
          </h2>
          <div className="space-y-6 text-base sm:text-lg text-[#444] leading-relaxed mb-12">
            <p>
              Subglacial Lake Whillans is an active subglacial hydrological body situated beneath the Whillans Ice Stream in West Antarctica (84.24°S, 153.64°W). Positioned beneath approximately 800 metres (half a mile) of compressed glacial ice, the lake lies in total darkness, under immense overburden pressure, isolated from direct contact with Earth’s atmosphere for thousands of years.
            </p>
            <p>
              For polar scientists led by the WISSARD (Whillans Ice Stream Subglacial Access Research Drilling) consortium, reaching this environment was a top priority. However, access had to be clean. Traditional mechanical coring techniques risked introducing petroleum lubricants, drilling muds, and non-sterile surface microbes into an ancient subglacial aquatic ecosystem. Only a sterile, high-output hot-water drilling system could melt an access pathway without chemical contamination.
            </p>
          </div>

          {/* Restrained Depth Indicator Component */}
          <CaseStudyDepthIndicator />
        </section>

        {/* Chapter 02 */}
        <section id="chapter-02" className="mb-24 pt-16 border-t border-[#E8E8E4]">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-xs text-[#FF6900] tracking-widest">CHAPTER 02</span>
            <span className="h-[1px] w-8 bg-[#FF6900]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#777] font-mono">Thermal Physics & Clean Access</span>
          </div>
          <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-alkota-black leading-tight mb-8">
            The Engineering Problem
          </h2>
          <div className="space-y-6 text-base sm:text-lg text-[#444] leading-relaxed mb-12">
            <p>
              Melting a 30-centimetre diameter borehole through 800 metres of ice requires monumental continuous thermal energy. Every litre of water pumped down the drill stem loses heat rapidly to the surrounding sub-zero ice walls. If the thermal flow rate drops or the heating core falters, the borehole quickly freezes closed, trapping valuable sensor packages and drill heads.
            </p>
            <p>
              Furthermore, the drilling water itself had to meet strict international clean-access protocols. Sourced from melted Antarctic snow, drill water was routed through multi-stage filtration to 0.2 microns, irradiated with ultraviolet sterilisation systems, and brought to high temperatures before being pumped under pressure to the drill nozzle.
            </p>
          </div>

          {/* Large Editorial Numbers as Visual Punctuation */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#E8E8E4] border border-[#E8E8E4] p-px mb-12">
            <div className="bg-white p-8">
              <span className="font-extralight text-5xl sm:text-6xl text-[#FF6900] block mb-2 font-mono">~800m</span>
              <span className="text-xs uppercase tracking-wider text-[#777] block font-mono">Penetration Depth</span>
            </div>
            <div className="bg-white p-8">
              <span className="font-extralight text-5xl sm:text-6xl text-alkota-black block mb-2 font-mono">90°C</span>
              <span className="text-xs uppercase tracking-wider text-[#777] block font-mono">Operating Water Temp</span>
            </div>
            <div className="bg-white p-8">
              <span className="font-extralight text-5xl sm:text-6xl text-alkota-black block mb-2 font-mono">0.2μm</span>
              <span className="text-xs uppercase tracking-wider text-[#777] block font-mono">Filtration Standard</span>
            </div>
          </div>
        </section>

        {/* Chapter 03 */}
        <section id="chapter-03" className="mb-24 pt-16 border-t border-[#E8E8E4]">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-xs text-[#FF6900] tracking-widest">CHAPTER 03</span>
            <span className="h-[1px] w-8 bg-[#FF6900]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#777] font-mono">The Thermal Core</span>
          </div>
          <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-alkota-black leading-tight mb-8">
            Six Alkota Machines
          </h2>
          <div className="space-y-6 text-base sm:text-lg text-[#444] leading-relaxed mb-12">
            <p>
              To generate the immense thermal transfer required for the WISSARD hot-water drill, the University of Nebraska–Lincoln engineering team selected Alkota industrial pressure-washer systems. Specifically, <strong>six Alkota 12257K systems</strong> were integrated into the primary Heater Pump Units (four units in HPU-1 and two units in HPU-2).
            </p>
            <p>
              Published engineering literature in the <em>Annals of Glaciology</em> records that each Alkota unit was capable of delivering approximately <strong>45 litres per minute</strong> (around 12 GPM) while increasing water temperature by approximately <strong>52°C</strong>. When all six Alkota units were available for drill-water production, the combined system could theoretically generate up to approximately <strong>270 litres per minute</strong> of clean hot water at approximately <strong>90°C</strong>.
            </p>
            <p>
              In operational field practice, drilling flow was commonly lower because some units were simultaneously tasked with snow melting and reservoir heating. The continuous-wound Schedule 80 coil design and robust slow-turning pump architecture enabled these standard industrial units to operate without failure throughout the campaign.
            </p>
          </div>

          {/* Technical Fact Panel: Equipment Capability vs Whole-System Operation */}
          <div className="bg-[#121212] text-white p-8 sm:p-12 border border-[#222] mb-12">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#FF6900] mb-4 font-mono">
              <Thermometer className="h-4 w-4" />
              <span>THE HEATING CORE // TECHNICAL SPECIFICATION</span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4 border-t border-white/15 mb-8 font-mono">
              <div>
                <span className="font-extralight text-3xl sm:text-4xl text-white block mb-1">6</span>
                <span className="text-[11px] uppercase tracking-wider text-[#AAA]">Alkota 12257K Units</span>
              </div>
              <div>
                <span className="font-extralight text-3xl sm:text-4xl text-[#FF6900] block mb-1">≈45 L/min</span>
                <span className="text-[11px] uppercase tracking-wider text-[#AAA]">Flow per Unit</span>
              </div>
              <div>
                <span className="font-extralight text-3xl sm:text-4xl text-[#FF6900] block mb-1">≈52°C</span>
                <span className="text-[11px] uppercase tracking-wider text-[#AAA]">Temp Rise per Unit (ΔT)</span>
              </div>
              <div>
                <span className="font-extralight text-3xl sm:text-4xl text-white block mb-1">≈270 L/min</span>
                <span className="text-[11px] uppercase tracking-wider text-[#AAA]">Theoretical Combined Array</span>
              </div>
              <div>
                <span className="font-extralight text-3xl sm:text-4xl text-white block mb-1">≈90°C</span>
                <span className="text-[11px] uppercase tracking-wider text-[#AAA]">System Water Target</span>
              </div>
              <div>
                <span className="font-extralight text-3xl sm:text-4xl text-white block mb-1">≈800 m</span>
                <span className="text-[11px] uppercase tracking-wider text-[#AAA]">Borehole Depth</span>
              </div>
            </div>

            <p className="text-xs text-[#AAA] leading-relaxed border-t border-white/10 pt-4 italic">
              Published system figures describe the Alkota heater units as components within the larger University of Nebraska–Lincoln WISSARD Clean Hot Water Drill System. Operational flow varied according to drilling, snow melting and water-production requirements.
            </p>
          </div>

          {/* ── DEDICATED SECTION: WHAT ALKOTA ACTUALLY DID ─────────── */}
          <div className="bg-[#0D0D0B] text-white p-8 sm:p-12 border border-[#222] mb-12">
            <div className="text-xs uppercase tracking-wider text-[#FF6900] font-mono mb-3">
              Institutional Clarity
            </div>
            <h3 className="font-extralight text-2xl sm:text-3xl uppercase tracking-tight text-white mb-4">
              What Alkota Actually Did
            </h3>
            <div className="space-y-4 text-xs sm:text-sm text-[#CCC] leading-relaxed">
              <p>
                Alkota equipment did not independently drill through 800 metres of Antarctic ice, nor did Alkota lead the scientific mission. The Clean Hot Water Drill was designed, manufactured, and operated by the University of Nebraska–Lincoln Science Management Office and its research partners under National Science Foundation funding.
              </p>
              <p>
                Alkota supplied the six standard industrial pressure-washer heating units that UNL engineers integrated into the containerised Heater Pump Units. Alkota’s role was providing the hydraulic pressurisation and continuous thermal energy conversion that powered the hot-water drilling stream.
              </p>
            </div>
          </div>
        </section>

        {/* Chapter 04 */}
        <section id="chapter-04" className="mb-24 pt-16 border-t border-[#E8E8E4]">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-xs text-[#FF6900] tracking-widest">CHAPTER 04</span>
            <span className="h-[1px] w-8 bg-[#FF6900]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#777] font-mono">Expedition Logistics</span>
          </div>
          <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-alkota-black leading-tight mb-8">
            The Traverse Across the Ross Ice Sheet
          </h2>
          <div className="space-y-6 text-base sm:text-lg text-[#444] leading-relaxed mb-12">
            <p>
              Before a single litre of hot water could be pumped, the entire drill infrastructure had to be transported across the Antarctic wilderness. The WISSARD equipment traverse travelled approximately <strong>625 miles</strong> (1,000 kilometres) from McMurdo Station across the Ross Ice Sheet to the remote drill site at Lake Whillans, departing on 30 December 2012 and arriving on 12 January 2013.
            </p>
            <p>
              Contemporary University of Nebraska reporting describes <strong>13 Caterpillar tracked tractors</strong> towing <strong>26 ski-mounted modules</strong> carrying more than <strong>500,000 pounds</strong> of specialised drill gear, generators, laboratory containers, fuel bladders, and the Alkota heating skids over crevassed terrain and wind-scoured sastrugi.
            </p>
          </div>

          {/* Telemetry Route Map */}
          <CaseStudyTelemetryMap />
        </section>

        {/* Chapter 05 */}
        <section id="chapter-05" className="mb-24 pt-16 border-t border-[#E8E8E4]">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-xs text-[#FF6900] tracking-widest">CHAPTER 05</span>
            <span className="h-[1px] w-8 bg-[#FF6900]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#777] font-mono">28 January 2013</span>
          </div>
          <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-alkota-black leading-tight mb-8">
            Breakthrough into the Subglacial Lake
          </h2>
          <div className="space-y-6 text-base sm:text-lg text-[#444] leading-relaxed mb-12">
            <p>
              On <strong>28 January 2013</strong> local Antarctic operating time (27 January in the United States), after days of continuous thermal melting, the sensor package on the drill stem registered a sudden pressure transition. The hot-water drill nozzle had broken through approximately <strong>800 metres (half a mile)</strong> of West Antarctic ice into Subglacial Lake Whillans.
            </p>
            <p>
              The borehole was approximately <strong>30 centimetres in diameter</strong>. The achievement represented the first successful clean access through the Antarctic ice sheet into a subglacial lake. Scientists subsequently recovered pristine water and sediment samples through the borehole.
            </p>
          </div>
        </section>

        {/* Visual Timeline Section */}
        <section className="mb-24 p-8 sm:p-12 bg-white border border-[#E8E8E4]">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#FF6900] mb-4 font-mono">
            <Calendar className="h-4 w-4" />
            <span>Chronological Timeline // Engineering & Scientific Milestones</span>
          </div>
          <h3 className="font-extralight text-2xl sm:text-3xl uppercase tracking-tight text-alkota-black mb-8">
            From Fabrication to Nature Discovery
          </h3>
          <div className="space-y-8 relative pl-6 border-l-2 border-[#E8E8E4]">
            {caseStudy.timeline?.map((evt, idx) => (
              <div key={idx} className="relative">
                <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-[#FF6900] border-2 border-white" />
                <span className="font-mono text-xs uppercase tracking-wider text-[#FF6900] block mb-1">
                  {evt.yearOrDate}
                </span>
                <h4 className="text-base font-light uppercase tracking-tight text-alkota-black mb-1">
                  {evt.headline}
                </h4>
                <p className="text-xs sm:text-sm text-[#666] leading-relaxed">
                  {evt.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Chapter 06: Scientifically Rigorous Wording */}
        <section id="chapter-06" className="mb-24 pt-16 border-t border-[#E8E8E4]">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-xs text-[#FF6900] tracking-widest">CHAPTER 06</span>
            <span className="h-[1px] w-8 bg-[#FF6900]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#777] font-mono">Scientific Analysis & Findings</span>
          </div>
          <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-alkota-black leading-tight mb-8">
            What the Samples Revealed
          </h2>
          <div className="space-y-6 text-base sm:text-lg text-[#444] leading-relaxed mb-12">
            <p>
              The breakthrough in January 2013 was only the beginning. Water and sediment recovered through the clean-access borehole were subsequently preserved, catalogued, and subjected to rigorous laboratory analysis by the WISSARD science team.
            </p>
            <p>
              In August 2014, peer-reviewed scientific research published in <em>Nature</em> (Christner et al.) reported a diverse community of metabolically active microorganisms within Subglacial Lake Whillans. The research concluded that aquatic environments beneath the Antarctic ice sheet can support viable microbial ecosystems living in total darkness, drawing energy from mineral and chemical reactions rather than sunlight.
            </p>
          </div>

          {/* ── THE SCIENTIFIC RECORD MODULE ─────────────────────────── */}
          <div className="bg-white p-8 border border-[#E8E8E4] mb-12">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#3B82F6] block mb-2">
              The Scientific Record // Landmark Peer-Reviewed Paper
            </span>
            <h4 className="font-extralight text-xl sm:text-2xl uppercase tracking-tight text-alkota-black mb-2">
              A Microbial Ecosystem Beneath the West Antarctic Ice Sheet
            </h4>
            <p className="text-xs text-[#555] font-mono mb-4">
              Christner, B. C., Priscu, J. C., Achberger, A. M. et al. · <em>Nature</em>, Vol. 512, pp. 310–313 (21 August 2014) · DOI: 10.1038/nature13667
            </p>
            <a
              href="https://www.nature.com/articles/nature13667"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase text-[#3B82F6] hover:underline"
            >
              <span>Read the Research on Nature.com</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </section>

        {/* Chapter 07: COMMERCIAL BRIDGE */}
        <section id="chapter-07" className="mb-24 pt-16 border-t-2 border-[#121212]">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-xs text-[#FF6900] tracking-widest">CHAPTER 07</span>
            <span className="h-[1px] w-8 bg-[#FF6900]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#777] font-mono">The Commercial Bridge</span>
          </div>
          <h2 className="font-extralight text-3xl sm:text-6xl uppercase tracking-tight text-alkota-black leading-none mb-8">
            The Point Isn’t Antarctica.<br />
            <span className="text-[#FF6900]">The Point Is the Standard.</span>
          </h2>
          <div className="space-y-6 text-base sm:text-lg text-[#444] leading-relaxed mb-12">
            <p>
              The value of this story is not that every UK industrial operator needs polar drilling equipment. It is that Alkota machinery was chosen to form the heating core of one of the most demanding engineered thermal systems ever deployed.
            </p>
            <p>
              The exact engineering qualities that proved vital in Antarctica are what industrial operators rely on every day across Britain:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
              <div className="p-4 bg-white border border-[#E8E8E4] flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#FF6900]" />
                <span className="text-sm font-normal text-alkota-black">Continuous Schedule 80 Steel Pipe Coils</span>
              </div>
              <div className="p-4 bg-white border border-[#E8E8E4] flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#FF6900]" />
                <span className="text-sm font-normal text-alkota-black">1,450 RPM Ceramic Plunger Triplex Pumps</span>
              </div>
              <div className="p-4 bg-white border border-[#E8E8E4] flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#FF6900]" />
                <span className="text-sm font-normal text-alkota-black">Reliable High-Temperature Thermal Transfer</span>
              </div>
              <div className="p-4 bg-white border border-[#E8E8E4] flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#FF6900]" />
                <span className="text-sm font-normal text-alkota-black">Straightforward Open Field Serviceability</span>
              </div>
            </div>
            <div className="p-8 bg-[#121212] text-white border border-[#222] my-8">
              <h3 className="font-extralight text-2xl sm:text-3xl uppercase tracking-tight mb-2">
                Your application is different.<br />
                <span className="text-[#FF6900]">Let’s engineer around it.</span>
              </h3>
              <p className="text-sm text-[#CCC] font-normal">
                Explore our commercial and bespoke mobile platforms across heavy plant, facilities, agriculture, marine, and oilfield sectors.
              </p>
            </div>
          </div>
        </section>

        {/* Technical Specifications Table */}
        <CaseStudySpecifications
          specifications={caseStudy.specifications || []}
          title="Antarctic Deployment Technical Parameters"
          subtitle="Data verified against UNL Science Management Office & Cambridge University Press Annals of Glaciology"
        />

        {/* Academic Bibliography / Sources of Truth: Clean Publication-Style Bibliography */}
        <section className="my-16 p-8 sm:p-10 bg-white border border-[#E8E8E4]">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#FF6900] mb-3 font-mono">
            <BookOpen className="h-4 w-4" />
            <span>SOURCES & FURTHER READING // SOURCE REGISTER</span>
          </div>
          <h3 className="font-extralight text-2xl uppercase tracking-tight text-alkota-black mb-6">
            Verified Academic & Engineering References
          </h3>
          <div className="space-y-4 text-xs text-[#555]">
            {caseStudy.externalSources?.map((src, idx) => (
              <div key={idx} className="p-4 bg-[#F8F7F4] border border-[#E8E8E4] flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-sm text-alkota-black font-normal">{src.title}</span>
                    {src.url && (
                      <a
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[#FF6900] hover:underline shrink-0 text-[11px] uppercase tracking-wider font-mono"
                      >
                        <span>View Source</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                  {src.author && <span className="text-[#666] block mt-0.5">{src.author}</span>}
                  <span className="text-[#888] block mt-0.5">{src.publisher} ({src.year})</span>
                  {src.note && <span className="text-[#777] italic block mt-1.5">{src.note}</span>}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Related Canonical Equipment */}
        <CaseStudyRelatedProducts
          productSlugs={caseStudy.relatedProductSlugs}
          fallbackCategory="hot-water"
          headline="The Schedule 80 Hot-Water Technology"
        />

        {/* Consultative Conversion CTA */}
        <CaseStudyConsultationCTA
          eyebrow="ENGINEERING CONSULTATION"
          headline="Your Job May Not Involve 800 Metres of Ice. The Engineering Principle Is the Same."
          description="Whether melting a subglacial borehole or degreasing heavy plant in a UK quarry, dependable hot-water thermal capacity is non-negotiable. Discuss your industrial requirements with Alkota UK engineers."
          primaryCTA={{
            label: 'Explore Alkota Equipment',
            href: '/machines',
          }}
          secondaryCTA={{
            label: 'Talk to an Engineer',
            href: '/contact',
          }}
        />
      </div>

      {/* ── NEXT FIELD STORY ───────────────────────────────────────── */}
      <CaseStudyNextStory nextSlug={caseStudy.nextStorySlug} />

      {/* ── GLOBAL FOOTER ─────────────────────────────────────────── */}
      <Footer />
    </main>
  );
}
