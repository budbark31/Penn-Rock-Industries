import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import InventoryCard from "@/app/components/InventoryCard";
import FilterBar from "@/app/components/FilterBar";

// Query (Same as before)
const INVENTORY_QUERY = groq`*[
  _type == "inventory" 
  && status != "sold"
  && ($category == "all" || category == $category) 
] | order(_createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  "images": images[0..4].asset->url,
  price,
  year,
  make,
  model,
  hoursOrMileage,
  status,
  category
}`;

export const revalidate = 60;

export default async function Home({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const resolvedParams = await searchParams;
  const category = resolvedParams?.category || "all";
  const trucks = await client.fetch(INVENTORY_QUERY, { category });

  return (
    // CHANGE 1: Added "pt-16" (Padding Top) to push everything down
    <main className="min-h-screen bg-white pb-20 pt-16 md:pt-20">
      
      {/* If you deleted the Hero Section, this container is now first */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
           <h2 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">Latest Arrivals</h2>
           {/* Optional: You could add a 'View All' link here later */}
        </div>
        
        {/* Filter Bar */}
        <FilterBar />
        
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trucks.length > 0 ? (
            trucks.map((truck: any) => (
              <InventoryCard key={truck._id} truck={truck} />
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-gray-50 rounded-lg border border-gray-100">
              <p className="text-xl text-gray-600 font-bold">No inventory found in this category.</p>
              <p className="text-sm text-gray-500 mt-2">Try switching filters or check back later.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}