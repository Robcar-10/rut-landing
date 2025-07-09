"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { testGoogleAnalytics, sendTestEvent } from "@/lib/analytics-test"
import { useCookieConsent } from "@/hooks/useCookieConsent"

export const AnalyticsDebug = () => {
  const [debugInfo, setDebugInfo] = useState<any>({})
  const [isVisible, setIsVisible] = useState(false)
  const { hasConsent } = useCookieConsent()

  useEffect(() => {
    // Only show in development or when specifically enabled
    const isDev = process.env.NODE_ENV === "development"
    const showDebug = localStorage.getItem("show-analytics-debug") === "true"
    setIsVisible(isDev || showDebug)
  }, [])

  const runDiagnostics = () => {
    const info = {
      measurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
      hasConsent: hasConsent("analytics"),
      gtagExists: typeof window !== "undefined" && typeof window.gtag === "function",
      dataLayerExists: typeof window !== "undefined" && Array.isArray(window.dataLayer),
      scriptsLoaded:
        typeof window !== "undefined" ? !!document.querySelector(`script[src*="googletagmanager.com"]`) : false,
      timestamp: new Date().toISOString(),
    }

    setDebugInfo(info)
    console.log("🔍 Analytics Diagnostics:", info)

    // Run the test
    testGoogleAnalytics()
  }

  const testEvents = () => {
    sendTestEvent("debug_test", { test_type: "manual_trigger" })
    sendTestEvent("page_view_test", { page_title: "Debug Test Page" })
    sendTestEvent("button_click_test", { button_name: "Test Button" })
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <Card className="bg-white shadow-lg border-2 border-blue-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center justify-between">
            🔍 GA Debug
            <Button variant="ghost" size="sm" onClick={() => setIsVisible(false)} className="h-6 w-6 p-0">
              ×
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <Button size="sm" onClick={runDiagnostics} className="text-xs">
              Run Test
            </Button>
            <Button size="sm" variant="outline" onClick={testEvents} className="text-xs bg-transparent">
              Send Events
            </Button>
          </div>

          {debugInfo.measurementId && (
            <div className="text-xs space-y-1 bg-gray-50 p-2 rounded">
              <div>ID: {debugInfo.measurementId}</div>
              <div>Consent: {debugInfo.hasConsent ? "✅" : "❌"}</div>
              <div>gtag: {debugInfo.gtagExists ? "✅" : "❌"}</div>
              <div>Script: {debugInfo.scriptsLoaded ? "✅" : "❌"}</div>
            </div>
          )}

          <div className="text-xs text-gray-500">Check browser console for details</div>
        </CardContent>
      </Card>
    </div>
  )
}
