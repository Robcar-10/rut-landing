import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SERVICES } from "@/lib/constants"
import ServiceLanding from "@/components/service-landing"
import { CanonicalUrl } from "@/components/CanonicalUrl"
import { UrlCleaner } from "@/components/UrlCleaner"

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

  const title = `${service.name} Services in Nyack, NY | Nyack Screen Printing`
  const description = `Professional ${service.name.toLowerCase()} services in Nyack, NY and surrounding areas. ${service.description} Call (845) 358-2037 for pricing.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://nyackscreenprinting.com/services/${service.slug}`,
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
      canonical: `https://nyackscreenprinting.com/services/${service.slug}`,
    },
  }
}

export default function ServicePage({ params }: ServicePageProps) {
  const service = SERVICES.find((svc) => svc.slug === params.service)

  if (!service) {
    notFound()
  }

  return (
    <>
      <CanonicalUrl url={`https://nyackscreenprinting.com/services/${service.slug}`} />
      <UrlCleaner />
      <ServiceLanding service={service} />
    </>
  )
}
