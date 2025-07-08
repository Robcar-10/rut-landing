"use client"

import { Button } from "@/components/ui/button"
import { Star, Users, Award } from "lucide-react"
import { useHeroAnimation } from "@/lib/gsap-utils"

interface HeroSectionProps {
  currentLocation: string
}

export const HeroSection = ({ currentLocation }: HeroSectionProps) => {
  const heroRef = useHeroAnimation()

  return (
    <div ref={heroRef} className="space-y-6 sm:space-y-8 text-center lg:text-left">
      <div className="space-y-4">
        <h1 className="text-3xl sm:text-3xl lg:text-5xl xl:text-5xl font-bold text-gray-900 leading-tight">
          Custom{" "}
          <span className="bg-gradient-to-r from-[#FF6452] to-[#B221F6] text-5xl max-sm:text-[32px] max-md:leading-15 max-sm:leading-5 max-sm:mt-0 text-transparent bg-clip-text mt-3">
            Screen Printing{" "}
          </span>{" "}
          &{" "}
          <span className="bg-gradient-to-r from-[#FF6452] to-[#B221F6] text-5xl max-sm:text-[32px] max-md:leading-15 max-sm:leading-5 max-sm:mt-0 text-transparent bg-clip-text mt-3">
            Embroidery Services
          </span>{" "}
          in {currentLocation}
        </h1>
        <h2 className="text-xl sm:text-xl font-semibold text-gray-700 mt-4">
          Trusted by {currentLocation} Businesses for Custom Apparel, Embroidery & Decals
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
          At <span className="font-semibold text-purple-600">Rolled Up Tees</span>, we help {currentLocation}{" "}
          businesses, schools, and event organizers stand out with <strong>custom screen printing</strong>,
          <strong> embroidery services</strong>, and <strong>custom decals</strong>. From t-shirts to hats and window
          graphics, we turn your ideas into high-quality branded products — quickly and professionally.
        </p>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
          <p className="text-gray-800 font-medium text-sm sm:text-base">
            🎯 <strong>Limited Time:</strong> Free design consultation for {currentLocation} businesses! Get your custom
            quote in 24 hours or less.
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
