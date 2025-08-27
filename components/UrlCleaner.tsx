"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export function UrlCleaner() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    let hasChanges = false

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

    trackingParams.forEach((param) => {
      if (params.has(param)) {
        params.delete(param)
        hasChanges = true
      }
    })

    // If we removed parameters, update the URL
    if (hasChanges) {
      const newUrl = params.toString() ? `${window.location.pathname}?${params.toString()}` : window.location.pathname

      router.replace(newUrl)
    }
  }, [searchParams, router])

  return null
}
