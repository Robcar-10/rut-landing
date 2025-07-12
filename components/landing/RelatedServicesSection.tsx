"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Star } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"
import { getRelatedServices } from "@/lib/service-utils"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface RelatedServicesSectionProps {
  currentServiceSlug: string
  className?: string
}

export default function RelatedServicesSection({ currentServiceSlug, className = "" }: RelatedServicesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])
  const relatedServices = getRelatedServices(currentServiceSlug)

  useEffect(() => {
    if (!sectionRef.current || relatedServices.length === 0) return

    const ctx = gsap.context(() => {
      // Animate section title
      gsap.fromTo(
        ".related-title",
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".related-title",
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Animate cards with stagger
      gsap.fromTo(
        cardsRef.current,
        {
          opacity: 0,
          y: 50,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".related-cards",
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Add hover animations
      cardsRef.current.forEach((card, index) => {
        if (!card) return

        const handleMouseEnter = () => {
          gsap.to(card, {
            y: -8,
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out",
          })
        }

        const handleMouseLeave = () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          })
        }

        card.addEventListener("mouseenter", handleMouseEnter)
        card.addEventListener("mouseleave", handleMouseLeave)

        // Cleanup
        return () => {
          card.removeEventListener("mouseenter", handleMouseEnter)
          card.removeEventListener("mouseleave", handleMouseLeave)
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [relatedServices.length])

  if (relatedServices.length === 0) {
    return null
  }

  return (
    <section ref={sectionRef} className={`py-16 bg-gray-50 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="related-title text-3xl md:text-4xl font-bold text-gray-900 mb-4">Related Services</h2>
          <p className="related-title text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our other professional printing and customization services
          </p>
        </div>

        <div className="related-cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {relatedServices.map((service, index) => (
            <Card
              key={service.slug}
              ref={(el) => {
                if (el) cardsRef.current[index] = el
              }}
              className="group h-full flex flex-col hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="secondary" className="mb-2">
                    {service.category === "first-responder"
                      ? "First Responder"
                      : service.category === "printing"
                        ? "Printing"
                        : service.category === "embroidery"
                          ? "Embroidery"
                          : service.category === "business"
                            ? "Business"
                            : service.category === "events"
                              ? "Events"
                              : "Specialty"}
                  </Badge>
                  <div className="flex items-center text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                </div>
                <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-gray-600 line-clamp-2">{service.heroSubtitle}</CardDescription>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col">
                <p className="text-gray-700 mb-4 flex-1 leading-relaxed">{service.description}</p>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Key Features:</h4>
                  <div className="flex flex-wrap gap-2">
                    {service.features.slice(0, 3).map((feature, featureIndex) => (
                      <Badge key={featureIndex} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                    {service.features.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{service.features.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="mt-auto">
                  <Link href={`/services/${service.slug}`}>
                    <Button className="w-full group-hover:bg-blue-600 transition-colors">
                      Learn More
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link href="/services">
            <Button variant="outline" size="lg" className="group bg-transparent">
              View All Services
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
