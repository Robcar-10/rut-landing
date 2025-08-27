"use client"

// URL parameter utilities for handling tracking parameters
export const TRACKING_PARAMETERS = [
  "fbclid",
  "gclid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "ref",
  "_gl",
  "mc_cid",
  "mc_eid",
] as const

export type TrackingParameter = (typeof TRACKING_PARAMETERS)[number]

// ALWAYS use the correct domain
const CANONICAL_DOMAIN = "https://nyackscreenprinting.com"

/**
 * Remove tracking parameters from URL
 */
export const cleanUrl = (url: string, parametersToRemove: string[] = [...TRACKING_PARAMETERS]): string => {
  try {
    const urlObj = new URL(url)

    // Remove specified parameters
    parametersToRemove.forEach((param) => {
      urlObj.searchParams.delete(param)
    })

    return urlObj.toString()
  } catch (error) {
    console.error("Error cleaning URL:", error)
    return url
  }
}

/**
 * Get clean pathname without tracking parameters
 */
export const getCleanPathname = (url: string): string => {
  try {
    const urlObj = new URL(url)
    return urlObj.pathname
  } catch (error) {
    console.error("Error getting pathname:", error)
    return url
  }
}

/**
 * Check if URL has tracking parameters
 */
export const hasTrackingParameters = (url: string): boolean => {
  try {
    const urlObj = new URL(url)
    return TRACKING_PARAMETERS.some((param) => urlObj.searchParams.has(param))
  } catch (error) {
    return false
  }
}

/**
 * Get canonical URL for current page (client-side)
 * ALWAYS uses the correct domain regardless of how the site is accessed
 */
export const getCanonicalUrl = (): string => {
  if (typeof window === "undefined") return CANONICAL_DOMAIN

  const cleanPath = getCleanPathname(window.location.href)
  const finalPath = cleanPath === "/" ? "/" : cleanPath.replace(/\/$/, "")

  return `${CANONICAL_DOMAIN}${finalPath}`
}

/**
 * Clean tracking parameters from current URL (client-side only)
 * NO domain redirects - those are handled by vercel.json
 */
export const redirectToCleanUrl = (): boolean => {
  if (typeof window === "undefined") return false

  const currentUrl = window.location.href

  // Only check for tracking parameters
  if (hasTrackingParameters(currentUrl)) {
    const cleanedUrl = cleanUrl(currentUrl)

    // Only redirect if the URL actually changed
    if (cleanedUrl !== currentUrl) {
      console.log("Redirecting from tracking URL to clean URL:", { from: currentUrl, to: cleanedUrl })

      // Use replace to avoid adding to browser history
      window.history.replaceState({}, "", cleanedUrl)
      return true
    }
  }

  return false
}
