import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "@/components/SessionProvider";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  metadataBase: new URL('https://alkota.co.uk'),
  title: "Alkota UK | The Platinum Standard in Industrial Cleaning",
  description: "Highest quality hot water pressure washers, custom trailers, and industrial cleaning equipment. Born in South Dakota, built for the UK.",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '512x512' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@200;300;400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-alkota-bg text-alkota-black min-h-screen flex flex-col font-normal antialiased">
        <SessionProvider>
          <CartProvider>
            <div className="flex-1 flex flex-col">
              {children}
            </div>
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
