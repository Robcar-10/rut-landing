"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import type { LocationFAQ } from "@/lib/location-content"

interface FAQSectionProps {
  locationName: string
  faqs?: LocationFAQ[]
}

const genericFAQs: LocationFAQ[] = [
  {
    question: "What is the minimum order quantity for screen printing?",
    answer:
      "Our minimum order for screen printing is 18 items. This allows us to maintain quality and keep pricing competitive. For smaller quantities, embroidery or digital printing may be a better fit — contact us to discuss your needs.",
  },
  {
    question: "How long does a custom order take?",
    answer:
      "Standard turnaround is 7–10 business days from artwork approval. We also offer rush orders with turnaround as fast as 48–72 hours for qualifying orders. Contact us to discuss your timeline.",
  },
  {
    question: "What file formats do you accept for designs?",
    answer:
      "We accept AI, EPS, PDF, SVG, PNG, and JPG files. Vector files (AI, EPS, SVG) produce the sharpest results. If you only have a low-resolution image, our design team can help recreate it.",
  },
  {
    question: "Do you offer bulk pricing or volume discounts?",
    answer:
      "Yes — the more you order, the lower the per-unit price. We offer tiered pricing starting at 18 items with discounts increasing at 36, 72, and 144+ pieces. Contact us for a custom quote.",
  },
  {
    question: "Can you help with design if I don't have artwork?",
    answer:
      "Absolutely. We offer a free design consultation with every quote. Our team can work from a sketch, description, or rough concept to create print-ready artwork.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "We serve all of Rockland County, NY (Nyack, Pearl River, Nanuet, Spring Valley, and more), Westchester County (Tarrytown, Ossining, Dobbs Ferry, Irvington, Sleepy Hollow), and Bergen County, NJ (Westwood, Montvale, Hillsdale, Northvale).",
  },
]

export const FAQSection = ({ locationName, faqs }: FAQSectionProps) => {
  const displayFAQs = faqs ?? genericFAQs
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="mt-16 sm:mt-20 py-12 sm:py-16 max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          Frequently Asked Questions{faqs ? ` — ${locationName}` : ""}
        </h2>
        <p className="text-gray-600">
          Common questions about custom screen printing and embroidery
          {faqs ? ` in ${locationName}` : " from Rolled Up Tees"}.
        </p>
      </div>

      <div className="space-y-3">
        {displayFAQs.map((faq, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
              aria-expanded={openIndex === i}
            >
              <span className="font-medium text-gray-900 pr-4 text-sm sm:text-base">
                {faq.question}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-purple-500 flex-shrink-0 transition-transform duration-200 ${openIndex === i ? "rotate-180" : ""}`}
              />
            </button>
            {openIndex === i && (
              <div className="px-5 pb-4 text-gray-600 text-sm sm:text-base leading-relaxed border-t border-gray-100 pt-3">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-600 text-sm mb-3">Still have questions? We're happy to help.</p>
        <button
          onClick={() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })}
          className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 px-6 rounded-full text-sm transition-colors"
        >
          Get a Free Quote
        </button>
      </div>
    </section>
  )
}