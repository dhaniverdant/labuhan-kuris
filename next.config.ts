import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
