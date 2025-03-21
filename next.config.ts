import type { NextConfig } from "next";
import withNextIntl from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
};

export default withNextIntl("./lib/i18n.ts")(nextConfig);
