// next.config.js
/** @type {import('next').NextConfig} */
module.exports = {
  output: 'standalone',
  reactStrictMode: true,
  transpilePackages: ['backend'],
  compiler: {
    styledComponents: true
  },
  images: {
    domains: ['storage.googleapis.com']
  },
}