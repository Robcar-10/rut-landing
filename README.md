# Rolled Up Tees - Custom Screen Printing & Embroidery

A Next.js 15 application for Rolled Up Tees, providing custom screen printing and embroidery services in the Nyack, NY area.

## Installation & Setup

### Prerequisites

- Node.js 18.0.0 or higher
- npm 8.0.0 or higher
- Cloudinary account (for file uploads)
- Resend account (for email notifications)

### Quick Start

1. **Install dependencies:**
\`\`\`bash
npm install
\`\`\`

2. **Set up environment variables:**
\`\`\`bash
cp .env.example .env.local
\`\`\`

3. **Configure your environment variables:**

#### Required - Email Configuration (Resend)
\`\`\`env
RESEND_API_KEY=your_resend_api_key_here
SENDER_EMAIL=noreply@yourdomain.com
GOOGLE_USER=your-email@gmail.com
\`\`\`

#### Required - File Upload Configuration (Cloudinary)
\`\`\`env
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
\`\`\`

4. **Run the development server:**
\`\`\`bash
npm run dev
\`\`\`

5. **Open your browser:**
Navigate to [http://localhost:3000](http://localhost:3000)

## Getting Your API Keys

### Cloudinary Setup
1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Go to your Dashboard
3. Copy your **Cloud Name**, **API Key**, and **API Secret**
4. Add them to your \`.env.local\` file

### Resend Setup
1. Sign up at [resend.com](https://resend.com)
2. Go to API Keys section
3. Create a new API key
4. Add it to your \`.env.local\` file

## Features

- ✅ **File Upload System** with Cloudinary integration
- ✅ **Drag & Drop** file upload functionality
- ✅ **Email Notifications** with file attachments via Resend
- ✅ **Location-based landing pages** with SEO optimization
- ✅ **Contact form** with validation and file upload
- ✅ **Responsive design** with Tailwind CSS
- ✅ **Form validation** with Zod
- ✅ **TypeScript** support throughout
- ✅ **Modern React 18.2.0** with Next.js 15

## File Upload Features

- **Supported file types**: JPG, PNG, GIF, WebP, SVG, PDF, AI, EPS, PSD
- **File size limit**: 30MB per file (increased from 10MB)
- **Multiple file upload**: Yes
- **Drag & drop**: Fully functional
- **Upload progress**: Real-time status indicators
- **Error handling**: Comprehensive validation and error messages
- **Email integration**: Files are linked in both admin and customer emails

## Tech Stack

- **Framework:** Next.js 15
- **React:** 18.2.0
- **TypeScript:** 5.6.3
- **Styling:** Tailwind CSS 3.4.14
- **UI Components:** Radix UI
- **File Storage:** Cloudinary 2.5.1
- **Email:** Resend 4.0.1
- **Validation:** Zod 3.23.8
- **Animations:** GSAP 3.12.5

## Environment Variables

| Variable | Description | Required | Where to Get |
|----------|-------------|----------|--------------|
| \`RESEND_API_KEY\` | Your Resend API key for sending emails | Yes | [resend.com](https://resend.com) |
| \`SENDER_EMAIL\` | The email address to send from | Yes | Your domain email |
| \`GOOGLE_USER\` | The email address to receive form submissions | Yes | Your email |
| \`CLOUDINARY_CLOUD_NAME\` | Your Cloudinary cloud name | Yes | [cloudinary.com](https://cloudinary.com) dashboard |
| \`CLOUDINARY_API_KEY\` | Your Cloudinary API key | Yes | [cloudinary.com](https://cloudinary.com) dashboard |
| \`CLOUDINARY_API_SECRET\` | Your Cloudinary API secret | Yes | [cloudinary.com](https://cloudinary.com) dashboard |

## Scripts

- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm run start\` - Start production server
- \`npm run lint\` - Run ESLint

## Deployment

This app is optimized for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Set all environment variables in Vercel dashboard
3. Deploy automatically on push to main branch
4. Test file upload and email functionality after deployment

### Vercel Configuration for Large Files

When deploying to Vercel, you may need to configure the following:

1. **Function timeout**: Increase if large file uploads are timing out
2. **Memory allocation**: Consider upgrading to Pro plan for better performance with large files
3. **Edge functions**: May have different limits than serverless functions

## File Size Limits

- **Development**: 30MB per file
- **Production (Vercel)**: 
  - Hobby plan: 5MB request body limit
  - Pro plan: 5MB request body limit (but can be increased)
  - Enterprise: Custom limits available

**Note**: For production deployments with 30MB files, you may need Vercel Pro or Enterprise plan, or consider direct client-to-Cloudinary uploads.

## Troubleshooting

### File Upload Issues
- Verify Cloudinary credentials are correct
- Check file size limits (30MB max in development)
- Ensure file types are supported
- Check browser console for upload errors
- For production: Verify Vercel plan supports large file uploads

### Large File Upload Tips
- Files over 5MB may require Vercel Pro plan in production
- Consider implementing direct client-to-Cloudinary uploads for very large files
- Monitor upload progress and provide user feedback
- Implement retry logic for failed uploads

### Email Issues
- Verify Resend API key is valid
- Check sender email is verified in Resend
- Ensure recipient email is correct
- Check Resend dashboard for delivery status

### Build Issues
- Run \`npm run build\` locally first
- Check for TypeScript errors
- Verify all environment variables are set
- Clear \`.next\` folder and rebuild if needed
