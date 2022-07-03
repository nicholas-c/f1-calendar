/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["flagcdn.com"],
  },
  experimental: {
    runtime: "experimental-edge",
    images: {
      allowFutureImage: true,
    },
  },
};

module.exports = nextConfig;
