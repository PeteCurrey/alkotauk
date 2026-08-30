import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Heavy Industrial Cleaning Infrastructure & Turnkey Plant Installations | Alkota UK',
  description: 'Heavy industrial cleaning engineering for UK sectors: containerised cleaning plant rooms, automated rig mat washers, multi-bay fixed wash installations, and site commissioning.',
  openGraph: {
    title: 'Heavy Industrial Cleaning Infrastructure | Alkota UK',
    description: 'Turnkey industrial cleaning systems engineered for oil & gas, mining, defence, renewables, and civil infrastructure.',
    url: 'https://alkota.co.uk/industrial',
  },
};

export default function IndustrialLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
