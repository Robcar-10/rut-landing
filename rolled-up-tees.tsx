"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, Printer, Palette, Monitor, Store } from "lucide-react"

export default function RolledUpTees() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded transform rotate-12 flex items-center justify-center">
            <Printer className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-800 tracking-wide">ROLLED UP TEES</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-2 text-gray-600 hover:text-gray-800 cursor-pointer">
            <Printer className="w-4 h-4" />
            <span>Screen Printing</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 hover:text-gray-800 cursor-pointer">
            <Palette className="w-4 h-4" />
            <span>Embroidery</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 hover:text-gray-800 cursor-pointer">
            <Monitor className="w-4 h-4" />
            <span>Digital Printing</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 hover:text-gray-800 cursor-pointer">
            <Store className="w-4 h-4" />
            <span>Merch Stores</span>
          </div>
          <Button className="bg-purple-400 hover:bg-purple-500 text-white px-6 py-2 rounded-full">Contact Us</Button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-gray-600 text-lg">Elevate Your Brand with Custom Apparel & Decals at</p>

              <div className="space-y-2">
                <h1 className="text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">{"Nyack's"}</h1>
                <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="text-coral-400" style={{ color: "#FF6B6B" }}>
                    Screen
                  </span>
                </h1>
                <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="text-purple-400">Printing</span>
                </h1>
                <h1 className="text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">{"& Embroidery"}</h1>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-gray-600 text-lg leading-relaxed">
                We turn ideas into reality. From custom shirts to unique decals, discover why businesses trust{" "}
                <span className="font-semibold text-purple-600">Rolled Up Tees</span> for quality, creativity, and
                exceptional service. <span className="font-semibold">{"Let's bring your vision to life."}</span>
              </p>
            </div>

            <div className="flex gap-4">
              <Button className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-full text-lg">
                Get Started
              </Button>
              <Button
                variant="outline"
                className="border-purple-300 text-purple-600 hover:bg-purple-50 px-8 py-3 rounded-full text-lg bg-transparent"
              >
                View Our Work
              </Button>
            </div>
          </div>

          {/* Right Content - Contact Form */}
          <div className="lg:pl-8">
            <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0">
              <CardContent className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">First Name</label>
                    <Input
                      placeholder="John"
                      className="border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Last Name</label>
                    <Input
                      placeholder="Doe"
                      className="border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <Input
                      type="email"
                      placeholder="john@company.com"
                      className="border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Phone Number</label>
                    <Input
                      placeholder="(555) 123-4567"
                      className="border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Company/Organization</label>
                  <Input
                    placeholder="Your Company"
                    className="border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Upload Files Button */}
        <div className="mt-12">
          <Button
            className="bg-coral-400 hover:bg-coral-500 text-white px-6 py-3 rounded-full flex items-center gap-2"
            style={{ backgroundColor: "#FF6B6B" }}
          >
            <Upload className="w-4 h-4" />
            Upload Files
          </Button>
        </div>
      </main>
    </div>
  )
}
