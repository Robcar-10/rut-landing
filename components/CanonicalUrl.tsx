"use client"

import { useEffect } from "react"

interface CanonicalUrlProps {
  pathname: string
}

export function CanonicalUrl({ pathname }: CanonicalUrlProps) {
  useEffect(() => {
    // Remove any existing canonical link
    const existingCanonical = document.querySelector('link[rel="canonical"]')
    if (existingCanonical) {
      existingCanonical.remove()
    }

    // Create new canonical link
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
