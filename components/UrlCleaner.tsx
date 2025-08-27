"use client"

import { useEffect } from "react"
import { cleanUrl } from "@/lib/url-utils"

export function UrlCleaner() {
  useEffect(() => {
    if (typeof window === "undefined") return

    const currentUrl = window.location.href
    const cleanedUrl = cleanUrl(currentUrl)

    if (currentUrl !== cleanedUrl) {
      window.history.replaceState({}, "", cleanedUrl)
    }
  }, [])

  return null
}
