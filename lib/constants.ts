import { Printer, Palette, Monitor, Store, Phone, Mail, MapPin } from "lucide-react"

export const mainNavLinks = [
  {
    title: "Screen Printing",
    route: "/screen-printing",
    icon: Printer,
  },
  {
    title: "Embroidery",
    route: "/custom-embroidery",
    icon: Palette,
  },
  {
    title: "Digital Printing",
    route: "/digital-printing",
    icon: Monitor,
  },
  {
    title: "Merch Stores",
    route: "/merch-stores",
    icon: Store,
  },
]

export const contactInfo = [
  {
    icon: Phone,
    label: "Call us",
    value: "(845) 358-2037",
    href: "tel:+18453582037",
  },
  {
    icon: Mail,
    label: "Email us",
    value: "info@rolleduptees.com",
    href: "mailto:info@rolleduptees.com",
  },
  {
    icon: MapPin,
    label: "Visit us",
    value: "298 Route 59, Nyack, NY",
    href: "https://maps.app.goo.gl/BCct95bTHSLTxMyn7",
  },
]

// Business Information
export const BUSINESS_INFO = {
  name: "Nyack Screen Printing",
  phone: "(845) 358-2037",
  email: "info@nyackscreenprinting.com",
  address: "Nyack, NY 10960",
  hours: "Mon-Fri: 9AM-6PM, Sat: 10AM-4PM",
  established: "2020",
}

// Location Interface
export interface Location {
  name: string
  slug: string
  county: string
  zipCodes: string[]
  description: string
  population: string
  keyFeatures: string[]
  nearbyAreas: string[]
  businessTypes: string[]
}

// Locations Data
export const LOCATIONS: Location[] = [
  {
    name: "Orangetown",
    slug: "orangetown",
    county: "Rockland County",
    zipCodes: ["10962", "10965", "10983"],
    description: "Serving Orangetown with professional screen printing and custom apparel services.",
    population: "48,000+",
    keyFeatures: ["Historic Hudson River town", "Business district", "Residential communities"],
    nearbyAreas: ["Pearl River", "Tappan", "Blauvelt"],
    businessTypes: ["Local businesses", "Schools", "Sports teams", "Community organizations"],
  },
  {
    name: "Pearl River",
    slug: "pearl-river",
    county: "Rockland County",
    zipCodes: ["10965"],
    description: "Custom screen printing services for Pearl River businesses, schools, and residents.",
    population: "16,000+",
    keyFeatures: ["Family-friendly community", "Local businesses", "School district"],
    nearbyAreas: ["Orangetown", "Nanuet", "Montvale"],
    businessTypes: ["Retail stores", "Restaurants", "Schools", "Youth sports"],
  },
  {
    name: "Tarrytown",
    slug: "tarrytown",
    county: "Westchester County",
    zipCodes: ["10591"],
    description: "Professional screen printing and embroidery services for Tarrytown area.",
    population: "11,000+",
    keyFeatures: ["Historic village", "Hudson River waterfront", "Business district"],
    nearbyAreas: ["Sleepy Hollow", "Irvington", "Dobbs Ferry"],
    businessTypes: ["Corporate offices", "Restaurants", "Tourism", "Healthcare"],
  },
  {
    name: "Valley Cottage",
    slug: "valley-cottage",
    county: "Rockland County",
    zipCodes: ["10989"],
    description: "Custom apparel and screen printing services for Valley Cottage community.",
    population: "9,000+",
    keyFeatures: ["Residential community", "Local shopping", "Family neighborhoods"],
    nearbyAreas: ["West Nyack", "Upper Nyack", "Congers"],
    businessTypes: ["Local services", "Retail", "Schools", "Community groups"],
  },
  {
    name: "Montvale",
    slug: "montvale",
    county: "Bergen County",
    zipCodes: ["07645"],
    description: "Serving Montvale, NJ with quality screen printing and custom embroidery.",
    population: "8,000+",
    keyFeatures: ["Corporate headquarters", "Upscale community", "Business parks"],
    nearbyAreas: ["Pearl River", "Park Ridge", "Woodcliff Lake"],
    businessTypes: ["Corporate offices", "Professional services", "Retail", "Healthcare"],
  },
  {
    name: "Nanuet",
    slug: "nanuet",
    county: "Rockland County",
    zipCodes: ["10954"],
    description: "Professional screen printing services for Nanuet businesses and organizations.",
    population: "17,000+",
    keyFeatures: ["Shopping centers", "Business district", "Residential areas"],
    nearbyAreas: ["Pearl River", "West Nyack", "Spring Valley"],
    businessTypes: ["Retail stores", "Restaurants", "Professional services", "Schools"],
  },
  {
    name: "New City",
    slug: "new-city",
    county: "Rockland County",
    zipCodes: ["10956"],
    description: "Custom screen printing and apparel services for New City area.",
    population: "34,000+",
    keyFeatures: ["County seat", "Government offices", "Shopping areas"],
    nearbyAreas: ["Congers", "Valley Cottage", "West Nyack"],
    businessTypes: ["Government offices", "Professional services", "Retail", "Healthcare"],
  },
]

