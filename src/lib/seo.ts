import { Metadata } from 'next';

interface SeoProps {
  title: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
}

export function generateSeo({
  title,
  description = 'Alkota UK - Industrial Pressure Washers and Cleaning Equipment. Built for the toughest jobs.',
  image = '/og-image.jpg',
  noIndex = false,
}: SeoProps): Metadata {
  const siteName = 'Alkota UK';
  const fullTitle = `${title} | ${siteName}`;

  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: 'website',
      siteName,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3002'),
  };
}
