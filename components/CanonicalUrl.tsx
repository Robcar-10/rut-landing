import { headers } from "next/headers"

interface CanonicalUrlProps {
  pathname?: string
}

/**
 * Server component that generates proper canonical URLs
 * Always points to nyackscreenprinting.com regardless of how the site is accessed
 */
export const CanonicalUrl = ({ pathname }: CanonicalUrlProps) => {
  const headersList = headers()

  // ALWAYS use the correct domain - never use the host header for canonical URLs
  const baseUrl = "https://nyackscreenprinting.com"

  // Use provided pathname or try to get from headers
  const currentPath = pathname || headersList.get("x-pathname") || "/"

  // Ensure clean path (no tracking parameters, no trailing slash except root)
  const cleanPath = currentPath.split("?")[0]
  const finalPath = cleanPath === "/" ? "/" : cleanPath.replace(/\/$/, "")

  const canonicalUrl = `${baseUrl}${finalPath}`

  console.log("Canonical URL generated:", canonicalUrl)

  return <link rel="canonical" href={canonicalUrl} />
}
