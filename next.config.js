const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["flagcdn.com"],
  },
  experimental: {
    images: {
      allowFutureImage: true,
    },
  },
};

module.exports = nextConfig;
