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

  // REMOVED ALL REDIRECTS - These are handled by vercel.json
  // Only add security headers and continue
  const response = NextResponse.next()

  // Add minimal security headers (main headers are in vercel.json)
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
