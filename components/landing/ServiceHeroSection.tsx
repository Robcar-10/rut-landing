"use client"

import { Button } from "@/components/ui/button"
import { Star, Users, Award, CheckCircle } from "lucide-react"
import { useHeroAnimation } from "@/lib/gsap-utils"
import type { ServiceInfo } from "@/lib/service-utils"

interface ServiceHeroSectionProps {
  serviceInfo: ServiceInfo
  currentLocation: string
}

export const ServiceHeroSection = ({ serviceInfo, currentLocation }: ServiceHeroSectionProps) => {
  const heroRef = useHeroAnimation()

  const getCategoryColor = (category: ServiceInfo["category"]) => {
    switch (category) {
      case "first-responder":
        return "from-red-500 to-blue-600"
      case "business":
        return "from-blue-500 to-purple-600"
      case "events":
        return "from-pink-500 to-purple-600"
      case "specialty":
        return "from-orange-500 to-red-600"
      default:
        return "from-[#FF6452] to-[#B221F6]"
    }
  }

  return (
    <div ref={heroRef} className="space-y-6 sm:space-y-8 text-center lg:text-left">
      <div className="space-y-4">
        <div
          className={`inline-block px-3 py-1 rounded-full text-white text-sm font-medium bg-gradient-to-r ${getCategoryColor(serviceInfo.category)}`}
        >
          {serviceInfo.category.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())} Service
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
          {serviceInfo.heroTitle}
        </h1>

        <h2 className="text-xl sm:text-2xl font-semibold text-gray-700">
          {serviceInfo.heroSubtitle} in {currentLocation}
        </h2>
      </div>

      {/* Trust Indicators */}
      <div
        className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 py-4"
        aria-label="Trust Indicators"
      >
        <div className="flex items-center gap-2 trust-indicator">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
            ))}
          </div>
          <span className="text-gray-600 font-medium text-sm sm:text-base">4.9/5 Rating</span>
        </div>
        <div className="flex items-center gap-2 trust-indicator">
          <Users className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
          <span className="text-gray-600 font-medium text-sm sm:text-base">500+ Customers</span>
        </div>
        <div className="flex items-center gap-2 trust-indicator">
          <Award className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
          <span className="text-gray-600 font-medium text-sm sm:text-base">Local Experts</span>
        </div>
      </div>

      <div className="space-y-4 hero-description">
        <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
          {serviceInfo.description.replace("the region", currentLocation)}
        </p>

        {/* Service Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {serviceInfo.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-gray-700 text-sm sm:text-base">{feature}</span>
            </div>
          ))}
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
          <p className="text-gray-800 font-medium text-sm sm:text-base">
            🎯 <strong>Serving {currentLocation}:</strong> Fast turnaround, local pickup available, and personalized
            service for your {serviceInfo.title.toLowerCase()} needs.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
        <Button
          className="bg-purple-500 hover:bg-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold shadow-lg hero-button"
          onClick={() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })}
        >
          Get Free Quote
        </Button>
        <Button
          asChild
          variant="outline"
          className="border-purple-300 text-purple-600 hover:bg-purple-50 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg bg-transparent font-semibold hero-button"
        >
          <a href="https://www.instagram.com/rolleduptees" target="_blank" rel="noopener noreferrer">
            View Our Work
          </a>
        </Button>
      </div>
    </div>
  )
}
