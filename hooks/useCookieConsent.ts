"use client"

import { useState, useEffect } from "react"
import { initGA, initFBPixel } from "@/lib/analytics"

interface CookiePreferences {
  essential: boolean
  analytics: boolean
  marketing: boolean
}

export const useCookieConsent = () => {
  const [preferences, setPreferences] = useState<CookiePreferences | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  console.log("useCookieConsent - preferences:", preferences, "isLoaded:", isLoaded)

  useEffect(() => {
    console.log("useCookieConsent hook initializing")

    // Load saved preferences
    const saved = localStorage.getItem("cookie-consent")
    console.log("Saved cookie preferences:", saved)

    if (saved) {
      try {
        const parsedPreferences = JSON.parse(saved)
        console.log("Parsed preferences:", parsedPreferences)
        setPreferences(parsedPreferences)

        // Initialize analytics based on saved preferences
        if (parsedPreferences.analytics) {
          console.log("Initializing GA based on saved preferences")
          initGA()
        }
        if (parsedPreferences.marketing) {
          console.log("Initializing FB Pixel based on saved preferences")
          initFBPixel()
        }
      } catch {
        console.log("Invalid JSON in cookie consent, resetting")
        // Invalid JSON, reset
        localStorage.removeItem("cookie-consent")
      }
    } else {
      console.log("No saved preferences found")
    }

    console.log("Setting isLoaded to true")
    setIsLoaded(true)
  }, [])

  const updatePreferences = (newPreferences: CookiePreferences) => {
    setPreferences(newPreferences)
    localStorage.setItem("cookie-consent", JSON.stringify(newPreferences))

    // Initialize analytics if accepted
    if (newPreferences.analytics && typeof window !== "undefined") {
      initGA()
    }

    // Initialize marketing if accepted
    if (newPreferences.marketing && typeof window !== "undefined") {
      initFBPixel()
    }

    // If analytics or marketing were disabled, we should ideally clear their cookies
    // This is a simplified approach - in production you might want more sophisticated cleanup
    if (!newPreferences.analytics || !newPreferences.marketing) {
      console.log("Some tracking disabled - consider clearing related cookies")
    }
  }

  const hasConsent = (type: keyof CookiePreferences): boolean => {
    return preferences?.[type] ?? false
  }

  const resetConsent = () => {
    localStorage.removeItem("cookie-consent")
    setPreferences(null)
  }

  return {
    preferences,
    isLoaded,
    hasConsent,
    updatePreferences,
    resetConsent,
  }
}
