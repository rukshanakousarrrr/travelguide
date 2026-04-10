import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // Google OAuth avatars
      },
    ],
  },

  // Allow Turbopack (default in Next 16) to handle these packages
  serverExternalPackages: ["bcryptjs", "nodemailer"],
};

export default nextConfig;
