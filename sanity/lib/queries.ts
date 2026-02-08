import { groq } from "next-sanity";

// UPDATED: Order by STATUS first (Available comes before Sold), then by Date
export const INVENTORY_QUERY = groq`*[
  _type == "inventory" 
  && ($category == "all" || category == $category) 
] | order(status asc, _createdAt desc) {
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