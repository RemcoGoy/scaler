import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AreaUnit } from "@/lib/types/area";
import { useTranslations } from "next-intl";

const AreaCalculator = () => {
  const t = useTranslations("area.calculator");

  const [width, setWidth] = useState<number>(1);
  const [height, setHeight] = useState<number>(1);
  const [area, setArea] = useState<number>(1);
  const [unit, setUnit] = useState<AreaUnit>("m2");

  // Calculate area when width or height changes
  useEffect(() => {
    setArea(width * height);
  }, [width, height]);

  // Handle width change
  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setWidth(isNaN(value) || value <= 0 ? 1 : value);
  };

  // Handle height change
  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setHeight(isNaN(value) || value <= 0 ? 1 : value);
  };

  // Calculate max dimension for visualization
  const maxDimension = Math.max(width, height);
  const scaleFactor = 200 / maxDimension; // Scale to fit in a 200px container

  return (
    <Card className="mb-6">
      <CardHeader className="py-3">
        <CardTitle className="text-md">{t("title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="flex gap-2 items-center">
              <label className="w-20">{t("width")}:</label>
              <div className="flex-grow">
                <Input
                  type="number"
                  value={width}
                  onChange={handleWidthChange}
                  step="any"
                  min="0.1"
                />
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <label className="w-20">{t("height")}:</label>
              <div className="flex-grow">
                <Input
                  type="number"
                  value={height}
                  onChange={handleHeightChange}
                  step="any"
                  min="0.1"
                />
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <label className="w-20">{t("unit")}:</label>
              <div className="w-32">
                <Select
                  value={unit}
                  onValueChange={(value) => setUnit(value as AreaUnit)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Metric</SelectLabel>
                      <SelectItem value="mm2">mm²</SelectItem>
                      <SelectItem value="cm2">cm²</SelectItem>
                      <SelectItem value="m2">m²</SelectItem>
                      <SelectItem value="km2">km²</SelectItem>
                      <SelectItem value="ha">hectare</SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Imperial</SelectLabel>
                      <SelectItem value="sqft">sq ft</SelectItem>
                      <SelectItem value="sqyd">sq yd</SelectItem>
                      <SelectItem value="acre">acre</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-4 p-3 bg-slate-100 rounded-md">
              <p className="font-semibold">
                {t("area")}: {area.toFixed(2)} {unit}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="relative border border-gray-300 rounded-md">
              <div
                style={{
                  width: `${width * scaleFactor}px`,
                  height: `${height * scaleFactor}px`,
                  backgroundColor: "rgba(59, 130, 246, 0.5)",
                }}
                className="relative"
              >
                {/* Width label */}
                <div className="absolute -top-6 left-0 w-full flex justify-center">
                  <span className="bg-white px-1 text-xs">
                    {width.toFixed(1)}
                  </span>
                </div>
                {/* Height label */}
                <div className="absolute -right-6 top-0 h-full flex items-center">
                  <span className="bg-white px-1 text-xs rotate-90">
                    {height.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AreaCalculator;
