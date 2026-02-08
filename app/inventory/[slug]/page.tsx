import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "next-sanity"; 

// 1. The Query: Find 1 truck by slug
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
  category
}`;

// 2. The Page Component
export default async function TruckPage({ params }: { params: Promise<{ slug: string }> }) {
  // Await params correctly for Next.js 15+
  const { slug } = await params;
  const truck = await client.fetch(TRUCK_QUERY, { slug });

  if (!truck) {
    return <div className="text-center py-20">Truck not found</div>;
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <Link href="/" className="text-gray-500 hover:text-blue-900 mb-6 inline-block">
        &larr; Back to Inventory
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Image */}
        <div className="bg-gray-100 rounded-lg overflow-hidden h-[400px] relative">
          {truck.mainImage && (
            <Image
              src={truck.mainImage}
              alt={truck.title}
              fill
              className="object-cover"
            />
          )}
        </div>

        {/* Right: Details */}
        <div>
          <h1 className="text-4xl font-extrabold text-blue-900 mb-2">{truck.title}</h1>
          <p className="text-gray-500 text-lg mb-6">
            {truck.year} {truck.make} {truck.model}
          </p>

          <div className="bg-gray-50 p-6 rounded-lg mb-8 border border-gray-200">
            <p className="text-3xl font-bold text-gray-900 mb-1">
              {truck.price ? `$${truck.price.toLocaleString()}` : "Call for Price"}
            </p>
            <p className="text-sm text-green-600 font-semibold uppercase tracking-wide">
              Status: {truck.status}
            </p>
          </div>

          <div className="prose max-w-none text-gray-700">
            <h3 className="text-xl font-bold mb-2">Description</h3>
            {/* Renders the rich text description */}
            <PortableText value={truck.description} />
          </div>

          <div className="mt-8">
            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-lg text-lg transition-colors">
              Contact Sales About This Truck
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}