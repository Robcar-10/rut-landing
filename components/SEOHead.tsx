"use client"

import Head from "next/head"
import { useRouter } from "next/router"

interface SEOHeadProps {
  title?: string
  description?: string
  canonical?: string
  noindex?: boolean
}

export const SEOHead = ({ title, description, canonical, noindex = false }: SEOHeadProps) => {
  const router = useRouter()

  // Generate canonical URL - always use the final clean URL
  const baseUrl = "https://nyackscreenprinting.com"
  const cleanPath = router.asPath.split("?")[0].split("#")[0]
  const finalPath = cleanPath === "/" ? "/" : cleanPath.replace(/\/$/, "")
  const canonicalUrl = canonical || `${baseUrl}${finalPath}`

  return (
    <Head>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}

      {/* Canonical URL - Always points to final clean URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Robots meta */}
      <meta name="robots" content={noindex ? "noindex,nofollow" : "index,follow"} />

      {/* Open Graph */}
      <meta property="og:url" content={canonicalUrl} />
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}

      {/* Twitter Card */}
      <meta name="twitter:url" content={canonicalUrl} />
      {title && <meta name="twitter:title" content={title} />}
      {description && <meta name="twitter:description" content={description} />}
    </Head>
  )
}
