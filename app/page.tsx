import type { Metadata } from "next"
import LocationLanding from "../components/location-landing"

export const metadata: Metadata = {
  alternates: {
    canonical: "https://nyackscreenprinting.com",
  },
  openGraph: {
    url: "https://nyackscreenprinting.com",
  },
}

export default function Page() {
  return <LocationLanding />
}