import ServiceLanding from "../../../components/service-landing"
import type { Metadata } from "next"
import { getServiceBySlug, getAllServiceSlugs } from "@/lib/service-utils"
import { notFound } from "next/navigation"

interface PageProps {
  params: {
    service: string
  }
}

export default function ServicePage({ params }: PageProps) {
  const serviceInfo = getServiceBySlug(params.service)

  if (!serviceInfo) {
    notFound()
  }

  return <ServiceLanding serviceInfo={serviceInfo} />
}

// Generate static pages for each service
export async function generateStaticParams() {
  const serviceSlugs = getAllServiceSlugs()

  return serviceSlugs.map((service) => ({
    service: service,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const serviceInfo = getServiceBySlug(params.service)
  const baseUrl = "https://nyackscreenprinting.com"

  if (!serviceInfo) {
    return {
      title: "Service Not Found",
      description: "The requested service page could not be found.",
    }
  }

  const canonicalUrl = `${baseUrl}/services/${params.service}`

  return {
    title: serviceInfo.metaTitle,
    description: serviceInfo.metaDescription,
    keywords: serviceInfo.keywords,
    // FIXED: Proper canonical URL structure
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: serviceInfo.metaTitle,
      description: serviceInfo.metaDescription,
      url: canonicalUrl,
      siteName: "Nyack Screen Printing",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: `${baseUrl}/images/og-${params.service}.jpg`,
          width: 1200,
          height: 630,
          alt: `${serviceInfo.title} - Nyack Screen Printing`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: serviceInfo.metaTitle,
      description: serviceInfo.metaDescription,
      images: [`${baseUrl}/images/twitter-${params.service}.jpg`],
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
