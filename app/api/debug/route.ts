import { NextResponse } from "next/server"

export async function GET() {
  try {
    const envCheck = {
      NODE_ENV: process.env.NODE_ENV,
      SMTP_HOST: process.env.SMTP_HOST || "missing",
      SMTP_PORT: process.env.SMTP_PORT || "missing",
      SMTP_USER: process.env.SMTP_USER || "missing",
      SMTP_PASS: process.env.SMTP_PASS ? "present" : "missing",
      RECEIVER_EMAIL: process.env.RECEIVER_EMAIL || "missing",
    }

    return NextResponse.json({
      success: true,
      message: "Debug endpoint working",
      environment: envCheck,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Debug endpoint failed",
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }
}

export async function POST() {
  return NextResponse.json({
    success: true,
    message: "POST request received successfully",
    timestamp: new Date().toISOString(),
  })
}
