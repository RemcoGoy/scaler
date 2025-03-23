import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectValue,
  SelectContent,
  SelectTrigger,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { MetricUnit, ImperialUnit } from "@/lib/types/length";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const LengthConverter = () => {
  const t = useTranslations("length");

  const [lengthValue, setLengthValue] = useState<number>(1);
  const [fromLengthUnit, setFromLengthUnit] = useState<
    MetricUnit | ImperialUnit
  >("m");
  const [toLengthUnit, setToLengthUnit] = useState<MetricUnit | ImperialUnit>(
    "cm"
  );
  const [convertedLength, setConvertedLength] = useState<number | null>(null);

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

  // Calculate length conversions
  useEffect(() => {
    const valueInMeters =
      lengthValue *
      lengthToMeters[fromLengthUnit as keyof typeof lengthToMeters];
    const result =
      valueInMeters /
      lengthToMeters[toLengthUnit as keyof typeof lengthToMeters];
    setConvertedLength(result);
  }, [lengthValue, fromLengthUnit, toLengthUnit]);

  // Handler for length value change
  const handleLengthValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setLengthValue(isNaN(value) ? 0 : value);
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
      </CardContent>
    </Card>
  );
};

export default LengthConverter;
