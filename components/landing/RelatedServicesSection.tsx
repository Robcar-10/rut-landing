"use client"

import { useStaggerAnimation } from "@/lib/gsap-utils"
import { getRelatedServices } from "@/lib/service-utils"
import type { ServiceInfo } from "@/lib/service-utils"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

interface RelatedServicesSectionProps {
  serviceInfo: ServiceInfo
  currentLocation: string
}

export const RelatedServicesSection = ({ serviceInfo, currentLocation }: RelatedServicesSectionProps) => {
  const containerRef = useStaggerAnimation(".related-card", 0.15)
  const relatedServices = getRelatedServices(serviceInfo.slug)

  if (relatedServices.length === 0) return null

  return (
    <section ref={containerRef} className="mt-16 sm:mt-20 py-12 sm:py-16 bg-gray-50 rounded-3xl">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 related-card">
            You Might Also Need
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto related-card">
            Complete your {currentLocation} project with our related services
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {relatedServices.map((service, index) => (
            <div
              key={service.slug}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 related-card overflow-hidden group min-h-[280px] flex flex-col"
            >
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed flex-1">{service.description}</p>

                {/* Features */}
                <div className="space-y-2 mb-4">
                  {service.features.slice(0, 2).map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-[#FF6452] to-[#B221F6] rounded-full"></div>
                      <span className="text-xs text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  asChild
                  variant="outline"
                  className="w-full border-purple-300 text-purple-600 hover:bg-purple-50 bg-transparent group-hover:border-purple-400 transition-colors mt-auto"
                >
                  <Link href={`/services/${service.slug}`} className="flex items-center justify-center gap-2">
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-600 text-sm">
            Need something else?{" "}
            <Link href="/#contact-form" className="text-purple-600 hover:underline">
              Contact us
            </Link>{" "}
            for custom solutions in {currentLocation}
          </p>
        </div>
      </div>
    </section>
  )
}
