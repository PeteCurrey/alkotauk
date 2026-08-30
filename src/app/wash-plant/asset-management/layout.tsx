import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wash Plant Asset Management & Telemetry Lifecycle | Alkota UK',
  description: 'Proactive asset tracking, operating hour monitoring, coil condition profiling, and planned overhaul scheduling for Alkota industrial wash plant installations.',
  openGraph: {
    title: 'Wash Plant Asset Management | Alkota UK',
    description: 'Lifecycle monitoring, compliance documentation, and maintenance history for heavy wash plant infrastructure.',
    url: 'https://alkota.co.uk/wash-plant/asset-management',
  },
};

export default function WashPlantAssetLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
