import Header from "@/components/header"
import Hero from "@/components/hero"
import TrustedBy from "@/components/trusted-by"
import About from "@/components/about"
import Process from "@/components/process"
import Services from "@/components/services"
import FAQ from "@/components/faq"
import CTA from "@/components/cta"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import WhatsAppWidget from "@/components/whatsapp-widget"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <TrustedBy />
      <About />
      <Process />
      <Services />
      <FAQ />
      <CTA />
      <Contact />
      <Footer />

      {/* WhatsApp Widget */}
      <WhatsAppWidget
        phoneNumber="919608888383"
        welcomeMessage="Hi there! How can we help you with our engineering, IT, or financial services?"
        companyName="MITAN Engitech Services"
      />
    </main>
  )
}
