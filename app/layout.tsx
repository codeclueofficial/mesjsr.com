import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import WhatsAppWidget from "@/components/whatsapp-widget"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "MITAN Engitech Services | Engineering, IT & Taxation Solutions",
  description:
    "Jamshedpur's premier provider of electrical engineering, IT services, digital marketing, minerals supply, and taxation solutions.",
  keywords: "electrical engineering, IT services, digital marketing, taxation, Jamshedpur, Jharkhand",
  authors: [{ name: "MITAN Engitech Services" }],
  openGraph: {
    title: "MITAN Engitech Services",
    description: "Engineering Excellence, Digital Innovation, Financial Precision",
    url: "https://mesjsr.com",
    siteName: "MITAN Engitech Services",
    locale: "en_US",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${poppins.variable} font-sans antialiased`}>
        {children}

        {/* Global WhatsApp Widget */}
        <WhatsAppWidget
          phoneNumber="919608888383"
          welcomeMessage="Hi there! How can we help you with our engineering, IT, or financial services?"
          companyName="MITAN Engitech Services"
        />
      </body>
    </html>
  )
}
