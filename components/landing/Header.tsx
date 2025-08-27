"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone } from "lucide-react"
import { mainNavLinks } from "@/lib/constants"
import { MobileNav } from "./MobileNav"
import Image from "next/image"

interface HeaderProps {
  currentLocation: string
}

export const Header = ({ currentLocation }: HeaderProps) => {
  return (
    <header className="relative z-10 border-b border-gray-100 bg-white/90 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/rolled-up-tees-logo.svg"
              alt="Rolled Up Tees - Custom Screen Printing & Embroidery"
              width={180}
              height={33}
              className="h-8 w-auto sm:h-9 lg:h-10"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 lg:space-x-8">
            {mainNavLinks.map((link) => {
              const IconComponent = link.icon
              return (
                <Link
                  key={link.route}
                  href={link.route}
                  className="flex items-center text-gray-700 hover:text-[#B221F6] font-medium gap-1 px-3 py-2 text-sm lg:text-base"
                >
                  <IconComponent className="w-4 h-4 lg:w-5 lg:h-5" />
                  <span>{link.title}</span>
                </Link>
              )
            })}
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
