import Link from 'next/link';
import { ArrowRight, Zap, Thermometer, Droplets, AlertTriangle, CheckCircle, Info, PhoneCall } from 'lucide-react';
import {
  VERIFIED_ATTACHMENTS,
  ATTACHMENT_APPLICATIONS,
  ATTACHMENT_CATEGORIES,
} from '@/lib/attachments/seed-data';
import type { AttachmentApplicationDef, AttachmentCategoryDef } from '@/lib/types/attachments';

export const metadata = {
  title: 'Attachments & Accessories | Alkota UK',
  description:
    'Extend the capability of your Alkota pressure washer system. Surface cleaners, foam lances, hose reels, telescopic lances, drain jetters, and specialist industrial cleaning attachments — matched to your machine and application.'
};

// ─── STATIC DATA ──────────────────────────────────────────────────────────────

const FEATURED_APPLICATIONS = ATTACHMENT_APPLICATIONS.filter((a) =>
  [
    'surface_cleaning',
    'chemical_foam_application',
    'drain_pipe_cleaning',
    'long_reach_height',
    'hose_management',
    'water_recovery'
  ].includes(a.id)
);

const FEATURED_ATTACHMENTS = VERIFIED_ATTACHMENTS.filter((a) => a.featured && a.active);

const STAT_FIGURES = [
  { figure: '11', label: 'attachment categories', sub: 'Surface to drain to foam' },
  { figure: '4+', label: 'machine families', sub: 'Compatibility checked' },
  { figure: '150°C', label: 'max temperature rating', sub: 'Hot water compatible' },
  { figure: '345', label: 'BAR pressure rating', sub: 'Matched to Alkota output' }
];

// ─── COMPATIBILITY COLOUR LEGEND ──────────────────────────────────────────────

function CompatibilityBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; color: string; bg: string }> = {
    compatible:        { label: 'Compatible',       color: '#22C55E', bg: 'rgba(34,197,94,0.08)' },
    requires_adapter:  { label: 'Adapter Required', color: '#F59E0B', bg: 'rgba(245,158,11,0.08)' },
    technical_review:  { label: 'Verify First',     color: '#3B82F6', bg: 'rgba(59,130,246,0.08)' },
    not_compatible:    { label: 'Not Compatible',   color: '#EF4444', bg: 'rgba(239,68,68,0.08)' }
  };
  const def = map[status] ?? map['technical_review'];
  return (
    <span
      className="font-ibm-plex-mono text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-sm"
      style={{ color: def.color, background: def.bg, border: `1px solid ${def.color}22` }}
    >
      {def.label}
    </span>
  );
}

// ─── COMPONENT: APPLICATION CARD ─────────────────────────────────────────────

function ApplicationCard({ app }: { app: AttachmentApplicationDef }) {
  const count = VERIFIED_ATTACHMENTS.filter((a) =>
    a.applications.includes(app.id as any)
  ).length;
  return (
    <Link
      href={`/attachments?application=${app.id}`}
      className="group block border border-[#E8E8E4] bg-white hover:border-alkota-orange hover:shadow-lg transition-all duration-300 p-7"
    >
      <div className="flex items-start justify-between mb-4">
        <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#B0AFA8]">
          {count} attachment{count !== 1 ? 's' : ''}
        </span>
        <ArrowRight className="h-4 w-4 text-[#D5D5D0] group-hover:text-alkota-orange group-hover:translate-x-1 transition-all" />
      </div>
      <h3 className="font-light text-[20px] text-[#0A0A0A] mb-2 leading-tight group-hover:text-alkota-orange transition-colors">
        {app.title}
      </h3>
      <p className="font-normal text-[13px] text-[#6B6B62] leading-relaxed">
        {app.shortDesc}
      </p>
    </Link>
  );
}

// ─── COMPONENT: CATEGORY CHIP ─────────────────────────────────────────────────

function CategoryChip({ cat }: { cat: AttachmentCategoryDef }) {
  const count = VERIFIED_ATTACHMENTS.filter((a) => a.category === cat.slug && a.active).length;
  return (
    <Link
      href={`/attachments/category/${cat.slug}`}
      className="group flex items-center justify-between border border-[#E8E8E4] bg-white hover:border-alkota-orange px-5 py-4 transition-all"
    >
      <div>
        <p className="font-light text-[14px] text-[#0A0A0A] group-hover:text-alkota-orange transition-colors">{cat.name}</p>
        <p className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#B0AFA8] mt-0.5">{cat.shortDesc.slice(0, 60)}…</p>
      </div>
      <div className="flex items-center gap-3 ml-4 flex-shrink-0">
        <span className="font-ibm-plex-mono text-[10px] text-[#B0AFA8]">{count}</span>
        <ArrowRight className="h-3.5 w-3.5 text-[#D5D5D0] group-hover:text-alkota-orange group-hover:translate-x-1 transition-all" />
      </div>
    </Link>
  );
}

