"use client"

// Google Analytics 4 Configuration
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

// Facebook Pixel Configuration
export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window === "undefined" || !GA_MEASUREMENT_ID) return

  // Load gtag script
  const script = document.createElement("script")
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  script.async = true
  document.head.appendChild(script)

  // Initialize gtag
  window.dataLayer = window.dataLayer || []
  function gtag(...args: any[]) {
    window.dataLayer.push(args)
  }
  window.gtag = gtag

  gtag("js", new Date())
  gtag("config", GA_MEASUREMENT_ID, {
    page_title: document.title,
    page_location: window.location.href,
  })

  console.log("Google Analytics initialized")
}

// Initialize Facebook Pixel - Completely rewritten to avoid arguments
export const initFBPixel = () => {
  if (typeof window === "undefined" || !FB_PIXEL_ID) return

  // Check if already initialized
  if (window.fbq) {
    console.log("Facebook Pixel already initialized")
    return
  }

  // Create a simple fbq function that handles the queue
  const fbqQueue: any[] = []

  window.fbq = (...args: any[]) => {
    if (window.fbq.loaded && window._fbq) {
      return window._fbq.apply(window._fbq, args)
    } else {
      fbqQueue.push(args)
    }
  }

  // Set up fbq properties
  window.fbq.push = window.fbq
  window.fbq.loaded = false
  window.fbq.version = "2.0"
  window.fbq.queue = fbqQueue

  // Load the Facebook Pixel script
  const script = document.createElement("script")
  script.async = true
  script.src = "https://connect.facebook.net/en_US/fbevents.js"

  script.onload = () => {
    // Process queued calls after script loads
    window.fbq.loaded = true
    if (window._fbq) {
      fbqQueue.forEach((args) => {
        window._fbq.apply(window._fbq, args)
      })
      fbqQueue.length = 0
    }
  }

  const firstScript = document.getElementsByTagName("script")[0]
  if (firstScript && firstScript.parentNode) {
    firstScript.parentNode.insertBefore(script, firstScript)
  } else {
    document.head.appendChild(script)
  }

  // Initialize the pixel
  window.fbq("init", FB_PIXEL_ID)
  window.fbq("track", "PageView")

  console.log("Facebook Pixel initialized")
}

// Google Analytics Event Tracking
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window === "undefined" || !window.gtag) return

  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}

// Facebook Pixel Event Tracking
export const trackFBEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window === "undefined" || !window.fbq) return

  window.fbq("track", eventName, parameters)
}

// Combined tracking functions for common events
export const trackQuoteRequest = (location: string, company: string) => {
  // Google Analytics
  trackEvent("quote_request", "lead_generation", location, 1)

  // Facebook Pixel
  trackFBEvent("Lead", {
    content_name: "Quote Request",
    content_category: "Screen Printing",
    value: 100, // Estimated lead value
    currency: "USD",
    custom_location: location,
    custom_company: company,
  })
}

export const trackFileUpload = (fileCount: number, location: string) => {
  // Google Analytics
  trackEvent("file_upload", "engagement", location, fileCount)

  // Facebook Pixel
  trackFBEvent("CustomizeProduct", {
    content_name: "Design File Upload",
    num_items: fileCount,
    custom_location: location,
  })
}

export const trackPhoneClick = (location: string) => {
  // Google Analytics
  trackEvent("phone_click", "contact", location, 1)

  // Facebook Pixel
  trackFBEvent("Contact", {
    content_name: "Phone Call",
    custom_location: location,
  })
}

export const trackLocationChange = (newLocation: string, method: "gps" | "ip" | "manual") => {
  // Google Analytics
  trackEvent("location_change", "user_behavior", `${newLocation}_${method}`, 1)

  // Facebook Pixel
  trackFBEvent("Search", {
    search_string: newLocation,
    content_category: "Location",
    custom_method: method,
  })
}

// Page view tracking for SPA navigation
export const trackPageView = (url: string, title: string) => {
  // Google Analytics
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_title: title,
      page_location: url,
    })
  }

  // Facebook Pixel
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "PageView")
  }
}
