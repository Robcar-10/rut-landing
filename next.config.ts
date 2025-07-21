/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placeholder.svg",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // External packages that should be bundled for server components
  serverExternalPackages: ["cloudinary"],

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      }
    }
    return config
  },

  // SIMPLIFIED REDIRECTS - Only essential ones to avoid redirect chains
  async redirects() {
    return [
      // Only redirect www to non-www (most important for SEO)
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.nyackscreenprinting.com",
          },
        ],
        destination: "https://nyackscreenprinting.com/:path*",
        permanent: true,
      },
      // Remove trailing slashes ONLY if they exist (avoid redirect loops)
      {
        source: "/:path+/",
        destination: "/:path+",
        permanent: true,
      },
    ]
  },

  // Headers for SEO and security
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
