import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Total Cost of Ownership (TCO) Calculator | Alkota UK',
  description: 'Evaluate lifetime operating costs for industrial hot water pressure washers: fuel efficiency, heating coil longevity, pump servicing intervals, and electricity consumption.',
  openGraph: {
    title: 'Pressure Washer Total Cost of Ownership Calculator | Alkota UK',
    description: 'Calculate fuel, service, and downtime savings with Alkota Schedule 80 hydro-insulated heating coils.',
    url: 'https://alkota.co.uk/tools/tco-calculator',
  },
};

export default function TcoCalculatorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
