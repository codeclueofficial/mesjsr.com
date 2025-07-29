import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function GET(request: NextRequest) {
  try {
    // Check environment variables
    const envCheck = {
      SMTP_HOST: process.env.SMTP_HOST || "missing",
      SMTP_PORT: process.env.SMTP_PORT || "missing",
      SMTP_USER: process.env.SMTP_USER || "missing",
      SMTP_PASS: process.env.SMTP_PASS ? "present" : "missing",
      RECEIVER_EMAIL: process.env.RECEIVER_EMAIL || "missing",
    }

    console.log("Environment variables check:", envCheck)

    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      return NextResponse.json({
        success: false,
        message: "Missing environment variables",
        envCheck,
      })
    }

    // Test primary SMTP configuration (port 587)
    const transporter1 = nodemailer.createTransport({
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
      await transporter1.verify()

      // Try sending a test email
      const testEmail = {
        from: {
          name: "MITAN Engitech Services - Test",
          address: process.env.SMTP_USER,
        },
        to: process.env.RECEIVER_EMAIL,
        subject: "SMTP Test Email",
        html: `
          <h2>SMTP Test Successful</h2>
          <p>This is a test email to verify SMTP configuration.</p>
          <p>Timestamp: ${new Date().toISOString()}</p>
        `,
      }

      const info = await transporter1.sendMail(testEmail)

      return NextResponse.json({
        success: true,
        message: "SMTP connection and email sending successful",
        config: {
          host: "smtp.hostinger.com",
          port: 587,
          secure: false,
          user: process.env.SMTP_USER,
        },
        messageId: info.messageId,
      })
    } catch (error1) {
      console.error("Port 587 failed:", error1)

      // Test alternative SMTP configuration (port 465)
      const transporter2 = nodemailer.createTransport({
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

      try {
        await transporter2.verify()

        return NextResponse.json({
          success: true,
          message: "SMTP connection successful (port 465)",
          config: {
            host: "smtp.hostinger.com",
            port: 465,
            secure: true,
            user: process.env.SMTP_USER,
          },
          note: "Port 587 failed, but port 465 works",
        })
      } catch (error2) {
        console.error("Port 465 also failed:", error2)

        return NextResponse.json({
          success: false,
          message: "Both SMTP configurations failed",
          errors: {
            port587: error1 instanceof Error ? error1.message : "Unknown error",
            port465: error2 instanceof Error ? error2.message : "Unknown error",
          },
          envCheck,
        })
      }
    }
  } catch (error) {
    console.error("SMTP test failed:", error)

    return NextResponse.json({
      success: false,
      message: "SMTP test failed",
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }
}
