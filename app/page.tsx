"use client";

import { useState } from "react";
import ScaleConverter from "@/components/scaler/ScaleConverter";
import UnitConverter from "@/components/scaler/UnitConverter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"scale" | "units">("scale");

  const handleTabChange = (value: string) => {
    setActiveTab(value as "scale" | "units");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow-sm py-6 border-b">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center text-gray-800">
            Architectural Scale & Unit Converter
          </h1>
          <p className="text-center text-gray-600 mt-2">
            A tool for architecture students to work with scales and unit
            conversions
          </p>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        {/* Tab Selector */}
        <div className="max-w-4xl mx-auto">
          <Tabs
            value={activeTab}
            onValueChange={handleTabChange}
            className="w-full mb-8"
          >
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="scale">Scale Converter</TabsTrigger>
              <TabsTrigger value="units">Unit Converter</TabsTrigger>
            </TabsList>

            <TabsContent value="scale">
              <ScaleConverter />
            </TabsContent>

            <TabsContent value="units">
              <UnitConverter />
            </TabsContent>
          </Tabs>
        </div>

        {/* Information Section */}
        <Card className="mt-12 max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">
              Understanding Scale in Architecture
            </CardTitle>
            <CardDescription>
              The essential concept that connects real-world structures to their
              representations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">
              Scale is a crucial concept in architecture that allows designers
              to represent large structures on paper or in small models. It
              defines the relationship between the dimensions on a drawing or
              model and the actual size of the built structure.
            </p>

            <div>
              <h3 className="text-xl font-semibold mb-2">Why Scale Matters</h3>
              <ul className="list-disc pl-6 space-y-2 mb-6 text-muted-foreground">
                <li>
                  Enables representation of buildings at a manageable size
                </li>
                <li>Ensures proportional accuracy across all elements</li>
                <li>
                  Facilitates communication between architects, engineers, and
                  clients
                </li>
                <li>Allows for precise measurements and dimensions</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Working with Scale</h3>
              <p className="mb-4 text-muted-foreground">
                When working with scale, you need to consistently convert
                between real-world measurements and their scaled
                representations. A scale of 1:50 means 1 unit on your drawing
                (e.g., 1 cm) represents 50 units in reality (50 cm).
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">
                Tips for Architecture Students
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Always note the scale on your drawings</li>
                <li>
                  Choose an appropriate scale for the level of detail needed
                </li>
                <li>
                  Use a scale ruler for accurate measurements on physical
                  drawings
                </li>
                <li>
                  Consider using standardized scales (1:20, 1:50, 1:100, 1:200,
                  etc.)
                </li>
                <li>
                  Practice converting between real measurements and scaled
                  dimensions
                </li>
                <li>
                  Be consistent with your chosen units (metric or imperial)
                  throughout a project
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </main>

      <footer className="bg-slate-900 text-slate-200 py-6 mt-12">
        <div className="container mx-auto px-4">
          <p className="text-center text-slate-400">
            Created for architecture students to simplify scale and unit
            conversions
          </p>
        </div>
      </footer>
    </div>
  );
}
