"use client"

import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, Award, Clock } from "lucide-react"

const companies = [
  { name: "TATA", color: "text-blue-600" },
  { name: "JUSCO", color: "text-gray-700" },
  { name: "Adani", color: "text-green-600" },
  { name: "JSPL", color: "text-blue-600" },
  { name: "UCIL", color: "text-red-600" },
]

const achievements = [
  {
    icon: Users,
    value: "98%",
    label: "Client Satisfaction",
    color: "text-green-600",
  },
  {
    icon: Clock,
    value: "24h",
    label: "Response Time",
    color: "text-blue-600",
  },
  {
    icon: Award,
    value: "15+",
    label: "Years Experience",
    color: "text-purple-600",
  },
  {
    icon: TrendingUp,
    value: "500+",
    label: "Happy Clients",
    color: "text-orange-600",
  },
]

export default function TrustedBy() {
  return (
    <section className="py-16 bg-slate-50/50">
      <div className="container-modern">
        <div className="text-center space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <Badge className="badge-modern">
              <Award className="h-4 w-4 mr-2" />
              Trusted by Industry Leaders
            </Badge>
            <p className="text-lg text-slate-600 font-medium">Powering businesses across Jharkhand and beyond</p>
          </div>

          {/* Company Logos */}
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {companies.map((company, index) => (
              <div
                key={company.name}
                className={`text-2xl md:text-3xl font-bold ${company.color} hover:scale-110 transition-all duration-300 cursor-pointer opacity-80 hover:opacity-100`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {company.name}
              </div>
            ))}
          </div>

          {/* Achievements Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-slate-200">
            {achievements.map((achievement, index) => (
              <div
                key={achievement.label}
                className="text-center group hover:scale-105 transition-transform duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-center mb-3">
                  <div
                    className={`p-3 rounded-full bg-white shadow-soft ${achievement.color} group-hover:shadow-medium transition-shadow`}
                  >
                    <achievement.icon className="h-6 w-6" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-1">{achievement.value}</div>
                <div className="text-sm text-slate-600 font-medium">{achievement.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
