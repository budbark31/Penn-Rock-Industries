import type { Metadata } from "next";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer"; // Import the new Footer
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
      <body className="antialiased bg-white flex flex-col min-h-screen">
        <Navbar />
        
        <div className="flex-grow">
          {children}
        </div>

        {/* Replaced the hard-coded footer with the Component */}
        <Footer />
      </body>
    </html>
  );
}