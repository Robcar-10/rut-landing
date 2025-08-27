"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Phone, X } from "lucide-react"
import { mainNavLinks } from "@/lib/constants"

interface MobileNavProps {
  currentLocation: string
}

export const MobileNav = ({ currentLocation }: MobileNavProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between py-4 border-b">
              <h2 className="text-lg font-semibold">Menu</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-6 w-6" />
              </Button>
            </div>

            <nav className="flex flex-col space-y-4 py-6">
              {mainNavLinks.map((link) => {
                const IconComponent = link.icon
                return (
                  <Link
                    key={link.route}
                    href={link.route}
                    className="flex items-center text-gray-700 hover:text-[#B221F6] font-medium gap-3 px-3 py-2 text-base"
                    onClick={() => setIsOpen(false)}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span>{link.title}</span>
                  </Link>
                )
              })}
            </nav>

            <div className="mt-auto pb-6">
              <Button className="w-full bg-[#B221F6] hover:bg-[#FF6452]">
                <Phone className="mr-2 h-4 w-4" />
                Call Now: (845) 358-2037
              </Button>
              {currentLocation && <p className="text-sm text-gray-600 mt-2 text-center">Serving {currentLocation}</p>}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
