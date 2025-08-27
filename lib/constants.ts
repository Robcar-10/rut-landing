export interface Location {
  name: string
  slug: string
  state: string
  county: string
  description: string
  coordinates: {
    lat: number
    lng: number
  }
  zipCodes: string[]
  nearbyTowns: string[]
}

export interface Service {
  name: string
  slug: string
  description: string
  features: string[]
  pricing: {
    min: number
    max: number
  }
  turnaround: string
  category: string
}

export const LOCATIONS: Location[] = [
  // Rockland County
  {
    name: "Ramapo",
    slug: "ramapo",
    state: "NY",
    county: "Rockland",
    description: "Professional screen printing and embroidery services in Ramapo, NY",
    coordinates: { lat: 41.1156, lng: -74.1434 },
    zipCodes: ["10901", "10952"],
    nearbyTowns: ["Spring Valley", "Monsey", "Suffern"],
  },
  {
    name: "Clarkstown",
    slug: "clarkstown",
    state: "NY",
    county: "Rockland",
    description: "Custom apparel printing services in Clarkstown, NY",
    coordinates: { lat: 41.109, lng: -73.9606 },
    zipCodes: ["10954", "10956", "10994"],
    nearbyTowns: ["New City", "Nanuet", "West Nyack"],
  },
  {
    name: "Orangetown",
    slug: "orangetown",
    state: "NY",
    county: "Rockland",
    description: "Screen printing and embroidery in Orangetown, NY",
    coordinates: { lat: 41.0459, lng: -73.9526 },
    zipCodes: ["10962", "10965", "10968"],
    nearbyTowns: ["Pearl River", "Blauvelt", "Tappan"],
  },
  {
    name: "Haverstraw",
    slug: "haverstraw",
    state: "NY",
    county: "Rockland",
    description: "Custom t-shirt printing in Haverstraw, NY",
    coordinates: { lat: 41.1967, lng: -73.9651 },
    zipCodes: ["10927", "10993"],
    nearbyTowns: ["West Haverstraw", "Stony Point", "Garnerville"],
  },
  {
    name: "New City",
    slug: "new-city",
    state: "NY",
    county: "Rockland",
    description: "Professional screen printing services in New City, NY",
    coordinates: { lat: 41.1478, lng: -73.989 },
    zipCodes: ["10956"],
    nearbyTowns: ["Clarkstown", "Congers", "Valley Cottage"],
  },
  {
    name: "Spring Valley",
    slug: "spring-valley",
    state: "NY",
    county: "Rockland",
    description: "Custom apparel and promotional products in Spring Valley, NY",
    coordinates: { lat: 41.1126, lng: -74.0437 },
    zipCodes: ["10977"],
    nearbyTowns: ["Monsey", "Nanuet", "Chestnut Ridge"],
  },
  {
    name: "Monsey",
    slug: "monsey",
    state: "NY",
    county: "Rockland",
    description: "Screen printing and embroidery services in Monsey, NY",
    coordinates: { lat: 41.1084, lng: -74.0687 },
    zipCodes: ["10952"],
    nearbyTowns: ["Spring Valley", "Airmont", "Chestnut Ridge"],
  },
  {
    name: "Nanuet",
    slug: "nanuet",
    state: "NY",
    county: "Rockland",
    description: "Custom t-shirts and promotional items in Nanuet, NY",
    coordinates: { lat: 41.0887, lng: -74.0134 },
    zipCodes: ["10954"],
    nearbyTowns: ["Pearl River", "Spring Valley", "West Nyack"],
  },
  {
    name: "Pearl River",
    slug: "pearl-river",
    state: "NY",
    county: "Rockland",
    description: "Professional printing services in Pearl River, NY",
    coordinates: { lat: 41.059, lng: -74.0215 },
    zipCodes: ["10965"],
    nearbyTowns: ["Nanuet", "Montvale", "Park Ridge"],
  },
  {
    name: "Stony Point",
    slug: "stony-point",
    state: "NY",
    county: "Rockland",
    description: "Custom screen printing in Stony Point, NY",
    coordinates: { lat: 41.2367, lng: -73.9873 },
    zipCodes: ["10980"],
    nearbyTowns: ["Haverstraw", "Tomkins Cove", "Bear Mountain"],
  },
  {
    name: "West Haverstraw",
    slug: "west-haverstraw",
    state: "NY",
    county: "Rockland",
    description: "Screen printing services in West Haverstraw, NY",
    coordinates: { lat: 41.209, lng: -73.9834 },
    zipCodes: ["10993"],
    nearbyTowns: ["Haverstraw", "Stony Point", "Garnerville"],
  },
  {
    name: "Valley Cottage",
    slug: "valley-cottage",
    state: "NY",
    county: "Rockland",
    description: "Custom apparel printing in Valley Cottage, NY",
    coordinates: { lat: 41.1156, lng: -73.9429 },
    zipCodes: ["10989"],
    nearbyTowns: ["Upper Nyack", "Nyack", "Congers"],
  },
  {
    name: "Congers",
    slug: "congers",
    state: "NY",
    county: "Rockland",
    description: "Professional screen printing in Congers, NY",
    coordinates: { lat: 41.1456, lng: -73.9445 },
    zipCodes: ["10920"],
    nearbyTowns: ["Valley Cottage", "New City", "Lake DeForest"],
  },
  {
    name: "Blauvelt",
    slug: "blauvelt",
    state: "NY",
    county: "Rockland",
    description: "Custom t-shirt printing in Blauvelt, NY",
    coordinates: { lat: 41.0634, lng: -73.9565 },
    zipCodes: ["10913"],
    nearbyTowns: ["Orangeburg", "Tappan", "Pearl River"],
  },
  {
    name: "West Nyack",
    slug: "west-nyack",
    state: "NY",
    county: "Rockland",
    description: "Screen printing and embroidery in West Nyack, NY",
    coordinates: { lat: 41.0967, lng: -73.9723 },
    zipCodes: ["10994"],
    nearbyTowns: ["Central Nyack", "Nanuet", "Blauvelt"],
  },
  {
    name: "Piermont",
    slug: "piermont",
    state: "NY",
    county: "Rockland",
    description: "Custom printing services in Piermont, NY",
    coordinates: { lat: 41.0401, lng: -73.9179 },
    zipCodes: ["10968"],
    nearbyTowns: ["Sparkill", "Tappan", "Dobbs Ferry"],
  },
  {
    name: "Upper Nyack",
    slug: "upper-nyack",
    state: "NY",
    county: "Rockland",
    description: "Professional screen printing in Upper Nyack, NY",
    coordinates: { lat: 41.1234, lng: -73.9179 },
    zipCodes: ["10960"],
    nearbyTowns: ["Nyack", "Valley Cottage", "South Nyack"],
  },
  // Westchester County
  {
    name: "Ossining",
    slug: "ossining",
    state: "NY",
    county: "Westchester",
    description: "Custom apparel printing in Ossining, NY",
    coordinates: { lat: 41.1628, lng: -73.8615 },
    zipCodes: ["10562"],
    nearbyTowns: ["Briarcliff Manor", "Croton-on-Hudson", "Sleepy Hollow"],
  },
  {
    name: "Sleepy Hollow",
    slug: "sleepy-hollow",
    state: "NY",
    county: "Westchester",
    description: "Screen printing services in Sleepy Hollow, NY",
    coordinates: { lat: 41.0951, lng: -73.8651 },
    zipCodes: ["10591"],
    nearbyTowns: ["Tarrytown", "Irvington", "Dobbs Ferry"],
  },
  {
    name: "Tarrytown",
    slug: "tarrytown",
    state: "NY",
    county: "Westchester",
    description: "Professional printing in Tarrytown, NY",
    coordinates: { lat: 41.0762, lng: -73.8587 },
    zipCodes: ["10591"],
    nearbyTowns: ["Sleepy Hollow", "Irvington", "Elmsford"],
  },
  {
    name: "Dobbs Ferry",
    slug: "dobbs-ferry",
    state: "NY",
    county: "Westchester",
    description: "Custom screen printing in Dobbs Ferry, NY",
    coordinates: { lat: 41.0134, lng: -73.8726 },
    zipCodes: ["10522"],
    nearbyTowns: ["Irvington", "Hastings-on-Hudson", "Ardsley"],
  },
  {
    name: "Irvington",
    slug: "irvington",
    state: "NY",
    county: "Westchester",
    description: "Screen printing and embroidery in Irvington, NY",
    coordinates: { lat: 41.039, lng: -73.8726 },
    zipCodes: ["10533"],
    nearbyTowns: ["Tarrytown", "Dobbs Ferry", "Ardsley"],
  },
  // Bergen County, NJ
  {
    name: "Montvale",
    slug: "montvale",
    state: "NJ",
    county: "Bergen",
    description: "Professional screen printing in Montvale, NJ",
    coordinates: { lat: 41.0451, lng: -74.0365 },
    zipCodes: ["07645"],
    nearbyTowns: ["Park Ridge", "Woodcliff Lake", "Pearl River"],
  },
  {
    name: "Westwood",
    slug: "westwood",
    state: "NJ",
    county: "Bergen",
    description: "Custom apparel printing in Westwood, NJ",
    coordinates: { lat: 40.989, lng: -74.0326 },
    zipCodes: ["07675"],
    nearbyTowns: ["Hillsdale", "Park Ridge", "Washington Township"],
  },
  {
    name: "Hillsdale",
    slug: "hillsdale",
    state: "NJ",
    county: "Bergen",
    description: "Screen printing services in Hillsdale, NJ",
    coordinates: { lat: 41.0023, lng: -74.0365 },
    zipCodes: ["07642"],
    nearbyTowns: ["Westwood", "Woodcliff Lake", "Park Ridge"],
  },
  {
    name: "Northvale",
    slug: "northvale",
    state: "NJ",
    county: "Bergen",
    description: "Custom printing in Northvale, NJ",
    coordinates: { lat: 41.0156, lng: -73.949 },
    zipCodes: ["07647"],
    nearbyTowns: ["Norwood", "Rockleigh", "Closter"],
  },
]

