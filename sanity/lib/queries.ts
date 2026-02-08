import { groq } from "next-sanity";

export const INVENTORY_QUERY = groq`*[_type == "inventory" && status != "sold"] | order(_createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  "mainImage": images[0].asset->url,
  price,
  year,
  make,
  model,
  hoursOrMileage,
  status,
  category
}`;