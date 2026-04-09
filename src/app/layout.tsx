import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alkota UK (Diagnostic Mode)",
  description: "Restoring site connectivity.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-black min-h-screen flex flex-col">
        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}

