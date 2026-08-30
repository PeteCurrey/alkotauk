import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Industrial Sectors & Commercial Cleaning Applications | Alkota UK',
  description: 'Specialised industrial cleaning equipment engineered for UK sectors: Commercial Fleet & Haulage, Agriculture, Construction, Food Processing, Manufacturing, Mining, and Oil & Gas.',
  openGraph: {
    title: 'Industrial Sectors & Applications | Alkota UK',
    description: 'Purpose-built hot water pressure washers, mobile trailers, and stationary wash plants tailored for UK commercial sectors.',
    url: 'https://alkota.co.uk/industries',
  },
};

export default function IndustriesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
