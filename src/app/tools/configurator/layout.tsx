import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Custom Machinery & System Configurator | Alkota UK',
  description: 'Interactive machinery configurator. Specify custom motor voltages, fuel options, stainless steel coil wraps, hose reels, and chemical injection options.',
  openGraph: {
    title: 'Industrial Equipment Configurator | Alkota UK',
    description: 'Configure and request a bespoke quotation for custom industrial cleaning systems.',
    url: 'https://alkota.co.uk/tools/configurator',
  },
};

export default function ConfiguratorToolLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
