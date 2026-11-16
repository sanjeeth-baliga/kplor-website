import type { NextConfig } from "next";

const securityHeaders = [
  // stop browsers guessing file types (blocks a class of upload/XSS tricks)
  { key: "X-Content-Type-Options", value: "nosniff" },
  // don't leak full page URLs to other sites
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // nobody can put kplor.com inside an iframe on their site (clickjacking)
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // we don't use these browser features, so switch them off
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false, // don't advertise "X-Powered-By: Next.js"
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
