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

      return NextResponse.json(
        {
          success: false,
          message:
            "Email service is temporarily unavailable. Please contact us directly at +91 96088 88383 or info@mesjsr.com",
        },
        { status: 500 },
      )
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

    // Try to send email with both configurations
    try {
      console.log("Attempting to create SMTP transporter...")

      // Primary configuration (port 587)
      let transporter = nodemailer.createTransporter({
        host: "smtp.hostinger.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        tls: {
          rejectUnauthorized: false,
        },
      })

      try {
        console.log("Testing SMTP connection (port 587)...")
        await transporter.verify()
        console.log("SMTP connection verified successfully (port 587)")
      } catch (error1) {
        console.log("Port 587 failed, trying port 465...")

        // Alternative configuration (port 465)
        transporter = nodemailer.createTransporter({
          host: "smtp.hostinger.com",
          port: 465,
          secure: true,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
          tls: {
            rejectUnauthorized: false,
          },
        })

        await transporter.verify()
        console.log("SMTP connection verified successfully (port 465)")
      }

      const mailOptions = {
        from: {
          name: "MITAN Engitech Services - Contact Form",
          address: process.env.SMTP_USER,
        },
        to: process.env.RECEIVER_EMAIL,
        subject: `New Contact Form Submission from ${name}`,
        html: htmlContent,
        replyTo: email,
      }

      console.log("Sending email...")
      const info = await transporter.sendMail(mailOptions)
      console.log("Email sent successfully:", info.messageId)

      return NextResponse.json({
        success: true,
        message: "Your message has been sent successfully! We will get back to you soon.",
        messageId: info.messageId,
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

      return NextResponse.json(
        {
          success: false,
          message: "Failed to send email. Please contact us directly at +91 96088 88383 or info@mesjsr.com",
        },
        { status: 500 },
      )
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
