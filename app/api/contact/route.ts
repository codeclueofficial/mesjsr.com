import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, service, subService, message } = body

    // Validate required fields
    if (!name || !email || !phone || !service || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create email content
    const emailContent = `
New Contact Form Submission from MITAN Engitech Website

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
This message was sent from the contact form on mesjsr.com
Timestamp: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
    `

    // For now, we'll use a simple approach with mailto
    // In production, you would use a service like Nodemailer, SendGrid, or similar

    // Create a formatted response for the client
    const emailData = {
      to: "info@mesjsr.com",
      subject: `New Contact Form Submission - ${name}`,
      body: emailContent,
      timestamp: new Date().toISOString(),
    }

    // Log the submission (in production, you might want to store this in a database)
    console.log("Contact form submission:", emailData)

    // Since we can't directly send emails from the client-side without a proper email service,
    // we'll create a mailto link that opens the user's email client
    const subject = encodeURIComponent(`New Contact Form Submission - ${name}`)
    const emailBody = encodeURIComponent(emailContent)
    const mailtoLink = `mailto:info@mesjsr.com?subject=${subject}&body=${emailBody}`

    return NextResponse.json({
      success: true,
      message: "Form submitted successfully",
      mailtoLink,
      data: emailData,
    })
  } catch (error) {
    console.error("Error processing contact form:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
