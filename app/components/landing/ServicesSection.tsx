"use client"

import { useStaggerAnimation } from "@/lib/gsap-utils"
import Image from "next/image"

interface ServicesSectionProps {
  currentLocation: string
}

const services = [
  {
    image: "/images/custom-screen-printing-nyack.jpg",
    title: "Custom Screen Printing in",
    description:
      "We produce vibrant, long-lasting prints on t-shirts, hoodies, and uniforms. Whether you need apparel for your staff, an event, or a local promotion, our screen printing services deliver professional results every time.",
    features: ["Vibrant colors", "Durable prints", "Bulk orders", "Fast turnaround"],
  },
  {
    image: "/images/custom-hats-new-city.jpg",
    title: "Embroidery Services That Elevate Your Brand",
    description:
      "Our custom embroidery adds a premium touch to polos, jackets, hats, and more. Trusted by businesses across the region, our embroidery is ideal for companies looking to boost their brand's image with lasting detail and quality.",
    features: ["Premium quality", "Detailed logos", "Professional finish", "Various materials"],
  },
  {
    image: "/images/custom-decals-nanuet.jpg",
    title: "Custom Decals & Digital Printing",
    description:
      "From custom stickers for your branding, storefronts and vehicles to detailed short-run digital printing, we have the tools and creativity to meet your design needs quickly and professionally.",
    features: ["Custom Stickers", "Window graphics", "Digital prints", "Vehicle Graphics"],
  },
]

export const ServicesSection = ({ currentLocation }: ServicesSectionProps) => {
  const containerRef = useStaggerAnimation(".service-card", 0.2)

  return (
    <section ref={containerRef} className="mt-16 sm:mt-20 py-12 sm:py-16 bg-white/50 rounded-3xl">
      <div className="text-center mb-8 sm:mb-12 px-4">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 service-card">
          Why {currentLocation} Businesses Trust Rolled Up Tees
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto service-card">
          At Rolled Up Tees, we specialize in <strong>custom screen printing</strong>,{" "}
          <strong>embroidery services</strong>, and <strong>digital printing</strong> designed to help {currentLocation}{" "}
          businesses stand out with branded apparel that speaks volumes.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 px-4">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 service-card overflow-hidden group"
          >
            {/* Service Image */}
            <div className="relative h-48 sm:h-56 overflow-hidden">
              <Image
                src={service.image || "/placeholder.svg?height=224&width=400"}
                alt={`${service.title} ${index === 0 ? currentLocation : ""} - Professional custom apparel services`}
                width={400}
                height={224}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              <div className="absolute top-4 left-4 right-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                  <h3 className="text-lg sm:text-sm font-semibold text-white leading-tight">
                    {service.title} {index === 0 ? currentLocation : ""}
                  </h3>
                </div>
              </div>
            </div>

            {/* Service Content */}
            <div className="p-6">
              <p className="text-gray-600 text-sm sm:text-base mb-4 leading-relaxed">
                {service.description.replace("the region", currentLocation)}
              </p>

              {/* Features List */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                {service.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-[#FF6452] to-[#B221F6] rounded-full"></div>
                    <span className="text-xs text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button
                onClick={() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })}
                className="w-full bg-gradient-to-r from-[#FF6452] to-[#B221F6] hover:from-[#E55A49] hover:to-[#A01EE6] text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 text-sm"
              >
                Get Quote
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Services Grid */}
      {/* <div className="mt-12 px-4">
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 sm:p-8">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center service-card">
            More Ways We Serve {currentLocation}
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="text-center service-card">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                <Image
                  src="/images/team-custom-jerseys.png"
                  alt="Team jerseys"
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Team Uniforms</h4>
              <p className="text-sm text-gray-600">Sports teams, corporate groups</p>
            </div>

            <div className="text-center service-card">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                <div className="w-12 h-12 bg-gradient-to-r from-[#FF6452] to-[#B221F6] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xs">HAT</span>
                </div>
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Custom Hats</h4>
              <p className="text-sm text-gray-600">Embroidered caps, beanies</p>
            </div>

            <div className="text-center service-card">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                <div className="w-12 h-12 bg-gradient-to-r from-[#FF6452] to-[#B221F6] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xs">POLO</span>
                </div>
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Corporate Polos</h4>
              <p className="text-sm text-gray-600">Professional business attire</p>
            </div>

            <div className="text-center service-card">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                <div className="w-12 h-12 bg-gradient-to-r from-[#FF6452] to-[#B221F6] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xs">SIGN</span>
                </div>
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Vehicle Decals</h4>
              <p className="text-sm text-gray-600">Business advertising, graphics</p>
            </div>
          </div>
        </div>
      </div> */}
    </section>
  )
}
