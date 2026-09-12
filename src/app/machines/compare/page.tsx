import React from 'react';
import { Metadata } from 'next';
import { getProducts } from '@/lib/products';
import ComparisonClient from './ComparisonClient';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Compare Industrial Cleaning Machines | Alkota UK',
  description: 'Side-by-side engineering comparison of Alkota hot water pressure washers, cold wash units, steam generators, and industrial cleaning rigs.',
  robots: {
    index: false, // Protected from combinatorial duplicate indexing
    follow: true,
  },
  alternates: {
    canonical: 'https://alkota.co.uk/machines/compare',
  },
};

interface PageProps {
  searchParams: Promise<{
    machines?: string;
    models?: string;
  }>;
}

export default async function MachineComparePage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const allMachines = await getProducts();

  let initialSlugs: string[] = [];

  if (resolvedParams.machines) {
    initialSlugs = resolvedParams.machines
      .split(',')
      .map(s => s.trim().toLowerCase())
      .filter(Boolean)
      .slice(0, 3);
  } else if (resolvedParams.models) {
    // Attempt match by model code
    const codes = resolvedParams.models.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
    for (const code of codes) {
      const match = allMachines.find(
        m => m.model_code?.toLowerCase() === code || m.slug.toLowerCase().includes(code)
      );
      if (match && !initialSlugs.includes(match.slug)) {
        initialSlugs.push(match.slug);
      }
    }
    initialSlugs = initialSlugs.slice(0, 3);
  }

  return (
    <main>
      <ComparisonClient
        allMachines={allMachines}
        initialSlugs={initialSlugs}
      />
    </main>
  );
}
