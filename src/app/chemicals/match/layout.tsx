import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chemical Compatibility & Soil Match Tool | Alkota UK',
  description: 'Match the exact Alkota chemical formulation to your target soil, substrate, and machinery. Instant dilution guidelines for road film, grease, aluminium oxidation, and limescale.',
  openGraph: {
    title: 'Chemical Formulation Match Tool | Alkota UK',
    description: 'Find the right chemical formulation and dilution ratio for your industrial wash application.',
    url: 'https://alkota.co.uk/chemicals/match',
  },
};

export default function ChemicalMatchLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
