"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ScaleConverter from "@/components/scaler/ScaleConverter";
import UnitConverter from "@/components/scaler/UnitConverter";

interface TabsContainerProps {
  scaleTabLabel: string;
  unitsTabLabel: string;
}

export default function TabsContainer({ scaleTabLabel, unitsTabLabel }: TabsContainerProps) {
  const [activeTab, setActiveTab] = useState<"scale" | "units">("scale");

  const handleTabChange = (value: string) => {
    setActiveTab(value as "scale" | "units");
  };

  return (
    <Tabs
      value={activeTab}
      onValueChange={handleTabChange}
      className="w-full mb-8"
    >
      <TabsList className="grid w-full grid-cols-2 mb-8">
        <TabsTrigger value="scale">{scaleTabLabel}</TabsTrigger>
        <TabsTrigger value="units">{unitsTabLabel}</TabsTrigger>
      </TabsList>

      <TabsContent value="scale">
        <ScaleConverter />
      </TabsContent>

      <TabsContent value="units">
        <UnitConverter />
      </TabsContent>
    </Tabs>
  );
} 