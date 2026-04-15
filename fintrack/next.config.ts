import type { NextConfig } from "next";
import { withSerwist } from "@serwist/turbopack";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ['10.170.26.41'],
  devIndicators: false
};

export default withSerwist(nextConfig);
