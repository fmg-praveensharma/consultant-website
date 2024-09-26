// components/ui/MultiSelect.tsx

import React, { useId } from "react";
import Select, { MultiValue, Options } from "react-select";

// Define the options type
interface OptionType {
  value: string;
  label: string;
}

// Define the props for the MultiSelect component
interface MultiSelectProps {
  options: Options<OptionType>; // Options passed to react-select
  value: MultiValue<OptionType>; // The current value of the select
  onChange: (selected: MultiValue<OptionType>) => void; // Change handler
  placeholder?: string; // Placeholder text
  name: string; // Name attribute for form field
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  value = [], // Default to an empty array to ensure it's never undefined
  onChange,
  placeholder,
  name,
}) => {
  return (
    <Select
      instanceId={useId()}
      isMulti
      options={options}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      name={name}
      className="basic-multi-select"
      classNamePrefix="select"
    />
  );
};
