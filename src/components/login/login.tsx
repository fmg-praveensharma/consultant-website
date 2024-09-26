"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useSendOtpMutation } from "@/store/services";
import CountrySelect from "../registration/country-select";
import { Input } from "@/components/ui/input";
import Verification from "./otp-verification";
import { countries } from "@/lib/countries";
import { Wheat } from "lucide-react";

const Login: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState(() => {
    const indiaDefault =
      countries.find(
        (country: { label: string }) => country.label === "India"
      ) || countries[0];
    return indiaDefault;
  });
  const [sendOtp] = useSendOtpMutation();

  const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handleCountryChange = (code: string) => {
    const country = countries.find((c) => c.code === code);
    if (country) {
      setSelectedCountry(country);
      setPhoneNumber("");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    console.log("clicked");
    e.preventDefault();

    if (!termsAccepted) {
      setErrorMessage("Please accept the terms and conditions.");
      return;
    }

    try {
      console.log("try block");
      const { status } = await sendOtp({
        phoneNumber: `${phoneNumber}`,
        countryCode: `${selectedCountry.phone}`,
      }).unwrap();

      console.log("status", status);
      if (status) {
        setIsOtpSent(true);
      } else {
        setErrorMessage("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred while sending OTP.");
    }
  };

  const isPhoneNumberValid = (phone: string) => {
    const phoneLength = Array.isArray(selectedCountry.phoneLength)
      ? selectedCountry.phoneLength.includes(phone.length)
      : phone.length === selectedCountry.phoneLength;
    return phoneLength && /^[0-9]*$/.test(phone);
  };

  return (
    <>
      {isOtpSent ? (
        <Verification phoneNumber={`${phoneNumber}`} />
      ) : (
        <div className="min-h-screen flex">
          <div className="w-1/2 bg-[#121E31] flex items-center justify-center">
            <Wheat className="h-40 w-28 text-white" />
          </div>
          <div className="w-1/2 bg-gray-100 flex items-center justify-center">
            <form
              onSubmit={handleSubmit}
              className="w-3/4 max-w-md p-8 bg-white rounded-sm shadow-md"
            >
              <h2 className="text-2xl font-semibold mb-6">
                What is your Phone Number?
              </h2>
              <p className="mb-4 text-gray-600">
                You will receive an OTP on your phone
              </p>
              <div className="mb-4">
                <div className="flex items-center space-x-2">
                  <CountrySelect
                    selectedCountry={selectedCountry}
                    onCountryChange={handleCountryChange}
                  />
                  <Input
                    type="tel"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    placeholder="Phone Number"
                    className="w-2/3"
                  />
                </div>
              </div>
              <div className="mb-4 flex items-center">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mr-2"
                />
                <label className="text-gray-600">
                  I agree to{" "}
                  <a href="#" className="text-blue-600">
                    terms of use
                  </a>{" "}
                  &{" "}
                  <a href="#" className="text-blue-600">
                    privacy policy
                  </a>
                </label>
              </div>
              {errorMessage && (
                <p className="mb-4 text-red-600">{errorMessage}</p>
              )}
              <button
                type="submit"
                disabled={!isPhoneNumberValid(phoneNumber)}
                className={`w-full px-4 py-2 rounded-sm text-white ${
                  isPhoneNumberValid(phoneNumber)
                    ? "bg-[#121E31]"
                    : "bg-gray-400"
                }`}
              >
                Get OTP
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
