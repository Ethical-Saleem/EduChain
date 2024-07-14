/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/dhhc2cxup/image/upload/**",
      },
    ],
  },
};

export default nextConfig;
