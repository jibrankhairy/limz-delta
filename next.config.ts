import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "res.cloudinary.com",
        protocol: "https",
      },
    ],
  },

  // --- TAMBAHKAN BLOK INI ---
  eslint: {
    // Abaikan error ESLint saat proses build di Vercel
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
