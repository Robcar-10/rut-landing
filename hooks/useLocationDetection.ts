"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import {
  findNearestLocation,
  detectLocationByIP,
  isWithinServiceArea,
  getLocationDisplayName,
  isValidServiceLocation,
} from "@/lib/location-utils"
import { trackLocationChange } from "@/lib/analytics"
import { useCookieConsent } from "@/hooks/useCookieConsent"

export type GeolocationStatus = "idle" | "detecting" | "success" | "denied" | "error" | "ip-detected"

export interface UseLocationDetectionReturn {
  currentLocation: string
  isDetectingLocation: boolean
  geolocationStatus: GeolocationStatus
  requestGPSLocation: () => void
  setCurrentLocation: (location: string) => void
}

export const useLocationDetection = (initialLocation?: string): UseLocationDetectionReturn => {
  const [currentLocation, setCurrentLocationState] = useState("Nyack")
  const [isDetectingLocation, setIsDetectingLocation] = useState(false)
  const [geolocationStatus, setGeolocationStatus] = useState<GeolocationStatus>("idle")
  const { hasConsent } = useCookieConsent()
  const hasInitialized = useRef(false)
  const isDetecting = useRef(false)

  // Stable function to update location
  const updateLocation = useCallback(
    (location: string, source: string) => {
      if (isValidServiceLocation(location)) {
        console.log(`Setting location to: ${location} (source: ${source})`)
        setCurrentLocationState(location)

        // Track location change if consent given
        if (hasConsent("analytics") && source !== "initial") {
          trackLocationChange(location, source as any)
        }
      } else {
        console.log(`Invalid location: ${location}, using Nyack`)
        setCurrentLocationState("Nyack")
      }
    },
    [hasConsent],
  )

  // Check if user has previously set a location preference
  const getUserLocationPreference = useCallback(() => {
    if (typeof window === "undefined") return null

    try {
      return localStorage.getItem("userLocationPreference")
    } catch (error) {
      console.log("Could not access localStorage:", error)
      return null
    }
  }, [])

  // Save user location preference
  const saveUserLocationPreference = useCallback((location: string, source: string) => {
    if (typeof window === "undefined") return

    try {
      // Only save if user manually selected or GPS detected (not from shared links)
      if (source === "manual" || source === "gps" || source === "ip") {
        localStorage.setItem("userLocationPreference", location)
        console.log(`Saved user location preference: ${location}`)
      }
    } catch (error) {
      console.log("Could not save to localStorage:", error)
    }
  }, [])

  // Initialize location detection once
  useEffect(() => {
    if (hasInitialized.current || isDetecting.current) return

    const detectLocation = async () => {
      if (isDetecting.current) return

      console.log("Starting location detection...")
      isDetecting.current = true
      setIsDetectingLocation(true)
      setGeolocationStatus("detecting")

      try {
        // Priority 1: Check if user has a saved location preference
        const savedPreference = getUserLocationPreference()
        if (savedPreference && isValidServiceLocation(savedPreference)) {
          console.log("Using saved user preference:", savedPreference)
          updateLocation(savedPreference, "saved")
          setGeolocationStatus("success")
          return
        }

        // Priority 2: Only use URL/initial location if it's from a direct navigation (not shared link)
        // We can detect this by checking if there's a referrer or if it's the first page load
        const isDirectNavigation =
          typeof window !== "undefined" &&
          (document.referrer === "" || document.referrer.includes(window.location.hostname))

        if (initialLocation && isDirectNavigation) {
          const displayLocation = getLocationDisplayName(initialLocation)
          console.log("Using initial location (direct navigation):", displayLocation)
          updateLocation(displayLocation, "initial")
          setGeolocationStatus("success")
          return
        }

        // Priority 3: Try IP-based location detection with timeout
        const ipDetectionPromise = detectLocationByIP()
        const timeoutPromise = new Promise<string>((_, reject) =>
          setTimeout(() => reject(new Error("IP detection timeout")), 3000),
        )

        try {
          const ipLocation = await Promise.race([ipDetectionPromise, timeoutPromise])
          console.log("IP detection result:", ipLocation)

          if (ipLocation && ipLocation !== "Nyack") {
            updateLocation(ipLocation, "ip")
            saveUserLocationPreference(ipLocation, "ip")
            setGeolocationStatus("ip-detected")

            // Update URL with detected location (but don't replace history for shared links)
            if (typeof window !== "undefined" && isDirectNavigation) {
              const newUrl = new URL(window.location.href)
              newUrl.searchParams.set("location", ipLocation.toLowerCase().replace(" ", "-"))
              window.history.replaceState({}, "", newUrl.toString())
            }
            return
          }
        } catch (error) {
          console.log("IP detection failed or timed out:", error)
        }

        // Final fallback: Always default to Nyack
        console.log("Using default location: Nyack")
        updateLocation("Nyack", "default")
        setGeolocationStatus("idle")
      } catch (error) {
        console.error("Location detection error:", error)
        updateLocation("Nyack", "error")
        setGeolocationStatus("error")
      } finally {
        setIsDetectingLocation(false)
        isDetecting.current = false
        hasInitialized.current = true
      }
    }

    // Small delay to prevent immediate execution
    const timer = setTimeout(detectLocation, 100)
    return () => {
      clearTimeout(timer)
      isDetecting.current = false
    }
  }, [initialLocation, updateLocation, getUserLocationPreference, saveUserLocationPreference])

  const requestGPSLocation = useCallback(() => {
    if (isDetecting.current) return

    console.log("GPS location request triggered by user")
    setIsDetectingLocation(true)
    setGeolocationStatus("detecting")
    isDetecting.current = true

    if (!("geolocation" in navigator)) {
      console.log("Geolocation not supported")
      setGeolocationStatus("error")
      setIsDetectingLocation(false)
      isDetecting.current = false
      alert("Your browser doesn't support location detection. Please select your location manually.")
      return
    }

    const successCallback = (position: GeolocationPosition) => {
      try {
        console.log("GPS geolocation success:", position.coords)
        const { latitude, longitude } = position.coords

        // Check if user is within service area
        if (!isWithinServiceArea(latitude, longitude)) {
          console.log("GPS location is outside service area, defaulting to Nyack")
          updateLocation("Nyack", "gps-outside")
          saveUserLocationPreference("Nyack", "gps")
          setGeolocationStatus("success")
          setIsDetectingLocation(false)
          isDetecting.current = false

          // Show helpful message
          alert(
            "We've set your location to Nyack (our main location) since you're outside our service area. You can change this using the location selector above.",
          )
          return
        }

        const nearestLocation = findNearestLocation(latitude, longitude)
        console.log(`GPS - Nearest location: ${nearestLocation}`)

        updateLocation(nearestLocation, "gps")
        saveUserLocationPreference(nearestLocation, "gps")
        setGeolocationStatus("success")

        // Update URL with detected location
        if (typeof window !== "undefined") {
          const newUrl = new URL(window.location.href)
          newUrl.searchParams.set("location", nearestLocation.toLowerCase().replace(" ", "-"))
          window.history.replaceState({}, "", newUrl.toString())
        }
      } catch (error) {
        console.error("Error processing GPS location:", error)
        updateLocation("Nyack", "gps-error")
        setGeolocationStatus("error")
      } finally {
        setIsDetectingLocation(false)
        isDetecting.current = false
      }
    }

    const errorCallback = (error: GeolocationPositionError) => {
      console.log("GPS geolocation error:", error)
      setGeolocationStatus("denied")

      // Always fallback to Nyack when geolocation is denied
      updateLocation("Nyack", "gps-denied")
      saveUserLocationPreference("Nyack", "manual")

      let errorMessage = "Location access was denied. "
      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMessage +=
            "We've set your location to Nyack (our main location). You can change this using the location selector above."
          break
        case error.POSITION_UNAVAILABLE:
          errorMessage +=
            "Your location is currently unavailable. We've set your location to Nyack. You can change this using the location selector above."
          break
        case error.TIMEOUT:
          errorMessage +=
            "Location request timed out. We've set your location to Nyack. You can change this using the location selector above."
          break
      }

      alert(errorMessage)
      setIsDetectingLocation(false)
      isDetecting.current = false
    }

    const options: PositionOptions = {
      enableHighAccuracy: false, // Faster, less accurate
      timeout: 10000, // 10 second timeout
      maximumAge: 300000, // 5 minutes cache
    }

    // Use getCurrentPosition instead of watchPosition to avoid continuous updates
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options)
  }, [updateLocation, saveUserLocationPreference])

  const handleSetCurrentLocation = useCallback(
    (location: string) => {
      updateLocation(location, "manual")
      saveUserLocationPreference(location, "manual")
    },
    [updateLocation, saveUserLocationPreference],
  )

  return {
    currentLocation,
    isDetectingLocation,
    geolocationStatus,
    requestGPSLocation,
    setCurrentLocation: handleSetCurrentLocation,
  }
}
