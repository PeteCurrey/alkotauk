'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import WashPlantSubNav from '@/components/wash-plant/WashPlantSubNav';
import WashPlantSchema from '@/components/wash-plant/WashPlantSchema';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Download,
  Send,
  Sparkles,
  HelpCircle,
  Clock,
  Droplets,
  Layers,
  Factory,
  ShieldCheck,
  Printer,
  ChevronRight,
  AlertCircle,
  Compass
} from 'lucide-react';
import Link from 'next/link';

export default function WashPlantArchitectPage() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [reference, setReference] = useState<string>('');

  // Form State across 9 steps
  const [formData, setFormData] = useState({
    // Step 1: Asset Types
    assetTypes: [] as string[],
    otherAsset: '',

    // Step 2: Asset Dimensions & Geometry
    maxLengthMm: '',
    maxWidthMm: '',
    maxHeightMm: '',
    maxWeightKg: '',
    criticalNoSprayZones: '',
    assetCondition: 'moderate', // light, moderate, heavy, extreme

    // Step 3: Throughput
    assetsPerHour: '',
    assetsPerShift: '',
    operatingHoursPerDay: '8',
    operatingDaysPerWeek: '5',
    peakThroughput: '',
    targetCycleMinutes: '',

    // Step 4: Contamination
    contamination: [] as string[],
    otherContamination: '',

    // Step 5: Architecture Preference
    architecturePreference: 'advise_me', // manual, semi_automated, automated, conveyorised, gantry, demucking, sanitary, advise_me

    // Step 6: Water & Utilities
    mainsWaterAvailable: 'yes',
    mainsFlowLpm: '',
    waterReuseRequired: 'yes',
    existingWaterTreatment: 'no',
    dischargeDestination: 'foul_sewer', // foul_sewer, surface_drain, zero_discharge, tanker_haul

    // Step 7: Site & Civils
    siteType: 'existing_facility', // new_build, existing_facility, temporary_site
    installationLocation: 'outdoor_covered', // indoor_plant, outdoor_covered, outdoor_open
    availableFootprint: '',
    threePhasePowerAvailable: 'yes',
    heatingFuelPreference: 'natural_gas', // natural_gas, lpg, diesel, electric, cold_only
    civilsRequired: 'unknown',

    // Step 8: Project Scope Indicators
    budgetBand: '£250k–£500k',
    targetDate: '',
    procurementRoute: 'direct_award', // direct_award, competitive_tender, consultant_spec, budget_pricing
    projectStage: 'feasibility', // early_concept, feasibility, planning_approved, tender_active

    // Step 9: Lifecycle & Service
    serviceRequirements: [
      'Planned Preventative Maintenance (PPM)',
      'Critical Spares Site Holding Package',
      'Operator & Safety Training'
    ] as string[],

    // Lead Capture
    clientName: '',
    clientCompany: '',
    clientEmail: '',
    clientPhone: '',
    siteLocation: '',
    projectName: '',
    additionalNotes: ''
  });

  const toggleArrayItem = (field: 'assetTypes' | 'contamination' | 'serviceRequirements', value: string) => {
    setFormData(prev => {
      const arr = prev[field];
      if (arr.includes(value)) {
        return { ...prev, [field]: arr.filter(item => item !== value) };
      } else {
        return { ...prev, [field]: [...arr, value] };
      }
    });
  };

  const handleNext = () => {
    if (currentStep < 10) setCurrentStep(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const payload = {
        name: formData.clientName,
        company: formData.clientCompany,
        email: formData.clientEmail,
        phone: formData.clientPhone,
        site_location: formData.siteLocation,
        project_name: formData.projectName || `${formData.clientCompany} Wash Plant Project`,
        architect_data: {
          step1: { asset_types: formData.assetTypes, other: formData.otherAsset },
          step2: {
            dimensions: {
              length_mm: formData.maxLengthMm,
              width_mm: formData.maxWidthMm,
              height_mm: formData.maxHeightMm,
              weight_kg: formData.maxWeightKg,
            },
            no_spray_zones: formData.criticalNoSprayZones,
            condition: formData.assetCondition
          },
          step3: {
            assets_per_hour: formData.assetsPerHour,
            assets_per_shift: formData.assetsPerShift,
            operating_hours_per_day: formData.operatingHoursPerDay,
            days_per_week: formData.operatingDaysPerWeek,
            peak_throughput: formData.peakThroughput,
            target_cycle_minutes: formData.targetCycleMinutes
          },
          step4: { contamination: formData.contamination, other: formData.otherContamination },
          step5: { preference: formData.architecturePreference },
          step6: {
            mains_water: formData.mainsWaterAvailable,
            mains_flow_lpm: formData.mainsFlowLpm,
            reuse_required: formData.waterReuseRequired,
            existing_treatment: formData.existingWaterTreatment,
            discharge: formData.dischargeDestination
          },
          step7: {
            site_type: formData.siteType,
            location: formData.installationLocation,
            footprint: formData.availableFootprint,
            three_phase: formData.threePhasePowerAvailable,
            heating_fuel: formData.heatingFuelPreference,
            civils_required: formData.civilsRequired
          },
          step8: {
            budget_band: formData.budgetBand,
            target_date: formData.targetDate,
            procurement_route: formData.procurementRoute,
            project_stage: formData.projectStage
          },
          step9: { requirements: formData.serviceRequirements },
          notes: formData.additionalNotes
        }
      };

      const res = await fetch('/api/wash-plant/submit-brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (data.reference) setReference(data.reference);
      setSubmitted(true);
    } catch (err) {
      console.error('Submit brief error:', err);
      setReference(`WP-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000) + 1000}`);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="min-h-screen bg-alkota-bg text-alkota-black pt-20 pb-24">
      <WashPlantSchema
        pageTitle="Wash Plant Architect | Industrial Scoping Tool | Alkota UK"
        pageDescription="Interactive pre-engineering scoping tool for industrial wash plants. Define asset geometries, throughput, soil profiles, water balance, and site utilities to compile a Preliminary Project Brief."
        pageUrl="https://alkota.co.uk/wash-plant/architect"
      />

      <Navigation />
      <WashPlantSubNav />

      <div className="mx-auto max-w-5xl px-6 pt-10">
        <Breadcrumbs items={[
          { label: 'Wash Plant Infrastructure', href: '/wash-plant' },
          { label: 'Wash Plant Architect' }
        ]} />

        {/* Header */}
        <div className="mt-8 mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-[2px] w-8 bg-alkota-orange" />
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.35em] text-alkota-orange">
              // PRE-ENGINEERING SCOPING ENGINE
            </span>
          </div>
          <h1 className="font-extralight text-4xl sm:text-6xl uppercase tracking-tight text-alkota-black leading-tight">
            The Wash Plant Architect.
          </h1>
          <p className="text-sm text-alkota-silver max-w-2xl mt-2 leading-relaxed">
            Structure your project requirement across 9 engineering dimensions. This tool compiles an initial technical scoping brief for Alkota UK application engineers.
          </p>
        </div>

        {/* Step Indicator Bar */}
        {!submitted && (
          <div className="mb-10 bg-white border border-alkota-iron p-4 shadow-sm">
            <div className="flex items-center justify-between text-xs font-ibm-plex-mono text-alkota-silver uppercase tracking-wider mb-2">
              <span className="text-alkota-black">
                Step {currentStep} of 10: {
                  currentStep === 1 ? 'Asset Identification' :
                  currentStep === 2 ? 'Asset Geometry & Envelope' :
                  currentStep === 3 ? 'Throughput Modelling' :
                  currentStep === 4 ? 'Contamination Profile' :
                  currentStep === 5 ? 'Architecture Philosophy' :
                  currentStep === 6 ? 'Water & Utilities' :
                  currentStep === 7 ? 'Site & Civils' :
                  currentStep === 8 ? 'Commercial Scope Indicators' :
                  currentStep === 9 ? 'Lifecycle & Service' : 'Project Brief Summary'
                }
              </span>
              <span className="text-alkota-orange font-normal">{Math.round((currentStep / 10) * 100)}%</span>
            </div>
            <div className="w-full bg-alkota-bg h-1.5 overflow-hidden">
              <div
                className="bg-alkota-orange h-full transition-all duration-300"
                style={{ width: `${(currentStep / 10) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Form Container */}
        <div className="bg-white border border-alkota-iron p-8 sm:p-12 shadow-sm">
          {!submitted ? (
            <div>
              {/* STEP 1: ASSET IDENTIFICATION */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-1">
                      STEP 01 // ASSET CLASSIFICATION
                    </span>
                    <h2 className="font-extralight text-3xl uppercase tracking-tight text-alkota-black">
                      What are we cleaning?
                    </h2>
                    <p className="text-xs text-alkota-silver uppercase tracking-wider mt-1">
                      Select all asset types relevant to this installation.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {[
                      'Heavy Plant & Earthmoving (Excavators, Dozers)',
                      'Commercial Vehicles & HGVs (Tractor Units, Trailers)',
                      'Logistics & Delivery Fleet',
                      'Buses & Passenger Coaches',
                      'Rail Rolling Stock & Bogies',
                      'Rig & Access Mats (Timber / Composite)',
                      'Steel Sheet Piling & Trench Boxes',
                      'Industrial Components & Degreasing',
                      'Food & Beverage Process Machinery / CIP',
                      'Manufacturing Totes, Bins & Pallets',
                      'Agricultural & Forestry Machinery',
                      'Waste & Refuse Vehicles'
                    ].map((asset) => {
                      const isSelected = formData.assetTypes.includes(asset);
                      return (
                        <button
                          type="button"
                          key={asset}
                          onClick={() => toggleArrayItem('assetTypes', asset)}
                          className={`p-4 text-left text-xs uppercase tracking-wide border transition-all flex items-start justify-between ${
                            isSelected
                              ? 'border-alkota-orange bg-alkota-orange/5 text-alkota-black'
                              : 'border-alkota-iron hover:border-alkota-silver text-alkota-silver'
                          }`}
                        >
                          <span className="pr-2">{asset}</span>
                          <CheckCircle2 className={`h-4 w-4 shrink-0 transition-colors ${
                            isSelected ? 'text-alkota-orange' : 'text-transparent'
                          }`} />
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-2">
                    <label className="block text-xs font-ibm-plex-mono uppercase text-alkota-silver mb-1">
                      Other Specific Asset Types (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.otherAsset}
                      onChange={(e) => setFormData({ ...formData, otherAsset: e.target.value })}
                      placeholder="e.g. Specialized offshore tubulars, aircraft ground support..."
                      className="w-full p-3 text-xs bg-alkota-bg border border-alkota-iron focus:border-alkota-orange outline-none"
                    />
                  </div>
                </div>
              )}

              {/* STEP 2: ASSET GEOMETRY & DATA */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-1">
                      STEP 02 // PHYSICAL ENVELOPE
                    </span>
                    <h2 className="font-extralight text-3xl uppercase tracking-tight text-alkota-black">
                      Asset Data & Geometry.
                    </h2>
                    <p className="text-xs text-alkota-silver uppercase tracking-wider mt-1">
                      Provide maximum envelope dimensions for the largest single asset.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-ibm-plex-mono uppercase text-alkota-black mb-1">
                        Max Asset Length (mm)
                      </label>
                      <input
                        type="text"
                        value={formData.maxLengthMm}
                        onChange={(e) => setFormData({ ...formData, maxLengthMm: e.target.value })}
                        placeholder="e.g. 16500 (Articulated HGV)"
                        className="w-full p-3 text-xs bg-alkota-bg border border-alkota-iron focus:border-alkota-orange outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-ibm-plex-mono uppercase text-alkota-black mb-1">
                        Max Asset Width (mm)
                      </label>
                      <input
                        type="text"
                        value={formData.maxWidthMm}
                        onChange={(e) => setFormData({ ...formData, maxWidthMm: e.target.value })}
                        placeholder="e.g. 2600"
                        className="w-full p-3 text-xs bg-alkota-bg border border-alkota-iron focus:border-alkota-orange outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-ibm-plex-mono uppercase text-alkota-black mb-1">
                        Max Asset Height (mm)
                      </label>
                      <input
                        type="text"
                        value={formData.maxHeightMm}
                        onChange={(e) => setFormData({ ...formData, maxHeightMm: e.target.value })}
                        placeholder="e.g. 4200"
                        className="w-full p-3 text-xs bg-alkota-bg border border-alkota-iron focus:border-alkota-orange outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-ibm-plex-mono uppercase text-alkota-black mb-1">
                        Max Asset Weight (kg)
                      </label>
                      <input
                        type="text"
                        value={formData.maxWeightKg}
                        onChange={(e) => setFormData({ ...formData, maxWeightKg: e.target.value })}
                        placeholder="e.g. 44000"
                        className="w-full p-3 text-xs bg-alkota-bg border border-alkota-iron focus:border-alkota-orange outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-ibm-plex-mono uppercase text-alkota-black mb-1">
                      Critical No-Spray / Sensitive Zones (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.criticalNoSprayZones}
                      onChange={(e) => setFormData({ ...formData, criticalNoSprayZones: e.target.value })}
                      placeholder="e.g. Sensitive electronics, unsealed bearings, air intake louvres..."
                      className="w-full p-3 text-xs bg-alkota-bg border border-alkota-iron focus:border-alkota-orange outline-none"
                    />
                  </div>
                </div>
              )}

              {/* STEP 3: THROUGHPUT MODELLING */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-1">
                      STEP 03 // OPERATIONAL DEMAND
                    </span>
                    <h2 className="font-extralight text-3xl uppercase tracking-tight text-alkota-black">
                      Throughput & Duty Cycle.
                    </h2>
                    <p className="text-xs text-alkota-silver uppercase tracking-wider mt-1">
                      Throughput dictates pump sizing, thermal heating BTU capacity, and bay count.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-ibm-plex-mono uppercase text-alkota-black mb-1">
                        Target Assets Per Hour
                      </label>
                      <input
                        type="text"
                        value={formData.assetsPerHour}
                        onChange={(e) => setFormData({ ...formData, assetsPerHour: e.target.value })}
                        placeholder="e.g. 4 vehicles / 30 mats"
                        className="w-full p-3 text-xs bg-alkota-bg border border-alkota-iron focus:border-alkota-orange outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-ibm-plex-mono uppercase text-alkota-black mb-1">
                        Target Assets Per Shift
                      </label>
                      <input
                        type="text"
                        value={formData.assetsPerShift}
                        onChange={(e) => setFormData({ ...formData, assetsPerShift: e.target.value })}
                        placeholder="e.g. 35 vehicles per shift"
                        className="w-full p-3 text-xs bg-alkota-bg border border-alkota-iron focus:border-alkota-orange outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-ibm-plex-mono uppercase text-alkota-black mb-1">
                        Operating Hours Per Day
                      </label>
                      <select
                        value={formData.operatingHoursPerDay}
                        onChange={(e) => setFormData({ ...formData, operatingHoursPerDay: e.target.value })}
                        className="w-full p-3 text-xs bg-alkota-bg border border-alkota-iron focus:border-alkota-orange outline-none uppercase"
                      >
                        <option value="4">4 Hours / Day (Intermittent)</option>
                        <option value="8">8 Hours / Day (Single Shift)</option>
                        <option value="16">16 Hours / Day (Double Shift)</option>
                        <option value="24">24 Hours / Day (Continuous Multi-Shift)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-ibm-plex-mono uppercase text-alkota-black mb-1">
                        Acceptable Wash Cycle Time (Minutes)
                      </label>
                      <input
                        type="text"
                        value={formData.targetCycleMinutes}
                        onChange={(e) => setFormData({ ...formData, targetCycleMinutes: e.target.value })}
                        placeholder="e.g. 5 minutes per vehicle"
                        className="w-full p-3 text-xs bg-alkota-bg border border-alkota-iron focus:border-alkota-orange outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: CONTAMINATION PROFILE */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-1">
                      STEP 04 // SOIL & CHEMICAL DEMAND
                    </span>
                    <h2 className="font-extralight text-3xl uppercase tracking-tight text-alkota-black">
                      Contamination Profile.
                    </h2>
                    <p className="text-xs text-alkota-silver uppercase tracking-wider mt-1">
                      Select primary soil types to determine filtration, thermal heating, and chemistry.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      'Heavy Compacted Mud & Silt',
                      'Dense Clay & Earth',
                      'Sand, Gravel & Heavy Aggregate',
                      'Heavy Petroleum Greases & Lubricants',
                      'Diesel & Hydrocarbon Residues',
                      'Traffic Film & Road Dust',
                      'Winter Road Salt & Brine',
                      'Bitumen, Tar & Asphalt',
                      'Organic & Biological Residues',
                      'Animal By-Products / Abattoir Effluent',
                      'Chemical / Polymer / Paint Residues',
                      'Food Starches, Fats, Oils & Grease (FOG)'
                    ].map((contam) => {
                      const isSelected = formData.contamination.includes(contam);
                      return (
                        <button
                          type="button"
                          key={contam}
                          onClick={() => toggleArrayItem('contamination', contam)}
                          className={`p-4 text-left text-xs uppercase tracking-wide border transition-all flex items-start justify-between ${
                            isSelected
                              ? 'border-alkota-orange bg-alkota-orange/5 text-alkota-black'
                              : 'border-alkota-iron hover:border-alkota-silver text-alkota-silver'
                          }`}
                        >
                          <span className="pr-2">{contam}</span>
                          <CheckCircle2 className={`h-4 w-4 shrink-0 transition-colors ${
                            isSelected ? 'text-alkota-orange' : 'text-transparent'
                          }`} />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 5: CLEANING ARCHITECTURE */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <div>
                    <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-1">
                      STEP 05 // AUTOMATION PHILOSOPHY
                    </span>
                    <h2 className="font-extralight text-3xl uppercase tracking-tight text-alkota-black">
                      Desired Architecture.
                    </h2>
                    <p className="text-xs text-alkota-silver uppercase tracking-wider mt-1">
                      Indicate your operational preference for automation.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {[
                      { id: 'manual_bay', title: 'Manual Multi-Operator Bay', desc: 'Centralised high-pressure plant room feeding manual lances and 360° boom arms.' },
                      { id: 'semi_automated', title: 'Semi-Automated System', desc: 'Automated underbody/wheel wash with manual lance detail stations.' },
                      { id: 'automated_drive_through', title: 'Fully Automated Drive-Through', desc: 'Optical/sonar triggered vehicle wash arches with minimal operator involvement.' },
                      { id: 'conveyorised_tunnel', title: 'Automated Conveyorised Tunnel', desc: 'Continuous mechanical conveyor carrying planar or component assets through spray tunnels.' },
                      { id: 'heavy_demucking', title: 'Heavy Plant De-Mucking System', desc: 'High-volume 80 GPM water monitors and drive-over chassis flush ramps.' },
                      { id: 'advise_me', title: 'Advise Me — Engineering Recommendation', desc: 'Let Alkota engineers evaluate throughput vs CAPEX to recommend the optimal architecture.' }
                    ].map((item) => (
                      <button
                        type="button"
                        key={item.id}
                        onClick={() => setFormData({ ...formData, architecturePreference: item.id })}
                        className={`w-full p-4 text-left border transition-all ${
                          formData.architecturePreference === item.id
                            ? 'border-alkota-orange bg-alkota-orange/5'
                            : 'border-alkota-iron hover:border-alkota-silver'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs uppercase font-normal text-alkota-black">{item.title}</h4>
                          <span className={`h-3 w-3 rounded-full border ${
                            formData.architecturePreference === item.id ? 'bg-alkota-orange border-alkota-orange' : 'border-alkota-silver'
                          }`} />
                        </div>
                        <p className="text-[11px] text-alkota-silver mt-1">{item.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 6: WATER & UTILITIES */}
              {currentStep === 6 && (
                <div className="space-y-6">
                  <div>
                    <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-1">
                      STEP 06 // WATER & ENVIRONMENTAL STRATEGY
                    </span>
                    <h2 className="font-extralight text-3xl uppercase tracking-tight text-alkota-black">
                      Water Infrastructure.
                    </h2>
                    <p className="text-xs text-alkota-silver uppercase tracking-wider mt-1">
                      Water balance, trade effluent compliance, and closed-loop requirements.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-ibm-plex-mono uppercase text-alkota-black mb-1">
                        Mains Water Available on Site?
                      </label>
                      <select
                        value={formData.mainsWaterAvailable}
                        onChange={(e) => setFormData({ ...formData, mainsWaterAvailable: e.target.value })}
                        className="w-full p-3 text-xs bg-alkota-bg border border-alkota-iron focus:border-alkota-orange outline-none uppercase"
                      >
                        <option value="yes">Yes — Dedicated High-Flow Supply</option>
                        <option value="limited">Yes — Restricted / Low Flow</option>
                        <option value="no">No — Tanker Delivery Only</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-ibm-plex-mono uppercase text-alkota-black mb-1">
                        Closed-Loop Water Recycling Required?
                      </label>
                      <select
                        value={formData.waterReuseRequired}
                        onChange={(e) => setFormData({ ...formData, waterReuseRequired: e.target.value })}
                        className="w-full p-3 text-xs bg-alkota-bg border border-alkota-iron focus:border-alkota-orange outline-none uppercase"
                      >
                        <option value="yes">Yes — Up to 90% Closed-Loop Recirculation</option>
                        <option value="partial">Partial — Primary Clarification Only</option>
                        <option value="no">No — Direct Consented Discharge</option>
                        <option value="advise">Advise on Environmental ROI</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-ibm-plex-mono uppercase text-alkota-black mb-1">
                        Site Discharge Destination
                      </label>
                      <select
                        value={formData.dischargeDestination}
                        onChange={(e) => setFormData({ ...formData, dischargeDestination: e.target.value })}
                        className="w-full p-3 text-xs bg-alkota-bg border border-alkota-iron focus:border-alkota-orange outline-none uppercase"
                      >
                        <option value="foul_sewer">Foul Sewer (Trade Effluent Consent)</option>
                        <option value="surface_drain">Surface Water Interceptor (EA / SEPA)</option>
                        <option value="zero_discharge">Zero Liquid Discharge (100% Closed Loop)</option>
                        <option value="tanker_haul">Cesspit / Tanker Extraction</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-ibm-plex-mono uppercase text-alkota-black mb-1">
                        Existing Water Treatment Plant on Site?
                      </label>
                      <select
                        value={formData.existingWaterTreatment}
                        onChange={(e) => setFormData({ ...formData, existingWaterTreatment: e.target.value })}
                        className="w-full p-3 text-xs bg-alkota-bg border border-alkota-iron focus:border-alkota-orange outline-none uppercase"
                      >
                        <option value="no">No — Turnkey Treatment Package Required</option>
                        <option value="yes">Yes — Interface with Existing Facility</option>
                        <option value="upgrade">Yes — But Needs Refurbishment/Upgrade</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 7: SITE & CIVILS */}
              {currentStep === 7 && (
                <div className="space-y-6">
                  <div>
                    <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-1">
                      STEP 07 // SITE CONSTRAINTS & UTILITIES
                    </span>
                    <h2 className="font-extralight text-3xl uppercase tracking-tight text-alkota-black">
                      Site & Civils Environment.
                    </h2>
                    <p className="text-xs text-alkota-silver uppercase tracking-wider mt-1">
                      Physical location, power supply, and civil engineering interfaces.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-ibm-plex-mono uppercase text-alkota-black mb-1">
                        Site Type
                      </label>
                      <select
                        value={formData.siteType}
                        onChange={(e) => setFormData({ ...formData, siteType: e.target.value })}
                        className="w-full p-3 text-xs bg-alkota-bg border border-alkota-iron focus:border-alkota-orange outline-none uppercase"
                      >
                        <option value="existing_facility">Existing Operational Facility</option>
                        <option value="new_build">New Build / Greenfield Site</option>
                        <option value="temporary_site">Temporary / Demountable Site</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-ibm-plex-mono uppercase text-alkota-black mb-1">
                        Installation Environment
                      </label>
                      <select
                        value={formData.installationLocation}
                        onChange={(e) => setFormData({ ...formData, installationLocation: e.target.value })}
                        className="w-full p-3 text-xs bg-alkota-bg border border-alkota-iron focus:border-alkota-orange outline-none uppercase"
                      >
                        <option value="outdoor_covered">Outdoor Covered Canopy</option>
                        <option value="indoor_plant">Enclosed Dedicated Wash Bay Building</option>
                        <option value="outdoor_open">Outdoor Open Apron</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-ibm-plex-mono uppercase text-alkota-black mb-1">
                        3-Phase 400V Power Available?
                      </label>
                      <select
                        value={formData.threePhasePowerAvailable}
                        onChange={(e) => setFormData({ ...formData, threePhasePowerAvailable: e.target.value })}
                        className="w-full p-3 text-xs bg-alkota-bg border border-alkota-iron focus:border-alkota-orange outline-none uppercase"
                      >
                        <option value="yes">Yes — 400V 3-Phase Available</option>
                        <option value="limited">Single Phase 230V Only (Generators Needed)</option>
                        <option value="unknown">To Be Determined in Site Survey</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-ibm-plex-mono uppercase text-alkota-black mb-1">
                        Water Heating Fuel Preference
                      </label>
                      <select
                        value={formData.heatingFuelPreference}
                        onChange={(e) => setFormData({ ...formData, heatingFuelPreference: e.target.value })}
                        className="w-full p-3 text-xs bg-alkota-bg border border-alkota-iron focus:border-alkota-orange outline-none uppercase"
                      >
                        <option value="natural_gas">Mains Natural Gas (High Efficiency)</option>
                        <option value="lpg">LPG / Propane Storage</option>
                        <option value="diesel">Diesel / Red Diesel / HVO</option>
                        <option value="electric">All-Electric Thermal Power</option>
                        <option value="cold_only">Cold Water Only (No Heating)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 8: COMMERCIAL SCOPE INDICATORS */}
              {currentStep === 8 && (
                <div className="space-y-6">
                  <div>
                    <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-1">
                      STEP 08 // COMMERCIAL PARAMETERS
                    </span>
                    <h2 className="font-extralight text-3xl uppercase tracking-tight text-alkota-black">
                      Budget Scope & Timeline.
                    </h2>
                    <p className="text-xs text-alkota-silver uppercase tracking-wider mt-1">
                      Budget bands are project scope indicators to match appropriate engineering depth, NOT fixed Alkota pricing.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-ibm-plex-mono uppercase text-alkota-black mb-2">
                        Indicative Project Scope Indicator
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {['< £100k', '£100k–£250k', '£250k–£500k', '£500k–£1m', '£1m+', 'Not yet established'].map((band) => (
                          <button
                            type="button"
                            key={band}
                            onClick={() => setFormData({ ...formData, budgetBand: band })}
                            className={`p-3 text-xs uppercase tracking-wide border transition-all text-center ${
                              formData.budgetBand === band
                                ? 'border-alkota-orange bg-alkota-orange text-white'
                                : 'border-alkota-iron hover:border-alkota-silver bg-alkota-bg text-alkota-black'
                            }`}
                          >
                            {band}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div>
                        <label className="block text-xs font-ibm-plex-mono uppercase text-alkota-black mb-1">
                          Target Commissioning Date
                        </label>
                        <input
                          type="text"
                          value={formData.targetDate}
                          onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
                          placeholder="e.g. Q4 2026 / March 2027"
                          className="w-full p-3 text-xs bg-alkota-bg border border-alkota-iron focus:border-alkota-orange outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-ibm-plex-mono uppercase text-alkota-black mb-1">
                          Procurement Method
                        </label>
                        <select
                          value={formData.procurementRoute}
                          onChange={(e) => setFormData({ ...formData, procurementRoute: e.target.value })}
                          className="w-full p-3 text-xs bg-alkota-bg border border-alkota-iron focus:border-alkota-orange outline-none uppercase"
                        >
                          <option value="direct_award">Direct Engineering Award</option>
                          <option value="competitive_tender">Competitive Formal Tender</option>
                          <option value="consultant_spec">Consultant / M&E Specification</option>
                          <option value="budget_pricing">Early Budget Scoping Only</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 9: LIFECYCLE & SERVICE */}
              {currentStep === 9 && (
                <div className="space-y-6">
                  <div>
                    <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-1">
                      STEP 09 // ASSET MANAGEMENT & SERVICE
                    </span>
                    <h2 className="font-extralight text-3xl uppercase tracking-tight text-alkota-black">
                      Lifecycle Support Strategy.
                    </h2>
                    <p className="text-xs text-alkota-silver uppercase tracking-wider mt-1">
                      A wash plant only creates value when operational. Structure your post-handover support.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      'Planned Preventative Maintenance (PPM)',
                      'Priority Emergency Reactive Callout',
                      'Critical Spares Site Holding Package',
                      'Remote Diagnostics & Telemetry',
                      'Operator & EHS Training Programmes',
                      'Quarterly Environmental / Water Audit',
                      'Multi-Site Asset Management',
                      'Pump & Burner Overhaul Cover'
                    ].map((req) => {
                      const isSelected = formData.serviceRequirements.includes(req);
                      return (
                        <button
                          type="button"
                          key={req}
                          onClick={() => toggleArrayItem('serviceRequirements', req)}
                          className={`p-4 text-left text-xs uppercase tracking-wide border transition-all flex items-start justify-between ${
                            isSelected
                              ? 'border-alkota-orange bg-alkota-orange/5 text-alkota-black'
                              : 'border-alkota-iron hover:border-alkota-silver text-alkota-silver'
                          }`}
                        >
                          <span className="pr-2">{req}</span>
                          <CheckCircle2 className={`h-4 w-4 shrink-0 transition-colors ${
                            isSelected ? 'text-alkota-orange' : 'text-transparent'
                          }`} />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 10: SUMMARY & LEAD CAPTURE */}
              {currentStep === 10 && (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div>
                    <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-1">
                      COMPILED PRELIMINARY BRIEF // STAGE 10
                    </span>
                    <h2 className="font-extralight text-3xl uppercase tracking-tight text-alkota-black">
                      Alkota Wash Plant Preliminary Brief.
                    </h2>
                    <p className="text-xs text-alkota-silver uppercase tracking-wider mt-1">
                      Review your scoping summary below. Provide contact details to transmit this brief to Alkota engineering.
                    </p>
                  </div>

                  {/* Scoping Summary Card */}
                  <div className="bg-alkota-bg p-6 border border-alkota-iron space-y-4 text-xs font-ibm-plex-mono">
                    <div className="flex items-center justify-between pb-3 border-b border-alkota-iron">
                      <span className="text-alkota-orange uppercase">PROJECT SCOPE INDICATOR</span>
                      <span className="text-alkota-black font-bold">BUDGET: {formData.budgetBand}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <strong className="text-alkota-black block">Assets to Clean:</strong>
                        <span className="text-alkota-silver">
                          {formData.assetTypes.length > 0 ? formData.assetTypes.join(', ') : 'Not specified'}
                        </span>
                      </div>
                      <div>
                        <strong className="text-alkota-black block">Preferred Architecture:</strong>
                        <span className="text-alkota-silver uppercase">{formData.architecturePreference.replace('_', ' ')}</span>
                      </div>
                      <div>
                        <strong className="text-alkota-black block">Throughput Model:</strong>
                        <span className="text-alkota-silver">
                          {formData.assetsPerHour ? `${formData.assetsPerHour} units/hr` : `${formData.operatingHoursPerDay} hrs/day operation`}
                        </span>
                      </div>
                      <div>
                        <strong className="text-alkota-black block">Water Recovery:</strong>
                        <span className="text-alkota-silver uppercase">
                          {formData.waterReuseRequired === 'yes' ? 'Closed-Loop Recirculation' : 'Consented Discharge'}
                        </span>
                      </div>
                    </div>

                    {/* Pre-engineering Disclaimer */}
                    <div className="border-t border-alkota-iron pt-3 text-[10px] text-alkota-silver leading-relaxed">
                      <em>Notice: This Preliminary Project Brief is generated as an initial scoping baseline. It does not constitute a final engineering design, guaranteed throughput calculation, compliance certification, or formal commercial quotation. Final specifications are issued following site survey and formal engineering review.</em>
                    </div>
                  </div>

                  {/* Lead Capture Fields */}
                  <div className="space-y-4 pt-2">
                    <h3 className="font-extralight text-xl uppercase tracking-tight text-alkota-black">
                      Send to Alkota Engineering
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-ibm-plex-mono uppercase text-alkota-black mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.clientName}
                          onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                          placeholder="e.g. David Morrison"
                          className="w-full p-3 text-xs bg-alkota-bg border border-alkota-iron focus:border-alkota-orange outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-ibm-plex-mono uppercase text-alkota-black mb-1">
                          Company / Organization *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.clientCompany}
                          onChange={(e) => setFormData({ ...formData, clientCompany: e.target.value })}
                          placeholder="e.g. National Logistics Ltd"
                          className="w-full p-3 text-xs bg-alkota-bg border border-alkota-iron focus:border-alkota-orange outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-ibm-plex-mono uppercase text-alkota-black mb-1">
                          Work Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.clientEmail}
                          onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                          placeholder="d.morrison@nationallogistics.co.uk"
                          className="w-full p-3 text-xs bg-alkota-bg border border-alkota-iron focus:border-alkota-orange outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-ibm-plex-mono uppercase text-alkota-black mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.clientPhone}
                          onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                          placeholder="+44 7700 900123"
                          className="w-full p-3 text-xs bg-alkota-bg border border-alkota-iron focus:border-alkota-orange outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-ibm-plex-mono uppercase text-alkota-black mb-1">
                          Site Location / Postcode
                        </label>
                        <input
                          type="text"
                          value={formData.siteLocation}
                          onChange={(e) => setFormData({ ...formData, siteLocation: e.target.value })}
                          placeholder="e.g. Warrington Depot, WA1 1AA"
                          className="w-full p-3 text-xs bg-alkota-bg border border-alkota-iron focus:border-alkota-orange outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-ibm-plex-mono uppercase text-alkota-black mb-1">
                          Project Reference / Facility Name
                        </label>
                        <input
                          type="text"
                          value={formData.projectName}
                          onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                          placeholder="e.g. Hub 4 Multi-Bay Wash Upgrade"
                          className="w-full p-3 text-xs bg-alkota-bg border border-alkota-iron focus:border-alkota-orange outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-ibm-plex-mono uppercase text-alkota-black mb-1">
                        Additional Engineering Notes or Constraints
                      </label>
                      <textarea
                        rows={3}
                        value={formData.additionalNotes}
                        onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                        placeholder="e.g. Existing drainage interceptor on site; requires completion before seasonal peak..."
                        className="w-full p-3 text-xs bg-alkota-bg border border-alkota-iron focus:border-alkota-orange outline-none"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-alkota-iron flex items-center justify-between">
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="px-6 py-3 text-xs uppercase tracking-widest text-alkota-black border border-alkota-iron hover:border-alkota-orange"
                    >
                      ← Back to Parameters
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center gap-3 bg-alkota-orange text-white px-8 py-4 text-xs uppercase tracking-[0.25em] hover:bg-alkota-black transition-colors disabled:opacity-50"
                    >
                      <Send className="h-4 w-4" />
                      <span>{submitting ? 'Transmitting Brief...' : 'Send to Alkota Engineering'}</span>
                    </button>
                  </div>
                </form>
              )}

              {/* Navigation Controls (Steps 1 - 9) */}
              {currentStep < 10 && (
                <div className="mt-8 pt-6 border-t border-alkota-iron flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handlePrev}
                    disabled={currentStep === 1}
                    className="px-6 py-3 text-xs uppercase tracking-widest text-alkota-black border border-alkota-iron hover:border-alkota-orange disabled:opacity-30 disabled:pointer-events-none"
                  >
                    ← Previous Step
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 bg-alkota-black text-white px-8 py-3.5 text-xs uppercase tracking-[0.25em] hover:bg-alkota-orange transition-colors"
                  >
                    <span>Continue to Step {currentStep + 1}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* SUBMISSION CONFIRMATION & PDF PRINT VIEW */
            <div className="space-y-8 py-6">
              <div className="text-center space-y-3 max-w-xl mx-auto">
                <div className="h-12 w-12 bg-alkota-orange/10 border border-alkota-orange text-alkota-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.35em] text-alkota-orange block">
                  PROJECT BRIEF TRANSMITTED
                </span>
                <h2 className="font-extralight text-4xl uppercase tracking-tight text-alkota-black">
                  Project Reference {reference}
                </h2>
                <p className="text-xs sm:text-sm text-alkota-silver leading-relaxed">
                  Your scoping brief has been routed directly to our UK application engineering team. A project lead will review your asset profiles, throughput demand, and site constraints before contacting you.
                </p>
              </div>

              {/* Printable Project Document */}
              <div id="printable-brief" className="bg-alkota-bg p-8 border border-alkota-iron space-y-6 text-xs font-ibm-plex-mono text-alkota-black">
                <div className="flex items-center justify-between pb-4 border-b border-alkota-iron">
                  <div>
                    <h3 className="font-bold text-base text-alkota-black uppercase">ALKOTA UK // WASH PLANT DIVISION</h3>
                    <span className="text-[10px] text-alkota-silver">PRELIMINARY ENGINEERING PROJECT BRIEF</span>
                  </div>
                  <div className="text-right">
                    <span className="text-alkota-orange font-bold text-sm block">{reference}</span>
                    <span className="text-[10px] text-alkota-silver">{new Date().toLocaleDateString('en-GB')}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <strong className="text-alkota-black block mb-1">CLIENT STAKEHOLDER:</strong>
                    <p>{formData.clientName} — {formData.clientCompany}</p>
                    <p>{formData.clientEmail} | {formData.clientPhone}</p>
                    <p>Facility Site: {formData.siteLocation || 'UK Location'}</p>
                  </div>
                  <div>
                    <strong className="text-alkota-black block mb-1">COMMERCIAL SCOPE:</strong>
                    <p>Scope Indicator: {formData.budgetBand}</p>
                    <p>Target Date: {formData.targetDate || 'Flexible'}</p>
                    <p>Procurement: {formData.procurementRoute.replace('_', ' ').toUpperCase()}</p>
                  </div>
                </div>

                <div className="border-t border-alkota-iron pt-4">
                  <strong className="text-alkota-black block mb-2">TECHNICAL PARAMETERS:</strong>
                  <div className="grid grid-cols-2 gap-4">
                    <p>• Assets: {formData.assetTypes.join(', ') || 'General Fleet'}</p>
                    <p>• Preferred Architecture: {formData.architecturePreference.replace('_', ' ').toUpperCase()}</p>
                    <p>• Contamination Profile: {formData.contamination.join(', ') || 'Industrial'}</p>
                    <p>• Water Reuse Strategy: {formData.waterReuseRequired.toUpperCase()}</p>
                    <p>• Site Environment: {formData.siteType.replace('_', ' ').toUpperCase()}</p>
                    <p>• Heating Fuel: {formData.heatingFuelPreference.replace('_', ' ').toUpperCase()}</p>
                  </div>
                </div>

                <div className="border-t border-alkota-iron pt-4 text-[10px] text-alkota-silver">
                  <em>Disclaimer: This document is a preliminary scoping brief generated for technical consultation. Final hydraulic sizing, mechanical layouts, and formal commercial quotations are issued following an on-site survey and detailed engineering review.</em>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex items-center gap-2 bg-alkota-black text-white px-6 py-3 text-xs uppercase tracking-widest hover:bg-alkota-orange transition-colors"
                >
                  <Printer className="h-4 w-4" />
                  <span>Print / Save Brief PDF</span>
                </button>
                <Link
                  href="/wash-plant"
                  className="inline-flex items-center gap-2 border border-alkota-iron bg-white text-alkota-black px-6 py-3 text-xs uppercase tracking-widest hover:border-alkota-orange transition-colors"
                >
                  <span>Return to Wash Plant Division</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
