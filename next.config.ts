import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Image actions validate files at 2 MB; allow room for multipart metadata.
      bodySizeLimit: "3mb",
    },
  },
  images: {
    qualities: [60, 75],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tzmvvcbuhvyphzfefmbt.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/wisata/**",
      },
      {
        protocol: "https",
        hostname: "tzmvvcbuhvyphzfefmbt.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/umkm/**",
      },
    ],
  },
};

export default nextConfig;
