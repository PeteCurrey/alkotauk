import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mobile Wash Water Recovery & Recycling Trailers | EA Compliant | Alkota UK',
  description: 'Zero-drainage mobile pressure washing systems. Surface runoff vacuum capture, 5-stage oil-water filtration, and closed-loop water recycling compliant with UK Environment Agency standards.',
  alternates: {
    canonical: 'https://alkota.co.uk/trailers/recovery',
  },
  openGraph: {
    title: 'Mobile Wash Water Recovery Trailers | Alkota UK',
    description: 'Environment Agency compliant mobile wash water capture and recycling trailers for zero-drainage operations.',
    url: 'https://alkota.co.uk/trailers/recovery',
    siteName: 'Alkota UK',
    locale: 'en_GB',
    type: 'website',
  },
};

export default function RecoveryTrailerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
