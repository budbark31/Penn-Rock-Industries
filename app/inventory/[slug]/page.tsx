import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import Link from "next/link";
import { PortableText } from "next-sanity"; 
import ImageGallery from "@/app/components/ImageGallery"; 
import ContactButtons from "@/app/components/ContactButtons"; // Import the new buttons

const TRUCK_QUERY = groq`*[_type == "inventory" && slug.current == $slug][0]{
  title,
  "images": images[].asset->url, 
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

export const revalidate = 60;

export default async function TruckPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const truck = await client.fetch(TRUCK_QUERY, { slug });

  if (!truck) {
    return (
      <div className="text-center py-20 bg-white">
        <h1 className="text-2xl font-bold text-gray-900">Truck Not Found</h1>
        <Link href="/" className="text-blue-900 underline mt-4 block">Back to Inventory</Link>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-12 bg-white min-h-screen">
      <Link href="/" className="text-blue-900 font-bold hover:underline mb-6 inline-block">
        &larr; Back to Inventory
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* LEFT COLUMN: Gallery */}
        <div>
          {truck.images && truck.images.length > 0 ? (
            <ImageGallery images={truck.images} title={truck.title} />
          ) : (
            <div className="bg-gray-100 h-64 flex items-center justify-center rounded-lg text-gray-400">
              No Images Available
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Details */}
        <div className="flex flex-col h-full">
          {truck.category && (
            <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-bold uppercase tracking-wide mb-4 w-fit">
              {truck.category}
            </span>
          )}

          <h1 className="text-4xl font-extrabold text-gray-900 mb-2 leading-tight">{truck.title}</h1>
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

          <div className="prose max-w-none text-gray-800 mb-8">
            <h3 className="text-xl font-bold mb-2 text-gray-900">Description</h3>
            {truck.description && <PortableText value={truck.description} />}
          </div>

          <div className="mt-auto">
            {/* Replaced static button with our new Smart Buttons */}
            <ContactButtons truckTitle={truck.title} />
          </div>
        </div>
      </div>
    </main>
  );
}