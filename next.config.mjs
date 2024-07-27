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
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true, // This makes the redirect permanent (HTTP 301). Use 'false' for a temporary redirect (HTTP 302).
      },
    ];
  },
};

export default nextConfig;
