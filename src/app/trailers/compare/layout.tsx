import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Compare Bespoke Trailer Architectures | Technical Matrix | Alkota UK',
  description: 'Side-by-side technical comparison of Alkota UK trailer configurations: Open vs Enclosed, Single vs Tandem Axle, Standard vs Closed-Loop Water Recycling.',
  alternates: {
    canonical: 'https://alkota.co.uk/trailers/compare',
  },
};

export default function CompareTrailerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
