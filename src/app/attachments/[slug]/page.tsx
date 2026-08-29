import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle, AlertTriangle, Info, Zap, Droplets, Thermometer, Ruler, Weight, Link2 } from 'lucide-react';
import {
  getAttachmentBySlug,
  ATTACHMENT_CATEGORIES,
  VERIFIED_ATTACHMENTS,
} from '@/lib/attachments/seed-data';
import type { AttachmentMachineCompatibility, AttachmentTechnicalRatings } from '@/lib/types/attachments';

export async function generateStaticParams() {
  return VERIFIED_ATTACHMENTS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const att = getAttachmentBySlug(slug);
  if (!att) return {};
  return {
    title: `${att.name} | Alkota UK Attachments`,
    description: att.tagline ?? att.description.slice(0, 150)
  };
}

// ─── COMPATIBILITY STATUS ─────────────────────────────────────────────────────

function CompatibilityStatusBlock({ compat }: { compat: AttachmentMachineCompatibility }) {
  const map: Record<string, { label: string; color: string; bg: string; Icon: React.ElementType }> = {
    compatible:       { label: 'Compatible — Direct Fit',      color: '#22C55E', bg: 'rgba(34,197,94,0.08)',   Icon: CheckCircle },
    requires_adapter: { label: 'Compatible — Adapter Required', color: '#F59E0B', bg: 'rgba(245,158,11,0.08)',  Icon: AlertTriangle },
    technical_review: { label: 'Verify Against Machine Spec',   color: '#3B82F6', bg: 'rgba(59,130,246,0.08)', Icon: Info },
    not_compatible:   { label: 'Not Compatible',                color: '#EF4444', bg: 'rgba(239,68,68,0.08)',   Icon: AlertTriangle }
  };
  const def = map[compat.status] ?? map['technical_review'];
  const Icon = def.Icon;

  return (
    <div
      className="flex items-start gap-3 px-4 py-3 rounded-sm"
      style={{ background: def.bg, border: `1px solid ${def.color}30` }}
    >
      <Icon className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" style={{ color: def.color }} />
      <div className="min-w-0">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <span className="font-light text-[14px] text-[#0A0A0A]">{compat.machine_name}</span>
          <span className="font-ibm-plex-mono text-[8px] uppercase tracking-widest" style={{ color: def.color }}>
            {def.label}
          </span>
        </div>
        {(compat.notes || compat.requires_adapter || compat.limitation_reason) && (
          <p className="font-normal text-[11px] text-[#888] mt-1 leading-relaxed">
            {compat.notes ?? compat.requires_adapter ?? compat.limitation_reason}
          </p>
        )}
      </div>
    </div>
  );
}

// ─── TECHNICAL RATINGS TABLE ──────────────────────────────────────────────────

