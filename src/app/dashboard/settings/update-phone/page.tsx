// components/UpdatePhoneNumber.tsx
"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { countries } from "@/lib/countries";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import VerificationOtpModal from "./verification-otp/page";
import { useUpdateConsultantPhoneNumberMutation } from "@/store/services";

const UpdatePhone: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isopenVerificationModal, setIsOpenVerificationModal] = useState(false);

  // Set India as the default country
  const indiaDefault =
    countries.find((country) => country.label === "India") || countries[0];
  const [selectedCountry, setSelectedCountry] = useState(indiaDefault);

  // Mutation for updating consultant phone number
  const [updateConsultantNumber] = useUpdateConsultantPhoneNumberMutation();

  const toggleVerificationModal = () => {
    setIsOpenVerificationModal(!isopenVerificationModal);
  };

  const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handleCountryChange = (code: string) => {
    const country = countries.find((c) => c.code === code);
    if (country) {
      setSelectedCountry(country);
    }
  };
 

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Prepare the form data for API request
    const formData = {
      country_code: selectedCountry.phone,
      phone_number: Number(phoneNumber),
    };

    try {
      const response = await updateConsultantNumber(formData).unwrap();
      toggleVerificationModal();
      console.log("Update successful:", response);
    } catch (error) {
      console.error("Failed to update phone number:", error);
    }
  };

  return (
    <div className="flex flex-col items-start justify-start min-h-screen p-6 bg-gray-100">
      <div className="w-full p-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-gray-700">
          Update Phone Number
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Enter Your Current Phone Number
            </label>
            <div className="flex items-center space-x-2">
              <CountrySelect
                selectedCountry={selectedCountry}
                onCountryChange={handleCountryChange}
              />
              <Input
                type="tel"
                name="phone_number"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                placeholder="Phone Number"
                className="w-2/3"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              className=" px-10 py-2 font-semibold text-white bg-[#121E31] rounded-md"
              type="submit"
            >
              Verify
            </button>
          </div>
        </form>
      </div>

      {isopenVerificationModal && (
        <VerificationOtpModal
          isOpen={isopenVerificationModal}
          onClose={toggleVerificationModal}
          phone_number={phoneNumber}
          country_code={selectedCountry.phone}
        />
      )}
    </div>
  );
};

const CountrySelect: React.FC<{
  selectedCountry: { code: string; flag: string; phone: string };
  onCountryChange: (code: string) => void;
}> = ({ selectedCountry, onCountryChange }) => {
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

export default UpdatePhone;
