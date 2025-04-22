/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com','api.qrserver.com','localhost'],
    unoptimized: true, // Disable image optimization for images in the public folder
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'api.qrserver.com', // Add this hostname
      },
      // Add other external image hostnames here if needed
    ],
  },
};

module.exports = nextConfig;