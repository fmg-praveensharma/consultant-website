// components/ImportantPolicies.tsx
"use client";

import React, { useState } from "react";
import Modal from "../common/modal";

const policies = [
  "Never be rude to any customer",
  "Never share your personal details with any customer",
  "Always provide honest feedback",
  "Keep customer information confidential",
];

export const ImportantPolicies: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-red-100 p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-red-800 mb-2">
        Important Policies
      </h2>
      <ul className="list-disc pl-5 mb-2">
        <li>Never be rude to any customer</li>
        <li>Never share your personal details with any customer</li>
      </ul>
      <button
        className="mt-4 text-blue-800 hover:underline"
        onClick={() => setIsModalOpen(true)}
      >
        Show more
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3 className="text-xl font-semibold mb-4">All Policies</h3>
        <ul className="list-disc pl-5">
          {policies.map((policy, index) => (
            <li key={index} className="mb-2">
              {policy}
            </li>
          ))}
        </ul>
      </Modal>
    </div>
  );
};
