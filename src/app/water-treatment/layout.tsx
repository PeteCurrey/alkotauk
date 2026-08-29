import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Industrial Water Treatment & Wash Water Recovery | Alkota UK',
  description: 'Complete industrial water management: multi-stage vacuum recovery (VFS), media filtration & recycling (CSF), and wastewater evaporation. Environment Agency and BS EN 858 compliant systems.',
  openGraph: {
    title: 'Industrial Water Treatment & Wash Water Recovery | Alkota UK',
    description: 'Complete industrial water management: multi-stage vacuum recovery (VFS), media filtration & recycling (CSF), and wastewater evaporation. Environment Agency and BS EN 858 compliant systems.',
    url: 'https://alkota.co.uk/water-treatment',
    type: 'website',
    images: [
      {
        url: 'https://alkota.com/wp-content/uploads/2023/07/Water_Treatment_CFS_10_Alkota-1024x1024.png',
        width: 1024,
        height: 1024,
        alt: 'Alkota Industrial Water Treatment & Media Filtration Systems',
      },
    ],
  },
  alternates: {
    canonical: 'https://alkota.co.uk/water-treatment',
  },
};

export default function WaterTreatmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
