"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

interface TruckProps {
  title: string;
  slug: string;
  images: string[];
  price: number;
  year: number;
  make: string;
  model: string;
  hoursOrMileage: string;
  status: string;
  category: string;
}

export default function InventoryCard({ truck }: { truck: TruckProps }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const images = truck.images || [];
  const currentImage = images[currentImageIndex];
  
  // Check if sold
  const isSold = truck.status === 'sold';

  // Navigation Logic (same as before)
  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };
  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div
      className={`group border rounded-lg overflow-hidden transition-all bg-white flex flex-col ${
        isSold ? "border-gray-200 opacity-80" : "border-gray-200 hover:shadow-lg hover:-translate-y-1"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. IMAGE AREA */}
      <div className="relative h-64 w-full bg-gray-100">
        
        <Link href={`/inventory/${truck.slug}`} className="absolute inset-0 z-0">
          {currentImage ? (
            <Image
              src={currentImage}
              alt={truck.title}
              fill
              // If sold, make it grayscale!
              className={`object-cover transition-all duration-500 ${isSold ? "grayscale contrast-125" : ""}`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
          )}
        </Link>

        {/* SOLD STAMP (Only shows if sold) */}
        {isSold && (
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none bg-black/10">
            <div className="border-4 border-red-600 text-red-600 font-black text-4xl px-6 py-2 -rotate-12 bg-white/90 shadow-xl tracking-widest uppercase">
              SOLD
            </div>
          </div>
        )}

        {/* ARROWS (Hide if sold) */}
        {!isSold && images.length > 1 && isHovered && (
          <>
            <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-10 hover:bg-black/70">
              &#8249;
            </button>
            <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-10 hover:bg-black/70">
              &#8250;
            </button>
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-10">
              {images.map((_, idx) => (
                <div key={idx} className={`h-1.5 w-1.5 rounded-full shadow-sm ${idx === currentImageIndex ? "bg-white" : "bg-white/50"}`} />
              ))}
            </div>
          </>
        )}

        {/* STATUS BADGE (Only show 'Available' or 'Pending', hide 'Sold' since we have the big stamp) */}
        {!isSold && (
          <div className={`absolute top-2 right-2 text-xs font-bold px-2 py-1 rounded uppercase shadow-sm z-10 ${
            truck.status === 'pending' ? 'bg-orange-500 text-white' : 'bg-green-600 text-white'
          }`}>
            {truck.status === 'pending' ? 'Pending Sale' : 'Available'}
          </div>
        )}
      </div>

      {/* 2. TEXT DETAILS */}
      <Link href={`/inventory/${truck.slug}`} className="flex flex-col flex-grow">
        <div className="p-4 flex flex-col flex-grow">
          <div className="mb-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              {truck.category}
            </span>
          </div>

          <h3 className={`text-lg font-bold line-clamp-1 mb-1 ${isSold ? "text-gray-500 line-through decoration-gray-400" : "text-gray-900"}`}>
            {truck.title}
          </h3>

          <p className="text-gray-500 text-sm mb-4">
            {truck.year} • {truck.make} • {truck.hoursOrMileage}
          </p>

          <div className="mt-auto flex items-center justify-between border-t pt-4">
            <span className={`text-2xl font-bold ${isSold ? "text-gray-400" : "text-blue-900"}`}>
              {truck.price ? `$${truck.price.toLocaleString()}` : "Call for Price"}
            </span>
            
            {!isSold && (
              <span className="text-sm font-medium text-gray-600 group-hover:text-blue-900">
                View Details &rarr;
              </span>
            )}
            
            {isSold && (
              <span className="text-sm font-bold text-red-600 uppercase tracking-wider">
                Sold
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}