export function cleanUrl(url: string): string {
  try {
    const urlObj = new URL(url)

    // Remove tracking parameters
    const trackingParams = [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
      "fbclid",
      "gclid",
      "msclkid",
      "ref",
      "source",
    ]

    trackingParams.forEach((param) => {
      urlObj.searchParams.delete(param)
    })

    // Remove trailing slash except for root
    if (urlObj.pathname !== "/" && urlObj.pathname.endsWith("/")) {
      urlObj.pathname = urlObj.pathname.slice(0, -1)
    }

    return urlObj.toString()
  } catch {
    return url
  }
}

export function getCanonicalUrl(pathname: string): string {
  const baseUrl = "https://nyackscreenprinting.com"

  // Ensure pathname starts with /
  const cleanPathname = pathname.startsWith("/") ? pathname : `/${pathname}`

  // Remove trailing slash except for root
  const finalPathname = cleanPathname === "/" ? "/" : cleanPathname.replace(/\/$/, "")

  return `${baseUrl}${finalPathname}`
}
