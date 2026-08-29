import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Industrial Wash Plant Design, Installation & Lifecycle Support | Alkota UK',
  description: 'Alkota UK engineers bespoke industrial cleaning infrastructure: turnkey wash plant design, mechanical fabrication, water treatment, automation and lifecycle PPM for high-throughput commercial and industrial operations (£100k–£1m+ CAPEX).',
  keywords: [
    'industrial wash plant',
    'wash plant systems',
    'heavy equipment wash plant',
    'vehicle wash plant',
    'industrial wash bay',
    'automated wash plant',
    'high pressure wash plant',
    'wash plant design',
    'wash plant installation',
    'wash plant maintenance',
    'wash plant servicing',
    'wash plant PPM',
    'wash plant asset management',
    'wash plant refurbishment',
    'rig mat washer UK',
    'mat cleaning system',
    'sheet pile cleaning system',
    'heavy plant wash system'
  ],
  openGraph: {
    title: 'Industrial Wash Plant Infrastructure | Alkota UK',
    description: 'Bespoke industrial wash plant design, engineering, installation and lifecycle asset management for UK high-throughput operations.',
    url: 'https://alkota.co.uk/wash-plant',
    type: 'website',
  },
};

export default function WashPlantLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
