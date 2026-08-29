import React from 'react';
import Link from 'next/link';
import { ShieldCheck, CheckCircle2, FileText, ArrowRight, Shield, Bell, Wrench } from 'lucide-react';
import MachineRegistrationForm from '@/components/service/MachineRegistrationForm';

export const metadata = {
  title: 'Register Your Machine | Alkota UK',
  description:
    'Register your Alkota pressure washer serial number to activate the 7-Year Heating Coil Warranty, link verified parts manuals, and enable digital service records.',
};

export default function MachineRegistrationPage() {
  return (
    <main className="bg-[#FAF9F5] text-alkota-black">
      {/* ── HERO ── */}
      <section className="bg-[#0A0A0A] text-white pt-32 pb-20 px-6 sm:px-12 lg:px-24 border-b border-[#222]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/service" className="text-xs font-ibm-plex-mono text-[#888] hover:text-alkota-orange">
              Service
            </Link>
            <span className="text-xs text-[#555]">/</span>
            <span className="text-xs font-ibm-plex-mono text-alkota-orange">Machine Registration</span>
          </div>

          <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange bg-[#1A1A1A] px-3 py-1 border border-[#333] inline-block mb-4">
            Factory Asset Ledger
          </span>

          <h1 className="font-extralight text-4xl sm:text-6xl text-white tracking-tight leading-tight max-w-4xl mb-6">
            Register Your Alkota Machine
          </h1>
          <p className="text-base sm:text-lg text-[#AAA] font-normal leading-relaxed max-w-2xl mb-8">
            Activate your 7-Year Heating Coil Warranty, link exact factory build schematics, and unlock verified digital service records for the working life of your equipment.
          </p>

          <div className="flex items-center gap-6 text-xs text-[#777] font-ibm-plex-mono">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Free Registration
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Instant Warranty Activation
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Direct Engineer Records
            </span>
          </div>
        </div>
      </section>

      {/* ── MAIN REGISTRATION PORTAL ── */}
      <section className="py-20 px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          {/* Left Column: Why Register */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-[#E8E8E4] p-6">
              <Shield className="w-6 h-6 text-alkota-orange mb-3" />
              <h3 className="font-medium text-base text-alkota-black mb-2">
                Why Register Your Machine?
              </h3>
              <p className="text-xs text-[#666] leading-relaxed mb-4">
                Registration creates an authoritative digital record of your equipment in our central engineering database.
              </p>

              <ul className="text-xs text-[#555] space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-alkota-orange shrink-0 mt-0.5" />
                  <span><strong>7-Year Coil Warranty:</strong> Immediate factory registration of ASTM A53 Schedule 80 heating coils.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-alkota-orange shrink-0 mt-0.5" />
                  <span><strong>Exact Parts Matching:</strong> Eliminates guesswork by linking parts schematics to your serial number.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-alkota-orange shrink-0 mt-0.5" />
                  <span><strong>Service Reminders:</strong> Automated alerts before 500-hour or annual maintenance intervals.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-alkota-orange shrink-0 mt-0.5" />
                  <span><strong>Digital Service History:</strong> Engineer reports and safety test certificates attached to your asset ledger.</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#F0EFEB] border border-[#E8E8E4] p-6 text-xs text-[#666]">
              <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#888] block mb-2">
                // Public Access Note
              </span>
              <p className="leading-relaxed">
                Standard technical documentation, parts manuals, and general guidance remain publicly accessible without registration. Machine registration provides additional ownership and warranty value.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Registration Form */}
          <div className="lg:col-span-8">
            <MachineRegistrationForm />
          </div>
        </div>
      </section>
    </main>
  );
}
