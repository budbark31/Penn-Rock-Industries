"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "all";

  // These must match the "value" you set in Sanity Schema exactly
  const categories = [
    { label: "All Inventory", value: "all" },
    { label: "Dump Trucks", value: "dump-trucks" },
    { label: "Day Cabs", value: "day-cabs" },
    { label: "Heavy Equipment", value: "heavy-equipment" },
    { label: "Trailers", value: "trailers" },
    { label: "Parts", value: "parts" },
  ];

  const handleFilter = (categoryValue: string) => {
    if (categoryValue === "all") {
      router.push("/"); // Clear the filter
    } else {
      router.push(`/?category=${categoryValue}`); // Set the filter
    }
  };

  return (
    <div className="flex flex-wrap gap-2 mb-8 justify-center md:justify-start">
      {categories.map((cat) => (
        <button
          key={cat.value}
          onClick={() => handleFilter(cat.value)}
          className={`px-4 py-2 rounded-full text-sm font-bold transition-all border-2 ${
            currentCategory === cat.value
              ? "bg-blue-900 text-white border-blue-900 shadow-md"
              : "bg-white text-gray-600 border-gray-200 hover:border-blue-900 hover:text-blue-900"
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}