"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, Cookie, Shield, BarChart3 } from "lucide-react"

interface CookieConsentProps {
  onAccept: (preferences: CookiePreferences) => void
}

interface CookiePreferences {
  essential: boolean
  analytics: boolean
  marketing: boolean
}

export const CookieConsent = ({ onAccept }: CookieConsentProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true, // Always required
    analytics: false,
    marketing: false,
  })

  useEffect(() => {
    console.log("CookieConsent component mounted")

    // Check if user has already made a choice
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      // Show banner after a short delay
      const timer = setTimeout(() => setIsVisible(true), 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAcceptAll = () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      marketing: true,
    }
    localStorage.setItem("cookie-consent", JSON.stringify(allAccepted))
    onAccept(allAccepted)
    setIsVisible(false)
  }

  const handleAcceptSelected = () => {
    localStorage.setItem("cookie-consent", JSON.stringify(preferences))
    onAccept(preferences)
    setIsVisible(false)
  }

  const handleRejectAll = () => {
    const essentialOnly = {
      essential: true,
      analytics: false,
      marketing: false,
    }
    localStorage.setItem("cookie-consent", JSON.stringify(essentialOnly))
    onAccept(essentialOnly)
    setIsVisible(false)
  }

  console.log("CookieConsent render - isVisible:", isVisible)

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-2 sm:p-4">
      <Card className="max-w-2xl sm:max-w-4xl mx-auto bg-white/80 backdrop-blur-md border border-white/20 shadow-2xl">
        <CardContent className="p-3 sm:p-6">
          <div className="flex items-start gap-2 sm:gap-4">
            <Cookie className="w-4 h-4 sm:w-6 sm:h-6 text-purple-600 flex-shrink-0 mt-1" />

            <div className="flex-1 min-w-0">
              <h3 className="text-sm sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">We Value Your Privacy</h3>

              {!showDetails ? (
                <>
                  <p className="text-xs sm:text-base text-gray-600 mb-2 sm:mb-4 leading-tight sm:leading-normal">
                    We use cookies to improve your experience on our site and to show you relevant advertising. By
                    clicking "Accept All", you consent to our use of cookies.
                  </p>

                  <div className="flex flex-wrap gap-1 sm:gap-3">
                    <Button
                      onClick={handleAcceptAll}
                      className="bg-purple-600 hover:bg-purple-700 text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2 h-auto"
                    >
                      Accept All
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleRejectAll}
                      className="bg-transparent text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2 h-auto"
                    >
                      Reject All
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => setShowDetails(true)}
                      className="text-purple-600 text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2 h-auto"
                    >
                      Customize
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-xs sm:text-base text-gray-600 mb-2 sm:mb-4 leading-tight sm:leading-normal">
                    Choose which cookies you'd like to accept. You can change these settings at any time.
                  </p>

                  <div className="space-y-2 sm:space-y-4 mb-3 sm:mb-6">
                    {/* Essential Cookies */}
                    <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded-lg">
                      <Shield className="w-3 h-3 sm:w-5 sm:h-5 text-green-600 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-gray-900 text-xs sm:text-base">Essential Cookies</h4>
                          <span className="text-xs text-gray-500">Always Active</span>
                        </div>
                        <p className="text-xs text-gray-600 mt-1 leading-tight">
                          Required for the website to function properly. These cannot be disabled.
                        </p>
                      </div>
                    </div>

                    {/* Analytics Cookies */}
                    <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 border rounded-lg">
                      <BarChart3 className="w-3 h-3 sm:w-5 sm:h-5 text-blue-600 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-gray-900 text-xs sm:text-base">Analytics Cookies</h4>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={preferences.analytics}
                              onChange={(e) =>
                                setPreferences((prev) => ({
                                  ...prev,
                                  analytics: e.target.checked,
                                }))
                              }
                              className="sr-only peer"
                            />
                            <div className="w-8 h-4 sm:w-11 sm:h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 sm:peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 sm:after:h-5 sm:after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                          </label>
                        </div>
                        <p className="text-xs text-gray-600 mt-1 leading-tight">
                          Help us understand how visitors use our website to improve user experience.
                        </p>
                      </div>
                    </div>

                    {/* Marketing Cookies */}
                    <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 border rounded-lg">
                      <Cookie className="w-3 h-3 sm:w-5 sm:h-5 text-orange-600 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-gray-900 text-xs sm:text-base">Marketing Cookies</h4>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={preferences.marketing}
                              onChange={(e) =>
                                setPreferences((prev) => ({
                                  ...prev,
                                  marketing: e.target.checked,
                                }))
                              }
                              className="sr-only peer"
                            />
                            <div className="w-8 h-4 sm:w-11 sm:h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 sm:peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 sm:after:h-5 sm:after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                          </label>
                        </div>
                        <p className="text-xs text-gray-600 mt-1 leading-tight">
                          Used to show you relevant ads and measure the effectiveness of our advertising campaigns.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 sm:gap-3">
                    <Button
                      onClick={handleAcceptSelected}
                      className="bg-purple-600 hover:bg-purple-700 text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2 h-auto"
                    >
                      Save Preferences
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowDetails(false)}
                      className="bg-transparent text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2 h-auto"
                    >
                      Back
                    </Button>
                  </div>
                </>
              )}
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsVisible(false)}
              className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 p-1"
            >
              <X className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
