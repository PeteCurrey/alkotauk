import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { 
  Truck, 
  ArrowLeft, 
  ArrowRight, 
  ShieldCheck, 
  Wrench, 
  Flame, 
  Gauge, 
  Activity, 
  Target, 
  Package, 
  CheckCircle2,
  FileText
} from 'lucide-react';
import { supabaseAdmin } from '@/lib/supabase/server';
import { COMPREHENSIVE_MACHINE_MODELS } from '@/lib/parts/seed-comprehensive';
import ProductCard from '@/components/parts/ProductCard';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ manufacturer: string; model: string }>;
}): Promise<Metadata> {
  const { model } = await params;
  const match = COMPREHENSIVE_MACHINE_MODELS.find((m) => m.slug === model);
  return {
    title: match ? `${match.name} Spares & Parts Catalogue | Alkota UK` : 'Machine Parts | Alkota UK',
    description: `Official OEM genuine replacement pumps, heating coils, burner components, and service kits for ${match?.name || model}.`,
  };
}

export default async function MachineModelDetailPage({
  params,
}: {
  params: Promise<{ manufacturer: string; model: string }>;
}) {
  const { manufacturer, model } = await params;

  // Fetch machine model from DB or fallback
  const { data: dbModel } = await supabaseAdmin
    .from('machine_models')
    .select('*')
    .eq('slug', model)
    .single();

  const machine = dbModel || COMPREHENSIVE_MACHINE_MODELS.find((m) => m.slug === model);

  if (!machine) {
    notFound();
  }

  // Fetch parts that are compatible with this machine model or machine family
  const modelCode = machine.model_code || '';
  const seriesName = machine.series || '';

  const { data: allParts } = await supabaseAdmin
    .from('parts')
    .select('*')
    .eq('active', true);

  const compatibleParts = (allParts || []).filter((p) => {
    if (Array.isArray(p.compatible_machines)) {
      return p.compatible_machines.some((m: string) => 
        m.toLowerCase().includes(modelCode.toLowerCase()) || 
        (seriesName && m.toLowerCase().includes(seriesName.toLowerCase())) ||
        m.toLowerCase().includes('all')
      );
    }
    return true; // if general spares
  });

  return (
    <main className="min-h-screen bg-[#FAF9F5] text-alkota-black pb-24 font-sans">
      {/* ── HEADER HERO ── */}
      <section className="bg-[#0A0A0A] text-white py-16 px-6 sm:px-12 lg:px-24 border-b border-[#222]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#777] mb-4">
            <Link href="/parts-attachments" className="hover:text-alkota-orange transition-colors">
              Parts Hub
            </Link>
            <span>/</span>
            <Link href="/parts-attachments/machines" className="hover:text-alkota-orange transition-colors">
              Machines
            </Link>
            <span>/</span>
            <span className="text-alkota-orange">{machine.model_code}</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange">
                  // {machine.manufacturer || 'Alkota'} {machine.series}
                </span>
                <span className="font-ibm-plex-mono text-[9px] bg-[#1A1A1A] border border-[#333] px-2 py-0.5 text-white">
                  Model Code: {machine.model_code}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extralight tracking-tight text-white mb-4">
                {machine.name}
              </h1>
              <p className="text-[#AAA] text-sm max-w-2xl font-light leading-relaxed">
                {machine.specs_summary || 'Heavy-duty industrial hot water pressure washer with precision triplex pump and ASTM A53 Schedule 80 hydro-insulated coil.'}
              </p>
            </div>

            <div className="bg-[#141414] border border-[#282828] p-6 lg:min-w-[320px] space-y-3 font-ibm-plex-mono text-xs">
              <span className="text-[10px] uppercase tracking-widest text-alkota-orange block">
                Machine Specifications:
              </span>
              <div className="flex justify-between border-b border-[#222] pb-1 text-[#AAA]">
                <span>Operating Pressure:</span>
                <span className="text-white font-normal">{machine.pressure_psi || '3000'} PSI</span>
              </div>
              <div className="flex justify-between border-b border-[#222] pb-1 text-[#AAA]">
                <span>Water Flow Rate:</span>
                <span className="text-white font-normal">{machine.flow_lpm || '15.0'} LPM</span>
              </div>
              <div className="flex justify-between border-b border-[#222] pb-1 text-[#AAA]">
                <span>Power Source:</span>
                <span className="text-white font-normal">{machine.power_source || 'Electric 415V'}</span>
              </div>
              <div className="flex justify-between text-[#AAA]">
                <span>Heating System:</span>
                <span className="text-white font-normal">{machine.heating_type || 'Diesel Fired'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPATIBLE PARTS GRID ── */}
      <section className="py-16 px-6 sm:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#E8E8E4]">
            <div>
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-1">
                // OEM Fitment Guaranteed
              </span>
              <h2 className="text-2xl font-light text-alkota-black tracking-tight">
                Compatible Spares & Service Components ({compatibleParts.length})
              </h2>
            </div>

            <Link
              href={`/parts-attachments/enquiry?model=${encodeURIComponent(machine.model_code)}`}
              className="hidden sm:inline-flex items-center gap-2 bg-alkota-orange text-white px-4 py-2.5 text-xs font-ibm-plex-mono uppercase tracking-widest hover:bg-black transition-colors"
            >
              <span>Enquire for Machine</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {compatibleParts.slice(0, 24).map((part: any) => (
              <ProductCard key={part.id} part={part} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
