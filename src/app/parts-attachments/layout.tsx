import React from 'react';
import type { Metadata } from 'next';
import PartsHeader from '@/components/parts/PartsHeader';
import Footer from '@/components/Footer';
import { PartsRequestProvider } from '@/components/parts/PartsRequestListContext';
import PartsRequestDrawer from '@/components/parts/PartsRequestDrawer';

export const metadata: Metadata = {
  title: 'Parts & Attachments Catalogue | Alkota UK',
  description: 'OEM-genuine pressure washer parts, Swiss-precision Mosmatic tooling, Cox Reels hose systems, Steel Eagle surface cleaners, and Dual Pumps components.',
};

export default function PartsAttachmentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PartsRequestProvider>
      <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-alkota-black selection:bg-alkota-orange selection:text-white">
        <PartsHeader />
        <div className="flex-1">
          {children}
        </div>
        <Footer />
        <PartsRequestDrawer />
      </div>
    </PartsRequestProvider>
  );
}
