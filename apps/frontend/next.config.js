// next.config.js
/** @type {import('next').NextConfig} */
module.exports = {
  output: 'standalone',
  reactStrictMode: true,
  transpilePackages: ['backend'],
  images: {
    domains: ['storage.googleapis.com', 'i0.wp.com', 'lh3.googleusercontent.com']
  },
  i18n: {
    locales: ['es'],
    defaultLocale: 'es'
  }
}