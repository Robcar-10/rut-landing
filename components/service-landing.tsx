"use client"

import { useState, useEffect } from "react"
import { detectLocationByIP } from "@/lib/location-utils"
import { Header } from "@/components/landing/Header"
import { LocationBanner } from "@/components/landing/LocationBanner"
import { ServiceHeroSection } from "@/components/landing/ServiceHeroSection"
import { ServiceDetailsSection } from "@/components/landing/ServiceDetailsSection"
import { RelatedServicesSection } from "@/components/landing/RelatedServicesSection"
import { TestimonialsSection } from "@/components/landing/TestimonialsSection"
import { ContactForm } from "@/components/landing/ContactForm"
import { Footer } from "@/components/landing/Footer"
import { StickyMobileElements } from "@/components/landing/StickyMobileElements"
import { CookieConsent } from "@/components/landing/CookieConsent"
import { useCookieConsent } from "@/hooks/useCookieConsent"
import type { ServiceInfo } from "@/lib/service-utils"

interface ServiceLandingProps {
  serviceInfo: ServiceInfo
}

export default function ServiceLanding({ serviceInfo }: ServiceLandingProps) {
  const cookieConsent = useCookieConsent()
  const [currentLocation, setCurrentLocation] = useState("Nyack")
  const [isDetecting, setIsDetecting] = useState(true)

  useEffect(() => {
    detectLocationByIP().then((location) => {
      setCurrentLocation(location)
      setIsDetecting(false)
    })
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <Header currentLocation={currentLocation} />

      <LocationBanner
        currentLocation={currentLocation}
        isDetectingLocation={isDetecting}
        geolocationStatus="idle"
        onRequestGPSLocation={() => {}}
        onLocationSelect={setCurrentLocation}
      />

      <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">

        {/* Hero + Contact Form */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <ServiceHeroSection serviceInfo={serviceInfo} currentLocation={currentLocation} />
          <ContactForm currentLocation={currentLocation} />
        </div>

        <ServiceDetailsSection serviceInfo={serviceInfo} currentLocation={currentLocation} />
        <RelatedServicesSection serviceInfo={serviceInfo} currentLocation={currentLocation} />
        <TestimonialsSection currentLocation={currentLocation} />

      </main>

      <Footer currentLocation={currentLocation} />
      <StickyMobileElements currentLocation={currentLocation} />

      {cookieConsent.shouldShowConsent && (
        <CookieConsent onAccept={cookieConsent.updatePreferences} />
      )}
    </div>
  )
}