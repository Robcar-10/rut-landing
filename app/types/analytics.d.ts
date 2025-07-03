// Global type declarations for analytics
declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
    fbq: {
      (...args: any[]): void
      callMethod?: (...args: any[]) => void
      queue: any[]
      push: any
      loaded: boolean
      version: string
    }
    _fbq: any
  }
}

export {}
