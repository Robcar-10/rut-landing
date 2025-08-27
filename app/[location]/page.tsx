import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { LOCATIONS } from "@/lib/constants"
import LocationLanding from "@/components/location-landing"

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

  return {
    title: `Screen Printing in ${location.name}, ${location.county} | Nyack Screen Printing`,
    description: `Professional screen printing and custom apparel services in ${location.name}, ${location.county}. Fast turnaround, competitive prices, and quality results.`,
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

  return <LocationLanding location={location} />
}
