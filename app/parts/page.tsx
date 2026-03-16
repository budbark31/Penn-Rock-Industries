import { client } from "@/sanity/lib/client";
import { PARTS_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import FilterBar from "@/app/components/FilterBar";

export const metadata: Metadata = {
  title: "Heavy Equipment Parts | Penn Rock Industries",
  description: "Quality tested parts for heavy equipment, ready to ship. Engines, transmissions, body parts, and more.",
};

export const revalidate = 60;

type Part = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  condition: string;
  status: string;
  price: number;
  inventoryCount: number;
  imageUrl: string | null;
};

// Format category for display
function formatCategory(category: string): string {
  const categoryMap: Record<string, string> = {
    "engine": "Engine",
    "transmission": "Transmission",
    "body-cab": "Body/Cab",
    "maintenance-filters": "Maintenance/Filters",
    "accessories": "Accessories",
    "other": "Other",
  };
  return categoryMap[category] || category;
}

// Format condition for display
function formatCondition(condition: string): string {
  const conditionMap: Record<string, string> = {
    "new": "New",
    "used": "Used",
    "rebuilt": "Rebuilt",
    "core": "Core",
  };
  return conditionMap[condition] || condition;
}

export default async function PartsPage() {
  const parts: Part[] = await client.fetch(PARTS_QUERY);

  return (
    <main className="min-h-screen bg-white pb-20 pt-16 md:pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">Parts Inventory</h2>
        </div>
        
        {/* Filter Bar */}
        <FilterBar />
        
        {/* Parts Grid */}
        {parts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {parts.map((part) => {
              const isSold = part.status === 'sold';
              const isOutOfStock = part.status === 'out-of-stock';
              
              return (
                <Link
                  href={`/parts/${part.slug}`}
                  key={part._id}
                  className={`group border rounded-lg overflow-hidden transition-all bg-white flex flex-col ${
                    isSold ? "border-gray-200 opacity-80" : "border-gray-200 hover:shadow-lg hover:-translate-y-1"
                  }`}
                >
                  {/* Image Area */}
                  <div className="relative h-64 w-full bg-gray-100">
                    {part.imageUrl ? (
                      <Image
                        src={part.imageUrl}
                        alt={part.title}
                        fill
                        className={`object-cover transition-all duration-500 ${isSold ? "grayscale contrast-125" : ""}`}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}

                    {/* SOLD STAMP */}
                    {isSold && (
                      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none bg-black/10">
                        <div className="border-4 border-red-600 text-red-600 font-black text-4xl px-6 py-2 -rotate-12 bg-white/90 shadow-xl tracking-widest uppercase">
                          SOLD
                        </div>
                      </div>
                    )}

                    {/* STATUS BADGE */}
                    {!isSold && (
                      <div className={`absolute top-2 right-2 text-xs font-bold px-2 py-1 rounded uppercase shadow-sm z-10 ${
                        isOutOfStock ? 'bg-orange-500 text-white' : 'bg-green-600 text-white'
                      }`}>
                        {isOutOfStock ? 'Out of Stock' : 'Available'}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4 flex flex-col flex-grow">
                    {/* Category */}
                    <div className="mb-2">
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        {formatCategory(part.category)}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className={`text-lg font-bold line-clamp-1 mb-1 ${isSold ? "text-gray-500 line-through decoration-gray-400" : "text-gray-900"}`}>
                      {part.title}
                    </h3>

                    {/* Condition + Stock */}
                    <p className="text-gray-500 text-sm mb-4">
                      {formatCondition(part.condition)}
                      {part.inventoryCount !== null && part.inventoryCount !== undefined && (
                        <> • {part.inventoryCount > 0 ? `${part.inventoryCount} in stock` : "Out of stock"}</>
                      )}
                    </p>

                    {/* Price & Button */}
                    <div className="mt-auto flex items-center justify-between border-t pt-4">
                      <span className={`text-2xl font-bold ${isSold ? "text-gray-400" : "text-blue-900"}`}>
                        {part.price ? `$${part.price.toLocaleString()}` : "Call for Price"}
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
              );
            })}
          </div>
        ) : (
          <div className="col-span-full text-center py-20 bg-gray-50 rounded-lg border border-gray-100">
            <p className="text-xl text-gray-600 font-bold">No parts available yet.</p>
            <p className="text-gray-500 mt-2">Check back soon for new inventory.</p>
          </div>
        )}
      </div>
    </main>
  );
}
