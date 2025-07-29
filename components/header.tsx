"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, MessageCircle, Phone } from "lucide-react"

const navigation = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Process", href: "#process" },
  { name: "Services", href: "#services" },
  { name: "FAQ", href: "#faq" },
  { name: "Contact", href: "#contact" },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-effect shadow-lg" : "bg-white/90 backdrop-blur-sm shadow-sm"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="#home" className="flex items-center space-x-2 logo-container">
            <div className="relative h-12 w-32 sm:h-14 sm:w-36">
              <Image src="/assets/images/logo.png" alt="MITAN Engitech Logo" fill className="object-contain" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="font-medium text-gray-700 hover:text-primary transition-colors duration-200 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <Button asChild className="header-chat-btn hidden sm:flex items-center space-x-2">
              <Link
                href="https://wa.me/919608888383?text=Hello%20MITAN%20Engitech%20Services%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services."
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-4 w-4" />
                <span className="hidden lg:inline text-white">Chat Now</span>
              </Link>
            </Button>

            <Button asChild variant="outline" size="sm" className="header-call-btn hidden sm:flex bg-transparent">
              <Link href="tel:+919608888383">
                <Phone className="h-4 w-4 mr-2" />
                Call
              </Link>
            </Button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="md:hidden text-gray-700 hover:text-primary hover:bg-primary/10 transition-all duration-200"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] mobile-nav-bg">
                <div className="flex flex-col space-y-6 mt-6">
                  <div className="flex items-center justify-center">
                    <div className="relative h-12 w-32">
                      <Image src="/assets/images/logo.png" alt="MITAN Engitech Logo" fill className="object-contain" />
                    </div>
                  </div>

                  <nav className="flex flex-col space-y-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="text-lg font-medium mobile-nav-text hover:text-primary transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>

                  <div className="space-y-3 pt-6 border-t">
                    <Button asChild className="w-full mobile-chat-btn">
                      <Link
                        href="https://wa.me/919608888383?text=Hello%20MITAN%20Engitech%20Services%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services."
                        target="_blank"
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        <span className="text-white">Chat on WhatsApp</span>
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full mobile-call-btn bg-transparent">
                      <Link href="tel:+919608888383">
                        <Phone className="h-4 w-4 mr-2" />
                        Call Now
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
