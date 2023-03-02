// next.config.js
/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true
  },
  images: {
    domains: ['storage.googleapis.com']
  }
}
