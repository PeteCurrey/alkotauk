'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App runtime error:', error);
  }, [error]);

  return (
    <main className="min-h-screen bg-alkota-bg text-alkota-black flex flex-col justify-center items-center px-6 py-20">
      <div className="max-w-md w-full bg-white border border-alkota-iron p-8 text-center space-y-6 shadow-sm">
        <div className="inline-block p-3 bg-red-100 text-red-600 border border-red-200">
          <AlertCircle className="h-8 w-8" />
        </div>
        <div>
          <span className="font-ibm-plex-mono text-xs uppercase tracking-[0.3em] text-red-600 block mb-1">
            500 // SYSTEM EXCEPTION
          </span>
          <h1 className="font-extralight text-3xl uppercase tracking-tight text-alkota-black">
            Operational Interruption.
          </h1>
        </div>
        <p className="text-xs text-alkota-silver leading-relaxed">
          An unexpected error occurred while rendering this process view. You can attempt to re-initialize the component or return to the main dashboard.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 bg-alkota-orange text-white px-6 py-3 text-xs uppercase tracking-widest hover:bg-alkota-black transition-colors"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Re-initialize View</span>
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 border border-alkota-iron bg-alkota-bg text-alkota-black px-6 py-3 text-xs uppercase tracking-widest hover:border-alkota-orange transition-colors"
          >
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
