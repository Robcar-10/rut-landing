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
  // DO NOTHING - Let vercel.json handle all redirects
  return NextResponse.next()
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
