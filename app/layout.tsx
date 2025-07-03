import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })
export const metadata: Metadata = {
  title: {
    default: "Rolled Up Tees - Custom Screen Printing & Embroidery in Nyack, NY",
    template: "%s | Rolled Up Tees - Custom Screen Printing & Embroidery",
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
  authors: [{ name: "Rolled Up Tees", url: "https://rolleduptees.com" }],
  creator: "Rolled Up Tees",
  publisher: "Rolled Up Tees",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://rolleduptees.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Rolled Up Tees - Custom Screen Printing & Embroidery in Nyack, NY",
    description:
      "Professional screen printing and embroidery services in Nyack, NY and surrounding areas. Custom t-shirts, hoodies, uniforms, and promotional items.",
    url: "https://rolleduptees.com",
    siteName: "Rolled Up Tees",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Rolled Up Tees - Custom Screen Printing & Embroidery Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rolled Up Tees - Custom Screen Printing & Embroidery",
    description: "Professional screen printing and embroidery services in Nyack, NY and surrounding areas.",
    images: ["/images/twitter-image.jpg"],
    creator: "@rolleduptees",
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
  other: {
    "google-site-verification": "your-google-verification-code-here",
    "msvalidate.01": "your-bing-verification-code-here",
  },
}

// JSON-LD structured data for local business
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://rolleduptees.com",
  name: "Rolled Up Tees",
  image: "https://rolleduptees.com/images/logo.jpg",
  description: "Professional screen printing and embroidery services in Nyack, NY and surrounding areas.",
  url: "https://rolleduptees.com",
  telephone: "+1-845-358-2037",
  email: "info@rolleduptees.com",
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
      <body className={inter.className}>{children}</body>
    </html>
  )
}
