import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { locationSlugs } from "@/lib/location-utils"
import { getLocationContent } from "@/lib/location-content"
import { LocationSchema } from "@/components/LocalBusinessSchema"
import LocationLanding from "@/components/location-landing"

interface LocationPageProps {
  params: { location: string }
}

export async function generateStaticParams() {
  return locationSlugs.map((slug) => ({ location: slug }))
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const content = getLocationContent(params.location)

  if (!content) {
    return { title: "Location Not Found" }
  }

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: {
      canonical: `https://nyackscreenprinting.com/${content.slug}`,
    },
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      url: `https://nyackscreenprinting.com/${content.slug}`,
      siteName: "Nyack Screen Printing",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: content.metaTitle,
      description: content.metaDescription,
    },
  }
}

export default function LocationPage({ params }: LocationPageProps) {
  const content = getLocationContent(params.location)

  if (!content) notFound()

  return (
    <>
      <LocationSchema slug={params.location} />
      <LocationLanding location={params.location} content={content} />
    </>
  )
}