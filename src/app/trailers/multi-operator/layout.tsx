import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dual-Operator Pressure Washer Trailers | High-Flow 2-Gun Rigs | Alkota UK',
  description: 'Double your wash productivity with dual-lance trailer systems. High-flow industrial pumps delivering simultaneous independent pressure and heat for two operators.',
  alternates: {
    canonical: 'https://alkota.co.uk/trailers/multi-operator',
  },
  openGraph: {
    title: 'Dual-Operator Pressure Washer Trailers | Alkota UK',
    description: 'Halve commercial wash times with high-flow dual-gun industrial pressure washer trailers.',
    url: 'https://alkota.co.uk/trailers/multi-operator',
    siteName: 'Alkota UK',
    locale: 'en_GB',
    type: 'website',
  },
};

export default function MultiOperatorTrailerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
