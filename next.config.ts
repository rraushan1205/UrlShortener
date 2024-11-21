import type { NextConfig } from "next";
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });
const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    AUTH: process.env.AUTH, // Expose environment variable to client-side if needed
  },
};

export default nextConfig;
