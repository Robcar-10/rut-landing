"use client"

import { useEffect } from "react"

interface CanonicalUrlProps {
  url: string
}

export function CanonicalUrl({ url }: CanonicalUrlProps) {
  useEffect(() => {
    // Remove any existing canonical link
    const existingCanonical = document.querySelector('link[rel="canonical"]')
    if (existingCanonical) {
      existingCanonical.remove()
    }

    // Add new canonical link
    const link = document.createElement("link")
    link.rel = "canonical"
    link.href = url
    document.head.appendChild(link)

    return () => {
      // Cleanup on unmount
      const canonicalLink = document.querySelector('link[rel="canonical"]')
      if (canonicalLink) {
        canonicalLink.remove()
      }
    }
  }, [url])

  return null
}
