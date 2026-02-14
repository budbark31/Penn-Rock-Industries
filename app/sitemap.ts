import { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Define your base URL (We will change this to pennrockindustries.com when it goes live)
  const baseUrl = 'https://pennrockindustries.netlify.app'

  // 2. Fetch all trucks from Sanity
  // We only need the slug and the exact time it was last updated
  const query = groq`*[_type == "inventory" && defined(slug.current)] {
    "slug": slug.current,
    _updatedAt
  }`
  
  const trucks = await client.fetch(query)

  // 3. Generate the dynamic URLs for every single truck in the database
  const truckUrls: MetadataRoute.Sitemap = trucks.map((truck: any) => ({
    url: `${baseUrl}/inventory/${truck.slug}`,
    lastModified: new Date(truck._updatedAt),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  // 4. Define your static, main pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`, // Homepage
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/sell`, // Sell Page
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`, // About Page
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    }
  ]

  // 5. Combine the static pages and dynamic truck pages, then hand them to Google
  return [...staticRoutes, ...truckUrls]
}