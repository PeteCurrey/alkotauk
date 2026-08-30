import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Alkota Fleet Portal | Alkota UK',
  robots: {
    index: false,
    follow: false,
  },
};

export default function MyAlkotaServiceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
