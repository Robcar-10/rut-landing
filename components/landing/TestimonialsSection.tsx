"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { useStaggerAnimation } from "@/lib/gsap-utils"
import Image from "next/image"

interface TestimonialsSectionProps {
  currentLocation: string
}

const testimonials = [
  {
    name: "Sarah Johnson",
    business: "Johnson's Local Bakery",
    location: "Pearl River",
    rating: 5,
    text: "Rolled Up Tees transformed our staff uniforms! The embroidery work is exceptional and our customers constantly compliment our professional appearance. Fast turnaround and great communication throughout.",
    image: "/placeholder.svg?height=60&width=60",
    service: "Custom Embroidery",
  },
  {
    name: "Mike Rodriguez",
    business: "Rodriguez Construction",
    location: "Spring Valley",
    rating: 5,
    text: "We needed 50 safety vests with our logo for a big project. The screen printing quality exceeded our expectations and they delivered ahead of schedule. Highly recommend for any business needs!",
    image: "/placeholder.svg?height=60&width=60",
    service: "Screen Printing",
  },
  {
    name: "Lisa Chen",
    business: "Westwood Youth Soccer",
    location: "Westwood",
    rating: 5,
    text: "Amazing experience! They helped design and print jerseys for our entire league. The kids love their new uniforms and the parents are impressed with the quality. Will definitely use again!",
    image: "/placeholder.svg?height=60&width=60",
    service: "Team Uniforms",
  },
  {
    name: "David Thompson",
    business: "Thompson's Auto Repair",
    location: "Nanuet",
    rating: 5,
    text: "The custom decals for our service vehicles look fantastic! Professional design, weather-resistant materials, and perfect installation. Our mobile advertising has never looked better.",
    image: "/placeholder.svg?height=60&width=60",
    service: "Custom Decals",
  },
  {
    name: "Jennifer Martinez",
    business: "Tarrytown Elementary PTA",
    location: "Tarrytown",
    rating: 5,
    text: "Rolled Up Tees made our school fundraiser a huge success! The t-shirt designs were creative and the ordering process was so easy. Parents loved the quality and the kids wore them proudly.",
    image: "/placeholder.svg?height=60&width=60",
    service: "Fundraiser Apparel",
  },
]

export const TestimonialsSection = ({ currentLocation }: TestimonialsSectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const containerRef = useStaggerAnimation(".testimonial-card", 0.2)

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  return (
    <section ref={containerRef} className="mt-16 sm:mt-20 py-12 sm:py-16">
      <div className="text-center mb-8 sm:mb-12 px-4">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 testimonial-card">
          What {currentLocation} Businesses Say About Us
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto testimonial-card">
          Don't just take our word for it - hear from local businesses who trust Rolled Up Tees for their custom apparel
          needs.
        </p>
      </div>

      {/* Main Testimonial Display */}
      <div className="max-w-4xl mx-auto px-4 mb-8">
        <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-0 testimonial-card">
          <CardContent className="p-6 sm:p-8">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              {/* Quote Icon */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-r from-[#FF6452] to-[#B221F6] rounded-full flex items-center justify-center">
                  <Quote className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Testimonial Content */}
              <div className="flex-1">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                <blockquote className="text-gray-700 text-lg leading-relaxed mb-4">
                  "{testimonials[currentIndex].text}"
                </blockquote>

                <div className="flex items-center gap-4">
                  <Image
                    src={testimonials[currentIndex].image || "/placeholder.svg?height=48&width=48"}
                    alt={testimonials[currentIndex].name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonials[currentIndex].name}</div>
                    <div className="text-sm text-gray-600">{testimonials[currentIndex].business}</div>
                    <div className="text-xs text-gray-500">
                      {testimonials[currentIndex].location} • {testimonials[currentIndex].service}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <Button
          variant="outline"
          size="icon"
          onClick={prevTestimonial}
          className="rounded-full border-gray-300 hover:bg-purple-50 bg-transparent"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        {/* Dots Indicator */}
        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-gradient-to-r from-[#FF6452] to-[#B221F6] w-6"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={nextTestimonial}
          className="rounded-full border-gray-300 hover:bg-purple-50 bg-transparent"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Auto-play indicator */}
      <div className="text-center">
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          {isAutoPlaying ? "⏸️ Pause" : "▶️ Auto-play"} testimonials
        </button>
      </div>
    </section>
  )
}
