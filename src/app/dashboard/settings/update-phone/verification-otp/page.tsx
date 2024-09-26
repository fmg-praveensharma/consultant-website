"use client";

import React, { useState } from "react";
import Modal from "@/components/common/modal";
import { useUpdateConsultantPhoneNumberOtpMutation } from "@/store/services";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const VerificationOtpModal = ({
  isOpen,
  onClose,
  phone_number,
  country_code,
}) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [updateConsultantOtp] = useUpdateConsultantPhoneNumberOtpMutation();
  const router = useRouter();

  // Function to handle OTP input change
  const handleOtpChange = (e, index) => {
    const { value } = e.target;
    if (/^[0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto focus to the next input
      if (value !== "" && index < otp.length - 1) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  // this function is for showing toast message after varify the otp

  const handleButtonClick = () => {
    toast.success("Your number has been verified");
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Join the OTP digits into a single string
    const otpString = otp.join("");

    // Prepare the form data for API request
    const formData = {
      phone_number: Number(phone_number),
      country_code: country_code,
      otp: Number(otpString),
    };

    try {
      const response = await updateConsultantOtp(formData).unwrap();
      handleButtonClick();

      setTimeout(() => {
        router.push("/dashboard/home");
      }, 800);

      // Handle success (e.g., close modal or show success message)
    } catch (error) {
      console.error("Failed to verify OTP:", error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex items-center justify-center">
        <form className="w-full max-w-md p-8" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Verify your Number
          </h2>
          <p className="mb-4 text-gray-600 text-center">
            Type in the verification code we sent you on <br /> +91 9998887771
          </p>
          <div className="flex justify-between mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                value={digit}
                maxLength={1}
                className="w-12 h-12 text-center text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                onChange={(e) => handleOtpChange(e, index)}
              />
            ))}
          </div>
          <p className="mb-4 text-gray-600 text-center">
            No code received?{" "}
            <button
              type="button"
              className="text-blue-600 hover:underline"
              // Implement resend OTP functionality here
            >
              Resend code
            </button>
          </p>
          <button
            type="submit"
            className="w-full px-4 py-2 rounded-sm text-white bg-[#121E31] hover:bg-[#121E31]"
          >
            Submit
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default VerificationOtpModal;
