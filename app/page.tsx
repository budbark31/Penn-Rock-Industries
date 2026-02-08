import { client } from "@/sanity/lib/client";
import { INVENTORY_QUERY } from "@/sanity/lib/queries";
import InventoryCard from "@/app/components/InventoryCard";

// Update the cache every 60 seconds
export const revalidate = 60;

export default async function Home() {
  const trucks = await client.fetch(INVENTORY_QUERY);

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Section */}
      <div className="bg-slate-900 text-white py-20 px-4 mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight uppercase">Penn Rock Inventory</h1>
        <p className="mt-4 text-slate-300">Heavy Trucks & Equipment Sales</p>
      </div>

      {/* Inventory Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
           <h2 className="text-2xl font-bold text-gray-900">Latest Arrivals</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trucks.length > 0 ? (
            trucks.map((truck: any) => (
              <InventoryCard key={truck._id} truck={truck} />
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-gray-500">
              <p className="text-xl">No inventory currently available.</p>
              <p className="text-sm mt-2">Check back soon for updates.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}