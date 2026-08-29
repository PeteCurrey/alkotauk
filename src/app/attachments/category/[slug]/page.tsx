import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Zap } from 'lucide-react';
import {
  ATTACHMENT_CATEGORIES,
  VERIFIED_ATTACHMENTS,
  ATTACHMENT_APPLICATIONS,
} from '@/lib/attachments/seed-data';

export async function generateStaticParams() {
  return ATTACHMENT_CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = ATTACHMENT_CATEGORIES.find((c) => c.slug === slug);
  if (!cat) return {};
  return {
    title: `${cat.name} | Alkota UK Attachments`,
    description: cat.shortDesc
  };
}

export default async function AttachmentCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cat = ATTACHMENT_CATEGORIES.find((c) => c.slug === slug);
  if (!cat) notFound();

  const items = VERIFIED_ATTACHMENTS.filter((a) => a.category === slug && a.active);

  const relatedApplications = ATTACHMENT_APPLICATIONS.filter((app) =>
    cat.applications.includes(app.id as any)
  );

  return (
    <main className="bg-[#FDFDFC] text-[#0A0A0A]">

      {/* ── BREADCRUMB ─────────────────────────────────────────────────────────── */}
      <div className="border-b border-[#E8E8E4] bg-[#F7F7F4]">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24 py-4 flex items-center gap-2">
          <Link href="/attachments" className="inline-flex items-center gap-1.5 font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#888] hover:text-alkota-orange transition-colors">
            <ArrowLeft className="h-3 w-3" /> Attachments
          </Link>
          <span className="font-ibm-plex-mono text-[9px] text-[#D5D5D0]">/</span>
          <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#444]">{cat.name}</span>
        </div>
      </div>

      {/* ── HERO ───────────────────────────────────────────────────────────────── */}
      <section className="border-b border-[#E8E8E4] py-20">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 items-end">
            <div>
              <p className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.2em] text-alkota-orange mb-4">
                Attachment Category
              </p>
              <h1 className="font-extralight leading-none mb-5" style={{ fontSize: 'clamp(36px, 4.5vw, 72px)' }}>
                {cat.name}
              </h1>
              <p className="font-normal text-[15px] text-[#6B6B62] max-w-[540px] leading-relaxed">
                {cat.shortDesc}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-px border border-[#E8E8E4] bg-[#E8E8E4]">
              <div className="bg-[#F7F7F4] px-5 py-5">
                <div className="font-extralight text-[32px] text-[#0A0A0A] leading-none">{items.length}</div>
                <div className="font-ibm-plex-mono text-[8px] uppercase tracking-widest text-[#888] mt-1">
                  {items.length === 1 ? 'Attachment' : 'Attachments'}
                </div>
              </div>
              <div className="bg-[#F7F7F4] px-5 py-5">
                <div className="font-extralight text-[32px] text-[#0A0A0A] leading-none">{relatedApplications.length}</div>
                <div className="font-ibm-plex-mono text-[8px] uppercase tracking-widest text-[#888] mt-1">Applications</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ATTACHMENT GRID ─────────────────────────────────────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24 py-16">
        {items.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-ibm-plex-mono text-[11px] uppercase tracking-widest text-[#B0AFA8]">
              No attachments currently listed in this category.
            </p>
            <Link href="/attachments" className="inline-flex items-center gap-2 mt-6 border border-[#D5D5D0] text-[#0A0A0A] px-5 py-3 font-ibm-plex-mono text-[9px] uppercase tracking-widest hover:border-alkota-orange hover:text-alkota-orange transition-all">
              <ArrowLeft className="h-3 w-3" /> Back to all attachments
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((att) => (
              <Link
                key={att.slug}
                href={`/attachments/${att.slug}`}
                className="group block border border-[#E8E8E4] bg-white hover:border-alkota-orange hover:shadow-lg transition-all duration-300"
              >
                {/* Image */}
                <div className="h-44 bg-[#F7F7F4] border-b border-[#E8E8E4] flex items-center justify-center relative overflow-hidden">
                  {att.image_url ? (
                    <img src={att.image_url} alt={att.name} className="h-full w-full object-contain p-6" />
                  ) : (
                    <div className="text-center">
                      <div className="w-10 h-10 border border-[#D5D5D0] mx-auto mb-2 flex items-center justify-center">
                        <Zap className="h-4 w-4 text-[#C0C0B8]" />
                      </div>
                      <p className="font-ibm-plex-mono text-[8px] uppercase tracking-widest text-[#C0C0B8]">Image Pending</p>
                    </div>
                  )}
                  {att.part_number && (
                    <div className="absolute top-2 right-2 bg-white border border-[#E8E8E4] px-2 py-0.5">
                      <span className="font-ibm-plex-mono text-[8px] text-[#888]">{att.part_number}</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-light text-[15px] text-[#0A0A0A] mb-1.5 leading-snug group-hover:text-alkota-orange transition-colors">
                    {att.name}
                  </h3>
                  {att.tagline && (
                    <p className="font-normal text-[11px] text-[#888] leading-relaxed mb-3">{att.tagline}</p>
                  )}

                  {/* Spec chips */}
                  <div className="flex gap-2 flex-wrap mb-4">
                    {att.ratings.pressure_max_bar && (
                      <span className="font-ibm-plex-mono text-[8px] uppercase bg-[#F7F7F4] text-[#888] px-2 py-1">
                        {att.ratings.pressure_max_bar} BAR
                      </span>
                    )}
                    {att.ratings.temperature_max_c && (
                      <span className="font-ibm-plex-mono text-[8px] uppercase bg-[#F7F7F4] text-[#888] px-2 py-1">
                        {att.ratings.temperature_max_c}°C
                      </span>
                    )}
                    {att.ratings.hose_length_m && (
                      <span className="font-ibm-plex-mono text-[8px] uppercase bg-[#F7F7F4] text-[#888] px-2 py-1">
                        {att.ratings.hose_length_m}M
                      </span>
                    )}
                    {att.ratings.working_width_mm && (
                      <span className="font-ibm-plex-mono text-[8px] uppercase bg-[#F7F7F4] text-[#888] px-2 py-1">
                        {att.ratings.working_width_mm}MM
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-light text-[15px] text-[#0A0A0A]">
                      {att.price ? `£${att.price.toFixed(2)}` : 'POA'}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-[#D5D5D0] group-hover:text-alkota-orange group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ── RELATED APPLICATIONS ─────────────────────────────────────────────── */}
      {relatedApplications.length > 0 && (
        <section className="border-t border-[#E8E8E4] bg-[#F7F7F4] py-16">
          <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24">
            <h2 className="font-extralight text-[28px] text-[#0A0A0A] mb-8">Related applications.</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedApplications.map((app) => (
                <Link
                  key={app.id}
                  href={`/attachments?application=${app.id}`}
                  className="group border border-[#E8E8E4] bg-white hover:border-alkota-orange p-5 transition-all"
                >
                  <h4 className="font-light text-[14px] text-[#0A0A0A] group-hover:text-alkota-orange transition-colors mb-1">{app.title}</h4>
                  <p className="font-normal text-[11px] text-[#888] leading-relaxed line-clamp-2">{app.shortDesc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── BOTTOM NAV ───────────────────────────────────────────────────────── */}
      <section className="border-t border-[#E8E8E4] py-10">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24 flex items-center justify-between">
          <Link href="/attachments" className="inline-flex items-center gap-2 font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#888] hover:text-alkota-orange transition-colors">
            <ArrowLeft className="h-3 w-3" /> All Attachments
          </Link>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-alkota-orange text-white px-5 py-3 font-ibm-plex-mono text-[9px] uppercase tracking-widest hover:bg-[#e55f00] transition-colors">
            Speak to an engineer <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </section>
    </main>
  );
}
