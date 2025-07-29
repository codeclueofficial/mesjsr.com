"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Play, Star, CheckCircle, Zap, Users, Award } from "lucide-react"

const stats = [
  { number: "500+", label: "Projects Completed", icon: CheckCircle },
  { number: "15+", label: "Years Experience", icon: Award },
  { number: "24/7", label: "Support Available", icon: Zap },
  { number: "98%", label: "Client Satisfaction", icon: Users },
]

const floatingElements = [
  { icon: "⚡", label: "Electrical", position: "top-4 left-4", delay: "0s" },
  { icon: "💻", label: "IT Solutions", position: "bottom-4 right-4", delay: "0.5s" },
  { icon: "🏗️", label: "Engineering", position: "top-1/2 -right-8", delay: "1s" },
  { icon: "📊", label: "Analytics", position: "bottom-8 left-8", delay: "1.5s" },
]

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center hero-gradient overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl animate-pulse-soft" />
      <div
        className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-full blur-3xl animate-pulse-soft"
        style={{ animationDelay: "1s" }}
      />

      <div className="container-modern relative z-10 pt-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className={`space-y-8 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            {/* Badge */}
            <div className="flex items-center space-x-4">
              <Badge className="badge-modern">
                <Star className="h-4 w-4 mr-2 fill-current" />
                Trusted by 500+ Businesses
              </Badge>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-sm text-slate-600 ml-2">4.9/5 rating</span>
              </div>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="hero-title">
                Engineering Excellence
                <br />
                <span className="gradient-primary">Digital Innovation</span>
                <br />
                <span className="text-secondary">Financial Precision</span>
              </h1>

              <p className="text-xl text-slate-600 leading-relaxed max-w-2xl">
                MITAN Engitech Services delivers integrated solutions across engineering, technology, and financial
                services — tailored to drive your business forward in Jharkhand and beyond.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="btn-primary group">
                <Link href="#contact">
                  Get Started Today
                  <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>

              <Button asChild variant="outline" size="lg" className="btn-secondary group bg-transparent">
                <Link href="#services">
                  <Play className="h-5 w-5 mr-2" />
                  Explore Services
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-slate-200">
              {stats.map((stat, index) => (
                <div key={stat.label} className="text-center group" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="flex items-center justify-center mb-2">
                    <stat.icon className="h-5 w-5 text-primary mr-2" />
                    <div className="text-2xl font-bold text-slate-900">{stat.number}</div>
                  </div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image */}
          <div className={`relative ${isVisible ? "animate-slide-in-right" : "opacity-0"}`}>
            <div className="relative">
              {/* Main Image Container */}
              <div className="relative bg-white p-4 rounded-3xl shadow-2xl hover-lift">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-xl opacity-50" />
                <Image
                  src="/assets/images/hero-image.jpg"
                  alt="Engineering and IT services"
                  width={600}
                  height={400}
                  className="relative rounded-2xl animate-float object-cover w-full h-auto"
                  style={{ minHeight: "300px", maxHeight: "400px" }}
                  priority
                />
              </div>

              {/* Floating Elements */}
              {floatingElements.map((element, index) => (
                <div
                  key={element.label}
                  className={`absolute ${element.position} hidden lg:block`}
                  style={{ animationDelay: element.delay }}
                >
                  <div className="card-glass group hover:scale-110 transition-transform duration-300 cursor-pointer">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{element.icon}</span>
                      <span className="text-sm font-medium text-slate-700">{element.label}</span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-primary to-primary-dark rounded-full opacity-20 animate-pulse-soft" />
              <div
                className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-secondary to-secondary-dark rounded-full opacity-20 animate-pulse-soft"
                style={{ animationDelay: "0.5s" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-slate-400 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  )
}