// ─── COMPONENT: FEATURED ATTACHMENT CARD ─────────────────────────────────────

function FeaturedAttachmentCard({ att }: { att: (typeof VERIFIED_ATTACHMENTS)[0] }) {
  const cat = ATTACHMENT_CATEGORIES.find((c) => c.slug === att.category);
  const hasRatings = att.ratings;
  return (
    <Link
      href={`/attachments/${att.slug}`}
      className="group block border border-[#E8E8E4] bg-white hover:border-alkota-orange hover:shadow-lg transition-all duration-300"
    >
      {/* Image area */}
      <div className="h-48 bg-[#F7F7F4] border-b border-[#E8E8E4] flex items-center justify-center relative overflow-hidden">
        {att.image_url ? (
          <img src={att.image_url} alt={att.name} className="h-full w-full object-cover" />
        ) : (
          <div className="text-center">
            <div className="w-12 h-12 border border-[#D5D5D0] rounded-sm mx-auto mb-2 flex items-center justify-center">
              <Zap className="h-5 w-5 text-[#B0AFA8]" />
            </div>
            <p className="font-ibm-plex-mono text-[8px] uppercase tracking-widest text-[#C0C0B8]">Product Image</p>
          </div>
        )}
        {att.part_number && (
          <div className="absolute top-3 right-3 bg-white border border-[#E8E8E4] px-2 py-1">
            <span className="font-ibm-plex-mono text-[8px] uppercase tracking-widest text-[#888]">{att.part_number}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange">
          {cat?.name ?? att.category}
        </span>
        <h3 className="font-light text-[16px] text-[#0A0A0A] mt-2 mb-2 leading-snug group-hover:text-alkota-orange transition-colors">
          {att.name}
        </h3>
        {att.tagline && (
          <p className="font-normal text-[12px] text-[#6B6B62] leading-relaxed mb-4">{att.tagline}</p>
        )}

        {/* Key specs row */}
        <div className="flex gap-3 flex-wrap mb-4">
          {hasRatings.pressure_max_bar && (
            <span className="font-ibm-plex-mono text-[9px] uppercase text-[#888] bg-[#F7F7F4] px-2 py-1">
              ↑ {hasRatings.pressure_max_bar} BAR
            </span>
          )}
          {hasRatings.temperature_max_c && (
            <span className="font-ibm-plex-mono text-[9px] uppercase text-[#888] bg-[#F7F7F4] px-2 py-1">
              {hasRatings.temperature_max_c}°C MAX
            </span>
          )}
          {hasRatings.hose_length_m && (
            <span className="font-ibm-plex-mono text-[9px] uppercase text-[#888] bg-[#F7F7F4] px-2 py-1">
              {hasRatings.hose_length_m}M
            </span>
          )}
          {hasRatings.working_width_mm && (
            <span className="font-ibm-plex-mono text-[9px] uppercase text-[#888] bg-[#F7F7F4] px-2 py-1">
              {hasRatings.working_width_mm}MM WIDE
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <span className="font-light text-[16px] text-[#0A0A0A]">
            {att.price ? `£${att.price.toFixed(2)}` : 'Price on Application'}
          </span>
          <ArrowRight className="h-4 w-4 text-[#D5D5D0] group-hover:text-alkota-orange group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </Link>
  );
}

// ─── COMPONENT: COMPATIBILITY MATRIX (SIMPLIFIED) ────────────────────────────

function CompatibilityMatrix() {
  const machines = ['alkota-430xh', 'alkota-4358', 'alkota-216x4', 'alkota-5305a'];
  const machineNames: Record<string, string> = {
    'alkota-430xh': '430XH Hot',
    'alkota-4358':  '4358',
    'alkota-216x4': '216X4',
    'alkota-5305a': '5305A Cold'
  };
  const displayAtts = FEATURED_ATTACHMENTS.slice(0, 5);

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[600px] border-collapse">
        <thead>
          <tr>
            <th className="text-left p-3 font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#888] border-b border-[#E8E8E4] bg-[#F7F7F4]">Attachment</th>
            {machines.map((m) => (
              <th key={m} className="text-center p-3 font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#888] border-b border-[#E8E8E4] bg-[#F7F7F4]">
                {machineNames[m]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {displayAtts.map((att, i) => (
            <tr key={att.id} style={{ background: i % 2 === 0 ? '#FFFFFF' : '#F7F7F4' }}>
              <td className="p-3 border-b border-[#E8E8E4]">
                <Link href={`/attachments/${att.slug}`} className="font-normal text-[12px] text-[#0A0A0A] hover:text-alkota-orange transition-colors">
                  {att.name.length > 40 ? att.name.slice(0, 40) + '…' : att.name}
                </Link>
              </td>
              {machines.map((m) => {
                const compat = att.compatible_machines?.find((c) => c.machine_slug === m);
                return (
                  <td key={m} className="p-3 border-b border-[#E8E8E4] text-center">
                    {compat ? (
                      <span title={compat.notes}>
                        <CompatibilityBadge status={compat.status} />
                      </span>
                    ) : (
                      <span className="font-ibm-plex-mono text-[9px] text-[#D5D5D0]">—</span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#B0AFA8] mt-3">
        ↑ Compatibility data is verified against Alkota machine ratings. Always confirm against your specific machine specification sheet. Contact us for non-listed models.
      </p>
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function AttachmentsPage() {
  return (
    <main className="bg-[#FDFDFC] text-[#0A0A0A]">

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-end bg-[#0A0A0A] overflow-hidden">
        {/* Background texture overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(ellipse at 20% 60%, rgba(255,105,0,0.06) 0%, transparent 60%),
                              radial-gradient(ellipse at 80% 20%, rgba(255,255,255,0.02) 0%, transparent 50%)`,
          }}
        />

        {/* Large background letterform */}
        <div
          className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
          aria-hidden="true"
        >
          <span
            className="font-extralight text-white select-none"
            style={{
              fontSize: 'clamp(200px, 35vw, 520px)',
              opacity: 0.025,
              letterSpacing: '-0.06em',
              lineHeight: 1
            }}
          >
            A+
          </span>
        </div>

        {/* Hero content */}
        <div className="relative z-10 px-8 md:px-16 lg:px-24 pb-24 pt-48">
          <p className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.25em] text-[#FF6900] mb-6">
            Alkota UK — Attachments &amp; Accessories
          </p>
          <h1
            className="font-extralight text-white leading-none mb-8"
            style={{ fontSize: 'clamp(44px, 6vw, 96px)' }}
          >
            What do you need<br />
            the machine<br />
            <em className="not-italic text-[#FF6900]">to do?</em>
          </h1>
          <p className="font-normal text-[16px] text-[#9A9A92] max-w-[520px] leading-relaxed mb-10">
            Alkota machines perform at a higher level when paired with the right attachment. Start with the cleaning task — not the component.
          </p>

          {/* Stats bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px border border-[#222] bg-[#222] mb-10 max-w-[680px]">
            {STAT_FIGURES.map((s) => (
              <div key={s.label} className="bg-[#0A0A0A] px-5 py-4">
                <div className="font-extralight text-[28px] text-white leading-none mb-1">{s.figure}</div>
                <div className="font-ibm-plex-mono text-[8px] uppercase tracking-widest text-[#555]">{s.label}</div>
                <div className="font-ibm-plex-mono text-[8px] text-[#333] mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href="#applications"
              className="inline-flex items-center gap-2 bg-[#FF6900] text-white px-8 py-4 font-ibm-plex-mono text-[10px] uppercase tracking-widest hover:bg-white hover:text-[#0A0A0A] transition-colors"
            >
              Start with the task <ArrowRight className="h-3.5 w-3.5" />
            </a>
            <a
              href="#all-attachments"
              className="inline-flex items-center gap-2 border border-[#333] text-[#9A9A92] px-8 py-4 font-ibm-plex-mono text-[10px] uppercase tracking-widest hover:border-white hover:text-white transition-colors"
            >
              Browse all categories
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-8 md:right-16 flex flex-col items-center gap-2">
          <div className="w-px h-16 bg-gradient-to-b from-[#333] to-transparent" />
          <span className="font-ibm-plex-mono text-[8px] uppercase tracking-widest text-[#444] rotate-90 origin-center mt-4">
            Scroll
          </span>
        </div>
      </section>

      {/* ── PHILOSOPHY BAR ───────────────────────────────────────────────────── */}
      <section className="border-b border-[#E8E8E4] bg-[#F7F7F4]">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 border border-alkota-orange flex items-center justify-center flex-shrink-0 mt-0.5">
                <Zap className="h-4 w-4 text-alkota-orange" />
              </div>
              <div>
                <h3 className="font-light text-[15px] text-[#0A0A0A] mb-1">Matched to Your Machine</h3>
                <p className="font-normal text-[12px] text-[#6B6B62] leading-relaxed">Every attachment shows verified compatibility against Alkota machine ratings — not generic "fits all" claims.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 border border-alkota-orange flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle className="h-4 w-4 text-alkota-orange" />
              </div>
              <div>
                <h3 className="font-light text-[15px] text-[#0A0A0A] mb-1">Technically Honest</h3>
                <p className="font-normal text-[12px] text-[#6B6B62] leading-relaxed">Incompatible configurations are explained — not hidden. Pressure, flow, and temperature limits are clearly stated.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 border border-alkota-orange flex items-center justify-center flex-shrink-0 mt-0.5">
                <Info className="h-4 w-4 text-alkota-orange" />
              </div>
              <div>
                <h3 className="font-light text-[15px] text-[#0A0A0A] mb-1">Application-Led Discovery</h3>
                <p className="font-normal text-[12px] text-[#6B6B62] leading-relaxed">Start with what you need the machine to do. Let the cleaning task lead you to the right attachment — not the other way around.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── APPLICATION SELECTOR ─────────────────────────────────────────────── */}
      <section id="applications" className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24 py-24">
        <div className="mb-14">
          <p className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.2em] text-alkota-orange mb-3">
            Start Here
          </p>
          <h2 className="font-extralight text-[38px] md:text-[52px] text-[#0A0A0A] leading-none mb-4">
            Choose the cleaning task.
          </h2>
          <p className="font-normal text-[15px] text-[#6B6B62] max-w-[560px]">
            Select what you need the pressure washer to do and we will show you the attachments and accessories that extend that capability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURED_APPLICATIONS.map((app) => (
            <ApplicationCard key={app.id} app={app} />
          ))}
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/attachments?application=all"
            className="inline-flex items-center gap-2 border border-[#D5D5D0] bg-white text-[#0A0A0A] px-6 py-3 font-ibm-plex-mono text-[10px] uppercase tracking-widest hover:border-alkota-orange hover:text-alkota-orange transition-all"
          >
            All application types <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </section>

      {/* ── FEATURED ATTACHMENTS ─────────────────────────────────────────────── */}
      <section className="bg-[#F7F7F4] border-y border-[#E8E8E4] py-24">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24">
          <div className="mb-14">
            <p className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.2em] text-alkota-orange mb-3">
              Selected Attachments
            </p>
            <h2 className="font-extralight text-[38px] md:text-[48px] text-[#0A0A0A] leading-none">
              Frequently specified.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {FEATURED_ATTACHMENTS.map((att) => (
              <FeaturedAttachmentCard key={att.id} att={att} />
            ))}
          </div>

          <div className="text-center">
            <Link
              href="#all-attachments"
              className="inline-flex items-center gap-2 border border-[#D5D5D0] bg-white text-[#0A0A0A] px-6 py-3 font-ibm-plex-mono text-[10px] uppercase tracking-widest hover:border-alkota-orange hover:text-alkota-orange transition-all"
            >
              View all attachments <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── MACHINE COMPATIBILITY MATRIX ─────────────────────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 items-start">
          <div>
            <p className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.2em] text-alkota-orange mb-3">
              Compatibility
            </p>
            <h2 className="font-extralight text-[38px] md:text-[44px] text-[#0A0A0A] leading-none mb-5">
              Which machines<br />work with which<br />attachments?
            </h2>
            <p className="font-normal text-[13px] text-[#6B6B62] leading-relaxed mb-6">
              Attachment compatibility depends on working pressure, flow rate, temperature rating, and connection standard. This matrix shows a snapshot of verified matches across our main machine families.
            </p>

            {/* Legend */}
            <div className="space-y-2">
              {[
                { status: 'compatible', desc: 'Direct fit, no adapter required.' },
                { status: 'requires_adapter', desc: 'Adapter or conversion fitting needed.' },
                { status: 'technical_review', desc: 'Verify against your specific machine spec.' },
                { status: 'not_compatible', desc: 'Ratings exceed or fall below machine capability.' }
              ].map(({ status, desc }) => (
                <div key={status} className="flex items-center gap-3">
                  <CompatibilityBadge status={status} />
                  <span className="font-normal text-[11px] text-[#888]">{desc}</span>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-[#D5D5D0] text-[#0A0A0A] px-5 py-3 font-ibm-plex-mono text-[10px] uppercase tracking-widest hover:border-alkota-orange hover:text-alkota-orange transition-all"
              >
                <PhoneCall className="h-3.5 w-3.5" /> Ask us about your machine
              </Link>
            </div>
          </div>

          <div className="border border-[#E8E8E4] bg-white p-8">
            <CompatibilityMatrix />
          </div>
        </div>
      </section>

      {/* ── DARK EDITORIAL: SYSTEM THINKING ─────────────────────────────────── */}
      <section className="bg-[#0A0A0A] border-y border-[#1A1A1A] py-24">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.2em] text-[#FF6900] mb-4">
                System Thinking
              </p>
              <h2 className="font-extralight text-white leading-none mb-6" style={{ fontSize: 'clamp(32px, 3.5vw, 56px)' }}>
                An attachment is only<br />as capable as the<br />machine behind it.
              </h2>
              <p className="font-normal text-[14px] text-[#6B6B62] leading-relaxed mb-6">
                Matching a 24-inch surface cleaner to an under-specified cold machine produces disappointing results. The shroud needs sufficient flow to spin the arm — not just sufficient pressure to reach the nozzle.
              </p>
              <p className="font-normal text-[14px] text-[#6B6B62] leading-relaxed mb-8">
                Alkota UK publishes minimum flow and pressure requirements for every attachment. If your machine does not meet the threshold, we will tell you — and discuss what a more capable machine would enable.
              </p>
              <div className="grid grid-cols-3 gap-px border border-[#1E1E1E] bg-[#1E1E1E]">
                {[
                  { icon: <Zap className="h-4 w-4" />, label: 'Pressure', sub: 'BAR at the nozzle' },
                  { icon: <Droplets className="h-4 w-4" />, label: 'Flow', sub: 'L/min at working pressure' },
                  { icon: <Thermometer className="h-4 w-4" />, label: 'Temperature', sub: '°C at the outlet' }
                ].map((item) => (
                  <div key={item.label} className="bg-[#0A0A0A] px-5 py-5 text-center">
                    <div className="text-[#FF6900] flex justify-center mb-2">{item.icon}</div>
                    <div className="font-light text-[13px] text-white mb-0.5">{item.label}</div>
                    <div className="font-ibm-plex-mono text-[8px] text-[#444] uppercase tracking-wider">{item.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical callout */}
            <div className="space-y-4">
              <div className="border border-[#1E1E1E] p-6">
                <div className="flex items-start gap-3 mb-3">
                  <AlertTriangle className="h-4 w-4 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                  <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#F59E0B]">Insufficient Flow</span>
                </div>
                <p className="font-normal text-[12px] text-[#6B6B62] leading-relaxed">A surface cleaner arm that does not spin consistently leaves streak patterns and dramatically increases cleaning time. This is always a flow (LPM) issue — not a pressure (BAR) issue.</p>
              </div>
              <div className="border border-[#1E1E1E] p-6">
                <div className="flex items-start gap-3 mb-3">
                  <AlertTriangle className="h-4 w-4 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                  <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#F59E0B]">Undersized Drain Jetter</span>
                </div>
                <p className="font-normal text-[12px] text-[#6B6B62] leading-relaxed">A drain jetter hose used below its minimum working pressure will not self-propel reliably. The rear jets provide the thrust — insufficient pressure means the hose will not advance into the drain.</p>
              </div>
              <div className="border border-[#1E1E1E] p-6">
                <div className="flex items-start gap-3 mb-3">
                  <CheckCircle className="h-4 w-4 text-[#22C55E] flex-shrink-0 mt-0.5" />
                  <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#22C55E]">How We Handle It</span>
                </div>
                <p className="font-normal text-[12px] text-[#6B6B62] leading-relaxed">Each attachment detail page shows the minimum machine rating required. If your machine falls below, we flag it — and explain why. There are no hidden incompatibilities on Alkota UK.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ALL CATEGORIES ───────────────────────────────────────────────────── */}
      <section id="all-attachments" className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24 py-24">
        <div className="mb-14">
          <p className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.2em] text-alkota-orange mb-3">
            Browse by Category
          </p>
          <h2 className="font-extralight text-[38px] md:text-[48px] text-[#0A0A0A] leading-none">
            All attachment families.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {ATTACHMENT_CATEGORIES.filter((c) =>
            VERIFIED_ATTACHMENTS.some((a) => a.category === c.slug && a.active)
          ).map((cat) => (
            <CategoryChip key={cat.slug} cat={cat} />
          ))}
        </div>
      </section>

      {/* ── HOSE & SPRAY SYSTEMS ─────────────────────────────────────────────── */}
      <section className="bg-[#F7F7F4] border-y border-[#E8E8E4] py-24">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-16 items-start">
            <div>
              <p className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.2em] text-alkota-orange mb-3">
                Hose & Spray Systems
              </p>
              <h2 className="font-extralight text-[38px] md:text-[48px] text-[#0A0A0A] leading-none mb-5">
                Get the water where<br />it needs to go.
              </h2>
              <p className="font-normal text-[14px] text-[#6B6B62] leading-relaxed max-w-[520px] mb-8">
                Hoses, reels, and spray patterns are often treated as commodity items. They are not. The wrong hose length increases pressure drop. The wrong nozzle orifice changes your working pressure. The wrong reel prevents safe large-area operation. We stock the right components, correctly specified for the Alkota range.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { title: 'High-Pressure Hoses', href: '/attachments/category/hoses', desc: 'Single and double-braided HP hoses, hot water rated, correct bore.' },
                  { title: 'Hose Reels', href: '/attachments/category/hose-reels', desc: 'Spring-return reels, motorised, and wall-mount for safe controlled deployment.' },
                  { title: 'Trigger Guns', href: '/attachments/category/trigger-guns', desc: 'Industrial guns — 150°C and 345 BAR rated for continuous commercial use.' },
                  { title: 'Nozzle Sets', href: '/attachments/category/nozzles', desc: '0° through 40° colour-coded, quick-connect, hardened stainless insert.' }
                ].map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="group border border-[#E8E8E4] bg-white hover:border-alkota-orange p-5 transition-all"
                  >
                    <h4 className="font-light text-[14px] text-[#0A0A0A] group-hover:text-alkota-orange transition-colors mb-1">{item.title}</h4>
                    <p className="font-normal text-[11px] text-[#888] leading-relaxed">{item.desc}</p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Spec note */}
            <div className="border border-[#E8E8E4] bg-white p-8">
              <h4 className="font-light text-[16px] text-[#0A0A0A] mb-4">Nozzle Sizing</h4>
              <p className="font-normal text-[12px] text-[#6B6B62] leading-relaxed mb-5">
                Nozzle orifice size directly determines your working pressure at a given flow. Using an oversized orifice drops pressure; an undersized orifice increases pressure beyond machine rating. Alkota UK provides orifice selection guidance for each machine.
              </p>
              <div className="border-t border-[#E8E8E4] pt-4">
                <p className="font-ibm-plex-mono text-[8px] uppercase tracking-widest text-[#B0AFA8] mb-2">Formula</p>
                <p className="font-ibm-plex-mono text-[11px] text-[#333]">
                  Pressure ∝ Flow² / Orifice Area
                </p>
                <p className="font-normal text-[11px] text-[#888] mt-2">Doubling the flow quadruples the pressure impact on a fixed orifice. Always verify against machine specification.</p>
              </div>
              <div className="mt-6">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-alkota-orange text-white px-5 py-3 font-ibm-plex-mono text-[9px] uppercase tracking-widest hover:bg-[#e55f00] transition-colors w-full justify-center"
                >
                  Get nozzle sizing help
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOAM & CHEMICAL CONNECTION ────────────────────────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Editorial block */}
          <div className="border border-[#E8E8E4] bg-[#F7F7F4] p-10 relative overflow-hidden">
            <div
              className="absolute -right-8 -top-8 font-extralight text-[#E8E8E4] select-none pointer-events-none"
              style={{ fontSize: '120px', lineHeight: 1 }}
              aria-hidden="true"
            >
              F
            </div>
            <div className="relative z-10">
              <p className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.2em] text-alkota-orange mb-3">Foam & Chemistry</p>
              <h3 className="font-extralight text-[32px] text-[#0A0A0A] leading-tight mb-4">
                Chemistry becomes effective when it makes full contact.
              </h3>
              <p className="font-normal text-[13px] text-[#6B6B62] leading-relaxed mb-5">
                Foam lances slow the runoff rate of detergent — maximising dwell time against contaminated surfaces before the high-pressure rinse. They are not optional extras. They are part of a correctly configured two-stage wash process.
              </p>
              <p className="font-normal text-[13px] text-[#6B6B62] leading-relaxed mb-6">
                Alkota foam lance systems are verified compatible with the Hydrus chemical range — dilution ratio, detergent chemistry, and foam generation rate confirmed.
              </p>
              <div className="flex gap-3">
                <Link
                  href="/attachments/professional-foam-lance-1l"
                  className="inline-flex items-center gap-2 bg-alkota-orange text-white px-5 py-3 font-ibm-plex-mono text-[9px] uppercase tracking-widest hover:bg-[#e55f00] transition-colors"
                >
                  Foam lances <ArrowRight className="h-3 w-3" />
                </Link>
                <Link
                  href="/chemicals"
                  className="inline-flex items-center gap-2 border border-[#D5D5D0] text-[#0A0A0A] px-5 py-3 font-ibm-plex-mono text-[9px] uppercase tracking-widest hover:border-alkota-orange hover:text-alkota-orange transition-all"
                >
                  Hydrus chemistry
                </Link>
              </div>
            </div>
          </div>

          <div>
            <p className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.2em] text-alkota-orange mb-3">
              Drain & Pipe Cleaning
            </p>
            <h2 className="font-extralight text-[38px] md:text-[44px] text-[#0A0A0A] leading-none mb-5">
              Your machine<br />is already a drain<br />jetter.
            </h2>
            <p className="font-normal text-[14px] text-[#6B6B62] leading-relaxed mb-5">
              Most commercial Alkota pressure washers produce sufficient pressure to self-propel a drain jetter hose into blocked commercial drains and yard gullies. A 25-metre drain jetter hose converts your existing machine into a commercial drain-maintenance tool.
            </p>
            <p className="font-normal text-[13px] text-[#6B6B62] leading-relaxed mb-6 border-l-2 border-alkota-orange pl-4">
              Minimum requirement: 120 BAR at 8+ LPM. Most hot water Alkota machines exceed this. Always verify against your machine specification sheet before purchase.
            </p>
            <Link
              href="/attachments/25m-commercial-drain-jetter-hose"
              className="inline-flex items-center gap-2 border border-[#D5D5D0] text-[#0A0A0A] px-6 py-3 font-ibm-plex-mono text-[10px] uppercase tracking-widest hover:border-alkota-orange hover:text-alkota-orange transition-all"
            >
              Commercial drain jetter hose <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── WATER RECOVERY BRIDGE ────────────────────────────────────────────── */}
      <section className="bg-[#0A0A0A] py-24 border-y border-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-16 items-center">
            <div>
              <p className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.2em] text-[#FF6900] mb-3">
                Effluent Compliance
              </p>
              <h2 className="font-extralight text-white leading-none mb-5" style={{ fontSize: 'clamp(32px, 3.5vw, 52px)' }}>
                Water recovery<br />is no longer optional<br />on most commercial sites.
              </h2>
              <p className="font-normal text-[14px] text-[#6B6B62] leading-relaxed mb-5">
                The Environment Agency requires wash water capture and appropriate disposal on many commercial wash bay installations. Surface recovery attachments capture and contain water at point of origin — before it reaches gullies, drains, or surface water courses.
              </p>
              <p className="font-normal text-[13px] text-[#6B6B62] leading-relaxed mb-8">
                Alkota UK water recovery surface cleaners integrate with compatible vacuum recovery systems and closed-loop wash water recycling equipment from the Alkota Water Treatment range.
              </p>
              <div className="flex gap-3">
                <Link
                  href="/attachments/category/water-recovery"
                  className="inline-flex items-center gap-2 bg-[#FF6900] text-white px-7 py-3 font-ibm-plex-mono text-[10px] uppercase tracking-widest hover:bg-white hover:text-[#0A0A0A] transition-colors"
                >
                  Recovery attachments <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href="/water-treatment"
                  className="inline-flex items-center gap-2 border border-[#333] text-[#9A9A92] px-7 py-3 font-ibm-plex-mono text-[10px] uppercase tracking-widest hover:border-white hover:text-white transition-colors"
                >
                  Water treatment systems
                </Link>
              </div>
            </div>

            {/* Compliance callout */}
            <div className="border border-[#1E1E1E] p-8">
              <p className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#555] mb-5">Regulatory Context (UK)</p>
              <div className="space-y-4">
                {[
                  { body: 'Environment Agency', rule: 'Wash water from vehicle washing must not enter surface water drains — Environmental Permitting Regulations 2016.' },
                  { body: 'Water Industry Act 1991', rule: 'Discharge to foul sewer requires trade effluent consent from the water company.' },
                  { body: 'Local Authority', rule: 'Planning conditions on commercial wash bays often mandate wash water capture.' }
                ].map((item) => (
                  <div key={item.body} className="border-b border-[#1A1A1A] pb-4 last:border-0 last:pb-0">
                    <p className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#FF6900] mb-1">{item.body}</p>
                    <p className="font-normal text-[11px] text-[#555] leading-relaxed">{item.rule}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-4 border-t border-[#1A1A1A]">
                <p className="font-ibm-plex-mono text-[8px] uppercase tracking-widest text-[#333]">
                  // This is general information only. Consult your local authority and water company before installation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CAN'T FIND THE RIGHT SETUP ───────────────────────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.2em] text-alkota-orange mb-3">
              Not Finding It?
            </p>
            <h2 className="font-extralight text-[38px] md:text-[48px] text-[#0A0A0A] leading-none mb-5">
              Can't find the<br />right setup?
            </h2>
            <p className="font-normal text-[14px] text-[#6B6B62] leading-relaxed mb-4">
              Not every configuration is in the catalogue. If you have a specialist application, a non-standard machine, or a requirement that needs a custom attachment specification — contact us.
            </p>
            <p className="font-normal text-[13px] text-[#6B6B62] leading-relaxed">
              Alkota UK can source attachments for specialist industrial applications not listed on this site. Describe the cleaning problem, not the part you think you need.
            </p>
          </div>

          {/* Enquiry form panel */}
          <div className="border border-[#E8E8E4] bg-[#F7F7F4] p-8">
            <p className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#B0AFA8] mb-5">Specialist Enquiry</p>
            <form action="/api/attachments/enquiry" method="POST" className="space-y-4">
              <div>
                <label className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#888] block mb-1.5">What do you need the machine to do?</label>
                <textarea
                  name="task_description"
                  rows={4}
                  className="w-full border border-[#E8E8E4] bg-white px-4 py-3 font-normal text-[13px] text-[#0A0A0A] resize-none focus:outline-none focus:border-alkota-orange transition-colors"
                  placeholder="Describe the cleaning application, surface, contamination type…"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#888] block mb-1.5">Your Machine (if known)</label>
                  <input
                    type="text"
                    name="machine_model"
                    className="w-full border border-[#E8E8E4] bg-white px-4 py-3 font-normal text-[13px] text-[#0A0A0A] focus:outline-none focus:border-alkota-orange transition-colors"
                    placeholder="e.g. Alkota 430XH"
                  />
                </div>
                <div>
                  <label className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#888] block mb-1.5">Contact Name</label>
                  <input
                    type="text"
                    name="contact_name"
                    className="w-full border border-[#E8E8E4] bg-white px-4 py-3 font-normal text-[13px] text-[#0A0A0A] focus:outline-none focus:border-alkota-orange transition-colors"
                    placeholder="Your name"
                  />
                </div>
              </div>
              <div>
                <label className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#888] block mb-1.5">Email or Phone</label>
                <input
                  type="text"
                  name="contact_detail"
                  className="w-full border border-[#E8E8E4] bg-white px-4 py-3 font-normal text-[13px] text-[#0A0A0A] focus:outline-none focus:border-alkota-orange transition-colors"
                  placeholder="How to reach you"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-alkota-orange text-white py-3 font-ibm-plex-mono text-[10px] uppercase tracking-widest hover:bg-[#e55f00] transition-colors"
              >
                Send Enquiry
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ── PARTS & SERVICE BRIDGE ───────────────────────────────────────────── */}
      <section className="border-t border-[#E8E8E4] bg-[#F7F7F4] py-16">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                label: 'Genuine Parts',
                desc: 'OEM replacement components, exploded schematics, and service kit bundles for Alkota machines.',
                href: '/parts',
                cta: 'Parts & Spares'
              },
              {
                label: 'Alkota Chemistry',
                desc: 'Verified detergents, degreasers, and sanitisers matched to machine type, temperature, and application.',
                href: '/chemicals',
                cta: 'Chemical Range'
              },
              {
                label: 'Talk to Us',
                desc: 'Describe the cleaning problem. We will recommend the right machine, attachment, and chemistry combination.',
                href: '/contact',
                cta: 'Contact Alkota UK'
              }
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group block border border-[#E8E8E4] bg-white hover:border-alkota-orange p-7 transition-all"
              >
                <p className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange mb-2">{item.label}</p>
                <p className="font-normal text-[13px] text-[#6B6B62] leading-relaxed mb-5">{item.desc}</p>
                <span className="inline-flex items-center gap-2 font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#0A0A0A] group-hover:text-alkota-orange transition-colors">
                  {item.cta} <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
