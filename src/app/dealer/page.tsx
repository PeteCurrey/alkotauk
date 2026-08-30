import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import {
  ShieldCheck,
  Package,
  GraduationCap,
  HeadphonesIcon,
  Megaphone,
  ArrowRight,
  CheckCircle2,
  Building2,
  Wrench,
  FlaskConical,
  Map,
  Star,
} from 'lucide-react';

const PORTAL_BENEFITS = [
  {
    icon: Package,
    title: 'Genuine Parts Ordering',
    desc: 'Order Alkota genuine parts at dealer pricing with real-time stock visibility and one-click reorder.',
  },
  {
    icon: ShieldCheck,
    title: 'Dealer-Specific Pricing',
    desc: 'Your authorised tier pricing applied automatically. No negotiation required on every order.',
  },
  {
    icon: GraduationCap,
    title: 'Technical Training',
    desc: 'Online and classroom certification. Product, service, chemical and sales training library.',
  },
  {
    icon: HeadphonesIcon,
    title: 'Priority Technical Support',
    desc: 'Direct access to the Alkota UK technical team. Ticketed, tracked and resolved faster.',
  },
  {
    icon: Megaphone,
    title: 'Marketing & Sales Tools',
    desc: 'Download approved brand assets, product imagery, brochures, specification sheets and presentations.',
  },
  {
    icon: Wrench,
    title: 'Service Documentation',
    desc: 'Full manuals, technical drawings, SDS sheets and service bulletins — all in one searchable library.',
  },
];

const DEALER_TIERS = [
  {
    tier: 'Standard',
    colour: 'border-alkota-iron',
    badge: 'bg-[#F5F4F0] text-alkota-silver',
    features: ['Parts catalogue access', 'Resource library', 'Technical support', 'Training library'],
  },
  {
    tier: 'Silver',
    colour: 'border-alkota-silver',
    badge: 'bg-alkota-steel text-alkota-black',
    features: ['Everything in Standard', 'Enhanced pricing', 'Priority support', 'Demo day eligibility'],
  },
  {
    tier: 'Gold',
    colour: 'border-alkota-orange',
    badge: 'bg-alkota-orange/10 text-alkota-orange',
    features: ['Everything in Silver', 'Exclusive pricing tier', 'Marketing co-funding', 'Territory protection', 'Account manager'],
    featured: true,
  },
  {
    tier: 'Platinum',
    colour: 'border-alkota-black',
    badge: 'bg-alkota-black text-white',
    features: ['Everything in Gold', 'Maximum discounts', 'Bespoke commercial terms', 'Lead routing priority', 'Quarterly business reviews'],
  },
];

