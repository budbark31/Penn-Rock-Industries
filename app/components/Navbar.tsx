"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    // Increased height from h-20 to h-24 to fit the bigger logo
    <nav className="bg-slate-900 text-white shadow-lg sticky top-0 z-50 h-24 flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-center">
          
          {/* 1. BIG LOGO */}
          <Link href="/" className="flex items-center gap-3 group">
             {/* Icon Placeholder (Uncomment if you add the image later)
             <div className="relative h-12 w-12 rounded-lg overflow-hidden border border-slate-600 hidden md:block">
                <Image src="/icon.jpg" alt="Logo" fill className="object-cover" />
             </div>
             */}
             
             <div className="flex flex-col">
               {/* Changed text-xl -> text-3xl (Big & Bold) */}
               <span className="font-black text-2xl md:text-3xl uppercase tracking-tight leading-none group-hover:text-gray-300 transition-colors">
                 Penn Rock
               </span>
               {/* Changed text-[10px] -> text-xs/sm (Readable) */}
               <span className="text-xs md:text-sm text-gray-400 uppercase tracking-[0.3em] font-medium mt-1">
                 Industries
               </span>
             </div>
          </Link>

          {/* 2. NAVIGATION LINKS */}
          <div className="flex gap-6 md:gap-10 text-sm md:text-base font-bold uppercase tracking-wide">
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