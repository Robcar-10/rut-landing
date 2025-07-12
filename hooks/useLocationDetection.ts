"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { locations, findNearestLocation, type LocationInfo } from "@/lib/location-utils"

export interface GeolocationStatus {
  supported: boolean
  permission: "granted" | "denied" | "prompt" | "unknown"
  error: string | null
}

export function useLocationDetection() {
  const [currentLocation, setCurrentLocation] = useState<LocationInfo>(locations[0]) // Default to first location
  const [isDetectingLocation, setIsDetectingLocation] = useState(false)
  const [geolocationStatus, setGeolocationStatus] = useState<GeolocationStatus>({
    supported: false,
    permission: "unknown",
    error: null,
  })

  const watchIdRef = useRef<number | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isRequestingRef = useRef(false)

  // Check geolocation support and permissions
  useEffect(() => {
    const checkGeolocationSupport = async () => {
      if (!navigator.geolocation) {
        setGeolocationStatus({
          supported: false,
          permission: "unknown",
          error: "Geolocation is not supported by this browser",
        })
        return
      }

      setGeolocationStatus((prev) => ({
        ...prev,
        supported: true,
      }))

      // Check permissions if available
      if ("permissions" in navigator) {
        try {
          const permission = await navigator.permissions.query({ name: "geolocation" })
          setGeolocationStatus((prev) => ({
            ...prev,
            permission: permission.state as "granted" | "denied" | "prompt",
          }))

          // Listen for permission changes
          permission.addEventListener("change", () => {
            setGeolocationStatus((prev) => ({
              ...prev,
              permission: permission.state as "granted" | "denied" | "prompt",
            }))
          })
        } catch (error) {
          console.warn("Could not query geolocation permission:", error)
        }
      }
    }

    checkGeolocationSupport()
  }, [])

  // Cleanup function
  const stopDetecting = useCallback(() => {
    setIsDetectingLocation(false)
    isRequestingRef.current = false

    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current)
      watchIdRef.current = null
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  // Request GPS location
  const requestGPSLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setGeolocationStatus((prev) => ({
        ...prev,
        error: "Geolocation is not supported by this browser",
      }))
      return
    }

    if (isRequestingRef.current) {
      return // Prevent multiple simultaneous requests
    }

    isRequestingRef.current = true
    setIsDetectingLocation(true)
    setGeolocationStatus((prev) => ({ ...prev, error: null }))

    // Set a timeout to ensure we don't get stuck
    timeoutRef.current = setTimeout(() => {
      stopDetecting()
      setGeolocationStatus((prev) => ({
        ...prev,
        error: "Location request timed out. Please try again.",
      }))
    }, 15000) // 15 second timeout

    const options = {
      enableHighAccuracy: true,
      timeout: 10000, // 10 second timeout
      maximumAge: 300000, // 5 minutes cache
    }

    const successCallback = (position: GeolocationPosition) => {
      try {
        const { latitude, longitude } = position.coords
        const nearestLocation = findNearestLocation(latitude, longitude)

        if (nearestLocation) {
          setCurrentLocation(nearestLocation)
          setGeolocationStatus((prev) => ({
            ...prev,
            permission: "granted",
            error: null,
          }))
        } else {
          setGeolocationStatus((prev) => ({
            ...prev,
            error: "Could not find a nearby service location",
          }))
        }
      } catch (error) {
        console.error("Error processing location:", error)
        setGeolocationStatus((prev) => ({
          ...prev,
          error: "Error processing your location",
        }))
      } finally {
        stopDetecting()
      }
    }

    const errorCallback = (error: GeolocationPositionError) => {
      let errorMessage = "Unable to retrieve your location"
      let permission: "granted" | "denied" | "prompt" | "unknown" = "unknown"

      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMessage = "Location access denied. Please enable location services and try again."
          permission = "denied"
          break
        case error.POSITION_UNAVAILABLE:
          errorMessage = "Location information is unavailable. Please try again."
          break
        case error.TIMEOUT:
          errorMessage = "Location request timed out. Please try again."
          break
        default:
          errorMessage = "An unknown error occurred while retrieving location."
          break
      }

      setGeolocationStatus((prev) => ({
        ...prev,
        permission,
        error: errorMessage,
      }))

      stopDetecting()
    }

    // Use getCurrentPosition instead of watchPosition to avoid continuous updates
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options)
  }, [stopDetecting])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopDetecting()
    }
  }, [stopDetecting])

  // Auto-detect location on mount (optional)
  const autoDetectLocation = useCallback(() => {
    if (geolocationStatus.supported && geolocationStatus.permission === "granted") {
      requestGPSLocation()
    }
  }, [geolocationStatus.supported, geolocationStatus.permission, requestGPSLocation])

  return {
    currentLocation,
    setCurrentLocation,
    isDetectingLocation,
    geolocationStatus,
    requestGPSLocation,
    autoDetectLocation,
    stopDetecting,
  }
}
