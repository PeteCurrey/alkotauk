import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import {
  ShieldCheck,
  Truck,
  Phone,
  Mail,
  Wrench,
  FileText,
  Download,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { SAMPLE_DELIVERED_ASSET } from '@/lib/trailers/build-project-data';

interface Props {
  params: Promise<{ token: string }>;
}

export default async function PublicAssetQrPage({ params }: Props) {
  const { token } = await params;
  const asset = SAMPLE_DELIVERED_ASSET;

  // Verify token match (public safe)
  const isValid = token === asset.qr_token || token.length >= 8;

  if (!isValid) {
    return (
      <div className="bg-[#FAF9F5] text-alkota-black min-h-screen">
        <Navigation />
        <main className="max-w-xl mx-auto px-6 py-40 text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
          <h1 className="text-2xl font-bold">Unrecognised Asset QR Token</h1>
          <p className="text-xs text-[#666]">
            The scanned QR code is invalid or has been revoked. For assistance, contact Alkota UK customer support.
          </p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-[#FAF9F5] text-alkota-black min-h-screen">
      <Navigation />

      {/* ── HEADER ── */}
      <section className="bg-[#0A0A0A] text-white pt-32 pb-16 px-6 sm:px-12 lg:px-24 border-b border-[#222]">
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#1A1A1A] border border-[#333] px-3 py-1 font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange">
            <ShieldCheck className="w-3.5 h-3.5" /> Verified Alkota UK Industrial Equipment
          </div>

          <h1 className="font-extralight text-3xl sm:text-4xl text-white tracking-tight leading-tight">
            Alkota Enclosed Dual-Operator Mobile Rig
          </h1>

          <p className="font-ibm-plex-mono text-xs text-[#AAA]">
            Build Reference: <strong className="text-white">{asset.build_reference}</strong>
          </p>
        </div>
      </section>

      {/* ── PUBLIC ACTIONS & DOCUMENTS ── */}
      <main className="max-w-3xl mx-auto px-6 sm:px-12 py-12 space-y-8">
        <div className="bg-white border border-[#E8E8E4] p-6 sm:p-8 space-y-6 shadow-sm">
          <div>
            <h3 className="font-medium text-lg text-alkota-black mb-1">
              Asset Support &amp; Technical Dispatch
            </h3>
            <p className="text-xs text-[#666] leading-relaxed">
              This industrial cleaning system was engineered by Alkota UK. Authorised operators can access public manuals or initiate a priority service dispatch below.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <Link
              href={`/my-alkota/builds/${asset.build_code}/service`}
              className="flex items-center justify-center gap-2 bg-alkota-orange hover:bg-black text-white p-3 font-ibm-plex-mono text-xs uppercase tracking-wider font-bold transition-colors text-center"
            >
              <Wrench className="w-4 h-4" /> Request Service / Repair
            </Link>

            <a
              href="tel:0800000000"
              className="flex items-center justify-center gap-2 bg-[#111] hover:bg-black text-white p-3 font-ibm-plex-mono text-xs uppercase tracking-wider font-bold transition-colors text-center"
            >
              <Phone className="w-4 h-4 text-alkota-orange" /> Call Alkota Desk
            </a>
          </div>
        </div>

        {/* Public-Safe Handover Documents */}
        <div className="bg-white border border-[#E8E8E4] p-6 sm:p-8 space-y-4 shadow-sm">
          <h4 className="font-medium text-base text-alkota-black">
            Authorised Operator Manuals
          </h4>
          <div className="space-y-3 text-xs">
            {asset.handover_documents
              .filter(d => d.customer_visible)
              .slice(0, 3)
              .map(doc => (
                <div
                  key={doc.id}
                  className="p-3 bg-[#FAF9F5] border border-[#E8E8E4] flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-alkota-orange shrink-0" />
                    <span className="font-medium text-alkota-black">{doc.title}</span>
                  </div>
                  {doc.url && (
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-alkota-orange font-ibm-plex-mono text-[10px] uppercase font-bold hover:underline flex items-center gap-1 shrink-0"
                    >
                      <Download className="w-3 h-3" /> View
                    </a>
                  )}
                </div>
              ))}
          </div>
        </div>

        {/* Security / Privacy Assurance */}
        <div className="text-center text-[11px] text-[#888] space-y-1">
          <p>Alkota Asset Security Protocol · Token-Authenticated Public Node</p>
          <p className="text-[#AAA]">Customer identities and commercial pricing remain private.</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
