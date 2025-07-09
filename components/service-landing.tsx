"use client"

import { useLocationDetection } from "@/hooks/useLocationDetection"
import { useCookieConsent } from "@/hooks/useCookieConsent"
import { Header } from "./landing/Header"
import { LocationBanner } from "./landing/LocationBanner"
import { ServiceHeroSection } from "./landing/ServiceHeroSection"
import { ContactForm } from "./landing/ContactForm"
import { ServiceDetailsSection } from "./landing/ServiceDetailsSection"
import { RelatedServicesSection } from "./landing/RelatedServicesSection"
import { TestimonialsSection } from "./landing/TestimonialsSection"
import { Footer } from "./landing/Footer"
import { StickyMobileElements } from "./landing/StickyMobileElements"
import { CookieConsent } from "./landing/CookieConsent"
import type { ServiceInfo } from "@/lib/service-utils"

interface ServiceLandingProps {
  serviceInfo: ServiceInfo
}

export default function ServiceLanding({ serviceInfo }: ServiceLandingProps) {
  const { currentLocation, isDetectingLocation, geolocationStatus, requestGPSLocation, setCurrentLocation } =
    useLocationDetection()

  const { preferences, isLoaded, updatePreferences } = useCookieConsent()

  const handleLocationSelect = (selectedLocation: string) => {
    setCurrentLocation(selectedLocation)

    // Update URL with location parameter
    const newUrl = new URL(window.location.href)
    newUrl.searchParams.set("location", selectedLocation)
    window.history.replaceState({}, "", newUrl.toString())
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <Header currentLocation={currentLocation} />

      <LocationBanner
        currentLocation={currentLocation}
        isDetectingLocation={isDetectingLocation}
        geolocationStatus={geolocationStatus}
        onRequestGPSLocation={requestGPSLocation}
        onLocationSelect={handleLocationSelect}
      />

      <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <ServiceHeroSection serviceInfo={serviceInfo} currentLocation={currentLocation} />
          <ContactForm currentLocation={currentLocation} />
        </div>

        <ServiceDetailsSection serviceInfo={serviceInfo} currentLocation={currentLocation} />
        <RelatedServicesSection serviceInfo={serviceInfo} currentLocation={currentLocation} />
        <TestimonialsSection currentLocation={currentLocation} />
      </main>

      <Footer currentLocation={currentLocation} />
      <StickyMobileElements currentLocation={currentLocation} />

      {/* Cookie Consent */}
      {isLoaded && !preferences && <CookieConsent onAccept={updatePreferences} />}
    </div>
  )
}
