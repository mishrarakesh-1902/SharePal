/** @type {import('next').NextConfig} */
const nextConfig = {
  generateBuildId: async () => {
    return "sharepal-build";
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.sharepal.in",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "sharepal.in",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
