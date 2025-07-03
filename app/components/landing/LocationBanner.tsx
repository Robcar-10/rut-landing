"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { MapPin, ChevronDown } from "lucide-react"
import { locations } from "@/lib/location-utils"
import type { GeolocationStatus } from "@/hooks/useLocationDetection"

interface LocationBannerProps {
  currentLocation: string
  isDetectingLocation: boolean
  geolocationStatus: GeolocationStatus
  onRequestGPSLocation: () => void
  onLocationSelect: (location: string) => void
}

export const LocationBanner = ({
  currentLocation,
  isDetectingLocation,
  geolocationStatus,
  onRequestGPSLocation,
  onLocationSelect,
}: LocationBannerProps) => {
  const [showLocationSelector, setShowLocationSelector] = useState(false)

  return (
    <div className="bg-purple-600 text-white py-3 px-4 sm:px-6">
      <div className="container mx-auto">
        {isDetectingLocation ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span className="font-medium text-sm sm:text-base">Detecting your location...</span>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span className="font-medium text-sm sm:text-base text-center sm:text-left">
                Now Serving {currentLocation} & Surrounding Areas
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                onClick={onRequestGPSLocation}
                size="sm"
                className="bg-white/20 hover:bg-white/30 text-white border-white/30 text-xs px-2 py-1"
                disabled={isDetectingLocation}
              >
                📍 Use My Location
              </Button>

              <div className="relative">
                <Button
                  onClick={() => setShowLocationSelector(!showLocationSelector)}
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30 text-xs px-2 py-1 flex items-center gap-1"
                >
                  Change <ChevronDown className="w-3 h-3" />
                </Button>

                {showLocationSelector && (
                  <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border max-h-60 overflow-y-auto z-50 min-w-48">
                    {locations.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => {
                          onLocationSelect(loc)
                          setShowLocationSelector(false)
                        }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-purple-50 ${
                          currentLocation === loc ? "bg-purple-100 text-purple-700 font-medium" : "text-gray-700"
                        }`}
                      >
                        {loc}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
