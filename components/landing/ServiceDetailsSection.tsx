"use client"

import { useStaggerAnimation } from "@/lib/gsap-utils"
import type { ServiceInfo } from "@/lib/service-utils"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, Award, Users } from "lucide-react"

interface ServiceDetailsSectionProps {
  serviceInfo: ServiceInfo
  currentLocation: string
}

export const ServiceDetailsSection = ({ serviceInfo, currentLocation }: ServiceDetailsSectionProps) => {
  const containerRef = useStaggerAnimation(".detail-card", 0.15)

  const getCategoryIcon = (category: ServiceInfo["category"]) => {
    switch (category) {
      case "first-responder":
        return "🚨"
      case "business":
        return "💼"
      case "events":
        return "🎉"
      case "specialty":
        return "⚡"
      case "embroidery":
        return "🧵"
      default:
        return "👕"
    }
  }

  const getCategoryDescription = (category: ServiceInfo["category"]) => {
    switch (category) {
      case "first-responder":
        return "Honoring those who serve and protect our communities with professional, durable apparel."
      case "business":
        return "Professional solutions that elevate your brand and create lasting impressions."
      case "events":
        return "Making your special occasions memorable with custom apparel that brings people together."
      case "specialty":
        return "Specialized services for unique needs and urgent requirements."
      case "embroidery":
        return "Premium embroidery services that add elegance and professionalism to any garment."
      default:
        return "High-quality screen printing that makes your designs come to life."
    }
  }

  return (
    <section ref={containerRef} className="mt-16 sm:mt-20 py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 detail-card">
            {getCategoryIcon(serviceInfo.category)} Why Choose Our {serviceInfo.title} in {currentLocation}?
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto detail-card">
            {getCategoryDescription(serviceInfo.category)}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 detail-card">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">What Makes Us Different</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-900">Fast Turnaround</h4>
                    <p className="text-gray-600 text-sm">Quick delivery without compromising quality</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-900">Premium Quality</h4>
                    <p className="text-gray-600 text-sm">Professional results that exceed expectations</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-900">Local Service</h4>
                    <p className="text-gray-600 text-sm">
                      Personalized attention from your {currentLocation} neighbors
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Perfect For:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {serviceInfo.keywords.slice(0, 6).map((keyword, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm capitalize">{keyword.replace("-", " ")}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-6 detail-card">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Process</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-600 font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Consultation</h4>
                    <p className="text-gray-600 text-sm">We discuss your needs and provide expert recommendations</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-600 font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Design & Quote</h4>
                    <p className="text-gray-600 text-sm">Custom design creation and transparent pricing</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-600 font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Production</h4>
                    <p className="text-gray-600 text-sm">Professional printing with quality control</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-600 font-bold text-sm">4</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Delivery</h4>
                    <p className="text-gray-600 text-sm">Fast delivery or convenient pickup in {currentLocation}</p>
                  </div>
                </div>
              </div>
            </div>

            {serviceInfo.category === "first-responder" && (
              <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                <div className="text-red-600 font-bold mb-1">FIRST RESPONDER SPECIAL</div>
                <div className="text-gray-700 text-sm">10% OFF your first order + FREE design consultation</div>
                <div className="text-xs text-gray-500 mt-1">
                  *Available for Police, Fire, EMS, and other emergency services
                </div>
              </div>
            )}
            <Button
              className="w-full bg-gradient-to-r from-[#FF6452] to-[#B221F6] hover:from-[#E55A49] hover:to-[#A01EE6] text-white font-semibold py-3 px-6 rounded-lg text-lg"
              onClick={() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })}
            >
              Start Your {serviceInfo.title} Project
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
