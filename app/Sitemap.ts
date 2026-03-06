import type { MetadataRoute } from "next"
import { locationSlugs } from "@/lib/location-utils"

const BASE_URL = "https://nyackscreenprinting.com"
const LAST_UPDATED = "2025-03-01"

export default function sitemap(): MetadataRoute.Sitemap {
  const homepage: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: LAST_UPDATED,
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ]

  const locationPages: MetadataRoute.Sitemap = locationSlugs.map((slug) => ({
    url: `${BASE_URL}/${slug}`,
    lastModified: LAST_UPDATED,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [...homepage, ...locationPages]
}