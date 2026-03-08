import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { locationSlugs } from "@/lib/location-utils"
import { getLocationContent } from "@/lib/location-content"
import { LocationSchema } from "@/components/LocalBusinessSchema"
import LocationLanding from "@/components/location-landing"

interface LocationPageProps {
  params: Promise<{ location: string }>  // 👈 wrap in Promise
}

export async function generateStaticParams() {
  return locationSlugs.map((slug) => ({ location: slug }))
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const { location } = await params
  const content = getLocationContent(location)

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

export default async function LocationPage({ params }: LocationPageProps) {
  const { location } = await params
  const content = getLocationContent(location)

  if (!content) notFound()

  return (
    <>
      <LocationSchema slug={location} />
      <LocationLanding location={location} content={content} />
    </>
  )
}