import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, service, subService, message } = body

    // Validate required fields
    if (!name || !email || !phone || !service || !message) {
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
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a valid email address.",
        },
        { status: 400 },
      )
    }

    // Log environment variables for debugging (remove in production)
    console.log("Environment check:", {
      hasHost: !!process.env.SMTP_HOST,
      hasUser: !!process.env.SMTP_USER,
      hasPass: !!process.env.SMTP_PASS,
      hasReceiver: !!process.env.RECEIVER_EMAIL,
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      user: process.env.SMTP_USER,
      receiver: process.env.RECEIVER_EMAIL,
    })

    // Validate environment variables
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.RECEIVER_EMAIL) {
      console.error("Missing required environment variables")
      return NextResponse.json(
        {
          success: false,
          message: "Server configuration error. Please contact support.",
        },
        { status: 500 },
      )
    }

    // Create transporter with multiple configuration attempts
    let transporter

    // Try primary configuration (Hostinger)
    try {
      transporter = nodemailer.createTransporter({
        host: process.env.SMTP_HOST,
        port: Number.parseInt(process.env.SMTP_PORT || "465"),
        secure: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        tls: {
          rejectUnauthorized: false,
        },
        debug: true, // Enable debug logs
        logger: true, // Enable logger
      })

      // Test the connection
      await transporter.verify()
      console.log("SMTP connection verified successfully")
    } catch (smtpError) {
      console.error("Primary SMTP configuration failed:", smtpError)

      // Try alternative configuration (less secure but more compatible)
      try {
        transporter = nodemailer.createTransporter({
          host: process.env.SMTP_HOST,
          port: 587, // Try port 587
          secure: false,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
          tls: {
            rejectUnauthorized: false,
            ciphers: "SSLv3",
          },
          requireTLS: true,
          debug: true,
          logger: true,
        })

        await transporter.verify()
        console.log("Alternative SMTP connection verified successfully")
      } catch (altSmtpError) {
        console.error("Alternative SMTP configuration also failed:", altSmtpError)

        // If SMTP fails, create a simple email notification system
        // This will at least log the form submission
        const formData = {
          name,
          email,
          phone,
          service,
          subService,
          message,
          timestamp: new Date().toISOString(),
        }

        console.log("FORM SUBMISSION (SMTP FAILED):", JSON.stringify(formData, null, 2))

        // Return success but indicate email service issue
        return NextResponse.json({
          success: true,
          message:
            "Your message has been received! Due to email service maintenance, we'll contact you directly at the provided phone number within 24 hours.",
          fallback: true,
        })
      }
    }

    // Create HTML email content
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
          }
          .container {
            background-color: #ffffff;
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          }
          .header {
            background: linear-gradient(135deg, #228082, #3a9a9c);
            color: white;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            margin-bottom: 30px;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
          }
          .field {
            margin-bottom: 20px;
            padding: 15px;
            background-color: #f8f9fa;
            border-radius: 8px;
            border-left: 4px solid #228082;
          }
          .field-label {
            font-weight: bold;
            color: #228082;
            margin-bottom: 5px;
            display: block;
          }
          .field-value {
            color: #333;
            font-size: 16px;
          }
          .message-field {
            background-color: #fff;
            border: 2px solid #e9ecef;
            border-radius: 8px;
            padding: 20px;
            margin-top: 10px;
          }
          .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 2px solid #e9ecef;
            text-align: center;
            color: #6c757d;
            font-size: 14px;
          }
          .timestamp {
            background-color: #e3f2fd;
            padding: 10px;
            border-radius: 5px;
            font-size: 12px;
            color: #1976d2;
            text-align: center;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔔 New Contact Form Submission</h1>
            <p>MITAN Engitech Services</p>
          </div>

          <div class="field">
            <span class="field-label">👤 Full Name:</span>
            <div class="field-value">${name}</div>
          </div>

          <div class="field">
            <span class="field-label">📧 Email Address:</span>
            <div class="field-value">
              <a href="mailto:${email}" style="color: #228082; text-decoration: none;">${email}</a>
            </div>
          </div>

          <div class="field">
            <span class="field-label">📱 Phone Number:</span>
            <div class="field-value">
              <a href="tel:${phone}" style="color: #228082; text-decoration: none;">${phone}</a>
            </div>
          </div>

          <div class="field">
            <span class="field-label">🔧 Service Interested In:</span>
            <div class="field-value">${service}</div>
          </div>

          ${
            subService
              ? `
          <div class="field">
            <span class="field-label">⚙️ Sub-Service:</span>
            <div class="field-value">${subService}</div>
          </div>
          `
              : ""
          }

          <div class="field">
            <span class="field-label">💬 Message:</span>
            <div class="message-field">
              ${message.replace(/\n/g, "<br>")}
            </div>
          </div>

          <div class="timestamp">
            📅 Submitted on: ${new Date().toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })} (IST)
          </div>

          <div class="footer">
            <p><strong>MITAN Engitech Services</strong></p>
            <p>Engineering Excellence • Digital Innovation • Financial Precision</p>
            <p>📍 Jamshedpur, Jharkhand | 📞 +91 96088 88383 | 🌐 mesjsr.com</p>
          </div>
        </div>
      </body>
      </html>
    `

    // Create plain text version
    const textContent = `
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

    // Email options
    const mailOptions = {
      from: {
        name: "MITAN Engitech Services",
        address: process.env.SMTP_USER,
      },
      to: process.env.RECEIVER_EMAIL,
      subject: `New Contact Form Submission - ${name}`,
      html: htmlContent,
      text: textContent,
      replyTo: email,
    }

    // Send email with retry logic
    let emailSent = false
    let attempts = 0
    const maxAttempts = 3

    while (!emailSent && attempts < maxAttempts) {
      try {
        attempts++
        console.log(`Email sending attempt ${attempts}/${maxAttempts}`)

        const info = await transporter.sendMail(mailOptions)
        console.log("Email sent successfully:", info.messageId)
        emailSent = true

        return NextResponse.json({
          success: true,
          message: "Your message has been sent successfully! We will get back to you soon.",
          messageId: info.messageId,
        })
      } catch (sendError) {
        console.error(`Email sending attempt ${attempts} failed:`, sendError)

        if (attempts >= maxAttempts) {
          // Log the form data for manual processing
          const formData = {
            name,
            email,
            phone,
            service,
            subService,
            message,
            timestamp: new Date().toISOString(),
            error: sendError instanceof Error ? sendError.message : "Unknown error",
          }

          console.log("FORM SUBMISSION (EMAIL FAILED):", JSON.stringify(formData, null, 2))

          return NextResponse.json({
            success: true,
            message:
              "Your message has been received! We're experiencing temporary email issues, but we'll contact you directly at the provided phone number within 24 hours.",
            fallback: true,
          })
        }

        // Wait before retry
        await new Promise((resolve) => setTimeout(resolve, 1000 * attempts))
      }
    }
  } catch (error) {
    console.error("Unexpected error in contact form:", error)

    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred. Please try again or contact us directly at +91 96088 88383.",
        error:
          process.env.NODE_ENV === "development"
            ? error instanceof Error
              ? error.message
              : "Unknown error"
            : undefined,
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
