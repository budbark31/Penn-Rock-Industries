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

// Parts e-commerce query
export const PARTS_QUERY = groq`*[_type == "part"] | order(status asc, _createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  category,
  condition,
  status,
  price,
  inventoryCount,
  "imageUrl": images[0].asset->url
}`;

// Single part by slug
export const PART_BY_SLUG_QUERY = groq`*[_type == "part" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  category,
  condition,
  status,
  price,
  inventoryCount,
  description,
  "images": images[].asset->url
}`;

// Unified query - fetches ALL inventory (trucks + parts)
export const ALL_INVENTORY_QUERY = groq`{
  "trucks": *[_type == "inventory"] | order(status asc, _createdAt desc) {
    _id,
    _type,
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
  },
  "parts": *[_type == "part"] | order(status asc, _createdAt desc) {
    _id,
    _type,
    title,
    "slug": slug.current,
    category,
    condition,
    status,
    price,
    inventoryCount,
    "imageUrl": images[0].asset->url
  }
}`;