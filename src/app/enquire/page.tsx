import React, { Suspense } from 'react';
import EnquireClient from './EnquireClient';

export default function EnquirePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center">
          <p className="font-mono text-xs uppercase tracking-widest text-neutral-500">
            Initialising Alkota Commercial Enquiry...
          </p>
        </div>
      }
    >
      <EnquireClient />
    </Suspense>
  );
}
