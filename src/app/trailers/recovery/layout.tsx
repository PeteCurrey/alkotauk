import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mobile Wash-Water Recovery & Filtration Trailers | Alkota UK',
  description: 'Engineered mobile wash-water capture and treatment systems. Surface runoff vacuum extraction, multi-stage oil-water filtration, and closed-loop recycling options.',
  alternates: {
    canonical: 'https://alkota.co.uk/trailers/recovery',
  },
  openGraph: {
    title: 'Mobile Wash-Water Recovery Systems | Alkota UK',
    description: 'Engineered mobile wash-water capture, multi-stage filtration, and closed-loop recycling trailers.',
    url: 'https://alkota.co.uk/trailers/recovery',
    siteName: 'Alkota UK',
    locale: 'en_GB',
    type: 'website',
  },
};

export default function RecoveryTrailerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
