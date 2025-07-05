import { hostname } from "os";

const nextConfig = {
  experimental: {
    allowedDevOrigins: ['http://192.168.56.1:3000'],
  },
  images:{
    remotePatterns:[
      {protocol:"https", hostname:"cdn.sanity.io"}
    ]
  }
} as any;

export default nextConfig;
