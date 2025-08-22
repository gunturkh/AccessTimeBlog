import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
      }
    ],
  },
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

export default withNextIntl(nextConfig);
