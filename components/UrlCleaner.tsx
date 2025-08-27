"use client"

import { useEffect } from "react"

export function UrlCleaner() {
  useEffect(() => {
    if (typeof window === "undefined") return

    const currentUrl = window.location.href
    const url = new URL(currentUrl)

    // Remove tracking parameters
    const trackingParams = [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
      "fbclid",
      "gclid",
      "msclkid",
      "ref",
      "source",
    ]

    let hasChanges = false
    trackingParams.forEach((param) => {
      if (url.searchParams.has(param)) {
        url.searchParams.delete(param)
        hasChanges = true
      }
    })

    if (hasChanges) {
      window.history.replaceState({}, "", url.toString())
    }
  }, [])

  return null
}
