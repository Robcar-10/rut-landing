import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import QuoteRequestEmail from "@/app/components/email-templates/quote-request-email"
import UserReceiptEmail from "@/app/components/email-templates/user-receipt-email"
import { contactFormSchema } from "@/lib/from-validation"

// Initialize Resend with API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY)

// Rate limiting configuration
const RATE_LIMIT = {
  maxRequests: 5, // Max 5 quote requests per window
  windowMs: 15 * 60 * 1000, // 15 minutes
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIP = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"

    // Apply rate limiting
    if (!rateLimiter.isAllowed(`quote:${clientIP}`, RATE_LIMIT.maxRequests, RATE_LIMIT.windowMs)) {
      return NextResponse.json({ error: "Too many quote requests. Please try again later." }, { status: 429 })
    }

    // Step 1: Parse the request body safely
    let data
    try {
      data = await request.json()
    } catch (parseError) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }

    // Step 2: Sanitize inputs
    const sanitizedData = {
      ...data,
      firstName: sanitizeInput(data.firstName || ""),
      lastName: sanitizeInput(data.lastName || ""),
      email: sanitizeInput(data.email || ""),
      phone: sanitizeInput(data.phone || ""),
      company: sanitizeInput(data.company || ""),
      location: sanitizeInput(data.location || ""),
      message: sanitizeInput(data.message || ""),
    }

    // Step 3: Additional security validations
    if (!isValidEmail(sanitizedData.email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
    }

    if (!isValidPhone(sanitizedData.phone)) {
      return NextResponse.json({ error: "Invalid phone number" }, { status: 400 })
    }

    // Check for honeypot field (anti-bot)
    if (data.website && data.website.trim() !== "") {
      console.log("Bot detected via honeypot field")
      return NextResponse.json({ error: "Invalid submission" }, { status: 400 })
    }

    // Step 4: Validate with Zod schema
    try {
      contactFormSchema.parse(sanitizedData)
    } catch (validationError: any) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validationError.errors,
        },
        { status: 400 },
      )
    }

    // Step 5: Extract data
    const { firstName, lastName, email, phone, company, location, message, uploadedFiles } = sanitizedData

    // Step 6: Send emails using Resend
    try {
      const userFullName = `${firstName} ${lastName}`

      // Send internal notification email with file attachments
      await resend.emails.send({
        from: `${userFullName} <${process.env.SENDER_EMAIL}>`,
        to: process.env.GOOGLE_USER as string,
        replyTo: email,
        subject: `New Quote Request from ${firstName} ${lastName} (${location})`,
        react: QuoteRequestEmail({
          firstName,
          lastName,
          email,
          phone,
          company,
          location,
          message,
          uploadedFiles: uploadedFiles || [],
        }),
      })

      // Send customer receipt email
      await resend.emails.send({
        from: `Rolled Up Tees <${process.env.SENDER_EMAIL}>`,
        to: email,
        subject: "Thank You for Your Quote Request!",
        react: UserReceiptEmail({
          firstName,
          lastName,
          email,
          phone,
          company,
          message,
          uploadedFiles: uploadedFiles || [],
        }),
      })

      return NextResponse.json(
        {
          message: "Quote request submitted successfully",
          success: true,
        },
        { status: 200 },
      )
    } catch (emailError) {
      console.error("Error sending email:", emailError)
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
    }
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Handle non-POST requests
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
}
