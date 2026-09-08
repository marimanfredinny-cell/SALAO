/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Modern formats requested in the brief (WebP / AVIF).
    formats: ["image/avif", "image/webp"],
    // Swap / extend these when you host Kassen's real photography.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  // three.js ships untranspiled ESM in a few sub-paths; let Next handle it.
  transpilePackages: ["three"],
};

export default nextConfig;
