import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images : {
    remotePatterns : [
      {
        protocol : "https",
        hostname : "res.cloudinary.com",
        pathname : '/midhun2006/**'
      }
    ]
  },
};

export default nextConfig;
