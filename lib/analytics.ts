// lib/analytics.ts
"use client";

import { GA_MEASUREMENT_ID, FB_PIXEL_ID } from "@/lib/env.client";

// Google Analytics 4 Configuration
export const initGA = () => {
  if (typeof window === "undefined" || !GA_MEASUREMENT_ID) {
    console.log("Skipping GA initialization: window undefined or missing GA_MEASUREMENT_ID");
    return;
  }

  // Prevent re-initialization
  if (window.dataLayer && window.gtag) {
    console.log("Google Analytics already initialized");
    return;
  }

  // Load gtag script
  const script = document.createElement("script");
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.async = true;
  document.head.appendChild(script);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function (...args: any[]) {
    window.dataLayer.push(args);
  };

  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, {
    page_title: document.title,
    page_location: window.location.href,
  });

  console.log("Google Analytics initialized");
};

// Facebook Pixel Configuration
export const initFBPixel = () => {
  if (typeof window === "undefined" || !FB_PIXEL_ID) {
    console.log("Skipping FB Pixel initialization: window undefined or missing FB_PIXEL_ID");
    return;
  }

  // Prevent re-initialization
  if (window.fbq && window.fbq.loaded) {
    console.log("Facebook Pixel already initialized");
    return;
  }

  // Initialize fbq
  window.fbq = function (...args: any[]) {
    (window.fbq.queue = window.fbq.queue || []).push(args);
  };
  window.fbq.push = window.fbq;
  window.fbq.loaded = false;
  window.fbq.version = "2.0";
  window.fbq.queue = [];

  // Load FB Pixel script
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";

  script.onload = () => {
    window.fbq.loaded = true;
    window.fbq("init", FB_PIXEL_ID);
    window.fbq("track", "PageView");
    console.log("Facebook Pixel initialized");
  };

  const firstScript = document.getElementsByTagName("script")[0];
  if (firstScript?.parentNode) {
    firstScript.parentNode.insertBefore(script, firstScript);
  } else {
    document.head.appendChild(script);
  }
};

// Google Analytics Event Tracking
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window === "undefined" || !window.gtag || !GA_MEASUREMENT_ID) {
    console.log("Skipping GA event tracking: window undefined or gtag not initialized");
    return;
  }

  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Facebook Pixel Event Tracking
export const trackFBEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window === "undefined" || !window.fbq || !FB_PIXEL_ID) {
    console.log("Skipping FB event tracking: window undefined or fbq not initialized");
    return;
  }

  window.fbq("track", eventName, parameters);
};

// Combined tracking functions for common events
export const trackQuoteRequest = (location: string, company: string) => {
  trackEvent("quote_request", "lead_generation", location, 1);
  trackFBEvent("Lead", {
    content_name: "Quote Request",
    content_category: "Screen Printing",
    value: 100,
    currency: "USD",
    custom_location: location,
    custom_company: company,
  });
};

export const trackFileUpload = (fileCount: number, location: string) => {
  trackEvent("file_upload", "engagement", location, fileCount);
  trackFBEvent("CustomizeProduct", {
    content_name: "Design File Upload",
    num_items: fileCount,
    custom_location: location,
  });
};

export const trackPhoneClick = (location: string) => {
  trackEvent("phone_click", "contact", location, 1);
  trackFBEvent("Contact", {
    content_name: "Phone Call",
    custom_location: location,
  });
};

export const trackLocationChange = (newLocation: string, method: "gps" | "ip" | "manual") => {
  trackEvent("location_change", "user_behavior", `${newLocation}_${method}`, 1);
  trackFBEvent("Search", {
    search_string: newLocation,
    content_category: "Location",
    custom_method: method,
  });
};

// Page view tracking for SPA navigation
export const trackPageView = (url: string, title: string) => {
  if (typeof window === "undefined") return;

  if (window.gtag && GA_MEASUREMENT_ID) {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_title: title,
      page_location: url,
    });
  }

  if (window.fbq && FB_PIXEL_ID) {
    window.fbq("track", "PageView");
  }
};