import { Body, Container, Head, Heading, Hr, Html, Preview, Section, Text, Link } from "@react-email/components"
import { Tailwind } from "@react-email/tailwind"

interface UploadedFile {
  url: string
  filename: string
  size: number
  type: string
}

interface UserReceiptEmailProps {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  message?: string
  uploadedFiles?: UploadedFile[]
}

const UserReceiptEmail = ({
  firstName,
  lastName,
  email,
  phone,
  company,
  message,
  uploadedFiles = [],
}: UserReceiptEmailProps) => {
  const previewText = `Thank you for your quote request, ${firstName}!`

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
            {/* Header */}
            <Section className="mt-4 text-center">
              <Heading className="text-2xl font-bold ">ROLLED UP TEES</Heading>
              <Text className="text-gray-600">Quote Request Receipt</Text>
            </Section>

            <Hr className="border-gray-200 my-4" />

            {/* Message */}
            <Section className="text-lg">
              <Text className="text-gray-700">
                Hi {firstName}, thank you for requesting a quote with Rolled Up Tees!
              </Text>
              <Text className="text-gray-700">
                Our team is currently reviewing your request and will get back to you as soon as possible with a
                detailed estimate. If you have any urgent questions, feel free to contact us.
              </Text>
            </Section>

            {/* Quote Request Summary */}
            <Section className="mt-4 bg-gray-50 p-4 rounded-lg">
              <Heading className="text-base font-semibold mb-4">Quote Request Summary</Heading>

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

              {/* Project Details */}
              {message && (
                <Section className="mt-2">
                  <Text className="text-sm font-medium text-gray-500 mb-1">Project Details:</Text>
                  <Text className="text-sm text-gray-700">{message}</Text>
                </Section>
              )}

              {/* Files Summary */}
              {uploadedFiles && uploadedFiles.length > 0 && (
                <Section className="mt-2">
                  <Text className="text-sm font-medium text-gray-500 mb-1">
                    Uploaded Files ({uploadedFiles.length}):
                  </Text>
                  {uploadedFiles.map((file, index) => (
                    <Text key={index} className="text-sm text-gray-700">
                      • {file.filename} ({(file.size / 1024 / 1024).toFixed(1)}MB)
                    </Text>
                  ))}
                </Section>
              )}
            </Section>

            {/* Next Steps */}
            <Section className="mt-6">
              <Text className="text-gray-700 font-medium">What Happens Next?</Text>
              <Text className="text-sm text-gray-600">
                1. Our team will review your request and uploaded files.
                <br />
                2. We&apos;ll prepare a detailed quote based on your specifications.
                <br />
                3. You&apos;ll receive your estimate within 24 hours.
                <br />
                4. We&apos;ll follow up with any questions or design suggestions.
              </Text>
            </Section>

            {/* Contact Info */}
            <Section className="mt-6 bg-[#F5E8FF] p-4 rounded-lg">
              <Text className="text-sm text-gray-600 text-center">
                Have questions? Contact us at{" "}
                <Link href="mailto:info@rolleduptees.com" className="text-[#B221F6] underline">
                  info@rolleduptees.com
                </Link>{" "}
                or call{" "}
                <Link href="tel:+118453582037" className="text-[#B221F6] underline">
                  (845) 358-2037
                </Link>
              </Text>
            </Section>

            {/* Footer */}
            <Hr className="border-gray-200 my-6" />
            <Section>
              <Text className="text-xs text-gray-500 text-center">
                © {new Date().getFullYear()} Rolled Up Tees. All rights reserved.
                <br />
                298 Route 59, Unit 296, Nyack, NY 10960
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default UserReceiptEmail
