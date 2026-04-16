import type { NextConfig } from "next";
import { withSerwist } from "@serwist/turbopack";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ['10.170.26.41'],
  devIndicators: false,

  async headers() {
    return [
      {
        source: '/sw/sw.js',
        headers: [
          { key: 'Service-Worker-Allowed', value: '/' }
        ]
      }
    ]
  },
};

export default withSerwist(nextConfig);
