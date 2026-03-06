import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { SERVICES, getServiceBySlug } from "@/lib/service-utils" 
import ServiceLanding from "@/components/service-landing"

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

  return {
    title: `${service.name} Services in Rockland County | Nyack Screen Printing`,
    description: `${service.description} Professional ${service.name.toLowerCase()} services with ${service.turnaround} turnaround.`,
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

  // `notFound()` throws internally but TS doesn't know that,
  // so `service` is still typed as `Service | undefined` here
  return <ServiceLanding serviceInfo={service!} /> // 👈 add the non-null assertion
}
