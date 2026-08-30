import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Apply for Authorised Alkota Dealership | Alkota UK',
  description: 'Join the UK network of authorised Alkota pressure washing and industrial cleaning equipment dealers. Exclusive territories, high-margin machinery, genuine OEM parts distribution, and full technical factory training.',
  openGraph: {
    title: 'Apply for Authorised Alkota Dealership | Alkota UK',
    description: 'Exclusive UK territorial agreements for industrial pressure washing distributors and service centres.',
    url: 'https://alkota.co.uk/dealers/apply',
  },
};

export default function DealerApplyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
