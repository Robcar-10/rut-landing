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

// Location data for dynamic pages
export const LOCATIONS = [
  // Rockland County
  { slug: "ramapo", name: "Ramapo", state: "NY", county: "Rockland" },
  { slug: "clarkstown", name: "Clarkstown", state: "NY", county: "Rockland" },
  { slug: "orangetown", name: "Orangetown", state: "NY", county: "Rockland" },
  { slug: "haverstraw", name: "Haverstraw", state: "NY", county: "Rockland" },
  { slug: "new-city", name: "New City", state: "NY", county: "Rockland" },
  { slug: "spring-valley", name: "Spring Valley", state: "NY", county: "Rockland" },
  { slug: "monsey", name: "Monsey", state: "NY", county: "Rockland" },
  { slug: "nanuet", name: "Nanuet", state: "NY", county: "Rockland" },
  { slug: "pearl-river", name: "Pearl River", state: "NY", county: "Rockland" },
  { slug: "stony-point", name: "Stony Point", state: "NY", county: "Rockland" },
  { slug: "west-haverstraw", name: "West Haverstraw", state: "NY", county: "Rockland" },
  { slug: "valley-cottage", name: "Valley Cottage", state: "NY", county: "Rockland" },
  { slug: "congers", name: "Congers", state: "NY", county: "Rockland" },
  { slug: "blauvelt", name: "Blauvelt", state: "NY", county: "Rockland" },
  { slug: "west-nyack", name: "West Nyack", state: "NY", county: "Rockland" },
  { slug: "piermont", name: "Piermont", state: "NY", county: "Rockland" },
  { slug: "upper-nyack", name: "Upper Nyack", state: "NY", county: "Rockland" },
  // Westchester County
  { slug: "ossining", name: "Ossining", state: "NY", county: "Westchester" },
  { slug: "sleepy-hollow", name: "Sleepy Hollow", state: "NY", county: "Westchester" },
  { slug: "tarrytown", name: "Tarrytown", state: "NY", county: "Westchester" },
  { slug: "dobbs-ferry", name: "Dobbs Ferry", state: "NY", county: "Westchester" },
  { slug: "irvington", name: "Irvington", state: "NY", county: "Westchester" },
  // Bergen County, NJ
  { slug: "montvale", name: "Montvale", state: "NJ", county: "Bergen" },
  { slug: "westwood", name: "Westwood", state: "NJ", county: "Bergen" },
  { slug: "hillsdale", name: "Hillsdale", state: "NJ", county: "Bergen" },
  { slug: "northvale", name: "Northvale", state: "NJ", county: "Bergen" },
]

// Service data for dynamic pages
export const SERVICES = [
  {
    slug: "screen-printing",
    name: "Screen Printing",
    description: "High-quality screen printing for custom t-shirts, hoodies, and apparel",
    features: ["Bulk orders", "Multiple colors", "Durable prints", "Fast turnaround"],
  },
  {
    slug: "custom-embroidery",
    name: "Custom Embroidery",
    description: "Professional embroidery services for logos, names, and designs",
    features: ["Premium thread", "Logo embroidery", "Name personalization", "Corporate uniforms"],
  },
  {
    slug: "digital-printing",
    name: "Digital Printing",
    description: "Modern digital printing for detailed designs and small quantities",
    features: ["Photo quality", "Small quantities", "Full color", "Quick production"],
  },
  {
    slug: "merch-stores",
    name: "Merch Stores",
    description: "Custom online merchandise stores for businesses and organizations",
    features: ["Online ordering", "Inventory management", "Custom branding", "Drop shipping"],
  },
]
