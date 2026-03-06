import { locationSlugs } from "@/lib/location-utils"
import { getLocationContent } from "@/lib/location-content"

const BASE_URL = "https://nyackscreenprinting.com"

// ── Global schema — add <LocalBusinessSchema /> to app/layout.tsx ────────────
export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${BASE_URL}/#business`,
    name: "Rolled Up Tees",
    alternateName: "Nyack Screen Printing",
    url: BASE_URL,
    logo: `${BASE_URL}/images/rolled-up-tees-logo.svg`,
    image: `${BASE_URL}/images/og-image.jpg`,
    description:
      "Custom screen printing, embroidery, and digital printing services in Nyack, NY. Serving Rockland County, Westchester County, and Bergen County NJ since 2020.",
    telephone: "+18453582037",
    priceRange: "$$",
    foundingDate: "2020",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nyack",
      addressRegion: "NY",
      postalCode: "10960",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 41.0909,
      longitude: -73.9176,
    },
    areaServed: locationSlugs.map((slug) => ({
      "@type": "City",
      name: slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
    })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "17:00",
      },
    ],
    // sameAs tells Google that nyackscreenprinting.com and rolleduptees.com
    // are the same business entity. Add more profiles as you create them.
    sameAs: [
      "https://rolleduptees.com",
      "https://www.rolleduptees.com",
      "https://www.instagram.com/rolleduptees",
      // Add these when available:
      // "https://www.facebook.com/rolleduptees",
      // "https://g.co/kgs/YOUR_GOOGLE_BUSINESS_ID",
      // "https://www.yelp.com/biz/rolled-up-tees-nyack",
      // "https://www.linkedin.com/company/rolled-up-tees",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Custom Apparel Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom Screen Printing" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom Embroidery" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Digital Printing" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom Decals & Window Graphics" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Online Merch Stores" } },
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "500",
      bestRating: "5",
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// ── Per-location schema — add <LocationSchema slug={params.location} />
// to app/[location]/page.tsx ─────────────────────────────────────────────────
export function LocationSchema({ slug }: { slug: string }) {
  const content = getLocationContent(slug)
  if (!content) return null

  const locationName = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `${BASE_URL}/#business`,
        name: "Rolled Up Tees",
      },
      {
        "@type": "Service",
        "@id": `${BASE_URL}/${slug}/#service`,
        name: `Custom Screen Printing in ${locationName}`,
        description: content.metaDescription,
        provider: { "@id": `${BASE_URL}/#business` },
        areaServed: {
          "@type": "City",
          name: locationName,
          containedInPlace: { "@type": "State", name: content.state },
        },
        url: `${BASE_URL}/${slug}`,
      },
      {
        "@type": "FAQPage",
        "@id": `${BASE_URL}/${slug}/#faq`,
        mainEntity: content.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}