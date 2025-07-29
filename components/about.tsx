import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Shield, Users, Award } from "lucide-react"

const features = [
  {
    icon: CheckCircle,
    title: "Multidisciplinary Expertise",
    description: "One-stop solution for engineering, IT, and financial needs.",
  },
  {
    icon: Users,
    title: "Local Knowledge",
    description: "Deep understanding of Jharkhand's business landscape and regulations.",
  },
  {
    icon: Award,
    title: "Customer-Centric Approach",
    description: "Tailored solutions designed around your specific business requirements.",
  },
]

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary">About Us</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Engineering Solutions with
                <span className="gradient-text"> Digital Innovation</span>
              </h2>
            </div>

            {/* Founder Profile */}
            <Card className="card-rounded shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="relative h-16 w-16">
                    <Image
                      src="/assets/images/sonu.png"
                      alt="Sonu Chandra Mahato"
                      fill
                      className="rounded-full object-cover border-4 border-white shadow-lg ring-2 ring-primary/50"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Founder & CEO</h4>
                    <p className="text-primary font-medium">Sonu Chandra Mahato</p>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">
                  Founded by <strong>Sonu Chandra Mahato</strong>, MITAN Engitech Services brings together technical
                  expertise and business acumen to deliver integrated solutions.
                </p>

                <div className="flex items-center space-x-2 text-sm">
                  <Shield className="h-4 w-4 text-primary" />
                  <span className="font-medium">GST Registered:</span>
                  <span className="text-gray-600">20CNTPM6803M1ZL</span>
                </div>
              </CardContent>
            </Card>

            <p className="text-gray-600 leading-relaxed">
              Based in Jamshedpur, Jharkhand, we serve clients across industries with a commitment to quality,
              reliability, and innovation. Our multidisciplinary approach allows us to address complex challenges with
              comprehensive solutions.
            </p>
          </div>

          <div className="space-y-6">
            <Card className="glass-effect card-rounded">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Why Choose MITAN Engitech?</h3>

                <div className="space-y-6">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 mt-1">
                        <div className="flex items-center justify-center h-10 w-10 icon-rounded bg-primary/10 text-primary">
                          <feature.icon className="h-5 w-5" />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-gray-900 mb-1">{feature.title}</h4>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
