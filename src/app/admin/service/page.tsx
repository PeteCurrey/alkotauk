import React from 'react';
import Link from 'next/link';
import { supabaseAdmin } from '@/lib/supabase/server';
import {
  Wrench,
  ShieldCheck,
  AlertTriangle,
  Clock,
  CheckCircle2,
  FileText,
  User,
  Building,
  Plus,
  ArrowUpRight,
  Filter
} from 'lucide-react';
import { SAMPLE_REGISTERED_MACHINE, SERVICE_PLANS } from '@/lib/service/seed-data';

export const metadata = {
  title: 'Service & Maintenance Administration | Alkota Admin',
};

export default async function AdminServicePage() {
  // Query Supabase for real service requests and registrations if present
  let dbRequests: any[] = [];
  let dbRegistrations: any[] = [];

  try {
    const [reqRes, regRes] = await Promise.all([
      supabaseAdmin.from('service_requests').select('*').order('created_at', { ascending: false }),
      supabaseAdmin.from('machine_registrations').select('*').order('created_at', { ascending: false })
    ]);
    dbRequests = reqRes.data || [];
    dbRegistrations = regRes.data || [];
  } catch (err) {
    console.warn('Database fetch warning in admin service page:', err);
  }

  // Fallback demo requests if empty
  const fallbackRequests = [
    {
      id: 'req-01',
      request_number: 'SRV-2024-9102',
      request_type: 'breakdown',
      urgency: 'machine_down',
      machine_model: 'Alkota 430XH Hot Water',
      serial_number: 'ALK-2022-44109',
      machine_status: 'no_heat',
      symptoms: 'Down-draft burner lockout after 30 seconds. Pressure switch closing, but flame sensor tripping.',
      company_name: 'Apex Bulk Logistics',
      site_name: 'Sheffield Depot',
      contact_name: 'John Miller',
      contact_phone: '0114 288 1900',
      status: 'triage',
      created_at: new Date(Date.now() - 3600000 * 2).toISOString()
    },
    {
      id: 'req-02',
      request_number: 'SRV-2024-9098',
      request_type: 'planned_maintenance',
      urgency: 'routine',
      machine_model: 'Alkota 5305A Cold Stationary',
      serial_number: 'ALK-2023-11842',
      machine_status: 'unknown',
      symptoms: 'Annual 1,000-hour PPM service required for food factory wash bay 3.',
      company_name: 'Pennine Poultry Processing Ltd',
      site_name: 'Buxton Plant',
      contact_name: 'Sarah Jenkins',
      contact_phone: '01298 740 220',
      status: 'scheduled',
      created_at: new Date(Date.now() - 3600000 * 24).toISOString()
    },
    {
      id: 'req-03',
      request_number: 'SRV-2024-9085',
      request_type: 'pump_repair',
      urgency: 'routine',
      machine_model: 'General Pump TS2021',
      serial_number: 'GP-88910',
      machine_status: 'reduced_performance',
      symptoms: 'Send-in pump overhaul. Emulsified oil in sight glass, water leaking from low-pressure seals.',
      company_name: 'Express Plant Hire Ltd',
      site_name: 'Workshop Direct',
      contact_name: 'Tom Edwards',
      contact_phone: '0161 883 4000',
      status: 'in_progress',
      created_at: new Date(Date.now() - 3600000 * 48).toISOString()
    }
  ];

  const requests = dbRequests.length > 0 ? dbRequests : fallbackRequests;
  const criticalCount = requests.filter((r) => r.urgency === 'machine_down').length;
  const ppmCount = requests.filter((r) => r.request_type === 'planned_maintenance').length;
  const pumpCount = requests.filter((r) => r.request_type === 'pump_repair').length;

  return (
    <div className="text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-barlow-condensed text-4xl font-black uppercase italic">
            Service &amp; Lifecycle Operations
          </h1>
          <p className="font-ibm-plex-mono text-[10px] text-[#777] uppercase tracking-widest mt-1">
            // Engineering Dispatch Desk · PPM Schedules · Workshop Rebuilds
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/service/request"
            target="_blank"
            className="flex items-center gap-2 px-4 py-2.5 bg-[#FF6900] text-white font-ibm-plex-mono text-[10px] uppercase tracking-widest hover:bg-[#e55f00] transition-colors"
          >
            <Plus className="h-4 w-4" /> New Service Request
          </Link>
          <Link
            href="/service"
            target="_blank"
            className="flex items-center gap-2 px-4 py-2.5 bg-[#1C1C1C] border border-[#333] text-white font-ibm-plex-mono text-[10px] uppercase tracking-widest hover:bg-[#222] transition-colors"
          >
            View Public Hub <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px border border-[#222] bg-[#222] mb-8">
        <div className="bg-[#111] p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#777]">
              Open Work Orders
            </span>
            <Wrench className="w-4 h-4 text-alkota-orange" />
          </div>
          <div className="font-extralight text-3xl text-white">{requests.length}</div>
          <div className="font-ibm-plex-mono text-[8px] text-[#555] mt-1">Active service jobs</div>
        </div>

        <div className="bg-[#111] p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#777]">
              Machine Down (Urgent)
            </span>
            <AlertTriangle className="w-4 h-4 text-red-500" />
          </div>
          <div className="font-extralight text-3xl text-red-400">{criticalCount}</div>
          <div className="font-ibm-plex-mono text-[8px] text-[#555] mt-1">Priority emergency queue</div>
        </div>

        <div className="bg-[#111] p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#777]">
              Scheduled PPM
            </span>
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="font-extralight text-3xl text-emerald-400">{ppmCount}</div>
          <div className="font-ibm-plex-mono text-[8px] text-[#555] mt-1">Preventive maintenance</div>
        </div>

        <div className="bg-[#111] p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#777]">
              Pump Overhauls
            </span>
            <Clock className="w-4 h-4 text-blue-400" />
          </div>
          <div className="font-extralight text-3xl text-blue-300">{pumpCount}</div>
          <div className="font-ibm-plex-mono text-[8px] text-[#555] mt-1">Workshop strip &amp; test</div>
        </div>
      </div>

      {/* ── WORK ORDERS & REQUESTS INBOX ── */}
      <div className="border border-[#222] bg-[#111] mb-8">
        <div className="p-4 border-b border-[#222] flex items-center justify-between bg-[#141414]">
          <div className="flex items-center gap-3">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange">
              // Service Requests &amp; Breakdown Inbox
            </span>
          </div>
          <span className="font-ibm-plex-mono text-[9px] uppercase text-[#666]">
            {requests.length} Jobs Total
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#222] bg-[#1A1A1A] font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#666]">
                <th className="p-3.5">Ref / Date</th>
                <th className="p-3.5">Type &amp; Urgency</th>
                <th className="p-3.5">Equipment / Serial</th>
                <th className="p-3.5">Customer &amp; Site</th>
                <th className="p-3.5">Reported Symptoms</th>
                <th className="p-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1A1A1A] text-[#AAA]">
              {requests.map((r, idx) => {
                const isCritical = r.urgency === 'machine_down';
                return (
                  <tr key={r.id || idx} className="hover:bg-[#161616] transition-colors">
                    <td className="p-3.5">
                      <span className="font-mono text-white font-medium block">
                        {r.request_number}
                      </span>
                      <span className="font-ibm-plex-mono text-[9px] text-[#666]">
                        {new Date(r.created_at).toLocaleDateString('en-GB')}
                      </span>
                    </td>

                    <td className="p-3.5">
                      <span className="font-ibm-plex-mono text-[10px] uppercase text-white block capitalize">
                        {r.request_type.replace('_', ' ')}
                      </span>
                      <span
                        className={`font-ibm-plex-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 inline-block mt-0.5 ${
                          isCritical
                            ? 'bg-red-950/80 text-red-400 border border-red-800'
                            : 'bg-[#222] text-[#888]'
                        }`}
                      >
                        {r.urgency.replace('_', ' ')}
                      </span>
                    </td>

                    <td className="p-3.5">
                      <span className="text-white block font-medium">
                        {r.machine_model}
                      </span>
                      <span className="font-mono text-[10px] text-[#777]">
                        {r.serial_number || 'Serial not provided'}
                      </span>
                    </td>

                    <td className="p-3.5">
                      <span className="text-white block">
                        {r.company_name}
                      </span>
                      <span className="text-[11px] text-[#777]">
                        {r.site_name || r.contact_name} ({r.contact_phone})
                      </span>
                    </td>

                    <td className="p-3.5 max-w-xs">
                      <p className="text-[11px] text-[#888] line-clamp-2">
                        {r.symptoms}
                      </p>
                    </td>

                    <td className="p-3.5">
                      <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest bg-[#222] text-alkota-orange px-2 py-1 border border-[#333]">
                        {r.status || 'new'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── REGISTERED MACHINE ASSETS AUDIT ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="border border-[#222] bg-[#111] p-6">
          <div className="flex items-center justify-between border-b border-[#222] pb-4 mb-4">
            <h3 className="font-ibm-plex-mono text-xs uppercase tracking-widest text-white">
              // Machine Registration Ledger
            </h3>
            <Link
              href="/service/machine-registration"
              target="_blank"
              className="text-xs font-ibm-plex-mono text-alkota-orange hover:underline"
            >
              Public Registration Portal →
            </Link>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-[#161616] border border-[#222]">
              <div className="flex justify-between text-white font-medium mb-1">
                <span>Alkota 430XH Hot Water</span>
                <span className="font-mono text-alkota-orange">ALK-2024-88421</span>
              </div>
              <div className="text-[#888] text-[11px]">
                Owner: Midlands Freight Logistics Ltd (Derby Central Hub) · 7-Yr Coil Warranty Active
              </div>
            </div>

            <div className="p-3 bg-[#161616] border border-[#222]">
              <div className="flex justify-between text-white font-medium mb-1">
                <span>Alkota 5305A Cold Stationary</span>
                <span className="font-mono text-alkota-orange">ALK-2023-11842</span>
              </div>
              <div className="text-[#888] text-[11px]">
                Owner: Pennine Poultry Processing Ltd (Buxton Plant) · PPM Schedule: Annual
              </div>
            </div>
          </div>
        </div>

        {/* Fleet Contracts */}
        <div className="border border-[#222] bg-[#111] p-6">
          <div className="flex items-center justify-between border-b border-[#222] pb-4 mb-4">
            <h3 className="font-ibm-plex-mono text-xs uppercase tracking-widest text-white">
              // Active Fleet Service Contracts
            </h3>
            <Link
              href="/service/contracts"
              target="_blank"
              className="text-xs font-ibm-plex-mono text-alkota-orange hover:underline"
            >
              Contract Structures →
            </Link>
          </div>

          <div className="space-y-3 text-xs">
            {SERVICE_PLANS.slice(0, 2).map((plan) => (
              <div key={plan.id} className="p-3 bg-[#161616] border border-[#222]">
                <div className="flex justify-between text-white font-medium mb-1">
                  <span>{plan.title}</span>
                  <span className="font-ibm-plex-mono text-emerald-400 text-[10px] uppercase">
                    Active Plan
                  </span>
                </div>
                <div className="text-[#888] text-[11px]">
                  {plan.idealFor} · Response: {plan.responseTarget}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
