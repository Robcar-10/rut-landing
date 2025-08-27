import type { Metadata } from "next"
import { notFound } from "next/navigation"
import LocationLanding from "@/components/location-landing"
import { LOCATIONS } from "@/lib/constants"
import { CanonicalUrl } from "@/components/CanonicalUrl"

interface LocationPageProps {
  params: {
    location: string
  }
}

export async function generateStaticParams() {
  return LOCATIONS.map((location) => ({
    location: location.slug,
  }))
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const location = LOCATIONS.find((loc) => loc.slug === params.location)

  if (!location) {
    return {
      title: "Location Not Found",
    }
  }

  const baseUrl = "https://nyackscreenprinting.com"
  const canonicalUrl = `${baseUrl}/${location.slug}`

  return {
    title: `Screen Printing in ${location.name}, ${location.state} | Custom T-Shirts & Embroidery`,
    description: `Professional screen printing and embroidery services in ${location.name}, ${location.state}. Custom t-shirts, hoodies, uniforms, and promotional items. Fast turnaround, premium quality.`,
    keywords: [
      `screen printing ${location.name}`,
      `custom t-shirts ${location.name}`,
      `embroidery ${location.name}`,
      `promotional products ${location.name}`,
      `custom apparel ${location.name}`,
      `business uniforms ${location.name}`,
      location.name,
      location.state,
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `Screen Printing in ${location.name}, ${location.state} | Nyack Screen Printing`,
      description: `Professional screen printing and embroidery services in ${location.name}, ${location.state}. Custom t-shirts, hoodies, uniforms, and promotional items.`,
      url: canonicalUrl,
      siteName: "Nyack Screen Printing",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: `${baseUrl}/images/custom-screen-printing-${location.slug}.png`,
          width: 1200,
          height: 630,
          alt: `Screen Printing Services in ${location.name}, ${location.state}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Screen Printing in ${location.name}, ${location.state}`,
      description: `Professional screen printing and embroidery services in ${location.name}, ${location.state}.`,
      images: [`${baseUrl}/images/custom-screen-printing-${location.slug}.png`],
    },
  }
}

export default function LocationPage({ params }: LocationPageProps) {
  const location = LOCATIONS.find((loc) => loc.slug === params.location)

  if (!location) {
    notFound()
  }

  return (
    <>
      <CanonicalUrl pathname={`/${location.slug}`} />
      <LocationLanding location={location.slug} />
    </>
  )
}
