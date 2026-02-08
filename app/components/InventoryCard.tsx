import Link from "next/link";
import Image from "next/image";

interface TruckProps {
  title: string;
  slug: string;
  mainImage: string;
  price: number;
  year: number;
  make: string;
  model: string;
  hoursOrMileage: string;
  status: string;
  category: string;
}

export default function InventoryCard({ truck }: { truck: TruckProps }) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-white flex flex-col">
      <Link href={`/inventory/${truck.slug}`} className="block h-full">
        {/* Image Section - NO FILL, using explicit size */}
        <div className="bg-gray-100">
           {truck.mainImage ? (
            <Image
              src={truck.mainImage}
              alt={truck.title}
              width={800} 
              height={500}
              className="w-full h-64 object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-400">
              No Image
            </div>
          )}
        </div>

        {/* Details Section */}
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2">
             <span className="text-xs font-semibold text-orange-600 uppercase tracking-wide">
                {truck.category}
             </span>
             <span className="bg-blue-900 text-white text-xs font-bold px-2 py-1 rounded uppercase">
                {truck.status}
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