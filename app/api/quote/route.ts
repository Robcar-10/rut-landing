import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import QuoteRequestEmail from "@/app/components/email-templates/quote-request-email"
import UserReceiptEmail from "@/app/components/email-templates/user-receipt-email"
import { contactFormSchema } from "@/lib/from-validation"

// Initialize Resend with API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    // Step 1: Parse the request body safely
    let data
    try {
      data = await request.json()
    } catch (parseError) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }

    // Step 2: Validate the input data with Zod
    try {
      contactFormSchema.parse(data)
    } catch (validationError: any) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validationError.errors,
        },
        { status: 400 },
      )
    }

    // Step 3: Extract data
    const { firstName, lastName, email, phone, company, location, message, uploadedFiles } = data

    // Step 4: Send emails using Resend
    try {
      const userFullName = `${firstName} ${lastName}`

      // Send internal notification email with file attachments
      await resend.emails.send({
        from: `${userFullName} <${process.env.SENDER_EMAIL}>`,
        to: process.env.GOOGLE_USER as string,
        reply_to: email,
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
