"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Zap, Monitor, Package, Building, TrendingUp, Calculator, CheckCircle, ArrowRight } from "lucide-react"

const services = [
  {
    id: "electrical-engineering",
    icon: Zap,
    title: "Electrical & Engineering",
    description: "Professional electrical installations, maintenance, and industrial engineering solutions.",
    features: [
      "Professional Electrical Contractor",
      "Industrial Wiring & Panel Installation",
      "AMC & Maintenance Support",
    ],
    gradient: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    id: "it-solutions",
    icon: Monitor,
    title: "IT Services",
    description: "Comprehensive technology solutions to drive your digital transformation.",
    features: ["Custom Software Development", "Network Infrastructure", "Cloud Solutions & IT Support"],
    gradient: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    id: "minerals-supply",
    icon: Package,
    title: "Minerals & Chemicals",
    description: "Reliable sourcing and supply of industrial minerals and chemicals.",
    features: [
      "Bulk Supply with Quality Assurance",
      "Construction & Manufacturing Materials",
      "Timely Delivery Across Jharkhand",
    ],
    gradient: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
  },
  {
    id: "bricks-manufacturing",
    icon: Building,
    title: "Bricks Manufacturing",
    description: "High-quality bricks produced with precision and durability for all construction needs.",
    features: ["Paver Blocks", "Precast Compound Walls", "Precast Boundary Walls"],
    gradient: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50",
    iconColor: "text-orange-600",
  },
  {
    id: "digital-marketing",
    icon: TrendingUp,
    title: "Digital Marketing",
    description: "Data-driven strategies to grow your online presence and customer base.",
    features: ["SEO & Content Marketing", "Social Media Management", "PPC & Conversion Optimization"],
    gradient: "from-pink-500 to-pink-600",
    bgColor: "bg-pink-50",
    iconColor: "text-pink-600",
  },
  {
    id: "taxation-services",
    icon: Calculator,
    title: "Taxation Services",
    description: "Expert financial services to ensure compliance and optimize your tax position.",
    features: ["Income Tax Filing (ITR)", "TDS Returns & Compliance", "Financial Audit Support"],
    gradient: "from-indigo-500 to-indigo-600",
    bgColor: "bg-indigo-50",
    iconColor: "text-indigo-600",
  },
]

export default function Services() {
  return (
    <section id="services" className="section-padding bg-white">
      <div className="container-modern">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge className="badge-modern">Our Services</Badge>
          <h2 className="section-title">Comprehensive Solutions for Your Business</h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            From engineering to digital transformation, we provide end-to-end services to meet all your operational
            needs with professional excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={service.id}
              className="group bg-white rounded-2xl border border-slate-200/60 transition-all duration-300 hover:shadow-2xl hover:border-primary/30 hover:-translate-y-2 cursor-pointer overflow-hidden relative"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Hover Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <CardHeader className="pb-4 relative z-10">
                <div
                  className={`w-16 h-16 rounded-2xl ${service.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-soft`}
                >
                  <service.icon className={`h-8 w-8 ${service.iconColor}`} />
                </div>
                <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">
                  {service.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6 relative z-10">
                <p className="text-slate-600 leading-relaxed">{service.description}</p>

                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm text-slate-600">
                      <CheckCircle className="h-4 w-4 text-secondary mr-3 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant="ghost"
                  className="w-full group-hover:bg-primary group-hover:text-white transition-all duration-300 mt-6"
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="card-glass max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Need a Custom Solution?</h3>
            <p className="text-slate-600 mb-6">
              We specialize in creating tailored solutions that perfectly match your business requirements.
            </p>
            <Button asChild className="btn-primary">
              <a href="#contact">
                Discuss Your Project
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
