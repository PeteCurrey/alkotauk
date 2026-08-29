'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ArrowRight, Weight, Droplets, Truck, AlertTriangle, CheckCircle2, Info, ArrowLeft, RefreshCw } from 'lucide-react';

export default function TrailerPayloadCalculatorPage() {
  const [mamKg, setMamKg] = useState<number>(2700);
  const [tareKg, setTareKg] = useState<number>(950);
  const [waterLitres, setWaterLitres] = useState<number>(1000);
  const [fuelKg, setFuelKg] = useState<number>(70);
  const [accessoriesKg, setAccessoriesKg] = useState<number>(150);
  const [towCapKg, setTowCapKg] = useState<string>('3500');

  // Calculations
  const waterMassKg = waterLitres * 1.0; // 1 litre approx 1 kg
  const totalWetWeightKg = tareKg + waterMassKg + fuelKg + accessoriesKg;
  const remainingPayloadKg = mamKg - totalWetWeightKg;
  const payloadPercent = Math.round((totalWetWeightKg / mamKg) * 100);
  const isOverweight = remainingPayloadKg < 0;

  const towRating = parseInt(towCapKg) || 0;
  const isTowCompatible = towRating >= mamKg;

  const handleReset = (presetMam: number, presetTare: number, presetWater: number) => {
    setMamKg(presetMam);
    setTareKg(presetTare);
    setWaterLitres(presetWater);
    setFuelKg(presetMam === 1500 ? 30 : 70);
    setAccessoriesKg(presetMam === 1500 ? 80 : 150);
  };

  return (
    <main className="bg-white text-alkota-black min-h-screen">
      <Navigation />

      {/* Hero (Cinematic Dark) */}
      <section className="pt-36 pb-16 px-6 border-b border-alkota-iron bg-[#0A0A0A] text-white">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/trailers"
            className="inline-flex items-center gap-2 text-xs font-ibm-plex-mono uppercase tracking-widest text-[#AAA] hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Alkota Trailers
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="h-[2px] w-8 bg-alkota-orange" />
            <span className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-[0.4em] text-alkota-orange">
              Engineering Educational Tool
            </span>
          </div>

          <h1 className="font-barlow-condensed text-5xl md:text-7xl font-black uppercase italic text-white leading-tight mb-4">
            TRAILER PAYLOAD &amp;<br />
            <span className="text-alkota-orange">TOWING ESTIMATOR.</span>
          </h1>

          <p className="text-alkota-silver text-base md:text-lg max-w-3xl leading-relaxed font-light mb-6">
            1,000 litres of water weighs exactly 1,000 kilograms (one metric tonne). This tool provides preliminary estimates of Maximum Authorised Mass (MAM), unladen tare mass, and water payload dynamics for UK mobile cleaning operations. Final towing suitability, axle loading, and regulatory compliance must be verified for the specific vehicle/trailer combination.
          </p>

          <div className="flex flex-wrap gap-2">
            <span className="text-xs font-mono text-[#AAA] self-center mr-2">Quick Chassis Presets:</span>
            <button
              onClick={() => handleReset(1500, 600, 500)}
              className="px-3 py-1.5 bg-[#141414] border border-[#2A2A2A] text-[10px] font-mono uppercase text-[#CCC] hover:border-alkota-orange hover:text-white"
            >
              1,500kg Single Axle (500L)
            </button>
            <button
              onClick={() => handleReset(2700, 950, 1000)}
              className="px-3 py-1.5 bg-[#141414] border border-[#2A2A2A] text-[10px] font-mono uppercase text-[#CCC] hover:border-alkota-orange hover:text-white"
            >
              2,700kg Tandem (1,000L)
            </button>
            <button
              onClick={() => handleReset(3500, 1250, 1500)}
              className="px-3 py-1.5 bg-[#141414] border border-[#2A2A2A] text-[10px] font-mono uppercase text-[#CCC] hover:border-alkota-orange hover:text-white"
            >
              3,500kg Heavy Tandem (1,500L)
            </button>
          </div>
        </div>
      </section>

      {/* Calculator Main Section (Warm Stone Light) */}
      <section className="py-20 px-6 bg-[#F7F7F5] border-b border-[#E5E5E0]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-start">
          {/* Controls (Left) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="border border-[#E0E0DC] bg-white p-6 md:p-8 space-y-6 shadow-sm">
              <h2 className="font-barlow-condensed text-2xl font-black uppercase italic text-alkota-black flex items-center gap-2">
                <Weight className="h-5 w-5 text-alkota-orange" />
                Input Trailer Mass & Capacities
              </h2>

              {/* Chassis MAM */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="font-ibm-plex-mono text-xs uppercase text-[#555] font-semibold">
                    Trailer Maximum Authorised Mass (MAM)
                  </label>
                  <span className="font-mono text-alkota-orange font-bold text-sm">{mamKg.toLocaleString()} kg</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="3500"
                  step="100"
                  value={mamKg}
                  onChange={e => setMamKg(Number(e.target.value))}
                  className="w-full accent-alkota-orange"
                />
                <div className="flex justify-between text-[9px] font-mono text-[#777] mt-1">
                  <span>1,000kg (Compact)</span>
                  <span>2,700kg (Standard Tandem)</span>
                  <span>3,500kg (UK Legal Max)</span>
                </div>
              </div>

              {/* Dry Tare Weight */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="font-ibm-plex-mono text-xs uppercase text-[#555] font-semibold">
                    Unladen Dry Tare Weight (Chassis + Machine)
                  </label>
                  <span className="font-mono text-alkota-black font-bold text-sm">{tareKg.toLocaleString()} kg</span>
                </div>
                <input
                  type="range"
                  min="400"
                  max="1800"
                  step="25"
                  value={tareKg}
                  onChange={e => setTareKg(Number(e.target.value))}
                  className="w-full accent-alkota-orange"
                />
              </div>

              {/* Water Storage */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="font-ibm-plex-mono text-xs uppercase text-[#555] font-semibold">
                    Water Tank Capacity (1L = 1kg)
                  </label>
                  <span className="font-mono text-alkota-orange font-bold text-sm">{waterLitres.toLocaleString()} Litres ({waterMassKg.toLocaleString()} kg)</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="2000"
                  step="100"
                  value={waterLitres}
                  onChange={e => setWaterLitres(Number(e.target.value))}
                  className="w-full accent-alkota-orange"
                />
                <div className="flex justify-between text-[9px] font-mono text-[#777] mt-1">
                  <span>0L (Mains-Fed)</span>
                  <span>1,000L (1 Tonne)</span>
                  <span>2,000L (2 Tonnes)</span>
                </div>
              </div>

              {/* Fuel and Accessories */}
              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="font-ibm-plex-mono text-[10px] uppercase text-[#666] block mb-1 font-semibold">
                    Fuel Mass (Diesel / Petrol)
                  </label>
                  <input
                    type="number"
                    value={fuelKg}
                    onChange={e => setFuelKg(Number(e.target.value))}
                    className="w-full bg-[#F9F9F8] border border-[#DDD] px-3 py-2 font-mono text-xs text-alkota-black"
                  />
                  <span className="text-[9px] font-mono text-[#777]">~70kg for 80L diesel</span>
                </div>
                <div>
                  <label className="font-ibm-plex-mono text-[10px] uppercase text-[#666] block mb-1 font-semibold">
                    Tools, Hoses & Chemicals
                  </label>
                  <input
                    type="number"
                    value={accessoriesKg}
                    onChange={e => setAccessoriesKg(Number(e.target.value))}
                    className="w-full bg-[#F9F9F8] border border-[#DDD] px-3 py-2 font-mono text-xs text-alkota-black"
                  />
                  <span className="text-[9px] font-mono text-[#777]">~150kg for dual reels + vaults</span>
                </div>
              </div>
            </div>

            {/* Tow Vehicle Verification */}
            <div className="border border-[#E0E0DC] bg-white p-6 md:p-8 space-y-4 shadow-sm">
              <h3 className="font-barlow-condensed text-xl font-bold uppercase text-alkota-black flex items-center gap-2">
                <Truck className="h-5 w-5 text-alkota-orange" />
                Tow Vehicle Braked Capacity Check
              </h3>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  value={towCapKg}
                  onChange={e => setTowCapKg(e.target.value)}
                  placeholder="e.g. 3500"
                  className="bg-[#F9F9F8] border border-[#DDD] px-4 py-2 font-mono text-sm text-alkota-black w-40"
                />
                <span className="text-xs text-[#666] font-mono">kg vehicle braked towing limit</span>
              </div>
              <div className={`p-4 text-xs font-mono border ${isTowCompatible ? 'border-green-300 bg-green-50 text-green-900' : 'border-red-300 bg-red-50 text-red-900'}`}>
                {isTowCompatible ? (
                  <span>✓ Vehicle capacity ({towRating}kg) meets or exceeds trailer MAM ({mamKg}kg).</span>
                ) : (
                  <span>⚠ Vehicle capacity ({towRating}kg) is below trailer MAM ({mamKg}kg). A heavier tow vehicle is required.</span>
                )}
              </div>
            </div>
          </div>

          {/* Results Display (Right - High Contrast Dark) */}
          <div className="lg:col-span-5 space-y-6">
            <div className={`border-2 p-8 bg-[#121212] text-white shadow-xl ${isOverweight ? 'border-red-500' : 'border-alkota-orange'}`}>
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#AAA] block mb-1">
                Calculated Total Wet Weight
              </span>
              <div className="font-barlow-condensed text-5xl font-black text-white mb-2">
                {totalWetWeightKg.toLocaleString()} <span className="text-2xl text-alkota-orange">kg</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-[#222] h-3 rounded-full overflow-hidden mb-3">
                <div
                  className={`h-full transition-all duration-300 ${isOverweight ? 'bg-red-500' : payloadPercent > 90 ? 'bg-yellow-500' : 'bg-green-500'}`}
                  style={{ width: `${Math.min(payloadPercent, 100)}%` }}
                />
              </div>

              <div className="flex justify-between text-xs font-mono mb-6">
                <span className="text-[#888]">Utilization: {payloadPercent}%</span>
                <span className={isOverweight ? 'text-red-400 font-bold' : 'text-green-400 font-bold'}>
                  {isOverweight ? `OVERWEIGHT BY ${Math.abs(remainingPayloadKg)}kg` : `${remainingPayloadKg.toLocaleString()}kg PAYLOAD MARGIN`}
                </span>
              </div>

              {/* Breakdown */}
              <div className="border-t border-[#222] pt-4 space-y-2 text-xs font-mono">
                <div className="flex justify-between text-[#888]">
                  <span>Unladen Chassis & Skid:</span>
                  <span className="text-white">{tareKg.toLocaleString()} kg</span>
                </div>
                <div className="flex justify-between text-[#888]">
                  <span>Water Payload ({waterLitres}L):</span>
                  <span className="text-alkota-orange font-bold">+{waterMassKg.toLocaleString()} kg</span>
                </div>
                <div className="flex justify-between text-[#888]">
                  <span>Fuel Mass:</span>
                  <span className="text-white">+{fuelKg.toLocaleString()} kg</span>
                </div>
                <div className="flex justify-between text-[#888]">
                  <span>Accessories / Vaults:</span>
                  <span className="text-white">+{accessoriesKg.toLocaleString()} kg</span>
                </div>
                <div className="flex justify-between border-t border-[#222] pt-2 font-bold">
                  <span className="text-white">Chassis MAM Limit:</span>
                  <span className="text-white">{mamKg.toLocaleString()} kg</span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#222]">
                <Link
                  href="/trailers/configure"
                  className="w-full bg-alkota-orange py-4 font-ibm-plex-mono text-[10px] font-black uppercase tracking-widest text-white hover:bg-alkota-orange/90 transition-all flex items-center justify-center gap-2"
                >
                  Configure Rig in Builder <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="border border-[#E0E0DC] bg-white p-5 text-xs text-[#555] leading-relaxed shadow-sm space-y-2">
              <p>
                <strong className="text-alkota-orange">Important Engineering &amp; Legal Notice:</strong> This estimator provides preliminary calculations based on configured capacities. Axle load distribution, noseweight on the towbar, and specific vehicle Gross Train Weight (GTW) must be verified for the final physical rig.
              </p>
              <p className="text-[11px] text-[#777]">
                For definitive UK driving licence towing entitlement and vehicle limits, consult official <a href="https://www.gov.uk/towing-with-car" target="_blank" rel="noopener noreferrer" className="text-alkota-orange underline">GOV.UK Towing Regulations</a>.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
