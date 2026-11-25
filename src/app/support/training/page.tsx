import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowRight, GraduationCap, Wrench, ShieldCheck, Flame, Users } from 'lucide-react';

export const metadata = {
  title: 'Alkota Service School & Operator Training | Alkota UK',
  description:
    'Official Alkota operator safety training, wash bay management courses, and Alkota Service School technical certification for UK fleet and dealer engineers.',
  alternates: { canonical: 'https://alkota.co.uk/support/training' },
};

const COURSES = [
  {
    code: 'OP-101',
    title: 'Safe Operation of High-Pressure Hot Water & Steam Systems',
    format: 'On-Site (Half-Day)',
    audience: 'Daily Operators & Fleet Teams',
    summary:
      'Covers daily pre-start checks, trigger gun safety, nozzle selection, chemical metering, thermal shock prevention, and emergency shutdown procedures.',
    href: '/contact?topic=operator-training',
    cta: 'Request Training Dates',
  },
  {
    code: 'WB-201',
    title: 'Industrial Wash Bay & Effluent Compliance Management',
    format: 'Hybrid / On-Site (1 Day)',
    audience: 'Facility & HSE Managers',
    summary:
      'Focuses on WRAS Category 5 backflow protection, Environment Agency trade effluent compliance, oil-water separator maintenance, and PPM scheduling.',
    href: '/contact?topic=wash-bay-training',
    cta: 'Request Course Syllabus',
  },
  {
    code: 'SS-301',
    title: 'Alkota Service School — Technical Diagnostics & Repair',
    format: 'Workshop Intensive (2 Days)',
    audience: 'Maintenance & Dealer Engineers',
    summary:
      'Hands-on technical certification covering triplex ceramic pump overhauls, down-draft burner combustion tuning, Schedule 80 coil descaling, and electrical fault-finding.',
    href: '/contact?topic=service-school',
    cta: 'Enquire for Engineer Intake',
  },
];

export default function TrainingPage() {
  return (
    <main className="min-h-screen bg-[#FAF9F5] text-alkota-black">
      <Navigation />

      {/* Hero */}
      <section className="bg-[#0A0A0A] text-white pt-32 pb-20 px-6 sm:px-12 lg:px-24 border-b border-[#222]">
        <div className="max-w-6xl mx-auto">
          <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.3em] text-alkota-orange block mb-4">
            // Alkota Service School &amp; Operator Certification
          </span>
          <h1 className="font-extralight text-4xl sm:text-6xl text-white tracking-tight leading-tight max-w-4xl mb-6">
            Operator Training &amp;{' '}
            <span className="text-alkota-orange font-normal italic">Service School.</span>
          </h1>
          <p className="text-base sm:text-lg text-[#AAA] font-normal leading-relaxed max-w-2xl mb-8">
            High-pressure hot water and steam plant demands trained operators and certified technicians. Building on Alkota&apos;s factory Service School curriculum established in South Dakota, our UK engineering team delivers practical on-site and workshop training.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact?topic=training"
              className="inline-flex items-center gap-2 bg-alkota-orange hover:bg-white hover:text-black text-white px-7 py-3.5 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors"
            >
              Book On-Site Training
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/service/commissioning"
              className="inline-flex items-center gap-2 border border-[#444] hover:border-white text-white px-7 py-3.5 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors"
            >
              Commissioning Handover
            </Link>
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="py-20 px-6 sm:px-12 lg:px-24 max-w-6xl mx-auto">
        <div className="mb-12">
          <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-2">
            // Curriculum
          </span>
          <h2 className="font-extralight text-3xl sm:text-4xl text-alkota-black tracking-tight">
            Available Training Programmes
          </h2>
        </div>

        <div className="space-y-6 mb-16">
          {COURSES.map((course) => (
            <div
              key={course.code}
              className="bg-white border border-[#E8E8E4] p-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 hover:border-alkota-orange transition-colors"
            >
              <div className="max-w-2xl">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange bg-orange-50 px-2.5 py-0.5 border border-orange-200">
                    {course.code}
                  </span>
                  <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#777]">
                    {course.format} · {course.audience}
                  </span>
                </div>
                <h3 className="font-medium text-xl text-alkota-black mb-2">{course.title}</h3>
                <p className="text-sm text-[#555] leading-relaxed">{course.summary}</p>
              </div>
              <Link
                href={course.href}
                className="shrink-0 inline-flex items-center gap-2 bg-alkota-black hover:bg-alkota-orange text-white px-6 py-3.5 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors"
              >
                {course.cta}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>

        {/* Service School Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white border border-[#E8E8E4] p-6">
            <Flame className="w-6 h-6 text-alkota-orange mb-3" />
            <h3 className="font-medium text-base text-alkota-black mb-2">Burner &amp; Coil Diagnostics</h3>
            <p className="text-xs text-[#666] leading-relaxed">
              Fuel oil pressure calibration, ignition electrode spacing, flue gas analysis, and Schedule 80 coil descaling procedures.
            </p>
          </div>
          <div className="bg-white border border-[#E8E8E4] p-6">
            <Wrench className="w-6 h-6 text-alkota-orange mb-3" />
            <h3 className="font-medium text-base text-alkota-black mb-2">Pump &amp; Unloader Bench Work</h3>
            <p className="text-xs text-[#666] leading-relaxed">
              Hands-on disassembly of ceramic triplex plunger pumps, packing replacement, check-valve seating, and unloader tuning.
            </p>
          </div>
          <div className="bg-white border border-[#E8E8E4] p-6">
            <ShieldCheck className="w-6 h-6 text-alkota-orange mb-3" />
            <h3 className="font-medium text-base text-alkota-black mb-2">Safety &amp; UK Compliance</h3>
            <p className="text-xs text-[#666] leading-relaxed">
              PUWER equipment inspection readiness, PPE standards for 350 BAR jetting, and Category 5 backflow protection verification.
            </p>
          </div>
        </div>

        {/* Dealer Portal CTA */}
        <div className="bg-[#0A0A0A] text-white p-8 sm:p-12 border border-[#222] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <GraduationCap className="w-5 h-5 text-alkota-orange" />
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange">
                Authorised UK Dealer Network
              </span>
            </div>
            <h3 className="font-extralight text-2xl sm:text-3xl text-white mb-2">
              Certify Your Service Engineers
            </h3>
            <p className="text-xs sm:text-sm text-[#AAA] max-w-xl">
              Authorised Alkota UK dealers can access technical bulletins, Service School schedules, and engineering certification through the Dealer Portal.
            </p>
          </div>
          <Link
            href="/portal/training"
            className="shrink-0 inline-flex items-center gap-2 border border-white/30 hover:border-alkota-orange hover:text-alkota-orange px-7 py-3.5 font-ibm-plex-mono text-xs uppercase tracking-widest text-white transition-colors"
          >
            Access Dealer Portal
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