function TechRatingsBlock({ ratings }: { ratings: AttachmentTechnicalRatings }) {
  const rows: { icon: React.ReactNode; label: string; value: string }[] = [];
  if (ratings.pressure_min_bar || ratings.pressure_max_bar) {
    const val = ratings.pressure_min_bar
      ? `${ratings.pressure_min_bar} – ${ratings.pressure_max_bar ?? '—'} BAR`
      : `Max ${ratings.pressure_max_bar} BAR`;
    rows.push({ icon: <Zap className="h-3.5 w-3.5" />, label: 'Working Pressure', value: val });
  }
  if (ratings.flow_min_lpm || ratings.flow_max_lpm) {
    const val = ratings.flow_min_lpm
      ? `${ratings.flow_min_lpm} – ${ratings.flow_max_lpm ?? '—'} L/min`
      : `Max ${ratings.flow_max_lpm} L/min`;
    rows.push({ icon: <Droplets className="h-3.5 w-3.5" />, label: 'Flow Rate', value: val });
  }
  if (ratings.temperature_max_c) {
    rows.push({ icon: <Thermometer className="h-3.5 w-3.5" />, label: 'Max Temperature', value: `${ratings.temperature_max_c}°C` });
  }
  if (ratings.connection_size) {
    rows.push({ icon: <Link2 className="h-3.5 w-3.5" />, label: 'Connection', value: ratings.connection_size });
  }
  if (ratings.hose_length_m) {
    rows.push({ icon: <Ruler className="h-3.5 w-3.5" />, label: 'Hose Length', value: `${ratings.hose_length_m}m` });
  }
  if (ratings.working_width_mm) {
    rows.push({ icon: <Ruler className="h-3.5 w-3.5" />, label: 'Working Width', value: `${ratings.working_width_mm}mm` });
  }
  if (ratings.weight_kg) {
    rows.push({ icon: <Weight className="h-3.5 w-3.5" />, label: 'Weight', value: `${ratings.weight_kg}kg` });
  }

  return (
    <div className="divide-y divide-[#E8E8E4]">
      {rows.map(({ icon, label, value }) => (
        <div key={label} className="flex items-center gap-4 py-3.5">
          <div className="text-alkota-orange w-5 flex-shrink-0">{icon}</div>
          <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#888] flex-1">{label}</span>
          <span className="font-light text-[14px] text-[#0A0A0A] text-right">{value}</span>
        </div>
      ))}
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default async function AttachmentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const att = getAttachmentBySlug(slug);
  if (!att) notFound();

  const cat = ATTACHMENT_CATEGORIES.find((c) => c.slug === att.category);

  const relatedAtts = att.related_attachment_slugs
    ? att.related_attachment_slugs
        .map((s) => VERIFIED_ATTACHMENTS.find((a) => a.slug === s))
        .filter(Boolean)
    : VERIFIED_ATTACHMENTS.filter(
        (a) => a.category === att.category && a.slug !== att.slug && a.active
      ).slice(0, 3);

  return (
    <main className="bg-[#FDFDFC] text-[#0A0A0A]">

      {/* ── BREADCRUMB + BACK ─────────────────────────────────────────────────── */}
      <div className="border-b border-[#E8E8E4] bg-[#F7F7F4]">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24 py-4 flex items-center gap-2">
          <Link href="/attachments" className="inline-flex items-center gap-1.5 font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#888] hover:text-alkota-orange transition-colors">
            <ArrowLeft className="h-3 w-3" /> Attachments
          </Link>
          <span className="font-ibm-plex-mono text-[9px] text-[#D5D5D0]">/</span>
          {cat && (
            <>
              <Link href={`/attachments/category/${cat.slug}`} className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#888] hover:text-alkota-orange transition-colors">
                {cat.name}
              </Link>
              <span className="font-ibm-plex-mono text-[9px] text-[#D5D5D0]">/</span>
            </>
          )}
          <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#444] truncate max-w-[200px]">{att.name}</span>
        </div>
      </div>

      {/* ── MAIN CONTENT ──────────────────────────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-16 items-start">

          {/* LEFT: Product details */}
          <div>
            {/* Kicker */}
            <div className="flex items-center gap-3 mb-4">
              {cat && (
                <Link href={`/attachments/category/${cat.slug}`} className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange hover:underline">
                  {cat.name}
                </Link>
              )}
              {att.part_number && (
                <>
                  <span className="text-[#D5D5D0]">·</span>
                  <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#888]">
                    Ref: {att.part_number}
                  </span>
                </>
              )}
            </div>

            {/* Title */}
            <h1 className="font-extralight text-[#0A0A0A] leading-tight mb-4" style={{ fontSize: 'clamp(28px, 3.5vw, 52px)' }}>
              {att.name}
            </h1>

            {att.tagline && (
              <p className="font-light text-[18px] text-[#444] leading-relaxed mb-6 border-l-2 border-alkota-orange pl-4">
                {att.tagline}
              </p>
            )}

            {/* Image */}
            <div className="h-64 md:h-96 bg-[#F7F7F4] border border-[#E8E8E4] flex items-center justify-center mb-8 relative overflow-hidden">
              {att.image_url ? (
                <img src={att.image_url} alt={att.name} className="h-full w-full object-contain p-8" />
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 border border-[#D5D5D0] mx-auto mb-3 flex items-center justify-center">
                    <Zap className="h-7 w-7 text-[#C0C0B8]" />
                  </div>
                  <p className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#C0C0B8]">Product Photography</p>
                  <p className="font-normal text-[10px] text-[#D5D5D0] mt-1">Image to be provided</p>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mb-10">
              <h2 className="font-light text-[18px] text-[#0A0A0A] mb-3">About This Attachment</h2>
              <p className="font-normal text-[14px] text-[#444] leading-relaxed">{att.description}</p>
            </div>

            {/* Applications */}
            <div className="mb-10">
              <h3 className="font-light text-[16px] text-[#0A0A0A] mb-3">Applications</h3>
              <div className="flex flex-wrap gap-2">
                {att.applications.map((appId) => (
                  <Link
                    key={appId}
                    href={`/attachments?application=${appId}`}
                    className="font-ibm-plex-mono text-[9px] uppercase tracking-widest border border-[#E8E8E4] bg-[#F7F7F4] text-[#444] px-3 py-1.5 hover:border-alkota-orange hover:text-alkota-orange transition-colors"
                  >
                    {appId.replace(/_/g, ' ')}
                  </Link>
                ))}
              </div>
            </div>

            {/* Related chemicals */}
            {att.related_chemical_slugs && att.related_chemical_slugs.length > 0 && (
              <div className="border border-[#E8E8E4] bg-[#F7F7F4] p-6 mb-10">
                <h3 className="font-light text-[15px] text-[#0A0A0A] mb-2">Recommended Chemistry</h3>
                <p className="font-normal text-[12px] text-[#888] mb-4">These chemicals are verified compatible with this attachment and application type.</p>
                <div className="flex flex-wrap gap-2">
                  {att.related_chemical_slugs.map((cSlug) => (
                    <Link
                      key={cSlug}
                      href={`/chemicals/${cSlug}`}
                      className="inline-flex items-center gap-1.5 border border-[#D5D5D0] bg-white text-[#0A0A0A] px-4 py-2 font-ibm-plex-mono text-[9px] uppercase tracking-widest hover:border-alkota-orange hover:text-alkota-orange transition-all"
                    >
                      {cSlug.replace(/-/g, ' ')} <ArrowRight className="h-2.5 w-2.5" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Sidebar */}
          <div className="space-y-6 lg:sticky lg:top-8">

            {/* Price + CTA */}
            <div className="border border-[#E8E8E4] bg-white p-7">
              <div className="flex items-center justify-between mb-1">
                <span className="font-extralight text-[32px] text-[#0A0A0A]">
                  {att.price ? `£${att.price.toFixed(2)}` : 'Price on Application'}
                </span>
                <span
                  className="font-ibm-plex-mono text-[9px] uppercase tracking-widest px-2 py-1"
                  style={{
                    color: att.in_stock ? '#22C55E' : '#888',
                    background: att.in_stock ? 'rgba(34,197,94,0.08)' : '#F7F7F4'
                  }}
                >
                  {att.in_stock ? 'In Stock' : 'Lead Time — Contact Us'}
                </span>
              </div>
              {att.price && (
                <p className="font-ibm-plex-mono text-[9px] text-[#B0AFA8] uppercase tracking-widest mb-5">Ex. VAT · B2B pricing</p>
              )}
              <div className="space-y-3">
                <Link
                  href="/contact"
                  className="w-full flex items-center justify-center gap-2 bg-alkota-orange text-white py-3.5 font-ibm-plex-mono text-[10px] uppercase tracking-widest hover:bg-[#e55f00] transition-colors"
                >
                  Add to Request List <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href="/contact"
                  className="w-full flex items-center justify-center gap-2 border border-[#D5D5D0] text-[#0A0A0A] py-3 font-ibm-plex-mono text-[9px] uppercase tracking-widest hover:border-alkota-orange hover:text-alkota-orange transition-all"
                >
                  Speak to an engineer
                </Link>
              </div>
              {att.part_number && (
                <p className="font-ibm-plex-mono text-[8px] text-[#B0AFA8] uppercase tracking-widest mt-4 pt-4 border-t border-[#F0F0EC]">
                  Part ref: {att.part_number}
                </p>
              )}
            </div>

            {/* Technical Ratings */}
            <div className="border border-[#E8E8E4] bg-white p-7">
              <h3 className="font-light text-[15px] text-[#0A0A0A] mb-4">Technical Ratings</h3>
              <TechRatingsBlock ratings={att.ratings} />
            </div>

            {/* Machine Compatibility */}
            {att.compatible_machines && att.compatible_machines.length > 0 && (
              <div className="border border-[#E8E8E4] bg-white p-7">
                <h3 className="font-light text-[15px] text-[#0A0A0A] mb-4">Machine Compatibility</h3>
                <div className="space-y-2.5">
                  {att.compatible_machines.map((compat) => (
                    <CompatibilityStatusBlock key={compat.machine_slug} compat={compat} />
                  ))}
                </div>
                <p className="font-ibm-plex-mono text-[8px] uppercase tracking-widest text-[#B0AFA8] mt-4">
                  // Contact us for machines not listed above. Compatibility depends on machine-specific pressure, flow, and temperature output.
                </p>
              </div>
            )}

            {/* Documents */}
            {att.documents && att.documents.length > 0 && (
              <div className="border border-[#E8E8E4] bg-white p-7">
                <h3 className="font-light text-[15px] text-[#0A0A0A] mb-4">Documentation</h3>
                <div className="space-y-2">
                  {att.documents.map((doc) => (
                    <a
                      key={doc.title}
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between border border-[#E8E8E4] px-4 py-3 hover:border-alkota-orange group transition-colors"
                    >
                      <span className="font-normal text-[12px] text-[#0A0A0A] group-hover:text-alkota-orange transition-colors">{doc.title}</span>
                      <span className="font-ibm-plex-mono text-[8px] uppercase tracking-widest text-[#B0AFA8]">{doc.type.replace(/_/g, ' ')}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── RELATED ATTACHMENTS ───────────────────────────────────────────────── */}
      {relatedAtts.length > 0 && (
        <section className="border-t border-[#E8E8E4] bg-[#F7F7F4] py-16">
          <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24">
            <div className="flex items-center justify-between mb-10">
              <h2 className="font-extralight text-[28px] text-[#0A0A0A]">
                From the same family.
              </h2>
              <Link
                href={`/attachments/category/${att.category}`}
                className="inline-flex items-center gap-2 font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#888] hover:text-alkota-orange transition-colors"
              >
                View all {cat?.name ?? 'attachments'} <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relatedAtts.map((rel) => {
                if (!rel) return null;
                return (
                  <Link
                    key={rel.slug}
                    href={`/attachments/${rel.slug}`}
                    className="group block border border-[#E8E8E4] bg-white hover:border-alkota-orange p-6 transition-all"
                  >
                    <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange block mb-2">
                      {cat?.name ?? rel.category}
                    </span>
                    <h4 className="font-light text-[15px] text-[#0A0A0A] mb-2 group-hover:text-alkota-orange transition-colors leading-snug">
                      {rel.name}
                    </h4>
                    <p className="font-normal text-[12px] text-[#888]">
                      {rel.price ? `£${rel.price.toFixed(2)}` : 'POA'}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── BOTTOM CTA ───────────────────────────────────────────────────────── */}
      <section className="border-t border-[#E8E8E4] py-12">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-light text-[16px] text-[#0A0A0A] mb-1">Need advice on the right configuration?</p>
            <p className="font-normal text-[12px] text-[#888]">Describe the cleaning problem. We will work back to the right attachment and machine combination.</p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Link href="/attachments" className="inline-flex items-center gap-2 border border-[#D5D5D0] text-[#0A0A0A] px-5 py-3 font-ibm-plex-mono text-[9px] uppercase tracking-widest hover:border-alkota-orange hover:text-alkota-orange transition-all">
              <ArrowLeft className="h-3 w-3" /> All Attachments
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-alkota-orange text-white px-5 py-3 font-ibm-plex-mono text-[9px] uppercase tracking-widest hover:bg-[#e55f00] transition-colors">
              Contact Us <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
