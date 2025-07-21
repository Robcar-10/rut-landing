import LocationLanding from "../../components/location-landing"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

interface PageProps {
  params: {
    location: string
  }
}

// Valid location slugs - must match exactly
const validLocationSlugs = [
  // Rockland County
  "ramapo",
  "clarkstown",
  "orangetown",
  "haverstraw",
  "new-city",
  "spring-valley",
  "monsey",
  "nanuet",
  "pearl-river",
  "stony-point",
  "west-haverstraw",
  "valley-cottage",
  "congers",
  "blauvelt",
  "west-nyack",
  "piermont",
  "upper-nyack",
  // Westchester County
  "ossining",
  "sleepy-hollow",
  "tarrytown",
  "dobbs-ferry",
  "irvington",
  // Bergen County, NJ
  "montvale",
  "westwood",
  "hillsdale",
  "northvale",
]

export default function LocationPage({ params }: PageProps) {
  // Validate the location parameter
  if (!validLocationSlugs.includes(params.location)) {
    notFound()
  }

  return <LocationLanding location={params.location} />
}

// Generate static pages for each location
export async function generateStaticParams() {
  return validLocationSlugs.map((location) => ({
    location: location,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  // Validate location first
  if (!validLocationSlugs.includes(params.location)) {
    return {
      title: "Location Not Found",
      description: "The requested location page could not be found.",
    }
  }

  const location = params.location.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
  const baseUrl = "https://nyackscreenprinting.com"
  const canonicalUrl = `${baseUrl}/${params.location}`

  return {
    title: `${location} Screen Printing & Embroidery | Custom Apparel | Nyack Screen Printing`,
    description: `Professional screen printing and embroidery services in ${location}, NY/NJ. Custom t-shirts, hoodies, uniforms, and promotional items. Fast turnaround, premium quality. Serving ${location} businesses since 2020.`,
    keywords: [
      `screen printing ${location}`,
      `embroidery ${location}`,
      `custom t-shirts ${location}`,
      `promotional products ${location}`,
      `apparel printing ${location}`,
      `business uniforms ${location}`,
      `team jerseys ${location}`,
      `custom hoodies ${location}`,
      `local printing ${location}`,
      `custom decals ${location}`,
    ],
    // FIXED: Proper canonical URL structure
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${location} Screen Printing & Embroidery | Nyack Screen Printing`,
      description: `Professional screen printing and embroidery services in ${location}. Custom apparel, uniforms, and promotional items.`,
      url: canonicalUrl,
      siteName: "Nyack Screen Printing",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: `${baseUrl}/images/og-${params.location}.jpg`,
          width: 1200,
          height: 630,
          alt: `Screen Printing Services in ${location} - Nyack Screen Printing`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${location} Screen Printing & Embroidery | Nyack Screen Printing`,
      description: `Professional screen printing and embroidery services in ${location}. Custom apparel and promotional items.`,
      images: [`${baseUrl}/images/twitter-${params.location}.jpg`],
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
    // Additional metadata for better indexing
    other: {
      "geo.region": location.includes("NJ") ? "US-NJ" : "US-NY",
      "geo.placename": location,
      ICBM: "41.0909, -73.9176", // Nyack coordinates as business center
    },
  }
}
