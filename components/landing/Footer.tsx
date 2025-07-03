"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

interface FooterProps {
  currentLocation: string
}

export const Footer = ({ currentLocation }: FooterProps) => {
  return (
    <footer className="bg-purple-600 text-white py-8 sm:py-12 mt-16 sm:mt-20">
      <div className="container mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Elevate Your {currentLocation} Brand?</h2>
        <p className="text-lg sm:text-xl mb-6 sm:mb-8 opacity-90">
          Join hundreds of satisfied customers in {currentLocation} and surrounding areas.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            className="bg-white text-purple-600 hover:bg-gray-100 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold"
            onClick={() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })}
          >
            Get Started Today
          </Button>
          <Button
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-purple-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold bg-transparent"
            asChild
          >
            <Link href="tel:+18453582037">Call (845) 358-2037</Link>
          </Button>
        </div>
      </div>
    </footer>
  )
}
