"use client"

import { useLocationDetection } from "@/hooks/useLocationDetection"
import { useCookieConsent } from "@/hooks/useCookieConsent"
import { Header } from "@/components/landing/Header"
import { HeroSection } from "@/components/landing/HeroSection"
import { ServicesSection } from "@/components/landing/ServicesSection"
import { DifferentiatorsSection } from "@/components/landing/DifferentiatorsSection"
import { WorkShowcaseSection } from "@/components/landing/WorkShowcaseSection"
import { IndustriesSection } from "@/components/landing/IndustriesSection"
import { TestimonialsSection } from "@/components/landing/TestimonialsSection"
import { UploadSection } from "@/components/landing/UploadSection"
import { Footer } from "@/components/landing/Footer"
import { StickyMobileElements } from "@/components/landing/StickyMobileElements"
import { CookieConsent } from "@/components/landing/CookieConsent"
import { LocationBanner } from "@/components/landing/LocationBanner"

interface LocationLandingProps {
  location?: string
}

export default function LocationLanding({ location }: LocationLandingProps) {
  const { currentLocation, isDetectingLocation, geolocationStatus, requestGPSLocation, setCurrentLocation } =
    useLocationDetection(location)

  const cookieConsent = useCookieConsent()

  console.log("LocationLanding render - Cookie consent state:", {
    isLoaded: cookieConsent.isLoaded,
    preferences: cookieConsent.preferences,
    shouldShowConsent: cookieConsent.shouldShowConsent,
  })

  const handleLocationSelect = (selectedLocation: string) => {
    setCurrentLocation(selectedLocation)
  }

  console.log("Should show cookie consent:", cookieConsent.shouldShowConsent)

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
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get Your Free Quote</h2>
            <p className="text-gray-600 mb-6">
              Ready to start your custom apparel project in {currentLocation}? Fill out our quick form for a
              personalized quote.
            </p>
            <div className="space-y-4">
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                Start Your Quote
              </button>
              <button className="w-full border border-purple-300 text-purple-600 hover:bg-purple-50 font-semibold py-3 px-6 rounded-lg transition-colors">
                Call (845) 358-2037
              </button>
            </div>
          </div>
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
      {cookieConsent.shouldShowConsent && <CookieConsent onAccept={cookieConsent.updatePreferences} />}
    </div>
  )
}
