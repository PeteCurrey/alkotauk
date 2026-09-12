import React from 'react';
import { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { getProducts } from '@/lib/products';
import {
  SelectionRequirements,
  ApplicationId,
  WaterTypeRequirement,
  PowerPreference,
  MobilityPreference,
  VoltagePreference,
  PhasePreference
} from '@/lib/machine-selection/types';
import HelpMeChooseClient from './HelpMeChooseClient';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Help Me Choose — Alkota UK Industrial Machine Selection Engine',
  description: 'Deterministic, engineering-grounded machine selector matching industrial cleaning requirements to verified Alkota pressure washers, steam cleaners, and custom trailers.',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://alkota.co.uk/machines/help-me-choose',
  },
};

interface PageProps {
  searchParams: Promise<{
    app?: string;
    water?: string;
    bar?: string;
    flow?: string;
    power?: string;
    voltage?: string;
    phase?: string;
    mobility?: string;
    unit?: string;
    prefs?: string;
  }>;
}

export default async function HelpMeChoosePage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const allMachines = await getProducts();

  const initialRequirements: Partial<SelectionRequirements> = {};

  if (resolvedParams.app) {
    initialRequirements.application = resolvedParams.app as ApplicationId;
  }
  if (resolvedParams.water) {
    initialRequirements.waterType = resolvedParams.water as WaterTypeRequirement;
  }
  if (resolvedParams.bar) {
    const num = Number(resolvedParams.bar);
    if (!isNaN(num) && num > 0) initialRequirements.minPressureBar = num;
  }
  if (resolvedParams.flow) {
    const num = Number(resolvedParams.flow);
    if (!isNaN(num) && num > 0) initialRequirements.minFlowLpm = num;
  }
  if (resolvedParams.power) {
    initialRequirements.powerSource = resolvedParams.power as PowerPreference;
  }
  if (resolvedParams.voltage) {
    initialRequirements.voltage = resolvedParams.voltage as VoltagePreference;
  }
  if (resolvedParams.phase) {
    initialRequirements.phase = resolvedParams.phase as PhasePreference;
  }
  if (resolvedParams.mobility) {
    initialRequirements.mobility = resolvedParams.mobility as MobilityPreference;
  }
  if (resolvedParams.unit === 'metric' || resolvedParams.unit === 'imperial') {
    initialRequirements.unitSystem = resolvedParams.unit;
  }
  if (resolvedParams.prefs) {
    initialRequirements.preferences = resolvedParams.prefs.split(',').map(s => s.trim()).filter(Boolean);
  }

  return (
    <main className="min-h-screen flex flex-col justify-between">
      <Navigation />
      <HelpMeChooseClient
        allMachines={allMachines}
        initialRequirements={initialRequirements}
      />
      <Footer />
    </main>
  );
}
