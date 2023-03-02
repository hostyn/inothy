// next.config.js

module.exports = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true
  },
  images: {
    domains: ['storage.googleapis.com']
  }
  // swcMinify: true,
  // async headers() {
  //   return [
  //     {
  //       source: "/",
  //       headers: [
  //         {
  //           key: "cross-origin-opener-policy",
  //           value: "same-origin",
  //         },
  //         {
  //           key: "cross-origin-embedder-policy",
  //           value: "require-corp",
  //         },
  //       ],
  //     },
  //   ];
  // },

  // ... other configs
}
