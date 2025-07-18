"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, X, FileText, CheckCircle, AlertCircle, ImageIcon, Phone, Mail } from "lucide-react"
import { contactFormSchema, type ContactFormData } from "@/lib/form-validation"
import { trackQuoteRequest, trackFileUpload } from "@/lib/analytics"
import { useCookieConsent } from "@/hooks/useCookieConsent"
import { validateFile, isValidEmail, isValidPhone } from "@/lib/security"

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

// Client-side honeypot creation
const createClientHoneypot = () => ({
  name: "website", // Common field name bots might fill
  style: {
    position: "absolute" as const,
    left: "-9999px",
    top: "-9999px",
    opacity: 0,
    pointerEvents: "none" as const,
    tabIndex: -1,
  },
})

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
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error" | "fallback">("idle")
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const [isFirstResponderPage, setIsFirstResponderPage] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { hasConsent } = useCookieConsent()
  const honeypot = createClientHoneypot()

  // Check if we're on a first responder page - client-side only
  useEffect(() => {
    const path = window.location.pathname.toLowerCase()
    setIsFirstResponderPage(
      path.includes("first-responder") ||
        path.includes("fire-department") ||
        path.includes("police") ||
        path.includes("ems") ||
        path.includes("paramedic"),
    )
  }, [])

  const handleInputChange = (field: keyof ContactFormData, value: any) => {
    // For most text fields, just do basic sanitization that preserves spaces
    let sanitizedValue = value

    if (typeof value === "string") {
      // For email and phone, we can be more strict
      if (field === "email") {
        sanitizedValue = value.trim().toLowerCase()
      } else if (field === "phone") {
        // Allow spaces, dashes, parentheses, and plus for phone formatting
        sanitizedValue = value.replace(/[^\d\s\-$$$$+.]/g, "")
      } else {
        // For names, company, location, message - preserve spaces and normal punctuation
        sanitizedValue = value
          .replace(/[<>]/g, "") // Remove HTML tags
          .replace(/javascript:/gi, "") // Remove javascript protocol
          .replace(/on\w+=/gi, "") // Remove event handlers
          .substring(0, field === "message" ? 2000 : 200) // Different limits for different fields
      }
    }

    setFormData((prev) => ({ ...prev, [field]: sanitizedValue }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
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
      const errorData = await response.json()
      throw new Error(errorData.error || "Upload failed")
    }

    const result = await response.json()
    return result.files[0]
  }

  const handleFileUpload = async (files: FileList | File[]) => {
    const fileArray = Array.from(files)

    // Limit number of files
    if (uploadedFiles.length + fileArray.length > 10) {
      alert("Maximum 10 files allowed")
      return
    }

    const validFiles: UploadedFile[] = []

    // Validate files first
    for (const file of fileArray) {
      const validation = validateFile(file)
      if (!validation.isValid) {
        setUploadedFiles((prev) => [...prev, { file, error: validation.error }])
        continue
      }
      validFiles.push({ file, uploading: true })
    }

    // Add valid files to state with uploading status
    setUploadedFiles((prev) => [...prev, ...validFiles])

    // Track file upload event (only if analytics consent given)
    if (hasConsent("analytics") && validFiles.length > 0) {
      trackFileUpload(validFiles.length, currentLocation)
    }

    // Upload each valid file to Cloudinary
    for (let i = 0; i < validFiles.length; i++) {
      const fileObj = validFiles[i]
      try {
        const uploadResult = await uploadFileToCloudinary(fileObj.file)

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
        setUploadedFiles((prev) =>
          prev.map((f) =>
            f.file === fileObj.file
              ? {
                  ...f,
                  uploading: false,
                  error: error instanceof Error ? error.message : "Upload failed. Please try again.",
                }
              : f,
          ),
        )
      }
    }

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
    const newErrors: FormErrors = {}

    // Additional client-side validation
    if (!isValidEmail(formData.email || "")) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!isValidPhone(formData.phone || "")) {
      newErrors.phone = "Please enter a valid phone number"
    }

    try {
      contactFormSchema.parse(formData)
      setErrors(newErrors)
      return Object.keys(newErrors).length === 0
    } catch (error: any) {
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
          uploadedFiles: fileUrls,
          isFirstResponderDiscount: isFirstResponderPage,
        }),
      })

      const responseData = await quoteResponse.json()

      if (!quoteResponse.ok) {
        // Check if this is a fallback error (service unavailable)
        if (responseData.fallback) {
          setSubmitStatus("fallback")
        } else {
          throw new Error(responseData.error || "Failed to submit quote request")
        }
        return
      }

      // Track successful quote request (only if consent given)
      if (hasConsent("analytics") || hasConsent("marketing")) {
        trackQuoteRequest(currentLocation, formData.company || "Unknown")
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

  if (submitStatus === "fallback") {
    return (
      <div className="w-full" id="contact-form">
        <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0">
          <CardContent className="p-6 sm:p-8 text-center">
            <AlertCircle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Contact Us Directly</h3>
            <p className="text-gray-600 mb-6">
              Our online form is temporarily unavailable, but we're here to help! Contact us directly using the options
              below:
            </p>

            <div className="space-y-4">
              <Button asChild className="w-full bg-green-500 hover:bg-green-600 text-white py-3 text-lg">
                <a href="tel:+18453582037" className="flex items-center justify-center gap-2">
                  <Phone className="w-5 h-5" />
                  Call (845) 358-2037
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                className="w-full border-purple-300 text-purple-600 hover:bg-purple-50 py-3 text-lg bg-transparent"
              >
                <a href="mailto:info@rolleduptees.com" className="flex items-center justify-center gap-2">
                  <Mail className="w-5 h-5" />
                  Email info@rolleduptees.com
                </a>
              </Button>
            </div>

            <Button onClick={() => setSubmitStatus("idle")} variant="ghost" className="mt-4 text-gray-500">
              Try Form Again
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
            {/* Honeypot field for bot detection */}
            <input type="text" name={honeypot.name} style={honeypot.style} tabIndex={-1} autoComplete="off" />

            {/* Personal Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">First Name *</label>
                <Input
                  value={formData.firstName || ""}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className={`border-gray-200 focus:border-purple-400 focus:ring-purple-400 ${errors.firstName ? "border-red-500" : ""}`}
                  placeholder="John"
                  maxLength={50}
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
                  maxLength={50}
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
                  maxLength={254}
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
                  maxLength={20}
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
                maxLength={100}
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
                maxLength={1000}
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
                  <p className="text-xs text-gray-500">PNG, JPG, PDF, AI, EPS, SVG (max 30MB each, 10 files max)</p>
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

            {/* First Responder Discount - Only show on first responder pages */}
            {isFirstResponderPage && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="first-responder-discount"
                    className="mt-1"
                    onChange={(e) => {
                      // You can add logic here to apply the discount
                      console.log("First responder discount applied:", e.target.checked)
                    }}
                  />
                  <label htmlFor="first-responder-discount" className="text-sm">
                    <span className="font-medium text-red-600 block mb-1">Apply First Responder Discount</span>
                    <span className="text-gray-600">
                      10% OFF your first order + free design consultation. Available for Police, Fire, EMS, and other
                      emergency services.
                    </span>
                  </label>
                </div>
              </div>
            )}

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
                <span>
                  There was an error submitting your request. Please try again or contact us directly at (845) 358-2037.
                </span>
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
