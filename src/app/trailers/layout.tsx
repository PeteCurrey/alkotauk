import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bespoke Pressure Washer Trailers UK | Custom Mobile Wash Systems | Alkota UK',
  description: 'UK road-legal bespoke pressure washer trailers and enclosed mobile plant rooms. Built with genuine Alkota hot water machinery, baffled water tanks, and closed-loop wastewater recovery.',
  alternates: {
    canonical: 'https://alkota.co.uk/trailers',
  },
  openGraph: {
    title: 'Bespoke Pressure Washer Trailers UK | Alkota UK Flagship',
    description: 'Custom-engineered road-legal pressure washer trailers, enclosed mobile plant rooms, and closed-loop wash water recycling systems.',
    url: 'https://alkota.co.uk/trailers',
    siteName: 'Alkota UK',
    locale: 'en_GB',
    type: 'website',
    images: [
      {
        url: 'https://alkota.co.uk/assets/products/trailer-single.png',
        width: 1200,
        height: 630,
        alt: 'Alkota UK Bespoke Pressure Washer Trailer',
      },
    ],
  },
};

export default function TrailersLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': 'Bespoke Pressure Washer Trailer Engineering',
    'provider': {
      '@type': 'Organization',
      'name': 'Alkota UK',
      'url': 'https://alkota.co.uk',
      'logo': 'https://alkota.co.uk/logo.png',
      'telephone': '+44-800-000-0000',
    },
    'areaServed': {
      '@type': 'Country',
      'name': 'United Kingdom',
    },
    'description': 'Custom design, engineering, IVA certification, and manufacturing of industrial pressure washer trailers, mobile wash plant rooms, and closed-loop wastewater recovery rigs.',
    'serviceType': 'Custom Industrial Machinery Manufacturing',
    'url': 'https://alkota.co.uk/trailers',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
