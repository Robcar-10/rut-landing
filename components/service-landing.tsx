"use client"

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

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        <ServiceHeroSection serviceInfo={serviceInfo} />
        <ServiceDetailsSection serviceInfo={serviceInfo} />
        <RelatedServicesSection currentService={serviceInfo.slug} />
        <TestimonialsSection />
      </main>

      <Footer />
      <StickyMobileElements />

      {/* Cookie Consent */}
      {cookieConsent.shouldShowConsent && <CookieConsent onAccept={cookieConsent.updatePreferences} />}
    </div>
  )
}
