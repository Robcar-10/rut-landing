import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { UrlCleaner } from "@/components/UrlCleaner"
import { LocalBusinessSchema } from "@/components/LocalBusinessSchema"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Nyack Screen Printing | Custom T-Shirts & Apparel in Rockland County",
    template: "%s | Nyack Screen Printing",
  },
  description:
    "Professional screen printing and custom apparel services in Nyack, NY and surrounding areas. High-quality t-shirts, uniforms, and promotional products with fast turnaround.",
  keywords: [
    "screen printing Nyack NY",
    "custom t-shirts Rockland County",
    "apparel printing",
    "team uniforms",
    "corporate apparel",
    "embroidery services",
  ],
  authors: [{ name: "Nyack Screen Printing" }],
  creator: "Nyack Screen Printing",
  publisher: "Nyack Screen Printing",
  metadataBase: new URL("https://nyackscreenprinting.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Nyack Screen Printing",
    title: "Nyack Screen Printing | Custom T-Shirts & Apparel in Rockland County",
    description:
      "Professional screen printing and custom apparel services in Nyack, NY and surrounding areas.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nyack Screen Printing - Custom T-Shirts & Apparel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nyack Screen Printing | Custom T-Shirts & Apparel",
    description:
      "Professional screen printing and custom apparel services in Nyack, NY and surrounding areas.",
    images: ["/images/twitter-image.jpg"],
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
  // Replace with your real code from Google Search Console, or remove this block:
  // verification: {
  //   google: "YOUR_REAL_CODE_HERE",
  // },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LocalBusinessSchema />
        <UrlCleaner />
        {children}
      </body>
    </html>
  )
}