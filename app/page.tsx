import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import InventoryCard from "@/app/components/InventoryCard";
import FilterBar from "@/app/components/FilterBar";

// 1. DYNAMIC QUERY: Accepts a $category parameter
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

// 2. Accept 'searchParams' from the URL
export default async function Home({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const resolvedParams = await searchParams;
  const category = resolvedParams?.category || "all";

  // 3. Fetch data using the category filter
  const trucks = await client.fetch(INVENTORY_QUERY, { category });

  return (
    <main className="min-h-screen bg-white pb-20">
      

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
           <h2 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">Latest Arrivals</h2>
        </div>
        
        {/* 4. Insert Filter Bar */}
        <FilterBar />
        
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