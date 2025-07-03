// Global type declarations for analytics
declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
    fbq: {
      (...args: any[]): void
      push: any
      loaded: boolean
      version: string
      queue: any[]
    }
    _fbq: any
  }
}

export {}
