"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Phone, Mail, MapPin, Clock, CheckCircle, AlertCircle, Loader2 } from "lucide-react"

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    details: [
      { label: "Mobile", value: "+91 96088 88383", href: "tel:+919608888383" },
      { label: "Landline", value: "0657 400 3395", href: "tel:06574003395" },
    ],
  },
  {
    icon: Mail,
    title: "Email",
    details: [{ label: "General", value: "info@mesjsr.com", href: "mailto:info@mesjsr.com" }],
  },
  {
    icon: MapPin,
    title: "Offices",
    details: [
      {
        label: "Regd. Office",
        value: "Rivett Colony, M.G.M, Dimna, Mango, Jamshedpur – 831012",
      },
      {
        label: "Branch Office",
        value:
          "Shop No: 06, Smriti Vishram Complex, Near Ram Mandir, Hill View Colony, M.G.M, Dimna, Mango, Jamshedpur – 831018",
      },
    ],
  },
]

const serviceOptions = {
  "Electrical & Engineering": [
    "Professional Electrical Contractor",
    "Industrial Wiring & Panel Installation",
    "AMC & Maintenance Support",
    "Electrical System Design",
    "Power Distribution",
  ],
  "IT Services": [
    "Custom Software Development",
    "Network Infrastructure",
    "Cloud Solutions & IT Support",
    "Website Development",
    "Mobile App Development",
  ],
  "Minerals & Chemicals": [
    "Bulk Supply with Quality Assurance",
    "Construction & Manufacturing Materials",
    "Timely Delivery Across Jharkhand",
    "Industrial Chemicals",
    "Raw Materials Supply",
  ],
  "Bricks & Manufacturing": [
    "Paver Blocks",
    "Precast Compound Walls",
    "Precast Boundary Walls",
    "Custom Brick Manufacturing",
    "Construction Materials",
  ],
  "Digital Marketing": [
    "SEO & Content Marketing",
    "Social Media Management",
    "PPC & Conversion Optimization",
    "Brand Strategy",
    "Website Analytics",
  ],
  "Taxation Services": [
    "Income Tax Filing (ITR)",
    "TDS Returns & Compliance",
    "Financial Audit Support",
    "GST Registration & Filing",
    "Business Registration",
  ],
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    subService: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [statusMessage, setStatusMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")
    setStatusMessage("")

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      // Log response for debugging
      console.log("Response status:", response.status)
      console.log("Response headers:", response.headers)

      // Check if response is JSON
      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        const textResponse = await response.text()
        console.error("Non-JSON response:", textResponse)
        throw new Error("Server returned an invalid response. Please try again later.")
      }

      const result = await response.json()
      console.log("Response data:", result)

      if (response.ok && result.success) {
        setSubmitStatus("success")
        setStatusMessage(result.message)
        // Reset form after successful submission
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          subService: "",
          message: "",
        })
      } else {
        throw new Error(result.message || "Failed to send message")
      }
    } catch (error) {
      console.error("Error sending message:", error)
      setSubmitStatus("error")

      let errorMessage = "Failed to send message. Please try again or contact us directly."

      if (error instanceof Error) {
        if (error.message.includes("fetch") || error.message.includes("NetworkError")) {
          errorMessage = "Network error. Please check your connection and try again."
        } else if (error.message.includes("JSON") || error.message.includes("Unexpected token")) {
          errorMessage = "Server error. Please try again later or contact us directly."
        } else {
          errorMessage = error.message
        }
      }

      setStatusMessage(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
      // Reset sub-service when main service changes
      ...(field === "service" ? { subService: "" } : {}),
    }))
  }

  const getSubServices = () => {
    if (!formData.service) return []
    return serviceOptions[formData.service as keyof typeof serviceOptions] || []
  }

  return (
    <section id="contact" className="py-20 bg-gray-50 contact-clean">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="secondary" className="mb-4">
            Contact Us
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
          <p className="text-gray-600">
            Have questions about our services or want to discuss a project? Reach out to our team — we're happy to help.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            {contactInfo.map((info, index) => (
              <div key={index} className="card-with-border">
                <div className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 text-primary flex-shrink-0">
                      <info.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 mb-3">{info.title}</h3>
                      <div className="space-y-2">
                        {info.details.map((detail, idx) => (
                          <div key={idx}>
                            {detail.href ? (
                              <a href={detail.href} className="text-primary hover:text-primary-dark transition-colors">
                                <strong>{detail.label}:</strong> {detail.value}
                              </a>
                            ) : (
                              <p className="text-gray-600">
                                <strong>{detail.label}:</strong> {detail.value}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Business Hours */}
            <div className="bg-primary text-white rounded-lg">
              <div className="p-6">
                <div className="flex items-center space-x-4">
                  <Clock className="h-8 w-8" />
                  <div>
                    <h3 className="text-lg font-medium mb-2">Business Hours</h3>
                    <p className="text-primary-100">Monday - Saturday: 9:00 AM - 6:00 PM</p>
                    <p className="text-primary-100">Sunday: Emergency calls only</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card-clean">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Send Us a Message</h3>

              {submitStatus === "success" && (
                <div className="mb-6 p-4 bg-green-50 rounded-lg flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <p className="text-green-800">{statusMessage}</p>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="mb-6 p-4 bg-red-50 rounded-lg flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                  <p className="text-red-800">{statusMessage}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      placeholder="Enter your full name"
                      required
                      disabled={isSubmitting}
                      className="custom-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      placeholder="+91 XXXXX XXXXX"
                      required
                      disabled={isSubmitting}
                      className="custom-border"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="your.email@example.com"
                    required
                    disabled={isSubmitting}
                    className="custom-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service">Service Interested In *</Label>
                  <Select
                    onValueChange={(value) => handleChange("service", value)}
                    value={formData.service}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger className="bg-white text-gray-900 custom-border">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent className="bg-white shadow-lg">
                      {Object.keys(serviceOptions).map((service) => (
                        <SelectItem
                          key={service}
                          value={service}
                          className="text-gray-900 hover:bg-gray-100 focus:bg-gray-100 cursor-pointer"
                        >
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {formData.service && (
                  <div className="space-y-2">
                    <Label htmlFor="subService">Sub-Service</Label>
                    <Select
                      onValueChange={(value) => handleChange("subService", value)}
                      value={formData.subService}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger className="bg-white text-gray-900 custom-border">
                        <SelectValue placeholder="Select a sub-service (optional)" />
                      </SelectTrigger>
                      <SelectContent className="bg-white shadow-lg">
                        {getSubServices().map((subService) => (
                          <SelectItem
                            key={subService}
                            value={subService}
                            className="text-gray-900 hover:bg-gray-100 focus:bg-gray-100 cursor-pointer"
                          >
                            {subService}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    placeholder="Tell us about your project or requirements..."
                    rows={4}
                    required
                    disabled={isSubmitting}
                    className="custom-border"
                  />
                </div>

                <Button type="submit" className="w-full btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending Message...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <div className="card-clean overflow-hidden">
            <div className="h-96 bg-gray-200 flex items-center justify-center">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117763.31720677498!2d86.1304564!3d22.8045665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f5e31989f0e2b5%3A0xeeec8e81ce9b344!2sJamshedpur%2C%20Jharkhand!5e0!3m2!1sen!2sin!4v1626787217895!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
