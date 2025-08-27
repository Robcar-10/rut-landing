"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export function UrlCleaner() {
  const router = useRouter()

  useEffect(() => {
    const currentUrl = new URL(window.location.href)
    let needsRedirect = false
    let newUrl = currentUrl.pathname

    // Remove trailing slash (except for root)
    if (newUrl.length > 1 && newUrl.endsWith("/")) {
      newUrl = newUrl.slice(0, -1)
      needsRedirect = true
    }

    // Remove tracking parameters
    const trackingParams = ["fbclid", "gclid", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]
    const searchParams = new URLSearchParams(currentUrl.search)

    trackingParams.forEach((param) => {
      if (searchParams.has(param)) {
        searchParams.delete(param)
        needsRedirect = true
      }
    })

    // Build clean URL
    const cleanSearch = searchParams.toString()
    const cleanUrl = newUrl + (cleanSearch ? `?${cleanSearch}` : "") + currentUrl.hash

    if (needsRedirect && cleanUrl !== currentUrl.pathname + currentUrl.search + currentUrl.hash) {
      router.replace(cleanUrl)
    }
  }, [router])

  return null
}
