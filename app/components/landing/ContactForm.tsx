"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Card, CardContent } from "../ui/card"
import { Textarea } from "../ui/textarea"
import { Upload, X, FileText, CheckCircle, AlertCircle, ImageIcon } from "lucide-react"
import { contactFormSchema, type ContactFormData } from "@/lib/from-validation"

interface ContactFormProps {
  currentLocation: string
}

interface FormErrors {
  [key: string]: string
}

interface UploadedFile {
  file: File
  url?: string
  public_id?: string
  uploading?: boolean
  error?: string
}

export const ContactForm = ({ currentLocation }: ContactFormProps) => {
  const [formData, setFormData] = useState<Partial<ContactFormData>>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    location: currentLocation,
    message: "",
    files: [],
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (field: keyof ContactFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateFile = (file: File): string | null => {
    const maxSize = 30 * 1024 * 1024 // 10MB
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
      "application/pdf",
      "application/illustrator",
      "application/postscript",
      "image/svg+xml",
    ]

    if (file.size > maxSize) {
      return "File size must be less than 30MB"
    }

    if (!allowedTypes.some((type) => file.type.includes(type.split("/")[1]) || file.type === type)) {
      return "File type not supported. Please use JPG, PNG, GIF, PDF, AI, EPS, or SVG files."
    }

    return null
  }

  const uploadFileToCloudinary = async (file: File): Promise<any> => {
    const formData = new FormData()
    formData.append("files", file)
    formData.append("name", `${formData.get("firstName")} ${formData.get("lastName")}`)
    formData.append("email", formData.get("email") || "")
    formData.append("company", formData.get("company") || "")
    formData.append("projectName", `Quote Request - ${formData.get("company")}`)
    formData.append("notes", formData.get("message") || "File upload for quote request")

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      throw new Error("Upload failed")
    }

    const result = await response.json()
    return result.files[0] // Return first file result
  }

  const handleFileUpload = async (files: FileList | File[]) => {
    const fileArray = Array.from(files)
    const validFiles: UploadedFile[] = []

    // Validate files first
    for (const file of fileArray) {
      const error = validateFile(file)
      if (error) {
        // Show error for invalid files
        setUploadedFiles((prev) => [...prev, { file, error }])
        continue
      }
      validFiles.push({ file, uploading: true })
    }

    // Add valid files to state with uploading status
    setUploadedFiles((prev) => [...prev, ...validFiles])

    // Upload each valid file to Cloudinary
    for (let i = 0; i < validFiles.length; i++) {
      const fileObj = validFiles[i]
      try {
        const uploadResult = await uploadFileToCloudinary(fileObj.file)

        // Update the file with upload result
        setUploadedFiles((prev) =>
          prev.map((f) =>
            f.file === fileObj.file
              ? {
                  ...f,
                  uploading: false,
                  url: uploadResult.url,
                  public_id: uploadResult.public_id,
                }
              : f,
          ),
        )
      } catch (error) {
        console.error("Upload error:", error)
        // Update file with error status
        setUploadedFiles((prev) =>
          prev.map((f) =>
            f.file === fileObj.file
              ? {
                  ...f,
                  uploading: false,
                  error: "Upload failed. Please try again.",
                }
              : f,
          ),
        )
      }
    }

    // Update form data with files
    setFormData((prev) => ({
      ...prev,
      files: [...(prev.files || []), ...fileArray],
    }))
  }

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      handleFileUpload(files)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileUpload(files)
    }
  }

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
    setFormData((prev) => ({
      ...prev,
      files: prev.files?.filter((_, i) => i !== index),
    }))
  }

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) {
      return <ImageIcon className="w-4 h-4 text-blue-500" />
    }
    return <FileText className="w-4 h-4 text-gray-500" />
  }

  const validateForm = (): boolean => {
    try {
      contactFormSchema.parse(formData)
      setErrors({})
      return true
    } catch (error: any) {
      const newErrors: FormErrors = {}
      error.errors?.forEach((err: any) => {
        const field = err.path[0]
        newErrors[field] = err.message
      })
      setErrors(newErrors)
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      // Prepare file URLs for email
      const fileUrls = uploadedFiles
        .filter((f) => f.url && !f.error)
        .map((f) => ({
          url: f.url,
          filename: f.file.name,
          size: f.file.size,
          type: f.file.type,
        }))

      // Submit quote request with file URLs
      const quoteResponse = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          location: currentLocation,
          uploadedFiles: fileUrls, // Include file URLs in the request
        }),
      })

      if (!quoteResponse.ok) {
        throw new Error("Failed to submit quote request")
      }

      setSubmitStatus("success")
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        location: currentLocation,
        message: "",
        files: [],
      })
      setUploadedFiles([])
    } catch (error) {
      console.error("Form submission error:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitStatus === "success") {
    return (
      <div className="w-full" id="contact-form">
        <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0">
          <CardContent className="p-6 sm:p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
            <p className="text-gray-600 mb-4">
              Your quote request has been submitted successfully. We'll get back to you within 24 hours with a detailed
              estimate.
            </p>
            <p className="text-sm text-gray-500">Check your email for a confirmation receipt.</p>
            <Button
              onClick={() => setSubmitStatus("idle")}
              className="mt-4 bg-purple-500 hover:bg-purple-600 text-white"
            >
              Submit Another Request
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="w-full" id="contact-form">
      <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0">
        <CardContent className="p-6 sm:p-8">
          <div className="text-center mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Get Your Free {currentLocation} Quote</h3>
            <p className="text-gray-600 text-sm sm:text-base">
              Join 500+ satisfied customers in the {currentLocation} area
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">First Name *</label>
                <Input
                  value={formData.firstName || ""}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className={`border-gray-200 focus:border-purple-400 focus:ring-purple-400 ${errors.firstName ? "border-red-500" : ""}`}
                  placeholder="John"
                />
                {errors.firstName && <p className="text-xs text-red-500">{errors.firstName}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Last Name *</label>
                <Input
                  value={formData.lastName || ""}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className={`border-gray-200 focus:border-purple-400 focus:ring-purple-400 ${errors.lastName ? "border-red-500" : ""}`}
                  placeholder="Doe"
                />
                {errors.lastName && <p className="text-xs text-red-500">{errors.lastName}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email *</label>
                <Input
                  type="email"
                  value={formData.email || ""}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`border-gray-200 focus:border-purple-400 focus:ring-purple-400 ${errors.email ? "border-red-500" : ""}`}
                  placeholder="john@company.com"
                />
                {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Phone Number *</label>
                <Input
                  value={formData.phone || ""}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className={`border-gray-200 focus:border-purple-400 focus:ring-purple-400 ${errors.phone ? "border-red-500" : ""}`}
                  placeholder="(555) 123-4567"
                />
                {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Company/Organization *</label>
              <Input
                value={formData.company || ""}
                onChange={(e) => handleInputChange("company", e.target.value)}
                className={`border-gray-200 focus:border-purple-400 focus:ring-purple-400 ${errors.company ? "border-red-500" : ""}`}
                placeholder="Your Company"
              />
              {errors.company && <p className="text-xs text-red-500">{errors.company}</p>}
            </div>

            {/* Additional Details */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Tell Us About Your Project</label>
              <Textarea
                value={formData.message || ""}
                onChange={(e) => handleInputChange("message", e.target.value)}
                className="border-gray-200 focus:border-purple-400 focus:ring-purple-400 min-h-[100px]"
                placeholder="Tell us more about your project, design ideas, deadlines, or any special requirements..."
              />
            </div>

            {/* File Upload with Drag & Drop */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Upload Design Files (Optional)</label>
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                  isDragOver ? "border-purple-400 bg-purple-50" : "border-gray-300 hover:border-purple-400"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*,.pdf,.ai,.eps,.psd,.svg"
                  onChange={handleFileInputChange}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium text-purple-600">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG, PDF, AI, EPS, SVG (max 10MB each)</p>
                </label>
              </div>

              {/* Uploaded Files */}
              {uploadedFiles.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">Uploaded Files:</p>
                  {uploadedFiles.map((fileObj, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-3 rounded-lg border ${
                        fileObj.error
                          ? "bg-red-50 border-red-200"
                          : fileObj.uploading
                            ? "bg-blue-50 border-blue-200"
                            : "bg-green-50 border-green-200"
                      }`}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        {getFileIcon(fileObj.file)}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-700 truncate">{fileObj.file.name}</p>
                          <p className="text-xs text-gray-500">
                            {(fileObj.file.size / 1024 / 1024).toFixed(1)}MB
                            {fileObj.uploading && " • Uploading..."}
                            {fileObj.error && ` • ${fileObj.error}`}
                            {fileObj.url && " • Uploaded successfully"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {fileObj.uploading && (
                          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        )}
                        {fileObj.url && <CheckCircle className="w-4 h-4 text-green-500" />}
                        {fileObj.error && <AlertCircle className="w-4 h-4 text-red-500" />}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting || uploadedFiles.some((f) => f.uploading)}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold"
            >
              {isSubmitting
                ? "Submitting..."
                : uploadedFiles.some((f) => f.uploading)
                  ? "Uploading Files..."
                  : "Get My Free Quote Now"}
            </Button>

            {submitStatus === "error" && (
              <div className="flex items-center gap-2 text-red-600 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>There was an error submitting your request. Please try again.</span>
              </div>
            )}

            <p className="text-xs text-gray-500 text-center">
              By submitting, you agree to receive marketing communications. We respect your privacy and won't spam you.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
