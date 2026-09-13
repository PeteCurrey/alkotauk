'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Truck,
  Tractor,
  HardHat,
  Wrench,
  Flame,
  Cog,
  Container,
  Droplets,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Scale,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Share2,
  Info,
  SlidersHorizontal,
  Zap,
  ShieldCheck,
  Check
} from 'lucide-react';
import { Product } from '@/lib/products';
import { resolveMachineImage } from '@/lib/images';
import { useMachineComparison } from '@/lib/comparison/context';
import { SelectionRequirements } from '@/lib/machine-selection/types';
import {
  STEPS,
  APPLICATION_OPTIONS,
  WATER_TYPE_OPTIONS,
  PRESSURE_OPTIONS,
  FLOW_OPTIONS,
  POWER_OPTIONS,
  VOLTAGE_OPTIONS,
  PHASE_OPTIONS,
  MOBILITY_OPTIONS,
  PREFERENCE_OPTIONS,
  DEFAULT_REQUIREMENTS
} from '@/lib/machine-selection/questions';
import { selectMachines } from '@/lib/machine-selection/engine';
import { APPLICATION_TAXONOMY } from '@/lib/machine-selection/authority-map';

const APP_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Truck,
  Tractor,
  HardHat,
  Wrench,
  Flame,
  Cog,
  Container,
  Droplets,
  HelpCircle
};

function trackSelectorEvent(eventName: string, payload: Record<string, unknown>) {
  if (typeof window !== 'undefined') {
    const win = window as unknown as { dataLayer?: Array<Record<string, unknown>> };
    win.dataLayer = win.dataLayer || [];
    win.dataLayer.push({
      event: eventName,
      timestamp: new Date().toISOString(),
      ...payload
    });
  }
}

function sanitizeReason(reason: string): string {
  if (!reason) return '';
  return reason
    .replace(/\[\s*\]/g, '')
    .replace(/Verified factory application:\s*([a-zA-Z0-9_-]+)\.?/i, (_, tag) => {
      const formatted = tag
        .split(/[-_]/)
        .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(' ');
      return `Factory verified for ${formatted}.`;
    })
    .replace(/_([a-z])/gi, ' $1');
}

interface HelpMeChooseClientProps {
  allMachines: Product[];
  initialRequirements?: Partial<SelectionRequirements>;
}

