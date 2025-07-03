"use client"

import { Building2, GraduationCap, Calendar, Shield, HardHat, Users } from "lucide-react"
import { useStaggerAnimation } from "@/lib/gsap-utils"

interface IndustriesSectionProps {
  currentLocation: string
}

const industries = [
  {
    icon: Building2,
    title: "Businesses",
    description: "Corporate uniforms, branded apparel, and promotional items for local businesses",
    examples: "Restaurants, retail stores, offices, medical practices",
  },
  {
    icon: GraduationCap,
    title: "Schools",
    description: "Student uniforms, team jerseys, spirit wear, and fundraising merchandise",
    examples: "Elementary, middle, and high schools, colleges",
  },
  {
    icon: Calendar,
    title: "Events",
    description: "Custom event t-shirts, race shirts, conference swag, and memorial items",
    examples: "5K races, festivals, corporate events, fundraisers",
  },
  {
    icon: Shield,
    title: "Fire/Police/EMS",
    description: "Professional uniforms, department logos, and specialized safety apparel",
    examples: "Fire departments, police stations, EMT services",
  },
  {
    icon: HardHat,
    title: "Construction",
    description: "Safety vests, work shirts, company uniforms with reflective materials",
    examples: "Construction crews, contractors, utility companies",
  },
  {
    icon: Users,
    title: "Corporate & Teams",
    description: "Company swag, team building apparel, employee gifts, and branded merchandise",
    examples: "Sports teams, corporate retreats, employee onboarding",
  },
]

export const IndustriesSection = ({ currentLocation }: IndustriesSectionProps) => {
  const containerRef = useStaggerAnimation(".industry-card", 0.1)

  return (
    <section ref={containerRef} className="mt-16 sm:mt-20 py-12 sm:py-16 bg-gray-50 rounded-3xl">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 industry-card">
            Industries We Serve in {currentLocation}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto industry-card">
            From small businesses to large organizations, we provide custom apparel solutions for every industry and
            occasion.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {industries.map((industry, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 industry-card"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#FF6452] to-[#B221F6] rounded-lg flex items-center justify-center">
                    <industry.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{industry.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{industry.description}</p>
                  <p className="text-xs text-gray-500 italic">{industry.examples}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
