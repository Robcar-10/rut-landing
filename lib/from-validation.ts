import { z } from "zod"

// Form validation schema
export const contactFormSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50, "First name too long"),
  lastName: z.string().min(1, "Last name is required").max(50, "Last name too long"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number").max(20, "Phone number too long"),
  company: z.string().min(1, "Company/Organization is required").max(100, "Company name too long"),
  location: z.string().min(1, "Location is required"),
  message: z.string().optional(),
  files: z.array(z.any()).optional(),
  uploadedFiles: z
    .array(
      z.object({
        url: z.string(),
        filename: z.string(),
        size: z.number(),
        type: z.string(),
      }),
    )
    .optional(),
})

export type ContactFormData = z.infer<typeof contactFormSchema>
