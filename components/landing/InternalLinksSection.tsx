"use client"

import Link from "next/link"
import { ArrowRight, Star } from "lucide-react"

interface InternalLinksSectionProps {
  currentLocation: string
}

const highValueServices = [
  {
    title: "Screen Printing Near Me",
    slug: "screen-printing-near-me",
    description: "Local screen printing services with fast turnaround",
    isHighPriority: true,
  },
  {
    title: "Custom T-Shirts Near Me",
    slug: "custom-t-shirts-near-me",
    description: "Custom t-shirt design and printing in your area",
    isHighPriority: true,
  },
  {
    title: "T-Shirt Design Service",
    slug: "t-shirt-design-service",
    description: "Professional t-shirt design from concept to print",
    isHighPriority: true,
  },
  {
    title: "First Responder Apparel",
    slug: "first-responder-apparel", // This was likely duplicated
    description: "Premium apparel for police, fire, and EMS departments",
    isHighPriority: false,
  },
  {
    title: "Custom Embroidery",
    slug: "custom-embroidery",
    description: "Premium embroidery for uniforms and corporate apparel",
    isHighPriority: false,
  },
  {
    title: "Rush Orders",
    slug: "rush-orders",
    description: "Same-day and 24-hour emergency printing services",
    isHighPriority: false,
  },
]

export const InternalLinksSection = ({ currentLocation }: InternalLinksSectionProps) => {
  return (
    <section className="mt-12 sm:mt-16 py-8 sm:py-12 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Popular Services in {currentLocation}</h2>
          <p className="text-gray-600 text-sm sm:text-base">Explore our most requested custom apparel services</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {highValueServices.map((service, index) => (
            <Link
              key={`${service.slug}-${index}`} // Added index to ensure uniqueness
              href={`/services/${service.slug}`}
              className="group bg-white p-4 sm:p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-purple-200"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors text-sm sm:text-base leading-tight">
                  {service.title}
                </h3>
                {service.isHighPriority && <Star className="w-4 h-4 text-yellow-400 fill-current flex-shrink-0 ml-2" />}
              </div>

              <p className="text-gray-600 text-xs sm:text-sm mb-3 leading-relaxed">{service.description}</p>

              <div className="flex items-center text-purple-600 text-xs sm:text-sm font-medium">
                <span>Learn More</span>
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-6 sm:mt-8">
          <p className="text-gray-600 text-xs sm:text-sm">
            Need something else?{" "}
            <button
              onClick={() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })}
              className="text-purple-600 hover:underline font-medium"
            >
              Contact us for custom solutions
            </button>
          </p>
        </div>
      </div>
    </section>
  )
}
