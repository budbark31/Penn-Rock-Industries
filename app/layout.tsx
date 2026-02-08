import type { Metadata } from "next";
import Navbar from "@/app/components/Navbar"; // Import the new component
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
        {/* The Navbar sits at the top of the Body */}
        <Navbar />
        
        {/* The Page content renders here */}
        <div className="flex-grow">
          {children}
        </div>

        {/* Optional: Simple Footer */}
        <footer className="bg-gray-100 border-t border-gray-200 py-8 text-center text-gray-500 text-sm mt-auto">
          &copy; {new Date().getFullYear()} Penn Rock Industries. All rights reserved.
        </footer>
      </body>
    </html>
  );
}