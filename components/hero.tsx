"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Play, Star } from "lucide-react"

export default function Hero() {
  return (
    <section id="home" className="hero-gradient py-12 md:py-20 lg:py-32 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          <div className="lg:w-1/2 space-y-6 lg:space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <Badge variant="secondary" className="w-fit">
                🏆 Trusted by 500+ Businesses
              </Badge>

              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                Engineering Excellence
                <br />
                <span className="gradient-text">Digital Innovation</span>
                <br />
                <span className="text-secondary">Financial Precision</span>
              </h1>

              <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
                MITAN Engitech Services delivers integrated solutions across engineering, technology, and financial
                services — tailored to drive your business forward.
              </p>
            </div>

            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span>4.9/5 from 200+ reviews</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="btn-primary group">
                <Link href="#contact">
                  <span className="text-white">Get Started Today</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>

              <Button asChild variant="outline" size="lg" className="btn-secondary group bg-transparent">
                <Link href="#services">
                  <Play className="mr-2 h-4 w-4" />
                  <span className="group-hover:text-white">Explore Services</span>
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-gray-600">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">15+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-gray-600">Support Available</div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-2xl">
              {/* Background gradient effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-3xl blur-3xl opacity-20 animate-pulse scale-110" />

              {/* Main image container */}
              <div className="relative bg-white p-3 md:p-4 rounded-3xl shadow-2xl">
                <Image
                  src="/assets/images/hero-image.jpg"
                  alt="Engineering and IT services"
                  width={800}
                  height={600}
                  className="rounded-2xl animate-float object-cover w-full h-auto"
                  style={{
                    minHeight: "300px",
                    maxHeight: "500px",
                    objectFit: "cover",
                  }}
                  priority
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 40vw"
                />
              </div>

              {/* Floating Cards - adjusted positioning */}
              <div className="absolute -top-2 -left-2 md:-top-4 md:-left-4 bg-white p-3 md:p-4 rounded-xl shadow-lg animate-bounce z-10">
                <div className="text-xl md:text-2xl">⚡</div>
                <div className="text-xs font-medium">Electrical</div>
              </div>

              <div className="absolute -bottom-2 -right-2 md:-bottom-4 md:-right-4 bg-white p-3 md:p-4 rounded-xl shadow-lg animate-bounce delay-300 z-10">
                <div className="text-xl md:text-2xl">💻</div>
                <div className="text-xs font-medium">IT Solutions</div>
              </div>

              {/* Additional floating element for larger screens */}
              <div className="hidden lg:block absolute top-1/2 -right-8 bg-white p-3 rounded-xl shadow-lg animate-bounce delay-500 z-10">
                <div className="text-xl">🏗️</div>
                <div className="text-xs font-medium">Engineering</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
