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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslations } from "next-intl";

type MetricUnit = "mm" | "cm" | "m" | "km";
type ImperialUnit = "in" | "ft" | "yd" | "mi";
type AreaUnit = "mm2" | "cm2" | "m2" | "km2" | "sqft" | "sqyd" | "acre" | "ha";
type ConversionType = "length" | "area";

const UnitConverter = () => {
  const t = useTranslations("unit");

  // Type of measurement to convert
  const [conversionType, setConversionType] =
    useState<ConversionType>("length");

  // Length conversion states
  const [lengthValue, setLengthValue] = useState<number>(1);
  const [fromLengthUnit, setFromLengthUnit] = useState<
    MetricUnit | ImperialUnit
  >("m");
  const [toLengthUnit, setToLengthUnit] = useState<MetricUnit | ImperialUnit>(
    "ft"
  );
  const [convertedLength, setConvertedLength] = useState<number | null>(null);

  // Area conversion states
  const [areaValue, setAreaValue] = useState<number>(1);
  const [fromAreaUnit, setFromAreaUnit] = useState<AreaUnit>("m2");
  const [toAreaUnit, setToAreaUnit] = useState<AreaUnit>("sqft");
  const [convertedArea, setConvertedArea] = useState<number | null>(null);

  // Length conversion factors to meters
  const lengthToMeters = {
    // Metric
    mm: 0.001,
    cm: 0.01,
    m: 1,
    km: 1000,
    // Imperial
    in: 0.0254,
    ft: 0.3048,
    yd: 0.9144,
    mi: 1609.34,
  };

  // Area conversion factors to square meters
  const areaToSquareMeters = {
    // Metric
    mm2: 0.000001,
    cm2: 0.0001,
    m2: 1,
    km2: 1000000,
    ha: 10000,
    // Imperial
    sqft: 0.092903,
    sqyd: 0.836127,
    acre: 4046.86,
  };

  // Calculate length conversions
  useEffect(() => {
    if (conversionType === "length") {
      const valueInMeters =
        lengthValue *
        lengthToMeters[fromLengthUnit as keyof typeof lengthToMeters];
      const result =
        valueInMeters /
        lengthToMeters[toLengthUnit as keyof typeof lengthToMeters];
      setConvertedLength(result);
    }
  }, [lengthValue, fromLengthUnit, toLengthUnit, conversionType]);

  // Calculate area conversions
  useEffect(() => {
    if (conversionType === "area") {
      const valueInSquareMeters =
        areaValue *
        areaToSquareMeters[fromAreaUnit as keyof typeof areaToSquareMeters];
      const result =
        valueInSquareMeters /
        areaToSquareMeters[toAreaUnit as keyof typeof areaToSquareMeters];
      setConvertedArea(result);
    }
  }, [areaValue, fromAreaUnit, toAreaUnit, conversionType]);

  // Handler for length value change
  const handleLengthValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setLengthValue(isNaN(value) ? 0 : value);
  };

  // Handler for area value change
  const handleAreaValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setAreaValue(isNaN(value) ? 0 : value);
  };

  // Handle tab change
  const handleTabChange = (value: string) => {
    setConversionType(value as ConversionType);
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
        {/* Conversion Type Selector */}
        <Tabs
          value={conversionType}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="length">{t("length")}</TabsTrigger>
            <TabsTrigger value="area">{t("area")}</TabsTrigger>
          </TabsList>

          {/* Length Converter */}
          <TabsContent value="length" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* From Length */}
              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-md">{t("from")}</CardTitle>
                </CardHeader>
                <CardContent className="py-2">
                  <div className="flex gap-2">
                    <div className="flex-grow">
                      <Input
                        type="number"
                        value={lengthValue}
                        onChange={handleLengthValueChange}
                        step="any"
                      />
                    </div>
                    <div className="w-32">
                      <Select
                        value={fromLengthUnit}
                        onValueChange={(value) =>
                          setFromLengthUnit(value as MetricUnit | ImperialUnit)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Unit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Metric</SelectLabel>
                            <SelectItem value="mm">mm</SelectItem>
                            <SelectItem value="cm">cm</SelectItem>
                            <SelectItem value="m">m</SelectItem>
                            <SelectItem value="km">km</SelectItem>
                          </SelectGroup>
                          <SelectGroup>
                            <SelectLabel>Imperial</SelectLabel>
                            <SelectItem value="in">inches</SelectItem>
                            <SelectItem value="ft">feet</SelectItem>
                            <SelectItem value="yd">yards</SelectItem>
                            <SelectItem value="mi">miles</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* To Length */}
              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-md">{t("to")}</CardTitle>
                </CardHeader>
                <CardContent className="py-2">
                  <div className="flex gap-2">
                    <div className="flex-grow">
                      <Input
                        type="number"
                        value={convertedLength !== null ? convertedLength : ""}
                        readOnly
                        step="any"
                        className="bg-muted"
                      />
                    </div>
                    <div className="w-32">
                      <Select
                        value={toLengthUnit}
                        onValueChange={(value) =>
                          setToLengthUnit(value as MetricUnit | ImperialUnit)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Unit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Metric</SelectLabel>
                            <SelectItem value="mm">mm</SelectItem>
                            <SelectItem value="cm">cm</SelectItem>
                            <SelectItem value="m">m</SelectItem>
                            <SelectItem value="km">km</SelectItem>
                          </SelectGroup>
                          <SelectGroup>
                            <SelectLabel>Imperial</SelectLabel>
                            <SelectItem value="in">inches</SelectItem>
                            <SelectItem value="ft">feet</SelectItem>
                            <SelectItem value="yd">yards</SelectItem>
                            <SelectItem value="mi">miles</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Area Converter */}
          <TabsContent value="area" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* From Area */}
              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-md">{t("from")}</CardTitle>
                </CardHeader>
                <CardContent className="py-2">
                  <div className="flex gap-2">
                    <div className="flex-grow">
                      <Input
                        type="number"
                        value={areaValue}
                        onChange={handleAreaValueChange}
                        step="any"
                      />
                    </div>
                    <div className="w-32">
                      <Select
                        value={fromAreaUnit}
                        onValueChange={(value) =>
                          setFromAreaUnit(value as AreaUnit)
                        }
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
                </CardContent>
              </Card>

              {/* To Area */}
              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-md">{t("to")}</CardTitle>
                </CardHeader>
                <CardContent className="py-2">
                  <div className="flex gap-2">
                    <div className="flex-grow">
                      <Input
                        type="number"
                        value={convertedArea !== null ? convertedArea : ""}
                        readOnly
                        step="any"
                        className="bg-muted"
                      />
                    </div>
                    <div className="w-32">
                      <Select
                        value={toAreaUnit}
                        onValueChange={(value) =>
                          setToAreaUnit(value as AreaUnit)
                        }
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
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Result explanation */}
        <Card className="bg-muted">
          <CardHeader className="py-3">
            <CardTitle className="text-md">{t("conversionResult")}</CardTitle>
          </CardHeader>
          <CardContent className="py-2">
            {conversionType === "length" ? (
              <p>
                {lengthValue} {fromLengthUnit} ={" "}
                {convertedLength !== null ? convertedLength.toFixed(6) : "..."}{" "}
                {toLengthUnit}
              </p>
            ) : (
              <p>
                {areaValue} {fromAreaUnit} ={" "}
                {convertedArea !== null ? convertedArea.toFixed(6) : "..."}{" "}
                {toAreaUnit}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Common architectural conversions */}
        <Card className="bg-muted/50">
          <CardHeader className="py-3">
            <CardTitle className="text-md">{t("commonConversions")}</CardTitle>
          </CardHeader>
          <CardContent className="py-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
              <div>
                <strong>{t("length")}:</strong>
                <ul className="pl-4 space-y-1 mt-1">
                  <li>1 m = 3.28084 ft</li>
                  <li>1 ft = 0.3048 m</li>
                  <li>1 in = 2.54 cm</li>
                  <li>1 cm = 0.393701 in</li>
                </ul>
              </div>
              <div>
                <strong>{t("area")}:</strong>
                <ul className="pl-4 space-y-1 mt-1">
                  <li>1 m2 = 10.7639 ft2</li>
                  <li>1 ft2 = 0.092903 m2</li>
                  <li>1 a = 4046.86 m2</li>
                  <li>1 ha = 2.47105 a</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default UnitConverter;
