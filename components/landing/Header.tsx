"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Printer, Phone } from "lucide-react"
import { mainNavLinks } from "@/lib/constants"
import { MobileNav } from "./MobileNav"

interface HeaderProps {
  currentLocation: string
}

export const Header = ({ currentLocation }: HeaderProps) => {
  return (
    <header className="relative z-10 border-b border-gray-100 bg-white/90 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded transform rotate-12 flex items-center justify-center">
              <Printer className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg sm:text-xl font-bold text-gray-800 tracking-wide">ROLLED UP TEES</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 lg:space-x-8">
            {mainNavLinks.map((link) => (
              <Link
                key={link.route}
                href={link.route}
                className="flex items-center text-gray-700 hover:text-[#B221F6] font-medium gap-1 px-3 py-2 text-sm lg:text-base"
              >
                <link.icon className="w-4 h-4 lg:w-5 lg:h-5" />
                <span>{link.title}</span>
              </Link>
            ))}
          </nav>

          {/* Desktop Action Button */}
          <div className="hidden md:flex items-center">
            <Button className="bg-[#B221F6] hover:bg-[#FF6452] text-sm lg:text-base px-4 lg:px-6">
              <Phone className="mr-2 h-4 w-4" />
              Call Now: (845) 358-2037
            </Button>
          </div>

          {/* Mobile Menu */}
          <MobileNav currentLocation={currentLocation} />
        </div>
      </div>
    </header>
  )
}
