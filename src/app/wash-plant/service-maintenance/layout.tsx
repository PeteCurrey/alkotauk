import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wash Plant Service, PPM & Maintenance Contracts | Alkota UK',
  description: 'Nationwide maintenance contracts, planned preventative maintenance (PPM), and emergency engineering support for commercial wash plant installations and recycling systems.',
  openGraph: {
    title: 'Wash Plant Service & PPM Contracts | Alkota UK',
    description: 'Protect your wash bay uptime with certified Alkota preventative maintenance and pump overhaul service agreements.',
    url: 'https://alkota.co.uk/wash-plant/service-maintenance',
  },
};

export default function WashPlantServiceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
