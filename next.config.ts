import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Static export: keeps the existing nginx/static hosting pipeline unchanged.
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Lint style rules predate the migration and stay available via `npm run lint`;
  // they are not part of the production build (matching the old Vite setup).
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
