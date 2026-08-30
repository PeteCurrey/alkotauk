import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bespoke Industrial Cleaning Engineering & Custom Builds | Alkota UK',
  description: 'Custom-engineered industrial cleaning systems. Bespoke pressure washing trailers, containerised skids, multi-bay wash plants, and specialist configurations built for UK commercial operations.',
  openGraph: {
    title: 'Bespoke Industrial Engineering & Custom Builds | Alkota UK',
    description: 'Bespoke trailer rigs, stationary wash bays, and containerised cleaning installations engineered in South Dakota and built for UK industry.',
    url: 'https://alkota.co.uk/bespoke',
  },
};

export default function BespokeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
