import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { LOCATIONS } from "@/lib/constants"
import LocationLanding from "@/components/location-landing"
import { CanonicalUrl } from "@/components/CanonicalUrl"
import { UrlCleaner } from "@/components/UrlCleaner"

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

  const title = `Screen Printing & Embroidery in ${location.name}, ${location.state} | Nyack Screen Printing`
  const description = `Professional screen printing, embroidery, and custom apparel services in ${location.name}, ${location.state}. Fast turnaround, competitive prices. Call (845) 358-2037 for a quote.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://nyackscreenprinting.com/${location.slug}`,
      siteName: "Nyack Screen Printing",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `https://nyackscreenprinting.com/${location.slug}`,
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
      <CanonicalUrl url={`https://nyackscreenprinting.com/${location.slug}`} />
      <UrlCleaner />
      <LocationLanding location={location} />
    </>
  )
}
