"use client"

import { useState, useEffect } from "react"
import {
  findNearestLocation,
  detectLocationByIP,
  isWithinServiceArea,
  getLocationDisplayName,
  isValidServiceLocation,
} from "@/lib/location-utils"

export type GeolocationStatus = "detecting" | "success" | "denied" | "error" | "ip-detected"

export interface UseLocationDetectionReturn {
  currentLocation: string
  isDetectingLocation: boolean
  geolocationStatus: GeolocationStatus
  requestGPSLocation: () => void
  setCurrentLocation: (location: string) => void
}

export const useLocationDetection = (initialLocation?: string): UseLocationDetectionReturn => {
  const [currentLocation, setCurrentLocation] = useState("Nyack")
  const [isDetectingLocation, setIsDetectingLocation] = useState(true)
  const [geolocationStatus, setGeolocationStatus] = useState<GeolocationStatus>("detecting")

  useEffect(() => {
    const detectLocation = async () => {
      console.log("Starting location detection...")
      setIsDetectingLocation(true)
      setGeolocationStatus("detecting")

      // Priority 1: Check URL params (highest priority for ads)
      const urlParams = new URLSearchParams(window.location.search)
      const urlLocation = urlParams.get("location") || initialLocation

      if (urlLocation) {
        const displayLocation = getLocationDisplayName(urlLocation)
        console.log("Using URL location:", displayLocation)
        setCurrentLocation(displayLocation)
        setIsDetectingLocation(false)
        setGeolocationStatus("success")
        return
      }

      // Priority 2: Try IP-based location detection
      try {
        const ipLocation = await detectLocationByIP()
        console.log("IP detection result:", ipLocation)

        if (ipLocation && ipLocation !== "Nyack") {
          setCurrentLocation(ipLocation)
          setGeolocationStatus("ip-detected")
          setIsDetectingLocation(false)

          // Update URL with detected location
          const newUrl = new URL(window.location.href)
          newUrl.searchParams.set("location", ipLocation.toLowerCase().replace(" ", "-"))
          window.history.replaceState({}, "", newUrl.toString())
          return
        }
      } catch (error) {
        console.log("IP detection failed, continuing to fallback...")
      }

      // Final fallback: Default to Nyack
      console.log("Using default location: Nyack")
      setCurrentLocation("Nyack")
      setGeolocationStatus("error")
      setIsDetectingLocation(false)
    }

    const timer = setTimeout(detectLocation, 500)
    return () => clearTimeout(timer)
  }, [initialLocation])

  const requestGPSLocation = () => {
    console.log("GPS location request triggered by user")
    setIsDetectingLocation(true)
    setGeolocationStatus("detecting")

    if (!("geolocation" in navigator)) {
      console.log("Geolocation not supported")
      setGeolocationStatus("error")
      setIsDetectingLocation(false)
      alert("Your browser doesn't support location detection. Please select your location manually.")
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("GPS geolocation success:", position.coords)
        const { latitude, longitude } = position.coords

        console.log(`GPS - User location: ${latitude}, ${longitude}`)

        // Check if user is within service area - if not, silently default to Nyack
        if (!isWithinServiceArea(latitude, longitude)) {
          console.log("GPS location is outside service area, defaulting to Nyack")
          setCurrentLocation("Nyack")
          setGeolocationStatus("success")
          setIsDetectingLocation(false)
          return
        }

        const nearestLocation = findNearestLocation(latitude, longitude)
        console.log(`GPS - Nearest location: ${nearestLocation}`)

        setCurrentLocation(nearestLocation)
        setGeolocationStatus("success")
        setIsDetectingLocation(false)

        // Update URL with detected location
        const newUrl = new URL(window.location.href)
        newUrl.searchParams.set("location", nearestLocation.toLowerCase().replace(" ", "-"))
        window.history.replaceState({}, "", newUrl.toString())
      },
      (error) => {
        console.log("GPS geolocation error:", error)
        setGeolocationStatus("denied")
        setIsDetectingLocation(false)

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
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      },
    )
  }

  const handleSetCurrentLocation = (location: string) => {
    if (isValidServiceLocation(location)) {
      setCurrentLocation(location)
    } else {
      console.log(`Invalid location selected: ${location}, defaulting to Nyack`)
      setCurrentLocation("Nyack")
    }
  }

  return {
    currentLocation,
    isDetectingLocation,
    geolocationStatus,
    requestGPSLocation,
    setCurrentLocation: handleSetCurrentLocation,
  }
}
