import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function GET(request: NextRequest) {
  try {
    // Check environment variables
    const envCheck = {
      SMTP_HOST: !!process.env.SMTP_HOST,
      SMTP_PORT: !!process.env.SMTP_PORT,
      SMTP_USER: !!process.env.SMTP_USER,
      SMTP_PASS: !!process.env.SMTP_PASS,
      RECEIVER_EMAIL: !!process.env.RECEIVER_EMAIL,
    }

    console.log("Environment variables check:", envCheck)

    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      return NextResponse.json({
        success: false,
        message: "Missing environment variables",
        envCheck,
      })
    }

    // Test SMTP connection
    const transporter = nodemailer.createTransporter({
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
    })

    await transporter.verify()

    return NextResponse.json({
      success: true,
      message: "SMTP connection successful",
      config: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        user: process.env.SMTP_USER,
        secure: true,
      },
    })
  } catch (error) {
    console.error("SMTP test failed:", error)

    return NextResponse.json({
      success: false,
      message: "SMTP connection failed",
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }
}
