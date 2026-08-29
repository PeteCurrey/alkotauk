import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trailer Payload & Towing Estimator UK | MAM & Axle Guide | Alkota UK',
  description: 'Preliminary UK trailer payload and towing capacity estimator. Calculate unladen tare, water mass, and legal Maximum Authorised Mass (MAM) limits.',
  alternates: {
    canonical: 'https://alkota.co.uk/trailers/payload-calculator',
  },
  openGraph: {
    title: 'Trailer Payload & Towing Estimator | Alkota UK',
    description: 'Calculate unladen tare, onboard water payload, and Maximum Authorised Mass (MAM) for mobile pressure washer trailers.',
    url: 'https://alkota.co.uk/trailers/payload-calculator',
    siteName: 'Alkota UK',
    locale: 'en_GB',
    type: 'website',
  },
};

export default function PayloadCalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
