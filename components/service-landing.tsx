"use client"

import { useLocationDetection } from "@/hooks/useLocationDetection"
import { LocationBanner } from "@/components/landing/LocationBanner"
import { ServiceHeroSection } from "@/components/landing/ServiceHeroSection"
import { ServiceDetailsSection } from "@/components/landing/ServiceDetailsSection"
import { RelatedServicesSection } from "@/components/landing/RelatedServicesSection"
import { TestimonialsSection } from "@/components/landing/TestimonialsSection"
import { ContactForm } from "@/components/landing/ContactForm"
import { Footer } from "@/components/landing/Footer"
import { StickyMobileElements } from "@/components/landing/StickyMobileElements"
import { CookieConsent } from "@/components/landing/CookieConsent"
import type { ServiceInfo } from "@/lib/service-utils"

interface ServiceLandingProps {
  serviceInfo: ServiceInfo
}

export default function ServiceLanding({ serviceInfo }: ServiceLandingProps) {
  const { currentLocation, isDetectingLocation, geolocationStatus, requestGPSLocation, setCurrentLocation } =
    useLocationDetection()

  const handleLocationSelect = (selectedLocation: string) => {
    setCurrentLocation(selectedLocation)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Location Banner */}
      <LocationBanner
        currentLocation={currentLocation}
        isDetectingLocation={isDetectingLocation}
        geolocationStatus={geolocationStatus}
        onRequestLocation={requestGPSLocation}
        onLocationSelect={handleLocationSelect}
      />

      {/* Service Hero Section */}
      <ServiceHeroSection serviceInfo={serviceInfo} currentLocation={currentLocation} />

      {/* Service Details Section */}
      <ServiceDetailsSection serviceInfo={serviceInfo} currentLocation={currentLocation} />

      {/* Related Services Section */}
      <RelatedServicesSection currentServiceSlug={serviceInfo.slug} currentLocation={currentLocation} />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Contact Form */}
      <ContactForm />

      {/* Footer */}
      <Footer />

      {/* Sticky Mobile Elements */}
      <StickyMobileElements />

      {/* Cookie Consent */}
      <CookieConsent />
    </div>
  )
}
