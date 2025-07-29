import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "MITAN Engitech Services | Engineering, IT & Taxation Solutions",
  description:
    "Jamshedpur's premier provider of electrical engineering, IT services, digital marketing, minerals supply, and taxation solutions.",
  keywords: "electrical engineering, IT services, digital marketing, taxation, Jamshedpur, Jharkhand",
  authors: [{ name: "MITAN Engitech Services" }],
  icons: {
    icon: "/assets/images/favicon.png",
    shortcut: "/assets/images/favicon.png",
    apple: "/assets/images/favicon.png",
  },
  openGraph: {
    title: "MITAN Engitech Services",
    description: "Engineering Excellence, Digital Innovation, Financial Precision",
    url: "https://mesjsr.com",
    siteName: "MITAN Engitech Services",
    locale: "en_US",
    type: "website",
  },
  viewport: "width=device-width, initial-scale=1",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable}`}>
      <head>
        <link rel="icon" href="/assets/images/favicon.png" type="image/png" />
        <link rel="shortcut icon" href="/assets/images/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/assets/images/favicon.png" />
      </head>
      <body className={`${inter.className} font-sans antialiased`}>{children}</body>
    </html>
  )
}
