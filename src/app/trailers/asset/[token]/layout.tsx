import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Alkota Asset Support Node | Verified Industrial Equipment | Alkota UK',
  description: 'Public-safe asset verification node and technical support desk for delivered Alkota UK machinery.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AssetQrLayout({ children }: { children: React.ReactNode }) {
  return children;
}
