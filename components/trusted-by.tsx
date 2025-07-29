"use client"

import { Badge } from "@/components/ui/badge"

const companies = [
  { name: "TATA", color: "text-blue-600" },
  { name: "JUSCO", color: "text-gray-700" },
  { name: "Adani", color: "text-green-600" },
  { name: "JSPL", color: "text-blue-600" },
  { name: "UCIL", color: "text-red-600" },
]

export default function TrustedBy() {
  return (
    <section className="py-16 bg-gray-50/50">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-8">
          <Badge variant="outline" className="mx-auto">
            Trusted by Industry Leaders
          </Badge>

          <p className="text-gray-500 font-medium">Powering businesses across Jharkhand and beyond</p>

          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {companies.map((company, index) => (
              <div
                key={company.name}
                className={`text-2xl md:text-3xl font-bold ${company.color} hover:scale-110 transition-transform cursor-pointer`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {company.name}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-gray-200">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">98%</div>
              <div className="text-sm text-gray-600">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">24h</div>
              <div className="text-sm text-gray-600">Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">15+</div>
              <div className="text-sm text-gray-600">Years in Business</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">500+</div>
              <div className="text-sm text-gray-600">Happy Clients</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
