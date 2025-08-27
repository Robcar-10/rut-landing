export interface ServiceInfo {
  slug: string
  title: string
  description: string
  category: string
  features: string[]
  keywords: string[]
  relatedServices: string[]
  pricing?: {
    starting: string
    factors: string[]
  }
  turnaround?: string
  minimumOrder?: string
}

export const SERVICES: ServiceInfo[] = [
  {
    slug: "screen-printing",
    title: "Screen Printing Services",
    description:
      "High-quality screen printing for t-shirts, hoodies, and custom apparel with vibrant, long-lasting prints.",
    category: "printing",
    features: [
      "Vibrant, long-lasting prints",
      "Bulk order discounts",
      "Multiple color options",
      "Professional setup",
      "Fast turnaround times",
      "Quality guaranteed",
    ],
    keywords: ["screen printing", "t-shirt printing", "custom apparel", "bulk printing", "promotional items"],
    relatedServices: ["embroidery", "vinyl-printing", "promotional-products"],
    pricing: {
      starting: "$8.99",
      factors: ["Quantity", "Colors", "Garment type", "Design complexity"],
    },
    turnaround: "3-5 business days",
    minimumOrder: "12 pieces",
  },
  {
    slug: "embroidery",
    title: "Custom Embroidery Services",
    description: "Professional embroidery services for logos, text, and designs on various garments and accessories.",
    category: "embroidery",
    features: [
      "Professional logo embroidery",
      "Multiple thread colors",
      "Various garment types",
      "Durable stitching",
      "Custom digitizing",
      "Corporate branding",
    ],
    keywords: ["embroidery", "logo embroidery", "custom embroidery", "corporate apparel", "branded clothing"],
    relatedServices: ["screen-printing", "promotional-products", "uniforms"],
    pricing: {
      starting: "$12.99",
      factors: ["Stitch count", "Colors", "Garment type", "Setup complexity"],
    },
    turnaround: "5-7 business days",
    minimumOrder: "6 pieces",
  },
  {
    slug: "vinyl-printing",
    title: "Vinyl Printing & Heat Transfer",
    description: "Precision vinyl cutting and heat transfer printing for detailed designs and small quantities.",
    category: "printing",
    features: [
      "Precision cutting",
      "Heat transfer application",
      "Small quantity friendly",
      "Detailed designs",
      "Multiple vinyl types",
      "Quick turnaround",
    ],
    keywords: ["vinyl printing", "heat transfer", "custom vinyl", "small quantity printing", "detailed designs"],
    relatedServices: ["screen-printing", "embroidery", "decals"],
    pricing: {
      starting: "$15.99",
      factors: ["Design size", "Vinyl type", "Garment type", "Quantity"],
    },
    turnaround: "2-3 business days",
    minimumOrder: "1 piece",
  },
  {
    slug: "promotional-products",
    title: "Promotional Products & Branded Items",
    description: "Wide selection of promotional products and branded merchandise for marketing and corporate events.",
    category: "promotional",
    features: [
      "Wide product selection",
      "Custom branding",
      "Bulk pricing",
      "Corporate packages",
      "Event merchandise",
      "Marketing materials",
    ],
    keywords: [
      "promotional products",
      "branded merchandise",
      "corporate gifts",
      "marketing materials",
      "custom products",
    ],
    relatedServices: ["screen-printing", "embroidery", "vinyl-printing"],
    pricing: {
      starting: "$2.99",
      factors: ["Product type", "Quantity", "Customization method", "Branding complexity"],
    },
    turnaround: "7-10 business days",
    minimumOrder: "25 pieces",
  },
  {
    slug: "uniforms",
    title: "Custom Uniforms & Workwear",
    description: "Professional uniform design and customization for businesses, teams, and organizations.",
    category: "apparel",
    features: [
      "Professional uniform design",
      "Team coordination",
      "Durable workwear",
      "Custom sizing",
      "Brand consistency",
      "Bulk ordering",
    ],
    keywords: ["custom uniforms", "workwear", "team uniforms", "professional apparel", "branded uniforms"],
    relatedServices: ["embroidery", "screen-printing", "promotional-products"],
    pricing: {
      starting: "$24.99",
      factors: ["Garment type", "Customization level", "Quantity", "Sizing requirements"],
    },
    turnaround: "10-14 business days",
    minimumOrder: "6 pieces",
  },
  {
    slug: "decals",
    title: "Custom Decals & Stickers",
    description: "High-quality vinyl decals and stickers for vehicles, windows, equipment, and promotional use.",
    category: "signage",
    features: [
      "Weather-resistant vinyl",
      "Custom shapes and sizes",
      "Vehicle applications",
      "Indoor/outdoor use",
      "Precision cutting",
      "Easy application",
    ],
    keywords: ["custom decals", "vinyl stickers", "vehicle decals", "promotional stickers", "custom labels"],
    relatedServices: ["vinyl-printing", "promotional-products", "signage"],
    pricing: {
      starting: "$3.99",
      factors: ["Size", "Quantity", "Vinyl type", "Design complexity"],
    },
    turnaround: "3-5 business days",
    minimumOrder: "10 pieces",
  },
]

export function getServiceBySlug(slug: string): ServiceInfo | undefined {
  return SERVICES.find((service) => service.slug === slug)
}

export function getAllServices(): ServiceInfo[] {
  return SERVICES
}

export function getServicesByCategory(category: string): ServiceInfo[] {
  return SERVICES.filter((service) => service.category === category)
}

export function getRelatedServices(currentSlug: string): ServiceInfo[] {
  const currentService = getServiceBySlug(currentSlug)
  if (!currentService) return []

  return SERVICES.filter((service) => currentService.relatedServices.includes(service.slug)).slice(0, 3)
}
