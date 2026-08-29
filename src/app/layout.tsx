import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "@/components/SessionProvider";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: "Alkota UK | The Platinum Standard in Industrial Cleaning",
  description: "Highest quality hot water pressure washers, custom trailers, and industrial cleaning equipment. Born in South Dakota, built for the UK.",
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
