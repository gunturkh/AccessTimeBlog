import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: "/uploads/:path*",
        destination: `http://localhost:1337/uploads/:path*`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
