"use client"

import { MapPin } from "lucide-react"

interface LocalContentSectionProps {
  introParagraph: string
  localCallout: string
  industriesNote: string
  locationName: string
  county: string
}

export const LocalContentSection = ({
  introParagraph,
  localCallout,
  industriesNote,
  locationName,
  county,
}: LocalContentSectionProps) => {
  return (
    <section className="mt-12 sm:mt-16 py-8 sm:py-12" aria-label={`About serving ${locationName}`}>
      <div className="max-w-4xl mx-auto">

        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-4 h-4 text-purple-500 flex-shrink-0" />
          <span className="text-sm font-medium text-purple-600 uppercase tracking-wide">{county}</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
          Serving {locationName} with Custom Apparel Since 2020
        </h2>

        <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6">
          {introParagraph}
        </p>

        <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-r-xl mb-6">
          <p className="text-gray-800 text-sm sm:text-base font-medium">
            📍 {localCallout}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <h3 className="text-base font-semibold text-gray-900 mb-2">
            Who We Serve in {locationName}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {industriesNote}
          </p>
        </div>

      </div>
    </section>
  )
}