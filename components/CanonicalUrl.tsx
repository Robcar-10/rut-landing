"use client"

import { useEffect } from "react"

interface CanonicalUrlProps {
  pathname?: string
}

export function CanonicalUrl({ pathname }: CanonicalUrlProps) {
  useEffect(() => {
    if (typeof window === "undefined") return

    const currentPath = pathname || window.location.pathname
    const cleanPath = currentPath === "/" ? "/" : currentPath.replace(/\/$/, "")
    const canonicalUrl = `https://nyackscreenprinting.com${cleanPath}`

    // Update or create canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement

    if (!canonicalLink) {
      canonicalLink = document.createElement("link")
      canonicalLink.rel = "canonical"
      document.head.appendChild(canonicalLink)
    }

    if (canonicalLink.href !== canonicalUrl) {
      canonicalLink.href = canonicalUrl
    }
  }, [pathname])

  return null
}
