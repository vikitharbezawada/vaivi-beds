/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    // Remote images load from the origin URL; avoids Next’s 7s upstream fetch timeout on large files.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
