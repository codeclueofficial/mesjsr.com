"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, MessageCircle, Phone, X, ArrowRight } from "lucide-react"

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-effect shadow-lg py-3" : "bg-white/95 backdrop-blur-sm shadow-soft py-4"
      }`}
    >
      <div className="container-modern">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="#home" className="flex items-center group">
            <div className="relative h-12 w-36 transition-transform duration-300 group-hover:scale-105">
              <Image src="/assets/images/logo.png" alt="MITAN Engitech Logo" fill className="object-contain" priority />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href} className="nav-link">
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button asChild variant="outline" size="sm" className="btn-ghost group bg-transparent">
              <Link href="tel:+919608888383">
                <Phone className="h-4 w-4 mr-2 transition-transform group-hover:scale-110" />
                Call Now
              </Link>
            </Button>

            <Button asChild className="btn-primary group">
              <Link
                href="https://wa.me/919608888383?text=Hello%20MITAN%20Engitech%20Services%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services."
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                <span className="hidden lg:inline">Get Quote</span>
                <span className="lg:hidden">Chat</span>
                <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden p-2 hover:bg-primary/10">
                <Menu className="h-6 w-6 text-slate-700" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-[400px] p-0">
              <div className="flex flex-col h-full bg-white">
                {/* Mobile Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-200">
                  <div className="relative h-10 w-28">
                    <Image src="/assets/images/logo.png" alt="MITAN Engitech Logo" fill className="object-contain" />
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen(false)} className="p-2">
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* Mobile Navigation */}
                <nav className="flex-1 px-6 py-8">
                  <div className="space-y-6">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block text-xl font-medium text-slate-700 hover:text-primary transition-colors py-2"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </nav>

                {/* Mobile CTA */}
                <div className="p-6 border-t border-slate-200 space-y-4">
                  <Button asChild variant="outline" className="w-full btn-secondary bg-transparent">
                    <Link href="tel:+919608888383">
                      <Phone className="h-4 w-4 mr-2" />
                      Call +91 96088 88383
                    </Link>
                  </Button>

                  <Button asChild className="w-full btn-primary">
                    <Link
                      href="https://wa.me/919608888383?text=Hello%20MITAN%20Engitech%20Services%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services."
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Get Free Quote
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
