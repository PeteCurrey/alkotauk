import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Open-Deck Pressure Washer Trailers UK | Single & Tandem Axle | Alkota UK',
  description: 'Commercial open-deck pressure washer trailers engineered for rapid site deployment, unobstructed 360-degree ventilation, and payloads up to 2,820kg.',
  alternates: {
    canonical: 'https://alkota.co.uk/trailers/open',
  },
  openGraph: {
    title: 'Open-Deck Pressure Washer Trailers | Alkota UK',
    description: 'Rugged open-chassis pressure washing trailers with baffled water storage and heavy-duty Alkota hot water machinery.',
    url: 'https://alkota.co.uk/trailers/open',
    siteName: 'Alkota UK',
    locale: 'en_GB',
    type: 'website',
  },
};

export default function OpenTrailerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
