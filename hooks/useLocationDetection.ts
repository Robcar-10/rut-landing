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
        // Priority 1: Check URL params or initial location
        const urlParams = new URLSearchParams(window.location.search)
        const urlLocation = urlParams.get("location") || initialLocation

        if (urlLocation) {
          const displayLocation = getLocationDisplayName(urlLocation)
          console.log("Using URL/initial location:", displayLocation)
          updateLocation(displayLocation, "initial")
          setGeolocationStatus("success")
          return
        }

        // Priority 2: Try IP-based location detection with timeout
        const ipDetectionPromise = detectLocationByIP()
        const timeoutPromise = new Promise<string>((_, reject) =>
          setTimeout(() => reject(new Error("IP detection timeout")), 3000),
        )

        try {
          const ipLocation = await Promise.race([ipDetectionPromise, timeoutPromise])
          console.log("IP detection result:", ipLocation)

          if (ipLocation && ipLocation !== "Nyack") {
            updateLocation(ipLocation, "ip")
            setGeolocationStatus("ip-detected")

            // Update URL with detected location
            const newUrl = new URL(window.location.href)
            newUrl.searchParams.set("location", ipLocation.toLowerCase().replace(" ", "-"))
            window.history.replaceState({}, "", newUrl.toString())
            return
          }
        } catch (error) {
          console.log("IP detection failed or timed out:", error)
        }

        // Final fallback: Default to Nyack
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
  }, [initialLocation, updateLocation]) // Stable dependencies

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
          setGeolocationStatus("success")
          setIsDetectingLocation(false)
          isDetecting.current = false
          return
        }

        const nearestLocation = findNearestLocation(latitude, longitude)
        console.log(`GPS - Nearest location: ${nearestLocation}`)

        updateLocation(nearestLocation, "gps")
        setGeolocationStatus("success")

        // Update URL with detected location
        const newUrl = new URL(window.location.href)
        newUrl.searchParams.set("location", nearestLocation.toLowerCase().replace(" ", "-"))
        window.history.replaceState({}, "", newUrl.toString())
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

      let errorMessage = "Location access was denied. "
      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMessage += "Please enable location access in your browser settings or select your location manually."
          break
        case error.POSITION_UNAVAILABLE:
          errorMessage += "Your location is currently unavailable. Please select your location manually."
          break
        case error.TIMEOUT:
          errorMessage += "Location request timed out. Please select your location manually."
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
  }, [updateLocation])

  const handleSetCurrentLocation = useCallback(
    (location: string) => {
      updateLocation(location, "manual")
    },
    [updateLocation],
  )

  return {
    currentLocation,
    isDetectingLocation,
    geolocationStatus,
    requestGPSLocation,
    setCurrentLocation: handleSetCurrentLocation,
  }
}
