import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Guided Industrial Chemical Selector | Alkota UK',
  description: 'Interactive chemical selector guide. Identify the optimal detergent, degreaser, brightener, or preventative additive for your fleet, workshop, or wash bay.',
  openGraph: {
    title: 'Industrial Chemical Selector | Alkota UK',
    description: 'Step-by-step chemical selection for commercial haulage, agriculture, plant hire, and industrial workshops.',
    url: 'https://alkota.co.uk/chemicals/selector',
  },
};

export default function ChemicalSelectorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