// Service Interface
export interface Service {
  name: string
  slug: string
  description: string
  category: "printing" | "embroidery" | "specialty" | "events" | "business" | "first-responder"
  features: string[]
  keywords: string[]
  pricing: string
  turnaround: string
}

// Services Data
export const SERVICES: Service[] = [
  {
    name: "Screen Printing",
    slug: "screen-printing",
    description:
      "High-quality screen printing for t-shirts, hoodies, and custom apparel with vibrant, long-lasting results.",
    category: "printing",
    features: ["Vibrant, long-lasting colors", "Bulk order discounts", "Professional setup", "Multiple color options"],
    keywords: ["screen printing", "t-shirt printing", "custom shirts", "bulk printing", "apparel printing"],
    pricing: "Starting at $8 per shirt",
    turnaround: "3-5 business days",
  },
  {
    name: "Custom Embroidery",
    slug: "custom-embroidery",
    description: "Professional embroidery services for logos, uniforms, hats, and premium branded apparel.",
    category: "embroidery",
    features: ["Premium thread quality", "Logo digitization included", "Uniform services", "Hat embroidery specialist"],
    keywords: ["custom embroidery", "logo embroidery", "uniform embroidery", "hat embroidery", "branded apparel"],
    pricing: "Starting at $12 per item",
    turnaround: "5-7 business days",
  },
  {
    name: "Digital Printing",
    slug: "digital-printing",
    description: "Modern digital printing for detailed designs and small quantities with photo-quality results.",
    category: "printing",
    features: ["Photo-quality prints", "Small quantity orders", "Full-color designs", "Quick turnaround"],
    keywords: ["digital printing", "photo printing", "small batch", "full color printing", "detailed designs"],
    pricing: "Starting at $12 per item",
    turnaround: "2-3 business days",
  },
  {
    name: "Merch Stores",
    slug: "merch-stores",
    description: "Custom online merchandise stores for businesses and organizations with easy ordering systems.",
    category: "business",
    features: ["Online store setup", "Inventory management", "Custom branding", "Order fulfillment"],
    keywords: ["merch stores", "online merchandise", "custom stores", "business merchandise", "branded products"],
    pricing: "Contact for pricing",
    turnaround: "Setup in 7-10 days",
  },
]

// Social Media Links
export const socialLinks = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/rolleduptees",
    icon: "instagram",
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/rolleduptees",
    icon: "facebook",
  },
]

// Business Hours
export const businessHours = [
  { day: "Monday", hours: "9:00 AM - 6:00 PM" },
  { day: "Tuesday", hours: "9:00 AM - 6:00 PM" },
  { day: "Wednesday", hours: "9:00 AM - 6:00 PM" },
  { day: "Thursday", hours: "9:00 AM - 6:00 PM" },
  { day: "Friday", hours: "9:00 AM - 6:00 PM" },
  { day: "Saturday", hours: "10:00 AM - 4:00 PM" },
  { day: "Sunday", hours: "Closed" },
]
