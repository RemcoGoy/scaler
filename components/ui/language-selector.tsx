import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function LanguageSelector() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (value: string) => {
    // Remove the current locale from the pathname
    const segments = pathname.split("/");
    const isLocaleInPath =
      segments[1] === locale || segments[1] === "en" || segments[1] === "nl";

    const newPathname = isLocaleInPath
      ? `/${value}${pathname.substring(3)}`
      : `/${value}${pathname}`;

    router.push(newPathname);
  };

  return (
    <div className="flex items-center gap-2">
      <label className="text-sm text-muted-foreground">
        {t("app.languageSelector")}:
      </label>
      <Select value={locale} onValueChange={handleChange}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder={t("app.languageSelector")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">{t("common.english")}</SelectItem>
          <SelectItem value="nl">{t("common.dutch")}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
