// next.config.js
const { PrismaPlugin } = require('@prisma/nextjs-monorepo-workaround-plugin')

/** @type {import('next').NextConfig} */
module.exports = {
  output: 'standalone',
  reactStrictMode: true,
  transpilePackages: ['backend'],
  images: {
    domains: [
      'storage.googleapis.com',
      'lh3.googleusercontent.com',
      'avatars.githubusercontent.com',
    ],
  },
  i18n: {
    locales: ['es'],
    defaultLocale: 'es',
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()]
    }

    return config
  },

  redirects: async () => {
    return [
      {
        source: '/ig',
        destination: createUTM('instagram', 'bio', 'none'),
        permanent: false,
      },
      {
        source: '/tt',
        destination: createUTM('tiktok', 'bio', 'none'),
        permanent: false,
      },
    ]
  },
}

function createUTM(source, medium, campaign) {
  return `${process.env.NEXT_PUBLIC_FRONTEND_URL}?utm_source=${source}&utm_medium=${medium}&utm_campaign=${campaign}`
}
