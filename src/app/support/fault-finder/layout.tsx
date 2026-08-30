import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Interactive Pressure Washer Fault Finder & Troubleshooting | Alkota UK',
  description: 'Diagnose pressure washer symptoms: loss of pressure, burner ignition failure, pressure pulsation, water leaks, and chemical injection issues with step-by-step resolution.',
  openGraph: {
    title: 'Pressure Washer Fault Finder | Alkota UK Support',
    description: 'Diagnose machinery symptoms and identify required spare parts or engineer dispatch requirements.',
    url: 'https://alkota.co.uk/support/fault-finder',
  },
};

export default function FaultFinderLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
