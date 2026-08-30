import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book an On-Site Machine Demonstration | Alkota UK',
  description: 'Experience Alkota industrial cleaning power on your own site. Book a live on-site demonstration of our hot water pressure washers, mobile trailers, or aqueous parts washers.',
  openGraph: {
    title: 'Book an On-Site Machine Demonstration | Alkota UK',
    description: 'See the cleaning performance on your toughest industrial soils before you commit. Nationwide on-site demonstrations available.',
    url: 'https://alkota.co.uk/dealers/demo-request',
  },
};

export default function DemoRequestLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
