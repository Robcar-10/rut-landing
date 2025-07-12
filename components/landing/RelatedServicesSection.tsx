"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ArrowRight, Zap, Shield, Clock } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { getRelatedServices, type Service } from "@/lib/service-utils"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface RelatedServicesSectionProps {
  currentService: Service
  currentLocation: string
}

export function RelatedServicesSection({ currentService, currentLocation }: RelatedServicesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  // Get related services
  const relatedServices = getRelatedServices(currentService.slug, 3)

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
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Add hover animations
      cardsRef.current.forEach((card, index) => {
        if (!card) return

        const tl = gsap.timeline({ paused: true })
        tl.to(card, {
          y: -8,
          scale: 1.02,
          boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
          duration: 0.3,
          ease: "power2.out",
        })

        card.addEventListener("mouseenter", () => tl.play())
        card.addEventListener("mouseleave", () => tl.reverse())
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [relatedServices.length])

  if (relatedServices.length === 0) {
    return null
  }

  return (
    <section ref={sectionRef} className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="related-title text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Related Services in {currentLocation}
          </h2>
          <p className="related-title text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our other professional printing and apparel services available in your area
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {relatedServices.map((service, index) => (
            <Card
              key={service.slug}
              ref={(el) => {
                if (el) cardsRef.current[index] = el
              }}
              className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <CardHeader className="relative z-10 pb-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-blue-600" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {service.category}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-sm text-gray-600 ml-1">5.0</span>
                  </div>
                </div>

                <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                  {service.name}
                </CardTitle>

                <CardDescription className="text-gray-600 leading-relaxed">{service.description}</CardDescription>
              </CardHeader>

              <CardContent className="relative z-10 pt-0">
                <div className="space-y-4">
                  {/* Features */}
                  <div className="flex flex-wrap gap-2">
                    {service.features?.slice(0, 3).map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-1 text-sm text-gray-600">
                        <Shield className="w-3 h-3 text-green-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Pricing hint */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span>Quick turnaround</span>
                    </div>
                    <div className="text-sm font-semibold text-green-600">
                      Starting at ${service.startingPrice || "25"}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Button asChild className="w-full group/btn">
                    <Link href={`/services/${service.slug}`}>
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-200" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Services CTA */}
        <div className="text-center">
          <Button asChild variant="outline" size="lg" className="group bg-transparent">
            <Link href="/services">
              <span>View All Services</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
