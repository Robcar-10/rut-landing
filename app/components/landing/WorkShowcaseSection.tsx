"use client"

import { useGSAPAnimation } from "@/lib/gsap-utils"
import Image from "next/image"

interface WorkShowcaseSectionProps {
  currentLocation: string
}

export const WorkShowcaseSection = ({ currentLocation }: WorkShowcaseSectionProps) => {
  const sectionRef = useGSAPAnimation()

  return (
    <section ref={sectionRef} className="mt-16 sm:mt-20 py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image Side */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              <Image
                src="/images/screen-printing-nyack.jpg"
                alt="Custom screen printed t-shirt with Rolled Up Tees logo - Professional screen printing services in Nyack"
                width={600}
                height={400}
                className="w-full h-auto rounded-2xl shadow-2xl"
                priority
              />
              <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-[#FF6452] to-[#B221F6] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                ✨ Our Work
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="order-1 lg:order-2 space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                See the Quality That {currentLocation} Businesses Love
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                From custom logos to detailed designs, our <strong>screen printing</strong> and{" "}
                <strong>embroidery services</strong> deliver professional results that make your brand stand out.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">500+</div>
                <div className="text-sm text-gray-600">Projects Completed</div>
              </div>
              <div className="bg-pink-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-pink-600">48hr</div>
                <div className="text-sm text-gray-600">Rush Orders</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl">
              <p className="text-gray-700 italic">
                "The quality exceeded our expectations! Our team uniforms look professional and the printing has held up
                perfectly after months of wear."
              </p>
              <div className="mt-3 text-sm text-gray-600">- Local {currentLocation} Business Owner</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
