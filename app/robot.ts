import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/studio/", // Don't let Google try to index your admin login
    },
    sitemap: "https://www.pennrockindustries.com/sitemap.xml", // Match the URL from step 1
  };
}