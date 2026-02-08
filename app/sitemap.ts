import { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

// Base URL of your website
const BASE_URL = "https://www.pennrockindustries.com"; // CHANGE THIS to your real domain later!

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Fetch all truck slugs
  const trucks = await client.fetch(groq`*[_type == "inventory"]{ "slug": slug.current, _updatedAt }`);

  // 2. Build the truck URLs
  const truckEntries: MetadataRoute.Sitemap = trucks.map((truck: any) => ({
    url: `${BASE_URL}/inventory/${truck.slug}`,
    lastModified: new Date(truck._updatedAt),
    changeFrequency: "daily",
    priority: 0.8,
  }));

  // 3. Add the static pages (Home, Sell)
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/sell`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...truckEntries,
  ];
}