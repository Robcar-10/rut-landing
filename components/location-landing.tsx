"use client"

import { useLocationDetection } from "@/hooks/useLocationDetection"
import { useCookieConsent } from "@/hooks/useCookieConsent"
import { Header } from "./landing/Header"
import { LocationBanner } from "./landing/LocationBanner"
import { HeroSection } from "./landing/HeroSection"
import { ContactForm } from "./landing/ContactForm"
import { WorkShowcaseSection } from "./landing/WorkShowcaseSection"
import { ServicesSection } from "./landing/ServicesSection"
import { IndustriesSection } from "./landing/IndustriesSection"
import { DifferentiatorsSection } from "./landing/DifferentiatorsSection"
import { TestimonialsSection } from "./landing/TestimonialsSection"
import { UploadSection } from "./landing/UploadSection"
import { Footer } from "./landing/Footer"
import { StickyMobileElements } from "./landing/StickyMobileElements"
import { CookieConsent } from "./landing/CookieConsent"

interface LocationLandingProps {
  location?: string
}

export default function LocationLanding({ location }: LocationLandingProps) {
  const { currentLocation, isDetectingLocation, geolocationStatus, requestGPSLocation, setCurrentLocation } =
    useLocationDetection(location)

  const { preferences, isLoaded, updatePreferences } = useCookieConsent()

  console.log("LocationLanding render - Cookie consent state:", {
    isLoaded,
    preferences,
    shouldShowConsent: isLoaded && !preferences,
  })

  const handleLocationSelect = (selectedLocation: string) => {
    console.log("Manual location selected:", selectedLocation)
    setCurrentLocation(selectedLocation)

    // Update URL
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
          <HeroSection currentLocation={currentLocation} />
          <ContactForm currentLocation={currentLocation} />
        </div>

        <WorkShowcaseSection currentLocation={currentLocation} />
        <ServicesSection currentLocation={currentLocation} />
        <IndustriesSection currentLocation={currentLocation} />
        <DifferentiatorsSection currentLocation={currentLocation} />
        <TestimonialsSection currentLocation={currentLocation} />
        <UploadSection currentLocation={currentLocation} />
      </main>

      <Footer currentLocation={currentLocation} />
      <StickyMobileElements currentLocation={currentLocation} />

      {/* Cookie Consent - Only show if not yet decided and loaded */}
      {(() => {
        const shouldShow = isLoaded && !preferences
        console.log("Should show cookie consent:", shouldShow)
        return shouldShow ? <CookieConsent onAccept={updatePreferences} /> : null
      })()}
    </div>
  )
}
