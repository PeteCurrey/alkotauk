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
import { ArrowRight, Droplets, Recycle, Users, Zap } from 'lucide-react';

interface Props {
  params: Promise<{ code: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params;
  return {
    title: `Alkota Trailer Build — ${code} | Alkota UK`,
    description: 'Shared Alkota trailer configuration. View this bespoke mobile cleaning system build and fork it to create your own.',
    robots: { index: false, follow: false }, // User-generated builds are noindex
  };
}

export default async function SharedBuildPage({ params }: Props) {
  const { code } = await params;

  const { data, error } = await supabaseAdmin
    .from('enquiries')
    .select('*')
    .eq('reference', code)
    .eq('type', 'trailer-build')
    .single();

  if (error || !data) {
    notFound();
  }

  const meta = data.metadata || {};
  const chassis = UK_CHASSIS_OPTIONS.find(c => c.id === meta.chassis_id);
  const machine = TRAILER_MACHINE_OPTIONS.find(m => m.id === meta.machine_id);
  const tank = WATER_STORAGE_OPTIONS.find(t => t.id === meta.water_storage_id);
  const recovery = WATER_RECOVERY_OPTIONS.find(r => r.id === meta.recovery_option_id);

  const weights = calculateTrailerWeights(meta);
  const endurance = machine && tank ? calculateEndurance(tank.litres, machine.flow_lpm, meta.operator_count || 1) : null;

  const createdAt = new Date(data.created_at).toLocaleDateString('en-GB', {
    year: 'numeric', month: 'long', day: 'numeric',
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
              Shared Alkota Build
            </span>
          </div>

          <h1 className="font-barlow-condensed text-5xl md:text-6xl font-black uppercase italic text-white leading-tight tracking-tight mb-4">
            ALKOTA TRAILER<br />
            <span className="text-alkota-orange">BUILD SPECIFICATION</span>
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-xs font-ibm-plex-mono text-[#555]">
            <span>Build Code: <span className="text-alkota-orange font-bold">{code}</span></span>
            <span>Configured: {createdAt}</span>
            <span className="border border-[#222] px-2 py-0.5 uppercase tracking-widest">
              {meta.format === 'open-deck' ? 'Open Deck System' : 'Enclosed Plant Room'}
            </span>
          </div>
        </div>

        {/* Build visual + summary grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Visual preview */}
          <div className="border border-alkota-iron bg-[#090909] aspect-[4/3] overflow-hidden relative">
            <div className="absolute top-4 left-4 z-10">
              <span className="font-ibm-plex-mono text-[8px] font-bold uppercase tracking-[0.3em] text-alkota-orange border border-alkota-orange px-2.5 py-1 bg-alkota-black/80">
                {meta.format === 'open-deck' ? 'Open Deck' : 'Enclosed Plant Room'}
              </span>
            </div>
            <img
              src={machine?.image_url || '/assets/products/trailer-single.png'}
              alt={`Alkota Build ${code}`}
              className="w-full h-full object-contain p-8"
            />
          </div>

          {/* Key specs */}
          <div className="space-y-3">
            {chassis && (
              <div className="border border-alkota-iron p-4">
                <p className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#555] mb-1">Chassis</p>
                <p className="font-barlow-condensed text-lg font-bold uppercase italic text-white">{chassis.name}</p>
                <p className="text-alkota-grey text-xs mt-0.5">MAM {chassis.mam_kg.toLocaleString()}kg · {chassis.axles === 'tandem' ? 'Tandem Axle' : 'Single Axle'} · {chassis.uk_approval_type}</p>
              </div>
            )}

            {machine && (
              <div className="border border-alkota-iron p-4">
                <p className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#555] mb-1">Cleaning Machine</p>
                <p className="font-barlow-condensed text-lg font-bold uppercase italic text-white">{machine.name}</p>
                <p className="text-alkota-grey text-xs mt-0.5">
                  {machine.pressure_bar} Bar · {machine.flow_lpm} LPM · {machine.max_temp_c}°C
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              {tank && (
                <div className="border border-alkota-iron p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Droplets className="h-4 w-4 text-alkota-orange" />
                    <p className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#555]">Water</p>
                  </div>
                  <p className="font-barlow-condensed text-xl font-black text-white">
                    {tank.litres === 0 ? 'Mains Fed' : `${tank.litres.toLocaleString()} L`}
                  </p>
                  {endurance && endurance.continuous_minutes > 0 && (
                    <p className="text-alkota-grey text-[11px] mt-0.5">~{endurance.typical_trigger_hours} hrs working</p>
                  )}
                </div>
              )}

              <div className="border border-alkota-iron p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="h-4 w-4 text-alkota-orange" />
                  <p className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#555]">Operators</p>
                </div>
                <p className="font-barlow-condensed text-xl font-black text-white">
                  {meta.operator_count || 1}
                </p>
              </div>

              {recovery && recovery.tier !== 'none' && (
                <div className="border border-green-900/50 bg-green-950/10 p-4 col-span-2">
                  <div className="flex items-center gap-2 mb-1">
                    <Recycle className="h-4 w-4 text-green-400" />
                    <p className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-green-400">Recovery System</p>
                  </div>
                  <p className="text-white text-sm font-medium">{recovery.name}</p>
                  <p className="text-green-400/60 text-[11px] mt-0.5">{recovery.environmental_standard}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Weight summary */}
        <div className="border border-alkota-iron bg-[#0A0A0A] p-6 mb-8">
          <h3 className="font-barlow-condensed text-xl font-black uppercase italic text-white mb-4">
            Engineering Weight Summary
          </h3>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="text-center border border-[#1A1A1A] p-4">
              <p className="font-ibm-plex-mono text-[9px] text-[#555] uppercase tracking-widest mb-1">Estimated Dry</p>
              <p className="font-barlow-condensed text-3xl font-black text-white">
                {weights.estimated_dry_weight_kg.toLocaleString()}<span className="text-lg text-alkota-orange"> kg</span>
              </p>
            </div>
            <div className="text-center border border-[#1A1A1A] p-4">
              <p className="font-ibm-plex-mono text-[9px] text-[#555] uppercase tracking-widest mb-1">Estimated Wet</p>
              <p className="font-barlow-condensed text-3xl font-black text-white">
                {weights.estimated_wet_weight_kg.toLocaleString()}<span className="text-lg text-alkota-orange"> kg</span>
              </p>
            </div>
            <div className={`text-center border p-4 ${weights.is_overweight ? 'border-red-900/50' : 'border-[#1A1A1A]'}`}>
              <p className="font-ibm-plex-mono text-[9px] text-[#555] uppercase tracking-widest mb-1">MAM / Payload</p>
              <p className="font-barlow-condensed text-3xl font-black text-white">
                {weights.chassis_mam_kg.toLocaleString()}<span className="text-lg text-alkota-orange"> kg</span>
              </p>
              <p className={`font-ibm-plex-mono text-[10px] mt-1 ${weights.is_overweight ? 'text-red-400' : 'text-green-400'}`}>
                {weights.payload_margin_kg >= 0 ? '+' : ''}{weights.payload_margin_kg.toLocaleString()} kg margin
              </p>
            </div>
          </div>
          <p className="text-[#333] text-[11px] mt-4 leading-relaxed">
            Preliminary configuration estimate. All weights subject to final engineering review, axle load verification, and IVA/Type Approval validation before production.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href={`/trailers/configure?load=${code}`}
            className="flex-1 inline-flex items-center justify-center gap-3 bg-alkota-orange px-8 py-4 text-xs font-black uppercase tracking-[0.25em] text-white hover:bg-alkota-orange/90 transition-all group"
          >
            <span>Continue This Build</span>
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
            Explore Trailers
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
