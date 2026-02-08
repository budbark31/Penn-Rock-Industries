import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Penn Rock Inventory",
  description: "Heavy Trucks & Equipment Sales",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Changed bg-gray-50 to bg-white to remove the sidebars */}
      <body className="antialiased bg-white">
        {children}
      </body>
    </html>
  );
}