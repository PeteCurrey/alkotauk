import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { supabaseAdmin } from '@/lib/supabase/server';
import {
  UK_CHASSIS_OPTIONS,
  TRAILER_MACHINE_OPTIONS,
  WATER_STORAGE_OPTIONS,
  WATER_RECOVERY_OPTIONS,
  calculateTrailerWeights,
  calculateEndurance,
} from '@/lib/trailers/configurator-data';
import { ArrowRight, Droplets, Recycle, Users, Zap, Printer, Shield, CheckCircle2 } from 'lucide-react';

interface Props {
  params: Promise<{ code: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params;
  return {
    title: `Alkota Trailer Specification — ${code} | Alkota UK`,
    description: 'Shared Alkota bespoke trailer configuration. Inspect this mobile cleaning system and create an editable copy.',
    robots: { index: false, follow: false },
  };
}

export default async function SharedBuildPage({ params }: Props) {
  const { code } = await params;
  const cleanCode = code ? code.trim().toUpperCase() : '';

  // SECURITY: Only select reference, created_at, and metadata. DO NOT select name, email, phone, or message!
  const { data, error } = await supabaseAdmin
    .from('enquiries')
    .select('reference, created_at, metadata')
    .eq('reference', cleanCode)
    .eq('type', 'trailer-build')
    .maybeSingle();

  if (error || !data) {
    notFound();
  }

  const meta = data.metadata || {};
  const chassis = UK_CHASSIS_OPTIONS.find(c => c.id === meta.chassis_id) || UK_CHASSIS_OPTIONS[0];
  const machine = TRAILER_MACHINE_OPTIONS.find(m => m.id === meta.machine_id) || TRAILER_MACHINE_OPTIONS[0];
  const tank = WATER_STORAGE_OPTIONS.find(t => t.id === meta.water_storage_id) || WATER_STORAGE_OPTIONS[0];
  const recovery = WATER_RECOVERY_OPTIONS.find(r => r.id === meta.recovery_option_id) || WATER_RECOVERY_OPTIONS[0];

  const weights = calculateTrailerWeights(meta);
  const endurance = machine && tank ? calculateEndurance(tank.litres, machine.flow_lpm, meta.operator_count || 1) : null;

  const createdAt = new Date(data.created_at).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <main className="bg-alkota-black min-h-screen">
      <Navigation />

      <div className="max-w-5xl mx-auto px-6 pt-36 pb-20">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-[2px] w-8 bg-alkota-orange" />
            <span className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-[0.4em] text-alkota-orange">
              Shared Specification Reference
            </span>
          </div>

          <h1 className="font-barlow-condensed text-5xl md:text-6xl font-black uppercase italic text-white leading-tight tracking-tight mb-4">
            ALKOTA TRAILER<br />
            <span className="text-alkota-orange">RIG SPECIFICATION</span>
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-xs font-ibm-plex-mono text-[#777]">
            <span>Build Reference: <span className="text-alkota-orange font-bold">{cleanCode}</span></span>
            <span>Created: {createdAt}</span>
            <span className="border border-[#333] px-2.5 py-0.5 uppercase tracking-widest text-[#AAA]">
              {meta.format === 'open-deck' ? 'Open Deck System' : 'Enclosed Mobile Plant Room'}
            </span>
          </div>
        </div>

        {/* Build visual + summary grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Visual preview */}
          <div className="border border-alkota-iron bg-[#090909] aspect-[4/3] overflow-hidden relative flex items-center justify-center p-8">
            <div className="absolute top-4 left-4 z-10">
              <span className="font-ibm-plex-mono text-[8px] font-bold uppercase tracking-[0.3em] text-alkota-orange border border-alkota-orange px-2.5 py-1 bg-alkota-black/80">
                {meta.format === 'open-deck' ? 'Open Deck Rig' : 'Enclosed Mobile Plant Room'}
              </span>
            </div>
            <img
              src={
                meta.format === 'enclosed'
                  ? '/assets/products/stationary-gas-fired.png'
                  : machine?.image_url || '/assets/products/trailer-single.png'
              }
              alt={`Alkota Build ${cleanCode}`}
              className="max-h-full max-w-full object-contain filter drop-shadow-2xl"
            />
          </div>

          {/* Key specs */}
          <div className="space-y-3">
            {chassis && (
              <div className="border border-alkota-iron p-4 bg-[#0D0D0D]">
                <p className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#555] mb-1">Chassis Frame</p>
                <p className="font-barlow-condensed text-lg font-bold uppercase italic text-white">{chassis.name}</p>
                <p className="text-alkota-grey text-xs mt-0.5 font-light">MAM {chassis.mam_kg.toLocaleString()}kg · {chassis.axles === 'tandem' ? 'Tandem Axle' : 'Single Axle'} · {chassis.uk_approval_type}</p>
              </div>
            )}

            {machine && (
              <div className="border border-alkota-iron p-4 bg-[#0D0D0D]">
                <p className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#555] mb-1">Alkota Cleaning Skid</p>
                <p className="font-barlow-condensed text-lg font-bold uppercase italic text-white">{machine.name}</p>
                <p className="text-alkota-grey text-xs mt-0.5 font-light">
                  {machine.pressure_bar} Bar · {machine.flow_lpm} LPM · {machine.max_temp_c}°C
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              {tank && (
                <div className="border border-alkota-iron p-4 bg-[#0D0D0D]">
                  <div className="flex items-center gap-2 mb-1">
                    <Droplets className="h-4 w-4 text-alkota-orange" />
                    <p className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#555]">Water Reservoir</p>
                  </div>
                  <p className="font-barlow-condensed text-xl font-black text-white">
                    {tank.litres === 0 ? 'Mains Fed' : `${tank.litres.toLocaleString()} L`}
                  </p>
                  {endurance && endurance.continuous_minutes > 0 && (
                    <p className="text-alkota-grey text-[11px] mt-0.5 font-light">~{endurance.typical_trigger_hours} hrs working session</p>
                  )}
                </div>
              )}

              <div className="border border-alkota-iron p-4 bg-[#0D0D0D]">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="h-4 w-4 text-alkota-orange" />
                  <p className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#555]">Operators</p>
                </div>
                <p className="font-barlow-condensed text-xl font-black text-white">
                  {meta.operator_count || 1} {meta.operator_count === 2 ? 'Operators (Dual Gun)' : 'Operator'}
                </p>
              </div>

              {recovery && recovery.tier !== 'none' && (
                <div className="border border-green-900/50 bg-green-950/10 p-4 col-span-2">
                  <div className="flex items-center gap-2 mb-1">
                    <Recycle className="h-4 w-4 text-green-400" />
                    <p className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-green-400">Environmental Recovery</p>
                  </div>
                  <p className="text-white text-sm font-medium">{recovery.name}</p>
                  <p className="text-green-400/60 text-[11px] mt-0.5 font-light">{recovery.environmental_standard}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Weight summary */}
        <div className="border border-alkota-iron bg-[#0A0A0A] p-6 mb-8">
          <h3 className="font-barlow-condensed text-xl font-black uppercase italic text-white mb-4">
            Engineering Mass & Payload Summary
          </h3>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="text-center border border-[#1A1A1A] p-4 bg-[#0D0D0D]">
              <p className="font-ibm-plex-mono text-[9px] text-[#555] uppercase tracking-widest mb-1">Estimated Dry Mass</p>
              <p className="font-barlow-condensed text-3xl font-black text-white">
                {weights.estimated_dry_weight_kg.toLocaleString()}<span className="text-lg text-alkota-orange"> kg</span>
              </p>
            </div>
            <div className="text-center border border-[#1A1A1A] p-4 bg-[#0D0D0D]">
              <p className="font-ibm-plex-mono text-[9px] text-[#555] uppercase tracking-widest mb-1">Estimated Wet Mass (Full Tank)</p>
              <p className="font-barlow-condensed text-3xl font-black text-white">
                {weights.estimated_wet_weight_kg.toLocaleString()}<span className="text-lg text-alkota-orange"> kg</span>
              </p>
            </div>
            <div className={`text-center border p-4 bg-[#0D0D0D] ${weights.is_overweight ? 'border-red-900/50' : 'border-[#1A1A1A]'}`}>
              <p className="font-ibm-plex-mono text-[9px] text-[#555] uppercase tracking-widest mb-1">Chassis MAM / Payload</p>
              <p className="font-barlow-condensed text-3xl font-black text-white">
                {weights.chassis_mam_kg.toLocaleString()}<span className="text-lg text-alkota-orange"> kg</span>
              </p>
              <p className={`font-ibm-plex-mono text-[10px] mt-1 ${weights.is_overweight ? 'text-red-400 font-bold' : 'text-green-400'}`}>
                {weights.payload_margin_kg >= 0 ? '+' : ''}{weights.payload_margin_kg.toLocaleString()} kg margin
              </p>
            </div>
          </div>
          <p className="text-[#444] text-[11px] mt-4 leading-relaxed font-light">
            Preliminary configuration specification. All weights are preliminary engineering models subject to final CAD verification, axle loading analysis, and UK IVA road approval prior to fabrication.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href={`/trailers/configure?load=${cleanCode}`}
            className="flex-1 inline-flex items-center justify-center gap-3 bg-alkota-orange px-8 py-4 text-xs font-black uppercase tracking-[0.25em] text-white hover:bg-alkota-orange/90 transition-all group"
          >
            <span>Continue & Fork This Build</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/trailers/configure"
            className="flex-1 inline-flex items-center justify-center gap-3 border border-alkota-iron px-8 py-4 text-xs font-black uppercase tracking-[0.25em] text-white/70 hover:text-white hover:border-[#444] transition-all"
          >
            Start a New Build
          </Link>
          <Link
            href="/trailers"
            className="inline-flex items-center justify-center gap-3 border border-alkota-iron px-8 py-4 text-xs font-black uppercase tracking-[0.25em] text-white/70 hover:text-white hover:border-[#444] transition-all"
          >
            Explore Trailers Flagship
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
