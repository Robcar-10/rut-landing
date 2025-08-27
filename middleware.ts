import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Tracking parameters to remove
const TRACKING_PARAMETERS = [
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
]

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()

  // REMOVED DOMAIN REDIRECTS - These are handled by next.config.js
  // Only handle tracking parameters and trailing slashes here

  // 1. FIRST PRIORITY: Remove tracking parameters
  const hasTrackingParams = TRACKING_PARAMETERS.some((param) => url.searchParams.has(param))

  if (hasTrackingParams) {
    // Remove tracking parameters
    TRACKING_PARAMETERS.forEach((param) => {
      url.searchParams.delete(param)
    })

    console.log("Middleware: Tracking parameter redirect", {
      from: request.nextUrl.href,
      to: url.href,
    })

    // 301 redirect to clean URL
    return NextResponse.redirect(url, 301)
  }

  // 2. SECOND PRIORITY: Remove trailing slashes (except root)
  if (url.pathname !== "/" && url.pathname.endsWith("/")) {
    url.pathname = url.pathname.slice(0, -1)

    console.log("Middleware: Trailing slash redirect", {
      from: request.nextUrl.href,
      to: url.href,
    })

    return NextResponse.redirect(url, 301)
  }

  // Just add security headers and continue
  const response = NextResponse.next()

  // Add security headers
  response.headers.set("X-DNS-Prefetch-Control", "on")
  response.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload")
  response.headers.set("X-Frame-Options", "DENY")
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(self)")
  response.headers.set("X-Robots-Tag", "index, follow")

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
