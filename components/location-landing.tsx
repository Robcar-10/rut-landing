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
import { Footer } from "@/components/landing/Footer"
import { StickyMobileElements } from "@/components/landing/StickyMobileElements"
import { CookieConsent } from "@/components/landing/CookieConsent"
import { LocationBanner } from "@/components/landing/LocationBanner"
import { ContactForm } from "@/components/landing/ContactForm"
import { InternalLinksSection } from "@/components/landing/InternalLinksSection"
import { LocalContentSection } from "@/components/landing/LocalContentSection"
import { NearbyTownsSection } from "@/components/landing/NearbyTownSection"
import { FAQSection } from "@/components/landing/FAQSection"
import type { LocationContent } from "@/lib/location-content"

interface LocationLandingProps {
  location?: string
  content?: LocationContent
}

export default function LocationLanding({ location, content }: LocationLandingProps) {
  const { currentLocation, isDetectingLocation, geolocationStatus, requestGPSLocation, setCurrentLocation } =
    useLocationDetection(location)

  const cookieConsent = useCookieConsent()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <Header currentLocation={currentLocation} />

      <LocationBanner
        currentLocation={currentLocation}
        isDetectingLocation={isDetectingLocation}
        geolocationStatus={geolocationStatus}
        onRequestGPSLocation={requestGPSLocation}
        onLocationSelect={setCurrentLocation}
      />

      <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">

        {/* Hero + Contact Form */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <HeroSection currentLocation={currentLocation} />
          <ContactForm currentLocation={currentLocation} />
        </div>

        {/* Unique local intro — only on location pages */}
        {content && (
          <LocalContentSection
            introParagraph={content.introParagraph}
            localCallout={content.localCallout}
            industriesNote={content.industriesNote}
            locationName={content.name}
            county={content.county}
          />
        )}

        <WorkShowcaseSection currentLocation={currentLocation} />
        <ServicesSection currentLocation={currentLocation} />
        <IndustriesSection currentLocation={currentLocation} />
        <DifferentiatorsSection currentLocation={currentLocation} />
        <TestimonialsSection currentLocation={currentLocation} />

        {/* FAQs — town-specific on location pages, generic on homepage */}
        {content ? (
          <FAQSection faqs={content.faqs} locationName={content.name} />
        ) : (
          <FAQSection locationName={currentLocation} />
        )}

        {/* Nearby towns internal links — only on location pages */}
        {content && content.nearbyTowns.length > 0 && (
          <NearbyTownsSection
            nearbyTowns={content.nearbyTowns}
            currentLocationName={content.name}
          />
        )}

        <InternalLinksSection currentLocation={currentLocation} />

      </main>

      <Footer currentLocation={currentLocation} />
      <StickyMobileElements currentLocation={currentLocation} />

      {cookieConsent.shouldShowConsent && (
        <CookieConsent onAccept={cookieConsent.updatePreferences} />
      )}
    </div>
  )
}