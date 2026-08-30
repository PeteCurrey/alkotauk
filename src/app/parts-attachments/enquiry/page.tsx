import React, { Suspense } from 'react';
import EnquiryFormClient from './EnquiryFormClient';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Parts Request & Enquiry | Alkota UK',
  description: 'Request genuine Alkota OEM parts, replacement components, and specialist pressure washing attachments.',
};

export default function PartsEnquiryPage() {
  return (
    <main className="min-h-screen bg-[#FAF9F5] text-alkota-black">
      <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center font-ibm-plex-mono text-xs text-alkota-silver uppercase tracking-widest">Loading enquiry desk...</div>}>
        <EnquiryFormClient />
      </Suspense>
    </main>
  );
}
