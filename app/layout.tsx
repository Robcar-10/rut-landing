import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { CanonicalUrl } from "@/components/CanonicalUrl"
import { UrlCleaner } from "@/components/UrlCleaner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Nyack Screen Printing | Custom T-Shirts & Embroidery in Rockland County, NY",
    template: "%s | Nyack Screen Printing",
  },
  description:
    "Professional screen printing, embroidery, and custom apparel services in Nyack, NY. Serving Rockland County with fast turnaround and competitive prices. Call (845) 358-2037.",
  keywords:
    "screen printing, embroidery, custom t-shirts, Nyack NY, Rockland County, custom apparel, promotional products",
  authors: [{ name: "Nyack Screen Printing" }],
  creator: "Nyack Screen Printing",
  publisher: "Nyack Screen Printing",
  metadataBase: new URL("https://nyackscreenprinting.com"),
  alternates: {
    canonical: "https://nyackscreenprinting.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nyackscreenprinting.com",
    siteName: "Nyack Screen Printing",
    title: "Nyack Screen Printing | Custom T-Shirts & Embroidery in Rockland County, NY",
    description:
      "Professional screen printing, embroidery, and custom apparel services in Nyack, NY. Serving Rockland County with fast turnaround and competitive prices.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nyack Screen Printing | Custom T-Shirts & Embroidery in Rockland County, NY",
    description:
      "Professional screen printing, embroidery, and custom apparel services in Nyack, NY. Serving Rockland County with fast turnaround and competitive prices.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CanonicalUrl url="https://nyackscreenprinting.com" />
        <UrlCleaner />
        {children}
      </body>
    </html>
  )
}
