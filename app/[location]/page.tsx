import LocationLanding from "../../components/location-landing"
import type { Metadata } from "next"

interface PageProps {
  params: {
    location: string
  }
}

export default function LocationPage({ params }: PageProps) {
  return <LocationLanding location={params.location} />
}

// Generate static pages for each location
export async function generateStaticParams() {
  const locationSlugs = [
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

  return locationSlugs.map((location) => ({
    location: location,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const location = params.location.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
  const baseUrl = "https://nyackscreenprinting.com"

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
    openGraph: {
      title: `${location} Screen Printing & Embroidery | Nyack Screen Printing`,
      description: `Professional screen printing and embroidery services in ${location}. Custom apparel, uniforms, and promotional items.`,
      url: `${baseUrl}/${params.location}`,
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
    alternates: {
      canonical: `${baseUrl}/${params.location}`,
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
  }
}
