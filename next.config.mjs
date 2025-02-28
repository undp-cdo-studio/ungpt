import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  // If you're using static exports
  trailingSlash: true,
  // redirect
  async redirects() {
    return [
      {
        source: '/new',
        destination: process.env.NEXT_PUBLIC_NEW_FORM_URL,
        permanent: true,
      },
    ];
  },
  // Add domains configuration
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/:subdomain/:path*',
          destination: '/:subdomain/:path*',
        },
      ],
    }
  },
  // Configure allowed domains for deployment
  env: {
    NEXT_PUBLIC_VERCEL_URL: process.env.VERCEL_URL,
    NEXT_PUBLIC_DOMAIN: process.env.DOMAIN,
    CLIENT_ID: process.env.CLIENT_ID,
    AUTHORITY: process.env.AUTHORITY,
    REDIRECT_URL: process.env.REDIRECT_URL,
  },
  experimental: {
    disableOptimizedLoading: true,
  },
};

export default withNextIntl(nextConfig);
