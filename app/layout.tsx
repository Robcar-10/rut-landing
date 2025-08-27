import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

// ALWAYS use the correct domain - NEVER use rolleduptees.com
const baseUrl = "https://nyackscreenprinting.com"

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Nyack Screen Printing - Custom Screen Printing & Embroidery in Nyack, NY",
    template: "%s | Nyack Screen Printing",
  },
  description:
    "Professional screen printing and embroidery services in Nyack, NY and surrounding areas. Custom t-shirts, hoodies, uniforms, and promotional items. Fast turnaround, premium quality, local business since 2020.",
  keywords: [
    "screen printing",
    "embroidery",
    "custom t-shirts",
    "Nyack NY",
    "promotional products",
    "custom apparel",
    "business uniforms",
    "team jerseys",
    "custom hoodies",
    "local printing",
    "Rockland County",
    "custom decals",
    "corporate apparel",
    "event shirts",
  ],
  authors: [{ name: "Nyack Screen Printing", url: baseUrl }],
  creator: "Nyack Screen Printing",
  publisher: "Nyack Screen Printing",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  // FIXED: Proper canonical URL for homepage
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    title: "Nyack Screen Printing - Custom Screen Printing & Embroidery in Nyack, NY",
    description:
      "Professional screen printing and embroidery services in Nyack, NY and surrounding areas. Custom t-shirts, hoodies, uniforms, and promotional items.",
    url: baseUrl,
    siteName: "Nyack Screen Printing",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${baseUrl}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Nyack Screen Printing - Custom Screen Printing & Embroidery Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nyack Screen Printing - Custom Screen Printing & Embroidery",
    description: "Professional screen printing and embroidery services in Nyack, NY and surrounding areas.",
    images: [`${baseUrl}/images/twitter-image.jpg`],
    creator: "@nyackscreenprinting",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
}

// JSON-LD structured data for local business
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": baseUrl,
  name: "Nyack Screen Printing",
  alternateName: "Rolled Up Tees",
  image: `${baseUrl}/images/logo.jpg`,
  description: "Professional screen printing and embroidery services in Nyack, NY and surrounding areas.",
  url: baseUrl,
  telephone: "+1-845-358-2037",
  email: "info@nyackscreenprinting.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "298 Route 59",
    addressLocality: "Nyack",
    addressRegion: "NY",
    postalCode: "10960",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 41.0909,
    longitude: -73.9176,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "10:00",
      closes: "15:00",
    },
  ],
  serviceArea: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: 41.0909,
      longitude: -73.9176,
    },
    geoRadius: "24140",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Screen Printing and Embroidery Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Custom Screen Printing",
          description: "High-quality screen printing for t-shirts, hoodies, and apparel",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Custom Embroidery",
          description: "Professional embroidery services for uniforms, hats, and corporate apparel",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Custom Decals",
          description: "Vehicle decals, window graphics, and promotional stickers",
        },
      },
    ],
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "127",
    bestRating: "5",
    worstRating: "1",
  },
  priceRange: "$$",
  paymentAccepted: "Cash, Credit Card, Check",
  currenciesAccepted: "USD",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* JSON-LD structured data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

        {/* Additional SEO meta tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#B221F6" />
        <meta name="color-scheme" content="light" />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
