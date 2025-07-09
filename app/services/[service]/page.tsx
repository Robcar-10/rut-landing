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

  if (!serviceInfo) {
    return {
      title: "Service Not Found",
      description: "The requested service page could not be found.",
    }
  }

  return {
    title: serviceInfo.metaTitle,
    description: serviceInfo.metaDescription,
    keywords: serviceInfo.keywords,
    openGraph: {
      title: serviceInfo.metaTitle,
      description: serviceInfo.metaDescription,
      url: `https://nyackscreenprinting.com/services/${params.service}`,
      images: [
        {
          url: `/images/og-${params.service}.jpg`,
          width: 1200,
          height: 630,
          alt: `${serviceInfo.title} - Nyack Screen Printing`,
        },
      ],
    },
    twitter: {
      title: serviceInfo.metaTitle,
      description: serviceInfo.metaDescription,
    },
    alternates: {
      canonical: `/services/${params.service}`,
    },
  }
}
