import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";

// Define the locales we support
const locales = ["en", "nl"];

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Validate that the locale is supported
  if (!locales.includes(locale)) {
    notFound();
  }

  // Load the translation messages
  let messages;
  try {
    messages = (await import(`../../messages/${locale}/index.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
