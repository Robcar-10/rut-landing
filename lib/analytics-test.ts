"use client"

// Test utility to verify Google Analytics is working
export const testGoogleAnalytics = () => {
  if (typeof window === "undefined") {
    console.log("❌ Not in browser environment")
    return false
  }

  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  console.log("🔍 Checking GA Measurement ID:", measurementId)

  // Check if gtag script is loaded
  const gtagScript = document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${measurementId}"]`)
  console.log("📜 GA Script loaded:", !!gtagScript)

  // Check if gtag function exists
  console.log("🔧 gtag function exists:", typeof window.gtag === "function")

  // Check if dataLayer exists
  console.log("📊 dataLayer exists:", Array.isArray(window.dataLayer))
  console.log("📊 dataLayer contents:", window.dataLayer)

  // Send a test event
  if (window.gtag) {
    console.log("🧪 Sending test event...")
    window.gtag("event", "test_connection", {
      event_category: "testing",
      event_label: "GA Connection Test",
      value: 1,
    })
    console.log("✅ Test event sent!")
    return true
  } else {
    console.log("❌ gtag function not available")
    return false
  }
}

// Test function to check if GA is receiving events
export const sendTestEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== "undefined" && window.gtag) {
    console.log(`🧪 Sending test event: ${eventName}`, parameters)
    window.gtag("event", eventName, {
      event_category: "testing",
      event_label: "Manual Test",
      ...parameters,
    })
    console.log("✅ Event sent successfully!")
  } else {
    console.log("❌ Google Analytics not available")
  }
}
