import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import {
  BookOpen,
  ArrowLeft,
  FileText,
  Download,
  Flame,
  Droplets,
  Shield,
  Phone,
  Mail,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { SAMPLE_DELIVERED_ASSET } from '@/lib/trailers/build-project-data';

interface Props {
  params: Promise<{ 'build-code': string }>;
}

export default async function TechnicalSupportPage({ params }: Props) {
  const { 'build-code': buildCode } = await params;
  const asset = SAMPLE_DELIVERED_ASSET;

  const guides = [
    {
      title: 'Trailer Rig Daily Pre-Flight Checks',
      category: 'Daily Protocol',
      desc: 'Essential 5-minute visual checklist: hitch torque, tyre pressures, water inlet filter, oil level, and breakaway cable.',
      readTime: '4 min read',
    },
    {
      title: 'Winterising Your Mobile Cleaning System',
      category: 'Seasonal Care',
      desc: 'Critical glycol antifreeze purge procedure to protect heating coil, brass pump manifolds, and filtration modules from sub-zero frost damage.',
      readTime: '6 min read',
    },
    {
      title: 'Burner Maintenance & Fuel Filter Cycling',
      category: 'Combustion Care',
      desc: 'Electrode gap calibration, photocell cleanliness, and water-separator diesel filter replacement intervals.',
      readTime: '5 min read',
    },
    {
      title: 'Closed-Loop Water Recycling Module Care',
      category: 'Environmental Compliance',
      desc: 'Sump basin desludging, 5-stage filter media backwashing, and hydrocarbon absorption filter cartridge renewal schedule.',
      readTime: '7 min read',
    },
  ];

  return (
    <div className="bg-[#FAF9F5] text-alkota-black min-h-screen">
      <Navigation />

      {/* ── HEADER ── */}
      <section className="bg-[#0A0A0A] text-white pt-32 pb-16 px-6 sm:px-12 lg:px-24 border-b border-[#222]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#777] mb-3">
            <Link href={`/my-alkota/builds/${buildCode}`} className="hover:text-alkota-orange flex items-center gap-1">
              <ArrowLeft className="w-3 h-3" /> Back to System Record
            </Link>
            <span>/</span>
            <span className="text-white">Technical Support</span>
          </div>

          <h1 className="font-extralight text-3xl sm:text-5xl text-white tracking-tight leading-tight mb-2">
            Technical Knowledge &amp; Support
          </h1>
          <p className="text-xs sm:text-sm text-[#AAA]">
            Authorised operating manuals, maintenance guides, and direct senior engineer support for <span className="font-ibm-plex-mono text-white">{asset.build_reference}</span>.
          </p>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <main className="max-w-4xl mx-auto px-6 sm:px-12 lg:px-24 py-12 space-y-12">
        {/* Authorised Manuals */}
        <section className="bg-white border border-[#E8E8E4] p-8 space-y-6 shadow-sm">
          <div className="border-b border-[#E8E8E4] pb-4">
            <h2 className="font-light text-2xl text-alkota-black tracking-tight">
              System Manuals &amp; Handover Documents
            </h2>
            <p className="text-xs text-[#666]">
              Controlled digital versions of the operating and safety manuals supplied with your rig.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {asset.handover_documents
              .filter(d => d.customer_visible)
              .map(doc => (
                <div
                  key={doc.id}
                  className="p-4 bg-[#FAF9F5] border border-[#E8E8E4] flex items-center justify-between hover:border-alkota-orange transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-alkota-orange shrink-0" />
                    <div>
                      <h4 className="font-medium text-alkota-black">{doc.title}</h4>
                      <p className="font-ibm-plex-mono text-[10px] text-[#888]">{doc.revision}</p>
                    </div>
                  </div>
                  {doc.url && (
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-alkota-orange hover:underline font-ibm-plex-mono text-[10px] uppercase font-bold flex items-center gap-1 shrink-0"
                    >
                      <Download className="w-3 h-3" /> View
                    </a>
                  )}
                </div>
              ))}
          </div>
        </section>

        {/* Technical Articles & Maintenance Knowledge */}
        <section className="space-y-4">
          <h3 className="font-light text-2xl text-alkota-black tracking-tight">
            Equipment Care Guides &amp; Protocols
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {guides.map((guide, idx) => (
              <div key={idx} className="bg-white border border-[#E8E8E4] p-6 space-y-2 hover:border-alkota-orange transition-colors shadow-sm">
                <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange font-bold">
                  {guide.category} · {guide.readTime}
                </span>
                <h4 className="font-medium text-base text-alkota-black">{guide.title}</h4>
                <p className="text-xs text-[#666] leading-relaxed">{guide.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Direct Contact Desk */}
        <section className="bg-[#0A0A0A] text-white p-8 sm:p-10 border border-[#222] space-y-6">
          <div>
            <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange">
              Direct Engineering Support
            </span>
            <h3 className="font-extralight text-2xl text-white tracking-tight mt-1 mb-2">
              Speak with an Alkota UK Technical Specialist
            </h3>
            <p className="text-xs text-[#AAA] max-w-xl leading-relaxed">
              When site troubleshooting requires expert diagnosis, our technical team is available during standard UK working hours. Please have your build reference <span className="font-ibm-plex-mono text-white">{asset.build_reference}</span> ready.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="tel:0800000000"
              className="inline-flex items-center gap-2 bg-alkota-orange hover:bg-white hover:text-black text-white px-5 py-3 font-ibm-plex-mono text-xs uppercase tracking-widest font-bold transition-colors"
            >
              <Phone className="w-3.5 h-3.5" /> Call Alkota Technical Desk
            </a>
            <Link
              href={`/my-alkota/builds/${buildCode}/service`}
              className="inline-flex items-center gap-2 border border-[#444] hover:border-white text-white px-5 py-3 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors"
            >
              Book On-Site Engineer
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
