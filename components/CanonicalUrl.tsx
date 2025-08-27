"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function CanonicalUrl() {
  const pathname = usePathname()

  useEffect(() => {
    // Remove any existing canonical link
    const existingCanonical = document.querySelector('link[rel="canonical"]')
    if (existingCanonical) {
      existingCanonical.remove()
    }

    // Add new canonical link
    const canonical = document.createElement("link")
    canonical.rel = "canonical"
    canonical.href = `https://nyackscreenprinting.com${pathname}`
    document.head.appendChild(canonical)

    return () => {
      // Cleanup on unmount
      const canonicalToRemove = document.querySelector('link[rel="canonical"]')
      if (canonicalToRemove) {
        canonicalToRemove.remove()
      }
    }
  }, [pathname])

  return null
}
