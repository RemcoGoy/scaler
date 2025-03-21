import type { NextConfig } from "next";
import withNextIntl from "next-intl/plugin";
import withPWA from "next-pwa";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

const withPlugins =
  (...plugins: any[]) =>
  (nextConfig: NextConfig) =>
    plugins.reduce((acc, plugin) => plugin(acc), nextConfig);

export default withPlugins(
  withNextIntl("./lib/i18n.ts"),
  withPWA({
    dest: "public",
    register: true,
    skipWaiting: true,
  })
)(nextConfig);