export const SERVICES: Service[] = [
  {
    name: "Screen Printing",
    slug: "screen-printing",
    description: "High-quality screen printing for t-shirts, hoodies, and apparel",
    features: [
      "Custom designs and logos",
      "Multiple color options",
      "Bulk order discounts",
      "Fast turnaround times",
      "Durable, long-lasting prints",
    ],
    pricing: { min: 5, max: 50 },
    turnaround: "3-5 business days",
    category: "printing",
  },
  {
    name: "Embroidery",
    slug: "embroidery",
    description: "Professional embroidery services for uniforms, hats, and corporate apparel",
    features: [
      "Custom logo embroidery",
      "Thread color matching",
      "Uniform and corporate apparel",
      "Hats and caps",
      "Professional finish",
    ],
    pricing: { min: 8, max: 25 },
    turnaround: "5-7 business days",
    category: "embroidery",
  },
  {
    name: "Custom Decals",
    slug: "custom-decals",
    description: "Vehicle decals, window graphics, and promotional stickers",
    features: [
      "Weather-resistant materials",
      "Custom shapes and sizes",
      "Vehicle graphics",
      "Window decals",
      "Promotional stickers",
    ],
    pricing: { min: 2, max: 15 },
    turnaround: "2-3 business days",
    category: "graphics",
  },
  {
    name: "Promotional Products",
    slug: "promotional-products",
    description: "Custom promotional items for marketing and events",
    features: ["Branded merchandise", "Event giveaways", "Corporate gifts", "Trade show items", "Marketing materials"],
    pricing: { min: 3, max: 30 },
    turnaround: "7-10 business days",
    category: "promotional",
  },
]

// Business information
export const BUSINESS_INFO = {
  name: "Nyack Screen Printing",
  alternateName: "Rolled Up Tees",
  phone: "(845) 358-2037",
  email: "info@nyackscreenprinting.com",
  address: {
    street: "298 Route 59",
    city: "Nyack",
    state: "NY",
    zip: "10960",
    county: "Rockland",
  },
  coordinates: {
    lat: 41.0909,
    lng: -73.9176,
  },
  hours: {
    monday: "9:00 AM - 5:00 PM",
    tuesday: "9:00 AM - 5:00 PM",
    wednesday: "9:00 AM - 5:00 PM",
    thursday: "9:00 AM - 5:00 PM",
    friday: "9:00 AM - 5:00 PM",
    saturday: "10:00 AM - 3:00 PM",
    sunday: "Closed",
  },
  serviceRadius: 15, // miles
  established: 2020,
  website: "https://nyackscreenprinting.com",
}
