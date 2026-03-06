import Link from "next/link"
import { MapPin, ArrowRight } from "lucide-react"

interface NearbyTownsSectionProps {
  nearbyTowns: string[]
  currentLocationName: string
}

const slugToName = (slug: string) =>
  slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")

export const NearbyTownsSection = ({ nearbyTowns, currentLocationName }: NearbyTownsSectionProps) => {
  if (!nearbyTowns.length) return null

  return (
    <section className="mt-12 sm:mt-16 py-8 sm:py-12" aria-label="Nearby areas we serve">
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-5 h-5 text-purple-500" />
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">
            Also Serving Communities Near {currentLocationName}
          </h2>
        </div>

        <p className="text-gray-600 text-sm sm:text-base mb-5">
          Rolled Up Tees serves the entire surrounding region. If you're in a neighboring town,
          we're your local screen printing and embroidery shop too.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {nearbyTowns.map((slug) => (
            <Link
              key={slug}
              href={`/${slug}`}
              className="group flex items-center justify-between bg-white rounded-lg px-4 py-3 shadow-sm border border-gray-100 hover:border-purple-300 hover:shadow-md transition-all duration-200"
            >
              <span className="text-sm font-medium text-gray-700 group-hover:text-purple-600 transition-colors">
                {slugToName(slug)}
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-purple-500 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}