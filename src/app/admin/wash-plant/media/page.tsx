import { supabaseAdmin } from '@/lib/supabase/server';
import Link from 'next/link';
import { 
  FileText, 
  Upload, 
  Image as ImageIcon, 
  Layers, 
  CheckCircle2, 
  Clock, 
  ExternalLink,
  Plus
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminWashPlantMediaPage() {
  let mediaItems: any[] = [];
  try {
    const { data } = await supabaseAdmin
      .from('wash_plant_project_media')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) mediaItems = data;
  } catch (err) {
    console.error('Error fetching media:', err);
  }

  const CATEGORIES = [
    { id: 'hero', name: 'Hero Photography' },
    { id: 'wide_plant', name: 'Wide Plant Photography' },
    { id: 'control_panels', name: 'Control Panels & PLCs' },
    { id: 'pump_skids', name: 'Pump Skids & Modules' },
    { id: 'filtration', name: 'Filtration & Water Treatment' },
    { id: 'wash_stations', name: 'Wash Stations & Booms' },
    { id: 'civil_works', name: 'Civil Works & Sumps' },
    { id: 'plant_rooms', name: 'Central Plant Rooms' },
    { id: 'before_after', name: 'Before / After Cleaning' },
    { id: 'installation', name: 'Installation in Progress' },
    { id: 'commissioning', name: 'Commissioning & SAT' },
    { id: 'engineers', name: 'Engineers on Site' },
    { id: 'finished_plant', name: 'Finished Commissioned Plant' }
  ];

  return (
    <div className="space-y-8">
      {/* ── HEADER ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-barlow-condensed text-4xl font-black uppercase italic text-white">
            Wash Plant Photography & Media Manager
          </h1>
          <p className="font-ibm-plex-mono text-[10px] text-[#777] uppercase tracking-widest mt-1">
            // Managed high-resolution photography categories for capital project case studies
          </p>
        </div>
      </div>

      {/* ── NOTICE ON GENUINE ASSETS ─────────────────────────────────────── */}
      <div className="bg-[#121212] border-l-4 border-[#FF6900] p-6 space-y-2">
        <h3 className="font-barlow-condensed text-xl font-bold uppercase text-white">
          Real Project Assets Protocol
        </h3>
        <p className="text-xs text-[#aaa] font-inter leading-relaxed">
          High-CAPEX capital project buyers require genuine verified photographic evidence of pump skids, pipework reticulation, PLC control suites, and operational wash aprons. When client project photography is supplied, upload and tag each asset by category below to populate case studies and the public wash plant division.
        </p>
      </div>

      {/* ── CATEGORIES GRID ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 font-ibm-plex-mono text-xs">
        {CATEGORIES.map((cat) => {
          const itemsInCat = mediaItems.filter(m => m.category === cat.id);
          return (
            <div key={cat.id} className="bg-[#0E0E0E] border border-[#222] p-5 space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-[9px] text-[#FF6900] uppercase font-bold block">CATEGORY</span>
                <h4 className="text-white text-sm font-bold mt-1">{cat.name}</h4>
                <p className="text-[#666] text-[10px] mt-1">{itemsInCat.length} Assets Registered</p>
              </div>

              <div className="pt-3 border-t border-[#1F1F1F] flex items-center justify-between">
                <span className="text-[9px] text-[#555] uppercase">SUPABASE STORAGE</span>
                <span className="text-[9px] text-[#00E5FF] hover:underline cursor-pointer">Manage →</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── MEDIA LIST / GALLERY ─────────────────────────────────────────── */}
      <div className="border border-[#222] bg-[#0A0A0A] p-8">
        <div className="flex items-center justify-between pb-4 border-b border-[#222] mb-6">
          <h3 className="font-barlow-condensed text-2xl font-bold uppercase text-white">
            Media Library Archive ({mediaItems.length})
          </h3>
          <span className="font-ibm-plex-mono text-[10px] text-[#777] uppercase">
            Linked to projects & public routes
          </span>
        </div>

        {mediaItems.length === 0 ? (
          <div className="p-8 text-center border border-dashed border-[#333] space-y-2">
            <ImageIcon className="h-8 w-8 text-[#444] mx-auto mb-2" />
            <p className="font-ibm-plex-mono text-xs text-[#888] uppercase">No Project Media Uploaded Yet</p>
            <p className="text-xs text-[#666] max-w-sm mx-auto">
              Project photography URLs inserted into the wash_plant_project_media table or uploaded via Supabase Storage will appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {mediaItems.map((item) => (
              <div key={item.id} className="bg-[#141414] border border-[#222] p-3 space-y-2">
                <img src={item.file_url} alt={item.alt_text || 'Wash Plant'} className="w-full h-32 object-cover" />
                <span className="font-ibm-plex-mono text-[9px] text-[#FF6900] uppercase block">{item.category}</span>
                <p className="text-xs text-white truncate">{item.caption || item.alt_text || 'Project Asset'}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
