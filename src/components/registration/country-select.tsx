// src/components/CountrySelect.tsx
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countries } from "@/lib/countries";

interface CountrySelectProps {
  selectedCountry: {
    code: string;
    flag: string;
    phone: string;
  };
  onCountryChange: (code: string) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({
  selectedCountry,
  onCountryChange,
}) => {
  return (
    <Select value={selectedCountry.code} onValueChange={onCountryChange}>
      <SelectTrigger className="w-1/3 border rounded-sm p-2 flex items-center justify-between">
        <span>{selectedCountry.flag}</span>
        <SelectValue>
          <span className="text-sm">{selectedCountry.phone}</span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <div className="p-2">
          {countries.map((country) => (
            <SelectItem key={country.code} value={country.code}>
              {country.flag} {country.label} ({country.phone})
            </SelectItem>
          ))}
        </div>
      </SelectContent>
    </Select>
  );
};

export default CountrySelect;
