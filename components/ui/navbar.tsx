"use client";

import { LanguageSelector } from "@/components/ui/language-selector";
import { useTranslations } from "next-intl";

export function Navbar() {
  const t = useTranslations();

  return (
    <header className="bg-white shadow-sm py-4 border-b">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 items-center">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-gray-800">
              {t("app.title")}
            </h1>
            <p className="hidden sm:block text-sm text-gray-600">
              {t("app.subtitle")}
            </p>
          </div>
          <div className="justify-self-end">
            <LanguageSelector />
          </div>
        </div>
      </div>
    </header>
  );
}
