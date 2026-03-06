"use client"

import { useEffect, Suspense } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"

const TRACKING_PARAMS = [
  "fbclid", "gclid", "utm_source", "utm_medium", "utm_campaign",
  "utm_term", "utm_content", "msclkid", "ttclid", "twclid",
]

function UrlCleanerContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    let hasChanges = false

    TRACKING_PARAMS.forEach((param) => {
      if (params.has(param)) {
        params.delete(param)
        hasChanges = true
      }
    })

    if (hasChanges) {
      const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname
      router.replace(newUrl, { scroll: false })
    }
  }, [searchParams.toString(), router, pathname])

  return null
}

export function UrlCleaner() {
  return (
    <Suspense fallback={null}>
      <UrlCleanerContent />
    </Suspense>
  )
}