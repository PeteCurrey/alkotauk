import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bespoke Wash Plants & Industrial Bay Systems | Alkota UK',
  description: 'Custom-engineered multi-bay wash plants, 360° automated mat cleaning systems, and centralised industrial plant room installations in the UK.',
  openGraph: {
    title: 'Bespoke Wash Plants & Industrial Bay Systems | Alkota UK',
    description: 'Custom-engineered multi-bay wash plants, 360° automated mat cleaning systems, and centralised industrial plant room installations in the UK.',
    type: 'website',
  },
};

export default function WashPlantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
