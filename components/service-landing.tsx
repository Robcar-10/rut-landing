"use client"

import { useState, useEffect } from "react"
import { detectLocationByIP } from "@/lib/location-utils"
import { Header } from "@/components/landing/Header"
import { ServiceHeroSection } from "@/components/landing/ServiceHeroSection"
import { ServiceDetailsSection } from "@/components/landing/ServiceDetailsSection"
import { RelatedServicesSection } from "@/components/landing/RelatedServicesSection"
import { TestimonialsSection } from "@/components/landing/TestimonialsSection"
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
  const [currentLocation, setCurrentLocation] = useState("Nyack") // 👈 default for prerender

  useEffect(() => {
    detectLocationByIP().then((location) => {
      setCurrentLocation(location)
    })
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <ServiceHeroSection serviceInfo={serviceInfo} currentLocation={currentLocation} />
        <ServiceDetailsSection serviceInfo={serviceInfo} currentLocation={currentLocation} />
        <RelatedServicesSection serviceInfo={serviceInfo} currentLocation={currentLocation} />
        <TestimonialsSection />
      </main>
      <Footer />
      <StickyMobileElements />
      {cookieConsent.shouldShowConsent && <CookieConsent onAccept={cookieConsent.updatePreferences} />}
    </div>
  )
}