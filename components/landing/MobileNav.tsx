"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Menu } from "lucide-react"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { mainNavLinks, contactInfo } from "@/lib/constants"

interface MobileNavProps {
  currentLocation: string
}

export const MobileNav = ({ currentLocation }: MobileNavProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative md:hidden" aria-label="Toggle Menu">
          <Menu className="h-6 w-6" />
          <VisuallyHidden>Open mobile menu</VisuallyHidden>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:w-[360px] p-0">
        <ScrollArea className="h-full">
          <div className="flex flex-col h-full">
            {/* Header */}
            <SheetHeader className="p-4 border-b">
              <div className="flex items-center justify-between">
                <SheetTitle className="text-lg font-semibold bg-gradient-to-r from-[#FF6452] to-[#B221F6] bg-clip-text text-transparent">
                  ROLLED UP TEES
                </SheetTitle>
              </div>
            </SheetHeader>

            {/* Main Navigation */}
            <div className="flex-1 px-4">
              <nav className="space-y-2 py-4">
                {mainNavLinks.map((link) => (
                  <div key={link.route}>
                    <Link
                      href={link.route}
                      className="flex flex-col gap-1 p-3 rounded-lg hover:bg-accent transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex items-center gap-3">
                        <link.icon className="h-5 w-5" />
                        <span className="font-medium">{link.title}</span>
                      </div>
                    </Link>
                  </div>
                ))}
              </nav>

              <Separator className="my-4" />

              {/* Quick Actions */}
              <div className="grid grid-cols-1 gap-2 py-4">
                <Button
                  className="w-full bg-[#FF6452] hover:bg-[#E55A49]"
                  onClick={() => {
                    setIsOpen(false)
                    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  Get Free Quote
                </Button>
                <Button variant="outline" className="w-full bg-transparent" onClick={() => setIsOpen(false)} asChild>
                  <Link href="https://instagram.com/rolleduptees">View Our Work</Link>
                </Button>
              </div>

              <Separator className="my-4" />

              {/* Contact Information */}
              <div className="py-4">
                <h3 className="text-sm font-medium mb-3 text-muted-foreground">Contact Us</h3>
                <div className="space-y-3">
                  {contactInfo.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href || "#"}
                      className="flex items-center gap-3 text-sm hover:text-[#FF6452] transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="h-4 w-4" />
                      <div>
                        <p className="text-muted-foreground text-xs">{item.label}</p>
                        <p className="font-medium">{item.value}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-auto border-t p-4">
              <p className="text-center text-sm text-muted-foreground">
                © 2025 Rolled Up Tees, Inc. All rights reserved.
              </p>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
