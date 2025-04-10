import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";

// Define the locales we support
const locales = ["en", "nl"];

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Extract locale from params
  const { locale } = await params;

  // Validate that the locale is supported
  if (!locales.includes(locale)) {
    notFound();
  }

  // Load the translation messages
  let messages;
  try {
    messages = (await import(`@/messages/${locale}/index.json`)).default;
  } catch (error) {
    console.error(error);
    notFound();
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
