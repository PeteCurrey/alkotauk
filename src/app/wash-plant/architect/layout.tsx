import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wash Plant Architect & Technical Specification Tool | Alkota UK',
  description: 'Interactive industrial wash plant specification tool. Configure wash bay civil dimensions, pump manifolds, water recycling capacity, and chemical delivery systems.',
  openGraph: {
    title: 'Industrial Wash Plant Architect | Alkota UK',
    description: 'Design and specify your facility wash plant with real-time mechanical and water treatment sizing.',
    url: 'https://alkota.co.uk/wash-plant/architect',
  },
};

export default function WashPlantArchitectLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
