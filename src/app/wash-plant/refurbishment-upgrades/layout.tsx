import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wash Plant Refurbishment, Modernisation & Upgrades | Alkota UK',
  description: 'Extend the operating life of existing wash installations. Retrofit high-efficiency heating coils, upgraded pump manifolds, automated controls, and closed-loop water treatment.',
  openGraph: {
    title: 'Wash Plant Refurbishment & Upgrades | Alkota UK',
    description: 'Transform ageing wash bays with modern energy-efficient Alkota heating and water recycling technology.',
    url: 'https://alkota.co.uk/wash-plant/refurbishment-upgrades',
  },
};

export default function WashPlantRefurbLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
