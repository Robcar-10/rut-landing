import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { UrlCleaner } from "@/components/UrlCleaner"
import { CanonicalUrl } from "@/components/CanonicalUrl"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://nyackscreenprinting.com"),
  title: {
    default: "Nyack Screen Printing | Custom T-Shirts & Embroidery in Rockland County, NY",
    template: "%s | Nyack Screen Printing",
  },
  description:
    "Professional screen printing and embroidery services in Nyack, NY. Custom t-shirts, hoodies, uniforms, and promotional items. Serving Rockland County, Westchester, and Bergen County NJ.",
  keywords: [
    "screen printing Nyack NY",
    "custom t-shirts Rockland County",
    "embroidery services NY",
    "promotional products Nyack",
    "custom apparel printing",
    "business uniforms NY",
    "team jerseys Rockland County",
    "custom hoodies NY",
    "local screen printing",
    "custom decals NY",
  ],
  authors: [{ name: "Nyack Screen Printing" }],
  creator: "Nyack Screen Printing",
  publisher: "Nyack Screen Printing",
  alternates: {
    canonical: "https://nyackscreenprinting.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nyackscreenprinting.com",
    siteName: "Nyack Screen Printing",
    title: "Nyack Screen Printing | Custom T-Shirts & Embroidery",
    description:
      "Professional screen printing and embroidery services in Nyack, NY. Custom t-shirts, hoodies, uniforms, and promotional items.",
    images: [
      {
        url: "/images/custom-screen-printing-nyack.png",
        width: 1200,
        height: 630,
        alt: "Nyack Screen Printing - Custom T-Shirts and Embroidery Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nyack Screen Printing | Custom T-Shirts & Embroidery",
    description: "Professional screen printing and embroidery services in Nyack, NY.",
    images: ["/images/custom-screen-printing-nyack.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <CanonicalUrl />
      </head>
      <body className={inter.className}>
        <UrlCleaner />
        {children}
      </body>
    </html>
  )
}
