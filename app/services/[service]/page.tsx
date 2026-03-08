import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { SERVICES, getServiceBySlug } from "@/lib/service-utils"
import ServiceLanding from "@/components/service-landing"

interface ServicePageProps {
  params: Promise<{ service: string }>
}

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    service: service.slug,
  }))
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { service: serviceSlug } = await params
  const service = getServiceBySlug(serviceSlug)

  if (!service) {
    return {
      title: "Service Not Found",
    }
  }

  return {
    title: `${service.title} in Rockland County | Nyack Screen Printing`,
    description: `${service.description} Professional ${service.title.toLowerCase()} with ${service.turnaround} turnaround.`,
    alternates: {
      canonical: `https://nyackscreenprinting.com/services/${service.slug}`,
    },
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { service: serviceSlug } = await params
  const service = getServiceBySlug(serviceSlug)

  if (!service) {
    notFound()
  }

  return <ServiceLanding serviceInfo={service!} />
}