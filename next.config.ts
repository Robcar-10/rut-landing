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

  // SIMPLIFIED REDIRECTS - Only handle domain redirects here
  async redirects() {
    return [
      // Redirect old domain to new domain (HIGHEST PRIORITY)
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "rolleduptees.com",
          },
        ],
        destination: "https://nyackscreenprinting.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.rolleduptees.com",
          },
        ],
        destination: "https://nyackscreenprinting.com/:path*",
        permanent: true,
      },
      // Redirect www subdomain to non-www for current domain
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
            value: "max-age=31536000; includeSubDomains; preload",
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
