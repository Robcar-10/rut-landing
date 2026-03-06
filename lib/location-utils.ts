export interface LocationCoords {
  name: string
  lat: number
  lng: number
}

export const locations = [
  // Rockland County
  "Ramapo", "Clarkstown", "Orangetown", "Haverstraw", "New City",
  "Spring Valley", "Monsey", "Nanuet", "Pearl River", "Stony Point",
  "West Haverstraw", "Valley Cottage", "Congers", "Blauvelt", "West Nyack",
  "Piermont", "Upper Nyack",
  // Westchester County
  "Ossining", "Sleepy Hollow", "Tarrytown", "Dobbs Ferry", "Irvington",
  // Bergen County, NJ
  "Montvale", "Westwood", "Hillsdale", "Northvale",
]

// Single source of truth for all URL slugs.
// Used by: generateStaticParams, sitemap.ts, NearbyTownsSection, location-content.ts
export const locationSlugs: string[] = [
  // Rockland County
  "ramapo", "clarkstown", "orangetown", "haverstraw", "new-city",
  "spring-valley", "monsey", "nanuet", "pearl-river", "stony-point",
  "west-haverstraw", "valley-cottage", "congers", "blauvelt", "west-nyack",
  "piermont", "upper-nyack",
  // Westchester County
  "ossining", "sleepy-hollow", "tarrytown", "dobbs-ferry", "irvington",
  // Bergen County, NJ
  "montvale", "westwood", "hillsdale", "northvale",
]

export const locationCoords: LocationCoords[] = [
  { name: "Ramapo", lat: 41.1387, lng: -74.1432 },
  { name: "Clarkstown", lat: 41.1087, lng: -73.9626 },
  { name: "Orangetown", lat: 41.0487, lng: -73.9526 },
  { name: "Haverstraw", lat: 41.1959, lng: -73.9665 },
  { name: "New City", lat: 41.1476, lng: -73.9893 },
  { name: "Spring Valley", lat: 41.1126, lng: -74.0438 },
  { name: "Monsey", lat: 41.1087, lng: -74.0687 },
  { name: "Nanuet", lat: 41.0887, lng: -74.0135 },
  { name: "Pearl River", lat: 41.0587, lng: -74.0218 },
  { name: "Stony Point", lat: 41.2309, lng: -73.9876 },
  { name: "West Haverstraw", lat: 41.2087, lng: -73.9832 },
  { name: "Valley Cottage", lat: 41.1176, lng: -73.9443 },
  { name: "Congers", lat: 41.1459, lng: -73.9443 },
  { name: "Blauvelt", lat: 41.0626, lng: -73.9565 },
  { name: "West Nyack", lat: 41.0976, lng: -73.9726 },
  { name: "Piermont", lat: 41.0387, lng: -73.9176 },
  { name: "Upper Nyack", lat: 41.1087, lng: -73.9176 },
  { name: "Ossining", lat: 41.1626, lng: -73.8615 },
  { name: "Sleepy Hollow", lat: 41.0876, lng: -73.8587 },
  { name: "Tarrytown", lat: 41.0762, lng: -73.8587 },
  { name: "Dobbs Ferry", lat: 41.0137, lng: -73.8726 },
  { name: "Irvington", lat: 41.0387, lng: -73.8726 },
  { name: "Montvale", lat: 41.0476, lng: -74.0365 },
  { name: "Westwood", lat: 40.9887, lng: -74.0326 },
  { name: "Hillsdale", lat: 41.0026, lng: -74.0426 },
  { name: "Northvale", lat: 41.0176, lng: -74.0426 },
]

export const NYACK_COORDS = { lat: 41.0909, lng: -73.9176 }
export const SERVICE_RADIUS_MILES = 15

export const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
  const R = 3959
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2)
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export const isWithinServiceArea = (userLat: number, userLng: number): boolean =>
  calculateDistance(userLat, userLng, NYACK_COORDS.lat, NYACK_COORDS.lng) <= SERVICE_RADIUS_MILES

export const findNearestLocation = (userLat: number, userLng: number): string => {
  if (!isWithinServiceArea(userLat, userLng)) return "Nyack"
  let nearest = "Nyack"
  let shortest = Number.POSITIVE_INFINITY
  locationCoords.forEach((loc) => {
    const d = calculateDistance(userLat, userLng, loc.lat, loc.lng)
    if (d < shortest) { shortest = d; nearest = loc.name }
  })
  return nearest
}

export const detectLocationByIP = async (): Promise<string> => {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 2000)
    const response = await fetch("https://ipapi.co/json/", {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    })
    clearTimeout(timeoutId)
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`)
    const data = await response.json()
    if (data.latitude && data.longitude) {
      const lat = Number.parseFloat(data.latitude)
      const lng = Number.parseFloat(data.longitude)
      if (isNaN(lat) || isNaN(lng)) throw new Error("Invalid coordinates")
      if (!isWithinServiceArea(lat, lng)) return "Nyack"
      return findNearestLocation(lat, lng)
    }
    if (data.city && typeof data.city === "string") {
      const matched = locations.find(
        (loc) => loc.toLowerCase().includes(data.city.toLowerCase()) ||
          data.city.toLowerCase().includes(loc.toLowerCase())
      )
      if (matched) return matched
    }
    return "Nyack"
  } catch {
    return "Nyack"
  }
}

export const isValidServiceLocation = (locationName: string): boolean =>
  locations.includes(locationName) || locationName === "Nyack"

export const getLocationNameFromSlug = (slug: string): string | null => {
  const idx = locationSlugs.indexOf(slug)
  return idx !== -1 ? locations[idx] : null
}

export const getLocationDisplayName = (locationParam: string): string => {
  if (!locationParam) return "Nyack"
  const displayName = locationParam
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
  return isValidServiceLocation(displayName) ? displayName : "Nyack"
}