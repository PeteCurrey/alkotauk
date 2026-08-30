import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wash Bay Environmental Compliance Assessment Tool | Alkota UK',
  description: 'Assess UK Environment Agency PPG13 and Section 85 compliance for your commercial wash bay. Evaluate oil interceptor requirements, trade effluent consents, and closed-loop recycling needs.',
  openGraph: {
    title: 'Wash Bay Environmental Compliance Tool | Alkota UK',
    description: 'Check environmental compliance, wastewater drainage regulations, and oil interceptor guidelines for UK commercial wash bays.',
    url: 'https://alkota.co.uk/tools/wash-bay-compliance',
  },
};

export default function WashBayComplianceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
