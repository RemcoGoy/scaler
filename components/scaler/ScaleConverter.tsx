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

type Unit = "mm" | "cm" | "m" | "km";

const ScaleConverter = () => {
  // State for inputs
  const [realValue, setRealValue] = useState<number>(1);
  const [scaledValue, setScaledValue] = useState<number | null>(null);
  const [scaleRatio, setScaleRatio] = useState<number>(100);
  const [realUnit, setRealUnit] = useState<Unit>("m");
  const [scaledUnit, setScaledUnit] = useState<Unit>("cm");
  const [convertDirection, setConvertDirection] = useState<
    "realToScale" | "scaleToReal"
  >("realToScale");

  // Common scales in architecture
  const commonScales = [
    { label: "1:1 (Full Size)", value: 1 },
    { label: "1:2 (Half Size)", value: 2 },
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

    // Convert to scaled value in meters
    const scaledValueInMeters = realValueInMeters / scaleRatio;

    // Convert from meters to target unit
    const result = scaledValueInMeters / unitToMetersFactor[scaledUnit];

    setScaledValue(result);
  };

  // Convert from scale to real world
  const calculateRealValue = () => {
    if (scaledValue === null || scaleRatio === null) return;

    // Convert scaled value to meters
    const scaledValueInMeters = scaledValue * unitToMetersFactor[scaledUnit];

    // Convert to real value in meters
    const realValueInMeters = scaledValueInMeters * scaleRatio;

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
  }, [realValue, scaleRatio, realUnit, scaledUnit, convertDirection]);

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
    setScaleRatio(parseInt(value, 10));
  };

  // Handle unit changes
  const handleRealUnitChange = (value: string) => {
    setRealUnit(value as Unit);
  };

  const handleScaledUnitChange = (value: string) => {
    setScaledUnit(value as Unit);
  };

  return (
    <Card className="shadow-lg border-t-4 border-t-blue-500">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          Architectural Scale Converter
        </CardTitle>
        <CardDescription className="text-center">
          Convert between real-world and scaled measurements for architectural
          drawings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Scale ratio selector */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Scale Ratio (1:X)</label>
          <Select
            value={scaleRatio.toString()}
            onValueChange={handleScaleRatioChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a scale" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Common Architectural Scales</SelectLabel>
                {commonScales.map((scale) => (
                  <SelectItem key={scale.value} value={scale.value.toString()}>
                    {scale.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground mt-1">
            A scale of 1:{scaleRatio} means 1 unit on your drawing equals{" "}
            {scaleRatio} units in real life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Real world measurements */}
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-md">Real World Measurement</CardTitle>
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
                Drawing/Model Measurement
              </CardTitle>
            </CardHeader>
            <CardContent className="py-2">
              <div className="flex gap-2">
                <div className="flex-grow">
                  <Input
                    type="number"
                    value={scaledValue !== null ? scaledValue : ""}
                    onChange={handleScaledValueChange}
                    step="any"
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
          <CardHeader className="py-3">
            <CardTitle className="text-md">Understanding the Result</CardTitle>
          </CardHeader>
          <CardContent className="py-2">
            {convertDirection === "realToScale" ? (
              <p>
                {realValue} {realUnit} in real life equals{" "}
                {scaledValue !== null ? scaledValue.toFixed(4) : "..."}{" "}
                {scaledUnit} on your 1:{scaleRatio} model or drawing.
              </p>
            ) : (
              <p>
                {scaledValue !== null ? scaledValue : "..."} {scaledUnit} on
                your 1:{scaleRatio} model or drawing equals{" "}
                {realValue.toFixed(4)} {realUnit} in real life.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Scale guide */}
        <Card className="bg-muted/50">
          <CardHeader className="py-3">
            <CardTitle className="text-md">Recommended Scales</CardTitle>
          </CardHeader>
          <CardContent className="py-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
              <div>• 1:1 → Full-size details</div>
              <div>• 1:5 → Furniture, detailed components</div>
              <div>• 1:20 → Interior details, furniture layouts</div>
              <div>• 1:50 → Room layouts, small building plans</div>
              <div>• 1:100 → Building plans, sections</div>
              <div>• 1:200 → Site plans for smaller projects</div>
              <div>• 1:500 → Urban context, larger sites</div>
              <div>• 1:1000, 1:1250 → Urban planning, master plans</div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default ScaleConverter;
