import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone, MessageCircle, ArrowRight } from "lucide-react"

export default function CTA() {
  return (
    <section className="py-20 bg-primary text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-black/10" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold leading-tight">Ready to Transform Your Business?</h2>

          <p className="text-xl text-white/90 leading-relaxed">
            Whether you need engineering solutions, digital transformation, or financial services, our team is ready to
            help your business thrive.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Button asChild size="lg" className="cta-call-btn group">
              <Link href="tel:+919608888383">
                <Phone className="mr-2 h-5 w-5" />
                Call Now
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            <Button asChild variant="outline" size="lg" className="cta-whatsapp-btn group bg-transparent">
              <Link
                href="https://wa.me/919608888383?text=Hello%20MITAN%20Engitech%20Services%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services."
                target="_blank"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp Us
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-white/20">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-white/80">Support Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">500+</div>
              <div className="text-white/80">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">15+</div>
              <div className="text-white/80">Years Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
