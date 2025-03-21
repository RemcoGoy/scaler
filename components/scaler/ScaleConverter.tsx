"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";

type Unit = "mm" | "cm" | "m" | "km";

const ScaleConverter = () => {
  const t = useTranslations("scale");

  // State for inputs
  const [realValue, setRealValue] = useState<number>(1);
  const [scaledValue, setScaledValue] = useState<number | null>(null);
  const [scaleRatio, setScaleRatio] = useState<number>(100);
  const [realUnit, setRealUnit] = useState<Unit>("m");
  const [scaledUnit, setScaledUnit] = useState<Unit>("cm");
  const [convertDirection, setConvertDirection] = useState<
    "realToScale" | "scaleToReal"
  >("realToScale");

  const [customRatioFactor1, setCustomRatioFactor1] = useState<number>(1);
  const [customRatioFactor2, setCustomRatioFactor2] = useState<number>(5);

  // Common scales in architecture
  const commonScales = [
    { label: "1:1", value: 1 },
    { label: "1:2", value: 2 },
    { label: "1:5", value: 5 },
    { label: "1:10", value: 10 },
    { label: "1:20", value: 20 },
    { label: "1:50", value: 50 },
    { label: "1:100", value: 100 },
    { label: "1:200", value: 200 },
    { label: "1:500", value: 500 },
    { label: "1:1000", value: 1000 },
    { label: "1:1250", value: 1250 },
    { label: "1:2500", value: 2500 },
    { label: t("custom"), value: 0 },
  ];

  // Conversion factors to meters
  const unitToMetersFactor = {
    mm: 0.001,
    cm: 0.01,
    m: 1,
    km: 1000,
  };

  // Convert from real world to scale
  const calculateScaledValue = () => {
    if (realValue === null || scaleRatio === null) return;

    // Convert real value to meters
    const realValueInMeters = realValue * unitToMetersFactor[realUnit];

    let currentScaleRatio;
    if (scaleRatio === 0) {
      currentScaleRatio = customRatioFactor2 / customRatioFactor1;
    } else {
      currentScaleRatio = scaleRatio;
    }

    // Convert to scaled value in meters
    const scaledValueInMeters = realValueInMeters / currentScaleRatio;

    // Convert from meters to target unit
    const result = scaledValueInMeters / unitToMetersFactor[scaledUnit];

    setScaledValue(result);
  };

  // Convert from scale to real world
  const calculateRealValue = () => {
    if (scaledValue === null || scaleRatio === null) return;

    // Convert scaled value to meters
    const scaledValueInMeters = scaledValue * unitToMetersFactor[scaledUnit];

    let currentScaleRatio;
    if (scaleRatio === 0) {
      currentScaleRatio = customRatioFactor2 / customRatioFactor1;
    } else {
      currentScaleRatio = scaleRatio;
    }

    // Convert to real value in meters
    const realValueInMeters = scaledValueInMeters * currentScaleRatio;

    // Convert from meters to target unit
    const result = realValueInMeters / unitToMetersFactor[realUnit];

    setRealValue(result);
  };

  // Calculate conversion whenever inputs change
  useEffect(() => {
    if (convertDirection === "realToScale") {
      calculateScaledValue();
    } else {
      calculateRealValue();
    }
  }, [
    realValue,
    scaleRatio,
    realUnit,
    scaledUnit,
    scaledValue,
    customRatioFactor1,
    customRatioFactor2,
    convertDirection,
  ]);

  // Handle real world value change
  const handleRealValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setRealValue(isNaN(value) ? 0 : value);
    setConvertDirection("realToScale");
  };

  // Handle scale value change
  const handleScaledValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setScaledValue(isNaN(value) ? 0 : value);
    setConvertDirection("scaleToReal");
  };

  // Handle scale ratio change
  const handleScaleRatioChange = (value: string) => {
    const parsedValue = parseFloat(value);
    setScaleRatio(isNaN(parsedValue) ? 0 : parsedValue);
  };

  // Handle unit changes
  const handleRealUnitChange = (value: string) => {
    setRealUnit(value as Unit);
  };

  const handleScaledUnitChange = (value: string) => {
    setScaledUnit(value as Unit);
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl text-center">{t("title")}</CardTitle>
        <CardDescription className="text-center">
          {t("subtitle")}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Scale ratio selector */}
        <div className="space-y-2">
          <label className="text-sm font-medium">{t("ratio")}</label>
          <Select
            value={scaleRatio.toString()}
            onValueChange={handleScaleRatioChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a scale" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{t("scaleSelectTitle")}</SelectLabel>
                {commonScales.map((scale) => (
                  <SelectItem key={scale.value} value={scale.value.toString()}>
                    {scale.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground mt-1">
            {t("ratioDescription", {
              scaleRatio: scaleRatio === 0 ? "X" : scaleRatio,
            })}
          </p>
        </div>

        {scaleRatio === 0 && (
          <div className="space-y-2">
            <label className="text-sm font-medium">{t("customRatio")}</label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={customRatioFactor1}
                onChange={(e) =>
                  setCustomRatioFactor1(parseInt(e.target.value))
                }
              />
              <span className="text-xl font-bold">:</span>
              <Input
                type="number"
                value={customRatioFactor2}
                onChange={(e) =>
                  setCustomRatioFactor2(parseInt(e.target.value))
                }
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Real world measurements */}
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-md">
                {t("realWorldMeasurement")}
              </CardTitle>
            </CardHeader>
            <CardContent className="py-2">
              <div className="flex gap-2">
                <div className="flex-grow">
                  <Input
                    type="number"
                    value={realValue}
                    onChange={handleRealValueChange}
                    step="any"
                  />
                </div>
                <div className="w-24">
                  <Select value={realUnit} onValueChange={handleRealUnitChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mm">mm</SelectItem>
                      <SelectItem value="cm">cm</SelectItem>
                      <SelectItem value="m">m</SelectItem>
                      <SelectItem value="km">km</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Scaled measurements */}
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-md">
                {t("scaledMeasurement")}
              </CardTitle>
            </CardHeader>
            <CardContent className="py-2">
              <div className="flex gap-2">
                <div className="flex-grow">
                  <Input
                    type="number"
                    value={scaledValue !== null ? scaledValue : ""}
                    onChange={handleScaledValueChange}
                    step={1}
                  />
                </div>
                <div className="w-24">
                  <Select
                    value={scaledUnit}
                    onValueChange={handleScaledUnitChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mm">mm</SelectItem>
                      <SelectItem value="cm">cm</SelectItem>
                      <SelectItem value="m">m</SelectItem>
                      <SelectItem value="km">km</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Result explanation */}
        <Card className="bg-muted">
          <CardHeader className="py-2">
            <CardTitle className="text-md">
              {t("understandingResult")}
            </CardTitle>
          </CardHeader>
          <CardContent className="py-2">
            {convertDirection === "realToScale" ? (
              <p>
                {t("understandingResultRealToScale", {
                  scaledValue:
                    scaledValue !== null ? scaledValue.toFixed(2) : "...",
                  scaledUnit,
                  scaleRatio,
                  realValue,
                  realUnit,
                })}
              </p>
            ) : (
              <p>
                {t("understandingResultScaleToReal", {
                  scaledValue:
                    scaledValue !== null ? scaledValue.toFixed(2) : "...",
                  scaledUnit,
                  realValue: realValue.toFixed(2),
                  realUnit,
                  scaleRatio,
                })}
              </p>
            )}
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default ScaleConverter;
