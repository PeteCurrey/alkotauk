import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Machine Match Industrial Equipment Finder | Alkota UK',
  description: 'Interactive pressure washer selection wizard. Match your flow rate, pressure, heating source (diesel, gas, electric), and application to the exact Alkota model.',
  openGraph: {
    title: 'Machine Match Equipment Finder | Alkota UK',
    description: 'Find the ideal industrial hot or cold water pressure washer in under 60 seconds.',
    url: 'https://alkota.co.uk/tools/machine-match',
  },
};

export default function MachineMatchLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
