"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  // Helper to check if a link is active
  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* 1. LOGO / BRAND */}
          <Link href="/" className="flex items-center gap-2 group">
             {/* If you have a logo file, uncomment this:
             <Image src="/icon.jpg" alt="Logo" width={40} height={40} className="rounded" /> 
             */}
             <div className="flex flex-col">
               <span className="font-bold text-xl uppercase tracking-wider group-hover:text-gray-300 transition-colors">
                 Penn Rock
               </span>
               <span className="text-[10px] text-gray-400 uppercase tracking-widest">
                 Industries
               </span>
             </div>
          </Link>

          {/* 2. NAVIGATION LINKS */}
          <div className="flex gap-6 md:gap-8 text-sm font-bold uppercase tracking-wide">
            <Link 
              href="/" 
              className={`hover:text-blue-400 transition-colors ${isActive('/') ? 'text-blue-400' : 'text-gray-300'}`}
            >
              Inventory
            </Link>
            
            <Link 
              href="/sell" 
              className={`hover:text-blue-400 transition-colors ${isActive('/sell') ? 'text-blue-400' : 'text-gray-300'}`}
            >
              Sell Your Truck
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}