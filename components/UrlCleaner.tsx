"use client"

import { useEffect } from "react"
import { redirectToCleanUrl } from "@/lib/url-utils"

/**
 * Client-side component that cleans tracking parameters from URLs
 * NO domain redirects - those are handled by vercel.json
 */
export const UrlCleaner = () => {
  useEffect(() => {
    // Only clean tracking parameters on client-side
    redirectToCleanUrl()
  }, [])

  return null
}
