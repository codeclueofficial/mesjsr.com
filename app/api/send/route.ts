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

    // Create transporter using environment variables
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: Number.parseInt(process.env.SMTP_PORT || "465"),
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      // Add additional options for better compatibility
      tls: {
        rejectUnauthorized: false,
      },
    })

    // Verify transporter configuration
    try {
      await transporter.verify()
    } catch (verifyError) {
      console.error("SMTP verification failed:", verifyError)
      return NextResponse.json(
        {
          success: false,
          message: "Email service is currently unavailable. Please try again later or contact us directly.",
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

    // Email options
    const mailOptions = {
      from: {
        name: "MITAN Engitech Services",
        address: process.env.SMTP_USER,
      },
      to: process.env.RECEIVER_EMAIL,
      subject: "New Contact Form Submission",
      html: htmlContent,
      replyTo: email, // Allow direct reply to the customer
    }

    // Send email
    const info = await transporter.sendMail(mailOptions)

    console.log("Email sent successfully:", info.messageId)

    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully! We will get back to you soon.",
      messageId: info.messageId,
    })
  } catch (error) {
    console.error("Error sending email:", error)

    // Handle specific nodemailer errors
    let errorMessage = "Failed to send message. Please try again later."

    if (error instanceof Error) {
      if (error.message.includes("EAUTH")) {
        errorMessage = "Email authentication failed. Please contact support."
      } else if (error.message.includes("ECONNECTION")) {
        errorMessage = "Unable to connect to email server. Please try again."
      } else if (error.message.includes("EMESSAGE")) {
        errorMessage = "Invalid email format. Please check your information."
      }
    }

    return NextResponse.json(
      {
        success: false,
        message: errorMessage,
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