export default function DealerLandingPage() {
  return (
    <>
      <Navigation />
      <main className="bg-[#FAF9F5] min-h-screen">

        {/* ── HERO ─────────────────────────────────────────────────── */}
        <section className="bg-alkota-black text-white pt-32 pb-20 px-6 sm:px-12 lg:px-24 border-b border-[#222]">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 mb-5">
                  <span className="text-[9px] uppercase tracking-widest text-alkota-orange border border-alkota-orange/30 bg-alkota-orange/10 px-2.5 py-0.5">
                    Authorised Dealer Programme
                  </span>
                </div>
                <h1 className="text-4xl sm:text-6xl font-extralight text-white tracking-tight leading-none mb-5">
                  The Alkota UK<br />
                  <span className="text-alkota-orange">Dealer Portal</span>
                </h1>
                <p className="text-sm text-alkota-silver leading-relaxed max-w-lg mb-8">
                  A premium operating platform for authorised Alkota dealers. Order parts, access pricing,
                  download technical documentation, book training and manage your dealer business —
                  all in one place.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/dealer/login"
                    className="inline-flex items-center gap-2 bg-alkota-orange hover:bg-alkota-orange-hover text-white px-7 py-3.5 text-xs uppercase tracking-widest transition-colors"
                  >
                    Dealer Login <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <Link
                    href="/dealer/request"
                    className="inline-flex items-center gap-2 border border-[#444] hover:border-white text-white px-7 py-3.5 text-xs uppercase tracking-widest transition-colors"
                  >
                    Become a Dealer
                  </Link>
                </div>
              </div>

              {/* Stats panel */}
              <div className="grid grid-cols-2 gap-3 lg:min-w-[340px]">
                {[
                  { label: 'Authorised Dealers', value: '47+' },
                  { label: 'UK Territories', value: '32' },
                  { label: 'Years of UK Presence', value: '60+' },
                  { label: 'Parts in Catalogue', value: '2,400+' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-[#111] border border-[#222] p-5">
                    <span className="text-2xl font-extralight text-alkota-orange block mb-1">{stat.value}</span>
                    <span className="text-[10px] uppercase tracking-widest text-[#888]">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── EXISTING DEALER CTA ───────────────────────────────────── */}
        <section className="py-14 px-6 sm:px-12 lg:px-24 bg-white border-b border-[#E8E8E4]">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Existing Dealer */}
              <div className="border border-alkota-orange/30 bg-alkota-orange/5 p-8">
                <span className="text-[9px] uppercase tracking-widest text-alkota-orange block mb-3">Existing Dealer</span>
                <h2 className="text-2xl font-extralight text-alkota-black mb-2">Access Your Portal</h2>
                <p className="text-sm text-alkota-silver mb-6 leading-relaxed">
                  Log in to your authorised dealer account to access pricing, parts, resources, training and support.
                </p>
                <Link
                  href="/dealer/login"
                  className="inline-flex items-center gap-2 bg-alkota-orange text-white px-6 py-3 text-xs uppercase tracking-widest hover:bg-alkota-orange-hover transition-colors"
                >
                  Dealer Login <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* Prospective Dealer */}
              <div className="border border-[#E8E8E4] bg-[#FAF9F5] p-8">
                <span className="text-[9px] uppercase tracking-widest text-alkota-silver block mb-3">Prospective Dealer</span>
                <h2 className="text-2xl font-extralight text-alkota-black mb-2">Become an Alkota Dealer</h2>
                <p className="text-sm text-alkota-silver mb-6 leading-relaxed">
                  Apply to join the Alkota UK authorised dealer network. We'll review your application and
                  be in touch within 5 working days.
                </p>
                <Link
                  href="/dealer/request"
                  className="inline-flex items-center gap-2 border border-alkota-black text-alkota-black px-6 py-3 text-xs uppercase tracking-widest hover:bg-alkota-black hover:text-white transition-colors"
                >
                  Apply Now <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── PORTAL BENEFITS ───────────────────────────────────────── */}
        <section className="py-20 px-6 sm:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <span className="text-[9px] uppercase tracking-widest text-alkota-orange block mb-3">Portal Capabilities</span>
              <h2 className="text-3xl font-extralight text-alkota-black tracking-tight">
                Everything your dealership needs,<br className="hidden sm:block" /> in one platform.
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {PORTAL_BENEFITS.map((benefit) => (
                <div key={benefit.title} className="bg-white border border-[#E8E8E4] p-6 hover:border-alkota-orange transition-colors">
                  <benefit.icon className="h-5 w-5 text-alkota-orange mb-4" />
                  <h3 className="text-base font-light text-alkota-black mb-2">{benefit.title}</h3>
                  <p className="text-sm text-alkota-silver leading-relaxed">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── DEALER TIERS ─────────────────────────────────────────── */}
        <section className="py-20 px-6 sm:px-12 lg:px-24 bg-white border-t border-b border-[#E8E8E4]">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <span className="text-[9px] uppercase tracking-widest text-alkota-orange block mb-3">Partnership Levels</span>
              <h2 className="text-3xl font-extralight text-alkota-black tracking-tight">Dealer tiers &amp; benefits</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {DEALER_TIERS.map((tier) => (
                <div
                  key={tier.tier}
                  className={`border-t-2 ${tier.colour} border border-[#E8E8E4] bg-[#FAF9F5] p-6 ${tier.featured ? 'ring-1 ring-alkota-orange' : ''}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[9px] px-2 py-0.5 uppercase tracking-widest ${tier.badge}`}>
                      {tier.tier}
                    </span>
                    {tier.featured && <Star className="h-3.5 w-3.5 text-alkota-orange" />}
                  </div>
                  <ul className="space-y-2">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs text-alkota-silver">
                        <CheckCircle2 className="h-3.5 w-3.5 text-alkota-orange mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY ALKOTA UK ─────────────────────────────────────────── */}
        <section className="py-20 px-6 sm:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-[9px] uppercase tracking-widest text-alkota-orange block mb-3">Why Alkota UK</span>
                <h2 className="text-3xl font-extralight text-alkota-black tracking-tight mb-6">
                  Built in South Dakota.<br />
                  <span className="text-alkota-orange">Trusted across the UK.</span>
                </h2>
                <p className="text-sm text-alkota-silver leading-relaxed mb-6">
                  Alkota has been manufacturing industrial pressure washing and cleaning equipment since 1964.
                  Every machine is built to withstand the most demanding industrial environments —
                  food processing, agriculture, manufacturing, construction and fleet.
                </p>
                <p className="text-sm text-alkota-silver leading-relaxed mb-8">
                  As an authorised Alkota UK dealer, you represent a brand with over 60 years of
                  engineering heritage and direct access to the full genuine parts supply chain.
                </p>
                <div className="flex flex-col gap-3">
                  {[
                    { icon: Building2, text: 'Over 60 years of industrial engineering heritage' },
                    { icon: Map, text: 'Full UK regional coverage with territory protection' },
                    { icon: FlaskConical, text: 'Complete Hydrus chemical range exclusively for dealers' },
                    { icon: Wrench, text: 'Comprehensive genuine parts supply chain' },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-3 text-sm text-alkota-silver">
                      <item.icon className="h-4 w-4 text-alkota-orange shrink-0" />
                      {item.text}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-alkota-black p-10 border border-[#222]">
                <p className="text-[9px] uppercase tracking-widest text-alkota-orange mb-6">Ready to join the network?</p>
                <h3 className="text-2xl font-extralight text-white mb-4">
                  Apply for your Alkota dealership today
                </h3>
                <p className="text-sm text-alkota-silver mb-8 leading-relaxed">
                  We review all applications within 5 working days. Approved dealers receive immediate
                  portal access, onboarding training and a dedicated account manager.
                </p>
                <Link
                  href="/dealer/request"
                  className="inline-flex items-center gap-2 bg-alkota-orange hover:bg-alkota-orange-hover text-white px-7 py-3.5 text-xs uppercase tracking-widest transition-colors"
                >
                  Start Your Application <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
