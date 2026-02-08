"use client"; // Creates interactivity (clicking arrows)

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

interface TruckProps {
  title: string;
  slug: string;
  images: string[]; // Now accepts an array of images
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

  // Safety: Ensure we have at least an empty array if no images exist
  const images = truck.images || [];
  const currentImage = images[currentImageIndex];

  // Logic to go to next photo
  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault(); // Stop the link from opening
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  // Logic to go to previous photo
  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div
      className="group border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-white flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. IMAGE AREA (Relative container) */}
      <div className="relative h-64 w-full bg-gray-100">
        
        {/* The clickable link for the image itself */}
        <Link href={`/inventory/${truck.slug}`} className="absolute inset-0 z-0">
          {currentImage ? (
            <Image
              src={currentImage}
              alt={`${truck.title} - View ${currentImageIndex + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              No Image
            </div>
          )}
        </Link>

        {/* NAVIGATION ARROWS (Only show if multiple images + hovered) */}
        {images.length > 1 && isHovered && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-10 transition-colors"
            >
              &#8249; {/* Left Arrow Symbol */}
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-10 transition-colors"
            >
              &#8250; {/* Right Arrow Symbol */}
            </button>
            
            {/* Dots Indicator at bottom */}
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-10 pointer-events-none">
              {images.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 w-1.5 rounded-full shadow-sm transition-colors ${
                    idx === currentImageIndex ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Status Badge */}
        <div className="absolute top-2 right-2 bg-blue-900 text-white text-xs font-bold px-2 py-1 rounded uppercase shadow-sm z-10 pointer-events-none">
          {truck.status}
        </div>
      </div>

      {/* 2. TEXT DETAILS AREA (Separate Link) */}
      <Link href={`/inventory/${truck.slug}`} className="flex flex-col flex-grow">
        <div className="p-4 flex flex-col flex-grow">
          <div className="mb-2">
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-wide">
              {truck.category}
            </span>
          </div>

          <h3 className="text-lg font-bold text-gray-900 line-clamp-1 mb-1">
            {truck.title}
          </h3>

          <p className="text-gray-500 text-sm mb-4">
            {truck.year} • {truck.make} • {truck.hoursOrMileage}
          </p>

          <div className="mt-auto flex items-center justify-between border-t pt-4">
            <span className="text-2xl font-bold text-blue-900">
              {truck.price ? `$${truck.price.toLocaleString()}` : "Call for Price"}
            </span>
            <span className="text-sm font-medium text-gray-600 group-hover:text-blue-900">
              View Details &rarr;
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}