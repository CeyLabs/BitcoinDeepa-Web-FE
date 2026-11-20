import path from 'path'
import { withConsentManifest } from 'c15t/next/build'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

let userConfig = undefined

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: __dirname,
  images: {
    formats: ['image/avif', 'image/webp'],
    // Cache optimized images for a week. Use this instead of a custom
    // Cache-Control header on /_next/image, which Next.js doesn't support.
    minimumCacheTTL: 604800,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'blog.bitcoindeepa.com',
      },
      {
        protocol: 'https',
        hostname: 'images.lumacdn.com',
      },
      {
        protocol: 'https',
        hostname: '**.lu.ma',
      },
      {
        protocol: 'https',
        hostname: 'ceylabs.io',
      },
      {
        // Ghost (blog.bitcoindeepa.com) serves post images from this CDN.
        protocol: 'https',
        hostname: 'digitalpress.fra1.cdn.digitaloceanspaces.com',
      },
    ],
  },
  experimental: {
    webpackBuildWorker: true,
  },
  async redirects() {
    return [
      { source: '/terms-of-service', destination: '/terms', permanent: true },
      { source: '/terms-and-conditions', destination: '/terms', permanent: true },
      { source: '/refund-policy', destination: '/return-policy', permanent: true },
      { source: '/returns', destination: '/return-policy', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            // Only origins the browser itself contacts. Event and news images
            // come through /_next/image (same origin), and the blog is only
            // linked, so preconnecting to those would just waste a connection.
            key: 'Link',
            value: [
              // Events API, fetched from the browser.
              '<https://ceylabs.io>; rel=preconnect',
              // Consent backend: the browser asks it for the policy on first load.
              '<https://consent.ceylabs.io>; rel=preconnect',
              // Meta Pixel library loads after marketing consent: resolve DNS early only.
              '<https://connect.facebook.net>; rel=dns-prefetch',
            ].join(', '),
          },
        ],
      },
      // No custom Cache-Control for /_next/*: Next.js already serves hashed
      // static chunks as immutable in production, and forcing it in dev makes
      // the browser keep stale chunks (hydration mismatches after edits).
    ];
  },
}

if (userConfig) {
  const config = userConfig.default || userConfig
  for (const key in config) {
    if (typeof nextConfig[key] === 'object' && !Array.isArray(nextConfig[key])) {
      nextConfig[key] = { ...nextConfig[key], ...config[key] }
    } else {
      nextConfig[key] = config[key]
    }
  }
}

// Finds c15t.config.ts. In hosted() mode it downloads no policy manifest, so
// the build never depends on the consent backend.
export default withConsentManifest(nextConfig)
