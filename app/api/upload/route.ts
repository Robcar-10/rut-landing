import { type NextRequest, NextResponse } from "next/server"
import { v2 as cloudinary } from "cloudinary"
import { rateLimiter } from "@/lib/security"

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Rate limiting configuration
const RATE_LIMIT = {
  maxRequests: 10, // Max 10 uploads per window
  windowMs: 15 * 60 * 1000, // 15 minutes
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIP = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"

    // Apply rate limiting
    if (!rateLimiter.isAllowed(`upload:${clientIP}`, RATE_LIMIT.maxRequests, RATE_LIMIT.windowMs)) {
      return NextResponse.json({ error: "Too many upload requests. Please try again later." }, { status: 429 })
    }

    const formData = await request.formData()
    const files = formData.getAll("files") as File[]
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const company = formData.get("company") as string
    const projectName = formData.get("projectName") as string
    const notes = formData.get("notes") as string

    // Validate required fields
    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 })
    }

    if (files.length > 10) {
      return NextResponse.json({ error: "Too many files. Maximum 10 files allowed." }, { status: 400 })
    }

    // Validate each file
    for (const file of files) {
      if (file.size > 30 * 1024 * 1024) {
        // 30MB limit
        return NextResponse.json({ error: `File ${file.name} is too large. Maximum size is 30MB.` }, { status: 400 })
      }

      // Check file type
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp",
        "image/svg+xml",
        "application/pdf",
        "application/postscript",
        "application/illustrator",
        "image/vnd.adobe.photoshop",
      ]

      if (!allowedTypes.some((type) => file.type === type || file.type.includes(type.split("/")[1]))) {
        return NextResponse.json({ error: `File type ${file.type} is not allowed.` }, { status: 400 })
      }
    }

    const uploadPromises = files.map(async (file) => {
      // Convert file to buffer
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      // Generate safe filename
      const timestamp = Date.now()
      const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_")
      const publicId = `${timestamp}-${safeName}`

      // Upload to Cloudinary with security settings
      return new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type: "auto",
              folder: "rolled-up-tees/uploads",
              public_id: publicId,
              context: {
                customer_name: name || "Unknown",
                customer_email: email || "Unknown",
                company: company || "Unknown",
                project: projectName || "Quote Request",
                notes: notes || "File upload for quote request",
                upload_ip: clientIP,
                upload_time: new Date().toISOString(),
              },
              tags: ["quote-request", "customer-upload"],
              // Security settings
              invalidate: true,
              overwrite: false,
              unique_filename: true,
              use_filename: false,
            },
            (error, result) => {
              if (error) {
                console.error("Cloudinary upload error:", error)
                reject(error)
              } else {
                resolve({
                  url: result?.secure_url,
                  public_id: result?.public_id,
                  original_filename: file.name,
                  file_size: file.size,
                  file_type: file.type,
                  width: result?.width,
                  height: result?.height,
                })
              }
            },
          )
          .end(buffer)
      })
    })

    const uploadResults = await Promise.all(uploadPromises)

    return NextResponse.json({
      success: true,
      message: "Files uploaded successfully",
      files: uploadResults,
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Failed to upload files" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
}
