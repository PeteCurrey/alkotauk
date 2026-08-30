import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hire vs Buy Commercial Equipment Calculator | Alkota UK',
  description: 'Calculate whether hiring, contract leasing, or purchasing industrial pressure washers is most cost-effective for your operational duty cycle and cash flow.',
  openGraph: {
    title: 'Industrial Equipment Hire vs Buy Calculator | Alkota UK',
    description: 'Compare capital expenditure, rental costs, maintenance overheads, and tax depreciation.',
    url: 'https://alkota.co.uk/tools/hire-vs-buy',
  },
};

export default function HireVsBuyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
