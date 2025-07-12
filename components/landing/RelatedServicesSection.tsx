"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"
import { services, type Service } from "@/lib/service-utils"

gsap.registerPlugin(ScrollTrigger)

interface RelatedServicesSectionProps {
  currentService: Service
  currentLocation: string
}

export function RelatedServicesSection({ currentService, currentLocation }: RelatedServicesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  // Get related services (exclude current service)
  const relatedServices = services.filter((service) => service.slug !== currentService.slug).slice(0, 3) // Show only 3 related services

  useEffect(() => {
    if (!sectionRef.current) return

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
            start: "top 80%",
            end: "bottom 20%",
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
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Add hover animations for cards
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

        // Cleanup function
        return () => {
          card.removeEventListener("mouseenter", handleMouseEnter)
          card.removeEventListener("mouseleave", handleMouseLeave)
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  if (relatedServices.length === 0) {
    return null
  }

  return (
    <section ref={sectionRef} className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="related-title text-3xl font-bold text-gray-900 mb-4">Other Services You Might Need</h2>
          <p className="related-title text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our complete range of custom printing and embroidery services in {currentLocation}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedServices.map((service, index) => (
            <Card
              key={service.slug}
              ref={(el) => {
                if (el) cardsRef.current[index] = el
              }}
              className="group cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300 min-h-[320px] flex flex-col"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                    <service.icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                    {service.title}
                  </CardTitle>
                </div>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col">
                <CardDescription className="text-gray-600 text-base leading-relaxed mb-6 flex-1">
                  {service.description}
                </CardDescription>

                <div className="space-y-4 mt-auto">
                  {/* Key features */}
                  <div className="flex flex-wrap gap-2">
                    {service.features?.slice(0, 3).map((feature, featureIndex) => (
                      <span
                        key={featureIndex}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Link href={`/services/${service.slug}`} className="block">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white group-hover:bg-purple-700 transition-all duration-300">
                      Learn More
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Services CTA */}
        <div className="text-center mt-12">
          <Link href="/services">
            <Button
              variant="outline"
              size="lg"
              className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition-all duration-300 bg-transparent"
            >
              View All Services
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
