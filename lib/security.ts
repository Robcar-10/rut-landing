// Security utilities and validation functions

// Rate limiting for client-side
class RateLimiter {
  private requests: Map<string, number[]> = new Map()

  isAllowed(key: string, maxRequests: number, windowMs: number): boolean {
    const now = Date.now()
    const requests = this.requests.get(key) || []

    // Remove old requests outside the window
    const validRequests = requests.filter((time) => now - time < windowMs)

    if (validRequests.length >= maxRequests) {
      return false
    }

    validRequests.push(now)
    this.requests.set(key, validRequests)
    return true
  }

  reset(key: string) {
    this.requests.delete(key)
  }
}

export const rateLimiter = new RateLimiter()

// Input sanitization
export const sanitizeInput = (input: string): string => {
  if (typeof input !== "string") return ""

  return input
    .trim()
    .replace(/[<>]/g, "") // Remove potential HTML tags
    .replace(/javascript:/gi, "") // Remove javascript: protocol
    .replace(/on\w+=/gi, "") // Remove event handlers
    .substring(0, 1000) // Limit length
}

// Email validation (more strict than basic regex)
export const isValidEmail = (email: string): boolean => {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

  if (!emailRegex.test(email)) return false
  if (email.length > 254) return false
  if (email.split("@")[0].length > 64) return false

  return true
}

// Phone number validation
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
  const cleanPhone = phone.replace(/[\s\-$$$$.]/g, "")
  return phoneRegex.test(cleanPhone) && cleanPhone.length >= 10 && cleanPhone.length <= 16
}

// File validation
export const validateFile = (file: File): { isValid: boolean; error?: string } => {
  const maxSize = 30 * 1024 * 1024 // 30MB
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/svg+xml",
    "application/pdf",
    "application/postscript", // .eps
    "application/illustrator", // .ai
    "image/vnd.adobe.photoshop", // .psd
  ]

  // Check file size
  if (file.size > maxSize) {
    return { isValid: false, error: "File size must be less than 30MB" }
  }

  // Check file type
  const isValidType = allowedTypes.some((type) => file.type === type || file.type.includes(type.split("/")[1]))

  if (!isValidType) {
    return {
      isValid: false,
      error: "File type not supported. Please use JPG, PNG, GIF, PDF, AI, EPS, PSD, or SVG files.",
    }
  }

  // Check file name for suspicious patterns
  const suspiciousPatterns = [
    /\.php$/i,
    /\.exe$/i,
    /\.bat$/i,
    /\.sh$/i,
    /\.cmd$/i,
    /\.scr$/i,
    /\.js$/i,
    /\.html$/i,
    /\.htm$/i,
  ]

  if (suspiciousPatterns.some((pattern) => pattern.test(file.name))) {
    return { isValid: false, error: "File type not allowed for security reasons." }
  }

  return { isValid: true }
}

// Generate CSRF token (client-side only)
export const generateCSRFToken = (): string => {
  if (typeof window === "undefined") return ""

  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("")
}

// Content Security Policy headers (for server-side) - REMOVED "use client"
export const getCSPHeader = (): string => {
  return [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://connect.facebook.net https://www.google-analytics.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https: blob:",
    "media-src 'self' https:",
    "connect-src 'self' https://www.google-analytics.com https://ipapi.co https://res.cloudinary.com",
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "upgrade-insecure-requests",
  ].join("; ")
}

// Environment variable validation
export const validateEnvVars = () => {
  const required = [
    "RESEND_API_KEY",
    "SENDER_EMAIL",
    "GOOGLE_USER",
    "CLOUDINARY_CLOUD_NAME",
    "CLOUDINARY_API_KEY",
    "CLOUDINARY_API_SECRET",
  ]

  const missing = required.filter((key) => !process.env[key])

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`)
  }
}

// Honeypot field for forms (anti-bot) - Client-side only
export const createHoneypot = () => {
  if (typeof window === "undefined") {
    return {
      name: "website",
      style: {},
    }
  }

  return {
    name: "website", // Common field name bots might fill
    style: {
      position: "absolute" as const,
      left: "-9999px",
      top: "-9999px",
      opacity: 0,
      pointerEvents: "none" as const,
      tabIndex: -1,
    },
  }
}