export default function HelpMeChooseClient({
  allMachines,
  initialRequirements
}: HelpMeChooseClientProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [showUnmetDrawer, setShowUnmetDrawer] = useState<boolean>(false);
  const [unmetSearch, setUnmetSearch] = useState<string>('');

  const [reqs, setReqs] = useState<SelectionRequirements>(() => ({
    ...DEFAULT_REQUIREMENTS,
    ...initialRequirements
  }));

  const { isComparing, toggleMachine } = useMachineComparison();

  // Dynamic category branching: Specialized applications suppress irrelevant questions
  const activeSteps = useMemo(() => {
    const isSpecializedApp =
      reqs.application === 'WORKSHOP_PARTS_WASHING' ||
      reqs.application === 'HIGH_TEMP_SANITISATION' ||
      reqs.application === 'WATER_TREATMENT_RECYCLING';

    return STEPS.filter(step => {
      // Aqueous parts washers, pure steam generators, and water recovery systems bypass pressure & flow thresholds
      if (isSpecializedApp && (step.id === 'pressure' || step.id === 'flow')) {
        return false;
      }
      return true;
    });
  }, [reqs.application]);

  const safeStepIndex = Math.min(currentStepIndex, activeSteps.length - 1);
  const currentStep = activeSteps[safeStepIndex] || activeSteps[0];

  // Deterministic evaluation using engine
  const selectionResult = useMemo(() => {
    return selectMachines(allMachines, reqs);
  }, [allMachines, reqs]);

  const isBroadFleet = useMemo(() => {
    return (
      reqs.application === 'NOT_SURE' &&
      reqs.waterType === 'not_sure' &&
      !reqs.minPressureBar &&
      !reqs.minFlowLpm &&
      reqs.powerSource === 'any' &&
      reqs.mobility === 'any'
    );
  }, [reqs]);

  const handleNext = () => {
    trackSelectorEvent('selector_step_complete', {
      stepNumber: safeStepIndex + 1,
      stepId: currentStep.id,
      application: reqs.application,
      waterType: reqs.waterType,
      powerSource: reqs.powerSource
    });

    if (safeStepIndex < activeSteps.length - 1) {
      setCurrentStepIndex(prev => Math.min(prev + 1, activeSteps.length - 1));
      window.scrollTo({ top: 120, behavior: 'smooth' });
    } else {
      setIsCompleted(true);
      window.scrollTo({ top: 120, behavior: 'smooth' });
      trackSelectorEvent('selector_results_view', {
        shortlistCount: selectionResult.shortlist.length,
        totalQualified: selectionResult.totalQualified,
        isConflicted: !!selectionResult.isConflicted,
        application: reqs.application,
        waterType: reqs.waterType
      });
      if (selectionResult.shortlist.length === 0) {
        trackSelectorEvent('selector_no_result', {
          application: reqs.application,
          requirements: selectionResult.activeRequirementsSummary
        });
      }
    }
  };

  const handleBack = () => {
    if (isCompleted) {
      setIsCompleted(false);
      setCurrentStepIndex(activeSteps.length - 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    } else if (safeStepIndex > 0) {
      setCurrentStepIndex(prev => Math.max(0, prev - 1));
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handleReset = () => {
    trackSelectorEvent('selector_reset', {});
    setReqs(DEFAULT_REQUIREMENTS);
    setCurrentStepIndex(0);
    setIsCompleted(false);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const togglePreference = (prefId: string) => {
    setReqs(prev => {
      const existing = prev.preferences || [];
      const updated = existing.includes(prefId)
        ? existing.filter(p => p !== prefId)
        : [...existing, prefId];
      return { ...prev, preferences: updated };
    });
  };

  const handleShareLink = () => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams();
    if (reqs.application !== 'NOT_SURE') params.set('app', reqs.application);
    if (reqs.waterType !== 'not_sure') params.set('water', reqs.waterType);
    if (reqs.minPressureBar) params.set('bar', String(reqs.minPressureBar));
    if (reqs.minFlowLpm) params.set('flow', String(reqs.minFlowLpm));
    if (reqs.powerSource !== 'any') params.set('power', reqs.powerSource);
    if (reqs.voltage && reqs.voltage !== 'any') params.set('voltage', reqs.voltage);
    if (reqs.phase && reqs.phase !== 'any') params.set('phase', reqs.phase);
    if (reqs.mobility !== 'any') params.set('mobility', reqs.mobility);
    if (reqs.unitSystem !== 'metric') params.set('unit', reqs.unitSystem);
    if (reqs.preferences && reqs.preferences.length > 0) {
      params.set('prefs', reqs.preferences.join(','));
    }

    const shareUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  // Build enquiry link with shortlisted models
  const enquiryUrl = useMemo(() => {
    const models = selectionResult.shortlist.map(s => s.machine.model_code).join(',');
    const machines = selectionResult.shortlist.map(s => s.machine.slug).join(',');
    const params = new URLSearchParams();
    params.set('source', 'MACHINE_SELECTOR');
    params.set('enquiry', 'selector');
    if (models) params.set('models', models);
    if (machines) params.set('machines', machines);
    if (selectionResult.activeRequirementsSummary.length > 0) {
      params.set('reqs', selectionResult.activeRequirementsSummary.join(' | '));
    }
    if (reqs.application) params.set('app', reqs.application);
    if (reqs.waterType) params.set('water', reqs.waterType);
    if (reqs.minPressureBar != null) params.set('press', String(reqs.minPressureBar));
    if (reqs.minFlowLpm != null) params.set('flow', String(reqs.minFlowLpm));
    if (reqs.powerSource) params.set('power', reqs.powerSource);
    if (reqs.voltage) params.set('volt', reqs.voltage);
    if (reqs.phase) params.set('phase', String(reqs.phase));
    if (reqs.mobility) params.set('mob', reqs.mobility);
    if (reqs.preferences && reqs.preferences.length > 0) {
      params.set('prefs', reqs.preferences.join(','));
    }
    return `/enquire?${params.toString()}`;
  }, [selectionResult, reqs]);

  // Filter unmet machines for inspector
  const filteredUnmet = useMemo(() => {
    if (!unmetSearch.trim()) return selectionResult.unmetMachines;
    const query = unmetSearch.toLowerCase();
    return selectionResult.unmetMachines.filter(
      u =>
        u.machine.name.toLowerCase().includes(query) ||
        u.machine.model_code.toLowerCase().includes(query) ||
        u.machine.category.toLowerCase().includes(query)
    );
  }, [selectionResult.unmetMachines, unmetSearch]);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 pb-24">
      {/* Header Banner */}
      <div className="bg-stone-900 text-stone-100 pt-32 pb-14 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-medium rounded-full mb-4">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Deterministic Industrial Selection Engine</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-heading">
                Help Me Choose My Machine
              </h1>
              <p className="mt-3 text-stone-400 text-sm sm:text-base max-w-2xl font-light">
                Answer key operational questions to identify the exact Alkota pressure washer, steam generator, or turnkey rig for your application — backed strictly by verified factory technical data.
              </p>
            </div>

            {/* Top Controls & Unit Switcher */}
            <div className="flex items-center gap-3">
              <div className="bg-stone-800 p-1 rounded-lg border border-stone-700 flex items-center text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setReqs(prev => ({ ...prev, unitSystem: 'metric' }))}
                  className={`px-2.5 sm:px-3 py-1.5 rounded transition-colors ${
                    reqs.unitSystem === 'metric'
                      ? 'bg-amber-500 text-stone-950 font-bold'
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  <span>Metric</span>
                  <span className="hidden sm:inline"> (BAR / L/min)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setReqs(prev => ({ ...prev, unitSystem: 'imperial' }))}
                  className={`px-2.5 sm:px-3 py-1.5 rounded transition-colors ${
                    reqs.unitSystem === 'imperial'
                      ? 'bg-amber-500 text-stone-950 font-bold'
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  <span>Imperial</span>
                  <span className="hidden sm:inline"> (PSI / GPM)</span>
                </button>
              </div>

              {(safeStepIndex > 0 || isCompleted) && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-stone-400 hover:text-white bg-stone-800 hover:bg-stone-700 rounded-lg border border-stone-700 transition-colors"
                  title="Reset all filters"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Stepper Progress Bar (Shown when configuring) */}
          {!isCompleted && (
            <div className="mt-8 pt-6 border-t border-stone-800">
              <div className="flex items-center justify-between text-xs font-mono text-stone-400 mb-2">
                <span className="text-amber-400 font-bold">
                  STEP {safeStepIndex + 1} OF {activeSteps.length}: {currentStep.title.toUpperCase()}
                </span>
                <span>
                  {Math.round(((safeStepIndex + 1) / activeSteps.length) * 100)}% DEFINED
                </span>
              </div>
              <div
                className="h-2 w-full bg-stone-800 rounded-full overflow-hidden"
                role="progressbar"
                aria-valuenow={safeStepIndex + 1}
                aria-valuemin={1}
                aria-valuemax={activeSteps.length}
                aria-label="Machine selector progress"
              >
                <div
                  className="h-full bg-amber-500 transition-all duration-300 rounded-full"
                  style={{ width: `${((safeStepIndex + 1) / activeSteps.length) * 100}%` }}
                />
              </div>

              {/* Step Navigation Indicators - Responsive mobile dots/tabs */}
              <div className="flex items-center gap-1 sm:gap-2 mt-4 overflow-x-auto pb-1 sm:pb-0">
                {activeSteps.map((step, idx) => (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => setCurrentStepIndex(idx)}
                    className={`flex-1 min-w-[2.25rem] text-center sm:text-left py-1 text-[11px] font-mono border-b-2 transition-colors truncate ${
                      idx === safeStepIndex
                        ? 'border-amber-500 text-amber-400 font-bold'
                        : idx < safeStepIndex
                        ? 'border-stone-600 text-stone-300'
                        : 'border-stone-800 text-stone-600 hover:text-stone-400'
                    }`}
                    title={step.title}
                  >
                    <span className="inline sm:hidden">{idx + 1}</span>
                    <span className="hidden sm:inline">{idx + 1}. {step.title}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Interactive Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <AnimatePresence mode="wait">
          {!isCompleted ? (
            /* QUESTIONNAIRE STEPS */
            <motion.div
              key={currentStep.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-xl shadow-lg border border-stone-200 p-6 sm:p-10"
            >
              {/* Question Header */}
              <div className="mb-8">
                <span className="text-xs font-mono font-bold tracking-widest uppercase text-amber-600">
                  Step {safeStepIndex + 1} of {activeSteps.length}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mt-1 font-heading">
                  {currentStep.subtitle}
                </h2>
                <p className="text-stone-600 text-sm mt-2 max-w-3xl">
                  {currentStep.description}
                </p>
              </div>

              {/* Step 1: Application */}
              {currentStep.id === 'application' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {APPLICATION_OPTIONS.map(opt => {
                    const Icon = opt.iconName ? APP_ICONS[opt.iconName] || HelpCircle : HelpCircle;
                    const isSelected = reqs.application === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => {
                          const tax = APPLICATION_TAXONOMY[opt.value];
                          const isPartsWasher = opt.value === 'WORKSHOP_PARTS_WASHING';
                          const isSteam = opt.value === 'HIGH_TEMP_SANITISATION';
                          const isTrailer = opt.value === 'MOBILE_TRAILER_CLEANING';
                          const isWaterTreatment = opt.value === 'WATER_TREATMENT_RECYCLING';

                          setReqs(prev => ({
                            ...prev,
                            application: opt.value,
                            waterType: isPartsWasher
                              ? 'aqueous_parts'
                              : isSteam
                              ? 'steam'
                              : tax?.recommendedWaterType || prev.waterType,
                            minPressureBar: (isPartsWasher || isSteam || isWaterTreatment)
                              ? null
                              : tax?.suggestedMinBar || prev.minPressureBar,
                            minFlowLpm: (isPartsWasher || isSteam || isWaterTreatment)
                              ? null
                              : prev.minFlowLpm,
                            mobility: isTrailer ? 'trailer' : prev.mobility
                          }));
                        }}
                        className={`text-left p-5 rounded-lg border-2 transition-all flex flex-col justify-between h-full ${
                          isSelected
                            ? 'border-amber-500 bg-amber-50/50 shadow-sm'
                            : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50/50 bg-white'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <div
                              className={`p-2.5 rounded-lg ${
                                isSelected
                                  ? 'bg-amber-500 text-white'
                                  : 'bg-stone-100 text-stone-700'
                              }`}
                            >
                              <Icon className="w-5 h-5" />
                            </div>
                            {isSelected && (
                              <span className="flex items-center gap-1 text-xs font-mono font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                                <Check className="w-3 h-3" /> Selected
                              </span>
                            )}
                          </div>
                          <h3 className="font-bold text-stone-900 text-base">{opt.label}</h3>
                          <p className="text-stone-500 text-xs mt-2 leading-relaxed">
                            {opt.sublabel}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Step 2: Thermal Medium (Water Type) */}
              {currentStep.id === 'waterType' && (
                <div className="space-y-4">
                  {reqs.application !== 'NOT_SURE' && (
                    <div className="p-3 bg-amber-50/80 border border-amber-200/80 rounded-lg flex items-center gap-2.5 text-xs text-amber-900 font-mono">
                      <Info className="w-4 h-4 text-amber-700 shrink-0" />
                      <span>
                        Pre-selected for <strong>{APPLICATION_TAXONOMY[reqs.application]?.label}</strong>. You can change this selection if your cleaning task requires a different thermal medium.
                      </span>
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {WATER_TYPE_OPTIONS.map(opt => {
                      const isSelected = reqs.waterType === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setReqs(prev => ({ ...prev, waterType: opt.value }))}
                          className={`text-left p-5 rounded-lg border-2 transition-all ${
                            isSelected
                              ? 'border-amber-500 bg-amber-50/50 shadow-sm'
                              : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50/50 bg-white'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded">
                              {opt.badge}
                            </span>
                            {isSelected && <Check className="w-4 h-4 text-amber-600" />}
                          </div>
                          <h3 className="font-bold text-stone-900 text-base">{opt.label}</h3>
                          <p className="text-stone-500 text-xs mt-2 leading-relaxed">{opt.sublabel}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 3: Operating Pressure */}
              {currentStep.id === 'pressure' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {PRESSURE_OPTIONS.map((opt, idx) => {
                    const isSelected = reqs.minPressureBar === opt.value;
                    const isNullOpt = opt.value === null;
                    const displayLabel =
                      reqs.unitSystem === 'metric' ? opt.labelMetric : opt.labelImperial;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setReqs(prev => ({ ...prev, minPressureBar: opt.value }))}
                        className={`text-left p-5 rounded-lg border-2 transition-all ${
                          isSelected
                            ? 'border-amber-500 bg-amber-50/50 shadow-sm'
                            : isNullOpt
                            ? 'border-stone-300 bg-stone-50/70 hover:border-stone-400 hover:bg-stone-100/50'
                            : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50/50 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-2xl font-bold font-mono text-stone-900">
                            {displayLabel}
                          </div>
                          {opt.badge && (
                            <span className={`text-[11px] font-mono px-2 py-0.5 rounded ${
                              isNullOpt
                                ? 'bg-amber-100 text-amber-800 font-bold'
                                : 'bg-stone-100 text-stone-700'
                            }`}>
                              {opt.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-stone-500 text-xs mt-2 leading-relaxed">{opt.sublabel}</p>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Step 4: Flow Rate */}
              {currentStep.id === 'flow' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {FLOW_OPTIONS.map((opt, idx) => {
                    const isSelected = reqs.minFlowLpm === opt.value;
                    const isNullOpt = opt.value === null;
                    const displayLabel =
                      reqs.unitSystem === 'metric' ? opt.labelMetric : opt.labelImperial;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setReqs(prev => ({ ...prev, minFlowLpm: opt.value }))}
                        className={`text-left p-5 rounded-lg border-2 transition-all ${
                          isSelected
                            ? 'border-amber-500 bg-amber-50/50 shadow-sm'
                            : isNullOpt
                            ? 'border-stone-300 bg-stone-50/70 hover:border-stone-400 hover:bg-stone-100/50'
                            : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50/50 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-2xl font-bold font-mono text-stone-900">
                            {displayLabel}
                          </div>
                          {opt.badge && (
                            <span className={`text-[11px] font-mono px-2 py-0.5 rounded ${
                              isNullOpt
                                ? 'bg-amber-100 text-amber-800 font-bold'
                                : 'bg-stone-100 text-stone-700'
                            }`}>
                              {opt.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-stone-500 text-xs mt-2 leading-relaxed">{opt.sublabel}</p>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Step 5: Power Source */}
              {currentStep.id === 'power' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {POWER_OPTIONS.map(opt => {
                      const isSelected = reqs.powerSource === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => {
                            setReqs(prev => ({
                              ...prev,
                              powerSource: opt.value,
                              voltage: opt.value === 'electric' ? prev.voltage : 'any',
                              phase: opt.value === 'electric' ? prev.phase : 'any'
                            }));
                          }}
                          className={`text-left p-5 rounded-lg border-2 transition-all ${
                            isSelected
                              ? 'border-amber-500 bg-amber-50/50 shadow-sm'
                              : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50/50 bg-white'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded">
                              {opt.badge}
                            </span>
                            {isSelected && <Check className="w-4 h-4 text-amber-600" />}
                          </div>
                          <h3 className="font-bold text-stone-900 text-base">{opt.label}</h3>
                          <p className="text-stone-500 text-xs mt-2 leading-relaxed">{opt.sublabel}</p>
                        </button>
                      );
                    })}
                  </div>

                  {/* Electric Sub-questions: Voltage & Phase */}
                  {reqs.powerSource === 'electric' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.25 }}
                      className="p-5 sm:p-6 bg-stone-50 rounded-xl border border-stone-300 space-y-5"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Zap className="w-4 h-4 text-amber-600" />
                          <h4 className="text-sm font-bold text-stone-900 font-heading">
                            Mains Electrical Supply Voltage (Optional)
                          </h4>
                        </div>
                        <p className="text-xs text-stone-500 mb-3">
                          Specify your available site electrical voltage. Leave as &quot;Any Voltage / Not Sure&quot; to review all electric configurations.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                          {VOLTAGE_OPTIONS.map(vOpt => {
                            const isSel = (reqs.voltage || 'any') === vOpt.value;
                            return (
                              <button
                                key={vOpt.value}
                                type="button"
                                onClick={() => setReqs(prev => ({ ...prev, voltage: vOpt.value }))}
                                className={`p-3 text-left rounded-lg border text-xs transition-all ${
                                  isSel
                                    ? 'border-amber-500 bg-amber-50 font-bold text-stone-900 shadow-sm'
                                    : 'border-stone-200 bg-white hover:border-stone-300 text-stone-700'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-mono">{vOpt.label}</span>
                                  {isSel && <Check className="w-3.5 h-3.5 text-amber-600 shrink-0" />}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-bold text-stone-900 font-heading mb-1">
                          Supply Phase (Optional)
                        </h4>
                        <p className="text-xs text-stone-500 mb-3">
                          Specify single-phase (standard 230V commercial/domestic) or three-phase (400V industrial 3-phase).
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                          {PHASE_OPTIONS.map(pOpt => {
                            const isSel = (reqs.phase || 'any') === pOpt.value;
                            return (
                              <button
                                key={pOpt.value}
                                type="button"
                                onClick={() => setReqs(prev => ({ ...prev, phase: pOpt.value }))}
                                className={`p-3 text-left rounded-lg border text-xs transition-all ${
                                  isSel
                                    ? 'border-amber-500 bg-amber-50 font-bold text-stone-900 shadow-sm'
                                    : 'border-stone-200 bg-white hover:border-stone-300 text-stone-700'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-mono">{pOpt.label}</span>
                                  {isSel && <Check className="w-3.5 h-3.5 text-amber-600 shrink-0" />}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* Step 6: Mobility & Chassis */}
              {currentStep.id === 'mobility' && (
                <div className="space-y-4">
                  {reqs.application === 'MOBILE_TRAILER_CLEANING' && (
                    <div className="p-3 bg-amber-50/80 border border-amber-200/80 rounded-lg flex items-center gap-2.5 text-xs text-amber-900 font-mono">
                      <Info className="w-4 h-4 text-amber-700 shrink-0" />
                      <span>
                        Highway Mobile Trailer chassis pre-selected for turnkey mobile operations. You can choose a different chassis if you plan to install the machine into a van or static bay.
                      </span>
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {MOBILITY_OPTIONS.map(opt => {
                      const isSelected = reqs.mobility === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setReqs(prev => ({ ...prev, mobility: opt.value }))}
                          className={`text-left p-5 rounded-lg border-2 transition-all ${
                            isSelected
                              ? 'border-amber-500 bg-amber-50/50 shadow-sm'
                              : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50/50 bg-white'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded">
                              {opt.badge}
                            </span>
                            {isSelected && <Check className="w-4 h-4 text-amber-600" />}
                          </div>
                          <h3 className="font-bold text-stone-900 text-base">{opt.label}</h3>
                          <p className="text-stone-500 text-xs mt-2 leading-relaxed">{opt.sublabel}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 7: Engineering Preferences */}
              {currentStep.id === 'preferences' && (
                <div className="space-y-4">
                  <p className="text-xs text-stone-500 italic">
                    Select any optional priorities that matter to your operation. These will boost matching machines in the score ranking without excluding alternatives.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {PREFERENCE_OPTIONS.map(pref => {
                      const isSelected = (reqs.preferences || []).includes(pref.id);
                      return (
                        <button
                          key={pref.id}
                          type="button"
                          onClick={() => togglePreference(pref.id)}
                          className={`text-left p-5 rounded-lg border-2 transition-all ${
                            isSelected
                              ? 'border-amber-500 bg-amber-50/50 shadow-sm'
                              : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50/50 bg-white'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-bold text-stone-900 text-sm">{pref.label}</h3>
                            <div
                              className={`w-5 h-5 rounded flex items-center justify-center border ${
                                isSelected
                                  ? 'bg-amber-500 border-amber-500 text-white'
                                  : 'border-stone-300 bg-white'
                              }`}
                            >
                              {isSelected && <Check className="w-3.5 h-3.5" />}
                            </div>
                          </div>
                          <p className="text-stone-500 text-xs mt-1 leading-relaxed">
                            {pref.description}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Live Match Counter Strip */}
              <div className="mt-10 pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs font-mono text-stone-600">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>
                    Currently{' '}
                    <strong className="text-stone-900 font-bold">
                      {selectionResult.totalQualified}
                    </strong>{' '}
                    viable machines qualify from your selections ({allMachines.length} evaluated).
                  </span>
                </div>

                {/* Step Controls */}
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {safeStepIndex > 0 && (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-lg border border-stone-300 bg-white text-stone-700 text-xs font-mono font-bold hover:bg-stone-50 transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-mono font-bold tracking-wider uppercase transition-colors shadow-sm"
                  >
                    <span>
                      {safeStepIndex === activeSteps.length - 1 ? 'View Shortlist' : 'Continue'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            /* SHORTLIST RESULTS VIEW */
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-10"
            >
              {/* Shortlist Summary Card */}
              <div className="bg-white rounded-xl shadow-lg border border-stone-200 p-6 sm:p-8">
                {/* Broad Fleet Notice */}
                {isBroadFleet && (
                  <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-start sm:items-center gap-3">
                      <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5 sm:mt-0" />
                      <p className="text-xs text-stone-700 font-mono">
                        <strong>Universal Fleet View:</strong> No restrictive parameters have been chosen, so the complete {allMachines.length}-machine fleet qualifies. You can narrow down your shortlist at any time by selecting a specific cleaning task, power supply, or water temperature.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsCompleted(false)}
                      className="shrink-0 px-3 py-1.5 bg-stone-900 text-white rounded-lg text-xs font-mono font-bold hover:bg-stone-800 transition-colors"
                    >
                      Filter Criteria
                    </button>
                  </div>
                )}

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-stone-200">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-700 uppercase tracking-widest mb-1">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Factory Qualified Shortlist</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-heading">
                      Recommended Machinery Fleet
                    </h2>
                    <p className="text-stone-600 text-xs sm:text-sm mt-1">
                      {isBroadFleet
                        ? `Showing 3 representative models from the complete ${allMachines.length}-machine fleet. Adjust criteria above to tailor your shortlist.`
                        : `Showing the top ${selectionResult.shortlist.length} primary matches engineered for your stated parameters.`}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setIsCompleted(false)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-xs font-mono font-bold transition-colors"
                    >
                      <SlidersHorizontal className="w-3.5 h-3.5" />
                      Adjust Criteria
                    </button>

                    <button
                      type="button"
                      onClick={handleShareLink}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-xs font-mono font-bold transition-colors"
                      title="Share link with this configuration"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      {copiedLink ? 'Link Copied!' : 'Share Shortlist'}
                    </button>

                    <Link
                      href={enquiryUrl}
                      onClick={() => trackSelectorEvent('selector_enquiry_click', { models: selectionResult.shortlist.map(s => s.machine.model_code).join(','), source: 'summary_banner' })}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-colors shadow-sm"
                    >
                      <span>Enquire on Shortlist</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* Active Criteria Chips */}
                <div className="pt-4 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono text-stone-400 uppercase">Your Requirements:</span>
                  {selectionResult.activeRequirementsSummary.length > 0 ? (
                    selectionResult.activeRequirementsSummary.map((reqText, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center px-2.5 py-1 rounded bg-stone-100 border border-stone-200 text-stone-700 text-xs font-mono"
                      >
                        {reqText}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs font-mono text-stone-500">Universal Fleet (No constraints)</span>
                  )}
                </div>
              </div>

              {/* PRIMARY SHORTLIST CARDS OR NO-RESULT STATE */}
              {selectionResult.shortlist.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {selectionResult.shortlist.map((item, idx) => {
                    const m = item.machine;
                    const comparing = isComparing(m.slug);
                    const imageUrl = resolveMachineImage(m.model_code, m.primary_image_url, m.category);

                    const isSpecializedMachine =
                      m.category === 'parts-washer' ||
                      m.category === 'water-heater' ||
                      m.category === 'space-heater' ||
                      m.category === 'water-treatment';

                    const pressureDisplay =
                      reqs.unitSystem === 'metric'
                        ? m.pressure_bar
                          ? `${m.pressure_bar} BAR`
                          : m.pressure_psi
                          ? `${Math.round(m.pressure_psi / 14.5)} BAR`
                          : 'Not specified'
                        : m.pressure_psi
                        ? `${m.pressure_psi} PSI`
                        : m.pressure_bar
                        ? `${Math.round(m.pressure_bar * 14.5)} PSI`
                        : 'Not specified';

                    const flowDisplay =
                      reqs.unitSystem === 'metric'
                        ? m.flow_rate_lpm
                          ? `${m.flow_rate_lpm} L/min`
                          : m.flow_rate_gpm
                          ? `${(m.flow_rate_gpm * 3.785).toFixed(1)} L/min`
                          : 'Not specified'
                        : m.flow_rate_gpm
                        ? `${m.flow_rate_gpm} GPM`
                        : m.flow_rate_lpm
                        ? `${(Number(m.flow_rate_lpm) / 3.785).toFixed(1)} GPM`
                        : 'Not specified';

                    return (
                      <div
                        key={m.id || m.slug}
                        className="bg-white rounded-xl shadow-md border border-stone-200 overflow-hidden flex flex-col justify-between hover:border-amber-400 transition-all"
                      >
                        <div>
                          {/* Top Badge & Image */}
                          <div className="relative bg-stone-900 h-52 flex items-center justify-center p-6 border-b border-stone-800">
                            <div className="absolute top-3 left-3 z-10">
                              <span className="px-2.5 py-1 rounded bg-amber-500 text-stone-950 font-mono text-[10px] font-bold uppercase tracking-wider shadow">
                                Match #{idx + 1}
                              </span>
                            </div>

                            <div className="relative w-full h-full">
                              <Image
                                src={imageUrl}
                                alt={`${m.name} ${m.model_code}`}
                                fill
                                className="object-contain filter drop-shadow-lg"
                                sizes="(max-width: 1024px) 100vw, 33vw"
                              />
                            </div>
                          </div>

                          {/* Title & Series */}
                          <div className="p-6">
                            <div className="text-xs font-mono text-amber-700 font-semibold uppercase tracking-wider mb-1">
                              {m.series || m.category.toUpperCase()}
                            </div>
                            <h3 className="text-xl font-bold text-stone-900 font-heading">
                              {m.name}
                            </h3>
                            <div className="text-xs font-mono text-stone-500 mt-0.5">
                              Model: {m.model_code}
                            </div>

                            {/* Key Specs Grid */}
                            {isSpecializedMachine ? (
                              <div className="grid grid-cols-2 gap-2 mt-4 p-3 bg-stone-50 rounded-lg border border-stone-200 font-mono text-xs">
                                <div>
                                  <span className="text-stone-400 block text-[10px] uppercase">
                                    Equipment Type
                                  </span>
                                  <span className="font-bold text-stone-800 capitalize truncate block">
                                    {m.category.replace('-', ' ')}
                                  </span>
                                </div>
                                <div>
                                  <span className="text-stone-400 block text-[10px] uppercase">
                                    Thermal / Medium
                                  </span>
                                  <span className="font-bold text-stone-800 truncate block">
                                    {m.heating_fuel || (m.category === 'parts-washer' ? 'Aqueous Turntable' : 'Electric')}
                                  </span>
                                </div>
                                <div>
                                  <span className="text-stone-400 block text-[10px] uppercase">Power</span>
                                  <span className="font-bold text-stone-800 truncate block">
                                    {m.power_source || (m.voltage ? `${m.voltage}` : 'Mains Electric')}
                                  </span>
                                </div>
                                <div>
                                  <span className="text-stone-400 block text-[10px] uppercase">Chassis</span>
                                  <span className="font-bold text-stone-800 truncate block">
                                    {m.mobility || 'Stationary Cabinet'}
                                  </span>
                                </div>
                              </div>
                            ) : (
                              <div className="grid grid-cols-2 gap-2 mt-4 p-3 bg-stone-50 rounded-lg border border-stone-200 font-mono text-xs">
                                <div>
                                  <span className="text-stone-400 block text-[10px] uppercase">
                                    Pressure
                                  </span>
                                  <span className="font-bold text-stone-800">{pressureDisplay}</span>
                                </div>
                                <div>
                                  <span className="text-stone-400 block text-[10px] uppercase">
                                    Water Flow
                                  </span>
                                  <span className="font-bold text-stone-800">{flowDisplay}</span>
                                </div>
                                <div>
                                  <span className="text-stone-400 block text-[10px] uppercase">Drive</span>
                                  <span className="font-bold text-stone-800 truncate block">
                                    {m.power_source || 'Engine/Motor'}
                                  </span>
                                </div>
                                <div>
                                  <span className="text-stone-400 block text-[10px] uppercase">Temp</span>
                                  <span className="font-bold text-stone-800">
                                    {m.max_temp_c ? `${m.max_temp_c}°C` : 'Ambient'}
                                  </span>
                                </div>
                              </div>
                            )}

                            {/* Data-Driven Why Match Bullets */}
                            <div className="mt-5 space-y-2">
                              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-stone-400 block">
                                Why This Machine Qualified:
                              </span>
                              <ul className="space-y-1.5 text-xs text-stone-600">
                                {item.explanation.reasons.slice(0, 3).map((reason, rIdx) => (
                                  <li key={rIdx} className="flex items-start gap-2">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                    <span>{sanitizeReason(reason)}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>

                        {/* Card Actions */}
                        <div className="p-6 pt-0 border-t border-stone-100 mt-4 space-y-2.5">
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                trackSelectorEvent('selector_compare_add', { slug: m.slug, model_code: m.model_code });
                                toggleMachine(m.slug);
                              }}
                              className={`w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg border text-xs font-mono font-bold transition-colors ${
                                comparing
                                  ? 'bg-stone-900 border-stone-900 text-white'
                                  : 'bg-white border-stone-300 text-stone-700 hover:bg-stone-50'
                              }`}
                            >
                              <Scale className="w-3.5 h-3.5" />
                              {comparing ? 'Comparing' : 'Compare'}
                            </button>

                            <Link
                              href={`/machines/${m.category}/${m.slug}`}
                              className="w-full inline-flex items-center justify-center gap-1 py-2.5 px-3 rounded-lg border border-stone-300 bg-white text-stone-700 hover:bg-stone-50 text-xs font-mono font-bold transition-colors"
                            >
                              <span>Full Spec Sheet</span>
                              <ExternalLink className="w-3 h-3" />
                            </Link>
                          </div>

                          <Link
                            href={`/contact?enquiry=selector&models=${m.model_code}&machines=${m.slug}&reqs=${encodeURIComponent(selectionResult.activeRequirementsSummary.join(' | '))}`}
                            onClick={() => trackSelectorEvent('selector_enquiry_click', { model: m.model_code, source: 'card' })}
                            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-mono font-bold uppercase tracking-wider transition-colors shadow-sm"
                          >
                            <span>Enquire On This Model</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-md border border-stone-200 p-8 text-center max-w-2xl mx-auto space-y-4">
                  <div className="w-12 h-12 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center mx-auto">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-stone-900 font-heading">
                    No Standard Catalogue Machine Directly Matches All Stated Requirements
                  </h3>
                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                    Your combination of physical constraints, power source, and operating parameters currently excludes all standard catalogue machines. However, Alkota UK regularly builds custom-engineered skid systems, high-temperature wash rigs, and bespoke trailers for non-standard site requirements.
                  </p>
                  {selectionResult.recommendations && selectionResult.recommendations.length > 0 && (
                    <div className="bg-stone-50 border border-stone-200 p-4 rounded-lg text-left text-xs text-stone-700 space-y-1.5 font-mono">
                      <span className="font-bold uppercase text-[10px] text-stone-500 block mb-1">
                        Technical Recommendations:
                      </span>
                      {selectionResult.recommendations.map((rec, rIdx) => (
                        <p key={rIdx}>• {rec}</p>
                      ))}
                    </div>
                  )}
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsCompleted(false)}
                      className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-lg text-xs font-mono font-bold uppercase transition-colors"
                    >
                      Adjust Stated Requirements
                    </button>
                    <Link
                      href="/contact?enquiry=selector&models=Bespoke+Build"
                      onClick={() => trackSelectorEvent('selector_enquiry_click', { model: 'Bespoke Build', source: 'no_match_cta' })}
                      className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-mono font-bold uppercase transition-colors"
                    >
                      Request Bespoke Engineering Specification
                    </Link>
                  </div>
                </div>
              )}

              {/* SECTION: WORTH CONFIRMING (POSSIBLE MATCHES) */}
              {selectionResult.possibleMatches.length > 0 && (
                <div className="bg-amber-50/70 border-2 border-amber-200/80 rounded-xl p-6 sm:p-8">
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 bg-amber-100 text-amber-800 rounded-lg shrink-0">
                      <AlertCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-amber-900 font-heading">
                        Worth Confirming: Viable Machines With Unverified Specifications
                      </h3>
                      <p className="text-stone-600 text-xs sm:text-sm mt-1">
                        The following machines satisfy your criteria, but certain technical parameters are unrecorded in upstream factory records. Alkota engineers can confirm these specifications before specification.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    {selectionResult.possibleMatches.map((item, idx) => {
                      const m = item.machine;
                      const comparing = isComparing(m.slug);
                      return (
                        <div
                          key={m.id || idx}
                          className="bg-white rounded-lg border border-amber-200 p-5 flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-mono text-stone-500 uppercase">
                                {m.series || m.category}
                              </span>
                              <span className="text-[10px] font-mono bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold">
                                Specs to Confirm
                              </span>
                            </div>
                            <h4 className="font-bold text-stone-900 text-base">{m.name}</h4>
                            <p className="text-xs font-mono text-stone-500">Model: {m.model_code}</p>

                            {/* Unverified parameters highlighted */}
                            <div className="mt-3 space-y-1 text-xs text-amber-900 bg-amber-50 p-2.5 rounded border border-amber-200">
                              <span className="font-bold block text-[10px] uppercase font-mono">
                                Alkota engineers can confirm these specs:
                              </span>
                              {item.explanation.unknowns.map((unk, uIdx) => (
                                <p key={uIdx} className="italic">
                                  • {unk}
                                </p>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 mt-4 pt-3 border-t border-stone-100">
                            <button
                              type="button"
                              onClick={() => {
                                trackSelectorEvent('selector_compare_add', { slug: m.slug, model_code: m.model_code });
                                toggleMachine(m.slug);
                              }}
                              className={`flex-1 inline-flex items-center justify-center gap-1 py-2 px-3 rounded text-xs font-mono font-bold border transition-colors ${
                                comparing
                                  ? 'bg-stone-900 text-white border-stone-900'
                                  : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                              }`}
                            >
                              <Scale className="w-3.5 h-3.5" />
                              {comparing ? 'Comparing' : 'Compare'}
                            </button>

                            <Link
                              href={`/machines/${m.category}/${m.slug}`}
                              className="flex-1 inline-flex items-center justify-center gap-1 py-2 px-3 rounded text-xs font-mono font-bold bg-amber-500 hover:bg-amber-400 text-stone-950 transition-colors"
                            >
                              <span>Full Spec Sheet</span>
                              <ExternalLink className="w-3 h-3" />
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* COLLAPSIBLE INSPECTOR: WHY OTHER MACHINES DID NOT QUALIFY */}
              <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setShowUnmetDrawer(prev => !prev)}
                  className="w-full p-6 flex items-center justify-between text-left hover:bg-stone-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Info className="w-5 h-5 text-stone-500" />
                    <div>
                      <h3 className="font-bold text-stone-900 text-base font-heading">
                        Why Other Machines Did Not Qualify
                      </h3>
                      <p className="text-stone-500 text-xs mt-0.5 font-mono">
                        {selectionResult.unmetMachines.length} machines were excluded based on your hard requirements.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-stone-600">
                    <span>{showUnmetDrawer ? 'Hide Details' : 'Inspect Exclusions'}</span>
                    {showUnmetDrawer ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {showUnmetDrawer && (
                  <div className="p-6 pt-0 border-t border-stone-200 space-y-4">
                    <p className="text-xs text-stone-500 italic">
                      The Alkota selection engine is strictly deterministic and evidence-based. Machines are only excluded when their verified specifications fail your explicit physical or electrical constraints.
                    </p>

                    <input
                      type="text"
                      value={unmetSearch}
                      onChange={e => setUnmetSearch(e.target.value)}
                      placeholder="Search excluded models (e.g. 4305, diesel, cold)..."
                      className="w-full px-3 py-2 text-xs font-mono bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-amber-500"
                    />

                    <div className="max-h-80 overflow-y-auto space-y-2 pr-2">
                      {filteredUnmet.slice(0, 30).map((u, uIdx) => (
                        <div
                          key={uIdx}
                          className="p-3 bg-stone-50 rounded border border-stone-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                        >
                          <div>
                            <span className="font-bold text-stone-900">{u.machine.name}</span>
                            <span className="font-mono text-stone-500 ml-2">
                              ({u.machine.model_code})
                            </span>
                          </div>
                          <div className="text-rose-700 font-mono text-[11px] sm:text-right">
                            {u.explanation.failureReasons.join('; ')}
                          </div>
                        </div>
                      ))}
                      {filteredUnmet.length > 30 && (
                        <p className="text-center text-xs font-mono text-stone-400 pt-2">
                          Showing first 30 of {filteredUnmet.length} excluded machines.
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* BOTTOM CONSULTATION CTA BANNER */}
              <div className="bg-stone-900 rounded-xl p-8 sm:p-10 text-stone-100 flex flex-col md:flex-row items-center justify-between gap-6 border border-stone-800">
                <div>
                  <h3 className="text-2xl font-bold font-heading text-white">
                    Need Direct Engineering Consultation?
                  </h3>
                  <p className="text-stone-400 text-xs sm:text-sm mt-1 max-w-xl">
                    Our UK workshop engineers can review your site power, water supply, and operating duty to build or configure the optimal machine package.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                  <Link
                    href="/machines/compare"
                    className="w-full sm:w-auto text-center px-5 py-3 rounded-lg border border-stone-700 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-mono font-bold transition-colors"
                  >
                    Open Comparison Grid
                  </Link>

                  <Link
                    href={enquiryUrl}
                    onClick={() => trackSelectorEvent('selector_enquiry_click', { models: selectionResult.shortlist.map(s => s.machine.model_code).join(','), source: 'bottom_banner' })}
                    className="w-full sm:w-auto text-center px-6 py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-mono font-bold uppercase tracking-wider transition-colors shadow"
                  >
                    Send Shortlist Enquiry
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
