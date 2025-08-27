"use client"

import { useEffect, Suspense } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"

function UrlCleanerContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    let hasChanges = false

    // Remove tracking parameters
    const trackingParams = ["fbclid", "gclid", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]

    trackingParams.forEach((param) => {
      if (params.has(param)) {
        params.delete(param)
        hasChanges = true
      }
    })

    // Only redirect if there were changes
    if (hasChanges) {
      const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname
      router.replace(newUrl)
    }
  }, [searchParams, router, pathname])

  return null
}

export function UrlCleaner() {
  return (
    <Suspense fallback={null}>
      <UrlCleanerContent />
    </Suspense>
  )
}
