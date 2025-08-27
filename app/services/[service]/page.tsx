import type { Metadata } from "next"
import { notFound } from "next/navigation"
import ServiceLanding from "@/components/service-landing"
import { SERVICES } from "@/lib/constants"
import { CanonicalUrl } from "@/components/CanonicalUrl"
import { getServiceBySlug } from "@/lib/service-utils"

interface ServicePageProps {
  params: {
    service: string
  }
}

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    service: service.slug,
  }))
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const service = SERVICES.find((svc) => svc.slug === params.service)

  if (!service) {
    return {
      title: "Service Not Found",
    }
  }

  const baseUrl = "https://nyackscreenprinting.com"
  const canonicalUrl = `${baseUrl}/services/${service.slug}`

  return {
    title: `${service.name} Services in Nyack, NY | Professional ${service.name}`,
    description: `Professional ${service.name.toLowerCase()} services in Nyack, NY and surrounding areas. ${service.description} Fast turnaround, premium quality, competitive pricing.`,
    keywords: [
      service.name.toLowerCase(),
      `${service.name.toLowerCase()} Nyack NY`,
      `custom ${service.name.toLowerCase()}`,
      `professional ${service.name.toLowerCase()}`,
      "Rockland County",
      "local business",
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${service.name} Services in Nyack, NY | Nyack Screen Printing`,
      description: `Professional ${service.name.toLowerCase()} services in Nyack, NY and surrounding areas. ${service.description}`,
      url: canonicalUrl,
      siteName: "Nyack Screen Printing",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: `${baseUrl}/images/${service.slug}-service.jpg`,
          width: 1200,
          height: 630,
          alt: `${service.name} Services in Nyack, NY`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.name} Services in Nyack, NY`,
      description: `Professional ${service.name.toLowerCase()} services in Nyack, NY and surrounding areas.`,
      images: [`${baseUrl}/images/${service.slug}-service.jpg`],
    },
  }
}

export default function ServicePage({ params }: ServicePageProps) {
  const serviceInfo = getServiceBySlug(params.service)

  if (!serviceInfo) {
    notFound()
  }

  return (
    <>
      <CanonicalUrl pathname={`/services/${params.service}`} />
      <ServiceLanding serviceInfo={serviceInfo} />
    </>
  )
}
