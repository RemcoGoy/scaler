"use client";

import { useState } from "react";
import ScaleConverter from "@/components/scaler/ScaleConverter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { Navbar } from "@/components/ui/navbar";
import LengthConverter from "@/components/scaler/LengthConverter";
import AreaConverter from "@/components/scaler/AreaConverter";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"scale" | "units">("scale");
  const t = useTranslations();

  const handleTabChange = (value: string) => {
    setActiveTab(value as "scale" | "units");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="container mx-auto py-8 px-4">
        {/* Tab Selector */}
        <div className="max-w-4xl mx-auto">
          <Tabs
            value={activeTab}
            onValueChange={handleTabChange}
            className="w-full mb-8"
          >
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="scale">{t("tabs.scale")}</TabsTrigger>
              <TabsTrigger value="length">{t("tabs.length")}</TabsTrigger>
              <TabsTrigger value="area">{t("tabs.area")}</TabsTrigger>
            </TabsList>

            <TabsContent value="scale">
              <ScaleConverter />
            </TabsContent>

            <TabsContent value="length">
              <LengthConverter />
            </TabsContent>

            <TabsContent value="area">
              <AreaConverter />
            </TabsContent>
          </Tabs>
        </div>

        {/* Information Section */}
        <Card className="mt-12 max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">{t("info.title")}</CardTitle>
            <CardDescription>{t("info.subtitle")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">{t("info.scaleInfo")}</p>

            <div>
              <h3 className="text-xl font-semibold mb-2">
                {t("info.whyScale")}
              </h3>
              <ul className="list-disc pl-6 space-y-2 mb-6 text-muted-foreground">
                <li>{t("info.whyScaleInfo1")}</li>
                <li>{t("info.whyScaleInfo2")}</li>
                <li>{t("info.whyScaleInfo3")}</li>
                <li>{t("info.whyScaleInfo4")}</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">
                {t("info.workingWithScale")}
              </h3>
              <p className="mb-4 text-muted-foreground">
                {t("info.workingWithScaleInfo")}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">
                {t("info.tipsForArchitectureStudents")}
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>{t("info.tips1")}</li>
                <li>{t("info.tips2")}</li>
                <li>{t("info.tips3")}</li>
                <li>{t("info.tips4")}</li>
                <li>{t("info.tips5")}</li>
                <li>{t("info.tips6")}</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </main>

      <footer className="bg-slate-900 text-slate-200 py-6 mt-12">
        <div className="container mx-auto px-4">
          <p className="text-center text-slate-400">{t("app.footerText")}</p>
        </div>
      </footer>
    </div>
  );
}
