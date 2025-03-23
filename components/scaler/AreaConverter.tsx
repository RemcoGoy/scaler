import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslations } from "next-intl";
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
import { useEffect, useState } from "react";
import { AreaUnit } from "@/lib/types/area";

const AreaConverter = () => {
  const t = useTranslations("area");

  const [areaValue, setAreaValue] = useState<number>(1);
  const [fromAreaUnit, setFromAreaUnit] = useState<AreaUnit>("m2");
  const [toAreaUnit, setToAreaUnit] = useState<AreaUnit>("cm2");
  const [convertedArea, setConvertedArea] = useState<number | null>(null);

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

  // Calculate area conversions
  useEffect(() => {
    const valueInSquareMeters =
      areaValue *
      areaToSquareMeters[fromAreaUnit as keyof typeof areaToSquareMeters];
    const result =
      valueInSquareMeters /
      areaToSquareMeters[toAreaUnit as keyof typeof areaToSquareMeters];
    setConvertedArea(result);
  }, [areaValue, fromAreaUnit, toAreaUnit]);

  // Handler for area value change
  const handleAreaValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setAreaValue(isNaN(value) ? 0 : value);
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl text-center">{t("title")}</CardTitle>
        <CardDescription className="text-center">
          {t("subtitle")}
        </CardDescription>
      </CardHeader>
      <CardContent>
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
                    onValueChange={(value) => setToAreaUnit(value as AreaUnit)}
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
      </CardContent>
    </Card>
  );
};

export default AreaConverter;
