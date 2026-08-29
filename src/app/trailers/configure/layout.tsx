import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Configure Your Bespoke Pressure Washer Trailer | Interactive Builder | Alkota UK',
  description: 'Design and validate your custom Alkota mobile washing rig. Real-time axle weight calculation, water endurance modelling, and engineering review submission.',
  alternates: {
    canonical: 'https://alkota.co.uk/trailers/configure',
  },
  openGraph: {
    title: 'Configure Your Bespoke Trailer Rig | Alkota UK Builder',
    description: '13-step digital engineering configurator with instant MAM checks, water run-time calculations, and preliminary specification generator.',
    url: 'https://alkota.co.uk/trailers/configure',
    siteName: 'Alkota UK',
    locale: 'en_GB',
    type: 'website',
  },
};

export default function ConfigureTrailerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
