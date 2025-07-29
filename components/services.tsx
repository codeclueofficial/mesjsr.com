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
    color: "from-blue-500 to-blue-600",
  },
  {
    id: "it-solutions",
    icon: Monitor,
    title: "IT Services",
    description: "Comprehensive technology solutions to drive your digital transformation.",
    features: ["Custom Software Development", "Network Infrastructure", "Cloud Solutions & IT Support"],
    color: "from-purple-500 to-purple-600",
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
    color: "from-green-500 to-green-600",
  },
  {
    id: "bricks-manufacturing",
    icon: Building,
    title: "Bricks Manufacturing",
    description: "High-quality bricks produced with precision and durability for all construction needs.",
    features: ["Paver Blocks", "Precast Compound Walls", "Precast Boundary Walls"],
    color: "from-orange-500 to-orange-600",
  },
  {
    id: "digital-marketing",
    icon: TrendingUp,
    title: "Digital Marketing",
    description: "Data-driven strategies to grow your online presence and customer base.",
    features: ["SEO & Content Marketing", "Social Media Management", "PPC & Conversion Optimization"],
    color: "from-pink-500 to-pink-600",
  },
  {
    id: "taxation-services",
    icon: Calculator,
    title: "Taxation Services",
    description: "Expert financial services to ensure compliance and optimize your tax position.",
    features: ["Income Tax Filing (ITR)", "TDS Returns & Compliance", "Financial Audit Support"],
    color: "from-indigo-500 to-indigo-600",
  },
]

export default function Services() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="secondary" className="mb-4">
            Our Services
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Comprehensive Solutions for Your Business
          </h2>
          <p className="text-gray-600">
            From engineering to digital transformation, we provide end-to-end services to meet all your operational
            needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={service.id}
              className="service-card group hover:shadow-2xl card-rounded overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="pb-4">
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}
                >
                  <service.icon className="h-7 w-7" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                  {service.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-gray-600">{service.description}</p>

                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-secondary mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button variant="ghost" className="w-full service-learn-btn mt-4">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
