// next.config.js
const withTM = require('next-transpile-modules')(['backend']);
/** @type {import('next').NextConfig} */
module.exports = withTM({
  output: 'standalone',
  reactStrictMode: true,
  compiler: {
    styledComponents: true
  },
  images: {
    domains: ['storage.googleapis.com']
  },
})