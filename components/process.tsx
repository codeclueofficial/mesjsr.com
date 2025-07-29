import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, FileText, Cog, CheckCircle } from "lucide-react"

const steps = [
  {
    number: 1,
    icon: Search,
    title: "Discovery & Consultation",
    description: "We understand your requirements through detailed discussions.",
  },
  {
    number: 2,
    icon: FileText,
    title: "Planning & Proposal",
    description: "Customized plan with clear deliverables, timelines, and pricing.",
  },
  {
    number: 3,
    icon: Cog,
    title: "Execution",
    description: "Expert implementation with regular progress updates.",
  },
  {
    number: 4,
    icon: CheckCircle,
    title: "Delivery & Support",
    description: "Final delivery with ongoing support as needed.",
  },
]

export default function Process() {
  return (
    <section id="process" className="py-20 bg-primary">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="secondary" className="mb-4 bg-white text-primary">
            Our Process
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How We Work</h2>
          <p className="text-white/80">Our structured approach ensures quality results on time, every time.</p>
        </div>

        <div className="relative">
          {/* Desktop Timeline Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-white/20" />

          <div className="space-y-12 md:space-y-16">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                <div
                  className={`flex flex-col md:flex-row items-center ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Content Card */}
                  <div className="w-full md:w-5/12 mb-8 md:mb-0">
                    <Card className="service-card bg-white/10 backdrop-blur-sm border-white/20 text-white">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-white text-primary">
                            <step.icon className="h-8 w-8" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-white">{step.title}</h3>
                            <p className="text-white/80">{step.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Center Number */}
                  <div className="flex-shrink-0 w-20 h-20 rounded-full bg-white text-primary flex items-center justify-center text-2xl font-bold shadow-lg z-10 mb-8 md:mb-0">
                    {step.number}
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="w-full md:w-5/12" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
