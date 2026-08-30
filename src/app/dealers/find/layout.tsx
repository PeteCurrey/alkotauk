import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Find Your Regional Alkota Dealer & Service Centre | Alkota UK',
  description: 'Locate authorised Alkota UK dealers, service engineers, parts stockists, and demonstration centres near your facility.',
  openGraph: {
    title: 'Find Your Local Alkota Dealer | Alkota UK',
    description: 'Find authorised sales, servicing, and spare parts support across England, Scotland, Wales, and Northern Ireland.',
    url: 'https://alkota.co.uk/dealers/find',
  },
};

export default function FindDealerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
