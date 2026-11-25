import type { Metadata } from 'next';
import ClientSuccessPage from './ClientSuccessPage';

export const metadata: Metadata = {
  title: 'Order Confirmed | Alkota UK',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default function CheckoutSuccessPage() {
  return <ClientSuccessPage />;
}
