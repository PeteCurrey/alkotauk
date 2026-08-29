import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Alkota | Customer Equipment Hub & Digital Build Tracker',
  description: 'Customer equipment ledger, digital service history, and live bespoke trailer build progress tracker.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function MyAlkotaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
