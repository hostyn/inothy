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
      'i0.wp.com',
      'lh3.googleusercontent.com',
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
}
