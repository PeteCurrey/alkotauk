import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Enclosed Mobile Plant Room Trailers | Weatherproof & Acoustic | Alkota UK',
  description: 'Insulated walk-in mobile plant room trailers. All-weather protection, high security overnight storage, acoustic dampening, and custom corporate fleet livery.',
  alternates: {
    canonical: 'https://alkota.co.uk/trailers/enclosed',
  },
  openGraph: {
    title: 'Enclosed Mobile Plant Room Trailers | Alkota UK',
    description: 'Weatherproof insulated walk-in pressure washing trailers with internal plant room lighting and secure tool storage.',
    url: 'https://alkota.co.uk/trailers/enclosed',
    siteName: 'Alkota UK',
    locale: 'en_GB',
    type: 'website',
  },
};

export default function EnclosedTrailerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
