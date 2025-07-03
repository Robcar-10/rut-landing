"use client"

import { useState, useEffect } from "react"
import { Button } from "../ui/button"
import { Phone, MessageCircle, ArrowUp } from "lucide-react"

interface StickyMobileElementsProps {
  currentLocation: string
}

export const StickyMobileElements = ({ currentLocation }: StickyMobileElementsProps) => {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const scrollToForm = () => {
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      {/* Mobile Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-gray-200 shadow-lg">
        <div className="flex items-center justify-between p-3 gap-2">
          <Button
            onClick={scrollToForm}
            className="flex-1 bg-gradient-to-r from-[#FF6452] to-[#B221F6] hover:from-[#E55A49] hover:to-[#A01EE6] text-white font-semibold py-3 rounded-full"
          >
            Get Free Quote
          </Button>

          <Button asChild size="icon" className="bg-green-500 hover:bg-green-600 text-white rounded-full w-12 h-12">
            <a href="tel:+18453582037" aria-label="Call Rolled Up Tees">
              <Phone className="w-5 h-5" />
            </a>
          </Button>

          <Button
            size="icon"
            variant="outline"
            className="border-purple-300 text-purple-600 hover:bg-purple-50 rounded-full w-12 h-12 bg-transparent"
            onClick={() => {
              // You can integrate with your preferred chat service here
              alert(
                `Hi! We'd love to help with your ${currentLocation} custom apparel needs. Call us at (845) 358-2037 or fill out our quote form!`,
              )
            }}
          >
            <MessageCircle className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          size="icon"
          className="fixed bottom-20 right-4 z-40 md:bottom-6 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg transition-all duration-300"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </Button>
      )}

      {/* Mobile Spacing for Sticky Bar */}
      <div className="h-16 md:hidden" />
    </>
  )
}
