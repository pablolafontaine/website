/** @type {import('next').NextConfig} */

module.exports = {
  crossOrigin: 'anonymous',
  images: {
    remotePatterns: [
      {
       protocol: "https",
       hostname: "i.scdn.co",
       port: "", 
      }
    ]
  }
}