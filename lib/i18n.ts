import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale }) => {
  // Ensure locale is not undefined by providing a fallback
  const safeLocale = locale || "en";

  return {
    locale: safeLocale,
    messages: (await import(`@/messages/${safeLocale}/index.json`)).default,
  };
});
