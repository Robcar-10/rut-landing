import { type NextRequest, NextResponse } from "next/server"
import { v2 as cloudinary } from "cloudinary"

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const files = formData.getAll("files") as File[]
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const company = formData.get("company") as string
    const projectName = formData.get("projectName") as string
    const notes = formData.get("notes") as string

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 })
    }

    const uploadPromises = files.map(async (file) => {
      // Convert file to buffer
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      // Upload to Cloudinary
      return new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type: "auto", // Automatically detect file type
              folder: "rolled-up-tees/uploads", // Organize uploads in folder
              public_id: `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`,
              context: {
                customer_name: name,
                customer_email: email,
                company: company,
                project: projectName,
                notes: notes,
              },
              tags: ["quote-request", "customer-upload"],
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
