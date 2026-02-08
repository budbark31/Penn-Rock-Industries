import { groq } from "next-sanity";

// We added "images": images[0..4].asset->url
export const INVENTORY_QUERY = groq`*[_type == "inventory" && status != "sold"] | order(_createdAt desc) {
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