"use client"

import { CheckCircle, Clock, Heart, DollarSign } from "lucide-react"
import { useStaggerAnimation } from "@/lib/gsap-utils"

interface DifferentiatorsSectionProps {
  currentLocation: string
}

const differentiators = [
  {
    icon: CheckCircle,
    title: "In-house printing & embroidery",
    description: "Complete control over quality and timing - no outsourcing delays",
  },
  {
    icon: Clock,
    title: "Rush orders available",
    description: "Need it fast? We offer expedited service for urgent projects",
  },
  {
    icon: Heart,
    title: "Family-owned & community-focused",
    description: "Local business supporting local businesses since 2020",
  },
  {
    icon: DollarSign,
    title: "Bulk pricing & volume discounts",
    description: "Better prices for larger orders - perfect for teams and events",
  },
]

export const DifferentiatorsSection = ({ currentLocation }: DifferentiatorsSectionProps) => {
  const containerRef = useStaggerAnimation(".differentiator-card", 0.15)

  return (
    <section ref={containerRef} className="mt-16 sm:mt-20 py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 differentiator-card">
            What Makes Rolled Up Tees Different
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto differentiator-card">
            Why {currentLocation} businesses choose us over the competition
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {differentiators.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 differentiator-card"
            >
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-green-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">✅ {item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
