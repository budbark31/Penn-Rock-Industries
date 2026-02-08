import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "next-sanity"; 

const TRUCK_QUERY = groq`*[_type == "inventory" && slug.current == $slug][0]{
  title,
  "mainImage": images[0].asset->url,
  price,
  year,
  make,
  model,
  hoursOrMileage,
  status,
  description,
  category,
  stockDate,
  paperwork
}`;

// Refresh data every 60 seconds
export const revalidate = 60;

export default async function TruckPage({ params }: { params: Promise<{ slug: string }> }) {
  // 1. Await the params Promise (Critical for Next.js 15/16)
  const { slug } = await params;

  // 2. Safety Check: If slug is somehow missing, stop here to prevent the Crash
  if (!slug) {
    return (
      <div className="text-center py-20 text-red-500">
        Error: No Truck ID found in URL.
      </div>
    );
  }

  // 3. Fetch Data (Now safe because we know slug exists)
  const truck = await client.fetch(TRUCK_QUERY, { slug });

  if (!truck) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Truck Not Found</h1>
        <Link href="/" className="text-blue-900 hover:underline">
          &larr; Return to Inventory
        </Link>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-12 bg-white min-h-screen">
      <Link href="/" className="text-blue-900 font-bold hover:underline mb-6 inline-block">
        &larr; Back to Inventory
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Image */}
        <div className="bg-gray-100 rounded-lg overflow-hidden h-[400px] relative border border-gray-200 shadow-sm">
          {truck.mainImage ? (
            <Image
              src={truck.mainImage}
              alt={truck.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              No Image Available
            </div>
          )}
        </div>

        {/* Right: Details */}
        <div>
          <div className="mb-4">
            <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-bold uppercase tracking-wide">
              {truck.category || "Inventory"}
            </span>
          </div>

          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{truck.title}</h1>
          <p className="text-gray-600 text-xl mb-6">
            {truck.year} {truck.make} {truck.model} • {truck.hoursOrMileage}
          </p>

          <div className="bg-white p-6 rounded-lg mb-8 border-2 border-gray-100 shadow-sm">
            <p className="text-3xl font-bold text-gray-900 mb-1">
              {truck.price ? `$${truck.price.toLocaleString()}` : "Call for Price"}
            </p>
            <p className={`text-sm font-bold uppercase tracking-wide ${truck.status === 'sold' ? 'text-red-600' : 'text-green-600'}`}>
              Status: {truck.status}
            </p>
          </div>

          <div className="prose max-w-none text-gray-800">
            <h3 className="text-xl font-bold mb-2 text-gray-900">Description</h3>
            {truck.description && <PortableText value={truck.description} />}
          </div>

          <div className="mt-8">
            <button className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-4 rounded-lg text-lg transition-colors shadow-md">
              Contact Sales About This Truck
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}