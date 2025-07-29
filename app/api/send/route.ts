import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
  console.log("=== Contact Form API Called ===")

  try {
    // Parse request body
    let body
    try {
      body = await request.json()
      console.log("Request body parsed successfully")
    } catch (parseError) {
      console.error("Failed to parse request body:", parseError)
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request format",
        },
        { status: 400 },
      )
    }

    const { name, email, phone, service, subService, message } = body

    // Validate required fields
    if (!name || !email || !phone || !service || !message) {
      console.log("Missing required fields:", {
        name: !!name,
        email: !!email,
        phone: !!phone,
        service: !!service,
        message: !!message,
      })
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields. Please fill in all required information.",
        },
        { status: 400 },
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      console.log("Invalid email format:", email)
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a valid email address.",
        },
        { status: 400 },
      )
    }

    console.log("Form data validated successfully")

    // Check environment variables
    const envVars = {
      SMTP_HOST: process.env.SMTP_HOST,
      SMTP_PORT: process.env.SMTP_PORT,
      SMTP_USER: process.env.SMTP_USER,
      SMTP_PASS: !!process.env.SMTP_PASS,
      RECEIVER_EMAIL: process.env.RECEIVER_EMAIL,
    }
    console.log("Environment variables:", envVars)

    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.RECEIVER_EMAIL) {
      console.error("Missing environment variables")

      // Log form submission for manual processing
      const formData = {
        name,
        email,
        phone,
        service,
        subService,
        message,
        timestamp: new Date().toISOString(),
        issue: "Missing environment variables",
      }
      console.log("FORM SUBMISSION (ENV MISSING):", JSON.stringify(formData, null, 2))

      return NextResponse.json({
        success: true,
        message:
          "Your message has been received! We'll contact you directly at the provided phone number within 24 hours.",
      })
    }

    // Create email content
    const emailContent = `
New Contact Form Submission - MITAN Engitech Services

Contact Details:
================
Name: ${name}
Email: ${email}
Phone: ${phone}

Service Information:
===================
Main Service: ${service}
Sub-Service: ${subService || "Not specified"}

Message:
========
${message}

---
Submitted on: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} (IST)
Website: mesjsr.com
    `

    // Try to send email
    try {
      console.log("Attempting to create SMTP transporter...")

      const transporter = nodemailer.createTransporter({
        host: process.env.SMTP_HOST,
        port: Number.parseInt(process.env.SMTP_PORT || "587"),
        secure: false, // Use STARTTLS
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        tls: {
          rejectUnauthorized: false,
        },
      })

      console.log("SMTP transporter created, verifying connection...")
      await transporter.verify()
      console.log("SMTP connection verified successfully")

      const mailOptions = {
        from: {
          name: "MITAN Engitech Services - Contact Form",
          address: process.env.SMTP_USER,
        },
        to: process.env.RECEIVER_EMAIL,
        subject: `New Contact Form Submission from ${name}`,
        text: emailContent,
        replyTo: email,
      }

      console.log("Sending email...")
      const info = await transporter.sendMail(mailOptions)
      console.log("Email sent successfully:", info.messageId)

      return NextResponse.json({
        success: true,
        message: "Your message has been sent successfully! We will get back to you soon.",
      })
    } catch (emailError) {
      console.error("Email sending failed:", emailError)

      // Log form submission for manual processing
      const formData = {
        name,
        email,
        phone,
        service,
        subService,
        message,
        timestamp: new Date().toISOString(),
        emailError: emailError instanceof Error ? emailError.message : "Unknown email error",
      }
      console.log("FORM SUBMISSION (EMAIL FAILED):", JSON.stringify(formData, null, 2))

      return NextResponse.json({
        success: true,
        message:
          "Your message has been received! We'll contact you directly at the provided phone number within 24 hours.",
      })
    }
  } catch (error) {
    console.error("Unexpected error in contact form API:", error)

    // Log the error details
    const errorDetails = {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : "No stack trace",
      timestamp: new Date().toISOString(),
    }
    console.log("API ERROR DETAILS:", JSON.stringify(errorDetails, null, 2))

    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred. Please contact us directly at +91 96088 88383.",
        ...(process.env.NODE_ENV === "development" && {
          error: error instanceof Error ? error.message : "Unknown error",
        }),
      },
      { status: 500 },
    )
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    {
      success: false,
      message: "Method not allowed. Only POST requests are accepted.",
    },
    { status: 405 },
  )
}
