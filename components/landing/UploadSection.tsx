"use client"

import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"

interface UploadSectionProps {
  currentLocation: string
}

export const UploadSection = ({ currentLocation }: UploadSectionProps) => {
  return (
    <div className="mt-8 sm:mt-12 text-center">
      <Button className="bg-coral-400 hover:bg-coral-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full flex items-center gap-3 mx-auto text-base sm:text-lg font-semibold shadow-lg">
        <Upload className="w-4 h-4 sm:w-5 sm:h-5" />
        Upload Your Design Files
      </Button>
      <p className="text-gray-600 mt-3 text-sm sm:text-base px-4">
        Have a design ready? Upload it now and we'll provide a custom quote for your {currentLocation} project.
      </p>
    </div>
  )
}
