import { Body, Container, Head, Heading, Hr, Html, Preview, Section, Text, Link, Img } from "@react-email/components"
import { Tailwind } from "@react-email/tailwind"

interface UploadedFile {
  url: string
  filename: string
  size: number
  type: string
}

interface QuoteRequestEmailProps {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  location: string
  message?: string
  uploadedFiles?: UploadedFile[]
}

const QuoteRequestEmail = ({
  firstName,
  lastName,
  email,
  phone,
  company,
  location,
  message,
  uploadedFiles = [],
}: QuoteRequestEmailProps) => {
  const previewText = `New quote request from ${firstName} ${lastName}`

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
            <Section className="mt-4 text-center">
              <Heading className="text-2xl font-bold text-purple-600">New Quote Request</Heading>
              <Text className="text-gray-600">From {location} Customer</Text>
            </Section>

            <Hr className="border-gray-200 my-4" />

            <Section className="bg-gray-50 p-4 rounded-lg">
              <Heading className="text-base font-semibold mb-4">Customer Information</Heading>

              <Section>
                <Text className="text-sm font-medium text-gray-500 mb-1">Name:</Text>
                <Text className="text-sm text-gray-700">
                  {firstName} {lastName}
                </Text>
              </Section>

              <Section>
                <Text className="text-sm font-medium text-gray-500 mb-1">Email:</Text>
                <Text className="text-sm text-gray-700">{email}</Text>
              </Section>

              <Section>
                <Text className="text-sm font-medium text-gray-500 mb-1">Phone:</Text>
                <Text className="text-sm text-gray-700">{phone}</Text>
              </Section>

              <Section>
                <Text className="text-sm font-medium text-gray-500 mb-1">Company:</Text>
                <Text className="text-sm text-gray-700">{company}</Text>
              </Section>

              <Section>
                <Text className="text-sm font-medium text-gray-500 mb-1">Location:</Text>
                <Text className="text-sm text-gray-700">{location}</Text>
              </Section>
            </Section>

            <Section className="mt-4 bg-purple-50 p-4 rounded-lg">
              <Heading className="text-base font-semibold mb-4">Project Details</Heading>

              {message && (
                <Section>
                  <Text className="text-sm font-medium text-gray-500 mb-1">Project Description:</Text>
                  <Text className="text-sm text-gray-700">{message}</Text>
                </Section>
              )}

              {!message && (
                <Section>
                  <Text className="text-sm text-gray-700 italic">No additional details provided</Text>
                </Section>
              )}
            </Section>

            {/* Uploaded Files Section */}
            {uploadedFiles && uploadedFiles.length > 0 && (
              <Section className="mt-4 bg-blue-50 p-4 rounded-lg">
                <Heading className="text-base font-semibold mb-4">Uploaded Files ({uploadedFiles.length})</Heading>

                {uploadedFiles.map((file, index) => (
                  <Section key={index} className="mb-3 p-3 bg-white rounded border">
                    <div className="flex items-center justify-between">
                      <div>
                        <Text className="text-sm font-medium text-gray-700 mb-1">{file.filename}</Text>
                        <Text className="text-xs text-gray-500">
                          {file.type} • {(file.size / 1024 / 1024).toFixed(1)}MB
                        </Text>
                      </div>
                    </div>

                    {/* Show image preview for image files */}
                    {file.type.startsWith("image/") && (
                      <Section className="mt-2">
                        <Img src={file.url} alt={file.filename} width="200" height="auto" className="rounded border" />
                      </Section>
                    )}

                    <Section className="mt-2">
                      <Link href={file.url} className="text-blue-600 underline text-sm" target="_blank">
                        View/Download File →
                      </Link>
                    </Section>
                  </Section>
                ))}
              </Section>
            )}

            <Section className="mt-6">
              <Text className="text-xs text-gray-500 text-center">
                Reply to this email to respond directly to the customer.
                {uploadedFiles && uploadedFiles.length > 0 && (
                  <>
                    <br />
                    Files are hosted securely and will be available for 30 days.
                  </>
                )}
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default QuoteRequestEmail
