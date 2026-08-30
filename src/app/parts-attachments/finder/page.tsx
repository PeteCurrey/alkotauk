import React, { Suspense } from 'react';
import { Metadata } from 'next';
import PartsFinderClient from './PartsFinderClient';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Interactive Parts Finder Wizard | Alkota UK',
  description: 'Identify the exact OEM spare part, pump component, or accessory for your pressure washer in seconds.',
};

export default function PartsFinderPage() {
  return (
    <main className="min-h-screen bg-[#FAF9F5] text-alkota-black pb-24 font-sans">
      <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center font-ibm-plex-mono text-xs text-[#888]">Loading Parts Finder...</div>}>
        <PartsFinderClient />
      </Suspense>
    </main>
  );
}
