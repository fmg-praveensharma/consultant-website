"use client";

import React from "react";
import { Check } from "lucide-react";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <>
      <div
        className="relative flex items-center justify-center h-screen bg-cover   bg-no-repeat "
        style={{
          backgroundImage: `url(https://cdn.discordapp.com/attachments/1258348287497474059/1283771471034056786/Thank_You.png?ex=66ee181a&is=66ecc69a&hm=f6e475c682a8a0438de003bdb00badd3102c3aedae6e0f32d3810fb0398335f2&)`,
        }}
      >
        <div className="relative bg-white p-16  mt-[90px] rounded-lg shadow-lg lg:w-[700px] w-full text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Thanks for Submitting Your Astrologer Application!
          </h2>
          <div className="mb-4 w-[50px] h-[50px] bg-black flex items-center justify-center rounded-full mx-auto">
            <Check className="text-white text-[30px] w-[30px] h-[30px] font-extrabold" />
          </div>

          <div className="text-center mb-4">
            <p className="text-gray-800 font-semibold dark:text-gray-300 mb-2">
              Your application number is
              <span className="font-bold text-lg"> xxxxxx</span>.
            </p>
            <p className="text-gray-700 font-semibold dark:text-gray-400 mb-1">
              Our selection team will review your application & keep you updated
              on the next steps.
            </p>
            <p className="text-gray-700 font-semibold dark:text-gray-400 mb-1">
              We'll send notifications here, via WhatsApp, and email.
            </p>
          </div>

          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Have Questions?
          </h3>
          <p className="text-gray-700 font-semibold dark:text-gray-400 mb-1">
            Our onboarding team is happy to help!
          </p>
          <p className="text-gray-700 font-semibold dark:text-gray-400 mb-4">
            Feel free to reach out to{" "}
            <a
              href="mailto:onboarding@Flute.com"
              className="text-blue-500 underline"
            >
              onboarding@Flute.com
            </a>
            .
          </p>
          <p className="text-gray-700 font-semibold dark:text-gray-400">
            We look forward to reviewing your application.
          </p>
        </div>
      </div>
    </>
  );
};

export default RegistrationModal;
