import Image from "next/image"
import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Phone, Mail, MapPin } from "lucide-react"

const services = [
  { name: "Electrical Engineering", href: "#electrical-engineering" },
  { name: "IT Solutions", href: "#it-solutions" },
  { name: "Minerals Supply", href: "#minerals-supply" },
  { name: "Bricks Manufacturing", href: "#bricks-manufacturing" },
  { name: "Digital Marketing", href: "#digital-marketing" },
  { name: "Taxation Services", href: "#taxation-services" },
]

const company = [
  { name: "About Us", href: "#about" },
  { name: "Our Process", href: "#process" },
  { name: "FAQ", href: "#faq" },
  { name: "Contact", href: "#contact" },
  { name: "Privacy Policy", href: "#" },
  { name: "Terms of Service", href: "#" },
]

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
]

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center">
              <div className="relative h-12 w-32">
                <Image src="/assets/images/logo-white.png" alt="MITAN Engitech Logo" fill className="object-contain" />
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed">
              Your trusted partner for engineering, IT, and financial solutions in Jamshedpur and beyond.
            </p>

            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-800"
                >
                  <social.icon className="h-5 w-5" />
                  <span className="sr-only">{social.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link href={service.href} className="text-gray-300 hover:text-white transition-colors">
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Company</h3>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-gray-300 hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact</h3>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0 text-primary" />
                <span className="text-sm">Rivett Colony, M.G.M, Dimna, Mango, Jamshedpur – 831012</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 flex-shrink-0 text-primary" />
                <Link href="tel:+919608888383" className="hover:text-white transition-colors">
                  +91 96088 88383
                </Link>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 flex-shrink-0 text-primary" />
                <Link href="mailto:info@mesjsr.com" className="hover:text-white transition-colors">
                  info@mesjsr.com
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-4 md:space-y-0">
            <p className="footer-text text-gray-400">&copy; 2025 MITAN Engitech Services. All rights reserved.</p>

            <div className="footer-text text-gray-400">
              Made with <span className="text-red-500">❤️</span> by{" "}
              <Link
                href="https://codeclue.in"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                <span className="text-cyan-400">Code</span>
                <span className="text-orange-400"> Clue</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
