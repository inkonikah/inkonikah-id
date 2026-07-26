import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() { return [{ source: "/package", destination: "/", permanent: true }, { source: "/:locale(ko|en|ja|id)/package", destination: "/:locale", permanent: true }]; },
};

export default withNextIntl(nextConfig);
