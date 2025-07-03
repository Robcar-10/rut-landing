# Rolled Up Tees - Custom Screen Printing & Embroidery

A Next.js 15 application for Rolled Up Tees, providing custom screen printing and embroidery services in the Nyack, NY area.

## Quick Start

1. **Install dependencies:**
\`\`\`bash
npm install
\`\`\`

2. **Set up environment variables:**
\`\`\`bash
cp .env.example .env.local
\`\`\`

3. **Run development server:**
\`\`\`bash
npm run dev
\`\`\`

4. **Open [http://localhost:3000](http://localhost:3000)**

## Features

- ✅ Next.js 15 with App Router
- ✅ Location-based landing pages
- ✅ Contact form with file upload
- ✅ Email notifications via Resend
- ✅ Responsive design with Tailwind CSS
- ✅ Form validation with Zod
- ✅ TypeScript support

## Tech Stack

- **Framework:** Next.js 15
- **React:** 18.2.0
- **TypeScript:** 5.6.3
- **Styling:** Tailwind CSS 3.4.14
- **UI Components:** Radix UI
- **Email:** Resend 4.0.1
- **Validation:** Zod 3.23.8

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| \`RESEND_API_KEY\` | Your Resend API key | Yes |
| \`SENDER_EMAIL\` | Email address to send from | Yes |
| \`GOOGLE_USER\` | Email to receive submissions | Yes |
