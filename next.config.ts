import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    appDir: true,
    ppr: true,
  },
  images: {
    domains: [
      'barkprotocol.app',
      'anotherdomain.',  // Add any additional domains as needed
      'jifbskgfpwgodbkfsdqr.supabase.co', // Supabase domain
      'ucarecdn.com' // Domain for images
    ],
  },
};

export default nextConfig;
